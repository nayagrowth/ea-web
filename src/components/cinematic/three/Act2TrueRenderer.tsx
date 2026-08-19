import { useEffect, useRef, useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { configureOffAxisCamera } from './act2/camera/projection';
import { createAct2Geometry, type Act2GeometryRig } from './act2/geometry/Act2Geometry';
import { createAct2TypeRig, type Act2TypeRig } from './act2/typography/Act2TypeRig';
import {
  createAct2EnvironmentController,
  type Act2EnvironmentController,
  type Act2EnvironmentRig,
} from './act2/animation/Act2EnvironmentController';
import { resizeCalibratedRenderer } from './act2/Act2CanvasSizing';
import { validateVanishingPoint, type CalibrationReport } from './act2/debug/VanishingPointValidator';
import { GeometryCalibrationOverlay } from './act2/debug/GeometryCalibrationOverlay';
import { REFERENCE_GEOMETRY } from './act2/constants/referenceGeometry';

export interface Act2TrueRendererProps {
  className?: string;
  showCalibrationOverlay?: boolean;
  viewportMode?: 'presentation' | 'calibration';
  mountDebugTextQuads?: boolean;
}

export interface Act2RendererHandle {
  setIgnitionProgress(p: number): void;
  setHoldProgress(p: number): void;
  setExitProgress(p: number): void;
  setProgress(p: number): void;
  dispose(): void;
}

/**
 * Act 2 True 3D Renderer (V8 Architecture: Calibrated Corridor + Environment Lighting)
 *
 * Invariants:
 * - Calibrated off-axis camera intrinsics and 1672x941 geometry.
 * - Environment lighting and emissive materials controlled via Act2EnvironmentController.
 * - Production typography is handled in-situ by Act2TypographyOverlay (zero Z-travel).
 */
export const Act2TrueRenderer = forwardRef<Act2RendererHandle, Act2TrueRendererProps>(
  (
    {
      className = '',
      showCalibrationOverlay = true,
      viewportMode: initialViewportMode = 'presentation',
      mountDebugTextQuads = false,
    },
    ref
  ) => {
    const mountRef = useRef<HTMLDivElement | null>(null);
    const parentContainerRef = useRef<HTMLDivElement | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const geometryRigRef = useRef<Act2GeometryRig | null>(null);
    const typeRigRef = useRef<Act2TypeRig | null>(null);
    const envControllerRef = useRef<Act2EnvironmentController | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

    const [calibrationReport, setCalibrationReport] = useState<CalibrationReport | null>(null);
    const [viewportDims, setViewportDims] = useState<{ width: number; height: number }>({
      width: REFERENCE_GEOMETRY.width,
      height: REFERENCE_GEOMETRY.height,
    });

    const [viewportMode, setViewportMode] = useState<'presentation' | 'calibration'>(initialViewportMode);
    const [isWireframe, setIsWireframe] = useState(false);
    const [isClayMode, setIsClayMode] = useState(false);

    // Cover scale for presentation mode, contain scale for calibration mode
    const [stageDimensions, setStageDimensions] = useState<{ width: number; height: number }>({
      width: REFERENCE_GEOMETRY.width,
      height: REFERENCE_GEOMETRY.height,
    });

    const materialsRef = useRef<THREE.Material[]>([]);
    const clayMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);

    // Compute Stage Dimensions (Cover in presentation, Contain in calibration)
    const updateStageDimensions = useCallback(() => {
      const parent = parentContainerRef.current;
      if (!parent) return;

      const wp = parent.clientWidth || window.innerWidth;
      const hp = parent.clientHeight || window.innerHeight;

      if (viewportMode === 'presentation') {
        const s = Math.max(wp / REFERENCE_GEOMETRY.width, hp / REFERENCE_GEOMETRY.height);
        setStageDimensions({
          width: Math.round(REFERENCE_GEOMETRY.width * s),
          height: Math.round(REFERENCE_GEOMETRY.height * s),
        });
      } else {
        const s = Math.min(1.0, wp / REFERENCE_GEOMETRY.width, hp / REFERENCE_GEOMETRY.height);
        setStageDimensions({
          width: Math.round(REFERENCE_GEOMETRY.width * s),
          height: Math.round(REFERENCE_GEOMETRY.height * s),
        });
      }
    }, [viewportMode]);

    useEffect(() => {
      updateStageDimensions();
      window.addEventListener('resize', updateStageDimensions);
      return () => window.removeEventListener('resize', updateStageDimensions);
    }, [updateStageDimensions]);

    // Forward Imperative Environment Handle
    useImperativeHandle(
      ref,
      () => ({
        setIgnitionProgress: (p: number) => envControllerRef.current?.setIgnitionProgress(p),
        setHoldProgress: (p: number) => envControllerRef.current?.setHoldProgress(p),
        setExitProgress: (p: number) => envControllerRef.current?.setExitProgress(p),
        setProgress: (p: number) => {
          if (p <= 0.35) {
            envControllerRef.current?.setIgnitionProgress(p / 0.35);
          } else if (p <= 0.8) {
            envControllerRef.current?.setHoldProgress((p - 0.35) / 0.45);
          } else {
            envControllerRef.current?.setExitProgress((p - 0.8) / 0.2);
          }
        },
        dispose: () => {},
      }),
      []
    );

    useEffect(() => {
      const container = mountRef.current;
      if (!container) return;

      let isDisposed = false;
      let frameId = 0;
      const disposables: Array<{ dispose: () => void }> = [];

      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      setViewportDims({ width, height });

      // 1. SCENE
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('#030405');
      scene.fog = new THREE.FogExp2('#030405', 0.0055);
      sceneRef.current = scene;

      // Clay Material Override
      const clayMat = new THREE.MeshStandardMaterial({
        color: '#848890',
        roughness: 0.88,
        metalness: 0.05,
      });
      clayMaterialRef.current = clayMat;
      disposables.push(clayMat);

      // 2. CALIBRATED OFF-AXIS CAMERA
      const camera = new THREE.PerspectiveCamera(
        REFERENCE_GEOMETRY.fovY,
        width / height,
        REFERENCE_GEOMETRY.frustumAtNear01.near,
        REFERENCE_GEOMETRY.frustumAtNear01.far
      );
      camera.position.set(
        REFERENCE_GEOMETRY.camera.position.x,
        REFERENCE_GEOMETRY.camera.position.y,
        REFERENCE_GEOMETRY.camera.position.z
      );
      camera.rotation.set(0, 0, 0);
      configureOffAxisCamera(camera, width, height);
      cameraRef.current = camera;

      // 3. WEBGL RENDERER
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance',
        alpha: false,
      });
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      container.appendChild(renderer.domElement);

      // Initial explicit canvas sizing
      resizeCalibratedRenderer(
        renderer,
        container,
        (w, h) => configureOffAxisCamera(camera, w, h)
      );

      // 4. LIGHTING RIG
      const ambientLight = new THREE.AmbientLight('#080a0e', 0.32);
      scene.add(ambientLight);

      const rightWallKey = new THREE.DirectionalLight('#eef1f5', 4.4);
      rightWallKey.position.set(11, 17, 3);
      scene.add(rightWallKey);

      const leftHeroFill = new THREE.DirectionalLight('#b6bac2', 0.85);
      leftHeroFill.position.set(-1, 9, 5);
      scene.add(leftHeroFill);

      const wallModelLight = new THREE.PointLight('#aeb2ba', 2.2, 58, 2);
      wallModelLight.position.set(-2.5, 7.2, -17);
      scene.add(wallModelLight);

      const warmRailLight = new THREE.PointLight('#c39443', 1.4, 42, 2);
      warmRailLight.position.set(-5.5, 2.2, -14);
      scene.add(warmRailLight);

      const vpLight = new THREE.PointLight('#c7a052', 1.25, 60, 2);
      vpLight.position.set(2.8, 1.8, -78);
      scene.add(vpLight);

      // 5. GEOMETRY RIG
      const geometryRig = createAct2Geometry();
      geometryRigRef.current = geometryRig;
      scene.add(geometryRig.group);
      disposables.push(...geometryRig.disposables);

      // 6. OPTIONAL DEBUG TEXT QUADS (Calibration mode only)
      if (mountDebugTextQuads) {
        const typeRig = createAct2TypeRig();
        typeRigRef.current = typeRig;
        scene.add(typeRig.group);
        disposables.push(...typeRig.disposables);
      }

      // Collect materials
      const mats: THREE.Material[] = [];
      const horizonMats: THREE.MeshStandardMaterial[] = [];
      const railMats: THREE.MeshStandardMaterial[] = [];
      const louverMats: THREE.MeshStandardMaterial[] = [];

      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).material) {
          const m = (child as THREE.Mesh).material;
          if (Array.isArray(m)) mats.push(...m);
          else mats.push(m);

          if (child.name.includes('Horizon') && m instanceof THREE.MeshStandardMaterial) {
            horizonMats.push(m);
          }
          if (child.name.includes('Rail') && m instanceof THREE.MeshStandardMaterial) {
            railMats.push(m);
          }
          if (child.name.includes('Louver') && m instanceof THREE.MeshStandardMaterial) {
            louverMats.push(m);
          }
        }
      });
      materialsRef.current = mats;

      // 7. ENVIRONMENT CONTROLLER
      const envRig: Act2EnvironmentRig = {
        ambientLight,
        rightWallKey,
        leftHeroFill,
        wallModelLight,
        warmRailLight,
        vpLight,
        horizonMaterials: horizonMats,
        railMaterials: railMats,
        louverMaterials: louverMats,
      };
      const envController = createAct2EnvironmentController(envRig);
      envControllerRef.current = envController;

      // Initialize ignition to full for static hold
      envController.setIgnitionProgress(1.0);

      const runCalibration = (w: number, h: number) => {
        const report = validateVanishingPoint(
          geometryRig.keyLongitudinalLines,
          camera,
          w,
          h,
          geometryRig.slatMetrics,
          geometryRig.floorSweepRig.keyReferenceCurves
        );
        setCalibrationReport(report);
      };

      runCalibration(width, height);

      const animate = () => {
        if (isDisposed) return;
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      };
      animate();

      // 8. RESIZE OBSERVER ON MOUNT CONTAINER
      const resizeObserver = new ResizeObserver((entries) => {
        if (isDisposed || entries.length === 0) return;
        const entry = entries[0];
        const w = Math.round(entry.contentRect.width) || container.clientWidth || window.innerWidth;
        const h = Math.round(entry.contentRect.height) || container.clientHeight || window.innerHeight;

        setViewportDims({ width: w, height: h });
        resizeCalibratedRenderer(
          renderer,
          container,
          (cw, ch) => configureOffAxisCamera(camera, cw, ch)
        );
        runCalibration(w, h);
      });

      resizeObserver.observe(container);

      return () => {
        isDisposed = true;
        cancelAnimationFrame(frameId);
        resizeObserver.disconnect();

        disposables.forEach((item) => {
          try {
            item.dispose();
          } catch {
            // ignore
          }
        });

        renderer.dispose();

        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    }, [mountDebugTextQuads]);

    // Update wireframe / clay mode dynamically
    useEffect(() => {
      materialsRef.current.forEach((m) => {
        if (m instanceof THREE.MeshStandardMaterial || m instanceof THREE.MeshBasicMaterial) {
          m.wireframe = isWireframe;
        }
      });

      if (clayMaterialRef.current) {
        clayMaterialRef.current.wireframe = isWireframe;
      }

      if (sceneRef.current) {
        sceneRef.current.overrideMaterial = isClayMode ? clayMaterialRef.current : null;
      }
    }, [isWireframe, isClayMode]);

    return (
      <div
        ref={parentContainerRef}
        className={`relative w-full h-full flex items-center justify-center bg-[#030405] overflow-hidden ${className}`}
      >
        <div
          ref={mountRef}
          style={{
            width: `${stageDimensions.width}px`,
            height: `${stageDimensions.height}px`,
          }}
          className={`act2-true-renderer relative pointer-events-none select-none overflow-hidden ${
            viewportMode === 'calibration'
              ? 'shadow-[0_0_80px_rgba(0,0,0,0.95)] border border-white/15 rounded-sm'
              : ''
          }`}
        >
          {showCalibrationOverlay && (
            <GeometryCalibrationOverlay
              report={calibrationReport}
              viewportWidth={viewportDims.width}
              viewportHeight={viewportDims.height}
              isWireframe={isWireframe}
              onToggleWireframe={() => setIsWireframe((prev) => !prev)}
              isClayMode={isClayMode}
              onToggleClayMode={() => setIsClayMode((prev) => !prev)}
              viewportMode={viewportMode}
              onToggleViewportMode={() =>
                setViewportMode((prev) => (prev === 'presentation' ? 'calibration' : 'presentation'))
              }
              onForceCalibrationMode={() => setViewportMode('calibration')}
            />
          )}
        </div>
      </div>
    );
  }
);

Act2TrueRenderer.displayName = 'Act2TrueRenderer';

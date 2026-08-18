import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { configureOffAxisCamera } from './act2/camera/projection';
import { createAct2Geometry, type Act2GeometryRig } from './act2/geometry/Act2Geometry';
import { validateVanishingPoint, type CalibrationReport } from './act2/debug/VanishingPointValidator';
import { GeometryCalibrationOverlay } from './act2/debug/GeometryCalibrationOverlay';
import { REFERENCE_GEOMETRY } from './act2/constants/referenceGeometry';

interface Act2TrueRendererProps {
  className?: string;
  showCalibrationOverlay?: boolean;
}

/**
 * Geometry-first Act 2 renderer (Sweep V6.2 Final Geometry Lock).
 *
 * Invariants:
 * - Canonical VP (1433.21, 586.43) strictly locked.
 * - ResizeObserver on mountRef for instant synchronized camera/renderer resizing.
 * - Explicit contained 1672:941 review frame (s = min(1, Wp/1672, Hp/941)).
 * - Screen-interpolated floor sweep ribbon with runtime curve reprojection validation.
 * - Real Clay Mode via scene.overrideMaterial.
 * - Both local & global depth attributes (aDepthLocal, aDepthGlobal, aWorldZ).
 */
export const Act2TrueRenderer: React.FC<Act2TrueRendererProps> = ({
  className = '',
  showCalibrationOverlay = true,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const parentContainerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const geometryRigRef = useRef<Act2GeometryRig | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const [calibrationReport, setCalibrationReport] = useState<CalibrationReport | null>(null);
  const [viewportDims, setViewportDims] = useState<{ width: number; height: number }>({
    width: REFERENCE_GEOMETRY.width,
    height: REFERENCE_GEOMETRY.height,
  });

  const [isWireframe, setIsWireframe] = useState(false);
  const [isClayMode, setIsClayMode] = useState(false);
  const [isCanonicalLetterbox, setIsCanonicalLetterbox] = useState(false);

  // Exact Contained Sizing for 1672:941 Review Frame
  const [letterboxDims, setLetterboxDims] = useState<{ width: number; height: number }>({
    width: REFERENCE_GEOMETRY.width,
    height: REFERENCE_GEOMETRY.height,
  });

  const materialsRef = useRef<THREE.Material[]>([]);
  const clayMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  // Update letterbox dimensions when parent container dimensions change
  const updateLetterboxDims = useCallback(() => {
    const parent = parentContainerRef.current;
    if (!parent) return;

    const wp = parent.clientWidth || window.innerWidth;
    const hp = parent.clientHeight || window.innerHeight;

    const s = Math.min(1.0, wp / REFERENCE_GEOMETRY.width, hp / REFERENCE_GEOMETRY.height);
    setLetterboxDims({
      width: Math.round(REFERENCE_GEOMETRY.width * s),
      height: Math.round(REFERENCE_GEOMETRY.height * s),
    });
  }, []);

  useEffect(() => {
    updateLetterboxDims();
    window.addEventListener('resize', updateLetterboxDims);
    return () => window.removeEventListener('resize', updateLetterboxDims);
  }, [updateLetterboxDims]);

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

    // Calibrated Clay Material
    const clayMat = new THREE.MeshStandardMaterial({
      color: '#848890',
      roughness: 0.88,
      metalness: 0.05,
    });
    clayMaterialRef.current = clayMat;
    disposables.push(clayMat);

    // 2. CALIBRATED OFF-AXIS CAMERA (far = 500.0)
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.10;
    container.appendChild(renderer.domElement);

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

    // Collect materials
    const mats: THREE.Material[] = [];
    geometryRig.group.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && (child as THREE.Mesh).material) {
        const m = (child as THREE.Mesh).material;
        if (Array.isArray(m)) mats.push(...m);
        else mats.push(m);
      }
    });
    materialsRef.current = mats;

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

    // 6. RESIZE OBSERVER ON MOUNT CONTAINER (Instant sync without dimensional transition delay)
    const resizeObserver = new ResizeObserver((entries) => {
      if (isDisposed || entries.length === 0) return;
      const entry = entries[0];
      const w = Math.round(entry.contentRect.width) || container.clientWidth || window.innerWidth;
      const h = Math.round(entry.contentRect.height) || container.clientHeight || window.innerHeight;

      setViewportDims({ width: w, height: h });
      configureOffAxisCamera(camera, w, h);
      renderer.setSize(w, h, false);
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
  }, []);

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
        style={
          isCanonicalLetterbox
            ? { width: `${letterboxDims.width}px`, height: `${letterboxDims.height}px` }
            : { width: '100%', height: '100%' }
        }
        className={`act2-true-renderer relative pointer-events-none select-none overflow-hidden ${
          isCanonicalLetterbox ? 'shadow-[0_0_80px_rgba(0,0,0,0.95)] border border-white/10' : ''
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
            isCanonicalLetterbox={isCanonicalLetterbox}
            onToggleCanonicalLetterbox={() => setIsCanonicalLetterbox((prev) => !prev)}
            onForceCanonical={() => setIsCanonicalLetterbox(true)}
          />
        )}
      </div>
    </div>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { configureOffAxisCamera } from './act2/camera/projection';
import { createAct2Geometry } from './act2/geometry/Act2Geometry';
import { validateVanishingPoint, type CalibrationReport } from './act2/debug/VanishingPointValidator';
import { GeometryCalibrationOverlay } from './act2/debug/GeometryCalibrationOverlay';
import { REFERENCE_GEOMETRY } from './act2/constants/referenceGeometry';

interface Act2TrueRendererProps {
  className?: string;
  showCalibrationOverlay?: boolean;
}

/**
 * Geometry-first Act 2 renderer (Sweep V6).
 *
 * Invariants:
 * - Measured canonical VP (1433.21, 586.43) is strictly preserved.
 * - Slat bodies are genuine architectural slabs derived from ray interval occupancy.
 * - Real 3D Floor Sweep Ribbon unprojected from screen space.
 * - Normalized `aDepth` baked into all geometries for animation readiness.
 */
export const Act2TrueRenderer: React.FC<Act2TrueRendererProps> = ({
  className = '',
  showCalibrationOverlay = true,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [calibrationReport, setCalibrationReport] = useState<CalibrationReport | null>(null);
  const [viewportDims, setViewportDims] = useState<{ width: number; height: number }>({
    width: REFERENCE_GEOMETRY.width,
    height: REFERENCE_GEOMETRY.height,
  });

  const [isWireframe, setIsWireframe] = useState(false);
  const [isClayMode, setIsClayMode] = useState(false);

  const materialsRef = useRef<THREE.Material[]>([]);

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
    scene.fog = new THREE.FogExp2('#030405', 0.0065);

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

    // 3. WEBGL RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.10;
    container.appendChild(renderer.domElement);

    // 4. LIGHTING RIG (Restrained Specular Modeling)
    const ambientLight = new THREE.AmbientLight('#080a0e', 0.30);
    scene.add(ambientLight);

    const rightWallKey = new THREE.DirectionalLight('#eef1f5', 4.2);
    rightWallKey.position.set(11, 17, 3);
    scene.add(rightWallKey);

    const leftHeroFill = new THREE.DirectionalLight('#b6bac2', 0.85);
    leftHeroFill.position.set(-1, 9, 5);
    scene.add(leftHeroFill);

    // Broad soft wall wash
    const wallModelLight = new THREE.PointLight('#aeb2ba', 2.2, 58, 2);
    wallModelLight.position.set(-2.5, 7.2, -17);
    scene.add(wallModelLight);

    // Warm energy spill along horizon
    const warmRailLight = new THREE.PointLight('#c39443', 1.4, 42, 2);
    warmRailLight.position.set(-5.5, 2.2, -14);
    scene.add(warmRailLight);

    // Deep convergence accent
    const vpLight = new THREE.PointLight('#c7a052', 1.2, 48, 2);
    vpLight.position.set(2.8, 1.8, -78);
    scene.add(vpLight);

    // 5. GEOMETRY RIG
    const geometryRig = createAct2Geometry();
    scene.add(geometryRig.group);
    disposables.push(...geometryRig.disposables);

    // Collect materials for wireframe/clay toggles
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
        geometryRig.slatMetrics
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

    const handleResize = () => {
      if (!container || isDisposed) return;

      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      setViewportDims({ width: w, height: h });

      configureOffAxisCamera(camera, w, h);
      renderer.setSize(w, h);
      runCalibration(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);

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

  // Update wireframe / clay mode dynamically on materials
  useEffect(() => {
    materialsRef.current.forEach((m) => {
      if (m instanceof THREE.MeshStandardMaterial || m instanceof THREE.MeshBasicMaterial) {
        m.wireframe = isWireframe;
      }
    });
  }, [isWireframe]);

  return (
    <div
      ref={mountRef}
      className={`act2-true-renderer relative w-full h-full pointer-events-none select-none overflow-hidden ${className}`}
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
        />
      )}
    </div>
  );
};

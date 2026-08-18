import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { configureOffAxisCamera } from './act2/camera/projection';
import { createAct2Geometry } from './act2/geometry/Act2Geometry';
import { validateVanishingPoint, type CalibrationReport } from './act2/debug/VanishingPointValidator';
import { GeometryCalibrationOverlay } from './act2/debug/GeometryCalibrationOverlay';

interface Act2TrueRendererProps {
  className?: string;
  showCalibrationOverlay?: boolean;
}

/**
 * EXACT MATHEMATICAL ACT 2 ONE-POINT FORCED PERSPECTIVE CORRIDOR
 * 
 * Immutably calibrated to Target Vanishing Point: (1433.21, 586.43)
 * Camera: Off-axis asymmetric frustum with near = 0.1, far = 100.0, zero pointer parallax
 * Geometry: Single Euclidean coordinate system with all longitudinal lines parallel to D = (0, 0, -1)
 */
export const Act2TrueRenderer: React.FC<Act2TrueRendererProps> = ({
  className = '',
  showCalibrationOverlay = true,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [calibrationReport, setCalibrationReport] = useState<CalibrationReport | null>(null);
  const [viewportDims, setViewportDims] = useState<{ width: number; height: number }>({
    width: 1672,
    height: 941,
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isDisposed = false;
    const disposables: Array<{ dispose: () => void }> = [];

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    setViewportDims({ width, height });

    // 1. SCENE SETUP (Deep Matte Obsidian Space)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#050608');
    scene.fog = new THREE.FogExp2('#050608', 0.015);

    // 2. CAMERA SETUP (Pinhole at origin with exact off-axis frustum)
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.65, 0);
    camera.rotation.set(0, 0, 0); // Pure forward orientation; projection matrix alone generates off-axis VP
    configureOffAxisCamera(camera, width, height);

    // 3. WEBGL RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 4. PBR LIGHTING RIG
    const ambientLight = new THREE.AmbientLight('#06080b', 0.35);
    scene.add(ambientLight);

    // Sharp grazing key light along right wall fins
    const keyLight = new THREE.DirectionalLight('#ffffff', 4.5);
    keyLight.position.set(12, 14, 4);
    scene.add(keyLight);

    // Soft warm fill along the left floor/wall junction
    const warmFill = new THREE.DirectionalLight('#ecd08e', 1.5);
    warmFill.position.set(-6, 6, 2);
    scene.add(warmFill);

    // Vanishing Point Accent Light
    const vpLight = new THREE.PointLight('#ecd08e', 3.0, 35);
    vpLight.position.set(5.0, 1.0, -35.0);
    scene.add(vpLight);

    // 5. MATHEMATICALLY PURE EUCLIDEAN CORRIDOR GEOMETRY
    const geometryRig = createAct2Geometry();
    scene.add(geometryRig.group);
    disposables.push(...geometryRig.disposables);

    // 6. RUN MATHEMATICAL CALIBRATION VALIDATION
    const report = validateVanishingPoint(geometryRig.keyLongitudinalLines, camera, width, height);
    setCalibrationReport(report);

    // 7. RENDER LOOP (Zero Pointer Parallax During Calibration)
    const animate = () => {
      if (isDisposed) return;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // 8. RESIZE HANDLER (Preserves Exact Mathematical Alignment)
    const handleResize = () => {
      if (!container || isDisposed) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      setViewportDims({ width: w, height: h });
      configureOffAxisCamera(camera, w, h);
      renderer.setSize(w, h);

      const updatedReport = validateVanishingPoint(geometryRig.keyLongitudinalLines, camera, w, h);
      setCalibrationReport(updatedReport);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      isDisposed = true;
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
        />
      )}
    </div>
  );
};

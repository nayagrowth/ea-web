import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Act2TrueRendererProps {
  className?: string;
}

/**
 * MATHEMATICAL ONE-POINT FORCED PERSPECTIVE CORRIDOR
 * 
 * Calibration Target (1672 x 941):
 * - Vanishing Point V = (1450, 590) -> Normalized Vn = (0.867, 0.627)
 * - Camera Yaw: ~25.1° | Pitch: ~5.2° downward | Roll: 0°
 * - Horizontal FOV: ~64° (Vertical FOV: ~38.8°)
 * - Floor Plane: Y = 0 (Reflective dark lacquer/tarmac, roughness 0.22, metalness 0.35)
 * - Left/Back Wall: Matte dark obsidian plane (roughness 0.85)
 * - Right Wall: Slanted converging plane with 10 geometrically-spaced 3D metallic fins and top silver blade
 * - Emissive Horizon Laser: Longitudinal strip from (0, 548) to (1450, 590)
 * - NO TEXT: Pure hardcore architectural geometry and PBR lighting
 */
export const Act2TrueRenderer: React.FC<Act2TrueRendererProps> = ({
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isDisposed = false;
    const disposables: Array<{ dispose: () => void }> = [];

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. SCENE SETUP (Deep Matte Obsidian Atmosphere)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#050608');
    scene.fog = new THREE.FogExp2('#050608', 0.012);

    // 2. PERSPECTIVE CAMERA (Calibrated to FOVh ~64° -> FOVv ~38.8°)
    const camera = new THREE.PerspectiveCamera(38.8, width / height, 0.1, 200);
    // Camera position at eye level Y = 1.65, Z = 7.0
    camera.position.set(0, 1.65, 7.0);

    // Exact Euler rotation: Yaw = 25.1° (0.438 rad), Pitch = -5.2° (-0.091 rad), Roll = 0°
    camera.rotation.order = 'YXZ';
    camera.rotation.y = -THREE.MathUtils.degToRad(25.1);
    camera.rotation.x = -THREE.MathUtils.degToRad(5.2);
    camera.rotation.z = 0;

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
    const ambientLight = new THREE.AmbientLight('#06080b', 0.30);
    scene.add(ambientLight);

    // High-angle directional key light creating sharp grazing specular highlights on right-wall louvers
    const keyLight = new THREE.DirectionalLight('#ffffff', 4.8);
    keyLight.position.set(16, 14, 8);
    scene.add(keyLight);

    // Soft warm fill along the left floor/wall junction
    const warmFill = new THREE.DirectionalLight('#ecd08e', 1.6);
    warmFill.position.set(-8, 6, 2);
    scene.add(warmFill);

    // Vanishing Point Point Light (radiant amber accent at the corridor focus)
    const vpPointLight = new THREE.PointLight('#ecd08e', 3.2, 45);
    vpPointLight.position.set(18.5, 0.8, -32.0);
    scene.add(vpPointLight);

    // =======================================================================
    // 5. ONE-POINT FORCED PERSPECTIVE CORRIDOR GEOMETRY RIG
    // =======================================================================
    const corridorRig = new THREE.Group();
    scene.add(corridorRig);

    // -----------------------------------------------------------------------
    // A. FLOOR PLANAR REFLECTOR (Y = 0, Normal (0, 1, 0))
    // -----------------------------------------------------------------------
    const floorGeo = new THREE.PlaneGeometry(60, 90);
    const floorMat = new THREE.MeshStandardMaterial({
      color: '#08090b',
      roughness: 0.22,
      metalness: 0.38,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.set(6.0, 0, -20.0);
    corridorRig.add(floorMesh);
    disposables.push(floorGeo, floorMat);

    // Subtle dark-silver floor panels with slight roughness variation
    const floorPanels = [
      { x: -10, width: 8, roughness: 0.26, color: '#090b10' },
      { x: -1, width: 7, roughness: 0.18, color: '#0b0d13' },
      { x: 7, width: 6, roughness: 0.24, color: '#080a0f' },
      { x: 14, width: 9, roughness: 0.16, color: '#0d1017' },
    ];

    floorPanels.forEach((p, idx) => {
      const panelGeo = new THREE.PlaneGeometry(p.width, 88);
      const panelMat = new THREE.MeshStandardMaterial({
        color: p.color,
        roughness: p.roughness,
        metalness: 0.45,
      });
      const panelMesh = new THREE.Mesh(panelGeo, panelMat);
      panelMesh.rotation.x = -Math.PI / 2;
      panelMesh.position.set(p.x, 0.002 + idx * 0.001, -20.0);
      corridorRig.add(panelMesh);
      disposables.push(panelGeo, panelMat);
    });

    // Longitudinal Floor Speed Rails (Parallel in 3D, project naturally to VP)
    // Corresponding to Rays F1 (-13.2°), F2 (-17.7°), F3 (-30.3°) and intermediate tracks
    const railDefs = [
      { x: -14, width: 0.05, color: '#ffffff', emissive: 0.4 },
      { x: -7, width: 0.04, color: '#666e7a', emissive: 0.2 },
      { x: -1, width: 0.06, color: '#ffffff', emissive: 0.8 },
      { x: 4.5, width: 0.12, color: '#ecd08e', emissive: 2.8 },  // Champagne Gold
      { x: 9.5, width: 0.14, color: '#dfbd78', emissive: 3.2 },  // Champagne Gold
      { x: 15, width: 0.08, color: '#ffffff', emissive: 1.2 },
    ];

    railDefs.forEach((r) => {
      const railGeo = new THREE.BoxGeometry(r.width, 0.015, 88);
      const railMat = new THREE.MeshStandardMaterial({
        color: r.color,
        emissive: r.color,
        emissiveIntensity: r.emissive,
        roughness: 0.05,
        metalness: 0.95,
      });
      const railMesh = new THREE.Mesh(railGeo, railMat);
      railMesh.position.set(r.x, 0.01, -20.0);
      corridorRig.add(railMesh);
      disposables.push(railGeo, railMat);
    });

    // -----------------------------------------------------------------------
    // B. LEFT/BACK ARCHITECTURAL MASS (Matte Dark Obsidian Plane)
    // -----------------------------------------------------------------------
    const backWallGeo = new THREE.PlaneGeometry(55, 30);
    const backWallMat = new THREE.MeshStandardMaterial({
      color: '#060709',
      roughness: 0.88,
      metalness: 0.05,
    });
    const backWallMesh = new THREE.Mesh(backWallGeo, backWallMat);
    backWallMesh.position.set(-6.0, 7.5, -24.0);
    corridorRig.add(backWallMesh);
    disposables.push(backWallGeo, backWallMat);

    // -----------------------------------------------------------------------
    // C. RIGHT ARCHITECTURAL WALL & 10 GEOMETRICALLY-SPACED LOUVER FINS
    // -----------------------------------------------------------------------
    const rightWallAngle = THREE.MathUtils.degToRad(20.0); // Rotated ~20° toward depth axis

    // 10 Layered Metallic Louver Fins with Geometric/Exponential Spacing Law (r ≈ 1.14)
    const numFins = 10;
    const finBaseHeight = 0.55;
    let currentY = 0.4;

    for (let i = 0; i < numFins; i++) {
      const finHeight = finBaseHeight * Math.pow(1.14, i);
      const finY = currentY + finHeight / 2;
      currentY += finHeight + 0.12; // Gap between fins

      const finLength = 88;

      // 3D Fin Slab Body
      const finGeo = new THREE.BoxGeometry(1.8, finHeight * 0.75, finLength);
      const finMat = new THREE.MeshStandardMaterial({
        color: '#0a0c10',
        roughness: 0.20,
        metalness: 0.92,
      });
      const finMesh = new THREE.Mesh(finGeo, finMat);
      finMesh.rotation.y = -Math.PI / 2 + rightWallAngle;
      finMesh.position.set(18.2 - Math.sin(rightWallAngle) * 5.0, finY, -20.0);
      corridorRig.add(finMesh);
      disposables.push(finGeo, finMat);

      // Specular Top Edge Bevel catching grazing light
      const edgeGeo = new THREE.BoxGeometry(0.06, 0.04, finLength);
      const edgeMat = new THREE.MeshStandardMaterial({
        color: '#ffffff',
        roughness: 0.02,
        metalness: 0.99,
        emissive: '#ffffff',
        emissiveIntensity: 0.75 + (i / numFins) * 0.6,
      });
      const edgeMesh = new THREE.Mesh(edgeGeo, edgeMat);
      edgeMesh.rotation.y = -Math.PI / 2 + rightWallAngle;
      edgeMesh.position.set(17.2 - Math.sin(rightWallAngle) * 5.0, finY + (finHeight * 0.75) / 2, -20.0);
      corridorRig.add(edgeMesh);
      disposables.push(edgeGeo, edgeMat);
    }

    // Dominant Upper Right Silver Structural Blade (Top Boundary Slanted at 71.3°)
    const bladeGeo = new THREE.BoxGeometry(0.35, 0.35, 90);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      emissive: '#ffffff',
      emissiveIntensity: 1.8,
      roughness: 0.02,
      metalness: 0.99,
    });
    const bladeMesh = new THREE.Mesh(bladeGeo, bladeMat);
    bladeMesh.rotation.y = -Math.PI / 2 + rightWallAngle;
    bladeMesh.position.set(16.5 - Math.sin(rightWallAngle) * 5.0, currentY + 0.5, -20.0);
    corridorRig.add(bladeMesh);
    disposables.push(bladeGeo, bladeMat);

    // -----------------------------------------------------------------------
    // D. MAIN GOLDEN HORIZON LASER STRIP (Longitudinal Line from y ≈ 548 to V)
    // -----------------------------------------------------------------------
    // High-Intensity Laser Filament
    const horizonCoreGeo = new THREE.BoxGeometry(50, 0.06, 0.06);
    const horizonCoreMat = new THREE.MeshBasicMaterial({ color: '#ffffff' });
    const horizonCoreMesh = new THREE.Mesh(horizonCoreGeo, horizonCoreMat);
    horizonCoreMesh.position.set(0, 0.85, -16.0);
    corridorRig.add(horizonCoreMesh);
    disposables.push(horizonCoreGeo, horizonCoreMat);

    // Radiant Gold Bloom Strip
    const bloomCanvas = document.createElement('canvas');
    bloomCanvas.width = 512;
    bloomCanvas.height = 128;
    const bctx = bloomCanvas.getContext('2d')!;
    const bgrad = bctx.createLinearGradient(0, 0, 0, 128);
    bgrad.addColorStop(0, 'rgba(236, 208, 142, 0)');
    bgrad.addColorStop(0.5, 'rgba(236, 208, 142, 0.95)');
    bgrad.addColorStop(1, 'rgba(236, 208, 142, 0)');
    bctx.fillStyle = bgrad;
    bctx.fillRect(0, 0, 512, 128);

    const bloomTex = new THREE.CanvasTexture(bloomCanvas);
    bloomTex.colorSpace = THREE.SRGBColorSpace;
    disposables.push(bloomTex);

    const horizonGlowGeo = new THREE.PlaneGeometry(50, 0.85);
    const horizonGlowMat = new THREE.MeshBasicMaterial({
      map: bloomTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.92,
    });
    const horizonGlowMesh = new THREE.Mesh(horizonGlowGeo, horizonGlowMat);
    horizonGlowMesh.position.set(0, 0.85, -16.02);
    corridorRig.add(horizonGlowMesh);
    disposables.push(horizonGlowGeo, horizonGlowMat);

    // Upper Diagonal Champagne Velocity Slash
    const slashGeo = new THREE.BoxGeometry(45, 0.04, 0.04);
    const slashMat = new THREE.MeshStandardMaterial({
      color: '#ecd08e',
      emissive: '#ecd08e',
      emissiveIntensity: 2.6,
    });
    const slashMesh = new THREE.Mesh(slashGeo, slashMat);
    slashMesh.position.set(-6, 5.2, -18.0);
    slashMesh.rotation.z = -0.055;
    corridorRig.add(slashMesh);
    disposables.push(slashGeo, slashMat);

    // 6. RENDER LOOP
    const animate = () => {
      if (isDisposed) return;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // 7. RESIZE HANDLER
    const handleResize = () => {
      if (!container || isDisposed) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
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
      className={`act2-true-renderer absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden ${className}`}
    />
  );
};

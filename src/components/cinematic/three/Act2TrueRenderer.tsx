import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Act2TrueRendererProps {
  className?: string;
}

/**
 * EXACT MATHEMATICAL ONE-POINT PERSPECTIVE SYSTEM (Per Blueprint media_1787056960368.png)
 * 
 * Units: METERS
 * Camera Height: 1.70 m (Eye Level / Horizon Line)
 * Vanishing Point (VP): (24.00, 1.70, -24.00)
 * Right Wall Width: 6.00 m
 * Depth to VP (along -Z): 24.00 m
 * Key Ratios: Depth : Width = 24 : 6 = 4 : 1
 * Back Wall Top Drop: 7.26° (sloping from top-left into VP)
 * Right Wall Inclination: 65.00° (base angle 25.00°)
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

    // 1. SCENE SETUP
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#050608');
    scene.fog = new THREE.FogExp2('#050608', 0.012);

    // 2. CAMERA (Eye Level y = 1.70 m, looking toward the corridor)
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 200);
    camera.position.set(0, 1.70, 6.0); // Viewer at origin, eye level 1.70m, offset 6m back along +Z
    camera.lookAt(new THREE.Vector3(12.0, 1.70, -14.0)); // Oriented toward vanishing corridor

    // 3. WEBGL RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 4. LIGHTING SYSTEM (Controlled Cinematic Grazing Lights)
    const ambientLight = new THREE.AmbientLight('#0a0c10', 0.35);
    scene.add(ambientLight);

    // Grazing key light for the right wall slats
    const rightWallKeyLight = new THREE.DirectionalLight('#ffffff', 4.5);
    rightWallKeyLight.position.set(28, 16, 8);
    scene.add(rightWallKeyLight);

    // Warm fill for floor and back wall
    const warmFill = new THREE.DirectionalLight('#ecd08e', 1.8);
    warmFill.position.set(-10, 8, 4);
    scene.add(warmFill);

    // Horizon Vanishing Point Accent Light
    const vpLight = new THREE.PointLight('#ecd08e', 3.5, 40);
    vpLight.position.set(24.0, 1.70, -24.0);
    scene.add(vpLight);

    // =======================================================================
    // 5. MATHEMATICAL PERSPECTIVE GEOMETRY (HARDCORE BLUEPRINT IMPLEMENTATION)
    // =======================================================================
    const envRig = new THREE.Group();
    scene.add(envRig);

    const VP = new THREE.Vector3(24.0, 1.70, -24.0);

    // -----------------------------------------------------------------------
    // A. FLOOR PLANE (y = 0, Normal (0, 1, 0))
    // -----------------------------------------------------------------------
    const floorGeo = new THREE.PlaneGeometry(80, 80);
    const floorMat = new THREE.MeshStandardMaterial({
      color: '#08090b',
      roughness: 0.14,
      metalness: 0.88,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.set(12.0, 0, -12.0);
    envRig.add(floorMesh);
    disposables.push(floorGeo, floorMat);

    // Subtle Architectural Floor Grid
    const gridHelper = new THREE.GridHelper(80, 40, '#22252e', '#111318');
    gridHelper.position.set(12.0, 0.005, -12.0);
    envRig.add(gridHelper);
    disposables.push(gridHelper.geometry, gridHelper.material as THREE.Material);

    // Floor Perspective Speed Rails converging into Floor VP (24.0, 0, -24.0)
    const floorRailOffsets = [-18, -12, -6, 0, 5, 11, 16, 20, 23.5];
    floorRailOffsets.forEach((xStart, idx) => {
      const startPt = new THREE.Vector3(xStart, 0.01, 8.0);
      const endPt = new THREE.Vector3(24.0, 0.01, -24.0);
      
      const lineDir = endPt.clone().sub(startPt);
      const lineLength = lineDir.length();
      const midPoint = startPt.clone().add(lineDir.clone().multiplyScalar(0.5));

      const isGold = idx === 4 || idx === 5;
      const railWidth = isGold ? 0.08 : 0.04;
      const railColor = isGold ? '#ecd08e' : (idx % 2 === 0 ? '#ffffff' : '#555b68');
      const railEmissive = isGold ? 2.5 : (idx % 2 === 0 ? 0.8 : 0.2);

      const railGeo = new THREE.BoxGeometry(railWidth, 0.01, lineLength);
      const railMat = new THREE.MeshStandardMaterial({
        color: railColor,
        emissive: railColor,
        emissiveIntensity: railEmissive,
        roughness: 0.05,
        metalness: 0.95,
      });
      const railMesh = new THREE.Mesh(railGeo, railMat);
      railMesh.position.copy(midPoint);
      railMesh.lookAt(endPt);
      envRig.add(railMesh);
      disposables.push(railGeo, railMat);
    });

    // -----------------------------------------------------------------------
    // B. BACK / LEFT WALL PLANE (Sloping Down at 7.26° to VP)
    // -----------------------------------------------------------------------
    // Top-left start at x = -10, y = 5.2, z = -10 -> sloping into VP (24.0, 1.70, -24.0)
    const wallStartPt = new THREE.Vector3(-14.0, 5.8, 8.0);
    const wallEndPt = VP.clone();

    // Wall Plane vertices
    const wallGeo = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      // Triangle 1
      wallStartPt.x, wallStartPt.y, wallStartPt.z,  // Top Left
      wallStartPt.x, 0, wallStartPt.z,              // Bottom Left
      wallEndPt.x, 0, wallEndPt.z,                  // Bottom Right (VP at floor)
      // Triangle 2
      wallStartPt.x, wallStartPt.y, wallStartPt.z,  // Top Left
      wallEndPt.x, 0, wallEndPt.z,                  // Bottom Right (VP at floor)
      wallEndPt.x, wallEndPt.y, wallEndPt.z,        // Top Right (VP)
    ]);
    wallGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    wallGeo.computeVertexNormals();

    const wallMat = new THREE.MeshStandardMaterial({
      color: '#07080a',
      roughness: 0.35,
      metalness: 0.75,
      side: THREE.DoubleSide,
    });
    const backWallMesh = new THREE.Mesh(wallGeo, wallMat);
    envRig.add(backWallMesh);
    disposables.push(wallGeo, wallMat);

    // Wall Top Edge Structural Trim (Sloping at 7.26°)
    const topEdgeDir = wallEndPt.clone().sub(wallStartPt);
    const topEdgeLen = topEdgeDir.length();
    const topEdgeMid = wallStartPt.clone().add(topEdgeDir.clone().multiplyScalar(0.5));

    const topEdgeGeo = new THREE.BoxGeometry(0.08, 0.08, topEdgeLen);
    const topEdgeMat = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      emissive: '#ffffff',
      emissiveIntensity: 0.6,
      roughness: 0.05,
      metalness: 0.98,
    });
    const topEdgeMesh = new THREE.Mesh(topEdgeGeo, topEdgeMat);
    topEdgeMesh.position.copy(topEdgeMid);
    topEdgeMesh.lookAt(wallEndPt);
    envRig.add(topEdgeMesh);
    disposables.push(topEdgeGeo, topEdgeMat);

    // -----------------------------------------------------------------------
    // C. RIGHT WALL PLANE (Inclined at 65°, Width 6.00 m, Converging to VP)
    // -----------------------------------------------------------------------
    // Right wall starts at front x = 24.0 + 6.0 = 30.0m at z = 8.0m, sloping up to y = 14.0m
    const rightWallFrontBottom = new THREE.Vector3(30.0, 0, 8.0);
    const rightWallFrontTop = new THREE.Vector3(26.0, 14.0, 8.0);
    const rightWallVP = VP.clone();

    // 16 Metallic Louvers/Slat Rays Converging into VP
    const numSlats = 16;
    for (let i = 0; i < numSlats; i++) {
      const t = i / (numSlats - 1);
      // Interpolate along the front edge of the inclined right wall
      const slatFront = rightWallFrontBottom.clone().lerp(rightWallFrontTop, t);
      const slatBack = rightWallVP.clone();

      const slatDir = slatBack.clone().sub(slatFront);
      const slatLen = slatDir.length();
      const slatMid = slatFront.clone().add(slatDir.clone().multiplyScalar(0.5));

      // 3D Slat Mesh
      const slatGeo = new THREE.BoxGeometry(0.35, 0.06, slatLen);
      const slatMat = new THREE.MeshStandardMaterial({
        color: '#0b0c10',
        roughness: 0.16,
        metalness: 0.94,
      });
      const slatMesh = new THREE.Mesh(slatGeo, slatMat);
      slatMesh.position.copy(slatMid);
      slatMesh.lookAt(slatBack);
      envRig.add(slatMesh);
      disposables.push(slatGeo, slatMat);

      // Specular Top Edge Bevel
      const edgeGeo = new THREE.BoxGeometry(0.04, 0.02, slatLen);
      const edgeMat = new THREE.MeshStandardMaterial({
        color: '#ffffff',
        roughness: 0.02,
        metalness: 0.99,
        emissive: '#ffffff',
        emissiveIntensity: 0.8 + (1 - t) * 0.4,
      });
      const edgeMesh = new THREE.Mesh(edgeGeo, edgeMat);
      edgeMesh.position.copy(slatMid).add(new THREE.Vector3(-0.05, 0.03, 0));
      edgeMesh.lookAt(slatBack);
      envRig.add(edgeMesh);
      disposables.push(edgeGeo, edgeMat);
    }

    // Dominant Upper Right Silver Blade (Top Rim of Right Wall)
    const bladeFront = rightWallFrontTop.clone();
    const bladeBack = rightWallVP.clone();
    const bladeDir = bladeBack.clone().sub(bladeFront);
    const bladeLen = bladeDir.length();
    const bladeMid = bladeFront.clone().add(bladeDir.clone().multiplyScalar(0.5));

    const bladeGeo = new THREE.BoxGeometry(0.24, 0.24, bladeLen);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      emissive: '#ffffff',
      emissiveIntensity: 1.8,
      roughness: 0.02,
      metalness: 0.99,
    });
    const bladeMesh = new THREE.Mesh(bladeGeo, bladeMat);
    bladeMesh.position.copy(bladeMid);
    bladeMesh.lookAt(bladeBack);
    envRig.add(bladeMesh);
    disposables.push(bladeGeo, bladeMat);

    // -----------------------------------------------------------------------
    // D. HORIZON LINE (EYE LEVEL y = 1.70 m) & GOLD LASER BEAM
    // -----------------------------------------------------------------------
    // Golden Laser Beam along Eye Level
    const horizonGeo = new THREE.BoxGeometry(60, 0.04, 0.04);
    const horizonMat = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      emissive: '#ecd08e',
      emissiveIntensity: 3.5,
      roughness: 0.05,
      metalness: 0.95,
    });
    const horizonMesh = new THREE.Mesh(horizonGeo, horizonMat);
    horizonMesh.position.set(6.0, 1.70, -12.0);
    envRig.add(horizonMesh);
    disposables.push(horizonGeo, horizonMat);

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

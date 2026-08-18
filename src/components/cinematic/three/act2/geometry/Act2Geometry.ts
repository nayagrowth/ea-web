import * as THREE from 'three';

export interface Act2GeometryRig {
  group: THREE.Group;
  disposables: Array<{ dispose: () => void }>;
  keyLongitudinalLines: Array<{ p0: THREE.Vector3; p1: THREE.Vector3; name: string }>;
}

/**
 * Builds the mathematically pure 3D Euclidean corridor
 * All longitudinal rails, slats, and trims are EXACTLY parallel to D = (0, 0, -1)
 */
export function createAct2Geometry(): Act2GeometryRig {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];
  const keyLongitudinalLines: Array<{ p0: THREE.Vector3; p1: THREE.Vector3; name: string }> = [];

  const corridorDepthStart = 8.0;
  const corridorDepthEnd = -45.0;
  const corridorLength = corridorDepthStart - corridorDepthEnd;
  const midZ = (corridorDepthStart + corridorDepthEnd) / 2;

  // -------------------------------------------------------------------------
  // 1. FLOOR PLANE (Π_F: Y = 0, Normal (0, 1, 0))
  // -------------------------------------------------------------------------
  const floorGeo = new THREE.PlaneGeometry(35, corridorLength);
  const floorMat = new THREE.MeshStandardMaterial({
    color: '#08090b',
    roughness: 0.22,
    metalness: 0.35,
  });
  const floorMesh = new THREE.Mesh(floorGeo, floorMat);
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.position.set(-1.0, 0, midZ);
  group.add(floorMesh);
  disposables.push(floorGeo, floorMat);

  // Broad subtle reflective panels with shallow elevation
  const floorPanels = [
    { x: -10, width: 6, roughness: 0.26, color: '#07080a' },
    { x: -3, width: 7, roughness: 0.18, color: '#090b0f' },
    { x: 3.5, width: 4.5, roughness: 0.22, color: '#0a0c12' },
  ];

  floorPanels.forEach((p, idx) => {
    const pGeo = new THREE.PlaneGeometry(p.width, corridorLength);
    const pMat = new THREE.MeshStandardMaterial({
      color: p.color,
      roughness: p.roughness,
      metalness: 0.40,
    });
    const pMesh = new THREE.Mesh(pGeo, pMat);
    pMesh.rotation.x = -Math.PI / 2;
    pMesh.position.set(p.x, 0.001 + idx * 0.0005, midZ);
    group.add(pMesh);
    disposables.push(pGeo, pMat);
  });

  // Longitudinal Floor Speed Rails (All exactly parallel to D = (0, 0, -1))
  const railXPositions = [
    { x: -11.5, width: 0.04, color: '#ffffff', emissive: 0.4, isGold: false },
    { x: -6.5, width: 0.03, color: '#555b68', emissive: 0.2, isGold: false },
    { x: -1.2, width: 0.05, color: '#ffffff', emissive: 0.7, isGold: false },
    { x: 2.2, width: 0.08, color: '#ecd08e', emissive: 2.6, isGold: true },  // Champagne Gold
    { x: 3.8, width: 0.10, color: '#dfbd78', emissive: 3.2, isGold: true },  // Champagne Gold
    { x: 4.85, width: 0.06, color: '#ffffff', emissive: 1.2, isGold: false },
  ];

  railXPositions.forEach((r, idx) => {
    const railGeo = new THREE.BoxGeometry(r.width, 0.012, corridorLength);
    const railMat = new THREE.MeshStandardMaterial({
      color: r.color,
      emissive: r.color,
      emissiveIntensity: r.emissive,
      roughness: 0.05,
      metalness: 0.95,
    });
    const railMesh = new THREE.Mesh(railGeo, railMat);
    railMesh.position.set(r.x, 0.006, midZ);
    group.add(railMesh);
    disposables.push(railGeo, railMat);

    keyLongitudinalLines.push({
      p0: new THREE.Vector3(r.x, 0.006, corridorDepthStart),
      p1: new THREE.Vector3(r.x, 0.006, corridorDepthEnd),
      name: `FloorRail_${idx + 1}_x${r.x}`,
    });
  });

  // -------------------------------------------------------------------------
  // 2. LEFT / BACK ARCHITECTURAL MASS (Π_L: Matte Dark Absorptive Plane)
  // -------------------------------------------------------------------------
  const backShellGeo = new THREE.PlaneGeometry(30, 20);
  const backShellMat = new THREE.MeshStandardMaterial({
    color: '#050608',
    roughness: 0.90,
    metalness: 0.02,
  });
  const backShellMesh = new THREE.Mesh(backShellGeo, backShellMat);
  backShellMesh.position.set(-8.0, 7.5, -28.0);
  group.add(backShellMesh);
  disposables.push(backShellGeo, backShellMat);

  // -------------------------------------------------------------------------
  // 3. RIGHT ARCHITECTURAL WALL (Π_R: X = 5.0, All Fins Parallel to D)
  // -------------------------------------------------------------------------
  const wallX = 5.0;

  // Wall Backplane Mesh at X = 5.0
  const wallBackGeo = new THREE.PlaneGeometry(corridorLength, 12);
  const wallBackMat = new THREE.MeshStandardMaterial({
    color: '#060709',
    roughness: 0.45,
    metalness: 0.75,
  });
  const wallBackMesh = new THREE.Mesh(wallBackGeo, wallBackMat);
  wallBackMesh.rotation.y = -Math.PI / 2;
  wallBackMesh.position.set(wallX + 0.02, 5.0, midZ);
  group.add(wallBackMesh);
  disposables.push(wallBackGeo, wallBackMat);

  // 10 Geometrically Spaced 3D Louver Fins (All attached to Π_R at X = 5.0, extending along -Z)
  const finYPositions = [0.25, 0.70, 1.20, 1.77, 2.41, 3.12, 3.90, 4.75, 5.67, 6.65];

  finYPositions.forEach((yPos, idx) => {
    const finHeight = 0.08 + idx * 0.025;
    const finWidth = 0.18; // thickness projecting into corridor

    // Fin Main Body (Dark Metallic)
    const finGeo = new THREE.BoxGeometry(finWidth, finHeight, corridorLength);
    const finMat = new THREE.MeshStandardMaterial({
      color: '#0a0c10',
      roughness: 0.18,
      metalness: 0.92,
    });
    const finMesh = new THREE.Mesh(finGeo, finMat);
    finMesh.position.set(wallX - finWidth / 2, yPos, midZ);
    group.add(finMesh);
    disposables.push(finGeo, finMat);

    // Specular Top Edge Bevel (Catching grazing key light)
    const edgeGeo = new THREE.BoxGeometry(0.025, 0.02, corridorLength);
    const edgeMat = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      roughness: 0.02,
      metalness: 0.99,
      emissive: '#ffffff',
      emissiveIntensity: 0.7 + (idx / finYPositions.length) * 0.5,
    });
    const edgeMesh = new THREE.Mesh(edgeGeo, edgeMat);
    edgeMesh.position.set(wallX - finWidth + 0.012, yPos + finHeight / 2, midZ);
    group.add(edgeMesh);
    disposables.push(edgeGeo, edgeMat);

    keyLongitudinalLines.push({
      p0: new THREE.Vector3(wallX - finWidth, yPos + finHeight / 2, corridorDepthStart),
      p1: new THREE.Vector3(wallX - finWidth, yPos + finHeight / 2, corridorDepthEnd),
      name: `WallFin_${idx + 1}_y${yPos}`,
    });
  });

  // Dominant Upper Right Silver Structural Blade (Top Boundary at Y = 7.45)
  const bladeWidth = 0.22;
  const bladeGeo = new THREE.BoxGeometry(bladeWidth, 0.22, corridorLength);
  const bladeMat = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    emissive: '#ffffff',
    emissiveIntensity: 1.8,
    roughness: 0.02,
    metalness: 0.99,
  });
  const bladeMesh = new THREE.Mesh(bladeGeo, bladeMat);
  bladeMesh.position.set(wallX - bladeWidth / 2, 7.45, midZ);
  group.add(bladeMesh);
  disposables.push(bladeGeo, bladeMat);

  keyLongitudinalLines.push({
    p0: new THREE.Vector3(wallX - bladeWidth, 7.45, corridorDepthStart),
    p1: new THREE.Vector3(wallX - bladeWidth, 7.45, corridorDepthEnd),
    name: 'TopSilverBlade',
  });

  // -------------------------------------------------------------------------
  // 4. MAIN GOLDEN HORIZON EMITTER (Along Floor Seam Y = 0.01, Parallel to D)
  // -------------------------------------------------------------------------
  const laserGeo = new THREE.BoxGeometry(0.04, 0.04, corridorLength);
  const laserMat = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    emissive: '#ecd08e',
    emissiveIntensity: 3.5,
    roughness: 0.05,
    metalness: 0.95,
  });
  const laserMesh = new THREE.Mesh(laserGeo, laserMat);
  laserMesh.position.set(3.8, 0.02, midZ);
  group.add(laserMesh);
  disposables.push(laserGeo, laserMat);

  return {
    group,
    disposables,
    keyLongitudinalLines,
  };
}

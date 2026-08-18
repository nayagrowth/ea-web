import * as THREE from 'three';

export interface Act2GeometryRig {
  group: THREE.Group;
  disposables: Array<{ dispose: () => void }>;
  keyLongitudinalLines: Array<{ p0: THREE.Vector3; p1: THREE.Vector3; name: string }>;
}

/**
 * EXACT ARCHITECTURAL ROOM SHELL & CORRIDOR (CALIBRATED WITH EXPANDED HERO WALL)
 * 
 * Boundaries:
 * - Floor Plane Π_F: Y = 0, X in [-7.5, 5], Z in [-5, -95]
 * - Left Hero Wall Π_L: X = -7.5, Y in [0, 14.6], Z in [-5, -95] (comes slightly closer for mounting text)
 * - Right Rib Wall Π_R: X = 5, Y in [0, 14.7], Z in [-5, -95], Top Blade Y = 14.55
 * - Ceiling Π_C: Y = 14.6, X in [-7.5, 5], Z in [-5, -95]
 */
export function createAct2Geometry(): Act2GeometryRig {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];
  const keyLongitudinalLines: Array<{ p0: THREE.Vector3; p1: THREE.Vector3; name: string }> = [];

  const zStart = -5.0;
  const zEnd = -95.0;
  const corridorLength = Math.abs(zEnd - zStart); // 90 units
  const midZ = (zStart + zEnd) / 2; // -50.0

  const wallLeftX = -7.5;
  const wallRightX = 5.0;
  const ceilingY = 14.6;

  // -------------------------------------------------------------------------
  // 1. FLOOR PLANE (Π_F: Y = 0, X in [-7.5, 5])
  // -------------------------------------------------------------------------
  const floorWidth = wallRightX - wallLeftX; // 12.5 units
  const floorMidX = (wallLeftX + wallRightX) / 2; // -1.25

  const floorGeo = new THREE.PlaneGeometry(floorWidth, corridorLength);
  const floorMat = new THREE.MeshStandardMaterial({
    color: '#08090b',
    roughness: 0.20,
    metalness: 0.38,
  });
  const floorMesh = new THREE.Mesh(floorGeo, floorMat);
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.position.set(floorMidX, 0, midZ);
  group.add(floorMesh);
  disposables.push(floorGeo, floorMat);

  // Subtle dark-silver floor panels with slight roughness variation
  const floorPanels = [
    { x: -5.5, width: 3.5, roughness: 0.26, color: '#07080a' },
    { x: -1.8, width: 4.0, roughness: 0.18, color: '#090b0f' },
    { x: 2.6, width: 4.5, roughness: 0.22, color: '#0a0c12' },
  ];

  floorPanels.forEach((p, idx) => {
    const pGeo = new THREE.PlaneGeometry(p.width, corridorLength);
    const pMat = new THREE.MeshStandardMaterial({
      color: p.color,
      roughness: p.roughness,
      metalness: 0.42,
    });
    const pMesh = new THREE.Mesh(pGeo, pMat);
    pMesh.rotation.x = -Math.PI / 2;
    pMesh.position.set(p.x, 0.001 + idx * 0.0005, midZ);
    group.add(pMesh);
    disposables.push(pGeo, pMat);
  });

  // Longitudinal Floor Speed Rails (All parallel to D = (0, 0, -1))
  const railXPositions = [
    { x: -6.5, width: 0.04, color: '#ffffff', emissive: 0.4 },
    { x: -4.2, width: 0.03, color: '#555b68', emissive: 0.2 },
    { x: -0.8, width: 0.05, color: '#ffffff', emissive: 0.7 },
    { x: 2.2, width: 0.08, color: '#ecd08e', emissive: 2.6 },  // Champagne Gold
    { x: 3.8, width: 0.10, color: '#dfbd78', emissive: 3.2 },  // Champagne Gold
    { x: 4.85, width: 0.06, color: '#ffffff', emissive: 1.2 },
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
      p0: new THREE.Vector3(r.x, 0.006, zStart),
      p1: new THREE.Vector3(r.x, 0.006, zEnd),
      name: `FloorRail_${idx + 1}_x${r.x}`,
    });
  });

  // -------------------------------------------------------------------------
  // 2. LEFT HERO WALL (Π_L: X = -7.5, Receding longitudinally from z = -5 to -95)
  // -------------------------------------------------------------------------
  const leftWallGeo = new THREE.PlaneGeometry(corridorLength, ceilingY);
  const leftWallMat = new THREE.MeshStandardMaterial({
    color: '#090a0d',
    roughness: 0.74,
    metalness: 0.10,
  });
  const leftWallMesh = new THREE.Mesh(leftWallGeo, leftWallMat);
  leftWallMesh.rotation.y = Math.PI / 2; // Normal faces into corridor (+X)
  leftWallMesh.position.set(wallLeftX, ceilingY / 2, midZ);
  group.add(leftWallMesh);
  disposables.push(leftWallGeo, leftWallMat);

  // Left Wall/Floor Seam Trim Line (at X = -7.5, Y = 0.01)
  keyLongitudinalLines.push({
    p0: new THREE.Vector3(wallLeftX, 0.01, zStart),
    p1: new THREE.Vector3(wallLeftX, 0.01, zEnd),
    name: 'LeftWallFloorSeam',
  });

  // -------------------------------------------------------------------------
  // 3. RIGHT STRUCTURAL WALL & 13 METALLIC LOUVER FINS (Π_R: X = 5.0)
  // -------------------------------------------------------------------------
  // Wall Backplane at X = 5.0
  const rightWallGeo = new THREE.PlaneGeometry(corridorLength, ceilingY + 0.2);
  const rightWallMat = new THREE.MeshStandardMaterial({
    color: '#060709',
    roughness: 0.40,
    metalness: 0.80,
  });
  const rightWallMesh = new THREE.Mesh(rightWallGeo, rightWallMat);
  rightWallMesh.rotation.y = -Math.PI / 2; // Normal faces into corridor (-X)
  rightWallMesh.position.set(wallRightX + 0.02, ceilingY / 2, midZ);
  group.add(rightWallMesh);
  disposables.push(rightWallGeo, rightWallMat);

  // 13 Calibrated Fin Heights spanning Y in [1.5, 13.5]
  const finYPositions = [1.5, 2.4, 2.9, 3.8, 4.6, 5.0, 6.0, 7.0, 8.0, 9.0, 10.3, 11.9, 13.5];

  finYPositions.forEach((yPos, idx) => {
    const finHeight = 0.09 + (idx / finYPositions.length) * 0.08;
    const finWidth = 0.22; // Thickness into corridor

    // Fin Main Body (Dark Metallic Slab)
    const finGeo = new THREE.BoxGeometry(finWidth, finHeight, corridorLength);
    const finMat = new THREE.MeshStandardMaterial({
      color: '#0a0c10',
      roughness: 0.18,
      metalness: 0.92,
    });
    const finMesh = new THREE.Mesh(finGeo, finMat);
    finMesh.position.set(wallRightX - finWidth / 2, yPos, midZ);
    group.add(finMesh);
    disposables.push(finGeo, finMat);

    // Specular Top Edge Bevel (Catches grazing key light)
    const edgeGeo = new THREE.BoxGeometry(0.025, 0.02, corridorLength);
    const edgeMat = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      roughness: 0.02,
      metalness: 0.99,
      emissive: '#ffffff',
      emissiveIntensity: 0.7 + (idx / finYPositions.length) * 0.6,
    });
    const edgeMesh = new THREE.Mesh(edgeGeo, edgeMat);
    edgeMesh.position.set(wallRightX - finWidth + 0.012, yPos + finHeight / 2, midZ);
    group.add(edgeMesh);
    disposables.push(edgeGeo, edgeMat);

    keyLongitudinalLines.push({
      p0: new THREE.Vector3(wallRightX - finWidth, yPos + finHeight / 2, zStart),
      p1: new THREE.Vector3(wallRightX - finWidth, yPos + finHeight / 2, zEnd),
      name: `WallFin_${idx + 1}_y${yPos}`,
    });
  });

  // Dominant Outer Silver Structural Blade (Top Boundary at Y = 14.55)
  const bladeY = 14.55;
  const bladeWidth = 0.26;
  const bladeGeo = new THREE.BoxGeometry(bladeWidth, 0.26, corridorLength);
  const bladeMat = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    emissive: '#ffffff',
    emissiveIntensity: 2.2,
    roughness: 0.02,
    metalness: 0.99,
  });
  const bladeMesh = new THREE.Mesh(bladeGeo, bladeMat);
  bladeMesh.position.set(wallRightX - bladeWidth / 2, bladeY, midZ);
  group.add(bladeMesh);
  disposables.push(bladeGeo, bladeMat);

  keyLongitudinalLines.push({
    p0: new THREE.Vector3(wallRightX - bladeWidth, bladeY, zStart),
    p1: new THREE.Vector3(wallRightX - bladeWidth, bladeY, zEnd),
    name: 'TopSilverBlade',
  });

  // -------------------------------------------------------------------------
  // 4. CEILING PLANE (Π_C: Y = 14.6, Dark Matte Absorber)
  // -------------------------------------------------------------------------
  const ceilingGeo = new THREE.PlaneGeometry(floorWidth, corridorLength);
  const ceilingMat = new THREE.MeshStandardMaterial({
    color: '#040507',
    roughness: 0.95,
    metalness: 0.02,
  });
  const ceilingMesh = new THREE.Mesh(ceilingGeo, ceilingMat);
  ceilingMesh.rotation.x = Math.PI / 2; // Normal faces down (-Y)
  ceilingMesh.position.set(floorMidX, ceilingY, midZ);
  group.add(ceilingMesh);
  disposables.push(ceilingGeo, ceilingMat);

  // -------------------------------------------------------------------------
  // 5. MAIN GOLDEN HORIZON EMITTER (Along Floor Seam Y = 0.02, Parallel to D)
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

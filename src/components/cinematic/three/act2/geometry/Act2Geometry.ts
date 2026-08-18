import * as THREE from 'three';
import { REFERENCE_GEOMETRY } from '../constants/referenceGeometry';

export interface Act2GeometryRig {
  group: THREE.Group;
  disposables: Array<{ dispose: () => void }>;
  keyLongitudinalLines: Array<{ p0: THREE.Vector3; p1: THREE.Vector3; name: string }>;
}

/**
 * Converts a screen-space target ray through the measured VP into the world Y
 * needed for a longitudinal line at a fixed world X.
 *
 * For D = (0, 0, -1), screen slope m satisfies:
 *   m = -(Y - cameraY) / X
 * therefore:
 *   Y = cameraY - mX
 */
function worldYForReferenceRay(
  worldX: number,
  targetImageX: number,
  targetImageY: number
): number {
  const ref = REFERENCE_GEOMETRY;
  const slope =
    (targetImageY - ref.vpPx.y) /
    (targetImageX - ref.vpPx.x);

  return ref.camera.position.y - slope * worldX;
}

/**
 * Final geometry-first Act 2 environment sweep.
 *
 * Invariants:
 * - all structural depth rails are exactly parallel to D = (0, 0, -1);
 * - no front-facing end cap;
 * - no fake per-line perspective rotations;
 * - reference VP is immutable;
 * - the visible right-wall ray family is fitted to source-image anchors;
 * - every major mesh is named so later GSAP / shader animation can address it.
 */
export function createAct2Geometry(): Act2GeometryRig {
  const group = new THREE.Group();
  group.name = 'Act2Environment';

  const disposables: Array<{ dispose: () => void }> = [];
  const keyLongitudinalLines: Array<{ p0: THREE.Vector3; p1: THREE.Vector3; name: string }> = [];

  const zStart = -5.0;
  const zEnd = -95.0;
  const corridorLength = Math.abs(zEnd - zStart);
  const midZ = (zStart + zEnd) / 2;

  const wallLeftX = -7.5;
  const wallRightX = 5.0;
  const ceilingY = 14.6;

  const floorWidth = wallRightX - wallLeftX;
  const floorMidX = (wallLeftX + wallRightX) / 2;

  // -------------------------------------------------------------------------
  // 1. FLOOR
  // -------------------------------------------------------------------------
  const floorGeo = new THREE.PlaneGeometry(floorWidth, corridorLength, 10, 48);
  const floorMat = new THREE.MeshStandardMaterial({
    color: '#07080a',
    roughness: 0.24,
    metalness: 0.34,
  });
  const floorMesh = new THREE.Mesh(floorGeo, floorMat);
  floorMesh.name = 'Act2_Floor_Main';
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.position.set(floorMidX, 0, midZ);
  group.add(floorMesh);
  disposables.push(floorGeo, floorMat);

  // Broad, almost invisible floor material zones. These create reflective
  // variation without drawing visible "design lines".
  const floorPanels = [
    { x: -5.45, width: 3.7, roughness: 0.30, color: '#060709' },
    { x: -1.65, width: 3.9, roughness: 0.19, color: '#090b0e' },
    { x: 2.55, width: 4.5, roughness: 0.23, color: '#0a0c10' },
  ];

  floorPanels.forEach((p, idx) => {
    const geo = new THREE.PlaneGeometry(p.width, corridorLength, 2, 40);
    const mat = new THREE.MeshStandardMaterial({
      color: p.color,
      roughness: p.roughness,
      metalness: 0.38,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.name = `Act2_Floor_Panel_${idx + 1}`;
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(p.x, 0.001 + idx * 0.0005, midZ);
    group.add(mesh);
    disposables.push(geo, mat);
  });

  // Source-inspired floor rail family. Negative-X rails enter from the lower
  // left; positive-X rails live to the right of the VP.
  const floorRails = [
    { x: -7.0, width: 0.025, color: '#3c414b', emissive: 0.10 },
    { x: -4.55, width: 0.032, color: '#c7ccd3', emissive: 0.24 },
    { x: -2.05, width: 0.055, color: '#d8b665', emissive: 1.55 },
    { x: -0.72, width: 0.024, color: '#4b505a', emissive: 0.14 },
    { x: 0.95, width: 0.035, color: '#aa8946', emissive: 0.42 },
    { x: 2.95, width: 0.030, color: '#555b64', emissive: 0.18 },
    { x: 4.55, width: 0.045, color: '#e8ebef', emissive: 0.55 },
  ];

  floorRails.forEach((r, idx) => {
    const geo = new THREE.BoxGeometry(r.width, 0.010, corridorLength);
    const mat = new THREE.MeshStandardMaterial({
      color: r.color,
      emissive: r.color,
      emissiveIntensity: r.emissive,
      roughness: 0.08,
      metalness: 0.90,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.name = `Act2_Floor_Rail_${idx + 1}`;
    mesh.position.set(r.x, 0.006, midZ);
    group.add(mesh);
    disposables.push(geo, mat);

    keyLongitudinalLines.push({
      p0: new THREE.Vector3(r.x, 0.006, zStart),
      p1: new THREE.Vector3(r.x, 0.006, zEnd),
      name: `FloorRail_${idx + 1}`,
    });
  });

  // -------------------------------------------------------------------------
  // 2. LEFT HERO WALL — the future typography surface
  // -------------------------------------------------------------------------
  // Subdivided now so future vertex/shader animation can deform the wall
  // without replacing its topology.
  const leftWallGeo = new THREE.PlaneGeometry(corridorLength, ceilingY, 64, 12);
  const leftWallMat = new THREE.MeshStandardMaterial({
    color: '#090a0d',
    roughness: 0.78,
    metalness: 0.07,
  });
  const leftWallMesh = new THREE.Mesh(leftWallGeo, leftWallMat);
  leftWallMesh.name = 'Act2_LeftHeroWall';
  leftWallMesh.rotation.y = Math.PI / 2;
  leftWallMesh.position.set(wallLeftX, ceilingY / 2, midZ);
  group.add(leftWallMesh);
  disposables.push(leftWallGeo, leftWallMat);

  // Main champagne horizon: fit to reference (0, 544.81) -> measured VP.
  const mainGoldY = worldYForReferenceRay(
    wallLeftX + 0.03,
    REFERENCE_GEOMETRY.targetLines.mainGoldHorizon.p0.x,
    REFERENCE_GEOMETRY.targetLines.mainGoldHorizon.p0.y
  );

  const mainGoldCoreGeo = new THREE.BoxGeometry(0.030, 0.032, corridorLength);
  const mainGoldCoreMat = new THREE.MeshStandardMaterial({
    color: '#f1dfad',
    emissive: '#d6ab55',
    emissiveIntensity: 2.35,
    roughness: 0.08,
    metalness: 0.88,
  });
  const mainGoldCore = new THREE.Mesh(mainGoldCoreGeo, mainGoldCoreMat);
  mainGoldCore.name = 'Act2_MainGoldHorizon_Core';
  mainGoldCore.position.set(wallLeftX + 0.03, mainGoldY, midZ);
  group.add(mainGoldCore);
  disposables.push(mainGoldCoreGeo, mainGoldCoreMat);

  // Broad low-energy glow sleeve. It is geometry, not a CSS/SVG blur.
  const mainGoldGlowGeo = new THREE.BoxGeometry(0.022, 0.16, corridorLength);
  const mainGoldGlowMat = new THREE.MeshBasicMaterial({
    color: '#b9852d',
    transparent: true,
    opacity: 0.12,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const mainGoldGlow = new THREE.Mesh(mainGoldGlowGeo, mainGoldGlowMat);
  mainGoldGlow.name = 'Act2_MainGoldHorizon_Glow';
  mainGoldGlow.position.set(wallLeftX + 0.05, mainGoldY, midZ);
  group.add(mainGoldGlow);
  disposables.push(mainGoldGlowGeo, mainGoldGlowMat);

  keyLongitudinalLines.push({
    p0: new THREE.Vector3(wallLeftX + 0.03, mainGoldY, zStart),
    p1: new THREE.Vector3(wallLeftX + 0.03, mainGoldY, zEnd),
    name: 'MainGoldHorizon',
  });

  // Upper champagne depth cue visible behind the future text composition.
  const upperGoldY = worldYForReferenceRay(
    wallLeftX + 0.035,
    REFERENCE_GEOMETRY.targetLines.upperGoldDepthRail.p0.x,
    REFERENCE_GEOMETRY.targetLines.upperGoldDepthRail.p0.y
  );

  const upperGoldGeo = new THREE.BoxGeometry(0.022, 0.018, corridorLength);
  const upperGoldMat = new THREE.MeshStandardMaterial({
    color: '#9e762f',
    emissive: '#b98a35',
    emissiveIntensity: 0.42,
    roughness: 0.18,
    metalness: 0.80,
  });
  const upperGoldMesh = new THREE.Mesh(upperGoldGeo, upperGoldMat);
  upperGoldMesh.name = 'Act2_UpperGoldDepthRail';
  upperGoldMesh.position.set(wallLeftX + 0.035, upperGoldY, midZ);
  group.add(upperGoldMesh);
  disposables.push(upperGoldGeo, upperGoldMat);

  keyLongitudinalLines.push({
    p0: new THREE.Vector3(wallLeftX + 0.035, upperGoldY, zStart),
    p1: new THREE.Vector3(wallLeftX + 0.035, upperGoldY, zEnd),
    name: 'UpperGoldDepthRail',
  });

  // -------------------------------------------------------------------------
  // 3. RIGHT WALL + MEASURED LOUVER RAY FAMILY
  // -------------------------------------------------------------------------
  const rightWallGeo = new THREE.PlaneGeometry(corridorLength, ceilingY + 0.2, 64, 12);
  const rightWallMat = new THREE.MeshStandardMaterial({
    color: '#050609',
    roughness: 0.43,
    metalness: 0.70,
  });
  const rightWallMesh = new THREE.Mesh(rightWallGeo, rightWallMat);
  rightWallMesh.name = 'Act2_RightWall_Backplane';
  rightWallMesh.rotation.y = -Math.PI / 2;
  rightWallMesh.position.set(wallRightX + 0.02, ceilingY / 2, midZ);
  group.add(rightWallMesh);
  disposables.push(rightWallGeo, rightWallMat);

  // Deeper fins create actual dark cavities rather than "lines on black".
  const finDepth = 0.46;
  const finLeadX = wallRightX - finDepth;

  REFERENCE_GEOMETRY.rightWallRayTargets.forEach((target, idx) => {
    const edgeY = worldYForReferenceRay(
      finLeadX,
      REFERENCE_GEOMETRY.width,
      target.rightY
    );

    const finHeight = 0.075 + idx * 0.0035;
    const bodyGeo = new THREE.BoxGeometry(finDepth, finHeight, corridorLength);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: idx % 3 === 0 ? '#0b0d11' : '#080a0e',
      roughness: 0.22,
      metalness: 0.86,
    });

    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.name = `Act2_RightFin_${String(idx + 1).padStart(2, '0')}_Body`;
    body.position.set(wallRightX - finDepth / 2, edgeY - finHeight / 2, midZ);
    group.add(body);
    disposables.push(bodyGeo, bodyMat);

    // The source has a mixture of white, grey, and barely-visible grazing edges.
    const edgeBrightness = [0.28, 0.38, 0.22, 0.50, 0.34, 0.18, 0.55, 0.24, 0.48, 0.20, 0.42, 0.17, 0.24, 0.15][idx];
    const edgeColor = idx % 4 === 1 ? '#a8adb5' : '#e5e8ec';

    const edgeGeo = new THREE.BoxGeometry(0.028, 0.016, corridorLength);
    const edgeMat = new THREE.MeshStandardMaterial({
      color: edgeColor,
      roughness: 0.07,
      metalness: 0.96,
      emissive: edgeColor,
      emissiveIntensity: edgeBrightness,
    });

    const edge = new THREE.Mesh(edgeGeo, edgeMat);
    edge.name = `Act2_RightFin_${String(idx + 1).padStart(2, '0')}_Edge`;
    edge.position.set(finLeadX + 0.014, edgeY, midZ);
    group.add(edge);
    disposables.push(edgeGeo, edgeMat);

    keyLongitudinalLines.push({
      p0: new THREE.Vector3(finLeadX, edgeY, zStart),
      p1: new THREE.Vector3(finLeadX, edgeY, zEnd),
      name: target.keyLineName,
    });
  });

  // Dominant silver structural blade. Its leading edge is solved directly
  // against the measured top-edge intersection.
  const bladeDepth = 0.30;
  const bladeLeadX = wallRightX - bladeDepth;
  const bladeEdgeY = worldYForReferenceRay(
    bladeLeadX,
    REFERENCE_GEOMETRY.targetLines.topBlade.p0.x,
    REFERENCE_GEOMETRY.targetLines.topBlade.p0.y
  );
  const bladeHeight = 0.24;

  const bladeGeo = new THREE.BoxGeometry(bladeDepth, bladeHeight, corridorLength);
  const bladeMat = new THREE.MeshStandardMaterial({
    color: '#e7e9ec',
    emissive: '#d6d9dd',
    emissiveIntensity: 0.48,
    roughness: 0.06,
    metalness: 0.98,
  });
  const bladeMesh = new THREE.Mesh(bladeGeo, bladeMat);
  bladeMesh.name = 'Act2_TopSilverBlade';
  bladeMesh.position.set(
    wallRightX - bladeDepth / 2,
    bladeEdgeY - bladeHeight / 2,
    midZ
  );
  group.add(bladeMesh);
  disposables.push(bladeGeo, bladeMat);

  keyLongitudinalLines.push({
    p0: new THREE.Vector3(bladeLeadX, bladeEdgeY, zStart),
    p1: new THREE.Vector3(bladeLeadX, bladeEdgeY, zEnd),
    name: 'TopSilverBlade',
  });

  // -------------------------------------------------------------------------
  // 4. CEILING
  // -------------------------------------------------------------------------
  const ceilingGeo = new THREE.PlaneGeometry(floorWidth, corridorLength, 10, 48);
  const ceilingMat = new THREE.MeshStandardMaterial({
    color: '#030406',
    roughness: 0.96,
    metalness: 0.01,
  });
  const ceilingMesh = new THREE.Mesh(ceilingGeo, ceilingMat);
  ceilingMesh.name = 'Act2_Ceiling';
  ceilingMesh.rotation.x = Math.PI / 2;
  ceilingMesh.position.set(floorMidX, ceilingY, midZ);
  group.add(ceilingMesh);
  disposables.push(ceilingGeo, ceilingMat);

  /**
   * Deliberately no concentric torus/portal tunnel here.
   * The reference convergence zone is an architectural wedge plus reflected
   * floor sweeps, not a second ring-based perspective system. Keeping the deep
   * end open preserves the clean measured VP and gives us room for later motion.
   */

  return {
    group,
    disposables,
    keyLongitudinalLines,
  };
}

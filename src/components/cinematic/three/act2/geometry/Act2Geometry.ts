import * as THREE from 'three';
import { REFERENCE_GEOMETRY } from '../constants/referenceGeometry';
import { createFloorSweepRibbon } from './FloorSweepRibbon';

export interface Act2GeometryRig {
  group: THREE.Group;
  disposables: Array<{ dispose: () => void }>;
  keyLongitudinalLines: Array<{ p0: THREE.Vector3; p1: THREE.Vector3; name: string }>;
  slatMetrics: Array<{ index: number; name: string; worldHeight: number; projectedThicknessPx: number }>;
}

/**
 * Helper to attach normalized depth vertex attribute `aDepth` = (z - zStart) / (zEnd - zStart)
 * to any BufferGeometry for animation/shader readiness.
 */
function attachNormalizedDepthAttribute(
  geometry: THREE.BufferGeometry,
  zStart: number,
  zEnd: number
): void {
  const pos = geometry.attributes.position;
  if (!pos) return;

  const count = pos.count;
  const aDepthArray = new Float32Array(count);
  const span = zEnd - zStart;

  for (let i = 0; i < count; i++) {
    const z = pos.getZ(i);
    aDepthArray[i] = (z - zStart) / span;
  }

  geometry.setAttribute('aDepth', new THREE.BufferAttribute(aDepthArray, 1));
}

/**
 * Converts a screen-space target ray through the measured VP into the world Y
 * needed for a longitudinal line at a fixed world X.
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
 * Act 2 Architecture Sweep V6:
 * - Dynamic architectural louver slabs derived from adjacent ray interval occupancy (65% body, 35% cavity).
 * - Real 3D Floor Sweep Ribbon generated via unprojected screen-space curves.
 * - Normalized `aDepth` vertex attribute on all structural surfaces for shader/animation readiness.
 * - Structured `userData` on every mesh for GSAP / Three.js addressing.
 */
export function createAct2Geometry(): Act2GeometryRig {
  const group = new THREE.Group();
  group.name = 'Act2Environment';

  const disposables: Array<{ dispose: () => void }> = [];
  const keyLongitudinalLines: Array<{ p0: THREE.Vector3; p1: THREE.Vector3; name: string }> = [];
  const slatMetrics: Array<{ index: number; name: string; worldHeight: number; projectedThicknessPx: number }> = [];

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
  // 1. FLOOR PLANE & INTEGRATED 3D SWEEP RIBBON
  // -------------------------------------------------------------------------
  const floorGeo = new THREE.PlaneGeometry(floorWidth, corridorLength, 12, 64);
  attachNormalizedDepthAttribute(floorGeo, zStart, zEnd);

  const floorMat = new THREE.MeshStandardMaterial({
    color: '#07080a',
    roughness: 0.22,
    metalness: 0.35,
  });
  const floorMesh = new THREE.Mesh(floorGeo, floorMat);
  floorMesh.name = 'Act2_Floor_Main';
  floorMesh.userData = { act2Role: 'floor', part: 'base-plane' };
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.position.set(floorMidX, 0, midZ);
  group.add(floorMesh);
  disposables.push(floorGeo, floorMat);

  // Subtle floor reflective zones
  const floorPanels = [
    { x: -5.45, width: 3.7, roughness: 0.28, color: '#060709' },
    { x: -1.65, width: 3.9, roughness: 0.18, color: '#090b0e' },
    { x: 2.55, width: 4.5, roughness: 0.22, color: '#0a0c10' },
  ];

  floorPanels.forEach((p, idx) => {
    const geo = new THREE.PlaneGeometry(p.width, corridorLength, 4, 48);
    attachNormalizedDepthAttribute(geo, zStart, zEnd);
    const mat = new THREE.MeshStandardMaterial({
      color: p.color,
      roughness: p.roughness,
      metalness: 0.40,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.name = `Act2_Floor_Panel_${idx + 1}`;
    mesh.userData = { act2Role: 'floor', part: `panel-${idx + 1}` };
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(p.x, 0.001 + idx * 0.0005, midZ);
    group.add(mesh);
    disposables.push(geo, mat);
  });

  // 3D Floor Sweep Ribbon Unprojected from Screen-Space Reference Curves
  const floorSweepRig = createFloorSweepRibbon(zStart, zEnd);
  group.add(floorSweepRig.mesh);
  group.add(floorSweepRig.centerCutMesh);
  disposables.push(...floorSweepRig.disposables);
  keyLongitudinalLines.push(...floorSweepRig.keyLongitudinalLines);

  // Source-inspired longitudinal floor rail family
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
    attachNormalizedDepthAttribute(geo, zStart, zEnd);
    const mat = new THREE.MeshStandardMaterial({
      color: r.color,
      emissive: r.color,
      emissiveIntensity: r.emissive,
      roughness: 0.08,
      metalness: 0.90,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.name = `Act2_Floor_Rail_${idx + 1}`;
    mesh.userData = { act2Role: 'floor-rail', index: idx + 1, x: r.x };
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
  // 2. LEFT HERO WALL — The Future Typography Surface
  // -------------------------------------------------------------------------
  const leftWallGeo = new THREE.PlaneGeometry(corridorLength, ceilingY, 64, 16);
  attachNormalizedDepthAttribute(leftWallGeo, zStart, zEnd);

  const leftWallMat = new THREE.MeshStandardMaterial({
    color: '#090a0d',
    roughness: 0.78,
    metalness: 0.07,
  });
  const leftWallMesh = new THREE.Mesh(leftWallGeo, leftWallMat);
  leftWallMesh.name = 'Act2_LeftHeroWall';
  leftWallMesh.userData = { act2Role: 'hero-wall', part: 'canvas' };
  leftWallMesh.rotation.y = Math.PI / 2;
  leftWallMesh.position.set(wallLeftX, ceilingY / 2, midZ);
  group.add(leftWallMesh);
  disposables.push(leftWallGeo, leftWallMat);

  // Main champagne horizon: fit to reference (0, 544.81) -> measured VP
  const mainGoldY = worldYForReferenceRay(
    wallLeftX + 0.03,
    REFERENCE_GEOMETRY.targetLines.mainGoldHorizon.p0.x,
    REFERENCE_GEOMETRY.targetLines.mainGoldHorizon.p0.y
  );

  const mainGoldCoreGeo = new THREE.BoxGeometry(0.030, 0.032, corridorLength);
  attachNormalizedDepthAttribute(mainGoldCoreGeo, zStart, zEnd);

  const mainGoldCoreMat = new THREE.MeshStandardMaterial({
    color: '#f1dfad',
    emissive: '#d6ab55',
    emissiveIntensity: 2.35,
    roughness: 0.08,
    metalness: 0.88,
  });
  const mainGoldCore = new THREE.Mesh(mainGoldCoreGeo, mainGoldCoreMat);
  mainGoldCore.name = 'Act2_MainGoldHorizon_Core';
  mainGoldCore.userData = { act2Role: 'horizon', part: 'core' };
  mainGoldCore.position.set(wallLeftX + 0.03, mainGoldY, midZ);
  group.add(mainGoldCore);
  disposables.push(mainGoldCoreGeo, mainGoldCoreMat);

  // Physical Grazing Glow Sleeve
  const mainGoldGlowGeo = new THREE.BoxGeometry(0.022, 0.16, corridorLength);
  attachNormalizedDepthAttribute(mainGoldGlowGeo, zStart, zEnd);

  const mainGoldGlowMat = new THREE.MeshBasicMaterial({
    color: '#b9852d',
    transparent: true,
    opacity: 0.12,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const mainGoldGlow = new THREE.Mesh(mainGoldGlowGeo, mainGoldGlowMat);
  mainGoldGlow.name = 'Act2_MainGoldHorizon_Glow';
  mainGoldGlow.userData = { act2Role: 'horizon', part: 'glow' };
  mainGoldGlow.position.set(wallLeftX + 0.05, mainGoldY, midZ);
  group.add(mainGoldGlow);
  disposables.push(mainGoldGlowGeo, mainGoldGlowMat);

  keyLongitudinalLines.push({
    p0: new THREE.Vector3(wallLeftX + 0.03, mainGoldY, zStart),
    p1: new THREE.Vector3(wallLeftX + 0.03, mainGoldY, zEnd),
    name: 'MainGoldHorizon',
  });

  // Upper champagne depth cue
  const upperGoldY = worldYForReferenceRay(
    wallLeftX + 0.035,
    REFERENCE_GEOMETRY.targetLines.upperGoldDepthRail.p0.x,
    REFERENCE_GEOMETRY.targetLines.upperGoldDepthRail.p0.y
  );

  const upperGoldGeo = new THREE.BoxGeometry(0.022, 0.018, corridorLength);
  attachNormalizedDepthAttribute(upperGoldGeo, zStart, zEnd);

  const upperGoldMat = new THREE.MeshStandardMaterial({
    color: '#9e762f',
    emissive: '#b98a35',
    emissiveIntensity: 0.42,
    roughness: 0.18,
    metalness: 0.80,
  });
  const upperGoldMesh = new THREE.Mesh(upperGoldGeo, upperGoldMat);
  upperGoldMesh.name = 'Act2_UpperGoldDepthRail';
  upperGoldMesh.userData = { act2Role: 'upper-rail' };
  upperGoldMesh.position.set(wallLeftX + 0.035, upperGoldY, midZ);
  group.add(upperGoldMesh);
  disposables.push(upperGoldGeo, upperGoldMat);

  keyLongitudinalLines.push({
    p0: new THREE.Vector3(wallLeftX + 0.035, upperGoldY, zStart),
    p1: new THREE.Vector3(wallLeftX + 0.035, upperGoldY, zEnd),
    name: 'UpperGoldDepthRail',
  });

  // -------------------------------------------------------------------------
  // 3. RIGHT WALL & DYNAMIC ARCHITECTURAL LOUVER SLABS (GAP-DERIVED OCCUPANCY)
  // -------------------------------------------------------------------------
  const rightWallGeo = new THREE.PlaneGeometry(corridorLength, ceilingY + 0.2, 64, 16);
  attachNormalizedDepthAttribute(rightWallGeo, zStart, zEnd);

  const rightWallMat = new THREE.MeshStandardMaterial({
    color: '#050609',
    roughness: 0.43,
    metalness: 0.70,
  });
  const rightWallMesh = new THREE.Mesh(rightWallGeo, rightWallMat);
  rightWallMesh.name = 'Act2_RightWall_Backplane';
  rightWallMesh.userData = { act2Role: 'right-wall', part: 'backplane' };
  rightWallMesh.rotation.y = -Math.PI / 2;
  rightWallMesh.position.set(wallRightX + 0.02, ceilingY / 2, midZ);
  group.add(rightWallMesh);
  disposables.push(rightWallGeo, rightWallMat);

  // Louver Slabs: 0.48 depth into wall
  const finDepth = 0.48;
  const finLeadX = wallRightX - finDepth;

  // 1. Calculate World Y for all 14 highlight rays at finLeadX
  const targets = REFERENCE_GEOMETRY.rightWallRayTargets;
  const rayWorldYs = targets.map((target) =>
    worldYForReferenceRay(finLeadX, REFERENCE_GEOMETRY.width, target.rightY)
  );

  // Dominant Top Blade Leading Edge
  const bladeDepth = 0.32;
  const bladeLeadX = wallRightX - bladeDepth;
  const bladeEdgeY = worldYForReferenceRay(
    bladeLeadX,
    REFERENCE_GEOMETRY.targetLines.topBlade.p0.x,
    REFERENCE_GEOMETRY.targetLines.topBlade.p0.y
  );

  // 2. Build Each Slat as an Architectural Slab occupying 65% of the interval to adjacent ray
  targets.forEach((target, idx) => {
    const edgeY = rayWorldYs[idx];

    // Compute interval to next ray or to top blade
    let intervalY: number;
    if (idx < targets.length - 1) {
      intervalY = rayWorldYs[idx + 1] - edgeY;
    } else {
      intervalY = bladeEdgeY - edgeY;
    }

    // Dynamic Slat Body Height (65% occupancy of the ray interval)
    const finHeight = Math.max(0.16, intervalY * 0.65);
    const bodyCenterY = edgeY + finHeight / 2;

    const bodyGeo = new THREE.BoxGeometry(finDepth, finHeight, corridorLength);
    attachNormalizedDepthAttribute(bodyGeo, zStart, zEnd);

    const bodyMat = new THREE.MeshStandardMaterial({
      color: idx % 3 === 0 ? '#0b0d11' : '#080a0e',
      roughness: 0.26,
      metalness: 0.88,
    });

    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.name = `Act2_RightFin_${String(idx + 1).padStart(2, '0')}_Body`;
    body.userData = {
      act2Role: 'right-fin',
      part: 'slab-body',
      index: idx + 1,
      rayName: target.keyLineName,
      worldHeight: finHeight,
    };
    body.position.set(wallRightX - finDepth / 2, bodyCenterY, midZ);
    group.add(body);
    disposables.push(bodyGeo, bodyMat);

    // Highlight Edge: Top specular catch bevel
    // Reserve emissive boost only for top 5 measured source peaks (indices 0, 3, 6, 8, 10)
    const isPeakHighlight = [0, 3, 6, 8, 10].includes(idx);
    const emissiveIntensity = isPeakHighlight ? 0.35 + (idx / targets.length) * 0.20 : 0.0;
    const edgeColor = idx % 2 === 0 ? '#f0f2f5' : '#c8cdd4';

    const edgeGeo = new THREE.BoxGeometry(0.024, 0.016, corridorLength);
    attachNormalizedDepthAttribute(edgeGeo, zStart, zEnd);

    const edgeMat = new THREE.MeshStandardMaterial({
      color: edgeColor,
      roughness: 0.05,
      metalness: 0.98,
      emissive: edgeColor,
      emissiveIntensity: emissiveIntensity,
    });

    const edge = new THREE.Mesh(edgeGeo, edgeMat);
    edge.name = `Act2_RightFin_${String(idx + 1).padStart(2, '0')}_Edge`;
    edge.userData = {
      act2Role: 'right-fin',
      part: 'highlight-edge',
      index: idx + 1,
      rayName: target.keyLineName,
      isPeak: isPeakHighlight,
    };
    edge.position.set(finLeadX + 0.012, edgeY, midZ);
    group.add(edge);
    disposables.push(edgeGeo, edgeMat);

    keyLongitudinalLines.push({
      p0: new THREE.Vector3(finLeadX, edgeY, zStart),
      p1: new THREE.Vector3(finLeadX, edgeY, zEnd),
      name: target.keyLineName,
    });

    slatMetrics.push({
      index: idx + 1,
      name: target.keyLineName,
      worldHeight: finHeight,
      projectedThicknessPx: finHeight * 52.6,
    });
  });

  // Dominant Outer Silver Structural Blade
  const bladeHeight = 0.32;
  const bladeGeo = new THREE.BoxGeometry(bladeDepth, bladeHeight, corridorLength);
  attachNormalizedDepthAttribute(bladeGeo, zStart, zEnd);

  const bladeMat = new THREE.MeshStandardMaterial({
    color: '#e7e9ec',
    emissive: '#d6d9dd',
    emissiveIntensity: 0.48,
    roughness: 0.06,
    metalness: 0.98,
  });
  const bladeMesh = new THREE.Mesh(bladeGeo, bladeMat);
  bladeMesh.name = 'Act2_TopSilverBlade';
  bladeMesh.userData = { act2Role: 'top-blade', part: 'structural-blade' };
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
  // 4. CEILING PLANE
  // -------------------------------------------------------------------------
  const ceilingGeo = new THREE.PlaneGeometry(floorWidth, corridorLength, 12, 64);
  attachNormalizedDepthAttribute(ceilingGeo, zStart, zEnd);

  const ceilingMat = new THREE.MeshStandardMaterial({
    color: '#030406',
    roughness: 0.96,
    metalness: 0.01,
  });
  const ceilingMesh = new THREE.Mesh(ceilingGeo, ceilingMat);
  ceilingMesh.name = 'Act2_Ceiling';
  ceilingMesh.userData = { act2Role: 'ceiling' };
  ceilingMesh.rotation.x = Math.PI / 2;
  ceilingMesh.position.set(floorMidX, ceilingY, midZ);
  group.add(ceilingMesh);
  disposables.push(ceilingGeo, ceilingMat);

  return {
    group,
    disposables,
    keyLongitudinalLines,
    slatMetrics,
  };
}

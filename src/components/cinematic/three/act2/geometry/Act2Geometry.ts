import * as THREE from 'three';
import { REFERENCE_GEOMETRY } from '../constants/referenceGeometry';
import { createFloorSweepRibbon, type FloorSweepRig } from './FloorSweepRibbon';

export interface SlatMetricData {
  index: number;
  name: string;
  worldHeight: number;
  targetRightY: number;
  targetThicknessPx: number;
  topEdgeWorld: THREE.Vector3;
  bottomEdgeWorld: THREE.Vector3;
}

export interface Act2GeometryRig {
  group: THREE.Group;
  disposables: Array<{ dispose: () => void }>;
  keyLongitudinalLines: Array<{ p0: THREE.Vector3; p1: THREE.Vector3; name: string }>;
  floorSweepRig: FloorSweepRig;
  slatMetrics: SlatMetricData[];
}

/**
 * Applies both local and global normalized depth attributes + world Z coordinate
 * to geometry using the mesh's transformation matrix.
 */
function applyWorldDepthAttributes(
  mesh: THREE.Mesh,
  zStart: number,
  zEnd: number
): void {
  mesh.updateMatrix();
  const geo = mesh.geometry;
  const pos = geo.attributes.position;
  if (!pos) return;

  const count = pos.count;
  const aDepthsLocal = new Float32Array(count);
  const aDepthsGlobal = new Float32Array(count);
  const aWorldZs = new Float32Array(count);

  const localSpan = zEnd - zStart;
  const globalZStart = -5.0;
  const globalZEnd = -420.0;
  const globalSpan = globalZEnd - globalZStart;

  const v = new THREE.Vector3();

  for (let i = 0; i < count; i++) {
    v.fromBufferAttribute(pos, i);
    v.applyMatrix4(mesh.matrix);

    aWorldZs[i] = v.z;
    aDepthsLocal[i] = Math.max(0, Math.min(1, (v.z - zStart) / localSpan));
    aDepthsGlobal[i] = Math.max(0, Math.min(1, (v.z - globalZStart) / globalSpan));
  }

  geo.setAttribute('aDepth', new THREE.BufferAttribute(aDepthsLocal, 1));
  geo.setAttribute('aDepthLocal', new THREE.BufferAttribute(aDepthsLocal, 1));
  geo.setAttribute('aDepthGlobal', new THREE.BufferAttribute(aDepthsGlobal, 1));
  geo.setAttribute('aWorldZ', new THREE.BufferAttribute(aWorldZs, 1));
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
 * Act 2 Architecture Sweep V6.2 (Frozen Geometry Core):
 * - Dynamic architectural louver slabs derived from adjacent ray interval occupancy (65% body, 35% cavity).
 * - Real 3D Floor Sweep Ribbon generated via unprojected screen-space curves.
 * - Exact world-transformed `aDepthLocal`, `aDepthGlobal`, and `aWorldZ` on all surfaces.
 * - Slat thickness metric data for real camera projection validation.
 * - Semantic `userData` on every mesh for GSAP / Three.js addressing.
 */
export function createAct2Geometry(): Act2GeometryRig {
  const group = new THREE.Group();
  group.name = 'Act2Environment';

  const disposables: Array<{ dispose: () => void }> = [];
  const keyLongitudinalLines: Array<{ p0: THREE.Vector3; p1: THREE.Vector3; name: string }> = [];
  const slatMetrics: SlatMetricData[] = [];

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
  applyWorldDepthAttributes(floorMesh, zStart, zEnd);
  group.add(floorMesh);
  disposables.push(floorGeo, floorMat);

  // Broad reflective floor panels
  const floorPanels = [
    { x: -5.45, width: 3.7, roughness: 0.28, color: '#060709' },
    { x: -1.65, width: 3.9, roughness: 0.18, color: '#090b0e' },
    { x: 2.55, width: 4.5, roughness: 0.22, color: '#0a0c10' },
  ];

  floorPanels.forEach((p, idx) => {
    const geo = new THREE.PlaneGeometry(p.width, corridorLength, 4, 48);
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
    applyWorldDepthAttributes(mesh, zStart, zEnd);
    group.add(mesh);
    disposables.push(geo, mat);
  });

  // 3D Floor Sweep Ribbon Unprojected from Screen-Space Reference Curves
  const floorSweepRig = createFloorSweepRibbon(zStart, -420.0);
  group.add(floorSweepRig.mesh);
  group.add(floorSweepRig.centerCutMesh);
  disposables.push(...floorSweepRig.disposables);

  // Sleek neutral graphite longitudinal rails (Zero distracting yellow lines)
  const floorRails = [
    { x: -7.0, width: 0.025, color: '#3c414b', emissive: 0.08 },
    { x: -4.55, width: 0.032, color: '#c7ccd3', emissive: 0.20 },
    { x: -2.05, width: 0.035, color: '#686f7c', emissive: 0.18 },
    { x: -0.72, width: 0.024, color: '#4b505a', emissive: 0.12 },
    { x: 0.95, width: 0.028, color: '#555b64', emissive: 0.14 },
    { x: 2.95, width: 0.030, color: '#4a5059', emissive: 0.15 },
    { x: 4.55, width: 0.045, color: '#c5cad2', emissive: 0.35 },
  ];

  floorRails.forEach((r, idx) => {
    const geo = new THREE.BoxGeometry(r.width, 0.010, corridorLength);
    const mat = new THREE.MeshStandardMaterial({
      color: r.color,
      emissive: r.color,
      emissiveIntensity: r.emissive,
      roughness: 0.12,
      metalness: 0.90,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.name = `Act2_Floor_Rail_${idx + 1}`;
    mesh.userData = { act2Role: 'floor-rail', index: idx + 1, x: r.x };
    mesh.position.set(r.x, 0.006, midZ);
    applyWorldDepthAttributes(mesh, zStart, zEnd);
    group.add(mesh);
    disposables.push(geo, mat);

    keyLongitudinalLines.push({
      p0: new THREE.Vector3(r.x, 0.006, zStart),
      p1: new THREE.Vector3(r.x, 0.006, zEnd),
      name: `FloorRail_${idx + 1}`,
    });
  });

  // -------------------------------------------------------------------------
  // 2. LEFT HERO WALL (Textured Architectural Concrete Wedge + Top Rim Highlight)
  // -------------------------------------------------------------------------
  const concreteTexture = createConcreteTexture();
  disposables.push(concreteTexture);

  const leftWallGeo = new THREE.PlaneGeometry(corridorLength, ceilingY, 64, 16);
  const leftWallMat = new THREE.MeshStandardMaterial({
    map: concreteTexture,
    color: '#282d38',
    roughness: 0.68,
    metalness: 0.18,
  });
  const leftWallMesh = new THREE.Mesh(leftWallGeo, leftWallMat);
  leftWallMesh.name = 'Act2_LeftHeroWall';
  leftWallMesh.userData = { act2Role: 'hero-wall', part: 'canvas' };
  leftWallMesh.rotation.y = Math.PI / 2;
  leftWallMesh.position.set(wallLeftX, ceilingY / 2, midZ);
  applyWorldDepthAttributes(leftWallMesh, zStart, zEnd);
  group.add(leftWallMesh);
  disposables.push(leftWallGeo, leftWallMat);

  // Illuminated Top-Edge Rim Highlight (Cleanly defines the diagonal concrete wedge slope)
  const topEdgeGeo = new THREE.BoxGeometry(0.04, 0.08, corridorLength);
  const topEdgeMat = new THREE.MeshStandardMaterial({
    color: '#9ca3af',
    emissive: '#4b5563',
    emissiveIntensity: 0.45,
    roughness: 0.25,
    metalness: 0.65,
  });
  const topEdgeMesh = new THREE.Mesh(topEdgeGeo, topEdgeMat);
  topEdgeMesh.name = 'Act2_LeftWall_TopEdge';
  topEdgeMesh.position.set(wallLeftX + 0.02, ceilingY, midZ);
  applyWorldDepthAttributes(topEdgeMesh, zStart, zEnd);
  group.add(topEdgeMesh);
  disposables.push(topEdgeGeo, topEdgeMat);

  // Lower Architectural Plinth / Dark Graphite Wainscot Panel
  const plinthHeight = 3.6;
  const plinthGeo = new THREE.BoxGeometry(0.04, plinthHeight, corridorLength);
  const plinthMat = new THREE.MeshStandardMaterial({
    color: '#1a1d24',
    roughness: 0.35,
    metalness: 0.55,
  });
  const plinthMesh = new THREE.Mesh(plinthGeo, plinthMat);
  plinthMesh.name = 'Act2_LeftWall_Plinth';
  plinthMesh.userData = { act2Role: 'hero-wall', part: 'plinth' };
  plinthMesh.position.set(wallLeftX + 0.02, plinthHeight / 2, midZ);
  applyWorldDepthAttributes(plinthMesh, zStart, zEnd);
  group.add(plinthMesh);
  disposables.push(plinthGeo, plinthMat);

  // Recessed Baseboard Shadow Cavity at Floor Seam
  const baseboardGeo = new THREE.BoxGeometry(0.06, 0.08, corridorLength);
  const baseboardMat = new THREE.MeshBasicMaterial({ color: '#000000' });
  const baseboardMesh = new THREE.Mesh(baseboardGeo, baseboardMat);
  baseboardMesh.name = 'Act2_LeftWall_BaseboardShadow';
  baseboardMesh.position.set(wallLeftX + 0.03, 0.04, midZ);
  group.add(baseboardMesh);
  disposables.push(baseboardGeo, baseboardMat);

  // Vertical Architectural Gallery Reveal Seams (spaced every 12m along corridor with shadow depth)
  for (let z = zStart - 6; z > zEnd; z -= 12) {
    const seamGeo = new THREE.BoxGeometry(0.05, ceilingY, 0.06);
    const seamMat = new THREE.MeshBasicMaterial({ color: '#111318' });
    const seamMesh = new THREE.Mesh(seamGeo, seamMat);
    seamMesh.name = `Act2_LeftWall_Seam_${Math.abs(Math.round(z))}`;
    seamMesh.position.set(wallLeftX + 0.025, ceilingY / 2, z);
    group.add(seamMesh);
    disposables.push(seamGeo, seamMat);
  }

  // Neutral Architectural Horizon Trim (Sleek dark graphite, zero yellow line)
  const mainGoldY = worldYForReferenceRay(
    wallLeftX + 0.03,
    REFERENCE_GEOMETRY.targetLines.mainGoldHorizon.p0.x,
    REFERENCE_GEOMETRY.targetLines.mainGoldHorizon.p0.y
  );

  const mainGoldCoreGeo = new THREE.BoxGeometry(0.020, 0.020, corridorLength);
  const mainGoldCoreMat = new THREE.MeshStandardMaterial({
    color: '#181b22',
    emissive: '#0e1015',
    emissiveIntensity: 0.1,
    roughness: 0.25,
    metalness: 0.85,
  });
  const mainGoldCore = new THREE.Mesh(mainGoldCoreGeo, mainGoldCoreMat);
  mainGoldCore.name = 'Act2_MainGoldHorizon_Core';
  mainGoldCore.userData = { act2Role: 'horizon', part: 'core' };
  mainGoldCore.position.set(wallLeftX + 0.03, mainGoldY, midZ);
  applyWorldDepthAttributes(mainGoldCore, zStart, zEnd);
  group.add(mainGoldCore);
  disposables.push(mainGoldCoreGeo, mainGoldCoreMat);

  keyLongitudinalLines.push({
    p0: new THREE.Vector3(wallLeftX + 0.03, mainGoldY, zStart),
    p1: new THREE.Vector3(wallLeftX + 0.03, mainGoldY, zEnd),
    name: 'MainGoldHorizon',
  });

  // Upper neutral depth rail
  const upperGoldY = worldYForReferenceRay(
    wallLeftX + 0.035,
    REFERENCE_GEOMETRY.targetLines.upperGoldDepthRail.p0.x,
    REFERENCE_GEOMETRY.targetLines.upperGoldDepthRail.p0.y
  );

  const upperGoldGeo = new THREE.BoxGeometry(0.018, 0.015, corridorLength);
  const upperGoldMat = new THREE.MeshStandardMaterial({
    color: '#1a1d24',
    emissive: '#0e1015',
    emissiveIntensity: 0.1,
    roughness: 0.25,
    metalness: 0.80,
  });
  const upperGoldMesh = new THREE.Mesh(upperGoldGeo, upperGoldMat);
  upperGoldMesh.name = 'Act2_UpperGoldDepthRail';
  upperGoldMesh.userData = { act2Role: 'upper-rail' };
  upperGoldMesh.position.set(wallLeftX + 0.035, upperGoldY, midZ);
  applyWorldDepthAttributes(upperGoldMesh, zStart, zEnd);
  group.add(upperGoldMesh);
  disposables.push(upperGoldGeo, upperGoldMat);

  keyLongitudinalLines.push({
    p0: new THREE.Vector3(wallLeftX + 0.035, upperGoldY, zStart),
    p1: new THREE.Vector3(wallLeftX + 0.035, upperGoldY, zEnd),
    name: 'UpperGoldDepthRail',
  });

  // -------------------------------------------------------------------------
  // 3. RIGHT WALL & DYNAMIC ARCHITECTURAL LOUVER SLABS
  // -------------------------------------------------------------------------
  const rightWallGeo = new THREE.PlaneGeometry(corridorLength, ceilingY + 0.2, 64, 16);
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
  applyWorldDepthAttributes(rightWallMesh, zStart, zEnd);
  group.add(rightWallMesh);
  disposables.push(rightWallGeo, rightWallMat);

  const finDepth = 0.48;
  const finLeadX = wallRightX - finDepth;

  const targets = REFERENCE_GEOMETRY.rightWallRayTargets;
  const rayWorldYs = targets.map((target) =>
    worldYForReferenceRay(finLeadX, REFERENCE_GEOMETRY.width, target.rightY)
  );

  const bladeDepth = 0.32;
  const bladeLeadX = wallRightX - bladeDepth;
  const bladeEdgeY = worldYForReferenceRay(
    bladeLeadX,
    REFERENCE_GEOMETRY.targetLines.topBlade.p0.x,
    REFERENCE_GEOMETRY.targetLines.topBlade.p0.y
  );

  targets.forEach((target, idx) => {
    const edgeY = rayWorldYs[idx];

    let intervalY: number;
    let targetThicknessPx: number;

    if (idx < targets.length - 1) {
      intervalY = rayWorldYs[idx + 1] - edgeY;
      targetThicknessPx = 0.65 * Math.abs(targets[idx].rightY - targets[idx + 1].rightY);
    } else {
      intervalY = bladeEdgeY - edgeY;
      targetThicknessPx = 0.65 * Math.abs(target.rightY - 0.0);
    }

    const finHeight = Math.max(0.16, intervalY * 0.65);
    const bodyCenterY = edgeY + finHeight / 2;

    const bodyGeo = new THREE.BoxGeometry(finDepth, finHeight, corridorLength);
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
    applyWorldDepthAttributes(body, zStart, zEnd);
    group.add(body);
    disposables.push(bodyGeo, bodyMat);

    const isPeakHighlight = [0, 3, 6, 8, 10].includes(idx);
    const emissiveIntensity = isPeakHighlight ? 0.35 + (idx / targets.length) * 0.20 : 0.0;
    const edgeColor = idx % 2 === 0 ? '#f0f2f5' : '#c8cdd4';

    const edgeGeo = new THREE.BoxGeometry(0.024, 0.016, corridorLength);
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
    applyWorldDepthAttributes(edge, zStart, zEnd);
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
      targetRightY: target.rightY,
      targetThicknessPx,
      topEdgeWorld: new THREE.Vector3(finLeadX, edgeY + finHeight, zStart),
      bottomEdgeWorld: new THREE.Vector3(finLeadX, edgeY, zStart),
    });
  });

  // Top Silver Blade
  const bladeHeight = 0.32;
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
  bladeMesh.userData = { act2Role: 'top-blade', part: 'structural-blade' };
  bladeMesh.position.set(
    wallRightX - bladeDepth / 2,
    bladeEdgeY - bladeHeight / 2,
    midZ
  );
  applyWorldDepthAttributes(bladeMesh, zStart, zEnd);
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
  applyWorldDepthAttributes(ceilingMesh, zStart, zEnd);
  group.add(ceilingMesh);
  disposables.push(ceilingGeo, ceilingMat);

  return {
    group,
    disposables,
    keyLongitudinalLines,
    floorSweepRig,
    slatMetrics,
  };
}

/**
 * Procedural Architectural Concrete Texture Generator
 * Produces authentic high-resolution concrete grain, formwork streaks, and aggregate micro-surface.
 */
function createConcreteTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // Base raw concrete tone
  ctx.fillStyle = '#2a2f3a';
  ctx.fillRect(0, 0, 1024, 1024);

  // Layer 1: High-frequency mineral noise grain
  const imgData = ctx.getImageData(0, 0, 1024, 1024);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 36;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  // Layer 2: Subtle horizontal formwork trowel streaks
  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  for (let i = 0; i < 48; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const w = 60 + Math.random() * 260;
    const h = 2 + Math.random() * 6;
    ctx.fillRect(x, y, w, h);
  }

  // Layer 3: Subtle darker aggregate pore patches
  ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
  for (let i = 0; i < 70; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const radius = 2 + Math.random() * 10;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(10, 3);
  return texture;
}

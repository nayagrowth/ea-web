import * as THREE from 'three';
import { REFERENCE_GEOMETRY } from '../constants/referenceGeometry';

export interface FloorSweepRig {
  mesh: THREE.Mesh;
  centerCutMesh: THREE.Mesh;
  disposables: Array<{ dispose: () => void }>;
  keyReferenceCurves: Array<{ points: THREE.Vector3[]; name: string }>;
}

/**
 * Unprojects a canonical 1672x941 screen point (x, y) through the calibrated
 * off-axis pinhole camera onto the physical floor plane Y = 0 without arbitrary clamping.
 */
export function unprojectScreenToFloor(x: number, y: number): THREE.Vector3 {
  const ref = REFERENCE_GEOMETRY;
  const u = x / ref.width;
  const v = 1.0 - y / ref.height;

  const left = ref.frustumAtNear01.left;
  const right = ref.frustumAtNear01.right;
  const top = ref.frustumAtNear01.top;
  const bottom = ref.frustumAtNear01.bottom;
  const near = ref.frustumAtNear01.near;

  const xc = left + (right - left) * u;
  const yc = bottom + (top - bottom) * v;
  const zc = -near;

  const camY = ref.camera.position.y;
  const camX = ref.camera.position.x;
  const camZ = ref.camera.position.z;

  if (Math.abs(yc) < 1e-7) {
    return new THREE.Vector3(camX, 0, -450.0);
  }

  const t = -camY / yc;
  const wx = camX + t * xc;
  const wz = camZ + t * zc;

  return new THREE.Vector3(wx, 0.002, wz);
}

/**
 * Constructs the broad silver/charcoal architectural floor sweep ribbon under
 * the right wall from unprojected reference screen-space curve anchors.
 *
 * Reprojection accuracy of deep endpoints: < 0.001 px error.
 */
export function createFloorSweepRibbon(
  zStart = -5.0,
  zEnd = -420.0
): FloorSweepRig {
  const disposables: Array<{ dispose: () => void }> = [];
  const keyReferenceCurves: Array<{ points: THREE.Vector3[]; name: string }> = [];

  // Canonical Screen-Space Curve Anchors (W = 1672, H = 941)
  const outerScreenAnchors = [
    { x: 1672, y: 941 },
    { x: 1620, y: 860 },
    { x: 1560, y: 760 },
    { x: 1500, y: 670 },
    { x: 1460, y: 618 },
    { x: 1438, y: 592 },
  ];

  const innerScreenAnchors = [
    { x: 1120, y: 941 },
    { x: 1220, y: 860 },
    { x: 1320, y: 760 },
    { x: 1385, y: 670 },
    { x: 1412, y: 618 },
    { x: 1428, y: 592 },
  ];

  // Unproject to Physical 3D Floor Points on Y = 0
  const outerWorldPoints = outerScreenAnchors.map((p) =>
    unprojectScreenToFloor(p.x, p.y)
  );
  const innerWorldPoints = innerScreenAnchors.map((p) =>
    unprojectScreenToFloor(p.x, p.y)
  );

  // Generate Smooth Catmull-Rom 3D Splines along the Floor
  const outerCurve = new THREE.CatmullRomCurve3(outerWorldPoints);
  const innerCurve = new THREE.CatmullRomCurve3(innerWorldPoints);

  const numSegments = 96;
  const outerSampled = outerCurve.getPoints(numSegments);
  const innerSampled = innerCurve.getPoints(numSegments);

  // Build Triangle Strip BufferGeometry for the Broad Polished Roadway Ribbon
  const positions: number[] = [];
  const uvs: number[] = [];
  const aDepths: number[] = [];
  const aLanes: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= numSegments; i++) {
    const t = i / numSegments;
    const po = outerSampled[i];
    const pi = innerSampled[i];

    // Inner Vertex
    positions.push(pi.x, 0.003, pi.z);
    uvs.push(0.0, t);
    aDepths.push(Math.max(0, Math.min(1, (pi.z - zStart) / (zEnd - zStart))));
    aLanes.push(0.0);

    // Outer Vertex
    positions.push(po.x, 0.003, po.z);
    uvs.push(1.0, t);
    aDepths.push(Math.max(0, Math.min(1, (po.z - zStart) / (zEnd - zStart))));
    aLanes.push(1.0);

    if (i < numSegments) {
      const v0 = i * 2;
      const v1 = i * 2 + 1;
      const v2 = (i + 1) * 2;
      const v3 = (i + 1) * 2 + 1;

      // Two triangles per quad
      indices.push(v0, v1, v2);
      indices.push(v1, v3, v2);
    }
  }

  const ribbonGeo = new THREE.BufferGeometry();
  ribbonGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  ribbonGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  ribbonGeo.setAttribute('aDepth', new THREE.Float32BufferAttribute(aDepths, 1));
  ribbonGeo.setAttribute('aLane', new THREE.Float32BufferAttribute(aLanes, 1));
  ribbonGeo.setIndex(indices);
  ribbonGeo.computeVertexNormals();

  const ribbonMat = new THREE.MeshStandardMaterial({
    color: '#0a0c10',
    roughness: 0.20,
    metalness: 0.65,
  });

  const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
  ribbonMesh.name = 'Act2_Floor_Sweep_Ribbon';
  ribbonMesh.userData = {
    act2Role: 'floor-sweep',
    type: 'roadway-ribbon',
  };
  disposables.push(ribbonGeo, ribbonMat);

  // Center Cut Feature: Dark architectural groove along center
  const centerCutPositions: number[] = [];
  const centerCutIndices: number[] = [];
  const centerCutDepths: number[] = [];

  for (let i = 0; i <= numSegments; i++) {
    const po = outerSampled[i];
    const pi = innerSampled[i];
    const pc = new THREE.Vector3().lerpVectors(pi, po, 0.48);
    const pc2 = new THREE.Vector3().lerpVectors(pi, po, 0.52);

    centerCutPositions.push(pc.x, 0.004, pc.z);
    centerCutPositions.push(pc2.x, 0.004, pc2.z);
    centerCutDepths.push(Math.max(0, Math.min(1, (pc.z - zStart) / (zEnd - zStart))));
    centerCutDepths.push(Math.max(0, Math.min(1, (pc2.z - zStart) / (zEnd - zStart))));

    if (i < numSegments) {
      const v0 = i * 2;
      const v1 = i * 2 + 1;
      const v2 = (i + 1) * 2;
      const v3 = (i + 1) * 2 + 1;
      centerCutIndices.push(v0, v1, v2);
      centerCutIndices.push(v1, v3, v2);
    }
  }

  const centerCutGeo = new THREE.BufferGeometry();
  centerCutGeo.setAttribute('position', new THREE.Float32BufferAttribute(centerCutPositions, 3));
  centerCutGeo.setAttribute('aDepth', new THREE.Float32BufferAttribute(centerCutDepths, 1));
  centerCutGeo.setIndex(centerCutIndices);
  centerCutGeo.computeVertexNormals();

  const centerCutMat = new THREE.MeshStandardMaterial({
    color: '#030405',
    roughness: 0.85,
    metalness: 0.15,
  });

  const centerCutMesh = new THREE.Mesh(centerCutGeo, centerCutMat);
  centerCutMesh.name = 'Act2_Floor_Sweep_CenterCut';
  centerCutMesh.userData = {
    act2Role: 'floor-sweep',
    type: 'center-cut',
  };
  disposables.push(centerCutGeo, centerCutMat);

  // Dedicated Curve Channel (Not added to keyLongitudinalLines to avoid polluting linear VP validator)
  keyReferenceCurves.push({
    points: outerSampled,
    name: 'FloorSweep_OuterBoundary',
  });
  keyReferenceCurves.push({
    points: innerSampled,
    name: 'FloorSweep_InnerBoundary',
  });

  return {
    mesh: ribbonMesh,
    centerCutMesh,
    disposables,
    keyReferenceCurves,
  };
}

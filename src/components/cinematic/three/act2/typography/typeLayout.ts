import * as THREE from 'three';
import { REFERENCE_GEOMETRY } from '../constants/referenceGeometry';

export interface ScreenTextBox {
  name: string;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  targetZ: number;
  text: string;
  fontFamily: string;
  fontWeight: string;
  fontSize: number;
  fontStyle: string;
  color: string;
  opacity: number;
  letterSpacing?: number;
}

export interface WallTextQuadGeometryData {
  name: string;
  text: string;
  centroid: THREE.Vector3;
  localTL: THREE.Vector3;
  localTR: THREE.Vector3;
  localBR: THREE.Vector3;
  localBL: THREE.Vector3;
  worldTL: THREE.Vector3;
  worldTR: THREE.Vector3;
  worldBR: THREE.Vector3;
  worldBL: THREE.Vector3;
  screenBox: ScreenTextBox;
}

/**
 * Computes the normalized ray direction in world space for a screen pixel (x, y)
 * using the calibrated off-axis camera intrinsics.
 */
export function rayForScreenPixel(x: number, y: number): THREE.Vector3 {
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

  const dir = new THREE.Vector3(xc, yc, zc);
  return dir.normalize();
}

/**
 * Unprojects a screen point (x, y) onto a plane at target depth Z.
 */
export function unprojectScreenToPlaneZ(
  x: number,
  y: number,
  targetZ: number
): THREE.Vector3 {
  const ref = REFERENCE_GEOMETRY;
  const cam = ref.camera.position;
  const D = rayForScreenPixel(x, y);

  if (Math.abs(D.z) < 1e-7) {
    return new THREE.Vector3(cam.x, cam.y, targetZ);
  }

  const t = (targetZ - cam.z) / D.z;
  return new THREE.Vector3(cam.x + t * D.x, cam.y + t * D.y, targetZ);
}

/**
 * Exact Measured Reference Text Bounds from Canonical 1672x941 Source Frame
 */
export const ACT2_TEXT_BOXES: Record<string, ScreenTextBox> = {
  we: {
    name: 'we',
    minX: 239,
    maxX: 605,
    minY: 136,
    maxY: 348,
    targetZ: -12.0,
    text: 'We',
    fontFamily: 'Qurova, sans-serif',
    fontWeight: '700',
    fontSize: 168,
    fontStyle: 'normal',
    color: '#ffffff',
    opacity: 1.0,
  },
  sellOut: {
    name: 'sellOut',
    minX: 746,
    maxX: 1231,
    minY: 232,
    maxY: 408,
    targetZ: -16.0,
    text: 'sell-out',
    fontFamily: 'Playfair Display, Cormorant Garamond, Georgia, serif',
    fontWeight: '400',
    fontSize: 138,
    fontStyle: 'italic',
    color: '#F5C200',
    opacity: 0.95,
    letterSpacing: 2,
  },
  your: {
    name: 'your',
    minX: 220,
    maxX: 691,
    minY: 395,
    maxY: 586,
    targetZ: -13.0,
    text: 'your',
    fontFamily: 'Playfair Display, Cormorant Garamond, Georgia, serif',
    fontWeight: '400',
    fontSize: 160,
    fontStyle: 'italic',
    color: '#ffffff',
    opacity: 1.0,
  },
  realEstate: {
    name: 'realEstate',
    minX: 731,
    maxX: 1440,
    minY: 410,
    maxY: 574,
    targetZ: -20.0,
    text: 'real estate',
    fontFamily: 'Qurova, sans-serif',
    fontWeight: '700',
    fontSize: 142,
    fontStyle: 'normal',
    color: '#ffffff',
    opacity: 1.0,
  },
  project: {
    name: 'project',
    minX: 724,
    maxX: 1388,
    minY: 604,
    maxY: 784,
    targetZ: -18.0,
    text: 'project',
    fontFamily: 'Qurova, sans-serif',
    fontWeight: '300',
    fontSize: 148,
    fontStyle: 'normal',
    color: '#e5e8ec',
    opacity: 0.88,
    letterSpacing: 14,
  },
};

/**
 * Calculates centered 3D quad geometry with centroid origin for all 5 phrases.
 */
export function getAct2TextQuadData(): WallTextQuadGeometryData[] {
  return Object.values(ACT2_TEXT_BOXES).map((box) => {
    const worldTL = unprojectScreenToPlaneZ(box.minX, box.minY, box.targetZ);
    const worldTR = unprojectScreenToPlaneZ(box.maxX, box.minY, box.targetZ);
    const worldBR = unprojectScreenToPlaneZ(box.maxX, box.maxY, box.targetZ);
    const worldBL = unprojectScreenToPlaneZ(box.minX, box.maxY, box.targetZ);

    // Compute Exact Centroid C
    const centroid = new THREE.Vector3(
      (worldTL.x + worldTR.x + worldBR.x + worldBL.x) / 4.0,
      (worldTL.y + worldTR.y + worldBR.y + worldBL.y) / 4.0,
      (worldTL.z + worldTR.z + worldBR.z + worldBL.z) / 4.0
    );

    // Local Coordinates around Centroid (P_local = P_world - C)
    const localTL = worldTL.clone().sub(centroid);
    const localTR = worldTR.clone().sub(centroid);
    const localBR = worldBR.clone().sub(centroid);
    const localBL = worldBL.clone().sub(centroid);

    return {
      name: box.name,
      text: box.text,
      centroid,
      localTL,
      localTR,
      localBR,
      localBL,
      worldTL,
      worldTR,
      worldBR,
      worldBL,
      screenBox: box,
    };
  });
}

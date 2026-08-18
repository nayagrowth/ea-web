import * as THREE from 'three';
import { REFERENCE_GEOMETRY } from '../constants/referenceGeometry';

export interface ScreenTextBox {
  name: string;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
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
  pTL: THREE.Vector3;
  pTR: THREE.Vector3;
  pBR: THREE.Vector3;
  pBL: THREE.Vector3;
  screenBox: ScreenTextBox;
}

/**
 * Unprojects a canonical 1672x941 screen point (x, y) through the calibrated
 * off-axis pinhole camera onto the left hero wall plane X = -7.46.
 */
export function unprojectScreenToHeroWall(
  x: number,
  y: number,
  wallX = -7.46
): THREE.Vector3 {
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

  const camX = ref.camera.position.x;
  const camY = ref.camera.position.y;
  const camZ = ref.camera.position.z;

  if (Math.abs(xc) < 1e-7) {
    return new THREE.Vector3(wallX, camY, -90.0);
  }

  const t = (wallX - camX) / xc;
  const wy = camY + t * yc;
  const wz = camZ + t * zc;

  return new THREE.Vector3(wallX, wy, wz);
}

/**
 * Canonical Screen Bounding Boxes for Act 2 Spatial Typography (W = 1672, H = 941)
 */
export const ACT2_TEXT_BOXES: Record<string, ScreenTextBox> = {
  we: {
    name: 'we',
    minX: 230,
    maxX: 550,
    minY: 130,
    maxY: 335,
    text: 'WE',
    fontFamily: 'Qurova, sans-serif',
    fontWeight: '700',
    fontSize: 160,
    fontStyle: 'normal',
    color: '#ffffff',
    opacity: 1.0,
  },
  sellOut: {
    name: 'sellOut',
    minX: 580,
    maxX: 1050,
    minY: 215,
    maxY: 395,
    text: 'sell-out',
    fontFamily: 'Playfair Display, Cormorant Garamond, serif',
    fontWeight: '400',
    fontSize: 130,
    fontStyle: 'italic',
    color: '#F5C200',
    opacity: 0.95,
    letterSpacing: 2,
  },
  your: {
    name: 'your',
    minX: 220,
    maxX: 650,
    minY: 390,
    maxY: 575,
    text: 'your',
    fontFamily: 'Playfair Display, Cormorant Garamond, serif',
    fontWeight: '400',
    fontSize: 155,
    fontStyle: 'italic',
    color: '#ffffff',
    opacity: 1.0,
  },
  realEstate: {
    name: 'realEstate',
    minX: 650,
    maxX: 1200,
    minY: 405,
    maxY: 600,
    text: 'real estate',
    fontFamily: 'Qurova, sans-serif',
    fontWeight: '700',
    fontSize: 145,
    fontStyle: 'normal',
    color: '#ffffff',
    opacity: 1.0,
  },
  project: {
    name: 'project',
    minX: 650,
    maxX: 1150,
    minY: 585,
    maxY: 770,
    text: 'project',
    fontFamily: 'Qurova, sans-serif',
    fontWeight: '300',
    fontSize: 140,
    fontStyle: 'normal',
    color: '#e5e8ec',
    opacity: 0.85,
    letterSpacing: 14,
  },
};

/**
 * Calculates physical 3D wall quad corner vertices for each text phrase.
 */
export function getAct2TextQuadData(wallX = -7.46): WallTextQuadGeometryData[] {
  return Object.values(ACT2_TEXT_BOXES).map((box) => {
    const pTL = unprojectScreenToHeroWall(box.minX, box.minY, wallX);
    const pTR = unprojectScreenToHeroWall(box.maxX, box.minY, wallX);
    const pBR = unprojectScreenToHeroWall(box.maxX, box.maxY, wallX);
    const pBL = unprojectScreenToHeroWall(box.minX, box.maxY, wallX);

    return {
      name: box.name,
      text: box.text,
      pTL,
      pTR,
      pBR,
      pBL,
      screenBox: box,
    };
  });
}

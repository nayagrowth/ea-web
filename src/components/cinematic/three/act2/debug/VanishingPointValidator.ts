import * as THREE from 'three';
import { REFERENCE_GEOMETRY } from '../constants/referenceGeometry';
import { projectWorldLineToScreen, intersectLines } from '../camera/projection';

export interface SilhouetteError {
  name: string;
  errorPx: number;
  status: 'PASS' | 'FAIL';
}

export interface CalibrationReport {
  targetVP: { x: number; y: number };
  projectedVP: { x: number; y: number };
  vpErrorPx: number;
  maxRayErrorPx: number;
  avgRayErrorPx: number;
  status: 'PASS' | 'FAIL';
  lineCount: number;
  intersectionCount: number;
  silhouettes: SilhouetteError[];
}

/**
 * Calculates perpendicular distance / sampling error between projected 2D line and target reference line
 */
function evaluateLineError(
  projectedLineEq: THREE.Vector3,
  targetP0: { x: number; y: number },
  targetP1: { x: number; y: number }
): number {
  const { x: a, y: b, z: c } = projectedLineEq;
  const denom = Math.hypot(a, b);
  if (denom < 1e-9) return 0;

  const d0 = Math.abs(a * targetP0.x + b * targetP0.y + c) / denom;
  const d1 = Math.abs(a * targetP1.x + b * targetP1.y + c) / denom;
  return (d0 + d1) / 2;
}

/**
 * Mathematically validates that all 3D longitudinal lines converge to VP = (1433.21, 586.43)
 * and measures silhouette alignment errors for key structural edges
 */
export function validateVanishingPoint(
  keyLines: Array<{ p0: THREE.Vector3; p1: THREE.Vector3; name: string }>,
  camera: THREE.Camera,
  viewportWidth: number,
  viewportHeight: number
): CalibrationReport {
  const targetX = (REFERENCE_GEOMETRY.vpPx.x / REFERENCE_GEOMETRY.width) * viewportWidth;
  const targetY = (REFERENCE_GEOMETRY.vpPx.y / REFERENCE_GEOMETRY.height) * viewportHeight;

  const projected = keyLines.map((line) => ({
    name: line.name,
    ...projectWorldLineToScreen(line.p0, line.p1, camera, viewportWidth, viewportHeight),
  }));

  const intersections: THREE.Vector2[] = [];
  let totalError = 0;
  let maxError = 0;

  for (let i = 0; i < projected.length; i++) {
    for (let j = i + 1; j < projected.length; j++) {
      const pt = intersectLines(projected[i].lineEq, projected[j].lineEq);
      if (pt && !isNaN(pt.x) && !isNaN(pt.y)) {
        intersections.push(pt);
        const err = Math.hypot(pt.x - targetX, pt.y - targetY);
        totalError += err;
        if (err > maxError) maxError = err;
      }
    }
  }

  const avgError = intersections.length > 0 ? totalError / intersections.length : 0;
  const avgX = intersections.reduce((sum, p) => sum + p.x, 0) / (intersections.length || 1);
  const avgY = intersections.reduce((sum, p) => sum + p.y, 0) / (intersections.length || 1);

  // Scaled back to 1672x941 reference coordinates
  const refProjX = (avgX / viewportWidth) * REFERENCE_GEOMETRY.width;
  const refProjY = (avgY / viewportHeight) * REFERENCE_GEOMETRY.height;
  const refMaxError = (maxError / viewportWidth) * REFERENCE_GEOMETRY.width;
  const refAvgError = (avgError / viewportWidth) * REFERENCE_GEOMETRY.width;
  const vpError = Math.hypot(refProjX - REFERENCE_GEOMETRY.vpPx.x, refProjY - REFERENCE_GEOMETRY.vpPx.y);

  // Silhouette error checks
  const silhouettes: SilhouetteError[] = [];

  const topBladeLine = projected.find((p) => p.name === 'TopSilverBlade');
  if (topBladeLine) {
    const err = evaluateLineError(
      topBladeLine.lineEq,
      REFERENCE_GEOMETRY.targetLines.topBlade.p0,
      REFERENCE_GEOMETRY.targetLines.topBlade.p1
    );
    silhouettes.push({
      name: 'TOP BLADE',
      errorPx: err,
      status: err < 3.0 ? 'PASS' : 'FAIL',
    });
  }

  const leftWallLine = projected.find((p) => p.name === 'LeftWallFloorSeam');
  if (leftWallLine) {
    const err = evaluateLineError(
      leftWallLine.lineEq,
      REFERENCE_GEOMETRY.targetLines.leftWallFloorSeam.p0,
      REFERENCE_GEOMETRY.targetLines.leftWallFloorSeam.p1
    );
    silhouettes.push({
      name: 'LEFT WALL SEAM',
      errorPx: err,
      status: err < 3.0 ? 'PASS' : 'FAIL',
    });
  }

  return {
    targetVP: { x: REFERENCE_GEOMETRY.vpPx.x, y: REFERENCE_GEOMETRY.vpPx.y },
    projectedVP: { x: refProjX, y: refProjY },
    vpErrorPx: vpError,
    maxRayErrorPx: refMaxError,
    avgRayErrorPx: refAvgError,
    status: refMaxError < 3.0 && vpError < 3.0 ? 'PASS' : 'FAIL',
    lineCount: keyLines.length,
    intersectionCount: intersections.length,
    silhouettes,
  };
}

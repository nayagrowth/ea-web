import * as THREE from 'three';
import { REFERENCE_GEOMETRY } from '../constants/referenceGeometry';
import { projectWorldLineToScreen, intersectLines } from '../camera/projection';

export interface CalibrationReport {
  targetVP: { x: number; y: number };
  projectedVP: { x: number; y: number };
  maxErrorPx: number;
  avgErrorPx: number;
  status: 'PASS' | 'FAIL';
  lineCount: number;
  intersectionCount: number;
}

/**
 * Mathematically validates that all 3D longitudinal lines converge to VP = (1433.21, 586.43)
 */
export function validateVanishingPoint(
  keyLines: Array<{ p0: THREE.Vector3; p1: THREE.Vector3; name: string }>,
  camera: THREE.Camera,
  viewportWidth: number,
  viewportHeight: number
): CalibrationReport {
  const targetX = (REFERENCE_GEOMETRY.vpPx.x / REFERENCE_GEOMETRY.width) * viewportWidth;
  const targetY = (REFERENCE_GEOMETRY.vpPx.y / REFERENCE_GEOMETRY.height) * viewportHeight;

  const projectedLines = keyLines.map((line) =>
    projectWorldLineToScreen(line.p0, line.p1, camera, viewportWidth, viewportHeight)
  );

  const intersections: THREE.Vector2[] = [];
  let totalError = 0;
  let maxError = 0;

  for (let i = 0; i < projectedLines.length; i++) {
    for (let j = i + 1; j < projectedLines.length; j++) {
      const pt = intersectLines(projectedLines[i].lineEq, projectedLines[j].lineEq);
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

  return {
    targetVP: { x: REFERENCE_GEOMETRY.vpPx.x, y: REFERENCE_GEOMETRY.vpPx.y },
    projectedVP: { x: refProjX, y: refProjY },
    maxErrorPx: refMaxError,
    avgErrorPx: refAvgError,
    status: refMaxError < 3.0 ? 'PASS' : 'FAIL',
    lineCount: keyLines.length,
    intersectionCount: intersections.length,
  };
}

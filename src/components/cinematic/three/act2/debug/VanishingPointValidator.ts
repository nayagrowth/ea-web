import * as THREE from 'three';
import { REFERENCE_GEOMETRY } from '../constants/referenceGeometry';
import { projectWorldLineToScreen, intersectLines } from '../camera/projection';

export interface SilhouetteError {
  name: string;
  errorPx: number;
  tolerancePx: number;
  status: 'PASS' | 'FAIL';
}

export interface CalibrationReport {
  targetVP: { x: number; y: number };
  projectedVP: { x: number; y: number };
  vpErrorPx: number;
  maxRayErrorPx: number;
  avgRayErrorPx: number;
  maxSilhouetteErrorPx: number;
  rightRibMaxErrorPx: number;
  rightRibAvgErrorPx: number;
  rightRibStatus: 'PASS' | 'FAIL';
  status: 'PASS' | 'FAIL';
  lineCount: number;
  intersectionCount: number;
  silhouettes: SilhouetteError[];
}

function lineFromPoints(p0: THREE.Vector2, p1: THREE.Vector2): THREE.Vector3 {
  return new THREE.Vector3(p0.x, p0.y, 1).cross(
    new THREE.Vector3(p1.x, p1.y, 1)
  );
}

function viewportPointToReference(
  point: THREE.Vector2,
  viewportWidth: number,
  viewportHeight: number
): THREE.Vector2 {
  return new THREE.Vector2(
    (point.x / viewportWidth) * REFERENCE_GEOMETRY.width,
    (point.y / viewportHeight) * REFERENCE_GEOMETRY.height
  );
}

/**
 * Calculates average perpendicular distance from the target endpoints to a
 * projected line, all expressed in the canonical 1672 × 941 coordinate space.
 */
function evaluateReferenceLineError(
  projectedP0: THREE.Vector2,
  projectedP1: THREE.Vector2,
  viewportWidth: number,
  viewportHeight: number,
  targetP0: { x: number; y: number },
  targetP1: { x: number; y: number }
): number {
  const refP0 = viewportPointToReference(projectedP0, viewportWidth, viewportHeight);
  const refP1 = viewportPointToReference(projectedP1, viewportWidth, viewportHeight);
  const lineEq = lineFromPoints(refP0, refP1);

  const { x: a, y: b, z: c } = lineEq;
  const denom = Math.hypot(a, b);
  if (denom < 1e-9) return Number.POSITIVE_INFINITY;

  const d0 = Math.abs(a * targetP0.x + b * targetP0.y + c) / denom;
  const d1 = Math.abs(a * targetP1.x + b * targetP1.y + c) / denom;
  return (d0 + d1) / 2;
}

/**
 * Validates:
 * 1) one-point convergence,
 * 2) measured primary structural silhouettes,
 * 3) right-wall ray-family spacing.
 *
 * All errors are reported in canonical reference pixels even on non-16:9
 * viewports, preventing width-only error scaling from hiding Y distortion.
 */
export function validateVanishingPoint(
  keyLines: Array<{ p0: THREE.Vector3; p1: THREE.Vector3; name: string }>,
  camera: THREE.Camera,
  viewportWidth: number,
  viewportHeight: number
): CalibrationReport {
  const targetViewportX = REFERENCE_GEOMETRY.vpUv.u * viewportWidth;
  const targetViewportY = REFERENCE_GEOMETRY.vpUv.v * viewportHeight;

  const projected = keyLines.map((line) => ({
    name: line.name,
    ...projectWorldLineToScreen(line.p0, line.p1, camera, viewportWidth, viewportHeight),
  }));

  const intersections: THREE.Vector2[] = [];
  const referenceIntersectionErrors: number[] = [];

  for (let i = 0; i < projected.length; i++) {
    for (let j = i + 1; j < projected.length; j++) {
      const pt = intersectLines(projected[i].lineEq, projected[j].lineEq);
      if (!pt || !Number.isFinite(pt.x) || !Number.isFinite(pt.y)) continue;

      intersections.push(pt);

      const refPt = viewportPointToReference(pt, viewportWidth, viewportHeight);
      referenceIntersectionErrors.push(
        Math.hypot(
          refPt.x - REFERENCE_GEOMETRY.vpPx.x,
          refPt.y - REFERENCE_GEOMETRY.vpPx.y
        )
      );
    }
  }

  const maxRayErrorPx =
    referenceIntersectionErrors.length > 0
      ? Math.max(...referenceIntersectionErrors)
      : Number.POSITIVE_INFINITY;

  const avgRayErrorPx =
    referenceIntersectionErrors.length > 0
      ? referenceIntersectionErrors.reduce((sum, value) => sum + value, 0) /
        referenceIntersectionErrors.length
      : Number.POSITIVE_INFINITY;

  const avgViewportX =
    intersections.reduce((sum, p) => sum + p.x, 0) / (intersections.length || 1);
  const avgViewportY =
    intersections.reduce((sum, p) => sum + p.y, 0) / (intersections.length || 1);

  const projectedVP = {
    x: (avgViewportX / viewportWidth) * REFERENCE_GEOMETRY.width,
    y: (avgViewportY / viewportHeight) * REFERENCE_GEOMETRY.height,
  };

  const vpErrorPx = Math.hypot(
    projectedVP.x - REFERENCE_GEOMETRY.vpPx.x,
    projectedVP.y - REFERENCE_GEOMETRY.vpPx.y
  );

  const silhouettes: SilhouetteError[] = [];

  Object.values(REFERENCE_GEOMETRY.targetLines).forEach((target) => {
    const projectedLine = projected.find((p) => p.name === target.keyLineName);
    if (!projectedLine) return;

    const errorPx = evaluateReferenceLineError(
      projectedLine.p0Px,
      projectedLine.p1Px,
      viewportWidth,
      viewportHeight,
      target.p0,
      target.p1
    );

    silhouettes.push({
      name: target.keyLineName,
      errorPx,
      tolerancePx: target.tolerancePx,
      status: errorPx <= target.tolerancePx ? 'PASS' : 'FAIL',
    });
  });

  const ribErrors: Array<{ errorPx: number; tolerancePx: number }> = [];

  REFERENCE_GEOMETRY.rightWallRayTargets.forEach((target) => {
    const projectedLine = projected.find((p) => p.name === target.keyLineName);
    if (!projectedLine) return;

    const errorPx = evaluateReferenceLineError(
      projectedLine.p0Px,
      projectedLine.p1Px,
      viewportWidth,
      viewportHeight,
      { x: REFERENCE_GEOMETRY.width, y: target.rightY },
      REFERENCE_GEOMETRY.vpPx
    );

    ribErrors.push({ errorPx, tolerancePx: target.tolerancePx });
  });

  const rightRibMaxErrorPx =
    ribErrors.length > 0 ? Math.max(...ribErrors.map((r) => r.errorPx)) : Number.POSITIVE_INFINITY;

  const rightRibAvgErrorPx =
    ribErrors.length > 0
      ? ribErrors.reduce((sum, r) => sum + r.errorPx, 0) / ribErrors.length
      : Number.POSITIVE_INFINITY;

  const rightRibStatus: 'PASS' | 'FAIL' =
    ribErrors.length === REFERENCE_GEOMETRY.rightWallRayTargets.length &&
    ribErrors.every((r) => r.errorPx <= r.tolerancePx)
      ? 'PASS'
      : 'FAIL';

  const maxSilhouetteErrorPx =
    silhouettes.length > 0
      ? Math.max(...silhouettes.map((s) => s.errorPx))
      : Number.POSITIVE_INFINITY;

  const primarySilhouettesPass =
    silhouettes.length === Object.keys(REFERENCE_GEOMETRY.targetLines).length &&
    silhouettes.every((s) => s.status === 'PASS');

  const status: 'PASS' | 'FAIL' =
    vpErrorPx < 3.0 &&
    maxRayErrorPx < 3.0 &&
    primarySilhouettesPass &&
    rightRibStatus === 'PASS'
      ? 'PASS'
      : 'FAIL';

  // These viewport values are intentionally evaluated even though only the
  // canonical result is reported; they make debugging a mismatched viewport
  // straightforward when stepping through this function.
  void targetViewportX;
  void targetViewportY;

  return {
    targetVP: {
      x: REFERENCE_GEOMETRY.vpPx.x,
      y: REFERENCE_GEOMETRY.vpPx.y,
    },
    projectedVP,
    vpErrorPx,
    maxRayErrorPx,
    avgRayErrorPx,
    maxSilhouetteErrorPx,
    rightRibMaxErrorPx,
    rightRibAvgErrorPx,
    rightRibStatus,
    status,
    lineCount: keyLines.length,
    intersectionCount: intersections.length,
    silhouettes,
  };
}

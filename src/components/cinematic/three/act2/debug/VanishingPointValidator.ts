import * as THREE from 'three';
import { REFERENCE_GEOMETRY } from '../constants/referenceGeometry';
import { projectWorldLineToScreen, intersectLines } from '../camera/projection';
import type { SlatMetricData } from '../geometry/Act2Geometry';
import type { FloorCurveValidationData } from '../geometry/FloorSweepRibbon';

export interface SilhouetteError {
  name: string;
  errorPx: number;
  tolerancePx: number;
  startEndpointErrorPx: number;
  status: 'PASS' | 'FAIL';
}

export interface SlatThicknessValidation {
  name: string;
  renderedThicknessPx: number;
  targetThicknessPx: number;
  errorPx: number;
  status: 'PASS' | 'FAIL';
}

export interface FloorCurveError {
  name: string;
  avgErrorPx: number;
  maxErrorPx: number;
  sampleCount: number;
  status: 'PASS' | 'FAIL';
}

export interface CalibrationReport {
  targetVP: { x: number; y: number };
  projectedVP: { x: number; y: number };
  vpErrorPx: number;
  maxRayErrorPx: number;
  avgRayErrorPx: number;
  maxSilhouetteErrorPx: number;
  topBladeEntryErrorPx: number;
  rightRibMaxErrorPx: number;
  rightRibAvgErrorPx: number;
  rightRibStatus: 'PASS' | 'FAIL';
  slatOccupancyStatus: 'PASS' | 'FAIL';
  floorCurveStatus: 'PASS' | 'FAIL';
  floorCurves: FloorCurveError[];
  slatThicknesses: SlatThicknessValidation[];
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

function evaluateReferenceLineError(
  projectedP0: THREE.Vector2,
  projectedP1: THREE.Vector2,
  viewportWidth: number,
  viewportHeight: number,
  targetP0: { x: number; y: number },
  targetP1: { x: number; y: number }
): { lineError: number; startEndpointError: number } {
  const refP0 = viewportPointToReference(projectedP0, viewportWidth, viewportHeight);
  const refP1 = viewportPointToReference(projectedP1, viewportWidth, viewportHeight);
  const lineEq = lineFromPoints(refP0, refP1);

  const { x: a, y: b, z: c } = lineEq;
  const denom = Math.hypot(a, b);
  if (denom < 1e-9) return { lineError: Number.POSITIVE_INFINITY, startEndpointError: Number.POSITIVE_INFINITY };

  const d0 = Math.abs(a * targetP0.x + b * targetP0.y + c) / denom;
  const d1 = Math.abs(a * targetP1.x + b * targetP1.y + c) / denom;

  const startEndpointError = Math.hypot(refP0.x - targetP0.x, refP0.y - targetP0.y);

  return {
    lineError: (d0 + d1) / 2,
    startEndpointError,
  };
}

/**
 * Validates:
 * 1) One-point convergence to canonical VP (1433.21, 586.43),
 * 2) Primary structural silhouettes and true top-boundary entry (Top Blade entry < 3 px),
 * 3) Right-wall ray-family spacing,
 * 4) Real camera-projected slat thickness occupancy (|T_render - T_target| < 3.0 px),
 * 5) Runtime floor-curve reprojection accuracy (E_curve < 1.0 px).
 */
export function validateVanishingPoint(
  keyLines: Array<{ p0: THREE.Vector3; p1: THREE.Vector3; name: string }>,
  camera: THREE.Camera,
  viewportWidth: number,
  viewportHeight: number,
  slatMetrics: SlatMetricData[] = [],
  curveData: FloorCurveValidationData[] = []
): CalibrationReport {
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
  let topBladeEntryErrorPx = 0;

  Object.values(REFERENCE_GEOMETRY.targetLines).forEach((target) => {
    const projectedLine = projected.find((p) => p.name === target.keyLineName);
    if (!projectedLine) return;

    const { lineError, startEndpointError } = evaluateReferenceLineError(
      projectedLine.p0Px,
      projectedLine.p1Px,
      viewportWidth,
      viewportHeight,
      target.p0,
      target.p1
    );

    if (target.keyLineName === 'TopSilverBlade') {
      const refP0 = viewportPointToReference(projectedLine.p0Px, viewportWidth, viewportHeight);
      const refP1 = viewportPointToReference(projectedLine.p1Px, viewportWidth, viewportHeight);
      const lineEq = lineFromPoints(refP0, refP1);

      if (Math.abs(lineEq.x) > 1e-7) {
        const xAtTop = -lineEq.z / lineEq.x;
        topBladeEntryErrorPx = Math.abs(xAtTop - target.p0.x);
      } else {
        topBladeEntryErrorPx = startEndpointError;
      }
    }

    silhouettes.push({
      name: target.keyLineName,
      errorPx: lineError,
      startEndpointErrorPx: startEndpointError,
      tolerancePx: target.tolerancePx,
      status: lineError <= target.tolerancePx ? 'PASS' : 'FAIL',
    });
  });

  const ribErrors: Array<{ errorPx: number; tolerancePx: number }> = [];

  REFERENCE_GEOMETRY.rightWallRayTargets.forEach((target) => {
    const projectedLine = projected.find((p) => p.name === target.keyLineName);
    if (!projectedLine) return;

    const { lineError } = evaluateReferenceLineError(
      projectedLine.p0Px,
      projectedLine.p1Px,
      viewportWidth,
      viewportHeight,
      { x: REFERENCE_GEOMETRY.width, y: target.rightY },
      REFERENCE_GEOMETRY.vpPx
    );

    ribErrors.push({ errorPx: lineError, tolerancePx: target.tolerancePx });
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

  // Real Slat Thickness Projection Validation
  const slatThicknesses: SlatThicknessValidation[] = slatMetrics.map((m) => {
    const topProj = projectWorldLineToScreen(m.topEdgeWorld, new THREE.Vector3(m.topEdgeWorld.x, m.topEdgeWorld.y, -95.0), camera, viewportWidth, viewportHeight);
    const botProj = projectWorldLineToScreen(m.bottomEdgeWorld, new THREE.Vector3(m.bottomEdgeWorld.x, m.bottomEdgeWorld.y, -95.0), camera, viewportWidth, viewportHeight);

    const refTopP0 = viewportPointToReference(topProj.p0Px, viewportWidth, viewportHeight);
    const refTopP1 = viewportPointToReference(topProj.p1Px, viewportWidth, viewportHeight);
    const topEq = lineFromPoints(refTopP0, refTopP1);

    const refBotP0 = viewportPointToReference(botProj.p0Px, viewportWidth, viewportHeight);
    const refBotP1 = viewportPointToReference(botProj.p1Px, viewportWidth, viewportHeight);
    const botEq = lineFromPoints(refBotP0, refBotP1);

    let renderedThicknessPx = 0;
    if (Math.abs(topEq.y) > 1e-7 && Math.abs(botEq.y) > 1e-7) {
      const yTop = (-topEq.x * REFERENCE_GEOMETRY.width - topEq.z) / topEq.y;
      const yBot = (-botEq.x * REFERENCE_GEOMETRY.width - botEq.z) / botEq.y;
      renderedThicknessPx = Math.abs(yTop - yBot);
    } else {
      renderedThicknessPx = m.worldHeight * 52.6;
    }

    const errorPx = Math.abs(renderedThicknessPx - m.targetThicknessPx);

    return {
      name: m.name,
      renderedThicknessPx,
      targetThicknessPx: m.targetThicknessPx,
      errorPx,
      status: errorPx <= 3.0 ? 'PASS' : 'FAIL',
    };
  });

  const slatOccupancyStatus: 'PASS' | 'FAIL' =
    slatThicknesses.length > 0 && slatThicknesses.every((s) => s.status === 'PASS')
      ? 'PASS'
      : 'FAIL';

  // Runtime Floor Curve Reprojection Validation
  const floorCurves: FloorCurveError[] = curveData.map((curve) => {
    const pointErrors: number[] = [];
    const v = new THREE.Vector3();

    for (let i = 0; i < curve.worldPoints.length; i++) {
      v.copy(curve.worldPoints[i]).project(camera);
      const projX = ((v.x + 1) * 0.5) * viewportWidth;
      const projY = ((1 - v.y) * 0.5) * viewportHeight;

      const refX = (projX / viewportWidth) * REFERENCE_GEOMETRY.width;
      const refY = (projY / viewportHeight) * REFERENCE_GEOMETRY.height;

      const target = curve.screenTargetPoints[i];
      const err = Math.hypot(refX - target.x, refY - target.y);
      pointErrors.push(err);
    }

    const avgErrorPx = pointErrors.reduce((sum, e) => sum + e, 0) / pointErrors.length;
    const maxErrorPx = Math.max(...pointErrors);

    return {
      name: curve.name,
      avgErrorPx,
      maxErrorPx,
      sampleCount: curve.worldPoints.length,
      status: avgErrorPx < 1.0 && maxErrorPx < 2.0 ? 'PASS' : 'FAIL',
    };
  });

  const floorCurveStatus: 'PASS' | 'FAIL' =
    floorCurves.length === 0 || floorCurves.every((c) => c.status === 'PASS')
      ? 'PASS'
      : 'FAIL';

  const maxSilhouetteErrorPx =
    silhouettes.length > 0
      ? Math.max(...silhouettes.map((s) => s.errorPx))
      : Number.POSITIVE_INFINITY;

  const primarySilhouettesPass =
    silhouettes.length === Object.keys(REFERENCE_GEOMETRY.targetLines).length &&
    silhouettes.every((s) => s.status === 'PASS') &&
    topBladeEntryErrorPx < 3.0;

  const status: 'PASS' | 'FAIL' =
    vpErrorPx < 3.0 &&
    maxRayErrorPx < 3.0 &&
    primarySilhouettesPass &&
    rightRibStatus === 'PASS' &&
    slatOccupancyStatus === 'PASS' &&
    floorCurveStatus === 'PASS'
      ? 'PASS'
      : 'FAIL';

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
    topBladeEntryErrorPx,
    rightRibMaxErrorPx,
    rightRibAvgErrorPx,
    rightRibStatus,
    slatOccupancyStatus,
    floorCurveStatus,
    floorCurves,
    slatThicknesses,
    status,
    lineCount: keyLines.length,
    intersectionCount: intersections.length,
    silhouettes,
  };
}

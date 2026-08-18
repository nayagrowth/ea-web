export const REFERENCE_GEOMETRY = {
  width: 1672,
  height: 941,
  aspect: 1672 / 941,

  vpPx: { x: 1433.21, y: 586.43 },
  vpUv: { u: 0.85718, v: 0.62320 },
  vpNdc: { x: 0.71436, y: -0.24640 },

  fovY: 38,

  camera: {
    fx: 1366.43,
    fy: 1366.43,
    cx: 1433.21,
    cy: 586.43,
  },

  // Exact off-axis asymmetric frustum at near = 0.1
  frustumAtNear01: {
    left: -0.104887,
    right: 0.017476,
    top: 0.042917,
    bottom: -0.025949,
    near: 0.1,
    far: 150.0,
  },

  // Target Structural Silhouette Lines for Calibration Validation
  targetLines: {
    topBlade: {
      p0: { x: 1660.5, y: 0.0 },
      p1: { x: 1433.21, y: 586.43 },
    },
    leftWallFloorSeam: {
      p0: { x: 0.0, y: 548.0 },
      p1: { x: 1433.21, y: 586.43 },
    },
  },
} as const;

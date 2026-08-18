export const REFERENCE_GEOMETRY = {
  width: 1672,
  height: 941,
  aspect: 1672 / 941,

  // Calibrated right-shifted VP to open hero left wall space (~88.8% width)
  vpPx: { x: 1485.0, y: 586.43 },
  vpUv: { u: 0.88816, v: 0.62320 },
  vpNdc: { x: 0.77632, y: -0.24640 },

  fovY: 38,

  camera: {
    fx: 1366.43,
    fy: 1366.43,
    cx: 1485.0,
    cy: 586.43,
  },

  // Exact off-axis asymmetric frustum at near = 0.1
  frustumAtNear01: {
    left: -0.108678,
    right: 0.013685,
    top: 0.042917,
    bottom: -0.025949,
    near: 0.1,
    far: 150.0,
  },

  // Target Structural Silhouette Lines for Calibration Validation
  targetLines: {
    topBlade: {
      p0: { x: 1660.5, y: 0.0 },
      p1: { x: 1485.0, y: 586.43 },
    },
    leftWallFloorSeam: {
      p0: { x: 0.0, y: 548.0 },
      p1: { x: 1485.0, y: 586.43 },
    },
  },
} as const;

export const REFERENCE_GEOMETRY = {
  width: 1672,
  height: 941,
  aspect: 1672 / 941,

  /**
   * Measured from the supplied 1672 × 941 reference frame.
   * This is the projective source of truth. Do not move it to create layout room;
   * move world geometry instead. Moving the VP changes the room itself.
   */
  vpPx: { x: 1433.21, y: 586.43 },
  vpUv: { u: 0.85718, v: 0.62320 },
  vpNdc: { x: 0.71436, y: -0.24640 },

  fovY: 38,

  camera: {
    fx: 1366.43,
    fy: 1366.43,
    cx: 1433.21,
    cy: 586.43,
    position: { x: 0.0, y: 1.65, z: 0.0 },
  },

  // Exact reference-frame off-axis asymmetric frustum at near = 0.1.
  frustumAtNear01: {
    left: -0.104887,
    right: 0.017476,
    top: 0.042917,
    bottom: -0.025949,
    near: 0.1,
    far: 150.0,
  },

  /**
   * Structural screen-space anchors measured from the reference.
   * They validate room geometry, not decoration.
   */
  targetLines: {
    topBlade: {
      keyLineName: 'TopSilverBlade',
      p0: { x: 1648.69, y: 0.0 },
      p1: { x: 1433.21, y: 586.43 },
      tolerancePx: 3.0,
    },

    mainGoldHorizon: {
      keyLineName: 'MainGoldHorizon',
      p0: { x: 0.0, y: 544.81 },
      p1: { x: 1433.21, y: 586.43 },
      tolerancePx: 3.0,
    },

    // Partly hidden by the reference typography, therefore intentionally looser.
    upperGoldDepthRail: {
      keyLineName: 'UpperGoldDepthRail',
      p0: { x: 0.0, y: 270.0 },
      p1: { x: 1433.21, y: 586.43 },
      tolerancePx: 8.0,
    },
  },

  /**
   * Bright right-wall ray positions measured at the source image right boundary.
   * Additional dark/recessed structure is allowed between these highlights.
   */
  rightWallRayTargets: [
    { keyLineName: 'WallFin_01', rightY: 594.0, tolerancePx: 5.0 },
    { keyLineName: 'WallFin_02', rightY: 549.0, tolerancePx: 5.0 },
    { keyLineName: 'WallFin_03', rightY: 528.0, tolerancePx: 5.0 },
    { keyLineName: 'WallFin_04', rightY: 484.0, tolerancePx: 5.0 },
    { keyLineName: 'WallFin_05', rightY: 444.0, tolerancePx: 5.0 },
    { keyLineName: 'WallFin_06', rightY: 427.0, tolerancePx: 5.0 },
    { keyLineName: 'WallFin_07', rightY: 391.0, tolerancePx: 5.0 },
    { keyLineName: 'WallFin_08', rightY: 378.0, tolerancePx: 5.0 },
    { keyLineName: 'WallFin_09', rightY: 332.0, tolerancePx: 6.0 },
    { keyLineName: 'WallFin_10', rightY: 294.0, tolerancePx: 6.0 },
    { keyLineName: 'WallFin_11', rightY: 247.0, tolerancePx: 7.0 },
    { keyLineName: 'WallFin_12', rightY: 180.0, tolerancePx: 10.0 },
    { keyLineName: 'WallFin_13', rightY: 100.0, tolerancePx: 12.0 },
    { keyLineName: 'WallFin_14', rightY: 30.0, tolerancePx: 14.0 },
  ],
} as const;

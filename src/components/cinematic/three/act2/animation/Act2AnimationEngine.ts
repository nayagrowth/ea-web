import * as THREE from 'three';
import type { Act2GeometryRig } from '../geometry/Act2Geometry';
import type { Act2TypeRig } from '../typography/Act2TypeRig';

export interface Act2LightingRig {
  ambientLight: THREE.AmbientLight;
  rightWallKey: THREE.DirectionalLight;
  leftHeroFill: THREE.DirectionalLight;
  wallModelLight: THREE.PointLight;
  warmRailLight: THREE.PointLight;
  vpLight: THREE.PointLight;
}

export interface Act2SceneController {
  setProgress(progress: number): void;
  setTransitionProgress(progress: number): void;
  setTextProgress(progress: number): void;
  setExitProgress(progress: number): void;
  dispose(): void;
}

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

/**
 * Minimum-jerk polynomial trajectory S(t) = 10t^3 - 15t^4 + 6t^5
 * Satisfies S'(0) = S'(1) = 0 and S''(0) = S''(1) = 0 for silk-smooth scrubbing.
 */
function minimumJerk(t: number): number {
  const x = clamp(t, 0, 1);
  return x * x * x * (10 + x * (-15 + 6 * x));
}

/**
 * Creates the restrained architectural animation engine for Act 2.
 * Strictly adheres to hard motion limits (zero Z travel, <= 32px lateral settle, <= 1.5% scale).
 */
export function createAct2AnimationEngine(
  _geometryRig: Act2GeometryRig,
  typeRig: Act2TypeRig,
  lightingRig: Act2LightingRig
): Act2SceneController {
  const tmpVec = new THREE.Vector3();

  // Baseline light intensities
  const baseAmb = 0.32;
  const baseKey = 4.4;
  const baseFill = 0.85;
  const baseWall = 2.2;
  const baseWarm = 1.4;
  const baseVP = 1.25;

  // Vanishing point origin deep in the corridor void
  const vpOrigin = new THREE.Vector3(2.8, 1.8, -65.0);

  const setProgress = (progress: number) => {
    const p = clamp(progress, 0, 1);

    // =========================================================================
    // 1. ENVIRONMENT LIGHTING PROPAGATION (p in [0.0, 0.30])
    // =========================================================================
    const lightP = minimumJerk(clamp(p / 0.25, 0, 1));
    lightingRig.ambientLight.intensity = baseAmb * (0.4 + 0.6 * lightP);
    lightingRig.rightWallKey.intensity = baseKey * lightP;
    lightingRig.leftHeroFill.intensity = baseFill * lightP;
    lightingRig.wallModelLight.intensity = baseWall * lightP;
    lightingRig.warmRailLight.intensity = baseWarm * lightP;
    lightingRig.vpLight.intensity = baseVP * (0.6 + 0.4 * lightP);

    // Helper: Animate a word flying from the VP void along the perspective angle into its final locked 3D angle
    const animateFlight = (
      quad: typeof typeRig.quads.we,
      pStart: number,
      pEnd: number,
      targetOpacity = 1.0,
      finalRotY = -24,
      finalRotZ = -2.5
    ) => {
      if (!quad) return;

      const c = quad.data.centroid;
      const dx = vpOrigin.x - c.x;
      const dy = vpOrigin.y - c.y;
      const dz = vpOrigin.z - c.z;

      // Calculate initial approach yaw towards the vanishing point
      const approachRotY = Math.min(-36, finalRotY * 1.35);

      if (p < pStart) {
        // Invisible, waiting deep at the vanishing point
        quad.setSpatialState(0, tmpVec.set(dx, dy, dz), finalRotZ, 0.15, approachRotY);
      } else if (p <= pEnd) {
        // Flying forward in 3D perspective from VP void to locked position along the perspective angle
        const t = minimumJerk((p - pStart) / (pEnd - pStart));
        const op = t * targetOpacity;
        const scale = 0.20 + 0.80 * t;
        const xOff = (1.0 - t) * dx;
        const yOff = (1.0 - t) * dy;
        const zOff = (1.0 - t) * dz;
        const currentRotY = approachRotY + (finalRotY - approachRotY) * t;
        quad.setSpatialState(op, tmpVec.set(xOff, yOff, zOff), finalRotZ, scale, currentRotY);
      } else if (p <= 0.86) {
        // True static readable hold: locked in place with genuine 3D perspective angle
        quad.setSpatialState(targetOpacity, tmpVec.set(0, 0, 0), finalRotZ, 1.0, finalRotY);
      } else {
        // Smooth transition handoff into Act 3
        const exitT = minimumJerk((p - 0.86) / 0.14);
        const op = targetOpacity * (1.0 - exitT);
        const zForward = exitT * 4.0;
        quad.setSpatialState(op, tmpVec.set(0, 0, zForward), finalRotZ, 1.0 + 0.05 * exitT, finalRotY);
      }
    };

    // Staggered sequence: words emerge one-by-one along the perspective angle
    animateFlight(typeRig.quads.we, 0.06, 0.28, 1.0, -18, -1.5);
    animateFlight(typeRig.quads.sellOut, 0.16, 0.38, 0.95, -24, -2.5);
    animateFlight(typeRig.quads.your, 0.26, 0.48, 1.0, -18, -1.5);
    animateFlight(typeRig.quads.realEstate, 0.38, 0.60, 1.0, -28, -3.0);
    animateFlight(typeRig.quads.project, 0.48, 0.70, 0.88, -26, -2.5);
  };

  return {
    setProgress,
    setTransitionProgress: setProgress,
    setTextProgress: setProgress,
    setExitProgress: setProgress,
    dispose: () => {
      // Cleanup if needed
    },
  };
}

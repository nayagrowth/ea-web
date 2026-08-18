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

    // =========================================================================
    // 2. 'We' (p in [0.12, 0.28]) - Lateral Settle (X: -20px equivalent to 0)
    // =========================================================================
    const weQuad = typeRig.quads.we;
    if (weQuad) {
      if (p < 0.12) {
        weQuad.setSpatialState(0, tmpVec.set(-0.35, 0, 0), 0, 0.99);
      } else if (p <= 0.28) {
        const t = minimumJerk((p - 0.12) / 0.16);
        const op = t;
        const xOffset = (1.0 - t) * -0.35;
        const scale = 0.99 + 0.01 * t;
        weQuad.setSpatialState(op, tmpVec.set(xOffset, 0, 0), 0, scale);
      } else if (p <= 0.86) {
        // Hero frame lock: exact reference position
        weQuad.setSpatialState(1.0, tmpVec.set(0, 0, 0), 0, 1.0);
      } else {
        // Quiet exit
        const exitT = minimumJerk((p - 0.86) / 0.14);
        weQuad.setSpatialState(1.0 - exitT, tmpVec.set(0, 0, 0), 0, 1.0);
      }
    }

    // =========================================================================
    // 3. 'sell-out' (p in [0.18, 0.34]) - Champagne Gold Draw-on & Subtle Scale
    // =========================================================================
    const sellOutQuad = typeRig.quads.sellOut;
    if (sellOutQuad) {
      if (p < 0.18) {
        sellOutQuad.setSpatialState(0, tmpVec.set(0, 0.10, 0), 0, 0.99);
      } else if (p <= 0.34) {
        const t = minimumJerk((p - 0.18) / 0.16);
        const op = t * 0.95;
        const yOffset = (1.0 - t) * 0.10;
        const scale = 0.99 + 0.01 * t;
        sellOutQuad.setSpatialState(op, tmpVec.set(0, yOffset, 0), 0, scale);
      } else if (p <= 0.86) {
        sellOutQuad.setSpatialState(0.95, tmpVec.set(0, 0, 0), 0, 1.0);
      } else {
        const exitT = minimumJerk((p - 0.86) / 0.14);
        sellOutQuad.setSpatialState(0.95 * (1.0 - exitT), tmpVec.set(0, 0, 0), 0, 1.0);
      }
    }

    // =========================================================================
    // 4. 'your' (p in [0.22, 0.38]) - Act 1 Continuity Handoff & Settle
    // =========================================================================
    const yourQuad = typeRig.quads.your;
    if (yourQuad) {
      if (p < 0.22) {
        yourQuad.setSpatialState(0, tmpVec.set(0, 0.15, 0), 0, 0.99);
      } else if (p <= 0.38) {
        const t = minimumJerk((p - 0.22) / 0.16);
        const op = t;
        const yOffset = (1.0 - t) * 0.15;
        const scale = 0.99 + 0.01 * t;
        yourQuad.setSpatialState(op, tmpVec.set(0, yOffset, 0), 0, scale);
      } else if (p <= 0.86) {
        yourQuad.setSpatialState(1.0, tmpVec.set(0, 0, 0), 0, 1.0);
      } else {
        const exitT = minimumJerk((p - 0.86) / 0.14);
        yourQuad.setSpatialState(1.0 - exitT, tmpVec.set(0, 0, 0), 0, 1.0);
      }
    }

    // =========================================================================
    // 5. 'real estate' (p in [0.28, 0.44]) - Settle from Right (+24px to 0)
    // =========================================================================
    const realEstateQuad = typeRig.quads.realEstate;
    if (realEstateQuad) {
      if (p < 0.28) {
        realEstateQuad.setSpatialState(0, tmpVec.set(0.40, 0, 0), 0, 0.99);
      } else if (p <= 0.44) {
        const t = minimumJerk((p - 0.28) / 0.16);
        const op = t;
        const xOffset = (1.0 - t) * 0.40;
        const scale = 0.99 + 0.01 * t;
        realEstateQuad.setSpatialState(op, tmpVec.set(xOffset, 0, 0), 0, scale);
      } else if (p <= 0.86) {
        realEstateQuad.setSpatialState(1.0, tmpVec.set(0, 0, 0), 0, 1.0);
      } else {
        const exitT = minimumJerk((p - 0.86) / 0.14);
        realEstateQuad.setSpatialState(1.0 - exitT, tmpVec.set(0, 0, 0), 0, 1.0);
      }
    }

    // =========================================================================
    // 6. 'project' (p in [0.34, 0.50]) - Vertical Rise from Floor Reflection (+18px to 0)
    // =========================================================================
    const projectQuad = typeRig.quads.project;
    if (projectQuad) {
      if (p < 0.34) {
        projectQuad.setSpatialState(0, tmpVec.set(0, -0.30, 0), 0, 0.99);
      } else if (p <= 0.50) {
        const t = minimumJerk((p - 0.34) / 0.16);
        const op = t * 0.88;
        const yOffset = (1.0 - t) * -0.30;
        const scale = 0.99 + 0.01 * t;
        projectQuad.setSpatialState(op, tmpVec.set(0, yOffset, 0), 0, scale);
      } else if (p <= 0.86) {
        // Hero frame lock
        projectQuad.setSpatialState(0.88, tmpVec.set(0, 0, 0), 0, 1.0);
      } else {
        const exitT = minimumJerk((p - 0.86) / 0.14);
        projectQuad.setSpatialState(0.88 * (1.0 - exitT), tmpVec.set(0, 0, 0), 0, 1.0);
      }
    }
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

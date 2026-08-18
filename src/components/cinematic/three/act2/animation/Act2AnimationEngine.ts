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

function smoothstep(min: number, max: number, value: number): number {
  const x = clamp((value - min) / (max - min), 0, 1);
  return x * x * (3 - 2 * x);
}

function easeOutCubic(t: number): number {
  const f = t - 1.0;
  return f * f * f + 1.0;
}

function easeOutExpo(t: number): number {
  return t === 1.0 ? 1.0 : 1.0 - Math.pow(2, -10 * t);
}

/**
 * Creates the imperative GSAP-driven animation engine for Act 2.
 * Directly modifies Three.js transforms and materials without React state rerenders.
 */
export function createAct2AnimationEngine(
  _geometryRig: Act2GeometryRig,
  typeRig: Act2TypeRig,
  lightingRig: Act2LightingRig
): Act2SceneController {
  const tmpVec = new THREE.Vector3();

  // Cache initial light intensities
  const baseAmb = 0.32;
  const baseKey = 4.4;
  const baseFill = 0.85;
  const baseWall = 2.2;
  const baseWarm = 1.4;
  const baseVP = 1.25;

  const setProgress = (progress: number) => {
    const p = clamp(progress, 0, 1);

    // =========================================================================
    // BEAT A & B: CORRIDOR IGNITION & DEPTH PROPAGATION (p in [0.0, 0.25])
    // =========================================================================
    const ignitionP = smoothstep(0.0, 0.25, p);
    lightingRig.ambientLight.intensity = baseAmb * (0.3 + 0.7 * ignitionP);
    lightingRig.rightWallKey.intensity = baseKey * ignitionP;
    lightingRig.leftHeroFill.intensity = baseFill * ignitionP;
    lightingRig.wallModelLight.intensity = baseWall * ignitionP;
    lightingRig.warmRailLight.intensity = baseWarm * ignitionP;
    lightingRig.vpLight.intensity = baseVP * (0.5 + 0.5 * ignitionP);

    // =========================================================================
    // BEAT C: 'WE' ENTRY & WALL IMPACT (p in [0.16, 0.34])
    // =========================================================================
    const weQuad = typeRig.quads.we;
    if (weQuad) {
      if (p < 0.16) {
        weQuad.setSpatialState(0, tmpVec.set(0, 0, 8), 0, 1.5);
      } else if (p <= 0.34) {
        const t = easeOutCubic((p - 0.16) / 0.18);
        const op = smoothstep(0.16, 0.26, p);
        const zOffset = (1.0 - t) * 6.0;
        const scale = 1.4 - 0.4 * t;
        weQuad.setSpatialState(op, tmpVec.set(0, 0, zOffset), 0, scale);
      } else if (p <= 0.84) {
        // Hero frame lock
        weQuad.setSpatialState(1.0, tmpVec.set(0, 0, 0), 0, 1.0);
      } else {
        // Exit to Act 3
        const exitT = easeOutCubic((p - 0.84) / 0.16);
        weQuad.setSpatialState(1.0 - exitT, tmpVec.set(0, 0, -exitT * 12), 0, 1.0 - exitT * 0.3);
      }
    }

    // =========================================================================
    // BEAT D: 'sell-out' ENTRY FROM DEPTH (p in [0.24, 0.42])
    // =========================================================================
    const sellOutQuad = typeRig.quads.sellOut;
    if (sellOutQuad) {
      if (p < 0.24) {
        sellOutQuad.setSpatialState(0, tmpVec.set(0, 0, -18), 0, 0.6);
      } else if (p <= 0.42) {
        const t = easeOutExpo((p - 0.24) / 0.18);
        const op = smoothstep(0.24, 0.34, p) * 0.95;
        const zOffset = -(1.0 - t) * 12.0;
        const scale = 0.7 + 0.3 * t;
        sellOutQuad.setSpatialState(op, tmpVec.set(0, 0, zOffset), 0, scale);
      } else if (p <= 0.84) {
        sellOutQuad.setSpatialState(0.95, tmpVec.set(0, 0, 0), 0, 1.0);
      } else {
        const exitT = easeOutCubic((p - 0.84) / 0.16);
        sellOutQuad.setSpatialState(0.95 * (1.0 - exitT), tmpVec.set(0, 0, -exitT * 15), 0, 1.0 - exitT * 0.4);
      }
    }

    // =========================================================================
    // BEAT E: 'your' HANDOFF & POSITIONING (p in [0.28, 0.46])
    // =========================================================================
    const yourQuad = typeRig.quads.your;
    if (yourQuad) {
      if (p < 0.28) {
        yourQuad.setSpatialState(0, tmpVec.set(0, 0, 4), 0, 1.2);
      } else if (p <= 0.46) {
        const t = easeOutCubic((p - 0.28) / 0.18);
        const op = smoothstep(0.28, 0.38, p);
        const zOffset = (1.0 - t) * 3.5;
        yourQuad.setSpatialState(op, tmpVec.set(0, 0, zOffset), 0, 1.0);
      } else if (p <= 0.84) {
        yourQuad.setSpatialState(1.0, tmpVec.set(0, 0, 0), 0, 1.0);
      } else {
        const exitT = easeOutCubic((p - 0.84) / 0.16);
        yourQuad.setSpatialState(1.0 - exitT, tmpVec.set(0, 0, -exitT * 10), 0, 1.0 - exitT * 0.3);
      }
    }

    // =========================================================================
    // BEAT F: 'real estate' ADVANCE FROM VP (p in [0.34, 0.52])
    // =========================================================================
    const realEstateQuad = typeRig.quads.realEstate;
    if (realEstateQuad) {
      if (p < 0.34) {
        realEstateQuad.setSpatialState(0, tmpVec.set(0, 0, -25), 0, 0.5);
      } else if (p <= 0.52) {
        const t = easeOutExpo((p - 0.34) / 0.18);
        const op = smoothstep(0.34, 0.44, p);
        const zOffset = -(1.0 - t) * 16.0;
        const scale = 0.6 + 0.4 * t;
        realEstateQuad.setSpatialState(op, tmpVec.set(0, 0, zOffset), 0, scale);
      } else if (p <= 0.84) {
        realEstateQuad.setSpatialState(1.0, tmpVec.set(0, 0, 0), 0, 1.0);
      } else {
        const exitT = easeOutCubic((p - 0.84) / 0.16);
        realEstateQuad.setSpatialState(1.0 - exitT, tmpVec.set(0, 0, -exitT * 18), 0, 1.0 - exitT * 0.4);
      }
    }

    // =========================================================================
    // BEAT G: 'project' RUNWAY EMERGENCE FROM FLOOR (p in [0.42, 0.60])
    // =========================================================================
    const projectQuad = typeRig.quads.project;
    if (projectQuad) {
      if (p < 0.42) {
        projectQuad.setSpatialState(0, tmpVec.set(0, -1.2, 0), (75 * Math.PI) / 180, 0.9);
      } else if (p <= 0.60) {
        const t = easeOutCubic((p - 0.42) / 0.18);
        const op = smoothstep(0.42, 0.54, p) * 0.85;
        const yOffset = -(1.0 - t) * 1.0;
        const rotX = ((1.0 - t) * 75 * Math.PI) / 180;
        projectQuad.setSpatialState(op, tmpVec.set(0, yOffset, 0), rotX, 1.0);
      } else if (p <= 0.84) {
        projectQuad.setSpatialState(0.85, tmpVec.set(0, 0, 0), 0, 1.0);
      } else {
        const exitT = easeOutCubic((p - 0.84) / 0.16);
        projectQuad.setSpatialState(0.85 * (1.0 - exitT), tmpVec.set(0, 0, -exitT * 20), 0, 1.0 - exitT * 0.5);
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

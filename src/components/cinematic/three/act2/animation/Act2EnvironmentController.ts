import * as THREE from 'three';

export interface Act2EnvironmentRig {
  ambientLight: THREE.AmbientLight;
  rightWallKey: THREE.DirectionalLight;
  leftHeroFill: THREE.DirectionalLight;
  wallModelLight: THREE.PointLight;
  warmRailLight: THREE.PointLight;
  vpLight: THREE.PointLight;
  horizonMaterials?: THREE.MeshStandardMaterial[];
  railMaterials?: THREE.MeshStandardMaterial[];
  louverMaterials?: THREE.MeshStandardMaterial[];
}

export interface Act2EnvironmentController {
  setIgnitionProgress(p: number): void;
  setExitProgress(p: number): void;
  setHoldProgress(p: number): void;
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const minJerk = (t: number) => {
  const x = clamp01(t);
  return x * x * x * (10 + x * (-15 + 6 * x));
};

/**
 * Environment-only controller.
 * NEVER changes camera, room group transform, or vertex geometry.
 */
export function createAct2EnvironmentController(rig: Act2EnvironmentRig): Act2EnvironmentController {
  const base = {
    ambient: 0.08,
    key: 5.2,
    fill: 0.15,
    wall: 2.8,
    warm: 2.2,
    vp: 1.8,
  };

  function setIgnitionProgress(raw: number) {
    const p = minJerk(raw);
    rig.ambientLight.intensity = base.ambient * (0.35 + 0.65 * p);
    rig.rightWallKey.intensity = base.key * (0.2 + 0.8 * p);
    rig.leftHeroFill.intensity = base.fill * (0.35 + 0.65 * p);
    rig.wallModelLight.intensity = base.wall * p;
    rig.warmRailLight.intensity = base.warm * p;
    rig.vpLight.intensity = base.vp * (0.55 + 0.45 * p);

    if (rig.horizonMaterials) {
      rig.horizonMaterials.forEach((m) => {
        m.emissiveIntensity = 0.2 + 2.0 * p;
      });
    }
    if (rig.railMaterials) {
      rig.railMaterials.forEach((m, i) => {
        const stagger = clamp01((p - i * 0.035) / 0.72);
        m.emissiveIntensity = 0.08 + 1.3 * minJerk(stagger);
      });
    }
    if (rig.louverMaterials) {
      rig.louverMaterials.forEach((m, i) => {
        const stagger = clamp01((p - i * 0.025) / 0.78);
        m.emissiveIntensity = 0.02 + 0.28 * minJerk(stagger);
      });
    }
  }

  function setHoldProgress(raw: number) {
    // Intentionally tiny amplitude: ambient life, not layout motion.
    const p = clamp01(raw);
    const wave = Math.sin(p * Math.PI * 2) * 0.035;
    rig.warmRailLight.intensity = base.warm * (1 + wave);
    rig.vpLight.intensity = base.vp * (1 - wave * 0.5);
  }

  function setExitProgress(raw: number) {
    const p = minJerk(raw);
    // Keep the gold motif alive longest; darken the rest first.
    rig.ambientLight.intensity = base.ambient * (1 - 0.7 * p);
    rig.rightWallKey.intensity = base.key * (1 - 0.85 * p);
    rig.leftHeroFill.intensity = base.fill * (1 - 0.85 * p);
    rig.wallModelLight.intensity = base.wall * (1 - p);
    rig.vpLight.intensity = base.vp * (1 - 0.55 * p);
    if (rig.horizonMaterials) {
      rig.horizonMaterials.forEach((m) => {
        m.emissiveIntensity = 2.2 + 1.2 * p;
      });
    }
  }

  return { setIgnitionProgress, setHoldProgress, setExitProgress };
}

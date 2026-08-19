import gsap from 'gsap';
import type { Act2EnvironmentController } from '../three/act2/animation/Act2EnvironmentController';

export interface Act2MotionTimelineOptions {
  scope: HTMLElement;
  environment: Act2EnvironmentController;
}

/**
 * Nested Act 2 timeline. Add this timeline to the master scroll timeline.
 * No React state updates. No word Z travel. No parent/camera transform.
 */
export function createAct2MotionTimelineV8({ scope, environment }: Act2MotionTimelineOptions) {
  const q = gsap.utils.selector(scope);
  const tl = gsap.timeline({ defaults: { ease: 'none' } });

  const envIgnition = { p: 0 };
  const envHold = { p: 0 };
  const envExit = { p: 0 };

  // -----------------------------------------------------------------------
  // INITIAL STATES — geometry is already final; only paint/visibility differs
  // -----------------------------------------------------------------------
  gsap.set(q('.act2-type-overlay'), { autoAlpha: 1 });
  gsap.set(q('.act2-word-we'), {
    autoAlpha: 0,
    x: -10,
    y: 4,
    scale: 1,
    clipPath: 'inset(0 100% 0 0)',
  });
  gsap.set(q('.act2-word-sellout'), {
    autoAlpha: 0,
    x: -3,
    scale: 1,
    clipPath: 'inset(0 100% 0 0)',
  });
  gsap.set(q('.act2-word-your'), {
    autoAlpha: 0,
    x: 0,
    y: 6,
    scale: 1,
    clipPath: 'inset(100% 0 0 0)',
  });
  gsap.set(q('.act2-word-realestate'), {
    autoAlpha: 0,
    x: 12,
    scale: 1,
    clipPath: 'inset(0 0 0 100%)',
  });
  gsap.set(q('.act2-word-project'), {
    autoAlpha: 0,
    y: 10,
    scale: 1,
    clipPath: 'inset(100% 0 0 0)',
  });
  gsap.set(q('.act2-word-project-reflection'), {
    autoAlpha: 0,
  });

  // The renderer is pre-mounted. Its room group and camera stay invariant.
  gsap.set(q('.act2-true-stage'), { autoAlpha: 1, scale: 1, x: 0, y: 0 });

  // -----------------------------------------------------------------------
  // 0.00–0.18 — APERTURE + ENVIRONMENT IGNITION
  // Parent master timeline should simultaneously retract Act 1 shutters.
  // -----------------------------------------------------------------------
  tl.addLabel('ENV_IGNITION', 0.0)
    .to(
      envIgnition,
      {
        p: 1,
        duration: 0.18,
        onUpdate: () => environment.setIgnitionProgress(envIgnition.p),
      },
      'ENV_IGNITION'
    );

  // -----------------------------------------------------------------------
  // 0.10–0.44 — IN-SITU TYPE REVEAL
  // Durations are timeline proportions, not milliseconds in a scrub timeline.
  // -----------------------------------------------------------------------
  tl.addLabel('TYPE_REVEAL', 0.1)
    .to(
      q('.act2-word-we'),
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.15,
        ease: 'power2.out',
      },
      'TYPE_REVEAL'
    )
    .to(
      q('.act2-word-sellout'),
      {
        autoAlpha: 0.95,
        x: 0,
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.16,
        ease: 'power2.out',
      },
      'TYPE_REVEAL+=0.035'
    )
    .to(
      q('.act2-word-your'),
      {
        autoAlpha: 1,
        y: 0,
        clipPath: 'inset(0% 0 0 0)',
        duration: 0.15,
        ease: 'power2.out',
      },
      'TYPE_REVEAL+=0.07'
    )
    .to(
      q('.act2-word-realestate'),
      {
        autoAlpha: 1,
        x: 0,
        clipPath: 'inset(0 0 0 0%)',
        duration: 0.17,
        ease: 'power2.out',
      },
      'TYPE_REVEAL+=0.11'
    )
    .to(
      q('.act2-word-project'),
      {
        autoAlpha: 0.92,
        y: 0,
        clipPath: 'inset(0% 0 0 0)',
        duration: 0.17,
        ease: 'power2.out',
      },
      'TYPE_REVEAL+=0.15'
    )
    .to(
      q('.act2-word-project-reflection'),
      {
        autoAlpha: 0.07,
        duration: 0.09,
        ease: 'power1.out',
      },
      'TYPE_REVEAL+=0.20'
    );

  // -----------------------------------------------------------------------
  // 0.44–0.76 — TRUE HOLD
  // This dummy tween reserves scroll distance. It DOES NOT mutate typography.
  // -----------------------------------------------------------------------
  tl.addLabel('HOLD', 0.44).to(
    envHold,
    {
      p: 1,
      duration: 0.32,
      onUpdate: () => environment.setHoldProgress(envHold.p),
    },
    'HOLD'
  );

  // -----------------------------------------------------------------------
  // 0.76–1.00 — EXIT MOTIF
  // Type is masked away while the gold horizon remains the continuity signal.
  // -----------------------------------------------------------------------
  tl.addLabel('EXIT', 0.76)
    .to(
      q('.act2-word-we'),
      {
        autoAlpha: 0,
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.13,
        ease: 'power2.in',
      },
      'EXIT'
    )
    .to(
      q('.act2-word-sellout'),
      {
        autoAlpha: 0,
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.13,
        ease: 'power2.in',
      },
      'EXIT+=0.015'
    )
    .to(
      q('.act2-word-your'),
      {
        autoAlpha: 0,
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.13,
        ease: 'power2.in',
      },
      'EXIT+=0.03'
    )
    .to(
      q('.act2-word-realestate'),
      {
        autoAlpha: 0,
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.13,
        ease: 'power2.in',
      },
      'EXIT+=0.045'
    )
    .to(
      q('.act2-word-project'),
      {
        autoAlpha: 0,
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.13,
        ease: 'power2.in',
      },
      'EXIT+=0.06'
    )
    .to(
      q('.act2-word-project-reflection'),
      {
        autoAlpha: 0,
        duration: 0.08,
      },
      'EXIT'
    )
    .to(
      envExit,
      {
        p: 1,
        duration: 0.24,
        onUpdate: () => environment.setExitProgress(envExit.p),
      },
      'EXIT'
    );

  return tl;
}

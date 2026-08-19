import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Act1ArtboardPoster } from './acts/Act1ArtboardPoster';
import { Act1ArchitecturalColumns } from './acts/Act1ArchitecturalColumns';
import { Act1PosterHook } from './acts/Act1PosterHook';
import { Act2TrueRenderer, type Act2RendererHandle } from './three/Act2TrueRenderer';
import { Act2EditorialPoster } from './acts/Act2EditorialPoster';
import { Act3Timeline } from './acts/Act3Timeline';
import { Act4TriPanel } from './acts/Act4TriPanel';
import { Act5Credibility } from './acts/Act5Credibility';

gsap.registerPlugin(ScrollTrigger);

export type Act1Variant = 'columns' | 'artboard' | 'poster';

interface CinematicHeroProps {
  act1Variant?: Act1Variant;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({ act1Variant = 'columns' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const act2ControllerRef = useRef<Act2RendererHandle | null>(null);

  useEffect(() => {
    if (!containerRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      // =====================================================================
      // 1. INITIAL STATE SETUP
      // =====================================================================
      // Act 1 Columns Initial State
      gsap.set('.act1-stage', { autoAlpha: 1, x: 0, y: 0 });
      gsap.set('.act1-col-1', { xPercent: 0, opacity: 1 });
      gsap.set('.act1-col-2', { opacity: 1 });
      gsap.set('.act1-col-3', { opacity: 1 });
      gsap.set('.act1-col-4', { xPercent: 0, opacity: 1 });
      gsap.set('.act1-col-bg-1', { xPercent: 0, opacity: 1 });
      gsap.set('.act1-col-bg-2', { opacity: 1 });
      gsap.set('.act1-col-bg-3-top', { yPercent: 0, opacity: 1 });
      gsap.set('.act1-col-bg-3-bottom', { yPercent: 0, opacity: 1 });
      gsap.set('.act1-col-bg-4', { opacity: 1 });
      gsap.set('.act1-scroll-cue', { opacity: 1, y: 0 });

      // Letter-level elements in Act 1
      gsap.set('.act1-most-char', { xPercent: 0, opacity: 1 });
      gsap.set('.act1-agency-char', { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 });
      gsap.set('.act1-col2-axis', { scaleY: 1, transformOrigin: 'top center', opacity: 1 });
      gsap.set('.act1-axis-pulse', { opacity: 0, y: 0 });
      gsap.set('.act1-run-char', { x: 0, y: 0, scale: 1, opacity: 1 });
      gsap.set('.act1-runway-wrap', { rotateX: 0, scaleX: 1, yPercent: 0, opacity: 1 });
      gsap.set('.act1-energy-rail', { opacity: 0, strokeDasharray: '60 300', strokeDashoffset: 300 });
      gsap.set('.act1-your-char', { x: 0, y: 0, scale: 1, opacity: 1 });
      gsap.set('.act1-your-rule', { scaleX: 1, transformOrigin: 'right center', opacity: 1 });
      gsap.set('.act1-your-pulse', { opacity: 0 });
      gsap.set('.act1-gold-halo', { scale: 1, opacity: 0 });
      gsap.set('.act1-bridge-gold-dot', { x: 0, y: 0, scale: 1, opacity: 1 });
      gsap.set('.act1-ads-word', { opacity: 1 });
      gsap.set('.act1-ads-char', { xPercent: 0, yPercent: 0, rotation: 0, opacity: 1, scale: 1 });
      gsap.set('.act1-focal-light-ray', { scaleX: 0, opacity: 0, transformOrigin: 'left center' });
      gsap.set('.act1-mystic-particle', { scale: 0.2, opacity: 0 });
      gsap.set('.act1-col-bg-4', { opacity: 1, transformOrigin: '46.106% 62.320%' });
      gsap.set('.act1-eclipse-rig', { scale: 1, xPercent: 0, yPercent: 0, opacity: 1, filter: 'blur(0px)', transformOrigin: '46.106% 62.320%' });
      gsap.set('.act1-eclipse-glow-wide', { scale: 1, opacity: 0.28 });
      gsap.set('.act1-eclipse-glow-core', { scale: 1, opacity: 0.68 });

      // Act 2 Background Ambient Corridor
      gsap.set('.act2-true-stage', { autoAlpha: 1, scale: 1, x: 0, y: 0 });

      // Act 2 Editorial Poster Elements - HIDDEN DURING ACT 1 (Reveals strictly in Act 2!)
      gsap.set('.act2-poster-stage', { autoAlpha: 0 });
      gsap.set('.act2-ambient-atmosphere', { opacity: 0 });
      gsap.set('.act2-horizon-glow', { scaleX: 0, opacity: 0, transformOrigin: 'center center' });
      gsap.set('.act2-horizon-ray-right', { scaleX: 0, opacity: 0, transformOrigin: 'left center' });
      gsap.set('.act2-vp-flare', { scale: 0.2, opacity: 0 });
      gsap.set('.act2-word-we', { yPercent: 110, opacity: 0 });
      gsap.set('.act2-word-sellout', { yPercent: 110, opacity: 0 });
      gsap.set('.act2-word-your', { yPercent: 110, opacity: 0 });
      gsap.set('.act2-word-realestate', { yPercent: 110, opacity: 0 });
      gsap.set('.act2-word-project', { yPercent: 110, opacity: 0 });
      gsap.set('.act2-project-reflection-wrap', { opacity: 0 });

      // Acts 3 - 5 Initial States
      gsap.set('.act3-stage', { autoAlpha: 0 });
      gsap.set('.act3-line-1', { xPercent: -100, opacity: 0 });
      gsap.set('.act3-line-2', { xPercent: -100, opacity: 0 });
      gsap.set('.act3-horizon-wrap', { scaleX: 0, transformOrigin: 'left center', opacity: 1 });
      gsap.set('.act4-tri-stage', { autoAlpha: 0 });
      gsap.set('.act4-panel-1', { yPercent: 100, opacity: 0 });
      gsap.set('.act4-panel-2', { yPercent: 100, opacity: 0 });
      gsap.set('.act4-panel-3', { yPercent: 100, opacity: 0 });
      gsap.set('.act5-stage', { autoAlpha: 0, yPercent: 35, scale: 0.97 });
      gsap.set('.act5-white-bloom', { opacity: 0 });

      // =====================================================================
      // 2. MASTER CONTINUOUS TIMELINE
      // =====================================================================
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=750%',
          pin: stageRef.current,
          scrub: 0.35,
          anticipatePin: 1,
          snap: {
            snapTo: 'labelsDirectional',
            duration: { min: 0.25, max: 0.55 },
            delay: 0.02,
            ease: 'power2.out',
          },
        },
      });

      // ---------------------------------------------------------------------
      // BEAT 1: SIGNAL IGNITION (Time 0.0 - 0.8)
      // ---------------------------------------------------------------------
      tl.addLabel('ACT1', 0);
      tl.addLabel('IGNITION', 0);

      if (act1Variant === 'columns') {
        tl.to(
          '.act1-bridge-gold-dot',
          {
            scale: 1.15,
            duration: 0.3,
            ease: 'power2.out',
          },
          'IGNITION'
        )
          .to(
            '.act1-gold-halo',
            {
              scale: 1.35,
              opacity: 0.5,
              duration: 0.35,
              ease: 'power2.out',
            },
            'IGNITION'
          )
          .to(
            '.act1-axis-pulse',
            {
              opacity: 1,
              y: '48vh',
              duration: 0.65,
              ease: 'power2.inOut',
            },
            'IGNITION+=0.08'
          )
          .to(
            '.act1-agency-char',
            {
              y: (i) => (i % 2 === 0 ? -4 : 4),
              stagger: 0.025,
              duration: 0.35,
              ease: 'power2.out',
            },
            'IGNITION+=0.1'
          )
          .to(
            '.act1-energy-rail',
            {
              opacity: 1,
              strokeDashoffset: 0,
              duration: 0.6,
              stagger: 0.04,
              ease: 'power2.out',
            },
            'IGNITION+=0.12'
          )
          .to(
            '.act1-your-pulse',
            {
              opacity: 1,
              duration: 0.45,
              ease: 'power2.inOut',
            },
            'IGNITION+=0.25'
          )
          .to(
            '.act1-eclipse-glow-wide',
            {
              opacity: 0.38,
              duration: 0.5,
              ease: 'power2.out',
            },
            'IGNITION+=0.1'
          )
          .to(
            '.act1-eclipse-glow-core',
            {
              opacity: 0.85,
              duration: 0.5,
              ease: 'power2.out',
            },
            'IGNITION+=0.15'
          )
          .to(
            '.act1-scroll-cue',
            {
              opacity: 0,
              y: -15,
              duration: 0.35,
              ease: 'power2.in',
            },
            'IGNITION'
          );
      }

      // ---------------------------------------------------------------------
      // BEAT 2: KINETIC CHARACTER EXPLOSION & DECONSTRUCTION (Time 0.8 - 1.8)
      // ---------------------------------------------------------------------
      tl.addLabel('DECONSTRUCT', 0.8);

      if (act1Variant === 'columns') {
        // "agencies" multi-letter dynamic kinetic dispersion
        tl.to('.act1-agency-char-1', { x: -80, y: -60, rotation: -24, opacity: 0, duration: 0.7, ease: 'power3.in' }, 'DECONSTRUCT')
          .to('.act1-agency-char-2', { x: -40, y: 90, rotation: 18, opacity: 0, duration: 0.7, ease: 'power3.in' }, 'DECONSTRUCT+=0.02')
          .to('.act1-agency-char-3', { x: -15, y: -105, rotation: -12, opacity: 0, duration: 0.7, ease: 'power3.in' }, 'DECONSTRUCT+=0.04')
          .to('.act1-agency-char-4', { x: -10, y: 75, rotation: 16, opacity: 0, duration: 0.7, ease: 'power3.in' }, 'DECONSTRUCT+=0.06')
          .to('.act1-agency-char-5', { x: 35, y: -90, rotation: 22, opacity: 0, duration: 0.7, ease: 'power3.in' }, 'DECONSTRUCT+=0.08')
          .to('.act1-agency-char-6', { x: 0, y: 130, scaleY: 1.4, opacity: 0, duration: 0.7, ease: 'power3.in' }, 'DECONSTRUCT+=0.10')
          .to('.act1-agency-char-7', { x: 60, y: -50, rotation: -18, opacity: 0, duration: 0.7, ease: 'power3.in' }, 'DECONSTRUCT+=0.12')
          .to('.act1-agency-char-8', { x: 90, y: -80, rotation: 30, opacity: 0, duration: 0.7, ease: 'power3.in' }, 'DECONSTRUCT+=0.14')
          .to('.act1-col-bg-2', { opacity: 0, duration: 0.7, ease: 'power2.inOut' }, 'DECONSTRUCT+=0.1')
          .to('.act1-col2-axis', { scaleY: 0, opacity: 0, duration: 0.6, ease: 'power3.in' }, 'DECONSTRUCT+=0.1');

        // "run" perspective propulsion & letter reactivity
        tl.to('.act1-run-char-1', { xPercent: -25, yPercent: -50, rotation: -8, opacity: 0, duration: 0.65, ease: 'power2.in' }, 'DECONSTRUCT')
          .to('.act1-run-char-2', { yPercent: -70, opacity: 0, duration: 0.65, ease: 'power2.in' }, 'DECONSTRUCT+=0.03')
          .to('.act1-run-char-3', { xPercent: 25, yPercent: -50, rotation: 8, opacity: 0, duration: 0.65, ease: 'power2.in' }, 'DECONSTRUCT+=0.06')
          .to('.act1-energy-rail', { opacity: 1, strokeDashoffset: 0, duration: 0.45, stagger: 0.02, ease: 'power2.out' }, 'DECONSTRUCT')
          .to('.act1-runway-wrap', { rotateX: 65, scaleX: 3.2, yPercent: 35, opacity: 0, duration: 0.85, ease: 'power3.inOut' }, 'DECONSTRUCT')
          .to('.act1-col-bg-3-top', { yPercent: -100, duration: 0.8, ease: 'power3.inOut' }, 'DECONSTRUCT')
          .to('.act1-col-bg-3-bottom', { yPercent: 100, duration: 0.8, ease: 'power3.inOut' }, 'DECONSTRUCT');

        // Golden glow rings & halo instantly extinguish to 0 at the start of swipe (no golden ring during shrink)
        tl.to(['.act1-eclipse-glow-wide', '.act1-eclipse-glow-core', '.act1-gold-halo'], {
          opacity: 0,
          duration: 0.12,
          ease: 'power2.in',
        }, 'DECONSTRUCT')
          .to('.act1-bridge-gold-dot', { scale: 0.3, opacity: 0, duration: 0.18, ease: 'power2.in' }, 'DECONSTRUCT');

        // "your" reactive italic drift & baseline laser pulse
        tl.to('.act1-your-char-1', { xPercent: 10, yPercent: -50, rotation: -5, opacity: 0, duration: 0.65, ease: 'power2.in' }, 'DECONSTRUCT')
          .to('.act1-your-char-2', { xPercent: 12, yPercent: -55, rotation: -4, opacity: 0, duration: 0.65, ease: 'power2.in' }, 'DECONSTRUCT+=0.03')
          .to('.act1-your-char-3', { xPercent: 14, yPercent: -60, rotation: -3, opacity: 0, duration: 0.65, ease: 'power2.in' }, 'DECONSTRUCT+=0.06')
          .to('.act1-your-char-4', { xPercent: 16, yPercent: -65, rotation: -2, opacity: 0, duration: 0.65, ease: 'power2.in' }, 'DECONSTRUCT+=0.09')
          .to('.act1-your-rule', { scaleX: 0, duration: 0.5, ease: 'power2.in' }, 'DECONSTRUCT')
          .to('.act1-your-pulse', { opacity: 1, duration: 0.35, ease: 'power2.out' }, 'DECONSTRUCT');

        // "ads" kinetic editorial letter lift & dispersion (does NOT shrink into middle!)
        tl.to('.act1-ads-char-1', { xPercent: -25, yPercent: -50, rotation: -8, opacity: 0, duration: 0.65, ease: 'power2.in' }, 'DECONSTRUCT')
          .to('.act1-ads-char-2', { yPercent: -65, opacity: 0, duration: 0.65, ease: 'power2.in' }, 'DECONSTRUCT+=0.03')
          .to('.act1-ads-char-3', { xPercent: 25, yPercent: -50, rotation: 8, opacity: 0, duration: 0.65, ease: 'power2.in' }, 'DECONSTRUCT+=0.06')
          .to('.act1-ads-char-4', { yPercent: -35, opacity: 0, scale: 0.3, duration: 0.4, ease: 'power2.in' }, 'DECONSTRUCT')

          // Semicircle optical eclipse shrinks into Act 2 vanishing point (85.72vw, 62.32vh) with mystical boundary blurring into the abyss
          .to('.act1-eclipse-rig', {
            scale: 0,
            opacity: 0,
            filter: 'blur(24px)',
            duration: 0.85,
            transformOrigin: '46.106% 62.320%',
            ease: 'power3.in',
          }, 'DECONSTRUCT')
          .to('.act1-col-bg-4', {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
          }, 'DECONSTRUCT+=0.05')

          // Focal horizon light ray shoots across from shrinking circle towards right vanishing point
          .to('.act1-focal-light-ray', {
            scaleX: 1,
            opacity: 1,
            duration: 0.55,
            ease: 'power2.out',
          }, 'DECONSTRUCT+=0.1')
          .to('.act1-focal-light-ray', {
            opacity: 0.85,
            duration: 0.35,
            ease: 'power1.out',
          }, 'DECONSTRUCT+=0.65')

          // Mystical celestial particles scatter outward as the circle dissolves
          .to('.act1-mystic-particle', {
            opacity: (i) => 0.75 + (i % 3) * 0.12,
            scale: (i) => 1.2 + (i % 3) * 0.4,
            x: (i) => Math.sin(i * 1.35) * (45 + (i % 4) * 12),
            y: (i) => Math.cos(i * 1.55) * (45 + (i % 4) * 12),
            duration: 0.45,
            stagger: 0.015,
            ease: 'power2.out',
          }, 'DECONSTRUCT+=0.05')
          .to('.act1-mystic-particle', {
            opacity: 0,
            scale: 0,
            duration: 0.4,
            stagger: 0.015,
            ease: 'power2.in',
          }, 'DECONSTRUCT+=0.35');

        // "Most"
        tl.to('.act1-most-char', { xPercent: -120, opacity: 0, stagger: 0.03, duration: 0.75, ease: 'power3.in' }, 'DECONSTRUCT')
          .to('.act1-col-1', { xPercent: -100, duration: 0.85, ease: 'power3.inOut' }, 'DECONSTRUCT');

        // Terminate Act 1
        tl.to('.act1-stage', { autoAlpha: 0, duration: 0.2 }, 'DECONSTRUCT+=0.75');
      } else {
        tl.to('.act1-stage', { autoAlpha: 0, duration: 0.8, ease: 'power2.inOut' }, 'DECONSTRUCT');
      }

      // Environmental light ignition
      const envIgnition = { p: 0 };
      tl.to(
        envIgnition,
        {
          p: 1,
          duration: 1.0,
          ease: 'power2.out',
          onUpdate: () => act2ControllerRef.current?.setIgnitionProgress(envIgnition.p),
        },
        'DECONSTRUCT+=0.3'
      );

      // ---------------------------------------------------------------------
      // BEAT 3: ACT 2 EDITORIAL POSTER REVEAL (Time 1.8 - 3.2)
      // ---------------------------------------------------------------------
      tl.addLabel('TYPE_REVEAL', 1.8);

      // Reveal Act 2 Poster Stage and the luxury chiaroscuro atmosphere
      tl.to('.act2-poster-stage', { autoAlpha: 1, duration: 0.4 }, 'TYPE_REVEAL')
        .to('.act2-ambient-atmosphere', { opacity: 1, duration: 0.8, ease: 'power2.out' }, 'TYPE_REVEAL')

        // Horizon Laser & Sustained Right-Side Golden Ray
        .to(
          '.act2-horizon-glow',
          {
            scaleX: 1,
            opacity: 0.85,
            duration: 0.9,
            ease: 'power3.out',
          },
          'TYPE_REVEAL'
        )
        .to(
          '.act2-horizon-ray-right',
          {
            scaleX: 1,
            opacity: 0.95,
            duration: 0.8,
            ease: 'power3.out',
          },
          'TYPE_REVEAL'
        )
        .to(
          '.act2-vp-flare',
          {
            scale: 1,
            opacity: 0.7,
            duration: 1.0,
            ease: 'power2.out',
          },
          'TYPE_REVEAL'
        );

      // Staggered Monumental Editorial Typography
      tl.to(
        '.act2-word-we',
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.65,
          ease: 'power3.out',
        },
        'TYPE_REVEAL'
      )
        .to(
          '.act2-word-sellout',
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
          },
          'TYPE_REVEAL+=0.12'
        )
        .to(
          '.act2-word-your',
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.65,
            ease: 'power3.out',
          },
          'TYPE_REVEAL+=0.24'
        )
        .to(
          '.act2-word-realestate',
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
          },
          'TYPE_REVEAL+=0.36'
        )
        .to(
          '.act2-word-project',
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power3.out',
          },
          'TYPE_REVEAL+=0.48'
        )
        .to(
          '.act2-project-reflection-wrap',
          {
            opacity: 0.2,
            duration: 0.5,
            ease: 'power2.out',
          },
          'TYPE_REVEAL+=0.60'
        );

      // ---------------------------------------------------------------------
      // BEAT 4: TRUE STATIC READABLE HOLD (Time 3.2 - 5.4, 2.2s dedicated budget)
      // ---------------------------------------------------------------------
      tl.addLabel('ACT2', 3.2);
      tl.addLabel('ACT2_HOLD', 3.2);

      // Sustained, slow-fading right golden ray during hold
      tl.to(
        '.act2-horizon-ray-right',
        {
          opacity: 0.45,
          duration: 2.2,
          ease: 'power1.out',
        },
        'ACT2_HOLD'
      );

      const envHold = { p: 0 };
      tl.to(
        envHold,
        {
          p: 1,
          duration: 2.2,
          ease: 'none',
          onUpdate: () => act2ControllerRef.current?.setHoldProgress(envHold.p),
        },
        'ACT2_HOLD'
      );

      // ---------------------------------------------------------------------
      // BEAT 5: EXIT MOTIF & ACT 3 IN-PLACE CONTINUITY (Time 5.4 - 6.8)
      // ---------------------------------------------------------------------
      tl.addLabel('ACT2_TO_ACT3', 5.4);

      tl.to(
        ['.act2-word-we', '.act2-word-sellout', '.act2-word-your', '.act2-word-realestate', '.act2-word-project'],
        {
          yPercent: -35,
          opacity: 0,
          stagger: 0.03,
          duration: 0.55,
          ease: 'power2.in',
        },
        'ACT2_TO_ACT3'
      )
        .to('.act2-project-reflection-wrap', { opacity: 0, duration: 0.3 }, 'ACT2_TO_ACT3')
        .to('.act2-poster-stage', { autoAlpha: 0, duration: 0.3 }, 'ACT2_TO_ACT3+=0.6');

      const envExit = { p: 0 };
      tl.to(
        envExit,
        {
          p: 1,
          duration: 0.8,
          ease: 'power2.in',
          onUpdate: () => act2ControllerRef.current?.setExitProgress(envExit.p),
        },
        'ACT2_TO_ACT3'
      );

      // =====================================================================
      // ACT 3: KINETIC HIGH-SPEED TIMELINE ("Within Your Planned Timeline")
      // =====================================================================
      tl.addLabel('ACT3_START', 6.2);

      tl.to('.act3-stage', { autoAlpha: 1, duration: 0.4 }, 'ACT3_START')
        .to(
          '.act3-horizon-wrap',
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power2.out',
          },
          'ACT3_START'
        )
        .to(
          '.act3-line-1',
          {
            xPercent: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
          },
          'ACT3_START+=0.1'
        )
        .to(
          '.act3-line-2',
          {
            xPercent: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
          },
          'ACT3_START+=0.3'
        )
        .to('.act2-true-stage', { autoAlpha: 0, duration: 0.4 }, 'ACT3_START+=0.6');

      // Hold for Act 3
      tl.addLabel('ACT3', 7.4);
      tl.to('.act3-stage', { scale: 1.008, duration: 1.8, ease: 'none' });

      // =====================================================================
      // ACT 3 ➔ ACT 4 MOTIF SPLIT
      // =====================================================================
      tl.addLabel('ACT3_TO_ACT4', '+=0.1');

      tl.to('.act3-line-1', { xPercent: 80, opacity: 0, duration: 0.8, ease: 'power2.in' }, 'ACT3_TO_ACT4')
        .to('.act3-line-2', { xPercent: 80, opacity: 0, duration: 0.8, ease: 'power2.in' }, 'ACT3_TO_ACT4+=0.1')
        .to('.act3-horizon-wrap', { scaleX: 0, opacity: 0, duration: 0.7, ease: 'power3.in' }, 'ACT3_TO_ACT4')
        .to('.act3-stage', { autoAlpha: 0, duration: 0.2 }, 'ACT3_TO_ACT4+=0.7')
        .to('.act4-tri-stage', { autoAlpha: 1, duration: 0.2 }, 'ACT3_TO_ACT4+=0.7')
        .to(
          '.act4-panel-1',
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
          },
          'ACT3_TO_ACT4+=0.7'
        )
        .to(
          '.act4-panel-2',
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
          },
          'ACT3_TO_ACT4+=0.85'
        )
        .to(
          '.act4-panel-3',
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
          },
          'ACT3_TO_ACT4+=1.0'
        );

      tl.addLabel('ACT4', '+=0.1');

      tl.to(['.act4-img-1', '.act4-img-2', '.act4-img-3'], {
        scale: 1.05,
        duration: 2.2,
        ease: 'none',
      });

      // =====================================================================
      // ACT 4 ➔ ACT 5
      // =====================================================================
      tl.addLabel('ACT4_TO_ACT5', '+=0.1');

      tl.to('.act4-panel-1', { scale: 0.97, xPercent: -5, opacity: 0, duration: 0.9, ease: 'power2.in' }, 'ACT4_TO_ACT5')
        .to('.act4-panel-2', { scale: 0.97, opacity: 0, duration: 0.9, ease: 'power2.in' }, 'ACT4_TO_ACT5')
        .to('.act4-panel-3', { scale: 0.97, xPercent: 5, opacity: 0, duration: 0.9, ease: 'power2.in' }, 'ACT4_TO_ACT5')
        .to('.act4-tri-stage', { autoAlpha: 0, duration: 0.2 }, 'ACT4_TO_ACT5+=0.7')
        .to(
          '.act5-stage',
          {
            autoAlpha: 1,
            yPercent: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
          },
          'ACT4_TO_ACT5+=0.7'
        )
        .fromTo(
          '.act5-metric-val',
          { yPercent: 40, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.1, ease: 'power3.out' },
          'ACT4_TO_ACT5+=0.7'
        )
        .fromTo(
          '.act5-headline',
          { yPercent: 25, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          'ACT4_TO_ACT5+=0.85'
        )
        .fromTo(
          '.act5-proof-metrics',
          { yPercent: 20, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          'ACT4_TO_ACT5+=0.95'
        )
        .fromTo(
          '.act5-cta',
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' },
          'ACT4_TO_ACT5+=1.1'
        )
        .to('.act5-white-bloom', { opacity: 0.18, duration: 1.6, ease: 'power2.inOut' }, 'ACT4_TO_ACT5+=0.7');

      tl.addLabel('ACT5', '+=0.1');

      tl.to('.act5-stage', { scale: 1.015, duration: 2.2, ease: 'none' });
    }, stageRef);

    return () => ctx.revert();
  }, [act1Variant]);

  return (
    <div ref={containerRef} className="relative w-full bg-[#08090a]">
      <div
        ref={stageRef}
        className="cinematicStage relative w-full h-screen min-h-[660px] flex flex-col justify-center items-center p-0 m-0 overflow-hidden bg-[#08090a] select-none"
      >
        {/* Layer z-0: Deep Matte Black Base */}
        <div className="absolute inset-0 bg-[#08090a] pointer-events-none z-0" />

        {/* Layer z-10: Ambient Three.js 3D Architectural Depth & Corridor Atmosphere */}
        <div className="act2-true-stage absolute inset-0 z-10 w-full h-full pointer-events-none overflow-hidden">
          <Act2TrueRenderer
            ref={act2ControllerRef}
            className="w-full h-full"
            showCalibrationOverlay={false}
            viewportMode="presentation"
            mountDebugTextQuads={false}
          />
        </div>

        {/* Layer z-20: Modular Act 1 (Solid Architectural Columns) */}
        <div className="act1-aperture-layer absolute inset-0 z-20 w-full h-full pointer-events-none">
          {act1Variant === 'columns' && <Act1ArchitecturalColumns />}
          {act1Variant === 'artboard' && <Act1ArtboardPoster />}
          {act1Variant === 'poster' && <Act1PosterHook />}
        </div>

        {/* Layer z-30: Pure 2D/2.5D Monumental Editorial Poster for Act 2 */}
        <Act2EditorialPoster />

        {/* Layers z-40+: Acts 3-5 */}
        <Act3Timeline />
        <Act4TriPanel />
        <Act5Credibility />
      </div>
    </div>
  );
};

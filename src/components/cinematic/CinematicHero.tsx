import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Act1ArtboardPoster } from './acts/Act1ArtboardPoster';
import { Act1ArchitecturalColumns } from './acts/Act1ArchitecturalColumns';
import { Act1PosterHook } from './acts/Act1PosterHook';
import { Act2TrueRenderer, type Act2RendererHandle } from './three/Act2TrueRenderer';
import { Act2TypographyOverlay } from './acts/Act2TypographyOverlay';
import { createYourContinuityBridge } from './motion/createYourContinuityBridge';
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
  const bridgeHostRef = useRef<HTMLDivElement | null>(null);
  const act2ControllerRef = useRef<Act2RendererHandle | null>(null);

  const [act2Scale, setAct2Scale] = useState(1.0);

  useEffect(() => {
    const updateScale = () => {
      if (!stageRef.current) return;
      const w = stageRef.current.clientWidth || window.innerWidth;
      setAct2Scale(w / 1672);
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      // =====================================================================
      // 1. INITIAL STATE SETUP (Single Owner: GSAP solely controls motion)
      // =====================================================================
      // Act 1 Initial State
      gsap.set('.act1-stage', { autoAlpha: 1, x: 0, y: 0 });
      gsap.set('.act1-col-1', { xPercent: 0, opacity: 1 });
      gsap.set('.act1-col-2', { scaleX: 1, opacity: 1 });
      gsap.set('.act1-col-3', { opacity: 1 });
      gsap.set('.act1-col-4', { xPercent: 0, opacity: 1 });
      gsap.set('.act1-col-bg-1', { xPercent: 0, opacity: 1 });
      gsap.set('.act1-col-bg-2', { opacity: 1 });
      gsap.set('.act1-col-bg-3-top', { yPercent: 0, opacity: 1 });
      gsap.set('.act1-col-bg-3-bottom', { yPercent: 0, opacity: 1 });
      gsap.set('.act1-col-bg-4', { opacity: 1 });
      gsap.set('.act1-scroll-cue', { opacity: 1, y: 0 });
      gsap.set('.act1-most-word', { xPercent: 0, yPercent: 0, scale: 1, opacity: 1 });
      gsap.set('.act1-agencies-word', { xPercent: 0, yPercent: 0, opacity: 1 });
      if (act1Variant !== 'columns') {
        gsap.set('.act1-top-rule', { scaleX: 1, transformOrigin: 'left center' });
        gsap.set('.act1-agencies-slab', { scaleX: 1, transformOrigin: 'left center' });
        gsap.set('.act1-ads-slab', { scaleX: 1, transformOrigin: 'right center' });
        gsap.set('.act1-poster-card', { scale: 1, opacity: 1 });
      }

      // Pre-mounted Act 2 WebGL Stage
      gsap.set('.act2-true-stage', { autoAlpha: 1, scale: 1, x: 0, y: 0 });

      // In-Situ Typography Overlay Initial Masked States (Zero Z-travel)
      gsap.set('.act2-type-overlay', { autoAlpha: 1 });
      gsap.set('.act2-word-we', {
        autoAlpha: 0,
        x: -10,
        y: 4,
        scale: 1,
        clipPath: 'inset(0 100% 0 0)',
      });
      gsap.set('.act2-word-sellout', {
        autoAlpha: 0,
        x: -3,
        scale: 1,
        clipPath: 'inset(0 100% 0 0)',
      });
      gsap.set('.act2-word-your', {
        autoAlpha: 0,
        x: 0,
        y: 6,
        scale: 1,
        clipPath: 'inset(100% 0 0 0)',
      });
      gsap.set('.act2-word-realestate', {
        autoAlpha: 0,
        x: 12,
        scale: 1,
        clipPath: 'inset(0 0 0 100%)',
      });
      gsap.set('.act2-word-project', {
        autoAlpha: 0,
        y: 10,
        scale: 1,
        clipPath: 'inset(100% 0 0 0)',
      });
      gsap.set('.act2-word-project-reflection', {
        autoAlpha: 0,
      });

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
      // 2. MASTER CONTINUOUS TIMELINE (Instant Tactile Scrub: 0.45)
      // =====================================================================
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=850%',
          pin: stageRef.current,
          scrub: 0.45,
          anticipatePin: 1,
        },
      });

      // ---------------------------------------------------------------------
      // BEAT 1: SIGNAL IGNITION (Time 0.0 - 0.8)
      // ---------------------------------------------------------------------
      tl.addLabel('IGNITION', 0);

      if (act1Variant === 'columns') {
        tl.to('.act1-bridge-gold-dot', {
          scale: 1.25,
          duration: 0.4,
          ease: 'power2.out',
        }, 'IGNITION')
          .to('.act1-axis-pulse', {
            opacity: 0.9,
            y: '45vh',
            duration: 0.7,
            ease: 'power2.inOut',
          }, 'IGNITION+=0.1')
          .to('.act1-energy-rail', {
            opacity: 1,
            strokeDashoffset: 0,
            duration: 0.65,
            stagger: 0.04,
            ease: 'power2.out',
          }, 'IGNITION+=0.15')
          .to('.act1-your-pulse', {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.inOut',
          }, 'IGNITION+=0.3')
          .to('.act1-scroll-cue', {
            opacity: 0,
            y: -15,
            duration: 0.4,
            ease: 'power2.in',
          }, 'IGNITION');
      }

      // ---------------------------------------------------------------------
      // BEAT 2: APERTURE HANDOFF (Time 0.8 - 1.8)
      // ---------------------------------------------------------------------
      tl.addLabel('APERTURE', 0.8);

      if (act1Variant === 'columns') {
        tl.to('.act1-col-1', {
          xPercent: -100,
          duration: 0.9,
          ease: 'power3.inOut',
        }, 'APERTURE')
          .to('.act1-col-2', {
            scaleX: 0,
            opacity: 0,
            transformOrigin: 'top center',
            duration: 0.8,
            ease: 'power2.inOut',
          }, 'APERTURE+=0.05')
          .to('.act1-col-bg-3-top', {
            yPercent: -100,
            duration: 0.8,
            ease: 'power3.inOut',
          }, 'APERTURE')
          .to('.act1-col-bg-3-bottom', {
            yPercent: 100,
            duration: 0.8,
            ease: 'power3.inOut',
          }, 'APERTURE')
          .to('.act1-run-word', {
            yPercent: -40,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
          }, 'APERTURE')
          .to('.act1-runway-wrap', {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.in',
          }, 'APERTURE+=0.2')
          .to('.act1-col-4', {
            xPercent: 100,
            duration: 0.9,
            ease: 'power3.inOut',
          }, 'APERTURE+=0.05')
          .to('.act1-bridge-gold-dot', {
            xPercent: -200,
            yPercent: -100,
            opacity: 0,
            scale: 2.5,
            duration: 0.8,
            ease: 'power3.out',
          }, 'APERTURE');

        const act1Your = document.querySelector('.act1-your-word') as HTMLElement | null;
        const act2Your = document.querySelector('.act2-box-your') as HTMLElement | null;
        if (act1Your && act2Your && bridgeHostRef.current) {
          const bridge = createYourContinuityBridge(act1Your, act2Your, bridgeHostRef.current);
          tl.add(bridge.buildTimeline(), 'APERTURE+=0.1');
        }
      } else {
        tl.to('.act1-stage', { autoAlpha: 0, duration: 0.8, ease: 'power2.inOut' }, 'APERTURE');
      }

      const envIgnition = { p: 0 };
      tl.to(envIgnition, {
        p: 1,
        duration: 1.0,
        ease: 'power2.out',
        onUpdate: () => act2ControllerRef.current?.setIgnitionProgress(envIgnition.p),
      }, 'APERTURE');

      // ---------------------------------------------------------------------
      // BEAT 3: IN-SITU EDITORIAL TYPE REVEAL (Time 1.8 - 3.2)
      // ---------------------------------------------------------------------
      tl.addLabel('TYPE_REVEAL', 1.8);

      tl.to('.act2-word-we', {
        autoAlpha: 1,
        x: 0,
        y: 0,
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.6,
        ease: 'power2.out',
      }, 'TYPE_REVEAL')
        .to('.act2-word-sellout', {
          autoAlpha: 0.95,
          x: 0,
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.65,
          ease: 'power2.out',
        }, 'TYPE_REVEAL+=0.12')
        .to('.act2-word-your', {
          autoAlpha: 1,
          y: 0,
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.6,
          ease: 'power2.out',
        }, 'TYPE_REVEAL+=0.24')
        .to('.act2-word-realestate', {
          autoAlpha: 1,
          x: 0,
          clipPath: 'inset(0 0 0 0%)',
          duration: 0.7,
          ease: 'power2.out',
        }, 'TYPE_REVEAL+=0.36')
        .to('.act2-word-project', {
          autoAlpha: 0.92,
          y: 0,
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.7,
          ease: 'power2.out',
        }, 'TYPE_REVEAL+=0.48')
        .to('.act2-word-project-reflection', {
          autoAlpha: 0.07,
          duration: 0.4,
          ease: 'power1.out',
        }, 'TYPE_REVEAL+=0.60');

      // ---------------------------------------------------------------------
      // BEAT 4: TRUE STATIC READABLE HOLD (Time 3.2 - 5.4)
      // ---------------------------------------------------------------------
      tl.addLabel('ACT2_HOLD', 3.2);

      const envHold = { p: 0 };
      tl.to(envHold, {
        p: 1,
        duration: 2.2,
        ease: 'none',
        onUpdate: () => act2ControllerRef.current?.setHoldProgress(envHold.p),
      }, 'ACT2_HOLD');

      // ---------------------------------------------------------------------
      // BEAT 5: EXIT MOTIF & ACT 3 CONTINUITY HANDOFF (Time 5.4 - 6.2)
      // ---------------------------------------------------------------------
      tl.addLabel('ACT2_TO_ACT3', 5.4);

      tl.to('.act2-word-we', {
        autoAlpha: 0,
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.5,
        ease: 'power2.in',
      }, 'ACT2_TO_ACT3')
        .to('.act2-word-sellout', {
          autoAlpha: 0,
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.5,
          ease: 'power2.in',
        }, 'ACT2_TO_ACT3+=0.06')
        .to('.act2-word-your', {
          autoAlpha: 0,
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.5,
          ease: 'power2.in',
        }, 'ACT2_TO_ACT3+=0.12')
        .to('.act2-word-realestate', {
          autoAlpha: 0,
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.5,
          ease: 'power2.in',
        }, 'ACT2_TO_ACT3+=0.18')
        .to('.act2-word-project', {
          autoAlpha: 0,
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.5,
          ease: 'power2.in',
        }, 'ACT2_TO_ACT3+=0.24')
        .to('.act2-word-project-reflection', {
          autoAlpha: 0,
          duration: 0.3,
        }, 'ACT2_TO_ACT3');

      const envExit = { p: 0 };
      tl.to(envExit, {
        p: 1,
        duration: 0.8,
        ease: 'power2.in',
        onUpdate: () => act2ControllerRef.current?.setExitProgress(envExit.p),
      }, 'ACT2_TO_ACT3');

      // =====================================================================
      // ACT 3: KINETIC HIGH-SPEED TIMELINE
      // =====================================================================
      tl.addLabel('ACT3_START', 6.2);

      tl.to('.act3-stage', { autoAlpha: 1, duration: 0.4 }, 'ACT3_START')
        .to('.act3-horizon-wrap', {
          scaleX: 1,
          duration: 1.2,
          ease: 'power2.out',
        }, 'ACT3_START')
        .to('.act3-line-1', {
          xPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
        }, 'ACT3_START+=0.1')
        .to('.act3-line-2', {
          xPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
        }, 'ACT3_START+=0.3')
        .to('.act2-true-stage', { autoAlpha: 0, duration: 0.4 }, 'ACT3_START+=0.6');

      tl.to('.act3-stage', { scale: 1.008, duration: 1.8, ease: 'none' });

      // =====================================================================
      // ACT 4: TRI-PANEL ARCHITECTURAL SLICE
      // =====================================================================
      tl.addLabel('ACT3_TO_ACT4', '+=0.1');

      tl.to('.act3-line-1', { xPercent: 80, opacity: 0, duration: 0.8, ease: 'power2.in' }, 'ACT3_TO_ACT4')
        .to('.act3-line-2', { xPercent: 80, opacity: 0, duration: 0.8, ease: 'power2.in' }, 'ACT3_TO_ACT4+=0.1')
        .to('.act3-horizon-wrap', { scaleX: 0, opacity: 0, duration: 0.7, ease: 'power3.in' }, 'ACT3_TO_ACT4')
        .to('.act3-stage', { autoAlpha: 0, duration: 0.2 }, 'ACT3_TO_ACT4+=0.7')
        .to('.act4-tri-stage', { autoAlpha: 1, duration: 0.2 }, 'ACT3_TO_ACT4+=0.7')
        .to('.act4-panel-1', {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
        }, 'ACT3_TO_ACT4+=0.7')
        .to('.act4-panel-2', {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
        }, 'ACT3_TO_ACT4+=0.85')
        .to('.act4-panel-3', {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
        }, 'ACT3_TO_ACT4+=1.0')
        .to(['.act4-img-1', '.act4-img-2', '.act4-img-3'], {
          scale: 1.05,
          duration: 2.2,
          ease: 'none',
        });

      // =====================================================================
      // ACT 5: ORTHOGONAL VERTICAL SPATIAL RISE
      // =====================================================================
      tl.addLabel('ACT4_TO_ACT5', '+=0.1');

      tl.to('.act4-panel-1', { scale: 0.97, xPercent: -5, opacity: 0, duration: 0.9, ease: 'power2.in' }, 'ACT4_TO_ACT5')
        .to('.act4-panel-2', { scale: 0.97, opacity: 0, duration: 0.9, ease: 'power2.in' }, 'ACT4_TO_ACT5')
        .to('.act4-panel-3', { scale: 0.97, xPercent: 5, opacity: 0, duration: 0.9, ease: 'power2.in' }, 'ACT4_TO_ACT5')
        .to('.act4-tri-stage', { autoAlpha: 0, duration: 0.2 }, 'ACT4_TO_ACT5+=0.7')
        .to('.act5-stage', {
          autoAlpha: 1,
          yPercent: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
        }, 'ACT4_TO_ACT5+=0.7')
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
    }, stageRef);

    return () => ctx.revert();
  }, [act1Variant]);

  return (
    <div ref={containerRef} className="relative w-full bg-[#08090a]">
      <div
        ref={stageRef}
        className="cinematicStage relative w-full h-screen min-h-[660px] flex flex-col justify-center items-center p-0 m-0 overflow-hidden bg-[#08090a] select-none"
      >
        <div className="absolute inset-0 bg-[#08090a] pointer-events-none z-0" />

        <div className="act2-true-stage absolute inset-0 z-10 w-full h-full pointer-events-none overflow-hidden">
          <Act2TrueRenderer
            ref={act2ControllerRef}
            className="w-full h-full"
            showCalibrationOverlay={false}
            viewportMode="presentation"
            mountDebugTextQuads={false}
          />
        </div>

        <div className="act1-aperture-layer absolute inset-0 z-20 w-full h-full pointer-events-none">
          {act1Variant === 'columns' && <Act1ArchitecturalColumns />}
          {act1Variant === 'artboard' && <Act1ArtboardPoster />}
          {act1Variant === 'poster' && <Act1PosterHook />}
        </div>

        <Act2TypographyOverlay scale={act2Scale} className="z-30" />

        <div ref={bridgeHostRef} className="continuity-bridge-layer absolute inset-0 z-40 pointer-events-none" />

        <Act3Timeline />
        <Act4TriPanel />
        <Act5Credibility />
      </div>
    </div>
  );
};

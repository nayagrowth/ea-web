import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Act1ArtboardPoster } from './acts/Act1ArtboardPoster';
import { Act1ArchitecturalColumns } from './acts/Act1ArchitecturalColumns';
import { Act1PosterHook } from './acts/Act1PosterHook';
import { Act2SellOut } from './acts/Act2SellOut';
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

  useEffect(() => {
    if (!containerRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      // =====================================================================
      // 1. INITIAL STATE SETUP (Single Owner: GSAP solely controls motion)
      // =====================================================================
      // Act 1 Initial State
      gsap.set('.act1-stage', { autoAlpha: 1, x: 0, y: 0 });
      gsap.set('.act1-col-bg', { opacity: 1 });
      gsap.set('.act1-scroll-cue', { opacity: 1, y: 0 });
      gsap.set('.act1-most-word', { xPercent: 0, yPercent: 0, scale: 1, opacity: 1 });
      gsap.set('.act1-agencies-word', { opacity: 1 });
      gsap.set('.act1-agencies-char', { x: 0, y: 0, opacity: 1 });
      gsap.set('.act1-col2-axis', { scaleY: 1, transformOrigin: 'top center', opacity: 1 });
      gsap.set('.act1-run-word', { yPercent: 0, scale: 1, opacity: 1 });
      gsap.set('.act1-run-track', { opacity: 1 });
      gsap.set('.act1-run-line', { opacity: 1 });
      gsap.set('.act1-your-word', { xPercent: 0, yPercent: 0, scale: 1, opacity: 1 });
      gsap.set('.act1-your-rule', { scaleX: 1, transformOrigin: 'right center', opacity: 1 });
      gsap.set('.act1-bridge-gold-dot', { x: 0, y: 0, scale: 1, opacity: 1 });
      gsap.set('.act1-ads-text', { scale: 1, opacity: 1 });
      gsap.set('.act1-ads-dot', { scale: 1, opacity: 1 });
      gsap.set('.act1-eclipse-rig', { scale: 1, xPercent: 0, yPercent: 0, opacity: 1 });

      // Fallback classes for artboard/poster variants
      gsap.set('.act1-top-rule', { scaleX: 1, transformOrigin: 'left center' });
      gsap.set('.act1-agencies-slab', { scaleX: 1, transformOrigin: 'left center' });
      gsap.set('.act1-ads-slab', { scaleX: 1, transformOrigin: 'right center' });
      gsap.set('.act1-poster-card', { scale: 1, opacity: 1 });

      // Act 2 Pre-Mounted Double-Buffered Backdrop (Pre-loaded, starts dark)
      gsap.set('.bg-real-estate-tower', { autoAlpha: 0, scale: 1.035, y: 0 });
      gsap.set('.act2-stage', { autoAlpha: 0, x: 0, y: 0 });
      gsap.set('.act2-ambient-gold', { opacity: 0 });
      gsap.set('.sellout-gold-flare', { opacity: 0, scaleX: 0.3, height: '96px', filter: 'blur(24px)' });
      gsap.set('.act2-your-dest', { opacity: 0, scale: 1.25 });
      gsap.set('.sellout-char-angle', { y: 0, opacity: 1, rotateX: 0 });

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
      // 2. MASTER CONTINUOUS TIMELINE (Deterministic, Reversible Motion Graph)
      // =====================================================================
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=900%',
          pin: stageRef.current,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // ---------------------------------------------------------------------
      // ACT 1 HOLD (0.0s - 1.2s): Calm, gallery-grade full readability
      // ---------------------------------------------------------------------
      tl.addLabel('ACT1', 0);
      tl.to({}, { duration: 1.2 });

      // ---------------------------------------------------------------------
      // BEAT 1: MOTIFS REACT (1.2s - 2.4s): Subtle kinetic awakening
      // ---------------------------------------------------------------------
      tl.addLabel('ACT1_REACT', 1.2);

      if (act1Variant === 'columns') {
        tl.to('.act1-scroll-cue', { opacity: 0, y: 10, duration: 0.6, ease: 'power2.in' }, 'ACT1_REACT')
          .to('.act1-most-word', {
            xPercent: -6,
            yPercent: 2,
            scale: 1.025,
            duration: 1.4,
            ease: 'power2.out',
          }, 'ACT1_REACT')
          .to('.act1-col2-axis', {
            scaleY: 0,
            transformOrigin: 'top center',
            duration: 1.0,
            ease: 'power3.in',
          }, 'ACT1_REACT')
          .to('.act1-run-line', {
            opacity: 0.2,
            stagger: { each: 0.02, from: 'center' },
            duration: 1.0,
            ease: 'power2.in',
          }, 'ACT1_REACT')
          .to('.act1-your-rule', {
            scaleX: 0,
            transformOrigin: 'right center',
            duration: 0.8,
            ease: 'power3.in',
          }, 'ACT1_REACT')
          .to('.act1-eclipse-rig', {
            xPercent: 12,
            scale: 1.04,
            duration: 1.4,
            ease: 'power2.out',
          }, 'ACT1_REACT');

        // -------------------------------------------------------------------
        // BEAT 2: ACT 1 DECONSTRUCTION (2.4s - 3.8s): Backgrounds dissolve
        // -------------------------------------------------------------------
        tl.addLabel('ACT1_DECONSTRUCT', 2.4);

        // Continuous quintic smootherstep crossfade into #080909 (including runway base rect)
        tl.to('.act1-col-bg', {
          opacity: 0,
          duration: 1.6,
          ease: 'power2.inOut',
        }, 'ACT1_DECONSTRUCT')
          .to('.act1-most-word', {
            opacity: 0,
            xPercent: -15,
            duration: 1.2,
            ease: 'power2.in',
          }, 'ACT1_DECONSTRUCT')
          .to('.act1-agencies-char', {
            y: (i: number) => (i % 2 === 0 ? -35 : 35),
            x: (i: number) => (i - 3.5) * 18,
            opacity: 0,
            stagger: 0.02,
            duration: 1.2,
            ease: 'power2.in',
          }, 'ACT1_DECONSTRUCT')
          .to('.act1-run-word', {
            yPercent: -35,
            opacity: 0,
            scale: 0.92,
            duration: 1.1,
            ease: 'power2.in',
          }, 'ACT1_DECONSTRUCT')
          .to('.act1-run-track', {
            opacity: 0,
            duration: 0.9,
            ease: 'power2.in',
          }, 'ACT1_DECONSTRUCT')
          .to('.act1-ads-text', {
            scale: 0.88,
            opacity: 0,
            duration: 1.1,
            ease: 'power2.in',
          }, 'ACT1_DECONSTRUCT')
          .to('.act1-ads-dot', {
            opacity: 0,
            scale: 0.4,
            duration: 0.8,
            ease: 'power2.in',
          }, 'ACT1_DECONSTRUCT')
          .to('.act1-eclipse-rig', {
            scale: 0.35,
            opacity: 0,
            xPercent: -25,
            yPercent: 15,
            duration: 1.4,
            ease: 'power2.in',
          }, 'ACT1_DECONSTRUCT');

        // -------------------------------------------------------------------
        // BEAT 3: VISUAL BRIDGE (3.6s - 5.0s): Gold Particle & "your" Flight
        // -------------------------------------------------------------------
        tl.addLabel('BRIDGE', 3.6);

        // Gold dot travels toward center, igniting the warm atmosphere
        tl.to('.act1-bridge-gold-dot', {
          xPercent: -220,
          yPercent: -120,
          scale: 2.4,
          duration: 1.6,
          ease: 'power3.out',
        }, 'BRIDGE')
          .to('.act1-bridge-gold-dot', {
            opacity: 0,
            scale: 5.0,
            duration: 0.7,
            ease: 'power2.out',
          }, 'BRIDGE+=1.1')
          .to('.act1-your-word', {
            xPercent: -80,
            yPercent: -40,
            scale: 0.88,
            opacity: 0,
            duration: 1.4,
            ease: 'power2.inOut',
          }, 'BRIDGE')
          // Kill Act 1 stage cleanly after bridge starts
          .to('.act1-stage', {
            autoAlpha: 0,
            duration: 0.3,
          }, 'BRIDGE+=0.9')
          // Double-buffered backdrop smooth quintic entrance (never flashes)
          .to('.bg-real-estate-tower', {
            autoAlpha: 0.48,
            scale: 1.000,
            y: -14,
            duration: 1.8,
            ease: 'power2.out',
          }, 'BRIDGE+=0.2')
          .to('.act2-ambient-gold', {
            opacity: 1,
            duration: 1.6,
            ease: 'power2.out',
          }, 'BRIDGE+=0.4');
      } else {
        // Fallback for artboard / poster variants
        tl.to('.act1-stage', { autoAlpha: 0, duration: 1.4, ease: 'power2.inOut' }, 'ACT1_REACT')
          .to('.bg-real-estate-tower', { autoAlpha: 0.48, scale: 1, duration: 1.8, ease: 'power2.out' }, 'ACT1_REACT+=0.4');
      }

      // ---------------------------------------------------------------------
      // BEAT 4: ACT 2 ASSEMBLY (4.8s - 6.2s): Spatial Headline Locks In
      // ---------------------------------------------------------------------
      tl.addLabel('ACT2_ENTER', 4.8);

      tl.to('.act2-stage', { autoAlpha: 1, duration: 0.4 }, 'ACT2_ENTER')
        .fromTo(
          '.act2-line-1 .sellout-char-angle',
          { y: 50, opacity: 0, rotateX: 35 },
          { y: 0, opacity: 1, rotateX: 0, stagger: 0.02, duration: 1.2, ease: 'power3.out' },
          'ACT2_ENTER'
        )
        .fromTo(
          '.act2-your-dest',
          { opacity: 0, scale: 1.25, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: 'power3.out' },
          'ACT2_ENTER+=0.2'
        )
        .fromTo(
          '.act2-line-2 .sellout-char-angle',
          { y: 50, opacity: 0, rotateX: 35 },
          { y: 0, opacity: 1, rotateX: 0, stagger: 0.02, duration: 1.2, ease: 'power3.out' },
          'ACT2_ENTER+=0.25'
        )
        .fromTo(
          '.act2-line-3 .sellout-char-angle',
          { y: 50, opacity: 0, rotateX: 35 },
          { y: 0, opacity: 1, rotateX: 0, stagger: 0.02, duration: 1.2, ease: 'power3.out' },
          'ACT2_ENTER+=0.45'
        )
        .fromTo(
          '.sellout-gold-flare',
          { scaleX: 0.3, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.4, ease: 'power2.out' },
          'ACT2_ENTER+=0.2'
        );

      // ---------------------------------------------------------------------
      // BEAT 5: ACT 2 HOLD & SETTLE (6.2s - 8.0s): Luxury authoritative read
      // ---------------------------------------------------------------------
      tl.addLabel('ACT2_HOLD', 6.2);
      tl.to('.act2-stage', { scale: 1.01, duration: 1.8, ease: 'none' }, 'ACT2_HOLD');

      // ---------------------------------------------------------------------
      // ACT 2 ➔ ACT 3 MOTIF MORPH (8.0s - 9.8s): Flare compresses into Laser
      // ---------------------------------------------------------------------
      tl.addLabel('ACT2_TO_ACT3', 8.0);

      // Compress sellout gold flare into thin concentrated laser bar
      tl.to('.sellout-gold-flare', {
        height: '2px',
        filter: 'blur(0px)',
        scaleX: 1.2,
        opacity: 0.85,
        duration: 1.2,
        ease: 'power3.inOut',
      }, 'ACT2_TO_ACT3')
        .to('.act2-line-1', { yPercent: -35, opacity: 0, duration: 1.0, ease: 'power2.in' }, 'ACT2_TO_ACT3')
        .to('.act2-line-2', { yPercent: -25, opacity: 0, duration: 1.0, ease: 'power2.in' }, 'ACT2_TO_ACT3+=0.1')
        .to('.act2-line-3', { yPercent: -15, opacity: 0, duration: 1.0, ease: 'power2.in' }, 'ACT2_TO_ACT3+=0.2')
        .to('.act2-stage', { autoAlpha: 0, duration: 0.3 }, 'ACT2_TO_ACT3+=0.9')

        // =====================================================================
        // ACT 3: KINETIC HIGH-SPEED TIMELINE ("Within Your Planned Timeline")
        // =====================================================================
        .to('.act3-stage', { autoAlpha: 1, duration: 0.3 }, 'ACT2_TO_ACT3+=0.9')
        .to('.act3-horizon-wrap', {
          scaleX: 1,
          duration: 1.4,
          ease: 'power2.out',
        }, 'ACT2_TO_ACT3+=0.9')
        .to('.act3-line-1', {
          xPercent: 0,
          opacity: 1,
          duration: 1.3,
          ease: 'power3.out',
        }, 'ACT2_TO_ACT3+=1.0')
        .to('.act3-line-2', {
          xPercent: 0,
          opacity: 1,
          duration: 1.3,
          ease: 'power3.out',
        }, 'ACT2_TO_ACT3+=1.2');

      // Hold for Act 3
      tl.to('.act3-stage', { scale: 1.01, duration: 2.0, ease: 'none' });

      // ---------------------------------------------------------------------
      // ACT 3 ➔ ACT 4 MOTIF SPLIT: Horizon laser divides into 3 Panel Guides
      // ---------------------------------------------------------------------
      tl.addLabel('ACT3_TO_ACT4', '+=0.1');

      tl.to('.act3-line-1', { xPercent: 80, opacity: 0, duration: 0.9, ease: 'power2.in' }, 'ACT3_TO_ACT4')
        .to('.act3-line-2', { xPercent: 80, opacity: 0, duration: 0.9, ease: 'power2.in' }, 'ACT3_TO_ACT4+=0.1')
        .to('.act3-horizon-wrap', { scaleX: 0, opacity: 0, duration: 0.8, ease: 'power3.in' }, 'ACT3_TO_ACT4')
        .to('.act3-stage', { autoAlpha: 0, duration: 0.2 }, 'ACT3_TO_ACT4+=0.8')

        // =====================================================================
        // ACT 4: TRI-PANEL ARCHITECTURAL SLICE ("4-Phase Sell-Out System")
        // =====================================================================
        .to('.act4-tri-stage', { autoAlpha: 1, duration: 0.2 }, 'ACT3_TO_ACT4+=0.8')
        .to('.act4-panel-1', {
          yPercent: 0,
          opacity: 1,
          duration: 1.3,
          ease: 'power3.out',
        }, 'ACT3_TO_ACT4+=0.8')
        .to('.act4-panel-2', {
          yPercent: 0,
          opacity: 1,
          duration: 1.3,
          ease: 'power3.out',
        }, 'ACT3_TO_ACT4+=0.95')
        .to('.act4-panel-3', {
          yPercent: 0,
          opacity: 1,
          duration: 1.3,
          ease: 'power3.out',
        }, 'ACT3_TO_ACT4+=1.1')

        // Subtle slow pan on the 3 imagery panels
        .to(['.act4-img-1', '.act4-img-2', '.act4-img-3'], {
          scale: 1.05,
          duration: 2.5,
          ease: 'none',
        });

      // ---------------------------------------------------------------------
      // ACT 4 ➔ ACT 5: Three Badges Converge into "459+" Metric
      // ---------------------------------------------------------------------
      tl.addLabel('ACT4_TO_ACT5', '+=0.1');

      tl.to('.act4-panel-1', { scale: 0.97, xPercent: -5, opacity: 0, duration: 1.0, ease: 'power2.in' }, 'ACT4_TO_ACT5')
        .to('.act4-panel-2', { scale: 0.97, opacity: 0, duration: 1.0, ease: 'power2.in' }, 'ACT4_TO_ACT5')
        .to('.act4-panel-3', { scale: 0.97, xPercent: 5, opacity: 0, duration: 1.0, ease: 'power2.in' }, 'ACT4_TO_ACT5')
        .to('.act4-tri-stage', { autoAlpha: 0, duration: 0.2 }, 'ACT4_TO_ACT5+=0.8')

        // =====================================================================
        // ACT 5: ORTHOGONAL VERTICAL SPATIAL RISE ("459+ Real Estate Projects")
        // =====================================================================
        .to('.act5-stage', {
          autoAlpha: 1,
          yPercent: 0,
          scale: 1,
          duration: 1.3,
          ease: 'power3.out',
        }, 'ACT4_TO_ACT5+=0.8')
        .fromTo(
          '.act5-metric-val',
          { yPercent: 40, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
          'ACT4_TO_ACT5+=0.8'
        )
        .fromTo(
          '.act5-headline',
          { yPercent: 25, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
          'ACT4_TO_ACT5+=0.95'
        )

        // Hold for Act 5
        .to('.act5-stage', {
          scale: 1.01,
          duration: 2.0,
          ease: 'none',
        })

        // =====================================================================
        // ACT 5 ➔ WHITE HANDOFF: 459+ radiates into clean warm ivory/white field
        // =====================================================================
        .addLabel('ACT5_TO_WHITE', '+=0.1')
        .to('.act5-white-bloom', {
          opacity: 1,
          duration: 1.4,
          ease: 'power2.inOut',
        }, 'ACT5_TO_WHITE')
        .to('.act5-stage .max-w-5xl', {
          opacity: 0,
          y: -20,
          duration: 0.9,
          ease: 'power2.in',
        }, 'ACT5_TO_WHITE')
        .to('.bg-real-estate-tower', {
          opacity: 0,
          duration: 1.2,
          ease: 'power2.in',
        }, 'ACT5_TO_WHITE');
    }, containerRef);

    return () => ctx.revert();
  }, [act1Variant]);

  return (
    <div ref={containerRef} className="relative w-full bg-[#080909]">
      {/* Permanent Fixed/Pinned Cinematic Stage: Continuous #080909 Foundation */}
      <div
        ref={stageRef}
        className="cinematicStage relative w-full h-screen min-h-[660px] flex flex-col justify-center items-center p-0 m-0 overflow-hidden bg-[#080909] select-none"
        style={{ perspective: '1600px' }}
      >
        {/* Layer 0: Permanent Deep Matte Base */}
        <div className="absolute inset-0 bg-[#080909] pointer-events-none z-0" />

        {/* Layer 1: Pre-Mounted Double-Buffered Backdrop (GSAP solely owns transforms) */}
        <div className="bg-real-estate-tower absolute inset-0 z-1 pointer-events-none">
          <img
            src="/cinematic_luxury_tower.jpg"
            alt="Luxury Tower Elevation"
            className="w-full h-full object-cover filter brightness-90 contrast-125"
          />
          {/* Permanent Static Ambient Dark Veil */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#080909]/85 via-[#080909]/50 to-[#080909]/95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,184,0,0.12)_0%,transparent_65%)]" />
        </div>

        {/* Layer 2: Subtle Ambient Gold Field */}
        <div className="absolute inset-0 z-2 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(245,184,0,0.06)_0%,transparent_70%)]" />

        {/* ===================================================================== */}
        {/* MODULAR ACT 1 (Variant-Selectable) + ACTS 2-5                         */}
        {/* ===================================================================== */}
        {act1Variant === 'columns' && <Act1ArchitecturalColumns />}
        {act1Variant === 'artboard' && <Act1ArtboardPoster />}
        {act1Variant === 'poster' && <Act1PosterHook />}

        <Act2SellOut />
        <Act3Timeline />
        <Act4TriPanel />
        <Act5Credibility />
      </div>
    </div>
  );
};

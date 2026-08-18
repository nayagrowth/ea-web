import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Act1ArtboardPoster } from './acts/Act1ArtboardPoster';
import { Act1ArchitecturalColumns } from './acts/Act1ArchitecturalColumns';
import { Act1PosterHook } from './acts/Act1PosterHook';
import { Act2VelocityPoster } from './acts/Act2VelocityPoster';
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
      // 1. INITIAL STATE SETUP (Single Motion Authority: GSAP)
      // =====================================================================
      // Act 1 Initial State
      gsap.set('.act1-stage', { autoAlpha: 1, x: 0, y: 0 });
      gsap.set('.act1-col-bg-1', { xPercent: 0, opacity: 1 });
      gsap.set('.act1-col-bg-2', { opacity: 1 });
      gsap.set('.act1-col-bg-3-top', { yPercent: 0, rotateX: 0, opacity: 1 });
      gsap.set('.act1-col-bg-3-bottom', { yPercent: 0, opacity: 1 });
      gsap.set('.act1-col-bg-4', { opacity: 1 });
      gsap.set('.act1-scroll-cue', { opacity: 1, y: 0 });
      gsap.set('.act1-most-word', { xPercent: 0, yPercent: 0, scale: 1, opacity: 1 });
      gsap.set('.act1-agencies-word', { xPercent: 0, yPercent: 0, opacity: 1 });
      gsap.set('.act1-col2-axis', { scaleY: 1, transformOrigin: 'top center', opacity: 1 });
      gsap.set('.act1-axis-pulse', { opacity: 0, y: 0 });
      gsap.set('.act1-run-word', { yPercent: 0, scale: 1, opacity: 1 });
      gsap.set('.act1-runway-wrap', { rotateX: 0, scaleX: 1, yPercent: 0, opacity: 1 });
      gsap.set('.act1-run-track', { opacity: 1 });
      gsap.set('.act1-run-line', { opacity: 1 });
      gsap.set('.act1-energy-rail', { opacity: 0, strokeDasharray: '60 300', strokeDashoffset: 300 });
      gsap.set('.act1-your-word', { xPercent: 0, yPercent: 0, scale: 1, opacity: 1 });
      gsap.set('.act1-your-rule', { scaleX: 1, transformOrigin: 'right center', opacity: 1 });
      gsap.set('.act1-your-pulse', { opacity: 0 });
      gsap.set('.act1-bridge-gold-dot', { x: 0, y: 0, scale: 1, opacity: 1 });
      gsap.set('.act1-ads-text', { scale: 1, opacity: 1 });
      gsap.set('.act1-ads-dot', { scale: 1, opacity: 1 });
      gsap.set('.act1-eclipse-rig', { scale: 1, xPercent: 0, yPercent: 0, opacity: 1 });

      // Fallback classes for artboard/poster variants
      gsap.set('.act1-top-rule', { scaleX: 1, transformOrigin: 'left center' });
      gsap.set('.act1-agencies-slab', { scaleX: 1, transformOrigin: 'left center' });
      gsap.set('.act1-ads-slab', { scaleX: 1, transformOrigin: 'right center' });
      gsap.set('.act1-poster-card', { scale: 1, opacity: 1 });

      // Act 2 True 3D Velocity Stage Initial State
      gsap.set('.act2-velocity-stage', { autoAlpha: 0, scale: 1.04, y: 0 });

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
      // 2. MASTER CONTINUOUS TIMELINE (Instant Tactile Scrub: 0.38)
      // =====================================================================
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=850%',
          pin: stageRef.current,
          scrub: 0.38,
          anticipatePin: 1,
        },
      });

      // ---------------------------------------------------------------------
      // BEAT 1: THE SIGNAL IGNITION (Time 0.0 - 0.8): Instant First-Scroll Hook
      // ---------------------------------------------------------------------
      tl.addLabel('IGNITION', 0);

      if (act1Variant === 'columns') {
        // Gold dot physical compression pulse
        tl.to('.act1-bridge-gold-dot', {
          scale: 1.25,
          duration: 0.35,
          ease: 'power2.out',
        }, 'IGNITION')
          .to('.act1-bridge-gold-dot', {
            scale: 1.0,
            duration: 0.35,
            ease: 'power2.inOut',
          }, 'IGNITION+=0.35')

          // Underline energy pulse
          .to('.act1-your-pulse', {
            opacity: 0.8,
            duration: 0.3,
            ease: 'power2.out',
          }, 'IGNITION')
          .to('.act1-your-pulse', {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
          }, 'IGNITION+=0.3')

          // Energy rails illuminate down the runway grooves in center-out stagger
          .to('.act1-energy-rail-0', {
            opacity: 0.9,
            strokeDashoffset: 0,
            duration: 0.55,
            ease: 'power2.out',
          }, 'IGNITION+=0.05')
          .to(['.act1-energy-rail-m1', '.act1-energy-rail-p1'], {
            opacity: 0.85,
            strokeDashoffset: 0,
            duration: 0.55,
            ease: 'power2.out',
          }, 'IGNITION+=0.1')
          .to(['.act1-energy-rail-m2', '.act1-energy-rail-p2'], {
            opacity: 0.8,
            strokeDashoffset: 0,
            duration: 0.55,
            ease: 'power2.out',
          }, 'IGNITION+=0.15')
          .to(['.act1-energy-rail-m3', '.act1-energy-rail-p3'], {
            opacity: 0.75,
            strokeDashoffset: 0,
            duration: 0.55,
            ease: 'power2.out',
          }, 'IGNITION+=0.2')
          .to(['.act1-energy-rail-m4', '.act1-energy-rail-p4'], {
            opacity: 0.7,
            strokeDashoffset: 0,
            duration: 0.55,
            ease: 'power2.out',
          }, 'IGNITION+=0.25')

          // Agencies plumb-line traveling highlight pulse
          .to('.act1-axis-pulse', {
            opacity: 0.9,
            y: 180,
            duration: 0.6,
            ease: 'power2.inOut',
          }, 'IGNITION+=0.15')
          .to('.act1-axis-pulse', {
            opacity: 0,
            duration: 0.25,
          }, 'IGNITION+=0.75')

          // Restrained micro-awakening on typography
          .to('.act1-most-word', {
            xPercent: -2,
            scale: 1.008,
            duration: 0.8,
            ease: 'power2.out',
          }, 'IGNITION')
          .to('.act1-run-word', {
            scale: 1.012,
            duration: 0.8,
            ease: 'power2.out',
          }, 'IGNITION')
          .to('.act1-ads-text', {
            scale: 1.01,
            duration: 0.8,
            ease: 'power2.out',
          }, 'IGNITION')
          .to('.act1-scroll-cue', {
            opacity: 0,
            y: 10,
            duration: 0.4,
          }, 'IGNITION+=0.1');

        // -------------------------------------------------------------------
        // BEAT 2: SOLID MATERIAL DECONSTRUCTION & RUN PLANE 3D ROTATION
        // -------------------------------------------------------------------
        tl.addLabel('DECONSTRUCT', 0.8);

        // Column 1 (Most): Solid porcelain plane slides leftward
        tl.to('.act1-col-bg-1', {
          xPercent: -100,
          duration: 1.0,
          ease: 'power3.inOut',
        }, 'DECONSTRUCT')
          .to('.act1-most-word', {
            xPercent: -80,
            opacity: 0,
            duration: 0.85,
            ease: 'power2.in',
          }, 'DECONSTRUCT')

          // Column 2 (agencies): Whole intact word slides upward; plumb line retracts
          .to('.act1-col2-axis', {
            scaleY: 0,
            transformOrigin: 'top center',
            duration: 0.7,
            ease: 'power3.in',
          }, 'DECONSTRUCT')
          .to('.act1-agencies-word', {
            yPercent: -45,
            opacity: 0,
            duration: 0.85,
            ease: 'power2.in',
          }, 'DECONSTRUCT')

          // Column 3 Top (run): The run plane physically rotates into depth as the floor
          .to('.act1-run-word', {
            yPercent: -40,
            opacity: 0,
            scale: 0.94,
            duration: 0.8,
            ease: 'power2.in',
          }, 'DECONSTRUCT')
          .to('.act1-runway-wrap', {
            rotateX: 68,
            scaleX: 3.6,
            yPercent: 45,
            transformOrigin: 'center bottom',
            duration: 1.1,
            ease: 'power3.inOut',
          }, 'DECONSTRUCT')
          .to('.act1-col-bg-3-top', {
            opacity: 0,
            duration: 0.9,
            ease: 'power2.inOut',
          }, 'DECONSTRUCT+=0.2')

          // Column 3 Bottom (your): Solid #e8e3d9 plane collapses downward
          .to('.act1-col-bg-3-bottom', {
            yPercent: 100,
            duration: 0.9,
            ease: 'power3.inOut',
          }, 'DECONSTRUCT')
          .to('.act1-your-rule', {
            scaleX: 0,
            transformOrigin: 'right center',
            duration: 0.6,
            ease: 'power3.in',
          }, 'DECONSTRUCT')

          // Column 4 (ads.): Eclipse rig glides toward right vanishing point
          .to('.act1-ads-text', {
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.in',
          }, 'DECONSTRUCT')
          .to('.act1-ads-dot', {
            opacity: 0,
            scale: 0.4,
            duration: 0.6,
            ease: 'power2.in',
          }, 'DECONSTRUCT')
          .to('.act1-eclipse-rig', {
            scale: 0.5,
            opacity: 0,
            xPercent: 20,
            yPercent: 10,
            duration: 1.0,
            ease: 'power2.in',
          }, 'DECONSTRUCT');

        // -------------------------------------------------------------------
        // BEAT 3: TRUE 3D VELOCITY CORRIDOR REVEAL (Time 1.6 - 2.8)
        // -------------------------------------------------------------------
        tl.addLabel('PERSPECTIVE_EXPAND', 1.6);

        // Gold dot travels from "your" toward Act 2 corridor
        tl.to('.act1-bridge-gold-dot', {
          xPercent: -230,
          yPercent: -130,
          scale: 2.2,
          duration: 1.1,
          ease: 'power3.out',
        }, 'PERSPECTIVE_EXPAND')
          .to('.act1-bridge-gold-dot', {
            opacity: 0,
            scale: 4.5,
            duration: 0.4,
            ease: 'power2.out',
          }, 'PERSPECTIVE_EXPAND+=0.8')

          // Act 1 Stage terminates cleanly
          .to('.act1-stage', {
            autoAlpha: 0,
            duration: 0.6,
            ease: 'power2.inOut',
          }, 'PERSPECTIVE_EXPAND+=0.2')

          // Act 2 True 3D Velocity Poster Arrives with Full Architectural Presence
          .to('.act2-velocity-stage', {
            autoAlpha: 1,
            scale: 1,
            duration: 1.0,
            ease: 'power3.out',
          }, 'PERSPECTIVE_EXPAND+=0.1');
      } else {
        // Fallback for artboard / poster variants
        tl.to('.act1-stage', { autoAlpha: 0, duration: 1.0, ease: 'power2.inOut' }, 'IGNITION+=0.4')
          .to('.act2-velocity-stage', { autoAlpha: 1, scale: 1, duration: 1.0, ease: 'power2.out' }, 'IGNITION+=0.6');
      }

      // ---------------------------------------------------------------------
      // BEAT 4: ACT 2 STATIC READABLE HOLD (Time 2.8 - 5.6): 100% Legibility
      // ---------------------------------------------------------------------
      tl.addLabel('ACT2_HOLD', 2.8);
      // Entire 3D scene is locked statically for optimal reading experience
      tl.to('.act2-velocity-stage', { scale: 1.008, duration: 2.8, ease: 'none' }, 'ACT2_HOLD');

      // ---------------------------------------------------------------------
      // ACT 2 ➔ ACT 3 MOTIF MORPH (Time 5.6 - 7.2): Seamless Hand-off
      // ---------------------------------------------------------------------
      tl.addLabel('ACT2_TO_ACT3', 5.6);

      tl.to('.act2-velocity-stage', {
        autoAlpha: 0,
        scale: 0.96,
        duration: 0.8,
        ease: 'power2.in',
      }, 'ACT2_TO_ACT3')

        // =====================================================================
        // ACT 3: KINETIC HIGH-SPEED TIMELINE ("Within Your Planned Timeline")
        // =====================================================================
        .to('.act3-stage', { autoAlpha: 1, duration: 0.3 }, 'ACT2_TO_ACT3+=0.6')
        .to('.act3-horizon-wrap', {
          scaleX: 1,
          duration: 1.2,
          ease: 'power2.out',
        }, 'ACT2_TO_ACT3+=0.6')
        .to('.act3-line-1', {
          xPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
        }, 'ACT2_TO_ACT3+=0.7')
        .to('.act3-line-2', {
          xPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
        }, 'ACT2_TO_ACT3+=0.9');

      // Hold for Act 3
      tl.to('.act3-stage', { scale: 1.008, duration: 1.8, ease: 'none' });

      // ---------------------------------------------------------------------
      // ACT 3 ➔ ACT 4 MOTIF SPLIT: Horizon laser divides into 3 Panel Guides
      // ---------------------------------------------------------------------
      tl.addLabel('ACT3_TO_ACT4', '+=0.1');

      tl.to('.act3-line-1', { xPercent: 80, opacity: 0, duration: 0.8, ease: 'power2.in' }, 'ACT3_TO_ACT4')
        .to('.act3-line-2', { xPercent: 80, opacity: 0, duration: 0.8, ease: 'power2.in' }, 'ACT3_TO_ACT4+=0.1')
        .to('.act3-horizon-wrap', { scaleX: 0, opacity: 0, duration: 0.7, ease: 'power3.in' }, 'ACT3_TO_ACT4')
        .to('.act3-stage', { autoAlpha: 0, duration: 0.2 }, 'ACT3_TO_ACT4+=0.7')

        // =====================================================================
        // ACT 4: TRI-PANEL ARCHITECTURAL SLICE ("4-Phase Sell-Out System")
        // =====================================================================
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

        // Subtle slow pan on the 3 imagery panels
        .to(['.act4-img-1', '.act4-img-2', '.act4-img-3'], {
          scale: 1.05,
          duration: 2.2,
          ease: 'none',
        });

      // ---------------------------------------------------------------------
      // ACT 4 ➔ ACT 5: Three Badges Converge into "459+" Metric
      // ---------------------------------------------------------------------
      tl.addLabel('ACT4_TO_ACT5', '+=0.1');

      tl.to('.act4-panel-1', { scale: 0.97, xPercent: -5, opacity: 0, duration: 0.9, ease: 'power2.in' }, 'ACT4_TO_ACT5')
        .to('.act4-panel-2', { scale: 0.97, opacity: 0, duration: 0.9, ease: 'power2.in' }, 'ACT4_TO_ACT5')
        .to('.act4-panel-3', { scale: 0.97, xPercent: 5, opacity: 0, duration: 0.9, ease: 'power2.in' }, 'ACT4_TO_ACT5')
        .to('.act4-tri-stage', { autoAlpha: 0, duration: 0.2 }, 'ACT4_TO_ACT5+=0.7')

        // =====================================================================
        // ACT 5: ORTHOGONAL VERTICAL SPATIAL RISE ("459+ Real Estate Projects")
        // =====================================================================
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

        // Hold for Act 5
        .to('.act5-stage', {
          scale: 1.008,
          duration: 1.8,
          ease: 'none',
        })

        // =====================================================================
        // ACT 5 ➔ WHITE HANDOFF: 459+ radiates into clean warm ivory/white field
        // =====================================================================
        .addLabel('ACT5_TO_WHITE', '+=0.1')
        .to('.act5-white-bloom', {
          opacity: 1,
          duration: 1.2,
          ease: 'power2.inOut',
        }, 'ACT5_TO_WHITE')
        .to('.act5-stage .max-w-5xl', {
          opacity: 0,
          y: -20,
          duration: 0.8,
          ease: 'power2.in',
        }, 'ACT5_TO_WHITE');
    }, containerRef);

    // =======================================================================
    // 3. FINE-POINTER SPATIAL PARALLAX (Nested Rig QuickTo Isolation)
    // =======================================================================
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isFinePointer && !prefersReducedMotion && stageRef.current) {
      const runwayX = gsap.quickTo('.runway-pointer-rig', 'x', { duration: 0.4, ease: 'power3.out' });
      const runwayRotateY = gsap.quickTo('.runway-pointer-rig', 'rotateY', { duration: 0.4, ease: 'power3.out' });
      const eclipseX = gsap.quickTo('.eclipse-pointer-rig', 'x', { duration: 0.5, ease: 'power3.out' });
      const mostX = gsap.quickTo('.most-pointer-rig', 'x', { duration: 0.5, ease: 'power3.out' });

      const handleMouseMove = (e: MouseEvent) => {
        const mx = (e.clientX / window.innerWidth) * 2 - 1; // -1 to 1
        runwayX(mx * 5);
        runwayRotateY(mx * 0.8);
        eclipseX(mx * 3);
        mostX(mx * -2);
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        ctx.revert();
      };
    }

    return () => ctx.revert();
  }, [act1Variant]);

  return (
    <div ref={containerRef} className="relative w-full bg-[#08090a]">
      {/* Permanent Fixed/Pinned Cinematic Stage: Continuous #08090a Foundation */}
      <div
        ref={stageRef}
        className="cinematicStage relative w-full h-screen min-h-[660px] flex flex-col justify-center items-center p-0 m-0 overflow-hidden bg-[#08090a] select-none"
        style={{ perspective: '1600px' }}
      >
        {/* Layer z-0: Permanent Deep Matte Base */}
        <div className="absolute inset-0 bg-[#08090a] pointer-events-none z-0" />

        {/* Layer z-10: Modular Act 1 (Solid Material Panels) */}
        {act1Variant === 'columns' && <Act1ArchitecturalColumns />}
        {act1Variant === 'artboard' && <Act1ArtboardPoster />}
        {act1Variant === 'poster' && <Act1PosterHook />}

        {/* Layer z-20: Act 2 Canonical 1672x941 True 3D Velocity Poster */}
        <Act2VelocityPoster />

        {/* Layers z-25+: Acts 3-5 */}
        <Act3Timeline />
        <Act4TriPanel />
        <Act5Credibility />
      </div>
    </div>
  );
};

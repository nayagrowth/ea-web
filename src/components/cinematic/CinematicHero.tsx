import React, { useEffect, useRef, useState } from 'react';
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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !stageRef.current) return;

    // Refresh scroll triggers when variant changes
    ScrollTrigger.getAll().forEach((t) => t.kill());

    const ctx = gsap.context(() => {
      // =====================================================================
      // 1. INITIAL STATE SETUP: All scenes pre-mounted with zero visual flash
      // =====================================================================
      // Foundation & Stage
      gsap.set('.act1-stage', { autoAlpha: 1, x: 0, y: 0 });
      gsap.set('.act1-col-bg', { opacity: 1 });
      gsap.set('.act1-scroll-cue', { opacity: 1, y: 0 });

      // Column 1
      gsap.set('.act1-most-word', { xPercent: 0, yPercent: 0, scale: 1, opacity: 1 });

      // Column 2
      gsap.set('.act1-agencies-word', { opacity: 1 });
      gsap.set('.act1-agencies-char', { x: 0, y: 0, opacity: 1 });
      gsap.set('.act1-col2-axis', { scaleY: 1, transformOrigin: 'top center', opacity: 1 });

      // Column 3
      gsap.set('.act1-run-word', { yPercent: 0, scale: 1, opacity: 1 });
      gsap.set('.act1-run-track', { opacity: 1 });
      gsap.set('.act1-run-line', { opacity: 1 });
      gsap.set('.act1-your-word', { xPercent: 0, yPercent: 0, scale: 1, opacity: 1 });
      gsap.set('.act1-your-rule', { scaleX: 1, transformOrigin: 'right center', opacity: 1 });
      gsap.set('.act1-bridge-gold-dot', { x: 0, y: 0, scale: 1, opacity: 1 });

      // Column 4
      gsap.set('.act1-ads-text', { scale: 1, opacity: 1 });
      gsap.set('.act1-ads-dot', { scale: 1, opacity: 1 });
      gsap.set('.act1-eclipse-glow', { scale: 1, xPercent: 0, yPercent: 0, opacity: 1 });
      gsap.set('.act1-eclipse-disc', { scale: 1, xPercent: 0, yPercent: 0, opacity: 1 });

      // Artboard Poster fallback classes
      gsap.set('.act1-top-rule', { scaleX: 1, transformOrigin: 'left center' });
      gsap.set('.act1-agencies-slab', { scaleX: 1, transformOrigin: 'left center' });
      gsap.set('.act1-ads-slab', { scaleX: 1, transformOrigin: 'right center' });
      gsap.set('.act1-poster-card', { scale: 1, opacity: 1 });

      // Act 2 Pre-Mounted Double-Buffered Backdrop (Pre-loaded, starts invisible)
      gsap.set('.bg-real-estate-tower', { autoAlpha: 0, scale: 1.035 });
      gsap.set('.act2-stage', { autoAlpha: 0, x: 0, y: 0 });
      gsap.set('.act2-ambient-gold', { opacity: 0 });
      gsap.set('.sellout-gold-flare', { opacity: 0, scaleX: 0.4 });
      gsap.set('.act2-your-dest', { opacity: 0, scale: 1.2 });
      gsap.set('.sellout-char-angle', { y: 0, opacity: 1, rotateX: 0 });

      // Acts 3 - 5 Initial States
      gsap.set('.act3-stage', { autoAlpha: 0 });
      gsap.set('.act3-line-1', { xPercent: -100, opacity: 0 });
      gsap.set('.act3-line-2', { xPercent: -100, opacity: 0 });
      gsap.set('.act3-horizon-wrap', { scaleX: 0, transformOrigin: 'left center' });
      gsap.set('.act4-tri-stage', { autoAlpha: 0 });
      gsap.set('.act4-panel-3', { yPercent: 100, opacity: 0 });
      gsap.set('.act4-panel-2', { yPercent: 100, opacity: 0 });
      gsap.set('.act4-panel-1', { yPercent: 100, opacity: 0 });
      gsap.set('.act5-stage', { autoAlpha: 0, yPercent: 40, scale: 0.96 });

      // =====================================================================
      // 2. MASTER CONTINUOUS TIMELINE (Deterministic & Fully Reversible)
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
          onUpdate: (self) => setScrollProgress(self.progress),
        },
      });

      // ---------------------------------------------------------------------
      // ACT 1 HOLD (0.0s - 1.2s): Calm, gallery-grade full readability
      // ---------------------------------------------------------------------
      tl.addLabel('ACT1', 0);
      tl.to({}, { duration: 1.2 }); // Hold

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
          .to('.act1-eclipse-disc', {
            xPercent: 12,
            scale: 1.04,
            duration: 1.4,
            ease: 'power2.out',
          }, 'ACT1_REACT');

        // -------------------------------------------------------------------
        // BEAT 2: ACT 1 DECONSTRUCTION (2.4s - 3.8s): Backgrounds dissolve
        // -------------------------------------------------------------------
        tl.addLabel('ACT1_DECONSTRUCT', 2.4);

        // Continuous quintic smootherstep crossfade into #080909
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
          .to('.act1-eclipse-glow', {
            scale: 0.35,
            opacity: 0,
            xPercent: -30,
            yPercent: 15,
            duration: 1.4,
            ease: 'power2.in',
          }, 'ACT1_DECONSTRUCT')
          .to('.act1-eclipse-disc', {
            opacity: 0,
            xPercent: 30,
            duration: 1.3,
            ease: 'power2.in',
          }, 'ACT1_DECONSTRUCT');

        // -------------------------------------------------------------------
        // BEAT 3: VISUAL BRIDGE (3.6s - 5.0s): Gold Particle & "your" Flight
        // -------------------------------------------------------------------
        tl.addLabel('BRIDGE', 3.6);

        // Gold dot travels from "your" toward center, generating the warm atmosphere
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
          // Double-buffered backdrop smooth quintic entrance (never flashes)
          .to('.bg-real-estate-tower', {
            autoAlpha: 0.48,
            scale: 1.000,
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
          { scaleX: 0.4, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.4, ease: 'power2.out' },
          'ACT2_ENTER+=0.2'
        );

      // ---------------------------------------------------------------------
      // BEAT 5: ACT 2 HOLD & SETTLE (6.2s - 8.2s): Luxury authoritative read
      // ---------------------------------------------------------------------
      tl.addLabel('ACT2_HOLD', 6.2);
      tl.to('.act2-stage', { scale: 1.01, duration: 2.0, ease: 'none' }, 'ACT2_HOLD');

      // ---------------------------------------------------------------------
      // ACT 2 OUTRO ➔ ACT 3 (8.2s+)
      // ---------------------------------------------------------------------
      tl.addLabel('ACT2_EXIT', 8.2);

      tl.to('.act2-line-1', { yPercent: -40, opacity: 0, duration: 1.0, ease: 'power2.in' }, 'ACT2_EXIT')
        .to('.act2-line-2', { yPercent: -30, opacity: 0, duration: 1.0, ease: 'power2.in' }, 'ACT2_EXIT+=0.1')
        .to('.act2-line-3', { yPercent: -20, opacity: 0, duration: 1.0, ease: 'power2.in' }, 'ACT2_EXIT+=0.2')
        .to('.act2-stage', { autoAlpha: 0, duration: 0.4 }, 'ACT2_EXIT+=0.8')

        // =====================================================================
        // ACT 3: KINETIC HIGH-SPEED TIMELINE ("Within Your Planned Timeline")
        // =====================================================================
        .to('.act3-stage', { autoAlpha: 1, duration: 0.4 }, 'ACT2_EXIT+=0.8')
        .to('.act3-line-1', {
          xPercent: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
        }, 'ACT2_EXIT+=0.9')
        .to('.act3-line-2', {
          xPercent: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
        }, 'ACT2_EXIT+=1.1')
        .to('.act3-horizon-wrap', {
          scaleX: 1,
          duration: 1.8,
          ease: 'power2.out',
        }, 'ACT2_EXIT+=1.0')

        // Hold for Act 3
        .to('.act3-stage', { scale: 1.01, duration: 2.2, ease: 'none' })

        // ACT 3 OUTRO
        .to('.act3-line-1', { xPercent: 100, opacity: 0, duration: 1.0, ease: 'power2.in' })
        .to('.act3-line-2', { xPercent: 100, opacity: 0, duration: 1.0, ease: 'power2.in' }, '-=0.85')
        .to('.act3-horizon-wrap', { scaleX: 0, opacity: 0, duration: 0.8 }, '-=0.8')
        .to('.act3-stage', { autoAlpha: 0, duration: 0.2 })

        // =====================================================================
        // ACT 4: TRI-PANEL ARCHITECTURAL SLICE ("4-Phase Sell-Out System")
        // =====================================================================
        .to('.act4-tri-stage', { autoAlpha: 1, duration: 0.2 })
        .to('.act4-panel-1', {
          yPercent: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
        })
        .to('.act4-panel-2', {
          yPercent: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
        }, '-=1.2')
        .to('.act4-panel-3', {
          yPercent: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
        }, '-=1.2')

        // Subtle pan on the 3 imagery panels
        .to(['.act4-img-1', '.act4-img-2', '.act4-img-3'], {
          scale: 1.06,
          duration: 2.5,
          ease: 'none',
        })

        // ACT 4 OUTRO: Panels slide out vertically
        .to(['.act4-panel-1', '.act4-panel-2', '.act4-panel-3'], {
          yPercent: -100,
          opacity: 0,
          stagger: 0.08,
          duration: 1.0,
          ease: 'power2.in',
        })
        .to('.act4-tri-stage', { autoAlpha: 0, duration: 0.1 })

        // =====================================================================
        // ACT 5: ORTHOGONAL VERTICAL SPATIAL RISE ("459+ Real Estate Projects")
        // =====================================================================
        .to('.act5-stage', {
          autoAlpha: 1,
          yPercent: 0,
          scale: 1,
          duration: 1.4,
          ease: 'power3.out',
        })
        .fromTo(
          '.act5-metric-val',
          { yPercent: 40, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
          '-=1.2'
        )
        .fromTo(
          '.act5-headline',
          { yPercent: 25, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
          '-=0.9'
        )

        // Final hold for Act 5
        .to('.act5-stage', {
          scale: 1.01,
          duration: 2.5,
          ease: 'none',
        });
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

        {/* Layer 1: Pre-Mounted Double-Buffered Backdrop (Pre-loaded, zero flash) */}
        <div
          className="bg-real-estate-tower absolute inset-0 z-1 pointer-events-none transition-transform duration-700 ease-out"
          style={{
            transform: `scale(${1 + scrollProgress * 0.12}) translateY(${scrollProgress * -25}px)`,
          }}
        >
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

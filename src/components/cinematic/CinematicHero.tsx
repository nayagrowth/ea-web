import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Act1Hook } from './acts/Act1Hook';
import { Act2SellOut } from './acts/Act2SellOut';
import { Act3Timeline } from './acts/Act3Timeline';
import { Act4TriPanel } from './acts/Act4TriPanel';
import { Act5Credibility } from './acts/Act5Credibility';

gsap.registerPlugin(ScrollTrigger);

export const CinematicHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Initial State Setup (Pure Hardware-Accelerated Transforms)
      gsap.set('.act1-stage', { autoAlpha: 1, x: 0, y: 0 });
      gsap.set('.act2-stage', { autoAlpha: 0, x: 0, y: 0 });
      gsap.set('.act3-stage', { autoAlpha: 0 });
      gsap.set('.act3-line-1', { xPercent: -100, opacity: 0 });
      gsap.set('.act3-line-2', { xPercent: -100, opacity: 0 });
      gsap.set('.act3-horizon-wrap', { scaleX: 0, transformOrigin: 'left center' });
      gsap.set('.act4-tri-stage', { autoAlpha: 0 });
      gsap.set('.act4-panel-3', { yPercent: 100, opacity: 0 });
      gsap.set('.act4-panel-2', { yPercent: 100, opacity: 0 });
      gsap.set('.act4-panel-1', { yPercent: 100, opacity: 0 });
      gsap.set('.act5-stage', { autoAlpha: 0, yPercent: 40, scale: 0.96 });
      gsap.set('.bg-real-estate-tower', { opacity: 0.45 });

      // 2. Mathematically Budgeted Master Scrubbed Timeline (900% scrub distance, 0.8s responsive scrub)
      const tl = gsap.timeline({
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

      // =====================================================================
      // ACT 1 (0% to 20%): "Most agencies run your ads."
      // =====================================================================
      tl.to('.trap-char', {
        z: () => gsap.utils.random(200, 600),
        x: () => gsap.utils.random(-250, 250),
        y: () => gsap.utils.random(-180, 180),
        rotateX: () => gsap.utils.random(-60, 60),
        rotateY: () => gsap.utils.random(-60, 60),
        opacity: 0,
        stagger: {
          each: 0.012,
          from: 'random',
        },
        duration: 1.2,
        ease: 'power2.inOut',
      })
        .to('.act1-stage', {
          autoAlpha: 0,
          duration: 0.2,
        }, '-=0.2')

        // Tower background fades to pitch black
        .to('.bg-real-estate-tower', {
          opacity: 0,
          duration: 1.0,
          ease: 'power2.inOut',
        }, '-=0.4')

        // =====================================================================
        // ACT 2 (20% to 40%): "We sell-out your real estate project"
        // =====================================================================
        .to('.act2-stage', {
          autoAlpha: 1,
          duration: 0.1,
        })
        .fromTo(
          '.sellout-char-angle',
          {
            x: (i) => (i % 2 === 0 ? -120 : 120),
            y: (i) => (i % 3 === 0 ? 80 : -80),
            z: (i) => -250 - i * 10,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            z: 0,
            opacity: 1,
            stagger: {
              each: 0.015,
              from: 'center',
            },
            duration: 1.4,
            ease: 'power3.out',
          },
          '-=0.1'
        )
        .fromTo(
          '.sellout-gold-flare',
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.0, ease: 'power3.out' },
          '-=0.6'
        )

        // Reading hold for Act 2
        .to('.act2-stage', {
          scale: 1.015,
          duration: 1.8,
          ease: 'none',
        })

        // =====================================================================
        // ACT 2 OUTRO & ACT 3 ENTRANCE: Clean Staggered Leftward Flow
        // =====================================================================
        .to('.act2-line-1', {
          xPercent: -120,
          opacity: 0,
          duration: 0.9,
          ease: 'power2.in',
        })
        .to('.act2-line-2', {
          xPercent: -120,
          opacity: 0,
          duration: 0.9,
          ease: 'power2.in',
        }, '-=0.75')
        .to('.act2-line-3', {
          xPercent: -120,
          opacity: 0,
          duration: 0.9,
          ease: 'power2.in',
        }, '-=0.75')
        .to('.act2-stage', {
          autoAlpha: 0,
          duration: 0.1,
        })

        // ---------------------------------------------------------------------
        // Act 3 Enters Staggered Line-by-Line from the Left
        // ---------------------------------------------------------------------
        .to('.act3-stage', {
          autoAlpha: 1,
          duration: 0.1,
        }, '-=0.3')
        .to('.act3-line-1', {
          xPercent: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
        }, '-=0.2')
        .to('.act3-line-2', {
          xPercent: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power3.out',
        }, '-=0.8')
        .to('.act3-horizon-wrap', {
          scaleX: 1,
          duration: 1.2,
          ease: 'power2.out',
        }, '-=0.8')

        // Comfortable Reading Hold for Act 3
        .to('.act3-stage', {
          scale: 1.015,
          duration: 2.0,
          ease: 'none',
        })

        // =====================================================================
        // ACT 3 OUTRO ➔ ACT 4 ENTRANCE: MATHEMATICAL SEAMLESS HANDSHAKE
        // Text sweeps left while Panel 3, 2, and 1 rise in sequence
        // =====================================================================
        .to('.act3-line-1', {
          xPercent: -120,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        })
        .to('.act3-line-2', {
          xPercent: -120,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        }, '-=1.1')
        .to('.act3-horizon-wrap', {
          xPercent: -100,
          opacity: 0,
          duration: 0.9,
          ease: 'power2.inOut',
        }, '-=1.1')

        // Handshake: Panel 3 (Right) rises as text begins sweeping left
        .to('.act4-tri-stage', {
          autoAlpha: 1,
          duration: 0.1,
        }, '-=1.2')
        .to('.act4-panel-3', {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
        }, '-=1.15')

        // Panel 2 (Center) rises as text clears middle
        .to('.act4-panel-2', {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
        }, '-=0.85')

        // Panel 1 (Left) rises as text exits off the screen
        .to('.act4-panel-1', {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
        }, '-=0.55')

        .to('.act3-stage', {
          autoAlpha: 0,
          duration: 0.1,
        }, '-=0.2')

        // =====================================================================
        // ACT 4 READING HOLD & CINEMATIC SCALE
        // =====================================================================
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
        .to('.act4-tri-stage', {
          autoAlpha: 0,
          duration: 0.1,
        })

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
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#000000]">
      {/* Pinned Stage: 100vh locked viewport */}
      <div
        ref={stageRef}
        className="relative w-full h-screen min-h-[660px] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-4 overflow-hidden bg-[#000000] select-none"
        style={{ perspective: '1600px' }}
      >
        {/* Frame 1 Real Estate Tower Backdrop (Fades out to pitch black on scroll) */}
        <div
          className="bg-real-estate-tower absolute inset-0 z-0 pointer-events-none transition-transform duration-700 ease-out"
          style={{
            transform: `scale(${1 + scrollProgress * 0.15}) translateY(${scrollProgress * -30}px)`,
          }}
        >
          <img
            src="/cinematic_luxury_tower.jpg"
            alt="Luxury Tower Elevation"
            className="w-full h-full object-cover filter brightness-90 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/85 via-[#000000]/45 to-[#000000]/95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,184,0,0.14)_0%,transparent_65%)]" />
        </div>

        {/* Ambient Subtle Gold Atmosphere (Pitch Black Base) */}
        <div className="absolute inset-0 z-1 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(245,184,0,0.08)_0%,transparent_70%)]" />

        {/* ===================================================================== */}
        {/* MODULAR 5-ACT ARCHITECTURE                                            */}
        {/* ===================================================================== */}
        <Act1Hook />
        <Act2SellOut />
        <Act3Timeline />
        <Act4TriPanel />
        <Act5Credibility />
      </div>
    </div>
  );
};

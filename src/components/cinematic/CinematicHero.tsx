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
      // 1. Initial States Setup
      gsap.set('.act1-stage', { autoAlpha: 1, x: 0, y: 0 });
      gsap.set('.act2-stage', { autoAlpha: 0, x: 0, y: 0 });
      gsap.set('.act3-stage', { autoAlpha: 0 });
      gsap.set('.act3-line-1', { x: -800, opacity: 0 });
      gsap.set('.act3-line-2', { x: -800, opacity: 0 });
      gsap.set('.act3-horizon-wrap', { scaleX: 0, transformOrigin: 'left center' });
      gsap.set('.act4-tri-stage', { autoAlpha: 0 });
      gsap.set('.act4-panel-3', { y: '100%', opacity: 0 });
      gsap.set('.act4-panel-2', { y: '100%', opacity: 0 });
      gsap.set('.act4-panel-1', { y: '100%', opacity: 0 });
      gsap.set('.act5-stage', { autoAlpha: 0, y: 80, scale: 0.94 });
      gsap.set('.bg-real-estate-tower', { opacity: 0.45 });

      // 2. Master Scrubbed Timeline for 5 Acts (1400% scrub distance)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=1400%',
          pin: stageRef.current,
          scrub: 1.15,
          anticipatePin: 1,
          onUpdate: (self) => setScrollProgress(self.progress),
        },
      });

      // =====================================================================
      // ACT 1: "Most agencies run your ads." (Architectural Dusk Hook)
      // =====================================================================
      tl.to('.trap-char', {
        z: () => gsap.utils.random(250, 750),
        x: () => gsap.utils.random(-320, 320),
        y: () => gsap.utils.random(-220, 220),
        rotateX: () => gsap.utils.random(-90, 90),
        rotateY: () => gsap.utils.random(-90, 90),
        opacity: 0,
        filter: 'blur(14px)',
        stagger: {
          each: 0.015,
          from: 'random',
        },
        duration: 1.6,
        ease: 'power3.inOut',
      })
        .to('.act1-stage', {
          autoAlpha: 0,
          duration: 0.2,
        }, '-=0.2')

        // Transition background to pitch black
        .to('.bg-real-estate-tower', {
          opacity: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        }, '-=0.5')

        // =====================================================================
        // ACT 2: "We sell-out your real estate project"
        // =====================================================================
        .to('.act2-stage', {
          autoAlpha: 1,
          duration: 0.1,
        })
        .fromTo(
          '.sellout-char-angle',
          {
            x: (i) => (i % 2 === 0 ? -160 : 160),
            y: (i) => (i % 3 === 0 ? 100 : -100),
            z: (i) => -350 - i * 15,
            rotateX: (i) => (i % 2 === 0 ? 40 : -40),
            rotateY: (i) => (i % 2 === 0 ? -50 : 50),
            opacity: 0,
            filter: 'blur(12px)',
          },
          {
            x: 0,
            y: 0,
            z: 0,
            rotateX: 0,
            rotateY: 0,
            opacity: 1,
            filter: 'blur(0px)',
            stagger: {
              each: 0.02,
              from: 'center',
            },
            duration: 2.0,
            ease: 'expo.out',
          },
          '-=0.1'
        )
        .fromTo(
          '.sellout-gold-flare',
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.4, ease: 'power3.out' },
          '-=0.8'
        )

        // Reading hold for Act 2
        .to('.act2-stage', {
          scale: 1.02,
          duration: 2.4,
          ease: 'none',
        })

        // =====================================================================
        // ACT 2 OUTRO & ACT 3 ENTRANCE: Cascading Left-to-Right Flow
        // =====================================================================
        .to('.act2-line-1', {
          x: -900,
          opacity: 0,
          filter: 'blur(12px)',
          duration: 1.1,
          ease: 'power3.in',
        })
        .to('.act2-line-2', {
          x: -900,
          opacity: 0,
          filter: 'blur(12px)',
          duration: 1.1,
          ease: 'power3.in',
        }, '-=0.85')
        .to('.act2-line-3', {
          x: -900,
          opacity: 0,
          filter: 'blur(12px)',
          duration: 1.1,
          ease: 'power3.in',
        }, '-=0.85')
        .to('.act2-stage', {
          autoAlpha: 0,
          duration: 0.1,
        })

        // ---------------------------------------------------------------------
        // Act 3 Enters Cascading Line-by-Line
        // ---------------------------------------------------------------------
        .to('.act3-stage', {
          autoAlpha: 1,
          duration: 0.1,
        }, '-=0.4')
        .to('.act3-line-1', {
          x: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
        }, '-=0.3')
        .to('.act3-line-2', {
          x: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
        }, '-=1.0')
        .to('.act3-horizon-wrap', {
          scaleX: 1,
          duration: 1.6,
          ease: 'power2.out',
        }, '-=1.0')

        // Generous Reading Hold for Act 3
        .to('.act3-stage', {
          scale: 1.02,
          duration: 3.2,
          ease: 'none',
        })

        // =====================================================================
        // ACT 3 OUTRO ➔ ACT 4 ENTRANCE: MATHEMATICAL SEAMLESS HANDSHAKE
        // As "planned timeline." sweeps left, Panel 3 (Right) rises FIRST,
        // then Panel 2 (Center) rises, and finally Panel 1 (Left) rises as text exits!
        // =====================================================================
        // Step A: Act 3 starts sliding left
        .to('.act3-line-1', {
          x: -950,
          opacity: 0,
          filter: 'blur(14px)',
          duration: 1.6,
          ease: 'power2.inOut',
        })
        .to('.act3-line-2', {
          x: -950,
          opacity: 0,
          filter: 'blur(14px)',
          duration: 1.6,
          ease: 'power2.inOut',
        }, '-=1.4')
        .to('.act3-horizon-wrap', {
          x: -700,
          opacity: 0,
          scaleX: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        }, '-=1.4')

        // Step B: Mathematical Handshake — Panel 3 (Right) rises immediately as "timeline." starts clearing the right side
        .to('.act4-tri-stage', {
          autoAlpha: 1,
          duration: 0.1,
        }, '-=1.5')
        .to('.act4-panel-3', {
          y: '0%',
          opacity: 1,
          duration: 1.3,
          ease: 'power3.out',
        }, '-=1.4')

        // Step C: Panel 2 (Center) rises as text sweeps across the center
        .to('.act4-panel-2', {
          y: '0%',
          opacity: 1,
          duration: 1.3,
          ease: 'power3.out',
        }, '-=1.05')

        // Step D: Panel 1 (Left) rises exactly as the text completely exits off the left edge
        .to('.act4-panel-1', {
          y: '0%',
          opacity: 1,
          duration: 1.3,
          ease: 'power3.out',
        }, '-=0.7')

        .to('.act3-stage', {
          autoAlpha: 0,
          duration: 0.1,
        }, '-=0.3')

        // =====================================================================
        // ACT 4 READING HOLD & SLOW PARALLAX ZOOM
        // =====================================================================
        .to(['.act4-img-1', '.act4-img-2', '.act4-img-3'], {
          scale: 1.08,
          duration: 3.5,
          ease: 'none',
        })

        // ACT 4 OUTRO: Panels slide out with spatial depth
        .to(['.act4-panel-1', '.act4-panel-2', '.act4-panel-3'], {
          y: '-100%',
          opacity: 0,
          filter: 'blur(12px)',
          stagger: 0.12,
          duration: 1.2,
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
          y: 0,
          scale: 1,
          duration: 2.0,
          ease: 'power3.out',
        })
        .fromTo(
          '.act5-metric-val',
          { y: 60, opacity: 0, filter: 'blur(10px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.6, ease: 'power3.out' },
          '-=1.5'
        )
        .fromTo(
          '.act5-headline',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.4, ease: 'power3.out' },
          '-=1.1'
        )

        // Final hold for Act 5
        .to('.act5-stage', {
          scale: 1.01,
          duration: 3.2,
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

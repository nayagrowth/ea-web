import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 3D Spatial Character Engine with Dynamic Vector Trajectories
const SpatialChars: React.FC<{ text: string; className?: string; charClass?: string }> = ({
  text,
  className = '',
  charClass = 'spatial-char',
}) => {
  return (
    <span className={`inline-block ${className}`} style={{ perspective: '1400px' }}>
      {text.split(' ').map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, cIdx) => (
            <span
              key={cIdx}
              className={`inline-block ${charClass}`}
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity, filter',
              }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
};

export const CinematicHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Initial State Setup (Zero overlap / 100% clean isolation)
      gsap.set('.act1-stage', { autoAlpha: 1, x: 0, y: 0 });
      gsap.set('.act2-stage', { autoAlpha: 0, x: 0, y: 0 });
      gsap.set('.act3-stage', { autoAlpha: 0 });
      gsap.set('.act4-stage', { autoAlpha: 0, y: 70, scale: 0.94 });
      gsap.set('.bg-real-estate-tower', { opacity: 0.45 });
      gsap.set('.act3-schedule-node', { autoAlpha: 0, y: 20 });

      // 2. Master Scrubbed Timeline for 4 Acts (Total 800% scrub distance)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=800%',
          pin: stageRef.current,
          scrub: 1.1,
          anticipatePin: 1,
          onUpdate: (self) => setScrollProgress(self.progress),
        },
      });

      // =====================================================================
      // ACT 1 (0% to 22%): "Most agencies run your ads." (Architectural Dusk)
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
        duration: 1.5,
        ease: 'power3.inOut',
      })
        .to('.act1-stage', {
          autoAlpha: 0,
          duration: 0.2,
        }, '-=0.2')

        // Fade out tower background -> Transition to Pure Pitch Black
        .to('.bg-real-estate-tower', {
          opacity: 0,
          duration: 1,
          ease: 'power2.inOut',
        }, '-=0.5')

        // =====================================================================
        // ACT 2 (22% to 46%): "We sell-out your real estate project"
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
            duration: 1.8,
            ease: 'expo.out',
          },
          '-=0.1'
        )
        .fromTo(
          '.sellout-gold-flare',
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.2, ease: 'power3.out' },
          '-=0.8'
        )

        // Reading hold for Act 2
        .to('.act2-stage', {
          scale: 1.02,
          duration: 1.8,
          ease: 'none',
        })

        // =====================================================================
        // ACT 2 STAGGERED OUTRO: Line-by-Line Left-Side Acceleration
        // =====================================================================
        .to('.act2-line-1', {
          x: -600,
          opacity: 0,
          filter: 'blur(12px)',
          duration: 1.0,
          ease: 'power3.in',
        })
        .to('.act2-line-2', {
          x: -600,
          opacity: 0,
          filter: 'blur(12px)',
          duration: 1.0,
          ease: 'power3.in',
        }, '-=0.8')
        .to('.act2-line-3', {
          x: -600,
          opacity: 0,
          filter: 'blur(12px)',
          duration: 1.0,
          ease: 'power3.in',
        }, '-=0.8')
        .to('.act2-stage', {
          autoAlpha: 0,
          duration: 0.1,
        })

        // =====================================================================
        // ACT 3 (46% to 74%): "Within your" (Top-Left) + "planned timeline." (Center)
        // =====================================================================
        .to('.act3-stage', {
          autoAlpha: 1,
          duration: 0.1,
        })
        .fromTo(
          '.timeline-char-stream',
          {
            x: -350,
            opacity: 0,
            filter: 'blur(12px)',
          },
          {
            x: 0,
            opacity: 1,
            filter: 'blur(0px)',
            stagger: 0.02,
            duration: 1.6,
            ease: 'power3.out',
          },
          '-=0.1'
        )
        .to('.act3-schedule-node', {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
        }, '-=1.0')

        // Extended Clean Reading Hold for Act 3
        .to('.act3-stage', {
          scale: 1.02,
          duration: 2.8,
          ease: 'none',
        })

        // ACT 3 OUTRO: Words sweep off to the left
        .to('.timeline-char-stream', {
          x: -450,
          opacity: 0,
          filter: 'blur(12px)',
          stagger: 0.012,
          duration: 1.1,
          ease: 'power2.in',
        })
        .to('.act3-schedule-node', {
          autoAlpha: 0,
          y: 15,
          duration: 0.8,
          ease: 'power2.in',
        }, '<')
        .to('.act3-stage', {
          autoAlpha: 0,
          duration: 0.1,
        })

        // =====================================================================
        // ACT 4 (74% to 100%): ORTHOGONAL VERTICAL SPATIAL RISE (Editorial Luxury)
        // =====================================================================
        .to('.act4-stage', {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.8,
          ease: 'power3.out',
        })
        .fromTo(
          '.act4-metric-val',
          { y: 50, opacity: 0, filter: 'blur(10px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.4, ease: 'power3.out' },
          '-=1.4'
        )
        .fromTo(
          '.act4-headline',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
          '-=1.0'
        )

        // Final hold for Act 4
        .to('.act4-stage', {
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
        {/* ACT 1: THE INITIAL HOOK ("Most agencies run your ads.")                */}
        {/* ===================================================================== */}
        <div className="act1-stage absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <div className="max-w-5xl flex flex-col items-center justify-center gap-2">
            <h1 className="text-[clamp(3.4rem,8.6vw,7.6rem)] font-black text-white tracking-[-0.035em] leading-[0.98] drop-shadow-[0_10px_50px_rgba(0,0,0,0.95)]">
              <SpatialChars
                text="Most agencies run your ads."
                charClass="trap-char inline-block"
              />
            </h1>
          </div>

          <div className="mt-14 flex items-center gap-2.5 text-[11px] font-black tracking-widest uppercase text-gray-400 bg-black/70 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-md shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-ping" />
            <span>Scroll to continue</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5B800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce ml-1">
              <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
            </svg>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* ACT 2: "We sell-out your real estate project" (Staggered Left Outro)  */}
        {/* ===================================================================== */}
        <div className="act2-stage absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <div className="relative max-w-6xl flex flex-col items-center justify-center">
            {/* Ambient Gold Flare */}
            <div className="sellout-gold-flare absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-transparent via-[#F5B800]/25 to-transparent blur-2xl pointer-events-none" />

            <h2 className="text-[clamp(3.4rem,8.4vw,7.6rem)] font-black text-white tracking-[-0.035em] leading-[1.04] drop-shadow-[0_12px_60px_rgba(0,0,0,0.98)]">
              {/* Line 1: We sell-out */}
              <span className="act2-line-1 block">
                <SpatialChars text="We" charClass="sellout-char-angle inline-block" />{' '}
                <span className="inline-block text-[#F5B800] glow-gold-cinematic font-serif italic font-normal tracking-normal mx-2.5">
                  <SpatialChars text="sell-out" charClass="sellout-char-angle inline-block text-[#F5B800]" />
                </span>
              </span>
              {/* Line 2: your real estate */}
              <span className="act2-line-2 block mt-2">
                <SpatialChars text="your real estate" charClass="sellout-char-angle inline-block text-white" />
              </span>
              {/* Line 3: project */}
              <span className="act2-line-3 block mt-2">
                <SpatialChars text="project" charClass="sellout-char-angle inline-block text-gray-300" />
              </span>
            </h2>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* ACT 3: "Within your" (Top-Left) & "planned timeline." (Center Zone)    */}
        {/* ===================================================================== */}
        <div className="act3-stage absolute inset-0 z-20 w-full h-full flex flex-col justify-between p-6 sm:p-10 lg:p-16 pointer-events-none">
          {/* Top Row: Left-Upper Corner Headline "Within your" */}
          <div className="w-full flex items-start justify-start pl-2 sm:pl-8">
            <h2 className="text-[clamp(2.4rem,5.5vw,5.2rem)] font-black text-white tracking-[-0.03em] leading-none uppercase">
              <SpatialChars text="Within your" charClass="timeline-char-stream inline-block text-white" />
            </h2>
          </div>

          {/* Middle/Center Row: Bold Hero Inscription "planned timeline." */}
          <div className="w-full max-w-6xl mx-auto text-left sm:text-center my-auto py-4">
            <h2 className="text-[clamp(3.5rem,9.5vw,8.8rem)] font-black tracking-[-0.04em] leading-[0.96] drop-shadow-[0_12px_60px_rgba(0,0,0,0.98)]">
              <span className="text-[#F5B800] glow-gold-cinematic font-serif italic font-normal tracking-normal">
                <SpatialChars text="planned timeline." charClass="timeline-char-stream inline-block text-[#F5B800]" />
              </span>
            </h2>
          </div>

          {/* Bottom Row: 100% Target On-Schedule Indicator */}
          <div className="w-full flex items-end justify-start pl-2 sm:pl-8">
            <div className="act3-schedule-node flex items-center gap-3 text-left">
              <div className="w-8 h-8 rounded-full border border-[#F5B800]/40 flex items-center justify-center text-[#F5B800] text-xs font-bold shadow-[0_0_15px_rgba(245,184,0,0.2)]">
                ⏱
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-bold text-gray-200 tracking-wide">100% Target On-Schedule</span>
                <span className="text-[10px] font-mono text-gray-500 tracking-wider">ZERO PROJECT DELAY GUARANTEE</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* ACT 4: ORTHOGONAL VERTICAL SPATIAL RISE ("459+ Real Estate Projects") */}
        {/* ===================================================================== */}
        <div className="act4-stage absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <div className="max-w-4xl flex flex-col items-center justify-center gap-5">
            {/* Minimalist Champagne Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/15 text-gray-300 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              100% On-Schedule Execution
            </div>

            {/* Crisp Monumental Counter without Gaudy Glow */}
            <div className="flex flex-col items-center justify-center">
              <span className="act4-metric-val text-[clamp(5rem,14vw,11rem)] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-[#F5B800] to-[#D97706] leading-none tracking-[-0.04em] drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)]">
                459+
              </span>
              <h3 className="act4-headline text-[clamp(1.8rem,3.8vw,3.4rem)] font-black text-white tracking-tight leading-tight mt-3">
                Real Estate Projects Delivered On Schedule
              </h3>
            </div>

            <p className="text-gray-400 text-[clamp(1rem,1.4vw,1.25rem)] max-w-xl mx-auto leading-relaxed">
              Zero Delays. Zero Junk Enquiries. <span className="text-white font-bold">100% Mandate Velocity.</span>
            </p>

            {/* High-End Clean Gold CTA Button */}
            <div className="pt-3 pointer-events-auto">
              <a
                href="#book-strategy-session"
                className="inline-flex items-center gap-3 bg-[#F5B800] hover:bg-[#E5AB00] text-gray-950 font-black text-sm sm:text-base px-8 py-4 rounded-2xl transition-all shadow-[0_0_30px_rgba(245,184,0,0.35)] active:scale-95"
              >
                <span>Book Your Project Sell-Out Strategy Session</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="19 12 12 19 5 12" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

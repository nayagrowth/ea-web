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
        <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.26em]">
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
      // 1. Initial State Setup
      gsap.set('.act2-stage', { autoAlpha: 0 });
      gsap.set('.act3-horizontal-stage', { autoAlpha: 0 });
      gsap.set('.act4-credibility-stage', { autoAlpha: 0, scale: 0.9 });

      // 2. Master 700% Scrub Timeline for 4 Grand Acts
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=700%',
          pin: stageRef.current,
          scrub: 1.3,
          anticipatePin: 1,
          onUpdate: (self) => setScrollProgress(self.progress),
        },
      });

      // ---------------------------------------------------------------------
      // ACT 1: "Most agencies run your ads." -> 3D Vortex Shatter
      // ---------------------------------------------------------------------
      tl.to('.trap-char', {
        z: () => gsap.utils.random(200, 800),
        x: () => gsap.utils.random(-350, 350),
        y: () => gsap.utils.random(-250, 250),
        rotateX: () => gsap.utils.random(-120, 120),
        rotateY: () => gsap.utils.random(-120, 120),
        rotateZ: () => gsap.utils.random(-60, 60),
        opacity: 0,
        filter: 'blur(16px)',
        stagger: {
          each: 0.015,
          from: 'random',
        },
        duration: 1.5,
        ease: 'power3.inOut',
      })
        .to('.act1-stage', {
          autoAlpha: 0,
          duration: 0.3,
        }, '-=0.2')

        // ---------------------------------------------------------------------
        // ACT 2: "We sell-out your real estate project" -> Inward Snap
        // ---------------------------------------------------------------------
        .to('.act2-stage', {
          autoAlpha: 1,
          duration: 0.1,
        })
        .fromTo(
          '.sellout-char-angle',
          {
            x: (i) => (i % 2 === 0 ? -180 : 180),
            y: (i) => (i % 3 === 0 ? 120 : -120),
            z: (i) => -400 - i * 15,
            rotateX: (i) => (i % 2 === 0 ? 45 : -45),
            rotateY: (i) => (i % 2 === 0 ? -60 : 60),
            rotateZ: (i) => (i % 3 === 0 ? 25 : -25),
            opacity: 0,
            filter: 'blur(14px)',
          },
          {
            x: 0,
            y: 0,
            z: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            opacity: 1,
            filter: 'blur(0px)',
            stagger: {
              each: 0.025,
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

        // ---------------------------------------------------------------------
        // ACT 2 OUTRO -> ACT 3 INTRO: Dynamic Horizontal Sweep
        // ---------------------------------------------------------------------
        .to('.act2-stage', {
          x: -300,
          opacity: 0,
          filter: 'blur(12px)',
          duration: 1.2,
          ease: 'power2.in',
        }, '+=0.6')

        // ACT 3: Massive Horizontal Kinetic "WITHIN YOUR PLANNED TIMELINE"
        .to('.act3-horizontal-stage', {
          autoAlpha: 1,
          duration: 0.2,
        }, '-=0.4')
        .fromTo(
          '.act3-massive-marquee',
          { x: '40vw', opacity: 0.4 },
          { x: '-45vw', opacity: 1, duration: 3.5, ease: 'none' },
          '-=0.2'
        )

        // ---------------------------------------------------------------------
        // ACT 3 OUTRO -> ACT 4 INTRO: "459+ Real Estate Projects Delivered on Schedule"
        // ---------------------------------------------------------------------
        .to('.act3-horizontal-stage', {
          autoAlpha: 0,
          scale: 0.9,
          filter: 'blur(10px)',
          duration: 1,
          ease: 'power2.inOut',
        })
        .to('.act4-credibility-stage', {
          autoAlpha: 1,
          scale: 1,
          duration: 1.6,
          ease: 'power3.out',
        }, '-=0.4')
        .fromTo(
          '.act4-rotating-badge',
          { rotation: 0 },
          { rotation: 360, duration: 8, repeat: -1, ease: 'none' },
          '-=1.6'
        )
        // Hold Act 4 firmly in view
        .to('.act4-credibility-stage', {
          scale: 1.02,
          duration: 2,
          ease: 'none',
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#030508]">
      {/* Pinned Stage: 100vh locked viewport */}
      <div
        ref={stageRef}
        className="relative w-full h-screen min-h-[660px] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-4 overflow-hidden bg-[#030508] select-none"
        style={{ perspective: '1600px' }}
      >
        {/* Luxury Architectural Backdrop with Scroll Parallax */}
        <div
          className="absolute inset-0 z-0 pointer-events-none transition-transform duration-700 ease-out"
          style={{
            transform: `scale(${1 + scrollProgress * 0.18}) translateY(${scrollProgress * -40}px)`,
          }}
        >
          <img
            src="/cinematic_luxury_tower.jpg"
            alt="Luxury Real Estate Elevation"
            className="w-full h-full object-cover opacity-40 filter brightness-90 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030508]/85 via-[#030508]/45 to-[#030508]/95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,184,0,0.18)_0%,transparent_65%)]" />
        </div>

        {/* Ambient Subtle Grid */}
        <div
          className="absolute inset-0 z-1 pointer-events-none opacity-25"
          style={{
            backgroundImage: `radial-gradient(rgba(245, 184, 0, 0.4) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />

        {/* ========================================================================= */}
        {/* ACT 1: THE HOOK ("Most agencies run your ads.")                            */}
        {/* ========================================================================= */}
        <div className="act1-stage absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <div className="max-w-5xl flex flex-col items-center justify-center gap-2">
            <h1 className="text-[clamp(3.2rem,8.2vw,7.8rem)] font-black text-white tracking-tight leading-[1.02] drop-shadow-[0_10px_50px_rgba(0,0,0,0.95)]">
              <SpatialChars
                text="Most agencies run your ads."
                charClass="trap-char inline-block"
              />
            </h1>
          </div>

          <div className="mt-14 flex items-center gap-2.5 text-[11px] font-black tracking-widest uppercase text-gray-400 bg-black/60 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-md shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-ping" />
            <span>Scroll to explore</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5B800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce ml-1">
              <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
            </svg>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT 2: MULTI-ANGLE CONVERGENCE ("We sell-out your real estate project")   */}
        {/* ========================================================================= */}
        <div className="act2-stage absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <div className="relative max-w-6xl flex flex-col items-center justify-center">
            {/* Ambient Gold Focal Light Flare */}
            <div className="sellout-gold-flare absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-transparent via-[#F5B800]/30 to-transparent blur-2xl pointer-events-none" />

            <h2 className="text-[clamp(3.2rem,8vw,7.6rem)] font-black text-white tracking-tight leading-[1.04] drop-shadow-[0_12px_60px_rgba(0,0,0,0.98)]">
              <span className="block">
                <SpatialChars text="We" charClass="sellout-char-angle inline-block" />{' '}
                <span className="inline-block text-[#F5B800] glow-gold-cinematic font-serif italic font-normal tracking-normal mx-2.5">
                  <SpatialChars text="sell-out" charClass="sellout-char-angle inline-block text-[#F5B800]" />
                </span>
              </span>
              <span className="block mt-2">
                <SpatialChars text="your real estate project" charClass="sellout-char-angle inline-block text-white" />
              </span>
            </h2>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT 3: MASSIVE HORIZONTAL KINETIC TEXT ("WITHIN YOUR PLANNED TIMELINE")    */}
        {/* ========================================================================= */}
        <div className="act3-horizontal-stage absolute inset-0 z-20 flex items-center justify-start pointer-events-none overflow-hidden whitespace-nowrap">
          <div className="act3-massive-marquee flex items-center gap-12 font-black tracking-tighter uppercase text-[clamp(4.5rem,14vw,14rem)] leading-none text-white drop-shadow-[0_10px_60px_rgba(0,0,0,0.95)]">
            <span className="text-white">Within</span>
            <span className="text-[#F5B800] glow-gold-cinematic font-serif italic tracking-normal">Your</span>
            <span className="text-white">Planned</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5B800] to-white">Timeline.</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT 4: CREDIBILITY CLIMAX ("459+ Real Estate Projects Delivered on Schedule") */}
        {/* ========================================================================= */}
        <div className="act4-credibility-stage absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <div className="max-w-5xl flex flex-col items-center justify-center gap-6">
            {/* Top Rotating Circular Seal Emblem & Glowing Pill */}
            <div className="flex items-center justify-center gap-4 flex-wrap mb-2">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center flex-shrink-0">
                {/* Spinning Outer SVG Text Ring */}
                <svg viewBox="0 0 100 100" className="act4-rotating-badge w-full h-full">
                  <path
                    id="sealCirclePath"
                    d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                    fill="none"
                  />
                  <text fill="#F5B800" fontSize="8.2" fontWeight="900" letterSpacing="2.2">
                    <textPath href="#sealCirclePath" startOffset="0%">
                      ESTATE AUTOPILOTS &bull; 100% ON SCHEDULE &bull;
                    </textPath>
                  </text>
                </svg>

                {/* Central Verified Shield Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#F5B800] text-gray-950 flex items-center justify-center font-black shadow-[0_0_20px_#F5B800]">
                    ✓
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 bg-[#F5B800]/15 border border-[#F5B800]/40 text-[#F5B800] px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase backdrop-blur-md shadow-[0_0_25px_rgba(245,184,0,0.25)]">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                Track Record & Timeline Reliability
              </div>
            </div>

            {/* Massive Metric Counter Inscription */}
            <div className="flex flex-col items-center justify-center">
              <span className="text-[clamp(4.5rem,12vw,10rem)] font-black text-[#F5B800] leading-none tracking-tight glow-gold-cinematic drop-shadow-[0_10px_60px_rgba(245,184,0,0.4)]">
                459+
              </span>
              <h3 className="text-[clamp(1.6rem,3.4vw,3.2rem)] font-extrabold text-white tracking-tight leading-tight mt-3">
                Real Estate Projects Delivered On Schedule
              </h3>
            </div>

            {/* Supporting Core Punchline */}
            <p className="text-gray-300 text-[clamp(1rem,1.5vw,1.3rem)] max-w-2xl mx-auto leading-relaxed font-medium">
              Zero Delays. Zero Junk Enquiries. <span className="text-[#F5B800] font-bold">100% Mandate Velocity</span> across Residential, Commercial, Plotting & Townships.
            </p>

            {/* CTA Trigger */}
            <div className="pt-4 pointer-events-auto">
              <a
                href="#book-strategy-session"
                className="inline-flex items-center gap-3 bg-[#F5B800] hover:bg-[#E5AB00] text-gray-950 font-black text-sm sm:text-base px-8 py-4 rounded-2xl border border-[#D99A00] transition-all shadow-[0_0_35px_rgba(245,184,0,0.45)] active:scale-95"
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

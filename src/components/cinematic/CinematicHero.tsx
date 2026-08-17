import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 3D Split Character Engine for Spatial Transformations
const Split3D: React.FC<{ text: string; className?: string; charClass?: string }> = ({
  text,
  className = '',
  charClass = 'char-3d',
}) => {
  return (
    <span className={`inline-block ${className}`} style={{ perspective: '1200px' }}>
      {text.split(' ').map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, cIdx) => (
            <span
              key={cIdx}
              className={`inline-block transition-transform duration-100 ${charClass}`}
              style={{ transformStyle: 'preserve-3d', willChange: 'transform, opacity, filter' }}
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
      // Set initial states
      gsap.set('.act2-statement', { autoAlpha: 0, scale: 0.85 });
      gsap.set('.act3-axiom', { autoAlpha: 0, scale: 0.9, y: 40 });
      gsap.set('.telemetry-tag', { autoAlpha: 0, scale: 0.6, rotateZ: -10 });

      // Master 500% Scroll Scrub Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=500%',
          pin: stageRef.current,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => setScrollProgress(self.progress),
        },
      });

      // -------------------------------------------------------------
      // ACT 1: "Most agencies run your ads." -> 3D Spatial Shatter
      // -------------------------------------------------------------
      tl.to('.trap-char', {
        z: () => gsap.utils.random(100, 600),
        x: () => gsap.utils.random(-250, 250),
        y: () => gsap.utils.random(-200, 200),
        rotateX: () => gsap.utils.random(-90, 90),
        rotateY: () => gsap.utils.random(-90, 90),
        rotateZ: () => gsap.utils.random(-45, 45),
        opacity: 0,
        filter: 'blur(16px)',
        stagger: {
          each: 0.02,
          from: 'random',
        },
        duration: 1.5,
        ease: 'power3.inOut',
      })
        .to('.act1-container', {
          autoAlpha: 0,
          duration: 0.4,
        }, '-=0.3')

        // -------------------------------------------------------------
        // ACT 2: "We SELL-OUT your real estate project..." Golden Inscription
        // -------------------------------------------------------------
        .to('.act2-statement', {
          autoAlpha: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
        })
        .fromTo(
          '.sellout-char',
          { y: 90, opacity: 0, rotateX: -60, filter: 'blur(8px)' },
          { y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)', stagger: 0.02, duration: 1.4, ease: 'back.out(1.4)' },
          '-=0.8'
        )
        .to('.telemetry-tag', {
          autoAlpha: 1,
          scale: 1,
          rotateZ: 0,
          stagger: 0.15,
          duration: 0.9,
          ease: 'back.out(1.6)',
        }, '-=0.6')

        // -------------------------------------------------------------
        // ACT 3: The Velocity Axiom Crescendo
        // -------------------------------------------------------------
        .to('.act2-statement', {
          autoAlpha: 0,
          scale: 1.15,
          filter: 'blur(10px)',
          duration: 1.2,
          ease: 'power2.inOut',
        }, '+=0.5')
        .to('.act3-axiom', {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 1.4,
          ease: 'power3.out',
        }, '-=0.6')
        .fromTo(
          '.axiom-stat-number',
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.15, duration: 1, ease: 'elastic.out(1, 0.5)' },
          '-=0.8'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#05070A]">
      {/* Pinned Stage: 100vh locked viewport */}
      <div
        ref={stageRef}
        className="relative w-full h-screen min-h-[660px] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-4 overflow-hidden bg-[#05070A] select-none"
        style={{ perspective: '1400px' }}
      >
        {/* Luxury Architectural Backdrop with Scroll Parallax */}
        <div
          className="absolute inset-0 z-0 pointer-events-none transition-transform duration-700 ease-out"
          style={{
            transform: `scale(${1 + scrollProgress * 0.15}) translateY(${scrollProgress * -30}px)`,
          }}
        >
          <img
            src="/cinematic_luxury_tower.jpg"
            alt="Luxury Real Estate Elevation"
            className="w-full h-full object-cover opacity-35 filter brightness-85 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05070A]/85 via-[#05070A]/50 to-[#05070A]/95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,184,0,0.15)_0%,transparent_70%)]" />
        </div>

        {/* Ambient High-Tech Blueprint Coordinates Overlay */}
        <div
          className="absolute inset-0 z-1 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(rgba(245, 184, 0, 0.4) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* ========================================================================= */}
        {/* ACT 1: THE CONVENTIONAL TRAP ("Most agencies run your ads.")               */}
        {/* ========================================================================= */}
        <div className="act1-container absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <div className="max-w-5xl flex flex-col items-center justify-center gap-2">
            <h1 className="text-[clamp(3.2rem,8vw,7.5rem)] font-black text-white tracking-tight leading-[1.02] drop-shadow-[0_8px_40px_rgba(0,0,0,0.95)]">
              <Split3D
                text="Most agencies run your ads."
                charClass="trap-char inline-block"
              />
            </h1>
          </div>

          {/* Minimal Kinetic Scroll Guide */}
          <div className="mt-14 flex items-center gap-2.5 text-[11px] font-extrabold tracking-widest uppercase text-gray-400 bg-black/60 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-md shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-ping" />
            <span>Scroll to shatter the agency model</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5B800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce ml-1">
              <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
            </svg>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT 2: THE GOLDEN SELL-OUT TRANSFORMATION                                  */}
        {/* ========================================================================= */}
        <div className="act2-statement absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          {/* Floating Orbit Telemetry Tags */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap mb-6">
            <div className="telemetry-tag inline-flex items-center gap-2 bg-[#F5B800]/15 border border-[#F5B800]/40 text-[#F5B800] px-4 py-1.5 rounded-full text-[12px] font-black tracking-widest uppercase backdrop-blur-md shadow-[0_0_20px_rgba(245,184,0,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5B800] animate-pulse" />
              100% Project Sell-Out Partner
            </div>
            <div className="telemetry-tag inline-flex items-center gap-2 bg-white/5 border border-white/15 text-gray-200 px-4 py-1.5 rounded-full text-[12px] font-bold tracking-widest uppercase backdrop-blur-md">
              Zero Booking Commission
            </div>
          </div>

          {/* Massive Liquid Gold Headline */}
          <h2 className="text-[clamp(2.6rem,6.8vw,6.5rem)] font-black text-white tracking-tight leading-[1.06] max-w-6xl drop-shadow-[0_10px_50px_rgba(0,0,0,0.95)]">
            <span className="block">
              <Split3D text="We" charClass="sellout-char inline-block" />{' '}
              <span className="inline-block text-[#F5B800] glow-gold-cinematic font-serif italic font-normal tracking-normal mx-2">
                <Split3D text="sell-out" charClass="sellout-char inline-block text-[#F5B800]" />
              </span>
            </span>
            <span className="block mt-1">
              <Split3D text="your real estate project" charClass="sellout-char inline-block text-white" />
            </span>
            <span className="block text-gray-400 font-extrabold text-[clamp(1.8rem,4.5vw,4.2rem)] mt-2">
              <Split3D text="within your planned timeline." charClass="sellout-char inline-block text-gray-400" />
            </span>
          </h2>

          {/* Velocity Metrics Pill */}
          <div className="mt-8 flex items-center gap-4 bg-black/60 border border-[#F5B800]/30 px-6 py-3 rounded-2xl backdrop-blur-md shadow-2xl">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚡</span>
              <span className="text-sm font-black text-white">4.2x Faster Absorption</span>
            </div>
            <span className="text-gray-600">&bull;</span>
            <div className="flex items-center gap-2">
              <span className="text-lg">🎯</span>
              <span className="text-sm font-black text-[#F5B800]">99.4% Buyer Conviction</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT 3: THE HIGH-IMPACT VELOCITY AXIOM CRESCENDO                           */}
        {/* ========================================================================= */}
        <div className="act3-axiom absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <div className="max-w-5xl flex flex-col items-center justify-center gap-6">
            {/* Stat Counters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 w-full">
              <div className="axiom-stat-number flex flex-col items-center bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
                <span className="text-[clamp(2.8rem,5vw,4.8rem)] font-black text-[#F5B800] leading-none tracking-tight">
                  459+
                </span>
                <span className="text-[13px] font-extrabold uppercase tracking-widest text-gray-300 mt-2">
                  Projects Delivered
                </span>
              </div>

              <div className="axiom-stat-number flex flex-col items-center bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
                <span className="text-[clamp(2.8rem,5vw,4.8rem)] font-black text-white leading-none tracking-tight">
                  0%
                </span>
                <span className="text-[13px] font-extrabold uppercase tracking-widest text-gray-300 mt-2">
                  Booking Commission
                </span>
              </div>

              <div className="axiom-stat-number flex flex-col items-center bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
                <span className="text-[clamp(2.8rem,5vw,4.8rem)] font-black text-emerald-400 leading-none tracking-tight">
                  100%
                </span>
                <span className="text-[13px] font-extrabold uppercase tracking-widest text-gray-300 mt-2">
                  Real Estate Exclusive
                </span>
              </div>
            </div>

            {/* Core Punchline */}
            <div className="mt-4">
              <h3 className="text-[clamp(1.6rem,3.2vw,3rem)] font-extrabold text-white tracking-tight leading-snug">
                An enquiry is interest &mdash; <span className="text-[#F5B800] font-serif italic">not intent.</span>
              </h3>
              <p className="text-gray-400 text-[clamp(0.95rem,1.4vw,1.25rem)] max-w-2xl mt-2 mx-auto leading-relaxed">
                We engineer pre-sales buyer conviction so buyers arrive at the site visit already closed.
              </p>
            </div>

            {/* Strategy Call Action Trigger */}
            <div className="pt-4 pointer-events-auto">
              <a
                href="#book-strategy-session"
                className="inline-flex items-center gap-3 bg-[#F5B800] hover:bg-[#E5AB00] text-gray-950 font-black text-sm sm:text-base px-8 py-4 rounded-2xl border border-[#D99A00] transition-all shadow-[0_0_30px_rgba(245,184,0,0.4)] active:scale-95"
              >
                <span>Book Your Project Sell-Out Strategy Session</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

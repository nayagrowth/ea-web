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
      gsap.set('.act3-stage', { autoAlpha: 0 });
      gsap.set('.hologram-ring-1', { rotation: 0, scale: 0.8, opacity: 0 });
      gsap.set('.hologram-ring-2', { rotation: 0, scale: 0.8, opacity: 0 });
      gsap.set('.chronometer-hud', { autoAlpha: 0, y: 30 });

      // 2. Master 600% Scrub Timeline for Luxurious Multi-Angle Choreography
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=600%',
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
        // ACT 2: "We sell-out your real estate project" -> Multi-Angle Inward Snap
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
        // ACT 2 -> ACT 3: Spatial Dissolve to "Within your planned timeline."
        // ---------------------------------------------------------------------
        .to('.act2-stage', {
          autoAlpha: 0,
          scale: 0.9,
          y: -60,
          rotateX: 30,
          filter: 'blur(12px)',
          duration: 1.4,
          ease: 'power2.inOut',
        }, '+=0.6')

        // ACT 3: Extended Hold & Holographic Chronometer Sweep
        .to('.act3-stage', {
          autoAlpha: 1,
          duration: 0.2,
        })
        .fromTo(
          '.timeline-char-spatial',
          {
            y: 120,
            z: -500,
            rotateX: -70,
            opacity: 0,
            filter: 'blur(16px)',
          },
          {
            y: 0,
            z: 0,
            rotateX: 0,
            opacity: 1,
            filter: 'blur(0px)',
            stagger: 0.02,
            duration: 2,
            ease: 'expo.out',
          },
          '-=0.1'
        )
        // Holographic Rings & Chronometer HUD Activation
        .to('.hologram-ring-1', {
          scale: 1,
          opacity: 0.9,
          rotation: 180,
          duration: 2.2,
          ease: 'power2.out',
        }, '-=1.8')
        .to('.hologram-ring-2', {
          scale: 1,
          opacity: 0.7,
          rotation: -180,
          duration: 2.2,
          ease: 'power2.out',
        }, '-=2.2')
        .to('.chronometer-hud', {
          autoAlpha: 1,
          y: 0,
          duration: 1.4,
          ease: 'power3.out',
        }, '-=1.4')
        // Prolonged hold for Act 3 so it stays in full view
        .to('.act3-stage', {
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
        {/* Luxury Architectural Backdrop with Parallax */}
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

        {/* Ambient Grid */}
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
        {/* ACT 3: HOLOGRAPHIC CHRONOMETER ("Within your planned timeline.")          */}
        {/* ========================================================================= */}
        <div className="act3-stage absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <div className="relative max-w-6xl flex flex-col items-center justify-center gap-8">
            {/* Act 3 Main Statement */}
            <h2 className="text-[clamp(3.2rem,8vw,7.6rem)] font-black text-white tracking-tight leading-[1.04] drop-shadow-[0_12px_60px_rgba(0,0,0,0.98)]">
              <SpatialChars
                text="Within your planned timeline."
                charClass="timeline-char-spatial inline-block text-white"
              />
            </h2>

            {/* High-Tech Holographic Orbital Chronometer HUD */}
            <div className="relative w-full max-w-4xl h-[160px] flex items-center justify-center">
              <svg viewBox="0 0 900 160" className="w-full h-full overflow-visible" fill="none">
                {/* Outer Orbital Hologram Ring */}
                <ellipse
                  cx="450"
                  cy="80"
                  rx="400"
                  ry="40"
                  stroke="#F5B800"
                  strokeWidth="1.5"
                  strokeDasharray="8 12"
                  className="hologram-ring-1"
                  opacity="0.8"
                />

                {/* Inner Counter-Rotating Orbit Ring */}
                <ellipse
                  cx="450"
                  cy="80"
                  rx="340"
                  ry="32"
                  stroke="#38BDF8"
                  strokeWidth="1.2"
                  strokeDasharray="16 16"
                  className="hologram-ring-2"
                  opacity="0.6"
                />

                {/* Center Laser Precision Flight Axis */}
                <line x1="100" y1="80" x2="800" y2="80" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />

                {/* Micro Telemetry HUD Coordinate Nodes */}
                {/* Node 1: Month 01 */}
                <g transform="translate(180, 80)">
                  <circle cx="0" cy="0" r="6" fill="#030508" stroke="#F5B800" strokeWidth="2.5" />
                  <text x="0" y="32" fill="#94A3B8" fontSize="11" fontWeight="800" textAnchor="middle" letterSpacing="1.5">
                    M1: TRUST BLUEPRINT
                  </text>
                </g>

                {/* Node 2: Month 02 */}
                <g transform="translate(450, 80)">
                  <circle cx="0" cy="0" r="6" fill="#030508" stroke="#F5B800" strokeWidth="2.5" />
                  <text x="0" y="-22" fill="#F5B800" fontSize="11" fontWeight="900" textAnchor="middle" letterSpacing="1.5">
                    M2: 3.8x ABSORPTION
                  </text>
                </g>

                {/* Node 3: 100% Target Sell-Out */}
                <g transform="translate(720, 80)">
                  <circle cx="0" cy="0" r="9" fill="#10B981" stroke="#FFFFFF" strokeWidth="2.5" className="animate-pulse" />
                  <text x="0" y="32" fill="#10B981" fontSize="12" fontWeight="900" textAnchor="middle" letterSpacing="2">
                    100% SELL-OUT ACHIEVED
                  </text>
                </g>
              </svg>
            </div>

            {/* Precision Chronometer Telemetry Pill */}
            <div className="chronometer-hud flex items-center gap-4 bg-black/70 border border-[#F5B800]/40 px-6 py-2.5 rounded-full backdrop-blur-md shadow-2xl">
              <span className="text-sm font-extrabold text-[#F5B800] tracking-widest uppercase">
                ⏱ Planned Timeline Guarantee
              </span>
              <span className="text-gray-500">&bull;</span>
              <span className="text-sm font-black text-white">
                459+ Real Estate Projects Delivered on Schedule
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

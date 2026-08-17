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
      gsap.set('.act2-statement', { autoAlpha: 0, scale: 0.9, y: 30 });
      gsap.set('.act3-timeline', { autoAlpha: 0, scale: 0.9, y: 40 });
      gsap.set('.timeline-laser-path', { strokeDashoffset: 800 });
      gsap.set('.timeline-tick', { autoAlpha: 0, scale: 0.5 });

      // Master 450% Scroll Scrub Timeline for 3 Pure Acts
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=450%',
          pin: stageRef.current,
          scrub: 1.1,
          anticipatePin: 1,
          onUpdate: (self) => setScrollProgress(self.progress),
        },
      });

      // -------------------------------------------------------------
      // ACT 1 -> ACT 2: "Most agencies run your ads." 3D Shatter
      // -------------------------------------------------------------
      tl.to('.trap-char', {
        z: () => gsap.utils.random(150, 600),
        x: () => gsap.utils.random(-200, 200),
        y: () => gsap.utils.random(-180, 180),
        rotateX: () => gsap.utils.random(-80, 80),
        rotateY: () => gsap.utils.random(-80, 80),
        opacity: 0,
        filter: 'blur(14px)',
        stagger: {
          each: 0.02,
          from: 'random',
        },
        duration: 1.4,
        ease: 'power3.inOut',
      })
        .to('.act1-container', {
          autoAlpha: 0,
          duration: 0.3,
        }, '-=0.2')

        // -------------------------------------------------------------
        // ACT 2: "We sell-out your real estate project"
        // -------------------------------------------------------------
        .to('.act2-statement', {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 1.3,
          ease: 'power3.out',
        })
        .fromTo(
          '.sellout-char',
          { y: 80, opacity: 0, rotateX: -50, filter: 'blur(8px)' },
          { y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)', stagger: 0.02, duration: 1.4, ease: 'back.out(1.4)' },
          '-=0.9'
        )

        // -------------------------------------------------------------
        // ACT 2 -> ACT 3: Transition to "Within your planned timeline."
        // -------------------------------------------------------------
        .to('.act2-statement', {
          autoAlpha: 0,
          scale: 0.95,
          y: -50,
          filter: 'blur(10px)',
          duration: 1.2,
          ease: 'power2.inOut',
        }, '+=0.4')

        // ACT 3: Emergence of the Planned Timeline Climax
        .to('.act3-timeline', {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 1.4,
          ease: 'power3.out',
        }, '-=0.5')
        .fromTo(
          '.timeline-char',
          { y: 80, opacity: 0, rotateX: -40, filter: 'blur(8px)' },
          { y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)', stagger: 0.02, duration: 1.4, ease: 'power3.out' },
          '-=0.9'
        )
        // Laser Timeline Sweep
        .to('.timeline-laser-path', {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: 'power2.out',
        }, '-=1.2')
        .to('.timeline-tick', {
          autoAlpha: 1,
          scale: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: 'back.out(1.7)',
        }, '-=1.2');
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

        {/* Ambient Subtle Grid */}
        <div
          className="absolute inset-0 z-1 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(rgba(245, 184, 0, 0.4) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* ========================================================================= */}
        {/* ACT 1: THE INITIAL HOOK ("Most agencies run your ads.")                    */}
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

          <div className="mt-14 flex items-center gap-2.5 text-[11px] font-extrabold tracking-widest uppercase text-gray-400 bg-black/60 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-md shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-ping" />
            <span>Scroll to continue</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5B800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce ml-1">
              <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
            </svg>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT 2: THE SELL-OUT PROPOSITION ("We sell-out your real estate project")  */}
        {/* ========================================================================= */}
        <div className="act2-statement absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <h2 className="text-[clamp(3rem,7.5vw,7.2rem)] font-black text-white tracking-tight leading-[1.04] max-w-6xl drop-shadow-[0_10px_50px_rgba(0,0,0,0.95)]">
            <span className="block">
              <Split3D text="We" charClass="sellout-char inline-block" />{' '}
              <span className="inline-block text-[#F5B800] glow-gold-cinematic font-serif italic font-normal tracking-normal mx-2">
                <Split3D text="sell-out" charClass="sellout-char inline-block text-[#F5B800]" />
              </span>
            </span>
            <span className="block mt-2">
              <Split3D text="your real estate project" charClass="sellout-char inline-block text-white" />
            </span>
          </h2>
        </div>

        {/* ========================================================================= */}
        {/* ACT 3: THE TIMELINE PRECISION ("Within your planned timeline.")           */}
        {/* ========================================================================= */}
        <div className="act3-timeline absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <div className="max-w-6xl flex flex-col items-center justify-center gap-6">
            {/* Act 3 Main Statement */}
            <h2 className="text-[clamp(3rem,7.5vw,7.2rem)] font-black text-white tracking-tight leading-[1.04] drop-shadow-[0_10px_50px_rgba(0,0,0,0.95)]">
              <Split3D
                text="Within your planned timeline."
                charClass="timeline-char inline-block text-white"
              />
            </h2>

            {/* Precision Laser Timeline Trajectory Sweep */}
            <div className="relative w-full max-w-4xl h-[100px] mt-4 flex items-center justify-center">
              <svg viewBox="0 0 800 100" className="w-full h-full overflow-visible" fill="none">
                {/* Laser Background Track */}
                <line x1="50" y1="50" x2="750" y2="50" stroke="#1E293B" strokeWidth="2" strokeDasharray="6 6" />

                {/* Animated Luminous Gold Laser Path */}
                <line
                  x1="50"
                  y1="50"
                  x2="750"
                  y2="50"
                  stroke="#F5B800"
                  strokeWidth="3"
                  strokeDasharray="800"
                  className="timeline-laser-path"
                  strokeLinecap="round"
                />

                {/* Milestone 1: Positioning & ICP */}
                <g className="timeline-tick" transform="translate(100, 50)">
                  <circle cx="0" cy="0" r="7" fill="#05070A" stroke="#F5B800" strokeWidth="2.5" />
                  <text x="0" y="28" fill="#94A3B8" fontSize="11" fontWeight="bold" textAnchor="middle" letterSpacing="1">
                    01 &bull; POSITIONING
                  </text>
                </g>

                {/* Milestone 2: Pre-Sales Trust */}
                <g className="timeline-tick" transform="translate(400, 50)">
                  <circle cx="0" cy="0" r="7" fill="#05070A" stroke="#F5B800" strokeWidth="2.5" />
                  <text x="0" y="28" fill="#94A3B8" fontSize="11" fontWeight="bold" textAnchor="middle" letterSpacing="1">
                    02 &bull; BUYER TRUST
                  </text>
                </g>

                {/* Milestone 3: 100% Planned Sell-Out */}
                <g className="timeline-tick" transform="translate(700, 50)">
                  <circle cx="0" cy="0" r="9" fill="#10B981" stroke="#FFFFFF" strokeWidth="2.5" className="animate-pulse" />
                  <text x="0" y="28" fill="#10B981" fontSize="12" fontWeight="900" textAnchor="middle" letterSpacing="1">
                    100% SELL-OUT
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

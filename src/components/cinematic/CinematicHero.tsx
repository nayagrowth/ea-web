import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroDiagram } from '../homepage/HeroDiagram';
import { StatsBar } from '../homepage/StatsBar';
import {
  CalendarIcon,
  PlayIcon,
  HomeIcon,
  CommercialIcon,
  PlottingIcon,
  VillaIcon,
  TownshipIcon,
} from '../common/Icons';

gsap.registerPlugin(ScrollTrigger);

// Helper to split text into animated character spans for fine-grained kinetic letter control
const SplitChars: React.FC<{ text: string; className?: string; charClassName?: string }> = ({
  text,
  className = '',
  charClassName = 'cine-char',
}) => {
  return (
    <span className={`inline-block ${className}`}>
      {text.split(' ').map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.28em]">
          {word.split('').map((char, charIdx) => (
            <span
              key={charIdx}
              className={`inline-block transition-colors duration-200 ${charClassName}`}
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

  useEffect(() => {
    if (!containerRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set('.scene-transformation', { autoAlpha: 0, y: 50, scale: 0.96 });
      gsap.set('.burn-telemetry-panel', { autoAlpha: 0, y: 30, scale: 0.9 });
      gsap.set('.burn-ember', { autoAlpha: 0, scale: 0 });

      // Master Scroll Scrub Timeline (400% scroll distance for luxurious pacing)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          pin: stageRef.current,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // -------------------------------------------------------------
      // ACT 1: Hook Dissolve & Fire Telemetry Emergence
      // -------------------------------------------------------------
      tl.to('.agency-char', {
        y: -30,
        opacity: 0.2,
        filter: 'blur(5px)',
        stagger: {
          each: 0.02,
          from: 'random',
        },
        duration: 1.2,
        ease: 'power2.inOut',
      })
        // Reveal the Burning Ad Spend & Stagnant Inventory Visual Telemetry
        .to('.burn-telemetry-panel', {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'back.out(1.5)',
        }, '-=0.5')
        .to('.burn-ember', {
          autoAlpha: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
        }, '-=0.8')

        // -------------------------------------------------------------
        // ACT 2: Transition from Hook to the Solution Stage
        // -------------------------------------------------------------
        .to('.scene-agency-hook', {
          autoAlpha: 0,
          scale: 0.9,
          y: -60,
          duration: 1.2,
          ease: 'power2.inOut',
        })
        .to('.scene-transformation', {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
        }, '-=0.6')

        // -------------------------------------------------------------
        // ACT 3: Dynamic 3D Asset Category Chips & System Elements Lock
        // -------------------------------------------------------------
        .fromTo(
          '.cine-chip',
          { autoAlpha: 0, y: 15, scale: 0.85 },
          { autoAlpha: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.8, ease: 'back.out(1.5)' },
          '-=0.8'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#0B0F17]">
      {/* Pinned Viewport Container */}
      <div
        ref={stageRef}
        className="relative w-full h-screen min-h-[640px] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-4 overflow-hidden"
      >
        {/* Deep Luxury Architectural Backdrop with High Visibility */}
        <div className="absolute inset-0 z-0">
          <img
            src="/cinematic_luxury_tower.jpg"
            alt="Luxury Architecture"
            className="w-full h-full object-cover opacity-45 filter brightness-90 contrast-105 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F17]/70 via-[#0B0F17]/50 to-[#0B0F17]/90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,184,0,0.12)_0%,transparent_70%)]" />
        </div>

        {/* Ambient Subtle Grid Pattern Overlay */}
        <div
          className="absolute inset-0 z-1 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* ========================================================================= */}
        {/* ACT 1: KINETIC HOOK STAGE (Pure Typographic Artistry + Fire Visuals)      */}
        {/* ========================================================================= */}
        <div className="scene-agency-hook absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          {/* Main Huge Kinetic Headline */}
          <h1 className="text-[clamp(2.8rem,6.8vw,6.4rem)] font-black text-white tracking-tight leading-[1.06] max-w-5xl">
            <SplitChars
              text="Most agencies run your ads."
              className="text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
              charClassName="agency-char inline-block text-white transition-all duration-300"
            />
          </h1>

          {/* VISUAL REPRESENTATION: Burning Ad Spend & Stagnant Inventory HUD */}
          <div className="burn-telemetry-panel mt-8 flex flex-col items-center gap-4 max-w-3xl pointer-events-auto">
            {/* Visual Diagnostic Metric Badges */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
              {/* Flame Ad Burn Metric */}
              <div className="flex items-center gap-2.5 bg-red-950/70 border border-red-500/40 backdrop-blur-md px-4 py-2 rounded-2xl shadow-[0_0_25px_rgba(239,68,68,0.25)]">
                <span className="text-lg animate-pulse">🔥</span>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-extrabold text-red-300 uppercase tracking-wider">Ad Spend Burn</span>
                  <span className="text-[13px] font-black text-white">$45,000+ / mo</span>
                </div>
              </div>

              {/* Junk Lead Ratio */}
              <div className="flex items-center gap-2.5 bg-amber-950/70 border border-amber-500/40 backdrop-blur-md px-4 py-2 rounded-2xl shadow-[0_0_25px_rgba(245,158,11,0.25)]">
                <span className="text-lg">📉</span>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-extrabold text-amber-300 uppercase tracking-wider">Junk Enquiries</span>
                  <span className="text-[13px] font-black text-white">94.2% Unqualified</span>
                </div>
              </div>

              {/* Stagnant Inventory Lock */}
              <div className="flex items-center gap-2.5 bg-slate-900/80 border border-slate-600/50 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg">
                <span className="text-lg">🔒</span>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-extrabold text-slate-300 uppercase tracking-wider">Unsold Inventory</span>
                  <span className="text-[13px] font-black text-white">184 Units Stagnant</span>
                </div>
              </div>
            </div>

            {/* Kinetic Consequence Statement */}
            <div className="px-6 py-2.5 rounded-full bg-black/60 border border-red-500/30 backdrop-blur-md">
              <p className="text-[clamp(0.95rem,1.4vw,1.2rem)] font-semibold text-gray-200">
                Burning ad spend on junk enquiries while <span className="text-[#F5B800] font-bold">inventory sits stagnant</span>.
              </p>
            </div>
          </div>

          {/* Scroll Cue Indicator */}
          <div className="mt-10 flex items-center gap-2.5 text-[11px] font-bold tracking-widest uppercase text-gray-400 bg-black/50 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <span>Scroll to reveal the Sell-Out Partner Model</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5B800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT 2 & 3: THE SELL-OUT TRANSFORMATION & 4-PHASE SYSTEM ENGINE            */}
        {/* ========================================================================= */}
        <div className="scene-transformation relative z-10 w-full grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] xl:grid-cols-[1.02fr_1.18fr] gap-6 lg:gap-10 xl:gap-14 items-center my-auto pt-2 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-gray-100">
          {/* Left Column: Solution Narrative */}
          <div className="flex flex-col justify-between py-0 max-w-[620px]">
            <div className="flex flex-col gap-3.5">
              {/* Eyebrow Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-2 bg-[#F3F4F6] border border-gray-200 text-gray-800 text-[11.5px] sm:text-[12.5px] font-semibold px-3.5 py-1.5 rounded-full shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-beacon" />
                  The Estate Autopilots System
                </span>
                <span className="text-[11px] sm:text-[11.5px] font-bold text-[#D97706] bg-[#FEF3C7] px-2.5 py-0.5 rounded-md border border-[#FDE047]/60">
                  100% Real Estate Exclusive
                </span>
              </div>

              {/* Main Solution Headline */}
              <h2 className="text-[clamp(1.85rem,2.8vw,3.15rem)] font-extrabold text-[#0F172A] tracking-tight leading-[1.12] flex flex-col">
                <span className="sm:whitespace-nowrap">Most agencies run</span>
                <span className="sm:whitespace-nowrap">
                  your ads. We <span className="text-[#E5A000] glow-gold-cinematic">sell-out</span>
                </span>
                <span className="sm:whitespace-nowrap">your real estate project</span>
                <span className="sm:whitespace-nowrap">within your planned timeline.</span>
              </h2>

              {/* Subheading */}
              <p className="text-[13.5px] sm:text-[14px] lg:text-[14.5px] text-gray-600 leading-relaxed max-w-[540px]">
                Estate Autopilots is a Project Sell-Out Partner for real estate developers and mandate firms. Through our{' '}
                <span className="inline-block font-bold text-gray-950 bg-[#FEF3C7] border border-[#FDE047] px-1.5 py-0.5 rounded-md shimmer-badge shadow-2xs">
                  4-Phase Project Sell-Out System&trade;
                </span>
                , we define positioning, build buyer trust, and accelerate bookings so buyers walk in already convinced.
              </p>

              {/* Real Estate Visual Proof Banner */}
              <div className="w-full flex items-center justify-between gap-3 bg-white/95 backdrop-blur-xs border border-gray-200/90 rounded-2xl p-2.5 sm:p-3 shadow-2xs">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src="/cinematic_luxury_tower.jpg"
                    alt="Luxury Real Estate Architectural Elevation"
                    className="w-16 h-12 sm:w-20 sm:h-14 object-cover rounded-xl shadow-xs flex-shrink-0 border border-gray-100"
                  />
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse flex-shrink-0" />
                      <span className="text-[12px] sm:text-[13px] font-extrabold text-gray-900 truncate">
                        459+ Real Estate Projects Delivered
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-500 font-medium truncate">
                      0% Commission on Bookings &bull; Zero Junk Enquiries
                    </span>
                  </div>
                </div>
                <div className="hidden sm:flex flex-col items-end pl-2 border-l border-gray-100 flex-shrink-0">
                  <span className="text-[11px] font-extrabold text-[#D97706] bg-[#FEF3C7] px-2 py-0.5 rounded-md border border-[#FDE047]/60">
                    ⚡ 4.2x Faster
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium mt-0.5">Sell-Out Speed</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap sm:flex-nowrap pt-1">
                <a
                  href="#book-strategy-session"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F5B800] hover:bg-[#E5AB00] text-gray-950 font-bold text-[12.5px] px-5 py-2.5 rounded-xl border border-[#D99A00] transition-all shadow-xs active:scale-95 whitespace-nowrap"
                >
                  <CalendarIcon size={16} />
                  <span>Book Your Project Sell-Out Strategy Session</span>
                </a>
                <a
                  href="#watch-briefing"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-950 font-semibold text-[12.5px] px-4 py-2.5 rounded-xl border-[1.5px] border-gray-950 transition-all shadow-2xs active:scale-95 whitespace-nowrap"
                >
                  <PlayIcon size={14} />
                  <span>Watch the 12-Minute Briefing</span>
                </a>
              </div>
            </div>

            {/* Asset Categories */}
            <div className="pt-3">
              <div className="w-full grid grid-cols-3 sm:grid-cols-5 lg:flex lg:items-center lg:justify-between gap-1.5 sm:gap-2 text-[11px] sm:text-[12px] font-semibold text-gray-700 bg-white/95 backdrop-blur-xs border border-gray-200/80 rounded-2xl p-2 sm:px-3 sm:py-2 shadow-2xs">
                <div className="cine-chip flex items-center justify-center gap-1.5 text-gray-900 font-bold bg-gray-50 sm:bg-transparent py-1.5 px-2 rounded-xl sm:rounded-none">
                  <HomeIcon size={14} />
                  <span>Residential</span>
                </div>
                <div className="cine-chip flex items-center justify-center gap-1.5 text-gray-900 font-bold bg-gray-50 sm:bg-transparent py-1.5 px-2 rounded-xl sm:rounded-none sm:border-l sm:border-gray-200 sm:pl-2">
                  <CommercialIcon size={14} />
                  <span>Commercial</span>
                </div>
                <div className="cine-chip flex items-center justify-center gap-1.5 text-gray-900 font-bold bg-gray-50 sm:bg-transparent py-1.5 px-2 rounded-xl sm:rounded-none sm:border-l sm:border-gray-200 sm:pl-2">
                  <PlottingIcon size={14} />
                  <span>Plotting</span>
                </div>
                <div className="cine-chip flex items-center justify-center gap-1.5 text-gray-900 font-bold bg-gray-50 sm:bg-transparent py-1.5 px-2 rounded-xl sm:rounded-none sm:border-l sm:border-gray-200 sm:pl-2">
                  <VillaIcon size={14} />
                  <span>Villas</span>
                </div>
                <div className="cine-chip col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 text-gray-900 font-bold bg-gray-50 sm:bg-transparent py-1.5 px-2 rounded-xl sm:rounded-none sm:border-l sm:border-gray-200 sm:pl-2">
                  <TownshipIcon size={14} />
                  <span>Townships</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4-Phase System Diagram + Stats Bar */}
          <div className="w-full flex flex-col justify-between py-0 gap-3">
            <HeroDiagram />
            <StatsBar />
          </div>
        </div>
      </div>
    </div>
  );
};

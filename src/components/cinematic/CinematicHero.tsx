import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SpeedGrid } from './agency-act/SpeedGrid';
import { AgencyCar } from './agency-act/AgencyCar';
import { ExplosionParticles } from './agency-act/ExplosionParticles';
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

export const CinematicHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Initial State Setup
      gsap.set('.agency-car-stage', { autoAlpha: 0, scale: 0.95 });
      gsap.set('.explosion-burst-stage', { autoAlpha: 0, scale: 0.1 });
      gsap.set('.scene-solution-blueprint', { autoAlpha: 0, y: 60, scale: 0.95 });

      // 2. Master Scroll Scrub Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=450%',
          pin: stageRef.current,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // -------------------------------------------------------------
      // BEAT 1: "Most agencies run your ads." -> Accelerating Supercar
      // -------------------------------------------------------------
      tl.to('.cine-hero-h1', {
        scale: 0.92,
        autoAlpha: 0.2,
        y: -35,
        duration: 1,
        ease: 'power2.inOut',
      })
        // Car & Speed Track emerge
        .to('.agency-car-stage', {
          autoAlpha: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
        }, '-=0.5')
        // Car accelerates through the speed tunnel
        .to('.supercar-container', {
          x: 340,
          duration: 2,
          ease: 'power2.in',
        })
        .to('.headlight-beam', {
          opacity: 0.9,
          scaleX: 1.4,
          duration: 2,
        }, '<')

        // -------------------------------------------------------------
        // BEAT 2: The Detonation Shockwave Burst
        // -------------------------------------------------------------
        .to('.supercar-container', {
          autoAlpha: 0,
          scale: 1.2,
          duration: 0.15,
          ease: 'power4.out',
        })
        .to('.explosion-burst-stage', {
          autoAlpha: 1,
          scale: 1.6,
          duration: 0.6,
          ease: 'elastic.out(1.2, 0.4)',
        }, '-=0.1')
        .to('.explosion-shard', {
          scale: 2.2,
          opacity: 0,
          duration: 0.8,
          stagger: 0.01,
          ease: 'power3.out',
        }, '-=0.3')
        .to('.shockwave-core, .shockwave-ring-1, .shockwave-ring-2', {
          scale: 2.5,
          opacity: 0,
          duration: 0.8,
        }, '<')

        // -------------------------------------------------------------
        // BEAT 3: Complete Cleanup & Solution Blueprint Entrance
        // -------------------------------------------------------------
        .to('.scene-agency-master', {
          autoAlpha: 0,
          duration: 0.6,
          ease: 'power2.inOut',
        })
        .to('.scene-solution-blueprint', {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.6,
          ease: 'power3.out',
        })
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
      {/* Pinned Stage: 100vh locked viewport without header */}
      <div
        ref={stageRef}
        className="relative w-full h-screen min-h-[660px] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-4 overflow-hidden bg-[#0B0F17]"
      >
        {/* Luxury Architectural Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="/cinematic_luxury_tower.jpg"
            alt="Luxury Architecture"
            className="w-full h-full object-cover opacity-40 filter brightness-90 contrast-110 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F17]/80 via-[#0B0F17]/50 to-[#0B0F17]/95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,184,0,0.12)_0%,transparent_70%)]" />
        </div>

        {/* ========================================================================= */}
        {/* ACT 1: FRAME 0 - PURE MINIMAL HOOK + MORPHING CAR & EXPLOSION             */}
        {/* ========================================================================= */}
        <div className="scene-agency-master absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          {/* Main Huge Pristine Headline */}
          <h1 className="cine-hero-h1 text-[clamp(2.8rem,7vw,6.5rem)] font-black text-white tracking-tight leading-[1.05] max-w-5xl drop-shadow-[0_4px_35px_rgba(0,0,0,0.9)]">
            Most agencies <span className="text-gray-400">run your ads.</span>
          </h1>

          {/* Dynamic Supercar & Speed Shaders Canvas */}
          <div className="agency-car-stage relative w-full max-w-4xl h-[260px] mt-4 flex items-center justify-center">
            <svg viewBox="0 0 800 240" className="w-full h-full overflow-visible" fill="none">
              {/* Perspective Road Speed Grid */}
              <SpeedGrid />

              {/* Accelerating Supercar Unit */}
              <g className="supercar-container" transform="translate(60, 100)">
                <AgencyCar />
              </g>

              {/* Explosion Shockwave & Kinetic Shards at Impact Point */}
              <g className="explosion-burst-stage" transform="translate(540, 130)">
                <ExplosionParticles />
              </g>
            </svg>
          </div>

          {/* Minimal Scroll Cue */}
          <div className="mt-8 flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-400">
            <span>Scroll to continue</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5B800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
              <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
            </svg>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT 2: THE 4-PHASE SYSTEM ENGINE & MASTER DOCKED BLUEPRINT                */}
        {/* ========================================================================= */}
        <div className="scene-solution-blueprint relative z-10 w-full grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] xl:grid-cols-[1.02fr_1.18fr] gap-6 lg:gap-10 xl:gap-14 items-center my-auto pt-2 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-gray-100">
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

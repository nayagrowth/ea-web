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

export const CinematicHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set('.cine-hook-scene', { autoAlpha: 1 });
      gsap.set('.cine-reveal-scene', { autoAlpha: 0 });
      gsap.set('.cine-blueprint-scene', { autoAlpha: 0, y: 60, scale: 0.96 });

      // Master 400% Scroll Scrub Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          pin: stageRef.current,
          scrub: 1.1,
          anticipatePin: 1,
        },
      });

      // -------------------------------------------------------------
      // ACT 1: "Most agencies run your ads." -> Kinetic Mask Exit
      // -------------------------------------------------------------
      tl.to('.hook-line-1', {
        y: -60,
        opacity: 0,
        rotateX: 25,
        duration: 1,
        ease: 'power3.in',
      })
        .to('.hook-line-2', {
          y: -60,
          opacity: 0,
          rotateX: 25,
          duration: 1,
          ease: 'power3.in',
        }, '-=0.85')
        .to('.cine-hook-scene', {
          autoAlpha: 0,
          duration: 0.3,
        }, '-=0.2')

        // -------------------------------------------------------------
        // ACT 2: "We SELL-OUT your real estate project..." Kinetic Mask Entrance
        // -------------------------------------------------------------
        .to('.cine-reveal-scene', {
          autoAlpha: 1,
          duration: 0.2,
        })
        .fromTo(
          '.reveal-line-1',
          { y: 80, opacity: 0, clipPath: 'inset(100% 0 0 0)', rotateX: -30 },
          { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', rotateX: 0, duration: 1.2, ease: 'power3.out' },
          '-=0.1'
        )
        .fromTo(
          '.reveal-line-2',
          { y: 80, opacity: 0, clipPath: 'inset(100% 0 0 0)', rotateX: -30 },
          { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', rotateX: 0, duration: 1.2, ease: 'power3.out' },
          '-=0.9'
        )
        .fromTo(
          '.reveal-line-3',
          { y: 80, opacity: 0, clipPath: 'inset(100% 0 0 0)', rotateX: -30 },
          { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', rotateX: 0, duration: 1.2, ease: 'power3.out' },
          '-=0.9'
        )
        .fromTo(
          '.reveal-line-4',
          { y: 80, opacity: 0, clipPath: 'inset(100% 0 0 0)', rotateX: -30 },
          { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', rotateX: 0, duration: 1.2, ease: 'power3.out' },
          '-=0.9'
        )

        // -------------------------------------------------------------
        // ACT 3: Transition & Docking into the 4-Phase System Blueprint
        // -------------------------------------------------------------
        .to('.cine-reveal-scene', {
          autoAlpha: 0,
          scale: 0.94,
          y: -40,
          duration: 1,
          ease: 'power2.inOut',
        })
        .to('.cine-blueprint-scene', {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
        }, '-=0.5')
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
        {/* Luxury Architectural Backdrop with Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="/cinematic_luxury_tower.jpg"
            alt="Luxury Architecture"
            className="w-full h-full object-cover opacity-40 filter brightness-90 contrast-110 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F17]/80 via-[#0B0F17]/50 to-[#0B0F17]/95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,184,0,0.12)_0%,transparent_70%)]" />
        </div>

        {/* Ambient Grid Overlay */}
        <div
          className="absolute inset-0 z-1 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* ========================================================================= */}
        {/* ACT 1: FRAME 0 - INITIAL HOOK ("Most agencies run your ads.")             */}
        {/* ========================================================================= */}
        <div className="cine-hook-scene absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <div className="flex flex-col items-center justify-center gap-1 max-w-5xl">
            <div className="overflow-hidden">
              <span className="hook-line-1 block text-[clamp(3.2rem,7.5vw,6.8rem)] font-black text-white tracking-tight leading-[1.04] drop-shadow-[0_4px_35px_rgba(0,0,0,0.9)]">
                Most agencies
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="hook-line-2 block text-[clamp(3.2rem,7.5vw,6.8rem)] font-black text-gray-400 tracking-tight leading-[1.04] drop-shadow-[0_4px_35px_rgba(0,0,0,0.9)]">
                run your ads.
              </span>
            </div>
          </div>

          <div className="mt-10 flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-400">
            <span>Scroll to reveal the sell-out model</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5B800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
              <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
            </svg>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT 2: SCENE TRANSFORMATION ("We sell-out your real estate project...")   */}
        {/* ========================================================================= */}
        <div className="cine-reveal-scene absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          <div className="flex flex-col items-center justify-center gap-1 max-w-6xl">
            <div className="overflow-hidden">
              <span className="reveal-line-1 block text-[clamp(2.4rem,5.5vw,5rem)] font-black text-white tracking-tight leading-[1.08] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                Most agencies run your ads.
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="reveal-line-2 block text-[clamp(2.4rem,5.5vw,5rem)] font-black text-white tracking-tight leading-[1.08] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                We <span className="text-[#F5B800] glow-gold-cinematic">sell-out</span>
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="reveal-line-3 block text-[clamp(2.4rem,5.5vw,5rem)] font-black text-white tracking-tight leading-[1.08] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                your real estate project
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="reveal-line-4 block text-[clamp(2.4rem,5.5vw,5rem)] font-black text-gray-300 tracking-tight leading-[1.08] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                within your planned timeline.
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT 3: FULL BLUEPRINT STAGE (4-Phase System Engine + Docked Metrics)      */}
        {/* ========================================================================= */}
        <div className="cine-blueprint-scene relative z-10 w-full grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] xl:grid-cols-[1.02fr_1.18fr] gap-6 lg:gap-10 xl:gap-14 items-center my-auto pt-2 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-gray-100 text-gray-900">
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

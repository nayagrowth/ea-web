import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BackgroundMesh } from '../common/BackgroundMesh';
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
  const pinSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !pinSectionRef.current) return;

    const ctx = gsap.context(() => {
      // Create master pinned scrub timeline for the Hero story progression
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=180%',
          pin: pinSectionRef.current,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Act 1 -> Act 2: Transition from "Most agencies run your ads" to "We SELL-OUT your project"
      tl.to('.cine-act1-panel', {
        opacity: 0,
        scale: 0.95,
        y: -30,
        duration: 1,
        ease: 'power2.inOut',
      })
        .fromTo(
          '.cine-act2-panel',
          { opacity: 0, scale: 1.05, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power2.out' },
          '-=0.5'
        )
        // Act 2 -> Act 3: Expand the 4-Phase System & Docked Cards
        .fromTo(
          '.cine-system-stage',
          { opacity: 0, y: 40, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.cine-asset-pill',
          { opacity: 0, y: 15, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.8, ease: 'back.out(1.5)' },
          '-=0.8'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-white">
      {/* Pinned Viewport Container */}
      <div
        ref={pinSectionRef}
        className="relative w-full h-screen min-h-[640px] flex flex-col justify-between px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-4 lg:py-6 overflow-hidden bg-white"
      >
        {/* Ambient Quincunx Mesh */}
        <BackgroundMesh />

        {/* ========================================================================= */}
        {/* ACT 1: THE AGENCY TRAP (Full-Bleed Statement Overlay)                      */}
        {/* ========================================================================= */}
        <div className="cine-act1-panel absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
          <div className="flex items-center gap-2 bg-[#F3F4F6] border border-gray-200 text-gray-800 text-[12px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full shadow-xs mb-6 pointer-events-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] animate-pulse" />
            The Industry Reality
          </div>

          <h1 className="text-[clamp(2.5rem,5.5vw,5.5rem)] font-extrabold text-[#0F172A] tracking-tight leading-[1.08] max-w-5xl">
            Most agencies run your ads.
            <span className="block text-gray-400 font-semibold text-[clamp(1.4rem,2.8vw,2.6rem)] mt-3">
              Burning ad spend on junk enquiries while inventory sits stagnant.
            </span>
          </h1>

          <div className="mt-8 flex items-center gap-3 text-xs font-semibold text-gray-500 bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-gray-200 shadow-xs">
            <span>Scroll to reveal the Project Sell-Out System</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce text-[#F5B800]">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT 2 & 3: THE TRANSFORMATION & 4-PHASE SYSTEM ENGINE                     */}
        {/* ========================================================================= */}
        <div className="cine-act2-panel relative z-10 w-full grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] xl:grid-cols-[1.02fr_1.18fr] gap-6 lg:gap-10 xl:gap-14 items-center my-auto pt-2">
          {/* Left Column: Core Value Proposition */}
          <div className="flex flex-col justify-between py-0 max-w-[620px]">
            <div className="flex flex-col gap-3">
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

              {/* Main 4-Line H1 Headline */}
              <h2 className="text-[clamp(1.85rem,2.8vw,3.15rem)] font-extrabold text-[#0F172A] tracking-tight leading-[1.12] flex flex-col">
                <span className="sm:whitespace-nowrap">Most agencies run</span>
                <span className="sm:whitespace-nowrap">
                  your ads. We <span className="text-[#E5A000]">sell-out</span>
                </span>
                <span className="sm:whitespace-nowrap">your real estate project</span>
                <span className="sm:whitespace-nowrap">within your planned timeline.</span>
              </h2>

              {/* Concise Subheading */}
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

              {/* CTA Buttons Row */}
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

            {/* Balanced 5-Column Asset Class Selector */}
            <div className="pt-3">
              <div className="w-full grid grid-cols-3 sm:grid-cols-5 lg:flex lg:items-center lg:justify-between gap-1.5 sm:gap-2 text-[11px] sm:text-[12px] font-semibold text-gray-700 bg-white/95 backdrop-blur-xs border border-gray-200/80 rounded-2xl p-2 sm:px-3 sm:py-2 shadow-2xs">
                <div className="cine-asset-pill flex items-center justify-center gap-1.5 text-gray-900 font-bold bg-gray-50 sm:bg-transparent py-1.5 px-2 rounded-xl sm:rounded-none">
                  <HomeIcon size={14} />
                  <span>Residential</span>
                </div>
                <div className="cine-asset-pill flex items-center justify-center gap-1.5 text-gray-900 font-bold bg-gray-50 sm:bg-transparent py-1.5 px-2 rounded-xl sm:rounded-none sm:border-l sm:border-gray-200 sm:pl-2">
                  <CommercialIcon size={14} />
                  <span>Commercial</span>
                </div>
                <div className="cine-asset-pill flex items-center justify-center gap-1.5 text-gray-900 font-bold bg-gray-50 sm:bg-transparent py-1.5 px-2 rounded-xl sm:rounded-none sm:border-l sm:border-gray-200 sm:pl-2">
                  <PlottingIcon size={14} />
                  <span>Plotting</span>
                </div>
                <div className="cine-asset-pill flex items-center justify-center gap-1.5 text-gray-900 font-bold bg-gray-50 sm:bg-transparent py-1.5 px-2 rounded-xl sm:rounded-none sm:border-l sm:border-gray-200 sm:pl-2">
                  <VillaIcon size={14} />
                  <span>Villas</span>
                </div>
                <div className="cine-asset-pill col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 text-gray-900 font-bold bg-gray-50 sm:bg-transparent py-1.5 px-2 rounded-xl sm:rounded-none sm:border-l sm:border-gray-200 sm:pl-2">
                  <TownshipIcon size={14} />
                  <span>Townships</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4-Phase System Diagram + Stats Bar */}
          <div className="cine-system-stage w-full flex flex-col justify-between py-0 gap-3">
            <HeroDiagram />
            <StatsBar />
          </div>
        </div>
      </div>
    </div>
  );
};

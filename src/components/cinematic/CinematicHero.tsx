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
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      // Long scrub timeline: Pinned to viewport while scrolling through 5 distinct story beats
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=350%',
          pin: stageRef.current,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // -------------------------------------------------------------
      // BEAT 1: Initial Hook in Spotlight -> "Most agencies run your ads."
      // -------------------------------------------------------------
      tl.fromTo(
        '.beat1-word',
        { y: 60, opacity: 0, rotateX: -40 },
        { y: 0, opacity: 1, rotateX: 0, stagger: 0.08, duration: 1.5, ease: 'power3.out' }
      )
        // -------------------------------------------------------------
        // BEAT 2: The Consequence Pops In -> "Burning ad spend on junk enquiries..."
        // -------------------------------------------------------------
        .fromTo(
          '.beat2-consequence',
          { scale: 0.8, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 1.8, ease: 'back.out(1.6)' },
          '+=0.4'
        )
        // -------------------------------------------------------------
        // BEAT 3: Transition & Pivot -> Beat 1 & 2 exit, The Solution arrives
        // -------------------------------------------------------------
        .to(['.beat1-container', '.beat2-consequence'], {
          opacity: 0,
          scale: 0.9,
          y: -50,
          duration: 1.4,
          ease: 'power2.inOut',
        })
        .fromTo(
          '.beat3-punchline-line',
          { y: 70, opacity: 0, rotateX: -30 },
          { y: 0, opacity: 1, rotateX: 0, stagger: 0.12, duration: 1.8, ease: 'power3.out' },
          '-=0.6'
        )
        // -------------------------------------------------------------
        // BEAT 4: Supporting Proof Banner & Asset Category Pills Flight
        // -------------------------------------------------------------
        .fromTo(
          '.beat4-subheading',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' },
          '-=0.8'
        )
        .fromTo(
          '.beat4-proof-card',
          { opacity: 0, scale: 0.92, y: 25 },
          { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: 'back.out(1.4)' },
          '-=0.8'
        )
        .fromTo(
          '.beat4-cta-group',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' },
          '-=0.8'
        )
        .fromTo(
          '.beat4-category-pill',
          { opacity: 0, scale: 0.85, y: 15 },
          { opacity: 1, scale: 1, y: 0, stagger: 0.08, duration: 1, ease: 'back.out(1.5)' },
          '-=0.8'
        )
        // -------------------------------------------------------------
        // BEAT 5: The 4-Phase System Engine & Docked Stats Bar Dock
        // -------------------------------------------------------------
        .fromTo(
          '.beat5-system-diagram',
          { opacity: 0, x: 50, scale: 0.95 },
          { opacity: 1, x: 0, scale: 1, duration: 2, ease: 'power3.out' },
          '-=1.2'
        )
        .fromTo(
          '.beat5-stats-bar',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.4, ease: 'power2.out' },
          '-=0.8'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-white">
      {/* Pinned Stage Viewport: 100vh locked during scrub */}
      <div
        ref={stageRef}
        className="relative w-full h-screen min-h-[640px] flex flex-col justify-between px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-4 lg:py-6 overflow-hidden bg-white"
      >
        {/* Animated 5-Dot Matrix */}
        <BackgroundMesh />

        {/* ========================================================================= */}
        {/* BEAT 1 & 2: THE HOOK & CONSEQUENCE (Centered Hero Stage)                   */}
        {/* ========================================================================= */}
        <div className="beat1-container absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
          {/* Eyebrow Pill */}
          <div className="flex items-center gap-2 bg-[#F3F4F6] border border-gray-200 text-gray-800 text-[12px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full shadow-xs mb-6 pointer-events-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] animate-pulse" />
            The Industry Reality
          </div>

          {/* Beat 1 Main Headline with Word-by-Word Split */}
          <h1 className="text-[clamp(2.6rem,6vw,6rem)] font-extrabold text-[#0F172A] tracking-tight leading-[1.08] max-w-5xl flex flex-wrap justify-center gap-x-4 gap-y-2">
            <span className="beat1-word inline-block overflow-hidden">Most</span>
            <span className="beat1-word inline-block overflow-hidden">agencies</span>
            <span className="beat1-word inline-block overflow-hidden text-gray-400">run</span>
            <span className="beat1-word inline-block overflow-hidden text-gray-400">your</span>
            <span className="beat1-word inline-block overflow-hidden text-gray-400">ads.</span>
          </h1>

          {/* Beat 2: Consequence Pop-In Badge */}
          <div className="beat2-consequence mt-8 max-w-2xl bg-[#FEF2F2] border border-[#FECACA] rounded-2xl px-6 py-4 shadow-sm">
            <p className="text-[clamp(1.1rem,1.8vw,1.5rem)] font-bold text-[#DC2626] leading-snug">
              Burning ad spend on junk enquiries while inventory sits stagnant.
            </p>
            <span className="block text-xs font-semibold text-gray-500 mt-2 tracking-wide uppercase">
              ↓ Scroll to reveal the Sell-Out Partner Model
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BEAT 3, 4, 5: THE SELL-OUT SOLUTION & 4-PHASE ENGINE (Full Layout)         */}
        {/* ========================================================================= */}
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] xl:grid-cols-[1.02fr_1.18fr] gap-6 lg:gap-10 xl:gap-14 items-center my-auto pt-2">
          {/* Left Column: Solution Headline, Proof & Asset Categories */}
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

              {/* Main Solution Headline */}
              <h2 className="text-[clamp(1.85rem,2.8vw,3.15rem)] font-extrabold text-[#0F172A] tracking-tight leading-[1.12] flex flex-col">
                <span className="beat3-punchline-line sm:whitespace-nowrap">Most agencies run</span>
                <span className="beat3-punchline-line sm:whitespace-nowrap">
                  your ads. We <span className="text-[#E5A000] glow-gold-cinematic">sell-out</span>
                </span>
                <span className="beat3-punchline-line sm:whitespace-nowrap">your real estate project</span>
                <span className="beat3-punchline-line sm:whitespace-nowrap">within your planned timeline.</span>
              </h2>

              {/* Subheading */}
              <p className="beat4-subheading text-[13.5px] sm:text-[14px] lg:text-[14.5px] text-gray-600 leading-relaxed max-w-[540px]">
                Estate Autopilots is a Project Sell-Out Partner for real estate developers and mandate firms. Through our{' '}
                <span className="inline-block font-bold text-gray-950 bg-[#FEF3C7] border border-[#FDE047] px-1.5 py-0.5 rounded-md shimmer-badge shadow-2xs">
                  4-Phase Project Sell-Out System&trade;
                </span>
                , we define positioning, build buyer trust, and accelerate bookings so buyers walk in already convinced.
              </p>

              {/* Real Estate Visual Proof Banner */}
              <div className="beat4-proof-card w-full flex items-center justify-between gap-3 bg-white/95 backdrop-blur-xs border border-gray-200/90 rounded-2xl p-2.5 sm:p-3 shadow-2xs">
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
              <div className="beat4-cta-group flex items-center gap-2.5 sm:gap-3 flex-wrap sm:flex-nowrap pt-1">
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
                <div className="beat4-category-pill flex items-center justify-center gap-1.5 text-gray-900 font-bold bg-gray-50 sm:bg-transparent py-1.5 px-2 rounded-xl sm:rounded-none">
                  <HomeIcon size={14} />
                  <span>Residential</span>
                </div>
                <div className="beat4-category-pill flex items-center justify-center gap-1.5 text-gray-900 font-bold bg-gray-50 sm:bg-transparent py-1.5 px-2 rounded-xl sm:rounded-none sm:border-l sm:border-gray-200 sm:pl-2">
                  <CommercialIcon size={14} />
                  <span>Commercial</span>
                </div>
                <div className="beat4-category-pill flex items-center justify-center gap-1.5 text-gray-900 font-bold bg-gray-50 sm:bg-transparent py-1.5 px-2 rounded-xl sm:rounded-none sm:border-l sm:border-gray-200 sm:pl-2">
                  <PlottingIcon size={14} />
                  <span>Plotting</span>
                </div>
                <div className="beat4-category-pill flex items-center justify-center gap-1.5 text-gray-900 font-bold bg-gray-50 sm:bg-transparent py-1.5 px-2 rounded-xl sm:rounded-none sm:border-l sm:border-gray-200 sm:pl-2">
                  <VillaIcon size={14} />
                  <span>Villas</span>
                </div>
                <div className="beat4-category-pill col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 text-gray-900 font-bold bg-gray-50 sm:bg-transparent py-1.5 px-2 rounded-xl sm:rounded-none sm:border-l sm:border-gray-200 sm:pl-2">
                  <TownshipIcon size={14} />
                  <span>Townships</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4-Phase System Diagram + Stats Bar */}
          <div className="w-full flex flex-col justify-between py-0 gap-3">
            <div className="beat5-system-diagram w-full">
              <HeroDiagram />
            </div>
            <div className="beat5-stats-bar w-full">
              <StatsBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

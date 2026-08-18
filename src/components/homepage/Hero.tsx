import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  CalendarIcon,
  PlayIcon,
  HomeIcon,
  CommercialIcon,
  PlottingIcon,
  VillaIcon,
  TownshipIcon,
} from '../common/Icons';
import { HeroDiagram } from './HeroDiagram';
import { StatsBar } from './StatsBar';
import { BackgroundMesh } from '../common/BackgroundMesh';

export const Hero: React.FC = () => {
  const highlightRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!highlightRef.current) return;

    const el = highlightRef.current;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3.5 });

    tl.to(el, {
      boxShadow: '0 0 14px rgba(245, 194, 0, 0.5)',
      borderColor: '#F5C200',
      duration: 0.5,
      ease: 'power2.out',
    })
      .to(el, {
        opacity: 0.88,
        duration: 0.08,
        yoyo: true,
        repeat: 1,
      })
      .to(el, {
        boxShadow: '0 0 0px rgba(245, 194, 0, 0)',
        borderColor: '#FDE047',
        duration: 0.7,
        ease: 'power2.inOut',
      });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="relative w-full min-h-[calc(100vh-68px)] px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-4 sm:py-6 lg:py-3 flex flex-col justify-center overflow-x-hidden" aria-label="Hero Section">
      {/* 5-Dot Quincunx Animated Background Mesh */}
      <BackgroundMesh />

      {/* Main 2-Column Hero Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] xl:grid-cols-[1.02fr_1.18fr] gap-6 sm:gap-8 lg:gap-10 xl:gap-14 2xl:gap-16 items-center w-full my-0 lg:my-auto">
        {/* Left Column: Value Proposition & Copy */}
        <div className="flex flex-col justify-between py-0 max-w-[620px]">
          <div className="flex flex-col gap-2.5 sm:gap-3">
            {/* Real Estate Eyebrow Badge */}
            <div className="flex items-center gap-2 flex-wrap font-qurova">
              <span className="inline-flex items-center gap-2 bg-[#F3F4F6] border border-gray-200 text-gray-800 text-[12px] sm:text-[13px] font-semibold px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#F5C200] animate-beacon" aria-hidden="true" />
                The Estate Autopilots System
              </span>
              <span className="text-[12px] font-bold text-[#001A24] bg-[#F5C200]/25 px-2.5 py-0.5 rounded-md border border-[#F5C200]/50">
                100% Real Estate Exclusive
              </span>
            </div>

            {/* Main Headline in Official Brand Font Qurova */}
            <h1 className="font-qurova text-[clamp(1.95rem,3.0vw,3.35rem)] font-bold text-[#001A24] tracking-tight leading-[1.12] flex flex-col">
              <span className="sm:whitespace-nowrap">Most agencies run</span>
              <span className="sm:whitespace-nowrap">
                your ads. We <span className="text-[#D99A00]">sell-out</span>
              </span>
              <span className="sm:whitespace-nowrap">your real estate project</span>
              <span className="sm:whitespace-nowrap">within your planned timeline.</span>
            </h1>

            {/* Concise Subheading with GSAP-Animated 4-Phase System Highlight */}
            <p className="text-[13px] sm:text-[14px] lg:text-[14.5px] text-gray-600 leading-relaxed max-w-[540px]">
              Estate Autopilots is a Project Sell-Out Partner for real estate developers and mandate firms. Through our{' '}
              <span
                ref={highlightRef}
                className="inline-block font-qurova font-bold text-[#001A24] bg-[#FEF3C7] border border-[#F5C200] px-1.5 py-0.5 rounded-md shimmer-badge shadow-2xs transition-all cursor-default"
              >
                4-Phase Project Sell-Out System&trade;
              </span>
              , we define positioning, build buyer trust, and accelerate bookings so buyers walk in already convinced.
            </p>

            {/* Full-Width Real Estate Proof Banner */}
            <div className="w-full flex items-center justify-between gap-3 bg-white/95 backdrop-blur-xs border border-gray-200/90 rounded-2xl p-2.5 sm:p-3 shadow-2xs">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src="/luxury_real_estate.jpg"
                  alt="Luxury Real Estate Project Elevation"
                  className="w-16 h-12 sm:w-20 sm:h-14 object-cover rounded-xl shadow-xs flex-shrink-0 border border-gray-100"
                />
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse flex-shrink-0" />
                    <span className="text-[12px] sm:text-[13px] font-extrabold text-gray-900 truncate font-qurova">459+ Real Estate Projects Delivered</span>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium truncate">0% Commission on Bookings &bull; Zero Junk Enquiries</span>
                </div>
              </div>
              <div className="hidden sm:flex flex-col items-end pl-2 border-l border-gray-100 flex-shrink-0 font-agency">
                <span className="text-[13px] font-bold text-[#001A24] bg-[#F5C200]/30 px-2 py-0.5 rounded-md border border-[#F5C200]/60">
                  ⚡ 4.2x Faster
                </span>
                <span className="text-[11px] text-gray-500 font-medium mt-0.5 font-qurova">Sell-Out Speed</span>
              </div>
            </div>

            {/* CTA Buttons Row */}
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap sm:flex-nowrap pt-1 font-qurova">
              <a
                href="#book-strategy-session"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F5C200] hover:bg-[#E5B200] text-[#001A24] font-bold text-[13px] sm:text-[14px] px-5 py-3 rounded-xl border border-[#D99A00] transition-all shadow-sm active:scale-95 whitespace-nowrap"
              >
                <CalendarIcon size={16} />
                <span>Book Your Project Sell-Out Strategy Session</span>
              </a>
              <a
                href="#watch-briefing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#001A24] font-semibold text-[13px] sm:text-[14px] px-4 py-3 rounded-xl border-[1.5px] border-[#001A24] transition-all shadow-2xs active:scale-95 whitespace-nowrap"
              >
                <PlayIcon size={14} />
                <span>Watch the 12-Minute Briefing</span>
              </a>
            </div>
          </div>

          {/* Balanced 5-Column Real Estate Asset Class Selector */}
          <div className="pt-3 font-qurova">
            <div className="w-full grid grid-cols-3 sm:grid-cols-5 lg:flex lg:items-center lg:justify-between gap-1.5 sm:gap-2 text-[11px] sm:text-[12px] font-semibold text-gray-700 bg-white/95 backdrop-blur-xs border border-gray-200/80 rounded-2xl p-2 sm:px-3 sm:py-2 shadow-2xs" aria-label="Supported Real Estate Asset Classes">
              <div className="flex items-center justify-center gap-1.5 text-gray-900 font-bold bg-gray-50 sm:bg-transparent py-1.5 px-2 rounded-xl sm:rounded-none">
                <HomeIcon size={14} />
                <span>Residential</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-gray-900 font-bold bg-gray-50 sm:bg-transparent py-1.5 px-2 rounded-xl sm:rounded-none sm:border-l sm:border-gray-200 sm:pl-2">
                <CommercialIcon size={14} />
                <span>Commercial</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-gray-900 font-bold bg-gray-50 sm:bg-transparent py-1.5 px-2 rounded-xl sm:rounded-none sm:border-l sm:border-gray-200 sm:pl-2">
                <PlottingIcon size={14} />
                <span>Plotting</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-gray-900 font-bold bg-gray-50 sm:bg-transparent py-1.5 px-2 rounded-xl sm:rounded-none sm:border-l sm:border-gray-200 sm:pl-2">
                <VillaIcon size={14} />
                <span>Villas</span>
              </div>
              <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 text-gray-900 font-bold bg-gray-50 sm:bg-transparent py-1.5 px-2 rounded-xl sm:rounded-none sm:border-l sm:border-gray-200 sm:pl-2">
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
    </section>
  );
};

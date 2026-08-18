import React from 'react';
import {
  TargetIcon,
  EditPencilIcon,
  MegaphoneIcon,
  TrendingUpIcon,
  RefreshLoopIcon,
  ShieldCheckIcon,
  BarChartIcon,
  CheckIcon,
} from '../common/Icons';

export const HeroDiagram: React.FC = () => {
  return (
    <div className="w-full flex flex-col relative select-none" aria-label="4-Phase Project Sell-Out System Diagram">
      {/* 4 Process Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-2.5 sm:gap-3 lg:gap-2.5 w-full relative">
        {/* Phase 1: Define */}
        <div className="relative flex flex-col group">
          <div className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 w-6 h-6 sm:w-7 sm:h-7 bg-[#F5C200] text-[#001A24] rounded-full flex items-center justify-center font-agency font-bold text-[13px] sm:text-[14px] shadow-xs z-10 group-hover:scale-110 transition-transform">
            1
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl pt-4 sm:pt-5 pb-3 sm:pb-3.5 px-2 sm:px-2.5 flex flex-col items-center text-center shadow-xs group-hover:border-[#F5C200] group-hover:shadow-md transition-all duration-200 h-full">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#001A24] mb-1.5 sm:mb-2 bg-white shadow-2xs group-hover:bg-[#FEF8E7] transition-colors">
              <TargetIcon size={18} />
            </div>
            <h4 className="font-qurova font-bold text-[14px] sm:text-[15px] text-[#001A24] leading-none mb-1">Define</h4>
            <p className="font-qurova text-[11px] sm:text-[11.5px] text-gray-500 font-medium leading-normal">
              Positioning, ICP &amp; demand blueprint
            </p>
          </div>
        </div>

        {/* Step Arrow 1 -> 2 (Desktop) */}
        <div className="hidden lg:flex text-gray-500 font-bold px-0.5 items-center justify-center" aria-hidden="true">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
            <line x1="1" y1="6" x2="15" y2="6" stroke="#F5C200" strokeWidth="2" />
            <polyline points="11,2 15,6 11,10" stroke="#F5C200" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Phase 2: Create */}
        <div className="relative flex flex-col group">
          <div className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 w-6 h-6 sm:w-7 sm:h-7 bg-[#F5C200] text-[#001A24] rounded-full flex items-center justify-center font-agency font-bold text-[13px] sm:text-[14px] shadow-xs z-10 group-hover:scale-110 transition-transform">
            2
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl pt-4 sm:pt-5 pb-3 sm:pb-3.5 px-2 sm:px-2.5 flex flex-col items-center text-center shadow-xs group-hover:border-[#F5C200] group-hover:shadow-md transition-all duration-200 h-full">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#001A24] mb-1.5 sm:mb-2 bg-white shadow-2xs group-hover:bg-[#FEF8E7] transition-colors">
              <EditPencilIcon size={17} />
            </div>
            <h4 className="font-qurova font-bold text-[14px] sm:text-[15px] text-[#001A24] leading-none mb-1">Create</h4>
            <p className="font-qurova text-[11px] sm:text-[11.5px] text-gray-500 font-medium leading-normal">
              High-converting assets &amp; messaging
            </p>
          </div>
        </div>

        {/* Step Arrow 2 -> 3 (Desktop) */}
        <div className="hidden lg:flex text-gray-500 font-bold px-0.5 items-center justify-center" aria-hidden="true">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
            <line x1="1" y1="6" x2="15" y2="6" stroke="#F5C200" strokeWidth="2" />
            <polyline points="11,2 15,6 11,10" stroke="#F5C200" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Phase 3: Distribute */}
        <div className="relative flex flex-col group">
          <div className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 w-6 h-6 sm:w-7 sm:h-7 bg-[#F5C200] text-[#001A24] rounded-full flex items-center justify-center font-agency font-bold text-[13px] sm:text-[14px] shadow-xs z-10 group-hover:scale-110 transition-transform">
            3
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl pt-4 sm:pt-5 pb-3 sm:pb-3.5 px-2 sm:px-2.5 flex flex-col items-center text-center shadow-xs group-hover:border-[#F5C200] group-hover:shadow-md transition-all duration-200 h-full">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#001A24] mb-1.5 sm:mb-2 bg-white shadow-2xs group-hover:bg-[#FEF8E7] transition-colors">
              <MegaphoneIcon size={17} />
            </div>
            <h4 className="font-qurova font-bold text-[14px] sm:text-[15px] text-[#001A24] leading-none mb-1">Distribute</h4>
            <p className="font-qurova text-[11px] sm:text-[11.5px] text-gray-500 font-medium leading-normal">
              Multi-channel demand generation
            </p>
          </div>
        </div>

        {/* Step Arrow 3 -> 4 (Desktop) */}
        <div className="hidden lg:flex text-gray-500 font-bold px-0.5 items-center justify-center" aria-hidden="true">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
            <line x1="1" y1="6" x2="15" y2="6" stroke="#F5C200" strokeWidth="2" />
            <polyline points="11,2 15,6 11,10" stroke="#F5C200" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Phase 4: Optimize */}
        <div className="relative flex flex-col group">
          <div className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 w-6 h-6 sm:w-7 sm:h-7 bg-[#F5C200] text-[#001A24] rounded-full flex items-center justify-center font-agency font-bold text-[13px] sm:text-[14px] shadow-xs z-10 group-hover:scale-110 transition-transform">
            4
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl pt-4 sm:pt-5 pb-3 sm:pb-3.5 px-2 sm:px-2.5 flex flex-col items-center text-center shadow-xs group-hover:border-[#F5C200] group-hover:shadow-md transition-all duration-200 h-full">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#001A24] mb-1.5 sm:mb-2 bg-white shadow-2xs group-hover:bg-[#FEF8E7] transition-colors">
              <TrendingUpIcon size={17} />
            </div>
            <h4 className="font-qurova font-bold text-[14px] sm:text-[15px] text-[#001A24] leading-none mb-1">Optimize</h4>
            <p className="font-qurova text-[11px] sm:text-[11.5px] text-gray-500 font-medium leading-normal">
              Measure, learn &amp; improve performance
            </p>
          </div>
        </div>
      </div>

      {/* Optimization Loop & Feedback Flow Bridge */}
      <div className="relative h-11 lg:h-13 w-full flex items-center justify-center my-2 sm:my-2.5">
        <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 540 52" preserveAspectRatio="none" fill="none">
          <path
            d="M 475,0 L 475,22 Q 475,28 465,28 L 75,28 Q 65,28 65,22 L 65,6"
            stroke="#CBD5E1"
            strokeWidth="1.6"
            strokeDasharray="4 4"
          />
          <polyline
            points="61,12 65,4 69,12"
            stroke="#CBD5E1"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 65,28 L 65,52"
            stroke="#CBD5E1"
            strokeWidth="1.6"
            strokeDasharray="4 4"
          />
          <path
            d="M 475,28 L 475,52"
            stroke="#CBD5E1"
            strokeWidth="1.6"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Yellow Centered Loop Badge */}
        <div className="relative z-10 inline-flex items-center gap-2 bg-[#F5C200] hover:bg-[#E5B200] text-[#001A24] font-qurova font-bold text-[12px] sm:text-[13px] px-4 py-1.5 rounded-full shadow-sm transition-transform hover:scale-105 cursor-pointer">
          <RefreshLoopIcon size={13} />
          <span>Continuous Optimization Loop</span>
        </div>
      </div>

      {/* Bottom Row: Trust Assets & Sales Intelligence with 60/40 Partitioned Graphic Panels */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-stretch gap-3.5 sm:gap-4 lg:gap-5 w-full font-qurova">
        {/* Trust Assets Card */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:border-gray-300 hover:shadow-md transition-all duration-200 w-full flex flex-col">
          <div className="grid grid-cols-[1.5fr_1fr] h-full">
            {/* Left 60%: Feature Checklist */}
            <div className="p-3.5 sm:p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#001A24] rounded-lg text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <ShieldCheckIcon size={15} />
                  </div>
                  <h4 className="font-bold text-[14px] sm:text-[15px] text-[#001A24] leading-none">Trust Assets</h4>
                </div>
                <ul className="space-y-1.5 pt-1">
                  <li className="flex items-center gap-1.5 text-[11.5px] font-medium text-gray-700">
                    <CheckIcon size={12} />
                    <span>Brand &amp; project credibility</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-[11.5px] font-medium text-gray-700">
                    <CheckIcon size={12} />
                    <span>Social proof &amp; testimonials</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-[11.5px] font-medium text-gray-700">
                    <CheckIcon size={12} />
                    <span>Visuals, walkthroughs &amp; plans</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-[11.5px] font-medium text-gray-700">
                    <CheckIcon size={12} />
                    <span>FAQs &amp; objection handling</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right 40% Partition: Real Estate Pre-Sales Trust Metric Panel */}
            <div className="bg-[#FFFDF7] border-l border-amber-100 p-3 flex flex-col justify-center items-center text-center">
              <span className="text-[9.5px] font-bold text-[#001A24] bg-[#F5C200]/30 border border-[#F5C200]/60 px-2 py-0.5 rounded-full mb-1.5 uppercase tracking-wide">
                Pre-Sales Trust
              </span>
              <div className="w-10 h-10 rounded-full bg-[#FEF3C7] border border-[#F5C200]/50 flex items-center justify-center text-[#D99A00] shadow-2xs mb-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(245,194,0,0.25)" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <span className="font-agency font-bold text-[14px] text-[#001A24] leading-tight">99.4% Rating</span>
              <span className="text-[10px] text-gray-500 font-medium">Buyer Conviction</span>
            </div>
          </div>
        </div>

        {/* Bidirectional Animated Data Bridge (Desktop / Tablet) */}
        <div className="hidden sm:flex flex-col items-center justify-center px-1 lg:px-2 relative my-auto" aria-hidden="true">
          <div className="text-[9.5px] font-bold text-[#001A24] tracking-wider uppercase mb-1 bg-[#F5C200]/30 px-2 py-0.5 rounded-full border border-[#F5C200]/60">
            Live Sync
          </div>
          <svg width="40" height="18" viewBox="0 0 40 18" fill="none">
            <line x1="4" y1="9" x2="36" y2="9" stroke="#475569" strokeWidth="1.6" strokeDasharray="3 3" />
            <polyline points="8,4 4,9 8,14" stroke="#475569" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="32,4 36,9 32,14" stroke="#475569" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Sales Intelligence Card */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:border-gray-300 hover:shadow-md transition-all duration-200 w-full flex flex-col">
          <div className="grid grid-cols-[1.5fr_1fr] h-full">
            {/* Left 60%: Feature Checklist */}
            <div className="p-3.5 sm:p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#001A24] rounded-lg text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <BarChartIcon size={15} />
                  </div>
                  <h4 className="font-bold text-[14px] sm:text-[15px] text-[#001A24] leading-none">Sales Intelligence</h4>
                </div>
                <ul className="space-y-1.5 pt-1">
                  <li className="flex items-center gap-1.5 text-[11.5px] font-medium text-gray-700">
                    <CheckIcon size={12} />
                    <span>Lead scoring &amp; qualification</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-[11.5px] font-medium text-gray-700">
                    <CheckIcon size={12} />
                    <span>Buyer intent tracking</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-[11.5px] font-medium text-gray-700">
                    <CheckIcon size={12} />
                    <span>Real-time dashboards</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-[11.5px] font-medium text-gray-700">
                    <CheckIcon size={12} />
                    <span>ROI &amp; channel attribution</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right 40% Partition: Real Estate Absorption Rate Metric Panel */}
            <div className="bg-[#F0FDF4] border-l border-emerald-100 p-3 flex flex-col justify-center items-center text-center">
              <span className="text-[9.5px] font-bold text-[#047857] bg-[#D1FAE5] border border-[#A7F3D0] px-2 py-0.5 rounded-full mb-1.5 uppercase tracking-wide">
                Site Bookings
              </span>
              <div className="flex items-end gap-1 h-8 mb-1">
                <span className="w-1.5 h-3 bg-emerald-200 rounded-xs" />
                <span className="w-1.5 h-4.5 bg-emerald-300 rounded-xs" />
                <span className="w-1.5 h-6 bg-emerald-400 rounded-xs" />
                <span className="w-1.5 h-8 bg-emerald-600 rounded-xs animate-pulse" />
              </div>
              <span className="font-agency font-bold text-[14px] text-emerald-900 leading-tight">+3.8x Velocity</span>
              <span className="text-[10px] text-gray-500 font-medium">Inventory Absorption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

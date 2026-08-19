import React from 'react';
import './act3Timeline.css';

export const Act3Timeline: React.FC = () => {
  return (
    <div className="act3-stage absolute inset-0 z-20 w-full h-full flex flex-col justify-center items-center px-6 sm:px-12 md:px-16 lg:px-20 pointer-events-none select-none overflow-hidden bg-[#040507]/95">
      {/* Background Architectural Blueprint Grid & Vignette */}
      <div className="act3-sheet-grid absolute inset-0 opacity-15 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#040507]/60 to-[#040507] pointer-events-none z-0" />

      {/* Main Architectural Sheet Canvas */}
      <div className="act3-sheet-frame relative w-full max-w-[1460px] h-[86vh] max-h-[880px] flex flex-col justify-between p-6 sm:p-10 md:p-12 border border-white/[0.08] bg-[#07090c]/70 backdrop-blur-xl rounded-sm z-10">
        
        {/* TOP TELEMETRY BAR: Coordinates, Calibration & Phase Badge */}
        <div className="act3-telemetry-top w-full flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <span className="act3-badge inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#F5C200]/30 bg-[#F5C200]/10 text-[#F5C200] text-[11px] font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5C200] animate-ping" />
              ACT 03 // TIMELINE CERTAINTY MATRIX
            </span>
            <span className="hidden sm:inline-block text-[11px] font-mono text-white/40 tracking-wider">
              COORD [85.72%, 62.32%] // SYSTEM 4-PHASE
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono text-white/50 tracking-wider">
            <span className="text-[#F5C200] font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5C200]" />
              TIMELINE COMPLIANCE: 100%
            </span>
            <span className="hidden md:inline-block text-white/30">|</span>
            <span className="hidden md:inline-block">DELAY RISK: 0.00%</span>
          </div>
        </div>

        {/* CENTER MONUMENTAL EDITORIAL HEADLINE */}
        <div className="act3-headline-block w-full flex flex-col items-start justify-center py-6 md:py-8">
          {/* Row 1: "Within your" (Serif Italic) */}
          <div className="act3-line-1 overflow-hidden">
            <h2 className="font-serif italic font-normal text-[clamp(3.4rem,7.8vw,8.4rem)] text-[#f4f4f2] tracking-[-0.035em] leading-[1.02] pl-1">
              Within your
            </h2>
          </div>

          {/* Row 2: "planned timeline." (Monumental Sans + Gold Shimmer Serif) */}
          <div className="act3-line-2 overflow-hidden mt-1 md:mt-2">
            <h2 className="flex flex-wrap items-baseline gap-x-4 md:gap-x-6">
              <span className="font-sans font-black uppercase text-[clamp(3.6rem,8.2vw,9.0rem)] text-[#f4f4f2] tracking-[-0.045em] leading-[1.0]">
                planned
              </span>
              <span className="act3-gold-shimmer font-serif italic text-[clamp(3.8rem,8.6vw,9.4rem)] font-normal text-[#F5C200] leading-[1.0] pr-4 select-none">
                timeline<span className="text-[#F5C200]">.</span>
              </span>
            </h2>
          </div>
        </div>

        {/* BOTTOM PRECISION ARCHITECTURAL TIMELINE SHEET (4-Phase Milestone Bar) */}
        <div className="act3-timeline-sheet w-full flex flex-col gap-y-4 pt-4 border-t border-white/[0.08]">
          
          {/* Continuous Gold Laser Axis Bar */}
          <div className="act3-horizon-wrap relative w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div className="act3-laser-bar act3-laser-pulse absolute inset-0 bg-gradient-to-r from-[#F5C200] via-[#FFF2CC] to-[#F5C200] shadow-[0_0_16px_rgba(245,194,0,0.8)]" />
          </div>

          {/* 4 Architectural Milestone Columns Aligned with Act 1 Grid */}
          <div className="act3-milestones-grid grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-2">
            
            {/* Milestone 1 */}
            <div className="act3-milestone-card flex flex-col gap-1 p-3 rounded bg-white/[0.02] border border-white/[0.05]">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#F5C200]">
                <span className="font-bold">PHASE 01</span>
                <span className="text-white/40">MONTH 01</span>
              </div>
              <span className="text-[13px] md:text-[14px] font-medium text-white/90 font-sans leading-snug">
                Positioning & Audience Blueprint
              </span>
              <span className="text-[11px] text-white/45 font-mono mt-0.5">
                Market Arbitrage Setup
              </span>
            </div>

            {/* Milestone 2 */}
            <div className="act3-milestone-card flex flex-col gap-1 p-3 rounded bg-white/[0.02] border border-white/[0.05]">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#F5C200]">
                <span className="font-bold">PHASE 02</span>
                <span className="text-white/40">MONTH 02–03</span>
              </div>
              <span className="text-[13px] md:text-[14px] font-medium text-white/90 font-sans leading-snug">
                High-Velocity Pre-Launch
              </span>
              <span className="text-[11px] text-white/45 font-mono mt-0.5">
                Certainty Pipeline Injection
              </span>
            </div>

            {/* Milestone 3 */}
            <div className="act3-milestone-card flex flex-col gap-1 p-3 rounded bg-white/[0.02] border border-white/[0.05]">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#F5C200]">
                <span className="font-bold">PHASE 03</span>
                <span className="text-white/40">MONTH 04–06</span>
              </div>
              <span className="text-[13px] md:text-[14px] font-medium text-white/90 font-sans leading-snug">
                Core Inventory Sell-Out
              </span>
              <span className="text-[11px] text-white/45 font-mono mt-0.5">
                Peak Velocity Realization
              </span>
            </div>

            {/* Milestone 4 */}
            <div className="act3-milestone-card flex flex-col gap-1 p-3 rounded bg-[#F5C200]/[0.04] border border-[#F5C200]/20">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#F5C200]">
                <span className="font-bold">PHASE 04</span>
                <span className="text-[#F5C200]">TARGET MET</span>
              </div>
              <span className="text-[13px] md:text-[14px] font-semibold text-white font-sans leading-snug">
                100% Project Sold-Out
              </span>
              <span className="text-[11px] text-[#F5C200]/80 font-mono mt-0.5">
                Guaranteed On Schedule
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};


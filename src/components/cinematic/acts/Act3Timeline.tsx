import React from 'react';

export const Act3Timeline: React.FC = () => {
  return (
    <div className="act3-stage absolute inset-0 z-20 w-full h-full flex flex-col justify-center items-start px-6 sm:px-12 lg:px-20 2xl:px-28 pointer-events-none select-none">
      <div className="flex flex-col max-w-5xl text-left">
        {/* Line 1: WITHIN YOUR (Sweeps in 1st) */}
        <h2 className="act3-line-1 whitespace-nowrap text-[clamp(3.5rem,8.5vw,8.5rem)] font-black text-white tracking-[-0.04em] leading-[0.94] uppercase drop-shadow-[0_12px_60px_rgba(0,0,0,0.98)]">
          Within your
        </h2>

        {/* Line 2: planned timeline. (Sweeps in 2nd) */}
        <h2 className="act3-line-2 whitespace-nowrap text-[clamp(3.8rem,9.5vw,9.5rem)] font-black tracking-[-0.045em] leading-[0.94] mt-2 sm:mt-3 drop-shadow-[0_14px_70px_rgba(0,0,0,0.98)]">
          <span className="text-[#F5B800] glow-gold-cinematic font-serif italic font-normal tracking-normal">
            planned timeline.
          </span>
        </h2>

        {/* Underneath elements: Horizon trajectory line & Metadata Ribbon (Sweeps in 3rd) */}
        <div className="act3-sub-block flex flex-col items-start w-full">
          {/* Minimalist Golden Horizon Trajectory Line with Precision Markers */}
          <div className="act3-horizon-wrap relative w-full max-w-3xl mt-8 sm:mt-10 flex flex-col items-start">
            {/* Luminous Gold Laser Track */}
            <div className="act3-laser-bar w-full h-[2px] bg-gradient-to-r from-[#F5B800] via-[#F5B800]/80 to-transparent shadow-[0_0_20px_#F5B800]" />

            {/* Precision Milestone Nodes */}
            <div className="w-full flex items-center justify-between mt-3 text-[11px] sm:text-[12px] font-mono tracking-widest text-gray-400 uppercase">
              <span className="flex items-center gap-1.5 text-white font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5B800]" />
                01 &bull; Blueprint
              </span>
              <span className="flex items-center gap-1.5 text-[#F5B800] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5B800] animate-ping" />
                02 &bull; Pre-Sales Trust
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                100% Sold Out On-Schedule
              </span>
            </div>
          </div>

          {/* Aligned Precision Guarantee Metadata Ribbon */}
          <div className="mt-8 flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-full bg-[#F5B800]/10 border border-[#F5B800]/40 flex items-center justify-center text-[#F5B800] text-sm font-black shadow-[0_0_20px_rgba(245,184,0,0.25)]">
              ⏱
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-extrabold text-white tracking-wide">
                100% Target On-Schedule
              </span>
              <span className="text-[11px] font-mono text-gray-400 tracking-wider">
                ZERO PROJECT DELAY GUARANTEE &bull; MANDATE DISCIPLINE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

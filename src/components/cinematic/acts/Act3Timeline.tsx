import React from 'react';

export const Act3Timeline: React.FC = () => {
  return (
    <div className="act3-stage absolute inset-0 z-20 w-full h-full flex flex-col justify-center items-start px-6 sm:px-12 lg:px-20 2xl:px-28 pointer-events-none select-none">
      <div className="flex flex-col max-w-5xl text-left font-qurova">
        {/* Line 1: WITHIN YOUR (Sweeps in 1st) */}
        <h2 className="act3-line-1 whitespace-nowrap text-[clamp(3.5rem,8.5vw,8.5rem)] font-bold text-white tracking-[-0.03em] leading-[0.94] uppercase drop-shadow-[0_12px_60px_rgba(0,0,0,0.98)]">
          Within your
        </h2>

        {/* Line 2: planned timeline. (Sweeps in 2nd) */}
        <h2 className="act3-line-2 whitespace-nowrap text-[clamp(3.8rem,9.5vw,9.5rem)] font-bold tracking-[-0.03em] leading-[0.94] mt-2 sm:mt-3 drop-shadow-[0_14px_70px_rgba(0,0,0,0.98)]">
          <span className="text-[#F5C200] glow-gold-cinematic font-qurova tracking-normal">
            planned timeline.
          </span>
        </h2>

        {/* Minimalist Pure Golden Horizon Laser Bar */}
        <div className="act3-horizon-wrap relative w-full max-w-3xl mt-8 sm:mt-10">
          <div className="act3-laser-bar w-full h-[2.5px] bg-gradient-to-r from-[#F5C200] via-[#F5C200]/80 to-transparent shadow-[0_0_24px_#F5C200]" />
        </div>
      </div>
    </div>
  );
};

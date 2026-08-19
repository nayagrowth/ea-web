import React from 'react';
import './act2EditorialPoster.css';

export const Act2EditorialPoster: React.FC = () => {
  return (
    <div className="act2-poster-stage absolute inset-0 z-20 w-full h-full flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden">
      {/* Horizon Laser & Vanishing Flare Motif (Calibrated to Exact Act 2 VP: 85.72%, 62.32%) */}
      <div
        className="act2-horizon-glow absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#F5C200] to-transparent opacity-0 pointer-events-none z-0"
        style={{ top: '62.32%' }}
      />
      <div
        className="act2-vp-flare absolute -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-radial from-[#F5C200]/25 via-[#F5C200]/5 to-transparent blur-3xl opacity-0 pointer-events-none z-0"
        style={{ left: '85.72%', top: '62.32%' }}
      />

      {/* Main Canonical Responsive Poster Layout */}
      <div className="act2-poster-frame relative w-full max-w-[1440px] h-[86vh] max-h-[860px] px-6 sm:px-12 md:px-16 flex flex-col justify-between z-10">
        
        {/* ROW 1: "We" (Left Grotesk) + "sell-out" (Right Gold Italic) */}
        <div className="act2-row-1 w-full flex items-baseline justify-between pt-2">
          <div className="act2-mask-wrap overflow-hidden">
            <h2 className="act2-word-we font-sans text-[clamp(4.6rem,11.2vw,12rem)] font-black text-[#f4f4f2] tracking-[-0.055em] leading-[0.84]">
              We
            </h2>
          </div>

          <div className="act2-mask-wrap overflow-hidden">
            <span className="act2-word-sellout font-serif italic text-[clamp(4.2rem,10.2vw,11.2rem)] font-normal text-[#F5C200] leading-[0.86] pr-2 select-none">
              sell-out
            </span>
          </div>
        </div>

        {/* ROW 2: "your" (Left White Italic) + "REAL ESTATE" (Right Monumental Sans) */}
        <div className="act2-row-2 w-full flex items-baseline justify-between py-1">
          <div className="act2-mask-wrap overflow-hidden">
            <span className="act2-word-your font-serif italic text-[clamp(4.5rem,10.8vw,11.8rem)] font-normal text-[#f4f4f2] leading-[0.86] select-none">
              your
            </span>
          </div>

          <div className="act2-mask-wrap overflow-hidden">
            <h2 className="act2-word-realestate font-sans text-[clamp(4.2rem,9.8vw,10.8rem)] font-black text-[#f4f4f2] tracking-[-0.05em] leading-[0.84] uppercase">
              real estate
            </h2>
          </div>
        </div>

        {/* ROW 3: "project." (Right Light Sans with Golden Period + Ground Reflection) */}
        <div className="act2-row-3 w-full flex flex-col items-end justify-start pb-2">
          <div className="act2-mask-wrap overflow-hidden">
            <h2 className="act2-word-project font-sans text-[clamp(4.4rem,10.4vw,11.4rem)] font-extralight text-[#f4f4f2]/95 tracking-[-0.045em] leading-[0.86]">
              project<span className="text-[#F5C200]">.</span>
            </h2>
          </div>

          {/* Subtle Reflective Floor Echo */}
          <div className="act2-project-reflection-wrap act2-mask-wrap overflow-hidden mt-0.5 opacity-20 scale-y-[-0.55] origin-top filter blur-[0.5px] pointer-events-none select-none">
            <h2 className="act2-word-project-reflection font-sans text-[clamp(4.4rem,10.4vw,11.4rem)] font-extralight text-[#f4f4f2] tracking-[-0.045em] leading-[0.86] act2-project-reflection">
              project<span className="text-[#F5C200]">.</span>
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import './act2EditorialPoster.css';

export const Act2EditorialPoster: React.FC = () => {
  return (
    <div className="act2-poster-stage absolute inset-0 z-20 w-full h-full flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden">
      {/* High-Contrast Luxury Chiaroscuro Gradient Atmosphere */}
      <div className="act2-ambient-atmosphere absolute inset-0 pointer-events-none z-0">
        {/* Left Pitch Black to Right Architectural Light Horizon */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#040507] via-[#06070a]/90 via-45% to-transparent w-full z-0" />
        {/* Top & Bottom Deep Shadow Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#040507] via-transparent via-30% to-[#040507]/90 pointer-events-none z-0" />
        {/* Subtle Horizon Atmospheric Glow Cone */}
        <div
          className="absolute w-[500px] h-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35 blur-[80px] pointer-events-none z-0"
          style={{
            left: '85.72%',
            top: '62.32%',
            background: 'radial-gradient(ellipse at center, rgba(245, 194, 0, 0.15) 0%, rgba(200, 160, 80, 0.05) 50%, transparent 80%)',
          }}
        />
      </div>

      {/* Main Canonical Responsive Poster Layout */}
      <div className="act2-poster-frame relative w-full max-w-[1480px] h-[84vh] max-h-[860px] px-8 sm:px-14 md:px-20 flex flex-col justify-between z-10 py-4 md:py-6">
        
        {/* ROW 1: "We" (Left Serif) + "sell-out" (Right Gold Italic) */}
        <div className="act2-row-1 w-full flex items-baseline justify-between pt-2 pb-1">
          <div className="act2-mask-wrap">
            <h2 className="act2-word-we font-serif text-[clamp(4.2rem,10.2vw,11.2rem)] font-normal text-[#f4f4f2] tracking-[-0.035em] leading-[1.05] pl-1">
              We
            </h2>
          </div>

          <div className="act2-mask-wrap">
            <span className="act2-word-sellout font-serif italic text-[clamp(3.8rem,9.4vw,10.4rem)] font-normal text-[#F5C200] leading-[1.05] pr-6 select-none">
              sell-out
            </span>
          </div>
        </div>

        {/* ROW 2: "your" (Left White Italic) + "REAL ESTATE" (Right Monumental Sans) */}
        <div className="act2-row-2 w-full flex items-baseline justify-between py-2">
          <div className="act2-mask-wrap">
            <span className="act2-word-your font-serif italic text-[clamp(4.0rem,9.8vw,10.8rem)] font-normal text-[#f4f4f2] leading-[1.05] pl-2 pr-4 select-none">
              your
            </span>
          </div>

          <div className="act2-mask-wrap">
            <h2 className="act2-word-realestate font-sans text-[clamp(3.8rem,9.0vw,10.0rem)] font-black text-[#f4f4f2] tracking-[-0.04em] leading-[1.0] uppercase pr-2">
              real estate
            </h2>
          </div>
        </div>

        {/* ROW 3: "project." (Right Serif with Golden Period + Ground Reflection) */}
        <div className="act2-row-3 w-full flex flex-col items-end justify-start pt-1 pb-4 pr-4">
          <div className="act2-mask-wrap">
            <h2 className="act2-word-project font-serif text-[clamp(4.0rem,9.6vw,10.6rem)] font-normal text-[#f4f4f2]/95 tracking-[-0.035em] leading-[1.05] pb-2">
              project<span className="text-[#F5C200]">.</span>
            </h2>
          </div>

          {/* Subtle Reflective Floor Echo */}
          <div className="act2-project-reflection-wrap act2-mask-wrap mt-1 opacity-20 scale-y-[-0.5] origin-top filter blur-[0.5px] pointer-events-none select-none">
            <h2 className="act2-word-project-reflection font-serif text-[clamp(4.0rem,9.6vw,10.6rem)] font-normal text-[#f4f4f2] tracking-[-0.035em] leading-[1.05] act2-project-reflection">
              project<span className="text-[#F5C200]">.</span>
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
};

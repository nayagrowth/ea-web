import React from 'react';
import './act2EditorialPoster.css';

export const Act2EditorialPoster: React.FC = () => {
  return (
    <div className="act2-poster-stage absolute inset-0 z-20 w-full h-full flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden">
      
      {/* Background Architectural Atmosphere */}
      <div className="act2-ambient-atmosphere absolute inset-0 pointer-events-none z-0">
        {/* Left Pitch Shadow to Right Atmospheric Space */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/70 via-transparent to-[#000000]/40 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/80 via-transparent via-25% to-[#000000]/80 pointer-events-none z-0" />
      </div>

      {/* Vanishing Point Radiating Golden Light Rays (Anchored at 85.72%, 61.5%) */}
      <svg
        className="act2-radiant-rays absolute inset-0 w-full h-full pointer-events-none z-0 opacity-0"
        viewBox="0 0 1672 941"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="act2RayGrad" cx="1433" cy="578" r="800" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFF2CC" stopOpacity="0.9" />
            <stop offset="25%" stopColor="#F5C200" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#D4A017" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#F5C200" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Radiating perspective laser rays */}
        <g stroke="url(#act2RayGrad)" strokeWidth="1.2" opacity="0.85">
          <line x1="1433" y1="578" x2="1672" y2="120" />
          <line x1="1433" y1="578" x2="1672" y2="240" />
          <line x1="1433" y1="578" x2="1672" y2="380" />
          <line x1="1433" y1="578" x2="1672" y2="480" />
          <line x1="1433" y1="578" x2="1672" y2="680" />
          <line x1="1433" y1="578" x2="1672" y2="790" />
          <line x1="1433" y1="578" x2="1672" y2="920" />
          <line x1="1433" y1="578" x2="1520" y2="941" />
          <line x1="1433" y1="578" x2="1320" y2="941" />
          <line x1="1433" y1="578" x2="1100" y2="941" />
          <line x1="1433" y1="578" x2="800" y2="941" />
          <line x1="1433" y1="578" x2="1580" y2="0" />
          <line x1="1433" y1="578" x2="1433" y2="0" />
          <line x1="1433" y1="578" x2="1280" y2="0" />
        </g>
      </svg>

      {/* Horizontal Golden Horizon Laser Beam */}
      <div
        className="act2-horizon-laser absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5C200]/40 via-30% to-[#FFF2CC] opacity-0 pointer-events-none z-0"
        style={{
          top: '61.5%',
          boxShadow: '0 0 16px rgba(245, 194, 0, 0.75)',
        }}
      />

      {/* Vanishing Point Lens Flare Core */}
      <div
        className="act2-vp-starburst absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-0"
        style={{ left: '85.72%', top: '61.5%' }}
      >
        <div className="relative w-28 h-28 flex items-center justify-center">
          <div className="absolute w-6 h-6 rounded-full bg-white shadow-[0_0_24px_#FFF2CC,0_0_48px_#F5C200]" />
          <div className="absolute w-44 h-44 rounded-full bg-radial from-[#F5C200]/35 via-[#F5C200]/10 to-transparent blur-xl" />
        </div>
      </div>

      {/* Main Canonical Responsive Poster Layout */}
      <div className="act2-poster-frame relative w-full max-w-[1520px] h-[86vh] max-h-[880px] px-8 sm:px-14 md:px-20 flex flex-col justify-between z-10 py-6 md:py-8">
        
        {/* ROW 1: "We" (Left Roman Serif) + "sell-out" (Right Gold Italic Serif) */}
        <div className="act2-row-1 w-full flex items-baseline justify-between pt-1">
          <div className="act2-mask-wrap overflow-visible">
            <h2 className="act2-word-we font-serif text-[clamp(4.8rem,11.5vw,12.5rem)] font-normal text-[#f4f4f2] tracking-[-0.035em] leading-[1.0] pl-1 drop-shadow-[0_16px_50px_rgba(0,0,0,0.95)]">
              We
            </h2>
          </div>

          <div className="act2-mask-wrap overflow-visible">
            <span className="act2-word-sellout font-serif italic text-[clamp(4.4rem,10.5vw,11.5rem)] font-normal text-[#F5C200] leading-[1.0] pr-4 select-none drop-shadow-[0_16px_50px_rgba(245,194,0,0.35)]">
              sell-out
            </span>
          </div>
        </div>

        {/* ROW 2: "your" (Left Cursive Script) + "REAL ESTATE" (Right Monumental Sans, resting on Laser) */}
        <div className="act2-row-2 w-full flex items-baseline justify-between py-1">
          <div className="act2-mask-wrap overflow-visible">
            <span className="act2-word-your font-['Dancing_Script',cursive] text-[clamp(4.6rem,11.0vw,12.0rem)] font-bold text-[#f4f4f2] leading-[1.0] pl-2 pr-4 select-none drop-shadow-[0_16px_50px_rgba(0,0,0,0.95)]">
              your
            </span>
          </div>

          <div className="act2-mask-wrap overflow-visible">
            <h2 className="act2-word-realestate font-sans text-[clamp(4.5rem,10.6vw,11.6rem)] font-black text-[#f4f4f2] tracking-[-0.04em] leading-[0.98] uppercase pr-2 drop-shadow-[0_20px_60px_rgba(0,0,0,0.98)]">
              real estate
            </h2>
          </div>
        </div>

        {/* ROW 3: Bottom Left Brand Logo + "project." (Right Roman Serif with Gold Period under Laser) */}
        <div className="act2-row-3 w-full flex items-end justify-between pt-1 pb-2">
          
          {/* Bottom-Left Official Brand Logo */}
          <div className="act2-brand-logo flex items-center select-none pl-2 pb-1 pointer-events-auto">
            <a href="/" className="flex items-center group" aria-label="Estate Autopilots Home">
              <img
                src="/brand/logo-white.png"
                alt="Estate Autopilots"
                className="h-[36px] sm:h-[42px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </a>
          </div>

          {/* Right: "project." */}
          <div className="flex flex-col items-end">
            <div className="act2-mask-wrap overflow-visible">
              <h2 className="act2-word-project font-serif text-[clamp(4.4rem,10.4vw,11.4rem)] font-normal text-[#f4f4f2] tracking-[-0.035em] leading-[1.0] pr-4 drop-shadow-[0_16px_50px_rgba(0,0,0,0.95)]">
                project<span className="text-[#F5C200]">.</span>
              </h2>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

import React from 'react';

export const Act1PosterHook: React.FC = () => {
  return (
    <div className="act1-stage absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-8 lg:px-14 pointer-events-none select-none">
      {/* Master Swiss Modernist Poster Frame */}
      <div className="act1-poster-card relative w-full max-w-5xl xl:max-w-6xl flex flex-col justify-center bg-black/40 p-4 sm:p-8 rounded-none">
        
        {/* ROW 1: "Most" + Horizontal Hairline Rule */}
        <div className="act1-row-1 flex items-center justify-between w-full">
          <span className="text-[clamp(3.2rem,8vw,7.2rem)] font-bold text-white tracking-[-0.04em] leading-none">
            Most
          </span>
          <div className="flex-1 h-[1.5px] bg-white/40 ml-6 sm:ml-10 self-center" />
        </div>

        {/* ROW 2: White Plaque with Massive Black "agencies" */}
        <div className="act1-row-2 w-full bg-[#EAEAEA] text-black px-4 sm:px-8 py-2 sm:py-4 my-3 sm:my-5 flex items-center justify-center overflow-hidden shadow-2xl">
          <span className="text-[clamp(4.2rem,14.5vw,13.5rem)] font-black text-black tracking-[-0.075em] leading-[0.88] uppercase block text-center w-full">
            agencies
          </span>
        </div>

        {/* ROW 3: Tripartite Split ("run" | "— your —" | [ads.] grey box) */}
        <div className="act1-row-3 w-full grid grid-cols-[auto_1fr_1.5fr] sm:grid-cols-[auto_auto_1.6fr] items-stretch gap-3 sm:gap-6">
          
          {/* Column 1: Ultra-Condensed Monumental "run" */}
          <div className="flex items-center justify-start pr-2 sm:pr-4">
            <span className="text-[clamp(3.5rem,10vw,9.5rem)] font-black text-white uppercase tracking-[-0.05em] leading-none block font-sans">
              run
            </span>
          </div>

          {/* Column 2: Delicate Serif Italic "your" with top and bottom hairline borders */}
          <div className="flex flex-col items-center justify-center px-3 sm:px-6 py-1">
            <div className="w-full h-[1px] bg-white/30" />
            <span className="text-[clamp(1.8rem,4.5vw,4.2rem)] font-serif italic text-gray-200 py-1 sm:py-2 leading-none">
              your
            </span>
            <div className="w-full h-[1px] bg-white/30" />
          </div>

          {/* Column 3: Dark Charcoal Box with Slanted Italic "ads." */}
          <div className="bg-[#262626] px-4 sm:px-8 py-2 sm:py-4 flex items-center justify-center overflow-hidden border border-white/10">
            <span className="text-[clamp(3.8rem,11.5vw,10.5rem)] font-black italic text-[#EAEAEA] tracking-[-0.06em] leading-none block">
              ads.
            </span>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Cue */}
      <div className="mt-8 sm:mt-10 flex items-center gap-2.5 text-[11px] font-mono tracking-widest uppercase text-gray-400 bg-black/80 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-md shadow-2xl">
        <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-ping" />
        <span>Scroll to continue</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5B800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce ml-1">
          <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
        </svg>
      </div>
    </div>
  );
};

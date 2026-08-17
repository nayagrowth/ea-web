import React from 'react';
import { SpatialChars } from './SpatialChars';

export const Act1Hook: React.FC = () => {
  return (
    <div className="act1-stage absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
      <div className="max-w-5xl flex flex-col items-center justify-center gap-2">
        <h1 className="text-[clamp(3.4rem,8.6vw,7.6rem)] font-black text-white tracking-[-0.035em] leading-[0.98] drop-shadow-[0_10px_50px_rgba(0,0,0,0.95)]">
          <SpatialChars
            text="Most agencies run your ads."
            charClass="trap-char inline-block"
          />
        </h1>
      </div>

      <div className="mt-14 flex items-center gap-2.5 text-[11px] font-black tracking-widest uppercase text-gray-400 bg-black/70 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-md shadow-2xl">
        <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-ping" />
        <span>Scroll to explore</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5B800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce ml-1">
          <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
        </svg>
      </div>
    </div>
  );
};

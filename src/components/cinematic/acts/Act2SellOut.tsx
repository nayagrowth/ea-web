import React from 'react';
import { SpatialChars } from './SpatialChars';

export const Act2SellOut: React.FC = () => {
  return (
    <div className="act2-stage absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
      <div className="relative max-w-6xl flex flex-col items-center justify-center">
        {/* Ambient Gold Flare */}
        <div className="sellout-gold-flare absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-transparent via-[#F5B800]/25 to-transparent blur-2xl pointer-events-none" />

        <h2 className="text-[clamp(3.4rem,8.4vw,7.6rem)] font-black text-white tracking-[-0.035em] leading-[1.04] drop-shadow-[0_12px_60px_rgba(0,0,0,0.98)]">
          {/* Line 1: We sell-out */}
          <span className="act2-line-1 block">
            <SpatialChars text="We" charClass="sellout-char-angle inline-block" />{' '}
            <span className="inline-block text-[#F5B800] glow-gold-cinematic font-serif italic font-normal tracking-normal mx-2.5">
              <SpatialChars text="sell-out" charClass="sellout-char-angle inline-block text-[#F5B800]" />
            </span>
          </span>
          {/* Line 2: your real estate */}
          <span className="act2-line-2 block mt-2">
            <SpatialChars text="your real estate" charClass="sellout-char-angle inline-block text-white" />
          </span>
          {/* Line 3: project */}
          <span className="act2-line-3 block mt-2">
            <SpatialChars text="project" charClass="sellout-char-angle inline-block text-gray-300" />
          </span>
        </h2>
      </div>
    </div>
  );
};

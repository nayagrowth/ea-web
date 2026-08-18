import React from 'react';

export const Act2StaticStill: React.FC = () => {
  return (
    <div className="act2-static-still relative w-screen h-screen min-h-[660px] flex items-center justify-center bg-[#08090a] overflow-hidden select-none">
      {/* Deep Obsidian Background Base */}
      <div className="absolute inset-0 bg-[#08090a] pointer-events-none" />

      {/* ===================================================================== */}
      {/* CANONICAL 1672 x 941 TRUE 3D VELOCITY CORRIDOR HERO ARTBOARD          */}
      {/* ===================================================================== */}
      <div
        className="act2-canonical-artboard relative w-full h-full max-w-[1672px] max-h-[941px] flex items-center justify-center overflow-hidden"
        style={{ aspectRatio: '1672/941' }}
      >
        <img
          src="/assets/act2-target.png"
          alt="We sell-out your real estate project"
          className="w-full h-full object-contain pointer-events-none select-none block drop-shadow-[0_20px_60px_rgba(0,0,0,0.95)]"
        />
      </div>
    </div>
  );
};

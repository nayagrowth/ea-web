import React from 'react';

export const Act1ArchitecturalColumns: React.FC = () => {
  return (
    <div className="act1-stage act1-columns-variant absolute inset-0 z-20 w-screen h-screen grid grid-cols-4 overflow-hidden pointer-events-none select-none bg-[#09090b]">
      {/* ===================================================================== */}
      {/* COLUMN 1: "Most" (Gallery Porcelain Ground + Pure Didone Serif)       */}
      {/* ===================================================================== */}
      <div className="act1-col-1 relative h-full bg-[#F4F4F3] flex items-center justify-center border-r border-black/10 overflow-hidden">
        <h1 className="act1-most-word font-serif text-[clamp(4.8rem,9vw,10.5rem)] font-normal text-[#080808] tracking-[-0.04em] leading-none select-none">
          Most
        </h1>
      </div>

      {/* ===================================================================== */}
      {/* COLUMN 2: "agencies" (Deep Matte Obsidian + Geometric Sans + Axis)     */}
      {/* ===================================================================== */}
      <div className="act1-col-2 relative h-full bg-[#09090A] flex flex-col items-center justify-start pt-[20vh] border-r border-white/10 overflow-hidden">
        <h2 className="act1-agencies-word font-sans text-[clamp(2.5rem,4.6vw,5.2rem)] font-light text-[#FFFFFF] tracking-[-0.03em] leading-none z-10">
          agencies
        </h2>
        {/* Crisp Plumb-Line Axis dropping from center of 'agencies' */}
        <div className="act1-col2-axis relative w-[1.5px] bg-gradient-to-b from-white/80 via-white/40 to-transparent h-[58vh] mt-5 z-10" />
      </div>

      {/* ===================================================================== */}
      {/* COLUMN 3: Split Stack (3D Perspective Runway "run" + Textured "your.") */}
      {/* ===================================================================== */}
      <div className="act1-col-3 relative h-full flex flex-col border-r border-white/10 overflow-hidden bg-[#E8E3DA]">
        <img
          src="/cinematic_run_your.png"
          alt="Run & Your Architectural Panels"
          className="w-full h-full object-cover block"
        />
      </div>

      {/* ===================================================================== */}
      {/* COLUMN 4: "ads." (Solar Eclipse with Real Light Refraction & Gold)    */}
      {/* ===================================================================== */}
      <div className="act1-col-4 relative h-full bg-[#08080A] flex items-center justify-center overflow-hidden">
        <img
          src="/cinematic_eclipse_ads.png"
          alt="Solar Eclipse Corona ads."
          className="w-full h-full object-cover block filter brightness-100 contrast-105"
        />

        {/* Ambient Corona Glow Enhancement */}
        <div
          className="act1-gold-eclipse absolute -right-[8vw] w-[32vw] h-[85vh] rounded-full pointer-events-none opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(ellipse at 80% 50%, rgba(245, 184, 0, 0.4) 0%, rgba(212, 175, 55, 0.15) 50%, transparent 75%)',
          }}
        />
      </div>

      {/* Floating Minimal Scroll Cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 text-[11px] font-mono tracking-widest uppercase text-gray-400 bg-black/85 border border-white/10 px-5 py-2 rounded-full backdrop-blur-md shadow-2xl z-30 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-ping" />
        <span>Scroll to continue</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5B800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce ml-1">
          <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
        </svg>
      </div>
    </div>
  );
};

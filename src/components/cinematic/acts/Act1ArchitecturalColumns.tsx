import React from 'react';

export const Act1ArchitecturalColumns: React.FC = () => {
  return (
    <div className="act1-stage act1-columns-variant absolute inset-0 z-20 w-screen h-screen grid grid-cols-4 overflow-hidden pointer-events-none select-none bg-[#080808]">
      {/* ===================================================================== */}
      {/* COLUMN 1: "Most" (Off-White Porcelain Ground + Luxury High-Serif)      */}
      {/* ===================================================================== */}
      <div className="act1-col-1 relative h-full bg-[#F4F4F2] flex items-center justify-center border-r border-black/10 overflow-hidden">
        <h1 className="act1-most-word font-serif text-[clamp(4.5rem,8.6vw,9.5rem)] font-normal text-[#0A0A0A] tracking-[-0.04em] leading-none select-none drop-shadow-sm">
          Most
        </h1>
      </div>

      {/* ===================================================================== */}
      {/* COLUMN 2: "agencies" (Deep Void Black + Modern Geometric Sans + Axis)  */}
      {/* ===================================================================== */}
      <div className="act1-col-2 relative h-full bg-[#0A0A0C] flex flex-col items-center justify-start pt-[22vh] border-r border-white/10 overflow-hidden">
        <h2 className="act1-agencies-word font-sans text-[clamp(2.4rem,4.4vw,4.8rem)] font-light text-[#FFFFFF] tracking-[-0.03em] leading-none z-10">
          agencies
        </h2>
        {/* Architectural Vertical Plumb-Line / Meridian Axis */}
        <div className="act1-col2-axis relative w-[1.5px] bg-gradient-to-b from-white/70 via-white/30 to-transparent h-[55vh] mt-4 z-10" />
      </div>

      {/* ===================================================================== */}
      {/* COLUMN 3: Split Stack ("run" 3D Perspective + "your." Textured Serif)  */}
      {/* ===================================================================== */}
      <div className="act1-col-3 relative h-full flex flex-col border-r border-white/10 overflow-hidden">
        {/* Top 55%: "run" with 3D Architectural Horizon Lines */}
        <div className="act1-run-panel relative h-[56%] bg-[#F0EFEB] flex flex-col items-center justify-start pt-[12vh] overflow-hidden border-b border-black/15">
          {/* 3D Perspective Radial Fluting/Lines Receding into Center Horizon */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-45"
            viewBox="0 0 300 400"
            preserveAspectRatio="none"
          >
            <g stroke="#9E9E9C" strokeWidth="1.2">
              <line x1="150" y1="90" x2="-50" y2="400" />
              <line x1="150" y1="90" x2="0" y2="400" />
              <line x1="150" y1="90" x2="50" y2="400" />
              <line x1="150" y1="90" x2="100" y2="400" />
              <line x1="150" y1="90" x2="150" y2="400" />
              <line x1="150" y1="90" x2="200" y2="400" />
              <line x1="150" y1="90" x2="250" y2="400" />
              <line x1="150" y1="90" x2="300" y2="400" />
              <line x1="150" y1="90" x2="350" y2="400" />
            </g>
          </svg>

          <h2 className="act1-run-word relative z-10 font-sans text-[clamp(3.8rem,7vw,7.4rem)] font-black text-[#0A0A0A] tracking-[-0.04em] leading-none">
            run
          </h2>
        </div>

        {/* Bottom 44%: "your." with Fine Baseline & Gold Dot */}
        <div className="act1-your-panel relative h-[44%] bg-[#E8E4DC] flex flex-col items-center justify-center px-6 overflow-hidden">
          <div className="relative flex flex-col items-center">
            <h2 className="act1-your-word font-serif italic text-[clamp(4rem,7.5vw,8rem)] font-normal text-[#0A0A0A] tracking-[-0.03em] leading-none">
              your
            </h2>
            {/* Fine Baseline Rule with Gold Dot */}
            <div className="act1-your-rule-wrap relative w-full flex items-center justify-end mt-1">
              <div className="act1-your-rule w-full h-[1.5px] bg-black/35" />
              <span className="act1-your-dot ml-2 w-3.5 h-3.5 rounded-full bg-[#C89B3C] shadow-[0_0_10px_rgba(200,155,60,0.6)] shrink-0" />
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* COLUMN 4: "ads." (Deep Space Void + Glowing Golden Eclipse Arc)        */}
      {/* ===================================================================== */}
      <div className="act1-col-4 relative h-full bg-[#08080A] flex items-center justify-center overflow-hidden">
        {/* Massive Radiant Golden Crescent Arc on the Right Edge */}
        <div
          className="act1-gold-eclipse absolute -right-[22vw] w-[45vw] h-[90vh] rounded-[50%] border-r-[18px] border-[#D4AF37] pointer-events-none shadow-[0_0_80px_20px_rgba(212,175,55,0.45)] blur-[0.5px]"
          style={{
            background: 'radial-gradient(ellipse at 85% 50%, rgba(212, 175, 55, 0.18) 0%, transparent 65%)',
          }}
        />

        {/* Outer Halo Glow */}
        <div className="absolute -right-[15vw] w-[35vw] h-[75vh] rounded-full bg-[#F5B800]/15 blur-3xl pointer-events-none" />

        {/* "ads." in Pure Metallic Liquid Gold */}
        <h2 className="act1-ads-word relative z-10 font-sans text-[clamp(4.2rem,8vw,8.8rem)] font-black text-[#C89B3C] tracking-[-0.04em] leading-none drop-shadow-[0_10px_35px_rgba(200,155,60,0.4)]">
          ads.
        </h2>
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

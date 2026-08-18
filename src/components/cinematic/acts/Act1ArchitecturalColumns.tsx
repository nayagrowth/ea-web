import React from 'react';

export const Act1ArchitecturalColumns: React.FC = () => {
  return (
    <div className="act1-stage act1-columns-variant absolute inset-0 z-20 w-screen h-screen grid grid-cols-4 overflow-hidden pointer-events-none select-none bg-[#09090b]">
      {/* ===================================================================== */}
      {/* COLUMN 1: "Most" (Crisp Porcelain Gallery Ground + Pure Didone Serif) */}
      {/* ===================================================================== */}
      <div className="act1-col-1 relative h-full bg-[#F4F4F3] flex items-center justify-center border-r border-black/10 overflow-hidden">
        <h1 className="act1-most-word font-serif text-[clamp(4.8rem,9vw,10rem)] font-normal text-[#080808] tracking-[-0.04em] leading-none select-none">
          Most
        </h1>
      </div>

      {/* ===================================================================== */}
      {/* COLUMN 2: "agencies" (Deep Matte Obsidian + Geometric Sans + Axis)     */}
      {/* ===================================================================== */}
      <div className="act1-col-2 relative h-full bg-[#09090A] flex flex-col items-center justify-start pt-[20vh] border-r border-white/10 overflow-hidden">
        <h2 className="act1-agencies-word font-sans text-[clamp(2.5rem,4.6vw,5rem)] font-light text-[#FFFFFF] tracking-[-0.03em] leading-none z-10">
          agencies
        </h2>
        {/* Crisp Plumb-Line Axis dropping from center of 'agencies' */}
        <div className="act1-col2-axis relative w-[1.5px] bg-gradient-to-b from-white/80 via-white/40 to-transparent h-[58vh] mt-5 z-10" />
      </div>

      {/* ===================================================================== */}
      {/* COLUMN 3: Split Stack (3D Perspective Runway "run" + Textured "your.") */}
      {/* ===================================================================== */}
      <div className="act1-col-3 relative h-full flex flex-col border-r border-white/10 overflow-hidden">
        {/* Top 54%: "run" with 3D Beveled Architectural Fluted Perspective Runway */}
        <div className="act1-run-panel relative h-[54%] bg-[#F1EFEB] flex flex-col items-center justify-between pt-[10vh] overflow-hidden border-b border-black/15">
          {/* Word "run" */}
          <h2 className="act1-run-word relative z-10 font-sans text-[clamp(4rem,7.5vw,7.8rem)] font-black text-[#0A0A0A] tracking-[-0.05em] leading-none">
            run
          </h2>

          {/* 3D Architectural Beveled Radial Fluting Perspective Floor */}
          <div className="relative w-full h-[58%] mt-auto">
            <svg
              className="w-full h-full block"
              viewBox="0 0 400 260"
              preserveAspectRatio="none"
            >
              <defs>
                {/* 3D Panel Surface Gradient */}
                <linearGradient id="plank-surface" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F5F3EF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#D9D5CC" stopOpacity="1" />
                </linearGradient>

                {/* Metallic Highlight on Left Edge */}
                <linearGradient id="rib-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#D5D0C6" />
                </linearGradient>

                {/* Drop Shadow on Right Edge */}
                <linearGradient id="rib-shadow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7E7A72" />
                  <stop offset="100%" stopColor="#B3ADA3" />
                </linearGradient>
              </defs>

              {/* 3D Fluted Beveled Beams converging to Vanishing Point (x: 200, y: 10) */}
              <g className="opacity-95">
                {/* Beam 1 */}
                <polygon points="198,10 202,10 -20,260 -5,260" fill="url(#plank-surface)" />
                <line x1="198" y1="10" x2="-20" y2="260" stroke="url(#rib-highlight)" strokeWidth="2" />
                <line x1="202" y1="10" x2="-5" y2="260" stroke="url(#rib-shadow)" strokeWidth="2.5" />

                {/* Beam 2 */}
                <polygon points="199,10 201,10 35,260 50,260" fill="url(#plank-surface)" />
                <line x1="199" y1="10" x2="35" y2="260" stroke="url(#rib-highlight)" strokeWidth="2" />
                <line x1="201" y1="10" x2="50" y2="260" stroke="url(#rib-shadow)" strokeWidth="2.5" />

                {/* Beam 3 */}
                <polygon points="199.5,10 200.5,10 90,260 105,260" fill="url(#plank-surface)" />
                <line x1="199.5" y1="10" x2="90" y2="260" stroke="url(#rib-highlight)" strokeWidth="2" />
                <line x1="200.5" y1="10" x2="105" y2="260" stroke="url(#rib-shadow)" strokeWidth="2.5" />

                {/* Beam 4 */}
                <polygon points="200,10 200.5,10 145,260 160,260" fill="url(#plank-surface)" />
                <line x1="200" y1="10" x2="145" y2="260" stroke="url(#rib-highlight)" strokeWidth="2" />
                <line x1="200.5" y1="10" x2="160" y2="260" stroke="url(#rib-shadow)" strokeWidth="2" />

                {/* Center Meridian Beam 5 */}
                <polygon points="200,10 200.5,10 195,260 205,260" fill="url(#plank-surface)" />
                <line x1="200" y1="10" x2="195" y2="260" stroke="url(#rib-highlight)" strokeWidth="2" />
                <line x1="200.5" y1="10" x2="205" y2="260" stroke="url(#rib-shadow)" strokeWidth="2" />

                {/* Beam 6 */}
                <polygon points="200,10 200.5,10 240,260 255,260" fill="url(#plank-surface)" />
                <line x1="200" y1="10" x2="240" y2="260" stroke="url(#rib-highlight)" strokeWidth="2" />
                <line x1="200.5" y1="10" x2="255" y2="260" stroke="url(#rib-shadow)" strokeWidth="2" />

                {/* Beam 7 */}
                <polygon points="200,10 201,10 295,260 310,260" fill="url(#plank-surface)" />
                <line x1="200" y1="10" x2="295" y2="260" stroke="url(#rib-highlight)" strokeWidth="2" />
                <line x1="201" y1="10" x2="310" y2="260" stroke="url(#rib-shadow)" strokeWidth="2.5" />

                {/* Beam 8 */}
                <polygon points="200,10 202,10 350,260 365,260" fill="url(#plank-surface)" />
                <line x1="200" y1="10" x2="350" y2="260" stroke="url(#rib-highlight)" strokeWidth="2" />
                <line x1="202" y1="10" x2="365" y2="260" stroke="url(#rib-shadow)" strokeWidth="2.5" />

                {/* Beam 9 */}
                <polygon points="200,10 202,10 405,260 420,260" fill="url(#plank-surface)" />
                <line x1="200" y1="10" x2="405" y2="260" stroke="url(#rib-highlight)" strokeWidth="2" />
                <line x1="202" y1="10" x2="420" y2="260" stroke="url(#rib-shadow)" strokeWidth="2.5" />
              </g>
            </svg>
          </div>
        </div>

        {/* Bottom 46%: "your." with Textured Stone Card & 3D Gold Dot */}
        <div className="act1-your-panel relative h-[46%] bg-[#E8E3DA] flex flex-col items-center justify-center px-8 overflow-hidden">
          {/* Subtle noise/texture overlay for luxury card feel */}
          <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px] opacity-5 pointer-events-none" />

          <div className="relative flex flex-col items-start w-full max-w-[280px]">
            <h2 className="act1-your-word font-serif italic text-[clamp(4.2rem,8vw,8.5rem)] font-normal text-[#080808] tracking-[-0.04em] leading-[0.88] select-none">
              your
            </h2>
            {/* Fine Baseline Rule with Shaded 3D Gold Dot */}
            <div className="act1-your-rule-wrap relative w-full flex items-center justify-end mt-1">
              <div className="act1-your-rule w-full h-[1.5px] bg-[#1a1a1a]/40" />
              <div
                className="act1-your-dot ml-2.5 w-4 h-4 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.25)] shrink-0"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #F5D77F 0%, #D4AF37 50%, #8C6B1C 100%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* COLUMN 4: "ads." (Solar Eclipse Crescent Corona + Liquid Gold Typo)    */}
      {/* ===================================================================== */}
      <div className="act1-col-4 relative h-full bg-[#08080A] flex items-center justify-center overflow-hidden">
        {/* Solar Corona Ambient Golden Backlight on the Right Rim */}
        <div
          className="absolute -right-[10vw] w-[35vw] h-[85vh] rounded-full pointer-events-none opacity-90 blur-3xl"
          style={{
            background: 'radial-gradient(ellipse at 80% 50%, rgba(212, 175, 55, 0.45) 0%, rgba(245, 184, 0, 0.18) 40%, transparent 70%)',
          }}
        />

        {/* The Radiant Solar Eclipse Crescent Arc SVG */}
        <svg
          className="act1-gold-eclipse absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 300 600"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Liquid Gold Arc Gradient */}
            <linearGradient id="eclipse-arc-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9E8A2" />
              <stop offset="25%" stopColor="#D4AF37" />
              <stop offset="65%" stopColor="#ECC662" />
              <stop offset="100%" stopColor="#A87A20" />
            </linearGradient>

            {/* Glowing Corona Filter */}
            <filter id="corona-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Soft Outer Corona Halo Arc */}
          <path
            d="M 235,-20 Q 295,300 235,620"
            fill="none"
            stroke="#F5B800"
            strokeWidth="20"
            opacity="0.3"
            filter="url(#corona-glow)"
          />

          {/* Secondary Warm Glow Arc */}
          <path
            d="M 235,-20 Q 295,300 235,620"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="10"
            opacity="0.6"
            filter="url(#corona-glow)"
          />

          {/* Precision Intense Solar Crescent Rim */}
          <path
            d="M 235,-20 Q 295,300 235,620"
            fill="none"
            stroke="url(#eclipse-arc-gold)"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>

        {/* "ads." in Pure Radiant Liquid Metallic Gold */}
        <h2
          className="act1-ads-word relative z-10 font-sans text-[clamp(4.5rem,8.6vw,9.5rem)] font-black tracking-[-0.04em] leading-none drop-shadow-[0_12px_40px_rgba(0,0,0,0.9)]"
          style={{
            background: 'linear-gradient(135deg, #F9E7A2 0%, #D4AF37 38%, #AA7E24 75%, #F0CE6E 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
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

import React from 'react';

export const Act1ArchitecturalColumns: React.FC = () => {
  return (
    <div className="act1-stage act1-columns-variant absolute inset-0 z-20 w-screen h-screen grid grid-cols-4 overflow-hidden pointer-events-none select-none bg-[#08080A]">
      {/* ===================================================================== */}
      {/* COLUMN 1: "Most" (Gallery Porcelain Ground + Pure Didone Serif)       */}
      {/* ===================================================================== */}
      <div className="act1-col-1 relative h-full bg-[#F5F5F4] flex items-center justify-center border-r border-black/10 overflow-hidden">
        <h1 className="act1-most-word font-serif text-[clamp(4.8rem,9vw,10.5rem)] font-normal text-[#080808] tracking-[-0.04em] leading-none select-none">
          Most
        </h1>
      </div>

      {/* ===================================================================== */}
      {/* COLUMN 2: "agencies" (Deep Matte Obsidian + Geometric Sans + Axis)     */}
      {/* ===================================================================== */}
      <div className="act1-col-2 relative h-full bg-[#08080A] flex flex-col items-center justify-start pt-[20vh] border-r border-white/10 overflow-hidden">
        <h2 className="act1-agencies-word font-sans text-[clamp(2.5rem,4.6vw,5.2rem)] font-light text-[#FFFFFF] tracking-[-0.03em] leading-none z-10">
          agencies
        </h2>
        {/* Crisp Plumb-Line Axis dropping from center of 'agencies' */}
        <div className="act1-col2-axis relative w-[1.5px] bg-gradient-to-b from-white/80 via-white/40 to-transparent h-[58vh] mt-5 z-10" />
      </div>

      {/* ===================================================================== */}
      {/* COLUMN 3: Split Stack (3D Perspective Runway "run" + Textured "your.") */}
      {/* ===================================================================== */}
      <div className="act1-col-3 relative h-full flex flex-col border-r border-white/10 overflow-hidden">
        {/* Top 54%: "run" with Realistic Architectural 3D Ground Perspective Runway */}
        <div className="act1-run-panel relative h-[54%] bg-[#F3F0EC] flex flex-col items-center justify-between pt-[8vh] overflow-hidden border-b border-black/15">
          {/* Extended Bold Modern Sans "run" */}
          <h2 className="act1-run-word relative z-10 font-sans text-[clamp(4.2rem,8vw,8.4rem)] font-black text-[#0A0A0A] tracking-[-0.05em] leading-none scale-y-95">
            run
          </h2>

          {/* Mathematical 3D Floor Perspective Runway Floor */}
          <div className="relative w-full h-[66%] mt-auto overflow-hidden">
            <svg
              className="w-full h-full block"
              viewBox="0 0 400 300"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Longitudinal Beam Shading */}
                <linearGradient id="beam-fade" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#EDEAE4" stopOpacity="0" />
                  <stop offset="25%" stopColor="#E2DDD4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#CCC6BB" stopOpacity="1" />
                </linearGradient>

                <linearGradient id="ridge-highlight" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                  <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                </linearGradient>

                <linearGradient id="ridge-shadow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#9E9A92" stopOpacity="0" />
                  <stop offset="30%" stopColor="#9E9A92" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#7A756C" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Distant Atmospheric Horizon Fade */}
              <rect x="0" y="0" width="400" height="300" fill="url(#beam-fade)" opacity="0.3" />

              {/* 3D Longitudinal Runway Tracks (Vanishing Point at x: 200, y: 15) */}
              <g>
                {/* Track -5 */}
                <polygon points="199,15 201,15 -60,300 -40,300" fill="url(#beam-fade)" />
                <line x1="199" y1="15" x2="-60" y2="300" stroke="url(#ridge-highlight)" strokeWidth="1.8" />
                <line x1="201" y1="15" x2="-40" y2="300" stroke="url(#ridge-shadow)" strokeWidth="2.2" />

                {/* Track -4 */}
                <polygon points="199.2,15 200.8,15 0,300 20,300" fill="url(#beam-fade)" />
                <line x1="199.2" y1="15" x2="0" y2="300" stroke="url(#ridge-highlight)" strokeWidth="1.8" />
                <line x1="200.8" y1="15" x2="20" y2="300" stroke="url(#ridge-shadow)" strokeWidth="2.2" />

                {/* Track -3 */}
                <polygon points="199.4,15 200.6,15 60,300 78,300" fill="url(#beam-fade)" />
                <line x1="199.4" y1="15" x2="60" y2="300" stroke="url(#ridge-highlight)" strokeWidth="1.6" />
                <line x1="200.6" y1="15" x2="78" y2="300" stroke="url(#ridge-shadow)" strokeWidth="2.0" />

                {/* Track -2 */}
                <polygon points="199.6,15 200.4,15 115,300 130,300" fill="url(#beam-fade)" />
                <line x1="199.6" y1="15" x2="115" y2="300" stroke="url(#ridge-highlight)" strokeWidth="1.5" />
                <line x1="200.4" y1="15" x2="130" y2="300" stroke="url(#ridge-shadow)" strokeWidth="1.8" />

                {/* Track -1 */}
                <polygon points="199.8,15 200.2,15 165,300 178,300" fill="url(#beam-fade)" />
                <line x1="199.8" y1="15" x2="165" y2="300" stroke="url(#ridge-highlight)" strokeWidth="1.4" />
                <line x1="200.2" y1="15" x2="178" y2="300" stroke="url(#ridge-shadow)" strokeWidth="1.6" />

                {/* Center Track 0 */}
                <polygon points="199.9,15 200.1,15 194,300 206,300" fill="url(#beam-fade)" />
                <line x1="199.9" y1="15" x2="194" y2="300" stroke="url(#ridge-highlight)" strokeWidth="1.4" />
                <line x1="200.1" y1="15" x2="206" y2="300" stroke="url(#ridge-shadow)" strokeWidth="1.6" />

                {/* Track +1 */}
                <polygon points="199.8,15 200.2,15 222,300 235,300" fill="url(#beam-fade)" />
                <line x1="199.8" y1="15" x2="222" y2="300" stroke="url(#ridge-highlight)" strokeWidth="1.4" />
                <line x1="200.2" y1="15" x2="235" y2="300" stroke="url(#ridge-shadow)" strokeWidth="1.6" />

                {/* Track +2 */}
                <polygon points="199.6,15 200.4,15 270,300 285,300" fill="url(#beam-fade)" />
                <line x1="199.6" y1="15" x2="270" y2="300" stroke="url(#ridge-highlight)" strokeWidth="1.5" />
                <line x1="200.4" y1="15" x2="285" y2="300" stroke="url(#ridge-shadow)" strokeWidth="1.8" />

                {/* Track +3 */}
                <polygon points="199.4,15 200.6,15 322,300 340,300" fill="url(#beam-fade)" />
                <line x1="199.4" y1="15" x2="322" y2="300" stroke="url(#ridge-highlight)" strokeWidth="1.6" />
                <line x1="200.6" y1="15" x2="340" y2="300" stroke="url(#ridge-shadow)" strokeWidth="2.0" />

                {/* Track +4 */}
                <polygon points="199.2,15 200.8,15 380,300 400,300" fill="url(#beam-fade)" />
                <line x1="199.2" y1="15" x2="380" y2="300" stroke="url(#ridge-highlight)" strokeWidth="1.8" />
                <line x1="200.8" y1="15" x2="400" y2="300" stroke="url(#ridge-shadow)" strokeWidth="2.2" />

                {/* Track +5 */}
                <polygon points="199,15 201,15 440,300 460,300" fill="url(#beam-fade)" />
                <line x1="199" y1="15" x2="440" y2="300" stroke="url(#ridge-highlight)" strokeWidth="1.8" />
                <line x1="201" y1="15" x2="460" y2="300" stroke="url(#ridge-shadow)" strokeWidth="2.2" />
              </g>
            </svg>
          </div>
        </div>

        {/* Bottom 46%: "your." with Procedural Stone Card & 3D Shaded Gold Dot */}
        <div className="act1-your-panel relative h-[46%] bg-[#E8E3DA] flex flex-col items-center justify-center px-8 overflow-hidden">
          {/* Subtle noise/texture overlay for architectural card feel */}
          <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.06] pointer-events-none" />

          <div className="relative flex flex-col items-start w-full max-w-[280px]">
            <h2 className="act1-your-word font-serif italic text-[clamp(4.2rem,8vw,8.5rem)] font-normal text-[#080808] tracking-[-0.04em] leading-[0.88] select-none">
              your
            </h2>
            {/* Fine Baseline Rule with 3D Gold Dot */}
            <div className="act1-your-rule-wrap relative w-full flex items-center justify-end mt-1">
              <div className="act1-your-rule w-full h-[1.5px] bg-[#1a1a1a]/40" />
              <div
                className="act1-your-dot ml-2.5 w-4 h-4 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.25)] shrink-0"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #F7E59D 0%, #D4AF37 50%, #8C6B1C 100%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* COLUMN 4: "ads." (Solar Eclipse Refraction with Physical Backlight)   */}
      {/* ===================================================================== */}
      <div className="act1-col-4 relative h-full bg-[#08080A] flex items-center justify-center overflow-hidden">
        {/* Layer 1: Occluded Sun Radiant Backlight Behind the Rim */}
        <div
          className="absolute -right-[12vw] w-[42vw] h-[95vh] rounded-full pointer-events-none blur-3xl opacity-95"
          style={{
            background: 'radial-gradient(ellipse at 75% 50%, rgba(255, 220, 120, 0.7) 0%, rgba(245, 184, 0, 0.45) 30%, rgba(180, 120, 20, 0.2) 55%, transparent 75%)',
          }}
        />

        {/* Layer 2: Real Atmospheric Corona Dispersion SVG */}
        <svg
          className="act1-gold-eclipse absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 300 600"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Incandescent Core Rim Gradient */}
            <linearGradient id="true-eclipse-rim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF7D6" />
              <stop offset="25%" stopColor="#F9E28A" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="80%" stopColor="#E5B242" />
              <stop offset="100%" stopColor="#A6761A" />
            </linearGradient>

            {/* Gaussian Corona Filter */}
            <filter id="true-corona-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="22" result="ambientGlow" />
              <feGaussianBlur stdDeviation="7" result="innerCorona" />
              <feMerge>
                <feMergeNode in="ambientGlow" />
                <feMergeNode in="innerCorona" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Broad Radiant Corona Arc */}
          <path
            d="M 100,-20 A 340,340 0 0,1 100,620"
            fill="none"
            stroke="#F5B800"
            strokeWidth="32"
            opacity="0.35"
            filter="url(#true-corona-glow)"
          />

          {/* Intense Golden Corona Flame */}
          <path
            d="M 100,-20 A 340,340 0 0,1 100,620"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="14"
            opacity="0.85"
            filter="url(#true-corona-glow)"
          />

          {/* Razor-Sharp Incandescent Solar Rim Core */}
          <path
            d="M 100,-20 A 340,340 0 0,1 100,620"
            fill="none"
            stroke="url(#true-eclipse-rim)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Occluding Dark Celestial Body (The Moon) */}
          <path
            d="M 0,-20 L 100,-20 A 340,340 0 0,1 100,620 L 0,620 Z"
            fill="#08080A"
          />
        </svg>

        {/* Layer 3: "ads." Typography in Antique Brushed Gold */}
        <h2
          className="act1-ads-word relative z-10 font-sans text-[clamp(4.5rem,8.6vw,9.5rem)] font-black tracking-[-0.04em] leading-none drop-shadow-[0_14px_45px_rgba(0,0,0,0.98)]"
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

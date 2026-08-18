import React from 'react';

export const Act1ArchitecturalColumns: React.FC = () => {
  return (
    <div className="act1-stage act1-columns-variant absolute inset-0 z-20 w-screen h-screen grid grid-cols-4 overflow-hidden pointer-events-none select-none bg-[#08080A]">
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
        {/* Top 54%: "run" with Pure Procedural 3D Architectural Beveled Perspective Floor */}
        <div className="act1-run-panel relative h-[54%] bg-[#F2EFEB] flex flex-col items-center justify-between pt-[10vh] overflow-hidden border-b border-black/15">
          <h2 className="act1-run-word relative z-10 font-sans text-[clamp(4rem,7.5vw,7.8rem)] font-black text-[#0A0A0A] tracking-[-0.05em] leading-none">
            run
          </h2>

          {/* 100% Pure Mathematical 3D Beveled Perspective Floor Beams */}
          <div className="relative w-full h-[60%] mt-auto">
            <svg
              className="w-full h-full block"
              viewBox="0 0 400 260"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="code-plank-surface" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F5F3EF" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#D5D0C6" stopOpacity="1" />
                </linearGradient>

                <linearGradient id="code-rib-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#D8D4CA" />
                </linearGradient>

                <linearGradient id="code-rib-shadow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7E7A72" />
                  <stop offset="100%" stopColor="#ABA59A" />
                </linearGradient>
              </defs>

              <g className="opacity-95">
                {/* Beam 1 */}
                <polygon points="198,8 202,8 -25,260 -10,260" fill="url(#code-plank-surface)" />
                <line x1="198" y1="8" x2="-25" y2="260" stroke="url(#code-rib-highlight)" strokeWidth="2" />
                <line x1="202" y1="8" x2="-10" y2="260" stroke="url(#code-rib-shadow)" strokeWidth="2.5" />

                {/* Beam 2 */}
                <polygon points="199,8 201,8 30,260 45,260" fill="url(#code-plank-surface)" />
                <line x1="199" y1="8" x2="30" y2="260" stroke="url(#code-rib-highlight)" strokeWidth="2" />
                <line x1="201" y1="8" x2="45" y2="260" stroke="url(#code-rib-shadow)" strokeWidth="2.5" />

                {/* Beam 3 */}
                <polygon points="199.5,8 200.5,8 85,260 100,260" fill="url(#code-plank-surface)" />
                <line x1="199.5" y1="8" x2="85" y2="260" stroke="url(#code-rib-highlight)" strokeWidth="2" />
                <line x1="200.5" y1="8" x2="100" y2="260" stroke="url(#code-rib-shadow)" strokeWidth="2.5" />

                {/* Beam 4 */}
                <polygon points="200,8 200.5,8 140,260 155,260" fill="url(#code-plank-surface)" />
                <line x1="200" y1="8" x2="140" y2="260" stroke="url(#code-rib-highlight)" strokeWidth="2" />
                <line x1="200.5" y1="8" x2="155" y2="260" stroke="url(#code-rib-shadow)" strokeWidth="2" />

                {/* Center Meridian Beam 5 */}
                <polygon points="200,8 200.5,8 195,260 205,260" fill="url(#code-plank-surface)" />
                <line x1="200" y1="8" x2="195" y2="260" stroke="url(#code-rib-highlight)" strokeWidth="2" />
                <line x1="200.5" y1="8" x2="205" y2="260" stroke="url(#code-rib-shadow)" strokeWidth="2" />

                {/* Beam 6 */}
                <polygon points="200,8 200.5,8 245,260 260,260" fill="url(#code-plank-surface)" />
                <line x1="200" y1="8" x2="245" y2="260" stroke="url(#code-rib-highlight)" strokeWidth="2" />
                <line x1="200.5" y1="8" x2="260" y2="260" stroke="url(#code-rib-shadow)" strokeWidth="2" />

                {/* Beam 7 */}
                <polygon points="200,8 201,8 300,260 315,260" fill="url(#code-plank-surface)" />
                <line x1="200" y1="8" x2="300" y2="260" stroke="url(#code-rib-highlight)" strokeWidth="2" />
                <line x1="201" y1="8" x2="315" y2="260" stroke="url(#code-rib-shadow)" strokeWidth="2.5" />

                {/* Beam 8 */}
                <polygon points="200,8 202,8 355,260 370,260" fill="url(#code-plank-surface)" />
                <line x1="200" y1="8" x2="355" y2="260" stroke="url(#code-rib-highlight)" strokeWidth="2" />
                <line x1="202" y1="8" x2="370" y2="260" stroke="url(#code-rib-shadow)" strokeWidth="2.5" />

                {/* Beam 9 */}
                <polygon points="200,8 202,8 410,260 425,260" fill="url(#code-plank-surface)" />
                <line x1="200" y1="8" x2="410" y2="260" stroke="url(#code-rib-highlight)" strokeWidth="2" />
                <line x1="202" y1="8" x2="425" y2="260" stroke="url(#code-rib-shadow)" strokeWidth="2.5" />
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
      {/* COLUMN 4: "ads." (100% Pure Code Solar Eclipse & Physical Refraction)  */}
      {/* ===================================================================== */}
      <div className="act1-col-4 relative h-full bg-[#08080A] flex items-center justify-center overflow-hidden">
        {/* Layer 1: Ambient Rayleigh Atmospheric Scattering (Warm Golden Corona Glow) */}
        <div
          className="absolute -right-[12vw] w-[38vw] h-[95vh] rounded-full pointer-events-none blur-3xl opacity-90"
          style={{
            background: 'radial-gradient(ellipse at 80% 50%, rgba(245, 184, 0, 0.48) 0%, rgba(212, 175, 55, 0.22) 40%, rgba(138, 98, 20, 0.08) 65%, transparent 80%)',
          }}
        />

        {/* Layer 2: Secondary Golden Rim Diffuse Bloom */}
        <div
          className="absolute -right-[6vw] w-[30vw] h-[85vh] rounded-full pointer-events-none blur-2xl opacity-80"
          style={{
            background: 'radial-gradient(ellipse at 85% 50%, rgba(255, 235, 160, 0.6) 0%, rgba(230, 170, 30, 0.3) 35%, transparent 70%)',
          }}
        />

        {/* Layer 3: The Solar Corona Eclipse Physics (Pure Mathematical SVG) */}
        <svg
          className="act1-gold-eclipse absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 300 600"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Incandescent Core Rim Gradient */}
            <linearGradient id="code-eclipse-rim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2B2" />
              <stop offset="20%" stopColor="#F9E28A" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="80%" stopColor="#E5B242" />
              <stop offset="100%" stopColor="#A6761A" />
            </linearGradient>

            {/* Gaussian Corona Dispersion Filter */}
            <filter id="code-corona-bloom" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="16" result="outerBlur" />
              <feGaussianBlur stdDeviation="5" result="innerBlur" />
              <feMerge>
                <feMergeNode in="outerBlur" />
                <feMergeNode in="innerBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Atmospheric Corona Radiance Arc */}
          <path
            d="M 235,-20 Q 295,300 235,620"
            fill="none"
            stroke="#F5B800"
            strokeWidth="24"
            opacity="0.35"
            filter="url(#code-corona-bloom)"
          />

          {/* Mid Corona Warm Gold Arc */}
          <path
            d="M 235,-20 Q 295,300 235,620"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="10"
            opacity="0.75"
            filter="url(#code-corona-bloom)"
          />

          {/* Razor-Sharp Incandescent Solar Rim (Pure Light Refraction Core) */}
          <path
            d="M 235,-20 Q 295,300 235,620"
            fill="none"
            stroke="url(#code-eclipse-rim)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Layer 4: "ads." in 100% Pure Code Brushed Liquid Gold Gradient */}
        <h2
          className="act1-ads-word relative z-10 font-sans text-[clamp(4.5rem,8.6vw,9.5rem)] font-black tracking-[-0.04em] leading-none drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)]"
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

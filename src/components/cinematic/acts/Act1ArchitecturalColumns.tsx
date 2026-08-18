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
        {/* Top 54%: "run" with Non-Converging Atmospheric Horizon Runway */}
        <div className="act1-run-panel relative h-[54%] bg-[#F3F0EC] flex flex-col items-center justify-between pt-[7vh] overflow-hidden border-b border-black/15">
          {/* Extended Bold Modern Display Sans "run" */}
          <h2 className="act1-run-word relative z-10 font-sans text-[clamp(4.2rem,8vw,8.5rem)] font-black text-[#0A0A0A] tracking-[-0.04em] leading-none">
            run
          </h2>

          {/* Architectural Ground Perspective Tracks with Open Horizon & Atmospheric Depth Blur */}
          <div className="relative w-full h-[68%] mt-auto overflow-hidden">
            <svg
              className="w-full h-full block"
              viewBox="0 0 400 280"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Atmospheric Fog Mask — Lines smoothly dissolve into blur before ever converging */}
                <mask id="runway-fog-mask">
                  <linearGradient id="fog-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#000000" stopOpacity="0" />
                    <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.25" />
                    <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                  </linearGradient>
                  <rect x="0" y="0" width="400" height="280" fill="url(#fog-grad)" />
                </mask>

                {/* Soft Horizon Depth Blur Filter */}
                <filter id="horizon-haze" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" />
                </filter>

                {/* Shading Gradients for Metallic Tracks */}
                <linearGradient id="track-surface" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ECE8E0" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#DDD8CD" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#CCC6B8" stopOpacity="1" />
                </linearGradient>

                <linearGradient id="rail-highlight" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                </linearGradient>

                <linearGradient id="rail-shadow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#A8A399" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#8C867B" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#6E685E" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Distant Atmospheric Horizon Floor Shading */}
              <rect x="0" y="0" width="400" height="280" fill="#F0EDE7" />

              {/* Group of Non-Converging 3D Tracks masked with atmospheric depth dissolve */}
              <g mask="url(#runway-fog-mask)">
                {/* Track -5 */}
                <polygon points="120,40 128,40 -65,280 -45,280" fill="url(#track-surface)" />
                <line x1="120" y1="40" x2="-65" y2="280" stroke="url(#rail-highlight)" strokeWidth="1.8" />
                <line x1="128" y1="40" x2="-45" y2="280" stroke="url(#rail-shadow)" strokeWidth="2.2" />

                {/* Track -4 */}
                <polygon points="138,40 145,40 -5,280 15,280" fill="url(#track-surface)" />
                <line x1="138" y1="40" x2="-5" y2="280" stroke="url(#rail-highlight)" strokeWidth="1.8" />
                <line x1="145" y1="40" x2="15" y2="280" stroke="url(#rail-shadow)" strokeWidth="2.2" />

                {/* Track -3 */}
                <polygon points="154,40 160,40 55,280 73,280" fill="url(#track-surface)" />
                <line x1="154" y1="40" x2="55" y2="280" stroke="url(#rail-highlight)" strokeWidth="1.6" />
                <line x1="160" y1="40" x2="73" y2="280" stroke="url(#rail-shadow)" strokeWidth="2.0" />

                {/* Track -2 */}
                <polygon points="170,40 175,40 115,280 130,280" fill="url(#track-surface)" />
                <line x1="170" y1="40" x2="115" y2="280" stroke="url(#rail-highlight)" strokeWidth="1.5" />
                <line x1="175" y1="40" x2="130" y2="280" stroke="url(#rail-shadow)" strokeWidth="1.8" />

                {/* Track -1 */}
                <polygon points="185,40 189,40 168,280 180,280" fill="url(#track-surface)" />
                <line x1="185" y1="40" x2="168" y2="280" stroke="url(#rail-highlight)" strokeWidth="1.4" />
                <line x1="189" y1="40" x2="180" y2="280" stroke="url(#rail-shadow)" strokeWidth="1.6" />

                {/* Center Track 0 */}
                <polygon points="198,40 202,40 194,280 206,280" fill="url(#track-surface)" />
                <line x1="198" y1="40" x2="194" y2="280" stroke="url(#rail-highlight)" strokeWidth="1.4" />
                <line x1="202" y1="40" x2="206" y2="280" stroke="url(#rail-shadow)" strokeWidth="1.6" />

                {/* Track +1 */}
                <polygon points="211,40 215,40 220,280 232,280" fill="url(#track-surface)" />
                <line x1="211" y1="40" x2="220" y2="280" stroke="url(#rail-highlight)" strokeWidth="1.4" />
                <line x1="215" y1="40" x2="232" y2="280" stroke="url(#rail-shadow)" strokeWidth="1.6" />

                {/* Track +2 */}
                <polygon points="225,40 230,40 270,280 285,280" fill="url(#track-surface)" />
                <line x1="225" y1="40" x2="270" y2="280" stroke="url(#rail-highlight)" strokeWidth="1.5" />
                <line x1="230" y1="40" x2="285" y2="280" stroke="url(#rail-shadow)" strokeWidth="1.8" />

                {/* Track +3 */}
                <polygon points="240,40 246,40 327,280 345,280" fill="url(#track-surface)" />
                <line x1="240" y1="40" x2="327" y2="280" stroke="url(#rail-highlight)" strokeWidth="1.6" />
                <line x1="246" y1="40" x2="345" y2="280" stroke="url(#rail-shadow)" strokeWidth="2.0" />

                {/* Track +4 */}
                <polygon points="255,40 262,40 385,280 405,280" fill="url(#track-surface)" />
                <line x1="255" y1="40" x2="385" y2="280" stroke="url(#rail-highlight)" strokeWidth="1.8" />
                <line x1="262" y1="40" x2="405" y2="280" stroke="url(#rail-shadow)" strokeWidth="2.2" />

                {/* Track +5 */}
                <polygon points="272,40 280,40 445,280 465,280" fill="url(#track-surface)" />
                <line x1="272" y1="40" x2="445" y2="280" stroke="url(#rail-highlight)" strokeWidth="1.8" />
                <line x1="280" y1="40" x2="465" y2="280" stroke="url(#rail-shadow)" strokeWidth="2.2" />
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

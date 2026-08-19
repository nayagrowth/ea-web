import React from 'react';
import './act1Enhanced.css';

export const Act1ArchitecturalColumns: React.FC = () => {
  return (
    <section className="act1-stage act1-columns-variant absolute inset-0 z-10 w-screen h-screen overflow-hidden pointer-events-none select-none">
      {/* ===================================================================== */}
      {/* MASTER 100VW / 100VH FULL-BLEED GRID (Zero Side Pillars / Full Viewport)*/}
      {/* ===================================================================== */}
      <div className="act1-artboard relative h-full w-full w-screen h-screen grid grid-cols-[24.5%_24.5%_24.5%_26.5%] overflow-hidden">
        {/* =================================================================== */}
        {/* PANEL 1: "Most" (Solid Gallery Porcelain Plane)                     */}
        {/* =================================================================== */}
        <div className="act1-col-1 act1-panel-wrap relative h-full flex flex-col items-center justify-start pt-[50vh] border-r border-black/[0.08] overflow-hidden">
          <div className="act1-col-bg act1-col-bg-1 absolute inset-0 bg-[#ecebe8]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#f2f1ee] via-[#ecebe8] to-[#e6e5e0] opacity-60 pointer-events-none" />
          </div>

          <div className="most-pointer-rig relative z-10">
            <h1 className="act1-most-word font-serif text-[clamp(4.6rem,8.6vw,9.8rem)] font-normal text-[#0c0c0d] tracking-[-0.04em] leading-none select-none flex items-center">
              <span className="act1-most-char act1-most-char-1 inline-block">M</span>
              <span className="act1-most-char act1-most-char-2 inline-block">o</span>
              <span className="act1-most-char act1-most-char-3 inline-block">s</span>
              <span className="act1-most-char act1-most-char-4 inline-block">t</span>
            </h1>
          </div>
        </div>

        {/* =================================================================== */}
        {/* PANEL 2: "agencies" (Matte Charcoal + Multi-Char Kinetic Sans + Axis)*/}
        {/* =================================================================== */}
        <div className="act1-col-2 act1-panel-wrap relative h-full flex flex-col items-center justify-start pt-[21vh] border-r border-white/[0.06] overflow-hidden">
          <div className="act1-col-bg act1-col-bg-2 absolute inset-0 bg-[#0b0c0d]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#111214] via-[#0b0c0d] to-[#080809] opacity-80 pointer-events-none" />
          </div>

          <div className="agencies-pointer-rig relative z-10 flex flex-col items-center">
            {/* Multi-Character Kinetic Typography */}
            <h2 className="act1-agencies-word font-sans text-[clamp(2.6rem,4.6vw,5.2rem)] font-extralight text-[#FFFFFF] tracking-[-0.03em] leading-none flex items-center justify-center">
              <span className="act1-agency-char act1-agency-char-1">a</span>
              <span className="act1-agency-char act1-agency-char-2">g</span>
              <span className="act1-agency-char act1-agency-char-3">e</span>
              <span className="act1-agency-char act1-agency-char-4">n</span>
              <span className="act1-agency-char act1-agency-char-5">c</span>
              <span className="act1-agency-char act1-agency-char-6">i</span>
              <span className="act1-agency-char act1-agency-char-7">e</span>
              <span className="act1-agency-char act1-agency-char-8">s</span>
            </h2>

            {/* Compositional Axis / Plumb-Line Gesture with Travelling Highlight */}
            <div className="act1-col2-axis relative w-[1.5px] bg-gradient-to-b from-white/45 via-white/20 to-transparent h-[52vh] mt-7 z-10 overflow-hidden">
              <div className="act1-axis-pulse absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-transparent via-[#ecd08e] to-transparent opacity-0" />
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* PANEL 3: "run / your" (Sculpted Center Stack - Elevated in Front)   */}
        {/* =================================================================== */}
        <div className="act1-col-3 act1-panel-wrap relative z-20 h-full flex flex-col border-r border-white/[0.06] overflow-hidden shadow-[12px_0_35px_rgba(0,0,0,0.55)]">
          {/* Top 54%: "run" with Perspective Runway Geometry */}
          <div className="act1-run-panel relative h-[54%] flex flex-col items-center justify-between pt-[6.5vh] overflow-hidden border-b border-black/[0.12]">
            <div className="act1-col-bg act1-col-bg-3-top absolute inset-0 bg-[#f2efea]" />

            {/* Bold Assertive Modern Grotesk Sans */}
            <h2 className="act1-run-word relative z-10 font-sans text-[clamp(4.2rem,8.2vw,9.0rem)] font-black text-[#0c0c0d] tracking-[-0.045em] leading-none flex items-center justify-center">
              <span className="act1-run-char act1-run-char-1">r</span>
              <span className="act1-run-char act1-run-char-2">u</span>
              <span className="act1-run-char act1-run-char-3">n</span>
            </h2>

            {/* Runway Area in Act 1: Runway grooves with soft highlight lines and energy rails */}
            <div className="act1-runway-wrap runway-story-rig relative w-full h-[65%] mt-auto overflow-hidden">
              <div className="runway-pointer-rig w-full h-full">
                <svg
                  className="w-full h-full block bg-transparent"
                  viewBox="0 0 400 280"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <mask id="act1-soft-runway-mask">
                      <linearGradient id="act1-soft-fog-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#000000" stopOpacity="0" />
                        <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.2" />
                        <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.75" />
                        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                      </linearGradient>
                      <rect x="0" y="0" width="400" height="280" fill="url(#act1-soft-fog-grad)" />
                    </mask>

                    <linearGradient id="act1-track-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ede9e2" stopOpacity="0.1" />
                      <stop offset="60%" stopColor="#ded9cf" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#cec8bd" stopOpacity="0.85" />
                    </linearGradient>

                    <linearGradient id="act1-highlight" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                      <stop offset="40%" stopColor="#ffffff" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
                    </linearGradient>

                    <linearGradient id="act1-shadow" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#b5afa5" stopOpacity="0" />
                      <stop offset="40%" stopColor="#9e978c" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#80796e" stopOpacity="0.7" />
                    </linearGradient>
                  </defs>

                  {/* Perspective Tracks */}
                  <g mask="url(#act1-soft-runway-mask)" opacity="0.9">
                    {/* Track -4 */}
                    <polygon className="act1-run-track" points="166,35 171,35 10,280 26,280" fill="url(#act1-track-fill)" />
                    <line className="act1-run-line" x1="166" y1="35" x2="10" y2="280" stroke="url(#act1-highlight)" strokeWidth="1.2" />
                    <line className="act1-run-line" x1="171" y1="35" x2="26" y2="280" stroke="url(#act1-shadow)" strokeWidth="1.6" />
                    <line className="act1-energy-rail act1-energy-rail-m4" x1="168" y1="35" x2="18" y2="280" stroke="#ecd08e" strokeWidth="2.2" strokeLinecap="round" opacity="0" />

                    {/* Track -3 */}
                    <polygon className="act1-run-track" points="175,35 179,35 62,280 77,280" fill="url(#act1-track-fill)" />
                    <line className="act1-run-line" x1="175" y1="35" x2="62" y2="280" stroke="url(#act1-highlight)" strokeWidth="1.2" />
                    <line className="act1-run-line" x1="179" y1="35" x2="77" y2="280" stroke="url(#act1-shadow)" strokeWidth="1.5" />
                    <line className="act1-energy-rail act1-energy-rail-m3" x1="177" y1="35" x2="69" y2="280" stroke="#ecd08e" strokeWidth="2.2" strokeLinecap="round" opacity="0" />

                    {/* Track -2 */}
                    <polygon className="act1-run-track" points="183,35 186,35 116,280 129,280" fill="url(#act1-track-fill)" />
                    <line className="act1-run-line" x1="183" y1="35" x2="116" y2="280" stroke="url(#act1-highlight)" strokeWidth="1.1" />
                    <line className="act1-run-line" x1="186" y1="35" x2="129" y2="280" stroke="url(#act1-shadow)" strokeWidth="1.4" />
                    <line className="act1-energy-rail act1-energy-rail-m2" x1="184.5" y1="35" x2="122.5" y2="280" stroke="#ecd08e" strokeWidth="2.0" strokeLinecap="round" opacity="0" />

                    {/* Track -1 */}
                    <polygon className="act1-run-track" points="191,35 194,35 168,280 179,280" fill="url(#act1-track-fill)" />
                    <line className="act1-run-line" x1="191" y1="35" x2="168" y2="280" stroke="url(#act1-highlight)" strokeWidth="1.0" />
                    <line className="act1-run-line" x1="194" y1="35" x2="179" y2="280" stroke="url(#act1-shadow)" strokeWidth="1.3" />
                    <line className="act1-energy-rail act1-energy-rail-m1" x1="192.5" y1="35" x2="173.5" y2="280" stroke="#ecd08e" strokeWidth="2.0" strokeLinecap="round" opacity="0" />

                    {/* Center Track 0 */}
                    <polygon className="act1-run-track" points="198.5,35 201.5,35 195,280 205,280" fill="url(#act1-track-fill)" />
                    <line className="act1-run-line" x1="198.5" y1="35" x2="195" y2="280" stroke="url(#act1-highlight)" strokeWidth="1.0" />
                    <line className="act1-run-line" x1="201.5" y1="25" x2="205" y2="280" stroke="url(#act1-shadow)" strokeWidth="1.3" />
                    <line className="act1-energy-rail act1-energy-rail-0" x1="200" y1="35" x2="200" y2="280" stroke="#ecd08e" strokeWidth="2.4" strokeLinecap="round" opacity="0" />

                    {/* Track +1 */}
                    <polygon className="act1-run-track" points="206,35 209,35 221,280 232,280" fill="url(#act1-track-fill)" />
                    <line className="act1-run-line" x1="206" y1="35" x2="221" y2="280" stroke="url(#act1-highlight)" strokeWidth="1.0" />
                    <line className="act1-run-line" x1="209" y1="35" x2="232" y2="280" stroke="url(#act1-shadow)" strokeWidth="1.3" />
                    <line className="act1-energy-rail act1-energy-rail-p1" x1="207.5" y1="35" x2="226.5" y2="280" stroke="#ecd08e" strokeWidth="2.0" strokeLinecap="round" opacity="0" />

                    {/* Track +2 */}
                    <polygon className="act1-run-track" points="214,35 217,35 271,280 284,280" fill="url(#act1-track-fill)" />
                    <line className="act1-run-line" x1="214" y1="35" x2="271" y2="280" stroke="url(#act1-highlight)" strokeWidth="1.1" />
                    <line className="act1-run-line" x1="217" y1="35" x2="284" y2="280" stroke="url(#act1-shadow)" strokeWidth="1.4" />
                    <line className="act1-energy-rail act1-energy-rail-p2" x1="215.5" y1="35" x2="277.5" y2="280" stroke="#ecd08e" strokeWidth="2.0" strokeLinecap="round" opacity="0" />

                    {/* Track +3 */}
                    <polygon className="act1-run-track" points="221,35 225,35 323,280 338,280" fill="url(#act1-track-fill)" />
                    <line className="act1-run-line" x1="221" y1="35" x2="323" y2="280" stroke="url(#act1-highlight)" strokeWidth="1.2" />
                    <line className="act1-run-line" x1="225" y1="35" x2="338" y2="280" stroke="url(#act1-shadow)" strokeWidth="1.5" />
                    <line className="act1-energy-rail act1-energy-rail-p3" x1="223" y1="35" x2="330.5" y2="280" stroke="#ecd08e" strokeWidth="2.2" strokeLinecap="round" opacity="0" />

                    {/* Track +4 */}
                    <polygon className="act1-run-track" points="229,35 234,35 374,280 390,280" fill="url(#act1-track-fill)" />
                    <line className="act1-run-line" x1="229" y1="35" x2="374" y2="280" stroke="url(#act1-highlight)" strokeWidth="1.2" />
                    <line className="act1-run-line" x1="234" y1="35" x2="390" y2="280" stroke="url(#act1-shadow)" strokeWidth="1.6" />
                    <line className="act1-energy-rail act1-energy-rail-p4" x1="231.5" y1="35" x2="382" y2="280" stroke="#ecd08e" strokeWidth="2.2" strokeLinecap="round" opacity="0" />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom 46%: "your." (Warm Editorial Paper Tone + Italic Serif + Dot) */}
          <div className="act1-your-panel relative h-[46%] flex flex-col items-center justify-center px-7 overflow-hidden">
            <div className="act1-col-bg act1-col-bg-3-bottom absolute inset-0 bg-[#e8e3d9]">
              <div className="absolute inset-0 bg-gradient-to-b from-[#eae5db] to-[#e4ded3] opacity-50 pointer-events-none" />
            </div>

            <div className="relative flex flex-col items-start w-full max-w-[280px]">
              <h2 className="act1-your-word font-serif italic text-[clamp(4.4rem,8.4vw,9.2rem)] font-normal text-[#0c0c0d] tracking-[-0.035em] leading-[0.88] select-none flex items-baseline">
                <span className="act1-your-char act1-your-char-1">y</span>
                <span className="act1-your-char act1-your-char-2">o</span>
                <span className="act1-your-char act1-your-char-3">u</span>
                <span className="act1-your-char act1-your-char-4">r</span>
              </h2>

              {/* Refined Signature Baseline Rule with Small Gold Dot */}
              <div className="act1-your-rule-wrap relative w-full flex items-center justify-end mt-1.5">
                <div className="act1-your-rule w-full h-[1px] bg-[#0c0c0d]/25 origin-right relative overflow-hidden">
                  <div className="act1-your-pulse absolute inset-0 bg-gradient-to-r from-transparent via-[#ecd08e] to-transparent opacity-0" />
                </div>
                <div className="relative flex items-center justify-center ml-2">
                  <div className="act1-gold-halo" />
                  <div
                    className="act1-your-dot act1-bridge-gold-dot w-3.5 h-3.5 rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.18)] shrink-0 z-20"
                    style={{
                      background: 'radial-gradient(circle at 35% 35%, #ecd08e 0%, #c79846 55%, #8b6228 100%)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* PANEL 4: "ads." (Recesses & Morphs into Semicircle behind Panel 3)   */}
        {/* =================================================================== */}
        <div className="act1-col-4 act1-panel-wrap relative z-10 h-full w-full flex items-center justify-center overflow-visible">
          <div
            className="act1-col-bg act1-col-bg-4 absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 50% 42%, #141414 0%, #0b0c0d 55%, #080809 100%)',
            }}
          />

          {/* Optical Rig Parent: GSAP animates this parent, preserving child optical transforms */}
          <div className="act1-eclipse-rig eclipse-story-rig absolute inset-0 pointer-events-none">
            <div className="eclipse-pointer-rig w-full h-full relative">
              {/* Layer z1: Broad Warm Corona Haze */}
              <div
                className="act1-eclipse-glow-wide absolute rounded-full pointer-events-none"
                style={{
                  width: '195%',
                  aspectRatio: '1',
                  left: '-105.5%',
                  top: '-3.1%',
                  background: '#b8873f',
                  transform: 'translate(2.5%, 1.8%) scale(1.018)',
                  filter: 'blur(34px)',
                  opacity: 0.28,
                }}
              />

              {/* Layer z2: Tight Brighter Corona Core */}
              <div
                className="act1-eclipse-glow-core absolute rounded-full pointer-events-none"
                style={{
                  width: '195%',
                  aspectRatio: '1',
                  left: '-105.5%',
                  top: '-3.1%',
                  background: '#efce8e',
                  transform: 'translate(1.1%, 0.7%) scale(1.007)',
                  filter: 'blur(9px)',
                  opacity: 0.68,
                }}
              />

              {/* Layer z3: Foreground Dark Occluding Disc */}
              <div
                className="act1-eclipse-disc absolute rounded-full pointer-events-none"
                style={{
                  width: '195%',
                  aspectRatio: '1',
                  left: '-105.5%',
                  top: '-3.1%',
                  background: 'radial-gradient(circle at 72% 42%, #111112 0%, #0b0c0d 48%, #080809 100%)',
                  boxShadow: '1px 0 0 rgba(247, 222, 170, 0.26), 3px 2px 6px rgba(235, 193, 113, 0.12)',
                }}
              />
            </div>
          </div>

          {/* Layer z4: "ads." Typography with Continuous Champagne Gold Shimmer */}
          <div
            className="act1-ads-word absolute z-10 flex items-baseline select-none"
            style={{
              left: '12%',
              top: '42.5%',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              fontSize: 'min(25vw, 12.2vh)',
              lineHeight: 0.9,
              fontWeight: 700,
              letterSpacing: '-0.055em',
            }}
          >
            <span className="act1-ads-text">
              ads
            </span>
            <span
              className="act1-ads-dot"
              style={{
                display: 'inline-block',
                width: '0.19em',
                height: '0.19em',
                marginLeft: '0.075em',
                borderRadius: '999px',
                transform: 'translateY(-0.03em)',
                background: 'radial-gradient(circle at 38% 35%, #fff2cc, #dfbd78 40%, #b98539 70%, #956928 100%)',
                boxShadow: '0 0 16px rgba(245, 194, 0, 0.6)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Floating Minimal Scroll Cue */}
      <div className="act1-scroll-cue absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 text-[11px] font-mono tracking-widest uppercase text-gray-400 bg-black/85 border border-white/10 px-5 py-2 rounded-full backdrop-blur-md shadow-2xl z-30 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-ping" />
        <span>Scroll to continue</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5B800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce ml-1">
          <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
        </svg>
      </div>
    </section>
  );
};

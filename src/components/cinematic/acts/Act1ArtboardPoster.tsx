import React from 'react';

export const Act1ArtboardPoster: React.FC = () => {
  return (
    <div className="act1-stage absolute inset-0 z-20 w-screen h-screen flex items-center justify-center pointer-events-none select-none bg-[#09090b] overflow-hidden">
      {/* Edge-to-Edge 1920x1080 Vector Typographic Stage */}
      <svg
        viewBox="0 0 1920 1080"
        className="w-full h-full block absolute inset-0"
        preserveAspectRatio="none"
      >
        <defs>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,900;1,900&family=Playfair+Display:ital,wght@1,400;1,700&family=Oswald:wght@700&display=swap');
            .font-most {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              font-weight: 900;
            }
            .font-agencies {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              font-weight: 900;
            }
            .font-run {
              font-family: 'Oswald', 'Impact', 'Arial Black', sans-serif;
              font-weight: 700;
            }
            .font-your {
              font-family: 'Playfair Display', 'Instrument Serif', Georgia, serif;
              font-style: italic;
            }
            .font-ads {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              font-weight: 900;
              font-style: italic;
            }
          `}</style>
        </defs>

        {/* ===================================================================== */}
        {/* ROW 1: "Most" + Continuous Hairline Rule (y: 0 to 260)                 */}
        {/* ===================================================================== */}
        <g className="act1-row-1">
          {/* "Most" */}
          <text
            x="40"
            y="225"
            className="act1-most-word font-most"
            fontSize="235"
            letterSpacing="-12"
            fill="#FFFFFF"
          >
            Most
          </text>
          {/* Hairline Rule */}
          <line
            x1="620"
            y1="140"
            x2="1880"
            y2="140"
            className="act1-top-rule"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="2"
          />
        </g>

        {/* ===================================================================== */}
        {/* ROW 2: "agencies" INVERTED WHITE SLAB (y: 260 to 640)                  */}
        {/* ===================================================================== */}
        <g className="act1-row-2">
          {/* White Slab Rectangle - Spans from x:40 to full right edge */}
          <rect
            x="40"
            y="260"
            width="1880"
            height="380"
            fill="#EBEBEB"
            className="act1-agencies-slab"
          />
          {/* Exact Full-Width "agencies" Typography */}
          <text
            x="980"
            y="575"
            textAnchor="middle"
            className="act1-agencies-word font-agencies"
            fontSize="360"
            letterSpacing="-24"
            lengthAdjust="spacingAndGlyphs"
            textLength="1820"
            fill="#000000"
          >
            agencies
          </text>
        </g>

        {/* ===================================================================== */}
        {/* ROW 3 - LEFT: "run" CONDENSED MONUMENTAL (x: 40, y: 640 to 1080)       */}
        {/* ===================================================================== */}
        <g className="act1-run-zone">
          <text
            x="40"
            y="1025"
            className="act1-run-word font-run"
            fontSize="450"
            letterSpacing="-6"
            lengthAdjust="spacingAndGlyphs"
            textLength="480"
            fill="#FFFFFF"
          >
            run
          </text>
        </g>

        {/* ===================================================================== */}
        {/* ROW 3 - CENTER: "your" DELICATE SERIF BETWEEN RULES (x: 560 to 1060) */}
        {/* ===================================================================== */}
        <g className="act1-your-zone">
          {/* Top Hairline */}
          <line
            x1="570"
            y1="730"
            x2="1030"
            y2="730"
            className="act1-your-rule-top"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="2"
          />
          {/* "your" */}
          <text
            x="800"
            y="885"
            textAnchor="middle"
            className="act1-your-word font-your"
            fontSize="180"
            fill="#FFFFFF"
          >
            your
          </text>
          {/* Bottom Hairline */}
          <line
            x1="570"
            y1="1010"
            x2="1030"
            y2="1010"
            className="act1-your-rule-bottom"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="2"
          />
        </g>

        {/* ===================================================================== */}
        {/* ROW 3 - RIGHT: "ads." CHARCOAL BOX (x: 1070, y: 640 to 1080, w: 850)  */}
        {/* ===================================================================== */}
        <g className="act1-ads-zone">
          {/* Charcoal Box — EXACTLY flush with the bottom of white slab (y: 640) */}
          <rect
            x="1070"
            y="640"
            width="850"
            height="440"
            fill="#343434"
            className="act1-ads-slab"
          />
          {/* Slanted Bold "ads." Typography */}
          <text
            x="1110"
            y="1015"
            className="act1-ads-word font-ads"
            fontSize="450"
            letterSpacing="-22"
            fill="#EBEBEB"
          >
            ads.
          </text>
        </g>
      </svg>

      {/* Floating Minimal Scroll Cue */}
      <div className="absolute bottom-6 flex items-center gap-2.5 text-[11px] font-mono tracking-widest uppercase text-gray-400 bg-black/85 border border-white/10 px-5 py-2 rounded-full backdrop-blur-md shadow-2xl z-30 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-ping" />
        <span>Scroll to continue</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5B800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce ml-1">
          <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
        </svg>
      </div>
    </div>
  );
};

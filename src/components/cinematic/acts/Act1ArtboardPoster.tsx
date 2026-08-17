import React, { useEffect, useState } from 'react';

export const Act1ArtboardPoster: React.FC = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      // Scale 1920x1080 artboard to fit screen proportionally
      const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      setScale(s);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="act1-stage absolute inset-0 z-20 w-full h-full flex items-center justify-center pointer-events-none select-none bg-black overflow-hidden">
      {/* 1920x1080 Fixed Editorial Artboard Canvas */}
      <div
        className="act1-artboard relative bg-[#000000] overflow-hidden"
        style={{
          width: 1920,
          height: 1080,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          flexShrink: 0,
        }}
      >
        {/* ===================================================================== */}
        {/* ROW 1: "Most" + Continuous Hairline Rule (x: 76, y: 50)               */}
        {/* ===================================================================== */}
        <div
          className="act1-most-zone absolute flex items-center"
          style={{ left: 76, top: 48, width: 1768, height: 180 }}
        >
          <div className="overflow-hidden">
            <span
              className="act1-most-word block font-black text-white"
              style={{
                fontSize: 210,
                lineHeight: 0.85,
                letterSpacing: '-0.065em',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: 900,
              }}
            >
              Most
            </span>
          </div>
          {/* Horizontal Hairline Rule */}
          <div
            className="act1-top-rule"
            style={{
              flex: 1,
              height: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.45)',
              marginLeft: 45,
              marginTop: 15,
            }}
          />
        </div>

        {/* ===================================================================== */}
        {/* ROW 2: "agencies" INVERTED WHITE SLAB (x: 72, y: 260, w: 1772, h: 365)*/}
        {/* ===================================================================== */}
        <div
          className="act1-agencies-slab absolute flex items-center justify-center bg-[#ECECEC]"
          style={{
            left: 72,
            top: 260,
            width: 1772,
            height: 365,
            zIndex: 2,
            overflow: 'hidden',
          }}
        >
          <svg
            viewBox="0 0 1772 365"
            width="1772"
            height="365"
            className="act1-agencies-word block"
            style={{ overflow: 'visible' }}
          >
            <text
              x="886"
              y="285"
              textAnchor="middle"
              fontSize="330"
              fontWeight="900"
              letterSpacing="-0.075em"
              lengthAdjust="spacingAndGlyphs"
              textLength="1730"
              fontFamily='Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              fill="#000000"
            >
              agencies
            </text>
          </svg>
        </div>

        {/* ===================================================================== */}
        {/* ROW 3 - LEFT: "run" CONDENSED TALL TYPOGRAPHY (x: 72, y: 645, h: 390) */}
        {/* ===================================================================== */}
        <div
          className="act1-run-zone absolute flex items-center overflow-hidden"
          style={{
            left: 72,
            top: 645,
            width: 490,
            height: 390,
            zIndex: 1,
          }}
        >
          <svg
            viewBox="0 0 490 390"
            width="490"
            height="390"
            className="act1-run-word block"
            style={{ overflow: 'visible' }}
          >
            <text
              x="245"
              y="325"
              textAnchor="middle"
              fontSize="370"
              fontWeight="900"
              transform="scale(0.85, 1.28) translate(40, -55)"
              letterSpacing="-0.05em"
              lengthAdjust="spacingAndGlyphs"
              textLength="470"
              fontFamily='Impact, "Arial Black", Inter, sans-serif'
              fill="#FFFFFF"
            >
              run
            </text>
          </svg>
        </div>

        {/* ===================================================================== */}
        {/* ROW 3 - CENTER: "your" DELICATE SERIF BETWEEN RULES (x: 590, y: 675)  */}
        {/* ===================================================================== */}
        <div
          className="act1-your-zone absolute flex flex-col items-center justify-center"
          style={{
            left: 590,
            top: 675,
            width: 440,
            height: 330,
            zIndex: 1,
          }}
        >
          <div
            className="act1-your-rule-top"
            style={{ width: '100%', height: 2, backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
          />
          <span
            className="act1-your-word block font-serif italic text-white"
            style={{
              fontSize: 135,
              lineHeight: 1.05,
              padding: '16px 0',
              fontFamily: '"Playfair Display", "Instrument Serif", Georgia, serif',
            }}
          >
            your
          </span>
          <div
            className="act1-your-rule-bottom"
            style={{ width: '100%', height: 2, backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
          />
        </div>

        {/* ===================================================================== */}
        {/* ROW 3 - RIGHT: "ads." CHARCOAL BOX OVERLAPPING SLAB (x: 1060, y: 615) */}
        {/* ===================================================================== */}
        <div
          className="act1-ads-slab absolute flex items-center justify-center bg-[#2B2B2B] border border-white/10"
          style={{
            left: 1060,
            top: 615, // Cuts 10px upward into the agencies slab!
            width: 784,
            height: 425,
            zIndex: 4,
            overflow: 'hidden',
          }}
        >
          <svg
            viewBox="0 0 784 425"
            width="784"
            height="425"
            className="act1-ads-word block"
            style={{ overflow: 'visible' }}
          >
            <text
              x="20"
              y="345"
              fontSize="390"
              fontWeight="900"
              fontStyle="italic"
              letterSpacing="-0.06em"
              fontFamily='Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              fill="#ECECEC"
            >
              ads.
            </text>
          </svg>
        </div>
      </div>

      {/* Floating Scroll Cue */}
      <div className="absolute bottom-6 flex items-center gap-2.5 text-[11px] font-mono tracking-widest uppercase text-gray-400 bg-black/85 border border-white/10 px-5 py-2 rounded-full backdrop-blur-md shadow-2xl z-30">
        <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-ping" />
        <span>Scroll to continue</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5B800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce ml-1">
          <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
        </svg>
      </div>
    </div>
  );
};

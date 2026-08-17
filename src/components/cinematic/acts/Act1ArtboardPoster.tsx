import React, { useEffect, useState } from 'react';

export const Act1ArtboardPoster: React.FC = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      // Fit 1920x1080 artboard proportionally inside viewport
      const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
      setScale(s);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="act1-stage absolute inset-0 z-20 w-full h-full flex items-center justify-center pointer-events-none select-none bg-black overflow-hidden">
      {/* Fixed 1920x1080 Motion Design Artboard */}
      <div
        className="act1-artboard relative bg-[#050505] overflow-hidden"
        style={{
          width: 1920,
          height: 1080,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          flexShrink: 0,
        }}
      >
        {/* ===================================================================== */}
        {/* ZONE 1: "Most" + Horizontal Hairline Rule (y: 45 to 240)               */}
        {/* ===================================================================== */}
        <div
          className="act1-most-zone absolute flex items-center justify-between"
          style={{ left: 70, top: 45, width: 1780, height: 190 }}
        >
          <div className="overflow-hidden">
            <span
              className="act1-most-word block font-black text-white"
              style={{
                fontSize: 195,
                lineHeight: 0.82,
                letterSpacing: '-0.06em',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            >
              Most
            </span>
          </div>
          {/* Crisp Horizontal Hairline Rule */}
          <div
            className="act1-top-rule"
            style={{
              flex: 1,
              height: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.45)',
              marginLeft: 50,
              marginTop: 15,
            }}
          />
        </div>

        {/* ===================================================================== */}
        {/* ZONE 2: "agencies" INVERTED WHITE SLAB (y: 255, h: 360, z-index: 2)   */}
        {/* ===================================================================== */}
        <div
          className="act1-agencies-slab absolute flex items-center justify-center bg-[#E8E8E8]"
          style={{
            left: 70,
            top: 255,
            width: 1780,
            height: 360,
            zIndex: 2,
            overflow: 'hidden',
          }}
        >
          <svg
            viewBox="0 0 1780 340"
            className="act1-agencies-word w-full h-full block"
            style={{ overflow: 'visible' }}
          >
            <text
              x="0"
              y="272"
              textLength="1780"
              lengthAdjust="spacingAndGlyphs"
              fontFamily='Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              fontWeight="900"
              letterSpacing="-0.07em"
              fill="#000000"
            >
              agencies
            </text>
          </svg>
        </div>

        {/* ===================================================================== */}
        {/* ZONE 3: "run" EXAGGERATED TALL TYPOGRAPHY (y: 635, z-index: 1)        */}
        {/* ===================================================================== */}
        <div
          className="act1-run-zone absolute flex items-center overflow-hidden"
          style={{
            left: 75,
            top: 635,
            width: 480,
            height: 400,
            zIndex: 1,
          }}
        >
          <svg
            viewBox="0 0 460 380"
            className="act1-run-word w-full h-full block"
            style={{ overflow: 'visible' }}
          >
            <text
              x="0"
              y="330"
              textLength="440"
              lengthAdjust="spacingAndGlyphs"
              fontFamily='Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              fontWeight="900"
              letterSpacing="-0.04em"
              fill="#FFFFFF"
              transform="scale(0.88, 1.28) translate(0, -60)"
            >
              run
            </text>
          </svg>
        </div>

        {/* ===================================================================== */}
        {/* ZONE 4: "your" DELICATE SERIF BETWEEN RULES (y: 675, z-index: 1)      */}
        {/* ===================================================================== */}
        <div
          className="act1-your-zone absolute flex flex-col items-center justify-center"
          style={{
            left: 580,
            top: 675,
            width: 430,
            height: 320,
            zIndex: 1,
          }}
        >
          <div
            className="act1-your-rule-top"
            style={{ width: '100%', height: 1.5, backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
          />
          <span
            className="act1-your-word block font-serif italic text-white"
            style={{
              fontSize: 118,
              lineHeight: 1.05,
              padding: '12px 0',
              fontFamily: '"Playfair Display", "Instrument Serif", Georgia, serif',
            }}
          >
            your
          </span>
          <div
            className="act1-your-rule-bottom"
            style={{ width: '100%', height: 1.5, backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
          />
        </div>

        {/* ===================================================================== */}
        {/* ZONE 5: "ads." CHARCOAL BOX (y: 615 -> Overlaps agencies at y: 615)   */}
        {/* ===================================================================== */}
        <div
          className="act1-ads-slab absolute flex items-center justify-center bg-[#2B2B2B] border border-white/10"
          style={{
            left: 1045,
            top: 615, // Physically cuts 5px upward into the white slab!
            width: 805,
            height: 420,
            zIndex: 4,
            overflow: 'hidden',
          }}
        >
          <svg
            viewBox="0 0 805 420"
            className="act1-ads-word w-full h-full block"
            style={{ overflow: 'visible' }}
          >
            <text
              x="-10"
              y="360"
              fontFamily='Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              fontStyle="italic"
              fontWeight="900"
              fontSize="370"
              letterSpacing="-0.06em"
              fill="#EAEAEA"
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

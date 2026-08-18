import React from 'react';

export const Act2VelocityPoster: React.FC = () => {
  return (
    <div className="act2-velocity-stage act2-stage absolute inset-0 z-20 w-screen h-screen w-full h-full pointer-events-none select-none overflow-hidden flex items-center justify-center">
      {/* ===================================================================== */}
      {/* CANONICAL 1672 x 941 3D ARTBOARD CONTAINER (Live Animatable DOM Type) */}
      {/* ===================================================================== */}
      <div
        className="act2-canonical-artboard relative w-full h-full max-w-[1672px] max-h-[941px] flex items-center justify-center overflow-hidden"
        style={{
          aspectRatio: '1672/941',
          perspective: '1350px',
          perspectiveOrigin: '85.3% 62.5%',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Layer z-4: Subtle Warm Radial Atmosphere behind typography */}
        <div className="act2-atmosphere absolute inset-0 bg-[radial-gradient(ellipse_at_35%_50%,rgba(236,208,142,0.06)_0%,transparent_60%)] pointer-events-none z-4" />

        {/* Layer z-20: DOM 3D Typography Plane (Live Animatable Words) */}
        <div
          className="act2-type-plane absolute inset-0 pointer-events-none select-none z-20"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* ----------------------------------------------------------------- */}
          {/* ROW 1: "We" (Heavy Sans) + "sell-out" (Champagne Serif)           */}
          {/* ----------------------------------------------------------------- */}
          {/* "We" */}
          <span
            className="
              act2-word-we absolute
              left-[14.2%] top-[13.8%]
              font-sans font-black text-white
              text-[clamp(5.4rem,11.2vw,12.8rem)]
              tracking-[-0.055em] leading-[0.80]
              drop-shadow-[0_16px_50px_rgba(0,0,0,0.95)]
            "
            style={{
              transform: 'rotateY(-8.0deg) rotateZ(-3.5deg) translateZ(35px)',
              transformOrigin: 'left center',
              willChange: 'transform, opacity',
            }}
          >
            We
          </span>

          {/* "sell-out" */}
          <span
            className="
              act2-word-sellout absolute
              left-[44.5%] top-[24.5%]
              font-serif italic font-normal
              text-[clamp(4.6rem,9.2vw,10.4rem)]
              leading-[0.88]
              flex items-center
              drop-shadow-[0_12px_40px_rgba(0,0,0,0.9)]
            "
            style={{
              transform: 'rotateY(-8.0deg) rotateZ(-3.2deg) translateZ(15px)',
              transformOrigin: 'left center',
              willChange: 'transform, opacity',
            }}
          >
            <span
              className="act2-word-sell"
              style={{
                background: 'linear-gradient(135deg, #fcebc2 0%, #ecd08e 45%, #c79846 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              sell
            </span>
            <span className="act2-morph-hyphen inline-block w-[0.38em] h-[4px] bg-gradient-to-r from-[#ecd08e] to-[#c79846] mx-[0.06em] align-middle rounded-full shadow-[0_0_14px_#ecd08e]" />
            <span
              className="act2-word-out"
              style={{
                background: 'linear-gradient(135deg, #fcebc2 0%, #ecd08e 45%, #c79846 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              out
            </span>
          </span>

          {/* ----------------------------------------------------------------- */}
          {/* ROW 2: "your" (Italic Serif) + "real estate" (Heavy Sans)         */}
          {/* ----------------------------------------------------------------- */}
          {/* "your" */}
          <span
            className="
              act2-word-your act2-your-dest absolute
              left-[13.0%] top-[41.5%]
              font-serif italic font-normal text-white
              text-[clamp(5.4rem,10.4vw,11.8rem)]
              leading-[0.85]
              drop-shadow-[0_16px_50px_rgba(0,0,0,0.95)]
            "
            style={{
              transform: 'rotateY(-7.5deg) rotateZ(-3.5deg) translateZ(25px)',
              transformOrigin: 'left center',
              willChange: 'transform, opacity',
            }}
          >
            your
          </span>

          {/* "real estate" */}
          <span
            className="
              act2-word-realestate absolute
              left-[42.5%] top-[42.5%]
              font-sans font-black text-white
              text-[clamp(5.2rem,10.2vw,11.4rem)]
              tracking-[-0.055em] leading-[0.82]
              whitespace-nowrap
              drop-shadow-[0_18px_60px_rgba(0,0,0,0.95)]
            "
            style={{
              transform: 'rotateY(-9.2deg) rotateZ(-3.5deg) translateZ(5px)',
              transformOrigin: 'left center',
              willChange: 'transform, opacity',
            }}
          >
            real estate
          </span>

          {/* ----------------------------------------------------------------- */}
          {/* ROW 3: "project" (Ultra-Light Sans) + Glossy Floor Reflection     */}
          {/* ----------------------------------------------------------------- */}
          {/* "project" */}
          <span
            className="
              act2-word-project absolute
              left-[42.8%] top-[60.5%]
              font-sans font-light text-white
              text-[clamp(5.0rem,9.6vw,10.8rem)]
              tracking-[-0.04em] leading-[0.84]
              drop-shadow-[0_12px_40px_rgba(0,0,0,0.9)]
            "
            style={{
              transform: 'rotateY(-9.2deg) rotateZ(-3.5deg) translateZ(-10px)',
              transformOrigin: 'left center',
              willChange: 'transform, opacity',
            }}
          >
            project
          </span>

          {/* Glossy Floor Reflection of "project" */}
          <span
            className="
              act2-word-project-reflect absolute
              left-[42.8%] top-[74.0%]
              font-sans font-light text-white/[0.12]
              text-[clamp(5.0rem,9.6vw,10.8rem)]
              tracking-[-0.04em] leading-[0.84]
              filter blur-[1.5px]
              pointer-events-none select-none
            "
            style={{
              transform: 'rotateY(-9.2deg) rotateZ(-3.5deg) scaleY(-0.55) translateZ(-15px)',
              transformOrigin: 'left top',
              maskImage: 'linear-gradient(to bottom, rgba(255,255,255,0.75) 0%, transparent 80%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(255,255,255,0.75) 0%, transparent 80%)',
            }}
          >
            project
          </span>
        </div>
      </div>
    </div>
  );
};

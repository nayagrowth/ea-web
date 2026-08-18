import React from 'react';

export const Act2VelocityPoster: React.FC = () => {
  return (
    <div className="act2-velocity-stage act2-stage absolute inset-0 z-20 w-full h-full pointer-events-none select-none overflow-hidden">
      {/* ===================================================================== */}
      {/* CANONICAL 1672 x 941 ARTBOARD CONTAINER (Exact 1:1 Reference Match)  */}
      {/* ===================================================================== */}
      <div className="act2-artboard-container absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div
          className="act2-canonical-artboard relative w-full h-full max-w-[1672px] max-h-[941px]"
          style={{ aspectRatio: '1672/941' }}
        >
          {/* Layer z-4: Subtle Radial Atmosphere behind typography */}
          <div className="act2-atmosphere absolute inset-0 bg-[radial-gradient(circle_at_35%_45%,rgba(236,208,142,0.08)_0%,transparent_65%)] pointer-events-none z-4" />

          {/* Layer z-20: DOM Typography Plane (Guaranteed above back rails) */}
          <div className="act2-type-plane absolute inset-0 pointer-events-none select-none z-20">
            {/* "We" (Heavy Modern Grotesk, Pure White, Upper-Left) */}
            <span
              className="
                act2-word-we absolute
                left-[14.0%] top-[11.2%]
                font-sans font-black text-white
                text-[clamp(4.6rem,9.6vw,10.8rem)]
                tracking-[-0.055em] leading-[0.82]
                drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)]
              "
            >
              We
            </span>

            {/* "sell-out" (High-Contrast Editorial Italic Serif, Champagne Bronze) */}
            <span
              className="
                act2-word-sellout absolute
                left-[44.2%] top-[22.6%]
                font-serif italic font-normal
                text-[#ecd08e]
                text-[clamp(4.0rem,7.8vw,8.8rem)]
                leading-none
                flex items-center
                drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]
              "
            >
              <span className="act2-word-sell">sell</span>
              <span className="act2-morph-hyphen inline-block w-[0.35em] h-[3px] bg-[#ecd08e] mx-[0.06em] align-middle rounded-full shadow-[0_0_12px_#ecd08e]" />
              <span className="act2-word-out">out</span>
            </span>

            {/* "your" (Luxury White Italic Serif, Middle-Left) */}
            <span
              className="
                act2-word-your act2-your-dest absolute
                left-[13.0%] top-[40.4%]
                font-serif italic font-normal text-white
                text-[clamp(4.8rem,9.0vw,10.2rem)]
                leading-none
                drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)]
              "
            >
              your
            </span>

            {/* "real estate" (Heavy Modern Grotesk, Pure White, Middle-Right) */}
            <span
              className="
                act2-word-realestate absolute
                left-[42.2%] top-[41.4%]
                font-sans font-black text-white
                text-[clamp(4.6rem,8.8vw,9.8rem)]
                tracking-[-0.055em] leading-[0.84]
                whitespace-nowrap
                drop-shadow-[0_14px_50px_rgba(0,0,0,0.95)]
              "
            >
              real estate
            </span>

            {/* "project" (Ultra-Light Architectural Sans, Clean Silver White, Lower-Right) */}
            <span
              className="
                act2-word-project absolute
                left-[42.4%] top-[59.2%]
                font-sans font-light text-white
                text-[clamp(4.6rem,8.4vw,9.4rem)]
                tracking-[-0.04em] leading-[0.84]
                drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]
              "
            >
              project
            </span>

            {/* Subtle Floor Reflection of "project" */}
            <span
              className="
                act2-word-project-reflect absolute
                left-[42.4%] top-[71.8%]
                font-sans font-light text-white/[0.08]
                text-[clamp(4.6rem,8.4vw,9.4rem)]
                tracking-[-0.04em] leading-[0.84]
                scale-y-[-0.6] filter blur-[2px]
                pointer-events-none select-none
              "
            >
              project
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

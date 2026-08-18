import React from 'react';
import { SharedPerspectiveField } from '../shared/SharedPerspectiveField';

export const Act2VelocityPoster: React.FC = () => {
  return (
    <div className="act2-velocity-stage act2-stage absolute inset-0 z-10 w-full h-full overflow-hidden bg-[#08090a] pointer-events-none select-none">
      {/* Background Atmosphere & Speed Field */}
      <SharedPerspectiveField />

      {/* Subtle Radial Atmosphere Behind Typography */}
      <div className="act2-atmosphere absolute inset-0 bg-[radial-gradient(circle_at_35%_45%,rgba(236,208,142,0.08)_0%,transparent_60%)] pointer-events-none" />

      {/* ===================================================================== */}
      {/* TYPOGRAPHY PLANE (Exact 1:1 Perspective Match to Reference Poster)   */}
      {/* ===================================================================== */}
      <div className="act2-type-plane absolute inset-0 pointer-events-none select-none">
        {/* "We" (Heavy Modern Grotesk, Pure White, Upper-Left) */}
        <span
          className="
            act2-word-we absolute
            left-[14.0%] top-[11.2%]
            font-sans font-black text-white
            text-[clamp(4.8rem,11.2vw,12.2rem)]
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
            text-[clamp(4.2rem,8.8vw,9.6rem)]
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
            text-[clamp(5.0rem,10.2vw,11.2rem)]
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
            text-[clamp(4.8rem,10.0vw,10.8rem)]
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
            text-[clamp(4.8rem,9.6vw,10.4rem)]
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
            left-[42.4%] top-[72.8%]
            font-sans font-light text-white/[0.07]
            text-[clamp(4.8rem,9.6vw,10.4rem)]
            tracking-[-0.04em] leading-[0.84]
            scale-y-[-0.6] filter blur-[2px]
            pointer-events-none select-none
          "
        >
          project
        </span>
      </div>
    </div>
  );
};

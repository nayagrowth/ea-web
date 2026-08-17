import React from 'react';

export const QuoteBanner: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#FFFDF5] via-[#FEF9C3]/40 to-[#FFFDF5] border border-[#FEF08A] rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xs relative select-none overflow-hidden group">
      {/* Decorative background ambient tint */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#FDE047]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center justify-center max-w-4xl mx-auto px-2">
        {/* Top Left Quote Mark */}
        <span className="text-[#F5B800] text-[36px] sm:text-[46px] font-serif leading-none -mb-3 sm:-mb-4 opacity-80" aria-hidden="true">
          &ldquo;
        </span>

        {/* 2 High-Impact Punchlines */}
        <div className="flex flex-col gap-1 sm:gap-1.5 my-1">
          <h3 className="font-extrabold text-[17px] sm:text-[22px] lg:text-[25px] text-[#0F172A] tracking-tight leading-snug">
            An enquiry is not the finish line. It’s the starting point.
          </h3>
          <p className="font-extrabold text-[17px] sm:text-[22px] lg:text-[25px] text-[#D97706] tracking-tight leading-snug">
            An enquiry is interest &mdash; not intent.
          </p>
        </div>

        {/* Bottom Right Quote Mark */}
        <span className="text-[#F5B800] text-[36px] sm:text-[46px] font-serif leading-none -mt-3 sm:-mt-4 opacity-80" aria-hidden="true">
          &rdquo;
        </span>
      </div>
    </div>
  );
};

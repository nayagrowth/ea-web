import React from 'react';

export const Act4Credibility: React.FC = () => {
  return (
    <div className="act4-stage absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none select-none">
      <div className="max-w-4xl flex flex-col items-center justify-center gap-5">
        {/* Minimalist Champagne Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/15 text-gray-300 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          100% On-Schedule Execution
        </div>

        {/* Crisp Monumental Counter without Gaudy Glow */}
        <div className="flex flex-col items-center justify-center">
          <span className="act4-metric-val text-[clamp(5.5rem,15vw,11.5rem)] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-[#F5B800] to-[#D97706] leading-none tracking-[-0.04em] drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)]">
            459+
          </span>
          <h3 className="act4-headline text-[clamp(1.8rem,3.8vw,3.4rem)] font-black text-white tracking-tight leading-tight mt-3">
            Real Estate Projects Delivered On Schedule
          </h3>
        </div>

        <p className="text-gray-400 text-[clamp(1rem,1.4vw,1.25rem)] max-w-xl mx-auto leading-relaxed">
          Zero Delays. Zero Junk Enquiries. <span className="text-white font-bold">100% Mandate Velocity.</span>
        </p>

        {/* High-End Clean Gold CTA Button */}
        <div className="pt-3 pointer-events-auto">
          <a
            href="#book-strategy-session"
            className="inline-flex items-center gap-3 bg-[#F5B800] hover:bg-[#E5AB00] text-gray-950 font-black text-sm sm:text-base px-8 py-4 rounded-2xl transition-all shadow-[0_0_30px_rgba(245,184,0,0.35)] active:scale-95"
          >
            <span>Book Your Project Sell-Out Strategy Session</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="19 12 12 19 5 12" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

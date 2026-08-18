import React from 'react';

export const Act4TriPanel: React.FC = () => {
  return (
    <div className="act4-tri-stage absolute inset-0 z-20 w-full h-full flex items-center justify-center pointer-events-none select-none overflow-hidden font-qurova">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
        {/* PANEL 1: PHASE 01 — POSITIONING */}
        <div
          className="act4-panel-1 relative h-full flex flex-col justify-end p-8 sm:p-10 lg:p-14 overflow-hidden bg-black"
          style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
        >
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="/pune_commercial.jpg"
              alt="Pune Commercial Architecture"
              className="act4-img-1 w-full h-full object-cover filter brightness-[0.72] contrast-125"
              style={{ willChange: 'transform', transform: 'translateZ(0)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
          </div>

          <div className="relative z-10 flex flex-col items-start gap-2.5">
            <span className="font-agency font-bold text-[13px] text-[#F5C200] tracking-widest uppercase">
              Phase 01
            </span>
            <h3 className="text-[clamp(1.8rem,3vw,2.6rem)] font-bold text-white tracking-tight leading-tight">
              Positioning Blueprint
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-sm">
              Audience architecture &amp; high-intent buyer qualification. <span className="text-white font-semibold">Zero wasted ad spends.</span>
            </p>
          </div>
        </div>

        {/* PANEL 2: PHASE 02 — PRE-SALES */}
        <div
          className="act4-panel-2 relative h-full flex flex-col justify-end p-8 sm:p-10 lg:p-14 overflow-hidden bg-black"
          style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
        >
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="/pune_residential.jpg"
              alt="Pune Luxury Residential Tower"
              className="act4-img-2 w-full h-full object-cover filter brightness-[0.72] contrast-125"
              style={{ willChange: 'transform', transform: 'translateZ(0)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
          </div>

          <div className="relative z-10 flex flex-col items-start gap-2.5">
            <span className="font-agency font-bold text-[13px] text-[#F5C200] tracking-widest uppercase">
              Phase 02 &bull; Pre-Sales
            </span>
            <h3 className="text-[clamp(1.8rem,3vw,2.6rem)] font-bold text-white tracking-tight leading-tight">
              Pre-Sales Trust Engine
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-sm">
              Creating undeniable market conviction before open sales. <span className="text-[#F5C200] font-bold">+4.2x Absorption Velocity.</span>
            </p>
          </div>
        </div>

        {/* PANEL 3: PHASE 03 — SELL-OUT */}
        <div
          className="act4-panel-3 relative h-full flex flex-col justify-end p-8 sm:p-10 lg:p-14 overflow-hidden bg-black"
          style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
        >
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="/pune_township.jpg"
              alt="Pune Master-Planned Township"
              className="act4-img-3 w-full h-full object-cover filter brightness-[0.72] contrast-125"
              style={{ willChange: 'transform', transform: 'translateZ(0)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
          </div>

          <div className="relative z-10 flex flex-col items-start gap-2.5">
            <span className="font-agency font-bold text-[13px] text-emerald-400 tracking-widest uppercase">
              Phase 03
            </span>
            <h3 className="text-[clamp(1.8rem,3vw,2.6rem)] font-bold text-white tracking-tight leading-tight">
              100% Sold Out On-Schedule
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-sm">
              Full inventory absorption executed strictly within your mandate timeline. <span className="text-emerald-400 font-semibold">Zero Delays.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

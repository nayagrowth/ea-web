import React from 'react';
import './act3Timeline.css';
import { Act3SimulationCanvas } from './Act3SimulationCanvas';

export const Act3Timeline: React.FC = () => {
  return (
    <div className="act3-stage absolute inset-0 z-20 w-full h-full flex flex-col justify-center items-center pointer-events-none select-none overflow-hidden bg-[#040507]">
      
      {/* Cinematic Perspective Time-Velocity Particle Warp Simulation */}
      <Act3SimulationCanvas />

      {/* Atmospheric Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#040507]/50 to-[#040507] pointer-events-none z-0" />
      <div
        className="absolute w-[650px] h-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[100px] pointer-events-none z-0"
        style={{
          left: '75%',
          top: '60%',
          background: 'radial-gradient(ellipse at center, rgba(245, 194, 0, 0.22) 0%, transparent 70%)',
        }}
      />

      {/* Main Canonical Responsive Poster Layout (Direct Asymmetric Continuity with Acts 1 & 2) */}
      <div className="act3-poster-frame relative w-full max-w-[1480px] h-[84vh] max-h-[860px] px-8 sm:px-14 md:px-20 flex flex-col justify-between z-10 py-4 md:py-6">
        
        {/* ROW 1: "Within your" (Left Serif Italic) */}
        <div className="act3-row-1 w-full flex items-baseline justify-start pt-2 pb-1">
          <div className="act3-mask-wrap overflow-visible">
            <h2 className="act3-word-withinyour font-serif italic font-normal text-[clamp(4.2rem,10.2vw,11.2rem)] text-[#f4f4f2] tracking-[-0.035em] leading-[1.05] pl-1 drop-shadow-[0_16px_60px_rgba(0,0,0,0.95)]">
              Within your
            </h2>
          </div>
        </div>

        {/* ROW 2: "PLANNED" (Right Monumental Sans) */}
        <div className="act3-row-2 w-full flex items-baseline justify-end py-2">
          <div className="act3-mask-wrap overflow-visible">
            <h2 className="act3-word-planned font-sans font-black uppercase text-[clamp(4.4rem,10.6vw,11.6rem)] text-[#f4f4f2] tracking-[-0.04em] leading-[1.0] pr-2 drop-shadow-[0_20px_80px_rgba(0,0,0,0.98)]">
              planned
            </h2>
          </div>
        </div>

        {/* ROW 3: "timeline." (Right Gold Shimmer Serif Italic + Horizontal Laser Axis) */}
        <div className="act3-row-3 w-full flex flex-col items-end justify-start pt-1 pb-4 pr-4">
          <div className="act3-mask-wrap overflow-visible">
            <h2 className="act3-word-timeline act3-gold-shimmer font-serif italic font-normal text-[clamp(4.2rem,10.2vw,11.2rem)] text-[#F5C200] tracking-[-0.035em] leading-[1.05] pb-2 drop-shadow-[0_20px_80px_rgba(245,194,0,0.4)] select-none">
              timeline<span className="text-[#F5C200]">.</span>
            </h2>
          </div>

          {/* Minimalist Champagne Gold Horizon Beam */}
          <div className="act3-horizon-wrap relative w-full max-w-2xl h-[2.5px] mt-1 rounded-full overflow-hidden">
            <div className="act3-laser-bar act3-laser-pulse absolute inset-0 bg-gradient-to-r from-transparent via-[#F5C200] via-60% to-[#FFF2CC] shadow-[0_0_20px_rgba(245,194,0,0.85)]" />
          </div>

          {/* Subtle Reflective Ground Echo */}
          <div className="act3-timeline-reflection-wrap act3-mask-wrap mt-1 opacity-20 scale-y-[-0.5] origin-top filter blur-[0.5px] pointer-events-none select-none">
            <h2 className="act3-word-timeline-reflection font-serif italic font-normal text-[clamp(4.2rem,10.2vw,11.2rem)] text-[#F5C200] tracking-[-0.035em] leading-[1.05]">
              timeline<span className="text-[#F5C200]">.</span>
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
};

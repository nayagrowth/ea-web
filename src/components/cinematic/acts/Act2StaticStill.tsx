import React from 'react';

export const Act2StaticStill: React.FC = () => {
  return (
    <div className="act2-static-still relative w-screen h-screen w-full h-full flex items-center justify-center bg-[#08090a] overflow-hidden select-none">
      {/* ===================================================================== */}
      {/* 100VW x 100VH FULL-BLEED 3D CINEMATIC VELOCITY CORRIDOR (EDGE-TO-EDGE)*/}
      {/* ===================================================================== */}
      <img
        src="/assets/act2-target.png"
        alt="We sell-out your real estate project"
        className="w-full h-full w-screen h-screen object-cover object-center pointer-events-none select-none block"
      />
    </div>
  );
};

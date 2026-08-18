import React from 'react';

export const Act2VelocityPoster: React.FC = () => {
  return (
    <div className="act2-velocity-stage act2-stage absolute inset-0 z-20 w-screen h-screen w-full h-full pointer-events-none select-none overflow-hidden flex items-center justify-center">
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

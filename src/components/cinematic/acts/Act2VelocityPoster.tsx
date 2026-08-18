import React from 'react';
import { Act2TrueRenderer } from '../three/Act2TrueRenderer';

export const Act2VelocityPoster: React.FC = () => {
  return (
    <div className="act2-velocity-stage act2-stage absolute inset-0 z-20 w-screen h-screen w-full h-full pointer-events-none select-none overflow-hidden flex items-center justify-center">
      <Act2TrueRenderer className="w-full h-full" />
    </div>
  );
};

import React from 'react';
import { Act2Scene3D } from '../three/Act2Scene3D';

export const Act2VelocityPoster: React.FC = () => {
  return (
    <div className="act2-velocity-stage act2-stage absolute inset-0 z-20 w-full h-full pointer-events-none select-none overflow-hidden">
      {/* ===================================================================== */}
      {/* TRUE 3D CINEMATIC RENDERING (Three.js / React Three Fiber / Drei)    */}
      {/* ===================================================================== */}
      <Act2Scene3D />
    </div>
  );
};

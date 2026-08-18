import React from 'react';
import { SharedPerspectiveField } from '../shared/SharedPerspectiveField';
import { Act2VelocityPoster } from './Act2VelocityPoster';

export const Act2StaticStill: React.FC = () => {
  return (
    <div className="act2-static-still relative w-screen h-screen min-h-[660px] flex items-center justify-center bg-[#08090a] overflow-hidden select-none">
      {/* Deep Obsidian Background Base */}
      <div className="absolute inset-0 bg-[#08090a] pointer-events-none z-0" />

      {/* Layer 1: Live Vector Environment (Wall Ribs, Tarmac Floor, Speed Rails, Laser Horizon) (z-6) */}
      <SharedPerspectiveField />

      {/* Layer 2: Live Animatable 3D Typography Plane (z-20) */}
      <Act2VelocityPoster />
    </div>
  );
};

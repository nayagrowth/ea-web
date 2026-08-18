import React from 'react';
import { Act2TrueRenderer } from '../three/Act2TrueRenderer';

export const Act2StaticStill: React.FC = () => {
  return (
    <div className="act2-static-still relative w-screen h-screen w-full h-full flex items-center justify-center bg-[#08090a] overflow-hidden select-none">
      <Act2TrueRenderer className="w-full h-full" />
    </div>
  );
};

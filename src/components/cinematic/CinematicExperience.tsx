import React from 'react';
import { CinematicHero } from './CinematicHero';
import { CinematicProblem } from './CinematicProblem';

export const CinematicExperience: React.FC = () => {
  return (
    <div className="w-full flex flex-col bg-white">
      {/* Act 1: Cinematic Pinned Hero Story */}
      <CinematicHero />

      {/* Act 2: Cinematic Pinned Problem & Funnel Story */}
      <CinematicProblem />
    </div>
  );
};

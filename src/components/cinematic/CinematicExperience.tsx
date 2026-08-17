import React from 'react';
import { CinematicHero } from './CinematicHero';
import type { Act1Variant } from './CinematicHero';
import { CinematicProblem } from './CinematicProblem';

interface CinematicExperienceProps {
  act1Variant?: Act1Variant;
}

export const CinematicExperience: React.FC<CinematicExperienceProps> = ({ act1Variant = 'columns' }) => {
  return (
    <div className="w-full flex flex-col bg-white">
      {/* Act 1: Cinematic Pinned Hero Story */}
      <CinematicHero act1Variant={act1Variant} />

      {/* Act 2: Cinematic Pinned Problem & Funnel Story */}
      <CinematicProblem />
    </div>
  );
};

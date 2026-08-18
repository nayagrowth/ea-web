import React from 'react';

export const ACT2_VP = { x: 1459, y: 585 } as const; // (87.3%, 62.2% of 1672x941)

export const SharedPerspectiveField: React.FC = () => {
  return (
    <div className="shared-rail-story-rig absolute inset-0 z-6 pointer-events-none overflow-hidden select-none">
      <div className="shared-rail-pointer-rig w-full h-full relative">
        <svg
          className="shared-perspective-svg w-full h-full block"
          viewBox="0 0 1672 941"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Gold Horizon Core Gradient */}
            <linearGradient id="gold-laser-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c79846" stopOpacity="0" />
              <stop offset="12%" stopColor="#ecd08e" stopOpacity="0.9" />
              <stop offset="65%" stopColor="#ecd08e" stopOpacity="1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>

            {/* Gold Glow Filter */}
            <filter id="gold-laser-glow" x="-20%" y="-30%" width="140%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Floor Track Shading Gradient */}
            <linearGradient id="floor-fade-grad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#08090a" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#111317" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#08090a" stopOpacity="0.1" />
            </linearGradient>

            {/* White Speed Line Gradient */}
            <linearGradient id="white-speed-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.05" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
            </linearGradient>

            {/* Champagne Rail Gradient */}
            <linearGradient id="champagne-speed-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c79846" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#ecd08e" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ecd08e" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* ================================================================= */}
          {/* LAYER 1: RIGHT ARCHITECTURAL WALL RIBS (Nested Rig Separation)     */}
          {/* ================================================================= */}
          <g className="act2-rib-story-rig">
            <g className="act2-rib-pointer-rig act2-rib-plane" opacity="0.95">
              {/* Wall Background Facet */}
              <polygon points="1672,0 1672,941 1459,585" fill="#121316" opacity="0.8" />
              <polygon points="1672,180 1672,780 1459,585" fill="#181a20" opacity="0.65" />

              {/* Wall Rib Lines */}
              <line x1="1672" y1="40" x2="1459" y2="585" stroke="#ffffff" strokeWidth="2.5" opacity="0.85" />
              <line x1="1672" y1="90" x2="1459" y2="585" stroke="#5a5e68" strokeWidth="1.2" opacity="0.6" />
              <line x1="1672" y1="140" x2="1459" y2="585" stroke="#3a3d45" strokeWidth="1.0" opacity="0.5" />
              <line x1="1672" y1="190" x2="1459" y2="585" stroke="#7e8492" strokeWidth="1.5" opacity="0.7" />
              <line x1="1672" y1="250" x2="1459" y2="585" stroke="#ffffff" strokeWidth="2.0" opacity="0.8" />
              <line x1="1672" y1="320" x2="1459" y2="585" stroke="#4a4e58" strokeWidth="1.2" opacity="0.55" />
              <line x1="1672" y1="400" x2="1459" y2="585" stroke="#ffffff" strokeWidth="2.8" opacity="0.9" />
              <line x1="1672" y1="490" x2="1459" y2="585" stroke="#606674" strokeWidth="1.4" opacity="0.65" />
              <line x1="1672" y1="585" x2="1459" y2="585" stroke="#ffffff" strokeWidth="3.2" opacity="0.95" />
              <line x1="1672" y1="670" x2="1459" y2="585" stroke="#4a4e58" strokeWidth="1.2" opacity="0.6" />
              <line x1="1672" y1="760" x2="1459" y2="585" stroke="#ffffff" strokeWidth="2.2" opacity="0.85" />
              <line x1="1672" y1="860" x2="1459" y2="585" stroke="#7e8492" strokeWidth="1.6" opacity="0.7" />
            </g>
          </g>

          {/* ================================================================= */}
          {/* LAYER 2: FLOOR PERSPECTIVE SPEED RAILS                            */}
          {/* ================================================================= */}
          <g className="act2-floor-rails">
            {/* Reflective Dark Floor Track */}
            <polygon points="0,585 1459,585 1672,941 0,941" fill="url(#floor-fade-grad)" opacity="0.85" />

            {/* Base White & Silver Velocity Rails */}
            <line x1="0" y1="710" x2="1459" y2="585" stroke="url(#white-speed-grad)" strokeWidth="3.5" opacity="0.75" />
            <line x1="0" y1="745" x2="1459" y2="585" stroke="#9095a0" strokeWidth="1.8" opacity="0.6" />
            <line x1="0" y1="785" x2="1459" y2="585" stroke="#ffffff" strokeWidth="2.5" opacity="0.8" />
            <line x1="0" y1="845" x2="1459" y2="585" stroke="#505560" strokeWidth="1.4" opacity="0.5" />
            <line x1="180" y1="941" x2="1459" y2="585" stroke="#ffffff" strokeWidth="3.0" opacity="0.75" />
            <line x1="420" y1="941" x2="1459" y2="585" stroke="#9095a0" strokeWidth="1.6" opacity="0.55" />
            <line x1="680" y1="941" x2="1459" y2="585" stroke="#ffffff" strokeWidth="2.8" opacity="0.8" />
            <line x1="920" y1="941" x2="1459" y2="585" stroke="#6a707c" strokeWidth="1.4" opacity="0.6" />
            <line x1="1150" y1="941" x2="1459" y2="585" stroke="#ffffff" strokeWidth="3.2" opacity="0.85" />
            <line x1="1340" y1="941" x2="1459" y2="585" stroke="#ffffff" strokeWidth="4.0" opacity="0.9" />

            {/* Dynamic Champagne Gold Velocity Rails */}
            <line x1="0" y1="630" x2="1459" y2="585" stroke="#c79846" strokeWidth="2.0" opacity="0.7" />
            <line x1="300" y1="941" x2="1459" y2="585" stroke="url(#champagne-speed-grad)" strokeWidth="2.6" opacity="0.85" filter="url(#gold-laser-glow)" />
            <line x1="780" y1="941" x2="1459" y2="585" stroke="url(#champagne-speed-grad)" strokeWidth="3.2" opacity="0.9" filter="url(#gold-laser-glow)" />
            <line x1="1020" y1="941" x2="1459" y2="585" stroke="#dfbd78" strokeWidth="2.2" opacity="0.8" />
            <line x1="1260" y1="941" x2="1459" y2="585" stroke="url(#champagne-speed-grad)" strokeWidth="3.8" opacity="0.95" filter="url(#gold-laser-glow)" />
          </g>

          {/* ================================================================= */}
          {/* LAYER 3: UPPER GOLDEN TRAJECTORY & CENTRAL LASER HORIZON          */}
          {/* ================================================================= */}
          <g className="act2-horizon-laser">
            {/* Upper Diagonal Champagne Slash */}
            <line x1="0" y1="265" x2="1459" y2="585" stroke="#ecd08e" strokeWidth="2.2" opacity="0.75" />
            <line x1="0" y1="305" x2="1459" y2="585" stroke="#c79846" strokeWidth="1.2" opacity="0.5" />

            {/* Primary Golden Speed Horizon (Dominant Central Beam) */}
            <line
              x1="0"
              y1="576"
              x2="1459"
              y2="585"
              stroke="url(#gold-laser-grad)"
              strokeWidth="4.0"
              opacity="0.95"
              filter="url(#gold-laser-glow)"
            />
            {/* Fine Sub-horizon Accent Line */}
            <line
              x1="0"
              y1="588"
              x2="1459"
              y2="585"
              stroke="#ffffff"
              strokeWidth="1.4"
              opacity="0.7"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

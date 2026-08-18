import React from 'react';

export const ACT2_VP_NORMALIZED = [0.873, 0.622] as const;

export const SharedPerspectiveField: React.FC = () => {
  return (
    <div className="shared-perspective-wrap absolute inset-0 z-5 pointer-events-none overflow-hidden select-none">
      {/* 1672 x 941 High-Precision Vector Perspective Stage */}
      <svg
        className="shared-perspective-svg w-full h-full block"
        viewBox="0 0 1672 941"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gold Horizon Core Gradient */}
          <linearGradient id="gold-laser-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c79846" stopOpacity="0" />
            <stop offset="15%" stopColor="#ecd08e" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#ecd08e" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="1" />
          </linearGradient>

          {/* Gold Glow Filter */}
          <filter id="gold-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Floor Gradient */}
          <linearGradient id="floor-fade-grad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#08090a" stopOpacity="1" />
            <stop offset="40%" stopColor="#0f1013" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#08090a" stopOpacity="0" />
          </linearGradient>

          {/* White Speed Line Gradient */}
          <linearGradient id="white-speed-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Deep Charcoal Background Plane */}
        <rect width="1672" height="941" fill="#08090a" />

        {/* ================================================================= */}
        {/* LAYER 1: RIGHT ARCHITECTURAL WALL RIBS & CONVERGING FINS          */}
        {/* ================================================================= */}
        <g className="act2-rib-plane" opacity="0.95">
          {/* Wall Background Facet */}
          <polygon points="1672,0 1672,941 1459,585" fill="#121316" opacity="0.85" />
          <polygon points="1672,200 1672,800 1459,585" fill="#1a1c22" opacity="0.7" />

          {/* Wall Rib Lines */}
          <line x1="1672" y1="40" x2="1459" y2="585" stroke="#ffffff" strokeWidth="2.5" opacity="0.85" />
          <line x1="1672" y1="90" x2="1459" y2="585" stroke="#5a5e68" strokeWidth="1.2" opacity="0.6" />
          <line x1="1672" y1="140" x2="1459" y2="585" stroke="#3a3d45" strokeWidth="1.0" opacity="0.5" />
          <line x1="1672" y1="190" x2="1459" y2="585" stroke="#7e8492" strokeWidth="1.5" opacity="0.7" />
          <line x1="1672" y1="250" x2="1459" y2="585" stroke="#ffffff" strokeWidth="2.0" opacity="0.8" />
          <line x1="1672" y1="320" x2="1459" y2="585" stroke="#4a4e58" strokeWidth="1.2" opacity="0.55" />
          <line x1="1672" y1="400" x2="1459" y2="585" stroke="#ffffff" strokeWidth="2.8" opacity="0.9" />
          <line x1="1672" y1="490" x2="1459" y2="585" stroke="#606674" strokeWidth="1.4" opacity="0.65" />
          <line x1="1672" y1="585" x2="1459" y2="585" stroke="#ffffff" strokeWidth="3.0" opacity="0.95" />
          <line x1="1672" y1="670" x2="1459" y2="585" stroke="#4a4e58" strokeWidth="1.2" opacity="0.6" />
          <line x1="1672" y1="760" x2="1459" y2="585" stroke="#ffffff" strokeWidth="2.2" opacity="0.85" />
          <line x1="1672" y1="860" x2="1459" y2="585" stroke="#7e8492" strokeWidth="1.6" opacity="0.7" />
        </g>

        {/* ================================================================= */}
        {/* LAYER 2: FLOOR PERSPECTIVE SPEED RAILS (Converging to 1459, 585)  */}
        {/* ================================================================= */}
        <g className="act2-floor-rails">
          {/* Broad reflective dark track floor */}
          <polygon points="0,585 1459,585 1672,941 0,941" fill="url(#floor-fade-grad)" opacity="0.9" />

          {/* Thin White & Silver Base Rails */}
          <line x1="0" y1="710" x2="1459" y2="585" stroke="url(#white-speed-grad)" strokeWidth="3.5" opacity="0.75" />
          <line x1="0" y1="740" x2="1459" y2="585" stroke="#9095a0" strokeWidth="1.8" opacity="0.6" />
          <line x1="0" y1="780" x2="1459" y2="585" stroke="#ffffff" strokeWidth="2.5" opacity="0.8" />
          <line x1="0" y1="840" x2="1459" y2="585" stroke="#505560" strokeWidth="1.4" opacity="0.5" />
          <line x1="180" y1="941" x2="1459" y2="585" stroke="#ffffff" strokeWidth="3.0" opacity="0.75" />
          <line x1="420" y1="941" x2="1459" y2="585" stroke="#9095a0" strokeWidth="1.6" opacity="0.55" />
          <line x1="680" y1="941" x2="1459" y2="585" stroke="#ffffff" strokeWidth="2.8" opacity="0.8" />
          <line x1="920" y1="941" x2="1459" y2="585" stroke="#6a707c" strokeWidth="1.4" opacity="0.6" />
          <line x1="1150" y1="941" x2="1459" y2="585" stroke="#ffffff" strokeWidth="3.2" opacity="0.85" />
          <line x1="1340" y1="941" x2="1459" y2="585" stroke="#ffffff" strokeWidth="4.0" opacity="0.9" />

          {/* Dynamic Golden Speed Rails */}
          <line x1="0" y1="630" x2="1459" y2="585" stroke="#c79846" strokeWidth="2.0" opacity="0.7" />
          <line x1="300" y1="941" x2="1459" y2="585" stroke="#ecd08e" strokeWidth="2.4" opacity="0.85" filter="url(#gold-glow-filter)" />
          <line x1="780" y1="941" x2="1459" y2="585" stroke="#ecd08e" strokeWidth="3.0" opacity="0.9" filter="url(#gold-glow-filter)" />
          <line x1="1020" y1="941" x2="1459" y2="585" stroke="#dfbd78" strokeWidth="2.2" opacity="0.8" />
          <line x1="1260" y1="941" x2="1459" y2="585" stroke="#ecd08e" strokeWidth="3.6" opacity="0.95" filter="url(#gold-glow-filter)" />
        </g>

        {/* ================================================================= */}
        {/* LAYER 3: UPPER GOLDEN TRAJECTORY & HORIZON LASER BEAM             */}
        {/* ================================================================= */}
        <g className="act2-horizon-laser">
          {/* Upper Diagonal Champagne Slash */}
          <line x1="0" y1="265" x2="1459" y2="585" stroke="#ecd08e" strokeWidth="2.2" opacity="0.75" />
          <line x1="0" y1="305" x2="1459" y2="585" stroke="#c79846" strokeWidth="1.2" opacity="0.5" />

          {/* Primary Golden Speed Horizon (Dominant Central Beam) */}
          <line
            x1="0"
            y1="575"
            x2="1459"
            y2="585"
            stroke="url(#gold-laser-grad)"
            strokeWidth="3.8"
            opacity="0.95"
            filter="url(#gold-glow-filter)"
          />
          {/* Subtle Secondary Horizon Line */}
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
  );
};

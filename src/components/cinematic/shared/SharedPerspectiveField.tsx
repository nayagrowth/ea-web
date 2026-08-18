import React from 'react';

export const ACT2_VP_WALL = { x: 1427, y: 588 } as const; // (85.3%, 62.5% of 1672x941)
export const ACT2_VP_FLOOR = { x: 1516, y: 623 } as const; // (90.7%, 66.2% of 1672x941)

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
            {/* Gold Laser Horizon Gradient */}
            <linearGradient id="gold-horizon-core" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c79846" stopOpacity="0" />
              <stop offset="25%" stopColor="#c79846" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#ecd08e" stopOpacity="0.95" />
              <stop offset="90%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#ecd08e" stopOpacity="0.8" />
            </linearGradient>

            {/* Gold Laser Glow Filter */}
            <filter id="gold-laser-bloom" x="-20%" y="-40%" width="140%" height="180%">
              <feGaussianBlur stdDeviation="7" result="blur1" />
              <feGaussianBlur stdDeviation="2" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Glossy Dark Floor Gradient */}
            <linearGradient id="glossy-floor-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#08090a" stopOpacity="0.3" />
              <stop offset="20%" stopColor="#0e0f13" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#14161b" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#08090a" stopOpacity="0.98" />
            </linearGradient>

            {/* Wall Slat Gradient */}
            <linearGradient id="wall-slat-fill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#121316" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#08090a" stopOpacity="1" />
            </linearGradient>

            {/* Champagne Floor Rail Gradient */}
            <linearGradient id="champagne-floor-rail" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c79846" stopOpacity="0" />
              <stop offset="40%" stopColor="#dfbd78" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ecd08e" stopOpacity="1" />
            </linearGradient>

            {/* Silver Specular Wall Edge Gradient */}
            <linearGradient id="silver-wall-edge" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#8a909d" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#30333c" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* ================================================================= */}
          {/* LAYER 1: GLOSSY REFLECTIVE FLOOR TARMAC                           */}
          {/* ================================================================= */}
          <g className="act2-floor-rails">
            {/* Dark Glossy Asphalt/Tarmac Floor Polygon */}
            <polygon
              points="0,588 1427,588 1672,623 1672,941 0,941"
              fill="url(#glossy-floor-grad)"
            />

            {/* Subtle Horizontal Floor Sheen Reflections */}
            <polygon points="0,670 1427,588 1520,640 0,730" fill="#181a20" opacity="0.4" />
            <polygon points="0,780 1427,588 1580,720 0,860" fill="#131418" opacity="0.3" />

            {/* Floor Perspective Speed Rails (Sparse, High-Speed Precision) */}
            <line x1="0" y1="710" x2="1516" y2="623" stroke="#ffffff" strokeWidth="1.6" opacity="0.55" />
            <line x1="0" y1="755" x2="1516" y2="623" stroke="#484c56" strokeWidth="1.0" opacity="0.4" />
            <line x1="0" y1="810" x2="1516" y2="623" stroke="#ffffff" strokeWidth="2.0" opacity="0.65" />
            <line x1="280" y1="941" x2="1516" y2="623" stroke="#363942" strokeWidth="1.2" opacity="0.45" />
            <line x1="580" y1="941" x2="1516" y2="623" stroke="#ffffff" strokeWidth="2.2" opacity="0.7" />
            <line x1="920" y1="941" x2="1516" y2="623" stroke="#505562" strokeWidth="1.4" opacity="0.5" />
            <line x1="1240" y1="941" x2="1516" y2="623" stroke="#ffffff" strokeWidth="2.8" opacity="0.8" />

            {/* Champagne Gold Floor Velocity Tracks (Scarce Luxury Light) */}
            <line
              x1="0"
              y1="642"
              x2="1516"
              y2="623"
              stroke="url(#champagne-floor-rail)"
              strokeWidth="2.0"
              opacity="0.8"
            />
            <line
              x1="740"
              y1="941"
              x2="1516"
              y2="623"
              stroke="url(#champagne-floor-rail)"
              strokeWidth="2.8"
              opacity="0.9"
              filter="url(#gold-laser-bloom)"
            />
            <line
              x1="1080"
              y1="941"
              x2="1516"
              y2="623"
              stroke="url(#champagne-floor-rail)"
              strokeWidth="3.2"
              opacity="0.95"
              filter="url(#gold-laser-bloom)"
            />
          </g>

          {/* ================================================================= */}
          {/* LAYER 2: RIGHT ARCHITECTURAL WALL RIBS & METALLIC SLATS           */}
          {/* ================================================================= */}
          <g className="act2-rib-story-rig">
            <g className="act2-rib-pointer-rig act2-rib-plane">
              {/* Solid Architectural Wall Polygon */}
              <polygon
                points="1672,0 1672,941 1427,588"
                fill="url(#wall-slat-fill)"
              />

              {/* Dominant Clean White Architectural Wall Edge */}
              <line
                x1="1672"
                y1="35"
                x2="1427"
                y2="588"
                stroke="url(#silver-wall-edge)"
                strokeWidth="3.5"
                opacity="0.95"
              />

              {/* Horizontal Louver Ribs with Specular Highlight Edges */}
              <polygon points="1672,90 1672,135 1427,588" fill="#181a20" opacity="0.8" />
              <line x1="1672" y1="90" x2="1427" y2="588" stroke="#ffffff" strokeWidth="1.8" opacity="0.75" />

              <polygon points="1672,175 1672,225 1427,588" fill="#1e2027" opacity="0.85" />
              <line x1="1672" y1="175" x2="1427" y2="588" stroke="#ffffff" strokeWidth="2.2" opacity="0.85" />

              <polygon points="1672,265 1672,320 1427,588" fill="#1a1c22" opacity="0.8" />
              <line x1="1672" y1="265" x2="1427" y2="588" stroke="#a0a5b2" strokeWidth="1.5" opacity="0.65" />

              <polygon points="1672,360 1672,420 1427,588" fill="#22252e" opacity="0.9" />
              <line x1="1672" y1="360" x2="1427" y2="588" stroke="#ffffff" strokeWidth="2.6" opacity="0.9" />

              <polygon points="1672,465 1672,530 1427,588" fill="#1a1c22" opacity="0.85" />
              <line x1="1672" y1="465" x2="1427" y2="588" stroke="#808694" strokeWidth="1.6" opacity="0.7" />

              <polygon points="1672,575 1672,645 1427,588" fill="#252832" opacity="0.95" />
              <line x1="1672" y1="575" x2="1427" y2="588" stroke="#ffffff" strokeWidth="3.2" opacity="0.95" />

              <polygon points="1672,690 1672,765 1427,588" fill="#1c1e25" opacity="0.85" />
              <line x1="1672" y1="690" x2="1427" y2="588" stroke="#8c92a0" strokeWidth="1.8" opacity="0.75" />

              <polygon points="1672,810 1672,890 1427,588" fill="#20222a" opacity="0.8" />
              <line x1="1672" y1="810" x2="1427" y2="588" stroke="#ffffff" strokeWidth="2.2" opacity="0.85" />
            </g>
          </g>

          {/* ================================================================= */}
          {/* LAYER 3: DOMINANT GOLDEN LASER HORIZON & UPPER DIAGONAL ACCENT     */}
          {/* ================================================================= */}
          <g className="act2-horizon-laser">
            {/* Upper Diagonal Champagne Streak (Behind "We") */}
            <line
              x1="0"
              y1="285"
              x2="1427"
              y2="588"
              stroke="#ecd08e"
              strokeWidth="1.6"
              opacity="0.65"
            />

            {/* Core Golden Horizon Laser Beam (Mid-Section Velocity Corridor) */}
            <line
              x1="0"
              y1="588"
              x2="1427"
              y2="588"
              stroke="url(#gold-horizon-core)"
              strokeWidth="3.8"
              opacity="0.95"
              filter="url(#gold-laser-bloom)"
            />
            {/* Fine Sub-horizon White Core */}
            <line
              x1="0"
              y1="590"
              x2="1427"
              y2="588"
              stroke="#ffffff"
              strokeWidth="1.2"
              opacity="0.8"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

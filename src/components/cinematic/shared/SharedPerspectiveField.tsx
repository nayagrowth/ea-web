import React from 'react';

export const SharedPerspectiveField: React.FC = () => {
  return (
    <div className="shared-rail-story-rig absolute inset-0 z-6 pointer-events-none overflow-hidden select-none w-full h-full">
      <div className="shared-rail-pointer-rig w-full h-full relative">
        <svg
          className="shared-perspective-svg w-full h-full block"
          viewBox="0 0 1672 941"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Gold Laser Horizon Core Gradient */}
            <linearGradient id="live-gold-laser" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c79846" stopOpacity="0" />
              <stop offset="25%" stopColor="#c79846" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#ecd08e" stopOpacity="0.95" />
              <stop offset="90%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#ecd08e" stopOpacity="0.8" />
            </linearGradient>

            {/* Gold Laser Bloom Filter */}
            <filter id="live-gold-bloom" x="-20%" y="-40%" width="140%" height="180%">
              <feGaussianBlur stdDeviation="7" result="blur1" />
              <feGaussianBlur stdDeviation="2" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Glossy Dark Floor Gradient */}
            <linearGradient id="live-floor-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#08090a" stopOpacity="0.3" />
              <stop offset="20%" stopColor="#0e0f13" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#14161b" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#08090a" stopOpacity="0.98" />
            </linearGradient>

            {/* Wall Slat Gradient */}
            <linearGradient id="live-wall-fill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#121316" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#08090a" stopOpacity="1" />
            </linearGradient>

            {/* Champagne Floor Rail Gradient */}
            <linearGradient id="live-champagne-rail" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c79846" stopOpacity="0" />
              <stop offset="40%" stopColor="#dfbd78" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ecd08e" stopOpacity="1" />
            </linearGradient>

            {/* Silver Specular Wall Edge Gradient */}
            <linearGradient id="live-silver-wall" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#8a909d" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#30333c" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* ================================================================= */}
          {/* LAYER 1: GLOSSY REFLECTIVE FLOOR TARMAC & SPEED RAILS            */}
          {/* ================================================================= */}
          <g className="act2-floor-rails">
            {/* Dark Glossy Asphalt/Tarmac Floor Polygon */}
            <polygon
              points="0,588 1427,588 1672,623 1672,941 0,941"
              fill="url(#live-floor-grad)"
            />

            {/* Floor Sheen Streaks */}
            <polygon points="0,670 1427,588 1520,640 0,730" fill="#181a20" opacity="0.4" />
            <polygon points="0,780 1427,588 1580,720 0,860" fill="#131418" opacity="0.3" />

            {/* White & Silver Floor Perspective Velocity Rails */}
            <line x1="0" y1="710" x2="1516" y2="623" stroke="#ffffff" strokeWidth="1.6" opacity="0.55" className="act2-floor-line-1" />
            <line x1="0" y1="755" x2="1516" y2="623" stroke="#484c56" strokeWidth="1.0" opacity="0.4" className="act2-floor-line-2" />
            <line x1="0" y1="810" x2="1516" y2="623" stroke="#ffffff" strokeWidth="2.0" opacity="0.65" className="act2-floor-line-3" />
            <line x1="280" y1="941" x2="1516" y2="623" stroke="#363942" strokeWidth="1.2" opacity="0.45" className="act2-floor-line-4" />
            <line x1="580" y1="941" x2="1516" y2="623" stroke="#ffffff" strokeWidth="2.2" opacity="0.7" className="act2-floor-line-5" />
            <line x1="920" y1="941" x2="1516" y2="623" stroke="#505562" strokeWidth="1.4" opacity="0.5" className="act2-floor-line-6" />
            <line x1="1240" y1="941" x2="1516" y2="623" stroke="#ffffff" strokeWidth="2.8" opacity="0.8" className="act2-floor-line-7" />

            {/* Dynamic Champagne Gold Velocity Rails */}
            <line
              x1="0"
              y1="642"
              x2="1516"
              y2="623"
              stroke="url(#live-champagne-rail)"
              strokeWidth="2.0"
              opacity="0.8"
              className="act2-gold-rail-1"
            />
            <line
              x1="740"
              y1="941"
              x2="1516"
              y2="623"
              stroke="url(#live-champagne-rail)"
              strokeWidth="2.8"
              opacity="0.9"
              filter="url(#live-gold-bloom)"
              className="act2-gold-rail-2"
            />
            <line
              x1="1080"
              y1="941"
              x2="1516"
              y2="623"
              stroke="url(#live-champagne-rail)"
              strokeWidth="3.2"
              opacity="0.95"
              filter="url(#live-gold-bloom)"
              className="act2-gold-rail-3"
            />
          </g>

          {/* ================================================================= */}
          {/* LAYER 2: RIGHT ARCHITECTURAL METALLIC RIBBED WALL                 */}
          {/* ================================================================= */}
          <g className="act2-rib-story-rig">
            <g className="act2-rib-pointer-rig act2-rib-plane">
              {/* Solid Architectural Wall Facet */}
              <polygon
                points="1672,0 1672,941 1427,588"
                fill="url(#live-wall-fill)"
              />

              {/* Dominant Clean White Wall Boundary Edge */}
              <line
                x1="1672"
                y1="35"
                x2="1427"
                y2="588"
                stroke="url(#live-silver-wall)"
                strokeWidth="3.5"
                opacity="0.95"
                className="act2-wall-edge"
              />

              {/* Architectural Louver Ribs with Edge Highlights */}
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
          {/* LAYER 3: DOMINANT GOLDEN LASER HORIZON & UPPER DIAGONAL STREAK   */}
          {/* ================================================================= */}
          <g className="act2-horizon-laser">
            {/* Upper Diagonal Champagne Streak Behind "We" */}
            <line
              x1="0"
              y1="285"
              x2="1427"
              y2="588"
              stroke="#ecd08e"
              strokeWidth="1.6"
              opacity="0.65"
              className="act2-laser-upper"
            />

            {/* Dominant Golden Horizon Laser Core Beam */}
            <line
              x1="0"
              y1="588"
              x2="1427"
              y2="588"
              stroke="url(#live-gold-laser)"
              strokeWidth="4.0"
              opacity="0.95"
              filter="url(#live-gold-bloom)"
              className="act2-laser-horizon"
            />
            {/* Sub-horizon White Core */}
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

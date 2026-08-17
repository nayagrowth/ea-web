import React from 'react';

// Generates 48 radial kinetic geometric shards with calculated vector angles and varying velocities
const SHARDS = Array.from({ length: 48 }, (_, i) => {
  const angle = (i / 48) * 2 * Math.PI;
  const distance = 60 + (i % 6) * 35;
  const size = 4 + (i % 5) * 3;
  const dx = Math.cos(angle) * distance;
  const dy = Math.sin(angle) * distance;
  return { id: i, dx, dy, size, angle: (angle * 180) / Math.PI };
});

export const ExplosionParticles: React.FC = () => {
  return (
    <g className="explosion-burst-group" transform="translate(0, 0)">
      <defs>
        {/* Core Shockwave Flare */}
        <radialGradient id="epic-shockwave-radial" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="20%" stopColor="#F5B800" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#EF4444" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#7F1D1D" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Primary Luminous Shockwave Core */}
      <circle
        cx="0"
        cy="0"
        r="45"
        fill="url(#epic-shockwave-radial)"
        className="shockwave-core"
      />

      {/* Expanding Concentric Shockwave Rings */}
      <circle
        cx="0"
        cy="0"
        r="70"
        fill="none"
        stroke="#FDE047"
        strokeWidth="3"
        opacity="0.9"
        className="shockwave-ring-1"
      />
      <circle
        cx="0"
        cy="0"
        r="120"
        fill="none"
        stroke="#EF4444"
        strokeWidth="2"
        opacity="0.7"
        className="shockwave-ring-2"
      />

      {/* 48 Radial Geometric Debris Shards */}
      {SHARDS.map((shard) => (
        <polygon
          key={shard.id}
          points={`0,${-shard.size} ${shard.size},0 0,${shard.size} ${-shard.size},0`}
          fill={shard.id % 3 === 0 ? '#F5B800' : shard.id % 3 === 1 ? '#EF4444' : '#FFFFFF'}
          transform={`translate(${shard.dx}, ${shard.dy}) rotate(${shard.angle})`}
          className="explosion-shard"
        />
      ))}
    </g>
  );
};

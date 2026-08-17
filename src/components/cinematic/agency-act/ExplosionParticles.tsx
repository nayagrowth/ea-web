import React from 'react';

// Generates 40 radial kinetic geometric shards with calculated vector angles
const SHARDS = Array.from({ length: 42 }, (_, i) => {
  const angle = (i / 42) * 2 * Math.PI;
  const distance = 40 + (i % 5) * 25;
  const size = 3 + (i % 4) * 2.5;
  const dx = Math.cos(angle) * distance;
  const dy = Math.sin(angle) * distance;
  return { id: i, dx, dy, size, angle: (angle * 180) / Math.PI };
});

export const ExplosionParticles: React.FC = () => {
  return (
    <g className="explosion-burst-group" transform="translate(0, 0)">
      <defs>
        {/* Shockwave Radial Glow */}
        <radialGradient id="shockwave-radial" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="25%" stopColor="#F59E0B" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#EF4444" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7F1D1D" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Primary Shockwave Ring */}
      <circle
        cx="0"
        cy="0"
        r="30"
        fill="url(#shockwave-radial)"
        className="shockwave-core"
      />

      {/* Expanding Ring Waves */}
      <circle
        cx="0"
        cy="0"
        r="45"
        fill="none"
        stroke="#FDE047"
        strokeWidth="2"
        opacity="0.8"
        className="shockwave-ring-1"
      />
      <circle
        cx="0"
        cy="0"
        r="75"
        fill="none"
        stroke="#EF4444"
        strokeWidth="1.5"
        opacity="0.6"
        className="shockwave-ring-2"
      />

      {/* 42 Radial Geometric Debris Shards */}
      {SHARDS.map((shard) => (
        <polygon
          key={shard.id}
          points={`0,${-shard.size} ${shard.size},0 0,${shard.size} ${-shard.size},0`}
          fill={shard.id % 2 === 0 ? '#F59E0B' : '#EF4444'}
          transform={`translate(${shard.dx}, ${shard.dy}) rotate(${shard.angle})`}
          className="explosion-shard"
        />
      ))}
    </g>
  );
};

import React from 'react';

export const SpeedGrid: React.FC = () => {
  return (
    <g className="speed-grid-group opacity-60">
      {/* Horizon Line */}
      <line x1="0" y1="140" x2="800" y2="140" stroke="#1E293B" strokeWidth="1" />

      {/* Perspective Speed Lines */}
      <line x1="0" y1="160" x2="800" y2="160" stroke="#334155" strokeWidth="1.5" strokeDasharray="12 12" />
      <line x1="0" y1="185" x2="800" y2="185" stroke="#475569" strokeWidth="2" strokeDasharray="24 24" />
      <line x1="0" y1="210" x2="800" y2="210" stroke="#64748B" strokeWidth="2.5" strokeDasharray="40 40" />

      {/* Headlight Ground Projection Beam */}
      <polygon
        points="320,165 780,130 780,210 320,175"
        fill="url(#headlight-beam-grad)"
        opacity="0.35"
        className="headlight-beam"
      />

      <defs>
        <linearGradient id="headlight-beam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="30%" stopColor="#60A5FA" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </linearGradient>
      </defs>
    </g>
  );
};

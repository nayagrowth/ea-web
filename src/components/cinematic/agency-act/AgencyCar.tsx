import React from 'react';

export const AgencyCar: React.FC = () => {
  return (
    <g className="agency-supercar-vector">
      <defs>
        {/* Car Carbon & Titanium Metallic Gradient */}
        <linearGradient id="cyber-car-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="30%" stopColor="#334155" />
          <stop offset="70%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>

        {/* Xenon Laser Beam Gradient */}
        <linearGradient id="laser-beam-glow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
          <stop offset="30%" stopColor="#0284C7" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0369A1" stopOpacity="0" />
        </linearGradient>

        {/* Laser Flare Filter */}
        <filter id="xenon-flare" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Volumetric Xenon Headlight Beam */}
      <polygon
        points="270,38 680,-10 680,90 270,44"
        fill="url(#laser-beam-glow)"
        opacity="0.6"
        className="headlight-beam"
      />

      {/* Twin Cyan Afterburner Exhaust Flames */}
      <g transform="translate(-25, 34)">
        <polygon points="0,0 -50,-6 -70,0 -50,6" fill="#38BDF8" opacity="0.9" className="animate-pulse" />
        <polygon points="0,0 -30,-3 -45,0 -30,3" fill="#FFFFFF" />
        <polygon points="0,8 -40,4 -60,8 -40,12" fill="#38BDF8" opacity="0.7" />
      </g>

      {/* Aerodynamic Hypercar Chassis */}
      <path
        d="M 10,40 
           C 25,38 40,36 60,36 
           L 95,20 
           C 125,8 175,8 205,20 
           L 235,32 
           C 260,34 275,36 285,38 
           L 290,48 
           L 0,48 Z"
        fill="url(#cyber-car-body)"
        stroke="#64748B"
        strokeWidth="1.8"
      />

      {/* Cockpit Canopy */}
      <path
        d="M 100,20 
           C 125,11 170,11 195,20 
           L 225,32 
           L 80,32 Z"
        fill="#0284C7"
        opacity="0.4"
        stroke="#38BDF8"
        strokeWidth="1.2"
      />

      {/* Side Carbon Aero Blade */}
      <path d="M 140,36 L 175,36 L 160,44 L 130,44 Z" fill="#020617" stroke="#475569" strokeWidth="1" />

      {/* High-Intensity Laser Projector Headlight */}
      <g filter="url(#xenon-flare)">
        <polygon points="280,36 290,38 284,43 276,40" fill="#38BDF8" />
        <circle cx="286" cy="39" r="4" fill="#FFFFFF" />
      </g>

      {/* Front Multi-Spoke Alloy Wheel */}
      <g transform="translate(235, 48)">
        <circle cx="0" cy="0" r="16" fill="#020617" stroke="#64748B" strokeWidth="2.5" />
        <circle cx="0" cy="0" r="9" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5" />
        <line x1="-8" y1="0" x2="8" y2="0" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="0" y1="-8" x2="0" y2="8" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="-6" y1="-6" x2="6" y2="6" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="-6" y1="6" x2="6" y2="-6" stroke="#FFFFFF" strokeWidth="1.5" />
      </g>

      {/* Rear Multi-Spoke Alloy Wheel */}
      <g transform="translate(55, 48)">
        <circle cx="0" cy="0" r="16" fill="#020617" stroke="#64748B" strokeWidth="2.5" />
        <circle cx="0" cy="0" r="9" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5" />
        <line x1="-8" y1="0" x2="8" y2="0" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="0" y1="-8" x2="0" y2="8" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="-6" y1="-6" x2="6" y2="6" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="-6" y1="6" x2="6" y2="-6" stroke="#FFFFFF" strokeWidth="1.5" />
      </g>

      {/* Neon Cyber Underglow */}
      <line x1="0" y1="52" x2="290" y2="52" stroke="#38BDF8" strokeWidth="2" opacity="0.8" />
    </g>
  );
};

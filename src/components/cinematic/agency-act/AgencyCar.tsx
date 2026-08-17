import React from 'react';

export const AgencyCar: React.FC = () => {
  return (
    <g className="agency-supercar-vector" transform="translate(0, 0)">
      <defs>
        {/* Car Metallic Gradient */}
        <linearGradient id="car-body-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="35%" stopColor="#475569" />
          <stop offset="70%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>

        {/* Headlight Flare Filter */}
        <filter id="headlight-flare" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Speed Exhaust Fire Trails */}
      <g transform="translate(-30, 28)">
        <polygon points="0,0 -40,-4 -55,0 -40,4" fill="#3B82F6" opacity="0.8" />
        <polygon points="0,0 -25,-2 -35,0 -25,2" fill="#FFFFFF" />
      </g>

      {/* Aerodynamic Chassis & Bodywork */}
      <path
        d="M 5,38 
           C 15,36 30,35 45,35 
           L 70,22 
           C 95,12 140,12 165,22 
           L 190,32 
           C 220,33 245,35 255,38 
           L 260,48 
           L 0,48 Z"
        fill="url(#car-body-grad)"
        stroke="#64748B"
        strokeWidth="1.5"
      />

      {/* Smoked Glass Cockpit Canopy */}
      <path
        d="M 75,22 
           C 95,14 135,14 155,22 
           L 180,32 
           L 60,32 Z"
        fill="#0284C7"
        opacity="0.35"
        stroke="#38BDF8"
        strokeWidth="1"
      />

      {/* Side Air Intake Scallop */}
      <path d="M 120,35 L 145,35 L 135,42 L 115,42 Z" fill="#0F172A" />

      {/* High-Intensity Laser Projector Headlight */}
      <g filter="url(#headlight-flare)">
        <polygon points="252,36 260,38 255,42 248,39" fill="#60A5FA" />
        <circle cx="256" cy="39" r="3" fill="#FFFFFF" />
      </g>

      {/* Front Wheel Assembly (Multi-Spoke Alloy + Disc Brake) */}
      <g transform="translate(205, 48)">
        <circle cx="0" cy="0" r="14" fill="#090D16" stroke="#475569" strokeWidth="2.5" />
        <circle cx="0" cy="0" r="8" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5" />
        {/* Spokes */}
        <line x1="-7" y1="0" x2="7" y2="0" stroke="#FFFFFF" strokeWidth="1.2" />
        <line x1="0" y1="-7" x2="0" y2="7" stroke="#FFFFFF" strokeWidth="1.2" />
        <line x1="-5" y1="-5" x2="5" y2="5" stroke="#FFFFFF" strokeWidth="1.2" />
        <line x1="-5" y1="5" x2="5" y2="-5" stroke="#FFFFFF" strokeWidth="1.2" />
      </g>

      {/* Rear Wheel Assembly (Multi-Spoke Alloy + Disc Brake) */}
      <g transform="translate(45, 48)">
        <circle cx="0" cy="0" r="14" fill="#090D16" stroke="#475569" strokeWidth="2.5" />
        <circle cx="0" cy="0" r="8" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5" />
        {/* Spokes */}
        <line x1="-7" y1="0" x2="7" y2="0" stroke="#FFFFFF" strokeWidth="1.2" />
        <line x1="0" y1="-7" x2="0" y2="7" stroke="#FFFFFF" strokeWidth="1.2" />
        <line x1="-5" y1="-5" x2="5" y2="5" stroke="#FFFFFF" strokeWidth="1.2" />
        <line x1="-5" y1="5" x2="5" y2="-5" stroke="#FFFFFF" strokeWidth="1.2" />
      </g>

      {/* Aerodynamic Carbon Splitter & Underglow */}
      <line x1="0" y1="52" x2="260" y2="52" stroke="#38BDF8" strokeWidth="1.5" opacity="0.6" />
    </g>
  );
};

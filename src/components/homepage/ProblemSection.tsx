import React from 'react';
import { BackgroundMesh } from '../common/BackgroundMesh';

const PROBLEM_CARDS = [
  {
    id: 1,
    title: "Trust doesn’t build",
    description: "Buyers don’t trust what they can’t see, can’t verify, or don’t understand. You lose them before the conversation starts.",
    badgeNumber: 1,
    iconType: "shield",
  },
  {
    id: 2,
    title: "Messaging disconnect",
    description: "Generic messaging attracts everyone and converts no one. It fails to connect with real buyer motivations.",
    badgeNumber: 2,
    iconType: "chat",
  },
  {
    id: 3,
    title: "Buyer drop-off before site visit",
    description: "Interest fades when follow-up is slow, content is irrelevant, or the journey is friction-filled. You lose hot buyers.",
    badgeNumber: 3,
    iconType: "user",
  },
];

export const ProblemSection: React.FC = () => {
  return (
    <section
      id="problem-section"
      className="relative w-full min-h-screen px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-8 lg:py-10 flex flex-col justify-between overflow-x-hidden border-t border-gray-100 bg-white"
      aria-label="Beyond Real Estate Lead Generation"
    >
      {/* 5-Dot Quincunx Animated Background Mesh */}
      <BackgroundMesh />

      {/* Main Responsive Grid: Left Copy | Center Compact Mathematical Funnel | Right 3 Problem Cards */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.05fr_0.9fr_1.35fr] gap-8 lg:gap-4 xl:gap-6 items-center w-full my-auto">
        {/* ========================================================================= */}
        {/* PART 1: LEFT COLUMN - Problem Statement & Headline                        */}
        {/* ========================================================================= */}
        <div className="flex flex-col justify-center gap-3.5 sm:gap-4 max-w-[540px]">
          {/* Eyebrow Pill */}
          <div>
            <span className="inline-flex items-center gap-2 bg-[#F3F4F6] border border-gray-200 text-gray-800 text-[11px] sm:text-[11.5px] font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-full shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-beacon" aria-hidden="true" />
              Beyond Real Estate Lead Generation
            </span>
          </div>

          {/* Main Problem Headline */}
          <h2 className="text-[clamp(2.1rem,3.2vw,3.6rem)] font-extrabold text-[#0F172A] tracking-tight leading-[1.1] flex flex-col">
            <span className="sm:whitespace-nowrap">You don’t have a lead</span>
            <span className="sm:whitespace-nowrap">generation problem.</span>
            <span className="sm:whitespace-nowrap text-[#F5B800] mt-0.5">
              You have a project
            </span>
            <span className="sm:whitespace-nowrap text-[#F5B800]">
              sell-out problem.
            </span>
          </h2>

          {/* Paragraph 1 */}
          <p className="text-[13.5px] sm:text-[14.5px] text-[#475569] leading-relaxed pt-1">
            Every marketing agency is selling developers the same thing &mdash; the same &lsquo;luxury living&rsquo; tagline, the same enquiries, the same junk leads that frustrate your sales team.
          </p>

          {/* Paragraph 2 */}
          <p className="text-[13.5px] sm:text-[14.5px] text-[#475569] leading-relaxed">
            The real question isn&rsquo;t &ldquo;How do we generate more real estate leads?&rdquo; It&rsquo;s &ldquo;Why aren&rsquo;t the ones we already have converting into site visits and bookings?&rdquo;
          </p>
        </div>

        {/* ========================================================================= */}
        {/* PART 2: CENTER - Compact Mathematical Funnel with Flow Particles           */}
        {/* ========================================================================= */}
        <div className="flex flex-col items-center justify-center relative select-none w-full">
          {/* Scaled & Compacted Mathematical SVG Funnel System */}
          <svg
            viewBox="0 0 340 435"
            className="w-full max-w-[285px] sm:max-w-[305px] h-auto filter drop-shadow-md overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* 3D Cylindrical Shading for Tier 1 */}
              <linearGradient id="solid-tier1-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#DFE6ED" />
                <stop offset="35%" stopColor="#F1F5F9" />
                <stop offset="65%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#DFE6ED" />
              </linearGradient>

              {/* 3D Cylindrical Shading for Tier 2 */}
              <linearGradient id="solid-tier2-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="35%" stopColor="#FEF9C3" />
                <stop offset="65%" stopColor="#FFFDF5" />
                <stop offset="100%" stopColor="#FDE68A" />
              </linearGradient>

              {/* 3D Cylindrical Shading for Tier 3 */}
              <linearGradient id="solid-tier3-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D97706" />
                <stop offset="35%" stopColor="#F5B800" />
                <stop offset="65%" stopColor="#FCD34D" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>

              {/* Top Rim Depth Gradient */}
              <linearGradient id="solid-rim-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#64748B" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.1" />
              </linearGradient>

              {/* Gold Avatar Glow Filter */}
              <filter id="solid-avatar-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#F5B800" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* ------------------------------------------------------------- */}
            {/* 1. MATHEMATICAL S-CURVES: FROM AVATAR BOTTOMS TO FUNNEL RIM  */}
            {/* ------------------------------------------------------------- */}
            {/* S-Curve 1: (38, 44) -> (100, 118) */}
            <path
              d="M 38,44 C 38,80 100,80 100,118"
              stroke="#475569"
              strokeWidth="1.7"
              strokeDasharray="4 4"
            />
            {/* S-Curve 2: (82, 72) -> (130, 120) */}
            <path
              d="M 82,72 C 82,96 130,96 130,120"
              stroke="#475569"
              strokeWidth="1.7"
              strokeDasharray="4 4"
            />
            {/* Direct Flow Path 3: (160, 38) -> (160, 121) */}
            <path
              d="M 160,38 L 160,121"
              stroke="#475569"
              strokeWidth="1.7"
              strokeDasharray="4 4"
            />
            {/* S-Curve 4: (238, 72) -> (190, 120) */}
            <path
              d="M 238,72 C 238,96 190,96 190,120"
              stroke="#475569"
              strokeWidth="1.7"
              strokeDasharray="4 4"
            />
            {/* S-Curve 5: (282, 44) -> (220, 118) */}
            <path
              d="M 282,44 C 282,80 220,80 220,118"
              stroke="#475569"
              strokeWidth="1.7"
              strokeDasharray="4 4"
            />

            {/* ------------------------------------------------------------- */}
            {/* 2. PARAMETRIC FLOW PARTICLES TRAVELING DOWN THE S-CURVES      */}
            {/* ------------------------------------------------------------- */}
            <circle r="3.5" fill="#F5B800" stroke="#FFFFFF" strokeWidth="1">
              <animateMotion dur="2.4s" repeatCount="indefinite" path="M 38,44 C 38,80 100,80 100,118" />
            </circle>
            <circle r="3.5" fill="#F5B800" stroke="#FFFFFF" strokeWidth="1">
              <animateMotion dur="2.4s" begin="0.48s" repeatCount="indefinite" path="M 82,72 C 82,96 130,96 130,120" />
            </circle>
            <circle r="3.5" fill="#F5B800" stroke="#FFFFFF" strokeWidth="1">
              <animateMotion dur="2.4s" begin="0.96s" repeatCount="indefinite" path="M 160,38 L 160,121" />
            </circle>
            <circle r="3.5" fill="#F5B800" stroke="#FFFFFF" strokeWidth="1">
              <animateMotion dur="2.4s" begin="1.44s" repeatCount="indefinite" path="M 238,72 C 238,96 190,96 190,120" />
            </circle>
            <circle r="3.5" fill="#F5B800" stroke="#FFFFFF" strokeWidth="1">
              <animateMotion dur="2.4s" begin="1.92s" repeatCount="indefinite" path="M 282,44 C 282,80 220,80 220,118" />
            </circle>

            {/* ------------------------------------------------------------- */}
            {/* 3. THE 5 FLOATING BUYER LEAD AVATAR CIRCLES                   */}
            {/* ------------------------------------------------------------- */}
            {/* Avatar 1: Center (38, 28), r=16 */}
            <g filter="url(#solid-avatar-glow)">
              <circle cx="38" cy="28" r="16" fill="#FFFDF5" stroke="#FDE047" strokeWidth="1.6" />
              <circle cx="38" cy="23" r="4" fill="#475569" />
              <path d="M 30,35 C 30,30 33,29 38,29 C 43,29 46,30 46,35" fill="#475569" />
            </g>

            {/* Avatar 2: Center (82, 56), r=16 */}
            <g filter="url(#solid-avatar-glow)">
              <circle cx="82" cy="56" r="16" fill="#FFFDF5" stroke="#FDE047" strokeWidth="1.6" />
              <circle cx="82" cy="51" r="4" fill="#475569" />
              <path d="M 74,63 C 74,58 77,57 82,57 C 87,57 90,58 90,63" fill="#475569" />
            </g>

            {/* Avatar 3 (Leader/Top): Center (160, 20), r=18 */}
            <g filter="url(#solid-avatar-glow)">
              <circle cx="160" cy="20" r="18" fill="#FEF8E7" stroke="#F5B800" strokeWidth="2.2" />
              <circle cx="160" cy="14" r="4.5" fill="#D97706" />
              <path d="M 151,28 C 151,22 155,20 160,20 C 165,20 169,22 169,28" fill="#D97706" />
            </g>

            {/* Avatar 4: Center (238, 56), r=16 */}
            <g filter="url(#solid-avatar-glow)">
              <circle cx="238" cy="56" r="16" fill="#FFFDF5" stroke="#FDE047" strokeWidth="1.6" />
              <circle cx="238" cy="51" r="4" fill="#475569" />
              <path d="M 230,63 C 230,58 233,57 238,57 C 243,57 246,58 246,63" fill="#475569" />
            </g>

            {/* Avatar 5: Center (282, 28), r=16 */}
            <g filter="url(#solid-avatar-glow)">
              <circle cx="282" cy="28" r="16" fill="#FFFDF5" stroke="#FDE047" strokeWidth="1.6" />
              <circle cx="282" cy="23" r="4" fill="#475569" />
              <path d="M 274,35 C 274,30 277,29 282,29 C 287,29 290,30 290,35" fill="#475569" />
            </g>

            {/* ------------------------------------------------------------- */}
            {/* 4. COMPACT 3D CONICAL FUNNEL BODY TIERS                       */}
            {/* ------------------------------------------------------------- */}
            {/* TIER 1: (44,106) to (66,186) to (254,186) to (276,106) */}
            <path
              d="M 44,106 L 66,186 L 254,186 L 276,106"
              fill="url(#solid-tier1-grad)"
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />
            <line x1="66" y1="186" x2="254" y2="186" stroke="#FFFFFF" strokeWidth="2.2" />

            {/* TIER 2: (66,186) to (88,262) to (232,262) to (254,186) */}
            <path
              d="M 66,186 L 88,262 L 232,262 L 254,186"
              fill="url(#solid-tier2-grad)"
              stroke="#FDE047"
              strokeWidth="1.5"
            />
            <line x1="88" y1="262" x2="232" y2="262" stroke="#FFFFFF" strokeWidth="2.2" />

            {/* TIER 3: (88,262) to (110,338) to (210,338) to (232,262) */}
            <path
              d="M 88,262 L 110,338 L 210,338 L 232,262"
              fill="url(#solid-tier3-grad)"
              stroke="#D97706"
              strokeWidth="1.5"
            />

            {/* 3D Top Rim Ellipse Opening: Center (160, 106), Rx=116, Ry=15 */}
            <ellipse cx="160" cy="106" rx="116" ry="15" fill="url(#solid-rim-grad)" stroke="#94A3B8" strokeWidth="1.7" />
            <ellipse cx="160" cy="106" rx="108" ry="10" fill="#E2E8F0" opacity="0.6" />

            {/* ------------------------------------------------------------- */}
            {/* 5. CENTERED ICON BADGES (AUTHENTIC VECTOR GRAPHICS)           */}
            {/* ------------------------------------------------------------- */}
            {/* Badge 1: Solid Dark Circle at (160, 146), r=22 with Authentic Real Estate Handshake */}
            <circle cx="160" cy="146" r="22" fill="#0F172A" stroke="#334155" strokeWidth="1.4" />
            {/* Authentic Solid White Handshake Vector */}
            <g transform="translate(148, 134)" fill="#FFFFFF">
              <path d="M21.71 7.29l-2-2a2 2 0 0 0-2.83 0L14.5 7.67a1 1 0 0 0 0 1.41l.71.71-1.71 1.71-3.54-3.54a2 2 0 0 0-2.83 0L3.29 11.8a2 2 0 0 0 0 2.83l2.83 2.83a2 2 0 0 0 2.83 0l4.24-4.24 2.83 2.83a2 2 0 0 0 2.83 0l4.85-4.85a2 2 0 0 0 0-2.83l-1.97-1.98zM8.24 16.05L5.41 13.22l3.83-3.83 2.83 2.83-3.83 3.83zm9.9 0l-2.83-2.83 1.41-1.41 2.83 2.83-1.41 1.41z"/>
            </g>

            {/* Badge 2: White Circle at (160, 224), r=21 with 3-Dot Speech Bubble */}
            <circle cx="160" cy="224" r="21" fill="#FFFFFF" stroke="#FDE047" strokeWidth="1.6" />
            <g transform="translate(149, 213)" stroke="#0F172A" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <circle cx="9" cy="10" r="1.3" fill="#0F172A" />
              <circle cx="12" cy="10" r="1.3" fill="#0F172A" />
              <circle cx="15" cy="10" r="1.3" fill="#0F172A" />
            </g>

            {/* Badge 3: White Circle at (160, 300), r=21 with Clean Buyer Silhouette */}
            <circle cx="160" cy="300" r="21" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
            <g transform="translate(149, 289)" stroke="#0F172A" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </g>

            {/* ------------------------------------------------------------- */}
            {/* 6. BOTTOM SPOUT EXIT & LEAK DROP-OFF BADGE                    */}
            {/* ------------------------------------------------------------- */}
            <line x1="160" y1="338" x2="160" y2="378" stroke="#64748B" strokeWidth="1.8" strokeDasharray="3 3" />
            <polyline points="155,371 160,378 165,371" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

            {/* Drop-off Cross Badge at (160, 398), r=14 */}
            <circle cx="160" cy="398" r="14" fill="#FFFFFF" stroke="#FEF08A" strokeWidth="1.8" />
            <g transform="translate(153, 391)" stroke="#EAB308" strokeWidth="2.4" strokeLinecap="round">
              <line x1="2" y1="2" x2="12" y2="12" />
              <line x1="12" y1="2" x2="2" y2="12" />
            </g>

            {/* ------------------------------------------------------------- */}
            {/* 7. OUTGOING CONNECTORS (ACTIVE ONLY ON DESKTOP WHERE CARDS SIT RIGHT) */}
            {/* ------------------------------------------------------------- */}
            {/* Connector 1: Tier 1 Right (265, 146) -> Card 1 (338, 55) */}
            <g className="hidden lg:inline">
              <path
                d="M 265,146 L 292,146 Q 310,146 310,128 L 310,72 Q 310,55 326,55 L 338,55"
                stroke="#334155"
                strokeWidth="1.8"
                strokeDasharray="4 4"
              />
              <polyline points="332,50 338,55 332,60" stroke="#334155" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

              {/* Connector 2: Tier 2 Right (243, 224) -> Card 2 (338, 224) */}
              <path
                d="M 243,224 L 338,224"
                stroke="#334155"
                strokeWidth="1.8"
                strokeDasharray="4 4"
              />
              <polyline points="332,219 338,224 332,229" stroke="#334155" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

              {/* Connector 3: Tier 3 Right (221, 300) -> Card 3 (338, 395) */}
              <path
                d="M 221,300 L 272,300 Q 290,300 290,318 L 290,378 Q 290,395 308,395 L 338,395"
                stroke="#334155"
                strokeWidth="1.8"
                strokeDasharray="4 4"
              />
              <polyline points="332,390 338,395 332,400" stroke="#334155" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* PART 3: RIGHT COLUMN - 3 Problem Disconnect Cards                         */}
        {/* ========================================================================= */}
        <div className="relative flex flex-col gap-4 w-full z-10">
          {PROBLEM_CARDS.map((card) => (
            <div
              key={card.id}
              className="bg-white border border-gray-100 rounded-3xl p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 w-full"
            >
              <div className="flex items-start gap-4">
                {/* Left Circular Icon Container */}
                <div className="w-14 h-14 rounded-full bg-[#F8FAFC] flex items-center justify-center flex-shrink-0 relative">
                  {card.iconType === 'shield' && (
                    <>
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      <span className="absolute bottom-0 right-0 w-5 h-5 bg-[#F5B800] text-gray-950 rounded-full flex items-center justify-center text-[11px] font-black border-2 border-white shadow-2xs">
                        !
                      </span>
                    </>
                  )}

                  {card.iconType === 'chat' && (
                    <>
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        <circle cx="9" cy="10" r="1.3" fill="#0F172A" />
                        <circle cx="12" cy="10" r="1.3" fill="#0F172A" />
                        <circle cx="15" cy="10" r="1.3" fill="#0F172A" />
                      </svg>
                      <span className="absolute bottom-0 right-0 w-5 h-5 bg-[#F5B800] text-gray-950 rounded-full flex items-center justify-center text-[11px] font-black border-2 border-white shadow-2xs">
                        !
                      </span>
                    </>
                  )}

                  {card.iconType === 'user' && (
                    <>
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                      </svg>
                      <span className="absolute bottom-0 right-0 w-5 h-5 bg-[#F5B800] text-gray-950 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white shadow-2xs">
                        ✕
                      </span>
                    </>
                  )}
                </div>

                {/* Right Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-5 h-5 bg-[#F5B800] text-gray-950 rounded-full flex items-center justify-center font-extrabold text-[11px] flex-shrink-0">
                      {card.badgeNumber}
                    </span>
                    <h3 className="font-bold text-[17px] sm:text-[18px] text-[#0F172A] leading-tight">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-[13px] sm:text-[13.5px] text-[#475569] leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM: Full-Width Golden Quote Card                                      */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full mt-6 lg:mt-6">
        <div className="w-full bg-[#FFFDF5] border border-[#FEF08A] rounded-3xl px-6 sm:px-10 py-6 sm:py-7 shadow-xs relative select-none overflow-hidden">
          <div className="relative z-10 flex items-center justify-between gap-4 max-w-5xl mx-auto">
            {/* Left Large Gold Quote Mark */}
            <span className="text-[#F5B800] text-[48px] sm:text-[60px] font-serif leading-none opacity-90 flex-shrink-0 select-none" aria-hidden="true">
              &ldquo;
            </span>

            {/* 2 Centered High-Impact Punchlines */}
            <div className="flex flex-col items-center text-center gap-1 sm:gap-1.5 flex-1 px-2">
              <h3 className="font-extrabold text-[18px] sm:text-[23px] lg:text-[26px] text-[#0F172A] tracking-tight leading-snug">
                An enquiry is not the finish line. It’s the starting point.
              </h3>
              <p className="font-extrabold text-[18px] sm:text-[23px] lg:text-[26px] text-[#E5A000] tracking-tight leading-snug">
                An enquiry is interest &mdash; not intent.
              </p>
            </div>

            {/* Right Large Gold Quote Mark */}
            <span className="text-[#F5B800] text-[48px] sm:text-[60px] font-serif leading-none opacity-90 flex-shrink-0 select-none" aria-hidden="true">
              &rdquo;
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

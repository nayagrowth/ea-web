import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroDiagram } from '../homepage/HeroDiagram';
import { StatsBar } from '../homepage/StatsBar';
import {
  CalendarIcon,
  PlayIcon,
  HomeIcon,
  CommercialIcon,
  PlottingIcon,
  VillaIcon,
  TownshipIcon,
} from '../common/Icons';

gsap.registerPlugin(ScrollTrigger);

export const CinematicHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial element states
      gsap.set('.cine-act-crash', { autoAlpha: 0, scale: 0.8 });
      gsap.set('.cine-act-rocket', { autoAlpha: 0 });
      gsap.set('.cine-act-system', { autoAlpha: 0, y: 50 });
      gsap.set('.crash-flame', { autoAlpha: 0, scale: 0 });

      // Master 500% Scrub Timeline for Extreme Precision Choreography
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=450%',
          pin: stageRef.current,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      // -----------------------------------------------------------------------
      // BEAT 1 -> BEAT 2: CAR ACCELERATES BURNING RUPEES, THEN CRASHES INTO WALL
      // -----------------------------------------------------------------------
      tl.to('.agency-car-unit', {
        x: 320,
        duration: 1.5,
        ease: 'power2.in',
      })
        .to('.burn-counter-text', {
          innerText: 5000000,
          snap: { innerText: 50000 },
          duration: 1.5,
        }, '<')
        // The Crash Impact Moment
        .to('.agency-car-unit', {
          rotate: -25,
          scale: 0.9,
          duration: 0.3,
          ease: 'power4.out',
        })
        .to('.cine-act-crash', {
          autoAlpha: 1,
          scale: 1,
          duration: 0.4,
          ease: 'elastic.out(1.2, 0.4)',
        }, '-=0.2')
        .to('.crash-flame', {
          autoAlpha: 1,
          scale: 1.2,
          stagger: 0.05,
          duration: 0.6,
        }, '-=0.3')

        // -----------------------------------------------------------------------
        // BEAT 3: TRANSITION TO AUTOPILOT ROCKET / JET TIMELINE LAUNCH
        // -----------------------------------------------------------------------
        .to('.scene-agency-act', {
          autoAlpha: 0,
          scale: 0.9,
          y: -40,
          duration: 1,
          ease: 'power2.inOut',
        })
        .to('.cine-act-rocket', {
          autoAlpha: 1,
          duration: 0.8,
        }, '-=0.4')
        // Rocket / Jet ascends along curved timeline path
        .fromTo('.autopilot-rocket-unit', 
          { x: -100, y: 150, rotate: 20 },
          { x: 380, y: -60, rotate: -15, duration: 2.2, ease: 'power2.out' },
          '-=0.6'
        )
        .fromTo('.timeline-track-glow',
          { strokeDashoffset: 600 },
          { strokeDashoffset: 0, duration: 2, ease: 'power2.out' },
          '-=2.2'
        )

        // -----------------------------------------------------------------------
        // BEAT 4: SYSTEM ENGINE REVEAL & DOCKING
        // -----------------------------------------------------------------------
        .to('.cine-act-rocket', {
          autoAlpha: 0,
          duration: 0.8,
        })
        .to('.cine-act-system', {
          autoAlpha: 1,
          y: 0,
          duration: 1.4,
          ease: 'power3.out',
        }, '-=0.4')
        .fromTo(
          '.cine-chip',
          { autoAlpha: 0, y: 15, scale: 0.85 },
          { autoAlpha: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.8, ease: 'back.out(1.5)' },
          '-=0.6'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#0B0F17]">
      {/* Pinned Stage: 100vh locked viewport */}
      <div
        ref={stageRef}
        className="relative w-full h-screen min-h-[660px] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-4 overflow-hidden"
      >
        {/* Luxury Architectural Backdrop with High Clarity */}
        <div className="absolute inset-0 z-0">
          <img
            src="/cinematic_luxury_tower.jpg"
            alt="Luxury Architecture"
            className="w-full h-full object-cover opacity-50 filter brightness-90 contrast-110 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F17]/70 via-[#0B0F17]/40 to-[#0B0F17]/90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,184,0,0.14)_0%,transparent_70%)]" />
        </div>

        {/* Ambient Subtle Blueprint Grid */}
        <div
          className="absolute inset-0 z-1 pointer-events-none opacity-20"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* ========================================================================= */}
        {/* ACT 1: AGENCY CAR RACING, BURNING RUPEES & CRASH (SVG GSAP GRAPHICS)      */}
        {/* ========================================================================= */}
        <div className="scene-agency-act absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          {/* Main Headline */}
          <h1 className="text-[clamp(2.6rem,6.5vw,5.8rem)] font-black text-white tracking-tight leading-[1.08] max-w-5xl drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            Most agencies <span className="text-gray-400">run your ads.</span>
          </h1>

          {/* Dynamic SVG Car Race, Ad Burn & Crash Canvas */}
          <div className="relative w-full max-w-2xl h-[220px] mt-6 flex items-center justify-center">
            <svg viewBox="0 0 600 200" className="w-full h-full overflow-visible" fill="none">
              {/* Road / Speed Grid */}
              <line x1="20" y1="150" x2="580" y2="150" stroke="#334155" strokeWidth="2" strokeDasharray="8 8" />
              <line x1="20" y1="170" x2="580" y2="170" stroke="#1E293B" strokeWidth="1.5" />

              {/* The "Zero Buyer Intent / Junk Enquiries" Brick Wall at x=460 */}
              <g transform="translate(460, 60)">
                <rect x="0" y="0" width="30" height="110" rx="4" fill="#1E293B" stroke="#EF4444" strokeWidth="2" />
                <line x1="5" y1="20" x2="25" y2="20" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="5" y1="55" x2="25" y2="55" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="5" y1="90" x2="25" y2="90" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="15" y="-12" fill="#EF4444" fontSize="11" fontWeight="bold" textAnchor="middle" letterSpacing="1">
                  NO BUYER TRUST WALL
                </text>
              </g>

              {/* The Racing Agency Car Unit (Starts at x=80) */}
              <g className="agency-car-unit" transform="translate(80, 100)">
                {/* Fire Exhaust Trails / Burning Rupee Stream */}
                <g transform="translate(-40, 15)">
                  <circle cx="0" cy="0" r="10" fill="#EF4444" opacity="0.6" className="animate-ping" />
                  <circle cx="-15" cy="-5" r="8" fill="#F59E0B" opacity="0.8" />
                  <text x="-35" y="4" fill="#FDE047" fontSize="13" fontWeight="900">₹₹₹</text>
                </g>

                {/* Sleek Racing Car Vector Body */}
                <path d="M 0,35 L 15,15 L 60,15 L 85,35 L 105,35 L 110,48 L 0,48 Z" fill="#DC2626" stroke="#FFFFFF" strokeWidth="1.5" />
                <path d="M 22,18 L 40,18 L 52,32 L 18,32 Z" fill="#0F172A" opacity="0.8" />
                {/* Car Wheels */}
                <circle cx="25" cy="48" r="9" fill="#0F172A" stroke="#CBD5E1" strokeWidth="2" />
                <circle cx="88" cy="48" r="9" fill="#0F172A" stroke="#CBD5E1" strokeWidth="2" />
                {/* Agency Ads Banner on Roof */}
                <rect x="24" y="0" width="45" height="12" rx="3" fill="#F59E0B" />
                <text x="46" y="9" fill="#000000" fontSize="8" fontWeight="900" textAnchor="middle">
                  RUN ADS
                </text>
              </g>

              {/* Crash Impact Explosions & Rupee Burn Debris */}
              <g className="cine-act-crash" transform="translate(460, 110)">
                {/* Crash Burst Stars */}
                <polygon points="0,-35 12,-12 35,-15 18,5 30,28 5,18 -10,35 -15,12 -38,5 -18,-10" fill="#EF4444" />
                <polygon points="0,-25 8,-8 25,-10 12,3 20,20 3,12 -8,25 -10,8 -25,3 -12,-8" fill="#F59E0B" />
                <text x="0" y="5" fill="#FFFFFF" fontSize="12" fontWeight="900" textAnchor="middle">
                  CRASH!
                </text>

                {/* Flying Burned Rupee Sparks */}
                <text x="35" y="-30" fill="#FCD34D" fontSize="14" fontWeight="bold" className="crash-flame">₹50L+</text>
                <text x="-40" y="-35" fill="#F87171" fontSize="13" fontWeight="bold" className="crash-flame">JUNK LEADS</text>
                <text x="45" y="25" fill="#F87171" fontSize="12" fontWeight="bold" className="crash-flame">0 VISITS</text>
              </g>
            </svg>
          </div>

          {/* Live Ad Burn Telemetry in Indian Rupees */}
          <div className="flex items-center gap-3 bg-red-950/80 border border-red-500/50 backdrop-blur-md px-6 py-2.5 rounded-full shadow-[0_0_30px_rgba(239,68,68,0.3)] mt-2">
            <span className="text-lg animate-pulse">🔥</span>
            <span className="text-sm font-bold text-red-200">
              Burning <span className="text-white font-black text-base">₹45,00,000+</span> in Ad Spend &bull; <span className="text-amber-300 font-extrabold">94.8% Junk Enquiries</span>
            </span>
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-gray-400">
            <span>Scroll to see the Estate Autopilots Jet Launch</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F5B800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
              <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
            </svg>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT 2: ESTATE AUTOPILOTS SUPERSONIC ROCKET / JET ON TIMELINE TRAJECTORY   */}
        {/* ========================================================================= */}
        <div className="cine-act-rocket absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          {/* Punchline Headline */}
          <h2 className="text-[clamp(2.4rem,5.5vw,5rem)] font-black text-white tracking-tight leading-[1.1] max-w-5xl drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            We <span className="text-[#F5B800] glow-gold-cinematic">sell-out</span> your real estate project
            <span className="block text-gray-300 text-[clamp(1.4rem,3vw,2.8rem)] font-extrabold mt-1">
              within your planned timeline.
            </span>
          </h2>

          {/* Autopilot Jet / Rocket Flying along Timeline Trajectory */}
          <div className="relative w-full max-w-3xl h-[240px] mt-4 flex items-center justify-center">
            <svg viewBox="0 0 700 220" className="w-full h-full overflow-visible" fill="none">
              {/* Curved Timeline Velocity Flight Path */}
              <path
                d="M 50,180 Q 250,180 400,100 T 650,40"
                stroke="#F5B800"
                strokeWidth="3"
                strokeDasharray="600"
                className="timeline-track-glow"
                strokeLinecap="round"
              />

              {/* Milestone Waypoints along Timeline */}
              {/* Milestone 1: Month 1 */}
              <g transform="translate(180, 165)">
                <circle cx="0" cy="0" r="8" fill="#0F172A" stroke="#F5B800" strokeWidth="2.5" />
                <text x="0" y="22" fill="#FDE047" fontSize="11" fontWeight="bold" textAnchor="middle">M1: Buyer Trust</text>
              </g>

              {/* Milestone 2: Month 2 */}
              <g transform="translate(390, 105)">
                <circle cx="0" cy="0" r="8" fill="#0F172A" stroke="#F5B800" strokeWidth="2.5" />
                <text x="0" y="-14" fill="#FDE047" fontSize="11" fontWeight="bold" textAnchor="middle">M2: +3.8x Velocity</text>
              </g>

              {/* Milestone 3: 100% Sell-Out */}
              <g transform="translate(630, 45)">
                <circle cx="0" cy="0" r="10" fill="#10B981" stroke="#FFFFFF" strokeWidth="2.5" />
                <text x="0" y="-16" fill="#10B981" fontSize="12" fontWeight="900" textAnchor="middle">100% SELL-OUT</text>
              </g>

              {/* The Estate Autopilots Supersonic Gold Jet / Rocket */}
              <g className="autopilot-rocket-unit" transform="translate(100, 160)">
                {/* Plasma Jet Afterburner Flame */}
                <polygon points="-40,0 -15,-6 -15,6" fill="#F5B800" className="animate-pulse" />
                <polygon points="-60,0 -20,-3 -20,3" fill="#EF4444" opacity="0.8" />
                
                {/* Sleek Aerospace Titanium & Gold Jet Body */}
                <path d="M -15,-8 L 35,0 L -15,8 L -5,0 Z" fill="#F5B800" stroke="#FFFFFF" strokeWidth="1.5" />
                {/* Delta Wings */}
                <polygon points="-10,-5 -25,-25 5,-5" fill="#0F172A" stroke="#F5B800" strokeWidth="1.2" />
                <polygon points="-10,5 -25,25 5,5" fill="#0F172A" stroke="#F5B800" strokeWidth="1.2" />
                {/* Cockpit Canopy */}
                <ellipse cx="10" cy="0" rx="8" ry="2.5" fill="#38BDF8" opacity="0.9" />
              </g>
            </svg>
          </div>

          {/* Guaranteed Sell-Out Telemetry Badge */}
          <div className="flex items-center gap-3 bg-emerald-950/80 border border-emerald-500/50 backdrop-blur-md px-6 py-2.5 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.3)] mt-2">
            <span className="text-lg">⚡</span>
            <span className="text-sm font-bold text-emerald-200">
              <span className="text-white font-black text-base">459+ Real Estate Projects Delivered</span> &bull; 0% Booking Commission &bull; 4.2x Faster Timeline
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACT 3: THE 4-PHASE SYSTEM ENGINE & MASTER DOCKED BLUEPRINT                */}
        {/* ========================================================================= */}
        <div className="cine-act-system relative z-10 w-full grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] xl:grid-cols-[1.02fr_1.18fr] gap-6 lg:gap-10 xl:gap-14 items-center my-auto pt-2 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-gray-100">
          {/* Left Column: Solution Narrative */}
          <div className="flex flex-col justify-between py-0 max-w-[620px]">
            <div className="flex flex-col gap-3.5">
              {/* Eyebrow Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-2 bg-[#F3F4F6] border border-gray-200 text-gray-800 text-[11.5px] sm:text-[12.5px] font-semibold px-3.5 py-1.5 rounded-full shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#F5B800] animate-beacon" />
                  The Estate Autopilots System
                </span>
                <span className="text-[11px] sm:text-[11.5px] font-bold text-[#D97706] bg-[#FEF3C7] px-2.5 py-0.5 rounded-md border border-[#FDE047]/60">
                  100% Real Estate Exclusive
                </span>
              </div>

              {/* Main Solution Headline */}
              <h2 className="text-[clamp(1.85rem,2.8vw,3.15rem)] font-extrabold text-[#0F172A] tracking-tight leading-[1.12] flex flex-col">
                <span className="sm:whitespace-nowrap">Most agencies run</span>
                <span className="sm:whitespace-nowrap">
                  your ads. We <span className="text-[#E5A000] glow-gold-cinematic">sell-out</span>
                </span>
                <span className="sm:whitespace-nowrap">your real estate project</span>
                <span className="sm:whitespace-nowrap">within your planned timeline.</span>
              </h2>

              {/* Subheading */}
              <p className="text-[13.5px] sm:text-[14px] lg:text-[14.5px] text-gray-600 leading-relaxed max-w-[540px]">
                Estate Autopilots is a Project Sell-Out Partner for real estate developers and mandate firms. Through our{' '}
                <span className="inline-block font-bold text-gray-950 bg-[#FEF3C7] border border-[#FDE047] px-1.5 py-0.5 rounded-md shimmer-badge shadow-2xs">
                  4-Phase Project Sell-Out System&trade;
                </span>
                , we define positioning, build buyer trust, and accelerate bookings so buyers walk in already convinced.
              </p>

              {/* Real Estate Visual Proof Banner */}
              <div className="w-full flex items-center justify-between gap-3 bg-white/95 backdrop-blur-xs border border-gray-200/90 rounded-2xl p-2.5 sm:p-3 shadow-2xs">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src="/cinematic_luxury_tower.jpg"
                    alt="Luxury Real Estate Architectural Elevation"
                    className="w-16 h-12 sm:w-20 sm:h-14 object-cover rounded-xl shadow-xs flex-shrink-0 border border-gray-100"
                  />
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse flex-shrink-0" />
                      <span className="text-[12px] sm:text-[13px] font-extrabold text-gray-900 truncate">
                        459+ Real Estate Projects Delivered
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-500 font-medium truncate">
                      0% Commission on Bookings &bull; Zero Junk Enquiries
                    </span>
                  </div>
                </div>
                <div className="hidden sm:flex flex-col items-end pl-2 border-l border-gray-100 flex-shrink-0">
                  <span className="text-[11px] font-extrabold text-[#D97706] bg-[#FEF3C7] px-2 py-0.5 rounded-md border border-[#FDE047]/60">
                    ⚡ 4.2x Faster
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium mt-0.5">Sell-Out Speed</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap sm:flex-nowrap pt-1">
                <a
                  href="#book-strategy-session"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F5B800] hover:bg-[#E5AB00] text-gray-950 font-bold text-[12.5px] px-5 py-2.5 rounded-xl border border-[#D99A00] transition-all shadow-xs active:scale-95 whitespace-nowrap"
                >
                  <CalendarIcon size={16} />
                  <span>Book Your Project Sell-Out Strategy Session</span>
                </a>
                <a
                  href="#watch-briefing"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-950 font-semibold text-[12.5px] px-4 py-2.5 rounded-xl border-[1.5px] border-gray-950 transition-all shadow-2xs active:scale-95 whitespace-nowrap"
                >
                  <PlayIcon size={14} />
                  <span>Watch the 12-Minute Briefing</span>
                </a>
              </div>
            </div>

            {/* Asset Categories */}
            <div className="pt-3">
              <div className="w-full grid grid-cols-3 sm:grid-cols-5 lg:flex lg:items-center lg:justify-between gap-1.5 sm:gap-2 text-[11px] sm:text-[12px] font-semibold text-gray-700 bg-white/95 backdrop-blur-xs border border-gray-200/80 rounded-2xl p-2 sm:px-3 sm:py-2 shadow-2xs">
                <div className="cine-chip flex items-center justify-center gap-1.5 text-gray-900 font-bold bg-gray-50 sm:bg-transparent py-1.5 px-2 rounded-xl sm:rounded-none">
                  <HomeIcon size={14} />
                  <span>Residential</span>
                </div>
                <div className="cine-chip flex items-center justify-center gap-1.5 text-gray-900 font-bold bg-gray-50 sm:bg-transparent py-1.5 px-2 rounded-xl sm:rounded-none sm:border-l sm:border-gray-200 sm:pl-2">
                  <CommercialIcon size={14} />
                  <span>Commercial</span>
                </div>
                <div className="cine-chip flex items-center justify-center gap-1.5 text-gray-900 font-bold bg-gray-50 sm:bg-transparent py-1.5 px-2 rounded-xl sm:rounded-none sm:border-l sm:border-gray-200 sm:pl-2">
                  <PlottingIcon size={14} />
                  <span>Plotting</span>
                </div>
                <div className="cine-chip flex items-center justify-center gap-1.5 text-gray-900 font-bold bg-gray-50 sm:bg-transparent py-1.5 px-2 rounded-xl sm:rounded-none sm:border-l sm:border-gray-200 sm:pl-2">
                  <VillaIcon size={14} />
                  <span>Villas</span>
                </div>
                <div className="cine-chip col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 text-gray-900 font-bold bg-gray-50 sm:bg-transparent py-1.5 px-2 rounded-xl sm:rounded-none sm:border-l sm:border-gray-200 sm:pl-2">
                  <TownshipIcon size={14} />
                  <span>Townships</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4-Phase System Diagram + Stats Bar */}
          <div className="w-full flex flex-col justify-between py-0 gap-3">
            <HeroDiagram />
            <StatsBar />
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FunnelDiagram: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Staggered reveal for cards and funnel
      gsap.from('.funnel-card-item', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        x: 30,
        duration: 0.65,
        stagger: 0.18,
        ease: 'power2.out',
      });

      // Funnel drop-in animation
      gsap.from('.funnel-visual', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: 'back.out(1.4)',
      });

      // Avatars floating animation
      gsap.to('.buyer-avatar-bubble', {
        y: -4,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        stagger: 0.25,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full grid grid-cols-1 lg:grid-cols-[1.05fr_1.45fr] gap-6 lg:gap-8 items-center relative select-none"
      aria-label="Lead to Sell-Out Disconnect Diagram"
    >
      {/* LEFT: 3-Tier Funnel Graphic with Incoming Buyers & Bottom Leak */}
      <div className="flex flex-col items-center justify-center relative py-2 funnel-visual">
        {/* Incoming Prospective Buyer Bubbles */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2 relative z-10">
          <div className="buyer-avatar-bubble w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-xs text-gray-700">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="buyer-avatar-bubble w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FEF8E7] border border-[#FDE047] flex items-center justify-center shadow-xs text-[#D97706] -mt-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="buyer-avatar-bubble w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-xs text-gray-700">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>

        {/* Incoming Flow Path Dots */}
        <svg width="140" height="24" viewBox="0 0 140 24" fill="none" className="mb-0.5 opacity-60">
          <path d="M 25,2 C 25,12 60,18 70,22" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M 70,2 L 70,22" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M 115,2 C 115,12 80,18 70,22" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>

        {/* The 3-Tier Conical Funnel */}
        <div className="w-56 sm:w-64 flex flex-col items-center relative">
          {/* Top Tier: Grey/Slate (Handshake Icon) */}
          <div
            className="w-full h-16 sm:h-18 bg-[#EAEFF5] border-t-2 border-x border-[#CBD5E1] rounded-t-[36px] flex items-center justify-center shadow-xs relative"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 88% 100%, 12% 100%)',
            }}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0F172A] text-white flex items-center justify-center shadow-xs">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m11 17 2 2a1 1 0 0 0 1.42 0l4.24-4.24a1 1 0 0 0 0-1.42l-2.83-2.83a1 1 0 0 0-1.42 0l-2.41 2.41" />
                <path d="m13 15-2-2a1 1 0 0 0-1.42 0l-4.24 4.24a1 1 0 0 0 0 1.42l2.83 2.83a1 1 0 0 0 1.42 0l2.41-2.41" />
                <path d="m18 10 2.5-2.5a2.12 2.12 0 0 0-3-3L15 7" />
                <path d="m6 14-2.5 2.5a2.12 2.12 0 0 0 3 3L9 17" />
              </svg>
            </div>
          </div>

          {/* Middle Tier: Cream/Soft Amber (Chat Bubble Icon) */}
          <div
            className="w-[88%] h-14 sm:h-16 bg-[#FEF3C7] border-x border-[#FDE047] flex items-center justify-center shadow-xs relative -mt-0.5"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 86% 100%, 14% 100%)',
            }}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-[#FDE047] text-gray-900 flex items-center justify-center shadow-xs">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <circle cx="9" cy="10" r="1" fill="currentColor" />
                <circle cx="12" cy="10" r="1" fill="currentColor" />
                <circle cx="15" cy="10" r="1" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* Bottom Tier: Vibrant Gold (User Profile Icon) */}
          <div
            className="w-[76%] h-14 sm:h-16 bg-[#F5B800] border-x-2 border-b-2 border-[#D97706] rounded-b-xl flex items-center justify-center shadow-sm relative -mt-0.5"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 82% 100%, 18% 100%)',
            }}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border-2 border-gray-900 text-gray-900 flex items-center justify-center shadow-xs">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Drop-off Leak Indicator */}
        <div className="flex flex-col items-center mt-2">
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
            <line x1="8" y1="2" x2="8" y2="18" stroke="#94A3B8" strokeWidth="1.6" strokeDasharray="3 3" />
          </svg>
          <div className="w-6 h-6 rounded-full bg-red-50 border border-red-200 text-red-500 flex items-center justify-center text-[11px] font-bold shadow-xs">
            ✕
          </div>
        </div>
      </div>

      {/* RIGHT: 3 Connected Problem Cards */}
      <div className="flex flex-col gap-3.5 sm:gap-4 w-full">
        {/* Problem Card 1: Trust doesn’t build */}
        <div className="funnel-card-item bg-white border border-gray-200/90 rounded-2xl p-4 shadow-xs hover:border-gray-300 hover:shadow-md transition-all duration-200 relative group">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200/90 text-gray-900 flex items-center justify-center flex-shrink-0 relative">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#F5B800] text-gray-900 rounded-full flex items-center justify-center text-[10px] font-black border border-white">
                !
              </span>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-[15px] sm:text-[16px] text-gray-900 leading-snug">
                  Trust doesn’t build
                </h4>
                <span className="w-5 h-5 bg-[#F5B800] text-gray-900 rounded-full flex items-center justify-center font-extrabold text-[11px] shadow-2xs">
                  1
                </span>
              </div>
              <p className="text-[12.5px] sm:text-[13px] text-gray-600 leading-relaxed">
                Buyers don’t trust what they can’t see, can’t verify, or don’t understand. You lose them before the conversation starts.
              </p>
            </div>
          </div>
        </div>

        {/* Problem Card 2: Messaging disconnect */}
        <div className="funnel-card-item bg-white border border-gray-200/90 rounded-2xl p-4 shadow-xs hover:border-gray-300 hover:shadow-md transition-all duration-200 relative group">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200/90 text-gray-900 flex items-center justify-center flex-shrink-0 relative">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#F5B800] text-gray-900 rounded-full flex items-center justify-center text-[10px] font-black border border-white">
                !
              </span>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-[15px] sm:text-[16px] text-gray-900 leading-snug">
                  Messaging disconnect
                </h4>
                <span className="w-5 h-5 bg-[#F5B800] text-gray-900 rounded-full flex items-center justify-center font-extrabold text-[11px] shadow-2xs">
                  2
                </span>
              </div>
              <p className="text-[12.5px] sm:text-[13px] text-gray-600 leading-relaxed">
                Generic messaging attracts everyone and converts no one. It fails to connect with real buyer motivations.
              </p>
            </div>
          </div>
        </div>

        {/* Problem Card 3: Buyer drop-off before site visit */}
        <div className="funnel-card-item bg-white border border-gray-200/90 rounded-2xl p-4 shadow-xs hover:border-gray-300 hover:shadow-md transition-all duration-200 relative group">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200/90 text-gray-900 flex items-center justify-center flex-shrink-0 relative">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#F5B800] text-gray-900 rounded-full flex items-center justify-center text-[10px] font-black border border-white">
                ✕
              </span>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-[15px] sm:text-[16px] text-gray-900 leading-snug">
                  Buyer drop-off before site visit
                </h4>
                <span className="w-5 h-5 bg-[#F5B800] text-gray-900 rounded-full flex items-center justify-center font-extrabold text-[11px] shadow-2xs">
                  3
                </span>
              </div>
              <p className="text-[12.5px] sm:text-[13px] text-gray-600 leading-relaxed">
                Interest fades when follow-up is slow, content is irrelevant, or the journey is friction-filled. You lose hot buyers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

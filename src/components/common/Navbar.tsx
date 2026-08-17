import React, { useState } from 'react';
import { EaLogo, ChevronDownIcon, ArrowRightIcon } from './Icons';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="h-[64px] lg:h-[68px] flex-shrink-0 bg-white/95 backdrop-blur-xs border-b border-gray-100 flex items-center px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 sticky top-0 z-50">
      <div className="w-full flex items-center justify-between">
        {/* Brand Logo */}
        <a href="/" className="flex items-center gap-2.5 select-none" aria-label="Estate Autopilots Home">
          <EaLogo size={38} />
          <div className="flex flex-col leading-none">
            <span className="font-extrabold text-[18px] sm:text-[19px] text-gray-900 tracking-tight">estate</span>
            <span className="font-extrabold text-[18px] sm:text-[19px] text-gray-900 tracking-tight">autopilots</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main Navigation">
          <a href="#what-we-do" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-gray-800 hover:text-[#D99A00] transition-colors">
            <span>What We Do</span>
            <ChevronDownIcon size={13} />
          </a>
          <a href="#how-it-works" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-gray-800 hover:text-[#D99A00] transition-colors">
            <span>How It Works</span>
            <ChevronDownIcon size={13} />
          </a>
          <a href="#results" className="text-[14px] font-semibold text-gray-800 hover:text-[#D99A00] transition-colors">
            Results
          </a>
          <a href="#about-us" className="text-[14px] font-semibold text-gray-800 hover:text-[#D99A00] transition-colors">
            About Us
          </a>
          <a href="#resources" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-gray-800 hover:text-[#D99A00] transition-colors">
            <span>Resources</span>
            <ChevronDownIcon size={13} />
          </a>
        </nav>

        {/* Right Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#book-call"
            className="inline-flex items-center gap-2 bg-[#F5B800] hover:bg-[#E5AB00] text-gray-950 font-bold text-[12.5px] sm:text-[13.5px] px-3.5 sm:px-4.5 py-2 sm:py-2.5 rounded-xl transition-all shadow-sm active:scale-95 whitespace-nowrap"
          >
            <span>Book a Strategy Call</span>
            <ArrowRightIcon size={14} />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100"
            aria-label="Toggle navigation menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[64px] left-0 w-full bg-white border-b border-gray-200 p-6 flex flex-col gap-4 shadow-xl z-50">
          <a href="#what-we-do" onClick={() => setMobileMenuOpen(false)} className="text-[15px] font-semibold text-gray-800">What We Do</a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-[15px] font-semibold text-gray-800">How It Works</a>
          <a href="#results" onClick={() => setMobileMenuOpen(false)} className="text-[15px] font-semibold text-gray-800">Results</a>
          <a href="#about-us" onClick={() => setMobileMenuOpen(false)} className="text-[15px] font-semibold text-gray-800">About Us</a>
          <a href="#resources" onClick={() => setMobileMenuOpen(false)} className="text-[15px] font-semibold text-gray-800">Resources</a>
        </div>
      )}
    </header>
  );
};

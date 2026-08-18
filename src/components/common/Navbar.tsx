import React, { useState } from 'react';
import { ChevronDownIcon, ArrowRightIcon } from './Icons';

export const Navbar: React.FC<{ isDarkVariant?: boolean }> = ({ isDarkVariant = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 w-full h-[64px] lg:h-[72px] flex items-center px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 z-50 transition-all duration-300 ${
        isDarkVariant
          ? 'bg-[#050608]/80 backdrop-blur-md border-b border-white/10'
          : 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs'
      }`}
    >
      <div className="w-full flex items-center justify-between">
        {/* Official Brand Logo */}
        <a href="/" className="flex items-center select-none" aria-label="Estate Autopilots Home">
          <img
            src={isDarkVariant ? '/brand/logo-white.png' : '/brand/logo-dark.png'}
            alt="Estate Autopilots"
            className="h-[34px] sm:h-[38px] w-auto object-contain transition-transform hover:scale-[1.02]"
          />
        </a>

        {/* Minimal Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-qurova" aria-label="Main Navigation">
          <a
            href="#what-we-do"
            className={`inline-flex items-center gap-1.5 text-[14px] font-medium transition-colors ${
              isDarkVariant ? 'text-gray-300 hover:text-[#F5C200]' : 'text-gray-800 hover:text-[#D99A00]'
            }`}
          >
            <span>What We Do</span>
            <ChevronDownIcon size={12} />
          </a>
          <a
            href="#how-it-works"
            className={`inline-flex items-center gap-1.5 text-[14px] font-medium transition-colors ${
              isDarkVariant ? 'text-gray-300 hover:text-[#F5C200]' : 'text-gray-800 hover:text-[#D99A00]'
            }`}
          >
            <span>How It Works</span>
            <ChevronDownIcon size={12} />
          </a>
          <a
            href="#results"
            className={`text-[14px] font-medium transition-colors ${
              isDarkVariant ? 'text-gray-300 hover:text-[#F5C200]' : 'text-gray-800 hover:text-[#D99A00]'
            }`}
          >
            Results
          </a>
          <a
            href="#about-us"
            className={`text-[14px] font-medium transition-colors ${
              isDarkVariant ? 'text-gray-300 hover:text-[#F5C200]' : 'text-gray-800 hover:text-[#D99A00]'
            }`}
          >
            About Us
          </a>
          <a
            href="#resources"
            className={`inline-flex items-center gap-1.5 text-[14px] font-medium transition-colors ${
              isDarkVariant ? 'text-gray-300 hover:text-[#F5C200]' : 'text-gray-800 hover:text-[#D99A00]'
            }`}
          >
            <span>Resources</span>
            <ChevronDownIcon size={12} />
          </a>
        </nav>

        {/* Right Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#book-call"
            className="inline-flex items-center gap-2 bg-[#F5C200] hover:bg-[#E5B200] text-[#001A24] font-bold font-qurova text-[13px] sm:text-[14px] px-4 sm:px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-[#F5C200]/20 active:scale-95 whitespace-nowrap"
          >
            <span>Book a Strategy Call</span>
            <ArrowRightIcon size={14} />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isDarkVariant ? 'text-gray-200 hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'
            }`}
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden absolute top-[64px] left-0 w-full p-6 flex flex-col gap-4 shadow-2xl z-50 font-qurova ${
          isDarkVariant ? 'bg-[#050608] border-b border-white/10 text-gray-200' : 'bg-white border-b border-gray-200 text-gray-800'
        }`}>
          <a href="#what-we-do" onClick={() => setMobileMenuOpen(false)} className="text-[16px] font-medium">What We Do</a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-[16px] font-medium">How It Works</a>
          <a href="#results" onClick={() => setMobileMenuOpen(false)} className="text-[16px] font-medium">Results</a>
          <a href="#about-us" onClick={() => setMobileMenuOpen(false)} className="text-[16px] font-medium">About Us</a>
          <a href="#resources" onClick={() => setMobileMenuOpen(false)} className="text-[16px] font-medium">Resources</a>
        </div>
      )}
    </header>
  );
};

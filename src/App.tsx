import React, { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { Hero } from './components/homepage/Hero';
import { ProblemSection } from './components/homepage/ProblemSection';
import { CinematicExperience } from './components/cinematic/CinematicExperience';
import type { Act1Variant } from './components/cinematic/CinematicHero';

/**
 * TOGGLE MODE & ACT 1 HERO VARIATION:
 * 'cinematic' -> Advanced GSAP ScrollTrigger kinetic storytelling experience
 * 'classic'   -> Pristine original responsive 2-section layout with standard Navbar
 */
const DEFAULT_MODE: 'cinematic' | 'classic' = 'cinematic';
const DEFAULT_HERO_VARIANT: Act1Variant = 'columns';

export const App: React.FC = () => {
  const [mode, setMode] = useState<'cinematic' | 'classic'>(DEFAULT_MODE);
  const [heroVariant, setHeroVariant] = useState<Act1Variant>(DEFAULT_HERO_VARIANT);

  return (
    <div
      className={`w-full min-h-screen flex flex-col selection:bg-[#F5B800] selection:text-gray-950 transition-colors duration-300 ${
        mode === 'classic' ? 'bg-white text-gray-900' : 'bg-[#0B0F17] text-white'
      }`}
    >
      {/* Classic Navbar rendered only in Classic Mode */}
      {mode === 'classic' && <Navbar />}

      <main className="w-full flex flex-col">
        {mode === 'cinematic' ? (
          <CinematicExperience act1Variant={heroVariant} />
        ) : (
          <>
            <Hero />
            <ProblemSection />
          </>
        )}
      </main>

      {/* Floating Mode & Hero Variation Controller */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-xs select-none">
        {/* Main Experience Mode Toggle */}
        <div className="flex items-center bg-white/10 rounded-xl p-0.5">
          <button
            onClick={() => setMode('cinematic')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              mode === 'cinematic'
                ? 'bg-[#F5B800] text-gray-950 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Cinematic Scroll
          </button>
          <button
            onClick={() => setMode('classic')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              mode === 'classic'
                ? 'bg-white text-gray-950 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Classic
          </button>
        </div>

        {/* Act 1 Hero Variation Dropdown / Switcher (Visible in Cinematic Mode) */}
        {mode === 'cinematic' && (
          <div className="flex items-center gap-1 pl-1 border-l border-white/15">
            <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 px-1">
              Hero:
            </span>
            <button
              onClick={() => setHeroVariant('columns')}
              title="4-Column Architectural Eclipse"
              className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
                heroVariant === 'columns'
                  ? 'bg-white/20 text-[#F5B800] border border-[#F5B800]/40'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              4-Col Eclipse
            </button>
            <button
              onClick={() => setHeroVariant('artboard')}
              title="Editorial Slabs Poster"
              className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
                heroVariant === 'artboard'
                  ? 'bg-white/20 text-[#F5B800] border border-[#F5B800]/40'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Slab Poster
            </button>
            <button
              onClick={() => setHeroVariant('poster')}
              title="Original 3-Row Frame"
              className={`px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
                heroVariant === 'poster'
                  ? 'bg-white/20 text-[#F5B800] border border-[#F5B800]/40'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Frame
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

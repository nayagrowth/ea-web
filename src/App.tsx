import React, { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { Hero } from './components/homepage/Hero';
import { ProblemSection } from './components/homepage/ProblemSection';
import { CinematicExperience } from './components/cinematic/CinematicExperience';

/**
 * TOGGLE MODE HERE (1-Line Reversible Switch):
 * 'cinematic' -> Advanced GSAP ScrollTrigger kinetic text masking & storytelling experience
 * 'classic'   -> Pristine original responsive 2-section layout with standard Navbar
 */
const DEFAULT_MODE: 'cinematic' | 'classic' = 'cinematic';

export const App: React.FC = () => {
  const [mode, setMode] = useState<'cinematic' | 'classic'>(DEFAULT_MODE);

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
          <CinematicExperience />
        ) : (
          <>
            <Hero />
            <ProblemSection />
          </>
        )}
      </main>

      {/* Floating Mode Toggle for Instant A/B Testing */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 bg-black/85 backdrop-blur-md border border-white/20 rounded-full p-1 shadow-2xl text-xs select-none">
        <button
          onClick={() => setMode('cinematic')}
          className={`px-3.5 py-1.5 rounded-full font-bold transition-all ${
            mode === 'cinematic'
              ? 'bg-[#F5B800] text-gray-950 shadow-xs'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Cinematic Scroll 2.0
        </button>
        <button
          onClick={() => setMode('classic')}
          className={`px-3.5 py-1.5 rounded-full font-bold transition-all ${
            mode === 'classic'
              ? 'bg-white text-gray-950 shadow-xs'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Classic Layout
        </button>
      </div>
    </div>
  );
};

export default App;

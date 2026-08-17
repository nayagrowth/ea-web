import React, { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { Hero } from './components/homepage/Hero';
import { ProblemSection } from './components/homepage/ProblemSection';
import { CinematicExperience } from './components/cinematic/CinematicExperience';

/**
 * TOGGLE MODE HERE (1-Line Reversible Switch):
 * 'cinematic' -> Advanced GSAP ScrollTrigger pinned storytelling experience
 * 'classic'   -> Static standard responsive 2-section layout
 */
const DEFAULT_MODE: 'cinematic' | 'classic' = 'cinematic';

export const App: React.FC = () => {
  const [mode, setMode] = useState<'cinematic' | 'classic'>(DEFAULT_MODE);

  return (
    <div className="w-full min-h-screen bg-white text-gray-900 flex flex-col selection:bg-[#F5B800] selection:text-gray-950">
      <Navbar />

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
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-gray-200/90 rounded-full p-1 shadow-lg text-xs select-none">
        <button
          onClick={() => setMode('cinematic')}
          className={`px-3 py-1.5 rounded-full font-bold transition-all ${
            mode === 'cinematic'
              ? 'bg-[#F5B800] text-gray-950 shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Cinematic Scroll 2.0
        </button>
        <button
          onClick={() => setMode('classic')}
          className={`px-3 py-1.5 rounded-full font-bold transition-all ${
            mode === 'classic'
              ? 'bg-[#0F172A] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Classic Layout
        </button>
      </div>
    </div>
  );
};

export default App;

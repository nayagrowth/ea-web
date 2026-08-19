import React, { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { Hero } from './components/homepage/Hero';
import { ProblemSection } from './components/homepage/ProblemSection';
import { CinematicExperience } from './components/cinematic/CinematicExperience';
import { Act2StaticStill } from './components/cinematic/acts/Act2StaticStill';
import type { Act1Variant } from './components/cinematic/CinematicHero';

/**
 * TOGGLE MODE & ACT 1 HERO VARIATION:
 * 'act2-still' -> Direct Frozen Static 3D Act 2 True Renderer (Default for 1:1 Geometry Review)
 * 'cinematic' -> Advanced GSAP ScrollTrigger kinetic storytelling experience
 * 'classic'   -> Pristine original responsive 2-section layout with standard Navbar
 */
const DEFAULT_MODE: 'cinematic' | 'act2-still' | 'classic' = 'cinematic';
const DEFAULT_HERO_VARIANT: Act1Variant = 'columns';

export const App: React.FC = () => {
  const [mode, setMode] = useState<'cinematic' | 'act2-still' | 'classic'>(DEFAULT_MODE);
  const [heroVariant, setHeroVariant] = useState<Act1Variant>(DEFAULT_HERO_VARIANT);
  const [isUiCollapsed, setIsUiCollapsed] = useState(false);

  return (
    <div
      className={`w-full min-h-screen flex flex-col selection:bg-[#F5C200] selection:text-[#001A24] transition-colors duration-300 font-qurova ${
        mode === 'classic' ? 'bg-white text-[#001A24]' : 'bg-[#050608] text-white'
      }`}
    >
      {/* Classic Navbar rendered in Classic Mode */}
      {mode === 'classic' && <Navbar isDarkVariant={false} />}

      <main className="w-full flex flex-col">
        {mode === 'act2-still' && <Act2StaticStill />}
        {mode === 'cinematic' && <CinematicExperience act1Variant={heroVariant} />}
        {mode === 'classic' && (
          <>
            <Hero />
            <ProblemSection />
          </>
        )}
      </main>

      {/* Ultra-Minimalist Floating Navigation Capsule */}
      <aside className="fixed bottom-5 right-5 z-50 flex items-center select-none font-qurova" aria-label="Mode Switcher">
        {isUiCollapsed ? (
          <button
            onClick={() => setIsUiCollapsed(false)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#050608]/85 backdrop-blur-xl border border-white/15 text-[11px] font-semibold text-neutral-300 hover:text-white shadow-2xl hover:border-[#F5C200]/50 transition-all cursor-pointer"
            title="Expand Controls"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5C200]" />
            <span>{mode === 'act2-still' ? 'Act 2 (3D)' : mode === 'cinematic' ? 'Cinematic' : 'Classic'}</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 bg-[#050608]/90 backdrop-blur-2xl border border-white/12 rounded-full p-1 shadow-[0_16px_40px_rgba(0,0,0,0.85)] text-xs">
            {/* Mode Selectors */}
            <button
              onClick={() => setMode('act2-still')}
              className={`px-3 py-1.5 rounded-full font-bold text-[12px] transition-all cursor-pointer ${
                mode === 'act2-still'
                  ? 'bg-[#F5C200] text-[#001A24] shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Act 2 (3D)
            </button>
            <button
              onClick={() => setMode('cinematic')}
              className={`px-3 py-1.5 rounded-full font-bold text-[12px] transition-all cursor-pointer ${
                mode === 'cinematic'
                  ? 'bg-[#F5C200] text-[#001A24] shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Cinematic
            </button>
            <button
              onClick={() => setMode('classic')}
              className={`px-3 py-1.5 rounded-full font-bold text-[12px] transition-all cursor-pointer ${
                mode === 'classic'
                  ? 'bg-white text-[#001A24] shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Classic
            </button>

            {/* Act 1 Hero Switcher in Cinematic Mode */}
            {mode === 'cinematic' && (
              <div className="flex items-center gap-1 pl-1 border-l border-white/10">
                <button
                  onClick={() => setHeroVariant('columns')}
                  title="4-Column Eclipse"
                  className={`px-2 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                    heroVariant === 'columns'
                      ? 'bg-white/20 text-[#F5C200]'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  4-Col
                </button>
                <button
                  onClick={() => setHeroVariant('artboard')}
                  title="Slab Poster"
                  className={`px-2 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                    heroVariant === 'artboard'
                      ? 'bg-white/20 text-[#F5C200]'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Slab
                </button>
                <button
                  onClick={() => setHeroVariant('poster')}
                  title="Poster Frame"
                  className={`px-2 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                    heroVariant === 'poster'
                      ? 'bg-white/20 text-[#F5C200]'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Frame
                </button>
              </div>
            )}

            {/* Minimize Pill */}
            <button
              onClick={() => setIsUiCollapsed(true)}
              className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-white text-[11px] rounded-full hover:bg-white/10 ml-0.5 cursor-pointer"
              title="Minimize Controls"
            >
              −
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { Hero } from './components/homepage/Hero';
import { ProblemSection } from './components/homepage/ProblemSection';
import { CinematicExperience } from './components/cinematic/CinematicExperience';
import { Act2StaticStill } from './components/cinematic/acts/Act2StaticStill';
import type { Act1Variant } from './components/cinematic/CinematicHero';

/**
 * TOGGLE MODE & ACT 1 HERO VARIATION:
 * 'act2-still' -> Direct Frozen Static 3D Act 2 True Renderer (Default for 1:1 Design Review)
 * 'cinematic' -> Advanced GSAP ScrollTrigger kinetic storytelling experience
 * 'classic'   -> Pristine original responsive 2-section layout with standard Navbar
 */
const DEFAULT_MODE: 'cinematic' | 'act2-still' | 'classic' = 'act2-still';
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
      {/* Classic Navbar rendered in Classic Mode and can be toggled */}
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

      {/* Floating Mode & Hero Variation Controller (Collapsible for Design Review) */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center select-none font-qurova">
        {isUiCollapsed ? (
          <button
            onClick={() => setIsUiCollapsed(false)}
            className="px-3.5 py-2 rounded-full bg-[#001A24]/90 backdrop-blur-md border border-[#F5C200]/30 text-[12px] font-bold text-[#F5C200] hover:bg-[#001A24] shadow-xl transition-all"
            title="Expand Controls"
          >
            ⚙ Controls
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-[#001A24]/95 backdrop-blur-xl border border-[#F5C200]/30 rounded-2xl p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-xs">
            {/* Main Experience Mode Toggle */}
            <div className="flex items-center bg-white/10 rounded-xl p-0.5">
              <button
                onClick={() => setMode('act2-still')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  mode === 'act2-still'
                    ? 'bg-[#F5C200] text-[#001A24] shadow-md'
                    : 'text-gray-300 hover:text-white'
                }`}
                title="Direct Frozen Static Act 2 3D Frame"
              >
                Act 2 (3D Still)
              </button>
              <button
                onClick={() => setMode('cinematic')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  mode === 'cinematic'
                    ? 'bg-[#F5C200] text-[#001A24] shadow-md'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Cinematic
              </button>
              <button
                onClick={() => setMode('classic')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  mode === 'classic'
                    ? 'bg-white text-[#001A24] shadow-md'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Classic
              </button>
            </div>

            {/* Act 1 Hero Variation Switcher */}
            {mode === 'cinematic' && (
              <div className="flex items-center gap-1 pl-1 border-l border-white/15">
                <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 px-1">
                  Hero:
                </span>
                <button
                  onClick={() => setHeroVariant('columns')}
                  title="4-Column Architectural Eclipse"
                  className={`px-2.5 py-1.5 rounded-lg font-bold transition-all ${
                    heroVariant === 'columns'
                      ? 'bg-white/20 text-[#F5C200] border border-[#F5C200]/40'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  4-Col Eclipse
                </button>
                <button
                  onClick={() => setHeroVariant('artboard')}
                  title="Editorial Slabs Poster"
                  className={`px-2.5 py-1.5 rounded-lg font-bold transition-all ${
                    heroVariant === 'artboard'
                      ? 'bg-white/20 text-[#F5C200] border border-[#F5C200]/40'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Slab Poster
                </button>
                <button
                  onClick={() => setHeroVariant('poster')}
                  title="Original 3-Row Frame"
                  className={`px-2.5 py-1.5 rounded-lg font-bold transition-all ${
                    heroVariant === 'poster'
                      ? 'bg-white/20 text-[#F5C200] border border-[#F5C200]/40'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Frame
                </button>
              </div>
            )}

            {/* Minimize button */}
            <button
              onClick={() => setIsUiCollapsed(true)}
              className="px-2 py-1 text-gray-400 hover:text-white text-[11px] rounded-lg hover:bg-white/10 ml-0.5"
              title="Hide UI"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

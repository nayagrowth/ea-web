import React from 'react';
import { Navbar } from './components/common/Navbar';
import { Hero } from './components/homepage/Hero';
import { ProblemSection } from './components/homepage/ProblemSection';

export const App: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white text-gray-900 flex flex-col selection:bg-[#F5B800] selection:text-gray-950">
      <Navbar />
      <main className="w-full flex flex-col">
        <Hero />
        <ProblemSection />
      </main>
    </div>
  );
};

export default App;

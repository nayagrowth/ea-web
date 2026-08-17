import React, { useState, useEffect } from 'react';
import { BuildingIcon, CalendarIcon, UsersIcon, Globe3DIcon } from '../common/Icons';

const CITIES = ['Pune', 'Mumbai', 'Dubai'];

export const StatsBar: React.FC = () => {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentCityIndex((prev) => (prev + 1) % CITIES.length);
        setIsAnimating(false);
      }, 350);
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white border border-gray-200/90 rounded-2xl p-3.5 sm:px-4 sm:py-3 shadow-sm grid grid-cols-2 md:grid-cols-4 items-center justify-between gap-3 sm:gap-2 w-full select-none" aria-label="Key Performance Metrics">
      {/* Metric 1: Projects Delivered */}
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FEF8E7] border border-[#FEF08A] flex items-center justify-center text-gray-900 flex-shrink-0">
          <BuildingIcon size={18} />
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-[16px] sm:text-[17px] text-gray-900 leading-tight">459+</span>
          <span className="text-[10.5px] sm:text-[11px] text-gray-500 font-medium whitespace-nowrap">Projects Delivered</span>
        </div>
      </div>

      {/* Metric 2: Years */}
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 sm:border-l sm:border-gray-200 sm:pl-3">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FEF8E7] border border-[#FEF08A] flex items-center justify-center text-gray-900 flex-shrink-0">
          <CalendarIcon size={17} />
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-[16px] sm:text-[17px] text-gray-900 leading-tight">4</span>
          <span className="text-[10.5px] sm:text-[11px] text-gray-500 font-medium whitespace-nowrap">Years of Dominance</span>
        </div>
      </div>

      {/* Metric 3: In-House Team */}
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 sm:border-l sm:border-gray-200 sm:pl-3">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FEF8E7] border border-[#FEF08A] flex items-center justify-center text-gray-900 flex-shrink-0">
          <UsersIcon size={17} />
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-[16px] sm:text-[17px] text-gray-900 leading-tight">25+</span>
          <span className="text-[10.5px] sm:text-[11px] text-gray-500 font-medium whitespace-nowrap">In-House Experts</span>
        </div>
      </div>

      {/* Metric 4: Our Presence - Smooth Sliding City Ticker with True 3D Rotating Globe */}
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 sm:border-l sm:border-gray-200 sm:pl-3">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FEF8E7] border border-[#FEF08A] flex items-center justify-center flex-shrink-0">
          <Globe3DIcon size={19} />
        </div>
        <div className="flex flex-col min-w-0 overflow-hidden">
          <div className="h-5 sm:h-6 flex items-center overflow-hidden">
            <span
              className={`font-extrabold text-[14px] sm:text-[15px] text-gray-900 leading-tight transition-all duration-300 transform ${
                isAnimating ? '-translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
              }`}
            >
              {CITIES[currentCityIndex]}
            </span>
          </div>
          <span className="text-[10.5px] sm:text-[11px] text-gray-500 font-medium whitespace-nowrap">Our Presence</span>
        </div>
      </div>
    </div>
  );
};

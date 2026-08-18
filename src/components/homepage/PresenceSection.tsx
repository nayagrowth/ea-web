import React from 'react';

interface PresenceItem {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
  url?: string;
}

const PRESENCE_ITEMS: PresenceItem[] = [
  {
    id: 'medium',
    name: 'Medium',
    subtitle: 'Articles & Long-form Essays',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
      </svg>
    ),
  },
  {
    id: 'dailyhunt',
    name: 'Dailyhunt',
    subtitle: 'Published Columns & Syndication',
    icon: (
      <span className="font-bold text-xs tracking-tighter uppercase font-qurova border border-current rounded-full px-1 py-0.5 leading-none">
        DH
      </span>
    ),
  },
  {
    id: 'youtube',
    name: 'YouTube',
    subtitle: 'Video Breakdowns & Sales Training',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    id: 'podcast',
    name: 'Podcast',
    subtitle: 'In-depth Founder Conversations',
    icon: (
      <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v7.5a3 3 0 0 1-3 3Z" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    subtitle: 'Daily Strategic Insights & Frameworks',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 0 0 0-2.9 1.45 1.45 0 0 0 0 2.9m1.4 9.74v-8.37H5.06v8.37h2.8z" />
      </svg>
    ),
  },
];

export const PresenceSection: React.FC = () => {
  return (
    <section className="relative w-full py-20 px-4 sm:px-8 md:px-12 lg:px-20 bg-[#FAF7F2] text-[#1A1A1A] overflow-hidden select-none">
      {/* Soft Sunrise / Peach Atmospheric Grain Glow in Top-Left */}
      <div className="absolute top-0 left-0 w-[550px] h-[450px] bg-gradient-to-br from-[#FF9E44]/35 via-[#FF6B6B]/20 to-transparent blur-3xl pointer-events-none -translate-x-12 -translate-y-12" />
      <div className="absolute top-1/4 left-1/3 w-[400px] h-[300px] bg-gradient-to-r from-[#F5C200]/25 via-[#FFA86B]/15 to-transparent blur-2xl pointer-events-none" />

      {/* Main Architectural Outer Frame with Cut-out Corners */}
      <div className="relative max-w-7xl mx-auto border border-[#D8C7B0]/60 rounded-3xl p-8 sm:p-12 md:p-16 bg-[#FDFBF7]/70 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
        
        {/* Corner 4-Point Star Diamonds */}
        <div className="absolute -top-2 -left-2 text-[#C49A45] text-sm">✦</div>
        <div className="absolute -top-2 -right-2 text-[#C49A45] text-sm">✦</div>
        <div className="absolute -bottom-2 -left-2 text-[#C49A45] text-sm">✦</div>
        <div className="absolute -bottom-2 -right-2 text-[#C49A45] text-sm">✦</div>

        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10">
          {/* Left Title Group */}
          <div className="space-y-3">
            <span className="block text-[11px] sm:text-xs font-bold tracking-[0.25em] text-[#C4883A] uppercase font-qurova">
              03 / PRESENCE
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight font-serif text-[#111111] leading-none">
              FEATURED IN<span className="text-[#C4883A]">.</span>
            </h2>
          </div>

          {/* Right Description Group */}
          <div className="max-w-md lg:text-right space-y-2">
            <div className="flex items-center lg:justify-end gap-1.5 text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#C4883A] uppercase font-qurova">
              <span>DIGITAL SIGNATURES</span>
              <span className="text-[10px]">✦</span>
            </div>
            <p className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed font-sans font-light">
              Ideas on sales, buyer psychology, certainty, communication, entrepreneurship and the systems behind better conversations.
            </p>
          </div>
        </div>

        {/* Golden Ornamental Divider with Centered Star */}
        <div className="relative w-full flex items-center justify-center my-6">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#D8C7B0]/80 to-transparent" />
          <div className="absolute bg-[#FDFBF7] px-3 text-[#C49A45] text-xs">
            ✦
          </div>
        </div>

        {/* 5 Column Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-0 pt-6">
          {PRESENCE_ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`relative flex flex-col items-center text-center px-4 py-6 group transition-all duration-300 hover:-translate-y-1 ${
                index < PRESENCE_ITEMS.length - 1 ? 'lg:border-r lg:border-[#D8C7B0]/40' : ''
              }`}
            >
              {/* Midpoint Diamond on Vertical Divider (Desktop) */}
              {index < PRESENCE_ITEMS.length - 1 && (
                <div className="hidden lg:block absolute -right-[4px] top-1/2 -translate-y-1/2 text-[#C49A45]/60 text-[8px]">
                  ✦
                </div>
              )}

              {/* Icon Circle */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-b from-[#F7EFE3] to-[#EFE4D2] border border-[#D8C7B0]/60 flex items-center justify-center text-[#1E1E1E] shadow-sm mb-4 group-hover:border-[#C4883A] group-hover:shadow-[0_0_15px_rgba(196,136,58,0.2)] transition-all">
                {item.icon}
              </div>

              {/* Publication / Platform Name */}
              <h3 className="text-lg sm:text-xl font-medium font-serif text-[#111111] mb-1">
                {item.name}
              </h3>

              {/* Subtitle / Focus */}
              <p className="text-xs sm:text-[13px] text-[#666666] leading-snug font-sans font-light max-w-[160px]">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

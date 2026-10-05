import React, { useState } from 'react';
import { Camera, ZoomIn, Eye, ShieldCheck } from 'lucide-react';
import { GalleryPhoto } from '../types';

interface GallerySectionProps {
  photos: GalleryPhoto[];
  onOpenLightbox: (photo: GalleryPhoto) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ photos, onOpenLightbox }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Humanitarian Activities',
    'Education',
    'Healthcare',
    'Food Distribution',
    'Ramadan',
    'Community Development',
    'Events',
  ];

  const filtered =
    activeCategory === 'All'
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  return (
    <section className="py-20 bg-stone-50 border-b border-stone-200" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-800">
            Visual Field Records
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
            Humanitarian Gallery
          </h2>
          <div className="w-12 h-1 bg-amber-500 mx-auto mt-3 rounded-full" />
          <p className="text-stone-600 text-sm mt-4 leading-relaxed">
            Moments of solidarity, relief mobilization, borehole installations, and educational outreach in Potiskum and Yobe State communities.
          </p>

          {/* Category Tabs (Segmented control) */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-8 p-1.5 bg-stone-200/70 rounded-lg max-w-fit mx-auto border border-stone-300/60">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-white/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenLightbox(item)}
              className="group relative bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-lg border border-stone-200 cursor-pointer transition-all aspect-4/3"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />

              {/* Hover overlay with zoom affordance */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-5 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-amber-300 font-semibold">
                    {item.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="font-serif text-base font-bold text-white mt-1 leading-snug">
                  {item.title}
                </h4>
                <p className="text-[11px] text-stone-200 mt-1 line-clamp-1">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Ethical Photography Notice */}
        <div className="mt-10 p-3 bg-white rounded-lg border border-stone-200 flex items-center justify-center gap-2 text-xs text-stone-500 text-center max-w-xl mx-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Beneficiary privacy is preserved; photographs reflect dignified community participation.</span>
        </div>
      </div>
    </section>
  );
};

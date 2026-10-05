import React, { useState } from 'react';
import { ArrowRight, Calendar, MapPin, X, Heart } from 'lucide-react';
import { SuccessStory } from '../types';

interface SuccessStoriesSectionProps {
  stories: SuccessStory[];
  onOpenDonate: () => void;
}

export const SuccessStoriesSection: React.FC<SuccessStoriesSectionProps> = ({
  stories,
  onOpenDonate,
}) => {
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);

  return (
    <section className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-800">
            Real Lives Touched
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
            Stories of Hope
          </h2>
          <div className="w-12 h-1 bg-amber-500 mx-auto mt-3 rounded-full" />
          <p className="text-stone-600 text-sm mt-4 leading-relaxed">
            Behind every number is a human life, a restored smile, and a resilient household in Potiskum empowered through your support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-[#faf8f4] rounded-xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-16/10 relative overflow-hidden bg-stone-200">
                  <img
                    src={story.imageUrl}
                    alt={story.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-emerald-950/80 backdrop-blur-xs text-amber-300 text-[11px] font-medium rounded">
                      {story.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Unboxed metadata */}
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-700" />
                      {story.location}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-emerald-700" />
                      {story.date}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-emerald-950 transition-colors leading-snug">
                    {story.title}
                  </h3>

                  <p className="text-xs text-stone-600 mt-2.5 leading-relaxed line-clamp-3">
                    {story.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedStory(story)}
                  className="w-full py-2 px-3 border border-emerald-800/30 text-emerald-900 hover:bg-emerald-900 hover:text-white rounded-md text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Read Full Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Reader Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="relative aspect-16/9 bg-stone-900">
              <img
                src={selectedStory.imageUrl}
                alt={selectedStory.imageAlt}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 bg-emerald-900 text-amber-300 text-xs font-semibold rounded">
                  {selectedStory.category}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="text-xs text-stone-500 flex items-center gap-2">
                <span>{selectedStory.location}</span>
                <span>·</span>
                <span>{selectedStory.date}</span>
                <span>·</span>
                <span className="text-amber-700 font-medium">Beneficiary Dignity Preserved</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-stone-900">
                {selectedStory.title}
              </h3>

              <div className="text-stone-700 text-sm leading-relaxed space-y-3 pt-2">
                <p>{selectedStory.fullStory}</p>
                <p className="text-xs text-stone-500 italic border-l-2 border-amber-500 pl-3">
                  Names or identifying details are respectfully presented to uphold beneficiary dignity in accordance with Islamic humanitarian ethics.
                </p>
              </div>

              <div className="pt-6 border-t border-stone-200 flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedStory(null);
                    onOpenDonate();
                  }}
                  className="px-5 py-2.5 bg-emerald-800 text-amber-300 hover:bg-emerald-900 rounded-md text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <Heart className="w-3.5 h-3.5 fill-amber-300" />
                  Support Similar Interventions
                </button>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

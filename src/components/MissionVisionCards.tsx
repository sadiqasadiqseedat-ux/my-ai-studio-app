import React from 'react';
import { Compass, Eye, HeartHandshake, ShieldCheck } from 'lucide-react';

interface MissionVisionCardsProps {
  onLearnMore?: () => void;
}

export const MissionVisionCards: React.FC<MissionVisionCardsProps> = ({ onLearnMore }) => {
  return (
    <section className="py-20 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-800">
            Guiding Principles
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
            Our Mission & Vision
          </h2>
          <div className="w-12 h-1 bg-amber-500 mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Mission */}
          <div className="relative bg-white rounded-2xl p-8 sm:p-10 shadow-md border border-stone-200/90 flex flex-col justify-between overflow-hidden group hover:border-emerald-700/50 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-0 opacity-50" />

            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-900 text-amber-400 flex items-center justify-center shadow-xs">
                <Compass className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Purpose & Mandate
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                  Our Mission
                </h3>
              </div>

              <blockquote className="text-stone-700 text-base sm:text-lg italic font-serif leading-relaxed border-l-2 border-amber-500 pl-4 py-1">
                “To serve humanity with compassion, integrity and professionalism by supporting vulnerable people, strengthening communities and implementing sustainable humanitarian and development initiatives inspired by Islamic values.”
              </blockquote>

              <p className="text-stone-600 text-xs leading-relaxed pt-2">
                We translate empathy into structured relief, ensuring that every naira donated is handled with unwavering Islamic accountability (Amanah) and targeted impact.
              </p>
            </div>

            <div className="relative z-10 pt-6 mt-6 border-t border-stone-100 flex items-center gap-2 text-xs font-semibold text-emerald-800">
              <HeartHandshake className="w-4 h-4 text-emerald-600" />
              <span>Dedicated to Grassroots Relief in Yobe State</span>
            </div>
          </div>

          {/* Card 2: Vision */}
          <div className="relative bg-white rounded-2xl p-8 sm:p-10 shadow-md border border-stone-200/90 flex flex-col justify-between overflow-hidden group hover:border-amber-600/50 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -z-0 opacity-50" />

            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#043327] text-amber-400 flex items-center justify-center shadow-xs">
                <Eye className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  Future Horizon
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                  Our Vision
                </h3>
              </div>

              <blockquote className="text-stone-700 text-base sm:text-lg italic font-serif leading-relaxed border-l-2 border-emerald-700 pl-4 py-1">
                “To build stronger, healthier and more empowered communities where vulnerable people are treated with dignity and every individual has the opportunity to live a better and meaningful life.”
              </blockquote>

              <p className="text-stone-600 text-xs leading-relaxed pt-2">
                We envision a society where poverty does not extinguish human potential, where orphans thrive in dignity, and where clean water and education empower generations.
              </p>
            </div>

            <div className="relative z-10 pt-6 mt-6 border-t border-stone-100 flex items-center gap-2 text-xs font-semibold text-amber-800">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Sustainable Community Empowerment</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Heart, ArrowRight, ChevronDown, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { OrganizationConfig } from '../types';
import { heroImg } from '../data/mockData';

interface HeroSectionProps {
  config: OrganizationConfig;
  onOpenDonate: () => void;
  onExploreWork: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  onOpenDonate,
  onExploreWork,
}) => {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-stone-950 font-sans">
      {/* Background Image with optimized dark emerald gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Humanitarian community outreach and volunteer support in Potiskum, Nigeria"
          className="w-full h-full object-cover object-center scale-102"
          referrerPolicy="no-referrer"
        />
        {/* Measured Scrim & Islamic Emerald Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#021f17]/95 via-[#032e22]/85 to-[#043d2e]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:28px_28px] opacity-15" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Trust pill / Kicker - clean unboxed typography */}
        <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 backdrop-blur-sm text-xs text-amber-300 font-medium">
          <span className="font-arabic text-sm text-amber-300">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
          <span className="text-emerald-500">·</span>
          <span className="flex items-center gap-1 text-emerald-100">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            Potiskum, Yobe State
          </span>
        </div>

        {/* Subdued Organization Pre-title */}
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-emerald-200/90 mb-3 max-w-xl">
          {config.name}
        </p>

        {/* Primary Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight max-w-4xl text-balance">
          Serving Humanity Through{' '}
          <span className="text-amber-400 italic">Faith, Compassion</span> and Action.
        </h1>

        {/* Supporting text */}
        <p className="mt-6 text-sm sm:text-lg text-emerald-100/90 max-w-2xl font-light leading-relaxed">
          Committed to supporting vulnerable individuals, strengthening communities and creating meaningful opportunities through Islamic values, humanitarian service and sustainable development.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onOpenDonate}
            className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-stone-950 font-bold text-sm tracking-wider uppercase rounded-md shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 border border-amber-400"
          >
            <Heart className="w-4 h-4 fill-stone-950" />
            <span>DONATE NOW</span>
          </button>

          <button
            onClick={onExploreWork}
            className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white font-semibold text-sm tracking-wider uppercase rounded-md backdrop-blur-sm border border-emerald-300/30 transition-all flex items-center justify-center gap-2"
          >
            <span>EXPLORE OUR WORK</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </button>
        </div>

        {/* Trust Statement Bar */}
        <div className="mt-14 pt-6 border-t border-emerald-700/40 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-medium text-emerald-200/90">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Faith
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Compassion
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Service
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Measurable Impact
          </span>
        </div>

        {/* Scroll-down Indicator */}
        <div className="mt-8 text-emerald-300/60 animate-bounce">
          <ChevronDown className="w-5 h-5 mx-auto" />
        </div>
      </div>
    </section>
  );
};

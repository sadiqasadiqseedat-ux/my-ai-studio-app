import React from 'react';
import { ArrowRight, Heart, Shield, Users, Target, CheckCircle2 } from 'lucide-react';
import { aboutImg } from '../data/mockData';

interface WhoWeArePreviewProps {
  onReadMore: () => void;
}

export const WhoWeArePreview: React.FC<WhoWeArePreviewProps> = ({ onReadMore }) => {
  return (
    <section className="py-20 bg-[#faf8f4] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Authentic Humanitarian Photography with subtle Islamic arch curve */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200 bg-stone-100 aspect-4/3 sm:aspect-16/11">
              <img
                src={aboutImg}
                alt="Educational and community empowerment circle in northern Nigeria"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent" />

              {/* Dignified location overlay card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-emerald-900/10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-800">
                    Community Focus
                  </p>
                  <p className="font-serif font-bold text-stone-900 text-sm">
                    Potiskum & Yobe State Grassroots
                  </p>
                </div>
                <span className="text-xs text-amber-700 font-semibold px-2.5 py-1 bg-amber-50 rounded-full border border-amber-200">
                  Dignity First
                </span>
              </div>
            </div>

            {/* Decorative background accent */}
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-emerald-100 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-amber-100 rounded-full blur-2xl -z-10" />
          </div>

          {/* Right Column: Introduction & Values */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-widest">
                <span className="w-6 h-0.5 bg-amber-500" />
                <span>About Our Foundation</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
                Who We Are
              </h2>
            </div>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              <strong>Zanjabeel Islamic Charity and Humanitarian Foundation</strong> is a faith-inspired humanitarian non-profit founded in Potiskum, Yobe State, Nigeria. We are firmly committed to uplifting indigent individuals, protecting orphans, alleviating poverty, expanding access to beneficial education, and delivering urgent relief to vulnerable households.
            </p>

            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Rooted in the timeless Qur’anic ethos of universal brotherhood, stewardship, and selfless mercy, our interventions prioritize the honor and privacy of every recipient, ensuring aid fosters long-term community self-reliance.
            </p>

            {/* Four Key Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 bg-white rounded-lg border border-stone-200 shadow-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-stone-900">Compassion</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">Empathetic support for every person in need.</p>
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-lg border border-stone-200 shadow-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-stone-900">Integrity</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">Rigorous financial stewardship and Amanah.</p>
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-lg border border-stone-200 shadow-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-stone-900">Community</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">Strengthening grassroots neighborhood bonds.</p>
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-lg border border-stone-200 shadow-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                  <Target className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-stone-900">Impact</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">Measurable, long-lasting transformation.</p>
                </div>
              </div>
            </div>

            {/* Read More Button */}
            <div className="pt-2">
              <button
                onClick={onReadMore}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-900 hover:bg-emerald-950 text-white font-medium text-xs rounded-md shadow-xs transition-colors"
              >
                <span>Read Full Foundation Overview</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

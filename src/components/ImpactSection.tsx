import React from 'react';
import { Users, Home, GraduationCap, Utensils, MapPin, Info } from 'lucide-react';
import { ImpactStat } from '../types';

interface ImpactSectionProps {
  impactStats: ImpactStat[];
  onExploreReports: () => void;
}

export const ImpactSection: React.FC<ImpactSectionProps> = ({ impactStats, onExploreReports }) => {
  return (
    <section className="py-20 bg-[#faf8f4] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-800">
            Measurable Footprint
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
            Our Impact
          </h2>
          <div className="w-12 h-1 bg-amber-500 mx-auto mt-3 rounded-full" />
          <p className="text-stone-600 text-sm mt-4 leading-relaxed">
            Every initiative is guided by direct grassroots assessment and rigorous follow-up in Potiskum and Yobe State communities.
          </p>
        </div>

        {/* Impact Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {impactStats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white rounded-xl p-6 border border-stone-200 shadow-xs hover:border-emerald-800/40 transition-all text-center flex flex-col justify-between"
            >
              <div>
                <p className="font-mono text-3xl sm:text-4xl font-bold text-emerald-950 tracking-tight tabular-nums">
                  {stat.metric}
                </p>
                <h4 className="font-serif text-sm sm:text-base font-semibold text-stone-800 mt-2">
                  {stat.label}
                </h4>
              </div>

              <p className="text-[11px] text-stone-500 mt-3 pt-3 border-t border-stone-100 leading-normal">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Verification & Transparency Disclaimer Notice */}
        <div className="mt-10 p-4 bg-stone-100 rounded-lg border border-stone-200 flex items-start gap-3 text-xs text-stone-600 max-w-3xl mx-auto">
          <Info className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-stone-800">Official Data Note:</strong> All numeric indicators above are designated with standard humanitarian placeholders (<span className="font-mono">[000+]</span>) pending ongoing validation of current year audited field records. Zanjabeel Foundation is dedicated to complete empirical integrity.
          </div>
        </div>
      </div>
    </section>
  );
};

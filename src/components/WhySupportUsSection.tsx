import React from 'react';
import { Compass, Users, Heart, ShieldCheck, Sprout, Network } from 'lucide-react';

export const WhySupportUsSection: React.FC = () => {
  const reasons = [
    {
      icon: Compass,
      title: 'Faith-Driven Service',
      desc: 'Our work is inspired by compassion, responsibility, and timeless Islamic values of selfless devotion (Ikhlas) and universal mercy.',
    },
    {
      icon: Users,
      title: 'Community Focused',
      desc: 'We respond directly to genuine grassroots community needs, consulting closely with traditional leaders, elders, and families in Potiskum.',
    },
    {
      icon: Heart,
      title: 'Dignity First',
      desc: 'We support beneficiaries respectfully, strictly safeguarding their honor, privacy, and personal dignity without discrimination.',
    },
    {
      icon: ShieldCheck,
      title: 'Transparent Approach',
      desc: 'We promote responsible stewardship of charitable resources (Amanah), maintaining open reporting and verifiable project tracking.',
    },
    {
      icon: Sprout,
      title: 'Sustainable Impact',
      desc: 'Rather than short-term dependency, we seek solutions—such as deep boreholes, vocational toolkits, and education—that yield generational benefits.',
    },
    {
      icon: Network,
      title: 'Collective Action',
      desc: 'We believe enduring transformation is realized through sincere partnership with community groups, ethical donors, and public institutions.',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-800">
            Institutional Values
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
            Why Support Zanjabeel?
          </h2>
          <div className="w-12 h-1 bg-amber-500 mx-auto mt-3 rounded-full" />
          <p className="text-stone-600 text-sm mt-4 leading-relaxed">
            When you entrust your Sadaqah, Zakat, or charitable donation to Zanjabeel Foundation, you partner with a disciplined, transparent team on the ground.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <div
                key={i}
                className="p-6 bg-[#faf8f4] rounded-xl border border-stone-200 shadow-xs hover:border-emerald-800/40 hover:shadow-md transition-all group"
              >
                <div className="w-11 h-11 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-emerald-800 group-hover:bg-emerald-900 group-hover:text-amber-400 group-hover:border-emerald-900 transition-colors mb-4 shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-emerald-950 transition-colors">
                  {r.title}
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {r.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Heart, UserPlus, Handshake, BookmarkCheck, ArrowRight } from 'lucide-react';

interface HowYouCanHelpSectionProps {
  onOpenDonate: () => void;
  onOpenVolunteer: () => void;
  onOpenPartner: () => void;
  onSponsorProject: () => void;
}

export const HowYouCanHelpSection: React.FC<HowYouCanHelpSectionProps> = ({
  onOpenDonate,
  onOpenVolunteer,
  onOpenPartner,
  onSponsorProject,
}) => {
  const options = [
    {
      title: 'Donate',
      desc: 'Support humanitarian programs financially through verified Sadaqah, Zakat, or general relief contributions.',
      btnLabel: 'Donate Now',
      action: onOpenDonate,
      icon: Heart,
      highlight: true,
    },
    {
      title: 'Volunteer',
      desc: 'Offer your time, medical skills, teaching expertise, or administrative experience on the ground in Potiskum.',
      btnLabel: 'Join Volunteer Corps',
      action: onOpenVolunteer,
      icon: UserPlus,
      highlight: false,
    },
    {
      title: 'Partner',
      desc: 'Collaborate with the Foundation as an NGO, business, institution, or donor network on impactful initiatives.',
      btnLabel: 'Become a Partner',
      action: onOpenPartner,
      icon: Handshake,
      highlight: false,
    },
    {
      title: 'Sponsor a Project',
      desc: 'Underwrite a specific borehole, school rehabilitation, orphan classroom, or medical outreach in your chosen name.',
      btnLabel: 'Sponsor Project',
      action: onSponsorProject,
      icon: BookmarkCheck,
      highlight: false,
    },
  ];

  return (
    <section className="py-20 bg-stone-100/70 border-b border-stone-200" id="get-involved-preview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-800">
            Participation & Solidarity
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
            How You Can Help
          </h2>
          <div className="w-12 h-1 bg-amber-500 mx-auto mt-3 rounded-full" />
          <p className="text-stone-600 text-sm mt-4 leading-relaxed">
            There are multiple ways to turn your noble intention into active relief for communities across Potiskum and Yobe State.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {options.map((opt, i) => {
            const Icon = opt.icon;
            return (
              <div
                key={i}
                className={`rounded-xl p-6 border transition-all flex flex-col justify-between ${
                  opt.highlight
                    ? 'bg-emerald-900 text-white border-emerald-950 shadow-md'
                    : 'bg-white text-stone-800 border-stone-200 shadow-xs hover:border-emerald-800/40'
                }`}
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                      opt.highlight
                        ? 'bg-emerald-800 text-amber-400 border border-emerald-700'
                        : 'bg-emerald-50 text-emerald-800 border border-stone-100'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3
                    className={`font-serif text-xl font-bold mb-2 ${
                      opt.highlight ? 'text-white' : 'text-stone-900'
                    }`}
                  >
                    {opt.title}
                  </h3>

                  <p
                    className={`text-xs leading-relaxed ${
                      opt.highlight ? 'text-emerald-100/90' : 'text-stone-600'
                    }`}
                  >
                    {opt.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-stone-100/30">
                  <button
                    onClick={opt.action}
                    className={`w-full py-2.5 px-4 rounded-md text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                      opt.highlight
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold'
                        : 'bg-emerald-800 hover:bg-emerald-900 text-amber-300'
                    }`}
                  >
                    <span>{opt.btnLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

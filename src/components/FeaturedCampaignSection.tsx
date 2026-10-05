import React from 'react';
import { Heart, Users, Target, CheckCircle2, Droplets, ArrowRight } from 'lucide-react';
import { CampaignItem } from '../types';

interface FeaturedCampaignSectionProps {
  campaign: CampaignItem;
  onOpenDonate: () => void;
}

export const FeaturedCampaignSection: React.FC<FeaturedCampaignSectionProps> = ({
  campaign,
  onOpenDonate,
}) => {
  return (
    <section className="py-20 bg-[#032e22] text-white relative overflow-hidden font-sans">
      {/* Decorative Islamic geometric pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
            Featured Humanitarian Project
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-1">
            Together, We Can Make a Difference
          </h2>
          <div className="w-12 h-1 bg-amber-400 mx-auto mt-3 rounded-full" />
        </div>

        {/* Featured Campaign Container */}
        <div className="bg-[#02231a] rounded-2xl border border-emerald-800/80 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left: Large High-Resolution Humanitarian Photography */}
          <div className="lg:col-span-6 relative aspect-16/10 sm:aspect-auto">
            <img
              src={campaign.imageUrl}
              alt={campaign.imageAlt}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02231a] via-transparent to-transparent lg:hidden" />

            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-emerald-900/90 border border-amber-500/40 text-amber-300 text-xs font-semibold rounded-md backdrop-blur-sm shadow-xs">
                Sadaqah Jariyah
              </span>
            </div>
          </div>

          {/* Right: Campaign Details & Donation Tracker */}
          <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="text-xs text-amber-300/90 font-medium">
                Potiskum LGA · Clean Water Access
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                {campaign.title}
              </h3>

              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                {campaign.description}
              </p>

              {/* Progress Bar & Numerical Metrics (Placeholders clearly designated) */}
              <div className="pt-2 space-y-3 bg-[#033627] p-5 rounded-xl border border-emerald-800/70">
                <div className="flex items-center justify-between text-xs font-medium text-emerald-200">
                  <span>Funding Trajectory</span>
                  <span className="text-amber-300 font-bold">{campaign.progressPercent}% Mobilized</span>
                </div>

                {/* Progress bar line */}
                <div className="w-full h-3 bg-emerald-950 rounded-full overflow-hidden p-0.5 border border-emerald-900">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full transition-all duration-500"
                    style={{ width: `${campaign.progressPercent}%` }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 text-center border-t border-emerald-900/70">
                  <div className="p-2">
                    <p className="text-[10px] uppercase text-emerald-300/80 font-medium">Campaign Target</p>
                    <p className="font-mono text-xs sm:text-sm font-bold text-white mt-0.5">
                      {campaign.targetAmountPlaceholder}
                    </p>
                  </div>
                  <div className="p-2 border-x border-emerald-900/70">
                    <p className="text-[10px] uppercase text-emerald-300/80 font-medium">Verified Raised</p>
                    <p className="font-mono text-xs sm:text-sm font-bold text-amber-300 mt-0.5">
                      {campaign.raisedAmountPlaceholder}
                    </p>
                  </div>
                  <div className="p-2">
                    <p className="text-[10px] uppercase text-emerald-300/80 font-medium">Beneficiaries</p>
                    <p className="font-mono text-xs sm:text-sm font-bold text-white mt-0.5">
                      {campaign.beneficiariesPlaceholder}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Campaign Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={onOpenDonate}
                className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs tracking-wider uppercase rounded-md shadow-lg transition-all flex items-center justify-center gap-2 border border-amber-400"
              >
                <Heart className="w-4 h-4 fill-stone-950" />
                <span>DONATE TO THIS CAMPAIGN</span>
              </button>

              <span className="text-[11px] text-emerald-300/70 text-center sm:text-left">
                100% of designated contributions go directly to local well construction and water filters.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

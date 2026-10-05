import React from 'react';
import { Building, ShieldCheck, Handshake, Quote } from 'lucide-react';
import { PartnerItem, Testimonial } from '../types';

interface PartnersSectionProps {
  partners: PartnerItem[];
  onOpenPartnerInquiry: () => void;
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({
  partners,
  onOpenPartnerInquiry,
}) => {
  return (
    <section className="py-20 bg-stone-100/60 border-b border-stone-200" id="partners">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-800">
            Institutional Collaboration
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
            Our Partners & Supporters
          </h2>
          <div className="w-12 h-1 bg-amber-500 mx-auto mt-3 rounded-full" />
          <p className="text-stone-600 text-sm mt-4 leading-relaxed">
            We collaborate with reputable community organizations, health bodies, and philanthropic partners to amplify humanitarian impact across Yobe State.
          </p>
        </div>

        {/* Professional Partner Grid with Clearly Designated Placeholders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-xl p-6 border border-stone-200/90 shadow-xs hover:border-emerald-800/40 text-center flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
                  <Building className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-sm font-bold text-stone-900 leading-tight">
                  {partner.name}
                </h4>
                <p className="text-[11px] font-medium text-emerald-800 uppercase tracking-wider mt-1">
                  {partner.type}
                </p>
                <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                  {partner.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 text-[10px] text-stone-400 uppercase tracking-wider">
                Authorized Partnership
              </div>
            </div>
          ))}
        </div>

        {/* Partnership Invitation Box */}
        <div className="mt-12 p-6 bg-white rounded-xl border border-stone-200 max-w-2xl mx-auto text-center space-y-3">
          <h4 className="font-serif text-lg font-bold text-stone-900">
            Interested in Partnering With Zanjabeel Foundation?
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed max-w-lg mx-auto">
            We welcome collaborations with civic organizations, development agencies, and corporate foundations committed to transparent, faith-inspired humanitarian service.
          </p>
          <button
            onClick={onOpenPartnerInquiry}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-amber-300 font-semibold text-xs rounded-md shadow-xs transition-colors"
          >
            <Handshake className="w-4 h-4" />
            Submit Partnership Inquiry
          </button>
        </div>
      </div>
    </section>
  );
};

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-800">
            Community Voices
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
            What People Say
          </h2>
          <div className="w-12 h-1 bg-amber-500 mx-auto mt-3 rounded-full" />
          <p className="text-stone-600 text-sm mt-4 leading-relaxed">
            Testimonials from respected community elders, educators, and supporters in Potiskum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#faf8f4] rounded-xl p-8 border border-stone-200 shadow-xs flex flex-col justify-between relative group hover:border-emerald-800/40 transition-all"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-amber-500/40" />
                <p className="text-stone-700 text-xs sm:text-sm italic leading-relaxed font-serif">
                  “{t.quote}”
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200">
                <h5 className="font-bold text-xs text-stone-900">{t.name}</h5>
                <p className="text-[11px] text-emerald-800 font-medium">{t.role}</p>
                <p className="text-[10px] text-stone-500">{t.community}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Note */}
        <div className="mt-8 text-center text-xs text-stone-400">
          * Testimonials preserve authentic community relationships; identifying titles are maintained for verification.
        </div>
      </div>
    </section>
  );
};

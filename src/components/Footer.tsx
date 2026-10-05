import React from 'react';
import { MapPin, Phone, Mail, MessageCircle, ShieldCheck, Heart, ArrowUp } from 'lucide-react';
import { OrganizationConfig } from '../types';

interface FooterProps {
  config: OrganizationConfig;
  onNavigate: (tab: string, programId?: string) => void;
  onOpenDonate: () => void;
  onOpenAdmin?: () => void;
  onOpenReceiptPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onNavigate, onOpenDonate, onOpenAdmin, onOpenReceiptPortal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#03281e] text-stone-300 border-t border-emerald-950 font-sans">
      {/* Decorative Islamic border ribbon */}
      <div className="h-1.5 bg-gradient-to-r from-emerald-800 via-amber-500 to-emerald-800" />

      {/* Main 4-column footer body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Organization Identity & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-900 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L14.4 7.6L20.4 8.5L16 12.8L17 18.8L12 16.2L7 18.8L8 12.8L3.6 8.5L9.6 7.6L12 2Z" />
                </svg>
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-white tracking-wide">
                  ZANJABEEL
                </h4>
                <p className="text-[10px] uppercase tracking-wider text-amber-400/90 font-semibold">
                  Charity & Humanitarian Foundation
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-300/80 leading-relaxed">
              An Islamic humanitarian organization based in Potiskum, Yobe State, Nigeria, dedicated to serving vulnerable individuals, alleviating hardship, and advancing sustainable community development.
            </p>

            <div className="p-3 bg-emerald-950/60 rounded-md border border-emerald-900/60 text-xs text-emerald-200/90">
              <p className="font-arabic text-amber-300 text-sm mb-1">وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ</p>
              <p className="text-[11px] italic text-stone-300/90">
                “And cooperate in righteousness and piety.” — (Surah Al-Ma&apos;idah 5:2)
              </p>
            </div>

            {/* Social Media Placeholders */}
            <div className="pt-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-300/80 mb-2">
                Official Channels
              </p>
              <div className="flex items-center gap-2 text-xs">
                {['Facebook', 'X', 'Instagram', 'YouTube', 'TikTok'].map((platform) => (
                  <span
                    key={platform}
                    className="px-2 py-1 bg-emerald-950/80 border border-emerald-900/80 rounded text-[10px] text-stone-300 hover:text-amber-300 transition-colors cursor-pointer"
                    title={`Official ${platform} account: [PENDING VERIFIED URL]`}
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4 border-b border-emerald-900/60 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('mission')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Mission & Vision
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('programs')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Our Programs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('impact')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Our Impact
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Photo Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('news')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  News & Updates
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('get-involved')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Volunteer & Partner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
              {onOpenReceiptPortal && (
                <li>
                  <button
                    onClick={onOpenReceiptPortal}
                    className="text-amber-300 hover:text-white transition-colors text-left font-semibold flex items-center gap-1.5"
                  >
                    <span>🖨️ Track Code / Print Receipt</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Core Programs */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4 border-b border-emerald-900/60 pb-2">
              Our Programs
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <button
                  onClick={() => onNavigate('programs', 'orphans-vulnerable')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Orphans & Vulnerable Persons
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('programs', 'education-support')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Education Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('programs', 'healthcare-support')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Healthcare Outreach
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('programs', 'food-basic-needs')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Food & Basic Sustenance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('programs', 'water-sanitation')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Water & Sanitation (WASH)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('programs', 'ramadan-eid-support')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Ramadan & Eid Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('programs', 'emergency-relief')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Emergency Relief
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('programs', 'community-development')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Community Development
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Contact & Verification Notice */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4 border-b border-emerald-900/60 pb-2">
              Contact & Location
            </h4>

            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Potiskum, Yobe State, Nigeria</p>
                  <p className="text-[11px] text-stone-400">{config.addressPlaceholder}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-stone-300">{config.phonePlaceholder}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-stone-300">{config.emailPlaceholder}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-[11px] text-stone-400">{config.registrationNumberPlaceholder}</span>
              </div>
            </div>

            {/* Verification Caution Box */}
            <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-md text-[11px] text-amber-200/90 leading-normal">
              <strong className="text-amber-300 block mb-0.5">Donation Safety Notice:</strong>
              Please verify official donation accounts through our authorized contact channels before initiating any bank transfer.
            </div>

            <button
              onClick={onOpenDonate}
              className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-md shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Heart className="w-3.5 h-3.5 fill-slate-950" />
              Support A Project
            </button>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="mt-12 pt-6 border-t border-emerald-950 flex flex-col md:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>
            <button
              type="button"
              onClick={onOpenAdmin}
              className="text-stone-400 hover:text-stone-300 transition-colors cursor-default focus:outline-hidden"
              title=""
            >
              © 2026
            </button>{' '}
            Zanjabeel Islamic Charity and Humanitarian Foundation, Potiskum. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => onNavigate('privacy')}
              className="hover:text-amber-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-stone-600">·</span>
            <button
              onClick={() => onNavigate('terms')}
              className="hover:text-amber-300 transition-colors"
            >
              Terms of Use
            </button>
            <span className="text-stone-600">·</span>
            <button
              onClick={() => onNavigate('donation-policy')}
              className="hover:text-amber-300 transition-colors"
            >
              Donation Policy
            </button>
            {onOpenAdmin && (
              <>
                <span className="text-stone-600">·</span>
                <button
                  onClick={onOpenAdmin}
                  className="text-stone-500 hover:text-stone-400 transition-colors"
                  title="Secretariat"
                >
                  Secretariat
                </button>
              </>
            )}
            <span className="text-stone-600">·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-amber-300 transition-colors"
              title="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

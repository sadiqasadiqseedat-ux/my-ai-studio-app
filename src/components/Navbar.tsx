import React, { useState } from 'react';
import { Menu, X, Heart, Shield, Phone, Mail, MapPin, FileText, Printer } from 'lucide-react';
import { OrganizationConfig } from '../types';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, programId?: string) => void;
  config: OrganizationConfig;
  onOpenDonate: () => void;
  onOpenAdmin: () => void;
  onOpenReceiptPortal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  config,
  onOpenDonate,
  onOpenAdmin,
  onOpenReceiptPortal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'mission', label: 'Mission & Vision' },
    { id: 'programs', label: 'Our Programs' },
    { id: 'impact', label: 'Our Impact' },
    { id: 'campaigns', label: 'Campaigns' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'news', label: 'News & Updates' },
    { id: 'get-involved', label: 'Get Involved' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tabId: string) => {
    onNavigate(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Islamic Trust & Utility Bar */}
      <div className="bg-[#043327] text-emerald-100/90 text-xs border-b border-emerald-900/60 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onOpenAdmin}
              className="font-arabic text-amber-300 text-sm tracking-wide hover:text-amber-200 transition-colors text-left cursor-default focus:outline-hidden"
              title="بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </button>
            <span className="text-emerald-300/40">|</span>
            <span className="flex items-center gap-1.5 text-emerald-200/90">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Potiskum, Yobe State, Nigeria
            </span>
            <span className="text-emerald-300/40">|</span>
            <span className="flex items-center gap-1.5 text-emerald-200/90">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              {config.emailPlaceholder}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              onClick={onOpenReceiptPortal}
              className="text-amber-300/90 hover:text-white flex items-center gap-1 transition-colors"
              title="Track donation code and print payment invoice or confirmed receipt"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Receipt / Invoice Lookup</span>
            </button>
            <span className="text-emerald-500/40">|</span>
            {/* Disguised Secretariat Desk access */}
            <button
              onClick={onOpenAdmin}
              className="text-emerald-300/60 hover:text-emerald-100 text-[11px] transition-colors"
              title="Official Secretariat Desk"
            >
              Secretariat Desk
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Zone 1: Single Brand Wordmark / Emblem Lockup */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left group focus:outline-hidden"
              aria-label="Go to homepage"
            >
              <div className="w-11 h-11 rounded-lg bg-emerald-900 flex items-center justify-center text-amber-400 shadow-sm border border-emerald-800 transition-transform group-hover:scale-105">
                {/* Islamic Star / Crescent stylized insignia */}
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L14.4 7.6L20.4 8.5L16 12.8L17 18.8L12 16.2L7 18.8L8 12.8L3.6 8.5L9.6 7.6L12 2Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold tracking-tight text-emerald-950 font-serif leading-tight">
                  ZANJABEEL
                </span>
                <span className="text-[10px] tracking-wider text-emerald-800 font-semibold uppercase">
                  Islamic Charity & Humanitarian Foundation
                </span>
              </div>
            </button>

            {/* Zone 2: Navigation Links (Text with hover states) */}
            <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-stone-700">
              {navLinks.slice(0, 6).map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`transition-colors py-1 relative whitespace-nowrap ${
                    currentTab === link.id
                      ? 'text-emerald-900 font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-800'
                      : 'hover:text-emerald-800'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              {/* Overflow Links dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 hover:text-emerald-800 py-1 text-stone-700">
                  <span>More</span>
                  <svg className="w-3.5 h-3.5 fill-current opacity-70" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 w-48 bg-white border border-stone-200 rounded-lg shadow-lg py-2 hidden group-hover:block transition-all z-50">
                  {navLinks.slice(6).map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.id)}
                      className={`block w-full text-left px-4 py-2 text-xs hover:bg-emerald-50 hover:text-emerald-900 transition-colors ${
                        currentTab === link.id ? 'bg-emerald-50 text-emerald-900 font-semibold' : 'text-stone-700'
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}
                  <div className="border-t border-stone-100 my-1 pt-1">
                    <button
                      onClick={() => {
                        onOpenReceiptPortal();
                      }}
                      className="block w-full text-left px-4 py-2 text-xs text-amber-700 font-semibold hover:bg-emerald-50 hover:text-emerald-900"
                    >
                      🖨️ Receipt & Invoice Lookup
                    </button>
                    <button
                      onClick={() => handleNavClick('partners')}
                      className="block w-full text-left px-4 py-2 text-xs text-stone-700 hover:bg-emerald-50 hover:text-emerald-900"
                    >
                      Partners & Supporters
                    </button>
                    <button
                      onClick={() => handleNavClick('donation-policy')}
                      className="block w-full text-left px-4 py-2 text-xs text-stone-700 hover:bg-emerald-50 hover:text-emerald-900"
                    >
                      Donation Policy
                    </button>
                  </div>
                </div>
              </div>
            </nav>

            {/* Zone 3: Primary Action & Mobile Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenDonate}
                className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-amber-300 hover:text-amber-200 font-semibold text-xs tracking-wider uppercase rounded-md shadow-xs transition-all active:scale-95 border border-emerald-700"
              >
                <Heart className="w-3.5 h-3.5 fill-amber-300" />
                <span className="whitespace-nowrap">DONATE</span>
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-md text-stone-700 hover:text-emerald-900 hover:bg-stone-100 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide Drawer Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="mb-4 pb-3 border-b border-stone-100 text-xs text-stone-600 flex flex-col gap-1">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-left font-arabic text-amber-700 font-medium cursor-default focus:outline-hidden"
                title="بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </button>
              <p className="text-stone-500">Potiskum, Yobe State, Nigeria</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-3 py-2 rounded-md transition-colors ${
                    currentTab === link.id
                      ? 'bg-emerald-50 text-emerald-900 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('partners')}
                className="text-left px-3 py-2 rounded-md text-stone-700 hover:bg-stone-50"
              >
                Partners
              </button>
              <button
                onClick={() => handleNavClick('donation-policy')}
                className="text-left px-3 py-2 rounded-md text-stone-700 hover:bg-stone-50"
              >
                Donation Policy
              </button>
            </div>

            <div className="mt-5 pt-4 border-t border-stone-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDonate();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-800 text-amber-300 font-semibold rounded-md shadow-xs text-sm"
              >
                <Heart className="w-4 h-4 fill-amber-300" />
                DONATE NOW
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReceiptPortal();
                }}
                className="w-full py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-xs rounded-md text-center flex items-center justify-center gap-1.5 border border-amber-200"
              >
                <Printer className="w-3.5 h-3.5 text-amber-700" />
                Track Code / Print Receipt
              </button>
              <div className="pt-2 text-center">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="text-[11px] text-stone-400 hover:text-stone-600 transition-colors py-1"
                >
                  Secretariat Desk
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

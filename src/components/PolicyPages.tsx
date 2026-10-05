import React from 'react';
import { ShieldCheck, Lock, FileText, ArrowLeft, Home, Compass, Heart, AlertCircle } from 'lucide-react';
import { OrganizationConfig } from '../types';

interface PolicyProps {
  config: OrganizationConfig;
  onNavigateHome: () => void;
  onExplorePrograms: () => void;
}

export const PrivacyPolicyView: React.FC<PolicyProps> = ({ config, onNavigateHome }) => {
  return (
    <div className="py-14 sm:py-20 bg-[#faf8f4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-stone-200 shadow-sm space-y-8 text-stone-700 text-sm leading-relaxed">
          <div className="border-b border-stone-200 pb-6">
            <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold">
              Legal & Data Protection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
              Privacy Policy
            </h1>
            <p className="text-xs text-stone-500 mt-2">
              Effective Date: March 2026 · Zanjabeel Islamic Charity and Humanitarian Foundation, Potiskum
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-stone-900">1. Commitment to Privacy</h2>
            <p>
              Zanjabeel Islamic Charity and Humanitarian Foundation (operating from Potiskum, Yobe State, Nigeria) is dedicated to protecting the privacy, dignity, and confidential personal data of our donors, beneficiaries, volunteers, and website visitors.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-stone-900">2. Information We Collect</h2>
            <p>
              We only collect information voluntarily submitted by you when communicating via our contact forms, registering as a volunteer, pledging a charitable donation, or signing up for updates. This may include:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-stone-600">
              <li>Full Name and contact details (email address, telephone/WhatsApp number).</li>
              <li>Donation pledge details, designated programs, and transfer references.</li>
              <li>Volunteer skills, qualifications, and geographical availability.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-stone-900">3. Protection of Beneficiary Dignity</h2>
            <p>
              In alignment with Islamic humanitarian ethics and international child protection standards, we strictly safeguard the identities, photographs, and locations of vulnerable orphans and indigent recipients. Photographs published in our reports and galleries are gathered with informed community consent and uphold the recipient&apos;s dignity.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-stone-900">4. No Sharing or Commercialization</h2>
            <p>
              We never sell, rent, lease, or monetize user data. Information is utilized solely for issuing donation confirmations, managing volunteer missions, and providing direct accountability reports.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-stone-900">5. Contact Our Data Desk</h2>
            <p>
              If you have inquiries regarding our data handling practices or wish to update your records, please reach our administrative desk at <span className="font-mono">{config.emailPlaceholder}</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export const TermsOfUseView: React.FC<PolicyProps> = ({ config, onNavigateHome }) => {
  return (
    <div className="py-14 sm:py-20 bg-[#faf8f4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-stone-200 shadow-sm space-y-8 text-stone-700 text-sm leading-relaxed">
          <div className="border-b border-stone-200 pb-6">
            <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold">
              Governance & User Terms
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
              Terms of Use
            </h1>
            <p className="text-xs text-stone-500 mt-2">
              Zanjabeel Islamic Charity and Humanitarian Foundation, Potiskum
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-stone-900">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this official portal of Zanjabeel Islamic Charity and Humanitarian Foundation, you agree to comply with and be bound by these terms. If you do not accept these terms, you should refrain from using the platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-stone-900">2. Authorized Use & Intellectual Property</h2>
            <p>
              All materials, documentation, photography, trademarks, and educational texts displayed on this portal are the property of Zanjabeel Foundation or utilized with permissions. You may not misappropriate or misrepresent the foundation&apos;s name or emblems for unauthorized fundraising.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-stone-900">3. Verification of Official Channels</h2>
            <p>
              The foundation strictly disclaims responsibility for contributions made to unverified personal bank accounts or third-party solicitations. All donors must verify payment channels directly through authorized contact numbers: <span className="font-mono font-semibold">{config.phonePlaceholder}</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export const DonationPolicyView: React.FC<PolicyProps> = ({ config, onNavigateHome, onExplorePrograms }) => {
  return (
    <div className="py-14 sm:py-20 bg-[#faf8f4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-stone-200 shadow-sm space-y-8 text-stone-700 text-sm leading-relaxed">
          <div className="border-b border-stone-200 pb-6">
            <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold">
              Financial Integrity & Stewardship
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
              Donation & Transparency Policy
            </h1>
            <p className="text-xs text-stone-500 mt-2">
              Guiding Principles of Amanah (Trust) and Islamic Philanthropy
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-stone-900">1. Principle of Amanah (Sacred Trust)</h2>
            <p>
              At Zanjabeel Foundation, every donation is treated as a sacred trust from Allah and the donor. We maintain strict segregation between:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-stone-600">
              <li><strong>Zakat Al-Maal & Zakat Al-Fitr:</strong> Directed 100% to verified Shariah-compliant categories of beneficiaries (the poor, destitute, and indebted).</li>
              <li><strong>Sadaqah Jariyah:</strong> Designated strictly for enduring physical infrastructure such as deep community water boreholes and learning classrooms.</li>
              <li><strong>General Relief Funds:</strong> Allocated to emergency food drives, healthcare support, and medical interventions.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-stone-900">2. Verification Requirement</h2>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs">
              <strong>Mandatory Notice:</strong> Please verify official donation details through our authorized contact channels ({config.phonePlaceholder}) before initiating any bank transfer. Never send funds to unverified individual accounts claiming to represent Zanjabeel Foundation.
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-stone-900">3. Non-Refundable Nature of Charitable Contributions</h2>
            <p>
              Once donations are transferred and applied toward relief goods, food baskets, or construction materials, they become irreversible charitable endowments dedicated to public welfare. Donors receive an official confirmation receipt and report.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-bold text-stone-900">4. Reporting & Audits</h2>
            <p>
              We provide periodic program reports and photos showing project milestones. Donors who sponsor dedicated projects (e.g. water wells or classroom blocks) receive comprehensive individualized completion dossiers.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export const NotFoundView: React.FC<PolicyProps> = ({ onNavigateHome, onExplorePrograms }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-[#faf8f4]">
      <div className="max-w-lg w-full bg-white rounded-2xl p-8 sm:p-12 text-center border border-stone-200 shadow-md space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto border border-emerald-100">
          <span className="font-serif text-3xl font-bold">404</span>
        </div>

        <div>
          <span className="font-arabic text-amber-700 text-base">لا بأس</span>
          <h1 className="font-serif text-3xl font-bold text-stone-900 mt-1">Page Not Found</h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-3 leading-relaxed">
            Sorry, the page you are looking for could not be found or has been relocated within our foundation portal.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onNavigateHome}
            className="w-full sm:w-auto px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Home className="w-4 h-4 text-amber-300" />
            <span>Return Home</span>
          </button>

          <button
            onClick={onExplorePrograms}
            className="w-full sm:w-auto px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Our Programs</span>
          </button>
        </div>
      </div>
    </div>
  );
};

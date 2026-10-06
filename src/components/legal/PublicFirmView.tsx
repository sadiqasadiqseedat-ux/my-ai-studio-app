import React, { useState } from 'react';
import {
  Scale,
  Building2,
  Shield,
  Briefcase,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  Award,
  BookOpen,
  Calendar,
  Lock,
  ChevronRight,
  ExternalLink,
  Users,
} from 'lucide-react';
import { FirmProfile, UserProfile } from '../../types/legal';

interface PublicFirmViewProps {
  firmProfile: FirmProfile;
  lawyers: UserProfile[];
  onOpenPortal: () => void;
  onRequestConsultation: (data: {
    name: string;
    phone: string;
    email: string;
    matterType: string;
    notes: string;
  }) => void;
}

export const PublicFirmView: React.FC<PublicFirmViewProps> = ({
  firmProfile,
  lawyers,
  onOpenPortal,
  onRequestConsultation,
}) => {
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+234 ');
  const [email, setEmail] = useState('');
  const [matterType, setMatterType] = useState('Land / Property Recovery');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Keyboard shortcut (Ctrl+Shift+L or Alt+L) to open disguised portal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        onOpenPortal();
      } else if (e.altKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        onOpenPortal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenPortal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRequestConsultation({ name, phone, email, matterType, notes });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowConsultModal(false);
      setName('');
      setNotes('');
    }, 2500);
  };

  const practiceAreas = [
    {
      title: 'Dispute Resolution & Appellate Litigation',
      desc: 'Formidable advocacy before the Supreme Court of Nigeria, Court of Appeal, and Federal/State High Courts across complex commercial, land, and public law disputes.',
      icon: Scale,
    },
    {
      title: 'Real Estate & Conveyancing Practice',
      desc: 'End-to-end legal due diligence, Land Registry searches (AGIS Abuja & Lands Bureau Alausa), Governor’s Consent processing, Deeds of Assignment, and property acquisitions.',
      icon: Building2,
    },
    {
      title: 'Landlord & Tenant Management',
      desc: 'Institutional property administration, tenancy drafting, rent collection auditing, statutory notices to quit, and Recovery of Premises proceedings.',
      icon: Briefcase,
    },
    {
      title: 'Islamic Law & Succession (Sharia Practice)',
      desc: 'Expert representation before Sharia Courts of Appeal and Area Courts in Mirath (Islamic inheritance division), wasiyyah (wills), and marital contracts.',
      icon: BookOpen,
    },
    {
      title: 'Corporate & Commercial Transactions',
      desc: 'Corporate governance, CAC regulatory compliance, mergers, debt recovery, and joint venture syndication for multinational and domestic corporations.',
      icon: Shield,
    },
    {
      title: 'Arbitration & Alternative Dispute Resolution',
      desc: 'Fellows of the Chartered Institute of Arbitrators (FCIArb) providing confidential, cost-effective commercial arbitration and mediation tribunals.',
      icon: Award,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-[#0B1B3D] selection:text-white">
      {/* Top Bar */}
      <div className="bg-[#0B1B3D] text-white border-b border-[#1E3A8A]/40 text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Head Office: Central Business District, Abuja, Nigeria</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{firmProfile.phone}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400">Branches: Lagos · Kano</span>
            {/* Disguised staff gateway: looks like statutory bar roll notation */}
            <button
              type="button"
              onClick={onOpenPortal}
              title="Statutory Chambers Roll [LP/FCT/98] — Internal Gateway"
              className="text-[11px] text-amber-300/90 hover:text-amber-200 font-mono transition-colors cursor-pointer px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-amber-400/30 flex items-center gap-1"
            >
              <span>FCT/ROLL/98</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header / Nav */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenPortal}
              title="Statutory Chambers Seal & Roll [LP/FCT/98] — Internal Portal"
              className="w-11 h-11 rounded-lg bg-[#0B1B3D] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-md hover:scale-105 transition-transform cursor-pointer"
            >
              <Scale className="w-6 h-6" />
            </button>
            <div>
              <span className="font-heading font-extrabold text-lg sm:text-xl tracking-wider text-[#0B1B3D] block">
                {firmProfile.firmName}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium uppercase tracking-wider block">
                Barristers, Solicitors & Property Managers
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Disguised Chambers Roll Gateway Button in Navbar */}
            <button
              type="button"
              onClick={onOpenPortal}
              title="Statutory Chambers Secretariat Roll [LP/FCT/98]"
              className="text-slate-500 hover:text-[#0B1B3D] px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-xs font-mono flex items-center gap-1.5 transition bg-slate-50/50"
            >
              <Scale className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[11px] font-semibold">Roll: LP/FCT/98</span>
            </button>

            <button
              onClick={() => setShowConsultModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0B1B3D] text-white hover:bg-[#13274F] font-semibold text-xs transition shadow-md"
            >
              <span>Book Legal Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0B1B3D] via-[#11244E] to-[#08152F] text-white py-20 lg:py-28 px-4 sm:px-8 overflow-hidden">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#800020] text-amber-200 text-xs font-semibold tracking-wide border border-amber-400/30">
            <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Senior Advocate of Nigeria (SAN) Led Chambers</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white">
            Distinguished Legal Advocacy & Institutional Property Stewardship
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-serif-legal italic leading-relaxed">
            "Serving corporate entities, governmental agencies, traditional estates, and discerning individuals across the superior courts of record and commercial transactions throughout Nigeria."
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setShowConsultModal(true)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#c29e2f] text-slate-950 font-bold text-sm transition shadow-lg"
            >
              Retain Our Chambers
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('practice-areas-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition flex items-center justify-center gap-2"
            >
              <Scale className="w-4 h-4 text-[#D4AF37]" />
              <span>Practice Areas & Track Record</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 border-t border-white/10 text-left">
            <div>
              <span className="font-heading text-2xl font-bold text-[#D4AF37]">28+</span>
              <p className="text-xs text-slate-300 mt-0.5">Years of Bar Practice</p>
            </div>
            <div>
              <span className="font-heading text-2xl font-bold text-[#D4AF37]">450+</span>
              <p className="text-xs text-slate-300 mt-0.5">Landmark Litigation Cases</p>
            </div>
            <div>
              <span className="font-heading text-2xl font-bold text-[#D4AF37]">₦15B+</span>
              <p className="text-xs text-slate-300 mt-0.5">Property Portfolios Managed</p>
            </div>
            <div>
              <span className="font-heading text-2xl font-bold text-[#D4AF37]">3</span>
              <p className="text-xs text-slate-300 mt-0.5">State Chambers (Abuja, Lagos, Kano)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Principal Counsel Profile */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-md grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-1 text-center lg:text-left space-y-4">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-[#0B1B3D] border-4 border-[#D4AF37] mx-auto lg:mx-0 flex items-center justify-center text-white shadow-xl">
              <Scale className="w-16 h-16 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-xl text-[#0B1B3D]">
                {firmProfile.principal}
              </h3>
              <p className="text-xs text-[#800020] font-semibold mt-1">
                Principal Counsel & Head of Chambers
              </p>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">
                Supreme Court Roll: SCN/014820/1998
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4 text-sm text-slate-600 leading-relaxed text-justify">
            <h4 className="font-heading font-bold text-lg text-[#0B1B3D]">
              Leadership in Legal Excellence & Practice Integrity
            </h4>
            <p>
              Barr. B. B. Bale, SAN, is an eminent legal practitioner and Senior Advocate of Nigeria with nearly three decades of active post-call experience in commercial dispute resolution, land conveyancing, and recovery of premises. A Fellow of the Chartered Institute of Arbitrators (FCIArb), he has served as lead counsel in groundbreaking appeals before the Supreme Court of Nigeria and the Court of Appeal.
            </p>
            <p>
              Under his visionary stewardship, B. B. Bale & Co. Chambers has grown from a specialized litigation boutique into one of the premier full-service law firms and institutional property management chambers in the Federal Capital Territory and Northern Nigeria.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-slate-100 font-semibold text-slate-700">Nigerian Bar Association (NBA)</span>
              <span className="px-3 py-1 rounded-full bg-slate-100 font-semibold text-slate-700">Body of Senior Advocates of Nigeria (BOSAN)</span>
              <span className="px-3 py-1 rounded-full bg-slate-100 font-semibold text-slate-700">Chartered Institute of Arbitrators (UK)</span>
              <span className="px-3 py-1 rounded-full bg-slate-100 font-semibold text-slate-700">International Bar Association (IBA)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section id="practice-areas-section" className="py-16 bg-slate-100 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#800020]">
              Core Legal Competencies
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0B1B3D]">
              Comprehensive Legal & Property Solutions
            </h2>
            <p className="text-sm text-slate-500">
              Rigorous statutory grounding combined with modern electronic practice management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceAreas.map((pa, idx) => {
              const IconComp = pa.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 border border-slate-200 hover:border-[#0B1B3D] transition shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-lg bg-[#0B1B3D] text-[#D4AF37] flex items-center justify-center">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-bold text-base text-[#0B1B3D]">
                      {pa.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {pa.desc}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowConsultModal(true)}
                    className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#800020] hover:text-[#0B1B3D] transition"
                  >
                    <span>Inquire About Representation</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0B1B3D]">
            Chambers Nationwide Locations
          </h2>
          <p className="text-sm text-slate-500">
            Headquartered in Abuja CBD with strategic branches in commercial hubs of Lagos and Kano.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#800020]"></span>
              <h3 className="font-heading font-bold text-base text-[#0B1B3D]">Abuja Headquarters</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {firmProfile.address}
            </p>
            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <p>Tel: {firmProfile.phone}</p>
              <p>Email: {firmProfile.email}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#0B1B3D]"></span>
              <h3 className="font-heading font-bold text-base text-[#0B1B3D]">Lagos Branch</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {firmProfile.branchAddresses[0]}
            </p>
            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <p>Tel: +234 1 892 4190</p>
              <p>Email: lagos@bbbalelaw.ng</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-700"></span>
              <h3 className="font-heading font-bold text-base text-[#0B1B3D]">Kano Branch</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {firmProfile.branchAddresses[1]}
            </p>
            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <p>Tel: +234 64 391 028</p>
              <p>Email: kano@bbbalelaw.ng</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B1B3D] text-white border-t border-[#1E3A8A]/50 py-12 px-4 sm:px-8 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="font-heading font-bold text-base tracking-wider text-white block">
              {firmProfile.firmName}
            </span>
            <p className="text-slate-400">
              <button
                type="button"
                onClick={onOpenPortal}
                title="Secretariat Protocol"
                className="hover:text-amber-300 font-mono transition-colors cursor-pointer"
              >
                ©
              </button>{' '}
              {new Date().getFullYear()} B. B. Bale & Co. Chambers. All Rights Reserved.{' '}
              <button
                type="button"
                onClick={onOpenPortal}
                title="Chambers Roll Index"
                className="opacity-40 hover:opacity-100 text-[10px] text-slate-400 hover:text-amber-300 font-mono transition-colors cursor-pointer ml-1"
              >
                · CAC/IT/18492
              </button>
            </p>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>Supreme Court Enrolled Practice</span>
            <span className="hidden sm:inline">·</span>
            <span>RPC 2023 Compliant</span>
          </div>
        </div>
      </footer>

      {/* CONSULTATION BOOKING MODAL */}
      {showConsultModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-heading text-lg font-bold text-[#0B1B3D]">
                  Request Legal Representation / Consultation
                </h3>
                <p className="text-xs text-slate-500">Chambers Intake Secretariat · Confidential</p>
              </div>
              <button
                onClick={() => setShowConsultModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div className="p-6 text-center space-y-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-heading font-bold text-emerald-900 text-base">
                  Consultation Request Received
                </h4>
                <p className="text-xs text-emerald-800">
                  Your case details have been transmitted directly into our Chambers Client Intake Register. Our Head of Litigation or Managing Partner will review for conflict of interest and contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Legal Name / Company</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alhaji Garba Danladi / Apex Oil & Gas Ltd"
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Matter Category</label>
                  <select
                    value={matterType}
                    onChange={(e) => setMatterType(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-white"
                  >
                    <option value="Land / Property Recovery">Land Dispute & Recovery of Premises</option>
                    <option value="Commercial Litigation">Commercial & Corporate Dispute</option>
                    <option value="Conveyancing & Land Registry Search">Conveyancing & AGIS / Title Search</option>
                    <option value="Islamic Law / Sharia Succession">Islamic Law / Mirath Succession</option>
                    <option value="General Retainer">Chambers Legal Retainer</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Summary of Case / Instruction</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Briefly describe the dispute, property address, adverse parties, or relief sought..."
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowConsultModal(false)}
                    className="px-4 py-2 border rounded-lg text-slate-700 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#0B1B3D] text-white rounded-lg font-semibold hover:bg-[#13274F]"
                  >
                    Submit Intake Brief
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Disguised Internal Chambers Seal: Discreet gateway */}
      <button
        type="button"
        onClick={onOpenPortal}
        className="fixed bottom-3 left-3 z-30 opacity-70 hover:opacity-100 transition-all text-xs bg-[#0B1B3D] text-amber-200 px-3 py-1.5 rounded-lg border border-amber-400/40 font-mono flex items-center gap-1.5 shadow-lg cursor-pointer hover:bg-[#13274F] hover:scale-105"
        title="Statutory Chambers Roll [LP/FCT/98] — Internal Portal"
      >
        <Scale className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span>Chambers Roll [LP/FCT/98]</span>
      </button>
    </div>
  );
};

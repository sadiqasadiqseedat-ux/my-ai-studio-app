import React, { useState } from 'react';
import { UserPlus, Handshake, Heart, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { OrganizationConfig, VolunteerRecord, ContactMessageRecord } from '../types';

interface GetInvolvedPageProps {
  config: OrganizationConfig;
  onOpenDonate: () => void;
  onRegisterVolunteer?: (rec: VolunteerRecord) => void;
  onContactMessage?: (msg: ContactMessageRecord) => void;
}

export const GetInvolvedPage: React.FC<GetInvolvedPageProps> = ({
  config,
  onOpenDonate,
  onRegisterVolunteer,
  onContactMessage,
}) => {
  const [activeTab, setActiveTab] = useState<'volunteer' | 'partner' | 'sponsor'>('volunteer');

  // Volunteer state
  const [vData, setVData] = useState({
    fullName: '',
    email: '',
    phone: '',
    profession: '',
    interest: 'Community Food Distribution',
    availability: 'Weekends',
    experience: '',
  });
  const [vSubmitted, setVSubmitted] = useState(false);

  // Partner state
  const [pData, setPData] = useState({
    orgName: '',
    contactPerson: '',
    email: '',
    phone: '',
    partnerType: 'Corporate Philanthropy',
    proposalSummary: '',
  });
  const [pSubmitted, setPSubmitted] = useState(false);

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVSubmitted(true);
    if (onRegisterVolunteer) {
      onRegisterVolunteer({
        id: 'vol-' + Date.now(),
        fullName: vData.fullName,
        email: vData.email,
        phone: vData.phone,
        profession: vData.profession,
        interest: vData.interest,
        availability: vData.availability,
        experience: vData.experience,
        timestamp: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      });
    }
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPSubmitted(true);
    if (onContactMessage) {
      onContactMessage({
        id: 'partner-inq-' + Date.now(),
        fullName: `${pData.contactPerson} (${pData.orgName})`,
        email: pData.email,
        phone: pData.phone,
        subject: `Partnership Inquiry: ${pData.partnerType}`,
        message: pData.proposalSummary,
        timestamp: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: 'Unread',
      });
    }
  };

  return (
    <div className="py-14 sm:py-20 bg-[#faf8f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-800">
            Solidarity & Collective Service
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 mt-1">
            Get Involved With Zanjabeel
          </h1>
          <div className="w-12 h-1 bg-amber-500 mx-auto mt-3 rounded-full" />
          <p className="text-stone-600 text-sm sm:text-base mt-4 leading-relaxed">
            Whether you offer your professional skills as a field volunteer, collaborate as an institutional partner, or sponsor an ongoing project, your participation builds stronger communities in Yobe State.
          </p>

          {/* Segmented Tab Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 bg-stone-200/80 rounded-xl max-w-fit mx-auto border border-stone-300">
            <button
              onClick={() => setActiveTab('volunteer')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'volunteer'
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-white/60'
              }`}
            >
              Volunteer Corps
            </button>
            <button
              onClick={() => setActiveTab('partner')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'partner'
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-white/60'
              }`}
            >
              Partner With Us
            </button>
            <button
              onClick={() => setActiveTab('sponsor')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'sponsor'
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-white/60'
              }`}
            >
              Sponsor A Project
            </button>
          </div>
        </div>

        {/* Tab 1: Volunteer Application */}
        {activeTab === 'volunteer' && (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-md">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-100">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Volunteer Application Form
                </h3>
                <p className="text-xs text-stone-500">
                  Join passionate humanitarian volunteers serving across Potiskum LGA
                </p>
              </div>
            </div>

            {vSubmitted ? (
              <div className="p-8 text-center space-y-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-xl font-bold text-emerald-950">
                  Volunteer Registration Received!
                </h4>
                <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                  Jazakallahu Khair, {vData.fullName || 'Brother/Sister'}. Our volunteer mobilization coordinator will contact you via {vData.email || 'your email'} with upcoming orientation sessions and community relief schedules.
                </p>
                <button
                  onClick={() => setVSubmitted(false)}
                  className="px-5 py-2 bg-emerald-800 text-white text-xs font-semibold rounded-md hover:bg-emerald-900"
                >
                  Register Another Volunteer
                </button>
              </div>
            ) : (
              <form onSubmit={handleVolunteerSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold uppercase text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Fatima Ibrahim"
                      value={vData.fullName}
                      onChange={(e) => setVData({ ...vData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold uppercase text-stone-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. fatima@example.com"
                      value={vData.email}
                      onChange={(e) => setVData({ ...vData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold uppercase text-stone-700 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +234 802 000 0000"
                      value={vData.phone}
                      onChange={(e) => setVData({ ...vData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold uppercase text-stone-700 mb-1">
                      Profession / Skill Background
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Nurse / Teacher / Engineer / Student"
                      value={vData.profession}
                      onChange={(e) => setVData({ ...vData, profession: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold uppercase text-stone-700 mb-1">
                      Area of Interest
                    </label>
                    <select
                      value={vData.interest}
                      onChange={(e) => setVData({ ...vData, interest: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg bg-white"
                    >
                      <option value="Community Food Distribution">Food & Basic Needs Relief</option>
                      <option value="Free Medical Screening Outreach">Healthcare & Medical Outreach</option>
                      <option value="Orphan Education & Tutoring">Orphans & Education Mentorship</option>
                      <option value="Water Well Maintenance">Water & WASH Infrastructure</option>
                      <option value="Event Logistics & Photography">Media, Field Logistics & Comms</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold uppercase text-stone-700 mb-1">
                      Availability
                    </label>
                    <select
                      value={vData.availability}
                      onChange={(e) => setVData({ ...vData, availability: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg bg-white"
                    >
                      <option value="Weekends Only">Weekends Only</option>
                      <option value="Weekdays">Weekdays</option>
                      <option value="Seasonal (Ramadan / Eid)">Seasonal (Ramadan & Emergency)</option>
                      <option value="Flexible On-Call">Flexible / Emergency On-Call</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold uppercase text-stone-700 mb-1">
                    Brief Note or Relevant Experience
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us what motivates you to volunteer with Zanjabeel Foundation..."
                    value={vData.experience}
                    onChange={(e) => setVData({ ...vData, experience: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-amber-300 font-bold uppercase tracking-wider rounded-lg shadow-xs transition-colors"
                  >
                    Submit Volunteer Registration
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tab 2: Partner Inquiry */}
        {activeTab === 'partner' && (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-md">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-100">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <Handshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Partnership & Collaboration Inquiry
                </h3>
                <p className="text-xs text-stone-500">
                  For institutions, NGOs, donor organizations, and health agencies
                </p>
              </div>
            </div>

            {pSubmitted ? (
              <div className="p-8 text-center space-y-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-xl font-bold text-emerald-950">
                  Inquiry Received
                </h4>
                <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, {pData.contactPerson} ({pData.orgName}). Our executive directorate in Potiskum will review your institutional collaboration interest and respond shortly.
                </p>
                <button
                  onClick={() => setPSubmitted(false)}
                  className="px-5 py-2 bg-emerald-800 text-white text-xs font-semibold rounded-md hover:bg-emerald-900"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handlePartnerSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold uppercase text-stone-700 mb-1">
                      Organization / Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Al-Noor Development Initiative"
                      value={pData.orgName}
                      onChange={(e) => setPData({ ...pData, orgName: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold uppercase text-stone-700 mb-1">
                      Contact Representative Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Usman Bello"
                      value={pData.contactPerson}
                      onChange={(e) => setPData({ ...pData, contactPerson: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold uppercase text-stone-700 mb-1">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. partnerships@organization.org"
                      value={pData.email}
                      onChange={(e) => setPData({ ...pData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold uppercase text-stone-700 mb-1">
                      Official Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +234 803 123 4567"
                      value={pData.phone}
                      onChange={(e) => setPData({ ...pData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold uppercase text-stone-700 mb-1">
                    Partnership Scope & Proposed Synergy
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Summarize the nature of proposed collaboration (joint humanitarian mission, equipment donation, grant funding, etc.)..."
                    value={pData.proposalSummary}
                    onChange={(e) => setPData({ ...pData, proposalSummary: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-amber-300 font-bold uppercase tracking-wider rounded-lg shadow-xs transition-colors"
                  >
                    Submit Partnership Proposal
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tab 3: Sponsor a Project */}
        {activeTab === 'sponsor' && (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-md space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
                <Heart className="w-5 h-5 fill-amber-500" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  Sponsor a Specific Humanitarian Project
                </h3>
                <p className="text-xs text-stone-500">
                  Establish an enduring Sadaqah Jariyah in your name or the name of a loved one
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <h4 className="font-bold text-emerald-950 text-sm">Solar-Powered Borehole Well</h4>
                <p className="text-stone-600">
                  Provides permanent potable drinking water for 500+ villagers in water-scarce wards.
                </p>
                <p className="text-amber-800 font-semibold">Typical cost: ₦[AMOUNT PLACEHOLDER]</p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <h4 className="font-bold text-emerald-950 text-sm">Orphan Classroom Sponsorship</h4>
                <p className="text-stone-600">
                  Covers full academic curriculum, uniform, learning supplies, and daily food for 20 pupils.
                </p>
                <p className="text-amber-800 font-semibold">Typical cost: ₦[AMOUNT PLACEHOLDER]</p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <h4 className="font-bold text-emerald-950 text-sm">Free Community Health Camp</h4>
                <p className="text-stone-600">
                  Funds diagnostic screening, malaria treatments, and elder consultations for an entire village.
                </p>
                <p className="text-amber-800 font-semibold">Typical cost: ₦[AMOUNT PLACEHOLDER]</p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <h4 className="font-bold text-emerald-950 text-sm">Ramadan 100-Family Food Drive</h4>
                <p className="text-stone-600">
                  Supplies staple grain hampers (rice, beans, dates, oil) to 100 vulnerable homes for 30 days.
                </p>
                <p className="text-amber-800 font-semibold">Typical cost: ₦[AMOUNT PLACEHOLDER]</p>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs">
                <p className="font-bold text-emerald-950">Dedicated Project Management</p>
                <p className="text-stone-600 mt-0.5">
                  Includes personalized site video, milestone photos, plaque inscription, and direct completion report.
                </p>
              </div>
              <button
                onClick={onOpenDonate}
                className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-amber-300 font-bold text-xs rounded-lg uppercase tracking-wider shrink-0 transition-colors"
              >
                Inquire & Sponsor
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

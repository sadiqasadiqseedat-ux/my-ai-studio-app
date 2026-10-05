import React, { useState } from 'react';
import {
  UserCheck,
  Search,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Briefcase,
  ArrowRight,
  ShieldAlert,
  Printer,
  ChevronRight,
  Info,
} from 'lucide-react';
import { ClientRecord, MatterRecord, CaseRecord } from '../../types/legal';

interface ClientIntakeViewProps {
  clients: ClientRecord[];
  matters: MatterRecord[];
  cases: CaseRecord[];
  onCompleteIntake: (newClient: ClientRecord, newMatter?: MatterRecord) => void;
}

export const ClientIntakeView: React.FC<ClientIntakeViewProps> = ({
  clients,
  matters,
  cases,
  onCompleteIntake,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Intake State
  const [clientName, setClientName] = useState('');
  const [clientType, setClientType] = useState('Individual');
  const [phone, setPhone] = useState('+234 ');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [adverseParty, setAdverseParty] = useState('');
  const [adverseCounsel, setAdverseCounsel] = useState('');
  const [matterTitle, setMatterTitle] = useState('');
  const [matterCategory, setMatterCategory] = useState('Land Matters & Property Recovery');
  const [consultationNotes, setConsultationNotes] = useState('');
  const [assignedLawyer, setAssignedLawyer] = useState('Barr. B. B. Bale, SAN');
  const [engagementDecision, setEngagementDecision] = useState<'Accept' | 'Decline' | 'Refer'>('Accept');

  // Conflict Check Search State
  const [conflictSearchDone, setConflictSearchDone] = useState(false);
  const [matchingClients, setMatchingClients] = useState<ClientRecord[]>([]);
  const [matchingMatters, setMatchingMatters] = useState<MatterRecord[]>([]);
  const [lawyerConflictReviewNote, setLawyerConflictReviewNote] = useState('');

  const runConflictCheck = () => {
    const q1 = clientName.trim().toLowerCase();
    const q2 = adverseParty.trim().toLowerCase();

    const clientMatches = clients.filter(
      (c) =>
        (q1 && c.name.toLowerCase().includes(q1)) ||
        (q2 && c.name.toLowerCase().includes(q2))
    );

    const matterMatches = matters.filter(
      (m) =>
        (q1 && (m.opposingParty?.toLowerCase().includes(q1) || m.clientName.toLowerCase().includes(q1))) ||
        (q2 && (m.opposingParty?.toLowerCase().includes(q2) || m.clientName.toLowerCase().includes(q2)))
    );

    setMatchingClients(clientMatches);
    setMatchingMatters(matterMatches);
    setConflictSearchDone(true);
  };

  const handleFinishOnboarding = () => {
    const newClient: ClientRecord = {
      id: 'CL-' + String(clients.length + 1).padStart(3, '0'),
      name: clientName,
      clientType: clientType as any,
      phone,
      email,
      address,
      occupation: 'New Onboarded Client',
      dateOnboarded: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      assignedLawyer,
      status: 'Active',
      notes: consultationNotes,
    };

    let newMatter: MatterRecord | undefined = undefined;
    if (engagementDecision === 'Accept' && matterTitle) {
      newMatter = {
        id: 'MAT-' + String(matters.length + 1).padStart(3, '0'),
        reference: `BBBC/2026/${String(matters.length + 1).padStart(3, '0')}`,
        title: matterTitle,
        clientId: newClient.id,
        clientName: newClient.name,
        matterType: matterCategory,
        assignedPartner: assignedLawyer.includes('SAN') ? assignedLawyer : 'Barr. B. B. Bale, SAN',
        assignedCounsel: assignedLawyer,
        supportingStaff: 'Mrs. Folake Adeyemi',
        dateOpened: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: 'Active',
        priority: 'Normal',
        opposingParty: adverseParty,
        opposingCounsel: adverseCounsel,
        jurisdiction: 'Federal Capital Territory / High Court of Justice',
        description: consultationNotes,
      };
    }

    onCompleteIntake(newClient, newMatter);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#800020] text-amber-200 text-xs font-semibold uppercase tracking-wider mb-2">
          <UserCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Statutory Onboarding Protocol</span>
        </div>
        <h1 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
          Client Intake & Conflict Check System
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
          In strict compliance with Rules 10 and 17 of the Rules of Professional Conduct for Legal Practitioners (RPC 2023), every prospective client engagement must undergo pre-representation conflict screening.
        </p>
      </div>

      {/* 8-Step Timeline Indicator */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs overflow-x-auto">
        <div className="flex items-center justify-between min-w-[700px] text-xs">
          {[
            '1. Enquiry',
            '2. Client Info',
            '3. Conflict Check',
            '4. Consultation',
            '5. Assessment',
            '6. Decision',
            '7. Retainer Letter',
            '8. Creation',
          ].map((stepLabel, idx) => {
            const stepNum = idx + 1;
            const isCurrent = currentStep === stepNum;
            const isCompleted = currentStep > stepNum;

            return (
              <button
                key={stepLabel}
                onClick={() => setCurrentStep(stepNum)}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg font-semibold transition-all ${
                  isCurrent
                    ? 'bg-[#0B1B3D] text-[#D4AF37] shadow-xs'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  isCurrent ? 'bg-[#D4AF37] text-[#0B1B3D]' : isCompleted ? 'bg-emerald-600 text-white' : 'bg-slate-200'
                }`}>
                  {isCompleted ? '✓' : stepNum}
                </span>
                <span className="whitespace-nowrap">{stepLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Intake Form Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 text-xs max-w-4xl mx-auto space-y-6">
        {/* Step 1 & 2: Client Info & Parties */}
        {(currentStep === 1 || currentStep === 2) && (
          <div className="space-y-4">
            <h2 className="font-heading text-base font-bold text-slate-900 border-b pb-2">
              Step 1 & 2: Prospective Client & Parties Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Prospective Client Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Alhaji Mustapha Bello / Continental Gas Ltd"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Client Classification</label>
                <select
                  value={clientType}
                  onChange={(e) => setClientType(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                >
                  <option value="Individual">Individual</option>
                  <option value="Company">Company / Corporate Body</option>
                  <option value="Government Agency">Government Ministry / Agency</option>
                  <option value="Estate">Estate / Heirs of Deceased</option>
                  <option value="Association">Trade Union / Association</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Primary Telephone</label>
                <input
                  type="text"
                  placeholder="+234 800 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Official Email Address</label>
                <input
                  type="email"
                  placeholder="client@domain.ng"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">Residential or Corporate Address</label>
                <input
                  type="text"
                  placeholder="Street Address, City, State"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Known Opposing / Adverse Party *</label>
                <input
                  type="text"
                  placeholder="e.g. Zenith Bank Plc / Engr. Kayode Ade"
                  value={adverseParty}
                  onChange={(e) => setAdverseParty(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Adverse Counsel (If known)</label>
                <input
                  type="text"
                  placeholder="e.g. Chief Rotimi & Associates"
                  value={adverseCounsel}
                  onChange={(e) => setAdverseCounsel(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => {
                  runConflictCheck();
                  setCurrentStep(3);
                }}
                className="px-6 py-2.5 bg-[#0B1B3D] text-[#D4AF37] font-bold rounded-lg hover:bg-[#1E3A8A] flex items-center gap-2"
              >
                <span>Proceed to Conflict Check</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Conflict Check (Section 8 Mandated) */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div className="border-b pb-3">
              <h2 className="font-heading text-base font-bold text-slate-900">
                Step 3: Conflict of Interest Search & Verification
              </h2>
              <p className="text-slate-500 mt-1">
                Searching against existing chambers clients, previous adverse parties, and related historical matters.
              </p>
            </div>

            {/* Mandatory Legal Rule Note from Prompt */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-amber-900">
              <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="block text-amber-950 font-bold mb-0.5">Mandatory Legal Practice Rule:</strong>
                “Potential matches should be flagged for manual lawyer review. The system does not automatically declare that a conflict exists. Final ethical clearance requires authorized Counsel assessment.”
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Searched Party Summary */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-[10px] uppercase text-slate-400">Search Parameter 1 (Prospective Client)</span>
                <p className="font-bold text-slate-900 text-sm">{clientName || 'Not entered'}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-[10px] uppercase text-slate-400">Search Parameter 2 (Adverse Party)</span>
                <p className="font-bold text-slate-900 text-sm">{adverseParty || 'Not entered'}</p>
              </div>
            </div>

            {/* Results Grid */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                Database Search Output ({matchingClients.length + matchingMatters.length} Hits)
              </h3>

              {matchingClients.length === 0 && matchingMatters.length === 0 ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold">No Direct Prior Conflict Found in Chambers Database</p>
                    <p className="text-[11px] text-emerald-800 mt-0.5">
                      Neither party name matches active retainers or prior adverse litigation records.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-5 bg-red-50 border border-red-200 rounded-xl space-y-3 text-red-950">
                  <div className="flex items-center gap-2 font-bold text-red-900">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span>Potential Relationship Matches Flagged for Counsel Review</span>
                  </div>

                  {matchingClients.map((c) => (
                    <div key={c.id} className="p-3 bg-white rounded-lg border border-red-200 text-slate-800">
                      <p><strong>Existing Client:</strong> {c.name} ({c.id})</p>
                      <p className="text-[11px] text-slate-500">Assigned Lawyer: {c.assignedLawyer}</p>
                    </div>
                  ))}

                  {matchingMatters.map((m) => (
                    <div key={m.id} className="p-3 bg-white rounded-lg border border-red-200 text-slate-800">
                      <p><strong>Related Matter:</strong> {m.reference} - {m.title}</p>
                      <p className="text-[11px] text-slate-500">Opposing Party: {m.opposingParty}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Lawyer Review Certification */}
            <div className="space-y-2 pt-2">
              <label className="block font-semibold text-slate-800">
                Counsel Conflict Review & Clearance Certification *
              </label>
              <textarea
                rows={2}
                placeholder="Counsel note certifying whether legal representation may proceed without ethical impediment..."
                value={lawyerConflictReviewNote}
                onChange={(e) => setLawyerConflictReviewNote(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div className="flex justify-between pt-4 border-t">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 border rounded-lg text-slate-600"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-6 py-2.5 bg-[#0B1B3D] text-[#D4AF37] font-bold rounded-lg hover:bg-[#1E3A8A] flex items-center gap-2"
              >
                <span>Proceed to Consultation Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4 & 5: Consultation Notes & Matter Assessment */}
        {(currentStep === 4 || currentStep === 5) && (
          <div className="space-y-4">
            <h2 className="font-heading text-base font-bold text-slate-900 border-b pb-2">
              Step 4 & 5: Initial Consultation & Legal Merits Assessment
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Proposed Matter Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Alhaji Mustapha Bello v. ABC Development Ltd (Recovery of Tenement)"
                  value={matterTitle}
                  onChange={(e) => setMatterTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Practice Area Category</label>
                  <select
                    value={matterCategory}
                    onChange={(e) => setMatterCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                  >
                    <option value="Land Matters & Property Recovery">Land Matters & Property Recovery</option>
                    <option value="Civil & Commercial Litigation">Civil & Commercial Litigation</option>
                    <option value="Recovery of Premises">Recovery of Premises</option>
                    <option value="Corporate Governance & Retainership">Corporate Governance & Retainership</option>
                    <option value="Debt Recovery & Insolvency">Debt Recovery & Insolvency</option>
                    <option value="Sharia / Islamic Succession Law">Sharia / Islamic Succession Law</option>
                    <option value="Fundamental Human Rights">Fundamental Human Rights</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Designated Lead Counsel</label>
                  <select
                    value={assignedLawyer}
                    onChange={(e) => setAssignedLawyer(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                  >
                    <option value="Barr. B. B. Bale, SAN">Barr. B. B. Bale, SAN</option>
                    <option value="Hadiza Mohammed, Esq.">Hadiza Mohammed, Esq.</option>
                    <option value="Chinedu Eze, Esq.">Chinedu Eze, Esq.</option>
                    <option value="Fatima Abdullahi, Esq.">Fatima Abdullahi, Esq.</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Consultation Brief & Fact Summary
                </label>
                <textarea
                  rows={4}
                  placeholder="Outline key background facts, document evidence presented, cause of action, and expected remedies..."
                  value={consultationNotes}
                  onChange={(e) => setConsultationNotes(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-4 py-2 border rounded-lg text-slate-600"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(6)}
                className="px-6 py-2.5 bg-[#0B1B3D] text-[#D4AF37] font-bold rounded-lg hover:bg-[#1E3A8A] flex items-center gap-2"
              >
                <span>Proceed to Engagement Decision</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 6, 7 & 8: Engagement Decision, Retainer Letter & Creation */}
        {currentStep >= 6 && (
          <div className="space-y-5">
            <h2 className="font-heading text-base font-bold text-slate-900 border-b pb-2">
              Step 6, 7 & 8: Engagement Letter & Chambers Record Creation
            </h2>

            {/* Decision selector */}
            <div>
              <label className="block font-semibold text-slate-800 mb-2">Chambers Representation Decision</label>
              <div className="grid grid-cols-3 gap-3">
                {(['Accept', 'Decline', 'Refer'] as const).map((dec) => (
                  <button
                    key={dec}
                    type="button"
                    onClick={() => setEngagementDecision(dec)}
                    className={`py-3 px-4 rounded-xl border text-center font-bold transition-all ${
                      engagementDecision === dec
                        ? dec === 'Accept'
                          ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm'
                          : 'bg-red-800 text-white border-red-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {dec === 'Accept' ? 'Accept Retainer' : dec === 'Decline' ? 'Decline Representation' : 'Refer to External Counsel'}
                  </button>
                ))}
              </div>
            </div>

            {/* Generated Engagement Letter Preview */}
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-300 space-y-3 font-serif-legal">
              <div className="border-b border-slate-300 pb-2 flex items-center justify-between text-slate-500 text-xs">
                <span className="font-bold uppercase tracking-wider text-[#0B1B3D]">Retainership Engagement Letter</span>
                <span className="font-mono">Ref: ENG/BBBC/2026/08</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-800">
                <strong>TO:</strong> {clientName || '[CLIENT NAME]'}<br />
                <strong>RE:</strong> LEGAL REPRESENTATION IN RESPECT OF {matterTitle || '[MATTER TITLE]'}<br /><br />
                We are pleased to accept instructions to act as your Legal Practitioners. In accordance with the Rules of Professional Conduct and standard practice of B. B. Bale & Co. Chambers, professional fees and statutory court disbursements shall be rendered in accordance with our agreed fee schedule.
              </p>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
              <div>
                <p className="font-bold">Ready to Instantiate Chambers File</p>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  Clicking below will create the Client Record and generate Reference <strong>BBBC/2026/{String(matters.length + 1).padStart(3, '0')}</strong>.
                </p>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-4 py-2 border rounded-lg text-slate-600"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleFinishOnboarding}
                className="px-6 py-3 bg-[#0B1B3D] text-[#D4AF37] font-bold rounded-lg hover:bg-[#1E3A8A] shadow-md flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Finalize & Create Chambers Matter</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

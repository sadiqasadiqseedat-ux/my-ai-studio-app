import React, { useState } from 'react';
import {
  Mail,
  BookOpen,
  CalendarDays,
  Search,
  Plus,
  ArrowRight,
  Clock,
  User,
  MapPin,
  ExternalLink,
  CheckCircle2,
  FileText,
  X,
} from 'lucide-react';
import {
  CorrespondenceRecord,
  LegalResearchRecord,
  AppointmentRecord,
} from '../../types/legal';

interface CorrespondenceResearchViewProps {
  correspondence: CorrespondenceRecord[];
  research: LegalResearchRecord[];
  appointments: AppointmentRecord[];
  onAddCorrespondence: (c: CorrespondenceRecord) => void;
  onAddResearch: (r: LegalResearchRecord) => void;
  onAddAppointment: (a: AppointmentRecord) => void;
}

export const CorrespondenceResearchView: React.FC<CorrespondenceResearchViewProps> = ({
  correspondence,
  research,
  appointments,
  onAddCorrespondence,
  onAddResearch,
  onAddAppointment,
}) => {
  const [subTab, setSubTab] = useState<'correspondence' | 'research' | 'appointments'>('correspondence');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [showAddCorresp, setShowAddCorresp] = useState(false);
  const [showAddResearch, setShowAddResearch] = useState(false);
  const [showAddAppt, setShowAddAppt] = useState(false);

  // New Research State
  const [newTopic, setNewTopic] = useState('');
  const [newIssue, setNewIssue] = useState('');
  const [newStatute, setNewStatute] = useState('');
  const [newCaseAuth, setNewCaseAuth] = useState('');
  const [newPrinciple, setNewPrinciple] = useState('');

  const filteredResearch = research.filter((r) =>
    r.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.statute.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.caseAuthority.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCorrespondence = correspondence.filter((c) =>
    c.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.refNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header & Sub-tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
            Correspondence, Legal Research & Appointments
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Incoming/outgoing process registers, authentic Nigerian judicial precedents, and Chambers consultation diary.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-200 p-1 rounded-lg flex items-center text-xs font-semibold">
            <button
              onClick={() => setSubTab('correspondence')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                subTab === 'correspondence'
                  ? 'bg-white text-[#0B1B3D] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Correspondence ({correspondence.length})
            </button>
            <button
              onClick={() => setSubTab('research')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                subTab === 'research'
                  ? 'bg-white text-[#0B1B3D] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Legal Research ({research.length})
            </button>
            <button
              onClick={() => setSubTab('appointments')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                subTab === 'appointments'
                  ? 'bg-white text-[#0B1B3D] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Appointments ({appointments.length})
            </button>
          </div>
        </div>
      </div>

      {/* Subtab 1: Correspondence Register */}
      {subTab === 'correspondence' && (
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between gap-3">
            <div className="relative w-full max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search correspondence by subject, recipient, ref..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <button
              onClick={() => setShowAddCorresp(true)}
              className="px-3.5 py-2 bg-[#0B1B3D] text-[#D4AF37] font-bold rounded-lg flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Log Dispatch / Letter</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Ref Number</th>
                    <th className="p-3.5">Direction & Date</th>
                    <th className="p-3.5">Subject Matter</th>
                    <th className="p-3.5">Parties (From / To)</th>
                    <th className="p-3.5">Service Method</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCorrespondence.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-[#0B1B3D]">{c.refNumber}</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold block w-fit mb-1 ${
                          c.direction === 'Outgoing' ? 'bg-blue-100 text-blue-900' : 'bg-emerald-100 text-emerald-900'
                        }`}>
                          {c.direction}
                        </span>
                        <span className="text-[11px] text-slate-500">{c.date}</span>
                      </td>
                      <td className="p-3.5 max-w-sm">
                        <p className="font-bold text-slate-900">{c.subject}</p>
                        <p className="text-[10px] font-mono text-slate-400">Matter: {c.matterRef}</p>
                      </td>
                      <td className="p-3.5 space-y-0.5 text-[11px]">
                        <p className="text-slate-500"><strong>From:</strong> {c.sender}</p>
                        <p className="text-slate-800"><strong>To:</strong> {c.recipient}</p>
                      </td>
                      <td className="p-3.5 font-medium text-slate-700">{c.method}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: Legal Research Repository */}
      {subTab === 'research' && (
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between gap-3">
            <div className="relative w-full max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search judicial authorities, statutes, citations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <button
              onClick={() => setShowAddResearch(true)}
              className="px-3.5 py-2 bg-[#800020] text-amber-200 font-bold rounded-lg flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>Record Case Precedent</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResearch.map((res) => (
              <div key={res.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="font-bold text-[#800020] uppercase text-[10px] tracking-wider">{res.court} ({res.year})</span>
                  <span className="font-mono text-[10px] text-slate-400">{res.citation}</span>
                </div>

                <h3 className="font-heading font-bold text-sm text-slate-900 leading-snug">{res.topic}</h3>
                <p className="text-[11px] text-slate-600 italic">“{res.caseAuthority}”</p>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                  <span className="font-bold text-[10px] uppercase text-slate-500">Legal Principle Established</span>
                  <p className="text-slate-800 leading-relaxed font-serif-legal text-[11px]">{res.legalPrinciple}</p>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                  <span>Statute: <strong>{res.statute}</strong></span>
                  {res.relatedMatter && <span className="font-mono text-[#0B1B3D] font-semibold">{res.relatedMatter}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 3: Appointments Calendar */}
      {subTab === 'appointments' && (
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm">Chambers Consultations & Client Appointments</h3>
            <button
              onClick={() => setShowAddAppt(true)}
              className="px-3.5 py-2 bg-[#0B1B3D] text-[#D4AF37] font-bold rounded-lg flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Book Consultation</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {appointments.map((appt) => (
              <div key={appt.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">{appt.type}</span>
                  <span className="font-mono text-slate-400 text-[10px]">{appt.matterRef}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{appt.clientName}</h4>
                <p className="text-slate-600 text-[11px] leading-relaxed">{appt.purpose}</p>

                <div className="pt-2 border-t border-slate-100 space-y-1 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-mono font-bold text-slate-800">{appt.date} at {appt.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{appt.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Counsel: {appt.lawyerName}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

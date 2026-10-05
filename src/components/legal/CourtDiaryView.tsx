import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Plus,
  Filter,
  Printer,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  X,
  FileText,
} from 'lucide-react';
import { CourtDiaryItem, CaseRecord } from '../../types/legal';

interface CourtDiaryViewProps {
  courtDiary: CourtDiaryItem[];
  cases: CaseRecord[];
  onAddCourtDate: (entry: CourtDiaryItem) => void;
  onUpdateCourtDate: (entry: CourtDiaryItem) => void;
}

export const CourtDiaryView: React.FC<CourtDiaryViewProps> = ({
  courtDiary,
  cases,
  onAddCourtDate,
  onUpdateCourtDate,
}) => {
  const [viewMode, setViewMode] = useState<'roster' | 'calendar'>('roster');
  const [selectedLawyer, setSelectedLawyer] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Court Date Form
  const [newCaseId, setNewCaseId] = useState(cases[0]?.id || '');
  const [newDate, setNewDate] = useState('2026-03-25');
  const [newTime, setNewTime] = useState('09:00 AM');
  const [newCourt, setNewCourt] = useState('Federal High Court, Abuja');
  const [newDivision, setNewDivision] = useState('Court 3');
  const [newJudge, setNewJudge] = useState('Hon. Justice Inyang Ekwo');
  const [newPurpose, setNewPurpose] = useState('Hearing of Motion on Notice');
  const [newCounsel, setNewCounsel] = useState('Barr. B. B. Bale, SAN');
  const [newNotes, setNewNotes] = useState('');

  const filteredEntries = courtDiary.filter((entry) => {
    const matchesLawyer = selectedLawyer === 'All' || entry.assignedCounsel === selectedLawyer;
    const matchesStatus = selectedStatus === 'All' || entry.status === selectedStatus;
    return matchesLawyer && matchesStatus;
  });

  const lawyers = [
    'All',
    'Barr. B. B. Bale, SAN',
    'Hadiza Mohammed, Esq.',
    'Chinedu Eze, Esq.',
    'Fatima Abdullahi, Esq.',
  ];

  const handlePrintCauseList = () => {
    window.print();
  };

  const handleSaveCourtDate = (e: React.FormEvent) => {
    e.preventDefault();
    const caseItem = cases.find((c) => c.id === newCaseId) || cases[0];

    const created: CourtDiaryItem = {
      id: 'DIARY-' + Date.now(),
      caseId: caseItem.id,
      suitNumber: caseItem.suitNumber,
      matterRef: caseItem.matterRef,
      courtName: newCourt,
      division: newDivision,
      courtDate: newDate,
      courtTime: newTime,
      judge: newJudge,
      purpose: newPurpose,
      assignedCounsel: newCounsel,
      supportingLawyer: 'Mrs. Folake Adeyemi',
      status: 'Scheduled',
      notes: newNotes,
    };

    onAddCourtDate(created);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
            Chambers Court Diary & Cause List
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Official appearance schedule across Federal High Court, State High Courts, Industrial Court, and Sharia divisions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrintCauseList}
            className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg border border-slate-300 flex items-center gap-1.5 shadow-xs transition-colors"
            title="Print Official Cause List"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span className="hidden sm:inline">Print Cause List</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#0B1B3D] hover:bg-[#1E3A8A] text-[#D4AF37] font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Schedule Fixture</span>
          </button>
        </div>
      </div>

      {/* Filter and View Toggles */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <label className="text-slate-500 font-semibold shrink-0">Filter Counsel:</label>
          <select
            value={selectedLawyer}
            onChange={(e) => setSelectedLawyer(e.target.value)}
            className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white"
          >
            {lawyers.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white"
          >
            <option value="All">All Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Heard">Heard</option>
            <option value="Adjourned">Adjourned</option>
          </select>
        </div>
      </div>

      {/* Roster / Cause List View */}
      <div className="space-y-4">
        {filteredEntries.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 hover:border-[#0B1B3D] transition-colors"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 bg-[#0B1B3D] text-white font-mono font-bold text-xs rounded-md">
                  {item.suitNumber}
                </span>
                <span className="px-2.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs rounded-md">
                  {item.courtDate} · {item.courtTime}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-500 bg-slate-100">
                  {item.matterRef}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  {item.courtName} ({item.division})
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-8 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Hearing Purpose</span>
                <h3 className="font-bold text-sm text-slate-900 leading-snug">{item.purpose}</h3>
                <p className="text-[11px] text-slate-600 mt-1">
                  Coram: <strong className="text-slate-900">{item.judge}</strong> · Notes: {item.notes || 'None'}
                </p>
              </div>

              <div className="md:col-span-4 md:text-right space-y-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Assigned Counsel</span>
                  <span className="font-bold text-[#0B1B3D] text-xs">{item.assignedCounsel}</span>
                </div>

                <div className="flex items-center md:justify-end gap-1.5">
                  <button
                    onClick={() => {
                      const newAdjournment = prompt('Enter new adjourned date (YYYY-MM-DD):', '2026-04-15');
                      if (newAdjournment) {
                        onUpdateCourtDate({
                          ...item,
                          status: 'Adjourned',
                          nextAdjournedDate: newAdjournment,
                          notes: `${item.notes} | Adjourned to ${newAdjournment}`,
                        });
                      }
                    }}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded"
                  >
                    Record Adjournment
                  </button>
                  <button
                    onClick={() => {
                      onUpdateCourtDate({ ...item, status: 'Heard' });
                    }}
                    className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-semibold rounded"
                  >
                    Mark Heard ✓
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden text-xs">
            <div className="p-5 bg-[#0B1B3D] text-white flex items-center justify-between">
              <h3 className="font-heading font-bold text-base">Schedule Court Appearance</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourtDate} className="p-6 space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Case / Suit *</label>
                <select
                  value={newCaseId}
                  onChange={(e) => setNewCaseId(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-xs bg-white font-mono"
                >
                  {cases.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.suitNumber} - {c.plaintiffClaimant} vs {c.defendantRespondent}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Court Date *</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Court Time</label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Court Name</label>
                  <input
                    type="text"
                    value={newCourt}
                    onChange={(e) => setNewCourt(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Judge / Coram</label>
                  <input
                    type="text"
                    value={newJudge}
                    onChange={(e) => setNewJudge(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Purpose of Hearing *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cross-examination of PW1 / Hearing of Motion"
                  value={newPurpose}
                  onChange={(e) => setNewPurpose(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assigned Counsel</label>
                <select
                  value={newCounsel}
                  onChange={(e) => setNewCounsel(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-xs bg-white"
                >
                  {lawyers.slice(1).map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Special Preparatory Instructions</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full p-2.5 border rounded-lg text-xs"
                  placeholder="Files to carry, witnesses to coordinate, judicial authorities..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-lg text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B1B3D] text-[#D4AF37] font-bold rounded-lg hover:bg-[#1E3A8A]"
                >
                  Save to Court Diary
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

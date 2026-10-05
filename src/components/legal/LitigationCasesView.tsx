import React, { useState } from 'react';
import {
  Scale,
  Search,
  Plus,
  Filter,
  Calendar,
  User,
  MapPin,
  Eye,
  Trash2,
  X,
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileText,
} from 'lucide-react';
import {
  CaseRecord,
  MatterRecord,
  CaseCategory,
} from '../../types/legal';

interface LitigationCasesViewProps {
  cases: CaseRecord[];
  matters: MatterRecord[];
  onAddCase: (caseItem: CaseRecord) => void;
  onUpdateCase: (caseItem: CaseRecord) => void;
  onDeleteCase: (id: string) => void;
}

export const LitigationCasesView: React.FC<LitigationCasesViewProps> = ({
  cases,
  matters,
  onAddCase,
  onUpdateCase,
  onDeleteCase,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [selectedCase, setSelectedCase] = useState<CaseRecord | null>(null);

  // New Case Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSuitNumber, setNewSuitNumber] = useState('');
  const [newMatterRef, setNewMatterRef] = useState(matters[0]?.reference || 'BBBC/2026/001');
  const [newPlaintiff, setNewPlaintiff] = useState('');
  const [newDefendant, setNewDefendant] = useState('');
  const [newCourtName, setNewCourtName] = useState('Federal High Court, Abuja Judicial Division');
  const [newDivision, setNewDivision] = useState('Abuja Central Division');
  const [newJudge, setNewJudge] = useState('Hon. Justice Inyang Ekwo');
  const [newCaseType, setNewCaseType] = useState<CaseCategory>('Land Matters');
  const [newCounsel, setNewCounsel] = useState('Barr. B. B. Bale, SAN');
  const [newOpposingCounsel, setNewOpposingCounsel] = useState('');
  const [newNextDate, setNewNextDate] = useState('2026-03-25');
  const [newPurpose, setNewPurpose] = useState('Hearing of Motion on Notice');
  const [newReliefs, setNewReliefs] = useState('');
  const [newSummary, setNewSummary] = useState('');

  const caseCategories = [
    'All',
    'Land Matters',
    'Recovery of Premises',
    'Commercial Litigation',
    'Debt Recovery',
    'Sharia / Islamic Law',
    'Fundamental Rights',
  ];

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.suitNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.plaintiffClaimant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.defendantRespondent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.courtName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.matterRef.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || c.caseType === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    const matter = matters.find((m) => m.reference === newMatterRef) || matters[0];

    const created: CaseRecord = {
      id: 'CASE-' + Date.now(),
      suitNumber: newSuitNumber,
      matterRef: matter.reference,
      clientId: matter.clientId,
      clientName: matter.clientName,
      plaintiffClaimant: newPlaintiff,
      defendantRespondent: newDefendant,
      courtName: newCourtName,
      judicialDivision: newDivision,
      judge: newJudge,
      caseType: newCaseType,
      dateFiled: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      counsel: newCounsel,
      opposingCounsel: newOpposingCounsel,
      caseStatus: 'Active Litigation',
      currentStage: 'Pleadings & Statements of Defense',
      nextCourtDate: newNextDate,
      nextCourtPurpose: newPurpose,
      reliefsClaims: newReliefs,
      summary: newSummary,
    };

    onAddCase(created);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
            Litigation & Case Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time cause lists, judicial divisions, pleadings stages, reliefs claimed, and next hearing fixtures.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#800020] hover:bg-[#6B1724] text-amber-200 font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition-all shrink-0 border border-amber-500/30"
        >
          <Plus className="w-4 h-4 text-[#D4AF37]" />
          <span>Docket New Suit</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by suit number, party, court, judge..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {caseCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                categoryFilter === cat
                  ? 'bg-[#800020] text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3.5">Suit Number</th>
                <th className="p-3.5">Parties to the Suit</th>
                <th className="p-3.5">Court & Coram</th>
                <th className="p-3.5">Current Stage</th>
                <th className="p-3.5">Next Court Fixture</th>
                <th className="p-3.5">Chambers Counsel</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCases.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5">
                    <span className="font-mono font-bold text-[#800020] text-xs block">{c.suitNumber}</span>
                    <span className="text-[10px] font-mono text-slate-400 font-semibold">{c.matterRef}</span>
                  </td>
                  <td className="p-3.5 max-w-xs">
                    <p className="font-bold text-slate-900 truncate hover:text-[#0B1B3D] cursor-pointer" onClick={() => setSelectedCase(c)}>
                      {c.plaintiffClaimant}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">vs {c.defendantRespondent}</p>
                  </td>
                  <td className="p-3.5">
                    <span className="font-semibold text-slate-800 block truncate">{c.courtName}</span>
                    <span className="text-[10px] text-slate-500">{c.judge} ({c.judicialDivision})</span>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                      {c.currentStage}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className="font-bold text-slate-900 block font-mono">{c.nextCourtDate}</span>
                    <span className="text-[10px] text-slate-500 truncate block max-w-xs">{c.nextCourtPurpose}</span>
                  </td>
                  <td className="p-3.5 font-medium text-[#0B1B3D]">
                    {c.counsel}
                  </td>
                  <td className="p-3.5 text-right whitespace-nowrap space-x-1">
                    <button
                      onClick={() => setSelectedCase(c)}
                      className="p-1.5 text-slate-500 hover:text-[#0B1B3D] hover:bg-slate-100 rounded"
                      title="View Case Docket"
                    >
                      <Eye className="w-4 h-4 inline" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete case ${c.suitNumber}?`)) {
                          onDeleteCase(c.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                      title="Delete Case"
                    >
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Case Docket Detail Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-xs">
            <div className="p-5 bg-[#800020] text-white flex items-center justify-between border-b border-[#540D17]">
              <div>
                <span className="font-mono text-amber-200 font-bold">{selectedCase.suitNumber}</span>
                <h3 className="font-heading text-lg font-bold text-white">
                  {selectedCase.plaintiffClaimant} vs {selectedCase.defendantRespondent}
                </h3>
                <p className="text-[11px] text-amber-100">
                  {selectedCase.courtName} · {selectedCase.judicialDivision} · Coram: {selectedCase.judge}
                </p>
              </div>
              <button onClick={() => setSelectedCase(null)} className="p-1.5 text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                  <span className="font-bold text-[10px] uppercase text-slate-400">Current Hearing Stage</span>
                  <p className="font-bold text-slate-900 text-sm">{selectedCase.currentStage}</p>
                  <p className="text-slate-500">Next Date: <strong className="text-[#800020] font-mono">{selectedCase.nextCourtDate}</strong></p>
                  <p className="text-slate-600 text-[11px] mt-1">{selectedCase.nextCourtPurpose}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                  <span className="font-bold text-[10px] uppercase text-slate-400">Representation</span>
                  <p><strong>Chambers Counsel:</strong> {selectedCase.counsel}</p>
                  <p><strong>Opposing Counsel:</strong> {selectedCase.opposingCounsel || 'To be served'}</p>
                  <p><strong>Linked Matter:</strong> {selectedCase.matterRef}</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-[10px] uppercase text-slate-400">Reliefs Claimed in Writ / Originating Process</span>
                <p className="text-slate-800 whitespace-pre-line leading-relaxed font-serif-legal text-[11px]">
                  {selectedCase.reliefsClaims || 'Declaratory and injunctive reliefs as endorsed on the claim.'}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-[10px] uppercase text-slate-400">Case Background & Evidence Summary</span>
                <p className="text-slate-800 leading-relaxed">{selectedCase.summary}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Case Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[90vh] overflow-y-auto text-xs">
            <div className="p-5 bg-[#800020] text-white flex items-center justify-between">
              <h3 className="font-heading font-bold text-base">Docket New Litigation Suit</h3>
              <button onClick={() => setShowAddModal(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCase} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Suit Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. FHC/ABJ/CS/482/2026"
                    value={newSuitNumber}
                    onChange={(e) => setNewSuitNumber(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Linked Matter Ref</label>
                  <select
                    value={newMatterRef}
                    onChange={(e) => setNewMatterRef(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs bg-white"
                  >
                    {matters.map((m) => (
                      <option key={m.id} value={m.reference}>
                        {m.reference} - {m.title.slice(0, 30)}...
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Plaintiff / Claimant *</label>
                  <input
                    type="text"
                    required
                    placeholder="Plaintiff Name"
                    value={newPlaintiff}
                    onChange={(e) => setNewPlaintiff(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Defendant / Respondent *</label>
                  <input
                    type="text"
                    required
                    placeholder="Defendant Name"
                    value={newDefendant}
                    onChange={(e) => setNewDefendant(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Court</label>
                  <input
                    type="text"
                    value={newCourtName}
                    onChange={(e) => setNewCourtName(e.target.value)}
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Next Court Date</label>
                  <input
                    type="date"
                    value={newNextDate}
                    onChange={(e) => setNewNextDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Next Fixture Purpose</label>
                  <input
                    type="text"
                    placeholder="e.g. Hearing of Injunction"
                    value={newPurpose}
                    onChange={(e) => setNewPurpose(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Reliefs Sought</label>
                <textarea
                  rows={2}
                  placeholder="Claims, declarations, injunctions..."
                  value={newReliefs}
                  onChange={(e) => setNewReliefs(e.target.value)}
                  className="w-full p-2.5 border rounded-lg text-xs"
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
                  className="px-5 py-2 bg-[#800020] text-amber-200 font-bold rounded-lg hover:bg-[#6B1724]"
                >
                  Docket Case
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

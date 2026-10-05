import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  Plus,
  Filter,
  Eye,
  Trash2,
  Scale,
  Calendar,
  Clock,
  User,
  MapPin,
  CheckCircle2,
  X,
  FileText,
  DollarSign,
  AlertCircle,
} from 'lucide-react';
import {
  MatterRecord,
  ClientRecord,
  CaseRecord,
  LegalDocumentRecord,
  TaskRecord,
  MatterStatus,
  PriorityLevel,
} from '../../types/legal';

interface MattersViewProps {
  matters: MatterRecord[];
  clients: ClientRecord[];
  cases: CaseRecord[];
  documents: LegalDocumentRecord[];
  tasks: TaskRecord[];
  onAddMatter: (matter: MatterRecord) => void;
  onUpdateMatter: (matter: MatterRecord) => void;
  onDeleteMatter: (id: string) => void;
  onOpenCaseDetail: (caseId: string) => void;
}

export const MattersView: React.FC<MattersViewProps> = ({
  matters,
  clients,
  cases,
  documents,
  tasks,
  onAddMatter,
  onUpdateMatter,
  onDeleteMatter,
  onOpenCaseDetail,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [selectedMatter, setSelectedMatter] = useState<MatterRecord | null>(null);

  // New Matter Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newClientId, setNewClientId] = useState(clients[0]?.id || '');
  const [newMatterType, setNewMatterType] = useState('Land Matters & Property Recovery');
  const [newAssignedPartner, setNewAssignedPartner] = useState('Barr. B. B. Bale, SAN');
  const [newAssignedCounsel, setNewAssignedCounsel] = useState('Hadiza Mohammed, Esq.');
  const [newPriority, setNewPriority] = useState<PriorityLevel>('Normal');
  const [newOpposingParty, setNewOpposingParty] = useState('');
  const [newOpposingCounsel, setNewOpposingCounsel] = useState('');
  const [newJurisdiction, setNewJurisdiction] = useState('Federal Capital Territory, Abuja');
  const [newCourt, setNewCourt] = useState('Federal High Court, Abuja Judicial Division');
  const [newDescription, setNewDescription] = useState('');
  const [newIsSharia, setNewIsSharia] = useState(false);

  const filteredMatters = matters.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.opposingParty && m.opposingParty.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || m.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || m.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleCreateMatter = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find((c) => c.id === newClientId) || clients[0];
    const newRef = `BBBC/2026/${String(matters.length + 1).padStart(3, '0')}`;

    const created: MatterRecord = {
      id: 'MAT-' + Date.now(),
      reference: newRef,
      title: newTitle,
      clientId: client.id,
      clientName: client.name,
      matterType: newMatterType,
      assignedPartner: newAssignedPartner,
      assignedCounsel: newAssignedCounsel,
      supportingStaff: 'Mrs. Folake Adeyemi',
      dateOpened: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Active',
      priority: newPriority,
      opposingParty: newOpposingParty,
      opposingCounsel: newOpposingCounsel,
      court: newCourt,
      jurisdiction: newJurisdiction,
      description: newDescription,
      isSharia: newIsSharia,
    };

    onAddMatter(created);
    setShowAddModal(false);
    setNewTitle('');
    setNewDescription('');
  };

  return (
    <div className="space-y-6">
      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
            Chambers Matters Register
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Central repository of active legal, property, recovery of premises, and litigation briefs.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#0B1B3D] hover:bg-[#1E3A8A] text-[#D4AF37] font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition-all shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Open New Matter</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by BBBC ref, title, client, opposing party..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-700"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Consultation">Consultation</option>
            <option value="Settled">Settled</option>
            <option value="Closed">Closed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-700"
          >
            <option value="All">All Priorities</option>
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Normal">Normal</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Matters Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3.5">Matter Reference</th>
                <th className="p-3.5">Matter Title & Subject</th>
                <th className="p-3.5">Client</th>
                <th className="p-3.5">Counsel Assigned</th>
                <th className="p-3.5">Priority</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMatters.map((matter) => (
                <tr key={matter.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-[#0B1B3D]">
                    {matter.reference}
                  </td>
                  <td className="p-3.5 max-w-sm">
                    <p
                      className="font-bold text-slate-900 truncate hover:text-[#0B1B3D] cursor-pointer"
                      onClick={() => setSelectedMatter(matter)}
                    >
                      {matter.title}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                      {matter.matterType} · {matter.jurisdiction}
                    </p>
                  </td>
                  <td className="p-3.5">
                    <span className="font-semibold text-slate-800 block truncate">{matter.clientName}</span>
                    {matter.opposingParty && (
                      <span className="text-[10px] text-slate-500 block truncate">
                        vs {matter.opposingParty}
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-slate-700">
                    <span className="block font-medium">{matter.assignedCounsel}</span>
                    <span className="text-[10px] text-slate-400">Lead: {matter.assignedPartner}</span>
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        matter.priority === 'Urgent'
                          ? 'bg-red-600 text-white font-bold'
                          : matter.priority === 'High'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {matter.priority}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                        matter.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {matter.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right whitespace-nowrap space-x-1">
                    <button
                      onClick={() => setSelectedMatter(matter)}
                      className="p-1.5 text-slate-500 hover:text-[#0B1B3D] hover:bg-slate-100 rounded"
                      title="View Matter Dossier"
                    >
                      <Eye className="w-4 h-4 inline" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete matter ${matter.reference}?`)) {
                          onDeleteMatter(matter.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                      title="Delete Matter"
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

      {/* Matter Dossier Modal */}
      {selectedMatter && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150 text-xs">
            <div className="p-5 bg-[#0B1B3D] text-white flex items-center justify-between">
              <div>
                <span className="font-mono text-[#D4AF37] font-bold">{selectedMatter.reference}</span>
                <h3 className="font-heading text-lg font-bold text-white">{selectedMatter.title}</h3>
                <p className="text-[11px] text-slate-300">
                  Client: {selectedMatter.clientName} · Opened: {selectedMatter.dateOpened}
                </p>
              </div>
              <button onClick={() => setSelectedMatter(null)} className="p-1.5 text-slate-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-5">
              {/* Core Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold text-[10px] uppercase text-slate-400">Assigned Team</span>
                  <p className="font-bold text-slate-900 mt-1">{selectedMatter.assignedCounsel}</p>
                  <p className="text-slate-500 text-[11px]">Partner: {selectedMatter.assignedPartner}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold text-[10px] uppercase text-slate-400">Adverse Parties</span>
                  <p className="font-bold text-slate-900 mt-1">{selectedMatter.opposingParty || 'N/A'}</p>
                  <p className="text-slate-500 text-[11px]">Counsel: {selectedMatter.opposingCounsel || 'N/A'}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold text-[10px] uppercase text-slate-400">Forum & Jurisdiction</span>
                  <p className="font-bold text-slate-900 mt-1">{selectedMatter.court || 'Pre-litigation negotiation'}</p>
                  <p className="text-slate-500 text-[11px]">{selectedMatter.jurisdiction}</p>
                </div>
              </div>

              {/* Case Summary Description */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <span className="font-bold text-[10px] uppercase text-slate-400">Chambers Brief & Matter Summary</span>
                <p className="text-slate-800 leading-relaxed">{selectedMatter.description}</p>
              </div>

              {/* Related Litigation Cases */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#800020]" />
                  <span>Related Litigation Cases in Court</span>
                </h4>
                {cases
                  .filter((c) => c.matterRef === selectedMatter.reference)
                  .map((c) => (
                    <div key={c.id} className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                      <div>
                        <span className="font-mono font-bold text-[#800020] text-xs">{c.suitNumber}</span>
                        <p className="font-semibold text-slate-900">{c.courtName} ({c.judicialDivision})</p>
                        <p className="text-[11px] text-slate-500">Next Court Date: {c.nextCourtDate} · {c.nextCourtPurpose}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                        {c.currentStage}
                      </span>
                    </div>
                  ))}
              </div>

              {/* Related Documents */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#0B1B3D]" />
                  <span>Pleadings & Legal Documents Filed</span>
                </h4>
                {documents
                  .filter((d) => d.matterRef === selectedMatter.reference)
                  .map((d) => (
                    <div key={d.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-800">{d.title}</span>
                      <span className="text-slate-500">{d.dateUploaded} ({d.fileSize})</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Matter Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[90vh] overflow-y-auto text-xs">
            <div className="p-5 bg-[#0B1B3D] text-white flex items-center justify-between">
              <h3 className="font-heading font-bold text-base">Open New Chambers Matter</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMatter} className="p-6 space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Matter Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chief Emeka Okonkwo v. First Bank of Nigeria Ltd"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Client</label>
                  <select
                    value={newClientId}
                    onChange={(e) => setNewClientId(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs bg-white"
                  >
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Matter Category</label>
                  <select
                    value={newMatterType}
                    onChange={(e) => setNewMatterType(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs bg-white"
                  >
                    <option value="Land Matters & Property Recovery">Land Matters & Property Recovery</option>
                    <option value="Civil & Commercial Litigation">Civil & Commercial Litigation</option>
                    <option value="Recovery of Premises">Recovery of Premises</option>
                    <option value="Sharia / Islamic Law">Sharia / Islamic Law</option>
                    <option value="Debt Recovery & Enforcement">Debt Recovery & Enforcement</option>
                    <option value="Corporate / Retainership">Corporate / Retainership</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assigned Partner</label>
                  <select
                    value={newAssignedPartner}
                    onChange={(e) => setNewAssignedPartner(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs bg-white"
                  >
                    <option value="Barr. B. B. Bale, SAN">Barr. B. B. Bale, SAN</option>
                    <option value="Hadiza Mohammed, Esq.">Hadiza Mohammed, Esq.</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assigned Counsel</label>
                  <select
                    value={newAssignedCounsel}
                    onChange={(e) => setNewAssignedCounsel(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs bg-white"
                  >
                    <option value="Chinedu Eze, Esq.">Chinedu Eze, Esq.</option>
                    <option value="Fatima Abdullahi, Esq.">Fatima Abdullahi, Esq.</option>
                    <option value="Hadiza Mohammed, Esq.">Hadiza Mohammed, Esq.</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Opposing Party</label>
                  <input
                    type="text"
                    placeholder="Adverse entity / Defendant"
                    value={newOpposingParty}
                    onChange={(e) => setNewOpposingParty(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Opposing Counsel</label>
                  <input
                    type="text"
                    placeholder="Adverse law firm"
                    value={newOpposingCounsel}
                    onChange={(e) => setNewOpposingCounsel(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as PriorityLevel)}
                    className="w-full px-3 py-2 border rounded-lg text-xs bg-white"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Court Forum</label>
                  <input
                    type="text"
                    value={newCourt}
                    onChange={(e) => setNewCourt(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Brief Description</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-2.5 border rounded-lg text-xs"
                  placeholder="Facts, reliefs sought, background..."
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
                  Create Matter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

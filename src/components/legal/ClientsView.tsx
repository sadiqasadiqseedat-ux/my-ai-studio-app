import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Scale,
  FileText,
  DollarSign,
  Edit,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  Eye,
} from 'lucide-react';
import {
  ClientRecord,
  MatterRecord,
  CaseRecord,
  InvoiceRecord,
  PropertyRecord,
  ClientType,
} from '../../types/legal';

interface ClientsViewProps {
  clients: ClientRecord[];
  matters: MatterRecord[];
  cases: CaseRecord[];
  invoices: InvoiceRecord[];
  properties: PropertyRecord[];
  onAddClient: (client: ClientRecord) => void;
  onUpdateClient: (client: ClientRecord) => void;
  onDeleteClient: (id: string) => void;
  onOpenMatterDetail: (matterRef: string) => void;
}

export const ClientsView: React.FC<ClientsViewProps> = ({
  clients,
  matters,
  cases,
  invoices,
  properties,
  onAddClient,
  onUpdateClient,
  onDeleteClient,
  onOpenMatterDetail,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedClient, setSelectedClient] = useState<ClientRecord | null>(null);
  const [clientProfileTab, setClientProfileTab] = useState<
    'overview' | 'matters' | 'cases' | 'properties' | 'billing' | 'notes'
  >('overview');

  // New Client Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState<Partial<ClientRecord>>({
    name: '',
    clientType: 'Individual',
    phone: '',
    email: '',
    address: '',
    occupation: '',
    identification: '',
    assignedLawyer: 'Barr. B. B. Bale, SAN',
    status: 'Active',
    notes: '',
  });

  const clientTypes: (ClientType | 'All')[] = [
    'All',
    'Individual',
    'Company',
    'Government Agency',
    'Organization',
    'Estate',
    'Association',
  ];

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery);
    const matchesType = selectedType === 'All' || c.clientType === selectedType;
    return matchesSearch && matchesType;
  });

  const handleSubmitNewClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const newClient: ClientRecord = {
      id: 'CL-' + String(clients.length + 1).padStart(3, '0'),
      name: formData.name,
      clientType: formData.clientType as ClientType,
      phone: formData.phone || '+234 ',
      email: formData.email || '',
      address: formData.address || '',
      occupation: formData.occupation || '',
      identification: formData.identification || '',
      dateOnboarded: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      assignedLawyer: formData.assignedLawyer || 'Barr. B. B. Bale, SAN',
      status: formData.status as 'Active' | 'Prospect' | 'Inactive',
      notes: formData.notes || '',
    };

    onAddClient(newClient);
    setShowAddModal(false);
    setFormData({
      name: '',
      clientType: 'Individual',
      phone: '',
      email: '',
      address: '',
      occupation: '',
      identification: '',
      assignedLawyer: 'Barr. B. B. Bale, SAN',
      status: 'Active',
      notes: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
            Client Directory & Retainers
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Complete institutional profiles, associated legal matters, properties, and billing ledgers.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#0B1B3D] hover:bg-[#1E3A8A] text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition-all shrink-0"
        >
          <Plus className="w-4 h-4 text-[#D4AF37]" />
          <span>New Client Onboarding</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by client name, email, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0B1B3D] focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 text-xs">
          {clientTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                selectedType === type
                  ? 'bg-[#0B1B3D] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Client Records Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3.5">Client ID / Name</th>
                <th className="p-3.5">Type & Occupation</th>
                <th className="p-3.5">Contact Details</th>
                <th className="p-3.5">Assigned Counsel</th>
                <th className="p-3.5">Active Matters</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.map((client) => {
                const clientMatters = matters.filter((m) => m.clientId === client.id || m.clientName === client.name);
                return (
                  <tr key={client.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5">
                      <span className="font-mono text-[10px] text-slate-400 block">{client.id}</span>
                      <span className="font-bold text-slate-900 text-xs hover:text-[#0B1B3D] cursor-pointer" onClick={() => setSelectedClient(client)}>
                        {client.name}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="font-medium text-slate-800 block">{client.clientType}</span>
                      <span className="text-[11px] text-slate-500">{client.occupation}</span>
                    </td>
                    <td className="p-3.5 space-y-0.5 text-[11px]">
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span className="font-mono">{client.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 truncate">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span>{client.email}</span>
                      </div>
                    </td>
                    <td className="p-3.5 font-medium text-[#0B1B3D]">
                      {client.assignedLawyer}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900">
                        {clientMatters.length} Matters
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          client.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {client.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap space-x-1">
                      <button
                        onClick={() => setSelectedClient(client)}
                        className="p-1.5 text-slate-500 hover:text-[#0B1B3D] hover:bg-slate-100 rounded"
                        title="View Full Profile"
                      >
                        <Eye className="w-4 h-4 inline" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete client ${client.name}?`)) {
                            onDeleteClient(client.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
                        title="Delete Client"
                      >
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Profile Modal (Overview, Matters, Cases, Properties, Invoices) */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="p-5 bg-[#0B1B3D] text-white flex items-center justify-between border-b border-[#1E3A8A]">
              <div>
                <span className="text-[10px] font-mono text-[#D4AF37] font-semibold">{selectedClient.id}</span>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-white">{selectedClient.name}</h3>
                <p className="text-xs text-slate-300">
                  {selectedClient.clientType} · {selectedClient.occupation} · Lead Counsel: {selectedClient.assignedLawyer}
                </p>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Tabs */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 bg-slate-50 text-xs font-semibold overflow-x-auto">
              {(['overview', 'matters', 'cases', 'properties', 'billing', 'notes'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setClientProfileTab(tab)}
                  className={`py-2 px-3 border-b-2 capitalize transition-colors ${
                    clientProfileTab === tab
                      ? 'border-[#0B1B3D] text-[#0B1B3D] font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Body */}
            <div className="p-6 overflow-y-auto flex-1 text-xs space-y-4">
              {clientProfileTab === 'overview' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <span className="font-bold text-[10px] uppercase text-slate-400 tracking-wider">Contact Particulars</span>
                    <p><strong>Phone:</strong> {selectedClient.phone}</p>
                    <p><strong>Email:</strong> {selectedClient.email}</p>
                    <p><strong>Office / Residential Address:</strong> {selectedClient.address}</p>
                    <p><strong>Identification:</strong> {selectedClient.identification || 'N/A'}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <span className="font-bold text-[10px] uppercase text-slate-400 tracking-wider">Retainership Data</span>
                    <p><strong>Onboarded Date:</strong> {selectedClient.dateOnboarded}</p>
                    <p><strong>Assigned Counsel:</strong> {selectedClient.assignedLawyer}</p>
                    <p><strong>Status:</strong> {selectedClient.status}</p>
                    <p><strong>Chambers Classification:</strong> Tier-1 Retainer</p>
                  </div>
                </div>
              )}

              {clientProfileTab === 'matters' && (
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-800">Related Legal Matters ({matters.filter(m => m.clientId === selectedClient.id || m.clientName === selectedClient.name).length})</h4>
                  {matters
                    .filter((m) => m.clientId === selectedClient.id || m.clientName === selectedClient.name)
                    .map((m) => (
                      <div key={m.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="font-mono font-bold text-[#0B1B3D] text-[11px]">{m.reference}</span>
                          <p className="font-semibold text-slate-900">{m.title}</p>
                          <p className="text-[11px] text-slate-500">{m.matterType} · {m.court}</p>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                          {m.status}
                        </span>
                      </div>
                    ))}
                </div>
              )}

              {clientProfileTab === 'cases' && (
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-800">Court Cases & Suits</h4>
                  {cases
                    .filter((c) => c.clientId === selectedClient.id || c.clientName === selectedClient.name)
                    .map((c) => (
                      <div key={c.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-[#800020]">{c.suitNumber}</span>
                          <span className="text-[10px] text-slate-500">{c.courtName}</span>
                        </div>
                        <p className="font-semibold text-slate-900">{c.plaintiffClaimant} vs {c.defendantRespondent}</p>
                        <p className="text-[11px] text-slate-600">Stage: {c.currentStage} · Next: {c.nextCourtDate}</p>
                      </div>
                    ))}
                </div>
              )}

              {clientProfileTab === 'properties' && (
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-800">Properties Owned or Managed</h4>
                  {properties
                    .filter((p) => p.landlordName.toLowerCase().includes(selectedClient.name.toLowerCase()))
                    .map((p) => (
                      <div key={p.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <span className="font-bold text-slate-900">{p.name} ({p.propertyCode})</span>
                        <p className="text-slate-600 text-[11px]">{p.address} · {p.occupiedUnits}/{p.totalUnits} Units Occupied</p>
                      </div>
                    ))}
                </div>
              )}

              {clientProfileTab === 'billing' && (
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-800">Invoices & Statements of Account</h4>
                  {invoices
                    .filter((inv) => inv.clientId === selectedClient.id || inv.clientName === selectedClient.name)
                    .map((inv) => (
                      <div key={inv.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="font-mono font-bold text-[#0B1B3D]">{inv.invoiceNumber}</span>
                          <p className="text-slate-700">{inv.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-mono font-bold text-slate-900">₦{inv.totalAmount.toLocaleString()}</p>
                          <span className="text-[10px] font-semibold text-emerald-700">Paid: ₦{inv.amountPaid.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {clientProfileTab === 'notes' && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-slate-800">Confidential Chambers Notes</h4>
                  <p className="text-slate-700 leading-relaxed">{selectedClient.notes || 'No confidential notes recorded yet.'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* New Client Modal Form */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 bg-[#0B1B3D] text-white flex items-center justify-between">
              <h3 className="font-heading font-bold text-base">New Client Intake Record</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitNewClient} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name / Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alhaji Garba Danladi / Horizon Properties Ltd"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Client Type</label>
                  <select
                    value={formData.clientType}
                    onChange={(e) => setFormData({ ...formData, clientType: e.target.value as ClientType })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                  >
                    <option value="Individual">Individual</option>
                    <option value="Company">Company</option>
                    <option value="Government Agency">Government Agency</option>
                    <option value="Organization">Organization</option>
                    <option value="Estate">Estate</option>
                    <option value="Association">Association</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Occupation / Business</label>
                  <input
                    type="text"
                    placeholder="e.g. Real Estate Developer"
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+234 800 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="client@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Address (Abuja / Lagos / Kano)</label>
                <input
                  type="text"
                  placeholder="Plot number, Street, District, State"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">NIN / RC Number</label>
                  <input
                    type="text"
                    placeholder="NIN: ... / RC: ..."
                    value={formData.identification}
                    onChange={(e) => setFormData({ ...formData, identification: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assigned Counsel</label>
                  <select
                    value={formData.assignedLawyer}
                    onChange={(e) => setFormData({ ...formData, assignedLawyer: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                  >
                    <option value="Barr. B. B. Bale, SAN">Barr. B. B. Bale, SAN</option>
                    <option value="Hadiza Mohammed, Esq.">Hadiza Mohammed, Esq.</option>
                    <option value="Chinedu Eze, Esq.">Chinedu Eze, Esq.</option>
                    <option value="Fatima Abdullahi, Esq.">Fatima Abdullahi, Esq.</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B1B3D] text-[#D4AF37] font-bold rounded-lg hover:bg-[#1E3A8A]"
                >
                  Save Client Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

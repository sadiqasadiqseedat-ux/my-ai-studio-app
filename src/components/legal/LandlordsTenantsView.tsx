import React, { useState } from 'react';
import {
  Users,
  KeyRound,
  Building2,
  Search,
  Plus,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  X,
  DollarSign,
} from 'lucide-react';
import { LandlordRecord, TenantRecord, PropertyRecord } from '../../types/legal';

interface LandlordsTenantsViewProps {
  landlords: LandlordRecord[];
  tenants: TenantRecord[];
  properties: PropertyRecord[];
  onAddLandlord: (l: LandlordRecord) => void;
  onAddTenant: (t: TenantRecord) => void;
  onDeleteTenant: (id: string) => void;
}

export const LandlordsTenantsView: React.FC<LandlordsTenantsViewProps> = ({
  landlords,
  tenants,
  properties,
  onAddLandlord,
  onAddTenant,
  onDeleteTenant,
}) => {
  const [activeTab, setActiveTab] = useState<'tenants' | 'landlords'>('tenants');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [showAddTenant, setShowAddTenant] = useState(false);
  const [showAddLandlord, setShowAddLandlord] = useState(false);

  // New Tenant Form
  const [tName, setTName] = useState('');
  const [tPhone, setTPhone] = useState('+234 ');
  const [tEmail, setTEmail] = useState('');
  const [tOccupation, setTOccupation] = useState('');
  const [tEmergency, setTEmergency] = useState('');
  const [tPropertyId, setTPropertyId] = useState(properties[0]?.id || '');
  const [tUnitNumber, setTUnitNumber] = useState('');
  const [tRent, setTRent] = useState(5000000);
  const [tDeposit, setTDeposit] = useState(500000);
  const [tService, setTService] = useState(600000);
  const [tStartDate, setTStartDate] = useState('2026-01-01');
  const [tEndDate, setTEndDate] = useState('2026-12-31');

  // New Landlord Form
  const [lName, setLName] = useState('');
  const [lCompany, setLCompany] = useState('');
  const [lPhone, setLPhone] = useState('+234 ');
  const [lEmail, setLEmail] = useState('');
  const [lAddress, setLAddress] = useState('');
  const [lBank, setLBank] = useState('');

  const filteredTenants = tenants.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.unitNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLandlords = landlords.filter((l) =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (l.companyName && l.companyName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateTenant = (e: React.FormEvent) => {
    e.preventDefault();
    const prop = properties.find((p) => p.id === tPropertyId) || properties[0];

    const created: TenantRecord = {
      id: 'TEN-' + Date.now(),
      name: tName,
      phone: tPhone,
      email: tEmail,
      address: `${tUnitNumber}, ${prop.name}`,
      occupation: tOccupation,
      emergencyContact: tEmergency,
      propertyId: prop.id,
      propertyName: prop.name,
      unitNumber: tUnitNumber,
      landlordId: prop.landlordId,
      landlordName: prop.landlordName,
      tenancyStart: tStartDate,
      tenancyEnd: tEndDate,
      rentAmount: Number(tRent),
      rentFrequency: 'Annual',
      securityDeposit: Number(tDeposit),
      serviceCharge: Number(tService),
      paymentStatus: 'Paid',
      tenancyStatus: 'Active',
      assignedLawyer: 'Chinedu Eze, Esq.',
    };

    onAddTenant(created);
    setShowAddTenant(false);
  };

  const handleCreateLandlord = (e: React.FormEvent) => {
    e.preventDefault();
    const created: LandlordRecord = {
      id: 'LL-' + Date.now(),
      name: lName,
      companyName: lCompany,
      phone: lPhone,
      email: lEmail,
      address: lAddress,
      ownedPropertyIds: [],
      totalProperties: 0,
      bankDetails: lBank,
    };
    onAddLandlord(created);
    setShowAddLandlord(false);
  };

  return (
    <div className="space-y-6">
      {/* Header & Sub-tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
            Landlords & Tenants Registers
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Institutional property owners, multi-property ownerships, tenant files, and lease tenures.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-200 p-1 rounded-lg flex items-center text-xs font-semibold">
            <button
              onClick={() => setActiveTab('tenants')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'tenants'
                  ? 'bg-white text-[#0B1B3D] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tenants Directory ({tenants.length})
            </button>
            <button
              onClick={() => setActiveTab('landlords')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'landlords'
                  ? 'bg-white text-[#0B1B3D] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Landlords Register ({landlords.length})
            </button>
          </div>

          {activeTab === 'tenants' ? (
            <button
              onClick={() => setShowAddTenant(true)}
              className="px-3.5 py-2 bg-[#0B1B3D] text-[#D4AF37] font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Onboard Tenant</span>
            </button>
          ) : (
            <button
              onClick={() => setShowAddLandlord(true)}
              className="px-3.5 py-2 bg-[#0B1B3D] text-[#D4AF37] font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Register Landlord</span>
            </button>
          )}
        </div>
      </div>

      {/* Tab 1: Tenants */}
      {activeTab === 'tenants' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between text-xs">
            <div className="relative w-full max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search tenant name, property, unit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Tenant Particulars</th>
                    <th className="p-3.5">Property & Unit</th>
                    <th className="p-3.5">Landlord</th>
                    <th className="p-3.5">Tenancy Period</th>
                    <th className="p-3.5">Annual Rent</th>
                    <th className="p-3.5">Payment Status</th>
                    <th className="p-3.5">Tenancy Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTenants.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5">
                        <span className="font-bold text-slate-900 block">{t.name}</span>
                        <span className="text-[11px] text-slate-500">{t.occupation} · {t.phone}</span>
                      </td>
                      <td className="p-3.5">
                        <span className="font-bold text-[#0B1B3D] block">{t.propertyName}</span>
                        <span className="text-[11px] font-mono text-slate-600 font-semibold">{t.unitNumber}</span>
                      </td>
                      <td className="p-3.5 text-slate-700 font-medium">
                        {t.landlordName}
                      </td>
                      <td className="p-3.5 text-[11px] font-mono">
                        <span>{t.tenancyStart}</span>
                        <span className="text-slate-400 block">to {t.tenancyEnd}</span>
                      </td>
                      <td className="p-3.5 font-mono font-bold text-slate-900">
                        ₦{t.rentAmount.toLocaleString()}
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          t.paymentStatus === 'Paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800 border border-red-300'
                        }`}>
                          {t.paymentStatus}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          t.tenancyStatus === 'Active'
                            ? 'bg-blue-100 text-blue-900'
                            : t.tenancyStatus === 'Expiring Soon'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-red-100 text-red-900'
                        }`}>
                          {t.tenancyStatus}
                        </span>
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete tenant ${t.name}?`)) onDeleteTenant(t.id);
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-red-50"
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
        </div>
      )}

      {/* Tab 2: Landlords */}
      {activeTab === 'landlords' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLandlords.map((l) => (
            <div key={l.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3 text-xs">
              <div className="flex items-start justify-between border-b pb-2">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{l.name}</h3>
                  {l.companyName && <p className="text-[11px] text-slate-500">{l.companyName}</p>}
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0B1B3D] text-white font-mono">
                  {l.id}
                </span>
              </div>

              <div className="space-y-1 text-slate-600 text-[11px]">
                <p><strong>Phone:</strong> {l.phone}</p>
                <p><strong>Email:</strong> {l.email}</p>
                <p><strong>Address:</strong> {l.address}</p>
                <p><strong>Bank:</strong> {l.bankDetails || 'N/A'}</p>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg text-[11px] flex items-center justify-between text-slate-700">
                <span>Properties Owned:</span>
                <span className="font-bold text-[#0B1B3D]">{l.ownedPropertyIds.length} Registered</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Tenant Modal */}
      {showAddTenant && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg max-h-[90vh] overflow-y-auto text-xs">
            <div className="p-5 bg-[#0B1B3D] text-white flex items-center justify-between">
              <h3 className="font-heading font-bold text-base">Onboard New Tenant</h3>
              <button onClick={() => setShowAddTenant(false)} className="text-slate-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTenant} className="p-6 space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tenant Full Name / Corporate Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Tech Solutions Ltd / Dr. Sani"
                  value={tName}
                  onChange={(e) => setTName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Telephone</label>
                  <input
                    type="text"
                    value={tPhone}
                    onChange={(e) => setTPhone(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={tEmail}
                    onChange={(e) => setTEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Property</label>
                  <select
                    value={tPropertyId}
                    onChange={(e) => setTPropertyId(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs bg-white"
                  >
                    {properties.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Unit Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Suite 302 / Flat 5A"
                    value={tUnitNumber}
                    onChange={(e) => setTUnitNumber(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Annual Rent (₦)</label>
                  <input
                    type="number"
                    value={tRent}
                    onChange={(e) => setTRent(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Deposit (₦)</label>
                  <input
                    type="number"
                    value={tDeposit}
                    onChange={(e) => setTDeposit(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Service (₦)</label>
                  <input
                    type="number"
                    value={tService}
                    onChange={(e) => setTService(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tenancy Start Date</label>
                  <input
                    type="date"
                    value={tStartDate}
                    onChange={(e) => setTStartDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tenancy Expiry Date</label>
                  <input
                    type="date"
                    value={tEndDate}
                    onChange={(e) => setTEndDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddTenant(false)}
                  className="px-4 py-2 border rounded-lg text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B1B3D] text-[#D4AF37] font-bold rounded-lg hover:bg-[#1E3A8A]"
                >
                  Save Tenant Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Landlord Modal */}
      {showAddLandlord && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden text-xs">
            <div className="p-5 bg-[#0B1B3D] text-white flex items-center justify-between">
              <h3 className="font-heading font-bold text-base">Register Landlord</h3>
              <button onClick={() => setShowAddLandlord(false)} className="text-slate-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLandlord} className="p-6 space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Landlord Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chief Emeka Okonkwo"
                  value={lName}
                  onChange={(e) => setLName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Corporate Entity (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Okonkwo Holdings Ltd"
                  value={lCompany}
                  onChange={(e) => setLCompany(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={lPhone}
                    onChange={(e) => setLPhone(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={lEmail}
                    onChange={(e) => setLEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Address</label>
                <input
                  type="text"
                  value={lAddress}
                  onChange={(e) => setLAddress(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Bank Account Remittance Details</label>
                <input
                  type="text"
                  placeholder="Bank Name / Account Name / Account Number"
                  value={lBank}
                  onChange={(e) => setLBank(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-xs font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddLandlord(false)}
                  className="px-4 py-2 border rounded-lg text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B1B3D] text-[#D4AF37] font-bold rounded-lg hover:bg-[#1E3A8A]"
                >
                  Save Landlord
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

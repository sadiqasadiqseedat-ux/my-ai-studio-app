import React, { useState } from 'react';
import {
  Building2,
  Search,
  Plus,
  MapPin,
  Users,
  Eye,
  Trash2,
  X,
  CheckCircle2,
  ShieldCheck,
  FileText,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';
import { PropertyRecord, UnitRecord, LandlordRecord, PropertyType } from '../../types/legal';

interface PropertyRegisterViewProps {
  properties: PropertyRecord[];
  units: UnitRecord[];
  landlords: LandlordRecord[];
  onAddProperty: (p: PropertyRecord) => void;
  onUpdateProperty: (p: PropertyRecord) => void;
  onDeleteProperty: (id: string) => void;
}

export const PropertyRegisterView: React.FC<PropertyRegisterViewProps> = ({
  properties,
  units,
  landlords,
  onAddProperty,
  onUpdateProperty,
  onDeleteProperty,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [selectedProperty, setSelectedProperty] = useState<PropertyRecord | null>(null);

  // New Property Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType>('Commercial Building');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('Federal Capital Territory');
  const [lga, setLga] = useState('Abuja Municipal Area Council (AMAC)');
  const [district, setDistrict] = useState('Wuse 2 District');
  const [landlordId, setLandlordId] = useState(landlords[0]?.id || '');
  const [totalUnits, setTotalUnits] = useState(10);
  const [titleInfo, setTitleInfo] = useState('C of O / Statutory Allocation');
  const [surveyNumber, setSurveyNumber] = useState('');
  const [assignedLawyer, setAssignedLawyer] = useState('Chinedu Eze, Esq.');
  const [notes, setNotes] = useState('');

  const filteredProperties = properties.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.propertyCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.landlordName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || p.propertyType === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleCreateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    const landlord = landlords.find((l) => l.id === landlordId) || landlords[0];
    const newCode = `PROP/ABJ/00${properties.length + 1}`;

    const created: PropertyRecord = {
      id: 'PROP-' + Date.now(),
      propertyCode: newCode,
      name,
      propertyType,
      address,
      state,
      lga,
      district,
      landlordId: landlord.id,
      landlordName: landlord.name,
      totalUnits: Number(totalUnits),
      occupiedUnits: 0,
      status: 'Active',
      titleInformation: titleInfo,
      surveyNumber: surveyNumber || 'FCT/SURV/' + Math.floor(1000 + Math.random() * 9000),
      assignedLawyer,
      notes,
    };

    onAddProperty(created);
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">
            Chambers Property Asset Register
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Commercial complexes, residential estates, plazas, and warehouses managed for institutional and private landlords.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#0B1B3D] hover:bg-[#1E3A8A] text-[#D4AF37] font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition-all shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Register New Property</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search property name, address, code, landlord..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-700"
          >
            <option value="All">All Property Types</option>
            <option value="Commercial Building">Commercial Building</option>
            <option value="Residential Plaza">Residential Plaza</option>
            <option value="Block of Flats">Block of Flats</option>
            <option value="Warehouse">Warehouse</option>
          </select>
        </div>
      </div>

      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProperties.map((p) => {
          const propUnits = units.filter((u) => u.propertyId === p.id);
          const occupancyRate = p.totalUnits > 0 ? Math.round((p.occupiedUnits / p.totalUnits) * 100) : 0;

          return (
            <div
              key={p.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4 hover:border-[#0B1B3D] transition-colors"
            >
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#0B1B3D] text-white">
                      {p.propertyCode}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                      {p.propertyType}
                    </span>
                  </div>
                  <h3
                    className="font-heading font-bold text-base text-slate-900 mt-1 cursor-pointer hover:text-[#0B1B3D]"
                    onClick={() => setSelectedProperty(p)}
                  >
                    {p.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{p.address} ({p.state})</span>
                  </p>
                </div>

                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                    p.status === 'Active' || p.status === 'Occupied'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {p.status}
                </span>
              </div>

              {/* Occupancy Progress */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-[11px] text-slate-600 font-medium">
                  <span>Occupancy: {p.occupiedUnits} / {p.totalUnits} Units</span>
                  <span className="font-bold text-[#0B1B3D]">{occupancyRate}% Occupied</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all"
                    style={{ width: `${occupancyRate}%` }}
                  />
                </div>
              </div>

              {/* Title & Landlord Particulars */}
              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-lg text-[11px] border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Landlord</span>
                  <span className="font-bold text-slate-800 truncate block">{p.landlordName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Title Info</span>
                  <span className="font-mono text-slate-700 truncate block">{p.titleInformation}</span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <span className="text-[11px] text-slate-500">Counsel: <strong>{p.assignedLawyer}</strong></span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedProperty(p)}
                    className="px-3 py-1.5 bg-[#0B1B3D] text-[#D4AF37] font-semibold rounded text-xs hover:bg-[#1E3A8A]"
                  >
                    View Units & Title
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete property ${p.name}?`)) onDeleteProperty(p.id);
                    }}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 inline" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Property Detail Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden text-xs">
            <div className="p-5 bg-[#0B1B3D] text-white flex items-center justify-between border-b border-[#1E3A8A]">
              <div>
                <span className="font-mono text-[#D4AF37] font-bold">{selectedProperty.propertyCode}</span>
                <h3 className="font-heading text-lg font-bold text-white">{selectedProperty.name}</h3>
                <p className="text-[11px] text-slate-300">{selectedProperty.address}</p>
              </div>
              <button onClick={() => setSelectedProperty(null)} className="p-1.5 text-slate-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                  <span className="font-bold text-[10px] uppercase text-slate-400">Title & Deed Registration</span>
                  <p><strong>Title:</strong> {selectedProperty.titleInformation}</p>
                  <p><strong>Survey:</strong> {selectedProperty.surveyNumber}</p>
                  <p><strong>LGA:</strong> {selectedProperty.lga}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                  <span className="font-bold text-[10px] uppercase text-slate-400">Ownership & Management</span>
                  <p><strong>Owner:</strong> {selectedProperty.landlordName}</p>
                  <p><strong>Managing Lawyer:</strong> {selectedProperty.assignedLawyer}</p>
                  <p><strong>Total Units:</strong> {selectedProperty.totalUnits} Units</p>
                </div>
              </div>

              {/* Units breakdown */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs">Individual Units in {selectedProperty.name}</h4>
                <div className="space-y-2">
                  {units
                    .filter((u) => u.propertyId === selectedProperty.id)
                    .map((u) => (
                      <div key={u.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-900">{u.unitNumber}</span>
                          <span className="text-slate-500 text-[11px] ml-2">({u.unitType})</span>
                          <p className="text-slate-600 text-[11px]">Tenant: {u.tenantName || 'None (Vacant)'}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-mono font-bold text-slate-900">₦{u.rentAnnual.toLocaleString()} /yr</p>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            u.occupancyStatus === 'Occupied' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                          }`}>
                            {u.occupancyStatus}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Property Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[90vh] overflow-y-auto text-xs">
            <div className="p-5 bg-[#0B1B3D] text-white flex items-center justify-between">
              <h3 className="font-heading font-bold text-base">Register New Property Asset</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProperty} className="p-6 space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Property Name / Estate *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Horizon Commercial Plaza / Danladi Residential Court"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Property Type</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                    className="w-full px-3 py-2 border rounded-lg text-xs bg-white"
                  >
                    <option value="Commercial Building">Commercial Building</option>
                    <option value="Residential Plaza">Residential Plaza</option>
                    <option value="Block of Flats">Block of Flats</option>
                    <option value="Warehouse">Warehouse</option>
                    <option value="Land Parcel">Land Parcel</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Landlord / Owner</label>
                  <select
                    value={landlordId}
                    onChange={(e) => setLandlordId(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs bg-white"
                  >
                    {landlords.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Physical Address *</label>
                <input
                  type="text"
                  required
                  placeholder="Street Address, District"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">LGA</label>
                  <input
                    type="text"
                    value={lga}
                    onChange={(e) => setLga(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Total Units</label>
                  <input
                    type="number"
                    value={totalUnits}
                    onChange={(e) => setTotalUnits(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Title Information</label>
                  <input
                    type="text"
                    placeholder="e.g. C of O No. 12948/FCT/2012"
                    value={titleInfo}
                    onChange={(e) => setTitleInfo(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assigned Lawyer</label>
                  <input
                    type="text"
                    value={assignedLawyer}
                    onChange={(e) => setAssignedLawyer(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-xs"
                  />
                </div>
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
                  Save Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

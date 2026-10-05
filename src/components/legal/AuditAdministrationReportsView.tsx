import React, { useState } from 'react';
import {
  FileCheck2,
  ShieldAlert,
  Settings,
  Users,
  Building2,
  Scale,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Printer,
  Download,
  Key,
  Shield,
  Eye,
  Check,
  TrendingUp,
} from 'lucide-react';
import {
  AuditLogRecord,
  FirmProfile,
  UserProfile,
  UserRole,
  CaseRecord,
  MatterRecord,
  InvoiceRecord,
  PropertyRecord,
  TenantRecord,
} from '../../types/legal';

interface AuditAdministrationReportsViewProps {
  initialSubTab?: 'reports' | 'audit-trail' | 'administration';
  auditLogs: AuditLogRecord[];
  firmProfile: FirmProfile;
  users: UserProfile[];
  currentUserRole: UserRole;
  onChangeUserRole: (role: UserRole) => void;
  onUpdateFirmProfile: (profile: FirmProfile) => void;
  cases: CaseRecord[];
  matters: MatterRecord[];
  invoices: InvoiceRecord[];
  properties: PropertyRecord[];
  tenants: TenantRecord[];
}

export const AuditAdministrationReportsView: React.FC<AuditAdministrationReportsViewProps> = ({
  initialSubTab = 'reports',
  auditLogs,
  firmProfile,
  users,
  currentUserRole,
  onChangeUserRole,
  onUpdateFirmProfile,
  cases,
  matters,
  invoices,
  properties,
  tenants,
}) => {
  const [subTab, setSubTab] = useState<'reports' | 'audit-trail' | 'administration'>(initialSubTab);
  const [auditSearch, setAuditSearch] = useState('');
  const [auditModuleFilter, setAuditModuleFilter] = useState<string>('All');
  const [firmForm, setFirmForm] = useState<FirmProfile>(firmProfile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const availableRoles: UserRole[] = [
    'Managing Partner',
    'Partner',
    'Associate / Counsel',
    'Litigation Secretary',
    'Accounts Officer',
    'Property/Facility Officer',
    'Administrator',
  ];

  // Reports calculations
  const totalBilled = invoices.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalCollected = invoices.reduce((acc, curr) => acc + curr.amountPaid, 0);
  const totalRentRoll = tenants.reduce((acc, curr) => acc + curr.rentAmount, 0);
  const totalUnits = properties.reduce((acc, curr) => acc + curr.totalUnits, 0);
  const occupiedUnits = properties.reduce((acc, curr) => acc + curr.occupiedUnits, 0);
  const occupancyRate = totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.userName.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.details.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.action.toLowerCase().includes(auditSearch.toLowerCase());
    const matchesModule = auditModuleFilter === 'All' || log.module === auditModuleFilter;
    return matchesSearch && matchesModule;
  });

  const handleSaveFirmProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateFirmProfile(firmForm);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const formatNaira = (val: number) => '₦' + val.toLocaleString('en-NG');

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-bold text-[#0B1B3D]">
              Chambers Governance, Audit & Analytics
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#0B1B3D] text-[#D4AF37] border border-[#D4AF37]/30">
              Chambers Registry FCT
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Performance analytics, immutable audit logs for RPC compliance, chambers settings, and role permissions.
          </p>
        </div>

        {subTab === 'reports' && (
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0B1B3D] text-white hover:bg-[#13274F] text-xs font-semibold shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Print Annual Chambers Report</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white px-4 rounded-xl shadow-xs">
        <button
          onClick={() => setSubTab('reports')}
          className={`py-3.5 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition ${
            subTab === 'reports'
              ? 'border-[#0B1B3D] text-[#0B1B3D]'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <FileCheck2 className="w-4 h-4 text-[#D4AF37]" />
          <span>Reports & Chambers Analytics</span>
        </button>
        <button
          onClick={() => setSubTab('audit-trail')}
          className={`py-3.5 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition ${
            subTab === 'audit-trail'
              ? 'border-[#0B1B3D] text-[#0B1B3D]'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-[#800020]" />
          <span>Chambers Audit Trail ({auditLogs.length})</span>
        </button>
        <button
          onClick={() => setSubTab('administration')}
          className={`py-3.5 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition ${
            subTab === 'administration'
              ? 'border-[#0B1B3D] text-[#0B1B3D]'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Administration & User Roles</span>
        </button>
      </div>

      {/* SUBTAB 1: REPORTS & ANALYTICS */}
      {subTab === 'reports' && (
        <div className="space-y-6">
          {/* Top metrics summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-400 uppercase">Active Litigation Dockets</span>
              <p className="text-3xl font-bold text-[#0B1B3D] mt-1">{cases.length}</p>
              <p className="text-xs text-emerald-600 mt-1">High Court, Appeal & Supreme Court</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-400 uppercase">Property Portfolio Yield</span>
              <p className="text-3xl font-bold text-[#800020] mt-1">{formatNaira(totalRentRoll)}</p>
              <p className="text-xs text-slate-500 mt-1">{occupancyRate}% Unit Occupancy Rate</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-400 uppercase">Total Professional Fees</span>
              <p className="text-3xl font-bold text-[#0B1B3D] mt-1">{formatNaira(totalBilled)}</p>
              <p className="text-xs text-emerald-600 mt-1">{formatNaira(totalCollected)} Collected</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-400 uppercase">Active Chambers Personnel</span>
              <p className="text-3xl font-bold text-slate-800 mt-1">{users.length}</p>
              <p className="text-xs text-slate-400 mt-1">Lawyers, Clerks, Property Officers</p>
            </div>
          </div>

          {/* Breakdown grids */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Caseload Breakdown by Category */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-heading font-bold text-base text-[#0B1B3D] flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#D4AF37]" />
                <span>Litigation Distribution by Legal Field</span>
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Land & Property Litigation</span>
                    <span className="text-[#0B1B3D]">38% (12 Cases)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#0B1B3D] h-full rounded-full" style={{ width: '38%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Commercial & Contract Disputes</span>
                    <span className="text-[#800020]">25% (8 Cases)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#800020] h-full rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Recovery of Premises & Tenancy Possession</span>
                    <span className="text-amber-700">20% (6 Cases)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-600 h-full rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Sharia & Islamic Estate Succession</span>
                    <span className="text-emerald-700">12% (4 Cases)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: '12%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Constitutional & Human Rights</span>
                    <span className="text-blue-700">5% (2 Cases)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full" style={{ width: '5%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Counsel Caseload */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-heading font-bold text-base text-[#0B1B3D] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#800020]" />
                <span>Counsel Caseload & Court Appearances</span>
              </h3>
              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-2.5 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-800">Barr. B. B. Bale, SAN</p>
                    <p className="text-slate-400 text-[11px]">Principal Counsel · Supreme Court & Court of Appeal</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 font-semibold">14 Matters</span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-800">Hadiza Mohammed, Esq.</p>
                    <p className="text-slate-400 text-[11px]">Partner · High Court FCT & Sharia Court of Appeal</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-semibold">11 Matters</span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-800">Chinedu Eze, Esq.</p>
                    <p className="text-slate-400 text-[11px]">Senior Associate · Real Estate & Commercial Conveyancing</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-semibold">9 Matters</span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-800">Fatima Abdullahi, Esq.</p>
                    <p className="text-slate-400 text-[11px]">Associate Counsel · Magistrate & District Courts</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 font-semibold">6 Matters</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: CHAMBERS AUDIT TRAIL */}
      {subTab === 'audit-trail' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search audit trail by user, action, details..."
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs text-slate-500">Module:</span>
              <select
                value={auditModuleFilter}
                onChange={(e) => setAuditModuleFilter(e.target.value)}
                className="px-2 py-1 rounded border border-slate-300 text-xs bg-white"
              >
                <option value="All">All Modules</option>
                <option value="Litigation">Litigation</option>
                <option value="Court Diary">Court Diary</option>
                <option value="Tenancy">Tenancy</option>
                <option value="Finance">Finance</option>
                <option value="Client Intake">Client Intake</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold uppercase border-b">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Chambers Staff</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Module</th>
                  <th className="py-3 px-4">Action Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800">
                      {log.userName}
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-[11px]">
                      {log.userRole}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          log.action.includes('CREATE') || log.action.includes('ADD')
                            ? 'bg-emerald-100 text-emerald-800'
                            : log.action.includes('DELETE')
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#0B1B3D]">
                      {log.module}
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      {log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 3: ADMINISTRATION & ROLES */}
      {subTab === 'administration' && (
        <div className="space-y-6">
          {/* Quick Active Role Switcher */}
          <div className="bg-[#0B1B3D] text-white p-6 rounded-xl border border-[#D4AF37]/30 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider block">
                  Simulate Role-Based Access Control (RBAC)
                </span>
                <h3 className="font-heading text-lg font-bold mt-0.5">
                  Currently Viewing As: <span className="text-white underline">{currentUserRole}</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">
                  Switch roles instantly to inspect interface permission guards, restricted financial ledgers, and secretarial cause lists.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {availableRoles.map((role) => (
                  <button
                    key={role}
                    onClick={() => onChangeUserRole(role)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      currentUserRole === role
                        ? 'bg-[#800020] text-amber-200 border border-amber-400/40 shadow-xs'
                        : 'bg-white/10 hover:bg-white/20 text-slate-200'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* User Roster Table */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="font-heading font-bold text-base text-[#0B1B3D]">
              Chambers Personnel & Access Credentials
            </h3>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase border-b">
                  <tr>
                    <th className="py-2.5 px-3">Name</th>
                    <th className="py-2.5 px-3">Official Role</th>
                    <th className="py-2.5 px-3">Supreme Court Bar Enrolment #</th>
                    <th className="py-2.5 px-3">Phone</th>
                    <th className="py-2.5 px-3">Email</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-bold text-slate-800">{u.name}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-medium">
                          {u.role}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-500">{u.barNumber || 'N/A (Non-Lawyer Staff)'}</td>
                      <td className="py-2.5 px-3 text-slate-600">{u.phone}</td>
                      <td className="py-2.5 px-3 text-slate-600">{u.email}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Chambers Firm Profile Form */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-heading font-bold text-base text-[#0B1B3D]">
                  Chambers Registration Profile & Branch Directory
                </h3>
                <p className="text-xs text-slate-500">Official practice details printed on legal processes and invoices.</p>
              </div>
              {savedSuccess && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  Saved Successfully!
                </span>
              )}
            </div>

            <form onSubmit={handleSaveFirmProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Chambers Firm Name</label>
                  <input
                    type="text"
                    value={firmForm.firmName}
                    onChange={(e) => setFirmForm({ ...firmForm, firmName: e.target.value })}
                    className="w-full p-2 border rounded-lg font-bold text-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Principal Counsel & Honors</label>
                  <input
                    type="text"
                    value={firmForm.principal}
                    onChange={(e) => setFirmForm({ ...firmForm, principal: e.target.value })}
                    className="w-full p-2 border rounded-lg font-bold text-[#800020]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Primary Telephone</label>
                  <input
                    type="text"
                    value={firmForm.phone}
                    onChange={(e) => setFirmForm({ ...firmForm, phone: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Email</label>
                  <input
                    type="email"
                    value={firmForm.email}
                    onChange={(e) => setFirmForm({ ...firmForm, email: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">FIRS Tax ID (TIN)</label>
                  <input
                    type="text"
                    value={firmForm.taxNumber}
                    onChange={(e) => setFirmForm({ ...firmForm, taxNumber: e.target.value })}
                    className="w-full p-2 border rounded-lg font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Abuja Headquarters Address</label>
                <input
                  type="text"
                  value={firmForm.address}
                  onChange={(e) => setFirmForm({ ...firmForm, address: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Lagos Branch Address</label>
                  <input
                    type="text"
                    value={firmForm.branchAddresses[0] || ''}
                    onChange={(e) => {
                      const newBranches = [...firmForm.branchAddresses];
                      newBranches[0] = e.target.value;
                      setFirmForm({ ...firmForm, branchAddresses: newBranches });
                    }}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kano Branch Address</label>
                  <input
                    type="text"
                    value={firmForm.branchAddresses[1] || ''}
                    onChange={(e) => {
                      const newBranches = [...firmForm.branchAddresses];
                      newBranches[1] = e.target.value;
                      setFirmForm({ ...firmForm, branchAddresses: newBranches });
                    }}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#0B1B3D] text-white rounded-lg font-semibold hover:bg-[#13274F]"
                >
                  Save Chambers Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

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
  Plus,
  KeyRound,
  Lock,
  X,
  UserPlus,
} from 'lucide-react';
import {
  AuditLogRecord,
  FirmProfile,
  UserProfile,
  UserRole,
  BranchRecord,
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
  branches: BranchRecord[];
  activeBranch: BranchRecord;
  users: UserProfile[];
  currentUser: UserProfile;
  currentUserRole: UserRole;
  onChangeUserRole: (role: UserRole) => void;
  onUpdateFirmProfile: (profile: FirmProfile) => void;
  onCreateBranch?: (branch: BranchRecord) => void;
  onCreateStaffUser?: (user: UserProfile) => void;
  onChangePassword?: (userId: string, newPass: string) => void;
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
  branches,
  activeBranch,
  users,
  currentUser,
  currentUserRole,
  onChangeUserRole,
  onUpdateFirmProfile,
  onCreateBranch,
  onCreateStaffUser,
  onChangePassword,
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

  // Modals
  const [showCreateBranchModal, setShowCreateBranchModal] = useState(false);
  const [showCreateStaffModal, setShowCreateStaffModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  // New Branch Form State (Principal Partner Only)
  const [newBranchName, setNewBranchName] = useState('');
  const [newBranchCode, setNewBranchCode] = useState('');
  const [newBranchCity, setNewBranchCity] = useState('');
  const [newBranchState, setNewBranchState] = useState('');
  const [newBranchAddress, setNewBranchAddress] = useState('');
  const [newBranchPhone, setNewBranchPhone] = useState('+234 ');
  const [newBranchEmail, setNewBranchEmail] = useState('');

  // New Staff User Form State (Branch Administrator Only)
  const [staffName, setStaffName] = useState('');
  const [staffRole, setStaffRole] = useState<UserRole>('Associate / Counsel');
  const [staffUsername, setStaffUsername] = useState('');
  const [staffPassword, setStaffPassword] = useState('admin');
  const [staffTitle, setStaffTitle] = useState('Associate Counsel');
  const [staffBarNumber, setStaffBarNumber] = useState('SCN/');
  const [staffPhone, setStaffPhone] = useState('+234 ');
  const [staffEmail, setStaffEmail] = useState('');

  // Change Password Form State
  const [newPasswordVal, setNewPasswordVal] = useState('');
  const [confirmPasswordVal, setConfirmPasswordVal] = useState('');
  const [passMessage, setPassMessage] = useState<{ text: string; error: boolean } | null>(null);

  const isPrincipalPartner =
    currentUserRole === 'Managing Partner' ||
    currentUserRole === 'Principal Partner' ||
    currentUser.username === 'b.bale' ||
    currentUser.username === 'principal';

  const isAdministrator = currentUserRole === 'Administrator';

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
      (log.userName || log.user || '').toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.details.toLowerCase().includes(auditSearch.toLowerCase()) ||
      log.action.toLowerCase().includes(auditSearch.toLowerCase());
    const matchesModule = auditModuleFilter === 'All' || log.module === auditModuleFilter;
    return matchesSearch && matchesModule;
  });

  // Filter users: if Principal Partner, can see all users; if Branch Administrator, sees users belonging to activeBranch
  const branchUsers = isPrincipalPartner
    ? users
    : users.filter((u) => u.branchId === activeBranch.id);

  const handleSaveFirmProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateFirmProfile(firmForm);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleCreateBranchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBranchName.trim()) return;

    const newBranch: BranchRecord = {
      id: 'branch-' + Date.now(),
      name: newBranchName.trim(),
      code: (newBranchCode || newBranchName.substring(0, 3)).toUpperCase(),
      city: newBranchCity || 'Metropolis',
      state: newBranchState || 'Nigeria',
      address: newBranchAddress,
      phone: newBranchPhone,
      email: newBranchEmail || `info.${newBranchName.toLowerCase().replace(/\s+/g, '')}@bbbalelaw.ng`,
      isHeadquarters: false,
      dateCreated: new Date().toISOString().split('T')[0],
    };

    if (onCreateBranch) {
      onCreateBranch(newBranch);
    }

    setShowCreateBranchModal(false);
    setNewBranchName('');
    setNewBranchCode('');
    setNewBranchCity('');
    setNewBranchState('');
    setNewBranchAddress('');
  };

  const handleCreateStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffName.trim() || !staffUsername.trim()) return;

    const newStaff: UserProfile = {
      id: 'user-' + Date.now(),
      name: staffName.trim(),
      username: staffUsername.trim().toLowerCase(),
      password: staffPassword || 'admin',
      email: staffEmail || `${staffUsername.trim().toLowerCase()}@bbbalelaw.ng`,
      role: staffRole,
      title: staffTitle || `${staffRole} (${activeBranch.name})`,
      branchId: activeBranch.id,
      branchName: activeBranch.name,
      barNumber: staffBarNumber,
      phone: staffPhone,
      isInitialAdmin: false,
      hasChangedDefaultPassword: false,
    };

    if (onCreateStaffUser) {
      onCreateStaffUser(newStaff);
    }

    setShowCreateStaffModal(false);
    setStaffName('');
    setStaffUsername('');
    setStaffPassword('admin');
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasswordVal) {
      setPassMessage({ text: 'Please enter a new password.', error: true });
      return;
    }
    if (newPasswordVal !== confirmPasswordVal) {
      setPassMessage({ text: 'Passwords do not match.', error: true });
      return;
    }

    if (onChangePassword) {
      onChangePassword(currentUser.id, newPasswordVal);
    }

    setPassMessage({ text: 'Password successfully updated!', error: false });
    setTimeout(() => {
      setShowChangePasswordModal(false);
      setPassMessage(null);
      setNewPasswordVal('');
      setConfirmPasswordVal('');
    }, 1500);
  };

  const formatNaira = (val: number) => '₦' + val.toLocaleString('en-NG');

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-bold text-[#0B1B3D]">
              Chambers Governance, Administration & Audit
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#0B1B3D] text-[#D4AF37] border border-[#D4AF37]/30">
              {activeBranch.name}
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Branch personnel provisioning, multi-branch partition, RBAC security credentials, and compliance logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {subTab === 'administration' && isAdministrator && (
            <button
              onClick={() => setShowCreateStaffModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#800020] text-amber-200 hover:bg-[#990026] text-xs font-semibold shadow-xs"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create Staff Login (My Branch)</span>
            </button>
          )}

          {subTab === 'administration' && isPrincipalPartner && (
            <button
              onClick={() => setShowCreateBranchModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0B1B3D] text-white hover:bg-[#13274F] text-xs font-semibold shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Establish New Branch</span>
            </button>
          )}

          {subTab === 'administration' && (
            <button
              onClick={() => setShowChangePasswordModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs"
            >
              <KeyRound className="w-3.5 h-3.5 text-slate-500" />
              <span>Change Password</span>
            </button>
          )}
        </div>
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
          <span>Reports & Analytics</span>
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
          <span>Audit Trail ({auditLogs.length})</span>
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
          <span>Branch Administration & Staff Credentials</span>
        </button>
      </div>

      {/* SUBTAB 1: REPORTS */}
      {subTab === 'reports' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-400 uppercase">Litigation Dockets ({activeBranch.name})</span>
              <p className="text-3xl font-bold text-[#0B1B3D] mt-1">{cases.length}</p>
              <p className="text-xs text-emerald-600 mt-1">Superior courts of record</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-400 uppercase">Property Portfolio Yield</span>
              <p className="text-3xl font-bold text-[#800020] mt-1">{formatNaira(totalRentRoll)}</p>
              <p className="text-xs text-slate-500 mt-1">{occupancyRate}% Occupancy Rate</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-400 uppercase">Total Professional Fees</span>
              <p className="text-3xl font-bold text-[#0B1B3D] mt-1">{formatNaira(totalBilled)}</p>
              <p className="text-xs text-emerald-600 mt-1">{formatNaira(totalCollected)} Collected</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-400 uppercase">Branch Staff Roster</span>
              <p className="text-3xl font-bold text-slate-800 mt-1">{branchUsers.length}</p>
              <p className="text-xs text-slate-400 mt-1">Registered branch personnel</p>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: AUDIT TRAIL */}
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
                <option value="Administration">Administration</option>
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
                      {log.userName || log.user}
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-[11px]">
                      {log.userRole || log.role}
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

      {/* SUBTAB 3: ADMINISTRATION */}
      {subTab === 'administration' && (
        <div className="space-y-6">
          {/* Branch & User Context Card */}
          <div className="bg-gradient-to-r from-[#0B1B3D] via-[#11244E] to-[#08152F] text-white p-6 rounded-2xl border border-[#D4AF37]/30 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#800020] text-amber-200 text-xs font-semibold border border-amber-400/30">
                    {activeBranch.name}
                  </span>
                  <span className="text-xs text-slate-300">
                    Active Session: <strong className="text-white">{currentUser.name}</strong> ({currentUser.role})
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-white">
                  Branch Isolation & Role-Based Administration
                </h3>
                <p className="text-xs text-slate-300 max-w-2xl">
                  {isPrincipalPartner
                    ? 'As Principal Partner, you have oversight across all chambers branches and the exclusive privilege to create new branches.'
                    : `You are authenticated in ${activeBranch.name}. You can only see records for this branch, and as Administrator, you are responsible for provisioning staff accounts for this branch.`}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {isAdministrator && (
                  <button
                    onClick={() => setShowCreateStaffModal(true)}
                    className="px-4 py-2 bg-[#800020] hover:bg-[#990026] text-amber-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Create Branch Staff</span>
                  </button>
                )}
                <button
                  onClick={() => setShowChangePasswordModal(true)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-white/20"
                >
                  <KeyRound className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Change Password</span>
                </button>
              </div>
            </div>
          </div>

          {/* Principal Partner: Branch Registry Card */}
          {isPrincipalPartner && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="font-heading font-bold text-base text-[#0B1B3D] flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#800020]" />
                    <span>Chambers Nationwide Branch Network ({branches.length} Active Branches)</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Only Principal Partner (Barr. B. B. Bale, SAN) can create new branches.
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateBranchModal(true)}
                  className="px-3.5 py-1.5 bg-[#0B1B3D] hover:bg-[#13274F] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Create New Branch</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {branches.map((b) => {
                  const adminAcc = users.find((u) => u.branchId === b.id && u.role === 'Administrator');
                  return (
                    <div
                      key={b.id}
                      className={`p-4 rounded-xl border ${
                        b.id === activeBranch.id ? 'border-[#800020] bg-amber-50/20' : 'border-slate-200 bg-white'
                      } space-y-2`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-heading font-bold text-sm text-[#0B1B3D]">{b.name}</span>
                        {b.isHeadquarters && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#800020] text-amber-200">
                            HQ
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{b.address}</p>
                      <div className="pt-2 border-t border-slate-100 text-[11px] space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Admin Username:</span>
                          <span className="font-mono font-semibold text-slate-800">{b.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Default Password:</span>
                          <span className="font-mono text-emerald-700">admin (modifiable)</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Branch Staff Roster & Login Details */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-heading font-bold text-base text-[#0B1B3D] flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#0B1B3D]" />
                  <span>
                    {isPrincipalPartner ? 'All Chambers Staff Accounts (Chambers-Wide)' : `Staff Credentials for ${activeBranch.name}`}
                  </span>
                </h3>
                <p className="text-xs text-slate-500">
                  {isAdministrator
                    ? 'Only you as Administrator can create login details for other staff and counsel in your branch.'
                    : 'Personnel authorized for this branch.'}
                </p>
              </div>

              {isAdministrator && (
                <button
                  onClick={() => setShowCreateStaffModal(true)}
                  className="px-3.5 py-1.5 bg-[#800020] hover:bg-[#990026] text-amber-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Add Staff Credentials</span>
                </button>
              )}
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase border-b">
                  <tr>
                    <th className="py-2.5 px-3">Name</th>
                    <th className="py-2.5 px-3">Login Username</th>
                    <th className="py-2.5 px-3">Role</th>
                    <th className="py-2.5 px-3">Branch</th>
                    <th className="py-2.5 px-3">Supreme Court Bar #</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {branchUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-bold text-slate-800">{u.name}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-[#0B1B3D]">{u.username}</td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            u.role === 'Administrator'
                              ? 'bg-[#800020] text-amber-200'
                              : u.role === 'Managing Partner'
                              ? 'bg-amber-100 text-amber-900 font-bold'
                              : 'bg-slate-100 text-slate-800'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">{u.branchName || activeBranch.name}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-500">{u.barNumber || 'N/A'}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                  {branchUsers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-slate-400">
                        No staff accounts created in this branch yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CREATE NEW BRANCH MODAL (PRINCIPAL PARTNER ONLY) */}
      {showCreateBranchModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-heading text-lg font-bold text-[#0B1B3D]">
                  Establish New Chambers Branch
                </h3>
                <p className="text-xs text-slate-500">
                  Exclusive Authority of Principal Counsel (Barr. B. B. Bale, SAN)
                </p>
              </div>
              <button onClick={() => setShowCreateBranchModal(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleCreateBranchSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Branch Name</label>
                <input
                  type="text"
                  placeholder="e.g. Port Harcourt Branch / Kaduna Branch"
                  value={newBranchName}
                  onChange={(e) => setNewBranchName(e.target.value)}
                  className="w-full p-2 border rounded-lg font-bold text-slate-800"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Branch Code (3 letters)</label>
                  <input
                    type="text"
                    placeholder="e.g. PHC / KAD"
                    value={newBranchCode}
                    onChange={(e) => setNewBranchCode(e.target.value.toUpperCase())}
                    maxLength={4}
                    className="w-full p-2 border rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">State & City</label>
                  <input
                    type="text"
                    placeholder="e.g. Port Harcourt, Rivers State"
                    value={newBranchCity}
                    onChange={(e) => {
                      setNewBranchCity(e.target.value);
                      setNewBranchState(e.target.value);
                    }}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Office Address</label>
                <input
                  type="text"
                  placeholder="e.g. Plot 24 Forces Avenue, Old GRA, Port Harcourt"
                  value={newBranchAddress}
                  onChange={(e) => setNewBranchAddress(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Telephone</label>
                  <input
                    type="text"
                    value={newBranchPhone}
                    onChange={(e) => setNewBranchPhone(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Email</label>
                  <input
                    type="email"
                    value={newBranchEmail}
                    onChange={(e) => setNewBranchEmail(e.target.value)}
                    placeholder="branch@bbbalelaw.ng"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-[11px] text-emerald-900 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Automatic Administrator Account Provisioning:</span>
                </p>
                <p>
                  Upon branch creation, an Administrator account is automatically initialized:
                </p>
                <p className="font-mono text-[10px]">
                  Username: <strong>{newBranchName || '[Branch Name]'}</strong> · Password: <strong>admin</strong>
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateBranchModal(false)}
                  className="px-4 py-2 border rounded-lg text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B1B3D] text-white rounded-lg font-semibold hover:bg-[#13274F]"
                >
                  Establish Branch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE STAFF CREDENTIALS MODAL (BRANCH ADMINISTRATOR ONLY) */}
      {showCreateStaffModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-heading text-lg font-bold text-[#800020]">
                  Create Staff Login Credentials
                </h3>
                <p className="text-xs text-slate-500">
                  Provisioning for <strong>{activeBranch.name}</strong> only
                </p>
              </div>
              <button onClick={() => setShowCreateStaffModal(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleCreateStaffSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  placeholder="e.g. Barr. Zainab Lawal / Chima Eze"
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assigned Role</label>
                  <select
                    value={staffRole}
                    onChange={(e) => setStaffRole(e.target.value as UserRole)}
                    className="w-full p-2 border rounded-lg bg-white"
                  >
                    <option value="Partner">Partner</option>
                    <option value="Associate / Counsel">Associate / Counsel</option>
                    <option value="Litigation Secretary">Litigation Secretary</option>
                    <option value="Clerk">Clerk / Bailiff Liaison</option>
                    <option value="Accounts Officer">Accounts Officer</option>
                    <option value="Property/Facility Officer">Property/Facility Officer</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Login Username</label>
                  <input
                    type="text"
                    placeholder="e.g. z.lawal"
                    value={staffUsername}
                    onChange={(e) => setStaffUsername(e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono font-bold"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Initial Password</label>
                  <input
                    type="text"
                    value={staffPassword}
                    onChange={(e) => setStaffPassword(e.target.value)}
                    className="w-full p-2 border rounded-lg font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Bar Enrolment # (optional)</label>
                  <input
                    type="text"
                    value={staffBarNumber}
                    onChange={(e) => setStaffBarNumber(e.target.value)}
                    placeholder="SCN/000000/2020"
                    className="w-full p-2 border rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={staffPhone}
                    onChange={(e) => setStaffPhone(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Email</label>
                  <input
                    type="email"
                    value={staffEmail}
                    onChange={(e) => setStaffEmail(e.target.value)}
                    placeholder="lawyer@bbbalelaw.ng"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-900">
                Staff member will be locked to <strong>{activeBranch.name}</strong> and cannot access records belonging to other branches.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateStaffModal(false)}
                  className="px-4 py-2 border rounded-lg text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#800020] text-white rounded-lg font-semibold hover:bg-[#990026]"
                >
                  Create Staff Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD MODAL */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-heading text-lg font-bold text-[#0B1B3D]">
                  Change Password
                </h3>
                <p className="text-xs text-slate-500">
                  User: <strong>{currentUser.username}</strong>
                </p>
              </div>
              <button onClick={() => setShowChangePasswordModal(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleChangePasswordSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPasswordVal}
                  onChange={(e) => setNewPasswordVal(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPasswordVal}
                  onChange={(e) => setConfirmPasswordVal(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              {passMessage && (
                <div
                  className={`p-2.5 rounded-lg text-xs flex items-center gap-2 ${
                    passMessage.error
                      ? 'bg-rose-50 border border-rose-200 text-rose-700'
                      : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                  }`}
                >
                  <span>{passMessage.text}</span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowChangePasswordModal(false)}
                  className="px-4 py-2 border rounded-lg text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B1B3D] text-white rounded-lg font-semibold hover:bg-[#13274F]"
                >
                  Save Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  Plus,
  Shield,
  User,
  LogOut,
  Scale,
  Briefcase,
  Users,
  Building2,
  Calendar,
  FileSpreadsheet,
  CheckCircle2,
  Lock,
  Globe,
  ChevronDown,
  KeyRound,
} from 'lucide-react';
import { UserRole, NotificationItem, BranchRecord, UserProfile } from '../../types/legal';

interface LegalNavbarProps {
  onToggleMobileSidebar: () => void;
  currentUser: UserProfile;
  currentUserRole: UserRole;
  onChangeUserRole: (role: UserRole) => void;
  branches: BranchRecord[];
  activeBranchId: string;
  onSelectBranch: (branchId: string) => void;
  onOpenQuickAction: (actionType: string) => void;
  onSearchSelect: (type: string, id: string) => void;
  notifications: NotificationItem[];
  onMarkNotificationAsRead: (id: string) => void;
  onOpenPublicSite: () => void;
  onLogout: () => void;
  onOpenChangePassword?: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const LegalNavbar: React.FC<LegalNavbarProps> = ({
  onToggleMobileSidebar,
  currentUser,
  currentUserRole,
  onChangeUserRole,
  branches,
  activeBranchId,
  onSelectBranch,
  onOpenQuickAction,
  notifications,
  onMarkNotificationAsRead,
  onOpenPublicSite,
  onLogout,
  onOpenChangePassword,
  searchQuery,
  onSearchChange,
}) => {
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [branchMenuOpen, setBranchMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const isPrincipalPartner =
    currentUserRole === 'Managing Partner' ||
    currentUserRole === 'Principal Partner' ||
    currentUser.username === 'b.bale' ||
    currentUser.username === 'principal';

  const activeBranch = branches.find((b) => b.id === activeBranchId);

  const availableRoles: UserRole[] = [
    'Managing Partner',
    'Partner',
    'Associate / Counsel',
    'Litigation Secretary',
    'Accounts Officer',
    'Property/Facility Officer',
    'Administrator',
  ];

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="sticky top-0 z-30 bg-[#0B1B3D] text-white border-b border-[#1E3A8A]/50 shadow-md">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Left Side: Mobile Menu Button + Law Firm Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 lg:hidden"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-[#800020] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow-xs">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-sm sm:text-base tracking-wide text-white">
                  B. B. BALE & CO.
                </span>
                
                {/* Branch Badge / Branch Switcher for Principal Partner */}
                {isPrincipalPartner ? (
                  <div className="relative">
                    <button
                      onClick={() => setBranchMenuOpen(!branchMenuOpen)}
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] bg-[#800020] text-amber-200 font-semibold border border-amber-500/40 hover:bg-[#990026] transition shadow-xs"
                      title="Principal Partner: Switch Branch View"
                    >
                      <Building2 className="w-3 h-3 text-[#D4AF37]" />
                      <span>{activeBranchId === 'all' ? 'All Branches (Chambers-Wide)' : activeBranch?.name || 'Abuja HQ'}</span>
                      <ChevronDown className="w-3 h-3 text-amber-200" />
                    </button>

                    {branchMenuOpen && (
                      <div className="absolute left-0 mt-1.5 w-60 bg-white text-slate-800 border border-slate-200 rounded-xl shadow-2xl py-1.5 z-50 text-xs">
                        <div className="px-3 py-1 font-bold text-[10px] uppercase tracking-wider text-slate-400 border-b border-slate-100">
                          Principal Partner Jurisdiction
                        </div>
                        <button
                          onClick={() => {
                            onSelectBranch('all');
                            setBranchMenuOpen(false);
                          }}
                          className={`w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center justify-between ${
                            activeBranchId === 'all' ? 'font-bold text-[#800020] bg-amber-50/50' : 'text-slate-700'
                          }`}
                        >
                          <span>🌐 All Branches (Chambers-Wide)</span>
                          {activeBranchId === 'all' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                        </button>
                        {branches.map((b) => (
                          <button
                            key={b.id}
                            onClick={() => {
                              onSelectBranch(b.id);
                              setBranchMenuOpen(false);
                            }}
                            className={`w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center justify-between ${
                              activeBranchId === b.id ? 'font-bold text-[#0B1B3D] bg-slate-100' : 'text-slate-700'
                            }`}
                          >
                            <span>🏢 {b.name}</span>
                            {activeBranchId === b.id && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-[#800020] text-amber-200 font-semibold border border-amber-500/30">
                    <Building2 className="w-3 h-3" />
                    <span>{currentUser.branchName || activeBranch?.name || 'Branch'}</span>
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                Secure. Organized. Professional.
              </p>
            </div>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div className="flex-1 max-w-md mx-2 sm:mx-6 hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search clients, matters, suit numbers, properties, tenants..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-[#08142D] border border-[#1E3A8A] rounded-lg text-xs text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right Side: Quick Action + Notifications + Role Switcher + Public Site */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Action + Button */}
          <div className="relative">
            <button
              onClick={() => setQuickMenuOpen(!quickMenuOpen)}
              className="px-2.5 sm:px-3 py-1.5 bg-[#D4AF37] hover:bg-[#C5A059] text-[#0B1B3D] font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
              title="Add New Record"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span className="hidden sm:inline">New Entry</span>
              <ChevronDown className="w-3 h-3 opacity-80" />
            </button>

            {quickMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white text-slate-800 border border-slate-200 rounded-xl shadow-2xl py-2 z-50 text-xs">
                <div className="px-3 py-1 font-bold text-[10px] uppercase tracking-wider text-slate-400 border-b border-slate-100">
                  Create New Record
                </div>
                <button
                  onClick={() => {
                    setQuickMenuOpen(false);
                    onOpenQuickAction('client');
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2"
                >
                  <Users className="w-4 h-4 text-[#0B1B3D]" />
                  <span>+ New Client</span>
                </button>
                <button
                  onClick={() => {
                    setQuickMenuOpen(false);
                    onOpenQuickAction('matter');
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4 text-[#0B1B3D]" />
                  <span>+ New Matter (BBBC Ref)</span>
                </button>
                <button
                  onClick={() => {
                    setQuickMenuOpen(false);
                    onOpenQuickAction('case');
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2"
                >
                  <Scale className="w-4 h-4 text-[#800020]" />
                  <span>+ New Litigation Case</span>
                </button>
                <button
                  onClick={() => {
                    setQuickMenuOpen(false);
                    onOpenQuickAction('court-date');
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-emerald-700" />
                  <span>+ Schedule Court Date</span>
                </button>
                <div className="border-t border-slate-100 my-1" />
                <div className="px-3 py-1 font-bold text-[10px] uppercase tracking-wider text-slate-400">
                  Property & Finance
                </div>
                <button
                  onClick={() => {
                    setQuickMenuOpen(false);
                    onOpenQuickAction('property');
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2"
                >
                  <Building2 className="w-4 h-4 text-[#0B1B3D]" />
                  <span>+ Add Property</span>
                </button>
                <button
                  onClick={() => {
                    setQuickMenuOpen(false);
                    onOpenQuickAction('tenant');
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-[#0B1B3D]" />
                  <span>+ Add Tenant & Tenancy</span>
                </button>
                <button
                  onClick={() => {
                    setQuickMenuOpen(false);
                    onOpenQuickAction('invoice');
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                  <span>+ Create Invoice</span>
                </button>
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 relative transition-colors"
              title="Chambers Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-600 text-white font-bold text-[10px] flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white text-slate-800 border border-slate-200 rounded-xl shadow-2xl overflow-hidden z-50 text-xs">
                <div className="p-3 bg-[#0B1B3D] text-white flex items-center justify-between border-b border-[#1E3A8A]">
                  <span className="font-semibold text-xs">Chambers Notifications ({unreadCount} new)</span>
                  <span className="text-[10px] text-amber-300">Live Feed</span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => onMarkNotificationAsRead(notif.id)}
                      className={`p-3 cursor-pointer hover:bg-slate-50 transition-colors ${
                        !notif.isRead ? 'bg-amber-50/60 font-medium' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-500 mb-0.5">
                        <span className="font-bold text-[#0B1B3D]">{notif.category}</span>
                        <span>{notif.timestamp}</span>
                      </div>
                      <p className="font-semibold text-slate-800 text-[11px]">{notif.title}</p>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{notif.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Public Website View Toggle */}
          <button
            onClick={onOpenPublicSite}
            className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 text-xs flex items-center gap-1.5 transition-colors"
            title="Switch to Public Chambers Website"
          >
            <Globe className="w-4 h-4 text-emerald-400" />
            <span className="hidden md:inline">Public Site</span>
          </button>

          {/* Role Switcher (Crucial for testing all user roles!) */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs transition-colors"
              title="Switch Active User Role for Testing"
            >
              <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline font-medium text-slate-200 text-[11px]">
                {currentUserRole}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-200 rounded-xl shadow-2xl py-2 z-50 text-xs">
                <div className="px-3 py-1 font-bold text-[10px] uppercase tracking-wider text-slate-400 border-b border-slate-100">
                  Switch Role-Based Access
                </div>
                {availableRoles.map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      onChangeUserRole(role);
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center justify-between ${
                      currentUserRole === role ? 'font-bold text-[#0B1B3D] bg-slate-100' : 'text-slate-700'
                    }`}
                  >
                    <span>{role}</span>
                    {currentUserRole === role && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Change Password Button */}
          {onOpenChangePassword && (
            <button
              onClick={onOpenChangePassword}
              className="p-1.5 sm:p-2 rounded-lg text-slate-300 hover:text-amber-300 hover:bg-white/5 transition-colors"
              title="Change Password"
            >
              <KeyRound className="w-4 h-4" />
            </button>
          )}

          {/* Secure Logout / Lock Session */}
          <button
            onClick={onLogout}
            className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors"
            title="Lock Session / Logout"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

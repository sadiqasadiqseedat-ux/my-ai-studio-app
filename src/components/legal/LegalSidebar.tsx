import React from 'react';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Scale,
  Calendar,
  Clock,
  CheckSquare,
  FileText,
  Mail,
  BookOpen,
  CalendarDays,
  Building2,
  UserCheck,
  KeyRound,
  FileCheck2,
  DollarSign,
  AlertOctagon,
  ArrowRightLeft,
  FileSpreadsheet,
  ShieldAlert,
  Bot,
  Globe,
  Settings,
  X,
  ChevronRight,
} from 'lucide-react';
import { UserRole } from '../../types/legal';

interface LegalSidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  currentUserRole: UserRole;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  unreadNotificationsCount: number;
}

export const LegalSidebar: React.FC<LegalSidebarProps> = ({
  currentTab,
  onSelectTab,
  currentUserRole,
  mobileOpen,
  onCloseMobile,
  unreadNotificationsCount,
}) => {
  const navSections: Array<{
    title: string;
    items: Array<{ id: string; label: string; icon: React.ComponentType<{ className?: string }>; isHighlight?: boolean }>;
  }> = [
    {
      title: 'PRACTICE OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'public-site', label: 'Public Website View', icon: Globe },
      ],
    },
    {
      title: 'LEGAL PRACTICE',
      items: [
        { id: 'clients', label: 'Clients Directory', icon: Users },
        { id: 'client-intake', label: 'Client Intake & Conflict Check', icon: UserCheck },
        { id: 'matters', label: 'Matters Register', icon: Briefcase },
        { id: 'litigation', label: 'Litigation & Cases', icon: Scale },
        { id: 'court-diary', label: 'Court Diary & Cause List', icon: Calendar },
        { id: 'deadlines', label: 'Deadlines & Limitation Dates', icon: Clock },
        { id: 'tasks', label: 'Tasks & Kanban', icon: CheckSquare },
      ],
    },
    {
      title: 'DOCUMENTATION & RESEARCH',
      items: [
        { id: 'documents', label: 'Documents & Pleadings', icon: FileText },
        { id: 'correspondence', label: 'Correspondence Register', icon: Mail },
        { id: 'research', label: 'Legal Research & Citations', icon: BookOpen },
        { id: 'appointments', label: 'Appointments Calendar', icon: CalendarDays },
      ],
    },
    {
      title: 'PROPERTY & TENANCY',
      items: [
        { id: 'properties', label: 'Property Register', icon: Building2 },
        { id: 'landlords-tenants', label: 'Landlords & Tenants', icon: KeyRound },
        { id: 'rent-management', label: 'Rent Tracking & Calendar', icon: DollarSign },
        { id: 'notices-recovery', label: 'Notices & Recovery of Premises', icon: AlertOctagon },
        { id: 'property-transactions', label: 'Transactions & Due Diligence', icon: ArrowRightLeft },
      ],
    },
    {
      title: 'FINANCE & AUDIT',
      items: [
        { id: 'billing', label: 'Billing, Invoices & Expenses', icon: FileSpreadsheet },
        { id: 'reports', label: 'Reports & Analytics', icon: FileCheck2 },
        { id: 'audit-trail', label: 'Chambers Audit Trail', icon: ShieldAlert },
        { id: 'administration', label: 'Administration & Roles', icon: Settings },
      ],
    },
    {
      title: 'INTELLIGENCE',
      items: [
        { id: 'ai-assistant', label: 'AI Legal Assistant', icon: Bot, isHighlight: true },
      ],
    },
  ];

  // Role based filtering logic (granular permissions)
  const isItemAllowed = (itemId: string): boolean => {
    if (currentUserRole === 'Managing Partner' || currentUserRole === 'Administrator') return true;
    if (currentUserRole === 'Accounts Officer') {
      return ['dashboard', 'billing', 'reports', 'clients'].includes(itemId);
    }
    if (currentUserRole === 'Property/Facility Officer') {
      return [
        'dashboard',
        'properties',
        'landlords-tenants',
        'rent-management',
        'notices-recovery',
        'property-transactions',
        'reports',
        'tasks',
      ].includes(itemId);
    }
    if (currentUserRole === 'Litigation Secretary' || currentUserRole === 'Clerk') {
      return [
        'dashboard',
        'clients',
        'matters',
        'litigation',
        'court-diary',
        'deadlines',
        'tasks',
        'documents',
        'correspondence',
        'appointments',
      ].includes(itemId);
    }
    return true; // Partners & Associates have broad legal access
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0B1B3D] text-slate-200 border-r border-[#1E3A8A]/50 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-[#1E3A8A]/40 flex items-center justify-between shrink-0 bg-[#08142D]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#800020] to-[#540D17] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-md shrink-0">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-sm tracking-wider text-white leading-tight">
                B. B. BALE & CO.
              </h1>
              <p className="text-[10px] text-[#D4AF37] tracking-widest font-semibold uppercase mt-0.5">
                CHAMBERS · ABUJA
              </p>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 lg:hidden"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confidentiality Watermark Badge */}
        <div className="px-5 py-2 bg-[#800020]/25 border-b border-[#800020]/40 flex items-center justify-between text-[10px] text-amber-200/90 font-medium">
          <span>RESTRICTED CHAMBERS ACCESS</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="System Online" />
        </div>

        {/* Scrollable Navigation Menu */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 text-xs">
          {navSections.map((sec) => {
            const filteredItems = sec.items.filter((item) => isItemAllowed(item.id));
            if (filteredItems.length === 0) return null;

            return (
              <div key={sec.title} className="space-y-1">
                <div className="px-3 pb-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  {sec.title}
                </div>
                {filteredItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        onCloseMobile();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left font-medium transition-all group ${
                        isActive
                          ? 'bg-[#1E3A8A] text-white shadow-xs font-semibold'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      } ${item.isHighlight && !isActive ? 'border border-[#D4AF37]/30 text-amber-200 bg-amber-500/10' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isActive
                              ? 'text-[#D4AF37]'
                              : item.isHighlight
                              ? 'text-[#D4AF37]'
                              : 'text-slate-400 group-hover:text-slate-200'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.id === 'court-diary' && (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-amber-500/20 text-[#D4AF37] border border-[#D4AF37]/30">
                          Active
                        </span>
                      )}

                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* User Identity Card at Footer */}
        <div className="p-3 bg-[#08142D] border-t border-[#1E3A8A]/40 text-xs">
          <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg bg-white/5 border border-white/5">
            <div className="w-8 h-8 rounded-full bg-[#800020] text-amber-300 font-bold flex items-center justify-center border border-[#D4AF37]/40 shrink-0 text-xs">
              {currentUserRole.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white truncate text-[11px]">{currentUserRole}</p>
              <p className="text-[10px] text-slate-400 truncate">B. B. Bale Chambers</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

import React from 'react';
import {
  Users,
  Briefcase,
  Scale,
  Calendar,
  Clock,
  Building2,
  DollarSign,
  AlertTriangle,
  ArrowRight,
  Plus,
  ShieldCheck,
  FileText,
  UserCheck,
  TrendingUp,
  MapPin,
  CheckCircle2,
  AlertOctagon,
} from 'lucide-react';
import {
  ClientRecord,
  MatterRecord,
  CaseRecord,
  CourtDiaryItem,
  DeadlineRecord,
  PropertyRecord,
  TenantRecord,
  InvoiceRecord,
  PaymentRecord,
  AuditLogRecord,
} from '../../types/legal';

interface DashboardViewProps {
  clients: ClientRecord[];
  matters: MatterRecord[];
  cases: CaseRecord[];
  courtDiary: CourtDiaryItem[];
  deadlines: DeadlineRecord[];
  properties: PropertyRecord[];
  tenants: TenantRecord[];
  invoices: InvoiceRecord[];
  payments: PaymentRecord[];
  auditLogs: AuditLogRecord[];
  onNavigateTab: (tab: string) => void;
  onOpenQuickAction: (actionType: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  clients,
  matters,
  cases,
  courtDiary,
  deadlines,
  properties,
  tenants,
  invoices,
  payments,
  auditLogs,
  onNavigateTab,
  onOpenQuickAction,
}) => {
  // Financial computations
  const totalInvoiced = invoices.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalPaid = payments.reduce((acc, curr) => acc + curr.amount, 0);
  const totalOutstanding = invoices.reduce((acc, curr) => acc + curr.balance, 0);

  // Property computations
  const totalUnits = properties.reduce((acc, curr) => acc + curr.totalUnits, 0);
  const totalOccupied = properties.reduce((acc, curr) => acc + curr.occupiedUnits, 0);
  const totalRentArrears = tenants
    .filter((t) => t.paymentStatus === 'Overdue' || t.paymentStatus === 'Partially Paid')
    .reduce((acc, curr) => acc + curr.rentAmount, 0);

  // Upcoming court dates (sorted ascending)
  const upcomingCourtDates = [...courtDiary]
    .filter((c) => c.status === 'Scheduled')
    .sort((a, b) => new Date(a.courtDate).getTime() - new Date(b.courtDate).getTime());

  // Urgent deadlines
  const urgentDeadlines = deadlines.filter((d) => d.status !== 'COMPLETED');

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Top Banner: Chambers Welcome & Quick Action Shortcuts */}
      <div className="bg-gradient-to-r from-[#0B1B3D] via-[#13274F] to-[#08142D] rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-[#1E3A8A]/50 relative overflow-hidden">
        {/* Subtle decorative crest watermark */}
        <div className="absolute right-4 -bottom-10 opacity-10 pointer-events-none">
          <Scale className="w-64 h-64 text-[#D4AF37]" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#800020] text-amber-200 text-xs font-semibold uppercase tracking-wider border border-amber-400/30">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Chambers Executive Roster · Abuja Central</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              B. B. Bale & Co. Chambers Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Centralized platform for legal practice, court diary, litigation, property assets, tenancies, documents, and client accounting.
            </p>
          </div>

          {/* Quick Action Shortcuts */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => onOpenQuickAction('matter')}
              className="px-3.5 py-2 bg-[#D4AF37] hover:bg-[#C5A059] text-[#0B1B3D] font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-md transition-all active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>New Matter</span>
            </button>
            <button
              onClick={() => onOpenQuickAction('court-date')}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-lg flex items-center gap-1.5 border border-white/20 transition-colors"
            >
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>Court Date</span>
            </button>
            <button
              onClick={() => onOpenQuickAction('property')}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-lg flex items-center gap-1.5 border border-white/20 transition-colors"
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Add Property</span>
            </button>
            <button
              onClick={() => onNavigateTab('client-intake')}
              className="px-3.5 py-2 bg-[#800020] hover:bg-[#6B1724] text-amber-200 font-medium text-xs rounded-lg flex items-center gap-1.5 border border-amber-500/30 transition-colors"
            >
              <UserCheck className="w-4 h-4" />
              <span>Conflict Check</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Matters */}
        <div
          onClick={() => onNavigateTab('matters')}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-[#0B1B3D] cursor-pointer transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Active Matters</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B1B3D] flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-heading text-slate-900">{matters.length}</div>
          <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <span className="text-emerald-700 font-semibold">{matters.filter((m) => m.priority === 'High' || m.priority === 'Urgent').length} high priority</span>
            <span>· All Divisions</span>
          </p>
        </div>

        {/* Card 2: Active Litigation Cases */}
        <div
          onClick={() => onNavigateTab('litigation')}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-[#800020] cursor-pointer transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Litigation Cases</span>
            <div className="w-8 h-8 rounded-lg bg-red-50 text-[#800020] flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-heading text-slate-900">{cases.length}</div>
          <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <span className="text-red-700 font-semibold">{cases.filter((c) => c.caseType === 'Land Matters' || c.caseType === 'Recovery of Premises').length} land/recovery suits</span>
          </p>
        </div>

        {/* Card 3: Upcoming Court Dates */}
        <div
          onClick={() => onNavigateTab('court-diary')}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-amber-500 cursor-pointer transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Upcoming Fixtures</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-heading text-slate-900">{upcomingCourtDates.length}</div>
          <p className="text-[11px] text-amber-700 font-semibold mt-1">
            Next: {upcomingCourtDates[0] ? upcomingCourtDates[0].courtDate : 'None scheduled'}
          </p>
        </div>

        {/* Card 4: Property Units & Rent */}
        <div
          onClick={() => onNavigateTab('properties')}
          className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-600 cursor-pointer transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Property Assets</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-heading text-slate-900">
            {totalOccupied} / {totalUnits} <span className="text-xs font-normal text-slate-500">Units Occupied</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
            <span>{properties.length} Estates/Plazas</span>
            <span className="text-red-600 font-semibold">₦{(totalRentArrears / 1000000).toFixed(1)}M Arrears</span>
          </p>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Court Diary Roster & Urgent Deadlines */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section: Upcoming Court Diary / Cause List */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#0B1B3D]" />
                <h2 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                  Court Diary & Cause List Roster
                </h2>
              </div>
              <button
                onClick={() => onNavigateTab('court-diary')}
                className="text-xs text-[#0B1B3D] hover:text-[#1E3A8A] font-semibold flex items-center gap-1"
              >
                <span>Full Diary</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {upcomingCourtDates.slice(0, 4).map((item) => (
                <div key={item.id} className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#0B1B3D] text-white">
                        {item.suitNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                        {item.courtDate} · {item.courtTime}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {item.courtName} ({item.division})
                    </span>
                  </div>

                  <p className="font-bold text-xs sm:text-sm text-slate-900 mb-1 leading-snug">
                    {item.purpose}
                  </p>

                  <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>
                      Coram: <strong className="text-slate-800">{item.judge}</strong>
                    </span>
                    <span>
                      Counsel: <strong className="text-[#0B1B3D]">{item.assignedCounsel}</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Deadlines & Statutory Limitation Tracker */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#800020]" />
                <h2 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                  Critical Deadlines & Limitation Tracking
                </h2>
              </div>
              <button
                onClick={() => onNavigateTab('deadlines')}
                className="text-xs text-[#800020] hover:text-[#540D17] font-semibold flex items-center gap-1"
              >
                <span>View All Deadlines</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-4 sm:p-5 space-y-3">
              {urgentDeadlines.map((dl) => (
                <div
                  key={dl.id}
                  className="p-3 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white hover:border-slate-300 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          dl.status === 'OVERDUE'
                            ? 'bg-red-100 text-red-800 border border-red-200'
                            : dl.status === 'DUE TODAY'
                            ? 'bg-red-600 text-white font-bold animate-pulse'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {dl.status}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 font-semibold">{dl.matterRef}</span>
                    </div>
                    <p className="font-semibold text-xs text-slate-900">{dl.title}</p>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <p className="text-xs font-mono font-bold text-slate-800">Due: {dl.dueDate}</p>
                    <p className="text-[10px] text-slate-500">Lawyer: {dl.assignedLawyer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Property Management Snapshot & Financial Summary */}
        <div className="lg:col-span-4 space-y-6">
          {/* Property & Recovery of Premises Summary */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-800" />
                <h3 className="font-heading font-bold text-sm text-slate-900">Property Portfolio</h3>
              </div>
              <button
                onClick={() => onNavigateTab('properties')}
                className="text-[11px] text-emerald-800 font-semibold hover:underline"
              >
                Register
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {properties.map((p) => (
                <div key={p.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 truncate">{p.name}</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-200 text-slate-700">
                      {p.propertyCode}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">{p.address}</p>
                  <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-200/60 text-slate-600">
                    <span>
                      Units: <strong>{p.occupiedUnits}/{p.totalUnits}</strong>
                    </span>
                    <span className="font-medium text-emerald-800">{p.landlordName}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigateTab('notices-recovery')}
                className="w-full py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs rounded-lg border border-amber-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                <AlertOctagon className="w-3.5 h-3.5 text-amber-700" />
                <span>Recovery of Premises & Notices</span>
              </button>
            </div>
          </div>

          {/* Billing & Client Accounts Ledger Card */}
          <div className="bg-[#0B1B3D] text-white rounded-xl border border-[#1E3A8A] p-5 space-y-4 shadow-md">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#D4AF37]" />
                <h3 className="font-heading font-bold text-sm text-white">Chambers Financials</h3>
              </div>
              <button
                onClick={() => onNavigateTab('billing')}
                className="text-[11px] text-[#D4AF37] hover:underline"
              >
                Ledger
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-white/5 rounded-lg border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">Total Invoiced (Fees + Outlays)</p>
                  <p className="text-lg font-mono font-bold text-white mt-0.5">
                    ₦{totalInvoiced.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded-lg border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-emerald-400">Payments Cleared & Received</p>
                  <p className="text-lg font-mono font-bold text-emerald-400 mt-0.5">
                    ₦{totalPaid.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-white/5 rounded-lg border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-amber-300">Outstanding Invoiced Balance</p>
                  <p className="text-base font-mono font-bold text-amber-300 mt-0.5">
                    ₦{totalOutstanding.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-[#800020]/40 border border-[#800020] rounded-lg text-[10px] text-amber-200/90 leading-tight">
              <strong>Statutory Reminder:</strong> All client trust disbursements and third-party property funds are held in strict compliance with the Legal Practitioners Act and NBA Rules of Professional Conduct.
            </div>
          </div>

          {/* Recent Audit Log Feed */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-heading font-bold text-xs uppercase tracking-wider text-slate-700">
                Recent Chambers Activity
              </span>
              <button
                onClick={() => onNavigateTab('audit-trail')}
                className="text-[10px] text-slate-500 hover:text-slate-800"
              >
                Audit Trail
              </button>
            </div>

            <div className="space-y-2.5 text-[11px] max-h-56 overflow-y-auto">
              {auditLogs.slice(0, 4).map((log) => (
                <div key={log.id} className="pb-2 border-b border-slate-100 last:border-none">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-semibold text-slate-700">{log.user}</span>
                    <span>{log.timestamp.split(' ')[1]}</span>
                  </div>
                  <p className="text-slate-600 mt-0.5">{log.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

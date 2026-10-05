import React, { useState } from 'react';
import {
  DollarSign,
  AlertOctagon,
  ArrowRightLeft,
  Building2,
  Users,
  Search,
  Plus,
  Printer,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  FileCheck2,
  ShieldAlert,
  X,
  Scale,
  MapPin,
} from 'lucide-react';
import {
  PropertyRecord,
  TenantRecord,
  RentRecord,
  NoticeRecord,
  PropertyTransactionRecord,
  DueDiligenceRecord,
  FirmProfile,
} from '../../types/legal';

interface TenancyNoticesTransactionsViewProps {
  initialSubTab?: 'rent-management' | 'notices-recovery' | 'property-transactions';
  properties: PropertyRecord[];
  tenants: TenantRecord[];
  firmProfile: FirmProfile;
  onAddNotice?: (notice: NoticeRecord) => void;
  onUpdateTenantPayment?: (tenantId: string, status: 'Paid' | 'Overdue' | 'Partially Paid') => void;
}

export const TenancyNoticesTransactionsView: React.FC<TenancyNoticesTransactionsViewProps> = ({
  initialSubTab = 'rent-management',
  properties,
  tenants,
  firmProfile,
  onAddNotice,
  onUpdateTenantPayment,
}) => {
  const [subTab, setSubTab] = useState<'rent-management' | 'notices-recovery' | 'property-transactions'>(initialSubTab);
  const [searchQuery, setSearchQuery] = useState('');

  // Notices State
  const [notices, setNotices] = useState<NoticeRecord[]>([
    {
      id: 'not-1',
      noticeType: "7-Day Notice of Owner's Intention to Apply to Recover Possession",
      tenantId: 'ten-2',
      tenantName: 'Chief Emeka Okonkwo',
      propertyId: 'prop-1',
      propertyName: 'Kano House Commercial Plaza',
      unitNumber: 'Suite 204 (2nd Floor)',
      dateIssued: '2026-03-01',
      expiryDate: '2026-03-08',
      statutoryPeriod: '7 Days',
      grounds: 'Persistent arrears of rent totaling ₦8,500,000 for 14 months and refusal to yield possession after expiration of Notice to Quit.',
      serviceMethod: 'Substituted Service (Pasted on outer entrance door in presence of witnesses)',
      servedBy: 'Bailiff Mohammed Sani & Chambers Litigation Clerk',
      status: 'Expired',
      courtCaseFiled: true,
      courtSuitNumber: 'CV/3891/2026 (High Court FCT)',
    },
    {
      id: 'not-2',
      noticeType: 'Notice to Quit (6 Months)',
      tenantId: 'ten-3',
      tenantName: 'Alhaji Sani Bello & Sons Ltd',
      propertyId: 'prop-2',
      propertyName: 'Maitama Luxury Court',
      unitNumber: 'Wing B, 5-Bedroom Penthouse',
      dateIssued: '2026-01-15',
      expiryDate: '2026-07-15',
      statutoryPeriod: '6 Months',
      grounds: 'Substantial redevelopment and structural renovation of the premises requiring vacant possession pursuant to Section 13(1) Recovery of Premises Act.',
      serviceMethod: 'Personal service acknowledged in writing by Managing Director',
      servedBy: 'Chinedu Eze, Esq.',
      status: 'Served',
      courtCaseFiled: false,
    },
    {
      id: 'not-3',
      noticeType: 'Notice to Quit (1 Month)',
      tenantId: 'ten-5',
      tenantName: 'Zainab Kabir Lawal',
      propertyId: 'prop-3',
      propertyName: 'Gwarinpa Residential Estate',
      unitNumber: 'Block C, Flat 4',
      dateIssued: '2026-03-10',
      expiryDate: '2026-04-10',
      statutoryPeriod: '1 Month',
      grounds: 'Breach of residential covenant: unauthorized conversion of residential flat into commercial warehousing causing nuisance.',
      serviceMethod: 'Delivered to adult inmate of premises',
      servedBy: 'Chambers Bailiff Liaison',
      status: 'Served',
      courtCaseFiled: false,
    },
  ]);

  // Transactions State
  const [transactions, setTransactions] = useState<PropertyTransactionRecord[]>([
    {
      id: 'tx-1',
      propertyTitle: 'Plot 1048 Cadastral Zone A04, Asokoro District, Abuja (2,400 sqm)',
      clientRole: 'Purchaser Legal Counsel',
      clientName: 'Alhaji Garba Danladi',
      otherPartyName: 'Ambassador Aminu Wali & Family',
      transactionType: 'Purchase / Conveyancing',
      contractSum: 480000000,
      legalFee: 24000000, // 5% legal drafting & search fee
      stage: 'Title Investigation / AGIS Search',
      status: 'In Progress',
      governorConsentStatus: 'Pending Documentation',
      dateInitiated: '2026-02-10',
      notes: 'Search report confirmed C of O No. 19280/FCT is unencumbered. Awaiting Deed of Assignment execution.',
    },
    {
      id: 'tx-2',
      propertyTitle: 'Commercial Warehouse Facility, Idu Industrial Area, Phase 1, Abuja',
      clientRole: 'Vendor Legal Counsel',
      clientName: 'Zenith Apex Logistics Ltd',
      otherPartyName: 'Kano Logistics Hub Ltd',
      transactionType: 'Commercial Lease (10 Years)',
      contractSum: 150000000,
      legalFee: 15000000,
      stage: 'Deed of Lease Stamped & Registered',
      status: 'Concluded',
      governorConsentStatus: 'Obtained',
      dateInitiated: '2025-11-20',
      notes: 'Stamped at Federal Inland Revenue Service (FIRS) Stamp Duties Office; tripartite counterpart lease delivered.',
    },
  ]);

  // Modals
  const [showAddNoticeModal, setShowAddNoticeModal] = useState(false);
  const [showPrintNoticeModal, setShowPrintNoticeModal] = useState<NoticeRecord | null>(null);
  const [showAddTxModal, setShowAddTxModal] = useState(false);

  // New Notice Form State
  const [noticeTenantId, setNoticeTenantId] = useState(tenants[0]?.id || '');
  const [noticeType, setNoticeType] = useState<string>("7-Day Notice of Owner's Intention to Apply to Recover Possession");
  const [noticePeriod, setNoticePeriod] = useState('7 Days');
  const [noticeGrounds, setNoticeGrounds] = useState('Arrears of rent and failure to deliver up vacant possession.');
  const [noticeService, setNoticeService] = useState('Personal Service on Tenant');

  // New Transaction Form State
  const [txTitle, setTxTitle] = useState('');
  const [txClientName, setTxClientName] = useState('Alhaji Garba Danladi');
  const [txOtherParty, setTxOtherParty] = useState('');
  const [txType, setTxType] = useState<'Sale / Purchase' | 'Lease Agreement' | 'Deed of Assignment' | 'Mortgage'>('Sale / Purchase');
  const [txAmount, setTxAmount] = useState<number>(120000000);
  const [txLegalFee, setTxLegalFee] = useState<number>(6000000);

  const formatNaira = (val: number) => '₦' + val.toLocaleString('en-NG');

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    const tenant = tenants.find((t) => t.id === noticeTenantId) || tenants[0];
    const newNotice: NoticeRecord = {
      id: 'not-' + Date.now(),
      noticeType: noticeType as any,
      tenantId: tenant.id,
      tenantName: tenant.name,
      propertyId: tenant.propertyId,
      propertyName: tenant.propertyName,
      unitNumber: tenant.unitNumber,
      dateIssued: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      statutoryPeriod: noticePeriod,
      grounds: noticeGrounds,
      serviceMethod: noticeService,
      servedBy: 'B. B. Bale & Co. Chambers Bailiff Liaison',
      status: 'Issued',
      courtCaseFiled: false,
    };

    setNotices([newNotice, ...notices]);
    if (onAddNotice) onAddNotice(newNotice);
    setShowAddNoticeModal(false);
  };

  const handleCreateTx = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txTitle) return;

    const newTx: PropertyTransactionRecord = {
      id: 'tx-' + Date.now(),
      propertyTitle: txTitle,
      clientRole: 'Purchaser Legal Counsel',
      clientName: txClientName,
      otherPartyName: txOtherParty || 'Undisclosed Vendor',
      transactionType: txType as any,
      contractSum: txAmount,
      legalFee: txLegalFee,
      stage: 'Title Investigation / AGIS Search',
      status: 'In Progress',
      governorConsentStatus: 'Pending Documentation',
      dateInitiated: new Date().toISOString().split('T')[0],
      notes: 'Initial instruction received; commencing official searches and due diligence.',
    };

    setTransactions([newTx, ...transactions]);
    setShowAddTxModal(false);
    setTxTitle('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-bold text-[#0B1B3D]">
              Tenancy, Statutory Notices & Transactions
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#800020] text-amber-200 border border-amber-500/30">
              Recovery of Premises Act & Conveyancing
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Rent collection ledgers, statutory notices to quit, 7-day intention notices, and Land Registry conveyancing due diligence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {subTab === 'notices-recovery' && (
            <button
              onClick={() => setShowAddNoticeModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#800020] text-white hover:bg-[#990026] text-xs font-semibold shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-amber-300" />
              <span>Draft Statutory Notice</span>
            </button>
          )}
          {subTab === 'property-transactions' && (
            <button
              onClick={() => setShowAddTxModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0B1B3D] text-white hover:bg-[#13274F] text-xs font-semibold shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>New Conveyancing / Search</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-slate-200 bg-white px-4 rounded-xl shadow-xs">
        <button
          onClick={() => setSubTab('rent-management')}
          className={`py-3.5 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition ${
            subTab === 'rent-management'
              ? 'border-[#0B1B3D] text-[#0B1B3D]'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Rent Tracking & Collection Ledger ({tenants.length})</span>
        </button>
        <button
          onClick={() => setSubTab('notices-recovery')}
          className={`py-3.5 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition ${
            subTab === 'notices-recovery'
              ? 'border-[#0B1B3D] text-[#0B1B3D]'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <AlertOctagon className="w-4 h-4 text-[#800020]" />
          <span>Notices & Recovery of Premises ({notices.length})</span>
        </button>
        <button
          onClick={() => setSubTab('property-transactions')}
          className={`py-3.5 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition ${
            subTab === 'property-transactions'
              ? 'border-[#0B1B3D] text-[#0B1B3D]'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <ArrowRightLeft className="w-4 h-4" />
          <span>Conveyancing, Searches & Transactions ({transactions.length})</span>
        </button>
      </div>

      {/* SUBTAB 1: RENT MANAGEMENT */}
      {subTab === 'rent-management' && (
        <div className="space-y-4">
          {/* Quick stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-slate-400 uppercase">Total Annual Rent Roll</span>
              <p className="text-2xl font-bold text-[#0B1B3D] mt-1">
                {formatNaira(tenants.reduce((acc, t) => acc + t.rentAmount, 0))}
              </p>
              <p className="text-xs text-slate-500 mt-1">Across all managed estate properties</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-rose-500 uppercase">Overdue Rent / Arrears</span>
              <p className="text-2xl font-bold text-rose-600 mt-1">
                {formatNaira(
                  tenants
                    .filter((t) => t.paymentStatus === 'Overdue' || t.paymentStatus === 'Partially Paid')
                    .reduce((acc, t) => acc + t.rentAmount, 0)
                )}
              </p>
              <p className="text-xs text-rose-500 mt-1">Eligible for Statutory Form E demand</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs font-semibold text-emerald-600 uppercase">Paid / In Good Standing</span>
              <p className="text-2xl font-bold text-emerald-700 mt-1">
                {tenants.filter((t) => t.paymentStatus === 'Paid').length} / {tenants.length} Tenants
              </p>
              <p className="text-xs text-slate-500 mt-1">Compliant lease agreements</p>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-heading font-bold text-sm text-[#0B1B3D]">
                Tenants Rent Roll & Expiry Calendar
              </h3>
              <div className="relative w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter tenant or property..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 border rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold uppercase border-b">
                  <tr>
                    <th className="py-3 px-4">Tenant Name</th>
                    <th className="py-3 px-4">Property & Unit</th>
                    <th className="py-3 px-4">Rent Amount</th>
                    <th className="py-3 px-4">Lease Term</th>
                    <th className="py-3 px-4">Expiry Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tenants
                    .filter(
                      (t) =>
                        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        t.propertyName.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50/80">
                        <td className="py-3 px-4">
                          <p className="font-bold text-slate-800">{t.name}</p>
                          <p className="text-slate-400 text-[10px]">{t.phone}</p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-slate-700 font-medium">{t.propertyName}</p>
                          <p className="text-slate-400 text-[10px]">{t.unitNumber}</p>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-[#0B1B3D]">
                          {formatNaira(t.rentAmount)}
                        </td>
                        <td className="py-3 px-4 text-slate-500">
                          {t.leaseStartDate || t.tenancyStart} to {t.leaseEndDate || t.tenancyEnd}
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-700">
                          {t.leaseEndDate || t.tenancyEnd}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                              t.paymentStatus === 'Paid'
                                ? 'bg-emerald-100 text-emerald-800'
                                : t.paymentStatus === 'Overdue'
                                ? 'bg-rose-100 text-rose-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {t.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1">
                          {t.paymentStatus !== 'Paid' && (
                            <button
                              onClick={() => {
                                if (onUpdateTenantPayment) onUpdateTenantPayment(t.id, 'Paid');
                              }}
                              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-semibold"
                            >
                              Mark Paid
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setNoticeTenantId(t.id);
                              setShowAddNoticeModal(true);
                            }}
                            className="px-2 py-1 bg-[#800020] hover:bg-[#990026] text-white rounded text-[10px] font-semibold"
                          >
                            Issue Notice
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

      {/* SUBTAB 2: NOTICES & RECOVERY OF PREMISES */}
      {subTab === 'notices-recovery' && (
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 space-y-1">
            <div className="flex items-center gap-2 font-bold text-amber-800">
              <ShieldAlert className="w-4 h-4 text-[#800020]" />
              <span>Nigerian Recovery of Premises Law Statutory Procedure:</span>
            </div>
            <p>
              1. <strong>Notice to Quit:</strong> Length determined by tenancy agreement or statutory period (Yearly: 6 Months; Half-Yearly: 3 Months; Quarterly: 3 Months; Monthly: 1 Month; Weekly: 7 Days). Notice must terminate at the eve of the anniversary of tenancy.
            </p>
            <p>
              2. <strong>7-Day Notice of Intention to Apply to Recover Possession (Form E):</strong> Served ONLY after the Notice to Quit has lapsed or where tenancy has determined by effluxion of time. Strict 7 clear days must be given before filing plaint/writ in Magistrate Court or High Court.
            </p>
          </div>

          {/* Notices Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notices.map((n) => (
              <div
                key={n.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:border-[#800020]/40 transition"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        n.noticeType.includes('7-Day')
                          ? 'bg-[#800020] text-amber-200'
                          : 'bg-blue-100 text-blue-900'
                      }`}
                    >
                      {n.noticeType}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        n.status === 'Expired'
                          ? 'bg-rose-100 text-rose-800'
                          : n.status === 'Served'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {n.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{n.tenantName}</h4>
                    <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      <span>{n.propertyName} · {n.unitNumber}</span>
                    </p>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between text-slate-600">
                      <span>Date Issued:</span>
                      <span className="font-medium text-slate-800">{n.dateIssued}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Statutory Expiry:</span>
                      <span className="font-bold text-[#800020]">{n.expiryDate}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Service Mode:</span>
                      <span className="text-[11px] truncate max-w-[150px]">{n.serviceMethod}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 italic line-clamp-2">
                    "{n.grounds}"
                  </p>

                  {n.courtCaseFiled && (
                    <div className="p-2 rounded bg-rose-50 border border-rose-200 text-[11px] text-rose-800 flex items-center gap-1.5 font-medium">
                      <Scale className="w-3.5 h-3.5 shrink-0" />
                      <span>Court Plaint Filed: {n.courtSuitNumber}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">ID: {n.id}</span>
                  <button
                    onClick={() => setShowPrintNoticeModal(n)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0B1B3D] text-white hover:bg-[#13274F] text-xs font-semibold"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Print Formal Notice</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: PROPERTY TRANSACTIONS & CONVEYANCING */}
      {subTab === 'property-transactions' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                      {tx.transactionType}
                    </span>
                    <h3 className="font-heading font-bold text-base text-[#0B1B3D] mt-2">
                      {tx.propertyTitle}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                    {tx.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Client:</span>
                    <span className="font-semibold text-slate-800">{tx.clientName} ({tx.clientRole})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Opposite Party:</span>
                    <span className="font-semibold text-slate-800">{tx.otherPartyName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Consideration / Value:</span>
                    <span className="font-bold text-[#0B1B3D] text-sm">{formatNaira(tx.contractSum)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Chambers Legal Fee:</span>
                    <span className="font-bold text-emerald-700 text-sm">{formatNaira(tx.legalFee)}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Current Conveyancing Stage:</span>
                    <span className="font-bold text-[#800020]">{tx.stage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Governor's Consent / AGIS Approval:</span>
                    <span className="font-medium text-slate-700">{tx.governorConsentStatus}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-100">
                  <strong>Counsel Notes:</strong> {tx.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DRAFT STATUTORY NOTICE MODAL */}
      {showAddNoticeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-heading text-lg font-bold text-[#800020]">
                  Draft Statutory Notice
                </h3>
                <p className="text-xs text-slate-500">Notice to Quit or Form E Notice of Owner's Intention</p>
              </div>
              <button onClick={() => setShowAddNoticeModal(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleCreateNotice} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Tenant</label>
                <select
                  value={noticeTenantId}
                  onChange={(e) => setNoticeTenantId(e.target.value)}
                  className="w-full p-2 border rounded-lg bg-white"
                >
                  {tenants.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} — {t.propertyName} ({t.unitNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Notice Type</label>
                <select
                  value={noticeType}
                  onChange={(e) => setNoticeType(e.target.value)}
                  className="w-full p-2 border rounded-lg bg-white"
                >
                  <option value="7-Day Notice of Owner's Intention to Apply to Recover Possession">
                    Form E: 7-Day Notice of Owner's Intention to Apply to Recover Possession
                  </option>
                  <option value="Notice to Quit (6 Months - Yearly Tenant)">
                    Notice to Quit (6 Months for Yearly Tenant)
                  </option>
                  <option value="Notice to Quit (1 Month - Monthly Tenant)">
                    Notice to Quit (1 Month for Monthly Tenant)
                  </option>
                  <option value="Notice to Quit (3 Months - Quarterly Tenant)">
                    Notice to Quit (3 Months for Quarterly Tenant)
                  </option>
                  <option value="Demand Notice for Outstanding Rent Arrears">
                    Formal Demand Notice for Outstanding Rent Arrears
                  </option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Statutory Notice Period</label>
                <input
                  type="text"
                  value={noticePeriod}
                  onChange={(e) => setNoticePeriod(e.target.value)}
                  placeholder="e.g. 7 Days or 6 Calendar Months"
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Grounds of Notice</label>
                <textarea
                  value={noticeGrounds}
                  onChange={(e) => setNoticeGrounds(e.target.value)}
                  rows={3}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Service Method</label>
                <input
                  type="text"
                  value={noticeService}
                  onChange={(e) => setNoticeService(e.target.value)}
                  placeholder="Personal Service / Substituted Service by Pasting"
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddNoticeModal(false)}
                  className="px-4 py-2 border rounded-lg text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#800020] text-white rounded-lg font-semibold hover:bg-[#990026]"
                >
                  Generate Statutory Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NEW TRANSACTION MODAL */}
      {showAddTxModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-heading text-lg font-bold text-[#0B1B3D]">
                  New Conveyancing / Title Search
                </h3>
                <p className="text-xs text-slate-500">Land Registry search and property conveyancing</p>
              </div>
              <button onClick={() => setShowAddTxModal(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleCreateTx} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Property Description & Location</label>
                <input
                  type="text"
                  placeholder="e.g. Plot 204 Katampe District, Abuja (1,200 sqm)"
                  value={txTitle}
                  onChange={(e) => setTxTitle(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Client Name</label>
                  <input
                    type="text"
                    value={txClientName}
                    onChange={(e) => setTxClientName(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Vendor / Other Party</label>
                  <input
                    type="text"
                    value={txOtherParty}
                    onChange={(e) => setTxOtherParty(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Transaction Value (₦)</label>
                  <input
                    type="number"
                    value={txAmount}
                    onChange={(e) => setTxAmount(Number(e.target.value))}
                    className="w-full p-2 border rounded-lg font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Legal Fee (₦)</label>
                  <input
                    type="number"
                    value={txLegalFee}
                    onChange={(e) => setTxLegalFee(Number(e.target.value))}
                    className="w-full p-2 border rounded-lg font-bold"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTxModal(false)}
                  className="px-4 py-2 border rounded-lg text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B1B3D] text-white rounded-lg font-semibold hover:bg-[#13274F]"
                >
                  Save Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FORM E / NOTICE TO QUIT PRINT MODAL */}
      {showPrintNoticeModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl border border-slate-300 space-y-6 my-8 print:p-0 print:border-none print:shadow-none">
            <div className="flex items-center justify-between border-b pb-4 print:hidden">
              <span className="text-xs font-semibold text-slate-500 uppercase">
                Official Statutory Notice Document
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#800020] text-white rounded-lg text-xs font-semibold hover:bg-[#990026]"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-200" />
                  <span>Print Statutory Notice</span>
                </button>
                <button
                  onClick={() => setShowPrintNoticeModal(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Letterhead */}
            <div className="text-center border-b-2 border-[#0B1B3D] pb-4">
              <h2 className="font-heading font-extrabold text-xl tracking-wider text-[#0B1B3D]">
                {firmProfile.firmName}
              </h2>
              <p className="text-xs font-serif-legal italic text-slate-600">
                {firmProfile.tagline}
              </p>
              <p className="text-[10px] text-slate-500 mt-1">
                {firmProfile.address} · Tel: {firmProfile.phone} · Email: {firmProfile.email}
              </p>
            </div>

            {/* Statutory Header */}
            <div className="text-center space-y-1">
              <h3 className="font-heading font-bold text-sm uppercase underline text-[#800020]">
                {showPrintNoticeModal.noticeType}
              </h3>
              <p className="text-xs font-semibold text-slate-700">
                PURSUANT TO THE RECOVERY OF PREMISES ACT & TENANCY LAWS OF THE FEDERAL CAPITAL TERRITORY, ABUJA
              </p>
            </div>

            {/* Content Body */}
            <div className="text-xs space-y-4 text-justify leading-relaxed text-slate-800">
              <p>
                <strong>TO:</strong> {showPrintNoticeModal.tenantName}<br />
                <strong>PREMISES:</strong> {showPrintNoticeModal.unitNumber}, {showPrintNoticeModal.propertyName}
              </p>

              <p>
                <strong>SIR / MADAM,</strong>
              </p>

              <p>
                WE, <strong>B. B. BALE & CO. CHAMBERS</strong>, ACTING AS SOLICITORS AND AGENTS TO YOUR LANDLORD, HEREBY GIVE YOU NOTICE that unless you peaceably deliver up possession of the premises aforesaid which you held of the Landlord, on or before the expiration of <strong>{showPrintNoticeModal.statutoryPeriod}</strong> from the service of this Notice:
              </p>

              <div className="p-3 bg-slate-50 border-l-4 border-[#800020] text-xs">
                <strong>GROUNDS UPON WHICH POSSESSION IS SOUGHT:</strong><br />
                {showPrintNoticeModal.grounds}
              </div>

              <p>
                TAKE NOTICE that upon the expiry of this Notice on the <strong>{showPrintNoticeModal.expiryDate}</strong>, our Client shall apply to the Court of competent jurisdiction for a Warrant to eject any person or persons therefrom pursuant to the Recovery of Premises Act.
              </p>

              <div className="pt-6 flex justify-between items-end">
                <div>
                  <p className="text-[11px] text-slate-500">DATED THIS {showPrintNoticeModal.dateIssued}</p>
                  <p className="text-[10px] text-slate-400 mt-2">Mode of Service: {showPrintNoticeModal.serviceMethod}</p>
                </div>
                <div className="text-right">
                  <div className="w-36 border-b border-slate-400 mb-1"></div>
                  <p className="font-bold text-xs text-[#0B1B3D]">B. B. BALE & CO. CHAMBERS</p>
                  <p className="text-[11px] text-slate-600">Legal Practitioners & Solicitors to Landlord</p>
                  <p className="text-[10px] text-slate-400">Abuja · Lagos · Kano</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

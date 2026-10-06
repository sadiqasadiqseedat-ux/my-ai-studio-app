import React, { useState } from 'react';
import {
  DollarSign,
  FileSpreadsheet,
  Plus,
  Search,
  Filter,
  Printer,
  Download,
  CheckCircle2,
  AlertCircle,
  Clock,
  Building2,
  User,
  CreditCard,
  Briefcase,
  X,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import {
  InvoiceRecord,
  PaymentRecord,
  ExpenseRecord,
  ClientRecord,
  MatterRecord,
  FirmProfile,
} from '../../types/legal';

interface BillingFinanceViewProps {
  invoices: InvoiceRecord[];
  payments: PaymentRecord[];
  expenses: ExpenseRecord[];
  clients: ClientRecord[];
  matters: MatterRecord[];
  firmProfile: FirmProfile;
  onAddInvoice: (inv: InvoiceRecord) => void;
  onRecordPayment: (payment: PaymentRecord) => void;
  onAddExpense: (expense: ExpenseRecord) => void;
}

export const BillingFinanceView: React.FC<BillingFinanceViewProps> = ({
  invoices,
  payments,
  expenses,
  clients,
  matters,
  firmProfile,
  onAddInvoice,
  onRecordPayment,
  onAddExpense,
}) => {
  const [activeTab, setActiveTab] = useState<'invoices' | 'payments' | 'expenses' | 'trust'>('invoices');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRecord | null>(null);

  // Modals
  const [showAddInvoiceModal, setShowAddInvoiceModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [targetInvoiceForPayment, setTargetInvoiceForPayment] = useState<InvoiceRecord | null>(null);

  // New Invoice State
  const [invClientId, setInvClientId] = useState(clients[0]?.id || '');
  const [invMatterRef, setInvMatterRef] = useState(matters[0]?.reference || 'BBBC/2026/001');
  const [invDueDate, setInvDueDate] = useState('2026-04-15');
  const [invItems, setInvItems] = useState<Array<{ description: string; amount: number }>>([
    { description: 'Professional Legal Fee for Legal Representation', amount: 1500000 },
    { description: 'Court Filing Fees and Service of Process Disbursements', amount: 120000 },
  ]);
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemAmount, setNewItemAmount] = useState<number>(50000);

  // Payment Form State
  const [payAmount, setPayAmount] = useState<number>(500000);
  const [payMethod, setPayMethod] = useState<'Bank Transfer' | 'Cheque' | 'Direct Deposit' | 'Cash'>('Bank Transfer');
  const [payReference, setPayReference] = useState('TRF/' + Math.floor(100000 + Math.random() * 900000));
  const [payNotes, setPayNotes] = useState('Payment remitted to GTBank Trust Account');

  // Expense Form State
  const [expCategory, setExpCategory] = useState<'Court Fees' | 'Process Serving' | 'Travel' | 'Title Search' | 'Office / Admin' | 'Other'>('Court Fees');
  const [expDesc, setExpDesc] = useState('');
  const [expAmount, setExpAmount] = useState<number>(35000);
  const [expMatter, setExpMatter] = useState(matters[0]?.reference || 'BBBC/2026/001');

  // Financial calculations
  const totalBilled = invoices.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalCollected = payments.reduce((acc, curr) => acc + curr.amount, 0);
  const totalOutstanding = invoices.reduce((acc, curr) => acc + curr.balance, 0);
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inv.matterReference || inv.matterRef || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddItemToInvoice = () => {
    if (!newItemDesc || newItemAmount <= 0) return;
    setInvItems([...invItems, { description: newItemDesc, amount: newItemAmount }]);
    setNewItemDesc('');
    setNewItemAmount(50000);
  };

  const handleRemoveItem = (index: number) => {
    setInvItems(invItems.filter((_, idx) => idx !== index));
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find((c) => c.id === invClientId) || clients[0];
    const subtotal = invItems.reduce((acc, item) => acc + item.amount, 0);
    const vat = Math.round(subtotal * 0.075); // 7.5% VAT Nigeria
    const totalAmount = subtotal + vat;

    const newInvoice: InvoiceRecord = {
      id: 'inv-' + Date.now(),
      invoiceNumber: `INV-2026-${String(invoices.length + 1).padStart(3, '0')}`,
      clientId: client.id,
      clientName: client.name,
      matterReference: invMatterRef,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: invDueDate,
      items: invItems.map((item, idx) => ({
        id: `item-${idx}`,
        description: item.description,
        amount: item.amount,
        quantity: 1,
        unitPrice: item.amount,
      })),
      subtotal,
      vat,
      totalAmount,
      amountPaid: 0,
      balance: totalAmount,
      status: 'Pending',
    };

    onAddInvoice(newInvoice);
    setShowAddInvoiceModal(false);
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetInvoiceForPayment) return;

    const newPayment: PaymentRecord = {
      id: 'pay-' + Date.now(),
      invoiceId: targetInvoiceForPayment.id,
      invoiceNumber: targetInvoiceForPayment.invoiceNumber,
      clientName: targetInvoiceForPayment.clientName,
      amount: payAmount,
      date: new Date().toISOString().split('T')[0],
      paymentMethod: payMethod,
      reference: payReference,
      status: 'Verified',
      notes: payNotes,
    };

    onRecordPayment(newPayment);
    setShowPaymentModal(false);
    setTargetInvoiceForPayment(null);
  };

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expDesc || expAmount <= 0) return;

    const newExp: ExpenseRecord = {
      id: 'exp-' + Date.now(),
      matterReference: expMatter,
      category: expCategory,
      description: expDesc,
      amount: expAmount,
      date: new Date().toISOString().split('T')[0],
      recordedBy: 'Accounts Officer',
      isBillable: true,
      status: 'Approved',
    };

    onAddExpense(newExp);
    setShowExpenseModal(false);
    setExpDesc('');
  };

  const formatNaira = (val: number) => {
    return '₦' + val.toLocaleString('en-NG');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-bold text-[#0B1B3D]">
              Billing, Invoices & Finance
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              Client Trust & Ledger
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Generate formal fee notes, track court disbursements, 7.5% VAT compliance, and trust account remittances.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowExpenseModal(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Disbursement</span>
          </button>
          <button
            onClick={() => setShowAddInvoiceModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0B1B3D] text-white hover:bg-[#13274F] text-xs font-semibold shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Generate Fee Note / Invoice</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500 uppercase">Total Professional Fees Billed</p>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#0B1B3D] mt-2">{formatNaira(totalBilled)}</p>
          <p className="text-xs text-slate-400 mt-1">{invoices.length} Chambers Invoices issued</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500 uppercase">Total Fees Collected</p>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-emerald-600 mt-2">{formatNaira(totalCollected)}</p>
          <p className="text-xs text-emerald-600 mt-1">Verified client remittances</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500 uppercase">Outstanding Receivables</p>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-amber-600 mt-2">{formatNaira(totalOutstanding)}</p>
          <p className="text-xs text-amber-600 mt-1">Pending client settlement</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500 uppercase">Court Disbursements & Costs</p>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-800 mt-2">{formatNaira(totalExpenses)}</p>
          <p className="text-xs text-slate-400 mt-1">Filing, bailiff & search fees</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="flex border-b border-slate-200 px-4">
          <button
            onClick={() => setActiveTab('invoices')}
            className={`py-3.5 px-4 text-xs font-semibold border-b-2 transition ${
              activeTab === 'invoices'
                ? 'border-[#0B1B3D] text-[#0B1B3D]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Invoices & Fee Notes ({invoices.length})
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`py-3.5 px-4 text-xs font-semibold border-b-2 transition ${
              activeTab === 'payments'
                ? 'border-[#0B1B3D] text-[#0B1B3D]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Payment Receipts ({payments.length})
          </button>
          <button
            onClick={() => setActiveTab('expenses')}
            className={`py-3.5 px-4 text-xs font-semibold border-b-2 transition ${
              activeTab === 'expenses'
                ? 'border-[#0B1B3D] text-[#0B1B3D]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Disbursements Register ({expenses.length})
          </button>
          <button
            onClick={() => setActiveTab('trust')}
            className={`py-3.5 px-4 text-xs font-semibold border-b-2 transition ${
              activeTab === 'trust'
                ? 'border-[#0B1B3D] text-[#0B1B3D]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Client Trust Account Details
          </button>
        </div>

        {/* INVOICES TAB */}
        {activeTab === 'invoices' && (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search invoice number, client or matter..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-1 focus:ring-[#0B1B3D] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-500">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-2 py-1 rounded border border-slate-300 text-xs bg-white focus:outline-none"
                >
                  <option value="All">All Invoices</option>
                  <option value="Paid">Fully Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Partially Paid">Partially Paid</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase">
                  <tr>
                    <th className="py-3 px-4">Invoice #</th>
                    <th className="py-3 px-4">Client Name</th>
                    <th className="py-3 px-4">Matter Reference</th>
                    <th className="py-3 px-4">Issue Date</th>
                    <th className="py-3 px-4">Total Amount</th>
                    <th className="py-3 px-4">Balance</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredInvoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4 font-mono font-bold text-[#0B1B3D]">
                        {inv.invoiceNumber}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-800">
                        {inv.clientName}
                      </td>
                      <td className="py-3 px-4 text-slate-500 font-mono">
                        {inv.matterReference}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {inv.issueDate}
                      </td>
                      <td className="py-3 px-4 font-bold text-[#0B1B3D]">
                        {formatNaira(inv.totalAmount)}
                      </td>
                      <td className="py-3 px-4 font-semibold text-amber-700">
                        {formatNaira(inv.balance)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            inv.status === 'Paid'
                              ? 'bg-emerald-100 text-emerald-800'
                              : inv.status === 'Partially Paid'
                              ? 'bg-blue-100 text-blue-800'
                              : inv.status === 'Overdue'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-1">
                        <button
                          onClick={() => setSelectedInvoice(inv)}
                          className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium"
                        >
                          Print / View
                        </button>
                        {inv.balance > 0 && (
                          <button
                            onClick={() => {
                              setTargetInvoiceForPayment(inv);
                              setPayAmount(inv.balance);
                              setShowPaymentModal(true);
                            }}
                            className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold"
                          >
                            Pay
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredInvoices.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-400">
                        No invoices found matching criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* PAYMENTS TAB */}
        {activeTab === 'payments' && (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase">
                  <tr>
                    <th className="py-3 px-4">Receipt Ref</th>
                    <th className="py-3 px-4">Invoice #</th>
                    <th className="py-3 px-4">Client Name</th>
                    <th className="py-3 px-4">Payment Method</th>
                    <th className="py-3 px-4">Amount Paid</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {payments.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-mono font-bold text-[#0B1B3D]">
                        {p.reference}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500">
                        {p.invoiceNumber}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-800">
                        {p.clientName}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {p.paymentMethod}
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        {formatNaira(p.amount)}
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {p.date}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {payments.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        No payments recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* EXPENSES TAB */}
        {activeTab === 'expenses' && (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase">
                  <tr>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Matter Ref</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Recorded By</th>
                    <th className="py-3 px-4">Billable</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {expenses.map((exp) => (
                    <tr key={exp.id} className="hover:bg-slate-50/80">
                      <td className="py-3 px-4 font-semibold text-[#0B1B3D]">
                        {exp.category}
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        {exp.description}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500">
                        {exp.matterReference}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-800">
                        {formatNaira(exp.amount)}
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {exp.date}
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {exp.recordedBy}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-800">
                          Billable to Client
                        </span>
                      </td>
                    </tr>
                  ))}
                  {expenses.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        No disbursements recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TRUST ACCOUNT TAB */}
        {activeTab === 'trust' && (
          <div className="p-6 space-y-6">
            <div className="bg-[#0B1B3D] text-white p-6 rounded-xl border border-[#D4AF37]/30 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#800020] text-[#D4AF37] flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold">
                    Official Chambers Client Trust Account
                  </h3>
                  <p className="text-xs text-slate-300">
                    Designated for client retainers, recovery of judgment debts, purchase deposits, and tenancy security escrows.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-4 border-t border-white/10 text-xs">
                <div>
                  <span className="text-slate-400 block">Bank Name:</span>
                  <span className="font-semibold text-white text-sm">{firmProfile.bankName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Account Name:</span>
                  <span className="font-semibold text-white text-sm">{firmProfile.accountName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Account Number (NUBAN):</span>
                  <span className="font-mono font-bold text-[#D4AF37] text-base">{firmProfile.accountNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Tax Identification Number (TIN):</span>
                  <span className="font-mono text-slate-200">{firmProfile.taxNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Managing Principal:</span>
                  <span className="text-slate-200">{firmProfile.principal}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Regulatory Compliance:</span>
                  <span className="text-emerald-400 font-semibold">Rules of Professional Conduct for Legal Practitioners (RPC 2023)</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-800 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                Legal Practitioners Trust Account Compliance Note
              </p>
              <p>
                All client funds deposited into the trust account are segregated from the chambers operating account. Disbursements are only executed upon written instruction, statutory settlement of stamped court processes, or documented escrow disbursement clauses.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* NEW INVOICE MODAL */}
      {showAddInvoiceModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 my-8">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-heading text-lg font-bold text-[#0B1B3D]">
                  Generate Official Fee Note / Invoice
                </h3>
                <p className="text-xs text-slate-500">
                  Issue professional fees, court disbursements, and 7.5% Nigerian VAT.
                </p>
              </div>
              <button
                onClick={() => setShowAddInvoiceModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Select Client</label>
                  <select
                    value={invClientId}
                    onChange={(e) => setInvClientId(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-white"
                  >
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.clientType})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Matter Reference</label>
                  <select
                    value={invMatterRef}
                    onChange={(e) => setInvMatterRef(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-white"
                  >
                    {matters.map((m) => (
                      <option key={m.id} value={m.reference}>
                        {m.reference} - {m.title.substring(0, 30)}...
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Payment Due Date</label>
                <input
                  type="date"
                  value={invDueDate}
                  onChange={(e) => setInvDueDate(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              {/* Items List */}
              <div className="border border-slate-200 rounded-lg p-3 space-y-2 bg-slate-50">
                <span className="font-semibold text-slate-700 block">Fee Items & Disbursements</span>
                {invItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs bg-white p-2 rounded border border-slate-200">
                    <span className="text-slate-800">{item.description}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#0B1B3D]">{formatNaira(item.amount)}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="text-rose-600 hover:text-rose-800 text-[11px]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Item description (e.g. Legal Retainer Fee)"
                    value={newItemDesc}
                    onChange={(e) => setNewItemDesc(e.target.value)}
                    className="flex-1 p-1.5 border rounded text-xs bg-white"
                  />
                  <input
                    type="number"
                    placeholder="Amount (₦)"
                    value={newItemAmount}
                    onChange={(e) => setNewItemAmount(Number(e.target.value))}
                    className="w-28 p-1.5 border rounded text-xs bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddItemToInvoice}
                    className="px-3 py-1.5 bg-[#0B1B3D] text-white rounded text-xs font-semibold"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Computed Totals */}
              <div className="bg-slate-100 p-3 rounded-lg text-xs space-y-1 text-right">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal:</span>
                  <span className="font-semibold">{formatNaira(invItems.reduce((acc, i) => acc + i.amount, 0))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">7.5% VAT (Nigeria):</span>
                  <span className="font-semibold">{formatNaira(Math.round(invItems.reduce((acc, i) => acc + i.amount, 0) * 0.075))}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#0B1B3D] border-t border-slate-300 pt-1">
                  <span>Grand Total:</span>
                  <span>{formatNaira(Math.round(invItems.reduce((acc, i) => acc + i.amount, 0) * 1.075))}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddInvoiceModal(false)}
                  className="px-4 py-2 border rounded-lg text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B1B3D] text-white rounded-lg font-semibold hover:bg-[#13274F]"
                >
                  Create & Issue Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RECORD PAYMENT MODAL */}
      {showPaymentModal && targetInvoiceForPayment && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-heading text-lg font-bold text-[#0B1B3D]">
                  Record Client Payment
                </h3>
                <p className="text-xs text-slate-500">
                  {targetInvoiceForPayment.invoiceNumber} · {targetInvoiceForPayment.clientName}
                </p>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitPayment} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Amount Paid (₦)</label>
                <input
                  type="number"
                  value={payAmount}
                  onChange={(e) => setPayAmount(Number(e.target.value))}
                  className="w-full p-2 border rounded-lg font-bold text-sm text-[#0B1B3D]"
                  required
                />
                <p className="text-[11px] text-slate-400 mt-1">Outstanding Balance: {formatNaira(targetInvoiceForPayment.balance)}</p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Payment Method</label>
                <select
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value as any)}
                  className="w-full p-2 border rounded-lg bg-white"
                >
                  <option value="Bank Transfer">Direct Bank Transfer</option>
                  <option value="Cheque">Bank Cheque / Draft</option>
                  <option value="Direct Deposit">Bank Branch Cash Deposit</option>
                  <option value="Cash">Cash at Chambers Reception</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Payment Reference / Cheque No.</label>
                <input
                  type="text"
                  value={payReference}
                  onChange={(e) => setPayReference(e.target.value)}
                  className="w-full p-2 border rounded-lg font-mono"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Ledger Notes</label>
                <textarea
                  value={payNotes}
                  onChange={(e) => setPayNotes(e.target.value)}
                  rows={2}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 border rounded-lg text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700"
                >
                  Confirm & Post Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RECORD DISBURSEMENT MODAL */}
      {showExpenseModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-heading text-lg font-bold text-[#0B1B3D]">
                  Log Court Disbursement / Cost
                </h3>
                <p className="text-xs text-slate-500">Record billable case expenditure</p>
              </div>
              <button
                onClick={() => setShowExpenseModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateExpense} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Matter Reference</label>
                <select
                  value={expMatter}
                  onChange={(e) => setExpMatter(e.target.value)}
                  className="w-full p-2 border rounded-lg bg-white"
                >
                  {matters.map((m) => (
                    <option key={m.id} value={m.reference}>
                      {m.reference} - {m.title.substring(0, 30)}...
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Disbursement Category</label>
                <select
                  value={expCategory}
                  onChange={(e) => setExpCategory(e.target.value as any)}
                  className="w-full p-2 border rounded-lg bg-white"
                >
                  <option value="Court Fees">Court Filing / Originating Process Fees</option>
                  <option value="Process Serving">Sheriff / Bailiff Process Serving Fee</option>
                  <option value="Title Search">Land Registry / AGIS Official Search Fee</option>
                  <option value="Travel">Out-of-Jurisdiction Counsel Travel / Lodging</option>
                  <option value="Office / Admin">Certified True Copies (CTC) & Documentation</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <input
                  type="text"
                  placeholder="e.g. CTC of Judgment at High Court Registry"
                  value={expDesc}
                  onChange={(e) => setExpDesc(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Amount (₦)</label>
                <input
                  type="number"
                  value={expAmount}
                  onChange={(e) => setExpAmount(Number(e.target.value))}
                  className="w-full p-2 border rounded-lg font-bold"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowExpenseModal(false)}
                  className="px-4 py-2 border rounded-lg text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B1B3D] text-white rounded-lg font-semibold hover:bg-[#13274F]"
                >
                  Record Disbursement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRINTABLE INVOICE MODAL */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-8 shadow-2xl border border-slate-300 space-y-6 my-8 print:p-0 print:border-none print:shadow-none">
            {/* Modal Controls */}
            <div className="flex items-center justify-between border-b pb-4 print:hidden">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Official Chambers Bill of Costs / Fee Note
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0B1B3D] text-white rounded-lg text-xs font-semibold hover:bg-[#13274F]"
                >
                  <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Print Fee Note</span>
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Letterhead */}
            <div className="text-center border-b-2 border-[#0B1B3D] pb-5">
              <div className="inline-flex items-center justify-center gap-2 mb-1">
                <span className="w-3 h-3 rounded-full bg-[#800020]"></span>
                <h2 className="font-heading font-extrabold text-2xl tracking-wider text-[#0B1B3D]">
                  {firmProfile.firmName}
                </h2>
                <span className="w-3 h-3 rounded-full bg-[#800020]"></span>
              </div>
              <p className="text-xs font-serif-legal italic text-slate-600">
                {firmProfile.tagline}
              </p>
              <p className="text-[11px] font-semibold text-[#800020] mt-1">
                Principal: {firmProfile.principal}
              </p>
              <p className="text-[10px] text-slate-500 mt-1 max-w-xl mx-auto">
                Head Office: {firmProfile.address} · Tel: {firmProfile.phone} · Email: {firmProfile.email}
              </p>
            </div>

            {/* Invoice Meta */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-slate-400 uppercase font-semibold text-[10px]">Billed To:</p>
                <p className="font-bold text-slate-800 text-sm mt-0.5">{selectedInvoice.clientName}</p>
                <p className="text-slate-500 font-mono mt-0.5">Matter Ref: {selectedInvoice.matterReference}</p>
              </div>
              <div className="text-right">
                <p className="font-mono font-bold text-sm text-[#0B1B3D]">{selectedInvoice.invoiceNumber}</p>
                <p className="text-slate-500 mt-0.5">Date of Issue: {selectedInvoice.issueDate}</p>
                <p className="text-slate-500 mt-0.5">Payment Due: {selectedInvoice.dueDate}</p>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-[#0B1B3D] text-white">
                <tr>
                  <th className="py-2.5 px-3">Item Description</th>
                  <th className="py-2.5 px-3 text-right">Amount (₦)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {(selectedInvoice.items || []).map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 text-slate-800">{item.description}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-semibold">
                      {formatNaira(item.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Summary */}
            <div className="flex justify-end text-xs">
              <div className="w-64 space-y-1.5 text-right">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-mono">{formatNaira(selectedInvoice.subtotal || selectedInvoice.professionalFees || 0)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>VAT (7.5%):</span>
                  <span className="font-mono">{formatNaira(selectedInvoice.vat || 0)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#0B1B3D] border-t border-slate-300 pt-1.5">
                  <span>Total Amount:</span>
                  <span className="font-mono">{formatNaira(selectedInvoice.totalAmount)}</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Amount Paid:</span>
                  <span className="font-mono">{formatNaira(selectedInvoice.amountPaid)}</span>
                </div>
                <div className="flex justify-between font-bold text-amber-800 border-t border-slate-200 pt-1">
                  <span>Balance Due:</span>
                  <span className="font-mono">{formatNaira(selectedInvoice.balance)}</span>
                </div>
              </div>
            </div>

            {/* Remittance Box */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg text-xs space-y-1">
              <p className="font-bold text-[#0B1B3D]">Payment Instructions / Direct Remittance:</p>
              <p className="text-slate-600">Bank: {firmProfile.bankName} · Account Name: {firmProfile.accountName}</p>
              <p className="font-mono font-bold text-[#0B1B3D]">Account Number (NUBAN): {firmProfile.accountNumber}</p>
              <p className="text-[10px] text-slate-400">Please quote invoice number as transaction narrative upon transfer.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

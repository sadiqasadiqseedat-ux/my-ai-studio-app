import React, { useState } from 'react';
import {
  X,
  Printer,
  Search,
  CheckCircle2,
  Clock,
  Building,
  ShieldCheck,
  Heart,
  Copy,
  Check,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { DonationPledgeRecord, OrganizationConfig } from '../types';

interface DonationReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  pledges: DonationPledgeRecord[];
  config: OrganizationConfig;
  initialCode?: string;
}

export const DonationReceiptModal: React.FC<DonationReceiptModalProps> = ({
  isOpen,
  onClose,
  pledges,
  config,
  initialCode = '',
}) => {
  const [searchCode, setSearchCode] = useState(initialCode);
  const [activePledge, setActivePledge] = useState<DonationPledgeRecord | null>(() => {
    if (initialCode) {
      const found = pledges.find(
        (p) => p.reference.toUpperCase() === initialCode.trim().toUpperCase()
      );
      return found || null;
    }
    return pledges.length > 0 ? pledges[0] : null;
  });

  const [hasSearched, setHasSearched] = useState(Boolean(initialCode));
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const cleaned = searchCode.trim().toUpperCase();
    const found = pledges.find(
      (p) => p.reference.toUpperCase() === cleaned || p.id === searchCode.trim()
    );
    setActivePledge(found || null);
  };

  const handlePrint = () => {
    window.print();
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isConfirmed = activePledge?.status === 'Confirmed';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[92vh] print:max-h-none print:border-none print:shadow-none print:rounded-none">
        {/* Modal Toolbar (Hidden on print) */}
        <div className="bg-[#03281e] text-white p-4 sm:p-5 border-b border-emerald-900/60 flex items-center justify-between print:hidden shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900 border border-amber-500/40 text-amber-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white leading-tight">
                Donation Invoice & Receipt Portal
              </h3>
              <p className="text-xs text-emerald-200/90">
                Track payment status, print bank payment invoice, or print official confirmed receipt
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activePledge && (
              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
                title="Print Document"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Print {isConfirmed ? 'Receipt' : 'Invoice'}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-900 transition-colors"
              aria-label="Close receipt portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Code Search Bar (Hidden on print) */}
        <div className="p-4 bg-stone-50 border-b border-stone-200 print:hidden shrink-0">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Enter Donation Reference Code (e.g. ZNJ-849201)"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-stone-300 rounded-lg text-xs font-mono font-semibold uppercase focus:ring-2 focus:ring-emerald-700 focus:outline-hidden bg-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-amber-300 font-semibold text-xs rounded-lg whitespace-nowrap transition-colors"
            >
              Look Up Code
            </button>
          </form>

          {/* Quick suggestions if pledges exist in local state */}
          {pledges.length > 0 && !activePledge && (
            <div className="mt-2.5 flex items-center gap-1.5 flex-wrap text-[11px] text-stone-500">
              <span>Recent Pledges:</span>
              {pledges.slice(0, 3).map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSearchCode(p.reference);
                    setActivePledge(p);
                    setHasSearched(true);
                  }}
                  className="px-2 py-0.5 bg-white border border-stone-200 rounded font-mono font-bold text-emerald-900 hover:bg-emerald-50"
                >
                  {p.reference} ({p.status})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Printable Document Body */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 font-sans text-stone-800 print:p-8 print:overflow-visible">
          {!activePledge ? (
            /* Empty State */
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-serif text-xl font-bold text-stone-800">
                  {hasSearched ? 'Reference Code Not Found' : 'Lookup Your Donation Code'}
                </h4>
                <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto leading-relaxed">
                  {hasSearched
                    ? `No donation record found matching code "${searchCode}". Please check your code or make sure you generated a pledge on this device.`
                    : 'Enter your 9-digit donation code (e.g. ZNJ-123456) to view your Payment Invoice or print your Official Confirmed Receipt.'}
                </p>
              </div>

              {pledges.length > 0 && (
                <div className="pt-2">
                  <p className="text-xs text-stone-600 mb-2 font-medium">Or select one of your recorded pledges:</p>
                  <div className="flex flex-col gap-2 max-w-sm mx-auto">
                    {pledges.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setSearchCode(p.reference);
                          setActivePledge(p);
                        }}
                        className="p-3 bg-stone-50 hover:bg-emerald-50 border border-stone-200 rounded-xl text-left flex items-center justify-between text-xs transition-colors"
                      >
                        <div>
                          <p className="font-mono font-bold text-emerald-950">{p.reference}</p>
                          <p className="text-stone-500 text-[11px]">{p.cause} · ₦{p.amount.toLocaleString()}</p>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            p.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {p.status}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Document View (Invoice if Pending, Official Receipt if Confirmed) */
            <div className="bg-white rounded-xl border-2 border-stone-300 p-6 sm:p-8 space-y-6 print:border-none print:p-0">
              {/* Header Letterhead */}
              <div className="border-b-2 border-emerald-900 pb-5 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-emerald-900 text-amber-400 flex items-center justify-center shadow-xs shrink-0 print:border print:border-black">
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2L14.4 7.6L20.4 8.5L16 12.8L17 18.8L12 16.2L7 18.8L8 12.8L3.6 8.5L9.6 7.6L12 2Z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-arabic text-amber-700 text-xs block font-bold">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
                    <h2 className="font-serif text-lg sm:text-xl font-bold text-emerald-950 uppercase tracking-tight leading-tight">
                      {config.name}
                    </h2>
                    <p className="text-[11px] text-stone-600 font-medium">
                      Potiskum, Yobe State, Nigeria · {config.registrationNumberPlaceholder}
                    </p>
                  </div>
                </div>

                {/* Status Stamp / Badge */}
                <div className="text-center sm:text-right shrink-0">
                  {isConfirmed ? (
                    <div className="inline-flex flex-col items-center sm:items-end">
                      <div className="px-3.5 py-1 bg-emerald-100 text-emerald-900 border-2 border-emerald-700 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>PAYMENT CONFIRMED</span>
                      </div>
                      <span className="text-[10px] text-stone-500 mt-1 uppercase tracking-wider font-semibold">
                        OFFICIAL CHARITABLE RECEIPT
                      </span>
                    </div>
                  ) : (
                    <div className="inline-flex flex-col items-center sm:items-end">
                      <div className="px-3.5 py-1 bg-amber-100 text-amber-900 border-2 border-amber-600 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                        <Clock className="w-4 h-4 text-amber-700" />
                        <span>PAYMENT PENDING VERIFICATION</span>
                      </div>
                      <span className="text-[10px] text-stone-500 mt-1 uppercase tracking-wider font-semibold">
                        PAYMENT INVOICE / REMITTANCE ADVICE
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Title & Document Numbers */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs bg-stone-50 p-4 rounded-lg border border-stone-200">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Document Type</span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900">
                    {isConfirmed ? 'Official Verified Charitable Donation Receipt' : 'Donation Payment Remittance Invoice'}
                  </h3>
                </div>

                <div className="sm:text-right">
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Reference Code</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm sm:text-base font-bold text-emerald-900">
                      {activePledge.reference}
                    </span>
                    <button
                      onClick={() => copyCode(activePledge.reference)}
                      className="print:hidden p-1 text-stone-400 hover:text-stone-700"
                      title="Copy reference code"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-white rounded-lg border border-stone-200 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                    Donor Particulars
                  </span>
                  <div>
                    <p className="font-bold text-sm text-stone-900">{activePledge.donorName}</p>
                    <p className="text-stone-600 text-[11px] mt-0.5">{activePledge.donorEmail}</p>
                    {activePledge.donorPhone && (
                      <p className="text-stone-500 text-[11px] font-mono">{activePledge.donorPhone}</p>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg border border-stone-200 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                    Donation Information
                  </span>
                  <div>
                    <p className="text-stone-500">Date Generated:</p>
                    <p className="font-semibold text-stone-900">{activePledge.timestamp}</p>
                    <p className="text-stone-500 mt-1">Frequency:</p>
                    <p className="font-semibold text-stone-900">{activePledge.frequency}</p>
                  </div>
                </div>
              </div>

              {/* Line Item Table */}
              <div className="border border-stone-200 rounded-lg overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-100 text-stone-600 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3">Designated Humanitarian Cause</th>
                      <th className="p-3 text-right">Contribution Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    <tr>
                      <td className="p-3 font-medium text-stone-800">
                        {activePledge.cause}
                        <p className="text-[10px] text-stone-500 mt-0.5">
                          Direct grassroots humanitarian intervention in Potiskum LGA, Yobe State.
                        </p>
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-sm text-stone-900">
                        ₦{activePledge.amount.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-emerald-50 border-t-2 border-emerald-900">
                    <tr>
                      <th className="p-3 text-emerald-950 font-bold uppercase text-[11px]">
                        Total {isConfirmed ? 'Received & Cleared' : 'Amount Due to Transfer'}
                      </th>
                      <th className="p-3 text-right font-mono text-base font-bold text-emerald-950">
                        ₦{activePledge.amount.toLocaleString()}
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Status Conditional Content */}
              {!isConfirmed ? (
                /* INVOICE MODE: Bank Transfer Remittance Box */
                <div className="p-5 bg-amber-50/80 border border-amber-300 rounded-xl space-y-3 text-xs text-amber-950">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                    <Building className="w-4 h-4" />
                    <span>Official Bank Transfer Instructions for Payment</span>
                  </div>

                  <p className="leading-relaxed text-[11px]">
                    Please execute your bank transfer or USSD using the verified foundation accounts below. Ensure you enter your Reference Code <strong className="font-mono font-bold text-emerald-950">{activePledge.reference}</strong> as the transfer description or remark.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div className="p-2.5 bg-white rounded border border-amber-200">
                      <p className="text-[10px] uppercase text-stone-500">Bank Name</p>
                      <p className="font-semibold text-stone-900 mt-0.5">{config.bankNamePlaceholder}</p>
                    </div>

                    <div className="p-2.5 bg-white rounded border border-amber-200">
                      <p className="text-[10px] uppercase text-stone-500">Account Name</p>
                      <p className="font-semibold text-stone-900 mt-0.5 truncate">{config.accountNamePlaceholder}</p>
                    </div>

                    <div className="p-2.5 bg-white rounded border border-amber-200">
                      <p className="text-[10px] uppercase text-stone-500">Account Number</p>
                      <p className="font-mono font-bold text-emerald-900 mt-0.5">{config.accountNumberPlaceholder}</p>
                    </div>
                  </div>

                  <div className="pt-2 text-[11px] text-stone-600 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>
                      After transfer, our treasury administration in Potiskum will verify the receipt and mark your pledge as <strong>Confirmed</strong>. You can re-enter this code anytime on our website to view and print your Official Receipt.
                    </span>
                  </div>
                </div>
              ) : (
                /* RECEIPT MODE: Official Verified Acknowledgement */
                <div className="p-5 bg-emerald-50 border border-emerald-300 rounded-xl space-y-3 text-xs text-emerald-950">
                  <div className="flex items-center gap-2 font-bold text-emerald-900 uppercase tracking-wider">
                    <ShieldCheck className="w-5 h-5 text-emerald-700" />
                    <span>Official Verification & Shariah Compliance Declaration</span>
                  </div>

                  <p className="text-stone-700 leading-relaxed text-[11px]">
                    This certifies that the donation of <strong className="font-mono">₦{activePledge.amount.toLocaleString()}</strong> has been successfully received, accounted for, and credited to the authorized funds of Zanjabeel Islamic Charity and Humanitarian Foundation.
                  </p>

                  <div className="p-3 bg-white rounded-lg border border-emerald-200 text-stone-600 text-[11px] italic">
                    “The example of those who spend their wealth in the way of Allah is like a seed of grain which grows seven spikes; in each spike is a hundred grains. And Allah multiplies [His reward] for whom He wills.” — (Surah Al-Baqarah 2:261)
                  </div>

                  {/* Signatures & Seal Box */}
                  <div className="pt-4 border-t border-emerald-200 grid grid-cols-2 gap-6 text-[10px] text-stone-500">
                    <div>
                      <p className="font-semibold text-stone-800">Authorized Treasury Directorate</p>
                      <p className="mt-1">Zanjabeel Humanitarian Foundation</p>
                      <p className="font-mono">Potiskum, Yobe State</p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-stone-800">Verification Seal: ELECTRONICALLY CLEARED</p>
                      <p className="mt-1 text-emerald-800 font-bold">Status: Amanah Validated ✓</p>
                      <p className="font-mono">Ref: {activePledge.reference}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Actions (Hidden on print) */}
              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
                <div className="text-[11px] text-stone-500">
                  Save or print this {isConfirmed ? 'receipt' : 'invoice'} for your personal and tax accounting.
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-amber-300 font-bold text-xs rounded-lg flex items-center gap-2 shadow-xs transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Official {isConfirmed ? 'Receipt' : 'Invoice'}</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="px-4 py-2.5 text-stone-600 hover:text-stone-900 text-xs font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

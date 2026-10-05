import React, { useState } from 'react';
import { X, Heart, Copy, Check, ShieldAlert, CreditCard, Building, CheckCircle2 } from 'lucide-react';
import { OrganizationConfig, DonationPledgeRecord } from '../types';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: OrganizationConfig;
  defaultCause?: string;
  onRecordPledge?: (pledge: DonationPledgeRecord) => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  config,
  defaultCause = 'General Humanitarian Fund & Sadaqah',
  onRecordPledge,
}) => {
  const [donationType, setDonationType] = useState<'one-time' | 'monthly' | 'project'>('one-time');
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(20000);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedCause, setSelectedCause] = useState(defaultCause);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [pledgeSubmitted, setPledgeSubmitted] = useState(false);
  const [pledgeRef, setPledgeRef] = useState('');

  if (!isOpen) return null;

  const presetAmounts = [5000, 10000, 20000, 50000, 100000];

  const currentAmountValue =
    selectedAmount === 'custom'
      ? parseFloat(customAmount.replace(/,/g, '')) || 0
      : selectedAmount;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmitPledge = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = 'ZNJ-' + Math.floor(100000 + Math.random() * 900000);
    setPledgeRef(ref);
    setPledgeSubmitted(true);

    if (onRecordPledge) {
      onRecordPledge({
        id: 'pledge-' + Date.now(),
        reference: ref,
        donorName: donorName || 'Generous Supporter',
        donorEmail: donorEmail,
        donorPhone: donorPhone,
        cause: selectedCause,
        amount: currentAmountValue,
        frequency: donationType === 'one-time' ? 'One-Time' : donationType === 'monthly' ? 'Monthly' : 'Project Sponsorship',
        timestamp: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: 'Pending Verification',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#043327] text-white p-6 border-b border-emerald-900/50 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-arabic text-amber-300 text-sm">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
              <span className="text-emerald-300/40">·</span>
              <span className="text-xs uppercase tracking-wider text-emerald-200 font-medium">Sadaqah & Relief</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">Support Our Mission</h3>
            <p className="text-xs text-emerald-100/90 mt-1">
              Your support can help turn compassion into meaningful action.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-emerald-200 hover:text-white hover:bg-emerald-900 transition-colors"
            aria-label="Close donation modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {!pledgeSubmitted ? (
            <form onSubmit={handleSubmitPledge} className="space-y-6">
              {/* Type selector */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  Donation Frequency
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setDonationType('one-time')}
                    className={`py-2 px-3 text-xs font-medium rounded-md border text-center transition-all ${
                      donationType === 'one-time'
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    One-Time Donation
                  </button>
                  <button
                    type="button"
                    onClick={() => setDonationType('monthly')}
                    className={`py-2 px-3 text-xs font-medium rounded-md border text-center transition-all ${
                      donationType === 'monthly'
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Monthly Support
                  </button>
                  <button
                    type="button"
                    onClick={() => setDonationType('project')}
                    className={`py-2 px-3 text-xs font-medium rounded-md border text-center transition-all ${
                      donationType === 'project'
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Sponsor a Project
                  </button>
                </div>
              </div>

              {/* Amount buttons */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  Select Amount (₦ Naira)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {presetAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount('');
                      }}
                      className={`py-2 px-1 text-xs font-semibold rounded-md border transition-all ${
                        selectedAmount === amt
                          ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      ₦{amt.toLocaleString()}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setSelectedAmount('custom')}
                    className={`py-2 px-1 text-xs font-semibold rounded-md border transition-all ${
                      selectedAmount === 'custom'
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    Custom
                  </button>
                </div>

                {selectedAmount === 'custom' && (
                  <div className="mt-3">
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-stone-400 font-semibold">₦</span>
                      <input
                        type="number"
                        placeholder="Enter custom amount"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full pl-8 pr-4 py-2 border border-stone-300 rounded-md focus:ring-2 focus:ring-emerald-700 focus:outline-hidden text-sm"
                        min="500"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Cause selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                  Designate Your Contribution
                </label>
                <select
                  value={selectedCause}
                  onChange={(e) => setSelectedCause(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-md bg-white text-stone-800 text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                >
                  <option value="General Humanitarian Fund & Sadaqah">General Humanitarian Fund & Sadaqah</option>
                  <option value="Orphans & Vulnerable Persons Welfare">Orphans & Vulnerable Persons Welfare</option>
                  <option value="Food & Basic Needs Distribution">Food & Basic Needs Distribution</option>
                  <option value="Education Support & School Kits">Education Support & School Kits</option>
                  <option value="Community Healthcare Outreach">Community Healthcare Outreach</option>
                  <option value="Water & Sanitation (Borehole Project)">Water & Sanitation (Borehole Project)</option>
                  <option value="Ramadan & Eid Food Hampers">Ramadan & Eid Food Hampers</option>
                  <option value="Widows Empowerment & Microgrants">Widows Empowerment & Microgrants</option>
                  <option value="Emergency Crisis Relief">Emergency Crisis Relief</option>
                  <option value="Zakat Distribution Fund">Zakat Distribution Fund</option>
                </select>
              </div>

              {/* Verified Account Information Box */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5 uppercase tracking-wider">
                    <Building className="w-4 h-4 text-emerald-800" />
                    Official Direct Bank Transfer Details
                  </span>
                  <span className="text-[11px] text-emerald-800 font-medium bg-emerald-100/70 px-2 py-0.5 rounded">
                    Verified Channel
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 bg-white rounded border border-emerald-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-stone-500 uppercase">Bank Name</p>
                      <p className="font-semibold text-stone-900">{config.bankNamePlaceholder}</p>
                    </div>
                  </div>

                  <div className="p-2.5 bg-white rounded border border-emerald-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-stone-500 uppercase">Account Name</p>
                      <p className="font-semibold text-stone-900">{config.accountNamePlaceholder}</p>
                    </div>
                  </div>

                  <div className="sm:col-span-2 p-2.5 bg-white rounded border border-emerald-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-stone-500 uppercase">Account Number</p>
                      <p className="font-mono text-sm font-bold text-emerald-900">
                        {config.accountNumberPlaceholder}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(config.accountNumberPlaceholder, 'acc')}
                      className="px-2.5 py-1 text-xs text-emerald-800 hover:bg-emerald-50 rounded border border-emerald-200 flex items-center gap-1 transition-colors"
                    >
                      {copiedField === 'acc' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedField === 'acc' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Important Caution Notice */}
                <div className="flex items-start gap-2 p-2.5 bg-amber-50 border border-amber-200 rounded text-[11px] text-amber-900 leading-relaxed">
                  <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>Verification Notice:</strong> Please verify official donation details through our authorized contact channels ({config.phonePlaceholder}) before making any transfer.
                  </div>
                </div>
              </div>

              {/* Donor Contact & Pledge notification */}
              <div className="space-y-3 pt-2 border-t border-stone-200">
                <p className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
                  Donor Contact Information (For Transfer Receipt & Confirmation)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-md text-xs focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-md text-xs focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      type="tel"
                      placeholder="Phone / WhatsApp Number (Optional)"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-md text-xs focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-amber-300 hover:text-amber-200 font-semibold text-xs tracking-wider uppercase rounded-md shadow-sm transition-all flex items-center gap-2"
                >
                  <Heart className="w-3.5 h-3.5 fill-amber-300" />
                  Confirm Donation Pledge (₦{currentAmountValue.toLocaleString()})
                </button>
              </div>
            </form>
          ) : (
            /* Pledge Receipt Confirmation View */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h4 className="font-serif text-2xl font-bold text-emerald-950">
                Jazakallahu Khair for Your Generosity!
              </h4>

              <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                May Allah accept your noble intention and bless your provisions abundantly. Your pledge reference has been generated below:
              </p>

              <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg max-w-sm mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-stone-200 pb-1.5">
                  <span className="text-stone-500">Pledge Reference:</span>
                  <span className="font-mono font-bold text-emerald-900">{pledgeRef}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-1.5">
                  <span className="text-stone-500">Cause:</span>
                  <span className="font-medium text-stone-800">{selectedCause}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-1.5">
                  <span className="text-stone-500">Amount:</span>
                  <span className="font-bold text-stone-900">₦{currentAmountValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Donor Name:</span>
                  <span className="font-medium text-stone-800">{donorName || 'Respected Supporter'}</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-md max-w-md mx-auto text-[11px] text-amber-900 text-left">
                <strong>Next Step:</strong> When initiating transfer to <span className="font-mono font-semibold">{config.accountNumberPlaceholder}</span>, please use your reference <span className="font-mono font-bold">{pledgeRef}</span> as the transfer remark, or send proof of payment to our authorized WhatsApp desk: <span className="font-semibold">{config.whatsappPlaceholder}</span>.
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setPledgeSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 bg-emerald-800 text-white rounded-md text-xs font-semibold hover:bg-emerald-900 transition-colors"
                >
                  Close Receipt
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

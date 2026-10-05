import React, { useState } from 'react';
import { Heart, Building, Copy, Check, ShieldAlert, CheckCircle2, Info, ArrowRight, HelpCircle } from 'lucide-react';
import { OrganizationConfig, DonationPledgeRecord } from '../types';

interface DonationPageProps {
  config: OrganizationConfig;
  onOpenModal: () => void;
  onRecordPledge?: (pledge: DonationPledgeRecord) => void;
}

export const DonationPage: React.FC<DonationPageProps> = ({ config, onOpenModal, onRecordPledge }) => {
  const [donationType, setDonationType] = useState<'one-time' | 'monthly' | 'project'>('one-time');
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(20000);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedCause, setSelectedCause] = useState('General Humanitarian Fund & Sadaqah');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorNotes, setDonorNotes] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [pledgeSubmitted, setPledgeSubmitted] = useState(false);
  const [pledgeRef, setPledgeRef] = useState('');

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

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = 'ZNJ-' + Math.floor(100000 + Math.random() * 900000);
    setPledgeRef(ref);
    setPledgeSubmitted(true);

    if (onRecordPledge) {
      onRecordPledge({
        id: 'pledge-' + Date.now(),
        reference: ref,
        donorName: donorName || 'Honorable Supporter',
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
    <div className="py-14 sm:py-20 bg-[#faf8f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="font-arabic text-amber-700">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
            <span>·</span>
            <span>Support Our Mission</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
            Turn Compassion Into <span className="text-emerald-800 italic">Meaningful Action</span>
          </h1>

          <p className="text-stone-600 text-sm sm:text-base mt-4 leading-relaxed">
            Your generous contribution supports vital humanitarian initiatives in Potiskum, Yobe State—delivering emergency food aid, clean borehole water, medical outreach, orphan protection, and educational scholarships to the most vulnerable.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Donation & Pledge Calculator */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-md">
            {!pledgeSubmitted ? (
              <form onSubmit={handlePledgeSubmit} className="space-y-6 text-xs">
                {/* 1. Donation Type */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    1. Select Donation Frequency
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setDonationType('one-time')}
                      className={`py-2.5 px-3 rounded-lg border font-semibold text-center transition-all ${
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
                      className={`py-2.5 px-3 rounded-lg border font-semibold text-center transition-all ${
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
                      className={`py-2.5 px-3 rounded-lg border font-semibold text-center transition-all ${
                        donationType === 'project'
                          ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      Sponsor a Project
                    </button>
                  </div>
                </div>

                {/* 2. Amount Options */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    2. Select Donation Amount (₦)
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
                        className={`py-2.5 px-1 font-bold rounded-lg border transition-all ${
                          selectedAmount === amt
                            ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-xs'
                            : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        ₦{amt.toLocaleString()}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setSelectedAmount('custom')}
                      className={`py-2.5 px-1 font-bold rounded-lg border transition-all ${
                        selectedAmount === 'custom'
                          ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-xs'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      Custom
                    </button>
                  </div>

                  {selectedAmount === 'custom' && (
                    <div className="mt-3">
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 text-stone-500 font-bold">₦</span>
                        <input
                          type="number"
                          placeholder="Enter your custom amount (e.g. 250000)"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="w-full pl-8 pr-4 py-2.5 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                          min="500"
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Program Cause Allocation */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    3. Designated Program / Fund
                  </label>
                  <select
                    value={selectedCause}
                    onChange={(e) => setSelectedCause(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg bg-white text-stone-800 text-xs focus:ring-2 focus:ring-emerald-700 focus:outline-hidden font-medium"
                  >
                    <option value="General Humanitarian Fund & Sadaqah">General Humanitarian Fund & Sadaqah (Where most needed)</option>
                    <option value="Orphans & Vulnerable Persons Support">Orphans & Vulnerable Persons Support</option>
                    <option value="Potiskum Clean Water Borehole Project (Sadaqah Jariyah)">Potiskum Clean Water Borehole Project (Sadaqah Jariyah)</option>
                    <option value="Emergency Food & Staple Grains Parcel">Emergency Food & Staple Grains Parcel</option>
                    <option value="Education Support & School Kits">Education Support & School Kits</option>
                    <option value="Community Healthcare & Patient Subsidies">Community Healthcare & Patient Subsidies</option>
                    <option value="Ramadan Food Hampers & Eid Gifts">Ramadan Food Hampers & Eid Gifts</option>
                    <option value="Widows Micro-Livelihood Grants">Widows Micro-Livelihood Grants</option>
                    <option value="Zakat Al-Maal (Designated Obligatory Alms)">Zakat Al-Maal (Designated Obligatory Alms)</option>
                  </select>
                </div>

                {/* 4. Donor Particulars */}
                <div className="border-t border-stone-100 pt-4 space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                    4. Donor Contact Information (For Transfer Receipt Verification)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Full Name / Organization"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="px-3.5 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email Address (for receipt)"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="px-3.5 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                      required
                    />
                    <div className="sm:col-span-2">
                      <input
                        type="tel"
                        placeholder="WhatsApp / Phone Number (Optional)"
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-amber-300 font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-amber-300" />
                  <span>Generate Donation Pledge & View Official Transfer Instructions</span>
                </button>
              </form>
            ) : (
              /* Generated Pledge Confirmation */
              <div className="text-center py-6 space-y-5">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-stone-900">
                    Jazakallahu Khair! Your Pledge Is Recorded
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 max-w-md mx-auto">
                    Please complete your transfer to the authorized foundation account using the details and reference below.
                  </p>
                </div>

                <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl max-w-md mx-auto text-left space-y-2 text-xs">
                  <div className="flex justify-between border-b border-stone-200 pb-2">
                    <span className="text-stone-500">Pledge Reference:</span>
                    <span className="font-mono font-bold text-emerald-900">{pledgeRef}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200 pb-2">
                    <span className="text-stone-500">Beneficiary Fund:</span>
                    <span className="font-medium text-stone-800">{selectedCause}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200 pb-2">
                    <span className="text-stone-500">Pledged Sum:</span>
                    <span className="font-bold text-stone-900 text-sm">₦{currentAmountValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Donor Name:</span>
                    <span className="font-medium text-stone-800">{donorName || 'Honorable Supporter'}</span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg max-w-md mx-auto text-[11px] text-amber-900 text-left">
                  <strong>Transfer Advisory:</strong> When completing your bank mobile transfer or USSD, please enter <span className="font-mono font-bold">{pledgeRef}</span> in the description / remark field.
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setPledgeSubmitted(false)}
                    className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-semibold"
                  >
                    Adjust Pledge
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold"
                  >
                    Print Pledge Receipt
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Verified Official Bank Transfer Details & Trust Notice */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#032e22] text-white rounded-2xl p-6 sm:p-8 border border-emerald-800 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-emerald-800/80 pb-4">
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-amber-400" />
                  <h3 className="font-serif text-lg font-bold text-white">
                    Official Banking Details
                  </h3>
                </div>
                <span className="text-[10px] uppercase font-bold text-amber-300 bg-emerald-900/90 px-2 py-0.5 rounded border border-amber-400/30">
                  Verified
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-3 bg-[#022219] rounded-lg border border-emerald-900/80 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-emerald-300/80">Bank Name</p>
                    <p className="font-semibold text-white mt-0.5">{config.bankNamePlaceholder}</p>
                  </div>
                </div>

                <div className="p-3 bg-[#022219] rounded-lg border border-emerald-900/80 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-emerald-300/80">Account Name</p>
                    <p className="font-semibold text-white mt-0.5">{config.accountNamePlaceholder}</p>
                  </div>
                </div>

                <div className="p-3 bg-[#022219] rounded-lg border border-emerald-900/80 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-emerald-300/80">Account Number</p>
                    <p className="font-mono text-base font-bold text-amber-300 mt-0.5">
                      {config.accountNumberPlaceholder}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(config.accountNumberPlaceholder, 'acc-sidebar')}
                    className="px-3 py-1.5 bg-emerald-900 hover:bg-emerald-800 text-amber-300 text-xs font-semibold rounded border border-emerald-700 flex items-center gap-1 transition-colors"
                  >
                    {copiedField === 'acc-sidebar' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'acc-sidebar' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="p-3 bg-[#022219] rounded-lg border border-emerald-900/80 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-emerald-300/80">Online Gateway Portal</p>
                    <p className="text-stone-300 mt-0.5 font-mono text-[11px]">{config.paymentGatewayPlaceholder}</p>
                  </div>
                </div>

                <div className="p-3 bg-[#022219] rounded-lg border border-emerald-900/80 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-emerald-300/80">Donation Verification Desk</p>
                    <p className="font-mono text-white mt-0.5">{config.phonePlaceholder}</p>
                  </div>
                </div>
              </div>

              {/* Safety Alert (Mandatory from prompt) */}
              <div className="p-4 bg-amber-950/60 border border-amber-500/40 rounded-xl text-amber-200 text-xs leading-relaxed flex items-start gap-2.5">
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300 block mb-0.5">Official Verification Advisory:</strong>
                  “Please verify official donation details through our authorized contact channels before making any transfer.”
                </div>
              </div>
            </div>

            {/* Islamic Philanthropy Clarification (Sadaqah vs Zakat) */}
            <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-xs space-y-3 text-xs text-stone-600">
              <h4 className="font-serif text-base font-bold text-stone-900 flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-800" />
                Islamic Giving Guidelines
              </h4>
              <p>
                <strong>Sadaqah (Voluntary Charity):</strong> Used dynamically across our relief operations—from daily school feeding to clean water borehole maintenance.
              </p>
              <p>
                <strong>Zakat (Obligatory Alms):</strong> Maintained in a segregated account and distributed strictly in compliance with the Qur’anic categories (Surah At-Tawbah 9:60) for qualified indigent individuals in Potiskum.
              </p>
              <p>
                <strong>Sadaqah Jariyah (Ongoing Charity):</strong> Dedicated exclusively to permanent infrastructural assets such as community water wells, maktabs, and clinics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

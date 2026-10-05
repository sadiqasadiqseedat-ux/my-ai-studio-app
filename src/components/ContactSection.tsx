import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle2, ShieldCheck, Clock, Building } from 'lucide-react';
import { OrganizationConfig, ContactMessageRecord } from '../types';

interface ContactSectionProps {
  config: OrganizationConfig;
  onSendMessage?: (msg: ContactMessageRecord) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ config, onSendMessage }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      if (onSendMessage) {
        onSendMessage({
          id: 'msg-' + Date.now(),
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          timestamp: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
          status: 'Unread',
        });
      }
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }, 600);
  };

  const handleOpenWhatsApp = () => {
    const defaultMsg =
      'Assalamu Alaikum. I would like to make an enquiry about Zanjabeel Islamic Charity and Humanitarian Foundation.';
    const cleanPhone = config.whatsappPlaceholder.replace(/[^0-9]/g, '');
    window.open(
      `https://wa.me/${cleanPhone || '2348000000000'}?text=${encodeURIComponent(defaultMsg)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section className="py-20 bg-[#faf8f4] border-b border-stone-200" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-800">
            Reach Our Foundation Desk
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
            Contact Us
          </h2>
          <div className="w-12 h-1 bg-amber-500 mx-auto mt-3 rounded-full" />
          <p className="text-stone-600 text-sm mt-4 leading-relaxed">
            We welcome inquiries from community members, donors, volunteers, and humanitarian partners. Our secretariat in Potiskum is here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Official Contact Channels & Address */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-xl p-8 border border-stone-200 shadow-xs space-y-6">
              <h3 className="font-serif text-xl font-bold text-stone-900 border-b border-stone-100 pb-3">
                Headquarters Secretariat
              </h3>

              <div className="space-y-5 text-xs text-stone-700">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-100">
                    <MapPin className="w-4 h-4 text-emerald-800" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">Physical Office</h4>
                    <p className="text-stone-600 mt-0.5 font-medium">Potiskum, Yobe State, Nigeria</p>
                    <p className="text-[11px] text-stone-400 mt-0.5">{config.addressPlaceholder}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Phone className="w-4 h-4 text-emerald-800" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">Official Telephone</h4>
                    <p className="text-stone-600 mt-0.5 font-mono">{config.phonePlaceholder}</p>
                    <p className="text-[11px] text-stone-400">Available Mon–Sat: 8:00 AM – 5:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-100">
                    <Mail className="w-4 h-4 text-emerald-800" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">Official Email</h4>
                    <p className="text-stone-600 mt-0.5 font-mono">{config.emailPlaceholder}</p>
                    <p className="text-[11px] text-stone-400">For general correspondence and partnerships</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0 border border-[#25D366]/20">
                    <MessageCircle className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">WhatsApp Help Desk</h4>
                    <p className="text-stone-600 mt-0.5 font-mono">{config.whatsappPlaceholder}</p>
                    <button
                      onClick={handleOpenWhatsApp}
                      className="mt-1 text-emerald-800 font-semibold text-[11px] hover:underline flex items-center gap-1"
                    >
                      <span>Open Direct WhatsApp Chat</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Office hours & verified status */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  Sunday: Closed for field operations
                </span>
                <span className="text-emerald-800 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified NGO
                </span>
              </div>
            </div>

            {/* Schematic Map Card for Potiskum, Yobe State */}
            <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-emerald-800" />
                  Location Map: Potiskum, Yobe State
                </span>
                <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-mono">
                  11.7091° N, 11.0811° E
                </span>
              </div>

              {/* Styled Schematic Map Preview */}
              <div className="relative h-48 rounded-lg overflow-hidden bg-emerald-950/90 border border-emerald-900/60 flex items-center justify-center text-center p-4">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="relative z-10 text-white space-y-1">
                  <div className="w-10 h-10 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center mx-auto shadow-lg animate-pulse">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <p className="font-serif font-bold text-base text-amber-300">Potiskum Central Secretariat</p>
                  <p className="text-[11px] text-emerald-200/90">Yobe State, North-East Nigeria</p>
                  <p className="text-[10px] text-stone-400 italic mt-1">
                    [Official physical office address map pin will link to coordinates]
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form with Validation */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl p-8 border border-stone-200 shadow-xs">
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-1">
                Send Us a Message
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Fill in your details below and our team in Potiskum will review and respond promptly.
              </p>

              {submitted ? (
                <div className="p-8 text-center space-y-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-emerald-950">
                    Message Sent Successfully
                  </h4>
                  <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                    Assalamu Alaikum. Thank you for contacting Zanjabeel Islamic Charity and Humanitarian Foundation. We have received your message and will respond via your provided email or phone.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-3 px-5 py-2 bg-emerald-800 text-white text-xs font-semibold rounded-md hover:bg-emerald-900 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Aliyu Mohammed"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-stone-300 rounded-md focus:ring-2 focus:ring-emerald-700 focus:outline-hidden text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. yourname@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-stone-300 rounded-md focus:ring-2 focus:ring-emerald-700 focus:outline-hidden text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +234 803 000 0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-stone-300 rounded-md focus:ring-2 focus:ring-emerald-700 focus:outline-hidden text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
                        Subject *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Donation Inquiry / Volunteering"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-stone-300 rounded-md focus:ring-2 focus:ring-emerald-700 focus:outline-hidden text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Please write your inquiry or message here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-stone-300 rounded-md focus:ring-2 focus:ring-emerald-700 focus:outline-hidden text-xs resize-none"
                    />
                  </div>

                  {/* Anti-spam & Privacy Notice */}
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Your contact details are protected and never shared with third parties.</span>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-8 py-3 bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-amber-300 font-bold text-xs tracking-wider uppercase rounded-md shadow-xs transition-all flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>SEND MESSAGE</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

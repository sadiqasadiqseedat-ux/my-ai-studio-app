import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { OrganizationConfig } from '../types';

interface WhatsAppFloatProps {
  config: OrganizationConfig;
}

export const WhatsAppFloat: React.FC<WhatsAppFloatProps> = ({ config }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const defaultMessage =
    'Assalamu Alaikum. I would like to make an enquiry about Zanjabeel Islamic Charity and Humanitarian Foundation.';

  const handleOpenWhatsApp = () => {
    const encodedMsg = encodeURIComponent(defaultMessage);
    const cleanPhone = config.whatsappPlaceholder.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanPhone || '2348000000000'}?text=${encodedMsg}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Speech bubble popup */}
      {showTooltip && (
        <div className="mb-3 w-72 bg-white rounded-lg shadow-xl border border-emerald-100 p-4 text-xs animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100 mb-2">
            <span className="font-semibold text-emerald-950 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Zanjabeel Help Desk
            </span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-stone-400 hover:text-stone-700"
              aria-label="Close message"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-stone-600 mb-3 leading-relaxed">
            Assalamu Alaikum! Have questions about donations, volunteering, or verified foundation accounts in Potiskum?
          </p>
          <button
            onClick={handleOpenWhatsApp}
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md text-center flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Chat on WhatsApp
          </button>
        </div>
      )}

      {/* Main floating button */}
      <button
        onClick={() => {
          if (!showTooltip) {
            handleOpenWhatsApp();
          } else {
            setShowTooltip(false);
          }
        }}
        onMouseEnter={() => setShowTooltip(true)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 group focus:outline-hidden focus:ring-4 focus:ring-emerald-300"
        aria-label="Contact Zanjabeel Foundation on WhatsApp"
        title="WhatsApp Enquiry"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="sr-only">Chat on WhatsApp</span>
      </button>
    </div>
  );
};

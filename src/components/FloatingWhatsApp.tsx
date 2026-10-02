import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { OFFICIAL_PHONE, DISPLAY_PHONE } from '../data/products';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = `https://wa.me/${OFFICIAL_PHONE.replace('+', '')}?text=${encodeURIComponent(
    'Hello Anny Billions (Review Boss 001), I would like to order consecrated products from your online store.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3 group">
      {/* Tooltip bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#1c1816] text-stone-200 border border-amber-500/50 p-3 rounded-2xl shadow-2xl max-w-xs animate-fadeIn">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold text-amber-300 uppercase">Anny is Online</span>
            </div>
            <p className="text-xs text-stone-300 mt-0.5 leading-snug">
              Order directly or ask questions on WhatsApp: <strong className="text-white block font-mono">{DISPLAY_PHONE}</strong>
            </p>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-stone-400 hover:text-stone-200 p-1"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:scale-105 transition-all duration-300 ring-4 ring-emerald-950/60"
        aria-label="Chat directly with Anny on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500" />
        </span>
      </a>
    </div>
  );
};

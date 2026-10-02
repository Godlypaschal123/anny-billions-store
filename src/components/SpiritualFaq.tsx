import React, { useState } from 'react';
import { ChevronDown, Sparkles, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQS } from '../data/testimonials';
import { OFFICIAL_PHONE, DISPLAY_PHONE } from '../data/products';

export const SpiritualFaq: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#110e0d] border-b border-amber-950/60 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Spiritual Guidance & Clarity</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm">
            Everything you need to know about our products, ordering on WhatsApp, fast discreet shipping, and usage rituals.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-stone-800 bg-[#161312] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left hover:bg-stone-900/50 transition-colors"
                >
                  <span className="font-medium text-sm sm:text-base text-amber-100 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-stone-800/60 bg-stone-900/40">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Need Direct Assistance Box */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-stone-900 via-amber-950/40 to-stone-900 border border-amber-500/30 text-center space-y-3">
          <h4 className="text-base font-bold text-white">Have a personal question not listed here?</h4>
          <p className="text-xs text-stone-300 max-w-lg mx-auto">
            Anny and her team respond swiftly on WhatsApp. Speak with us in strict confidence regarding your spiritual journey.
          </p>
          <a
            href={`https://wa.me/${OFFICIAL_PHONE.replace('+', '')}?text=${encodeURIComponent('Hello Anny Billions, I have a private question regarding your spiritual therapy.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp ({DISPLAY_PHONE})</span>
          </a>
        </div>

      </div>
    </section>
  );
};

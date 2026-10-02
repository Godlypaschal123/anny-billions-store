import React from 'react';
import { Sparkles, MessageCircle, CheckCircle2, HeartHandshake, HelpCircle } from 'lucide-react';
import { SERVICES } from '../data/services';
import { OFFICIAL_PHONE, DISPLAY_PHONE } from '../data/products';

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-16 sm:py-24 bg-[#110e0d] border-b border-amber-950/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Divine Intervention & Guidance</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Professional Spiritual Therapy Services
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            Beyond physical ritual products, Anny Billions offers confidential one-on-one spiritual diagnosis, 
            deliverance consultations, business space sanctifications, and destiny realignment sessions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const bookingMessage = encodeURIComponent(
              `Hello Anny Billions (Review Boss 001),\n\nI would like to book a *${service.title}* session.\n\nPlease let me know your available schedule, fee, and requirements.\n\nThank you!`
            );

            return (
              <div
                key={service.id}
                className="bg-[#171312] border border-amber-950 hover:border-amber-500/60 rounded-2xl p-6 flex flex-col justify-between space-y-5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.12)] group"
              >
                <div className="space-y-4">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/30">
                      {service.consultationType}
                    </span>
                    <HeartHandshake className="w-5 h-5 text-amber-500/60 group-hover:text-amber-400 transition-colors" />
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="font-cinzel text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-rose-300/90 font-medium mt-1">
                      {service.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="pt-2 border-t border-stone-800/80">
                    <h5 className="text-[11px] uppercase tracking-wider text-stone-400 font-bold mb-2">
                      Included in this therapy:
                    </h5>
                    <ul className="space-y-2 text-xs text-stone-300">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal For callout */}
                  <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 text-[11px] text-stone-400">
                    <strong className="text-amber-300 block mb-0.5">Recommended For:</strong>
                    <span>{service.idealFor}</span>
                  </div>
                </div>

                {/* Booking Button */}
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${OFFICIAL_PHONE.replace('+', '')}?text=${bookingMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs shadow-md transition-all group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Book on WhatsApp ({DISPLAY_PHONE})</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Consultation Help Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-stone-900 to-rose-950/40 border border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
              <HelpCircle className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Not sure which service or product fits your situation?</h4>
              <p className="text-xs text-stone-400">
                Send a quick voice note or text describing your challenge, and Anny Billions will personally recommend the right spiritual approach.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${OFFICIAL_PHONE.replace('+', '')}?text=${encodeURIComponent('Hello Anny Billions, I am unsure which spiritual therapy service or product fits my current situation. Can you please guide me?')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs tracking-wide shadow-md transition-all flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ask Anny For Guidance</span>
          </a>
        </div>

      </div>
    </section>
  );
};

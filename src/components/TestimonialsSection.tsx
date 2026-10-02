import React from 'react';
import { Star, Sparkles, MessageCircle, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/testimonials';
import { OFFICIAL_PHONE, DISPLAY_PHONE } from '../data/products';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#0e0c0b] border-b border-amber-950/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Divine Results in Real Lives</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Client Success & Proof (Review Boss 001)
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            Read how authentic spiritual therapy, consecrated soaps, and powerful ritual kits have unlocked 
            miraculous financial breakthroughs, happy marriages, and lifted generational embargoes for clients worldwide.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-[#151210] border border-amber-950 hover:border-amber-500/50 rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all duration-300 hover:shadow-[0_0_25px_rgba(245,158,11,0.12)] relative group"
            >
              <Quote className="w-8 h-8 text-amber-500/20 group-hover:text-amber-500/40 transition-colors absolute top-4 right-4" />
              
              <div className="space-y-3">
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-[11px] text-stone-400 ml-2 font-mono">{item.date}</span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic">
                  &ldquo;{item.review}&rdquo;
                </p>

                {/* Product Tag */}
                <div className="pt-2">
                  <span className="text-[11px] font-semibold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2.5 py-1 rounded-full inline-block">
                    Therapy: {item.productUsed}
                  </span>
                </div>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{item.clientName}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </h4>
                  <p className="text-[11px] text-stone-400">{item.location}</p>
                </div>
                {item.badge && (
                  <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded">
                    {item.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Testimonial Submission Callout */}
        <div className="text-center p-6 rounded-2xl bg-stone-900/60 border border-amber-900/40 max-w-2xl mx-auto space-y-3">
          <h4 className="text-base font-bold text-amber-200">
            Have you experienced divine results with Anny Billions?
          </h4>
          <p className="text-xs text-stone-400">
            Send your praise report, screenshot, or testimony directly on WhatsApp. Your testimony gives glory and inspires others!
          </p>
          <a
            href={`https://wa.me/${OFFICIAL_PHONE.replace('+', '')}?text=${encodeURIComponent('Hello Anny Billions (Review Boss 001), I want to share my testimony after using your products!')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Share Your Testimony on WhatsApp ({DISPLAY_PHONE})</span>
          </a>
        </div>

      </div>
    </section>
  );
};

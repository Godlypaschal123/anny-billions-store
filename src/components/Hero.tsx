import React from 'react';
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck, Truck, Heart, Award, ShoppingBag } from 'lucide-react';
import { DISPLAY_PHONE, OFFICIAL_PHONE } from '../data/products';
import { TiltCard } from './TiltCard';
import { usePractitionerPhoto } from '../utils/practitionerPhoto';
import { PractitionerPhotoUploader } from './PractitionerPhotoUploader';

interface HeroProps {
  onOpenCart?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCart }) => {
  const { portraitPhoto } = usePractitionerPhoto();
  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-amber-950/60">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[#0c0a09]">
        <img
          src="/images/hero-banner.jpg"
          alt="Spiritual Therapy Sanctuary"
          className="w-full h-full object-cover object-center opacity-25 filter blur-[2px]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-[#0c0a09]/85 to-transparent" />
        <div className="absolute inset-0 bg-radial from-amber-600/10 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headlines & Callouts */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/50 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
                Official Spiritual Therapy Online Store
              </span>
            </div>

            {/* Main Brand Title */}
            <div>
              <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                ANNYBILLIONZ <br />
                <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                  SPIRITUAL THERAPY
                </span>
              </h1>
              
              {/* PRIMARY CALLOUT BADGE */}
              <div className="mt-3.5 flex items-center justify-center lg:justify-start">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/25 via-amber-400/20 to-amber-600/25 border border-amber-500/50 text-amber-300 text-lg sm:text-2xl font-black tracking-wide shadow-[0_0_20px_rgba(245,158,11,0.25)]">
                  Shop and Add to Cart 🛒
                </span>
              </div>

              <p className="mt-3 text-xs sm:text-sm tracking-widest uppercase text-stone-400 font-semibold flex items-center justify-center lg:justify-start gap-2">
                <span>YOUR DESTINY</span>
                <span className="text-rose-500">❤️</span>
                <span>OUR PRIORITY</span>
                <span className="text-rose-500">❤️</span>
                <span>DIVINE RESULTS</span>
              </p>
            </div>

            {/* Core Value Proposition */}
            <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Step into divine blessings, supernatural financial cashouts, and impenetrable spiritual protection. 
              Authentic consecrated ritual soaps, love attraction perfumes, protection beads, and breakthrough kits 
              energized for real results.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-sm tracking-wide shadow-[0_0_25px_rgba(245,158,11,0.4)] active:scale-95 transition-all"
              >
                <span>Shop and Add to Cart 🛒</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${OFFICIAL_PHONE.replace('+', '')}?text=${encodeURIComponent('Hello Anny Billions, I would like to make an inquiry about your consecrated spiritual products and consultation.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {DISPLAY_PHONE}</span>
              </a>

              {onOpenCart && (
                <button
                  onClick={onOpenCart}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 border border-amber-500/40 text-amber-200 text-sm font-semibold transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>View Cart</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Anny's Showcase Card & Visual with 3D Tilt Effect */}
          <div className="lg:col-span-5">
            <TiltCard 
              className="relative mx-auto max-w-md rounded-2xl"
              maxTilt={8}
              scale={1.02}
              glare={true}
            >
              {/* Outer decorative halo */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-amber-600/10 to-amber-700/20 rounded-2xl blur-lg pointer-events-none" />
              
              <div className="relative bg-[#161210] rounded-2xl border-2 border-amber-500/50 p-5 shadow-2xl space-y-4">
                {/* Visual Header */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-amber-500/40 bg-stone-950 group">
                  <img
                    src={portraitPhoto}
                    alt="Anny Billions - Founding Spiritual Practitioner"
                    className="w-full h-full object-cover object-top transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                  
                  {/* Photo update button */}
                  <div className="absolute top-2.5 right-2.5 z-10">
                    <PractitionerPhotoUploader variant="badge" />
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between pointer-events-none">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm border border-amber-500/30">
                        Founding Spiritual Practitioner
                      </span>
                      <h4 className="text-white font-cinzel text-lg font-bold">
                        Anny Billions
                      </h4>
                    </div>
                    <span className="bg-amber-500 text-black text-xs font-black px-2.5 py-1 rounded shadow-md">
                      REVIEW BOSS 001
                    </span>
                  </div>
                </div>

                {/* Healer quote / statement */}
                <div className="bg-stone-900/90 rounded-xl p-3.5 border border-stone-800 text-xs text-stone-300 space-y-2">
                  <p className="italic leading-relaxed">
                    &ldquo;My spiritual work is anchored in authentic consecration and divine grace. 
                    Whether you seek financial breakthrough, unconditional love, or deliverance from stubborn delays, 
                    your destiny is my sacred priority.&rdquo;
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-amber-400 font-semibold pt-1 border-t border-stone-800">
                    <span>⚡ Over 5,000+ Testimonies</span>
                    <span>🌍 Worldwide Express Shipping</span>
                  </div>
                </div>

                {/* Instant Action CTA */}
                <a
                  href={`https://wa.me/${OFFICIAL_PHONE.replace('+', '')}?text=${encodeURIComponent('Hello Anny Billions (Review Boss 001), I want to consult with you about my spiritual situation.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Consult Anny on WhatsApp ({DISPLAY_PHONE})</span>
                </a>
              </div>
            </TiltCard>
          </div>

        </div>

        {/* 4 Store Trust Badges */}
        <div className="mt-12 pt-8 border-t border-amber-950/80 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">100% Authentic</h4>
              <p className="text-[11px] text-stone-400">Powerful & Effective Results</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Fast & Discreet</h4>
              <p className="text-[11px] text-stone-400">Plain packaging worldwide</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Your Satisfaction</h4>
              <p className="text-[11px] text-stone-400">Is Our Supreme Priority</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Trusted by Thousands</h4>
              <p className="text-[11px] text-stone-400">Proven client testimonies</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

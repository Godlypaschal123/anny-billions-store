import React from 'react';
import { Award, ShieldCheck, Heart, Sparkles, MessageCircle, Truck } from 'lucide-react';
import { DISPLAY_PHONE, OFFICIAL_PHONE } from '../data/products';
import { TiltCard } from './TiltCard';
import { usePractitionerPhoto } from '../utils/practitionerPhoto';
import { PractitionerPhotoUploader } from './PractitionerPhotoUploader';

export const AboutAnny: React.FC = () => {
  const { portraitPhoto } = usePractitionerPhoto();

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#0c0a09] border-b border-amber-950/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Portrait Column */}
          <div className="lg:col-span-5">
            <TiltCard maxTilt={6} scale={1.02} glare={true} className="relative mx-auto max-w-sm lg:max-w-none rounded-3xl">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-amber-600 to-rose-600 rounded-3xl blur-xl opacity-30 pointer-events-none" />
              
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/50 bg-stone-900 shadow-2xl group">
                <img
                  src={portraitPhoto}
                  alt="Anny Billions - Founding Spiritual Practitioner"
                  className="w-full h-auto object-cover object-top"
                  referrerPolicy="no-referrer"
                />

                {/* Photo update button */}
                <div className="absolute top-3 right-3 z-10">
                  <PractitionerPhotoUploader variant="badge" />
                </div>
                
                {/* Floating Tag */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/85 backdrop-blur-md border border-amber-500/50 text-center shadow-2xl">
                  <span className="text-[11px] font-black uppercase tracking-widest text-amber-400 block mb-0.5">
                    Founding Spiritual Practitioner
                  </span>
                  <h4 className="font-cinzel text-xl font-bold text-white tracking-wide">
                    Anny Billions
                  </h4>
                  <p className="text-xs text-rose-300 font-semibold mt-0.5">
                    Recognized as REVIEW BOSS 001
                  </p>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Biography & Mission Column */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Authentic Consecration & Pure Intentions</span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Guided by Divine Grace, Dedicated to Your Elevation
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              At <strong className="text-amber-300">Annybillionz Spiritual Therapy</strong>, we believe every individual possesses a magnificent destiny that deserves to shine without hindrance. Too often, life journeys are stifled by negative ancestral patterns, household envy, the evil eye, and unseen energetic delays.
            </p>

            <p className="text-stone-400 text-sm leading-relaxed">
              Anny Billions combines deep traditional botanical wisdom with high-frequency consecrated elements—24K pure gold flakes, sacred herbs, natural mineral salts, and spiritually charged talismans. Every bar of soap, bottle of perfume, and ritual kit is prepared with strict purity, focused prayer, and divine consecration.
            </p>

            {/* Core Values Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>The &ldquo;Review Boss 001&rdquo; Standard</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Earned through thousands of verified client testimonies celebrating answered prayers, financial windfalls, and restored peace.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <Truck className="w-4 h-4 text-emerald-400" />
                  <span>Discreet & Safe Worldwide Delivery</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Absolute confidentiality. All items are sent in unmarked, plain, and discreet security boxes across Nigeria and internationally.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                  <Heart className="w-4 h-4 text-rose-400" />
                  <span>Your Destiny is Our Priority</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  We don&apos;t just sell products; we offer ongoing spiritual guidance and prayer support to ensure you manifest divine results.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>100% Pure & Ethical Therapy</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  No dark arts, no harmful rituals, no negative consequences. Pure herbal, mineral, and spiritual blessings anchored in light.
                </p>
              </div>
            </div>

            {/* Direct Connect Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={`https://wa.me/${OFFICIAL_PHONE.replace('+', '')}?text=${encodeURIComponent('Hello Anny Billions, I would like to introduce myself and speak with you regarding my spiritual situation.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs tracking-wide shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message Anny Directly ({DISPLAY_PHONE})</span>
              </a>

              <span className="text-xs text-stone-400 font-medium">
                Official Hotline: <span className="text-amber-300 font-bold">{DISPLAY_PHONE}</span>
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

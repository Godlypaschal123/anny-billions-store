import React from 'react';
import { MessageCircle, Phone, Clock, MapPin, ShieldCheck, Heart, Sparkles, Truck, ShoppingBag } from 'lucide-react';
import { DISPLAY_PHONE, OFFICIAL_PHONE } from '../data/products';
import { usePractitionerPhoto } from '../utils/practitionerPhoto';

interface ContactFooterProps {
  onOpenCart?: () => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ onOpenCart }) => {
  const { squarePhoto } = usePractitionerPhoto();
  return (
    <footer id="contact" className="bg-[#090807] border-t border-amber-950/80 text-stone-300">
      
      {/* Top Banner Callout */}
      <div className="border-b border-amber-950/60 bg-gradient-to-r from-amber-950/50 via-[#0f0c0b] to-amber-950/50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              Connect Directly with Anny Billions
            </span>
            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
              Ready to Claim Your Spiritual Breakthrough?
            </h3>
            <p className="text-xs sm:text-sm text-stone-400">
              Orders are processed seamlessly through our online store and verified on WhatsApp. Contact us for direct guidance and fast delivery worldwide.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${OFFICIAL_PHONE.replace('+', '')}?text=${encodeURIComponent('Hello Anny Billions, I am ready to order consecrated spiritual products from your online store.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs sm:text-sm shadow-xl transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp: {DISPLAY_PHONE}</span>
            </a>

            <a
              href="#products"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs shadow-md transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shop and Add to Cart 🛒</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-amber-500/70 shrink-0 shadow-lg">
                <img
                  src={squarePhoto}
                  alt="Anny Billions - Founding Spiritual Practitioner"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="font-cinzel text-lg font-bold text-white tracking-wider">
                  ANNYBILLIONZ SPIRITUAL THERAPY
                </h4>
                <p className="text-[11px] font-semibold text-amber-400 tracking-widest uppercase">
                  Anny Billions • REVIEW BOSS 001
                </p>
                <p className="text-[10px] text-stone-400">
                  Founding Spiritual Practitioner
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Authentic spiritual therapy rooted in divine purity, sacred botanicals, and high-frequency consecration. Dedicated to unlocking wealth, love, peace, and spiritual freedom for seekers worldwide.
            </p>

            <div className="p-3 rounded-xl bg-stone-950 border border-amber-950/80 text-xs text-amber-300/90 font-medium">
              &ldquo;YOUR DESTINY ❤️ OUR PRIORITY ❤️ DIVINE RESULTS&rdquo;
            </div>
          </div>

          {/* Contact Details (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h5 className="font-cinzel text-sm font-bold text-amber-200 uppercase tracking-wider">
              Contact & Delivery Center
            </h5>
            
            <ul className="space-y-3 text-xs text-stone-300">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-400 block text-[11px]">Official WhatsApp Hotline</span>
                  <a
                    href={`https://wa.me/${OFFICIAL_PHONE.replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    {DISPLAY_PHONE}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-400 block text-[11px]">Nationwide & Worldwide Shipping</span>
                  <span>Lagos & Abuja (24-48hrs) • Interstate (2-3 days) • UK, US, Canada, Europe via DHL/FedEx</span>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-400 block text-[11px]">Consultation & Order Hours</span>
                  <span>Mon – Sat: 8:00 AM – 9:00 PM (WAT)</span>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-400 block text-[11px]">Packaging Policy</span>
                  <span>100% Plain, Unmarked Discreet Packaging for complete client privacy</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="font-cinzel text-sm font-bold text-amber-200 uppercase tracking-wider">
              Quick Navigation
            </h5>

            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#products" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Consecrated Product Catalog</span>
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-300 transition-colors">
                  Complete Catalog (47 Consecrated Items)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-300 transition-colors">
                  Spiritual Diagnosis & Consultations
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-300 transition-colors">
                  Meet Anny Billions (Review Boss 001)
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-300 transition-colors">
                  Client Proof & Testimonials
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-300 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Ethical Disclaimer & Human Made Credit */}
        <div className="mt-12 pt-6 border-t border-stone-800/80 text-[11px] text-stone-400 leading-relaxed text-center max-w-4xl mx-auto space-y-4">
          <p>
            <strong>Spiritual Purity & Ethical Statement:</strong> All soaps, perfumes, sacred beads, and ritual kits prepared by Annybillionz Spiritual Therapy are consecrated strictly using natural herbs, pure essential oils, 24K gold mineral elements, and divine spiritual prayers. They are designed for uplifting manifestation, financial breakthrough, and energetic cleansing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-stone-900 text-xs text-stone-400">
            <p>
              © {new Date().getFullYear()} Annybillionz Spiritual Therapy. All Rights Reserved. Recognized globally as REVIEW BOSS 001.
            </p>
            <p className="inline-flex items-center gap-1.5 text-stone-400 font-medium">
              <span>Handcrafted & Built with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" />
              <span>by <strong className="text-amber-300 font-semibold tracking-wide">Pascal Okpalaugo</strong></span>
            </p>
          </div>
        </div>
      </div>

    </footer>
  );
};

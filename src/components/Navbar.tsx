import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Menu, X } from 'lucide-react';
import { DISPLAY_PHONE, OFFICIAL_PHONE } from '../data/products';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#120f0e]/95 backdrop-blur-md border-b border-amber-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.25)] bg-black shrink-0">
              <img
                src="/images/logo.jpg"
                alt="Annybillionz Spiritual Therapy Logo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-cinzel text-lg sm:text-xl font-bold tracking-wider text-amber-200 group-hover:text-amber-100 transition-colors">
                  ANNYBILLIONZ
                </span>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-500/40 tracking-tight">
                  BOSS 001
                </span>
              </div>
              <p className="text-[11px] font-medium tracking-widest text-amber-400/80 uppercase font-sans">
                Spiritual Therapy
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-300">
            <a href="#products" className="hover:text-amber-300 transition-colors">
              Online Catalog
            </a>
            <a href="#services" className="hover:text-amber-300 transition-colors">
              Spiritual Services
            </a>
            <a href="#about" className="hover:text-amber-300 transition-colors">
              About Anny
            </a>
            <a href="#reviews" className="hover:text-amber-300 transition-colors">
              Reviews & Proof
            </a>
            <a href="#faq" className="hover:text-amber-300 transition-colors">
              FAQ
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {/* Sacred Basket / Cart Drawer Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/50 text-amber-300 font-bold text-xs sm:text-sm active:scale-95 transition-all shadow-sm"
              aria-label="Open sacred order bag"
            >
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <span className="hidden sm:inline">Shop & Cart 🛒</span>
              {cartCount > 0 && (
                <span className="bg-rose-600 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-[#120f0e]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp Callout */}
            <a
              href={`https://wa.me/${OFFICIAL_PHONE.replace('+', '')}?text=${encodeURIComponent('Hello Anny Billions, I would like to order spiritual therapy products from your online store.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold text-xs px-3.5 py-2.5 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <div className="text-left">
                <span className="block text-[10px] text-emerald-200 uppercase leading-none">Order on WhatsApp</span>
                <span className="font-bold leading-tight">{DISPLAY_PHONE}</span>
              </div>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-300 hover:text-amber-400 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-amber-300" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-900/40 bg-[#161311] px-4 pt-3 pb-6 space-y-3">
          <div className="pb-2">
            <button
              onClick={() => {
                onOpenCart();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 text-xs font-bold py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-stone-950 shadow-md active:scale-95 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shop and Add to Cart 🛒 ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
            </button>
          </div>

          <div className="space-y-1 text-sm font-medium">
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-stone-300 hover:text-amber-300 hover:bg-stone-900"
            >
              Online Catalog
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-stone-300 hover:text-amber-300 hover:bg-stone-900"
            >
              Spiritual Services & Consultations
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-stone-300 hover:text-amber-300 hover:bg-stone-900"
            >
              About Anny Billions (Review Boss 001)
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-stone-300 hover:text-amber-300 hover:bg-stone-900"
            >
              Client Testimonials & Proof
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-stone-300 hover:text-amber-300 hover:bg-stone-900"
            >
              Frequently Asked Questions
            </a>
          </div>

          <div className="pt-2 border-t border-stone-800">
            <a
              href={`https://wa.me/${OFFICIAL_PHONE.replace('+', '')}?text=${encodeURIComponent('Hello Anny Billions, I want to inquire about products from your online spiritual store.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat with Anny on WhatsApp ({DISPLAY_PHONE})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

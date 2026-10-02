import React from 'react';
import { X, MessageCircle, ShoppingBag, Sparkles, CheckCircle2, ShieldAlert, BookOpen } from 'lucide-react';
import { Product } from '../types';
import { OFFICIAL_PHONE, DISPLAY_PHONE } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  const savings = product.originalPrice - product.promoPrice;
  const discountPercent = Math.round((savings / product.originalPrice) * 100);

  const whatsappMessage = encodeURIComponent(
    `Hello Anny Billions,\n\nI want to order *${product.name}* (Price: ₦${product.promoPrice.toLocaleString()}) from your online store catalog.\n\nPlease provide payment details and delivery timeframe.\n\nThank you!`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-[#141110] border-2 border-amber-500/50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black/90 text-stone-300 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header & Image */}
        <div className="relative aspect-[16/9] w-full bg-stone-950 overflow-hidden border-b border-amber-900/40">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141110] via-transparent to-black/30" />
          
          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider bg-amber-500 text-black px-2.5 py-0.5 rounded-full inline-block mb-1.5 shadow">
                Authentic Consecrated Formula
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
                {product.name}
              </h2>
              <p className="text-xs text-amber-300 font-medium">{product.tagline}</p>
            </div>
            
            <div className="text-right">
              <span className="text-xs line-through text-stone-400 block">
                ₦{product.originalPrice.toLocaleString()}
              </span>
              <span className="text-2xl font-black text-amber-400 font-mono">
                ₦{product.promoPrice.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Authentic Guarantee Banner */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-amber-950/40 border border-amber-500/30 text-xs">
            <span className="text-amber-300 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              100% Genuine Consecrated Remedy
            </span>
            <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded font-bold">
              Save ₦{savings.toLocaleString()} ({discountPercent}% OFF)
            </span>
          </div>

          {/* Product Description */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-2">
              Spiritual Essence & Purpose
            </h4>
            <p className="text-sm text-stone-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Consecrated Ingredients */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Consecrated Formulation & Herbs
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {product.consecratedWith.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded bg-stone-900/80 border border-stone-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="text-stone-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Spiritual Benefits */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Divine Benefits
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-300">
              {product.spiritualBenefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ritual Directions */}
          <div className="p-4 rounded-xl bg-stone-900/90 border border-amber-900/40 space-y-1.5">
            <h4 className="text-xs uppercase tracking-widest text-amber-300 font-bold flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> How To Use & Ritual Instructions
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              {product.ritualInstructions}
            </p>
          </div>

          {/* Free Gift Notification */}
          <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/30 flex items-center gap-2 text-xs text-rose-200">
            <span className="text-base">🎁</span>
            <span>
              <strong>Bonus Blessing:</strong> A complimentary consecrated spiritual gift is included automatically in every parcel dispatched!
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="flex-1 w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-sm shadow-xl active:scale-95 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shop and Add to Cart 🛒</span>
            </button>

            <a
              href={`https://wa.me/${OFFICIAL_PHONE.replace('+', '')}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order on WhatsApp</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

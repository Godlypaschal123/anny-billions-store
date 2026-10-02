import React from 'react';
import { ShoppingBag, MessageCircle, Eye, Sparkles, Check } from 'lucide-react';
import { Product } from '../types';
import { OFFICIAL_PHONE } from '../data/products';
import { TiltCard } from './TiltCard';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isAdded?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  onAddToCart,
  isAdded
}) => {
  const savings = product.originalPrice - product.promoPrice;
  const discountPercent = Math.round((savings / product.originalPrice) * 100);

  const whatsappMessage = encodeURIComponent(
    `Hello Anny Billions,\n\nI want to order *${product.name}* (Price: ₦${product.promoPrice.toLocaleString()}) from your online store catalog.\n\nPlease provide payment and delivery details.`
  );

  return (
    <TiltCard
      maxTilt={7}
      scale={1.02}
      perspective={1000}
      glare={true}
      className="h-full rounded-2xl"
    >
      <div className="group relative h-full bg-[#151210] border border-amber-950/80 hover:border-amber-500/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_rgba(245,158,11,0.22)] flex flex-col justify-between">
        
        {/* Top Media Container */}
        <div 
          className="relative aspect-square w-full bg-stone-950 overflow-hidden cursor-pointer" 
          onClick={() => onOpenDetails(product)}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151210] via-transparent to-black/20" />

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start">
            <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500 text-black px-2 py-0.5 rounded shadow-md">
              Consecrated
            </span>
            {product.isBestseller && (
              <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-600 text-white px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> High Demand
              </span>
            )}
          </div>

          {/* Savings Badge */}
          <div className="absolute top-2.5 right-2.5">
            <span className="bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 text-[10px] font-black px-2 py-0.5 rounded shadow">
              Save {discountPercent}%
            </span>
          </div>

          {/* Quick View Hover overlay button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(product);
            }}
            className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/75 hover:bg-amber-500 hover:text-black text-amber-300 border border-amber-500/40 backdrop-blur-sm transition-all opacity-90 group-hover:opacity-100"
            title="Quick View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-400/80">
              {product.categoryLabel}
            </span>
            <h3 
              onClick={() => onOpenDetails(product)}
              className="font-cinzel text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1 cursor-pointer mt-0.5"
            >
              {product.name}
            </h3>
            <p className="text-xs text-stone-400 line-clamp-2 mt-1 leading-relaxed">
              {product.tagline}
            </p>
          </div>

          {/* Pricing Matrix */}
          <div className="pt-2 border-t border-stone-800/80">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-stone-500 line-through">
                ₦{product.originalPrice.toLocaleString()}
              </span>
              <span className="text-[11px] font-semibold text-emerald-400">
                Save ₦{savings.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-lg sm:text-xl font-black text-amber-400 font-mono tracking-tight">
                ₦{product.promoPrice.toLocaleString()}
              </span>
              <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-900/50">
                In Stock
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            {/* Primary Action Button: "Shop and Add to Cart 🛒" */}
            <button
              onClick={() => onAddToCart(product)}
              className={`w-full flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-black text-xs sm:text-sm transition-all shadow-md active:scale-[0.98] ${
                isAdded
                  ? 'bg-emerald-600 text-white shadow-emerald-900/40'
                  : 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-amber-950/30'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart ✓</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop and Add to Cart 🛒</span>
                </>
              )}
            </button>

            {/* Secondary: Quick WhatsApp Order */}
            <a
              href={`https://wa.me/${OFFICIAL_PHONE.replace('+', '')}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-emerald-400 border border-stone-800 text-[11px] font-semibold transition-all"
              title="Order directly with Anny on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>Direct WhatsApp Order</span>
            </a>
          </div>

        </div>

      </div>
    </TiltCard>
  );
};

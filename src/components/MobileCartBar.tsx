import React from 'react';
import { ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';
import { CartItem } from '../types';
import { OFFICIAL_PHONE } from '../data/products';

interface MobileCartBarProps {
  items: CartItem[];
  onOpenCart: () => void;
}

export const MobileCartBar: React.FC<MobileCartBarProps> = ({ items, onOpenCart }) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.promoPrice * item.quantity,
    0
  );

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden p-3 bg-gradient-to-t from-black via-stone-950/95 to-stone-950/90 border-t border-amber-500/40 backdrop-blur-md animate-slideUp">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {/* Cart Info */}
        <div className="flex items-center gap-2.5 min-w-0" onClick={onOpenCart} role="button">
          <div className="relative p-2 rounded-xl bg-amber-500 text-stone-950 shrink-0">
            <ShoppingBag className="w-5 h-5 font-bold" />
            <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-black">
              {totalItems}
            </span>
          </div>
          <div className="truncate">
            <div className="text-[10px] uppercase font-bold text-amber-400 leading-none">
              Sacred Cart Total
            </div>
            <div className="font-mono text-base font-black text-white leading-tight">
              ₦{subtotal.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onOpenCart}
          className="flex-1 max-w-[200px] flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 active:scale-95 text-stone-950 font-black text-xs shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all"
        >
          <span>Checkout</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

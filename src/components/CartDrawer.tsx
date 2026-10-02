import React, { useState } from 'react';
import { 
  X, Trash2, Plus, Minus, MessageCircle, Gift, ShoppingBag, 
  ShieldCheck, Truck, PenLine
} from 'lucide-react';
import { CartItem } from '../types';
import { OFFICIAL_PHONE } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

interface DeliveryOption {
  id: string;
  name: string;
  fee: number;
  time: string;
}

const DELIVERY_OPTIONS: DeliveryOption[] = [
  { id: 'lagos', name: 'Lagos State Express', fee: 3500, time: '24-48 Hours' },
  { id: 'abuja', name: 'Abuja FCT Express', fee: 5000, time: '24-48 Hours' },
  { id: 'ph', name: 'Port Harcourt & South-South', fee: 5000, time: '2-3 Working Days' },
  { id: 'state', name: 'Other Nigerian States', fee: 5000, time: '2-3 Working Days' },
  { id: 'uk', name: 'United Kingdom (DHL Express)', fee: 28000, time: '3-5 Working Days' },
  { id: 'us', name: 'United States & Canada (DHL/FedEx)', fee: 35000, time: '3-6 Working Days' },
  { id: 'europe', name: 'Europe & Rest of World (DHL)', fee: 35000, time: '3-7 Working Days' }
];

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string>('lagos');
  const [specialNote, setSpecialNote] = useState('');

  if (!isOpen) return null;

  const selectedDelivery = DELIVERY_OPTIONS.find(d => d.id === selectedDeliveryId) || DELIVERY_OPTIONS[0];

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.promoPrice * item.quantity,
    0
  );

  const originalTotal = items.reduce(
    (sum, item) => sum + item.product.originalPrice * item.quantity,
    0
  );

  const totalSavings = originalTotal - subtotal;
  const deliveryFee = items.length > 0 ? selectedDelivery.fee : 0;
  const grandTotal = subtotal + deliveryFee;

  // Format WhatsApp Message with full itemized details
  const generateWhatsAppOrderText = () => {
    const orderId = `AB-${Math.floor(100000 + Math.random() * 900000)}`;
    let message = `*ANNYBILLIONZ SPIRITUAL THERAPY - OFFICIAL ORDER*\n`;
    message += `*Order Reference:* #${orderId}\n`;
    message += `------------------------\n`;
    message += `*Delivery Destination:* ${selectedDelivery.name} (${selectedDelivery.time})\n`;
    if (specialNote.trim()) {
      message += `*Prayer Intention / Note:* ${specialNote.trim()}\n`;
    }
    message += `\n*ORDERED SACRED ITEMS:*\n`;
    items.forEach((item, idx) => {
      message += `${idx + 1}. *${item.product.name}* (Qty: ${item.quantity}) - ₦${(item.product.promoPrice * item.quantity).toLocaleString()}\n`;
    });

    message += `\n------------------------\n`;
    message += `*Items Subtotal:* ₦${subtotal.toLocaleString()}\n`;
    message += `*Delivery Fee (${selectedDelivery.name}):* ₦${deliveryFee.toLocaleString()}\n`;
    message += `*Grand Total:* ₦${grandTotal.toLocaleString()}\n`;
    message += `*Bonus Blessing:* COMPLIMENTARY SACRED GIFT INCLUDED 🎁\n`;
    message += `------------------------\n\n`;
    message += `Hello Anny Billions (Review Boss 001), I have selected these items from your official website. Please confirm availability, bank transfer details, and delivery dispatch. Thank you!`;

    return encodeURIComponent(message);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div 
          className="w-screen max-w-lg bg-[#161210] border-l border-amber-500/40 shadow-2xl flex flex-col justify-between text-stone-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-amber-900/40 bg-stone-950 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="font-cinzel text-lg font-bold text-white leading-none">
                  Sacred Order Bag
                </h3>
                <span className="text-[11px] text-amber-300 font-medium">
                  {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-900 border border-stone-800 mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-stone-600" />
                </div>
                <div>
                  <h4 className="font-cinzel text-base font-bold text-white">Your Cart is Empty</h4>
                  <p className="text-xs text-stone-400 max-w-xs mx-auto mt-1">
                    Explore our consecrated collection and tap &ldquo;Add to Cart&rdquo; to begin your order.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all"
                >
                  Shop and Add to Cart 🛒
                </button>
              </div>
            ) : (
              <>
                {/* Complimentary Gift Banner */}
                <div className="p-3 rounded-xl bg-gradient-to-r from-rose-950/70 to-amber-950/70 border border-amber-500/30 flex items-center gap-2.5 text-xs">
                  <Gift className="w-5 h-5 text-amber-300 shrink-0" />
                  <div>
                    <span className="text-white font-bold block uppercase text-[11px]">
                      Complimentary Blessing Gift Included 🎁
                    </span>
                    <span className="text-stone-300 text-[11px]">
                      Every order receives an anointed free prayer gift and instructions.
                    </span>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  {items.map(({ product, quantity }) => (
                    <div 
                      key={product.id}
                      className="p-3 rounded-xl bg-stone-900/90 border border-stone-800 hover:border-amber-500/30 flex gap-3 items-center transition-all"
                    >
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg border border-amber-500/30 shrink-0 bg-stone-950"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-cinzel font-bold text-xs text-white truncate">
                            {product.name}
                          </h4>
                          <span className="font-mono text-xs font-bold text-amber-300 shrink-0">
                            ₦{(product.promoPrice * quantity).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                          {product.tagline}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity control */}
                          <div className="flex items-center rounded-lg bg-stone-950 border border-stone-800 text-stone-300">
                            <button
                              onClick={() => onUpdateQuantity(product.id, -1)}
                              className="p-1 px-1.5 hover:text-amber-400 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-white">
                              {quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(product.id, 1)}
                              className="p-1 px-1.5 hover:text-amber-400 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(product.id)}
                            className="p-1 text-stone-500 hover:text-rose-400 transition-colors ml-auto"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Clear Cart link */}
                <div className="flex justify-between items-center text-xs pt-1">
                  <span className="text-stone-400">Total Items: {items.reduce((s, i) => s + i.quantity, 0)}</span>
                  <button
                    onClick={onClearCart}
                    className="text-stone-500 hover:text-rose-400 underline transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>

                {/* Delivery Destination Selector */}
                <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 space-y-2">
                  <label className="text-xs text-stone-300 font-semibold flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-amber-400">
                      <Truck className="w-3.5 h-3.5" /> Delivery Destination:
                    </span>
                    <span className="text-[11px] text-stone-400">{selectedDelivery.time}</span>
                  </label>
                  <select
                    value={selectedDeliveryId}
                    onChange={(e) => setSelectedDeliveryId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-stone-200 focus:outline-none focus:border-amber-500 text-xs"
                  >
                    {DELIVERY_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.name} — ₦{opt.fee.toLocaleString()} ({opt.time})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Optional Prayer Intention / Note */}
                <div className="p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 space-y-1.5">
                  <label className="text-xs text-stone-400 font-semibold flex items-center gap-1.5">
                    <PenLine className="w-3.5 h-3.5 text-amber-400" />
                    <span>Special Prayer Intention / Delivery Note (Optional):</span>
                  </label>
                  <textarea
                    rows={2}
                    value={specialNote}
                    onChange={(e) => setSpecialNote(e.target.value)}
                    placeholder="e.g., Anoint for customer breakthrough, or specific delivery instructions..."
                    className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:outline-none focus:border-amber-500 resize-none placeholder:text-stone-600"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer & Primary WhatsApp Checkout */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-amber-900/40 bg-stone-950 space-y-3.5">
              {/* Order Calculations */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-stone-400">
                  <span>Items Subtotal:</span>
                  <span className="font-mono font-medium text-stone-200">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-stone-400">
                  <span>Delivery ({selectedDelivery.name}):</span>
                  <span className="font-mono font-medium text-stone-200">₦{deliveryFee.toLocaleString()}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex items-center justify-between text-emerald-400 font-semibold">
                    <span>Total Discount Savings:</span>
                    <span>- ₦{totalSavings.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-base font-black text-white pt-2 border-t border-stone-800">
                  <span>Grand Total:</span>
                  <span className="text-amber-400 font-mono text-xl sm:text-2xl">
                    ₦{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Direct WhatsApp Checkout Button */}
              <div className="space-y-2">
                <a
                  href={`https://wa.me/${OFFICIAL_PHONE.replace('+', '')}?text=${generateWhatsAppOrderText()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-sm sm:text-base shadow-[0_4px_20px_rgba(16,185,129,0.35)] active:scale-[0.99] transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Checkout on WhatsApp</span>
                </a>
              </div>

              <div className="space-y-1 text-center">
                <p className="text-[11px] text-stone-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Direct 1-on-1 dispatch & bank transfer confirmation with Anny Billions</span>
                </p>
                <p className="text-[10px] text-stone-500">
                  Discreet packaging & fast delivery across Lagos, Nigeria & Worldwide 🌍
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

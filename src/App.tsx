/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ServicesSection } from './components/ServicesSection';
import { AboutAnny } from './components/AboutAnny';
import { TestimonialsSection } from './components/TestimonialsSection';
import { SpiritualFaq } from './components/SpiritualFaq';
import { ContactFooter } from './components/ContactFooter';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { MobileCartBar } from './components/MobileCartBar';

const CART_STORAGE_KEY = 'annybillionz_cart_v2';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (!saved) return [];
      const parsed: CartItem[] = JSON.parse(saved);
      return parsed.map((item) => {
        const freshProduct = PRODUCTS.find((p) => p.id === item.product.id);
        return freshProduct ? { ...item, product: freshProduct } : item;
      });
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart state to localStorage', e);
    }
  }, [cart]);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    // Auto-open bag drawer on addition
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartItemIds = cart.map((i) => i.product.id);

  return (
    <div className="min-h-screen bg-[#0c0a09] text-stone-100 font-sans antialiased selection:bg-amber-500 selection:text-black pb-16 lg:pb-0 relative">
      {/* Subtle luxury ambient glow at top */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(180,120,40,0.08),transparent)]" />

      {/* Main Sticky Luxury Navigation */}
      <Navbar
        cartCount={totalCartItemsCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section with Official Branding & "Shop and Add to Cart 🛒" */}
        <Hero onOpenCart={() => setIsCartOpen(true)} />

        {/* Product Catalog with all 14 consecrated items, categories & instant Add to Cart */}
        <ProductCatalog
          onOpenDetails={(p) => setSelectedProduct(p)}
          onAddToCart={handleAddToCart}
          cartItemIds={cartItemIds}
        />

        {/* Professional Spiritual Therapy Services */}
        <ServicesSection />

        {/* Meet Anny Billions & Her Legacy (Review Boss 001) */}
        <AboutAnny />

        {/* Verified Client Testimonials & Results */}
        <TestimonialsSection />

        {/* FAQ Section */}
        <SpiritualFaq />
      </main>

      {/* Footer with contact information and official hours */}
      <ContactFooter onOpenCart={() => setIsCartOpen(true)} />

      {/* Floating 24/7 WhatsApp Quick Button */}
      <FloatingWhatsApp />

      {/* Mobile Sticky Cart & Checkout Bar for TikTok / Social Bio Traffic */}
      <MobileCartBar
        items={cart}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Sacred Order Bag & Direct WhatsApp Order Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}

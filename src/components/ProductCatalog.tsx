import React, { useState, useMemo, useEffect } from 'react';
import { Search, Sparkles, Filter, Gift, ArrowUpDown, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  onOpenDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  cartItemIds: string[];
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onOpenDetails,
  onAddToCart,
  cartItemIds
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'savings'>('featured');
  
  // Section Pagination State: 6 products per section by default
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerSection, setItemsPerSection] = useState<number>(6);

  const categories: { id: ProductCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Sacred Products', count: PRODUCTS.length },
    { id: 'soaps', label: 'Sacred Soaps', count: PRODUCTS.filter(p => p.category === 'soaps' || p.name.includes('Soap')).length },
    { id: 'perfumes', label: 'Sacred Perfumes', count: PRODUCTS.filter(p => p.category === 'perfumes' || p.name.includes('Perfume')).length },
    { id: 'wealth', label: 'Wealth & Cashout', count: PRODUCTS.filter(p => p.category === 'wealth').length },
    { id: 'love', label: 'Love & Seduction', count: PRODUCTS.filter(p => p.category === 'love').length },
    { id: 'cleansing', label: 'Cleansing & Deliverance', count: PRODUCTS.filter(p => p.category === 'cleansing').length },
    { id: 'kits', label: 'Sacred Ritual Kits', count: PRODUCTS.filter(p => p.category === 'kits').length },
    { id: 'beads', label: 'Beads & Talismans', count: PRODUCTS.filter(p => p.category === 'beads').length },
    { id: 'oils', label: 'Consecrated Oils', count: PRODUCTS.filter(p => p.category === 'oils').length },
    { id: 'incense', label: 'Incense & Candles', count: PRODUCTS.filter(p => p.category === 'incense').length },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = selectedCategory === 'all' 
        || (selectedCategory === 'perfumes' ? (product.category === 'perfumes' || product.name.includes('Perfume')) : false)
        || (selectedCategory === 'soaps' ? (product.category === 'soaps' || product.name.includes('Soap')) : false)
        || product.category === selectedCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        product.name.toLowerCase().includes(query) ||
        product.tagline.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'featured') {
        return (a.flyerNumber || 99) - (b.flyerNumber || 99);
      }
      if (sortBy === 'price-low') {
        return a.promoPrice - b.promoPrice;
      }
      if (sortBy === 'price-high') {
        return b.promoPrice - a.promoPrice;
      }
      if (sortBy === 'savings') {
        const savingsA = a.originalPrice - a.promoPrice;
        const savingsB = b.originalPrice - b.promoPrice;
        return savingsB - savingsA;
      }
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  // Total pages / sections
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerSection));

  // Reset to first section when filters or per-page size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy, itemsPerSection]);

  // Keep currentPage valid if product count shrinks
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // Current slice of products to show
  const startIndex = (currentPage - 1) * itemsPerSection;
  const endIndex = Math.min(startIndex + itemsPerSection, filteredProducts.length);
  const currentProducts = useMemo(() => {
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, startIndex, endIndex]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    // Smoothly scroll back to the top of products section on mobile and desktop
    const target = document.getElementById('products-grid-top');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Generate page numbers for navigation
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | string)[] = [];
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return pages;
  };

  return (
    <section id="products" className="py-16 sm:py-20 bg-[#0e0c0b] border-b border-amber-950/60 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-500/50 text-amber-300 text-xs sm:text-sm font-black tracking-wide shadow-md">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Shop and Add to Cart 🛒</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Consecrated Spiritual Catalog
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            Browse our complete sacred apothecary of consecrated ritual soaps, love attraction perfumes, protection beads, and breakthrough kits. Tap &ldquo;Shop and Add to Cart 🛒&rdquo; to build your order with fast, discreet shipping worldwide.
          </p>
        </div>

        {/* Free Product Banner Alert */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-rose-950/80 via-stone-900 to-amber-950/80 border border-amber-500/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-600/30 border border-rose-500/50 flex items-center justify-center shrink-0">
              <Gift className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-200">
                COMPLIMENTARY SACRED BLESSING GIFT INCLUDED! 🎁
              </h4>
              <p className="text-xs text-stone-300">
                Every order placed on our store includes a consecrated bonus spiritual gift packed inside your discreet parcel.
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-400 bg-black/60 px-3 py-1.5 rounded-full border border-amber-500/30 whitespace-nowrap">
            All Orders Guaranteed
          </span>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-md font-bold'
                    : 'bg-stone-900/90 text-stone-300 hover:bg-stone-800 hover:text-white border border-stone-800'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.id ? 'bg-black/30 text-black' : 'bg-stone-800 text-stone-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Controls: Search & Sort */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products by name or benefit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs sm:text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs text-stone-400 flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" /> Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              >
                <option value="featured">Featured Collection</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="savings">Highest Savings</option>
              </select>
            </div>
          </div>
        </div>

        {/* Scroll anchor target for section page jumping */}
        <div id="products-grid-top" className="scroll-mt-28" />

        {/* Section Progress Bar & Quick Left/Right Angle Arrows */}
        {filteredProducts.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 sm:px-4 rounded-xl bg-gradient-to-r from-stone-900/90 via-amber-950/30 to-stone-900/90 border border-amber-500/30 shadow-md">
            {/* Section & Count Indicator */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-amber-200 flex items-center gap-1.5">
                  <span>Section {currentPage} of {totalPages}</span>
                  <span className="text-stone-500">•</span>
                  <span className="text-stone-300 font-normal">
                    Showing products {startIndex + 1}–{endIndex} of {filteredProducts.length}
                  </span>
                </div>
                <div className="text-[11px] text-stone-400 hidden sm:block">
                  Browsing in compact sections of {itemsPerSection} products for smooth mobile browsing
                </div>
              </div>
            </div>

            {/* Quick Top Angle Arrow Buttons + Section Size Selector */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              {/* Items per section selector */}
              <div className="flex items-center gap-1 text-[11px] text-stone-400 bg-stone-950/80 px-2.5 py-1 rounded-lg border border-stone-800">
                <span>View:</span>
                <button
                  type="button"
                  onClick={() => setItemsPerSection(6)}
                  className={`px-1.5 py-0.5 rounded font-bold transition-colors ${
                    itemsPerSection === 6 ? 'bg-amber-500 text-black' : 'text-stone-300 hover:text-white'
                  }`}
                  title="Show 6 products per section (Recommended for mobile)"
                >
                  6
                </button>
                <button
                  type="button"
                  onClick={() => setItemsPerSection(12)}
                  className={`px-1.5 py-0.5 rounded font-bold transition-colors ${
                    itemsPerSection === 12 ? 'bg-amber-500 text-black' : 'text-stone-300 hover:text-white'
                  }`}
                >
                  12
                </button>
                <button
                  type="button"
                  onClick={() => setItemsPerSection(filteredProducts.length || 47)}
                  className={`px-1.5 py-0.5 rounded font-bold transition-colors ${
                    itemsPerSection >= filteredProducts.length ? 'bg-amber-500 text-black' : 'text-stone-300 hover:text-white'
                  }`}
                >
                  All
                </button>
              </div>

              {/* Angle Arrows */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  aria-label="Previous section"
                  className={`h-9 px-3 rounded-lg border flex items-center gap-1 text-xs font-bold transition-all duration-200 ${
                    currentPage <= 1
                      ? 'bg-stone-900/40 border-stone-800/60 text-stone-600 cursor-not-allowed'
                      : 'bg-stone-900 border-amber-500/50 text-amber-300 hover:bg-amber-500 hover:text-stone-950 active:scale-95 shadow'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden xs:inline">Prev</span>
                </button>

                <div className="px-2 py-1 text-xs font-semibold text-amber-400 bg-black/60 rounded-md border border-amber-500/30">
                  {currentPage} / {totalPages}
                </div>

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  aria-label="Next section"
                  className={`h-9 px-3 rounded-lg border flex items-center gap-1 text-xs font-bold transition-all duration-200 ${
                    currentPage >= totalPages
                      ? 'bg-stone-900/40 border-stone-800/60 text-stone-600 cursor-not-allowed'
                      : 'bg-stone-900 border-amber-500/50 text-amber-300 hover:bg-amber-500 hover:text-stone-950 active:scale-95 shadow'
                  }`}
                >
                  <span className="hidden xs:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Cards Grid (Displays current slice of 6 products) */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-stone-900/40 rounded-2xl border border-stone-800 space-y-3">
            <p className="text-stone-400 text-sm">No products found matching &ldquo;{searchQuery}&rdquo;</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs font-semibold text-amber-400 underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={onOpenDetails}
                onAddToCart={onAddToCart}
                isAdded={cartItemIds.includes(product.id)}
              />
            ))}
          </div>
        )}

        {/* Bottom Section Angle Arrow Navigation Bar */}
        {totalPages > 1 && (
          <div className="pt-4 border-t border-amber-950/40 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-stone-900 via-[#181412] to-stone-900 border border-amber-500/40 shadow-xl">
              
              {/* Previous Section Left Angle Arrow */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className={`w-full sm:w-auto min-h-[46px] px-5 py-2.5 rounded-xl border flex items-center justify-center gap-2 text-sm font-bold tracking-wide transition-all duration-200 active:scale-95 shadow-md ${
                  currentPage <= 1
                    ? 'bg-stone-900/50 border-stone-800 text-stone-600 cursor-not-allowed'
                    : 'bg-stone-900 border-amber-500/60 text-amber-300 hover:bg-amber-500 hover:text-stone-950 hover:border-amber-400 cursor-pointer shadow-amber-950/40'
                }`}
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                <span>Previous Section</span>
              </button>

              {/* Numbered Section Pills for direct jumping */}
              <div className="flex items-center gap-1.5 flex-wrap justify-center">
                {getPageNumbers().map((page, idx) => {
                  if (page === '...') {
                    return (
                      <span key={`dots-${idx}`} className="px-2 text-stone-500 font-bold select-none">
                        •••
                      </span>
                    );
                  }
                  const isCurrent = page === currentPage;
                  return (
                    <button
                      key={`page-${page}`}
                      type="button"
                      onClick={() => handlePageChange(Number(page))}
                      className={`min-w-[40px] h-10 px-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                        isCurrent
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-lg shadow-amber-500/30 scale-105 border border-amber-300 ring-2 ring-amber-500/40'
                          : 'bg-stone-900/90 text-stone-300 hover:bg-stone-800 hover:text-white border border-stone-800/90 hover:border-amber-500/40'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              {/* Next Section Right Angle Arrow */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className={`w-full sm:w-auto min-h-[46px] px-5 py-2.5 rounded-xl border flex items-center justify-center gap-2 text-sm font-bold tracking-wide transition-all duration-200 active:scale-95 shadow-md ${
                  currentPage >= totalPages
                    ? 'bg-stone-900/50 border-stone-800 text-stone-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 border-amber-400 hover:from-amber-400 hover:to-amber-500 hover:brightness-110 cursor-pointer shadow-amber-500/20'
                }`}
              >
                <span>Next Section</span>
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>

            </div>

            {/* Mobile-Friendly Usage Note */}
            <div className="text-center text-xs text-stone-400">
              <span className="text-amber-400 font-semibold">✨ Mobile tip:</span> Tap the <span className="text-amber-300 font-bold">&lsaquo;</span> and <span className="text-amber-300 font-bold">&rsaquo;</span> angle arrows to swiftly browse sections without having to scroll through all 47 items.
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

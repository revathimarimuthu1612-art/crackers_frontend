import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { Pagination } from '../components/Pagination';
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Truck,
  PhoneCall,
  Tag,
} from 'lucide-react';

export const ShopPage = () => {
  const { products, categories, pageParams, globalSearch, setGlobalSearch } = useApp();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(pageParams?.category || 'all');
  const [priceRange, setPriceRange] = useState('all'); // 'all', 'under-200', '200-500', '500-1000', 'above-1000'
  const [discountFilter, setDiscountFilter] = useState('all'); // 'all', '30-plus', '20-plus'
  const [stockOnly, setStockOnly] = useState(false);
  const [minRating, setMinRating] = useState('all'); // 'all', '4.5', '4.8'
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'price-asc', 'price-desc', 'newest'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
  // Pagination State (Default 12 items per page for balanced grid)
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const itemsPerPage = 12;

  // Synchronize category if page was opened with category param
  useEffect(() => {
    if (pageParams?.category) {
      setSelectedCategory(pageParams.category);
    }
  }, [pageParams?.category]);

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query
    if (globalSearch.trim()) {
      const q = globalSearch.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.categoryName?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price Range filter
    if (priceRange === 'under-200') {
      result = result.filter((p) => p.price < 200);
    } else if (priceRange === '200-500') {
      result = result.filter((p) => p.price >= 200 && p.price <= 500);
    } else if (priceRange === '500-1000') {
      result = result.filter((p) => p.price > 500 && p.price <= 1000);
    } else if (priceRange === 'above-1000') {
      result = result.filter((p) => p.price > 1000);
    }

    // Discount filter
    if (discountFilter === '30-plus') {
      result = result.filter((p) => p.discount && (parseInt(p.discount) >= 30 || p.discount.includes('33%') || p.discount.includes('35%') || p.discount.includes('40%')));
    } else if (discountFilter === '20-plus') {
      result = result.filter((p) => p.discount && (parseInt(p.discount) >= 20));
    }

    // In Stock filter
    if (stockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

    // Rating filter
    if (minRating === '4.5') {
      result = result.filter((p) => p.rating >= 4.5);
    } else if (minRating === '4.8') {
      result = result.filter((p) => p.rating >= 4.8);
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => b.id - a.id);
    } else {
      // Popular (rating & reviews count)
      result.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
    }

    return result;
  }, [products, globalSearch, selectedCategory, priceRange, discountFilter, stockOnly, minRating, sortBy]);

  // Reset pagination to page 1 whenever any filter or search changes
  useEffect(() => {
    setCurrentPageNum(1);
  }, [globalSearch, selectedCategory, priceRange, discountFilter, stockOnly, minRating, sortBy]);

  // Calculate Paginated subset
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = useMemo(() => {
    const start = (currentPageNum - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPageNum, itemsPerPage]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setPriceRange('all');
    setDiscountFilter('all');
    setStockOnly(false);
    setMinRating('all');
    setSortBy('popular');
    setGlobalSearch('');
    setCurrentPageNum(1);
  };

  const isAnyFilterActive =
    selectedCategory !== 'all' ||
    priceRange !== 'all' ||
    discountFilter !== 'all' ||
    stockOnly ||
    minRating !== 'all' ||
    globalSearch !== '';

  return (
    <div className="w-full max-w-full px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-6 sm:py-8 animate-fade-in overflow-hidden">
      {/* Title & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-gray-200 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700 dark:text-amber-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Catalog • Authentic Sivakasi Fireworks</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
            Shop Crackers
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Showing <strong className="text-gray-900 dark:text-white">{filteredProducts.length}</strong> of {products.length} crackers & fireworks
          </p>
        </div>

        {/* Sort and Mobile Filter Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1E2026] text-xs font-bold text-gray-800 dark:text-gray-200"
          >
            <SlidersHorizontal className="w-4 h-4 text-red-600" />
            <span>Filters {isAnyFilterActive && '•'}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2.5 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1E2026] text-gray-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-600/30"
            >
              <option value="popular">Popularity & Rating</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 items-start">
        {/* Desktop Sidebar Filters (Fully Filled Down to Bottom) */}
        <aside className="hidden lg:block h-full">
          <div className="bg-white dark:bg-[#1E2026] rounded-2xl border border-gray-200 dark:border-gray-800 p-5 space-y-6 shadow-sm sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <span className="font-extrabold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-red-600" />
                Filter Catalog
              </span>
              {isAnyFilterActive && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-red-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-2">
                Categories
              </label>
              <div className="space-y-1 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
                    selectedCategory === 'all'
                      ? 'bg-red-50 dark:bg-amber-950/40 text-red-700 dark:text-amber-300 font-bold'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="bg-gray-200/70 dark:bg-gray-700 px-1.5 py-0.2 rounded text-[10px] font-bold">
                    {products.length}
                  </span>
                </button>
                {categories.map((c) => {
                  const count = products.filter((p) => p.category === c.id).length;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
                        selectedCategory === c.id
                          ? 'bg-red-50 dark:bg-amber-950/40 text-red-700 dark:text-amber-300 font-bold'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <span>{c.name}</span>
                      <span className="bg-gray-200/70 dark:bg-gray-700 px-1.5 py-0.2 rounded text-[10px] font-bold">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-2">
                Price Range
              </label>
              <div className="space-y-1 text-xs">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under-200', label: 'Under ₹200' },
                  { id: '200-500', label: '₹200 - ₹500' },
                  { id: '500-1000', label: '₹500 - ₹1,000' },
                  { id: 'above-1000', label: 'Above ₹1,000' },
                ].map((range) => (
                  <label
                    key={range.id}
                    className="flex items-center gap-2 p-1 text-gray-700 dark:text-gray-300 hover:text-red-700 cursor-pointer font-medium"
                  >
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === range.id}
                      onChange={() => setPriceRange(range.id)}
                      className="accent-red-600"
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Festival Offers / Discounts */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-2">
                Discounts & Offers
              </label>
              <div className="space-y-1 text-xs font-medium">
                {[
                  { id: 'all', label: 'All Products' },
                  { id: '30-plus', label: '30% OFF & Above' },
                  { id: '20-plus', label: '20% OFF & Above' },
                ].map((d) => (
                  <label
                    key={d.id}
                    className="flex items-center gap-2 p-1 text-gray-700 dark:text-gray-300 hover:text-red-700 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="discount"
                      checked={discountFilter === d.id}
                      onChange={() => setDiscountFilter(d.id)}
                      className="accent-red-600"
                    />
                    <span>{d.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-2">
                Stock Status
              </label>
              <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={stockOnly}
                  onChange={(e) => setStockOnly(e.target.checked)}
                  className="rounded accent-red-600 w-4 h-4"
                />
                <span>Show In Stock Items Only</span>
              </label>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-2">
                Customer Rating
              </label>
              <div className="space-y-1 text-xs font-medium">
                {[
                  { id: 'all', label: 'All Ratings' },
                  { id: '4.5', label: '4.5 ★ & Above' },
                  { id: '4.8', label: '4.8 ★ Top Rated' },
                ].map((r) => (
                  <label
                    key={r.id}
                    className="flex items-center gap-2 p-1 text-gray-700 dark:text-gray-300 hover:text-red-700 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === r.id}
                      onChange={() => setMinRating(r.id)}
                      className="accent-red-600"
                    />
                    <span>{r.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Promotional Offer Banner Card */}
            <div className="p-3.5 bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/50 dark:to-orange-950/40 rounded-xl border border-amber-300/70 dark:border-amber-800/50 space-y-1.5 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-900 dark:text-amber-300">
                <Tag className="w-4 h-4 text-red-600" />
                <span>Diwali Special Code</span>
              </div>
              <p className="text-[11px] text-gray-700 dark:text-gray-300">
                Use code <strong className="text-red-700 dark:text-amber-400 font-extrabold">DIWALI2026</strong> at checkout for extra 10% OFF!
              </p>
            </div>

            {/* PESO Certification & Support Card */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-extrabold text-gray-900 dark:text-white">100% PESO Certified</h4>
                  <p className="text-[11px] text-gray-500 leading-snug">Tested & safe Sivakasi green fireworks.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Truck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-extrabold text-gray-900 dark:text-white">Fast Doorstep Delivery</h4>
                  <p className="text-[11px] text-gray-500 leading-snug">Safe transport across Tamil Nadu & All India.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <PhoneCall className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-extrabold text-gray-900 dark:text-white">Customer Support</h4>
                  <p className="text-[11px] font-bold text-red-700 dark:text-amber-400">+91 9943830644</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid + Pagination */}
        <main className="lg:col-span-3 flex flex-col justify-between">
          {displayedProducts.length > 0 ? (
            <div className="space-y-8">
              {/* Product Grid (Compact Sleek Sizing) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

              {/* Reusable Pagination */}
              <Pagination
                currentPage={currentPageNum}
                totalPages={totalPages}
                totalItems={filteredProducts.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPageNum}
                itemLabel="products"
              />
            </div>
          ) : (
            <div className="bg-white dark:bg-[#1E2026] rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                No Crackers Found
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto mb-6">
                We couldn't find any products matching your active filters or search terms. Try clearing filters or searching for "sparklers" or "rockets".
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-maroon-800 to-red-600 text-white font-bold text-xs shadow hover:from-maroon-900"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-[#1E2026] rounded-t-2xl sm:rounded-2xl p-6 max-h-[85vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800">
              <h3 className="font-bold text-base text-gray-900 dark:text-white">
                Filter Products
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A] text-xs font-semibold text-gray-900 dark:text-white"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Price Range
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A] text-xs font-semibold text-gray-900 dark:text-white"
              >
                <option value="all">All Prices</option>
                <option value="under-200">Under ₹200</option>
                <option value="200-500">₹200 - ₹500</option>
                <option value="500-1000">₹500 - ₹1,000</option>
                <option value="above-1000">Above ₹1,000</option>
              </select>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 dark:text-gray-300"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold shadow"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


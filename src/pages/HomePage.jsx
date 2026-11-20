import React from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { CategoryCard } from '../components/CategoryCard';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
  Award,
  Flame,
} from 'lucide-react';

export const HomePage = () => {
  const { products, categories, navigate } = useApp();

  // Featured / Popular products
  const popularProducts = products.slice(0, 8);
  const popularCategories = categories.slice(0, 8);

  return (
    <div className="space-y-16 pb-12 animate-fade-in w-full">
      {/* Hero Section with Live Fireworks Stock Video Background - Full Width Edge-to-Edge */}
      <section className="relative overflow-hidden w-full bg-black text-white shadow-2xl min-h-[480px] sm:min-h-[560px] lg:min-h-[620px] flex items-center justify-center">
        {/* Royalty-Free HD Fireworks Stock Video (Silent Autoplay & Continuous Loop) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/products/sky-rockets-real.jpg"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        >
          <source src="/videos/fireworks_burst.webm" type="video/webm" />
          <source src="/videos/hero-fireworks.mp4" type="video/mp4" />
        </video>

        {/* Clean, Subtle Dark Contrast Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/50 z-10"></div>


        <div className="relative z-20 w-full mx-auto px-4 sm:px-6 py-12 sm:py-24 text-center">
          {/* Festive Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-[11px] sm:text-sm font-semibold mb-4 sm:mb-6 backdrop-blur-sm shadow-inner max-w-full">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 animate-spin flex-shrink-0" />
            <span className="truncate">Grand Diwali Season 2026 • 100% Genuine Sivakasi Crackers</span>
          </div>

          {/* Hero Heading */}
          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-4 sm:mb-6 leading-tight">
            Light Up Your <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-orange-300 drop-shadow-md">
              Celebrations
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-xl text-amber-100/90 font-medium max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed drop-shadow-sm px-2">
            Quality Crackers • Trusted Products • Easy Ordering
          </p>

          {/* Working Hero CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-2">
            <button
              onClick={() => navigate('shop')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-maroon-950 font-extrabold text-sm sm:text-base shadow-lg shadow-orange-900/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={() => navigate('categories')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 backdrop-blur-sm hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Categories</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </button>
          </div>

          {/* Highlights ticker */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/15 text-[11px] sm:text-sm text-amber-100/90 font-medium max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-1.5 sm:gap-2">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
              <span className="truncate">PESO Certified</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 sm:gap-2">
              <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 flex-shrink-0" />
              <span className="truncate">Express Delivery</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 sm:gap-2">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300 flex-shrink-0" />
              <span className="truncate">Factory Direct</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 sm:gap-2">
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400 flex-shrink-0" />
              <span className="truncate">Eco Green Safe</span>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-red-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Festive Collections</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
              Popular Categories
            </h2>
          </div>
          <button
            onClick={() => navigate('categories')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-red-700 dark:text-amber-400 hover:underline"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {popularCategories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Festival Offers Banner */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="relative rounded-3xl bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 text-white p-6 sm:p-10 shadow-xl overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="inline-block bg-white text-maroon-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-3 shadow">
                Festival Special Deal
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-white mb-2">
                Flat 35% OFF on Family Combo Gift Boxes!
              </h3>
              <p className="text-amber-100 text-sm sm:text-base leading-relaxed">
                Use coupon code <strong className="bg-maroon-950 px-2 py-0.5 rounded text-amber-300 font-mono">DIWALI35</strong> at checkout. Includes free safety sparkler sticks and fireworks safety goggles!
              </p>
            </div>
            <button
              onClick={() => navigate('shop', { category: 'gift-boxes' })}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-amber-50 text-maroon-900 font-black text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 flex-shrink-0"
            >
              <span>View Offer Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Popular Products Grid */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-red-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Award className="w-4 h-4" />
              <span>Handpicked Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
              Popular Products
            </h2>
          </div>
          <button
            onClick={() => navigate('shop')}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-red-700 dark:text-amber-400 hover:underline"
          >
            <span>Explore All 20+ Crackers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="bg-amber-50/60 dark:bg-[#1E2026] rounded-3xl border border-amber-200/60 dark:border-gray-800 p-8 sm:p-12 w-full">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-3">
              Why Choose Sivakasi Sparkles?
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              We make festival fireworks shopping straightforward, secure, and celebratory for every Indian household.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-[#15161A] p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">
                Trusted Products
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Directly sourced from top Sivakasi licensed manufacturers including Standard, Anil, and Cock Brand.
              </p>
            </div>

            <div className="bg-white dark:bg-[#15161A] p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">
                Easy Ordering
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Seamless guest browsing with transparent Indian rupee pricing and simple one-click checkout.
              </p>
            </div>

            <div className="bg-white dark:bg-[#15161A] p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">
                Safe Delivery
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Complies with all statutory fireworks transit guidelines, wrapped in waterproof protective cartons.
              </p>
            </div>

            <div className="bg-white dark:bg-[#15161A] p-6 rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 flex items-center justify-center mb-4">
                <Tag className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">
                Festival Offers
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Guaranteed wholesale discounts on bulk orders, family combo gift hampers, and community orders.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import { useApp } from '../context/AppContext';
import { CategoryCard } from '../components/CategoryCard';
import { Sparkles, ArrowRight } from 'lucide-react';

export const CategoriesPage = () => {
  const { categories, navigate } = useApp();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-10 space-y-10 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 dark:text-amber-400 uppercase tracking-widest bg-red-50 dark:bg-amber-950/40 px-3 py-1 rounded-full border border-red-200 dark:border-amber-900/50 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Collections</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-3">
          Explore Crackers by Category
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Find exactly what fits your family festival celebration—from silent sparkling fountains to high-flying aerial shows.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>

      <div className="bg-gradient-to-r from-amber-500/10 via-red-500/10 to-orange-500/10 border border-amber-300/40 dark:border-amber-900/40 rounded-3xl p-8 text-center mt-12">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Want a Custom Assorted Box for Your Apartment or Office?
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-6">
          Check out our pre-packaged Family Gift Hampers with over 35 handpicked festival items.
        </p>
        <button
          onClick={() => navigate('shop', { category: 'gift-boxes' })}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-maroon-800 to-red-600 hover:from-maroon-900 text-white text-xs sm:text-sm font-bold shadow transition-all inline-flex items-center gap-2"
        >
          <span>View All Gift Hampers</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

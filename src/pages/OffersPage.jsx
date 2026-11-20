import React from 'react';
import { useApp } from '../context/AppContext';
import { Tag, ArrowRight, Clock, Percent } from 'lucide-react';

export const OffersPage = () => {
  const { offers, navigate } = useApp();

  const handleViewOfferProducts = (applicableCategory) => {
    if (applicableCategory && applicableCategory !== 'all') {
      navigate('shop', { category: applicableCategory });
    } else {
      navigate('shop');
    }
  };

  // Resolve cute product image for each offer item
  const getOfferProductImage = (offer) => {
    if (offer.image) return offer.image;
    if (offer.applicableCategory === 'sparklers') return '/products/sparklers-box-real.jpg';
    if (offer.applicableCategory === 'aerial-shots') return '/products/aerial-shots-real.jpg';
    if (offer.applicableCategory === 'kids-special') return '/products/pop-pop-snappers.jpg';
    if (offer.applicableCategory === 'sound-crackers') return '/products/sivakasi-1000-wala-real.jpg';
    if (offer.applicableCategory === 'gift-boxes') return '/products/rockets-box.jpg';
    return '/products/sparklers-box-real.jpg';
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-10 space-y-12 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 text-xs font-black text-red-700 dark:text-amber-400 uppercase tracking-widest bg-red-50 dark:bg-amber-950/40 px-3.5 py-1.5 rounded-full border border-red-200 dark:border-amber-900/50 mb-3 shadow-xs">
          <Tag className="w-3.5 h-3.5" />
          <span>Festival Savings Zone</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-3">
          Exclusive Festival Offers & Deals
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Save big this celebration season with bundle discounts on family gift hampers, sparklers, aerial shots, and kids specials.
        </p>
      </div>

      {/* Offers Cards Grid with Cute Product Pictures */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 w-full">
        {offers.map((offer) => {
          const offerImg = getOfferProductImage(offer);

          return (
            <div
              key={offer.id}
              className="group relative bg-white dark:bg-[#1E2026] rounded-3xl border border-gray-200/90 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:border-red-500/30 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Cute Offered Product Picture Header */}
              <div className="relative h-52 w-full bg-amber-50/60 dark:bg-gray-800/60 overflow-hidden">
                <img
                  src={offerImg}
                  alt={offer.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />

                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30"></div>

                {/* Badge Top Left */}
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black shadow-md tracking-wide">
                  {offer.badge || 'Diwali Special'}
                </span>

                {/* Discount Badge Top Right */}
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber-400 text-maroon-950 text-xs font-black shadow-md flex items-center gap-1">
                  <Percent className="w-3.5 h-3.5 stroke-[3]" />
                  <span>{offer.discount}</span>
                </span>

                {/* Category Pill Bottom Left */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300 bg-black/60 px-2.5 py-0.5 rounded-md backdrop-blur-xs border border-amber-400/30">
                    {offer.applicableCategoryName || offer.applicableCategory || 'Festival Special'}
                  </span>
                </div>
              </div>

              {/* Offer Details Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-black text-xl text-gray-900 dark:text-white mb-2 leading-snug group-hover:text-red-600 dark:group-hover:text-amber-400 transition-colors">
                    {offer.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {offer.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-extrabold text-gray-600 dark:text-gray-300 bg-amber-50/80 dark:bg-gray-800/80 p-2.5 rounded-xl border border-amber-200/60 dark:border-gray-700">
                    <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>Offer Valid till {offer.endDate}</span>
                  </div>
                </div>

                {/* Working View Offer Products Button */}
                <button
                  onClick={() => handleViewOfferProducts(offer.applicableCategory)}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-maroon-800 via-red-700 to-orange-600 hover:from-maroon-900 hover:to-orange-700 text-white font-extrabold text-xs sm:text-sm shadow-md hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Offer Products</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


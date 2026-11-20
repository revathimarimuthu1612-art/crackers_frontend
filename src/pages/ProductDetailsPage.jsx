import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import {
  Star,
  ShoppingCart,
  Zap,
  Heart,
  ShieldCheck,
  ArrowLeft,
  Flame,
  CheckCircle2,
  Info,
  Package,
} from 'lucide-react';

export const ProductDetailsPage = () => {
  const { isGuest, openLoginPrompt } = useAuth();
  const { products, pageParams, addToCart, isInWishlist, toggleWishlist, navigate } = useApp();

  const productId = Number(pageParams?.id) || 1;
  const product = products.find((p) => p.id === productId) || products[0];

  const [quantity, setQuantity] = useState(1);

  const isFavorited = isInWishlist(product.id);

  // Related products from the same category or overall
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const fallbackRelated = relatedProducts.length > 0 
    ? relatedProducts 
    : products.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    if (isGuest) {
      openLoginPrompt('/checkout', 'Login required to place your order.');
    } else {
      navigate('checkout');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-fade-in">
      {/* Back button */}
      <button
        onClick={() => navigate('shop')}
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-red-700 dark:hover:text-amber-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Crackers Shop</span>
      </button>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Large Image Column */}
        <div className="relative rounded-3xl overflow-hidden bg-amber-50/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-800 shadow-md aspect-square sm:aspect-[4/3] lg:aspect-square flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          {/* Discount Badge */}
          {product.discount && (
            <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-extrabold px-3 py-1 rounded-lg shadow-md">
              {product.discount}
            </span>
          )}

          {/* Wishlist Button */}
          <button
            onClick={() => {
              if (isGuest) {
                openLoginPrompt(`/product-details`, 'Login required to save items to your wishlist.');
              } else {
                toggleWishlist(product);
              }
            }}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm flex items-center justify-center text-gray-500 hover:text-red-600 shadow-md transition-all"
            title="Wishlist"
          >
            <Heart className={`w-5 h-5 ${isFavorited ? 'text-red-600 fill-red-600' : ''}`} />
          </button>
        </div>

        {/* Product Details & Action Column */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category & Rating */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-red-700 dark:text-amber-400 bg-red-50 dark:bg-amber-950/40 px-3 py-1 rounded-full border border-red-200 dark:border-amber-900/40">
                {product.categoryName || product.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-300 bg-amber-50 dark:bg-gray-800 px-2.5 py-1 rounded-lg border border-amber-200/60 dark:border-gray-700">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{product.rating}</span>
                <span className="text-gray-400">({product.reviewsCount || 85} reviews)</span>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white leading-tight">
              {product.name}
            </h1>

            {/* Brand */}
            <p className="text-xs text-gray-500 font-medium">
              Manufacturer: <strong className="text-gray-800 dark:text-gray-200">{product.brand || 'Sivakasi Licensed Factory'}</strong>
            </p>

            {/* Price Box */}
            <div className="bg-amber-50/70 dark:bg-gray-800/50 p-4 rounded-2xl border border-amber-200/50 dark:border-gray-700 flex items-baseline gap-3">
              <span className="text-3xl font-black text-maroon-900 dark:text-white">
                ₹{product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-base text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold ml-2">
                Save ₹{product.originalPrice ? product.originalPrice - product.price : 0} (Tax Included)
              </span>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Description
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Stock status */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500">Stock Status:</span>
              {product.stock > 0 ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Available ({product.stock} units left in Sivakasi Hub)
                </span>
              ) : (
                <span className="text-xs font-bold text-rose-600">
                  Currently Sold Out
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Quantity:
              </span>
              <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-1.5 text-base font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-sm font-bold text-gray-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock || 50, q + 1))}
                  className="px-3.5 py-1.5 text-base font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-gray-400">({product.unit || '1 Box'})</span>
            </div>
          </div>

          {/* Action Buttons: Add to Cart & Buy Now */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3.5 px-6 rounded-xl border border-maroon-800 dark:border-amber-400 text-maroon-800 dark:text-amber-400 hover:bg-red-50 dark:hover:bg-amber-950/30 font-bold text-sm flex items-center justify-center gap-2 transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-maroon-800 to-red-600 hover:from-maroon-900 hover:to-red-700 text-white font-extrabold text-sm shadow-lg shadow-red-900/20 flex items-center justify-center gap-2 transition-all"
            >
              <Zap className="w-4 h-4" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Specifications & Safety Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
        {/* Specifications */}
        <div className="bg-white dark:bg-[#1E2026] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
          <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <Package className="w-4 h-4 text-maroon-700 dark:text-amber-400" />
            Product Information
          </h3>
          <div className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
            <div className="py-2.5 flex justify-between">
              <span className="text-gray-500">Category</span>
              <span className="font-semibold text-gray-900 dark:text-white">{product.categoryName}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-gray-500">Brand</span>
              <span className="font-semibold text-gray-900 dark:text-white">{product.brand}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-gray-500">Quantity</span>
              <span className="font-semibold text-gray-900 dark:text-white">{product.unit || '1 Box'}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-gray-500">Availability</span>
              <span className="font-semibold text-emerald-600">In Stock ({product.stock} units)</span>
            </div>
            {product.specifications && Object.entries(product.specifications).map(([key, val]) => (
              <div key={key} className="py-2.5 flex justify-between">
                <span className="text-gray-500">{key}</span>
                <span className="font-semibold text-gray-900 dark:text-white">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Instructions */}
        <div className="bg-amber-50/60 dark:bg-[#1E2026] rounded-2xl border border-amber-200/60 dark:border-gray-800 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2 mb-4">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Safety Instructions for {product.name}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {product.safetyInfo || 'Burst only in outdoor open spaces. Maintain minimum 15 feet safe distance. Keep a bucket of water and sand ready.'}
            </p>
            <ul className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <Flame className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Light fuse using a long incense stick (agarbatti).</span>
              </li>
              <li className="flex items-start gap-2">
                <Flame className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Never lean over the fireworks while igniting the fuse.</span>
              </li>
              <li className="flex items-start gap-2">
                <Flame className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Dispose burnt cases in a water bucket after 15 minutes.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-200/50 dark:border-gray-800 flex items-center gap-2 text-xs text-amber-800 dark:text-amber-300 font-semibold">
            <Info className="w-4 h-4 flex-shrink-0" />
            <span>PESO Standard Certified & QC Tested in Sivakasi</span>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <section className="pt-8 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-6">
          Related Crackers You May Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {fallbackRelated.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};

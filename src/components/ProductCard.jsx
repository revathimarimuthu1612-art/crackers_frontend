import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { Star, ShoppingCart, Zap, Heart, Eye } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { isGuest, openLoginPrompt } = useAuth();
  const { addToCart, isInWishlist, toggleWishlist, navigate } = useApp();

  const handleBuyNow = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    if (isGuest) {
      openLoginPrompt('/checkout', 'Login required to place your order.');
    } else {
      navigate('checkout');
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleViewProduct = () => {
    navigate('product-details', { id: product.id });
  };

  const isFavorited = isInWishlist(product.id);

  return (
    <div
      onClick={handleViewProduct}
      className="group relative bg-white dark:bg-[#1E2026] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-red-500/30 transition-all duration-300 flex flex-col cursor-pointer overflow-hidden h-full"
    >
      {/* Product Image & Badges (Compact Height) */}
      <div className="relative aspect-[16/10] w-full bg-amber-50/50 dark:bg-gray-800/50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Discount Badge */}
        {product.discount && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-sm tracking-wide">
            {product.discount}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isGuest) {
              openLoginPrompt('/shop', 'Login required to save items to your wishlist.');
            } else {
              toggleWishlist(product);
            }
          }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-red-600 dark:hover:text-red-400 shadow-sm transition-all"
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart
            className={`w-3.5 h-3.5 ${
              isFavorited ? 'text-red-600 fill-red-600' : ''
            }`}
          />
        </button>

        {/* Stock Badge */}
        <div className="absolute bottom-2 left-2">
          {product.stock > 0 ? (
            <span className="bg-emerald-600/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
              In Stock ({product.stock})
            </span>
          ) : (
            <span className="bg-rose-600/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[10px] font-extrabold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              {product.categoryName || product.category}
            </span>
            <div className="flex items-center gap-1 text-[10px] font-bold text-gray-700 dark:text-gray-300 bg-amber-50 dark:bg-gray-800 px-1.5 py-0.5 rounded border border-amber-200/50 dark:border-gray-700">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Full Product Title - FULLY VISIBLE, NO TRUNCATION */}
          <h3 className="font-extrabold text-xs sm:text-sm text-gray-900 dark:text-white leading-tight group-hover:text-red-600 dark:group-hover:text-amber-400 transition-colors break-words">
            {product.name}
          </h3>

          {/* Highlighted Pack Contents / Unit Pill */}
          {product.unit && (
            <div className="mt-1.5 inline-block">
              <span className="text-[11px] font-black text-amber-900 dark:text-amber-300 bg-amber-100/90 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800/60 px-2 py-0.5 rounded-md shadow-xs">
                {product.unit}
              </span>
            </div>
          )}
        </div>

        <div>
          {/* Price Row (Selling Price GREEN, Original Strikethrough Price RED) */}
          <div className="flex items-baseline gap-2 my-2">
            <span className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400">
              ₹{product.price}
            </span>

            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-rose-600 dark:text-rose-400 font-semibold line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Action Buttons: View, Add to Cart, Buy Now */}
          <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleViewProduct();
              }}
              className="px-2 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
              title="View Product Details"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View</span>
            </button>

            <button
              onClick={handleAddToCart}
              className="px-2 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-300 text-xs font-bold flex items-center justify-center gap-1 transition-colors"
              title="Add to Cart"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="px-2 py-1.5 rounded-xl bg-gradient-to-r from-maroon-800 to-red-600 hover:from-maroon-900 hover:to-red-700 text-white text-xs font-bold shadow flex items-center justify-center gap-1 transition-all"
              title="Buy Now"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Buy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


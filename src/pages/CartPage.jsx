import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Sparkles,
} from 'lucide-react';

export const CartPage = () => {
  const { isGuest, openLoginPrompt } = useAuth();
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartDiscount,
    deliveryFee,
    cartTotal,
    navigate,
  } = useApp();

  const handleProceedToCheckout = () => {
    if (cart.length === 0) return;
    if (isGuest) {
      openLoginPrompt('/checkout', 'Login required to place your order.');
    } else {
      navigate('checkout');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 flex items-center justify-center shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
          Your Shopping Cart is Empty
        </h2>
        <p className="text-sm text-gray-500 max-w-md mx-auto mb-8">
          Add sparkling sparklers, roaring rockets, or festive gift boxes to your cart to celebrate Diwali with joy!
        </p>
        <button
          onClick={() => navigate('shop')}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-maroon-800 to-red-600 hover:from-maroon-900 text-white font-extrabold text-sm shadow-lg shadow-red-900/20 inline-flex items-center gap-2"
        >
          <span>Explore Crackers Shop</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 animate-fade-in w-full">
      <div className="flex items-center justify-between pb-4 sm:pb-6 mb-6 sm:mb-8 border-b border-gray-200 dark:border-gray-800 gap-2">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-3xl font-black text-gray-900 dark:text-white truncate">
            Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 truncate">
            {cart.reduce((sum, item) => sum + item.quantity, 0)} items selected for celebration
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 hover:underline flex items-center gap-1 flex-shrink-0"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="bg-white dark:bg-[#1E2026] rounded-2xl border border-gray-200 dark:border-gray-800 p-3.5 sm:p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 w-full"
            >
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto min-w-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-amber-50 dark:bg-gray-800 flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block truncate">
                    {product.categoryName || product.category}
                  </span>
                  <h3
                    onClick={() => navigate('product-details', { id: product.id })}
                    className="font-bold text-xs sm:text-base text-gray-900 dark:text-white hover:text-red-600 cursor-pointer line-clamp-2"
                  >
                    {product.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">{product.unit || '1 Box'}</p>
                  <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mt-0.5 sm:hidden">
                    ₹{product.price} each
                  </p>
                </div>
              </div>

              {/* Quantity Controls & Price */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-3 sm:gap-6 sm:border-0 pt-2.5 sm:pt-0 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800">
                  <button
                    onClick={() => updateCartQuantity(product.id, -1)}
                    className="p-1 sm:p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                    title="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2.5 sm:px-3 text-xs font-bold text-gray-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(product.id, 1)}
                    className="p-1 sm:p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                    title="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[60px] sm:min-w-[70px]">
                  <p className="text-sm sm:text-base font-black text-gray-900 dark:text-white">
                    ₹{product.price * quantity}
                  </p>
                  <p className="text-[10px] text-gray-400 hidden sm:block">
                    ₹{product.price} / item
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(product.id)}
                  className="p-1.5 sm:p-2 text-gray-400 hover:text-rose-600 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Continue shopping button */}
          <div className="pt-2 sm:pt-4">
            <button
              onClick={() => navigate('shop')}
              className="text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-red-700 flex items-center gap-1.5"
            >
              <span>← Continue Shopping</span>
            </button>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-[#1E2026] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm sticky top-28 space-y-6">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white pb-3 border-b border-gray-100 dark:border-gray-800">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ₹{cartSubtotal}
                </span>
              </div>

              <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Festival Discount (10%)
                </span>
                <span className="font-semibold">-₹{cartDiscount}</span>
              </div>

              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Safe Logistics & Packaging</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE (Orders &gt; ₹1000)</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between text-base">
                <span className="font-bold text-gray-900 dark:text-white">Grand Total</span>
                <span className="font-black text-maroon-900 dark:text-white text-xl">
                  ₹{cartTotal}
                </span>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-xl border border-amber-200/50 dark:border-amber-900/50 text-[11px] text-amber-800 dark:text-amber-300 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-amber-600" />
                Explosive Cargo Certified Transit
              </p>
              <p className="text-[10px] text-gray-500">
                Packed in heavy double-wall corrugated cartons with fire-retardant interior liner.
              </p>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-maroon-800 to-red-600 hover:from-maroon-900 hover:to-red-700 text-white font-extrabold text-sm shadow-lg shadow-red-900/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

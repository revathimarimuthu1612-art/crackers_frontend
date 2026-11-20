import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  Truck,
  ArrowRight,
  Lock,
} from 'lucide-react';

export const CheckoutPage = () => {
  const { user } = useAuth();
  const {
    cart,
    clearCart,
    cartSubtotal,
    cartDiscount,
    deliveryFee,
    cartTotal,
    addNewOrder,
    navigate,
    showToast,
  } = useApp();

  const [formData, setFormData] = useState({
    fullName: user?.name || 'Ramesh Kumar',
    mobile: user?.mobile || '98410 12345',
    email: user?.email || 'customer@example.com',
    address: 'Flat 402, Sai Residency, T. Nagar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600017',
  });

  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI', 'Card', 'COD'
  const [upiId, setUpiId] = useState('ramesh@okaxis');
  const [cardData] = useState({ number: '4532 •••• •••• 8821', exp: '12/28', cvv: '•••' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.mobile || !formData.address || !formData.pincode) {
      showToast('Please fill all delivery address fields', 'warning');
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      customerName: formData.fullName,
      customerEmail: formData.email,
      customerMobile: formData.mobile,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      items: cart.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.image,
      })),
      totalAmount: cartTotal,
      paymentMethod,
    };

    const res = await apiService.placeOrder(orderPayload);

    setIsSubmitting(false);

    if (res.status) {
      const newOrder = {
        id: res.data.orderId,
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerMobile: formData.mobile,
        date: res.data.date,
        items: orderPayload.items,
        amount: cartTotal,
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
        status: 'Pending',
        address: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
      };

      addNewOrder(newOrder);
      setPlacedOrder(newOrder);
      clearCart();

      // Trigger Festive Confetti for Final Year Presentation WOW effect!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#7A182D', '#D4AF37', '#E8590C', '#22C55E'],
        });
      } catch (err) {}

      showToast(`Order #${newOrder.id} placed successfully!`, 'success');
    } else {
      showToast('Failed to place order. Please try again.', 'error');
    }
  };

  // If order was successfully placed, show Order Success confirmation screen
  if (placedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="inline-block text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-900/50 mb-3">
          Confirmed & Dispatched from Sivakasi
        </span>

        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
          Order Placed Successfully!
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Thank you for choosing Sivakasi Sparkles. We have received your festival order.
        </p>

        {/* Order Details Receipt Card */}
        <div className="bg-white dark:bg-[#1E2026] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 text-left shadow-sm mb-8 space-y-4 text-xs">
          <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-800">
            <div>
              <span className="text-gray-400 uppercase tracking-wider block">Order ID</span>
              <strong className="text-base text-maroon-800 dark:text-amber-400 font-mono">
                #{placedOrder.id}
              </strong>
            </div>
            <div className="text-right">
              <span className="text-gray-400 uppercase tracking-wider block">Amount Paid</span>
              <strong className="text-base text-gray-900 dark:text-white font-mono">
                ₹{placedOrder.amount}
              </strong>
            </div>
          </div>

          <div>
            <p className="text-gray-500">Shipping to:</p>
            <p className="font-semibold text-gray-800 dark:text-gray-200">{placedOrder.customerName}</p>
            <p className="text-gray-600 dark:text-gray-400">{placedOrder.address.address}, {placedOrder.address.city}, {placedOrder.address.pincode}</p>
            <p className="text-gray-600 dark:text-gray-400">Mobile: {placedOrder.customerMobile}</p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-xl border border-amber-200/50 dark:border-amber-900/50 text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-2">
            <Truck className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Estimated delivery in 2-4 business days via Certified Pyrotechnic Logistics.</span>
          </div>
        </div>

        {/* Both Action Buttons work */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('orders')}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-maroon-800 to-red-600 hover:from-maroon-900 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>View Order in My Orders</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate('shop')}
            className="px-6 py-3.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1E2026] text-gray-700 dark:text-gray-300 font-bold text-xs hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // Regular Checkout Form Screen
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
          Secure Checkout
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Complete your delivery and payment details to confirm Sivakasi crackers dispatch.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Delivery & Payment Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Delivery Information */}
          <div className="bg-white dark:bg-[#1E2026] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
              <Truck className="w-4 h-4 text-maroon-700 dark:text-amber-400" />
              1. Delivery Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-red-600/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="e.g. 98410 12345"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-red-600/30"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Street Address / Flat / Building *
                </label>
                <input
                  type="text"
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="e.g. Flat 402, Sai Residency, 12th Cross Road"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-red-600/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g. Chennai"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-red-600/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  State *
                </label>
                <input
                  type="text"
                  required
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="e.g. Tamil Nadu"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-red-600/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Postal Pincode *
                </label>
                <input
                  type="text"
                  required
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="e.g. 600017"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-red-600/30"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Realistic Payment Selection */}
          <div className="bg-white dark:bg-[#1E2026] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
              <CreditCard className="w-4 h-4 text-maroon-700 dark:text-amber-400" />
              2. Payment Method
            </h3>

            <div className="space-y-3">
              {/* UPI Option */}
              <label
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'UPI'
                    ? 'border-red-600 bg-red-50/50 dark:bg-amber-950/20'
                    : 'border-gray-200 dark:border-gray-800'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'UPI'}
                  onChange={() => setPaymentMethod('UPI')}
                  className="mt-1 accent-red-600"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">
                      Instant UPI (GPay, PhonePe, Paytm, BHIM)
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded">
                      Zero Surcharge
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Fastest confirmation for Diwali festival dispatch orders.
                  </p>
                  {paymentMethod === 'UPI' && (
                    <div className="mt-3 pt-3 border-t border-red-200/50 dark:border-gray-700 flex flex-col sm:flex-row items-center gap-3">
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="Enter your VPA / UPI ID (e.g. mobile@upi)"
                        className="w-full sm:w-64 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A] text-xs font-mono"
                      />
                      <span className="text-[11px] text-gray-500">Verified VPA</span>
                    </div>
                  )}
                </div>
              </label>

              {/* Card Option */}
              <label
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'Card'
                    ? 'border-red-600 bg-red-50/50 dark:bg-amber-950/20'
                    : 'border-gray-200 dark:border-gray-800'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'Card'}
                  onChange={() => setPaymentMethod('Card')}
                  className="mt-1 accent-red-600"
                />
                <div className="flex-1">
                  <span className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">
                    Credit / Debit Card (Visa, MasterCard, RuPay)
                  </span>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Protected by 256-bit SSL simulated encryption.
                  </p>
                  {paymentMethod === 'Card' && (
                    <div className="mt-3 pt-3 border-t border-red-200/50 dark:border-gray-700 grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        readOnly
                        value={cardData.number}
                        className="col-span-2 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A] text-xs font-mono text-gray-600"
                      />
                      <input
                        type="text"
                        readOnly
                        value={cardData.exp}
                        className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A] text-xs font-mono text-gray-600 text-center"
                      />
                    </div>
                  )}
                </div>
              </label>

              {/* Cash on Delivery Option */}
              <label
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'COD'
                    ? 'border-red-600 bg-red-50/50 dark:bg-amber-950/20'
                    : 'border-gray-200 dark:border-gray-800'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                  className="mt-1 accent-red-600"
                />
                <div className="flex-1">
                  <span className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">
                    Cash on Delivery (COD)
                  </span>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Pay in cash or scanner upon safe doorstep delivery.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary and Place Order */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-[#1E2026] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm sticky top-28 space-y-6">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white pb-3 border-b border-gray-100 dark:border-gray-800">
              Order Review ({cart.length} items)
            </h3>

            {/* Item Previews */}
            <div className="max-h-48 overflow-y-auto space-y-2 pr-1 divide-y divide-gray-100 dark:divide-gray-800">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="pt-2 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <img src={product.image} alt={product.name} className="w-8 h-8 rounded object-cover" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white line-clamp-1 max-w-[140px]">{product.name}</p>
                      <p className="text-gray-400">Qty: {quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">
                    ₹{product.price * quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2.5 text-xs pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>₹{cartSubtotal}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Festival Discount</span>
                <span>-₹{cartDiscount}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Delivery & Insurance</span>
                <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
              </div>
              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between text-base">
                <span className="font-bold text-gray-900 dark:text-white">Payable Amount</span>
                <span className="font-black text-maroon-900 dark:text-white text-xl">
                  ₹{cartTotal}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-maroon-800 to-red-600 hover:from-maroon-900 hover:to-red-700 text-white font-extrabold text-sm shadow-xl shadow-red-900/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              <span>{isSubmitting ? 'Placing Order...' : 'Place Order'}</span>
            </button>

            <p className="text-[11px] text-center text-gray-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              100% Safe & Secure Checkout • Verified Protection
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

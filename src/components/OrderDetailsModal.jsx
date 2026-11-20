import React from 'react';
import { X, CheckCircle2, Clock, Truck, Package, ShieldCheck, MapPin, CreditCard } from 'lucide-react';

export const OrderDetailsModal = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  const steps = [
    { title: 'Order Placed', desc: 'Order received and recorded' },
    { title: 'Confirmed', desc: 'Payment verified & stock assigned' },
    { title: 'Processing', desc: 'Packed safely in explosive-grade cartons' },
    { title: 'Shipped', desc: 'Dispatched via certified logistics' },
    { title: 'Delivered', desc: 'Delivered safely to doorstep' },
  ];

  const getStepIndex = (status) => {
    switch (status) {
      case 'Pending': return 0;
      case 'Processing': return 2;
      case 'Shipped': return 3;
      case 'Delivered': return 4;
      case 'Cancelled': return -1;
      default: return 1;
    }
  };

  const currentStep = getStepIndex(order.status);
  const isCancelled = order.status === 'Cancelled';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#1E2026] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Order #{order.id}
              </h3>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  order.status === 'Delivered'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : order.status === 'Cancelled'
                    ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                }`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Placed on {order.date}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tracking Stepper */}
        {!isCancelled ? (
          <div className="py-6 border-b border-gray-100 dark:border-gray-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
              Live Order Progress
            </h4>
            <div className="relative flex items-center justify-between">
              {/* Connecting Line */}
              <div className="absolute left-4 right-4 top-4 h-0.5 bg-gray-200 dark:bg-gray-700 -z-0">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${(Math.max(0, currentStep) / (steps.length - 1)) * 100}%` }}
                ></div>
              </div>

              {steps.map((step, idx) => {
                const isPassed = idx <= currentStep;
                const isCurrent = idx === currentStep;
                return (
                  <div key={idx} className="relative z-10 flex flex-col items-center text-center max-w-[80px]">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isPassed
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                      } ${isCurrent ? 'ring-4 ring-emerald-100 dark:ring-emerald-900/50' : ''}`}
                    >
                      {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    <span
                      className={`text-[11px] font-semibold mt-2 leading-tight ${
                        isPassed ? 'text-gray-900 dark:text-white' : 'text-gray-400'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="my-4 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-rose-800 dark:text-rose-200 text-sm">
            This order was cancelled. If payment was deducted, it will be refunded within 3-5 business days.
          </div>
        )}

        {/* Order Items */}
        <div className="py-4 border-b border-gray-100 dark:border-gray-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
            Items in this Order
          </h4>
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity} × ₹{item.price}</p>
                  </div>
                </div>
                <span className="font-bold text-gray-900 dark:text-white">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery & Payment Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-b border-gray-100 dark:border-gray-800 text-xs">
          <div>
            <span className="font-bold uppercase tracking-wider text-gray-400 block mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Shipping Address
            </span>
            <p className="font-semibold text-gray-800 dark:text-gray-200">{order.customerName}</p>
            <p className="text-gray-600 dark:text-gray-400">{order.address?.address}</p>
            <p className="text-gray-600 dark:text-gray-400">
              {order.address?.city}, {order.address?.state} - {order.address?.pincode}
            </p>
            <p className="text-gray-500 mt-1">Mobile: {order.customerMobile}</p>
          </div>
          <div>
            <span className="font-bold uppercase tracking-wider text-gray-400 block mb-1 flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5" /> Payment Summary
            </span>
            <p className="text-gray-600 dark:text-gray-400">Method: <strong className="text-gray-800 dark:text-gray-200">{order.paymentMethod}</strong></p>
            <p className="text-gray-600 dark:text-gray-400">Status: <strong className="text-emerald-600">{order.paymentStatus}</strong></p>
            <p className="text-base font-black text-maroon-800 dark:text-white mt-2">
              Total Amount: ₹{order.amount}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

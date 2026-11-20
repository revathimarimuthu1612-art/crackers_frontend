import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { OrderDetailsModal } from '../components/OrderDetailsModal';
import { Pagination } from '../components/Pagination';
import {
  Package,
  Calendar,
  Eye,
  ArrowRight,
} from 'lucide-react';

export const MyOrdersPage = () => {
  const { user, isGuest } = useAuth();
  const { orders, navigate } = useApp();

  const [activeTab, setActiveTab] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Pagination State (Default 10 per page)
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const itemsPerPage = 10;

  // Filter orders by tab
  const tabs = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (activeTab === 'All') return true;
      return o.status === activeTab;
    });
  }, [orders, activeTab]);

  // Reset pagination when active tab changes
  useEffect(() => {
    setCurrentPageNum(1);
  }, [activeTab]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const displayedOrders = useMemo(() => {
    const start = (currentPageNum - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPageNum, itemsPerPage]);

  const handleOpenDetails = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  // If guest, show notice
  if (isGuest) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 flex items-center justify-center">
          <Package className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Login Required
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mb-6">
          Please log into your account to view your past and ongoing festival cracker orders.
        </p>
        <button
          onClick={() => navigate('login', { returnUrl: 'orders' })}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-maroon-800 to-red-600 text-white font-bold text-xs shadow hover:from-maroon-900"
        >
          Login to View Orders
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
            My Orders
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Track and monitor the status of your fireworks consignments
          </p>
        </div>

        <button
          onClick={() => navigate('shop')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 dark:bg-amber-950/40 text-red-700 dark:text-amber-300 text-xs font-bold hover:bg-red-100 transition-colors"
        >
          <span>Order More Crackers</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200 dark:border-gray-800 scrollbar-none">
        {tabs.map((tab) => {
          const count = orders.filter((o) => (tab === 'All' ? true : o.status === tab)).length;
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-gradient-to-r from-maroon-800 to-red-600 text-white shadow'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <span>{tab}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Order Cards List + Pagination */}
      {displayedOrders.length > 0 ? (
        <div className="space-y-6">
          <div className="space-y-4">
            {displayedOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-[#1E2026] rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                {/* Order Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-base font-black text-maroon-800 dark:text-amber-400">
                      #{order.id}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{order.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : order.status === 'Cancelled'
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                      }`}
                    >
                      {order.status}
                    </span>
                    <button
                      onClick={() => handleOpenDetails(order)}
                      className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="flex flex-wrap items-center gap-4 text-xs">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover bg-amber-50 dark:bg-gray-800 flex-shrink-0"
                      />
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-gray-200 line-clamp-1 max-w-[150px]">
                          {item.name}
                        </p>
                        <p className="text-gray-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <span className="text-xs text-gray-400 font-medium">
                      +{order.items.length - 3} more items
                    </span>
                  )}
                </div>

                {/* Order Footer Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 gap-2">
                  <div className="flex items-center gap-4">
                    <span>Payment: <strong className="text-gray-800 dark:text-gray-200">{order.paymentMethod}</strong> ({order.paymentStatus})</span>
                    <span>Recipient: <strong className="text-gray-800 dark:text-gray-200">{order.customerName}</strong></span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 mr-2">Total Amount:</span>
                    <span className="text-base font-black text-maroon-800 dark:text-white">
                      ₹{order.amount}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPageNum}
            totalPages={totalPages}
            totalItems={filteredOrders.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPageNum}
            itemLabel="orders"
          />
        </div>
      ) : (
        <div className="bg-white dark:bg-[#1E2026] rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 p-12 text-center">
          <p className="text-sm font-semibold text-gray-500">
            No orders found under "{activeTab}" tab.
          </p>
        </div>
      )}

      {/* Order Details & Stepper Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Pagination } from '../../components/Pagination';
import {
  Search,
  Eye,
  X,
  CheckCircle2,
  XCircle,
  Truck,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

export const AdminOrdersPage = ({ selectedOrderFromDashboard }) => {
  const { orders, updateOrderStatus } = useApp();

  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeOrder, setActiveOrder] = useState(selectedOrderFromDashboard || null);
  const [drawerOpen, setDrawerOpen] = useState(!!selectedOrderFromDashboard);

  // Confirmation Modal State: null | { type: 'verify' | 'reject' | 'advance', orderId: string, nextStatus: string }
  const [confirmModal, setConfirmModal] = useState(null);

  // Pagination State (Default 10 items per page)
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const itemsPerPage = 10;

  const tabs = ['All', 'Pending', 'Verified', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Rejected'];

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesTab = activeTab === 'All' || o.status === activeTab;
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        (o.customerMobile && o.customerMobile.includes(q));
      return matchesTab && matchesSearch;
    });
  }, [orders, activeTab, searchTerm]);

  // Reset pagination to page 1 whenever activeTab or searchTerm changes
  useEffect(() => {
    setCurrentPageNum(1);
  }, [activeTab, searchTerm]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const displayedOrders = useMemo(() => {
    const start = (currentPageNum - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPageNum, itemsPerPage]);

  const handleOpenDetails = (o) => {
    setActiveOrder(o);
    setDrawerOpen(true);
  };

  // Status Flow Confirmation handlers
  const handleConfirmAction = () => {
    if (!confirmModal || !activeOrder) return;

    const { type, nextStatus } = confirmModal;
    let customToast = null;

    if (type === 'verify') {
      customToast = 'Order verified successfully.';
    } else if (type === 'reject') {
      customToast = 'Order rejected.';
    }

    updateOrderStatus(activeOrder.id, nextStatus, customToast);
    setActiveOrder({ ...activeOrder, status: nextStatus });
    setConfirmModal(null);
  };

  // Helper for logical next status
  const getNextStatusAction = (currentStatus) => {
    switch (currentStatus) {
      case 'Verified':
        return { next: 'Processing', label: 'Move to Processing' };
      case 'Processing':
        return { next: 'Shipped', label: 'Mark as Shipped' };
      case 'Shipped':
        return { next: 'Delivered', label: 'Mark as Delivered' };
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            Order Fulfillment Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Track consignments, verify festive orders, and manage dispatch status flow
          </p>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {tabs.map((tab) => {
            const count = orders.filter((o) => (tab === 'All' ? true : o.status === tab)).length;
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-500 text-gray-950 shadow'
                    : 'bg-white dark:bg-[#1A1C22] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800'
                }`}
              >
                <span>{tab}</span>
                <span className="text-[10px] opacity-75">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search order ID or customer..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316] text-xs focus:outline-none focus:border-amber-500"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* Order Table + Pagination */}
      <div className="bg-white dark:bg-[#1A1C22] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden p-4 space-y-4">
        {displayedOrders.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-gray-50 dark:bg-[#15161A] border-b border-gray-200 dark:border-gray-800 text-gray-400 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-medium">
                  {displayedOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                      <td className="py-3 px-4 font-mono font-bold text-gray-900 dark:text-white">
                        #{o.id}
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-gray-800 dark:text-gray-200">{o.customerName}</p>
                        <p className="text-[11px] text-gray-400">{o.customerMobile}</p>
                      </td>
                      <td className="py-3 px-4 font-bold text-gray-900 dark:text-white">
                        ₹{o.amount}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-700 dark:text-gray-300">{o.paymentMethod}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            o.status === 'Delivered'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                              : o.status === 'Verified'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                              : o.status === 'Processing'
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
                              : o.status === 'Shipped'
                              ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300'
                              : o.status === 'Cancelled' || o.status === 'Rejected'
                              ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-500">
                        {o.date}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleOpenDetails(o)}
                          className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-700 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={currentPageNum}
              totalPages={totalPages}
              totalItems={filteredOrders.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPageNum}
              itemLabel="orders"
            />
          </>
        ) : (
          <div className="py-12 text-center text-gray-500 font-semibold text-xs">
            No orders found.
          </div>
        )}
      </div>

      {/* Order Details Drawer / Modal */}
      {drawerOpen && activeOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl bg-white dark:bg-[#1A1C22] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  Order Details: #{activeOrder.id}
                </h3>
                <p className="text-xs text-gray-400">Placed on {activeOrder.date} • Status: <strong className="text-amber-500">{activeOrder.status}</strong></p>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Logical Status Flow Controls */}
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-900/40 space-y-3">
              <span className="block text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                Order Workflow Actions:
              </span>

              {/* Status PENDING: Verify or Reject */}
              {activeOrder.status === 'Pending' && (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setConfirmModal({ type: 'verify', nextStatus: 'Verified' })}
                    className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify Order</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmModal({ type: 'reject', nextStatus: 'Rejected' })}
                    className="flex-1 py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 transition-all"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject Order</span>
                  </button>
                </div>
              )}

              {/* Status VERIFIED, PROCESSING, SHIPPED: Logical Advance */}
              {getNextStatusAction(activeOrder.status) && (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const action = getNextStatusAction(activeOrder.status);
                      setConfirmModal({ type: 'advance', nextStatus: action.next });
                    }}
                    className="flex-1 py-2 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs shadow flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Truck className="w-4 h-4" />
                    <span>{getNextStatusAction(activeOrder.status).label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmModal({ type: 'cancel', nextStatus: 'Cancelled' })}
                    className="py-2 px-3 rounded-lg border border-rose-300 dark:border-rose-900 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-all"
                  >
                    Cancel Order
                  </button>
                </div>
              )}

              {/* Completed final states */}
              {(activeOrder.status === 'Delivered' || activeOrder.status === 'Cancelled' || activeOrder.status === 'Rejected') && (
                <div className="text-xs font-semibold text-gray-500">
                  This order has reached its final state (<strong className="capitalize">{activeOrder.status}</strong>).
                </div>
              )}
            </div>

            {/* Customer & Delivery Address */}
            <div className="text-xs space-y-2 border-b border-gray-100 dark:border-gray-800 pb-4">
              <h4 className="font-bold uppercase tracking-wider text-gray-400">
                Customer & Delivery Address
              </h4>
              <p className="font-bold text-gray-900 dark:text-white text-sm">{activeOrder.customerName}</p>
              <p className="text-gray-500">Mobile: <strong>{activeOrder.customerMobile}</strong> • Email: {activeOrder.customerEmail}</p>
              <p className="text-gray-500">
                Delivery Address: {activeOrder.address?.address}, {activeOrder.address?.city}, {activeOrder.address?.state || 'Tamil Nadu'} - {activeOrder.address?.pincode}
              </p>
            </div>

            {/* Purchased Items List */}
            <div className="space-y-3 text-xs border-b border-gray-100 dark:border-gray-800 pb-4">
              <h4 className="font-bold uppercase tracking-wider text-gray-400">
                Products Ordered ({activeOrder.items?.length || 0})
              </h4>
              <div className="space-y-2">
                {activeOrder.items?.map((it, i) => (
                  <div key={i} className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/40 p-2 rounded-xl">
                    <div className="flex items-center gap-2.5">
                      <img src={it.image} alt={it.name} className="w-9 h-9 rounded object-cover" />
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-gray-200">{it.name}</p>
                        <p className="text-gray-400 text-[11px]">Qty: {it.quantity} × ₹{it.price}</p>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">
                      ₹{it.price * it.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment & Amount Summary */}
            <div className="space-y-2 text-xs pt-1">
              <div className="flex justify-between text-gray-500">
                <span>Payment Method:</span>
                <span className="font-bold text-gray-800 dark:text-gray-200">{activeOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Payment Status:</span>
                <span className="font-bold text-emerald-600">{activeOrder.paymentStatus}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold pt-2 border-t border-gray-100 dark:border-gray-800">
                <span>Total Amount:</span>
                <span className="text-xl font-black text-amber-500 font-mono">
                  ₹{activeOrder.amount}
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="px-5 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Action Confirmation Modal (Verify / Reject / Advance) */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#1A1C22] rounded-2xl p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-gray-900 dark:text-white">
              {confirmModal.type === 'verify'
                ? 'Verify this order?'
                : confirmModal.type === 'reject'
                ? 'Reject this order?'
                : `Update status to ${confirmModal.nextStatus}?`}
            </h3>
            <p className="text-xs text-gray-500">
              {confirmModal.type === 'verify'
                ? 'Order status will be updated from PENDING to VERIFIED.'
                : confirmModal.type === 'reject'
                ? 'Order will be rejected and marked as REJECTED.'
                : `Order status will advance to ${confirmModal.nextStatus}.`}
            </p>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmModal(null)}
                className="flex-1 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAction}
                className={`flex-1 py-2 rounded-xl text-white text-xs font-bold shadow ${
                  confirmModal.type === 'reject' ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

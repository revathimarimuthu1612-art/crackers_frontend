import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  IndianRupee,
  ShoppingBag,
  Package,
  Users,
  TrendingUp,
  AlertTriangle,
  Plus,
} from 'lucide-react';

export const AdminDashboardPage = ({ onNavigateTab, onSelectOrder }) => {
  const { products, orders, customers } = useApp();

  // Dynamic Metrics calculated from actual store state
  const totalSalesAmount = useMemo(() => {
    return orders
      .filter((o) => o.status !== 'Cancelled' && o.status !== 'Rejected')
      .reduce((sum, o) => sum + (o.amount || 0), 0);
  }, [orders]);

  const totalSalesFormatted = `₹${totalSalesAmount.toLocaleString('en-IN')}`;
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
  const verifiedOrdersCount = orders.filter((o) => o.status === 'Verified').length;
  const totalProductsCount = products.length;
  const totalCustomersCount = customers.length;

  // Recent 5 orders from real orders state
  const recentOrders = orders.slice(0, 5);

  // Low stock products from real product state (stock <= 35)
  const lowStockProducts = products.filter((p) => p.stock <= 35).slice(0, 4);

  // Monthly sales demo chart data
  const monthlyData = [
    { month: 'May', sales: 18000, height: '25%' },
    { month: 'Jun', sales: 24000, height: '35%' },
    { month: 'Jul', sales: 32000, height: '45%' },
    { month: 'Aug', sales: 48000, height: '65%' },
    { month: 'Sep', sales: 85000, height: '90%' },
    { month: 'Oct (Festive)', sales: Math.max(120000, totalSalesAmount), height: '100%' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Greeting & Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
            Good Morning, Admin
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Here is your Sivakasi Fireworks store performance & inventory overview today.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigateTab('products', { openAddModal: true })}
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs shadow flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Cracker</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('offers')}
            className="px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1E2026] text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Create Offer
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* KPI 1: Total Sales */}
        <div className="bg-white dark:bg-[#1A1C22] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Total Sales
            </span>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">
              {totalSalesFormatted}
            </h3>
            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> Live Calculated
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <IndianRupee className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 2: Total Orders */}
        <div className="bg-white dark:bg-[#1A1C22] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Total Orders
            </span>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">
              {totalOrdersCount}
            </h3>
            <span className="text-[11px] text-amber-600 font-bold flex items-center gap-1 mt-1">
              {pendingOrdersCount} pending • {verifiedOrdersCount} verified
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 3: Active Products */}
        <div className="bg-white dark:bg-[#1A1C22] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Active Products
            </span>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">
              {totalProductsCount}
            </h3>
            <span className="text-[11px] text-gray-500 font-medium block mt-1">
              Live Catalog Inventory
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 4: Total Customers */}
        <div className="bg-white dark:bg-[#1A1C22] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Total Customers
            </span>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white">
              {totalCustomersCount}
            </h3>
            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> Registered Buyers
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Grid: Sales Overview Chart + Low Stock Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Overview Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1A1C22] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white">
                Festival Revenue Growth (2026 Season)
              </h3>
              <p className="text-xs text-gray-400">Monthly booking volumes leading up to Diwali</p>
            </div>
            <span className="text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 px-2.5 py-1 rounded-full">
              Record Sales
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-56 flex items-end gap-3 sm:gap-6 pt-6 px-2 border-b border-gray-100 dark:border-gray-800">
            {monthlyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center h-full justify-end group">
                <span className="text-[10px] font-bold text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                  ₹{(d.sales / 1000).toFixed(0)}k
                </span>
                <div
                  className="w-full max-w-[48px] bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-lg transition-all group-hover:from-red-600 group-hover:to-amber-500"
                  style={{ height: d.height }}
                ></div>
                <span className="text-[11px] font-semibold text-gray-500 mt-2 truncate w-full text-center">
                  {d.month}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex items-center justify-between text-xs text-gray-500">
            <span>Peak delivery window: October 15 – October 28</span>
            <button
              type="button"
              onClick={() => onNavigateTab('reports')}
              className="text-amber-600 dark:text-amber-400 font-bold hover:underline"
            >
              Detailed Analytics & Reports →
            </button>
          </div>
        </div>

        {/* Low Stock Products Warning */}
        <div className="bg-white dark:bg-[#1A1C22] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Low Stock Alerts</span>
            </div>
            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1">
              Requires Re-ordering
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Products with fewer than 35 boxes left in Sivakasi factory godown.
            </p>

            <div className="space-y-3">
              {lowStockProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 dark:border-gray-800 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <img src={p.image} alt={p.name} className="w-8 h-8 rounded object-cover" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white line-clamp-1 max-w-[120px]">
                        {p.name}
                      </p>
                      <p className="text-gray-400">₹{p.price}</p>
                    </div>
                  </div>
                  <span className="font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded">
                    {p.stock} left
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab('products')}
            className="w-full mt-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-center"
          >
            Manage All Inventory
          </button>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white dark:bg-[#1A1C22] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h3 className="font-bold text-base text-gray-900 dark:text-white">
              Recent Customer Orders
            </h3>
            <p className="text-xs text-gray-400">Latest fireworks dispatches</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('orders')}
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
          >
            View All Orders →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 text-gray-400 font-bold uppercase tracking-wider">
                <th className="py-2.5 px-3">Order ID</th>
                <th className="py-2.5 px-3">Customer</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Payment</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-medium">
              {recentOrders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="py-3 px-3 font-mono font-bold text-gray-900 dark:text-white">
                    #{o.id}
                  </td>
                  <td className="py-3 px-3">
                    <p className="font-bold text-gray-800 dark:text-gray-200">{o.customerName}</p>
                    <p className="text-[11px] text-gray-400">{o.customerEmail}</p>
                  </td>
                  <td className="py-3 px-3 font-bold text-gray-900 dark:text-white">
                    ₹{o.amount}
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-gray-600 dark:text-gray-300">{o.paymentMethod}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        o.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : o.status === 'Verified'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                          : o.status === 'Cancelled' || o.status === 'Rejected'
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectOrder(o);
                        onNavigateTab('orders');
                      }}
                      className="px-2.5 py-1 rounded-lg border border-gray-300 dark:border-gray-700 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

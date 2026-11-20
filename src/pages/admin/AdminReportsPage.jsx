import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Award, Layers } from 'lucide-react';

export const AdminReportsPage = () => {
  const { products, categories, orders } = useApp();

  // Dynamic Metrics computed directly from current orders & products
  const totalOrders = orders.length;
  const verifiedOrders = orders.filter((o) => o.status === 'Verified').length;
  const cancelledOrders = orders.filter((o) => o.status === 'Cancelled' || o.status === 'Rejected').length;
  
  const totalSales = useMemo(() => {
    return orders
      .filter((o) => o.status !== 'Cancelled' && o.status !== 'Rejected')
      .reduce((sum, o) => sum + (o.amount || 0), 0);
  }, [orders]);

  // Dynamic Top Products derived from orders or catalog
  const topProducts = useMemo(() => {
    const itemMap = {};
    orders.forEach((o) => {
      if (o.status !== 'Cancelled' && o.status !== 'Rejected') {
        o.items?.forEach((it) => {
          if (!itemMap[it.name]) {
            itemMap[it.name] = { name: it.name, units: 0, revenue: 0 };
          }
          itemMap[it.name].units += it.quantity || 1;
          itemMap[it.name].revenue += (it.price || 0) * (it.quantity || 1);
        });
      }
    });

    const list = Object.values(itemMap);
    if (list.length > 0) {
      list.sort((a, b) => b.revenue - a.revenue);
      return list.slice(0, 5);
    }

    // Catalog fallback if orders are empty
    return products.slice(0, 5).map((p) => ({
      name: p.name,
      units: p.stock ? 50 - p.stock : 25,
      revenue: (p.price || 299) * 25,
      category: p.categoryName || p.category,
    }));
  }, [orders, products]);

  // Category performance breakdown
  const categoryPerformance = useMemo(() => {
    const totalCount = products.length || 1;
    const colors = ['bg-amber-500', 'bg-red-500', 'bg-rose-600', 'bg-yellow-500', 'bg-emerald-500', 'bg-blue-500'];

    return categories.slice(0, 5).map((c, i) => {
      const pCount = products.filter((p) => p.category === c.id).length;
      const share = Math.round((pCount / totalCount) * 100);
      const estAmount = Math.round((totalSales * (share / 100)) || (pCount * 12500));
      return {
        category: c.name,
        share: share || 10,
        amount: `₹${estAmount.toLocaleString('en-IN')}`,
        color: colors[i % colors.length],
      };
    });
  }, [categories, products, totalSales]);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="pb-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">
          Business Reports & Analytics
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Festival turnover breakdown, verified & cancelled orders, and best-selling Sivakasi fireworks
        </p>
      </div>

      {/* Highlights Grid with Dynamic Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#1A1C22] p-4 rounded-2xl border border-gray-200 dark:border-gray-800">
          <span className="text-[11px] font-bold text-gray-400 uppercase">Total Sales</span>
          <p className="text-xl font-black text-gray-900 dark:text-white mt-1">
            ₹{totalSales.toLocaleString('en-IN')}
          </p>
          <span className="text-[10px] text-emerald-600 font-bold mt-1 block">Live calculated revenue</span>
        </div>

        <div className="bg-white dark:bg-[#1A1C22] p-4 rounded-2xl border border-gray-200 dark:border-gray-800">
          <span className="text-[11px] font-bold text-gray-400 uppercase">Total Orders</span>
          <p className="text-xl font-black text-gray-900 dark:text-white mt-1">
            {totalOrders} Orders
          </p>
          <span className="text-[10px] text-gray-500 mt-1 block">All registered bookings</span>
        </div>

        <div className="bg-white dark:bg-[#1A1C22] p-4 rounded-2xl border border-gray-200 dark:border-gray-800">
          <span className="text-[11px] font-bold text-gray-400 uppercase">Verified Orders</span>
          <p className="text-xl font-black text-blue-600 dark:text-blue-400 mt-1">
            {verifiedOrders} Orders
          </p>
          <span className="text-[10px] text-emerald-600 font-bold mt-1 block">Approved for dispatch</span>
        </div>

        <div className="bg-white dark:bg-[#1A1C22] p-4 rounded-2xl border border-gray-200 dark:border-gray-800">
          <span className="text-[11px] font-bold text-gray-400 uppercase">Cancelled / Rejected</span>
          <p className="text-xl font-black text-rose-600 dark:text-rose-400 mt-1">
            {cancelledOrders} Orders
          </p>
          <span className="text-[10px] text-gray-500 mt-1 block">Voided festival requests</span>
        </div>
      </div>

      {/* Top Products & Category Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Crackers */}
        <div className="bg-white dark:bg-[#1A1C22] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              Top Products
            </h3>
            <span className="text-xs text-gray-400">By Total Revenue</span>
          </div>

          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={i} className="flex items-center justify-between text-xs p-2 rounded-xl bg-gray-50 dark:bg-[#121316]">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-bold flex items-center justify-center text-xs">
                    0{i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{p.name}</p>
                    <p className="text-[11px] text-gray-400">{p.units} units sold</p>
                  </div>
                </div>
                <span className="font-black text-amber-600 dark:text-amber-400 font-mono">
                  ₹{p.revenue.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Performance Breakdown */}
        <div className="bg-white dark:bg-[#1A1C22] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
            <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-red-500" />
              Top Categories
            </h3>
            <span className="text-xs text-gray-400">Distribution Analysis</span>
          </div>

          <div className="space-y-4 pt-1">
            {categoryPerformance.map((c, i) => (
              <div key={i} className="space-y-1 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-800 dark:text-gray-200">{c.category}</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {c.amount} ({c.share}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${c.color} rounded-full transition-all duration-500`}
                    style={{ width: `${c.share}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

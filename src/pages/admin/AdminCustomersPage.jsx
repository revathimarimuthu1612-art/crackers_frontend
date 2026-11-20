import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Pagination } from '../../components/Pagination';
import { Search, Check, X } from 'lucide-react';

export const AdminCustomersPage = () => {
  const { customers, toggleCustomerStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'Active' | 'Deactive'

  // Pagination State (Default 10 items per page)
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const itemsPerPage = 10;

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.mobile.includes(q) ||
        c.city.toLowerCase().includes(q);

      const matchesStatus =
        filterStatus === 'all' ||
        (filterStatus === 'Active' && c.status === 'Active') ||
        (filterStatus === 'Deactive' && (c.status === 'Deactive' || c.status === 'Inactive'));

      return matchesSearch && matchesStatus;
    });
  }, [customers, searchTerm, filterStatus]);

  // Reset pagination on search or filter change
  useEffect(() => {
    setCurrentPageNum(1);
  }, [searchTerm, filterStatus]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const displayedCustomers = useMemo(() => {
    const start = (currentPageNum - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPageNum, itemsPerPage]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            Customer Directory
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Registered festive buyers, contact details, loyalty spend, and account status management
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl text-xs w-full sm:w-auto">
            {['all', 'Active', 'Deactive'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilterStatus(status)}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg font-bold capitalize transition-all ${
                  filterStatus === status
                    ? 'bg-white dark:bg-[#1A1C22] text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search customer by name or phone..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316] text-xs focus:outline-none focus:border-amber-500 text-gray-900 dark:text-white"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1A1C22] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden p-4 space-y-4">
        {displayedCustomers.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-gray-50 dark:bg-[#15161A] border-b border-gray-200 dark:border-gray-800 text-gray-400 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">City</th>
                    <th className="py-3 px-4">Orders Placed</th>
                    <th className="py-3 px-4">Total Spent</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-medium">
                  {displayedCustomers.map((c, idx) => {
                    const rowNumber = (currentPageNum - 1) * itemsPerPage + idx + 1;
                    return (
                      <tr
                        key={c.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                      >
                        <td className="py-3 px-4 font-mono text-gray-400 text-xs">
                          {rowNumber}
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-bold text-gray-900 dark:text-white">{c.name}</p>
                          <p className="text-[11px] text-gray-400">Joined {c.joinedDate}</p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-gray-800 dark:text-gray-200">{c.mobile}</p>
                          <p className="text-[11px] text-gray-400">{c.email}</p>
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{c.city}</td>
                        <td className="py-3 px-4 font-bold text-gray-900 dark:text-white">
                          {c.ordersCount} orders
                        </td>
                        <td className="py-3 px-4 font-black text-amber-600 dark:text-amber-400">
                          ₹{c.totalSpent}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => toggleCustomerStatus(c.id)}
                            className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition-all shadow-sm cursor-pointer ${
                              c.status === 'Active'
                                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-800'
                                : 'bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:hover:bg-rose-900/60 border border-rose-300 dark:border-rose-800'
                            }`}
                            title={`Status: ${c.status} (Click to toggle)`}
                          >
                            {c.status === 'Active' ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <X className="w-4 h-4" />
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={currentPageNum}
              totalPages={totalPages}
              totalItems={filtered.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPageNum}
              itemLabel="customers"
            />
          </>
        ) : (
          <div className="py-12 text-center text-gray-500 font-semibold text-xs">
            No customers found.
          </div>
        )}
      </div>
    </div>
  );
};

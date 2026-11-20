import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Pagination } from '../../components/Pagination';
import { Search, X, Eye, Check } from 'lucide-react';

export const AdminSellersPage = () => {
  const { sellers, updateSellerStatus } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeller, setSelectedSeller] = useState(null);

  // Pagination State (Default 10 items per page)
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const itemsPerPage = 10;

  const filteredSellers = useMemo(() => {
    return sellers.map((s) => ({
      ...s,
      // Normalize 'Approved' to 'Active' for consistent display
      normalizedStatus: s.status === 'Approved' ? 'Active' : s.status || 'Active',
    })).filter(
      (s) =>
        s.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.licenseNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.normalizedStatus.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sellers, searchTerm]);

  // Reset pagination on search change
  useEffect(() => {
    setCurrentPageNum(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredSellers.length / itemsPerPage) || 1;
  const displayedSellers = useMemo(() => {
    const start = (currentPageNum - 1) * itemsPerPage;
    return filteredSellers.slice(start, start + itemsPerPage);
  }, [filteredSellers, currentPageNum, itemsPerPage]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            Sellers & Fireworks Manufacturers
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage partner Sivakasi factories, explosive licenses, supply allotments, and status
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search manufacturer, owner, license..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316] text-xs focus:outline-none focus:border-amber-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="bg-white dark:bg-[#1A1C22] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden p-4 space-y-4">
        {displayedSellers.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-gray-50 dark:bg-[#15161A] border-b border-gray-200 dark:border-gray-800 text-gray-400 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Manufacturer</th>
                    <th className="py-3 px-4">Proprietor</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Catalog</th>
                    <th className="py-3 px-4">Fulfilled Orders</th>
                    <th className="py-3 px-4">PESO License</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-medium">
                  {displayedSellers.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                      <td className="py-3 px-4">
                        <p className="font-bold text-gray-900 dark:text-white">{s.businessName}</p>
                        <p className="text-[11px] text-gray-400">{s.contact}</p>
                      </td>
                      <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{s.owner}</td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{s.location}</td>
                      <td className="py-3 px-4 font-bold text-gray-900 dark:text-white">
                        {s.productsCount} varieties
                      </td>
                      <td className="py-3 px-4 font-bold text-amber-600 dark:text-amber-400">
                        {s.ordersCount}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-gray-500">
                        {s.licenseNo}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            s.normalizedStatus === 'Active'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                              : s.normalizedStatus === 'Pending'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300'
                              : 'bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300'
                          }`}
                        >
                          {s.normalizedStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedSeller(s)}
                            className="px-2.5 py-1 rounded-lg border border-gray-300 dark:border-gray-700 text-xs font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 inline-flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>
                          {s.normalizedStatus === 'Active' ? (
                            <button
                              type="button"
                              onClick={() => updateSellerStatus(s.id, 'Inactive')}
                              className="w-7 h-7 rounded-lg border border-rose-300 dark:border-rose-900 text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-950/50 transition-colors inline-flex items-center justify-center shadow-sm cursor-pointer"
                              title="Deactivate"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => updateSellerStatus(s.id, 'Active')}
                              className="w-7 h-7 rounded-lg border border-emerald-300 dark:border-emerald-900 text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-950/50 transition-colors inline-flex items-center justify-center shadow-sm cursor-pointer"
                              title="Approve / Activate"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={currentPageNum}
              totalPages={totalPages}
              totalItems={filteredSellers.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPageNum}
              itemLabel="sellers"
            />
          </>
        ) : (
          <div className="py-12 text-center text-gray-500 font-semibold text-xs">
            No manufacturers found.
          </div>
        )}
      </div>

      {/* Seller View Details Modal */}
      {selectedSeller && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-[#1A1C22] rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-base text-gray-900 dark:text-white">
                Manufacturer Details
              </h3>
              <button onClick={() => setSelectedSeller(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div>
              <h4 className="font-bold text-lg text-gray-900 dark:text-white">{selectedSeller.businessName}</h4>
              <p className="text-xs text-amber-500 font-semibold">PESO License: {selectedSeller.licenseNo}</p>
            </div>
            <div className="text-xs space-y-2 bg-gray-50 dark:bg-[#121316] p-3 rounded-xl">
              <p>Proprietor: <strong>{selectedSeller.owner}</strong></p>
              <p>Facility Location: <strong>{selectedSeller.location}</strong></p>
              <p>Factory Contact: <strong>{selectedSeller.contact}</strong></p>
              <p>Supplied Catalogue Items: <strong>{selectedSeller.productsCount}</strong></p>
              <p>Total Dispatches Fulfilled: <strong>{selectedSeller.ordersCount}</strong></p>
              <p>Current Status: <strong className="capitalize">{selectedSeller.normalizedStatus || selectedSeller.status}</strong></p>
            </div>
            <div className="flex justify-between items-center pt-2">
              <div>
                {selectedSeller.normalizedStatus === 'Active' ? (
                  <button
                    type="button"
                    onClick={() => {
                      updateSellerStatus(selectedSeller.id, 'Inactive');
                      setSelectedSeller({ ...selectedSeller, normalizedStatus: 'Inactive', status: 'Inactive' });
                    }}
                    className="px-3 py-1.5 rounded-xl border border-rose-300 text-rose-600 text-xs font-bold hover:bg-rose-50"
                  >
                    Deactivate
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      updateSellerStatus(selectedSeller.id, 'Active');
                      setSelectedSeller({ ...selectedSeller, normalizedStatus: 'Active', status: 'Active' });
                    }}
                    className="px-3 py-1.5 rounded-xl border border-emerald-300 text-emerald-600 text-xs font-bold hover:bg-emerald-50"
                  >
                    Approve
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedSeller(null)}
                className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

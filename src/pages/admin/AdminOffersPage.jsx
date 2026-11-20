import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Pagination } from '../../components/Pagination';
import { Plus, Edit2, Trash2, Power, X, AlertTriangle } from 'lucide-react';

export const AdminOffersPage = () => {
  const { offers, categories, addOffer, updateOffer, deleteOffer, toggleOfferStatus } = useApp();

  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit'
  const [activeOffer, setActiveOffer] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Pagination State (Only active if offers > 10)
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const itemsPerPage = 10;
  const shouldPaginate = offers.length > 10;

  const totalPages = Math.ceil(offers.length / itemsPerPage) || 1;
  const displayedOffers = useMemo(() => {
    if (!shouldPaginate) return offers;
    const start = (currentPageNum - 1) * itemsPerPage;
    return offers.slice(start, start + itemsPerPage);
  }, [offers, shouldPaginate, currentPageNum, itemsPerPage]);

  const [form, setForm] = useState({
    name: '',
    code: 'FESTIVE25',
    discount: '25% OFF',
    discountPercent: 25,
    startDate: '2026-10-01',
    endDate: '2026-11-15',
    applicableCategory: 'all',
    description: '',
    active: true,
  });

  const handleOpenAdd = () => {
    setForm({
      name: '',
      code: 'DIWALI' + Math.floor(10 + Math.random() * 90),
      discount: '30% OFF',
      discountPercent: 30,
      startDate: '2026-10-01',
      endDate: '2026-11-15',
      applicableCategory: 'all',
      description: 'Diwali festive special discount voucher.',
      active: true,
    });
    setModalMode('add');
  };

  const handleOpenEdit = (o) => {
    setActiveOffer(o);
    setForm({
      name: o.name || '',
      code: o.code || '',
      discount: o.discount || '20% OFF',
      discountPercent: o.discountPercent || 20,
      startDate: o.startDate || '2026-10-01',
      endDate: o.endDate || '2026-11-15',
      applicableCategory: o.applicableCategory || 'all',
      description: o.description || '',
      active: o.active ?? true,
    });
    setModalMode('edit');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.code) return;

    if (modalMode === 'add') {
      addOffer(form);
    } else if (modalMode === 'edit' && activeOffer) {
      updateOffer(activeOffer.id, form);
    }
    setModalMode(null);
  };

  const handleDelete = (id) => {
    deleteOffer(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            Promotions & Festival Offers
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Create coupon codes, manage percentage markdowns, set validity dates, and toggle active promotions
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs shadow flex items-center gap-1.5 transition-all w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Offer</span>
        </button>
      </div>

      {displayedOffers.length > 0 ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedOffers.map((o) => (
              <div
                key={o.id}
                className="bg-white dark:bg-[#1A1C22] rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-black text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-900/50">
                      {o.code}
                    </span>
                    <span className="font-black text-base text-gray-900 dark:text-white">
                      {o.discount}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1">
                    {o.name}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3">
                    {o.description}
                  </p>

                  <div className="text-[11px] text-gray-400 space-y-1 bg-gray-50 dark:bg-[#121316] p-2.5 rounded-xl mb-4">
                    <p>Validity: <strong>{o.startDate}</strong> to <strong>{o.endDate}</strong></p>
                    <p>Category: <strong className="capitalize">{o.applicableCategory}</strong></p>
                    <p>Status: <strong className={o.active ? 'text-emerald-500' : 'text-gray-400'}>{o.active ? 'Active' : 'Inactive'}</strong></p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <button
                    onClick={() => toggleOfferStatus(o.id)}
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 ${
                      o.active
                        ? 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                        : 'text-emerald-600 hover:bg-emerald-50'
                    }`}
                  >
                    <Power className="w-3.5 h-3.5" />
                    <span>{o.active ? 'Deactivate' : 'Activate'}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(o)}
                      className="p-1.5 text-gray-400 hover:text-amber-500 rounded"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(o.id)}
                      className="p-1.5 text-gray-400 hover:text-rose-500 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {shouldPaginate && (
            <Pagination
              currentPage={currentPageNum}
              totalPages={totalPages}
              totalItems={offers.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPageNum}
              itemLabel="offers"
            />
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-[#1A1C22] rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 p-12 text-center text-gray-500 text-xs font-semibold">
          No active promotions found.
        </div>
      )}

      {/* Add / Edit Offer Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#1A1C22] rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-base text-gray-900 dark:text-white">
                {modalMode === 'add' ? 'Create Festive Offer' : 'Edit Offer Details'}
              </h3>
              <button onClick={() => setModalMode(null)} className="text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Offer Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Diwali Dhamaka 35"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Coupon Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                    placeholder="e.g. DIWALI35"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316] font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Discount Label *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.discount}
                    onChange={(e) => setForm({ ...form, discount: e.target.value })}
                    placeholder="e.g. 35% OFF"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Applicable Products / Category
                </label>
                <select
                  value={form.applicableCategory}
                  onChange={(e) => setForm({ ...form, applicableCategory: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316]"
                >
                  <option value="all">All Products</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316]"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="flex-1 py-2 rounded-xl border border-gray-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold shadow"
                >
                  Save Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Offer Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#1A1C22] rounded-2xl p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 mx-auto rounded-full bg-rose-100 dark:bg-rose-950/40 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-gray-900 dark:text-white">
              Confirm Delete
            </h3>
            <p className="text-xs text-gray-500">
              Are you sure you want to delete this offer?
            </p>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow"
              >
                Delete Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

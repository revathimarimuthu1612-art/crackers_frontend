import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Pagination } from '../../components/Pagination';
import { Plus, Edit2, Trash2, Power, X, AlertTriangle, Search } from 'lucide-react';

export const AdminCategoriesPage = () => {
  const { categories, addCategory, updateCategory, toggleCategoryStatus, deleteCategory } = useApp();

  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit'
  const [activeCategory, setActiveCategory] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', icon: 'Sparkles' });

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'active' | 'inactive'

  // Pagination State (Default 6 categories per page for balanced 3x2 grid)
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const itemsPerPage = 6;

  // Filtered categories
  const filteredCategories = useMemo(() => {
    return categories.filter((c) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q));

      const matchesStatus =
        filterStatus === 'all' ||
        (filterStatus === 'active' && c.active) ||
        (filterStatus === 'inactive' && !c.active);

      return matchesSearch && matchesStatus;
    });
  }, [categories, searchTerm, filterStatus]);

  // Reset to page 1 on search or filter change
  useEffect(() => {
    setCurrentPageNum(1);
  }, [searchTerm, filterStatus]);

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage) || 1;

  const displayedCategories = useMemo(() => {
    const start = (currentPageNum - 1) * itemsPerPage;
    return filteredCategories.slice(start, start + itemsPerPage);
  }, [filteredCategories, currentPageNum, itemsPerPage]);

  const handleOpenAdd = () => {
    setForm({ name: '', description: '', icon: 'Sparkles' });
    setModalMode('add');
  };

  const handleOpenEdit = (c) => {
    setActiveCategory(c);
    setForm({ name: c.name, description: c.description || '', icon: c.icon || 'Sparkles' });
    setModalMode('edit');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name) return;

    if (modalMode === 'add') {
      addCategory({
        name: form.name,
        description: form.description,
        icon: form.icon,
      });
    } else if (modalMode === 'edit' && activeCategory) {
      updateCategory(activeCategory.id, {
        name: form.name,
        description: form.description,
        icon: form.icon,
      });
    }
    setModalMode(null);
  };

  const handleDelete = (id) => {
    deleteCategory(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            Category Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Organize catalog classifications, enable/disable festive displays, and edit category meta
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs shadow flex items-center gap-1.5 transition-all w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Search & Status Filter Bar */}
      <div className="bg-white dark:bg-[#1A1C22] p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search categories..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#121316] text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-gray-500 hidden sm:inline">Status:</span>
          <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl text-xs w-full sm:w-auto">
            {['all', 'active', 'inactive'].map((status) => (
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
        </div>
      </div>

      {/* Categories Table / List View */}
      <div className="bg-white dark:bg-[#1A1C22] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden p-4 space-y-4">
        {displayedCategories.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-gray-50 dark:bg-[#15161A] border-b border-gray-200 dark:border-gray-800 text-gray-400 font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-4">#</th>
                    <th className="py-3.5 px-4">Category Name</th>
                    <th className="py-3.5 px-4">Description</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-center">Toggle</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {displayedCategories.map((c, idx) => {
                    const rowNumber = (currentPageNum - 1) * itemsPerPage + idx + 1;
                    return (
                      <tr
                        key={c.id}
                        className="hover:bg-gray-50/70 dark:hover:bg-[#15161A]/50 transition-colors"
                      >
                        <td className="py-3.5 px-4 font-mono text-gray-400 font-medium">
                          {rowNumber}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white text-sm">
                          {c.name}
                        </td>
                        <td className="py-3.5 px-4 text-gray-500 max-w-md truncate">
                          {c.description || '—'}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                              c.active
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                            }`}
                          >
                            {c.active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => toggleCategoryStatus(c.id)}
                            className={`text-xs font-semibold px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5 transition-colors ${
                              c.active
                                ? 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                                : 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
                            }`}
                          >
                            <Power className="w-3.5 h-3.5" />
                            <span>{c.active ? 'Deactivate' : 'Activate'}</span>
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1 justify-end">
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(c)}
                              className="p-1.5 text-gray-400 hover:text-amber-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                              title="Edit Category"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(c.id)}
                              className="p-1.5 text-gray-400 hover:text-rose-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                              title="Delete Category"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Component */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
              <Pagination
                currentPage={currentPageNum}
                totalPages={totalPages}
                totalItems={filteredCategories.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPageNum}
                itemLabel="categories"
              />
            </div>
          </>
        ) : (
          <div className="p-12 text-center text-gray-500 font-semibold text-xs">
            No categories found matching your search.
          </div>
        )}
      </div>

      {/* Add / Edit Category Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#1A1C22] rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-base text-gray-900 dark:text-white">
                {modalMode === 'add' ? 'Add New Category' : 'Edit Category'}
              </h3>
              <button onClick={() => setModalMode(null)} className="text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Parachute Rockets"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316] text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Enter short description..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316] text-xs"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="flex-1 py-2 rounded-xl border border-gray-300 dark:border-gray-700 font-bold text-gray-700 dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold shadow"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
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
              Are you sure you want to delete this category?
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
                Delete Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

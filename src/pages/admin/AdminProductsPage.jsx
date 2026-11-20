import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Pagination } from '../../components/Pagination';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  X,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const AdminProductsPage = ({ initialOpenAdd = false }) => {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStock, setFilterStock] = useState('all'); // 'all', 'in-stock', 'low-stock', 'out-of-stock'
  const [modalMode, setModalMode] = useState(initialOpenAdd ? 'add' : null); // null | 'add' | 'edit' | 'view'
  const [activeProduct, setActiveProduct] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Pagination State (Default 10 items per page)
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const itemsPerPage = 10;

  // Form State with all required fields
  const [form, setForm] = useState({
    name: '',
    category: 'sparklers',
    categoryName: 'Sparklers',
    brand: 'Standard Fireworks Sivakasi',
    price: '',
    originalPrice: '',
    discount: '25% OFF',
    stock: 50,
    status: 'In Stock',
    description: '',
    safetyInfo: 'Light from a safe distance using an incense stick. Wear cotton clothing.',
    image: '/products/sparklers-box-real.jpg',
    unit: '1 Box',
  });

  const handleOpenAdd = () => {
    setForm({
      name: '',
      category: categories[0]?.id || 'sparklers',
      categoryName: categories[0]?.name || 'Sparklers',
      brand: 'Standard Fireworks Sivakasi',
      price: '299',
      originalPrice: '399',
      discount: '25% OFF',
      stock: 50,
      status: 'In Stock',
      description: 'Authentic Sivakasi festival crackers, low smoke and QC tested.',
      safetyInfo: 'Light from a safe distance using incense stick. Do not hold in hand.',
      image: '/products/sparklers-box-real.jpg',
      unit: '1 Box (10 Pcs)',
    });
    setModalMode('add');
  };

  const handleOpenEdit = (p) => {
    setActiveProduct(p);
    setForm({
      name: p.name || '',
      category: p.category || 'sparklers',
      categoryName: p.categoryName || p.category || 'Sparklers',
      brand: p.brand || 'Standard Fireworks Sivakasi',
      price: p.price ?? '',
      originalPrice: p.originalPrice ?? Math.round((p.price || 0) * 1.3),
      discount: p.discount || '',
      stock: p.stock ?? 50,
      status: p.stock > 0 ? (p.status || 'In Stock') : 'Out of Stock',
      description: p.description || '',
      safetyInfo: p.safetyInfo || 'Store in cool dry place away from flame.',
      image: p.image || '/products/sparklers-box-real.jpg',
      unit: p.unit || '1 Box',
    });
    setModalMode('edit');
  };

  const handleOpenView = (p) => {
    setActiveProduct(p);
    setModalMode('view');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const matchedCategory = categories.find((c) => c.id === form.category);
    const categoryName = matchedCategory ? matchedCategory.name : form.category;
    const finalStock = Number(form.stock);
    const computedStatus = finalStock > 0 ? (form.status || 'In Stock') : 'Out of Stock';

    if (modalMode === 'add') {
      addProduct({
        ...form,
        categoryName,
        price: Number(form.price),
        originalPrice: Number(form.originalPrice || Math.round(Number(form.price) * 1.3)),
        stock: finalStock,
        status: computedStatus,
      });
    } else if (modalMode === 'edit' && activeProduct) {
      updateProduct({
        ...activeProduct,
        ...form,
        categoryName,
        price: Number(form.price),
        originalPrice: Number(form.originalPrice || Math.round(Number(form.price) * 1.3)),
        stock: finalStock,
        status: computedStatus,
      });
    }
    setModalMode(null);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    setDeleteConfirmId(null);
  };

  // Filtered list: Search by name, category, brand + Filter by Category & Stock/Status
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.categoryName && p.categoryName.toLowerCase().includes(q)) ||
        (p.brand && p.brand.toLowerCase().includes(q));

      const matchesCategory = filterCategory === 'all' || p.category === filterCategory;

      let matchesStock = true;
      if (filterStock === 'in-stock') {
        matchesStock = p.stock > 0;
      } else if (filterStock === 'low-stock') {
        matchesStock = p.stock > 0 && p.stock <= 35;
      } else if (filterStock === 'out-of-stock') {
        matchesStock = p.stock <= 0;
      }

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, searchTerm, filterCategory, filterStock]);

  // Reset pagination to page 1 whenever search or filters change
  useEffect(() => {
    setCurrentPageNum(1);
  }, [searchTerm, filterCategory, filterStock]);

  // Pagination calculation
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const displayedProducts = useMemo(() => {
    const start = (currentPageNum - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPageNum, itemsPerPage]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            Product Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage catalogue, inventory stock levels, prices, and Sivakasi cracker specifications
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs shadow flex items-center gap-1.5 transition-all w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white dark:bg-[#1A1C22] p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input: name, category, brand */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, category, brand..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#121316] text-xs focus:outline-none focus:border-amber-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 hidden sm:inline">Category:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316] text-xs font-semibold text-gray-800 dark:text-gray-200"
            >
              <option value="all">All Categories ({products.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stock / Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 hidden sm:inline">Stock:</span>
            <select
              value={filterStock}
              onChange={(e) => setFilterStock(e.target.value)}
              className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316] text-xs font-semibold text-gray-800 dark:text-gray-200"
            >
              <option value="all">All Stock Levels</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock (≤ 35)</option>
              <option value="out-of-stock">Sold Out</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-[#1A1C22] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden p-4 space-y-4">
        {displayedProducts.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-gray-50 dark:bg-[#15161A] border-b border-gray-200 dark:border-gray-800 text-gray-400 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Item</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Brand</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Stock</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-medium">
                  {displayedProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-10 h-10 rounded-lg object-cover bg-amber-50 dark:bg-gray-800 flex-shrink-0"
                          />
                          <div>
                            <p className="font-bold text-gray-900 dark:text-white line-clamp-1">
                              {p.name}
                            </p>
                            <p className="text-[11px] text-gray-400">{p.unit || '1 Box'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-300 font-semibold">
                        {p.categoryName || p.category}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400 text-[11px]">
                        {p.brand || 'Standard Fireworks'}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-gray-900 dark:text-white">₹{p.price}</span>
                        {p.originalPrice && (
                          <span className="text-gray-400 line-through ml-1 text-[11px]">
                            ₹{p.originalPrice}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-bold text-xs ${
                            p.stock > 35
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : p.stock > 0
                              ? 'text-amber-500 dark:text-amber-400'
                              : 'text-rose-500 dark:text-rose-400'
                          }`}
                        >
                          {p.stock} units
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {p.stock > 0 ? (
                          <span className="text-emerald-600 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> In Stock
                          </span>
                        ) : (
                          <span className="text-rose-500 font-bold">Out of Stock</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenView(p)}
                            className="p-1.5 text-gray-500 hover:text-amber-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 text-gray-500 hover:text-blue-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(p.id)}
                            className="p-1.5 text-gray-500 hover:text-rose-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
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
              totalItems={filtered.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPageNum}
              itemLabel="products"
            />
          </>
        ) : (
          <div className="py-12 text-center text-gray-500 font-semibold text-xs">
            No products found.
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {(modalMode === 'add' || modalMode === 'edit') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#1A1C22] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-base text-gray-900 dark:text-white">
                {modalMode === 'add' ? 'Add Product' : 'Edit Product'}
              </h3>
              <button
                onClick={() => setModalMode(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-xs">
              {/* Product Name */}
              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Standard 1000 Wala Red Garland"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316] text-xs font-medium"
                />
              </div>

              {/* Category & Brand */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316] text-xs font-medium"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Brand *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    placeholder="e.g. Standard Fireworks Sivakasi"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316] text-xs font-medium"
                  />
                </div>
              </div>

              {/* Price, Discount, Stock */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316] text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Discount Label
                  </label>
                  <input
                    type="text"
                    value={form.discount}
                    onChange={(e) => setForm({ ...form, discount: e.target.value })}
                    placeholder="e.g. 25% OFF"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316] text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316] text-xs font-medium"
                  />
                </div>
              </div>

              {/* Product Image & Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Product Image (Path or URL) *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="/products/sparklers-box-real.jpg"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316] text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316] text-xs font-medium"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Enter detailed cracker description..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316] text-xs font-medium"
                ></textarea>
              </div>

              {/* Safety Information */}
              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Safety Information
                </label>
                <textarea
                  rows={2}
                  value={form.safetyInfo}
                  onChange={(e) => setForm({ ...form, safetyInfo: e.target.value })}
                  placeholder="Safety guidelines for lighting and disposal..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316] text-xs font-medium"
                ></textarea>
              </div>

              {/* Modal Buttons */}
              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 font-bold text-gray-700 dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold shadow"
                >
                  {modalMode === 'add' ? 'Save Product' : 'Update Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#1A1C22] rounded-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-rose-100 dark:bg-rose-950/40 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-gray-900 dark:text-white">
              Confirm Delete
            </h3>
            <p className="text-xs text-gray-500">
              Are you sure you want to delete this product?
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Product Details Modal */}
      {modalMode === 'view' && activeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-[#1A1C22] rounded-2xl p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-base text-gray-900 dark:text-white">Product Details</h3>
              <button onClick={() => setModalMode(null)} className="text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <img src={activeProduct.image} alt={activeProduct.name} className="w-full h-44 rounded-xl object-cover bg-amber-50 dark:bg-gray-800" />
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-500 uppercase">{activeProduct.categoryName || activeProduct.category}</span>
                <span className="text-xs text-gray-400 font-semibold">{activeProduct.brand}</span>
              </div>
              <h4 className="font-bold text-lg text-gray-900 dark:text-white mt-1">{activeProduct.name}</h4>
              <p className="text-xs text-gray-500 mt-2">{activeProduct.description}</p>
            </div>
            {activeProduct.safetyInfo && (
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-900/40 p-3 rounded-xl text-xs">
                <p className="font-bold text-amber-900 dark:text-amber-300 mb-1">Safety Information:</p>
                <p className="text-gray-600 dark:text-gray-400">{activeProduct.safetyInfo}</p>
              </div>
            )}
            <div className="grid grid-cols-3 gap-2 text-xs pt-2 border-t border-gray-100 dark:border-gray-800 text-center">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg">
                <span className="text-gray-400 block text-[10px]">Price</span>
                <span className="font-bold text-gray-900 dark:text-white">₹{activeProduct.price}</span>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg">
                <span className="text-gray-400 block text-[10px]">Stock</span>
                <span className="font-bold text-gray-900 dark:text-white">{activeProduct.stock} units</span>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg">
                <span className="text-gray-400 block text-[10px]">Status</span>
                <span className="font-bold text-emerald-600">{activeProduct.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
              </div>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setModalMode(null)}
                className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 font-bold text-xs"
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

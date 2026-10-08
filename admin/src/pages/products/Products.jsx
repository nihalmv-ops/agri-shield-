import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Eye, 
  CheckCircle2, 
  EyeOff, 
  Trash2, 
  Check, 
  X, 
  IndianRupee 
} from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import { initialProducts } from '../../data/products';

const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [toastMessage, setToastMessage] = useState('');

  const handleToggleStatus = (id, newStatus) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, status: newStatus };
      }
      return p;
    }));
    setToastMessage(`Product status changed to "${newStatus}"`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;

      return matchesSearch && matchesCat && matchesStatus;
    });
  }, [products, searchQuery, selectedCategory, selectedStatus]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedStatus('All');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#071A14] text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-[#063B2A] tracking-tight">
              Marketplace Catalog Oversight
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            486 active farmer listings verified for organic forest-border community standards
          </p>
        </div>

        {/* View Toggle */}
        <div className="bg-white p-1 rounded-2xl border border-gray-200 flex items-center shadow-xs self-start sm:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-xl transition-colors ${
              viewMode === 'grid' ? 'bg-[#063B2A] text-white' : 'text-gray-500 hover:text-gray-800'
            }`}
            title="Grid View"
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-xl transition-colors ${
              viewMode === 'table' ? 'bg-[#063B2A] text-white' : 'text-gray-500 hover:text-gray-800'
            }`}
            title="Table View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-emerald-950/10 shadow-soft space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search product (e.g. Cardamom, Tomato), producer name, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F5F8F6] text-xs text-[#071A14] pl-10 pr-10 py-3 rounded-2xl border border-transparent focus:border-emerald-300 focus:bg-white focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs sm:w-80">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#F5F8F6] py-2 px-3 rounded-xl border border-gray-200 text-gray-800 font-semibold focus:outline-none focus:border-emerald-300"
            >
              <option value="All">All Categories</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Grains">Grains</option>
              <option value="Spices">Spices</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              Market Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-[#F5F8F6] py-2 px-3 rounded-xl border border-gray-200 text-gray-800 font-semibold focus:outline-none focus:border-emerald-300"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Hidden">Hidden</option>
              <option value="Under Review">Under Review</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100 text-gray-500">
          <span>
            Displaying <strong className="text-[#063B2A]">{filteredProducts.length}</strong> of {products.length} products
          </span>
          {(searchQuery || selectedCategory !== 'All' || selectedStatus !== 'All') && (
            <button onClick={resetFilters} className="text-[#10B981] font-bold hover:underline">
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Grid or Table of Products */}
      {filteredProducts.length === 0 ? (
        <EmptyState
          title="No Products Found"
          message="No agricultural marketplace items matched your query."
          actionText="Clear Filters"
          onAction={resetFilters}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl border border-emerald-950/10 shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 w-full overflow-hidden bg-gray-900">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#071A14]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-bold">
                    {p.category}
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <StatusBadge status={p.status} size="xs" />
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-[#071A14] text-base group-hover:text-[#063B2A] transition-colors">
                      {p.name}
                    </h3>
                    <span className="font-black text-emerald-800 text-sm">
                      {p.price}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-2">
                    {p.description}
                  </p>

                  <div className="pt-2 text-xs text-gray-600 flex items-center justify-between border-t border-gray-100">
                    <span>Seller: <strong>{p.seller}</strong></span>
                    <span>Stock: {p.quantity}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 flex items-center gap-2">
                <Link
                  to={`/admin/products/${p.id}`}
                  className="flex-1 py-2 px-3 rounded-full bg-gray-100 hover:bg-emerald-50 text-gray-800 hover:text-emerald-800 text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </Link>

                {p.status === 'Active' ? (
                  <button
                    onClick={() => handleToggleStatus(p.id, 'Hidden')}
                    className="p-2 rounded-full bg-gray-100 hover:bg-amber-100 text-gray-600 hover:text-amber-700 transition-colors"
                    title="Hide from public marketplace"
                  >
                    <EyeOff className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleToggleStatus(p.id, 'Active')}
                    className="p-2 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors"
                    title="Approve & Show"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => handleToggleStatus(p.id, 'Under Review')}
                  className="p-2 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors"
                  title="Flag for quality review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-3xl border border-emerald-950/10 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#F5F8F6] text-gray-500 uppercase tracking-wider font-extrabold text-[10px] border-b border-gray-100">
                  <th className="py-3.5 px-4">Product</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Producer / Seller</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Stock</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-emerald-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-gray-900">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-xl object-cover border border-emerald-950/10"
                        />
                        <div>
                          <span>{p.name}</span>
                          <span className="text-[10px] text-gray-400 block font-mono">{p.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-gray-700">
                      {p.category}
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-gray-800">
                      {p.seller}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-emerald-800 font-mono">
                      {p.price}
                    </td>

                    <td className="py-3.5 px-4 text-gray-600">
                      {p.quantity}
                    </td>

                    <td className="py-3.5 px-4 text-gray-600">
                      {p.location}
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusBadge status={p.status} size="xs" />
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/admin/products/${p.id}`}
                          className="p-1.5 text-gray-400 hover:text-[#063B2A] rounded-xl hover:bg-gray-100"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default Products;

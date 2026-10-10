import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MapPin, 
  ArrowUpDown, 
  PlusCircle, 
  Sparkles, 
  X, 
  SlidersHorizontal,
  RefreshCw,
  ShoppingBag,
  TrendingUp,
  Tag
} from 'lucide-react';
import MarketplaceSearch from '../components/marketplace/MarketplaceSearch';
import CategoryFilter from '../components/marketplace/CategoryFilter';
import PriceFilter from '../components/marketplace/PriceFilter';
import LocationFilter from '../components/marketplace/LocationFilter';
import ProductGrid from '../components/marketplace/ProductGrid';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import { getProducts } from '../utils/marketplaceStorage';

const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'All';
  const initialDistrict = searchParams.get('district') || 'All Districts';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'price-low' | 'price-high'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Load from local storage utility on mount and sync on custom events
  useEffect(() => {
    const loadData = () => {
      setLoading(true);
      const data = getProducts();
      setProducts(data);
      setLoading(false);
    };

    loadData();

    // Re-sync if products updated in another tab/action
    const handleStorageChange = () => loadData();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Update query state if search params change
  useEffect(() => {
    if (searchParams.get('search') !== null) {
      setSearchQuery(searchParams.get('search') || '');
    }
    if (searchParams.get('category') !== null) {
      setSelectedCategory(searchParams.get('category') || 'All');
    }
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const params = {};
    if (searchQuery.trim()) params.search = searchQuery.trim();
    if (selectedCategory !== 'All') params.category = selectedCategory;
    if (selectedDistrict !== 'All Districts') params.district = selectedDistrict;
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDistrict('All Districts');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('newest');
    setSearchParams({});
  };

  const handleApplyPricePreset = (min, max) => {
    setMinPrice(min ? String(min) : '');
    setMaxPrice(max ? String(max) : '');
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search keyword
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery = !query || 
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          (p.description && p.description.toLowerCase().includes(query)) ||
          (p.sellerName && p.sellerName.toLowerCase().includes(query)) ||
          (p.location && p.location.toLowerCase().includes(query)) ||
          (p.district && p.district.toLowerCase().includes(query));

        // Category filter
        const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();

        // District filter
        const matchesDistrict = selectedDistrict === 'All Districts' || 
          (p.district && p.district.toLowerCase() === selectedDistrict.toLowerCase()) ||
          (p.location && p.location.toLowerCase().includes(selectedDistrict.toLowerCase()));

        // Price filter
        const priceNum = Number(p.price);
        const matchesMinPrice = minPrice === '' || priceNum >= Number(minPrice);
        const matchesMaxPrice = maxPrice === '' || priceNum <= Number(maxPrice);

        return matchesQuery && matchesCategory && matchesDistrict && matchesMinPrice && matchesMaxPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        // Default newest by timestamp or ID
        return (b.timestamp || 0) - (a.timestamp || 0);
      });
  }, [products, searchQuery, selectedCategory, selectedDistrict, minPrice, maxPrice, sortBy]);

  // Featured listings section
  const featuredProducts = useMemo(() => {
    return products.filter((p) => p.featured && p.status === 'Available').slice(0, 4);
  }, [products]);

  const activeFilterCount = (selectedCategory !== 'All' ? 1 : 0) +
    (selectedDistrict !== 'All Districts' ? 1 : 0) +
    (minPrice !== '' || maxPrice !== '' ? 1 : 0) +
    (searchQuery.trim() !== '' ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#F5F8F6] text-[#071A14]">
      
      {/* 1. Hero Banner */}
      <section className="bg-gradient-to-b from-[#063B2A] to-[#0A4B36] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/70 border border-emerald-500/40 text-xs font-bold text-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Direct Agricultural Marketplace</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Buy &amp; Sell Agricultural Products Directly
          </h1>

          <p className="text-sm sm:text-base text-gray-200 max-w-2xl mx-auto font-normal leading-relaxed">
            Connect with farmers, discover fresh produce and find agricultural products near you — zero middlemen mark-ups.
          </p>

          {/* Search bar inside Hero */}
          <div className="pt-6 max-w-4xl mx-auto">
            <MarketplaceSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedDistrict={selectedDistrict}
              onDistrictChange={setSelectedDistrict}
              onSearchSubmit={handleSearchSubmit}
            />
          </div>
        </div>
      </section>

      {/* 2. Main Marketplace Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        
        {/* Category Pill Navigation */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-emerald-950/10 shadow-soft">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              const params = {};
              if (searchQuery) params.search = searchQuery;
              if (cat !== 'All') params.category = cat;
              if (selectedDistrict !== 'All Districts') params.district = selectedDistrict;
              setSearchParams(params);
            }}
          />
        </div>

        {/* Featured Listings Spotlight (Shown when no active keyword search) */}
        {!searchQuery && selectedCategory === 'All' && selectedDistrict === 'All Districts' && featuredProducts.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#063B2A] flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <span>Featured Agricultural Listings</span>
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  High-demand verified crops, organic staples, and farming equipment
                </p>
              </div>

              <span className="text-xs font-bold bg-emerald-100 text-[#063B2A] px-3 py-1 rounded-full">
                Spotlight
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* 3. Filter Controls & Catalog Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block space-y-6 bg-white rounded-3xl p-6 border border-emerald-950/10 shadow-soft sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-extrabold text-[#063B2A] text-base flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                <span>Filters</span>
              </h3>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset All ({activeFilterCount})</span>
                </button>
              )}
            </div>

            {/* Price Filter */}
            <PriceFilter
              minPrice={minPrice}
              maxPrice={maxPrice}
              onMinPriceChange={setMinPrice}
              onMaxPriceChange={setMaxPrice}
              onApplyPreset={handleApplyPricePreset}
              onReset={() => { setMinPrice(''); setMaxPrice(''); }}
            />

            <hr className="border-gray-100" />

            {/* District / Location Filter */}
            <LocationFilter
              selectedDistrict={selectedDistrict}
              onSelectDistrict={setSelectedDistrict}
            />

            <hr className="border-gray-100" />

            {/* Sell CTA Mini Card */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/70 text-center space-y-2">
              <span className="text-xs font-black text-[#063B2A] block">
                Got crops or farming tools to sell?
              </span>
              <p className="text-[11px] text-gray-600">
                List your produce directly to 10,000+ local buyers across Kerala.
              </p>
              <Link
                to="/sell-product"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 bg-[#063B2A] hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Post Listing Free</span>
              </Link>
            </div>
          </aside>

          {/* Right Main Grid Container */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Top Toolbar: Results count & Sort by */}
            <div className="bg-white rounded-2xl p-4 border border-emerald-950/10 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-sm font-extrabold text-[#071A14]">
                  Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
                </span>
                {(selectedCategory !== 'All' || selectedDistrict !== 'All Districts' || searchQuery) && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {selectedCategory !== 'All' ? `${selectedCategory} ` : ''}
                    {selectedDistrict !== 'All Districts' ? `in ${selectedDistrict}` : ''}
                    {searchQuery ? ` matching "${searchQuery}"` : ''}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                {/* Mobile Filter Toggle Button */}
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-emerald-50 text-gray-800 rounded-xl text-xs font-bold border border-gray-200"
                >
                  <Filter className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
                </button>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 text-xs">
                  <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#F5F8F6] text-xs font-bold text-gray-800 py-2 px-3 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-400 cursor-pointer"
                  >
                    <option value="newest">Recently Added</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Cards Grid */}
            <ProductGrid
              products={filteredProducts}
              loading={loading}
              emptyTitle="No Agricultural Listings Match Your Filters"
              emptyMessage="We couldn't find any products matching your specific combination of category, location, and price. Try clearing your filters to explore all fresh produce."
              onResetFilters={handleResetFilters}
            />

          </main>

        </div>

      </div>

      {/* Mobile Filters Slide-over / Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs lg:hidden animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl border border-gray-200 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-base font-black text-[#063B2A] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                <span>Filter Marketplace</span>
              </h3>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <PriceFilter
              minPrice={minPrice}
              maxPrice={maxPrice}
              onMinPriceChange={setMinPrice}
              onMaxPriceChange={setMaxPrice}
              onApplyPreset={handleApplyPricePreset}
              onReset={() => { setMinPrice(''); setMaxPrice(''); }}
            />

            <hr className="border-gray-100" />

            <LocationFilter
              selectedDistrict={selectedDistrict}
              onSelectDistrict={(dist) => {
                setSelectedDistrict(dist);
              }}
            />

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={handleResetFilters}
                className="flex-1 py-3 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-2xl"
              >
                Reset All
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 text-xs font-black text-white bg-[#063B2A] hover:bg-emerald-900 rounded-2xl shadow-md"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Marketplace;

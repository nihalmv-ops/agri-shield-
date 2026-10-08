import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MapPin, 
  ArrowUpDown, 
  ShoppingBag, 
  Sparkles, 
  X, 
  Check, 
  Phone, 
  User, 
  Tag
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';
import { sampleProducts } from '../data/mockData';

const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProductForContact, setSelectedProductForContact] = useState(null);
  const [contactSuccess, setContactSuccess] = useState(false);

  const categories = ['All', 'Fruits', 'Vegetables', 'Grains', 'Spices', 'Dairy', 'Other'];
  const locations = ['All', 'Kozhikode', 'Malappuram', 'Idukki', 'Thrissur', 'Wayanad', 'Munnar', 'Palakkad'];

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return sampleProducts.filter((product) => {
      // Category match
      const matchCategory = selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase();

      // Search match
      const matchSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.seller.name.toLowerCase().includes(searchQuery.toLowerCase());

      // Location match
      const matchLocation = selectedLocation === 'All' || product.location.toLowerCase().includes(selectedLocation.toLowerCase());

      return matchCategory && matchSearch && matchLocation;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured / default
    });
  }, [selectedCategory, searchQuery, selectedLocation, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLocation('All');
    setSortBy('featured');
    setSearchParams({});
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setSelectedProductForContact(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F5F8F6] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Header & Hero Banner */}
        <div className="bg-gradient-to-r from-[#063B2A] to-[#071A14] rounded-3xl p-6 sm:p-10 text-white mb-10 shadow-soft-lg relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
              Farm-to-Consumer Direct
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              AgriShield Marketplace
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              Buy directly from verified local Kerala farmers at fair transparent rates. Zero broker commission, freshly harvested crops, spices, and organic dairy.
            </p>
          </div>
          
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <ShoppingBag className="w-80 h-80 -mr-16 -mb-16 text-emerald-300" />
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-emerald-950/10 shadow-soft mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input (6 cols) */}
            <div className="md:col-span-6 relative">
              <input
                type="text"
                placeholder="Search products (e.g. Rice, Pepper, Honey, Vegetables)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Location Selector (3 cols) */}
            <div className="md:col-span-3 relative">
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mr-2" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-gray-700 focus:outline-none cursor-pointer"
                >
                  <option value="All">All Kerala Locations</option>
                  {locations.filter(l => l !== 'All').map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sort Dropdown (3 cols) */}
            <div className="md:col-span-3 relative">
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                <ArrowUpDown className="w-4 h-4 text-emerald-600 shrink-0 mr-2" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-gray-700 focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured / Best Match</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

          </div>

          {/* Category Pills Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
            <span className="font-semibold text-gray-500 text-xs shrink-0 mr-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Categories:
            </span>
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap ${
                    active
                      ? 'bg-[#063B2A] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}

            {(selectedCategory !== 'All' || selectedLocation !== 'All' || searchQuery) && (
              <button
                onClick={handleClearFilters}
                className="text-xs text-rose-600 hover:underline font-semibold ml-auto shrink-0 flex items-center gap-1"
              >
                <X className="w-3 h-3" /> Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Count & Meta */}
        <div className="flex items-center justify-between mb-6 text-xs text-gray-500">
          <span>Showing <strong>{filteredProducts.length}</strong> farm products found</span>
          <span className="text-emerald-700 font-medium">100% Verified Kerala Farmers</span>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onContact={(prod) => setSelectedProductForContact(prod)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 space-y-4 max-w-md mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No products matched your search</h3>
            <p className="text-xs text-gray-500">
              Try adjusting your filters, location, or search keywords.
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={handleClearFilters}
              className="bg-[#10B981]"
            >
              Show All Products
            </Button>
          </div>
        )}

      </div>

      {/* Contact Seller Modal */}
      {selectedProductForContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-emerald-900/10 space-y-5">
            <div className="flex items-start justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Farmer Connect
                </span>
                <h3 className="text-lg font-extrabold text-gray-900 mt-1">
                  Contact {selectedProductForContact.seller.name}
                </h3>
                <p className="text-xs text-gray-500">For {selectedProductForContact.name} ({selectedProductForContact.location})</p>
              </div>
              <button
                onClick={() => setSelectedProductForContact(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {contactSuccess ? (
              <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-emerald-900 text-sm">Message Sent to Farmer!</h4>
                <p className="text-xs text-emerald-700">
                  {selectedProductForContact.seller.name} will call or WhatsApp you directly at your registered number.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    defaultValue="Arjun Menon"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Your Phone / WhatsApp</label>
                  <input
                    type="tel"
                    defaultValue="+91 98460 11223"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Quantity Interested In</label>
                  <input
                    type="text"
                    placeholder={`e.g. 10 ${selectedProductForContact.unit}`}
                    defaultValue={`5 ${selectedProductForContact.unit}`}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Message for Farmer</label>
                  <textarea
                    rows={2}
                    placeholder="Ask about delivery, bulk pricing, or farm visit..."
                    defaultValue="Hello, I am interested in purchasing this fresh harvest. Is delivery available?"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedProductForContact(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    className="bg-[#10B981] text-white"
                  >
                    Send Inquiry to Farmer
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;


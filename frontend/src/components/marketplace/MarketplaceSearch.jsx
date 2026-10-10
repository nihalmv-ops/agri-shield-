import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, X, PlusCircle } from 'lucide-react';
import { KERALA_DISTRICTS } from '../../data/marketplaceProducts';

const MarketplaceSearch = ({
  searchQuery,
  onSearchChange,
  selectedDistrict,
  onDistrictChange,
  onSearchSubmit,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-3xl p-3 sm:p-4 border border-emerald-950/10 shadow-soft ${className}`}>
      <form onSubmit={onSearchSubmit} className="flex flex-col lg:flex-row items-stretch gap-2.5 sm:gap-3">
        
        {/* Keyword Search */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-emerald-600 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search vegetables, fruits, rice, spices, equipment, tools..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-11 pr-10 py-3 sm:py-3.5 bg-[#F5F8F6] text-xs sm:text-sm text-[#071A14] font-medium rounded-2xl border border-transparent focus:border-emerald-300 focus:bg-white focus:outline-none transition-all placeholder:text-gray-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Location Dropdown */}
        <div className="relative sm:w-64 shrink-0">
          <MapPin className="w-4 h-4 text-emerald-600 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={selectedDistrict}
            onChange={(e) => onDistrictChange(e.target.value)}
            className="w-full pl-10 pr-8 py-3 sm:py-3.5 bg-[#F5F8F6] text-xs sm:text-sm text-[#071A14] font-bold rounded-2xl border border-transparent focus:border-emerald-300 focus:bg-white focus:outline-none transition-all appearance-none cursor-pointer"
          >
            {KERALA_DISTRICTS.map((dist) => (
              <option key={dist} value={dist}>
                {dist === 'All Districts' ? '📍 All Locations' : `📍 ${dist}`}
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
            ▼
          </div>
        </div>

        {/* Search & Sell Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="submit"
            className="flex-1 sm:flex-initial px-6 py-3 sm:py-3.5 bg-[#063B2A] hover:bg-emerald-900 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4 text-emerald-300" />
            <span>Search</span>
          </button>

          <Link
            to="/sell-product"
            className="flex-1 sm:flex-initial px-5 py-3 sm:py-3.5 bg-gradient-to-r from-[#10B981] to-emerald-600 hover:from-emerald-500 hover:to-emerald-600 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md shadow-emerald-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4 text-white" />
            <span>Sell Product</span>
          </Link>
        </div>

      </form>
    </div>
  );
};

export default MarketplaceSearch;

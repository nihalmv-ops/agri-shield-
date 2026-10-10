import React from 'react';
import { MapPin } from 'lucide-react';
import { KERALA_DISTRICTS } from '../../data/marketplaceProducts';

const LocationFilter = ({
  selectedDistrict,
  onSelectDistrict,
  className = ''
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-black uppercase tracking-wider text-gray-500 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
          <span>Filter by District</span>
        </label>
        {selectedDistrict !== 'All Districts' && (
          <button
            type="button"
            onClick={() => onSelectDistrict('All Districts')}
            className="text-[11px] font-bold text-emerald-600 hover:text-emerald-800"
          >
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
        {KERALA_DISTRICTS.map((dist) => {
          const isSelected = selectedDistrict === dist;
          return (
            <button
              key={dist}
              type="button"
              onClick={() => onSelectDistrict(dist)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                isSelected
                  ? 'bg-[#063B2A] text-white border-[#063B2A] shadow-xs'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-emerald-50/70 hover:border-emerald-200'
              }`}
            >
              {dist}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LocationFilter;

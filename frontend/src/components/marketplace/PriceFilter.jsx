import React from 'react';
import { IndianRupee, RotateCcw } from 'lucide-react';

const PriceFilter = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  onApplyPreset,
  onReset,
  className = ''
}) => {
  const presets = [
    { label: 'Under ₹100', min: 0, max: 100 },
    { label: '₹100 - ₹500', min: 100, max: 500 },
    { label: '₹500 - ₹2,000', min: 500, max: 2000 },
    { label: 'Over ₹2,000', min: 2000, max: '' }
  ];

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-black uppercase tracking-wider text-gray-500 flex items-center gap-1">
          <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
          <span>Price Range</span>
        </label>
        {(minPrice || maxPrice) && (
          <button
            type="button"
            onClick={onReset}
            className="text-[11px] font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">₹</span>
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            className="w-full pl-7 pr-2.5 py-2 text-xs font-bold bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400"
          />
        </div>
        <span className="text-gray-400 text-xs font-bold">-</span>
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">₹</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className="w-full pl-7 pr-2.5 py-2 text-xs font-bold bg-[#F5F8F6] border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400"
          />
        </div>
      </div>

      {/* Preset Chips */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {presets.map((preset) => {
          const isActive = minPrice === String(preset.min) && (preset.max === '' ? !maxPrice : maxPrice === String(preset.max));
          return (
            <button
              key={preset.label}
              type="button"
              onClick={() => onApplyPreset(preset.min, preset.max)}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all ${
                isActive
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PriceFilter;

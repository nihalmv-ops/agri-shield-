import React from 'react';
import { Filter } from 'lucide-react';

const FilterDropdown = ({ label, value, options = [], onChange, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-3.5 py-2 ${className}`}>
      {label && (
        <span className="text-[11px] font-extrabold text-gray-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Filter className="w-3 h-3 text-primaryGreen" />
          {label}:
        </span>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-xs font-bold text-darkText focus:outline-none cursor-pointer w-full"
      >
        {options.map((opt, idx) => (
          <option key={idx} value={typeof opt === 'string' ? opt : opt.value}>
            {typeof opt === 'string' ? opt : opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;


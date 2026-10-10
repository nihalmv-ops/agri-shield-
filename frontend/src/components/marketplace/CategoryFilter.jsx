import React from 'react';
import { 
  LayoutGrid, 
  Carrot, 
  Apple, 
  Wheat, 
  Flame, 
  Sprout, 
  Layers, 
  Tractor, 
  Wrench, 
  Milk, 
  Boxes 
} from 'lucide-react';
import { MARKETPLACE_CATEGORIES } from '../../data/marketplaceProducts';

const iconMap = {
  LayoutGrid,
  Carrot,
  Apple,
  Wheat,
  Flame,
  Sprout,
  Layers,
  Tractor,
  Wrench,
  Milk,
  Boxes
};

const CategoryFilter = ({
  selectedCategory,
  onSelectCategory,
  className = ''
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-wider text-gray-500">
          Browse by Category
        </h3>
        <span className="text-[11px] font-bold text-emerald-700">
          10 Categories
        </span>
      </div>

      {/* Horizontal Scroll Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
        {MARKETPLACE_CATEGORIES.map((cat) => {
          const Icon = iconMap[cat.icon] || Boxes;
          const isSelected = (selectedCategory === 'All' && cat.id === 'all') || selectedCategory === cat.name;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id === 'all' ? 'All' : cat.name)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap shrink-0 border ${
                isSelected
                  ? 'bg-[#063B2A] text-white border-[#063B2A] shadow-md shadow-emerald-950/20 scale-102'
                  : 'bg-white text-gray-700 hover:text-[#063B2A] hover:bg-emerald-50/70 border-emerald-950/10 shadow-xs'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#34D399]' : 'text-emerald-600'}`} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;


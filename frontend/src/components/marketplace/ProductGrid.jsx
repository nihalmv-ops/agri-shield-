import React from 'react';
import ProductCard from './ProductCard';
import EmptyState from './EmptyState';

const ProductGrid = ({
  products = [],
  loading = false,
  emptyTitle,
  emptyMessage,
  onResetFilters,
  className = ''
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <div
            key={n}
            className="bg-white rounded-3xl p-4 border border-emerald-950/10 shadow-soft animate-pulse space-y-4"
          >
            <div className="h-48 bg-gray-200 rounded-2xl w-full"></div>
            <div className="h-6 bg-gray-200 rounded-md w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded-md w-1/2"></div>
            <div className="h-9 bg-gray-200 rounded-xl w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        message={emptyMessage}
        actionText={onResetFilters ? 'Clear All Filters' : null}
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;


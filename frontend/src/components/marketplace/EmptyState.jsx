import React from 'react';
import { PackageSearch, RefreshCw } from 'lucide-react';
import Button from '../Button';

const EmptyState = ({
  title = 'No Products Found',
  message = 'We could not find any agricultural listings matching your criteria. Try adjusting your filters or search keywords.',
  icon: Icon = PackageSearch,
  actionText = 'Clear Filters',
  onAction,
  secondaryActionText,
  onSecondaryAction,
  className = ''
}) => {
  return (
    <div className={`text-center py-12 sm:py-16 px-4 bg-white rounded-3xl border border-emerald-950/10 shadow-soft max-w-xl mx-auto my-6 ${className}`}>
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 text-[#063B2A] rounded-3xl flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-sm animate-pulse">
        <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600 stroke-[1.75]" />
      </div>

      <h3 className="text-xl sm:text-2xl font-black text-[#071A14] mb-2 tracking-tight">
        {title}
      </h3>

      <p className="text-sm text-gray-500 max-w-md mx-auto mb-6 leading-relaxed">
        {message}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {actionText && onAction && (
          <Button
            variant="primary"
            size="sm"
            onClick={onAction}
            className="bg-[#063B2A] hover:bg-emerald-900 text-white rounded-full font-bold px-5"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            <span>{actionText}</span>
          </Button>
        )}

        {secondaryActionText && onSecondaryAction && (
          <Button
            variant="outline"
            size="sm"
            onClick={onSecondaryAction}
            className="border-gray-200 text-gray-700 hover:bg-gray-50 rounded-full font-bold px-5"
          >
            {secondaryActionText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;


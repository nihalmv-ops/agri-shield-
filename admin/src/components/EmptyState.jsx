import React from 'react';
import * as LucideIcons from 'lucide-react';

const EmptyState = ({
  icon = 'Inbox',
  title = 'No records found',
  description = 'Try adjusting your search criteria or filter options.',
  actionLabel,
  onAction,
  className = ''
}) => {
  const IconComponent = LucideIcons[icon] || LucideIcons.Inbox;

  return (
    <div
      className={`bg-white rounded-3xl p-12 text-center border border-gray-200/80 shadow-soft max-w-md mx-auto space-y-4 my-8 ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-primaryGreen flex items-center justify-center mx-auto border border-emerald-100 shadow-xs">
        <IconComponent className="w-8 h-8" />
      </div>

      <div className="space-y-1">
        <h3 className="text-base font-extrabold text-[#063B2A]">{title}</h3>
        <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      {actionLabel && onAction && (
        <div className="pt-2">
          <button
            onClick={onAction}
            className="px-5 py-2.5 bg-primaryGreen hover:bg-primaryGreen-hover text-white rounded-full text-xs font-bold transition-all shadow-xs"
          >
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;

import React from 'react';

const SectionTitle = ({
  badge,
  title,
  description,
  align = 'left',
  light = false,
  action,
  className = ''
}) => {
  const isCentered = align === 'center';

  return (
    <div className={`mb-8 md:mb-12 ${isCentered ? 'text-center mx-auto max-w-3xl' : ''} ${className}`}>
      <div className={`flex flex-col md:flex-row md:items-end justify-between gap-4 ${isCentered ? 'items-center' : ''}`}>
        <div className="space-y-2 max-w-2xl">
          {badge && (
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase ${
              light
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {badge}
            </div>
          )}
          
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight ${
            light ? 'text-white' : 'text-[#063B2A]'
          }`}>
            {title}
          </h2>

          {description && (
            <p className={`text-sm sm:text-base leading-relaxed ${
              light ? 'text-emerald-100/80' : 'text-gray-600'
            }`}>
              {description}
            </p>
          )}
        </div>

        {action && !isCentered && (
          <div className="shrink-0 pt-2 md:pt-0">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionTitle;


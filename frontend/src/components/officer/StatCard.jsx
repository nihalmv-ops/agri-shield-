import React from 'react';
import * as LucideIcons from 'lucide-react';

const StatCard = ({
  title,
  value,
  subtext,
  icon = 'Radio',
  trend = 'up',
  color = 'emerald',
  className = ''
}) => {
  const IconComponent = LucideIcons[icon] || LucideIcons.Activity;

  const colorStyles = {
    emerald: {
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      valueColor: 'text-[#063B2A]',
      subtextColor: 'text-emerald-700 bg-emerald-50/80 border-emerald-200'
    },
    amber: {
      iconBg: 'bg-amber-50 text-amber-600 border-amber-100',
      valueColor: 'text-amber-950',
      subtextColor: 'text-amber-800 bg-amber-50/80 border-amber-200'
    },
    blue: {
      iconBg: 'bg-blue-50 text-blue-600 border-blue-100',
      valueColor: 'text-blue-950',
      subtextColor: 'text-blue-800 bg-blue-50/80 border-blue-200'
    },
    teal: {
      iconBg: 'bg-teal-50 text-teal-600 border-teal-100',
      valueColor: 'text-teal-950',
      subtextColor: 'text-teal-800 bg-teal-50/80 border-teal-200'
    },
    rose: {
      iconBg: 'bg-rose-50 text-rose-600 border-rose-100',
      valueColor: 'text-rose-950',
      subtextColor: 'text-rose-800 bg-rose-50/80 border-rose-200'
    }
  };

  const currentTheme = colorStyles[color] || colorStyles.emerald;

  return (
    <div
      className={`group bg-white rounded-3xl p-5 sm:p-6 border border-emerald-950/10 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between ${className}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          {title}
        </span>
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-xs transition-transform group-hover:scale-105 ${currentTheme.iconBg}`}
        >
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      <div className="space-y-2">
        <div className={`text-3xl sm:text-4xl font-black tracking-tight ${currentTheme.valueColor}`}>
          {value}
        </div>

        {subtext && (
          <div className="flex items-center gap-1.5">
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${currentTheme.subtextColor}`}
            >
              {subtext}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;

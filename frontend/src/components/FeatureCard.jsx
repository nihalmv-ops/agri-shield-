import React from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

const FeatureCard = ({
  title,
  description,
  icon = 'Leaf',
  link,
  highlight,
  className = ''
}) => {
  // Dynamically resolve icon from lucide-react with fallback
  const IconComponent = LucideIcons[icon] || LucideIcons.Sparkles;

  const CardContent = (
    <div className={`group relative p-5 sm:p-6 bg-white rounded-2xl border border-emerald-900/10 shadow-soft hover:shadow-soft-lg hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between h-full ${className}`}>
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#063B2A] text-emerald-400 flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
            <IconComponent className="w-6 h-6" />
          </div>
          {highlight && (
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {highlight}
            </span>
          )}
        </div>

        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5 group-hover:text-emerald-700 transition-colors">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center text-xs font-semibold text-emerald-600 group-hover:text-emerald-700">
        <span>Explore feature</span>
        <LucideIcons.ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );

  if (link) {
    return (
      <Link to={link} className="block h-full">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
};

export default FeatureCard;

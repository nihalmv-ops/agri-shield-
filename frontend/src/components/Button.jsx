import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  onClick,
  disabled = false,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none';

  const variants = {
    primary: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm hover:shadow-glow-emerald focus:ring-emerald-500',
    secondary: 'bg-[#063B2A] hover:bg-[#094d37] text-white focus:ring-emerald-600 shadow-sm',
    outline: 'border border-emerald-500/60 text-emerald-100 hover:bg-emerald-500/10 hover:border-emerald-400 focus:ring-emerald-400',
    outlineDark: 'border border-emerald-800/40 text-emerald-900 hover:bg-emerald-50 hover:border-emerald-700 focus:ring-emerald-700',
    ghost: 'text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/80 focus:ring-emerald-500',
    glass: 'bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md focus:ring-white',
    darkGlass: 'bg-[#071A14]/70 hover:bg-[#071A14]/90 text-white border border-emerald-800/50 backdrop-blur-md focus:ring-emerald-500',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500 shadow-sm',
    accent: 'bg-[#34D399] hover:bg-[#10B981] text-[#071A14] font-semibold focus:ring-emerald-400'
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold'
  };

  const combinedStyles = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedStyles} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedStyles} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedStyles}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;


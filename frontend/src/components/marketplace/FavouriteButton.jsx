import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { isFavorite, toggleFavorite } from '../../utils/marketplaceStorage';

const FavouriteButton = ({ productId, size = 'md', className = '' }) => {
  const [fav, setFav] = useState(() => isFavorite(productId));

  useEffect(() => {
    const handleUpdate = () => {
      setFav(isFavorite(productId));
    };

    window.addEventListener('agrishield_favorites_updated', handleUpdate);
    return () => window.removeEventListener('agrishield_favorites_updated', handleUpdate);
  }, [productId]);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = toggleFavorite(productId);
    setFav(updated);
  };

  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11'
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={fav ? 'Remove from favourites' : 'Save to favourites'}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all duration-200 ${
        fav
          ? 'bg-rose-50 text-rose-600 shadow-sm hover:bg-rose-100 hover:scale-110'
          : 'bg-white/90 backdrop-blur-md text-gray-500 hover:text-rose-500 hover:bg-white shadow-sm hover:scale-110'
      } ${className}`}
    >
      <Heart
        className={`${iconSizes[size]} transition-all ${
          fav ? 'fill-rose-500 text-rose-500 scale-105' : ''
        }`}
      />
    </button>
  );
};

export default FavouriteButton;

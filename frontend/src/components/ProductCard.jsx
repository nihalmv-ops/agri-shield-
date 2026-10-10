import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  User, 
  Clock, 
  Eye, 
  Phone, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import FavouriteButton from './marketplace/FavouriteButton';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1546470427-227c7369a489?auto=format&fit=crop&w=800&q=80';

const ProductCard = ({ product, showSellerLink = true, className = '' }) => {
  const [imgError, setImgError] = useState(false);

  const {
    id,
    name,
    price,
    priceUnit = 'kg',
    quantity,
    quantityUnit = 'kg',
    category,
    image,
    location,
    district,
    sellerId = 'seller-default',
    sellerName = 'Local Farmer',
    postedDate = 'Recently',
    status = 'Available',
    condition = 'Fresh Harvest',
    featured = false
  } = product || {};

  const isSold = status === 'Sold';
  const displayLocation = district ? `${location ? location + ', ' : ''}${district}` : (location || 'Kerala');

  return (
    <div className={`group bg-white rounded-3xl border border-emerald-950/10 shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-1 relative ${className}`}>
      
      {/* Top Media Container */}
      <div className="relative">
        <Link to={`/marketplace/${id}`} className="block relative h-52 w-full overflow-hidden bg-gray-100">
          <img
            src={imgError ? FALLBACK_IMAGE : (image || FALLBACK_IMAGE)}
            alt={name}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              isSold ? 'grayscale opacity-75' : ''
            }`}
            loading="lazy"
          />

          {/* Sold Overlay Banner */}
          {isSold && (
            <div className="absolute inset-0 bg-black/45 backdrop-blur-xs flex items-center justify-center">
              <span className="px-3.5 py-1.5 rounded-full bg-rose-600 text-white text-xs font-black tracking-widest uppercase shadow-md">
                Sold Out
              </span>
            </div>
          )}

          {/* Featured Badge */}
          {featured && !isSold && (
            <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-full bg-[#063B2A]/90 backdrop-blur-md text-[#34D399] border border-emerald-400/40 shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#34D399]" />
              <span>Featured</span>
            </span>
          )}

          {/* Category Chip */}
          <span className="absolute bottom-3 left-3 px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-white/90 backdrop-blur-md text-[#063B2A] border border-emerald-100 shadow-xs">
            {category}
          </span>
        </Link>

        {/* Floating Heart / Favourite Button */}
        <div className="absolute top-3 right-3 z-10">
          <FavouriteButton productId={id} size="md" />
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        {/* Price & Name */}
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-1">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-[#063B2A] tracking-tight">
                ₹{Number(price).toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-gray-500 font-semibold">
                / {priceUnit}
              </span>
            </div>

            {quantity && (
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                {quantity} {quantityUnit} avail.
              </span>
            )}
          </div>

          <Link 
            to={`/marketplace/${id}`} 
            className="block text-base font-extrabold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-1"
          >
            {name}
          </Link>
        </div>

        {/* Location & Seller & Time */}
        <div className="space-y-1.5 text-xs text-gray-500 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-gray-600">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate font-medium">{displayLocation}</span>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            {showSellerLink ? (
              <Link
                to={`/seller/${sellerId}`}
                className="flex items-center gap-1 text-gray-600 hover:text-emerald-700 transition-colors font-medium truncate max-w-[160px]"
                onClick={(e) => e.stopPropagation()}
              >
                <User className="w-3 h-3 text-emerald-600 shrink-0" />
                <span className="truncate">{sellerName}</span>
              </Link>
            ) : (
              <span className="flex items-center gap-1 text-gray-500 truncate">
                <User className="w-3 h-3 text-emerald-600 shrink-0" />
                <span className="truncate">{sellerName}</span>
              </span>
            )}

            <span className="text-gray-400 shrink-0 flex items-center gap-1">
              <Clock className="w-3 h-3 text-gray-400" />
              <span>{postedDate}</span>
            </span>
          </div>
        </div>

        {/* Card CTA */}
        <div className="pt-2">
          <Link
            to={`/marketplace/${id}`}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-[#F5F8F6] hover:bg-[#063B2A] text-[#063B2A] hover:text-white font-bold text-xs transition-all duration-200 border border-emerald-900/10 group-hover:border-transparent active:scale-98"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </Link>
        </div>

      </div>

    </div>
  );
};

export default ProductCard;

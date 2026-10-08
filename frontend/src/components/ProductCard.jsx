import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, User, Heart, Phone, ArrowUpRight } from 'lucide-react';
import Button from './Button';

const ProductCard = ({ product, onContact }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  const {
    id,
    name,
    price,
    unit,
    category,
    badge,
    image,
    location,
    seller,
    quantityAvailable
  } = product;

  const handleContact = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onContact) {
      onContact(product);
    } else {
      setContactSuccess(true);
      setTimeout(() => setContactSuccess(false), 2500);
    }
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="group bg-white rounded-2xl border border-emerald-950/10 shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden flex flex-col h-full hover:-translate-y-1">
      {/* Image Container */}
      <Link to={`/marketplace/${id}`} className="relative h-48 w-full overflow-hidden bg-gray-100 block">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Category/Badge Pill */}
        {badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-semibold rounded-full bg-white/90 backdrop-blur-md text-[#063B2A] border border-emerald-100 shadow-sm">
            {badge}
          </span>
        )}

        {/* Favorite Icon */}
        <button
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isFavorite
              ? 'bg-rose-50 text-rose-500 shadow-md'
              : 'bg-white/80 backdrop-blur-md text-gray-500 hover:text-rose-500 hover:bg-white shadow-sm'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
        </button>
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <Link to={`/marketplace/${id}`} className="hover:text-emerald-700 transition-colors">
              <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-1">
                {name}
              </h3>
            </Link>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-xl font-extrabold text-[#063B2A]">
              ₹{price}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              / {unit}
            </span>
          </div>

          {/* Details (Location, Seller) */}
          <div className="space-y-1.5 text-xs text-gray-600 mb-4">
            <div className="flex items-center gap-1.5 text-gray-600">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <User className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">{seller?.name || 'Local Farmer'}</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-2">
          {contactSuccess ? (
            <div className="w-full py-2 px-3 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full text-center border border-emerald-200 animate-fadeIn">
              ✓ Contact requested! Farmer notified
            </div>
          ) : (
            <Button
              variant="primary"
              size="sm"
              className="w-full bg-[#10B981] hover:bg-[#0ea371] text-white rounded-full font-medium shadow-none py-2"
              onClick={handleContact}
            >
              Contact Seller
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;


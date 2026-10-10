import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, ShoppingBag, Sparkles, Trash2 } from 'lucide-react';
import ProductGrid from '../components/marketplace/ProductGrid';
import EmptyState from '../components/marketplace/EmptyState';
import Button from '../components/Button';
import { getFavoriteProducts } from '../utils/marketplaceStorage';

const Favourites = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = () => {
    const favs = getFavoriteProducts();
    setFavoriteProducts(favs);
    setLoading(false);
  };

  useEffect(() => {
    loadFavorites();

    const handleFavUpdate = () => {
      loadFavorites();
    };

    window.addEventListener('agrishield_favorites_updated', handleFavUpdate);
    return () => {
      window.removeEventListener('agrishield_favorites_updated', handleFavUpdate);
    };
  }, []);

  const handleClearAll = () => {
    localStorage.setItem('agrishield_favorites', JSON.stringify([]));
    window.dispatchEvent(new Event('agrishield_favorites_updated'));
    setFavoriteProducts([]);
  };

  return (
    <div className="min-h-screen bg-[#F5F8F6] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6 text-xs text-gray-500">
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-1.5 font-bold text-[#063B2A] hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Marketplace</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <Link to="/marketplace" className="hover:underline text-gray-600">Marketplace</Link>
            <span>/</span>
            <span className="font-bold text-[#063B2A]">Saved Favourites</span>
          </div>
        </div>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold border border-rose-100 mb-2">
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              <span>Wishlist & Shortlisted Crops</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#063B2A]">
              My Saved Favourites
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Keep track of produce prices, available stocks, and directly reach out to farmers when you're ready.
            </p>
          </div>

          {favoriteProducts.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-500">
                {favoriteProducts.length} Saved {favoriteProducts.length === 1 ? 'Item' : 'Items'}
              </span>
              <button
                onClick={handleClearAll}
                className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all border border-rose-200"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>

        {/* Grid or Empty State */}
        {favoriteProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-emerald-950/10 shadow-soft max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
              <Heart className="w-8 h-8 fill-rose-500/20" />
            </div>
            <h3 className="text-lg font-black text-[#063B2A]">
              Your Favourites List is Empty
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              You haven't saved any agricultural items yet. Click the heart icon on any product card in the marketplace to save it here for quick access.
            </p>
            <div className="pt-2">
              <Button
                to="/marketplace"
                variant="primary"
                size="md"
                className="bg-[#10B981] hover:bg-[#0ea371] text-white rounded-2xl"
              >
                Explore Marketplace Products
              </Button>
            </div>
          </div>
        ) : (
          <ProductGrid products={favoriteProducts} loading={loading} />
        )}

      </div>
    </div>
  );
};

export default Favourites;

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  User, 
  Heart, 
  ShieldCheck, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  ArrowLeft, 
  Share2, 
  Sparkles, 
  Truck, 
  Clock, 
  MessageCircle,
  ShoppingBag,
  Check,
  AlertTriangle,
  Flag,
  Edit3,
  Layers,
  Info
} from 'lucide-react';
import Button from '../components/Button';
import ProductCard from '../components/marketplace/ProductCard';
import SellerCard from '../components/marketplace/SellerCard';
import FavouriteButton from '../components/marketplace/FavouriteButton';
import ReportListingModal from '../components/marketplace/ReportListingModal';
import { getProductById, getProducts } from '../utils/marketplaceStorage';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    const found = getProductById(id);
    if (found) {
      setProduct(found);
      const mainImg = (found.images && found.images.length > 0) ? found.images[0] : found.image;
      setSelectedImage(mainImg || 'https://images.unsplash.com/photo-1546470427-227c7369a489?auto=format&fit=crop&w=800&q=80');
      setQuantity(1);
    } else {
      setProduct(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F8F6] py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-emerald-950/10 shadow-soft text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-[#063B2A]">Listing Not Found</h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            The agricultural product listing you are looking for may have been removed, sold out, or expired.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <Button
              variant="outlineDark"
              size="md"
              className="w-full"
              onClick={() => navigate('/marketplace')}
            >
              Back to Marketplace
            </Button>
            <Button
              to="/sell-product"
              variant="primary"
              size="md"
              className="w-full bg-[#10B981]"
            >
              Sell Product
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const allImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const allProducts = getProducts();
  const relatedProducts = allProducts
    .filter((p) => String(p.id) !== String(product.id) && (p.category === product.category || p.district === product.district))
    .slice(0, 3);

  const isSold = product.status === 'Sold';
  const unitLabel = product.priceUnit || product.unit || 'kg';
  const maxAvailable = product.quantity || 100;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8F6] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 text-xs text-gray-500">
          <button
            onClick={() => navigate('/marketplace')}
            className="inline-flex items-center gap-1.5 font-bold text-[#063B2A] hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Marketplace</span>
          </button>
          
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <Link to="/marketplace" className="hover:underline text-gray-600">Marketplace</Link>
            <span>/</span>
            <span className="text-gray-400">{product.category}</span>
            <span>/</span>
            <span className="font-bold text-[#063B2A] truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>

        {/* Owner Management Banner if user is the listing owner */}
        {product.isOwner && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#063B2A]">This is your listing</p>
                <p className="text-[11px] text-emerald-800">You can edit the description, price, quantity, or mark as sold at any time.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                to={`/edit-product/${product.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#063B2A] text-white rounded-xl text-xs font-bold hover:bg-emerald-900 transition-all shadow-xs"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Listing</span>
              </Link>
              <Link
                to="/my-listings"
                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all"
              >
                My Listings
              </Link>
            </div>
          </div>
        )}

        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Column: Photos Gallery & Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Main Showcase Image */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 border border-emerald-950/10 shadow-soft">
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-4/3 border border-gray-200">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${
                    isSold ? 'grayscale-40 contrast-90' : ''
                  }`}
                />

                {/* Sold Overlay Banner */}
                {isSold && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="bg-rose-600 text-white px-6 py-2 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl rotate-[-6deg]">
                      Sold Out
                    </div>
                  </div>
                )}
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#063B2A]/90 backdrop-blur-md text-emerald-300 shadow-md">
                    {product.category}
                  </span>
                  {product.condition && (
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/90 backdrop-blur-md text-emerald-800 shadow-xs">
                      {product.condition}
                    </span>
                  )}
                </div>

                {/* Heart & Share Buttons */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md text-gray-700 hover:text-emerald-700 hover:bg-white flex items-center justify-center shadow-sm transition-all"
                    title="Share listing"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <FavouriteButton productId={product.id} className="shadow-md" />
                </div>
              </div>

              {/* Share Copied Toast */}
              {shareCopied && (
                <div className="mt-2 text-center text-xs font-bold text-emerald-700 bg-emerald-50 py-1.5 rounded-xl border border-emerald-200">
                  Listing link copied to clipboard!
                </div>
              )}

              {/* Thumbnails Strip */}
              {allImages.length > 1 && (
                <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        selectedImage === img
                          ? 'border-emerald-600 ring-2 ring-emerald-400/40 scale-102'
                          : 'border-gray-200 hover:border-gray-300 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Specifications & Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-950/10 shadow-soft space-y-6">
              <div>
                <h2 className="text-base font-black text-[#063B2A] uppercase tracking-wider mb-2">
                  Description & Crop Details
                </h2>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* Technical Specifications Matrix */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Listing Specifications
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-[#F5F8F6] rounded-2xl border border-gray-100">
                    <span className="text-gray-400 block text-[10px] font-semibold">Category</span>
                    <strong className="text-[#063B2A]">{product.category}</strong>
                  </div>
                  <div className="p-3 bg-[#F5F8F6] rounded-2xl border border-gray-100">
                    <span className="text-gray-400 block text-[10px] font-semibold">Quality / Condition</span>
                    <strong className="text-[#063B2A]">{product.condition || 'Fresh Farm Produce'}</strong>
                  </div>
                  <div className="p-3 bg-[#F5F8F6] rounded-2xl border border-gray-100">
                    <span className="text-gray-400 block text-[10px] font-semibold">Available Quantity</span>
                    <strong className="text-[#063B2A]">{product.quantity} {product.quantityUnit || unitLabel}</strong>
                  </div>
                  <div className="p-3 bg-[#F5F8F6] rounded-2xl border border-gray-100">
                    <span className="text-gray-400 block text-[10px] font-semibold">District</span>
                    <strong className="text-[#063B2A]">{product.district || 'Kerala'}</strong>
                  </div>
                  <div className="p-3 bg-[#F5F8F6] rounded-2xl border border-gray-100">
                    <span className="text-gray-400 block text-[10px] font-semibold">Listing Status</span>
                    <strong className={isSold ? 'text-rose-600' : 'text-emerald-700'}>{product.status || 'Available'}</strong>
                  </div>
                  <div className="p-3 bg-[#F5F8F6] rounded-2xl border border-gray-100">
                    <span className="text-gray-400 block text-[10px] font-semibold">Posted</span>
                    <strong className="text-[#063B2A]">{product.postedDate || 'Recently'}</strong>
                  </div>
                </div>
              </div>

              {/* Safety & Trust Advisory */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#063B2A]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>AgriShield Buyer Safety Recommendations</span>
                </div>
                <ul className="text-[11px] text-gray-600 space-y-1 list-disc list-inside">
                  <li>Meet the farmer or arrange local pickup in a verified public location or farm gate.</li>
                  <li>Inspect produce freshness, quality and quantity before transferring final payment.</li>
                  <li>Contact the farmer directly via WhatsApp or phone call for fast inquiry.</li>
                </ul>
              </div>

              {/* Report Listing Trigger */}
              <div className="pt-2 flex items-center justify-between text-xs text-gray-500">
                <span>Listing ID: #{product.id}</span>
                <button
                  onClick={() => setReportModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-rose-600 hover:text-rose-700 font-bold hover:underline transition-colors"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>Report Suspicious Listing</span>
                </button>
              </div>

            </div>

          </div>

          {/* Right Column: Pricing, Quantity & Seller Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header & Price Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-950/10 shadow-soft space-y-6">
              
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  {product.category}
                </span>

                <h1 className="text-2xl sm:text-3xl font-black text-[#071A14] mt-3 leading-tight">
                  {product.name}
                </h1>

                <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1 font-semibold text-emerald-800">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{product.location}{product.district && product.location !== product.district ? `, ${product.district}` : ''}</span>
                  </span>
                  <span>•</span>
                  <span>{product.postedDate || 'Active today'}</span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="p-5 rounded-2xl bg-[#063B2A] text-white space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-semibold block">
                  Farmer Asking Price
                </span>
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-white">₹{product.price.toLocaleString('en-IN')}</span>
                    <span className="text-xs font-semibold text-emerald-200">/ {unitLabel}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${
                    isSold ? 'bg-rose-500/30 text-rose-300' : 'bg-emerald-500/30 text-emerald-300'
                  }`}>
                    {product.status || 'Available'}
                  </span>
                </div>
              </div>

              {/* Quantity Estimator */}
              {!isSold && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-700">Calculate Price for Desired Quantity:</span>
                    <span className="text-gray-500">Stock: {product.quantity} {unitLabel}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#F5F8F6] rounded-2xl border border-gray-200">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded-xl bg-white border border-gray-300 flex items-center justify-center font-black text-gray-700 hover:bg-emerald-50 active:scale-95 transition-all"
                      >
                        -
                      </button>
                      <span className="font-black text-sm text-[#063B2A] w-12 text-center">
                        {quantity} {unitLabel}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(maxAvailable, quantity + 1))}
                        className="w-8 h-8 rounded-xl bg-white border border-gray-300 flex items-center justify-center font-black text-gray-700 hover:bg-emerald-50 active:scale-95 transition-all"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 block font-semibold">Total Estimated</span>
                      <span className="text-base font-black text-emerald-700">
                        ₹{(product.price * quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Direct Contact Seller Card */}
            <SellerCard
              sellerId={product.sellerId || (product.seller ? product.seller.name : 'seller-default')}
              sellerName={product.sellerName || (product.seller ? product.seller.name : 'Kerala Cultivator')}
              sellerPhone={product.sellerPhone || (product.seller ? product.seller.phone : '+91 98471 23456')}
              sellerWhatsApp={product.sellerWhatsApp || '919847123456'}
              location={product.location}
              district={product.district}
              memberSince={product.sellerMemberSince || 'Member since 2024'}
              sellerBio={product.sellerBio || 'Direct producer of authentic Kerala agricultural goods.'}
              productName={product.name}
              listingId={product.id}
            />

          </div>

        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-emerald-950/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#063B2A]">
                  Related Agricultural Listings
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Explore other fresh harvests and farm goods from {product.district || 'Kerala'}
                </p>
              </div>

              <Link
                to="/marketplace"
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Report Modal */}
      {reportModalOpen && (
        <ReportListingModal
          listingId={product.id}
          productName={product.name}
          onClose={() => setReportModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductDetails;

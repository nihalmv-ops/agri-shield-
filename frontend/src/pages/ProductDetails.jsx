import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  User, 
  Heart, 
  ShieldCheck, 
  Phone, 
  Calendar, 
  CheckCircle, 
  ArrowLeft, 
  Share2, 
  Sparkles, 
  Truck, 
  Clock, 
  MessageCircle,
  ShoppingBag,
  Check
} from 'lucide-react';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import { sampleProducts } from '../data/mockData';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);

  // Find product by id, or default to the first
  const product = sampleProducts.find((p) => p.id === id) || sampleProducts[0];

  const relatedProducts = sampleProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const handleRequestOrder = (e) => {
    e.preventDefault();
    setRequestSuccess(true);
    setTimeout(() => {
      setRequestSuccess(false);
      setRequestModalOpen(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#F5F8F6] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6 text-xs text-gray-500">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 font-semibold text-[#063B2A] hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Marketplace</span>
          </button>
          
          <div className="flex items-center gap-2">
            <span>Marketplace</span>
            <span>/</span>
            <span className="text-gray-400">{product.category}</span>
            <span>/</span>
            <span className="font-semibold text-gray-800">{product.name}</span>
          </div>
        </div>

        {/* Main Product Showcase Card */}
        <div className="bg-white rounded-3xl border border-emerald-950/10 shadow-soft-lg p-6 sm:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Large Image & Gallery (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-4/3 border border-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {product.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-[#063B2A] text-emerald-300 shadow-md">
                    {product.badge}
                  </span>
                )}

                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  aria-label="Toggle wishlist"
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isFavorite
                      ? 'bg-rose-50 text-rose-500 shadow-md'
                      : 'bg-white/80 backdrop-blur-md text-gray-500 hover:text-rose-500 hover:bg-white shadow-sm'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Quality & Trust Badges */}
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <p className="font-bold text-[#063B2A]">100% Organic</p>
                  <p className="text-[10px] text-gray-500">Lab Tested Free</p>
                </div>
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                  <Truck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <p className="font-bold text-[#063B2A]">Farm Direct</p>
                  <p className="text-[10px] text-gray-500">Zero Middlemen</p>
                </div>
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                  <Clock className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <p className="font-bold text-[#063B2A]">Fresh Harvest</p>
                  <p className="text-[10px] text-gray-500">{product.harvestDate || 'Recently Picked'}</p>
                </div>
              </div>
            </div>

            {/* Right: Product Information & Buyer Actions (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  {product.category}
                </span>
                
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
                  {product.name}
                </h1>

                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    {product.location}
                  </span>
                  <span>•</span>
                  <span>Stock Available: <strong className="text-gray-900">{product.quantityAvailable} {product.unit}</strong></span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-emerald-800 font-semibold block">Farmer Direct Price</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-3xl font-extrabold text-[#063B2A]">₹{product.price}</span>
                    <span className="text-xs font-semibold text-gray-600">/ {product.unit}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-gray-500 block">Total Est. for {quantity} {product.unit}</span>
                  <span className="text-lg font-bold text-emerald-700">₹{product.price * quantity}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700">About This Crop</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Crop Highlights */}
              {product.features && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-700">Quality Highlights</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                    {product.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Verified Seller Box */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={product.seller?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"}
                    alt={product.seller?.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-bold text-gray-900">{product.seller?.name || 'Ramesh Kumar'}</p>
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <p className="text-xs text-gray-500">{product.seller?.farmName || 'Kerala Organic Growers'}</p>
                    <p className="text-[11px] text-emerald-700 font-medium">Verified Local Cultivator</p>
                  </div>
                </div>

                <div className="text-right">
                  <a
                    href={`tel:${product.seller?.phone || '+919847123456'}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-xl text-xs font-semibold text-gray-700 hover:text-emerald-700 hover:border-emerald-500 shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Call Farmer</span>
                  </a>
                </div>
              </div>

              {/* Quantity Counter & CTA Buttons */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-gray-700">Select Quantity ({product.unit}):</span>
                  <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 hover:bg-gray-100 text-gray-600 font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 font-bold text-xs text-gray-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 hover:bg-gray-100 text-gray-600 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button
                    variant="outlineDark"
                    size="md"
                    className="w-full rounded-full"
                    icon={MessageCircle}
                    onClick={() => setRequestModalOpen(true)}
                  >
                    Contact Seller
                  </Button>

                  <Button
                    variant="primary"
                    size="md"
                    className="w-full bg-[#10B981] hover:bg-[#0ea371] text-white rounded-full font-bold shadow-glow-emerald"
                    icon={ShoppingBag}
                    onClick={() => setRequestModalOpen(true)}
                  >
                    Buy / Request Crop
                  </Button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Related Products */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-[#063B2A]">
            More From Local Kerala Farms
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>

      </div>

      {/* Request Modal */}
      {requestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-emerald-900/10 space-y-4">
            <h3 className="text-lg font-bold text-[#063B2A]">
              Request Order from {product.seller?.name}
            </h3>
            <p className="text-xs text-gray-600">
              Submit your direct crop request. The farmer will confirm delivery time and payment method (cash on delivery or UPI).
            </p>

            {requestSuccess ? (
              <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-2">
                <Check className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-900 text-sm">Request Placed Successfully!</h4>
                <p className="text-xs text-emerald-700">
                  Order request for {quantity} {product.unit} of {product.name} has been forwarded to {product.seller?.name}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRequestOrder} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    defaultValue="Kavitha Nair"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Delivery Address & Pincode</label>
                  <textarea
                    rows={2}
                    defaultValue="Hill View Villa, Civil Station Road, Kozhikode, 673020"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue="+91 94471 22889"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white"
                  />
                </div>

                <div className="p-3 bg-gray-50 rounded-xl text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Requested:</span>
                    <strong>{quantity} {product.unit}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Est. Total Payable:</span>
                    <strong className="text-emerald-800">₹{product.price * quantity}</strong>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setRequestModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    className="bg-[#10B981] text-white"
                  >
                    Confirm Request
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;


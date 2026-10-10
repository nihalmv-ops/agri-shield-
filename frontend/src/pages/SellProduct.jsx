import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle, 
  DollarSign, 
  Camera, 
  MessageSquare,
  PackagePlus,
  Leaf
} from 'lucide-react';
import ProductForm from '../components/marketplace/ProductForm';
import { saveProduct } from '../utils/marketplaceStorage';

const SellProduct = () => {
  const navigate = useNavigate();
  const [successProduct, setSuccessProduct] = useState(null);

  const handleProductSubmit = (productData) => {
    const created = saveProduct(productData);
    setSuccessProduct(created);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F5F8F6] py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6 text-xs text-gray-500">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 font-bold text-[#063B2A] hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center gap-2">
            <Link to="/marketplace" className="hover:underline text-gray-600">Marketplace</Link>
            <span>/</span>
            <span className="font-bold text-[#063B2A]">Post Agricultural Listing</span>
          </div>
        </div>

        {/* Success Modal / Banner */}
        {successProduct ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-300 shadow-soft-lg text-center space-y-6 animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h1 className="text-2xl sm:text-3xl font-black text-[#063B2A]">
                Listing Posted Successfully!
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Your agricultural listing for <strong className="text-gray-900 font-bold">{successProduct.name}</strong> is now live on AgriShield. Buyers across Kerala can now view your listing and contact you directly via WhatsApp or phone call.
              </p>
            </div>

            <div className="p-4 bg-[#F5F8F6] rounded-2xl border border-gray-200 max-w-md mx-auto text-left flex items-center gap-4">
              <img
                src={successProduct.images[0] || successProduct.image}
                alt={successProduct.name}
                className="w-16 h-16 rounded-xl object-cover shrink-0 border border-gray-200"
              />
              <div className="overflow-hidden">
                <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {successProduct.category}
                </span>
                <h4 className="text-sm font-bold text-gray-900 truncate mt-0.5">{successProduct.name}</h4>
                <p className="text-xs font-black text-[#063B2A]">
                  ₹{successProduct.price} / {successProduct.priceUnit || 'kg'} • {successProduct.location}
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to={`/marketplace/${successProduct.id}`}
                className="w-full sm:w-auto px-6 py-3 bg-[#063B2A] hover:bg-emerald-950 text-white rounded-2xl text-xs font-bold transition-all shadow-sm text-center"
              >
                View Live Listing
              </Link>
              <Link
                to="/my-listings"
                className="w-full sm:w-auto px-6 py-3 bg-[#10B981] hover:bg-[#0ea371] text-white rounded-2xl text-xs font-bold transition-all shadow-glow-emerald text-center"
              >
                Manage in My Listings
              </Link>
              <button
                onClick={() => setSuccessProduct(null)}
                className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-2xl text-xs font-bold transition-all text-center"
              >
                Post Another Product
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* Header Banner */}
            <div className="bg-[#063B2A] rounded-3xl p-6 sm:p-10 text-white shadow-soft relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
                <Leaf className="w-64 h-64 text-emerald-400" />
              </div>
              <div className="relative z-10 max-w-xl space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  <PackagePlus className="w-3.5 h-3.5" />
                  <span>Direct Agricultural Marketplace</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                  Post Your Agricultural Listing
                </h1>
                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                  List your fresh harvest, seeds, organic fertilizers, equipment, or dairy products for free. Connect with verified buyers directly with zero commission.
                </p>
              </div>
            </div>

            {/* Seller Best Practices Tips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-emerald-950/10 shadow-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#063B2A]">Clear Natural Photos</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">High-resolution natural daylight photos attract 3x more buyer inquiries.</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-emerald-950/10 shadow-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#063B2A]">Transparent Pricing</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">State fair per-kg or per-unit prices to expedite deal closures.</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-emerald-950/10 shadow-xs flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#063B2A]">Direct WhatsApp</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Buyers message directly to your phone. Zero middleman fees.</p>
                </div>
              </div>
            </div>

            {/* The Form Component */}
            <ProductForm
              onSubmit={handleProductSubmit}
              submitLabel="Publish Listing Free"
            />

          </div>
        )}

      </div>
    </div>
  );
};

export default SellProduct;

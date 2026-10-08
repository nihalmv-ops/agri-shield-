import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShoppingBag, 
  MapPin, 
  User, 
  Calendar, 
  Tag, 
  ShieldCheck, 
  CheckCircle2, 
  EyeOff, 
  Eye, 
  Check, 
  Printer 
} from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import { initialProducts } from '../../data/products';

const ProductDetails = () => {
  const { id } = useParams();
  const product = initialProducts.find(p => p.id === id) || initialProducts[0];

  const [status, setStatus] = useState(product.status);
  const [toastMessage, setToastMessage] = useState('');

  const handleUpdateStatus = (newStatus) => {
    setStatus(newStatus);
    setToastMessage(`Product listing set to "${newStatus}"`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#071A14] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="p-2.5 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:text-[#063B2A] hover:bg-emerald-50 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-extrabold text-gray-500 uppercase">
                {product.id}
              </span>
              <StatusBadge status={status} />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#063B2A] tracking-tight">
              {product.name} • Listing Quality Audit
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {status !== 'Active' && (
            <button
              onClick={() => handleUpdateStatus('Active')}
              className="px-4 py-2.5 bg-[#10B981] hover:bg-emerald-600 text-white rounded-2xl text-xs font-bold shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Approve Listing</span>
            </button>
          )}

          {status === 'Active' && (
            <button
              onClick={() => handleUpdateStatus('Hidden')}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl text-xs font-bold shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              <EyeOff className="w-4 h-4" />
              <span>Hide Listing</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Product Showcase */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-emerald-950/10 shadow-soft overflow-hidden">
            <div className="relative h-80 sm:h-96 w-full bg-gray-900">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#071A14]/85 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold border border-emerald-500/30">
                {product.category}
              </div>
              <div className="absolute top-4 right-4 bg-[#071A14]/85 backdrop-blur-md px-3.5 py-1 rounded-full text-[#34D399] text-sm font-mono font-black border border-emerald-500/30">
                {product.price}
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <h2 className="text-2xl font-black text-[#071A14]">
                {product.name}
              </h2>

              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed bg-[#F5F8F6] p-4 rounded-2xl border border-gray-100">
                {product.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
                <div className="bg-[#F5F8F6] p-3 rounded-2xl">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Available Stock</span>
                  <span className="font-bold text-gray-900 text-sm">{product.quantity}</span>
                </div>
                <div className="bg-[#F5F8F6] p-3 rounded-2xl">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Category</span>
                  <span className="font-bold text-gray-900 text-sm">{product.category}</span>
                </div>
                <div className="bg-[#F5F8F6] p-3 rounded-2xl">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Producer</span>
                  <span className="font-bold text-gray-900 text-sm">{product.seller}</span>
                </div>
                <div className="bg-[#F5F8F6] p-3 rounded-2xl">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Listed Date</span>
                  <span className="font-bold text-gray-900 text-sm">{product.postedDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Moderation & Quality Checklist */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-emerald-950/10 shadow-soft space-y-4">
            <h3 className="font-extrabold text-[#063B2A] text-base pb-3 border-b border-gray-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#10B981]" />
              Eco-Certification Audit
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-emerald-50 text-emerald-900 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Verified Forest Border Farmer Holding</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-emerald-50 text-emerald-900 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Direct Produce (Zero Middleman Mark-up)</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-emerald-50 text-emerald-900 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Ethical Harvest (Protected Species Habitat Safe)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2">
              <label className="block text-xs font-bold text-gray-700">
                Change Moderation State
              </label>
              <select
                value={status}
                onChange={(e) => handleUpdateStatus(e.target.value)}
                className="w-full text-xs p-3 rounded-2xl bg-[#F5F8F6] border border-gray-200 font-semibold focus:outline-none focus:border-emerald-300"
              >
                <option value="Active">Active (Public Marketplace)</option>
                <option value="Hidden">Hidden (Temporarily Paused)</option>
                <option value="Under Review">Under Review (Quality Flag)</option>
              </select>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ProductDetails;

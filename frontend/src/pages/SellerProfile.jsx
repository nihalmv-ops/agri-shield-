import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Calendar, 
  ShieldCheck, 
  ArrowLeft, 
  Package, 
  ExternalLink,
  Sparkles,
  Share2
} from 'lucide-react';
import ProductGrid from '../components/marketplace/ProductGrid';
import { getProducts, getSellerProducts } from '../utils/marketplaceStorage';
import Button from '../components/Button';

const SellerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sellerProducts, setSellerProducts] = useState([]);
  const [sellerInfo, setSellerInfo] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const allProducts = getProducts();
    // Try to find products by sellerId or seller name
    let matching = getSellerProducts(id);
    if (matching.length === 0) {
      matching = allProducts.filter((p) => 
        String(p.sellerId).toLowerCase() === String(id).toLowerCase() ||
        String(p.sellerName).toLowerCase() === String(id).toLowerCase() ||
        (p.seller && String(p.seller.name).toLowerCase() === String(id).toLowerCase())
      );
    }

    setSellerProducts(matching);

    if (matching.length > 0) {
      const ref = matching[0];
      setSellerInfo({
        id: ref.sellerId || id,
        name: ref.sellerName || (ref.seller ? ref.seller.name : 'Kerala Farmer'),
        phone: ref.sellerPhone || (ref.seller ? ref.seller.phone : '+91 98471 23456'),
        whatsApp: ref.sellerWhatsApp || '919847123456',
        location: ref.location || 'Kerala',
        district: ref.district || 'Kerala',
        memberSince: ref.sellerMemberSince || 'Member since 2024',
        bio: ref.sellerBio || (ref.seller ? ref.seller.farmName : 'Local Kerala farmer committed to sustainable organic cultivation and fresh harvest sharing.')
      });
    } else {
      // Default placeholder if seller has no active listings
      setSellerInfo({
        id,
        name: id.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        phone: '+91 98471 23456',
        whatsApp: '919847123456',
        location: 'Kerala',
        district: 'Kerala',
        memberSince: 'Member since 2025',
        bio: 'Agricultural seller and cultivator on AgriShield.'
      });
    }
  }, [id]);

  if (!sellerInfo) {
    return (
      <div className="min-h-screen bg-[#F5F8F6] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  // Pre-filled WhatsApp link
  const cleanPhone = (sellerInfo.whatsApp || sellerInfo.phone || '').replace(/\D/g, '');
  const whatsAppUrl = cleanPhone 
    ? `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(`Hello ${sellerInfo.name}, I found your profile on AgriShield. I am interested in your agricultural listings.`)}`
    : null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const activeCount = sellerProducts.filter((p) => p.status === 'Available').length;

  return (
    <div className="min-h-screen bg-[#F5F8F6] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
            <span className="text-gray-400">Seller Profile</span>
            <span>/</span>
            <span className="font-bold text-[#063B2A]">{sellerInfo.name}</span>
          </div>
        </div>

        {/* Seller Profile Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-950/10 shadow-soft mb-10 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* Left: Avatar & Meta */}
            <div className="flex items-start sm:items-center gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-emerald-100 text-[#063B2A] flex items-center justify-center font-black text-3xl sm:text-4xl border-2 border-emerald-300 shadow-soft shrink-0">
                {sellerInfo.name.charAt(0)}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-black text-[#071A14]">
                    {sellerInfo.name}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Seller</span>
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                  <span className="flex items-center gap-1 font-semibold text-emerald-800">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{sellerInfo.location}{sellerInfo.district && sellerInfo.location !== sellerInfo.district ? `, ${sellerInfo.district}` : ''}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{sellerInfo.memberSince}</span>
                  </span>
                </div>

                {sellerInfo.bio && (
                  <p className="text-xs sm:text-sm text-gray-600 max-w-2xl pt-1 leading-relaxed">
                    "{sellerInfo.bio}"
                  </p>
                )}
              </div>
            </div>

            {/* Right: Contact Actions */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
              {whatsAppUrl && (
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              )}

              {sellerInfo.phone && (
                <a
                  href={`tel:${sellerInfo.phone}`}
                  className="px-5 py-3 bg-white hover:bg-emerald-50 text-[#063B2A] border border-gray-300 hover:border-emerald-500 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Call: {sellerInfo.phone}</span>
                </a>
              )}

              <button
                onClick={handleShare}
                className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-900 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Profile Link Copied!' : 'Share Profile'}</span>
              </button>
            </div>

          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-gray-100 text-xs">
            <div className="p-3 bg-[#F5F8F6] rounded-2xl">
              <span className="text-gray-400 block text-[10px] font-semibold">Total Listings</span>
              <strong className="text-base text-[#063B2A] font-black">{sellerProducts.length}</strong>
            </div>
            <div className="p-3 bg-[#F5F8F6] rounded-2xl">
              <span className="text-gray-400 block text-[10px] font-semibold">Active for Sale</span>
              <strong className="text-base text-emerald-700 font-black">{activeCount}</strong>
            </div>
            <div className="p-3 bg-[#F5F8F6] rounded-2xl">
              <span className="text-gray-400 block text-[10px] font-semibold">Primary District</span>
              <strong className="text-base text-[#063B2A] font-black">{sellerInfo.district}</strong>
            </div>
            <div className="p-3 bg-[#F5F8F6] rounded-2xl">
              <span className="text-gray-400 block text-[10px] font-semibold">Response Time</span>
              <strong className="text-base text-emerald-700 font-black">Within 1 hour</strong>
            </div>
          </div>
        </div>

        {/* Listings Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#063B2A]">
                All Listings by {sellerInfo.name}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Browse available farm produce, grains, and equipment directly from this cultivator
              </p>
            </div>

            <span className="text-xs font-bold text-gray-500">
              {sellerProducts.length} {sellerProducts.length === 1 ? 'Product' : 'Products'} Listed
            </span>
          </div>

          {sellerProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-emerald-950/10 shadow-soft max-w-md mx-auto space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                <Package className="w-7 h-7" />
              </div>
              <h3 className="text-base font-black text-[#063B2A]">No Active Listings</h3>
              <p className="text-xs text-gray-500">
                This seller does not currently have any active listings available. Check back soon for new seasonal harvests.
              </p>
              <div className="pt-2">
                <Button to="/marketplace" variant="outlineDark" size="sm">
                  Explore Other Produce
                </Button>
              </div>
            </div>
          ) : (
            <ProductGrid products={sellerProducts} />
          )}
        </div>

      </div>
    </div>
  );
};

export default SellerProfile;

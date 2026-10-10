import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Calendar, 
  Shield, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import Button from '../Button';
import ContactModal from './ContactModal';

const SellerCard = ({
  sellerId = 'seller-default',
  sellerName = 'Local Farmer',
  sellerPhone = '+91 98471 23456',
  sellerWhatsApp = '919847123456',
  location = 'Wayanad',
  district = 'Wayanad',
  memberSince = 'Member since 2024',
  sellerBio,
  productName = 'Product',
  listingId = 'prod-001',
  className = ''
}) => {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Generate WhatsApp Direct URL
  const cleanPhone = (sellerWhatsApp || sellerPhone || '').replace(/\D/g, '');
  const messageText = encodeURIComponent(
    `Hello ${sellerName}, I found your ${productName} listing (Ref: #${listingId}) on AgriShield. Is it still available?`
  );
  const whatsAppUrl = cleanPhone 
    ? `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${messageText}`
    : null;

  return (
    <>
      <div className={`bg-white rounded-3xl p-5 sm:p-6 border border-emerald-950/10 shadow-soft space-y-5 ${className}`}>
        
        {/* Seller Identification */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#063B2A] flex items-center justify-center font-black text-lg border border-emerald-200 shadow-xs">
              {sellerName.charAt(0)}
            </div>
            <div>
              <Link 
                to={`/seller/${sellerId}`}
                className="text-base font-black text-[#071A14] hover:text-emerald-700 transition-colors flex items-center gap-1.5 group"
              >
                <span>{sellerName}</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
              </Link>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  <span>{location}{district && location !== district ? `, ${district}` : ''}</span>
                </span>
                <span>•</span>
                <span>{memberSince}</span>
              </div>
            </div>
          </div>
        </div>

        {sellerBio && (
          <p className="text-xs text-gray-600 leading-relaxed italic bg-[#F5F8F6] p-3 rounded-2xl border border-gray-100">
            "{sellerBio}"
          </p>
        )}

        {/* Action Buttons */}
        <div className="space-y-2.5">
          {whatsAppUrl ? (
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          ) : (
            <button
              disabled
              className="w-full py-3 px-4 bg-gray-100 text-gray-400 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 cursor-not-allowed"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Not Configured</span>
            </button>
          )}

          {sellerPhone ? (
            <a
              href={`tel:${sellerPhone}`}
              className="w-full py-3 px-4 bg-[#063B2A] hover:bg-emerald-900 text-white rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98"
            >
              <Phone className="w-4 h-4 text-emerald-300" />
              <span>Call Seller ({sellerPhone})</span>
            </a>
          ) : (
            <button
              disabled
              className="w-full py-3 px-4 bg-gray-100 text-gray-400 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 cursor-not-allowed"
            >
              <Phone className="w-4 h-4" />
              <span>Phone Hidden by Seller</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setContactModalOpen(true)}
            className="w-full py-2.5 px-4 bg-[#F5F8F6] hover:bg-emerald-50 text-[#063B2A] border border-emerald-950/10 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <span>Send Direct In-App Message</span>
          </button>
        </div>

        {/* Safety Tips Note */}
        <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-2xl text-[11px] text-amber-900 space-y-1">
          <p className="font-extrabold flex items-center gap-1.5 text-amber-950">
            <Shield className="w-3.5 h-3.5 text-amber-600" />
            <span>AgriShield Direct Trading Safety:</span>
          </p>
          <p className="leading-snug text-gray-600">
            Meet the seller in person or inspect produce before paying. Direct peer-to-peer agricultural transactions.
          </p>
        </div>

      </div>

      {/* In-app Message Modal */}
      {contactModalOpen && (
        <ContactModal
          sellerName={sellerName}
          productName={productName}
          listingId={listingId}
          onClose={() => setContactModalOpen(false)}
        />
      )}
    </>
  );
};

export default SellerCard;

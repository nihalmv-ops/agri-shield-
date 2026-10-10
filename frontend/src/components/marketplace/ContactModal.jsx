import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquare, Phone, User } from 'lucide-react';

const ContactModal = ({ sellerName, productName, listingId, onClose }) => {
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [message, setMessage] = useState(
    `Hi ${sellerName}, I am interested in buying ${productName} (Ref: #${listingId}). Is the listed quantity still available for pickup?`
  );
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-emerald-900/10 text-[#071A14] relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {sent ? (
          <div className="py-8 text-center space-y-3 animate-fadeIn">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-[#063B2A]">
              Message Dispatched to {sellerName}!
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
              Your inquiry has been relayed. The farmer will reach out to your provided phone number shortly.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-[#063B2A] flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#071A14]">
                  Contact {sellerName}
                </h3>
                <p className="text-xs text-gray-500">
                  Direct message regarding <strong className="text-emerald-800">{productName}</strong>
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Your Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F5F8F6] text-xs font-medium rounded-2xl border border-gray-200 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Your Phone / WhatsApp Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F5F8F6] text-xs font-medium rounded-2xl border border-gray-200 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Message / Inquiry
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 bg-[#F5F8F6] text-xs font-medium rounded-2xl border border-gray-200 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-2xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#063B2A] hover:bg-emerald-900 text-white text-xs font-black rounded-2xl shadow-md transition-all active:scale-95 flex items-center gap-2"
                >
                  <Send className="w-4 h-4 text-emerald-300" />
                  <span>Send Inquiry</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default ContactModal;


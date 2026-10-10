import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { reportListing } from '../../utils/marketplaceStorage';

const ReportListingModal = ({ listingId, productName, onClose }) => {
  const [reason, setReason] = useState('Incorrect information');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const reasons = [
    'Incorrect information',
    'Suspicious listing',
    'Misleading price',
    'Prohibited product',
    'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    reportListing({
      listingId,
      productName,
      reason,
      description
    });
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-rose-200 text-[#071A14] relative">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-6 text-center space-y-3 animate-fadeIn">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-[#063B2A]">
              Report Submitted Successfully
            </h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
              Thank you for keeping the AgriShield agricultural marketplace trustworthy and safe. This listing has been queued for verification.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-11 h-11 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-rose-950">
                  Report Suspicious Listing
                </h3>
                <p className="text-xs text-gray-500">
                  Item: <strong className="text-gray-800">{productName}</strong> (#{listingId})
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Select Violation Reason
                </label>
                <div className="space-y-1.5">
                  {reasons.map((r) => (
                    <label
                      key={r}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                        reason === r
                          ? 'bg-rose-50 border-rose-300 text-rose-950 font-bold'
                          : 'bg-[#F5F8F6] border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="reportReason"
                        value={r}
                        checked={reason === r}
                        onChange={(e) => setReason(e.target.value)}
                        className="text-rose-600 focus:ring-0"
                      />
                      <span>{r}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Additional Details / Evidence
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain why this listing is misleading, suspicious, or in violation..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 bg-[#F5F8F6] text-xs font-medium rounded-2xl border border-gray-200 focus:outline-none focus:border-rose-400"
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
                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black rounded-2xl shadow-md transition-all active:scale-95"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default ReportListingModal;


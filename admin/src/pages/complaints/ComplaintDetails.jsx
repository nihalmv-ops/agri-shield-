import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  IndianRupee, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Check, 
  Printer, 
  Send, 
  ShieldCheck, 
  Image as ImageIcon 
} from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import { initialComplaints } from '../../data/complaints';

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const complaintData = initialComplaints.find(c => c.id === id) || initialComplaints[0];

  const [status, setStatus] = useState(complaintData.status);
  const [officerNotes, setOfficerNotes] = useState(complaintData.officerNotes || '');
  const [sanctionAmount, setSanctionAmount] = useState('₹45,000');
  const [toastMessage, setToastMessage] = useState('');

  const handleSaveUpdate = (e) => {
    e.preventDefault();
    setToastMessage('Officer decision and status successfully updated.');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleApproveCompensation = () => {
    setStatus('Verified');
    setToastMessage(`Sanction of ${sanctionAmount} dispatched to State Wildlife Treasury.`);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleMarkResolved = () => {
    setStatus('Resolved');
    setToastMessage('Case marked Resolved. SMS notification sent to farmer.');
    setTimeout(() => setToastMessage(''), 3500);
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

      {/* Breadcrumb Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/complaints"
            className="p-2.5 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:text-[#063B2A] hover:bg-emerald-50 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-extrabold text-gray-500 uppercase">
                Case #{complaintData.id}
              </span>
              <StatusBadge status={status} />
              <StatusBadge priority={complaintData.priority} size="xs" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#063B2A] tracking-tight">
              {complaintData.type} Grievance
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="p-2.5 bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl text-gray-700 text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print Docket</span>
          </button>
          <button
            onClick={handleMarkResolved}
            className="px-4 py-2.5 bg-[#10B981] hover:bg-emerald-600 text-white rounded-2xl text-xs font-extrabold shadow-md transition-all active:scale-95 flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Mark Case Resolved</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Incident Details & Photographic Proof */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Incident Description & Photographic Evidence */}
          <div className="bg-white rounded-3xl border border-emerald-950/10 shadow-soft overflow-hidden p-6 space-y-6">
            <div>
              <h3 className="font-extrabold text-[#063B2A] text-lg mb-2">
                Incident Report & Citizen Statement
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed bg-[#F5F8F6] p-4 rounded-2xl border border-gray-100">
                "{complaintData.description}"
              </p>
            </div>

            {/* Photographic Attachment */}
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <ImageIcon className="w-4 h-4 text-[#10B981]" />
                <span>Submitted Photographic Verification</span>
              </div>
              <div className="relative rounded-2xl overflow-hidden bg-gray-900 border border-gray-200 h-72 sm:h-80">
                <img
                  src={complaintData.image}
                  alt="Incident site evidence"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-[#071A14]/90 backdrop-blur-md px-3 py-1 rounded-xl text-white text-[11px] font-mono border border-emerald-500/40">
                  GeoTag: {complaintData.location} • Submitted: {complaintData.date} {complaintData.time}
                </div>
              </div>
            </div>

            {/* Case Parameters */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-2">
              <div className="bg-[#F5F8F6] p-3 rounded-2xl">
                <span className="text-gray-400 block text-[10px]">Incident Category</span>
                <span className="font-bold text-gray-900">{complaintData.type}</span>
              </div>
              <div className="bg-[#F5F8F6] p-3 rounded-2xl">
                <span className="text-gray-400 block text-[10px]">Division / Range</span>
                <span className="font-bold text-gray-900">{complaintData.location}</span>
              </div>
              <div className="bg-[#F5F8F6] p-3 rounded-2xl">
                <span className="text-gray-400 block text-[10px]">Survey Zone</span>
                <span className="font-bold text-gray-900">{complaintData.subLocation || 'Sector 4'}</span>
              </div>
            </div>
          </div>

          {/* Compensation Assessment Dossier */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-950/10 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-[#063B2A] text-base">
                  State Wildlife Ex-Gratia & Relief Compensation
                </h3>
              </div>
              <span className="font-mono font-black text-emerald-700 text-lg">
                {complaintData.compensationClaimed || '₹45,000'}
              </span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Under the Kerala Forest & Wildlife Department rules (Compensation for Crop/Livestock Loss 2026), verified elephant intrusions qualify for urgent ex-gratia relief up to ₹75,000 per hectare within 7 working days.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleApproveCompensation}
                className="px-5 py-2.5 bg-gradient-to-r from-[#10B981] to-[#063B2A] hover:opacity-95 text-white font-extrabold text-xs rounded-2xl shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Sanction Compensation Claim</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Col: Reporter Details & Officer Action Box */}
        <div className="space-y-6">
          
          {/* Citizen / Farmer Profile Card */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-950/10 shadow-soft space-y-4">
            <h3 className="font-extrabold text-[#063B2A] text-base pb-3 border-b border-gray-100 flex items-center gap-2">
              <User className="w-4 h-4 text-[#10B981]" />
              Reporter Dossier
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Complainant Name</span>
                <span className="font-black text-gray-900 text-sm">{complaintData.reporter}</span>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Verified Phone</span>
                <span className="font-mono font-bold text-gray-800 flex items-center gap-1.5 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" /> {complaintData.phone}
                </span>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Village & Panchayat</span>
                <span className="font-medium text-gray-800 flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {complaintData.location}
                </span>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Report Timestamp</span>
                <span className="font-medium text-gray-800 flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" /> {complaintData.date} at {complaintData.time}
                </span>
              </div>
            </div>
          </div>

          {/* Officer Verification & Decision Form */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-950/10 shadow-soft space-y-5">
            <div>
              <h3 className="font-extrabold text-[#063B2A] text-base">
                Officer Action & Adjudication
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Update investigation status and assign forest surveyors
              </p>
            </div>

            <form onSubmit={handleSaveUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Grievance Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full text-xs p-3 rounded-2xl bg-[#F5F8F6] border border-gray-200 font-semibold focus:outline-none focus:border-emerald-300"
                >
                  <option value="Pending">Pending</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Verified">Verified (Survey Completed)</option>
                  <option value="Resolved">Resolved / Closed</option>
                  <option value="Rejected">Rejected (Ineligible)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Sanction Amount / Relief Quote
                </label>
                <input
                  type="text"
                  value={sanctionAmount}
                  onChange={(e) => setSanctionAmount(e.target.value)}
                  className="w-full text-xs p-3 rounded-2xl bg-[#F5F8F6] border border-gray-200 font-mono font-bold text-[#063B2A] focus:outline-none focus:border-emerald-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Field Investigation Remarks
                </label>
                <textarea
                  rows={4}
                  value={officerNotes}
                  onChange={(e) => setOfficerNotes(e.target.value)}
                  placeholder="Record GPS survey details, boundary fence verification, or compensation rationale..."
                  className="w-full text-xs p-3 rounded-2xl bg-[#F5F8F6] border border-gray-200 focus:outline-none focus:border-emerald-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#063B2A] hover:bg-emerald-900 text-white font-extrabold text-xs rounded-2xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Save Officer Docket</span>
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ComplaintDetails;

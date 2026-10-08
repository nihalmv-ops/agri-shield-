import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  MessageSquareWarning, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Save, 
  CheckCheck,
  Shield,
  Layers
} from 'lucide-react';
import StatusBadge from '../../components/officer/StatusBadge';
import Button from '../../components/Button';
import { complaints } from '../../data/complaints';

const OfficerComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find complaint by ID or fallback
  const initialComplaint = complaints.find(c => c.id === id) || complaints[0];

  const [complaint, setComplaint] = useState(initialComplaint);
  const [selectedStatus, setSelectedStatus] = useState(initialComplaint.status);
  const [officerNotes, setOfficerNotes] = useState(initialComplaint.officerNotes || 'Field team inspection dispatched to verify crop destruction.');
  const [toast, setToast] = useState('');

  const handleUpdateComplaint = (e) => {
    e.preventDefault();
    setComplaint({
      ...complaint,
      status: selectedStatus,
      officerNotes: officerNotes
    });
    setToast(`Complaint #${complaint.id} updated to ${selectedStatus}! Citizen notified via SMS.`);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/officer/complaints"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#063B2A] hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Community Complaints</span>
        </Link>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Ticket #{complaint.id}</span>
          <span>•</span>
          <StatusBadge status={complaint.status} size="xs" />
        </div>
      </div>

      {toast && (
        <div className="p-3.5 bg-emerald-900 text-white text-xs font-bold rounded-2xl flex items-center gap-2 shadow-lg animate-fadeIn border border-emerald-500/40">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Main Complaint Details Container (Prompt Section 13 Requirement) */}
      <div className="bg-white rounded-3xl border border-emerald-950/10 shadow-soft p-6 sm:p-8 space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Uploaded Complaint Image & Ticket Dossier (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                Grievance Ticket #{complaint.id}
              </span>
              <h2 className="text-2xl font-black text-[#063B2A] mt-2">
                {complaint.type}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Submitted by {complaint.reportedBy} on {complaint.date}
              </p>
            </div>

            {/* Uploaded Complaint Image */}
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-gray-700 block">
                Citizen Submitted Site Photo / Evidence:
              </span>
              <div className="relative rounded-3xl overflow-hidden bg-gray-100 aspect-16/10 border border-gray-200 shadow-sm">
                <img
                  src={complaint.image}
                  alt={complaint.type}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-medium">
                  📷 Field Damage Photo
                </div>
              </div>
            </div>

            {/* Compensation & Crop Loss Highlights */}
            {complaint.compensationClaimed && (
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-gray-600 block">Compensation Requested:</span>
                  <strong className="text-emerald-900 font-black text-lg">
                    {complaint.compensationClaimed}
                  </strong>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 block">Relief Program:</span>
                  <span className="font-semibold text-emerald-800">Govt Wildlife Crop Fund</span>
                </div>
              </div>
            )}

            {/* Ticket Progress History */}
            {complaint.history && (
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-extrabold text-gray-800">Audit Trail:</h4>
                <div className="space-y-1.5 text-xs text-gray-600">
                  {complaint.history.map((step, idx) => (
                    <div key={idx} className="p-2.5 bg-gray-50 rounded-xl flex items-center justify-between">
                      <span>{step.step}</span>
                      <span className="text-[11px] text-gray-400">{step.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Complaint Details Table + Status Selector + Officer Notes (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Field Specification (Prompt Section 13) */}
            <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-200/80 space-y-3.5 text-xs">
              <h3 className="text-sm font-black text-[#063B2A] pb-2 border-b border-gray-200">
                Complaint Information
              </h3>

              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-500 font-semibold">Complaint Type:</span>
                <strong className="text-gray-900">{complaint.type}</strong>
              </div>

              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-500 font-semibold">Reported By:</span>
                <strong className="text-gray-900">{complaint.reportedBy}</strong>
              </div>

              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-500 font-semibold">Phone:</span>
                <strong className="text-gray-900 font-mono">{complaint.phone}</strong>
              </div>

              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-500 font-semibold">Location:</span>
                <strong className="text-gray-900">{complaint.location}</strong>
              </div>

              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-500 font-semibold">Reported Date:</span>
                <strong className="text-gray-900">{complaint.date}</strong>
              </div>

              <div className="py-1">
                <span className="text-gray-500 font-semibold block mb-1">Description:</span>
                <p className="text-gray-700 bg-white p-3 rounded-xl border border-gray-200 leading-relaxed">
                  {complaint.description}
                </p>
              </div>

              <div className="flex justify-between items-center pt-1">
                <span className="text-gray-500 font-semibold">Current Status:</span>
                <StatusBadge status={complaint.status} />
              </div>
            </div>

            {/* Officer Action Form (Status Selector & Notes - Prompt Section 13) */}
            <form onSubmit={handleUpdateComplaint} className="space-y-4 text-xs">
              
              {/* Status Selector */}
              <div>
                <label className="block font-bold text-gray-700 mb-1.5">
                  Update Investigation Status *
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-bold text-gray-800"
                >
                  <option value="Pending">Pending</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Verified">Verified</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              {/* Officer Notes */}
              <div>
                <label className="block font-bold text-gray-700 mb-1.5">
                  Officer Notes &amp; Resolution Assessment *
                </label>
                <textarea
                  rows={4}
                  value={officerNotes}
                  onChange={(e) => setOfficerNotes(e.target.value)}
                  placeholder="Record verification inspection notes, fence repair order, or DBT compensation sanction..."
                  className="w-full text-xs p-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 leading-relaxed"
                  required
                />
              </div>

              {/* Update Button */}
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full bg-[#10B981] hover:bg-[#0ea371] text-white font-extrabold rounded-full py-3 shadow-glow-emerald"
                icon={CheckCheck}
              >
                Update Complaint
              </Button>
            </form>

          </div>

        </div>

      </div>

    </div>
  );
};

export default OfficerComplaintDetails;

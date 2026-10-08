import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquareWarning, 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Calendar, 
  Check, 
  Search 
} from 'lucide-react';
import Button from '../../components/Button';
import { sampleComplaints } from '../../data/mockData';

const OfficerComplaints = () => {
  const [complaints, setComplaints] = useState(sampleComplaints);
  const [toast, setToast] = useState('');

  const updateStatus = (id, newStatus) => {
    setComplaints(complaints.map(c => c.id === id ? { ...c, status: newStatus } : c));
    setToast(`Complaint ${id} status updated to: ${newStatus}`);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F5F8F6] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/officer/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#063B2A] hover:text-emerald-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Officer Command Dashboard</span>
          </Link>
          <span className="text-xs text-gray-500 font-semibold">Public Redressal Registry</span>
        </div>

        {/* Header */}
        <div className="bg-[#063B2A] rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
              Grievance Administration
            </span>
            <h1 className="text-2xl sm:text-3xl font-black mt-2">
              Citizen &amp; Farmer Grievance Redressal
            </h1>
            <p className="text-xs text-gray-300 mt-1">
              Verify crop loss damages, assign field inspection officers, and sanction wildlife compensation claims.
            </p>
          </div>

          <div className="text-right">
            <span className="text-3xl font-black text-amber-400">12</span>
            <span className="text-xs text-gray-300 block">Pending Reviews</span>
          </div>
        </div>

        {toast && (
          <div className="p-3 bg-emerald-900 text-white rounded-2xl text-xs font-bold mb-6 flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toast}</span>
          </div>
        )}

        {/* Complaints List */}
        <div className="bg-white rounded-3xl border border-emerald-950/10 shadow-soft overflow-hidden">
          <div className="divide-y divide-gray-100">
            {complaints.map((item) => (
              <div key={item.id} className="p-6 space-y-3 hover:bg-gray-50/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {item.id}
                    </span>
                    <span className="font-bold text-gray-900 text-base">{item.title}</span>
                  </div>

                  {/* Status Change Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 font-semibold">Change Status:</span>
                    <select
                      value={item.status}
                      onChange={(e) => updateStatus(item.id, e.target.value)}
                      className="text-xs font-bold px-3 py-1.5 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-gray-500 pt-2 border-t border-gray-100">
                  <div>
                    <span className="text-gray-400 block text-[11px]">Location</span>
                    <strong className="text-gray-800">{item.location}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px]">Claimant</span>
                    <strong className="text-gray-800">{item.reportedBy}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px]">Loss Claim</span>
                    <strong className="text-emerald-700">{item.compensationClaimed}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px]">Filing Date</span>
                    <span className="text-gray-800">{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default OfficerComplaints;

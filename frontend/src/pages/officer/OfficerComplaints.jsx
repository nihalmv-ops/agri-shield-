import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquareWarning, 
  Search, 
  Filter, 
  CheckCircle2, 
  X, 
  Eye, 
  MapPin, 
  Calendar, 
  User, 
  Check 
} from 'lucide-react';
import ComplaintCard from '../../components/officer/ComplaintCard';
import StatusBadge from '../../components/officer/StatusBadge';
import Button from '../../components/Button';
import { complaints } from '../../data/complaints';

const OfficerComplaints = () => {
  const [complaintItems, setComplaintItems] = useState(complaints);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalComplaint, setActiveModalComplaint] = useState(null);
  const [newStatusChoice, setNewStatusChoice] = useState('Under Review');
  const [toast, setToast] = useState('');

  const filterTabs = ['All', 'Pending', 'Under Review', 'Verified', 'Resolved', 'Rejected'];

  const filteredComplaints = useMemo(() => {
    return complaintItems.filter((c) => {
      const matchStatus = statusFilter === 'All' || c.status.toLowerCase() === statusFilter.toLowerCase();
      const matchSearch = !searchQuery || 
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.reportedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchStatus && matchSearch;
    });
  }, [complaintItems, statusFilter, searchQuery]);

  const handleVerify = (id) => {
    setComplaintItems(prev => prev.map(c => c.id === id ? { ...c, status: 'Verified' } : c));
    setToast(`Complaint #${id} verified by range officer!`);
    setTimeout(() => setToast(''), 3000);
  };

  const handleOpenStatusModal = (complaint) => {
    setActiveModalComplaint(complaint);
    setNewStatusChoice(complaint.status);
  };

  const handleSaveUpdatedStatus = (e) => {
    e.preventDefault();
    if (!activeModalComplaint) return;

    setComplaintItems(prev => prev.map(c => 
      c.id === activeModalComplaint.id ? { ...c, status: newStatusChoice } : c
    ));
    setToast(`Complaint #${activeModalComplaint.id} status updated to: ${newStatusChoice}`);
    setActiveModalComplaint(null);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200 mb-1">
            <MessageSquareWarning className="w-3.5 h-3.5 text-amber-600" />
            <span>Public Redressal Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#063B2A]">
            Community Complaints
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Crop damage assessments, wildlife encounters, and fence repair grievances.
          </p>
        </div>
      </div>

      {toast && (
        <div className="p-3.5 bg-emerald-900 text-white text-xs font-bold rounded-2xl flex items-center gap-2 shadow-md animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Filter and Search Bar (Prompt Section 12 Requirement) */}
      <div className="bg-white rounded-3xl p-5 border border-emerald-950/10 shadow-soft space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Search Input (6 cols) */}
          <div className="md:col-span-6 relative">
            <input
              type="text"
              placeholder="Search complaints by ID, crop, claimant, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Status Filter Buttons (Prompt Section 12: All, Pending, Under Review, Verified, Resolved) */}
          <div className="md:col-span-6 flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 rounded-full font-bold transition-all whitespace-nowrap ${
                  statusFilter === tab
                    ? 'bg-[#063B2A] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-emerald-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Results Meta */}
      <div className="flex items-center justify-between text-xs text-gray-500 px-1">
        <span>Showing <strong>{filteredComplaints.length}</strong> complaints</span>
        <span className="text-emerald-800 font-bold">Kerala Wildlife Relief Act DBT Enabled</span>
      </div>

      {/* Complaint Cards Grid */}
      {filteredComplaints.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComplaints.map((item) => (
            <ComplaintCard
              key={item.id}
              complaint={item}
              onVerify={handleVerify}
              onUpdateStatus={handleOpenStatusModal}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 max-w-md mx-auto space-y-3">
          <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <MessageSquareWarning className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-gray-900 text-base">No complaints match this filter</h3>
          <p className="text-xs text-gray-500">Try adjusting your search or selecting "All".</p>
          <button
            onClick={() => { setStatusFilter('All'); setSearchQuery(''); }}
            className="px-4 py-2 bg-emerald-600 text-white rounded-full text-xs font-bold"
          >
            Show All Complaints
          </button>
        </div>
      )}

      {/* Quick Status Update Modal */}
      {activeModalComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-emerald-900/10 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  #{activeModalComplaint.id}
                </span>
                <h3 className="text-lg font-black text-gray-900 mt-1">
                  Update Complaint Status
                </h3>
                <p className="text-xs text-gray-500">{activeModalComplaint.type} • {activeModalComplaint.reportedBy}</p>
              </div>
              <button
                onClick={() => setActiveModalComplaint(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveUpdatedStatus} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1.5">
                  Select New Investigation Status:
                </label>
                <div className="space-y-2">
                  {['Pending', 'Under Review', 'Verified', 'Resolved', 'Rejected'].map((statusOption) => (
                    <label
                      key={statusOption}
                      className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-colors ${
                        newStatusChoice === statusOption
                          ? 'border-emerald-500 bg-emerald-50/70'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <span className="font-bold text-gray-800">{statusOption}</span>
                      <input
                        type="radio"
                        name="complaintStatus"
                        value={statusOption}
                        checked={newStatusChoice === statusOption}
                        onChange={() => setNewStatusChoice(statusOption)}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveModalComplaint(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-[#10B981] text-white"
                >
                  Update &amp; Notify Citizen
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default OfficerComplaints;

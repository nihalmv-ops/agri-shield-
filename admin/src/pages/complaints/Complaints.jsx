import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquareWarning, 
  Search, 
  Filter, 
  Grid, 
  List, 
  CheckCircle2, 
  Eye, 
  X, 
  IndianRupee, 
  Clock, 
  Check, 
  MapPin, 
  Phone 
} from 'lucide-react';
import ComplaintCard from '../../components/ComplaintCard';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import { initialComplaints } from '../../data/complaints';

const Complaints = () => {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  
  // Status Modal State
  const [editingComplaint, setEditingComplaint] = useState(null);
  const [modalStatus, setModalStatus] = useState('Under Review');
  const [modalNotes, setModalNotes] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Handle Verify Quick Action
  const handleQuickVerify = (id) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: 'Verified' } : c));
    setToastMessage(`Complaint #${id} verified. Damage surveyor dispatched.`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Open Update Modal
  const handleOpenUpdate = (complaint) => {
    setEditingComplaint(complaint);
    setModalStatus(complaint.status);
    setModalNotes(complaint.officerNotes || '');
  };

  // Save Modal Changes
  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!editingComplaint) return;

    setComplaints(prev => prev.map(c => {
      if (c.id === editingComplaint.id) {
        return {
          ...c,
          status: modalStatus,
          officerNotes: modalNotes
        };
      }
      return c;
    }));

    setToastMessage(`Complaint #${editingComplaint.id} updated to "${modalStatus}"`);
    setEditingComplaint(null);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Filter logic
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const matchesSearch = 
        c.reporter.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedType === 'All' || c.type === selectedType;
      const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;
      const matchesPriority = selectedPriority === 'All' || c.priority === selectedPriority;

      return matchesSearch && matchesType && matchesStatus && matchesPriority;
    });
  }, [complaints, searchQuery, selectedType, selectedStatus, selectedPriority]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('All');
    setSelectedStatus('All');
    setSelectedPriority('All');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#071A14] text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
              <MessageSquareWarning className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-[#063B2A] tracking-tight">
              Farmer Grievances & Loss Claims
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Review community incident logs, dispatch inspection officers, and sanction state compensation
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="bg-white p-1 rounded-2xl border border-gray-200 flex items-center shadow-xs self-start sm:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-xl transition-colors ${
              viewMode === 'grid' ? 'bg-[#063B2A] text-white' : 'text-gray-500 hover:text-gray-800'
            }`}
            title="Grid View"
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-xl transition-colors ${
              viewMode === 'table' ? 'bg-[#063B2A] text-white' : 'text-gray-500 hover:text-gray-800'
            }`}
            title="Table View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter and Search Box */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-emerald-950/10 shadow-soft space-y-4">
        
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by reporter name (e.g. Rahul Kumar), grievance ID (#CMP-001), or place..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F5F8F6] text-xs text-[#071A14] pl-10 pr-10 py-3 rounded-2xl border border-transparent focus:border-emerald-300 focus:bg-white focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              Incident Nature
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-[#F5F8F6] py-2 px-3 rounded-xl border border-gray-200 text-gray-800 font-semibold focus:outline-none focus:border-emerald-300"
            >
              <option value="All">All Types</option>
              <option value="Crop Damage">Crop Damage</option>
              <option value="Animal Attack">Animal Attack</option>
              <option value="Wildlife Sighting">Wildlife Sighting</option>
              <option value="Fence Breach">Fence Breach</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              Review Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-[#F5F8F6] py-2 px-3 rounded-xl border border-gray-200 text-gray-800 font-semibold focus:outline-none focus:border-emerald-300"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Verified">Verified</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              Priority Tier
            </label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full bg-[#F5F8F6] py-2 px-3 rounded-xl border border-gray-200 text-gray-800 font-semibold focus:outline-none focus:border-emerald-300"
            >
              <option value="All">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* Counter */}
        <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100 text-gray-500">
          <span>
            Showing <strong className="text-[#063B2A]">{filteredComplaints.length}</strong> of {complaints.length} claims
          </span>
          {(searchQuery || selectedType !== 'All' || selectedStatus !== 'All' || selectedPriority !== 'All') && (
            <button onClick={resetFilters} className="text-[#10B981] font-bold hover:underline">
              Reset Filters
            </button>
          )}
        </div>

      </div>

      {/* Grid or Table Display */}
      {filteredComplaints.length === 0 ? (
        <EmptyState
          title="No Grievances Found"
          message="No citizen complaints matched your current filters."
          actionText="Clear Filters"
          onAction={resetFilters}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComplaints.map((item) => (
            <ComplaintCard
              key={item.id}
              complaint={item}
              onVerify={handleQuickVerify}
              onUpdateStatus={handleOpenUpdate}
            />
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-3xl border border-emerald-950/10 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#F5F8F6] text-gray-500 uppercase tracking-wider font-extrabold text-[10px] border-b border-gray-100">
                  <th className="py-3.5 px-4">Case ID</th>
                  <th className="py-3.5 px-4">Reporter</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Loss Claim</th>
                  <th className="py-3.5 px-4">Priority</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredComplaints.map((item) => (
                  <tr key={item.id} className="hover:bg-emerald-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-gray-700">
                      #{item.id}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-gray-900">
                      <div>
                        <span>{item.reporter}</span>
                        <span className="text-[10px] text-gray-400 block font-normal">{item.phone}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-gray-800">
                      {item.type}
                    </td>

                    <td className="py-3.5 px-4 text-gray-600">
                      <span>{item.location}</span>
                    </td>

                    <td className="py-3.5 px-4 text-gray-500">
                      {item.date}
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-800">
                      {item.compensationClaimed || 'N/A'}
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusBadge priority={item.priority} size="xs" />
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusBadge status={item.status} size="xs" />
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenUpdate(item)}
                          className="px-2 py-1 bg-[#063B2A] hover:bg-emerald-900 text-white font-bold text-[10px] rounded-xl transition-colors"
                        >
                          Update
                        </button>
                        <Link
                          to={`/admin/complaints/${item.id}`}
                          className="p-1.5 text-gray-400 hover:text-[#063B2A] rounded-xl hover:bg-gray-100"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Update Complaint Status Modal */}
      {editingComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-emerald-900/10 text-[#071A14]">
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-mono font-bold text-gray-400">CASE #{editingComplaint.id}</span>
                <h3 className="text-base font-extrabold text-[#063B2A]">
                  Update Grievance Status
                </h3>
              </div>
              <button
                onClick={() => setEditingComplaint(null)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Lifecycle Status
                </label>
                <select
                  value={modalStatus}
                  onChange={(e) => setModalStatus(e.target.value)}
                  className="w-full text-xs p-3 rounded-2xl bg-[#F5F8F6] border border-gray-200 font-semibold focus:outline-none focus:border-emerald-300"
                >
                  <option value="Pending">Pending</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Verified">Verified & Approved</option>
                  <option value="Resolved">Resolved / Closed</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Officer Field Notes & Survey Directive
                </label>
                <textarea
                  rows={3}
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  placeholder="Record GPS survey details, surveyor officer assigned, or reasoning..."
                  className="w-full text-xs p-3 rounded-2xl bg-[#F5F8F6] border border-gray-200 focus:outline-none focus:border-emerald-300"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingComplaint(null)}
                  className="px-4 py-2 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#063B2A] hover:bg-emerald-900 text-white text-xs font-extrabold rounded-2xl shadow-md transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default Complaints;

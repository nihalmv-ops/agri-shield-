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
  Phone,
  Kanban,
  Columns,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Send,
  Download,
  User
} from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import { initialComplaints } from '../../data/complaints';

const Complaints = () => {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'table'
  
  // Update Ticket Modal
  const [editingComplaint, setEditingComplaint] = useState(null);
  const [modalStatus, setModalStatus] = useState('Under Review');
  const [modalNotes, setModalNotes] = useState('');
  const [modalAssigned, setModalAssigned] = useState('Forester K. Balan');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleOpenUpdate = (complaint) => {
    setEditingComplaint(complaint);
    setModalStatus(complaint.status);
    setModalNotes(complaint.officerNotes || '');
  };

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

    showToast(`Complaint #${editingComplaint.id} updated to "${modalStatus}"`);
    setEditingComplaint(null);
  };

  const handleQuickAdvance = (id, newStatus) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : a));
    showToast(`Ticket #${id} moved to "${newStatus}"`);
  };

  // Filtered complaints
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        c.reporter.toLowerCase().includes(query) ||
        c.type.toLowerCase().includes(query) ||
        c.location.toLowerCase().includes(query) ||
        c.id.toLowerCase().includes(query);

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

  // Kanban Columns
  const kanbanColumns = [
    { id: 'Pending', label: 'New / Pending', color: 'border-amber-400 bg-amber-50/40 text-amber-900' },
    { id: 'Under Review', label: 'Under Review', color: 'border-blue-400 bg-blue-50/40 text-blue-900' },
    { id: 'Verified', label: 'Verified & Surveyed', color: 'border-emerald-400 bg-emerald-50/40 text-emerald-900' },
    { id: 'Resolved', label: 'Resolved / Settled', color: 'border-teal-400 bg-teal-50/40 text-teal-900' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#071A14] text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>Grievance Redressal Mechanism</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#063B2A] mt-1">
            Citizen Grievances &amp; Crop Damage Queue
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Review incidents submitted by farmers, dispatch field surveyors, and process wildlife loss compensation.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="bg-white p-1 rounded-2xl border border-gray-200 flex items-center shadow-xs text-xs font-bold">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                viewMode === 'kanban'
                  ? 'bg-[#063B2A] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Kanban Pipeline</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                viewMode === 'table'
                  ? 'bg-[#063B2A] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-3xl p-5 border border-emerald-950/10 shadow-soft space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          <div className="relative lg:col-span-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by complainant, ticket ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F5F8F6] text-xs font-semibold rounded-2xl border border-transparent focus:border-emerald-300 focus:bg-white focus:outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F5F8F6] text-xs font-bold text-gray-800 rounded-2xl border border-transparent focus:border-emerald-300 focus:bg-white focus:outline-none cursor-pointer"
            >
              <option value="All">All Complaint Categories</option>
              <option value="Crop Damage">Crop Damage</option>
              <option value="Animal Attack">Animal Attack</option>
              <option value="Fence Breach">Fence Breach</option>
              <option value="Wildlife Sighting">Wildlife Sighting</option>
            </select>
          </div>

          <div>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F5F8F6] text-xs font-bold text-gray-800 rounded-2xl border border-transparent focus:border-emerald-300 focus:bg-white focus:outline-none cursor-pointer"
            >
              <option value="All">All Priority Levels</option>
              <option value="Critical">Critical Priority</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
            </select>
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F5F8F6] text-xs font-bold text-gray-800 rounded-2xl border border-transparent focus:border-emerald-300 focus:bg-white focus:outline-none cursor-pointer"
            >
              <option value="All">All Redressal Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Verified">Verified</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
          <span className="text-gray-500 font-semibold">Showing <strong>{filteredComplaints.length}</strong> active tickets</span>
          {(searchQuery || selectedType !== 'All' || selectedStatus !== 'All' || selectedPriority !== 'All') && (
            <button onClick={resetFilters} className="text-emerald-700 font-bold hover:underline">
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* VIEW 1: KANBAN PIPELINE BOARD */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
          {kanbanColumns.map((col) => {
            const colItems = filteredComplaints.filter((c) => {
              if (col.id === 'Pending') return c.status === 'Pending';
              if (col.id === 'Under Review') return c.status === 'Under Review';
              if (col.id === 'Verified') return c.status === 'Verified';
              if (col.id === 'Resolved') return c.status === 'Resolved';
              return false;
            });

            return (
              <div
                key={col.id}
                className="bg-white rounded-3xl p-4 border border-emerald-950/10 shadow-soft space-y-3 flex flex-col min-h-[500px]"
              >
                {/* Column Header */}
                <div className={`p-3 rounded-2xl border ${col.color} flex items-center justify-between`}>
                  <strong className="text-xs font-black">{col.label}</strong>
                  <span className="text-xs font-bold bg-white px-2 py-0.5 rounded-full shadow-xs">
                    {colItems.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="space-y-3 flex-1">
                  {colItems.length === 0 ? (
                    <div className="p-8 text-center text-xs text-gray-400 italic">
                      No tickets currently in this stage
                    </div>
                  ) : (
                    colItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-[#F5F8F6] hover:bg-white rounded-2xl border border-gray-200/80 hover:border-emerald-500/50 shadow-xs hover:shadow-soft transition-all space-y-3 group"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono font-bold text-[#063B2A]">{item.id}</span>
                          <StatusBadge priority={item.priority} size="xs" />
                        </div>

                        <div>
                          <h4 className="text-xs font-black text-gray-900 group-hover:text-[#063B2A] transition-colors">
                            {item.reporter}
                          </h4>
                          <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>{item.location}</span>
                          </p>
                        </div>

                        <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-[11px]">
                          <div>
                            <span className="text-gray-400 block text-[9px] uppercase font-bold">Claimed Loss</span>
                            <strong className="text-emerald-800 font-extrabold">{item.compensationClaimed || 'N/A'}</strong>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleOpenUpdate(item)}
                              className="px-2.5 py-1 bg-white hover:bg-gray-100 text-gray-700 rounded-lg font-bold border border-gray-300 text-[10px]"
                            >
                              Edit
                            </button>
                            <Link
                              to={`/admin/complaints/${item.id}`}
                              className="px-2.5 py-1 bg-[#063B2A] text-white rounded-lg font-bold text-[10px]"
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: STANDARD TABLE */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-3xl p-6 border border-emerald-950/10 shadow-soft overflow-hidden">
          <div className="overflow-x-auto -mx-6 sm:mx-0">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#F5F8F6] text-gray-500 uppercase tracking-wider font-extrabold text-[10px] border-y border-gray-100">
                  <th className="py-3 px-4">Ticket ID</th>
                  <th className="py-3 px-4">Complainant</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Claimed Loss</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredComplaints.map((item) => (
                  <tr key={item.id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#063B2A]">
                      {item.id}
                    </td>
                    <td className="py-3 px-4 font-bold text-gray-900">
                      <div>{item.reporter}</div>
                      <div className="text-[10px] text-gray-400 font-mono">{item.phone}</div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-700">
                      {item.type}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {item.location}
                    </td>
                    <td className="py-3 px-4 font-black text-emerald-800">
                      {item.compensationClaimed || 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge priority={item.priority} size="xs" />
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={item.status} size="xs" />
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenUpdate(item)}
                          className="px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold"
                        >
                          Update
                        </button>
                        <Link
                          to={`/admin/complaints/${item.id}`}
                          className="px-3 py-1.5 bg-[#063B2A] text-white rounded-xl text-xs font-bold hover:bg-emerald-950"
                        >
                          Details
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

      {/* Ticket Process & Update Modal */}
      {editingComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-emerald-950/10 text-[#071A14] space-y-4 relative">
            
            <button
              onClick={() => setEditingComplaint(null)}
              className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pb-3 border-b border-gray-100">
              <span className="text-[10px] font-mono font-bold text-gray-400 uppercase">Ticket Management</span>
              <h3 className="text-lg font-black text-[#063B2A]">
                Update Ticket: {editingComplaint.id} ({editingComplaint.reporter})
              </h3>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Redressal Pipeline Stage</label>
                <select
                  value={modalStatus}
                  onChange={(e) => setModalStatus(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#F5F8F6] border border-gray-200 font-bold"
                >
                  <option value="Pending">Pending</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Verified">Verified & Surveyed</option>
                  <option value="Resolved">Resolved / Settled</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Assigned Forest Surveyor / Officer</label>
                <input
                  type="text"
                  value={modalAssigned}
                  onChange={(e) => setModalAssigned(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#F5F8F6] border border-gray-200 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Field Assessment & Action Notes</label>
                <textarea
                  rows={3}
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  placeholder="Record GPS survey results, damage acreage verification, and compensation status..."
                  className="w-full p-3 rounded-xl bg-[#F5F8F6] border border-gray-200"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingComplaint(null)}
                  className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#063B2A] hover:bg-emerald-950 text-white rounded-xl font-black shadow-sm"
                >
                  Save Redressal Status
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

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Send, 
  UploadCloud, 
  Clock, 
  CheckCircle2, 
  FileText, 
  MapPin, 
  Calendar, 
  ShieldAlert, 
  Check, 
  Filter, 
  ChevronRight,
  Shield
} from 'lucide-react';
import Button from '../components/Button';
import { sampleComplaints } from '../data/mockData';

const Complaints = () => {
  const [complaintsList, setComplaintsList] = useState(sampleComplaints);
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Form fields
  const [formData, setFormData] = useState({
    type: 'Crop Damage',
    title: '',
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    compensationClaimed: ''
  });

  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: `CMP-2026-${Math.floor(100 + Math.random() * 900)}`,
      type: formData.type,
      title: formData.title || `${formData.type} reported at ${formData.location}`,
      description: formData.description,
      location: formData.location,
      date: 'Just Now',
      status: 'Pending',
      severity: 'High',
      reportedBy: 'You (Citizen / Farmer)',
      compensationClaimed: formData.compensationClaimed || 'Under Evaluation',
      officerNotes: 'Your complaint has been queued for immediate field verification.'
    };

    setComplaintsList([newEntry, ...complaintsList]);
    setSubmittedMessage(true);

    // Reset form
    setFormData({
      type: 'Crop Damage',
      title: '',
      description: '',
      location: '',
      date: new Date().toISOString().split('T')[0],
      compensationClaimed: ''
    });

    setTimeout(() => {
      setSubmittedMessage(false);
    }, 4000);
  };

  const filteredComplaints = complaintsList.filter((item) => {
    if (statusFilter === 'All') return true;
    return item.status.toLowerCase() === statusFilter.toLowerCase();
  });

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            Pending
          </span>
        );
      case 'under review':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <ShieldAlert className="w-3.5 h-3.5 text-blue-600" />
            Under Review
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Resolved
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8F6] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-[#063B2A] to-[#071A14] rounded-3xl p-6 sm:p-10 text-white mb-10 shadow-soft-lg">
          <div className="max-w-2xl space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
              Direct Ranger Assistance
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Report a Complaint &amp; Incident
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              Report wildlife crop destruction, dangerous encounters, fence breakages, or forest reserve concerns. Track real-time response from Kerala Forest Department officers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-950/10 shadow-soft space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-[#063B2A]">
                Submit Incident Report
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Fill in the details below. Emergency distress reports trigger high-priority alerts to local range squads.
              </p>
            </div>

            {submittedMessage && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-800 text-xs space-y-1 animate-fadeIn">
                <div className="flex items-center gap-1.5 font-bold text-sm">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Complaint Recorded Successfully!</span>
                </div>
                <p>Your case has been added to the tracking log below and dispatched to the local range officer.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Complaint Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="Crop Damage">Crop Damage</option>
                  <option value="Wildlife Sighting">Wildlife Sighting</option>
                  <option value="Forest Issue">Forest Issue / Fence Breach</option>
                  <option value="Cattle Attack">Cattle / Livestock Attack</option>
                  <option value="Illegal Encroachment">Illegal Intrusion / Poaching</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Brief Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Elephant herd destroyed banana plantation"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Location / Village / Ward *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sultan Bathery, Wayanad"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Date of Incident *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Estimated Crop Loss Claim (₹)
                </label>
                <input
                  type="text"
                  placeholder="e.g. ₹35,000 (Optional for compensation claims)"
                  value={formData.compensationClaimed}
                  onChange={(e) => setFormData({ ...formData, compensationClaimed: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Detailed Description *
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe animals spotted, extent of damage, presence of solar fences, and any immediate hazard..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* Upload Image UI Mockup */}
              <div className="p-4 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400">
                    <UploadCloud className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">Attach Photos / Video</p>
                    <p className="text-[11px] text-gray-500">Helps officers verify compensation faster</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-700 cursor-pointer hover:underline">
                  Browse
                </span>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full bg-[#10B981] hover:bg-[#0ea371] text-white rounded-full font-bold shadow-glow-emerald py-3"
                icon={Send}
                iconPosition="right"
              >
                Submit Complaint to Forest Dept
              </Button>
            </form>
          </div>

          {/* Right Column: Complaint History Tracker (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-emerald-950/10 shadow-soft">
              <div>
                <h3 className="text-base font-bold text-[#063B2A]">
                  Complaint History &amp; Status
                </h3>
                <p className="text-xs text-gray-500">Track official review and compensations</p>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                {['All', 'Pending', 'Under Review', 'Resolved'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-full font-semibold transition-all ${
                      statusFilter === status
                        ? 'bg-[#063B2A] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-emerald-50'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Complaints Cards */}
            <div className="space-y-4">
              {filteredComplaints.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-emerald-950/10 shadow-soft hover:shadow-soft-lg transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {item.id}
                      </span>
                      <span className="text-xs font-bold text-gray-500">•</span>
                      <span className="text-xs font-bold text-gray-700">{item.type}</span>
                    </div>
                    <div>
                      {getStatusBadge(item.status)}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-gray-900 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-gray-500 pt-1 bg-gray-50/70 p-3 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{item.date}</span>
                    </div>
                    <div className="col-span-2 sm:col-span-1 text-emerald-800 font-semibold truncate">
                      Claim: {item.compensationClaimed}
                    </div>
                  </div>

                  {item.officerNotes && (
                    <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 mb-0.5">
                        <Shield className="w-3 h-3 text-emerald-600" />
                        <span>Forest Department Officer Note:</span>
                      </div>
                      <p className="text-emerald-900 text-[11px]">
                        {item.officerNotes}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Complaints;


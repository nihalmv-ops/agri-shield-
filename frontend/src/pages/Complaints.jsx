import React, { useState, useEffect } from 'react';
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
  Shield,
  Lock,
  IndianRupee,
  UserCheck,
  Info,
  RefreshCw,
  XCircle
} from 'lucide-react';
import Button from '../components/Button';
import { getMyComplaints, saveMyComplaint } from '../utils/complaintStorage';
import { api } from '../utils/api';

const Complaints = () => {
  // Only load the user's private complaints (never other users' complaints)
  const [complaintsList, setComplaintsList] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  
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

  // Load user's private complaints on mount
  useEffect(() => {
    loadUserComplaints();
  }, []);

  const loadUserComplaints = async () => {
    setIsLoading(true);
    try {
      // Try fetching from backend API if authenticated
      const res = await api.get('/complaints');
      if (res && res.complaints && Array.isArray(res.complaints)) {
        setComplaintsList(res.complaints);
        return;
      }
    } catch {
      // Fallback to user's private local storage records
    } finally {
      setIsLoading(false);
    }

    const localData = getMyComplaints();
    setComplaintsList(localData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const ticketNumber = `CMP-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newEntry = {
      id: ticketNumber,
      complaintId: ticketNumber,
      type: formData.type,
      title: formData.title || `${formData.type} incident at ${formData.location}`,
      description: formData.description,
      location: formData.location,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      status: 'Pending',
      priority: 'High',
      reportedBy: 'You (Citizen / Farmer)',
      compensationClaimed: formData.compensationClaimed ? (formData.compensationClaimed.startsWith('₹') ? formData.compensationClaimed : `₹${formData.compensationClaimed}`) : 'Under Evaluation',
      compensationApproved: 0,
      image: imagePreview || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
      officerNotes: 'Your complaint has been queued for field verification by the local Forest Range Officer. Updates on site inspection and compensation will appear here.',
      assignedOfficerName: 'Pending Assignment',
      createdAt: new Date().toISOString()
    };

    // Try posting to backend API
    try {
      await api.post('/complaints', {
        type: newEntry.type,
        location: newEntry.location,
        description: newEntry.description,
        compensationClaimed: newEntry.compensationClaimed,
        image: newEntry.image
      });
    } catch {
      // Saved locally if offline
    }

    // Save to private user storage
    const updated = saveMyComplaint(newEntry);
    setComplaintsList(updated);
    setSubmittedMessage(true);
    setIsSubmitting(false);

    // Reset form
    setFormData({
      type: 'Crop Damage',
      title: '',
      description: '',
      location: '',
      date: new Date().toISOString().split('T')[0],
      compensationClaimed: ''
    });
    setImagePreview('');

    setTimeout(() => {
      setSubmittedMessage(false);
    }, 4500);
  };

  const filteredComplaints = complaintsList.filter((item) => {
    if (statusFilter === 'All') return true;
    const itemStatus = (item.status || 'Pending').toLowerCase();
    const filter = statusFilter.toLowerCase();
    if (filter === 'pending') return itemStatus.includes('pending');
    if (filter === 'under review') return itemStatus.includes('review') || itemStatus.includes('investigation');
    if (filter === 'resolved') return itemStatus.includes('resolved') || itemStatus.includes('approved');
    if (filter === 'rejected') return itemStatus.includes('rejected');
    return itemStatus === filter;
  });

  const getStatusBadge = (status = 'Pending') => {
    const s = status.toLowerCase();
    if (s.includes('pending')) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          Pending Review
        </span>
      );
    }
    if (s.includes('review') || s.includes('investigation')) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
          <ShieldAlert className="w-3.5 h-3.5 text-blue-600" />
          Under Investigation
        </span>
      );
    }
    if (s.includes('approved') || s.includes('compensation approved')) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Compensation Approved
        </span>
      );
    }
    if (s.includes('resolved')) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Resolved
        </span>
      );
    }
    if (s.includes('rejected')) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
          <XCircle className="w-3.5 h-3.5 text-rose-600" />
          Claim Rejected
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800">
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F8F6] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-[#063B2A] to-[#071A14] rounded-3xl p-6 sm:p-10 text-white mb-10 shadow-soft-lg">
          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                Direct Forest Department Triage
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 bg-white/10 text-emerald-200 rounded-full">
                <Lock className="w-3 h-3 text-emerald-400" />
                Confidential &amp; Private to You
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Wildlife Damage Complaints &amp; Grievances
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              Report wildlife crop destruction, predator attacks, or perimeter breaches directly to Kerala Forest Officers. Track your case and view official department responses in your private portal below.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Complaint Filing Form (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-950/10 shadow-soft space-y-6">
            <div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#10B981]" />
                <h2 className="text-xl font-extrabold text-[#063B2A]">
                  Submit New Incident Report
                </h2>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Your report will be securely dispatched only to authorized Forest Officers. No other public users can see your grievance.
              </p>
            </div>

            {submittedMessage && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-800 text-xs space-y-1 animate-fadeIn">
                <div className="flex items-center gap-1.5 font-bold text-sm">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Complaint Registered Successfully!</span>
                </div>
                <p>Your ticket has been recorded. You can track the Forest Officer's inspection response in your tracking feed on the right.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Incident Category *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-semibold"
                >
                  <option value="Crop Damage">Crop Damage (Elephant / Wild Boar / Deer)</option>
                  <option value="Wildlife Sighting">Direct Wildlife Sighting (Predator / Herd)</option>
                  <option value="Forest Issue">Solar Fence Breach / Buffer Issue</option>
                  <option value="Cattle Attack">Livestock Predation (Leopard / Tiger)</option>
                  <option value="Illegal Encroachment">Illegal Intrusion / Forest Boundary Breach</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Brief Title / Incident Summary *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Elephant herd destroyed 1.5 acres of paddy crop"
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
                    placeholder="e.g. Sultan Bathery, Ward 6"
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
                  Estimated Loss Claim (₹ INR)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 45000 (Claim amount for compensation)"
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
                  placeholder="Describe number of animals, crops destroyed, damage to solar fencing, and any immediate safety hazards..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* Photo Evidence Upload */}
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Attach Evidence Photos (Optional)
                </label>
                <label className="cursor-pointer block p-4 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 hover:bg-emerald-50/50 hover:border-emerald-300 transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-400">
                        <UploadCloud className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">
                          {imagePreview ? 'Photo Selected (Click to change)' : 'Attach Crop / Damage Photos'}
                        </p>
                        <p className="text-[11px] text-gray-500">Accelerates field officer verification</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-emerald-700">
                      Browse
                    </span>
                  </div>
                </label>
                {imagePreview && (
                  <div className="mt-2 relative rounded-xl overflow-hidden border border-emerald-200 max-h-36">
                    <img src={imagePreview} alt="Evidence preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-center gap-2 text-[11px] text-emerald-800">
                <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Strict Privacy:</strong> Only the Forest Officer administrator will review this complaint. It is never shown to other users.
                </span>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isSubmitting}
                className="w-full bg-[#10B981] hover:bg-[#0ea371] text-white rounded-full font-bold shadow-glow-emerald py-3 disabled:opacity-50"
                icon={Send}
                iconPosition="right"
              >
                {isSubmitting ? 'Registering...' : 'Submit Complaint to Forest Officer'}
              </Button>
            </form>
          </div>

          {/* Right Column: Private Complaint History Tracker (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header & Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-emerald-950/10 shadow-soft">
              <div>
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#10B981]" />
                  <h3 className="text-base font-extrabold text-[#063B2A]">
                    My Filed Complaints &amp; Officer Responses
                  </h3>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  Private tracking channel between you and the Forest Department
                </p>
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

            {/* Complaints List / Private Empty State */}
            {filteredComplaints.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 sm:p-14 border border-emerald-950/10 shadow-soft text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <h4 className="text-lg font-extrabold text-[#063B2A]">
                    {complaintsList.length === 0 ? 'No Complaints Filed Yet' : 'No Complaints Matching Filter'}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {complaintsList.length === 0 
                      ? 'You have not submitted any complaints yet. When you file a report using the form on the left, your grievance ticket and the Forest Officer’s official inspection response will appear here.'
                      : 'Try switching the filter tab above to view your other filed grievances.'}
                  </p>
                </div>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    Complaints filed by other users are private and never shown here
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {filteredComplaints.map((item) => (
                  <div
                    key={item.id || item._id}
                    className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-950/10 shadow-soft hover:shadow-soft-lg transition-all space-y-4"
                  >
                    {/* Top Row: Ticket ID, Type & Live Status */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                          {item.complaintId || item.id}
                        </span>
                        <span className="text-xs font-bold text-gray-400">•</span>
                        <span className="text-xs font-bold text-gray-800">{item.type}</span>
                      </div>
                      <div>
                        {getStatusBadge(item.status)}
                      </div>
                    </div>

                    {/* Incident Title & Description */}
                    <div>
                      <h4 className="text-base font-extrabold text-[#063B2A] leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-gray-600 bg-gray-50/80 p-3.5 rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item.date}</span>
                      </div>
                      <div className="col-span-2 sm:col-span-1 font-bold text-emerald-900 truncate">
                        Claim: {item.compensationClaimed || 'Under Review'}
                      </div>
                    </div>

                    {/* Official Forest Officer Response Box */}
                    <div className="p-4 bg-gradient-to-br from-emerald-50/90 to-emerald-100/40 rounded-2xl border border-emerald-200/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#063B2A]">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span>Forest Officer Official Response</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                          Official Reply
                        </span>
                      </div>

                      <p className="text-xs text-emerald-950 font-medium leading-relaxed bg-white/80 p-3 rounded-xl border border-emerald-100">
                        {item.officerNotes || 'Your complaint has been acknowledged by the Forest Range Office. A field officer will be deployed for site assessment.'}
                      </p>

                      <div className="flex flex-wrap items-center justify-between text-[11px] text-emerald-800 pt-1">
                        <div className="flex items-center gap-1">
                          <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Reviewing Officer: <strong>{item.assignedOfficerName || 'Wayanad Range Station'}</strong></span>
                        </div>
                        {item.compensationApproved > 0 && (
                          <div className="flex items-center gap-1 font-bold text-emerald-800">
                            <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Approved Compensation: ₹{item.compensationApproved.toLocaleString('en-IN')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default Complaints;

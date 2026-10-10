import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar, 
  Trees, 
  Radio, 
  MessageSquareWarning, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  ShieldAlert, 
  Send, 
  Camera, 
  Eye, 
  Zap 
} from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import { initialFarmers } from '../../data/farmers';
import { initialComplaints } from '../../data/complaints';

const FarmerDetails = () => {
  const { id } = useParams();
  const farmer = initialFarmers.find(f => f.id === id) || initialFarmers[0];

  const [status, setStatus] = useState(farmer.status);
  const [toastMessage, setToastMessage] = useState('');

  // Find complaints filed by this farmer
  const farmerComplaints = initialComplaints.filter(c => 
    c.reporter.toLowerCase().includes(farmer.name.toLowerCase()) || 
    c.phone === farmer.phone
  );

  const handleToggleStatus = () => {
    const nextStatus = status === 'Active' ? 'Suspended' : 'Active';
    setStatus(nextStatus);
    setToastMessage(`Account status changed to ${nextStatus}`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSendDirectAlert = () => {
    setToastMessage(`Urgent elephant perimeter warning SMS transmitted to ${farmer.phone}`);
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/farmers"
            className="p-2.5 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:text-[#063B2A] hover:bg-emerald-50 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-extrabold text-gray-500 uppercase">
                {farmer.id}
              </span>
              <StatusBadge status={status} />
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                farmer.riskLevel === 'Critical' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {farmer.riskLevel} Risk Zone
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#063B2A] tracking-tight">
              {farmer.name} • Agricultural Defense Dossier
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSendDirectAlert}
            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-rose-600/20 transition-all active:scale-95 flex items-center gap-2"
          >
            <AlertTriangle className="w-4 h-4 text-rose-200" />
            <span>Send Direct Wildlife Siren SMS</span>
          </button>

          <button
            onClick={handleToggleStatus}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black shadow-md transition-all active:scale-95 ${
              status === 'Active'
                ? 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {status === 'Active' ? 'Suspend Defense Profile' : 'Activate Profile'}
          </button>
        </div>
      </div>

      {/* Profile Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-950/10 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <img
              src={farmer.avatar}
              alt={farmer.name}
              className="w-20 h-20 rounded-3xl object-cover border-2 border-emerald-500 shadow-md"
            />
            <div>
              <h2 className="text-xl font-black text-[#071A14]">
                {farmer.name}
              </h2>
              <p className="text-xs font-bold text-emerald-800">
                {farmer.farmName}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {farmer.location}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" /> {farmer.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Member since {farmer.joinedDate}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-emerald-50 border border-emerald-200/80 p-3.5 rounded-2xl text-center min-w-[120px]">
              <span className="text-[10px] text-emerald-800 font-extrabold uppercase block">Monitored Land</span>
              <span className="text-xl font-black text-[#063B2A]">{farmer.acres}</span>
            </div>
            <div className="bg-rose-50 border border-rose-200/80 p-3.5 rounded-2xl text-center min-w-[120px]">
              <span className="text-[10px] text-rose-800 font-extrabold uppercase block">Recent Intrusions</span>
              <span className="text-xl font-black text-rose-700">{farmer.recentAlertsCount || 3} Detections</span>
            </div>
          </div>
        </div>

        {/* 4 Telemetry KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-xs">
          <div className="bg-[#F5F8F6] p-4 rounded-2xl">
            <span className="text-gray-400 block text-[10px] font-bold uppercase">Sector & Boundary</span>
            <span className="font-extrabold text-[#063B2A] text-sm mt-0.5 block">{farmer.sectorZone || 'Sector 4'}</span>
          </div>
          <div className="bg-[#F5F8F6] p-4 rounded-2xl">
            <span className="text-gray-400 block text-[10px] font-bold uppercase">Nearest AI Camera Trap</span>
            <span className="font-mono font-extrabold text-[#063B2A] text-sm mt-0.5 block">{farmer.nearestCamera || 'CAM-023'}</span>
          </div>
          <div className="bg-[#F5F8F6] p-4 rounded-2xl">
            <span className="text-gray-400 block text-[10px] font-bold uppercase">Perimeter Fence Status</span>
            <span className="font-extrabold text-emerald-700 text-sm mt-0.5 block">{farmer.fenceStatus || 'Active (8.2 kV)'}</span>
          </div>
          <div className="bg-[#F5F8F6] p-4 rounded-2xl">
            <span className="text-gray-400 block text-[10px] font-bold uppercase">Citizen Grievances</span>
            <span className="font-extrabold text-amber-700 text-sm mt-0.5 block">{farmer.complaintsCount} Filed ({farmer.resolvedComplaints} Resolved)</span>
          </div>
        </div>
      </div>

      {/* Grievances & Loss Claims Filed by this Farmer */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-950/10 shadow-soft space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <MessageSquareWarning className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-[#063B2A] text-base">
              Grievance History & Compensation Claims Filed
            </h3>
          </div>
          <span className="text-xs text-gray-500 font-bold">
            {farmerComplaints.length > 0 ? `${farmerComplaints.length} claims on record` : 'Historical incident log'}
          </span>
        </div>

        {farmerComplaints.length > 0 ? (
          <div className="space-y-3">
            {farmerComplaints.map((c) => (
              <div 
                key={c.id} 
                className="p-4 rounded-2xl bg-[#F5F8F6] hover:bg-emerald-50/60 border border-transparent hover:border-emerald-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#063B2A] bg-white px-2 py-0.5 rounded border border-gray-200">
                      #{c.id}
                    </span>
                    <h4 className="font-black text-sm text-[#071A14]">
                      {c.type}
                    </h4>
                    <StatusBadge status={c.status} size="xs" />
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-1 max-w-xl">
                    {c.description}
                  </p>
                  <span className="text-[10px] text-gray-400 block">
                    Reported on {c.date} at {c.time} • Loss Claim: <strong>{c.compensationClaimed || 'N/A'}</strong>
                  </span>
                </div>

                <Link
                  to={`/admin/complaints/${c.id}`}
                  className="px-3 py-1.5 bg-[#063B2A] hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 self-start sm:self-auto shrink-0"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Docket</span>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center rounded-2xl bg-[#F5F8F6] text-xs text-gray-500 space-y-1">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <p className="font-bold text-gray-800">No unresolved complaints pending</p>
            <p>This farmer is actively monitored by optical camera trap {farmer.nearestCamera || 'CAM-023'}.</p>
          </div>
        )}
      </div>

      {/* Linked AI Camera Sensors Guarding This Sector */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-950/10 shadow-soft space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-[#10B981]" />
            <h3 className="font-extrabold text-[#063B2A] text-base">
              Sector Camera Traps Guarding This Boundary
            </h3>
          </div>
          <Link to="/admin/alerts" className="text-xs font-bold text-[#10B981] hover:underline">
            View Live AI Feeds
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#F5F8F6] border border-gray-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-[#063B2A] text-sm">Node {farmer.nearestCamera || 'CAM-023'}</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">ACTIVE 5G</span>
            </div>
            <p className="text-gray-600">
              Stationed 350m from paddy field perimeter. High-resolution thermal optical detection enabled.
            </p>
            <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
              <span>Battery: 98% (Solar)</span>
              <span>Trigger: Optical Neural Net</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5F8F6] border border-gray-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-[#063B2A] text-sm">Auxiliary Siren Sounder S-04</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">ARMED</span>
            </div>
            <p className="text-gray-600">
              Acoustic distress siren linked to emergency command network for immediate village evacuation alerts.
            </p>
            <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
              <span>Range: 1.5 km Radius</span>
              <span>Loudness: 118 dB Acoustic</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default FarmerDetails;

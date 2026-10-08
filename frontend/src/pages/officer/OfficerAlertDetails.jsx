import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  Camera, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Save, 
  Compass, 
  Layers, 
  Battery, 
  Sun, 
  Check
} from 'lucide-react';
import Button from '../../components/Button';
import StatusBadge from '../../components/officer/StatusBadge';
import { officerAlerts } from '../../data/officerAlerts';

const OfficerAlertDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find alert by ID, or fallback to first
  const initialAlert = officerAlerts.find(a => String(a.id) === String(id)) || officerAlerts[0];

  const [alert, setAlert] = useState(initialAlert);
  const [officerNotes, setOfficerNotes] = useState(initialAlert.notes || 'Perimeter camera detected herd crossing boundary. RRT squad alerted.');
  const [toast, setToast] = useState('');

  const handleVerifyAlert = () => {
    setAlert({ ...alert, status: 'Verified' });
    setToast('Alert status updated to Verified. Automated flash alert pushed to farmers!');
    setTimeout(() => setToast(''), 3000);
  };

  const handleRejectAlert = () => {
    setAlert({ ...alert, status: 'Rejected' });
    setToast('Alert marked as False Positive / Rejected.');
    setTimeout(() => setToast(''), 3000);
  };

  const handleSaveNotes = (e) => {
    e.preventDefault();
    setToast('Officer investigation notes saved to station incident log!');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/officer/alerts"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#063B2A] hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Wildlife Alerts</span>
        </Link>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Alert #{alert.id}</span>
          <span>•</span>
          <span className="font-mono text-emerald-800 font-bold">{alert.camera}</span>
        </div>
      </div>

      {toast && (
        <div className="p-3.5 bg-emerald-900 text-white text-xs font-bold rounded-2xl flex items-center gap-2 shadow-lg animate-fadeIn border border-emerald-500/40">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Main Alert Dossier Card */}
      <div className="bg-white rounded-3xl border border-emerald-950/10 shadow-soft p-6 sm:p-8 space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Large Image with AI Reticles (Prompt Section 10) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-black aspect-4/3 border-2 border-emerald-500/50 shadow-md">
              <img
                src={alert.image}
                alt={alert.animal}
                className="w-full h-full object-cover opacity-90"
              />

              {/* Laser Scan Animation */}
              <div className="ai-scan-line"></div>

              {/* Corner AI Reticles */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-emerald-400"></div>
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-emerald-400"></div>
              <div className="absolute bottom-16 left-4 w-6 h-6 border-b-2 border-l-2 border-emerald-400"></div>
              <div className="absolute bottom-16 right-4 w-6 h-6 border-b-2 border-r-2 border-emerald-400"></div>

              {/* AI Badge Overlay */}
              <div className="absolute top-4 left-5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-black text-xs font-black shadow-lg">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI DETECTED</span>
              </div>

              {/* Bottom HUD Box */}
              <div className="absolute bottom-3 inset-x-3 bg-black/80 backdrop-blur-md p-3.5 rounded-2xl border border-emerald-500/40 text-white flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black">{alert.animal}</h3>
                  <p className="text-xs text-emerald-400 font-mono font-bold">Neural Confidence: {alert.confidence}%</p>
                </div>
                <StatusBadge status={alert.status} size="sm" />
              </div>
            </div>

            {/* Sensor Telemetry Stats */}
            {alert.sensorData && (
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="text-[10px] text-gray-500 block">Temperature</span>
                  <strong className="text-gray-900">{alert.sensorData.temperature}</strong>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="text-[10px] text-gray-500 block">Humidity</span>
                  <strong className="text-gray-900">{alert.sensorData.humidity}</strong>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="text-[10px] text-gray-500 block">Battery</span>
                  <strong className="text-emerald-700">{alert.sensorData.battery}</strong>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="text-[10px] text-gray-500 block">Solar Level</span>
                  <strong className="text-amber-700">{alert.sensorData.solarCharge}</strong>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: AI Wildlife Detection Metadata (Prompt Section 10) */}
          <div className="lg:col-span-6 space-y-6">
            
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                Sensor Telemetry Record
              </span>
              <h2 className="text-2xl font-black text-[#063B2A] mt-2">
                AI Wildlife Detection
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Detailed neural inference output from edge optical sensor {alert.camera}.
              </p>
            </div>

            {/* Field Specification Grid */}
            <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-200/80 space-y-3 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-gray-200">
                <span className="text-gray-500 font-semibold">Animal Classified:</span>
                <strong className="text-gray-900 text-sm">{alert.animal}</strong>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-gray-200">
                <span className="text-gray-500 font-semibold">Neural Confidence:</span>
                <span className="font-mono text-emerald-700 font-extrabold text-sm">{alert.confidence}%</span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-gray-200">
                <span className="text-gray-500 font-semibold">Captured Date:</span>
                <strong className="text-gray-900">{alert.date}</strong>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-gray-200">
                <span className="text-gray-500 font-semibold">Captured Time:</span>
                <strong className="text-gray-900">{alert.time}</strong>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-gray-200">
                <span className="text-gray-500 font-semibold">Location:</span>
                <strong className="text-gray-900">{alert.location}</strong>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-gray-200">
                <span className="text-gray-500 font-semibold">Detection Source:</span>
                <strong className="text-emerald-800">{alert.source || 'AI Wildlife Camera'}</strong>
              </div>

              <div className="flex justify-between items-center py-1.5">
                <span className="text-gray-500 font-semibold">Current Verification Status:</span>
                <StatusBadge status={alert.status} />
              </div>
            </div>

            {/* Verification & Rejection Buttons (Prompt Section 10) */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleVerifyAlert}
                className="flex-1 py-3 px-4 bg-[#10B981] hover:bg-[#0ea371] text-white font-extrabold text-xs rounded-full transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Verify Alert</span>
              </button>

              <button
                onClick={handleRejectAlert}
                className="flex-1 py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-full transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject Alert</span>
              </button>
            </div>

            {/* Officer Notes Section (Prompt Section 10) */}
            <form onSubmit={handleSaveNotes} className="space-y-3 pt-2 border-t border-gray-100">
              <label className="block text-xs font-extrabold text-gray-800">
                Officer Notes &amp; Action Log
              </label>
              <textarea
                rows={3}
                value={officerNotes}
                onChange={(e) => setOfficerNotes(e.target.value)}
                placeholder="Enter field notes, dispatched patrol vehicle, or acoustic deterrent status..."
                className="w-full text-xs p-3 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 leading-relaxed"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold bg-[#063B2A] hover:bg-[#084833] text-white transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Notes</span>
              </button>
            </form>

          </div>

        </div>

        {/* =========================================================================
            SECTION 11: LOCATION SECTION (MAP PLACEHOLDER)
            ========================================================================= */}
        <div className="pt-6 border-t border-gray-100 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-[#063B2A] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                Detection Location
              </h3>
              <p className="text-xs text-gray-500">
                Sensor coordinates: {alert.coordinates || '11.6854° N, 76.1320° E'} • {alert.zone || 'Forest Boundary Perimeter'}
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              📍 {alert.location}
            </span>
          </div>

          {/* Professional Map-Style UI Placeholder (Ready for Leaflet / Google Maps API) */}
          <div className="relative rounded-3xl overflow-hidden h-64 bg-slate-900 border border-emerald-950/20 shadow-inner flex items-center justify-center text-white">
            {/* Visual map satellite grid simulation */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071A14] via-[#071A14]/60 to-transparent"></div>

            {/* Radar concentric rings */}
            <div className="absolute w-44 h-44 rounded-full border border-emerald-500/30 animate-ping pointer-events-none"></div>
            <div className="absolute w-72 h-72 rounded-full border border-emerald-500/20 pointer-events-none"></div>

            {/* Center Pin Marker Card */}
            <div className="relative z-10 flex flex-col items-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-glow-emerald ring-4 ring-emerald-400/40">
                <MapPin className="w-6 h-6 animate-bounce" />
              </div>

              <div className="bg-[#071A14]/90 backdrop-blur-md p-3 rounded-2xl border border-emerald-500/40 text-center shadow-xl">
                <p className="text-xs font-extrabold text-white">📍 Detection Location</p>
                <p className="text-[11px] text-emerald-400 font-bold">{alert.location}</p>
                <p className="text-[10px] text-gray-300 font-mono mt-0.5">{alert.coordinates || '11.6854° N, 76.1320° E'}</p>
              </div>
            </div>

            {/* Bottom HUD */}
            <div className="absolute bottom-3 left-4 text-[10px] font-mono text-gray-400 bg-black/60 px-3 py-1 rounded-full border border-gray-700">
              LEAFLET / MAPS READY PLACEHOLDER • SECTOR ZOOM LEVEL 14
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default OfficerAlertDetails;

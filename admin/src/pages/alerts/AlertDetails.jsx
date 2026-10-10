import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Radio, 
  Camera, 
  Battery, 
  Sun, 
  Wifi, 
  Send, 
  Share2, 
  Printer, 
  Compass, 
  Check 
} from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import { initialWildlifeAlerts } from '../../data/wildlifeAlerts';

const AlertDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find alert from dataset or fallback
  const alertData = initialWildlifeAlerts.find(a => a.id === id) || initialWildlifeAlerts[0];

  const [currentStatus, setCurrentStatus] = useState(alertData.status);
  const [officerNotes, setOfficerNotes] = useState(alertData.officerNotes || '');
  const [notificationStatus, setNotificationStatus] = useState('');
  const [squadDispatched, setSquadDispatched] = useState(false);

  const handleSaveAssessment = (e) => {
    e.preventDefault();
    setNotificationStatus('Assessment saved successfully!');
    setTimeout(() => setNotificationStatus(''), 3000);
  };

  const handleDispatchSquad = () => {
    setSquadDispatched(true);
    setNotificationStatus('Rapid Response Unit RRT-04 dispatched to zone coordinates.');
    setTimeout(() => setNotificationStatus(''), 4000);
  };

  const handleBroadcastSiren = () => {
    setNotificationStatus('High-Priority SMS siren broadcast dispatched to 1,420 farmers.');
    setTimeout(() => setNotificationStatus(''), 4000);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Toast Feedback */}
      {notificationStatus && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#071A14] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
          <span className="text-xs font-bold">{notificationStatus}</span>
        </div>
      )}

      {/* Navigation Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/alerts"
            className="p-2.5 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:text-[#063B2A] hover:bg-emerald-50 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                {alertData.id}
              </span>
              <StatusBadge status={currentStatus} />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#063B2A] tracking-tight">
              {alertData.animal} Sighting Investigation
            </h1>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="p-2.5 bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl text-gray-700 text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print Record</span>
          </button>
          <button
            onClick={handleBroadcastSiren}
            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-xs font-black shadow-md shadow-rose-600/20 active:scale-95 transition-all flex items-center gap-2"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Broadcast Village Siren</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Visuals & Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Optical Evidence & Topographical Radar */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* High-Resolution Camera Capture with AI Bounding Box */}
          <div className="bg-white rounded-3xl border border-emerald-950/10 shadow-soft overflow-hidden">
            <div className="relative h-80 sm:h-96 w-full bg-gray-900 group">
              <img
                src={alertData.image}
                alt={alertData.animal}
                className="w-full h-full object-cover"
              />

              {/* AI Detection Overlay Simulation */}
              <div className="absolute inset-8 border-2 border-dashed border-[#10B981] rounded-2xl pointer-events-none flex flex-col justify-between p-3 bg-emerald-500/5">
                <div className="flex items-center justify-between">
                  <span className="bg-[#071A14]/90 text-white text-[11px] font-mono px-2 py-0.5 rounded-lg border border-emerald-500/50">
                    OBJ_DETECT: {alertData.animal.toUpperCase()} [CONF: {alertData.confidence}%]
                  </span>
                  <span className="text-emerald-400 font-mono text-[10px] animate-pulse">
                    ● OPTICAL EDGE LIVE
                  </span>
                </div>
                <div className="text-[10px] font-mono text-emerald-300 bg-[#071A14]/80 px-2 py-0.5 rounded max-w-fit">
                  COORDS: {alertData.coordinates}
                </div>
              </div>

              {/* AI Scanline effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#10B981]/15 to-transparent h-20 w-full animate-pulse pointer-events-none"></div>

              {/* Top metadata tags */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="px-3 py-1 bg-[#071A14]/90 backdrop-blur-md rounded-full text-[#34D399] text-xs font-black flex items-center gap-1.5 border border-emerald-500/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Optical Sensor Capture</span>
                </div>
              </div>

              <div className="absolute top-4 right-4 bg-[#071A14]/90 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-mono font-bold border border-emerald-500/30">
                <span>Confidence: </span>
                <span className="text-[#34D399] font-black">{alertData.confidence}%</span>
              </div>
            </div>

            {/* Description & Suggested Action */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-extrabold text-[#063B2A] text-base mb-1">
                  Incident Telemetry Analysis
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {alertData.description}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
                <div className="flex items-center gap-2 font-black text-amber-950">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  <span>Standard Operating Protocol (Forest Directive):</span>
                </div>
                <p className="leading-relaxed">
                  {alertData.suggestedAction}
                </p>
              </div>
            </div>
          </div>

          {/* Topographical Radar Location Map */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-950/10 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#10B981]" />
                <h3 className="font-extrabold text-[#063B2A] text-base">
                  Geospatial Radar & Perimeter Buffer
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-gray-500">
                {alertData.coordinates}
              </span>
            </div>

            {/* Simulated Satellite/Topographical Map Graphic */}
            <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-emerald-950 border border-emerald-900/60 flex items-center justify-center">
              
              {/* Map grid lines */}
              <div className="absolute inset-0 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:24px_24px] opacity-25"></div>

              {/* Concentric buffer rings */}
              <div className="w-48 h-48 rounded-full border border-emerald-500/30 flex items-center justify-center animate-ping"></div>
              <div className="w-32 h-32 rounded-full border border-emerald-400/50 flex items-center justify-center absolute"></div>
              <div className="w-16 h-16 rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center absolute">
                <div className="w-4 h-4 rounded-full bg-rose-600 animate-bounce"></div>
              </div>

              {/* Overlaid labels */}
              <div className="absolute top-4 left-4 bg-[#071A14]/90 p-2.5 rounded-xl border border-emerald-800 text-[11px] space-y-1 text-white">
                <p className="font-bold text-emerald-400">Target: {alertData.animal}</p>
                <p className="text-gray-300">Buffer Zone: 500m Outer Farm Boundary</p>
                <p className="text-gray-400 font-mono text-[10px]">Lat/Long: {alertData.coordinates}</p>
              </div>

              <div className="absolute bottom-4 right-4 bg-[#071A14]/90 px-3 py-1.5 rounded-xl border border-emerald-800 text-[10px] text-gray-300 font-mono">
                Satellite Tile: Forest Sector 4-B
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
              <div className="bg-[#F5F8F6] p-3 rounded-2xl">
                <span className="text-gray-400 block text-[10px]">Nearest Village</span>
                <span className="font-bold text-gray-900">Muthanga (600m)</span>
              </div>
              <div className="bg-[#F5F8F6] p-3 rounded-2xl">
                <span className="text-gray-400 block text-[10px]">Patrol Sector</span>
                <span className="font-bold text-gray-900">Sector 4 Boundary</span>
              </div>
              <div className="bg-[#F5F8F6] p-3 rounded-2xl">
                <span className="text-gray-400 block text-[10px]">Solar Fence Status</span>
                <span className="font-bold text-emerald-600">Active (7.4 kV)</span>
              </div>
              <div className="bg-[#F5F8F6] p-3 rounded-2xl">
                <span className="text-gray-400 block text-[10px]">Weather / Wind</span>
                <span className="font-bold text-gray-900">21°C • NW 8 km/h</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Col: Sensor Health & Forest Officer Assessment Panel */}
        <div className="space-y-6">
          
          {/* Edge Sensor Node Telemetry */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-950/10 shadow-soft space-y-4">
            <h3 className="font-extrabold text-[#063B2A] text-base pb-3 border-b border-gray-100 flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#10B981]" />
              Camera Node Diagnostics
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F5F8F6]">
                <span className="text-gray-600 font-medium">Node ID</span>
                <span className="font-mono font-bold text-[#063B2A]">{alertData.camera}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F5F8F6]">
                <span className="text-gray-600 font-medium flex items-center gap-1.5">
                  <Battery className="w-3.5 h-3.5 text-emerald-600" /> Battery Level
                </span>
                <span className="font-mono font-bold text-emerald-600">
                  {alertData.sensorData?.battery || '98%'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F5F8F6]">
                <span className="text-gray-600 font-medium flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-500" /> Solar Charging
                </span>
                <span className="font-mono font-bold text-amber-600">
                  {alertData.sensorData?.solarCharge || '94%'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F5F8F6]">
                <span className="text-gray-600 font-medium flex items-center gap-1.5">
                  <Wifi className="w-3.5 h-3.5 text-blue-500" /> Uplink Signal
                </span>
                <span className="font-mono font-bold text-blue-600">
                  {alertData.sensorData?.signal || '5G Ultra Low-Latency'}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Officer Assessment & Action Form */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-950/10 shadow-soft space-y-5">
            <div>
              <h3 className="font-extrabold text-[#063B2A] text-base">
                Officer Action & Verification
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Authorize official action and notify patrolling forest guards
              </p>
            </div>

            <form onSubmit={handleSaveAssessment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Assessment Verification Status
                </label>
                <select
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)}
                  className="w-full text-xs p-3 rounded-2xl bg-[#F5F8F6] border border-gray-200 font-semibold focus:outline-none focus:border-emerald-300"
                >
                  <option value="Verified">Verified Threat</option>
                  <option value="Pending Verification">Pending Verification</option>
                  <option value="False Alarm">False Alarm (Sensor Glitch)</option>
                  <option value="Resolved">Resolved / Cleared</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Officer Action Log & Field Instructions
                </label>
                <textarea
                  rows={4}
                  value={officerNotes}
                  onChange={(e) => setOfficerNotes(e.target.value)}
                  placeholder="Record tactical decisions, patrolling unit instructions, or deterrent status..."
                  className="w-full text-xs p-3 rounded-2xl bg-[#F5F8F6] border border-gray-200 focus:outline-none focus:border-emerald-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#063B2A] hover:bg-emerald-900 text-white font-extrabold text-xs rounded-2xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Save Assessment Assessment</span>
              </button>
            </form>

            <div className="pt-2 border-t border-gray-100 space-y-2">
              <button
                onClick={handleDispatchSquad}
                disabled={squadDispatched}
                className={`w-full py-3 px-4 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 ${
                  squadDispatched
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-[#10B981] hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20 active:scale-[0.99]'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>{squadDispatched ? 'Squad RRT-04 En Route' : 'Dispatch Rapid Patrol Squad'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AlertDetails;


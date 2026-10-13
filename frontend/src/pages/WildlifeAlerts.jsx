import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  MapPin, 
  Clock, 
  Camera, 
  AlertTriangle, 
  CheckCircle2, 
  Filter, 
  Search, 
  Eye, 
  X, 
  Radio, 
  Volume2, 
  VolumeX,
  Compass,
  ArrowRight,
  Shield,
  Send,
  ShieldCheck,
  BellRing,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import Button from '../components/Button';
import { sampleWildlifeAlerts } from '../data/mockData';
import { getBroadcastAlerts } from '../utils/broadcastStorage';
import { api } from '../utils/api';

const WildlifeAlerts = () => {
  const [alerts, setAlerts] = useState(sampleWildlifeAlerts);
  const [broadcastAlerts, setBroadcastAlerts] = useState([]);
  const [selectedAnimalFilter, setSelectedAnimalFilter] = useState('All');
  const [selectedSeverityFilter, setSelectedSeverityFilter] = useState('All');
  const [selectedAlertForModal, setSelectedAlertForModal] = useState(null);
  const [sirenPlayingId, setSirenPlayingId] = useState(null);

  const animalOptions = ['All', 'Elephant', 'Leopard', 'Wild Boar', 'Spotted Deer', 'Sloth Bear'];

  useEffect(() => {
    loadAlertsAndBroadcasts();

    // Listen for storage changes across tabs
    const handleStorageChange = () => {
      loadAlertsAndBroadcasts();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('agrishield_broadcast_sent', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('agrishield_broadcast_sent', handleStorageChange);
    };
  }, []);

  const loadAlertsAndBroadcasts = async () => {
    // 1. Load from shared local storage
    const localBroadcasts = getBroadcastAlerts();
    setBroadcastAlerts(localBroadcasts);

    // 2. Try fetching from backend API
    try {
      const res = await api.get('/alerts');
      if (res && res.alerts && Array.isArray(res.alerts)) {
        setAlerts(res.alerts);
        const serverBroadcasts = res.alerts.filter(
          (a) => a.broadcastSent || a.source === 'Forest Officer Broadcast'
        );
        if (serverBroadcasts.length > 0) {
          // Merge unique by id
          const combined = [...serverBroadcasts];
          localBroadcasts.forEach((lb) => {
            if (!combined.some((c) => String(c.id) === String(lb.id))) {
              combined.push(lb);
            }
          });
          setBroadcastAlerts(combined);
        }
      }
    } catch {
      // Offline fallback
    }
  };

  const handleToggleSiren = (alertId) => {
    if (sirenPlayingId === alertId) {
      setSirenPlayingId(null);
    } else {
      setSirenPlayingId(alertId);
      // Automatically turn off siren simulation after 6 seconds
      setTimeout(() => {
        setSirenPlayingId(null);
      }, 6000);
    }
  };

  const filteredAlerts = alerts.filter((alert) => {
    const matchAnimal = selectedAnimalFilter === 'All' || alert.animal.toLowerCase() === selectedAnimalFilter.toLowerCase();
    const matchSeverity = selectedSeverityFilter === 'All' || alert.severity.toLowerCase() === selectedSeverityFilter.toLowerCase();
    return matchAnimal && matchSeverity;
  });

  const getSeverityPill = (severity = 'Moderate') => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">Critical Hazard</span>;
      case 'high':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">High Priority</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">Monitored</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8F6] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Hero */}
        <div className="bg-gradient-to-r from-[#071A14] via-[#063B2A] to-[#071A14] rounded-3xl p-6 sm:p-10 text-white border border-emerald-900/40 shadow-soft-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                Live Wildlife Perimeter Radar
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              AI Wildlife Threat &amp; Sighting Alerts
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              Real-time deep learning detection from solar trail cameras placed across Kerala forest borders. Immediate warnings sent to farmers to prevent human-animal conflict.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Button
              to="/wildlife-camera"
              variant="primary"
              size="md"
              className="bg-[#10B981] hover:bg-[#0ea371] text-white font-semibold rounded-full shadow-glow-emerald"
              icon={Camera}
            >
              Open Live AI Camera
            </Button>
            <Button
              to="/complaints"
              variant="outline"
              size="md"
              className="text-white border-emerald-600 rounded-full"
            >
              Report Sighting
            </Button>
          </div>
        </div>

        {/* 🚨 SPECIAL SECTION: Official Forest Department Emergency Broadcasts to Farmers */}
        {broadcastAlerts.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center animate-pulse shadow-md shadow-rose-600/30">
                  <BellRing className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-[#063B2A] flex items-center gap-2">
                    Official Forest Department Emergency Warnings
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 font-extrabold border border-rose-200">
                      {broadcastAlerts.length} Active Broadcast{broadcastAlerts.length > 1 ? 's' : ''}
                    </span>
                  </h2>
                  <p className="text-xs text-gray-500">
                    High-priority security directives transmitted directly by on-duty Forest Range Officers
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {broadcastAlerts.map((b) => {
                const isPlaying = sirenPlayingId === b.id;
                return (
                  <div
                    key={b.id || b._id}
                    className="relative bg-gradient-to-br from-rose-50/90 via-white to-amber-50/40 rounded-3xl p-6 sm:p-7 border-2 border-rose-300 shadow-xl overflow-hidden space-y-4"
                  >
                    {/* Top Emergency Beacon Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-rose-100">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping"></span>
                        <span className="text-[11px] font-black uppercase tracking-wider bg-rose-600 text-white px-3 py-1 rounded-full shadow-xs">
                          {b.severity || 'Critical'} Warning Broadcast
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-gray-500">
                        {b.time || 'Recent'} • {b.date || 'Today'}
                      </span>
                    </div>

                    {/* Threat Headline */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">
                          {b.animal?.toLowerCase().includes('elephant') ? '🐘' : b.animal?.toLowerCase().includes('leopard') ? '🐆' : b.animal?.toLowerCase().includes('tiger') ? '🐅' : '🐗'}
                        </span>
                        <h3 className="text-xl font-black text-[#063B2A] leading-snug">
                          {b.title || `${b.animal} Alert: ${b.zone || b.location}`}
                        </h3>
                      </div>
                      <p className="text-xs text-rose-950 font-medium mt-1 leading-relaxed">
                        {b.description}
                      </p>
                    </div>

                    {/* Official Forest Officer Directive Card */}
                    <div className="bg-white/90 rounded-2xl p-4 border border-rose-200/80 shadow-xs space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-black text-rose-800">
                        <ShieldCheck className="w-4 h-4 text-rose-600" />
                        <span>Action Required &amp; Citizen Safety Protocol:</span>
                      </div>
                      <p className="text-xs font-bold text-gray-800 leading-relaxed pl-5 border-l-2 border-rose-500">
                        {b.suggestedAction || 'Stay indoors. Illuminate boundary solar fences. Keep livestock secured. Avoid forest perimeter trails.'}
                      </p>
                    </div>

                    {/* Metadata & Sirens Bar */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span className="font-bold">{b.zone || b.location}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleSiren(b.id)}
                          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold text-xs transition-all shadow-xs ${
                            isPlaying
                              ? 'bg-rose-600 text-white animate-pulse'
                              : 'bg-rose-100 hover:bg-rose-200 text-rose-800'
                          }`}
                        >
                          {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                          <span>{isPlaying ? 'Siren Active (Playing...)' : 'Test Deterrent Siren'}</span>
                        </button>
                        <Link
                          to="/complaints"
                          className="px-3.5 py-1.5 rounded-full bg-[#063B2A] text-white hover:bg-emerald-950 font-bold transition-all"
                        >
                          Report Sighting
                        </Link>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 text-emerald-900 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="font-bold">Forest Perimeter Status:</span>
              <span className="text-emerald-800">All buffer sectors normal. No active evacuation emergency broadcasts currently issued by Forest Officers.</span>
            </div>
            <span className="font-mono text-[11px] font-bold text-emerald-700 hidden sm:inline">Defcon 4 • Stable</span>
          </div>
        )}

        {/* Filters and Controls Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border border-emerald-950/10 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto text-xs pb-1 sm:pb-0">
            <span className="font-bold text-gray-500 shrink-0">Filter Species:</span>
            {animalOptions.map((animal) => (
              <button
                key={animal}
                onClick={() => setSelectedAnimalFilter(animal)}
                className={`px-3 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap ${
                  selectedAnimalFilter === animal
                    ? 'bg-[#063B2A] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-emerald-50'
                }`}
              >
                {animal}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end text-xs">
            <span className="font-bold text-gray-500">Severity:</span>
            {['All', 'Critical', 'High', 'Moderate'].map((sev) => (
              <button
                key={sev}
                onClick={() => setSelectedSeverityFilter(sev)}
                className={`px-2.5 py-1 rounded-full font-medium ${
                  selectedSeverityFilter === sev
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        {/* Camera Trap Optical Detections Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-[#063B2A]">
                AI Camera Trap Sensor Feeds
              </h2>
              <p className="text-xs text-gray-500">
                Automated optical captures triggered across border zones
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {filteredAlerts.length} Optical Detections
            </span>
          </div>

          {filteredAlerts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-emerald-950/10 shadow-soft space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-[#063B2A]">All Boundaries Clear</h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                No active camera trap alerts detected. The forest perimeter is quiet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id || alert._id}
                className="group bg-white rounded-3xl border border-emerald-950/10 shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  {/* Image Banner with Confidence & AI Badge */}
                  <div className="relative h-52 w-full overflow-hidden bg-gray-900">
                    <img
                      src={alert.image}
                      alt={alert.animal}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Top Left AI Pill */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#071A14]/80 backdrop-blur-md text-emerald-400 text-xs font-bold border border-emerald-500/30">
                      <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                      <span>AI DETECTED</span>
                    </div>

                    {/* Top Right Severity Pill */}
                    <div className="absolute top-3 right-3">
                      {getSeverityPill(alert.severity)}
                    </div>

                    {/* Bottom Confidence Gauge Pill */}
                    <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full text-white text-xs font-bold border border-emerald-400/40 flex items-center gap-1.5">
                      <span className="text-emerald-400 font-extrabold">{alert.confidence}%</span>
                      <span className="text-[10px] text-gray-300">Confidence</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="text-xl font-black text-gray-900 group-hover:text-emerald-700 transition-colors">
                        {alert.animal} Detected
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">{alert.zone}</p>
                    </div>

                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {alert.description}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-gray-100 text-xs text-gray-600">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-gray-500">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Location:
                        </span>
                        <strong className="text-gray-900">{alert.location}</strong>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-gray-500">
                          <Clock className="w-3.5 h-3.5 text-emerald-600" /> Sighted At:
                        </span>
                        <span>{alert.dateTime || `${alert.date || 'Today'}, ${alert.time || ''}`}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-gray-500">
                          <Camera className="w-3.5 h-3.5 text-emerald-600" /> Camera:
                        </span>
                        <span className="font-mono text-emerald-700 font-bold">{alert.camera}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>

      </div>
    </div>
  );
};

export default WildlifeAlerts;

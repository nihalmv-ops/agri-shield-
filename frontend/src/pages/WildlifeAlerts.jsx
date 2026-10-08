import React, { useState } from 'react';
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
  Compass,
  ArrowRight,
  Shield
} from 'lucide-react';
import Button from '../components/Button';
import { sampleWildlifeAlerts } from '../data/mockData';

const WildlifeAlerts = () => {
  const [alerts, setAlerts] = useState(sampleWildlifeAlerts);
  const [selectedAnimalFilter, setSelectedAnimalFilter] = useState('All');
  const [selectedSeverityFilter, setSelectedSeverityFilter] = useState('All');
  const [selectedAlertForModal, setSelectedAlertForModal] = useState(null);
  const [alarmActive, setAlarmActive] = useState(false);

  const animalOptions = ['All', 'Elephant', 'Leopard', 'Wild Boar', 'Spotted Deer', 'Sloth Bear'];

  const filteredAlerts = alerts.filter((alert) => {
    const matchAnimal = selectedAnimalFilter === 'All' || alert.animal.toLowerCase() === selectedAnimalFilter.toLowerCase();
    const matchSeverity = selectedSeverityFilter === 'All' || alert.severity.toLowerCase() === selectedSeverityFilter.toLowerCase();
    return matchAnimal && matchSeverity;
  });

  const getSeverityPill = (severity) => {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero */}
        <div className="bg-gradient-to-r from-[#071A14] via-[#063B2A] to-[#071A14] rounded-3xl p-6 sm:p-10 text-white mb-8 border border-emerald-900/40 shadow-soft-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
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

        {/* Filters and Controls Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-emerald-950/10 shadow-soft mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto text-xs pb-1 sm:pb-0">
            <span className="font-bold text-gray-500 shrink-0">Species:</span>
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

        {/* Alerts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
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
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-black text-gray-900 group-hover:text-emerald-700 transition-colors">
                        {alert.animal} Detected
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">{alert.zone}</p>
                    </div>
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
                      <span>{alert.dateTime}</span>
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

              {/* Bottom Actions */}
              <div className="p-5 pt-0">
                <Button
                  variant="outlineDark"
                  size="sm"
                  className="w-full rounded-full font-semibold"
                  icon={Eye}
                  onClick={() => setSelectedAlertForModal(alert)}
                >
                  View Details &amp; Precautions
                </Button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Alert Details Modal */}
      {selectedAlertForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-emerald-900/10 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-gray-900">
                    {selectedAlertForModal.animal} Alert Dossier
                  </h3>
                  <p className="text-xs text-gray-500">Verified by {selectedAlertForModal.officerInCharge}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAlertForModal(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden h-48 bg-gray-900 relative">
              <img
                src={selectedAlertForModal.image}
                alt={selectedAlertForModal.animal}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 px-3 py-1 bg-black/80 rounded-lg text-emerald-400 text-xs font-mono font-bold">
                Confidence: {selectedAlertForModal.confidence}%
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                <p className="font-bold text-gray-800">Situation Brief:</p>
                <p className="text-gray-600 leading-relaxed">{selectedAlertForModal.description}</p>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
                <p className="font-bold text-amber-900 flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Recommended Action For Nearby Farmers:
                </p>
                <p className="text-amber-800 leading-relaxed">{selectedAlertForModal.suggestedAction}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-gray-600 pt-1">
                <div>
                  <span className="text-[11px] text-gray-400 block">Sensor Coordinates</span>
                  <strong>{selectedAlertForModal.zone}</strong>
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 block">Assigned Forest Officer</span>
                  <strong>{selectedAlertForModal.officerInCharge}</strong>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedAlertForModal(null)}
              >
                Close
              </Button>
              <Button
                to="/wildlife-camera"
                variant="primary"
                size="sm"
                className="bg-[#10B981] text-white"
              >
                Switch to Live Trail Cam
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WildlifeAlerts;

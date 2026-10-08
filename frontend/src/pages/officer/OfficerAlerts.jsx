import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  ArrowLeft, 
  Radio, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Filter, 
  Search, 
  Send,
  Eye
} from 'lucide-react';
import Button from '../../components/Button';
import { sampleWildlifeAlerts } from '../../data/mockData';

const OfficerAlerts = () => {
  const [alerts, setAlerts] = useState(sampleWildlifeAlerts);
  const [filter, setFilter] = useState('All');
  const [toast, setToast] = useState('');

  const handleVerify = (id) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, verified: true, status: 'Verified Threat' } : a));
    setToast(`Alert ${id} marked verified by Range Officer.`);
    setTimeout(() => setToast(''), 3000);
  };

  const handleDispatch = (id, animal) => {
    setToast(`Emergency Ranger Squad dispatched for ${animal} at ${id}!`);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F5F8F6] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/officer/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#063B2A] hover:text-emerald-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Officer Command Dashboard</span>
          </Link>
          <span className="text-xs text-gray-500 font-semibold">Forest Ranger Station Grid</span>
        </div>

        {/* Header */}
        <div className="bg-[#063B2A] rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-800">
              Surveillance Grid
            </span>
            <h1 className="text-2xl sm:text-3xl font-black mt-2">
              Forest Officer — Wildlife Threat Register
            </h1>
            <p className="text-xs text-gray-300 mt-1">
              Verify automated sensor detections, trigger audio acoustic fences, and dispatch rapid squads.
            </p>
          </div>

          <div className="text-right">
            <span className="text-3xl font-black text-emerald-400">24</span>
            <span className="text-xs text-gray-300 block">Active Alerts</span>
          </div>
        </div>

        {toast && (
          <div className="p-3 bg-emerald-900 text-white rounded-2xl text-xs font-bold mb-6 flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toast}</span>
          </div>
        )}

        {/* Alerts Table */}
        <div className="bg-white rounded-3xl border border-emerald-950/10 shadow-soft overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-extrabold text-[#063B2A] text-base">Alerts Queue</h3>
            <div className="flex gap-2 text-xs">
              {['All', 'Elephant', 'Leopard', 'Wild Boar'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-full font-bold transition-all ${
                    filter === f ? 'bg-[#063B2A] text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {alerts
              .filter(a => filter === 'All' || a.animal === filter)
              .map((alert) => (
                <div key={alert.id} className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <img
                      src={alert.image}
                      alt={alert.animal}
                      className="w-16 h-16 rounded-2xl object-cover shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-900 text-base">{alert.animal}</h4>
                        <span className="font-mono text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {alert.confidence}% AI Confidence
                        </span>
                        {alert.verified ? (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            ✓ Verified
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                            Pending Verification
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{alert.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                          {alert.location} ({alert.zone})
                        </span>
                        <span>•</span>
                        <span>{alert.dateTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    {!alert.verified && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleVerify(alert.id)}
                        className="bg-[#10B981] text-white text-xs"
                      >
                        Confirm Alert
                      </Button>
                    )}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDispatch(alert.id, alert.animal)}
                      className="text-xs"
                    >
                      Dispatch Squad
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default OfficerAlerts;

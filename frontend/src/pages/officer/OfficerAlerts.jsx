import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Radio, 
  Search, 
  Filter, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Camera, 
  ArrowRight, 
  Sparkles,
  X
} from 'lucide-react';
import AlertCard from '../../components/officer/AlertCard';
import StatusBadge from '../../components/officer/StatusBadge';
import { officerAlerts } from '../../data/officerAlerts';

const OfficerAlerts = () => {
  const [alerts, setAlerts] = useState(officerAlerts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAnimal, setSelectedAnimal] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [toast, setToast] = useState('');

  const animals = ['All', 'Elephant', 'Leopard', 'Wild Boar', 'Spotted Deer', 'Sloth Bear', 'Bengal Tiger'];
  const statuses = ['All', 'Pending Verification', 'Verified', 'Under Review'];

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchSearch = !searchQuery || 
        alert.animal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.camera.toLowerCase().includes(searchQuery.toLowerCase());

      const matchAnimal = selectedAnimal === 'All' || alert.animal.toLowerCase() === selectedAnimal.toLowerCase();
      const matchStatus = selectedStatus === 'All' || alert.status.toLowerCase() === selectedStatus.toLowerCase();

      return matchSearch && matchAnimal && matchStatus;
    });
  }, [alerts, searchQuery, selectedAnimal, selectedStatus]);

  const handleVerify = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Verified' } : a));
    setToast(`Alert #${id} marked as Verified! Nearby farmer clusters notified.`);
    setTimeout(() => setToast(''), 3000);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedAnimal('All');
    setSelectedStatus('All');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200 mb-1">
            <Radio className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
            <span>Autonomous Optical Grid</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#063B2A]">
            Wildlife Alerts Registry
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Real-time automated edge-AI animal detections from solar camera traps across Kerala.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/wildlife-camera"
            className="px-4 py-2 bg-[#063B2A] hover:bg-[#084833] text-white text-xs font-bold rounded-full transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Camera className="w-3.5 h-3.5 text-emerald-400" />
            <span>Live Vision HUD</span>
          </Link>
        </div>
      </div>

      {toast && (
        <div className="p-3.5 bg-emerald-900 text-white text-xs font-bold rounded-2xl flex items-center gap-2 shadow-md animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Filter and Search Controls */}
      <div className="bg-white rounded-3xl p-5 border border-emerald-950/10 shadow-soft space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Search Box (6 cols) */}
          <div className="md:col-span-6 relative">
            <input
              type="text"
              placeholder="Search by animal, zone, camera (e.g. Elephant, CAM-023)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Status Filter (6 cols) */}
          <div className="md:col-span-6 flex items-center gap-1.5 overflow-x-auto text-xs">
            <span className="font-bold text-gray-500 shrink-0 mr-1">Status:</span>
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-full font-bold transition-all whitespace-nowrap ${
                  selectedStatus === st
                    ? 'bg-[#063B2A] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-emerald-50'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

        </div>

        {/* Animal Species Pills Row */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 text-xs">
          <span className="font-bold text-gray-500 shrink-0 mr-1">Species:</span>
          {animals.map((an) => (
            <button
              key={an}
              onClick={() => setSelectedAnimal(an)}
              className={`px-3 py-1 rounded-full font-semibold transition-all whitespace-nowrap ${
                selectedAnimal === an
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-emerald-50'
              }`}
            >
              {an}
            </button>
          ))}

          {(selectedAnimal !== 'All' || selectedStatus !== 'All' || searchQuery) && (
            <button
              onClick={handleClearFilters}
              className="text-xs text-rose-600 hover:underline font-bold ml-auto shrink-0"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-gray-500 px-1">
        <span>Showing <strong>{filteredAlerts.length}</strong> active detection events</span>
        <span className="text-emerald-800 font-bold">YOLOv10 Wildlife Neural Mesh Online</span>
      </div>

      {/* Alerts Grid */}
      {filteredAlerts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onVerify={handleVerify}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 max-w-md mx-auto space-y-3">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <Radio className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-gray-900 text-base">No alerts match this filter</h3>
          <p className="text-xs text-gray-500">Try adjusting your search criteria or species selection.</p>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-emerald-600 text-white rounded-full text-xs font-bold"
          >
            Show All Alerts
          </button>
        </div>
      )}

    </div>
  );
};

export default OfficerAlerts;

import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Radio, 
  Search, 
  Filter, 
  Grid, 
  List, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  MapPin, 
  Clock, 
  Eye, 
  ShieldAlert, 
  X, 
  ArrowUpDown 
} from 'lucide-react';
import WildlifeAlertCard from '../../components/WildlifeAlertCard';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import { initialWildlifeAlerts } from '../../data/wildlifeAlerts';

const Alerts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('search') || '';

  const [alerts, setAlerts] = useState(initialWildlifeAlerts);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedAnimal, setSelectedAnimal] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [feedbackToast, setFeedbackToast] = useState('');

  // Handle Quick Verification
  const handleVerify = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Verified' } : a));
    setFeedbackToast(`Alert ${id} successfully verified & flagged to Rapid Patrol squad!`);
    setTimeout(() => setFeedbackToast(''), 3000);
  };

  // Handle False Alarm
  const handleFalseAlarm = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'False Alarm' } : a));
    setFeedbackToast(`Alert ${id} recorded as false alarm. Sensor tuning requested.`);
    setTimeout(() => setFeedbackToast(''), 3000);
  };

  // Filtered & Sorted Alerts
  const filteredAlerts = useMemo(() => {
    return alerts
      .filter((alert) => {
        const matchesQuery = 
          alert.animal.toLowerCase().includes(searchQuery.toLowerCase()) ||
          alert.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          alert.camera.toLowerCase().includes(searchQuery.toLowerCase()) ||
          alert.id.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesAnimal = selectedAnimal === 'All' || alert.animal === selectedAnimal;
        const matchesStatus = selectedStatus === 'All' || alert.status === selectedStatus;
        const matchesSeverity = selectedSeverity === 'All' || alert.severity === selectedSeverity;

        return matchesQuery && matchesAnimal && matchesStatus && matchesSeverity;
      })
      .sort((a, b) => {
        if (sortBy === 'confidence') {
          return b.confidence - a.confidence;
        }
        if (sortBy === 'oldest') {
          return a.id.localeCompare(b.id);
        }
        // default newest
        return b.id.localeCompare(a.id);
      });
  }, [alerts, searchQuery, selectedAnimal, selectedStatus, selectedSeverity, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedAnimal('All');
    setSelectedStatus('All');
    setSelectedSeverity('All');
    setSortBy('newest');
    setSearchParams({});
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Toast notification */}
      {feedbackToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#071A14] text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
          <span className="text-xs font-bold">{feedbackToast}</span>
          <button onClick={() => setFeedbackToast('')} className="p-1 hover:text-gray-300">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-emerald-100 flex items-center justify-center text-[#10B981]">
              <Radio className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-[#063B2A] tracking-tight">
              Wildlife Alerts & Optical Sensors
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Real-time optical traps, motion radar detections, and automated animal intrusion alarms
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <div className="bg-white p-1 rounded-2xl border border-gray-200 flex items-center shadow-xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-colors ${
                viewMode === 'grid' ? 'bg-[#063B2A] text-white' : 'text-gray-500 hover:text-gray-800'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-xl transition-colors ${
                viewMode === 'table' ? 'bg-[#063B2A] text-white' : 'text-gray-500 hover:text-gray-800'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Control Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-emerald-950/10 shadow-soft space-y-4">
        
        {/* Top Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by animal (e.g. Elephant), camera ID (CAM-023), or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F5F8F6] text-xs text-[#071A14] pl-10 pr-10 py-3 rounded-2xl border border-transparent focus:border-emerald-300 focus:bg-white focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Secondary Filter Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          
          {/* Animal Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              Species
            </label>
            <select
              value={selectedAnimal}
              onChange={(e) => setSelectedAnimal(e.target.value)}
              className="w-full bg-[#F5F8F6] py-2 px-3 rounded-xl border border-gray-200 text-gray-800 font-semibold focus:outline-none focus:border-emerald-300"
            >
              <option value="All">All Species</option>
              <option value="Elephant">Elephant</option>
              <option value="Leopard">Leopard</option>
              <option value="Wild Boar">Wild Boar</option>
              <option value="Spotted Deer">Spotted Deer</option>
              <option value="Sloth Bear">Sloth Bear</option>
              <option value="Tiger">Tiger</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              Verification Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-[#F5F8F6] py-2 px-3 rounded-xl border border-gray-200 text-gray-800 font-semibold focus:outline-none focus:border-emerald-300"
            >
              <option value="All">All Statuses</option>
              <option value="Pending Verification">Pending Verification</option>
              <option value="Verified">Verified</option>
              <option value="False Alarm">False Alarm</option>
            </select>
          </div>

          {/* Severity Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              Threat Severity
            </label>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full bg-[#F5F8F6] py-2 px-3 rounded-xl border border-gray-200 text-gray-800 font-semibold focus:outline-none focus:border-emerald-300"
            >
              <option value="All">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Moderate">Moderate</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              Order By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-[#F5F8F6] py-2 px-3 rounded-xl border border-gray-200 text-gray-800 font-semibold focus:outline-none focus:border-emerald-300"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="confidence">Highest Confidence</option>
            </select>
          </div>

        </div>

        {/* Counter & Clear Active Filter */}
        <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100 text-gray-500">
          <span>
            Showing <strong className="text-[#063B2A]">{filteredAlerts.length}</strong> of {alerts.length} optical records
          </span>

          {(searchQuery || selectedAnimal !== 'All' || selectedStatus !== 'All' || selectedSeverity !== 'All') && (
            <button
              onClick={resetFilters}
              className="text-[#10B981] font-bold hover:underline"
            >
              Reset all filters
            </button>
          )}
        </div>

      </div>

      {/* Main Content: Grid or Table */}
      {filteredAlerts.length === 0 ? (
        <EmptyState
          title="No Wildlife Alerts Found"
          message="No optical sensors or field telemetry matched your search and filter criteria."
          actionText="Clear All Filters"
          onAction={resetFilters}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlerts.map((alert) => (
            <WildlifeAlertCard
              key={alert.id}
              alert={alert}
              onVerify={handleVerify}
            />
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-3xl border border-emerald-950/10 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#F5F8F6] text-gray-500 uppercase tracking-wider font-extrabold text-[10px] border-b border-gray-100">
                  <th className="py-3.5 px-4">Alert</th>
                  <th className="py-3.5 px-4">Species</th>
                  <th className="py-3.5 px-4">Confidence</th>
                  <th className="py-3.5 px-4">Camera ID</th>
                  <th className="py-3.5 px-4">Zone & Location</th>
                  <th className="py-3.5 px-4">Timestamp</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAlerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-emerald-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-gray-600">
                      {alert.id}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-gray-900">
                      <div className="flex items-center gap-3">
                        <img
                          src={alert.image}
                          alt={alert.animal}
                          className="w-10 h-10 rounded-xl object-cover border border-emerald-950/10"
                        />
                        <span>{alert.animal}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2 font-mono font-extrabold">
                        <span className="text-[#063B2A]">{alert.confidence}%</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-semibold text-gray-600">
                      {alert.camera}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-gray-800 block">{alert.location}</span>
                      <span className="text-[10px] text-gray-400 block">{alert.zone}</span>
                    </td>

                    <td className="py-3.5 px-4 text-gray-500">
                      <span className="block font-medium">{alert.time}</span>
                      <span className="text-[10px] text-gray-400">{alert.date}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusBadge status={alert.status} />
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {alert.status !== 'Verified' && (
                          <button
                            onClick={() => handleVerify(alert.id)}
                            className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-extrabold text-[11px] rounded-xl transition-colors"
                          >
                            Verify
                          </button>
                        )}
                        {alert.status !== 'False Alarm' && (
                          <button
                            onClick={() => handleFalseAlarm(alert.id)}
                            className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-[10px] rounded-xl transition-colors"
                          >
                            False Alarm
                          </button>
                        )}
                        <Link
                          to={`/admin/alerts/${alert.id}`}
                          className="p-1.5 text-gray-400 hover:text-[#063B2A] rounded-xl hover:bg-gray-100"
                        >
                          <Eye className="w-4 h-4" />
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

    </div>
  );
};

export default Alerts;


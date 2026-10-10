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
  ArrowUpDown,
  Download,
  Camera,
  Battery,
  Sun,
  Wifi,
  Scan,
  Send,
  Volume2,
  Check,
  Maximize2
} from 'lucide-react';
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
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table' | 'sensors'
  
  // Quick Inspect Modal
  const [inspectAlert, setInspectAlert] = useState(null);
  const [inspectVision, setInspectVision] = useState('color'); // 'color' | 'nightvision' | 'thermal'
  const [feedbackToast, setFeedbackToast] = useState('');

  // Selected IDs for Bulk Actions
  const [selectedIds, setSelectedIds] = useState([]);

  const showToast = (msg) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(''), 3000);
  };

  const handleVerify = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Verified' } : a));
    showToast(`Alert #${id} verified. Rapid response logged.`);
    if (inspectAlert && inspectAlert.id === id) {
      setInspectAlert(prev => ({ ...prev, status: 'Verified' }));
    }
  };

  const handleFalseAlarm = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'False Alarm' } : a));
    showToast(`Alert #${id} marked as False Alarm.`);
    if (inspectAlert && inspectAlert.id === id) {
      setInspectAlert(prev => ({ ...prev, status: 'False Alarm' }));
    }
  };

  const handleBulkVerify = () => {
    if (selectedIds.length === 0) return;
    setAlerts(prev => prev.map(a => selectedIds.includes(a.id) ? { ...a, status: 'Verified' } : a));
    showToast(`Verified ${selectedIds.length} selected alerts in bulk.`);
    setSelectedIds([]);
  };

  // Filtered & Sorted Alerts
  const filteredAlerts = useMemo(() => {
    return alerts
      .filter((alert) => {
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery = 
          alert.animal.toLowerCase().includes(query) ||
          alert.location.toLowerCase().includes(query) ||
          alert.camera.toLowerCase().includes(query) ||
          alert.id.toLowerCase().includes(query) ||
          (alert.zone && alert.zone.toLowerCase().includes(query));

        const matchesAnimal = selectedAnimal === 'All' || alert.animal === selectedAnimal;
        const matchesStatus = selectedStatus === 'All' || alert.status === selectedStatus;
        const matchesSeverity = selectedSeverity === 'All' || alert.severity === selectedSeverity;

        return matchesQuery && matchesAnimal && matchesStatus && matchesSeverity;
      })
      .sort((a, b) => {
        if (sortBy === 'confidence') return b.confidence - a.confidence;
        if (sortBy === 'critical') {
          const rank = { Critical: 3, High: 2, Moderate: 1, Low: 0 };
          return (rank[b.severity] || 0) - (rank[a.severity] || 0);
        }
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

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredAlerts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredAlerts.map(a => a.id));
    }
  };

  const toggleSelectId = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Toast Feedback */}
      {feedbackToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#071A14] text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
          <span className="text-xs font-bold">{feedbackToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              <span>Active Optical Edge Traps</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#063B2A] mt-1">
            Wildlife Detection &amp; Alert Center
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Real-time automated edge camera detections, species taxonomy confidence, and rapid patrol dispatch.
          </p>
        </div>

        {/* View Switchers */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="bg-white p-1 rounded-2xl border border-gray-200 flex items-center shadow-xs text-xs font-bold">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#063B2A] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Camera Cards</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                viewMode === 'table'
                  ? 'bg-[#063B2A] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              onClick={() => setViewMode('sensors')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                viewMode === 'sensors'
                  ? 'bg-[#063B2A] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-emerald-400" />
              <span>Telemetry</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-3xl p-5 border border-emerald-950/10 shadow-soft space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Keyword Search */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by animal, camera ID, zone, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F5F8F6] text-xs font-semibold rounded-2xl border border-transparent focus:border-emerald-300 focus:bg-white focus:outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Species Selector */}
          <div>
            <select
              value={selectedAnimal}
              onChange={(e) => setSelectedAnimal(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F5F8F6] text-xs font-bold text-gray-800 rounded-2xl border border-transparent focus:border-emerald-300 focus:bg-white focus:outline-none transition-all cursor-pointer"
            >
              <option value="All">All Wildlife Species</option>
              <option value="Elephant">Elephant</option>
              <option value="Leopard">Leopard</option>
              <option value="Wild Boar">Wild Boar</option>
              <option value="Spotted Deer">Spotted Deer</option>
            </select>
          </div>

          {/* Severity Selector */}
          <div>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F5F8F6] text-xs font-bold text-gray-800 rounded-2xl border border-transparent focus:border-emerald-300 focus:bg-white focus:outline-none transition-all cursor-pointer"
            >
              <option value="All">All Severity Levels</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Moderate">Moderate</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F5F8F6] text-xs font-bold text-gray-800 rounded-2xl border border-transparent focus:border-emerald-300 focus:bg-white focus:outline-none transition-all cursor-pointer"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="confidence">Sort: Highest Confidence</option>
              <option value="critical">Sort: Critical Severity</option>
            </select>
          </div>

        </div>

        {/* Filter Summary & Bulk Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100 text-xs">
          <div className="flex items-center gap-2 text-gray-500 font-semibold">
            <span>Showing <strong>{filteredAlerts.length}</strong> of {alerts.length} detections</span>
            {(searchQuery || selectedAnimal !== 'All' || selectedSeverity !== 'All') && (
              <button
                onClick={resetFilters}
                className="text-emerald-700 hover:underline font-bold ml-2"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Bulk Action Bar */}
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-2xl border border-emerald-200 animate-fadeIn">
              <span className="font-bold text-emerald-900 text-xs">{selectedIds.length} Selected:</span>
              <button
                onClick={handleBulkVerify}
                className="px-3 py-1 bg-[#063B2A] text-white rounded-xl text-xs font-bold hover:bg-emerald-900 transition-colors"
              >
                Verify All
              </button>
              <button
                onClick={() => setSelectedIds([])}
                className="px-2 py-1 text-gray-500 hover:text-gray-800 text-xs"
              >
                Deselect
              </button>
            </div>
          )}
        </div>
      </div>

      {/* VIEW 1: Camera Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlerts.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl border border-emerald-950/10 shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {/* Media with AI Bounding Box Simulation */}
              <div className="relative aspect-16/10 bg-black overflow-hidden">
                <img
                  src={item.image}
                  alt={item.animal}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Laser scanline */}
                <div className="ai-scan-line"></div>

                {/* Corner reticles */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono z-10">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-white border border-white/20 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                    <span>{item.camera}</span>
                  </span>

                  <StatusBadge status={item.status} size="xs" />
                </div>

                {/* Species Confidence Pill */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
                  <div className="bg-[#071A14]/90 backdrop-blur-xs px-2.5 py-1 rounded-xl border border-emerald-400 text-white text-xs font-mono font-bold flex items-center gap-1.5">
                    <Scan className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{item.animal}</span>
                    <span className="text-emerald-400">({item.confidence}%)</span>
                  </div>

                  <button
                    onClick={() => setInspectAlert(item)}
                    className="p-1.5 rounded-xl bg-white/20 hover:bg-white/40 text-white backdrop-blur-xs transition-colors"
                    title="Quick inspect"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1 font-mono">
                    <span>{item.id}</span>
                    <span>{item.date} • {item.time}</span>
                  </div>

                  <h3 className="text-base font-black text-[#063B2A] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{item.location}</span>
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{item.zone}</p>

                  <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed bg-[#F5F8F6] p-2.5 rounded-xl border border-gray-100">
                    {item.description}
                  </p>
                </div>

                {/* Action Row */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {item.status !== 'Verified' && (
                      <button
                        onClick={() => handleVerify(item.id)}
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold transition-colors border border-emerald-200"
                      >
                        Verify
                      </button>
                    )}
                    <button
                      onClick={() => handleFalseAlarm(item.id)}
                      className="px-2.5 py-1.5 text-gray-500 hover:text-rose-600 rounded-xl text-xs font-bold transition-colors"
                    >
                      False Alarm
                    </button>
                  </div>

                  <Link
                    to={`/admin/alerts/${item.id}`}
                    className="px-3.5 py-1.5 bg-[#063B2A] hover:bg-emerald-950 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                  >
                    Inspect
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 2: Data Table View */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-3xl p-6 border border-emerald-950/10 shadow-soft overflow-hidden">
          <div className="overflow-x-auto -mx-6 sm:mx-0">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#F5F8F6] text-gray-500 uppercase tracking-wider font-extrabold text-[10px] border-y border-gray-100">
                  <th className="py-3 px-4 w-10">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === filteredAlerts.length && filteredAlerts.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300 text-emerald-600"
                    />
                  </th>
                  <th className="py-3 px-4">Alert ID &amp; Species</th>
                  <th className="py-3 px-4">Confidence</th>
                  <th className="py-3 px-4">Location / Zone</th>
                  <th className="py-3 px-4">Camera ID</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAlerts.map((item) => (
                  <tr key={item.id} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => toggleSelectId(item.id)}
                        className="rounded border-gray-300 text-emerald-600"
                      />
                    </td>
                    <td className="py-3 px-4 font-bold text-gray-900">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.animal}
                          className="w-10 h-10 rounded-xl object-cover border border-emerald-900/10 shrink-0"
                        />
                        <div>
                          <span className="font-black text-[#063B2A] block">{item.animal}</span>
                          <span className="text-[10px] text-gray-400 font-mono">{item.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {item.confidence}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      <div className="font-semibold">{item.location}</div>
                      <div className="text-[10px] text-gray-400">{item.zone}</div>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-800">
                      {item.camera}
                    </td>
                    <td className="py-3 px-4 text-gray-500 whitespace-nowrap">
                      <div>{item.date}</div>
                      <div className="text-[10px] text-gray-400 font-mono">{item.time}</div>
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={item.status} size="xs" />
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {item.status !== 'Verified' && (
                          <button
                            onClick={() => handleVerify(item.id)}
                            className="px-2.5 py-1.5 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold hover:bg-emerald-100"
                          >
                            Verify
                          </button>
                        )}
                        <Link
                          to={`/admin/alerts/${item.id}`}
                          className="px-3 py-1.5 bg-[#063B2A] text-white rounded-xl text-xs font-bold hover:bg-emerald-950"
                        >
                          Inspect
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

      {/* VIEW 3: Live Telemetry View */}
      {viewMode === 'sensors' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredAlerts.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-3xl border border-emerald-950/10 shadow-soft space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-mono font-bold text-xs">
                    <Radio className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-xs text-[#063B2A] block">{item.camera}</strong>
                    <span className="text-[10px] text-gray-400">{item.id}</span>
                  </div>
                </div>
                <StatusBadge status={item.status} size="xs" />
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 bg-[#F5F8F6] rounded-xl">
                  <span className="text-gray-500">Target Species:</span>
                  <strong className="text-gray-900">{item.animal} ({item.confidence}%)</strong>
                </div>
                <div className="flex justify-between p-2 bg-[#F5F8F6] rounded-xl">
                  <span className="text-gray-500">Camera Battery:</span>
                  <strong className="text-emerald-700">{item.sensorData?.battery || '96%'}</strong>
                </div>
                <div className="flex justify-between p-2 bg-[#F5F8F6] rounded-xl">
                  <span className="text-gray-500">Solar Cell Input:</span>
                  <strong className="text-gray-800">{item.sensorData?.solarCharge || '92%'}</strong>
                </div>
                <div className="flex justify-between p-2 bg-[#F5F8F6] rounded-xl">
                  <span className="text-gray-500">Ambient Temp:</span>
                  <strong className="text-gray-800">{item.sensorData?.temperature || '22°C'}</strong>
                </div>
                <div className="flex justify-between p-2 bg-[#F5F8F6] rounded-xl">
                  <span className="text-gray-500">Cellular Link:</span>
                  <strong className="text-emerald-700">{item.sensorData?.signal || '5G Mesh'}</strong>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to={`/admin/alerts/${item.id}`}
                  className="w-full py-2 bg-gray-100 hover:bg-[#063B2A] hover:text-white rounded-xl text-xs font-bold transition-all text-center block"
                >
                  Full Telemetry Report →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Inspection Modal */}
      {inspectAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-emerald-950/20 text-[#071A14] space-y-5 relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setInspectAlert(null)}
              className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#063B2A] flex items-center justify-center">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-[#063B2A]">
                  Edge Optical Trap Inspection: {inspectAlert.id}
                </h3>
                <p className="text-xs text-gray-500">
                  {inspectAlert.camera} • {inspectAlert.location} ({inspectAlert.zone})
                </p>
              </div>
            </div>

            {/* Simulated Live Video / Still Frame */}
            <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-black border border-emerald-900 shadow-md">
              <img
                src={inspectAlert.image}
                alt={inspectAlert.animal}
                className={`w-full h-full object-cover ${
                  inspectVision === 'nightvision' ? 'filter-nightvision' : inspectVision === 'thermal' ? 'filter-thermal' : ''
                }`}
              />

              <div className="ai-scan-line"></div>

              {/* Bounding Box Overlay */}
              <div className="absolute inset-10 border-2 border-emerald-400/90 rounded-2xl bg-emerald-500/10 flex items-start justify-between p-3 pointer-events-none">
                <span className="bg-black/80 text-emerald-400 font-mono text-xs px-2.5 py-1 rounded-lg border border-emerald-400 font-bold">
                  {inspectAlert.animal}: {inspectAlert.confidence}%
                </span>
                <span className="bg-rose-600 text-white font-mono text-[10px] px-2 py-0.5 rounded font-black uppercase">
                  {inspectAlert.severity}
                </span>
              </div>

              {/* Mode switch bar */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 z-10">
                <button
                  onClick={() => setInspectVision('color')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold backdrop-blur-xs ${
                    inspectVision === 'color' ? 'bg-white text-black' : 'bg-black/60 text-white'
                  }`}
                >
                  Color
                </button>
                <button
                  onClick={() => setInspectVision('nightvision')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold backdrop-blur-xs ${
                    inspectVision === 'nightvision' ? 'bg-emerald-600 text-white' : 'bg-black/60 text-white'
                  }`}
                >
                  IR Green
                </button>
                <button
                  onClick={() => setInspectVision('thermal')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold backdrop-blur-xs ${
                    inspectVision === 'thermal' ? 'bg-rose-600 text-white' : 'bg-black/60 text-white'
                  }`}
                >
                  Thermal
                </button>
              </div>
            </div>

            {/* Description & Action */}
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#F5F8F6] rounded-xl border border-gray-100">
                <span className="text-[10px] text-gray-500 font-bold uppercase block mb-1">Field Observation</span>
                <p className="text-gray-700 leading-relaxed">{inspectAlert.description}</p>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="text-[10px] text-emerald-800 font-bold uppercase block mb-1">Recommended Response Directive</span>
                <p className="text-emerald-900 leading-relaxed font-semibold">{inspectAlert.suggestedAction}</p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-gray-100">
              <button
                onClick={() => handleFalseAlarm(inspectAlert.id)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold"
              >
                Flag as False Alarm
              </button>
              <button
                onClick={() => handleVerify(inspectAlert.id)}
                className="px-5 py-2 bg-[#10B981] hover:bg-[#0ea371] text-white rounded-xl text-xs font-black shadow-sm"
              >
                Confirm &amp; Verify Alert
              </button>
              <Link
                to={`/admin/alerts/${inspectAlert.id}`}
                className="px-4 py-2 bg-[#063B2A] hover:bg-emerald-950 text-white rounded-xl text-xs font-bold"
              >
                Open Full Dossier
              </Link>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Alerts;

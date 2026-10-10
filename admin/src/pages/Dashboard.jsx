import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Radio, 
  MessageSquareWarning, 
  CheckCircle2, 
  Trees, 
  Cpu, 
  AlertTriangle, 
  Download, 
  ExternalLink, 
  Calendar, 
  Eye, 
  ArrowUpRight, 
  Activity, 
  Clock, 
  ShieldAlert, 
  MapPin, 
  Check, 
  Filter,
  Camera,
  Battery,
  Sun,
  Wifi,
  Zap,
  Volume2,
  Scan,
  Maximize2,
  SlidersHorizontal,
  Flame,
  ArrowRight,
  ShieldCheck,
  Compass
} from 'lucide-react';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { initialWildlifeAlerts } from '../data/wildlifeAlerts';
import { initialComplaints } from '../data/complaints';
import { initialActivity } from '../data/activity';

const Dashboard = () => {
  const [alerts, setAlerts] = useState(initialWildlifeAlerts);
  const [complaints, setComplaints] = useState(initialComplaints);
  const [selectedAnimalFilter, setSelectedAnimalFilter] = useState('All');
  const [exportNotice, setExportNotice] = useState(false);
  const [actionToast, setActionToast] = useState('');

  // Live Camera Trap Simulation Controls
  const [selectedCameraIndex, setSelectedCameraIndex] = useState(0);
  const [visionMode, setVisionMode] = useState('color'); // 'color' | 'nightvision' | 'thermal'
  const [showBoundingBox, setShowBoundingBox] = useState(true);
  const [sirenTriggered, setSirenTriggered] = useState(false);
  const [patrolDispatched, setPatrolDispatched] = useState(false);

  // Cameras available for interactive live preview
  const liveCameras = [
    {
      id: 'CAM-023',
      name: 'Muthanga Sanctuary Outer Rim (Sector 4)',
      species: 'Asian Elephant (Elephas maximus)',
      confidence: 96,
      threat: 'Critical',
      time: '10:24:18 PM',
      coordinates: '11.6854° N, 76.1320° E',
      image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80',
      battery: '98%',
      solar: '94%',
      temp: '21°C',
      signal: '5G Strong'
    },
    {
      id: 'CAM-014',
      name: 'Vandiperiyar Tea Cluster (Sector 7)',
      species: 'Indian Leopard (Panthera pardus fusca)',
      confidence: 91,
      threat: 'Critical',
      time: '08:15:32 PM',
      coordinates: '9.8494° N, 77.0185° E',
      image: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=1200&q=80',
      battery: '92%',
      solar: '88%',
      temp: '18°C',
      signal: '4G Stable'
    },
    {
      id: 'CAM-042',
      name: 'Kothamangalam Foothills (Sector 2)',
      species: 'Wild Boar Sounder (Sus scrofa)',
      confidence: 88,
      threat: 'High',
      time: '06:45:10 PM',
      coordinates: '10.0537° N, 76.6289° E',
      image: 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=1200&q=80',
      battery: '100%',
      solar: '99%',
      temp: '26°C',
      signal: '5G Strong'
    },
    {
      id: 'CAM-009',
      name: 'Peechi Sanctuary Buffer (Sector 3)',
      species: 'Spotted Deer Herd (Axis axis)',
      confidence: 94,
      threat: 'Moderate',
      time: '04:12:45 PM',
      coordinates: '10.5276° N, 76.3688° E',
      image: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&w=1200&q=80',
      battery: '95%',
      solar: '91%',
      temp: '24°C',
      signal: '5G Strong'
    }
  ];

  const currentCam = liveCameras[selectedCameraIndex];

  const showToast = (msg) => {
    setActionToast(msg);
    setTimeout(() => setActionToast(''), 3500);
  };

  const handleQuickVerify = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Verified' } : a));
    showToast(`Alert #${id} marked as Verified. Rapid response logged.`);
  };

  const handleDispatchPatrol = () => {
    setPatrolDispatched(true);
    showToast(`Rapid Response Unit RRT-04 dispatched to ${currentCam.id} (${currentCam.name})`);
  };

  const handleTriggerAcousticSiren = () => {
    setSirenTriggered(true);
    showToast(`Acoustic deterrent sounders triggered at ${currentCam.id}! High-frequency audio active.`);
    setTimeout(() => setSirenTriggered(false), 5000);
  };

  const handleExport = () => {
    setExportNotice(true);
    showToast('Generating official Situation Report (SitRep PDF)...');
    setTimeout(() => setExportNotice(false), 2500);
  };

  // Monthly Detection Data for SVG/CSS Chart
  const monthlyData = [
    { month: 'Jan', elephant: 14, leopard: 6, boar: 22, total: 42 },
    { month: 'Feb', elephant: 18, leopard: 8, boar: 26, total: 52 },
    { month: 'Mar', elephant: 22, leopard: 9, boar: 31, total: 62 },
    { month: 'Apr', elephant: 29, leopard: 11, boar: 38, total: 78 },
    { month: 'May', elephant: 35, leopard: 14, boar: 44, total: 93 },
    { month: 'Jun', elephant: 42, leopard: 18, boar: 48, total: 108 },
    { month: 'Jul', elephant: 38, leopard: 16, boar: 41, total: 95 },
    { month: 'Aug', elephant: 45, leopard: 19, boar: 52, total: 116 },
    { month: 'Sep', elephant: 51, leopard: 22, boar: 58, total: 131 },
    { month: 'Oct', elephant: 63, leopard: 27, boar: 64, total: 154 }
  ];

  const maxTotal = Math.max(...monthlyData.map(d => d.total));

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Action Toast Feedback */}
      {actionToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#071A14] text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{actionToast}</span>
        </div>
      )}

      {/* 1. Tactical Command Header Banner */}
      <div className="bg-gradient-to-r from-[#063B2A] via-[#093224] to-[#071A14] rounded-3xl p-6 sm:p-8 text-white shadow-soft-lg relative overflow-hidden border border-emerald-800/40">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-emerald-500/10 to-transparent pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-[11px] font-bold text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Command Sector 4 • Wayanad North Division</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-black uppercase">
                DEFCON 2: ELEVATED PERIMETER
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Tactical Operations Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl leading-relaxed">
              Monitoring 45 optical camera traps, 1,420 registered farm boundaries, and 24 active wildlife presence alerts across forest edge settlements.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 backdrop-blur-xs transition-all active:scale-95"
            >
              <Download className="w-4 h-4 text-emerald-300" />
              <span>{exportNotice ? 'Generating SitRep...' : 'Export SitRep (PDF)'}</span>
            </button>

            <Link
              to="/admin/alerts"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#10B981] hover:bg-[#0ea371] text-[#071A14] font-black rounded-xl text-xs shadow-glow-emerald transition-all active:scale-95"
            >
              <Radio className="w-4 h-4" />
              <span>All Wildlife Alerts (24)</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Standard High-Density KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-emerald-950/10 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Wildlife Alerts</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Radio className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-[#063B2A]">24</span>
              <span className="text-[11px] font-bold text-rose-600 flex items-center">↑ +8 today</span>
            </div>
            <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-rose-500 h-full rounded-full" style={{ width: '65%' }}></div>
            </div>
            <span className="text-[10px] text-gray-400 mt-1 block">6 critical priority</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-950/10 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Pending Complaints</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <MessageSquareWarning className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-amber-950">12</span>
              <span className="text-[11px] font-bold text-amber-700">4 high priority</span>
            </div>
            <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full" style={{ width: '45%' }}></div>
            </div>
            <span className="text-[10px] text-gray-400 mt-1 block">Response SLA ~18 mins</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-950/10 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Verified Encounters</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-teal-950">18</span>
              <span className="text-[11px] font-bold text-teal-700">75% precision</span>
            </div>
            <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-teal-600 h-full rounded-full" style={{ width: '75%' }}></div>
            </div>
            <span className="text-[10px] text-gray-400 mt-1 block">Zero human casualties</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-950/10 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Protected Farmers</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Trees className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-[#063B2A]">248</span>
              <span className="text-[11px] font-bold text-emerald-700">+14 new</span>
            </div>
            <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-[#10B981] h-full rounded-full" style={{ width: '85%' }}></div>
            </div>
            <span className="text-[10px] text-gray-400 mt-1 block">1,420 registered mobile SMS</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-950/10 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Perimeter Solar Fence</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-purple-950">8.2 kV</span>
              <span className="text-[11px] font-bold text-emerald-700">99.4% online</span>
            </div>
            <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-purple-600 h-full rounded-full" style={{ width: '92%' }}></div>
            </div>
            <span className="text-[10px] text-gray-400 mt-1 block">1 breach resolved</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-950/10 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">AI Edge Cameras</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-blue-950">42/45</span>
              <span className="text-[11px] font-bold text-blue-700">93% active</span>
            </div>
            <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: '93%' }}></div>
            </div>
            <span className="text-[10px] text-gray-400 mt-1 block">3 low battery scheduled</span>
          </div>
        </div>

      </div>

      {/* 3. The Highlight: Interactive Live Edge Camera Trap Surveillance Matrix */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-950/10 shadow-soft space-y-6">
        
        {/* Matrix Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <Camera className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-black text-[#063B2A]">
                Tactical Camera Trap Surveillance Feed
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Live automated edge inference streams from high-risk forest fringe boundaries
            </p>
          </div>

          {/* Mode Switchers: Optical RGB / IR Night Vision / Thermal Mode */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-gray-500 mr-1 hidden sm:inline">Sensor Mode:</span>
            <button
              onClick={() => setVisionMode('color')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                visionMode === 'color'
                  ? 'bg-[#063B2A] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Natural Color
            </button>
            <button
              onClick={() => setVisionMode('nightvision')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                visionMode === 'nightvision'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>IR Night Vision</span>
            </button>
            <button
              onClick={() => setVisionMode('thermal')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                visionMode === 'thermal'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              <span>Thermal Sensor</span>
            </button>
            <button
              onClick={() => setShowBoundingBox(!showBoundingBox)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                showBoundingBox 
                  ? 'border-emerald-500 text-emerald-800 bg-emerald-50' 
                  : 'border-gray-200 text-gray-500'
              }`}
            >
              AI Boxes: {showBoundingBox ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Camera Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {liveCameras.map((cam, idx) => (
            <button
              key={cam.id}
              onClick={() => {
                setSelectedCameraIndex(idx);
                setPatrolDispatched(false);
              }}
              className={`p-3 rounded-2xl text-left border transition-all ${
                selectedCameraIndex === idx
                  ? 'border-emerald-600 bg-emerald-50/70 shadow-xs'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className={selectedCameraIndex === idx ? 'text-[#063B2A]' : 'text-gray-700'}>{cam.id}</span>
                <span className={`px-1.5 py-0.2 rounded text-[9px] font-black uppercase ${
                  cam.threat === 'Critical' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {cam.threat}
                </span>
              </div>
              <p className="text-xs font-black text-gray-900 truncate mt-1">{cam.species.split('(')[0]}</p>
              <p className="text-[10px] text-gray-500 truncate mt-0.5">{cam.name.split('(')[0]}</p>
            </button>
          ))}
        </div>

        {/* Live Video Monitor Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Visual Monitor (8 cols) */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden bg-black aspect-16/9 sm:aspect-16/10 border-2 border-emerald-900/50 shadow-2xl flex items-center justify-center group">
            
            {/* Live Camera Image with Applied Filter */}
            <img
              src={currentCam.image}
              alt={currentCam.species}
              className={`w-full h-full object-cover transition-all duration-300 ${
                visionMode === 'nightvision' ? 'filter-nightvision' : visionMode === 'thermal' ? 'filter-thermal' : ''
              }`}
            />

            {/* Laser Scanline */}
            <div className="ai-scan-line"></div>

            {/* Tactical Screen Corner Reticles */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-emerald-400"></div>
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-emerald-400"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-emerald-400"></div>
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-emerald-400"></div>

            {/* Top HUD Overlay */}
            <div className="absolute top-4 inset-x-6 flex items-center justify-between text-white text-[11px] font-mono drop-shadow-md z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                <span className="font-bold tracking-widest text-emerald-400 uppercase">
                  REC • LIVE SENSOR {currentCam.id}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-semibold bg-black/60 px-3 py-1 rounded-full backdrop-blur-xs border border-white/10">
                <span>FPS: 30</span>
                <span>BAT: {currentCam.battery}</span>
                <span>SOL: {currentCam.solar}</span>
                <span>TEMP: {currentCam.temp}</span>
              </div>
            </div>

            {/* AI Bounding Box Overlay */}
            {showBoundingBox && (
              <div className="absolute inset-12 sm:inset-16 border-2 border-emerald-400/90 rounded-2xl bg-emerald-500/10 backdrop-blur-[0.5px] flex flex-col justify-between p-3 pointer-events-none animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#071A14]/90 text-white text-xs font-mono font-black border border-emerald-400 shadow-md">
                    <Scan className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{currentCam.species.split('(')[0]}</span>
                    <span className="text-emerald-400">({currentCam.confidence}%)</span>
                  </div>
                  <span className="text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded font-black tracking-widest uppercase">
                    INCURSION
                  </span>
                </div>

                <div className="text-[10px] font-mono text-emerald-300 bg-black/70 px-2 py-1 rounded-md self-start border border-emerald-500/40">
                  <span>GPS: {currentCam.coordinates} • {currentCam.time}</span>
                </div>
              </div>
            )}

            {/* Bottom HUD: Coordinates & Controls */}
            <div className="absolute bottom-4 inset-x-6 flex items-center justify-between text-white text-xs z-10">
              <div className="bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/10 text-[11px] font-mono">
                <span className="text-gray-300">Sector: </span>
                <strong className="text-white">{currentCam.name}</strong>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleTriggerAcousticSiren}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                    sirenTriggered ? 'bg-rose-600 text-white animate-bounce' : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-xs'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{sirenTriggered ? 'Siren Active!' : 'Acoustic Sounder'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Side Telemetry & Response Console (4 cols) */}
          <div className="lg:col-span-4 bg-[#F5F8F6] rounded-3xl p-5 border border-gray-200 flex flex-col justify-between space-y-4">
            
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Detection Telemetry</span>
                <span className="text-xs font-black text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                  {currentCam.threat} Severity
                </span>
              </div>

              <div className="space-y-3 pt-3 text-xs">
                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-bold block">Target Species Identification</label>
                  <p className="text-sm font-black text-[#063B2A]">{currentCam.species}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-white rounded-xl border border-gray-200">
                    <span className="text-[10px] text-gray-400 block font-bold">Confidence</span>
                    <strong className="text-sm font-black text-emerald-700">{currentCam.confidence}% Confirmed</strong>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-gray-200">
                    <span className="text-[10px] text-gray-400 block font-bold">Trap Unit</span>
                    <strong className="text-sm font-black text-[#063B2A]">{currentCam.id}</strong>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-gray-200 space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Camera Battery:</span>
                    <strong className="text-gray-800">{currentCam.battery}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Solar Cell Input:</span>
                    <strong className="text-gray-800">{currentCam.solar}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Ambient Temperature:</span>
                    <strong className="text-gray-800">{currentCam.temp}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Cellular Link:</span>
                    <strong className="text-emerald-700 font-bold">{currentCam.signal}</strong>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-bold block">Automated Field Advisory</label>
                  <p className="text-[11px] text-gray-700 mt-1 leading-relaxed bg-white p-2.5 rounded-xl border border-gray-200">
                    Alert registered perimeter farmers in Sector 4. Dispatch rapid response unit to patrol Wayanad sanctuary boundary.
                  </p>
                </div>
              </div>
            </div>

            {/* Tactical Actions */}
            <div className="space-y-2 pt-2 border-t border-gray-200">
              <button
                onClick={handleDispatchPatrol}
                disabled={patrolDispatched}
                className="w-full py-3 bg-[#063B2A] hover:bg-emerald-950 text-white rounded-2xl font-black text-xs transition-all shadow-sm flex items-center justify-center gap-2 active:scale-98 disabled:opacity-60"
              >
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>{patrolDispatched ? 'Squad RRT-04 En Route' : 'Dispatch Rapid Patrol (RRT-04)'}</span>
              </button>

              <Link
                to={`/admin/alerts/AL-001`}
                className="w-full py-2.5 bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-2xl font-bold text-xs transition-all text-center block"
              >
                Inspect Incident Details →
              </Link>
            </div>

          </div>

        </div>

      </div>

      {/* 4. Tactical Sector Heatmap Matrix & Detection Trends Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left (7 cols): Monthly Wildlife Detections Analytics */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-950/10 shadow-soft space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#10B981]" />
                <h3 className="font-extrabold text-[#063B2A] text-base">
                  Wildlife Sighting Frequency Trends (2026)
                </h3>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                AI camera trap triggered optical detections across Kerala buffer zones
              </p>
            </div>

            {/* Species Filter Chips */}
            <div className="flex items-center gap-1.5 bg-[#F5F8F6] p-1 rounded-2xl text-xs font-bold">
              {['All', 'Elephant', 'Leopard', 'Boar'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedAnimalFilter(filter)}
                  className={`px-3 py-1 rounded-xl transition-all ${
                    selectedAnimalFilter === filter
                      ? 'bg-[#063B2A] text-white shadow-xs'
                      : 'text-gray-600 hover:text-[#063B2A]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Stacked Chart */}
          <div className="pt-2">
            <div className="h-60 sm:h-64 flex items-end justify-between gap-2 sm:gap-3 px-2">
              {monthlyData.map((d) => {
                const heightPercent = Math.round((d.total / maxTotal) * 100);
                const elephantH = Math.round((d.elephant / d.total) * 100);
                const leopardH = Math.round((d.leopard / d.total) * 100);
                const boarH = 100 - elephantH - leopardH;

                return (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    
                    {/* Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#071A14] text-white text-[10px] px-2.5 py-1.5 rounded-xl absolute -translate-y-24 pointer-events-none shadow-xl z-20 whitespace-nowrap">
                      <p className="font-bold">{d.month} 2026: {d.total} total detections</p>
                      <p className="text-emerald-300">🐘 {d.elephant} • 🐆 {d.leopard} • 🐗 {d.boar}</p>
                    </div>

                    {/* Stacked Bar */}
                    <div 
                      className="w-full max-w-[34px] rounded-t-xl overflow-hidden flex flex-col justify-end bg-emerald-50 transition-all duration-300 group-hover:opacity-90 shadow-xs"
                      style={{ height: `${heightPercent}%` }}
                    >
                      {selectedAnimalFilter === 'All' ? (
                        <>
                          <div style={{ height: `${boarH}%` }} className="bg-amber-500 w-full" />
                          <div style={{ height: `${leopardH}%` }} className="bg-rose-500 w-full" />
                          <div style={{ height: `${elephantH}%` }} className="bg-[#10B981] w-full" />
                        </>
                      ) : selectedAnimalFilter === 'Elephant' ? (
                        <div className="bg-[#10B981] w-full h-full" />
                      ) : selectedAnimalFilter === 'Leopard' ? (
                        <div className="bg-rose-500 w-full h-full" />
                      ) : (
                        <div className="bg-amber-500 w-full h-full" />
                      )}
                    </div>

                    <span className="text-[11px] font-bold text-gray-500 group-hover:text-[#063B2A]">
                      {d.month}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-5 border-t border-gray-100 text-xs font-semibold text-gray-600">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#10B981]"></span>
                <span>Asian Elephant (41%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                <span>Indian Leopard (18%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span>Wild Boar (41%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right (5 cols): Tactical Forest Sectors Grid */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-950/10 shadow-soft space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="font-extrabold text-[#063B2A] text-base">
                Forest Sectors &amp; Squad Matrix
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Rapid patrol allocations across Wayanad &amp; Idukki
              </p>
            </div>
            <span className="text-[11px] font-bold bg-emerald-100 text-[#063B2A] px-2.5 py-1 rounded-full">
              4 Sectors Active
            </span>
          </div>

          <div className="space-y-3">
            
            {/* Sector 4 */}
            <div className="p-3.5 bg-rose-50/70 rounded-2xl border border-rose-200 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-rose-950">Sector 4: Muthanga Fringe</span>
                  <span className="text-[9px] font-extrabold bg-rose-200 text-rose-800 px-1.5 py-0.2 rounded">CRITICAL</span>
                </div>
                <p className="text-[11px] text-gray-600 mt-0.5">Elephant Herd incursion • Unit RRT-04 active</p>
              </div>
              <span className="text-xs font-bold text-rose-700">8.2 kV Armed</span>
            </div>

            {/* Sector 7 */}
            <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-amber-950">Sector 7: Vandiperiyar Rim</span>
                  <span className="text-[9px] font-extrabold bg-amber-200 text-amber-800 px-1.5 py-0.2 rounded">HIGH</span>
                </div>
                <p className="text-[11px] text-gray-600 mt-0.5">Leopard sighting • Unit RRT-02 standby</p>
              </div>
              <span className="text-xs font-bold text-amber-700">7.5 kV Armed</span>
            </div>

            {/* Sector 2 */}
            <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-emerald-950">Sector 2: Kothamangalam Foot</span>
                  <span className="text-[9px] font-extrabold bg-emerald-200 text-emerald-800 px-1.5 py-0.2 rounded">MODERATE</span>
                </div>
                <p className="text-[11px] text-gray-600 mt-0.5">Wild boar sounder • Perimeter intact</p>
              </div>
              <span className="text-xs font-bold text-emerald-700">8.8 kV Armed</span>
            </div>

            {/* Sector 9 */}
            <div className="p-3.5 bg-[#F5F8F6] rounded-2xl border border-gray-200 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-gray-900">Sector 9: Silent Valley Buffer</span>
                  <span className="text-[9px] font-extrabold bg-gray-200 text-gray-700 px-1.5 py-0.2 rounded">SECURE</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5">Zero incursions in past 48 hours</p>
              </div>
              <span className="text-xs font-bold text-gray-500">Normal</span>
            </div>

          </div>

          {/* Squad Status Mini Bar */}
          <div className="p-4 bg-emerald-950 text-white rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-emerald-300 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>Field Squad Readiness</span>
              </span>
              <span className="text-emerald-400">3/3 Dispatched/Standby</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-center pt-1">
              <div className="bg-white/10 p-2 rounded-xl">
                <span className="text-gray-300 block">RRT-01</span>
                <strong className="text-emerald-300">Peechi Patrol</strong>
              </div>
              <div className="bg-white/10 p-2 rounded-xl">
                <span className="text-gray-300 block">RRT-02</span>
                <strong className="text-amber-300">Standby Base</strong>
              </div>
              <div className="bg-white/10 p-2 rounded-xl">
                <span className="text-gray-300 block">RRT-04</span>
                <strong className="text-rose-300">Sector 4 Live</strong>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 5. Dense Operations Table: Real-Time AI Camera Sensor Alerts */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-950/10 shadow-soft space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-rose-500 animate-pulse" />
              <h3 className="font-extrabold text-[#063B2A] text-base">
                Recent AI Trap Camera Detections
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Live automated edge camera detection stream across monitored forest boundaries
            </p>
          </div>

          <Link
            to="/admin/alerts"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#10B981] hover:underline"
          >
            <span>View All 24 Alerts</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Dense Table */}
        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#F5F8F6] text-gray-500 uppercase tracking-wider font-extrabold text-[10px] border-y border-gray-100">
                <th className="py-3 px-4">Alert ID &amp; Species</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4">Location / Zone</th>
                <th className="py-3 px-4">Camera ID</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {alerts.slice(0, 5).map((item) => (
                <tr key={item.id} className="hover:bg-emerald-50/40 transition-colors">
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
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.confidence >= 90 ? 'bg-[#10B981]' : 'bg-amber-500'
                          }`}
                          style={{ width: `${item.confidence}%` }}
                        ></div>
                      </div>
                      <span className="font-mono font-bold text-xs">{item.confidence}%</span>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-gray-700">
                    <div className="flex items-center gap-1 font-semibold">
                      <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{item.location}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 block truncate max-w-[160px]">{item.zone}</span>
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

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {item.status !== 'Verified' && (
                        <button
                          onClick={() => handleQuickVerify(item.id)}
                          className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold transition-colors border border-emerald-200"
                          title="Verify sighting"
                        >
                          Verify
                        </button>
                      )}
                      <Link
                        to={`/admin/alerts/${item.id}`}
                        className="px-2.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors"
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

      {/* 6. High-Priority Citizen Complaints Queue */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-950/10 shadow-soft space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <MessageSquareWarning className="w-5 h-5 text-amber-600" />
              <h3 className="font-extrabold text-[#063B2A] text-base">
                Recent Farmer Grievances &amp; Crop Damage Reports
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Citizen complaints requiring forest field officer inspection and loss survey
            </p>
          </div>

          <Link
            to="/admin/complaints"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline"
          >
            <span>View All 12 Complaints</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#F5F8F6] text-gray-500 uppercase tracking-wider font-extrabold text-[10px] border-y border-gray-100">
                <th className="py-3 px-4">Ticket ID</th>
                <th className="py-3 px-4">Complainant</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Claimed Loss</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {complaints.slice(0, 4).map((c) => (
                <tr key={c.id} className="hover:bg-amber-50/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#063B2A]">
                    {c.id}
                  </td>
                  <td className="py-3 px-4 font-bold text-gray-900">
                    <div>{c.reporter}</div>
                    <div className="text-[10px] text-gray-400 font-mono">{c.phone}</div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-700">
                    {c.type}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {c.location}
                  </td>
                  <td className="py-3 px-4 font-extrabold text-[#063B2A]">
                    {c.compensationClaimed || 'N/A'}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge priority={c.priority} size="xs" />
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={c.status} size="xs" />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      to={`/admin/complaints/${c.id}`}
                      className="px-3 py-1.5 bg-[#063B2A] hover:bg-emerald-950 text-white rounded-xl text-xs font-bold transition-colors inline-block"
                    >
                      Process Ticket
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;

import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  Bell, 
  Radio, 
  ShieldAlert, 
  AlertTriangle, 
  Send, 
  X, 
  CheckCircle2, 
  ExternalLink,
  Volume2,
  VolumeX,
  Clock,
  Activity,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Compass,
  Cpu
} from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';

const AdminNavbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [threatLevel, setThreatLevel] = useState('ELEVATED'); // 'NORMAL' | 'ELEVATED' | 'CRITICAL'
  const [officerStatus, setOfficerStatus] = useState('On Active Duty');
  
  // Real-time IST Digital Clock
  const [currentTime, setCurrentTime] = useState('');

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }) + ' IST'
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [emergencyData, setEmergencyData] = useState({
    preset: 'elephant',
    zone: 'Wayanad North - Sector 4 (Muthanga Sanctuary Fringe)',
    threat: 'Wild Elephant Herd Spotted (4 Adults)',
    instructions: 'Evacuate outer perimeter fields immediately. Power solar electric fences to maximum 9.2 kV. Standby for RRT patrol vehicle arrival.'
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/admin/alerts?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleSelectPreset = (preset) => {
    if (preset === 'elephant') {
      setEmergencyData({
        preset: 'elephant',
        zone: 'Wayanad North - Sector 4 (Muthanga Fringe)',
        threat: 'Wild Elephant Herd Incursion (4 Adults)',
        instructions: 'Evacuate outer field perimeters immediately. Energize border fences. Community sounders armed.'
      });
    } else if (preset === 'leopard') {
      setEmergencyData({
        preset: 'leopard',
        zone: 'Idukki Range - Vandiperiyar Sector 3',
        threat: 'Apex Carnivore / Leopard Sighting Near Worker Line Quarters',
        instructions: 'Remain indoors. Keep cattle locked in secure shed. Searchlight vehicle dispatched.'
      });
    } else if (preset === 'fence') {
      setEmergencyData({
        preset: 'fence',
        zone: 'Thrissur Range - Chalakudy Sector 2',
        threat: 'Solar Perimeter Electric Fence Ground Short / Breach Detected',
        instructions: 'Perimeter team dispatched for immediate re-tensioning and fault isolation.'
      });
    }
  };

  const handleSendEmergencyBroadcast = (e) => {
    e.preventDefault();
    setBroadcastSent(true);
    setThreatLevel('CRITICAL');
    setTimeout(() => {
      setBroadcastSent(false);
      setShowEmergencyModal(false);
    }, 2200);
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-emerald-950/10 px-4 sm:px-6 py-3 transition-all shadow-xs">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Mobile Toggle & Global Tactical Search */}
          <div className="flex items-center gap-3 flex-1 max-w-2xl">
            <button
              onClick={onMenuClick}
              className="p-2 -ml-1 text-gray-700 hover:text-[#063B2A] hover:bg-emerald-50 rounded-xl md:hidden transition-colors"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Division & Sector Breadcrumb */}
            <div className="hidden xl:flex items-center gap-2 text-xs text-gray-500 font-semibold shrink-0 pr-2 border-r border-gray-200">
              <span className="text-[#063B2A] font-extrabold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-emerald-600" />
                <span>Wayanad North</span>
              </span>
              <span>/</span>
              <span className="text-gray-400">Sector 4</span>
            </div>

            {/* Global Search with Shortcut Tag */}
            <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md hidden sm:block">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search alerts, camera traps, farmers, complaints (Ctrl+K)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F5F8F6] text-xs font-semibold text-[#071A14] pl-10 pr-12 py-2 rounded-xl border border-gray-200/80 focus:border-emerald-500 focus:bg-white focus:outline-none transition-all placeholder:text-gray-400 placeholder:font-normal"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-gray-400 bg-gray-200/60 px-1.5 py-0.5 rounded border border-gray-300/60 pointer-events-none">
                ⌘K
              </span>
            </form>
          </div>

          {/* Right: Operational HUD Badges & Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Live IST Real-Time Clock */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-[#F5F8F6] rounded-xl border border-gray-200/80 text-xs font-mono font-bold text-[#063B2A]">
              <Clock className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>{currentTime || '10:24:18 AM IST'}</span>
            </div>

            {/* Sensors Status Pill */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-[#063B2A]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>45 Trap Cams Online</span>
            </div>

            {/* Threat Posture Indicator */}
            <button
              onClick={() => setThreatLevel(prev => prev === 'CRITICAL' ? 'NORMAL' : prev === 'ELEVATED' ? 'CRITICAL' : 'ELEVATED')}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-black uppercase tracking-wider border transition-all ${
                threatLevel === 'CRITICAL'
                  ? 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse'
                  : threatLevel === 'ELEVATED'
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-emerald-100 text-emerald-900 border-emerald-300'
              }`}
              title="Click to toggle tactical threat posture"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{threatLevel}</span>
            </button>

            {/* Siren Audio Toggle */}
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`p-2 rounded-xl transition-all ${
                audioEnabled 
                  ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' 
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
              title={audioEnabled ? 'Audible siren alarms enabled' : 'Siren audio muted'}
              aria-label="Toggle alert siren audio"
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Emergency Broadcast Button */}
            <button
              onClick={() => setShowEmergencyModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black shadow-sm transition-all active:scale-95 group"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-200 group-hover:animate-bounce" />
              <span className="hidden sm:inline">Emergency Siren</span>
              <span className="sm:hidden">Siren</span>
            </button>

            {/* Notification Bell */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-[#063B2A] hover:bg-emerald-50 rounded-xl transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-pulse">
                  5
                </span>
              </button>

              <NotificationDropdown
                isOpen={showNotifications}
                onClose={() => setShowNotifications(false)}
              />
            </div>

            {/* Vertical Divider */}
            <div className="h-6 w-[1px] bg-gray-200 hidden sm:block"></div>

            {/* Officer Profile & Status Menu */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1 sm:pr-2.5 rounded-xl hover:bg-gray-100 transition-colors group"
              >
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                    alt="Officer Arjun Nair"
                    className="w-8 h-8 rounded-xl object-cover border-2 border-emerald-500 shadow-xs"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="hidden md:block text-left">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-black text-[#071A14]">
                      Arjun Nair
                    </span>
                    <span className="text-[9px] bg-[#063B2A] text-emerald-300 font-extrabold px-1.5 py-0.2 rounded uppercase">
                      FRO
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium">
                    {officerStatus}
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden md:block" />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 animate-fadeIn text-xs">
                  <div className="p-3 border-b border-gray-100 bg-gray-50 rounded-xl mb-1">
                    <p className="font-bold text-[#063B2A]">Officer Arjun Nair (FRO)</p>
                    <p className="text-[11px] text-gray-500">ID: #FO-1024 • Wayanad Range</p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span className="text-[11px] font-bold text-emerald-800">{officerStatus}</span>
                    </div>
                  </div>

                  <div className="py-1 space-y-0.5">
                    <button
                      onClick={() => {
                        setOfficerStatus(officerStatus === 'On Active Duty' ? 'On Field Patrol' : 'On Active Duty');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg font-semibold flex items-center justify-between"
                    >
                      <span>Toggle Patrol Status</span>
                      <Activity className="w-3.5 h-3.5 text-emerald-600" />
                    </button>

                    <Link
                      to="/admin/profile"
                      onClick={() => setShowProfileMenu(false)}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg font-semibold flex items-center justify-between"
                    >
                      <span>Officer Profile & Credentials</span>
                      <User className="w-3.5 h-3.5 text-gray-400" />
                    </Link>
                  </div>

                  <div className="pt-1 mt-1 border-t border-gray-100">
                    <Link
                      to="/admin/login"
                      onClick={() => setShowProfileMenu(false)}
                      className="w-full text-left px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-lg font-bold flex items-center justify-between"
                    >
                      <span>Sign Out Terminal</span>
                      <LogOut className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* Emergency Broadcast Siren Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-rose-200 text-[#071A14] relative">
            
            <button
              onClick={() => setShowEmergencyModal(false)}
              className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base font-black text-rose-950">
                  Instant Emergency Broadcast Siren
                </h3>
                <p className="text-xs text-gray-500">
                  Direct cellular SMS siren and automated village alarm dispatch
                </p>
              </div>
            </div>

            {broadcastSent ? (
              <div className="py-8 text-center space-y-3 animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="font-black text-emerald-950 text-lg">
                  Emergency Broadcast Dispatched!
                </h4>
                <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                  1,420 registered farmers, 3 field rapid response squads (RRT), and local panchayat control units notified via high-priority audio siren and SMS.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendEmergencyBroadcast} className="mt-5 space-y-4">
                
                {/* One-Click Presets */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Quick Threat Templates
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleSelectPreset('elephant')}
                      className={`p-2.5 rounded-xl text-left border text-xs font-bold transition-all ${
                        emergencyData.preset === 'elephant'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/30'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className="block text-sm">🐘 Elephant</span>
                      <span className="text-[10px] font-normal text-gray-500">Herd Incursion</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectPreset('leopard')}
                      className={`p-2.5 rounded-xl text-left border text-xs font-bold transition-all ${
                        emergencyData.preset === 'leopard'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/30'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className="block text-sm">🐆 Leopard</span>
                      <span className="text-[10px] font-normal text-gray-500">Village Perimeter</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectPreset('fence')}
                      className={`p-2.5 rounded-xl text-left border text-xs font-bold transition-all ${
                        emergencyData.preset === 'fence'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/30'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <span className="block text-sm">⚡ Fence Line</span>
                      <span className="text-[10px] font-normal text-gray-500">Ground Short</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Target Forest Sector & Division
                  </label>
                  <input
                    type="text"
                    value={emergencyData.zone}
                    onChange={(e) => setEmergencyData({ ...emergencyData, zone: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl bg-[#F5F8F6] border border-gray-200 focus:outline-none focus:border-rose-400 font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Threat Nature & Species
                  </label>
                  <input
                    type="text"
                    value={emergencyData.threat}
                    onChange={(e) => setEmergencyData({ ...emergencyData, threat: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl bg-[#F5F8F6] border border-gray-200 focus:outline-none focus:border-rose-400 font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Community Safety Directives
                  </label>
                  <textarea
                    rows={3}
                    value={emergencyData.instructions}
                    onChange={(e) => setEmergencyData({ ...emergencyData, instructions: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl bg-[#F5F8F6] border border-gray-200 focus:outline-none focus:border-rose-400"
                    required
                  />
                </div>

                <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    Dispatches high-priority cellular sirens to all verified farmers within 5 km and powers acoustic boundary sounders.
                  </span>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowEmergencyModal(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black shadow-md transition-all active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>Authorize & Dispatch</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </>
  );
};

export default AdminNavbar;

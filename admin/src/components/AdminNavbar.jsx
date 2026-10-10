import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  ExternalLink 
} from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';

const AdminNavbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [emergencyData, setEmergencyData] = useState({
    zone: 'Wayanad North - Zone 3',
    threat: 'Wild Elephant Herd Spotted (4 Adults)',
    instructions: 'Evacuate outer perimeter fields immediately. Power solar electric fences.'
  });

  const notificationRef = useRef(null);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/admin/alerts?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSendEmergencyBroadcast = (e) => {
    e.preventDefault();
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setShowEmergencyModal(false);
    }, 2200);
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-emerald-950/10 px-4 sm:px-6 py-3.5 transition-all">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Mobile Menu Toggle & Search Bar */}
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            <button
              onClick={onMenuClick}
              className="p-2 -ml-1 text-gray-700 hover:text-[#063B2A] hover:bg-emerald-50 rounded-xl md:hidden transition-colors"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Quick Live Status Pill (Desktop) */}
            <div className="hidden lg:flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 px-3 py-1.5 rounded-full text-xs font-semibold text-[#063B2A] shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>AI Sensors Active</span>
              <span className="text-[10px] bg-[#10B981] text-white px-1.5 py-0.2 rounded font-bold">LIVE</span>
            </div>

            {/* Global Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative w-full hidden sm:block max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search alerts, complaints, farmers, cameras..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F5F8F6] text-xs text-[#071A14] pl-10 pr-4 py-2.5 rounded-2xl border border-transparent focus:border-emerald-300 focus:bg-white focus:outline-none transition-all placeholder:text-gray-400"
              />
            </form>
          </div>

          {/* Right: Actions, Alerts, Notifications & Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Emergency Broadcast Button */}
            <button
              onClick={() => setShowEmergencyModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-xs font-black shadow-md shadow-rose-600/20 active:scale-95 transition-all group"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-200 group-hover:animate-bounce" />
              <span className="hidden sm:inline">Emergency Broadcast</span>
              <span className="sm:hidden">Broadcast</span>
            </button>

            {/* Notification Bell with Dropdown */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-[#063B2A] hover:bg-emerald-50 rounded-2xl transition-colors"
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
            <div className="h-7 w-[1px] bg-gray-200 hidden sm:block"></div>

            {/* Officer Profile Chip */}
            <Link
              to="/admin/profile"
              className="flex items-center gap-2.5 p-1 sm:pr-3 rounded-2xl hover:bg-emerald-50 transition-colors group"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="Officer Arjun Nair"
                  className="w-9 h-9 rounded-2xl object-cover border-2 border-emerald-500 shadow-xs"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="hidden sm:block text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-[#071A14] group-hover:text-[#063B2A]">
                    Officer Arjun Nair
                  </span>
                  <span className="text-[9px] bg-emerald-100 text-[#063B2A] font-extrabold px-1.5 py-0.2 rounded-full uppercase">
                    FRO
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 font-medium">
                  Wayanad North Division
                </p>
              </div>
            </Link>

          </div>
        </div>
      </header>

      {/* Emergency Broadcast Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-rose-200 text-[#071A14] relative">
            
            <button
              onClick={() => setShowEmergencyModal(false)}
              className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-gray-700 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base font-black text-rose-950">
                  Instant Emergency Broadcast Siren
                </h3>
                <p className="text-xs text-gray-500">
                  Transmits high-priority SMS & siren notifications to local farmers and field teams
                </p>
              </div>
            </div>

            {broadcastSent ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-black text-emerald-950 text-base">
                  Emergency Broadcast Dispatched!
                </h4>
                <p className="text-xs text-gray-600">
                  1,420 registered farmers, 18 field forest squads, and local panchayat officials notified via SMS siren.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendEmergencyBroadcast} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Target Forest Sector / Division
                  </label>
                  <input
                    type="text"
                    value={emergencyData.zone}
                    onChange={(e) => setEmergencyData({ ...emergencyData, zone: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl bg-[#F5F8F6] border border-gray-200 focus:outline-none focus:border-rose-400 font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Threat Nature & Classification
                  </label>
                  <input
                    type="text"
                    value={emergencyData.threat}
                    onChange={(e) => setEmergencyData({ ...emergencyData, threat: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl bg-[#F5F8F6] border border-gray-200 focus:outline-none focus:border-rose-400 font-semibold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Safety Advisory & Advisory Directives
                  </label>
                  <textarea
                    rows={3}
                    value={emergencyData.instructions}
                    onChange={(e) => setEmergencyData({ ...emergencyData, instructions: e.target.value })}
                    className="w-full text-xs p-3 rounded-2xl bg-[#F5F8F6] border border-gray-200 focus:outline-none focus:border-rose-400"
                    required
                  />
                </div>

                <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl text-[11px] text-amber-900 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    This action activates village loudhailers and pushes high-priority cellular alerts to all community members within 5km.
                  </span>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowEmergencyModal(false)}
                    className="px-4 py-2.5 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black shadow-lg shadow-rose-600/25 transition-all"
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


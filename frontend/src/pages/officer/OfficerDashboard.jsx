import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  Radio, 
  MessageSquareWarning, 
  Users, 
  Trees, 
  Activity, 
  UserCheck, 
  LogOut, 
  Bell, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowUpRight, 
  Send, 
  Search, 
  Filter, 
  Compass, 
  Camera,
  Check,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import Button from '../../components/Button';
import { officerMetrics, sampleWildlifeAlerts, sampleComplaints } from '../../data/mockData';

const OfficerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  const handleAction = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const navItems = [
    { name: 'Dashboard', path: '/officer/dashboard', icon: LayoutDashboard },
    { name: 'Wildlife Alerts', path: '/officer/alerts', icon: Radio, badge: '24' },
    { name: 'Complaints', path: '/officer/complaints', icon: MessageSquareWarning, badge: '12' },
    { name: 'Users', path: '#users', icon: Users },
    { name: 'Farmers', path: '#farmers', icon: Trees },
    { name: 'Activity', path: '#activity', icon: Activity },
    { name: 'Profile', path: '/profile', icon: UserCheck },
  ];

  return (
    <div className="min-h-screen bg-[#F5F8F6] flex flex-col md:flex-row">
      
      {/* Mobile Top Header for Officer Portal */}
      <div className="md:hidden bg-[#063B2A] text-white p-4 flex items-center justify-between border-b border-emerald-900">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-emerald-400" />
          <span className="font-extrabold text-sm">AgriShield Officer Hub</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg bg-emerald-950 text-white"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* =========================================================================
          SIDEBAR (Prompt Section 22 Requirement)
          ========================================================================= */}
      <aside className={`
        fixed md:sticky top-0 z-40 h-screen w-64 bg-[#071A14] text-white p-5 flex flex-col justify-between border-r border-emerald-950 transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="space-y-6">
          {/* Officer Brand */}
          <div className="flex items-center gap-3 pb-4 border-b border-emerald-900/60">
            <div className="w-10 h-10 rounded-xl bg-[#063B2A] text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-black text-sm text-white tracking-wide">AgriShield</h2>
              <span className="text-[10px] text-emerald-400 uppercase font-semibold">Forest Admin Portal</span>
            </div>
          </div>

          {/* Officer Profile Badge */}
          <div className="p-3 bg-[#063B2A]/60 rounded-2xl border border-emerald-800/40 text-xs">
            <p className="text-[10px] text-emerald-400 font-bold uppercase">Active Duty</p>
            <p className="font-bold text-white text-xs mt-0.5">Ranger S. Madhavan</p>
            <p className="text-[11px] text-gray-400">Wayanad Range 4</p>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-semibold">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.path === '/officer/dashboard';
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#063B2A] text-emerald-300 border border-emerald-700/50'
                      : 'text-gray-300 hover:bg-emerald-950 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-emerald-400" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-bold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="pt-4 border-t border-emerald-950">
          <Link
            to="/officer/login"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout from Station</span>
          </Link>
        </div>
      </aside>

      {/* =========================================================================
          MAIN COMMAND DASHBOARD CONTENT
          ========================================================================= */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 space-y-8 overflow-y-auto max-w-7xl">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Kerala Forest HQ • System Operational</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#063B2A]">
              Officer Command Dashboard
            </h1>
            <p className="text-xs text-gray-500">
              Live automated wildlife tracking &amp; community grievance remediation center.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              to="/wildlife-camera"
              variant="outlineDark"
              size="sm"
              className="rounded-full text-xs"
              icon={Camera}
            >
              Live Camera Grid
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleAction('Dispatched Rapid Response Team (RRT) Vehicle 04!')}
              className="bg-[#10B981] hover:bg-[#0ea371] text-white rounded-full font-bold text-xs"
              icon={Send}
            >
              Dispatch Patrol Team
            </Button>
          </div>
        </div>

        {/* Toast feedback */}
        {toastMessage && (
          <div className="p-3.5 bg-emerald-900 text-white text-xs font-bold rounded-2xl flex items-center gap-2 shadow-lg animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* =========================================================================
            FOUR PRIMARY METRICS (Requirement 22)
            Wildlife Alerts: 24
            Pending Complaints: 12
            Verified Alerts: 18
            Resolved Complaints: 35
            ========================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Metric 1 */}
          <div className="bg-white rounded-3xl p-5 border border-emerald-950/10 shadow-soft space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Wildlife Alerts
              </span>
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
            </div>
            <div className="text-3xl font-black text-[#063B2A]">24</div>
            <p className="text-[11px] text-rose-600 font-semibold">Active camera trap detections</p>
          </div>

          {/* Metric 2 */}
          <div className="bg-white rounded-3xl p-5 border border-emerald-950/10 shadow-soft space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Pending Complaints
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-[#063B2A]">12</div>
            <p className="text-[11px] text-amber-600 font-semibold">Awaiting site inspection</p>
          </div>

          {/* Metric 3 */}
          <div className="bg-white rounded-3xl p-5 border border-emerald-950/10 shadow-soft space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Verified Alerts
              </span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-[#063B2A]">18</div>
            <p className="text-[11px] text-blue-600 font-semibold">Confirmed by field patrol</p>
          </div>

          {/* Metric 4 */}
          <div className="bg-white rounded-3xl p-5 border border-emerald-950/10 shadow-soft space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Resolved Complaints
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-[#063B2A]">35</div>
            <p className="text-[11px] text-emerald-600 font-semibold">Claims &amp; repairs closed</p>
          </div>

        </div>

        {/* =========================================================================
            TWO MAIN TABLES: RECENT ALERTS & RECENT COMPLAINTS (Prompt Section 22)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Table: Recent Alerts (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-emerald-950/10 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-extrabold text-[#063B2A] text-base">
                  Recent Wildlife Alerts
                </h3>
                <p className="text-xs text-gray-500">Live AI camera detections</p>
              </div>

              <Link
                to="/officer/alerts"
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
              >
                <span>View All 24 Alerts</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Prompt exact items: Elephant (Wayanad, 96%), Leopard (Idukki, 91%), Wild Boar (Ernakulam, 88%) */}
            <div className="divide-y divide-gray-100">
              
              {/* Alert 1 */}
              <div className="py-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-base shrink-0 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=150&q=80" 
                      alt="Elephant" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-gray-900 text-sm">Elephant</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                        Critical
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Wayanad • CAM-023</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-extrabold text-emerald-700">96% Conf.</div>
                  <button 
                    onClick={() => handleAction('Elephant alert verified & farmers SMS broadcast sent!')}
                    className="text-[11px] font-bold text-[#063B2A] hover:underline"
                  >
                    Verify &amp; Alert
                  </button>
                </div>
              </div>

              {/* Alert 2 */}
              <div className="py-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-base shrink-0 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=150&q=80" 
                      alt="Leopard" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-gray-900 text-sm">Leopard</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                        Critical
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Idukki • CAM-014</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-extrabold text-emerald-700">91% Conf.</div>
                  <button 
                    onClick={() => handleAction('Leopard sighting registered to Tea Plantation Ward')}
                    className="text-[11px] font-bold text-[#063B2A] hover:underline"
                  >
                    Action Unit
                  </button>
                </div>
              </div>

              {/* Alert 3 */}
              <div className="py-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-base shrink-0 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=150&q=80" 
                      alt="Wild Boar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-gray-900 text-sm">Wild Boar</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        Warning
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Ernakulam • CAM-042</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-extrabold text-emerald-700">88% Conf.</div>
                  <button 
                    onClick={() => handleAction('Fence energizer status checked')}
                    className="text-[11px] font-bold text-[#063B2A] hover:underline"
                  >
                    Log Event
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Table: Recent Complaints (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-emerald-950/10 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-extrabold text-[#063B2A] text-base">
                  Recent Complaints
                </h3>
                <p className="text-xs text-gray-500">Citizen &amp; farmer reports</p>
              </div>

              <Link
                to="/officer/complaints"
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
              >
                <span>View All 12</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Prompt exact items:
                Elephant Attack - Pending
                Crop Damage - Under Review
                Wildlife Sighting - Resolved
            */}
            <div className="space-y-3">
              
              {/* Complaint 1 */}
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200/80 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900 text-xs">Elephant Attack</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Sultan Bathery • Farmer Sukumaran</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                  Pending
                </span>
              </div>

              {/* Complaint 2 */}
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200/80 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900 text-xs">Crop Damage</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Vandiperiyar • High Altitude Area</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                  Under Review
                </span>
              </div>

              {/* Complaint 3 */}
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200/80 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900 text-xs">Wildlife Sighting</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">Chalakudy • Solar Fence Repaired</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Resolved
                </span>
              </div>

            </div>

            {/* Quick Officer Dispatch Utility */}
            <div className="mt-4 pt-4 border-t border-gray-100 p-4 bg-emerald-50 rounded-2xl">
              <h4 className="font-bold text-[#063B2A] text-xs">SMS Broadcast to Farmer Clusters</h4>
              <p className="text-[11px] text-gray-600 mt-1 mb-3">
                Send emergency flash advisory to registered mobile numbers within 5km radius.
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleAction('Broadcast sent to 412 registered farmers in Wayanad sector!')}
                className="w-full text-xs rounded-full bg-[#063B2A]"
              >
                Send Flash Alert Now
              </Button>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default OfficerDashboard;

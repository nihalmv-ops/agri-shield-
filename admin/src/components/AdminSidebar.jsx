import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Radio, 
  MessageSquareWarning, 
  Trees, 
  Users, 
  Activity, 
  UserCheck, 
  LogOut, 
  ShieldAlert, 
  Leaf, 
  X,
  Camera,
  Battery,
  Wifi,
  Zap,
  ShieldCheck,
  Compass
} from 'lucide-react';

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navSections = [
    {
      label: 'Operational Command',
      items: [
        { name: 'Dashboard Overview', path: '/admin/dashboard', icon: LayoutDashboard }
      ]
    },
    {
      label: 'Surveillance & AI Traps',
      items: [
        { name: 'Wildlife Alerts', path: '/admin/alerts', icon: Radio, badge: '24' },
      ]
    },
    {
      label: 'Community & Grievances',
      items: [
        { name: 'Citizen Complaints', path: '/admin/complaints', icon: MessageSquareWarning, badge: '12' },
        { name: 'Protected Farmers', path: '/admin/farmers', icon: Trees, badge: '248' },
        { name: 'Citizens Directory', path: '/admin/users', icon: Users }
      ]
    },
    {
      label: 'Logs & Range Setting',
      items: [
        { name: 'Incident SitRep Log', path: '/admin/activity', icon: Activity },
        { name: 'Officer Credentials', path: '/admin/profile', icon: UserCheck }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Main Standard Enterprise Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#071A14] text-white p-5 flex flex-col justify-between border-r border-emerald-950/80 transition-transform duration-300 md:translate-x-0 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          
          {/* Header Branding */}
          <div className="flex items-start justify-between pb-4 border-b border-emerald-900/60">
            <Link to="/admin/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#063B2A] p-0.5 shadow-md">
                <div className="w-full h-full bg-[#071A14] rounded-[14px] flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <div>
                <span className="text-base font-black tracking-tight text-white flex items-center gap-1">
                  Agri<span className="text-[#10B981]">Shield</span>
                </span>
                <span className="text-[10px] tracking-wider text-emerald-400/90 uppercase font-extrabold block">
                  Forest Command • Admin
                </span>
              </div>
            </Link>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-gray-400 hover:text-white md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Officer Duty Card */}
          <div className="px-3.5 py-2.5 bg-[#063B2A]/70 rounded-2xl border border-emerald-800/50 flex items-center justify-between shadow-inner">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300 block">
                  FOREST OFFICER
                </span>
                <span className="text-[10px] text-gray-400">Sector 4 Division</span>
              </div>
            </div>
            <span className="text-[10px] text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded font-mono font-bold border border-emerald-800/60">
              #FO-1024
            </span>
          </div>

          {/* Navigation Sections */}
          <nav className="space-y-4 text-xs font-semibold">
            {navSections.map((sec, secIdx) => (
              <div key={secIdx} className="space-y-1">
                {sec.label && (
                  <p className="px-3 text-[10px] uppercase tracking-wider font-extrabold text-emerald-400/70 pt-1">
                    {sec.label}
                  </p>
                )}

                {sec.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                          isActive
                            ? 'bg-[#063B2A] text-emerald-300 border border-emerald-600/50 shadow-sm font-bold'
                            : 'text-gray-300 hover:bg-emerald-950/60 hover:text-white'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className="flex items-center gap-3">
                            <Icon className={`w-4 h-4 ${isActive ? 'text-[#10B981]' : 'text-gray-400'}`} />
                            <span>{item.name}</span>
                          </div>

                          {item.badge && (
                            <span
                              className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                                isActive
                                  ? 'bg-[#10B981] text-[#071A14]'
                                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            ))}
          </nav>

        </div>

        {/* Sidebar Bottom: Hardware Telemetry + Logout */}
        <div className="pt-4 mt-6 border-t border-emerald-950/80 space-y-3">
          
          {/* Mini Telemetry Status */}
          <div className="p-3 bg-black/40 rounded-xl border border-emerald-900/40 space-y-1.5 text-[10px] text-gray-400">
            <div className="flex items-center justify-between font-bold text-gray-300">
              <span className="flex items-center gap-1 text-emerald-400">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>Edge Telemetry</span>
              </span>
              <span className="text-emerald-300">ONLINE</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Trap Cams:</span>
              <strong className="text-gray-200">42/45 Active</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Solar Fence Grid:</span>
              <strong className="text-emerald-400">8.2 kV Active</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Cellular Mesh:</span>
              <strong className="text-gray-200">5G Low Latency</strong>
            </div>
          </div>

          <Link
            to="/admin/login"
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Terminal</span>
          </Link>

          <div className="px-3.5 pt-0.5 text-[10px] text-gray-500 flex items-center justify-between">
            <span>Govt. of Kerala Forest Dept</span>
            <span className="font-mono text-emerald-600 font-bold">v2.4.0</span>
          </div>
        </div>

      </aside>
    </>
  );
};

export default AdminSidebar;

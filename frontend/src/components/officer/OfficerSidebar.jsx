import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
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
  ExternalLink,
  Shield,
  Leaf
} from 'lucide-react';

const OfficerSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigationItems = [
    { name: 'Dashboard', path: '/officer/dashboard', icon: LayoutDashboard },
    { name: 'Wildlife Alerts', path: '/officer/alerts', icon: Radio, badge: '24' },
    { name: 'Complaints', path: '/officer/complaints', icon: MessageSquareWarning, badge: '12' },
    { name: 'Users', path: '/officer/users', icon: Users },
    { name: 'Farmers', path: '/officer/farmers', icon: Trees },
    { name: 'Activity', path: '/officer/activity', icon: Activity },
    { name: 'Profile', path: '/officer/profile', icon: UserCheck },
  ];

  const isItemActive = (itemPath) => {
    if (itemPath === '/officer/dashboard') {
      return location.pathname === '/officer/dashboard' || location.pathname === '/officer';
    }
    return location.pathname.startsWith(itemPath);
  };

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Main Sidebar Shell */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#071A14] text-white p-5 flex flex-col justify-between border-r border-emerald-950 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          {/* Logo & Administrator Identity */}
          <div className="flex items-center gap-3 pb-4 border-b border-emerald-900/60">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-[#063B2A] p-0.5 shadow-md">
                <div className="w-full h-full bg-[#071A14] rounded-[10px] flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black tracking-tight text-white flex items-center gap-1">
                  Agri<span className="text-emerald-400">Shield</span>
                </span>
                <span className="text-[10px] tracking-wider text-emerald-400 uppercase font-bold">
                  Forest Officer Admin
                </span>
              </div>
            </Link>
          </div>

          {/* Active Officer ID Chip */}
          <div className="p-3 bg-[#063B2A]/70 rounded-2xl border border-emerald-800/40 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                Kerala Forest Dept
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <p className="font-extrabold text-white text-xs mt-1">Ranger S. Madhavan</p>
            <p className="text-[11px] text-gray-300">Wayanad Range 4 • #KFD-109</p>
          </div>

          {/* Sidebar Navigation */}
          <nav className="space-y-1.5 text-xs font-semibold">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isItemActive(item.path);

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                    active
                      ? 'bg-[#063B2A] text-emerald-300 border border-emerald-600/50 shadow-sm'
                      : 'text-gray-300 hover:bg-emerald-950/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${active ? 'text-emerald-400' : 'text-gray-400'}`} />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        active
                          ? 'bg-emerald-500 text-black'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Public Portal link & Logout */}
        <div className="pt-4 border-t border-emerald-950 space-y-2">
          <Link
            to="/"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-gray-400 hover:text-white hover:bg-emerald-950/40 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              Public Portal
            </span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          <Link
            to="/officer/login"
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default OfficerSidebar;

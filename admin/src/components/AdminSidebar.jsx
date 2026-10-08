import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Radio, 
  MessageSquareWarning, 
  Trees, 
  Users, 
  ShoppingBag, 
  Activity, 
  UserCheck, 
  LogOut, 
  ShieldAlert, 
  Leaf, 
  X 
} from 'lucide-react';

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navSections = [
    {
      label: null,
      items: [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard }
      ]
    },
    {
      label: 'Wildlife',
      items: [
        { name: 'Alerts', path: '/admin/alerts', icon: Radio, badge: '24' }
      ]
    },
    {
      label: 'Reports',
      items: [
        { name: 'Complaints', path: '/admin/complaints', icon: MessageSquareWarning, badge: '12' }
      ]
    },
    {
      label: 'Community',
      items: [
        { name: 'Farmers', path: '/admin/farmers', icon: Trees, badge: '248' },
        { name: 'Users', path: '/admin/users', icon: Users }
      ]
    },
    {
      label: 'Marketplace',
      items: [
        { name: 'Products', path: '/admin/products', icon: ShoppingBag, badge: '486' }
      ]
    },
    {
      label: null,
      items: [
        { name: 'Activity', path: '/admin/activity', icon: Activity },
        { name: 'Profile', path: '/admin/profile', icon: UserCheck }
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

      {/* Main Sidebar Shell */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#071A14] text-white p-5 flex flex-col justify-between border-r border-emerald-950/80 transition-transform duration-300 md:translate-x-0 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          
          {/* Header Branding (Section 6 Requirement) */}
          <div className="flex items-start justify-between pb-4 border-b border-emerald-900/60">
            <Link to="/admin/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primaryGreen to-darkForest p-0.5 shadow-md">
                <div className="w-full h-full bg-[#071A14] rounded-[14px] flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5 text-lightEmerald" />
                </div>
              </div>
              <div>
                <span className="text-base font-black tracking-tight text-white flex items-center gap-1">
                  🌿 Agri<span className="text-primaryGreen">Shield</span>
                </span>
                <span className="text-[10px] tracking-wider text-lightEmerald/90 uppercase font-extrabold block">
                  Admin Portal
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

          {/* Officer Role Chip (Section 6 Requirement) */}
          <div className="px-3.5 py-2.5 bg-[#063B2A]/70 rounded-2xl border border-emerald-800/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primaryGreen animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">
                FOREST OFFICER
              </span>
            </div>
            <span className="text-[10px] text-gray-400 font-mono">#FO-1024</span>
          </div>

          {/* Navigation Sections (Section 31 Requirement) */}
          <nav className="space-y-4 text-xs font-semibold">
            {navSections.map((sec, secIdx) => (
              <div key={secIdx} className="space-y-1">
                {sec.label && (
                  <p className="px-3 text-[10px] uppercase tracking-wider font-extrabold text-gray-400 pt-1">
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
                        `flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-all ${
                          isActive
                            ? 'bg-[#063B2A] text-lightEmerald border border-emerald-600/50 shadow-sm font-bold'
                            : 'text-gray-300 hover:bg-emerald-950/60 hover:text-white'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className="flex items-center gap-3">
                            <Icon className={`w-4 h-4 ${isActive ? 'text-primaryGreen' : 'text-gray-400'}`} />
                            <span>{item.name}</span>
                          </div>

                          {item.badge && (
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isActive
                                  ? 'bg-primaryGreen text-darkText'
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

        {/* Sidebar Bottom (Section 6 Requirement) */}
        <div className="pt-4 mt-6 border-t border-emerald-950/80 space-y-3">
          <Link
            to="/admin/login"
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl text-xs font-bold text-rose-400 hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Link>

          <div className="px-3.5 pt-1 text-[10px] text-gray-500 leading-tight">
            <p className="font-bold text-gray-400">AgriShield Admin</p>
            <p>Wildlife Protection System</p>
          </div>
        </div>

      </aside>
    </>
  );
};

export default AdminSidebar;

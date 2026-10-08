import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Leaf, 
  Search, 
  Bell, 
  Menu, 
  X, 
  Camera, 
  ShieldAlert, 
  UserCircle,
  ExternalLink,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import Button from './Button';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Wildlife Alerts', path: '/wildlife-alerts' },
    { name: 'AI Camera', path: '/wildlife-camera', badge: 'AI' },
    { name: 'Complaints', path: '/complaints' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#063B2A] text-white border-b border-emerald-900/40 backdrop-blur-md bg-opacity-95 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-[#063B2A] p-0.5 shadow-md group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#071A14] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <Shield className="w-6 h-6 text-emerald-400 stroke-[2.2]" />
                <Leaf className="w-3.5 h-3.5 text-accent absolute bottom-1 right-1.5 fill-emerald-400/30" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1 group-hover:text-emerald-300 transition-colors">
                Agri<span className="text-emerald-400 font-bold">Shield</span>
              </span>
              <span className="text-[10px] tracking-wider text-emerald-300/80 uppercase font-medium">
                Farmers • Forests • Future
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-3.5 py-2 text-sm font-medium transition-all rounded-lg flex items-center gap-1.5 ${
                    isActive
                      ? 'text-emerald-300 font-semibold bg-emerald-900/40'
                      : 'text-gray-200 hover:text-white hover:bg-emerald-900/20'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="text-[9px] uppercase px-1.5 py-0.2 bg-emerald-500 text-[#071A14] font-bold rounded">
                        {item.badge}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-emerald-400 rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            <a 
              href="#mission" 
              className="px-3.5 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-emerald-900/20 rounded-lg transition-colors"
            >
              About
            </a>
          </nav>

          {/* Search, Notifications & Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search Input Bar */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search products, animals, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 lg:w-64 pl-9 pr-8 py-1.5 text-xs bg-[#071A14]/70 border border-emerald-800/60 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 transition-all focus:w-72"
              />
              <Search className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="submit"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-white"
                >
                  ↵
                </button>
              )}
            </form>

            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-gray-300 hover:text-white hover:bg-emerald-900/40 rounded-full transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-[#063B2A] animate-pulse"></span>
              </button>

              {/* Notification Popover Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white text-gray-800 rounded-2xl shadow-xl border border-gray-100 p-4 z-50 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <span className="text-sm font-bold text-[#063B2A]">Recent Alerts</span>
                    <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">3 New</span>
                  </div>
                  <div className="divide-y divide-gray-100 text-xs">
                    <div className="py-2.5">
                      <p className="font-semibold text-gray-900">🐘 Elephant detected in Wayanad</p>
                      <p className="text-gray-500 text-[11px]">CAM-023 • 96% AI confidence</p>
                    </div>
                    <div className="py-2.5">
                      <p className="font-semibold text-gray-900">🌾 New Fresh Harvest: Wayanad Pepper</p>
                      <p className="text-gray-500 text-[11px]">By Spice World • 250 kg available</p>
                    </div>
                    <div className="py-2.5">
                      <p className="font-semibold text-gray-900">✅ Complaint #077 Resolved</p>
                      <p className="text-gray-500 text-[11px]">Solar fencing repaired at Chalakudy</p>
                    </div>
                  </div>
                  <Link 
                    to="/wildlife-alerts" 
                    onClick={() => setNotificationsOpen(false)}
                    className="block text-center text-xs font-semibold text-emerald-700 pt-3 border-t border-gray-100 hover:underline"
                  >
                    View All Wildlife Alerts →
                  </Link>
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2">
              <Button
                to="/login"
                variant="outline"
                size="sm"
                className="border-emerald-700/60 text-white hover:bg-emerald-900/50 py-1.5 px-4"
              >
                Login
              </Button>
              <Button
                to="/register"
                variant="primary"
                size="sm"
                className="bg-[#10B981] hover:bg-[#0ea371] text-white py-1.5 px-5 font-semibold"
              >
                Register
              </Button>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 text-gray-300 hover:text-white"
              aria-label="Toggle notifications"
            >
              <Bell className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#071A14] border-b border-emerald-900/50 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              placeholder="Search products, animals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-emerald-950/60 border border-emerald-800 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            />
            <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          <div className="space-y-1">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                    isActive
                      ? 'bg-emerald-800/40 text-emerald-300'
                      : 'text-gray-300 hover:bg-emerald-900/30 hover:text-white'
                  }`
                }
              >
                <span>{item.name}</span>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 bg-emerald-500 text-black font-bold rounded">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
            <Link
              to="/officer/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/50"
            >
              <span>Forest Officer Portal</span>
              <ShieldAlert className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-3 border-t border-emerald-900/50 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <Button
                to="/login"
                variant="outline"
                size="md"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full"
              >
                Login
              </Button>
              <Button
                to="/register"
                variant="primary"
                size="md"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-[#10B981]"
              >
                Register
              </Button>
            </div>
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-center text-gray-400 hover:text-white py-1 flex items-center justify-center gap-1.5"
            >
              <UserCircle className="w-3.5 h-3.5" />
              <span>User Profile & Settings</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;


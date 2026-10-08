import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  Bell, 
  Search, 
  Camera, 
  ShieldAlert, 
  User, 
  ExternalLink 
} from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';

const OfficerNavbar = ({ onToggleSidebar }) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-emerald-950/10 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 shadow-xs">
      
      {/* Left: Mobile Menu Toggle & System Identifier */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 md:hidden focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#063B2A] hidden sm:inline">
            Kerala Forest Dept • Command Grid
          </span>
          <span className="text-xs font-bold text-gray-500 hidden lg:inline">
            | Sector Wayanad &amp; Idukki
          </span>
        </div>
      </div>

      {/* Right: Quick Camera shortcut, Notifications & Officer Profile */}
      <div className="flex items-center gap-3">
        
        {/* Camera Link Shortcut */}
        <Link
          to="/wildlife-camera"
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#063B2A] hover:bg-[#084833] text-white text-xs font-bold rounded-full transition-colors shadow-xs"
        >
          <Camera className="w-3.5 h-3.5 text-emerald-400" />
          <span>AI Camera HUD</span>
        </Link>

        {/* Notifications Icon Button */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 text-gray-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-full transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white animate-pulse"></span>
          </button>

          <NotificationDropdown
            isOpen={notificationsOpen}
            onClose={() => setNotificationsOpen(false)}
          />
        </div>

        {/* Officer Avatar Chip */}
        <Link
          to="/officer/profile"
          className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-gray-200 hover:opacity-90 transition-opacity"
        >
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
            alt="Officer avatar"
            className="w-9 h-9 rounded-full object-cover border-2 border-emerald-500 shrink-0"
          />
          <div className="hidden md:block text-left">
            <p className="text-xs font-black text-gray-900 leading-tight">S. Madhavan</p>
            <p className="text-[10px] font-semibold text-emerald-700">Range Forest Officer</p>
          </div>
        </Link>

      </div>
    </header>
  );
};

export default OfficerNavbar;

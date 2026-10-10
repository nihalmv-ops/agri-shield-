import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminNavbar from '../components/AdminNavbar';
import { ShieldCheck, Heart, ShieldAlert } from 'lucide-react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F8F6] text-[#071A14] flex flex-col font-sans">
      {/* Sidebar Component */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area (offset by sidebar width on desktop) */}
      <div className="flex-1 flex flex-col md:pl-64 transition-all duration-300 min-h-screen">
        
        {/* Top Navbar */}
        <AdminNavbar
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fadeIn">
          <Outlet />
        </main>

        {/* Administrative Footer */}
        <footer className="mt-auto border-t border-emerald-950/10 bg-white/70 backdrop-blur-xs py-4 px-6 text-xs text-gray-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-bold text-[#063B2A]">AgriShield Command Portal</span>
              <span className="text-gray-300">•</span>
              <span>Forest & Wildlife Protection Division</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-medium">
              <span>Security Tier 1 Authorized</span>
              <span>Govt. of Kerala Forest Dept</span>
              <span className="text-emerald-700 font-bold">v2.4.0 Live</span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default AdminLayout;


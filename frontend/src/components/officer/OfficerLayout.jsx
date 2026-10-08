import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import OfficerSidebar from './OfficerSidebar';
import OfficerNavbar from './OfficerNavbar';

const OfficerLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#F5F8F6] text-gray-800 flex">
      {/* Sidebar */}
      <OfficerSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-64">
        {/* Top Header Navbar */}
        <OfficerNavbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fadeIn">
          {children || <Outlet />}
        </main>

        {/* Officer Administrative Footer */}
        <footer className="px-6 py-4 bg-white border-t border-emerald-950/10 text-[11px] text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 AgriShield Forest Command. Kerala Forest Department Internal System.</p>
          <div className="flex items-center gap-4 text-emerald-800 font-semibold">
            <span>Grid Status: Online</span>
            <span>•</span>
            <span>Sensor Nodes: 56 Connected</span>
            <span>•</span>
            <span>Helpline: 1800-425-4733</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default OfficerLayout;

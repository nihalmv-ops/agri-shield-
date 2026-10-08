import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  ShieldAlert, 
  MessageSquareWarning, 
  CheckCircle2, 
  X, 
  ChevronRight 
} from 'lucide-react';

const NotificationDropdown = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 'n-1',
      title: '🐘 New Elephant Detection',
      location: 'Wayanad • CAM-023 (96% Conf)',
      time: '5 minutes ago',
      unread: true,
      link: '/admin/alerts/AL-001'
    },
    {
      id: 'n-2',
      title: '⚠️ New High Priority Complaint',
      location: 'Idukki • Animal Attack (#CMP-002)',
      time: '20 minutes ago',
      unread: true,
      link: '/admin/complaints/CMP-002'
    },
    {
      id: 'n-3',
      title: '✓ Wildlife Alert Verified',
      location: 'Leopard Sighting • DFO Anjali Nair',
      time: '30 minutes ago',
      unread: false,
      link: '/admin/alerts/AL-002'
    },
    {
      id: 'n-4',
      title: '🌾 New Farmer Registered',
      location: 'Anjali S • Highrange Apiaries',
      time: '1 hour ago',
      unread: false,
      link: '/admin/farmers/FAR-002'
    }
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-emerald-950/10 p-5 z-50 animate-fadeIn text-[#071A14]">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#10B981]" />
          <h4 className="font-extrabold text-[#063B2A] text-sm">Admin Notifications</h4>
          <span className="text-[10px] font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">
            {notifications.filter(n => n.unread).length} New
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={markAllRead}
            className="text-[11px] font-semibold text-[#10B981] hover:underline"
          >
            Mark all read
          </button>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
            aria-label="Close notifications"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto my-2">
        {notifications.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            onClick={onClose}
            className={`block p-3 rounded-2xl transition-colors hover:bg-emerald-50/60 ${
              item.unread ? 'bg-emerald-50/40' : ''
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-black text-gray-900 leading-snug">
                {item.title}
              </p>
              {item.unread && (
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1"></span>
              )}
            </div>
            <p className="text-[11px] text-gray-500 mt-0.5">{item.location}</p>
            <span className="text-[10px] text-gray-400 font-medium block mt-1">
              {item.time}
            </span>
          </Link>
        ))}
      </div>

      <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
        <Link
          to="/admin/alerts"
          onClick={onClose}
          className="text-[#10B981] font-bold hover:underline flex items-center gap-1"
        >
          <span>View All Alerts</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default NotificationDropdown;

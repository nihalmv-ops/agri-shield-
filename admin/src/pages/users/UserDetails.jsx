import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  User as UserIcon, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ShieldAlert, 
  CheckCircle2, 
  MessageSquareWarning, 
  Radio, 
  RotateCcw 
} from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import { initialUsers } from '../../data/users';

const UserDetails = () => {
  const { id } = useParams();
  const user = initialUsers.find(u => u.id === id) || initialUsers[0];

  const [status, setStatus] = useState(user.status);
  const [toastMessage, setToastMessage] = useState('');

  const handleToggleStatus = () => {
    const nextStatus = status === 'Active' ? 'Suspended' : 'Active';
    setStatus(nextStatus);
    setToastMessage(`User status changed to ${nextStatus}`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleResetSecurity = () => {
    setToastMessage(`Security credentials reset dispatched to ${user.email}`);
    setTimeout(() => setToastMessage(''), 3500);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#071A14] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/users"
            className="p-2.5 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:text-[#063B2A] hover:bg-emerald-50 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-extrabold text-gray-500 uppercase">
                {user.id}
              </span>
              <StatusBadge status={status} />
              <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                {user.accountType}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#063B2A] tracking-tight">
              {user.name} • Account Dossier
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetSecurity}
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-2xl text-xs font-bold transition-all active:scale-95 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Access Token</span>
          </button>

          <button
            onClick={handleToggleStatus}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black shadow-md transition-all active:scale-95 ${
              status === 'Active'
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {status === 'Active' ? 'Suspend Citizen Account' : 'Reactivate Account'}
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-950/10 shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 pb-6 border-b border-gray-100">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-3xl object-cover border-2 border-emerald-500 shadow-md"
          />
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-[#071A14]">
              {user.name}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-1">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-600" /> {user.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" /> {user.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {user.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Member since {user.joinedDate}
              </span>
            </div>
          </div>
        </div>

        {/* 3 Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-[#F5F8F6] p-4 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 text-emerald-800 font-bold">
              <Radio className="w-4 h-4 text-emerald-600" />
              <span>Wildlife Sighting Alerts</span>
            </div>
            <p className="text-2xl font-black text-[#063B2A]">
              {user.wildlifeReportsCount || 0}
            </p>
            <span className="text-[10px] text-gray-500">Citizen optical reports submitted</span>
          </div>

          <div className="bg-[#F5F8F6] p-4 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 text-amber-800 font-bold">
              <MessageSquareWarning className="w-4 h-4 text-amber-600" />
              <span>Loss Claims & Grievances</span>
            </div>
            <p className="text-2xl font-black text-[#063B2A]">
              {user.complaintsCount || 0}
            </p>
            <span className="text-[10px] text-gray-500">Total filed with forest division</span>
          </div>

          <div className="bg-[#F5F8F6] p-4 rounded-2xl space-y-1">
            <div className="flex items-center gap-2 text-blue-800 font-bold">
              <UserIcon className="w-4 h-4 text-blue-600" />
              <span>Security Profile</span>
            </div>
            <p className="text-2xl font-black text-[#063B2A]">
              Tier 1
            </p>
            <span className="text-[10px] text-gray-500">Verified Citizen via Aadhaar/OTP</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default UserDetails;


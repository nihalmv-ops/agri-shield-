import React, { useState } from 'react';
import { 
  UserCheck, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldAlert, 
  Key, 
  Bell, 
  Camera, 
  CheckCircle2, 
  Edit3, 
  Save, 
  Check, 
  Radio, 
  Lock 
} from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [officerData, setOfficerData] = useState({
    name: 'Officer Arjun Nair',
    officerId: 'FO-1024',
    designation: 'Forest Range Officer (FRO)',
    department: 'Department of Forests & Wildlife, Govt. of Kerala',
    division: 'Wayanad North Division',
    officeLocation: 'Range Forest Office, Sultan Bathery, Wayanad',
    email: 'officer@agrishield.com',
    phone: '+91 94471 88990',
    callSign: 'KFD-WAYANAD-ALPHA-01',
    accessLevel: 'Grade 1 Administrative Command'
  });

  const [notificationPrefs, setNotificationPrefs] = useState({
    smsElephant: true,
    thermalOffline: true,
    highGrievance: true,
    dailySitRep: false
  });

  const [toastMessage, setToastMessage] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({ current: '', newPass: '', confirm: '' });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setToastMessage('Officer profile dossier updated successfully.');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setShowPasswordModal(false);
    setPasswordData({ current: '', newPass: '', confirm: '' });
    setToastMessage('Authorization credentials updated successfully.');
    setTimeout(() => setToastMessage(''), 3000);
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
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-emerald-100 flex items-center justify-center text-[#10B981]">
              <UserCheck className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-[#063B2A] tracking-tight">
              Forest Officer Administrative Profile
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Official credentials, jurisdiction parameters, and emergency broadcast privileges
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-2xl text-xs font-bold transition-all active:scale-95 flex items-center gap-2"
          >
            <Key className="w-4 h-4 text-gray-600" />
            <span>Change Security PIN</span>
          </button>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2.5 bg-[#063B2A] hover:bg-emerald-900 text-white rounded-2xl text-xs font-black shadow-md transition-all active:scale-95 flex items-center gap-2"
          >
            {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
            <span>{isEditing ? 'Cancel Edit' : 'Edit Credentials'}</span>
          </button>
        </div>
      </div>

      {/* Main Profile Showcase */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-950/10 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                alt="Officer Arjun Nair"
                className="w-24 h-24 rounded-3xl object-cover border-4 border-emerald-500 shadow-lg"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-[#071A14]">
                  {officerData.name}
                </h2>
                <span className="text-xs font-mono font-extrabold bg-emerald-100 text-[#063B2A] px-2.5 py-0.5 rounded-full">
                  #{officerData.officerId}
                </span>
              </div>
              <p className="text-xs font-bold text-emerald-800 mt-0.5">
                {officerData.designation} • {officerData.division}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {officerData.department}
              </p>
            </div>
          </div>

          <div className="bg-[#F5F8F6] p-4 rounded-2xl border border-emerald-900/10 space-y-1 sm:text-right">
            <span className="text-[10px] text-gray-400 uppercase font-bold block">Radio Call Sign</span>
            <span className="font-mono font-black text-emerald-800 text-sm block">{officerData.callSign}</span>
            <span className="text-[10px] bg-emerald-200 text-emerald-900 font-extrabold px-2 py-0.5 rounded-full inline-block">
              {officerData.accessLevel}
            </span>
          </div>
        </div>

        {/* Form or Readonly View */}
        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="pt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Full Name</label>
                <input
                  type="text"
                  value={officerData.name}
                  onChange={(e) => setOfficerData({ ...officerData, name: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-[#F5F8F6] border border-gray-200 font-semibold focus:outline-none focus:border-emerald-300"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Designation</label>
                <input
                  type="text"
                  value={officerData.designation}
                  onChange={(e) => setOfficerData({ ...officerData, designation: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-[#F5F8F6] border border-gray-200 font-semibold focus:outline-none focus:border-emerald-300"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Official Email</label>
                <input
                  type="email"
                  value={officerData.email}
                  onChange={(e) => setOfficerData({ ...officerData, email: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-[#F5F8F6] border border-gray-200 font-semibold focus:outline-none focus:border-emerald-300"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Emergency Mobile</label>
                <input
                  type="text"
                  value={officerData.phone}
                  onChange={(e) => setOfficerData({ ...officerData, phone: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-[#F5F8F6] border border-gray-200 font-semibold focus:outline-none focus:border-emerald-300"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-gray-700 font-bold mb-1">Range Office Address</label>
                <input
                  type="text"
                  value={officerData.officeLocation}
                  onChange={(e) => setOfficerData({ ...officerData, officeLocation: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-[#F5F8F6] border border-gray-200 font-semibold focus:outline-none focus:border-emerald-300"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#10B981] hover:bg-emerald-600 text-white text-xs font-black rounded-2xl shadow-md transition-all"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 text-xs">
            <div className="bg-[#F5F8F6] p-4 rounded-2xl">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Email</span>
              <span className="font-bold text-gray-900 mt-0.5 block">{officerData.email}</span>
            </div>
            <div className="bg-[#F5F8F6] p-4 rounded-2xl">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Secure Line</span>
              <span className="font-mono font-bold text-gray-900 mt-0.5 block">{officerData.phone}</span>
            </div>
            <div className="bg-[#F5F8F6] p-4 rounded-2xl">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Division Office</span>
              <span className="font-bold text-gray-900 mt-0.5 block">{officerData.officeLocation}</span>
            </div>
            <div className="bg-[#F5F8F6] p-4 rounded-2xl">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Terminal Security</span>
              <span className="font-bold text-emerald-700 mt-0.5 block">2FA Hardware Token Active</span>
            </div>
          </div>
        )}
      </div>

      {/* Jurisdiction & Alarm Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Jurisdiction Coverage */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-950/10 shadow-soft space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <ShieldAlert className="w-5 h-5 text-[#10B981]" />
            <h3 className="font-extrabold text-[#063B2A] text-base">
              Sector Command Parameters
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F5F8F6]">
              <span className="text-gray-600 font-medium">Assigned Camera Traps</span>
              <span className="font-black text-[#063B2A]">45 Optical Nodes (42 Online)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F5F8F6]">
              <span className="text-gray-600 font-medium">Enrolled Farmers in Perimeter</span>
              <span className="font-black text-[#063B2A]">1,420 Registered Members</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F5F8F6]">
              <span className="text-gray-600 font-medium">Rapid Response Patrol Units</span>
              <span className="font-black text-emerald-700">3 Flying Squads (RRT-01, 02, 04)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F5F8F6]">
              <span className="text-gray-600 font-medium">Solar Boundary Fence Voltage</span>
              <span className="font-mono font-bold text-emerald-700">9.4 kV Energized</span>
            </div>
          </div>
        </div>

        {/* Real-Time Siren Notification Toggles */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-950/10 shadow-soft space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Bell className="w-5 h-5 text-[#10B981]" />
            <h3 className="font-extrabold text-[#063B2A] text-base">
              Officer Early Warning Subscriptions
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-2xl bg-[#F5F8F6] cursor-pointer">
              <span className="font-bold text-gray-800">Instant SMS Siren on Elephant Sighting</span>
              <input
                type="checkbox"
                checked={notificationPrefs.smsElephant}
                onChange={(e) => setNotificationPrefs({ ...notificationPrefs, smsElephant: e.target.checked })}
                className="w-4 h-4 rounded text-[#10B981] focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-[#F5F8F6] cursor-pointer">
              <span className="font-bold text-gray-800">Thermal Camera Trap Battery Alerts</span>
              <input
                type="checkbox"
                checked={notificationPrefs.thermalOffline}
                onChange={(e) => setNotificationPrefs({ ...notificationPrefs, thermalOffline: e.target.checked })}
                className="w-4 h-4 rounded text-[#10B981] focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-[#F5F8F6] cursor-pointer">
              <span className="font-bold text-gray-800">High-Priority Farmer Loss Claim Dispatch</span>
              <input
                type="checkbox"
                checked={notificationPrefs.highGrievance}
                onChange={(e) => setNotificationPrefs({ ...notificationPrefs, highGrievance: e.target.checked })}
                className="w-4 h-4 rounded text-[#10B981] focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-[#F5F8F6] cursor-pointer">
              <span className="font-bold text-gray-800">Daily Automated Situation Report (PDF)</span>
              <input
                type="checkbox"
                checked={notificationPrefs.dailySitRep}
                onChange={(e) => setNotificationPrefs({ ...notificationPrefs, dailySitRep: e.target.checked })}
                className="w-4 h-4 rounded text-[#10B981] focus:ring-0"
              />
            </label>
          </div>
        </div>

      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-emerald-900/10 text-[#071A14]">
            <h3 className="text-base font-extrabold text-[#063B2A] pb-3 border-b border-gray-100">
              Update Officer Authorization PIN
            </h3>

            <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Current PIN / Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full text-xs p-3 rounded-2xl bg-[#F5F8F6] border border-gray-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">New Command PIN</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full text-xs p-3 rounded-2xl bg-[#F5F8F6] border border-gray-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Confirm New PIN</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full text-xs p-3 rounded-2xl bg-[#F5F8F6] border border-gray-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#063B2A] text-white text-xs font-extrabold rounded-2xl shadow-md"
                >
                  Update PIN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;

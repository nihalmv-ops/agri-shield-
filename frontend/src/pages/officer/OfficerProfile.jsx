import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserCheck, 
  BadgeCheck, 
  Building2, 
  Trees, 
  Phone, 
  Mail, 
  MapPin, 
  Key, 
  LogOut, 
  Edit3, 
  Save, 
  CheckCircle2, 
  ShieldAlert, 
  Radio, 
  Camera,
  X
} from 'lucide-react';
import Button from '../../components/Button';

const OfficerProfile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: 'S. Madhavan',
    officerId: 'KFD-RNGR-109',
    department: 'Kerala Forest & Wildlife Department',
    forestDivision: 'Wayanad Wildlife Division (Range 4)',
    designation: 'Range Forest Officer (RFO)',
    phone: '+91 94470 12890',
    officialEmail: 'madhavan.range4@kerala.gov.in',
    location: 'Sultan Bathery, Wayanad, Kerala',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    serviceYears: '12 Years Active Service',
    jurisdictionRange: 'Range 4 (Buffer Sector B, 140 sq km)',
    assignedTraps: '18 Active Solar Cameras'
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [toast, setToast] = useState('');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsEditModalOpen(false);
    setToast('Officer profile details updated successfully!');
    setTimeout(() => setToast(''), 3000);
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    setIsPasswordModalOpen(false);
    setToast('Station security password updated!');
    setTimeout(() => setToast(''), 3000);
  };

  const handleLogout = () => {
    navigate('/officer/login');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 mb-1">
          <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Official Service Record</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#063B2A]">
          Forest Officer Profile
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
          Government service authentication and station administrative credentials.
        </p>
      </div>

      {toast && (
        <div className="p-3.5 bg-emerald-900 text-white text-xs font-bold rounded-2xl flex items-center gap-2 shadow-md animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Main Profile Showcase Card (Prompt Section 17 Requirement) */}
      <div className="bg-white rounded-3xl border border-emerald-950/10 shadow-soft p-6 sm:p-10 space-y-8">
        
        {/* Top Identification Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-24 h-24 rounded-3xl object-cover border-4 border-emerald-500 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#063B2A] text-emerald-400 flex items-center justify-center border-2 border-white shadow-xs">
                <ShieldAlert className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-2xl font-black text-gray-900">{profile.name}</h2>
                <span className="font-mono text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {profile.officerId}
                </span>
              </div>
              <p className="text-xs font-bold text-emerald-700">{profile.designation}</p>
              <p className="text-xs text-gray-500">{profile.department}</p>
            </div>
          </div>

          {/* Action Buttons (Prompt Section 17: Edit Profile, Change Password, Logout) */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold bg-[#063B2A] hover:bg-[#084833] text-white transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>

            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors border border-gray-300"
            >
              <Key className="w-3.5 h-3.5" />
              <span>Change Password</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors border border-rose-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Detailed Fields Grid (Prompt Section 17 Requirement) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          
          <div className="bg-gray-50/80 p-5 rounded-2xl border border-gray-200/80 space-y-3.5">
            <h3 className="font-black text-[#063B2A] text-sm pb-2 border-b border-gray-200">
              Departmental Credentials
            </h3>

            <div className="flex justify-between py-1 border-b border-gray-200">
              <span className="text-gray-500 font-semibold">Full Name:</span>
              <strong className="text-gray-900">{profile.name}</strong>
            </div>

            <div className="flex justify-between py-1 border-b border-gray-200">
              <span className="text-gray-500 font-semibold">Service Officer ID:</span>
              <strong className="font-mono text-emerald-800">{profile.officerId}</strong>
            </div>

            <div className="flex justify-between py-1 border-b border-gray-200">
              <span className="text-gray-500 font-semibold">Department:</span>
              <strong className="text-gray-900">{profile.department}</strong>
            </div>

            <div className="flex justify-between py-1 border-b border-gray-200">
              <span className="text-gray-500 font-semibold">Forest Division:</span>
              <strong className="text-gray-900">{profile.forestDivision}</strong>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-gray-500 font-semibold">Official Designation:</span>
              <strong className="text-emerald-800">{profile.designation}</strong>
            </div>
          </div>

          <div className="bg-gray-50/80 p-5 rounded-2xl border border-gray-200/80 space-y-3.5">
            <h3 className="font-black text-[#063B2A] text-sm pb-2 border-b border-gray-200">
              Contact &amp; Station Jurisdiction
            </h3>

            <div className="flex justify-between py-1 border-b border-gray-200">
              <span className="text-gray-500 font-semibold">Phone Number:</span>
              <strong className="font-mono text-gray-900">{profile.phone}</strong>
            </div>

            <div className="flex justify-between py-1 border-b border-gray-200">
              <span className="text-gray-500 font-semibold">Official Email:</span>
              <strong className="text-gray-900">{profile.officialEmail}</strong>
            </div>

            <div className="flex justify-between py-1 border-b border-gray-200">
              <span className="text-gray-500 font-semibold">Range Station Location:</span>
              <strong className="text-gray-900">{profile.location}</strong>
            </div>

            <div className="flex justify-between py-1 border-b border-gray-200">
              <span className="text-gray-500 font-semibold">Assigned Sector:</span>
              <strong className="text-gray-900">{profile.jurisdictionRange}</strong>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-gray-500 font-semibold">Active Optical Camera Traps:</span>
              <strong className="text-emerald-800 font-bold">{profile.assignedTraps}</strong>
            </div>
          </div>

        </div>

      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-emerald-900/10 space-y-5">
            <div className="flex items-start justify-between pb-3 border-b border-gray-100">
              <h3 className="text-lg font-black text-gray-900">Edit Officer Record</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Official Email</label>
                <input
                  type="email"
                  value={profile.officialEmail}
                  onChange={(e) => setProfile({ ...profile, officialEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Station Location</label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-[#10B981] text-white"
                >
                  Save Record
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-emerald-900/10 space-y-5">
            <div className="flex items-start justify-between pb-3 border-b border-gray-100">
              <h3 className="text-lg font-black text-gray-900">Change Security Password</h3>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePassword} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Current Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">New Security Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsPasswordModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-[#063B2A] text-white"
                >
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default OfficerProfile;

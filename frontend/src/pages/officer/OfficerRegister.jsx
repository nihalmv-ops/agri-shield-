import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  BadgeCheck, 
  Mail, 
  Phone, 
  Trees, 
  Lock, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  UserCheck 
} from 'lucide-react';
import Button from '../../components/Button';

const OfficerRegister = () => {
  const [formData, setFormData] = useState({
    fullName: 'S. Madhavan',
    officerId: 'KFD-RNGR-109',
    department: 'Kerala Forest & Wildlife Department',
    forestDivision: 'Wayanad Wildlife Division',
    designation: 'Range Forest Officer (RFO)',
    phone: '+91 94470 12890',
    officialEmail: 'madhavan.range4@kerala.gov.in',
    password: '',
    confirmPassword: '',
    location: 'Wayanad, Kerala'
  });

  const [registeredSuccess, setRegisteredSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setRegisteredSuccess(true);
    setTimeout(() => {
      navigate('/officer/dashboard');
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-[#F5F8F6] flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full mx-auto bg-white rounded-3xl shadow-soft-lg border border-emerald-950/10 p-8 sm:p-12 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2 pb-4 border-b border-gray-100">
          <div className="w-14 h-14 rounded-2xl bg-[#063B2A] text-emerald-400 flex items-center justify-center mx-auto shadow-md">
            <UserCheck className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Administrative Enrolment
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#063B2A]">
            Forest Officer Registration
          </h1>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Authorized personnel portal for registering range officers, DFOs, and forest watchers into AgriShield.
          </p>
        </div>

        {registeredSuccess && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs flex items-center gap-2 animate-fadeIn font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Registration approved! Enlisting officer into command console...</span>
          </div>
        )}

        {/* Registration Form (Exact fields from prompt Section 6) */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
                placeholder="e.g. S. Madhavan"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Officer ID *</label>
              <input
                type="text"
                value={formData.officerId}
                onChange={(e) => setFormData({ ...formData, officerId: e.target.value })}
                required
                placeholder="e.g. KFD-RNGR-109"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Department *</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Forest Division *</label>
              <select
                value={formData.forestDivision}
                onChange={(e) => setFormData({ ...formData, forestDivision: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Wayanad Wildlife Division">Wayanad Wildlife Division</option>
                <option value="Idukki Wildlife Division">Idukki Wildlife Division</option>
                <option value="Palakkad Buffer Division">Palakkad Buffer Division</option>
                <option value="Chalakudy Forest Range">Chalakudy Forest Range</option>
                <option value="Nilambur North Division">Nilambur North Division</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Designation *</label>
              <select
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Range Forest Officer (RFO)">Range Forest Officer (RFO)</option>
                <option value="Divisional Forest Officer (DFO)">Divisional Forest Officer (DFO)</option>
                <option value="Section Forest Officer">Section Forest Officer</option>
                <option value="Rapid Response Team Lead">Rapid Response Team Lead</option>
                <option value="Forest Beat Officer">Forest Beat Officer</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                placeholder="+91 94470 12890"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Official Email *</label>
              <input
                type="email"
                value={formData.officialEmail}
                onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                required
                placeholder="officer@kerala.gov.in"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Location / Range Station *</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                placeholder="e.g. Sultan Bathery, Wayanad"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Password *</label>
              <input
                type="password"
                placeholder="••••••••"
                defaultValue="password123"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Confirm Password *</label>
              <input
                type="password"
                placeholder="••••••••"
                defaultValue="password123"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full bg-[#10B981] hover:bg-[#0ea371] text-white font-extrabold rounded-full py-3 shadow-glow-emerald text-sm mt-3"
            icon={ArrowRight}
            iconPosition="right"
          >
            Register as Forest Officer
          </Button>
        </form>

        <div className="pt-4 border-t border-gray-100 text-center text-xs text-gray-600">
          Already registered?{' '}
          <Link to="/officer/login" className="text-emerald-700 font-bold hover:underline">
            Login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default OfficerRegister;

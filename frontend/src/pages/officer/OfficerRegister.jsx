import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  BadgeCheck, 
  Mail, 
  Phone, 
  Trees, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  UserCheck 
} from 'lucide-react';
import Button from '../../components/Button';

const OfficerRegister = () => {
  const [formData, setFormData] = useState({
    name: 'S. Madhavan',
    badgeId: 'KFD-RNGR-109',
    email: 'madhavan.range4@kerala.gov.in',
    phone: '+91 94470 12890',
    division: 'Wayanad Wildlife Division',
    designation: 'Range Forest Officer (RFO)',
    password: '',
    confirmPassword: ''
  });

  const [registeredSuccess, setRegisteredSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setRegisteredSuccess(true);
    setTimeout(() => {
      navigate('/officer/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#071A14] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-xl w-full mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#063B2A] border border-emerald-500/40 flex items-center justify-center mx-auto shadow-glow-emerald">
            <UserCheck className="w-7 h-7 text-emerald-400" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
            Administrative Enlistment
          </span>
          <h1 className="text-2xl font-black text-white">
            Forest Officer Enrolment
          </h1>
          <p className="text-xs text-gray-400">
            Enlist new forest protection officers into the AgriShield command grid.
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-[#063B2A]/70 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-emerald-800/60 shadow-2xl space-y-5">
          
          {registeredSuccess && (
            <div className="p-3 bg-emerald-950 border border-emerald-400 rounded-xl text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Officer credentials created! Redirecting to dashboard...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-200 mb-1">Officer Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-800/80 bg-[#071A14] text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-200 mb-1">Service Badge ID *</label>
                <input
                  type="text"
                  value={formData.badgeId}
                  onChange={(e) => setFormData({ ...formData, badgeId: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-800/80 bg-[#071A14] text-white focus:outline-none focus:ring-1 focus:ring-emerald-400 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-200 mb-1">Official Govt Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-800/80 bg-[#071A14] text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-200 mb-1">Contact Phone *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-800/80 bg-[#071A14] text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-200 mb-1">Division *</label>
                <select
                  value={formData.division}
                  onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-800/80 bg-[#071A14] text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                >
                  <option value="Wayanad Wildlife Division">Wayanad Wildlife Division</option>
                  <option value="Idukki Wildlife Division">Idukki Wildlife Division</option>
                  <option value="Palakkad Buffer Division">Palakkad Buffer Division</option>
                  <option value="Chalakudy Forest Range">Chalakudy Forest Range</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-200 mb-1">Designation *</label>
                <select
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-800/80 bg-[#071A14] text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                >
                  <option value="Range Forest Officer (RFO)">Range Forest Officer (RFO)</option>
                  <option value="Deputy Conservator of Forests (DCF)">Deputy Conservator (DCF)</option>
                  <option value="Rapid Response Team Lead (RRT)">Rapid Response Team Lead</option>
                  <option value="Section Forest Officer">Section Forest Officer</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-200 mb-1">Password *</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  defaultValue="password123"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-800/80 bg-[#071A14] text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-200 mb-1">Confirm Password *</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  defaultValue="password123"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-800/80 bg-[#071A14] text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full bg-[#10B981] hover:bg-[#0ea371] text-black font-extrabold rounded-full py-3 shadow-glow-emerald"
              icon={ArrowRight}
              iconPosition="right"
            >
              Register Officer Profile
            </Button>
          </form>

          <div className="pt-3 border-t border-emerald-800/60 text-center text-xs text-gray-400">
            Already enlisted?{' '}
            <Link to="/officer/login" className="text-emerald-400 font-bold hover:underline">
              Officer Login
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OfficerRegister;

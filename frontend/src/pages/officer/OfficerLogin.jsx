import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  Shield, 
  Lock, 
  BadgeCheck, 
  Building2, 
  ArrowRight, 
  CheckCircle2,
  TreePine,
  Trees
} from 'lucide-react';
import Button from '../../components/Button';

const OfficerLogin = () => {
  const [officerId, setOfficerId] = useState('KFD-RANGE-042');
  const [pin, setPin] = useState('••••••');
  const [division, setDivision] = useState('Wayanad Wildlife Division');
  const [successToast, setSuccessToast] = useState(false);
  const navigate = useNavigate();

  const handleOfficerLogin = (e) => {
    e.preventDefault();
    setSuccessToast(true);
    setTimeout(() => {
      navigate('/officer/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#071A14] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-md w-full mx-auto space-y-6">
        
        {/* Top Header Badge */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-[#063B2A] p-0.5 mx-auto shadow-glow-emerald">
            <div className="w-full h-full bg-[#071A14] rounded-[14px] flex items-center justify-center">
              <ShieldAlert className="w-8 h-8 text-emerald-400" />
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
              Kerala Forest &amp; Wildlife Department
            </span>
            <h1 className="text-2xl font-black text-white mt-2">
              Forest Officer Command Portal
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Authorised administrative access for range officers, DFOs, and rapid response units.
            </p>
          </div>
        </div>

        {/* Card Form */}
        <div className="bg-[#063B2A]/70 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-emerald-800/60 shadow-2xl space-y-5">
          
          {successToast && (
            <div className="p-3 bg-emerald-950 border border-emerald-400 rounded-xl text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Officer credentials authorized! Launching dashboard...</span>
            </div>
          )}

          <form onSubmit={handleOfficerLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-200 mb-1">
                Officer Service ID / Badge Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={officerId}
                  onChange={(e) => setOfficerId(e.target.value)}
                  required
                  placeholder="e.g. KFD-RANGE-042"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-emerald-800/80 bg-[#071A14] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
                <BadgeCheck className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-200 mb-1">
                Assigned Forest Division
              </label>
              <div className="relative">
                <select
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-emerald-800/80 bg-[#071A14] text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                >
                  <option value="Wayanad Wildlife Division">Wayanad Wildlife Division (Range 1-5)</option>
                  <option value="Idukki Wildlife Division">Idukki Wildlife Division (High Ranges)</option>
                  <option value="Palakkad Buffer Division">Palakkad Buffer Division (Silent Valley)</option>
                  <option value="Chalakudy Forest Range">Chalakudy Forest Division</option>
                  <option value="Nilambur North Division">Nilambur North Division</option>
                </select>
                <Trees className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-200 mb-1">
                Security PIN / Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                  placeholder="••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-emerald-800/80 bg-[#071A14] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
                <Lock className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
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
              Access Forest Command Center
            </Button>
          </form>

          <div className="pt-3 border-t border-emerald-800/60 flex items-center justify-between text-xs text-gray-400">
            <Link to="/officer/register" className="text-emerald-400 hover:underline">
              Officer Registration
            </Link>
            <Link to="/login" className="text-gray-400 hover:text-white">
              Farmer / Citizen Login →
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OfficerLogin;

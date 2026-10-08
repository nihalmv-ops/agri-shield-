import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  Lock, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  TreePine,
  Trees
} from 'lucide-react';
import Button from '../../components/Button';

const OfficerLogin = () => {
  const [email, setEmail] = useState('officer.madhavan@kerala.gov.in');
  const [password, setPassword] = useState('forest2026');
  const [toast, setToast] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setToast(true);
    setTimeout(() => {
      navigate('/officer/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#F5F8F6] flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full mx-auto bg-white rounded-3xl shadow-soft-lg border border-emerald-950/10 overflow-hidden">
        
        {/* Split screen: Left Forest Visual + Right Login Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
          
          {/* Left Column: Large Kerala forest/wildlife image with Overlay */}
          <div className="lg:col-span-6 relative bg-[#071A14] text-white p-8 sm:p-12 flex flex-col justify-between overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-45 mix-blend-overlay scale-105 transition-transform duration-1000"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071A14] via-[#063B2A]/70 to-transparent"></div>

            <div className="relative z-10">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-[#063B2A] p-0.5 shadow-md">
                  <div className="w-full h-full bg-[#071A14] rounded-[10px] flex items-center justify-center">
                    <ShieldAlert className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-white">Agri<span className="text-emerald-400">Shield</span></span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Forest Officer Administration</span>
                </div>
              </Link>
            </div>

            <div className="relative z-10 space-y-4 my-auto py-12">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Trees className="w-3.5 h-3.5 text-emerald-400" />
                Kerala Forest Department
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                Protecting Wildlife.<br />
                <span className="text-emerald-400">Protecting Communities.</span>
              </h2>

              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-md">
                Centralized command portal for real-time edge AI camera alerts, sensor telemetry, and community crop damage investigations.
              </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-emerald-800/60 flex items-center justify-between text-xs text-emerald-300/80">
              <span>Station ID: WYND-R04</span>
              <span>Autonomous Vision Grid</span>
            </div>
          </div>

          {/* Right Column: Forest Officer Login */}
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center bg-white">
            <div className="max-w-md w-full mx-auto space-y-6">
              
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  Department Officer Gateway
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-[#063B2A] mt-2">
                  Forest Officer Login
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                  Access the administrative command console.
                </p>
              </div>

              {/* Security Banner (Prompt Section 5 Requirement) */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">
                  Authorized Forest Department Personnel Only
                </span>
              </div>

              {toast && (
                <div className="p-3 bg-emerald-900 text-white rounded-xl text-xs flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Credentials verified! Loading command center...</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Official Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="officer.name@kerala.gov.in"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900"
                    />
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-gray-700">
                      Password
                    </label>
                    <a href="#forgot" className="text-emerald-700 hover:underline font-semibold text-[11px]">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-900"
                    />
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full bg-[#10B981] hover:bg-[#0ea371] text-white rounded-full font-bold shadow-glow-emerald py-3 text-sm"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Login to Command Center
                </Button>
              </form>

              {/* Links */}
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
                <p>
                  New Officer?{' '}
                  <Link to="/officer/register" className="text-emerald-700 font-bold hover:underline">
                    Register
                  </Link>
                </p>

                <Link to="/" className="text-gray-500 hover:text-emerald-800 transition-colors">
                  ← Back to Public Website
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OfficerLogin;

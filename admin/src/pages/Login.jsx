import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  Lock, 
  Mail, 
  MapPin, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Trees, 
  Radio, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('officer@agrishield.com');
  const [password, setPassword] = useState('admin123');
  const [division, setDivision] = useState('Wayanad North Division');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      // Frontend demo validation
      if (email && password) {
        navigate('/admin/dashboard');
      } else {
        setError('Please enter your Officer credentials.');
        setLoading(false);
      }
    }, 600);
  };

  const handleFillDemo = () => {
    setEmail('officer@agrishield.com');
    setPassword('admin123');
    setDivision('Wayanad North Division');
  };

  return (
    <div className="min-h-screen bg-[#071A14] flex flex-col lg:flex-row text-white font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Left Column: Visual Command Showcase */}
      <div className="lg:w-1/2 relative flex flex-col justify-between p-8 lg:p-14 overflow-hidden border-b lg:border-b-0 lg:border-r border-emerald-950/80">
        
        {/* Background Image with Dark Vignette */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transform hover:scale-100 transition-all duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071A14] via-[#071A14]/75 to-[#063B2A]/80 z-0"></div>

        {/* Top Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#063B2A] p-0.5 shadow-xl">
            <div className="w-full h-full bg-[#071A14] rounded-[14px] flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-[#34D399]" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
              🌿 Agri<span className="text-[#10B981]">Shield</span>
              <span className="text-xs bg-emerald-900/80 text-lightEmerald px-2 py-0.5 rounded-full border border-emerald-700/50">COMMAND</span>
            </h1>
            <p className="text-xs text-gray-400 font-medium">
              Centralized Forest & Wildlife Monitoring Portal
            </p>
          </div>
        </div>

        {/* Center Pitch */}
        <div className="relative z-10 my-12 lg:my-0 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/50 border border-emerald-600/40 text-xs font-bold text-emerald-300">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span>Real-Time Edge Sensor Network</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight">
            Protecting Farmers. Conserving Wildlife. Powered by AI.
          </h2>

          <p className="text-sm text-gray-300 leading-relaxed">
            Welcome to the official administrator interface for Forest Range Officers and Quick Response Teams. Monitor camera trap telemetry, coordinate village alarms, verify compensation claims, and safeguard crop frontiers.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-emerald-900/40 text-xs">
            <div className="flex items-center gap-2.5 text-gray-300">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
              <span>Camera Trap AI Feed</span>
            </div>
            <div className="flex items-center gap-2.5 text-gray-300">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
              <span>Farmer Grievance System</span>
            </div>
            <div className="flex items-center gap-2.5 text-gray-300">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
              <span>SMS Siren Broadcasts</span>
            </div>
            <div className="flex items-center gap-2.5 text-gray-300">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
              <span>Marketplace Oversight</span>
            </div>
          </div>
        </div>

        {/* Bottom Agency Tag */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-gray-400 pt-6 border-t border-emerald-900/40">
          <span>Kerala Forest Department</span>
          <span>Security Protocol Tier 1</span>
        </div>

      </div>

      {/* Right Column: Officer Login Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-[#0B241C]/50">
        <div className="w-full max-w-md space-y-6">
          
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-emerald-400 font-extrabold">
                Official Access Only
              </span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[11px] font-bold text-emerald-300 bg-emerald-950/80 hover:bg-emerald-900 px-3 py-1 rounded-full border border-emerald-700/50 transition-colors"
              >
                Auto-fill Demo
              </button>
            </div>
            <h3 className="text-2xl font-black text-white mt-2">
              Forest Officer Sign In
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Enter your credentials to access the administrative control console
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-2xl bg-rose-950/60 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Officer ID / Email */}
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">
                Officer Email / Service ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. officer@agrishield.com or FO-1024"
                  className="w-full bg-[#071A14] text-xs text-white pl-10 pr-4 py-3 rounded-2xl border border-emerald-900/60 focus:border-[#10B981] focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">
                Authorization Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#071A14] text-xs text-white pl-10 pr-10 py-3 rounded-2xl border border-emerald-900/60 focus:border-[#10B981] focus:outline-none transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Division Selection */}
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">
                Assigned Forest Range / Division
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  className="w-full bg-[#071A14] text-xs text-white pl-10 pr-4 py-3 rounded-2xl border border-emerald-900/60 focus:border-[#10B981] focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="Wayanad North Division">Wayanad North Division</option>
                  <option value="Wayanad South Division">Wayanad South Division</option>
                  <option value="Idukki Wildlife Sanctuary Division">Idukki Wildlife Sanctuary Division</option>
                  <option value="Palakkad Gap Range">Palakkad Gap Range</option>
                  <option value="Silent Valley National Park Division">Silent Valley National Park Division</option>
                  <option value="Periyar Tiger Reserve Range">Periyar Tiger Reserve Range</option>
                </select>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-emerald-900 text-[#10B981] focus:ring-0 w-4 h-4 bg-[#071A14]"
                />
                <span>Remember this terminal</span>
              </label>
              <span className="text-emerald-400 hover:underline cursor-pointer">
                Help / SOS
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#10B981] to-[#063B2A] hover:opacity-95 text-white font-extrabold text-xs rounded-2xl shadow-xl shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating Terminal...</span>
              ) : (
                <>
                  <span>Sign In as Forest Officer</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Quick Demo Credentials card */}
          <div className="p-3.5 rounded-2xl bg-[#063B2A]/40 border border-emerald-800/40 text-xs">
            <p className="font-bold text-emerald-300">Demo Testing Credentials:</p>
            <div className="mt-1 flex items-center justify-between text-[11px] text-gray-300 font-mono">
              <span>officer@agrishield.com</span>
              <span className="text-emerald-400 font-bold">admin123</span>
            </div>
          </div>

          {/* Security Notice */}
          <p className="text-[11px] text-gray-500 text-center leading-relaxed">
            Restricted system. Unauthorized access attempts are monitored and reported under the Wildlife Protection Act and IT Security Directives.
          </p>

        </div>
      </div>

    </div>
  );
};

export default Login;

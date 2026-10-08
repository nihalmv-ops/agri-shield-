import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Leaf, 
  Mail, 
  Lock, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  ShieldAlert,
  CheckCircle2
} from 'lucide-react';
import Button from '../components/Button';

const Login = () => {
  const [identifier, setIdentifier] = useState('farmer.kerala@agrishield.org');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loggedInToast, setLoggedInToast] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoggedInToast(true);
    setTimeout(() => {
      navigate('/profile');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F5F8F6] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full mx-auto bg-white rounded-3xl shadow-soft-lg border border-emerald-950/10 overflow-hidden">
        
        {/* Split screen: Left Image (desktop) + Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          
          {/* Left Column: Nature/Wildlife Visual */}
          <div className="lg:col-span-5 relative bg-[#063B2A] text-white p-8 sm:p-10 flex flex-col justify-between overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay scale-105"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071A14] via-[#063B2A]/80 to-transparent"></div>

            <div className="relative z-10">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="text-xl font-black text-white">Agri<span className="text-emerald-400">Shield</span></span>
              </Link>
            </div>

            <div className="relative z-10 space-y-3 my-auto py-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Leaf className="w-3 h-3 text-emerald-400" />
                Farmer &amp; Citizen Portal
              </div>
              <h2 className="text-2xl font-black text-white leading-tight">
                Protecting Crops, Livelihoods &amp; Biodiversity.
              </h2>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Connect directly with agricultural buyers, receive early wildlife perimeter warnings, and report forest issues.
              </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-emerald-800/60 text-xs text-emerald-200/70 flex items-center justify-between">
              <span>BCA Capstone Prototype</span>
              <span>Kerala Agri-Tech</span>
            </div>
          </div>

          {/* Right Column: Login Form */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto space-y-6">
              
              <div>
                <h1 className="text-2xl font-extrabold text-[#063B2A]">
                  Welcome Back to AgriShield
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                  Enter your credentials to access your farmer account or citizen dashboard.
                </p>
              </div>

              {loggedInToast && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Login verified! Redirecting to user profile...</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Email Address or Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      required
                      placeholder="e.g. 9847123456 or farmer@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
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
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <label htmlFor="remember" className="ml-2 text-gray-600 select-none">
                    Remember my credentials for 30 days
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full bg-[#10B981] hover:bg-[#0ea371] text-white rounded-full font-bold shadow-glow-emerald py-3 text-sm"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Login to Account
                </Button>
              </form>

              {/* Links */}
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
                <p>
                  Don't have an account?{' '}
                  <Link to="/register" className="text-emerald-700 font-bold hover:underline">
                    Create Account
                  </Link>
                </p>

                <Link
                  to="/officer/login"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#063B2A] bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-full transition-colors"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Forest Officer Login</span>
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;

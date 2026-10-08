import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Shield, 
  Leaf, 
  User, 
  Phone, 
  Mail, 
  Lock, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  Check
} from 'lucide-react';
import Button from '../components/Button';

const Register = () => {
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get('role') === 'farmer' ? 'Farmer' : 'User';

  const [role, setRole] = useState(defaultRole);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('Wayanad, Kerala');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [createdSuccess, setCreatedSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setCreatedSuccess(true);
    setTimeout(() => {
      navigate('/profile');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F5F8F6] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full mx-auto bg-white rounded-3xl shadow-soft-lg border border-emerald-950/10 overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
          
          {/* Left Hero Graphic Banner */}
          <div className="lg:col-span-5 relative bg-[#063B2A] text-white p-8 sm:p-10 flex flex-col justify-between overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay scale-105"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1000&q=80')`
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

            <div className="relative z-10 space-y-4 my-auto py-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Join The AgriShield Movement
              </div>
              
              <h2 className="text-2xl font-black text-white leading-tight">
                Empowering Rural Farms &amp; Safe Communities.
              </h2>
              
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                {role === 'Farmer'
                  ? 'List your harvest with zero brokerage, gain access to agricultural insurance alerts, and get AI perimeter animal notifications.'
                  : 'Buy freshly harvested pesticide-free crops directly from Kerala farmers and assist in community forest wildlife preservation.'}
              </p>
            </div>

            <div className="relative z-10 pt-4 border-t border-emerald-800/60 text-xs text-emerald-200/70">
              <span>Trusted by 500+ Registered Farmers</span>
            </div>
          </div>

          {/* Right Register Form */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto space-y-5">
              
              <div>
                <h1 className="text-2xl font-extrabold text-[#063B2A]">
                  Create AgriShield Account
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">
                  Choose your account type and start in under a minute.
                </p>
              </div>

              {/* Account Role Selector (Farmer vs Normal User) */}
              <div className="grid grid-cols-2 gap-3 p-1 bg-gray-100 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setRole('Farmer')}
                  className={`py-2 text-xs font-bold rounded-xl transition-all ${
                    role === 'Farmer'
                      ? 'bg-[#063B2A] text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  🌾 I am a Farmer
                </button>
                <button
                  type="button"
                  onClick={() => setRole('User')}
                  className={`py-2 text-xs font-bold rounded-xl transition-all ${
                    role === 'User'
                      ? 'bg-[#063B2A] text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  🍃 Normal User / Buyer
                </button>
              </div>

              {createdSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs flex items-center gap-2 animate-fadeIn">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Account generated successfully! Redirecting...</span>
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Kumar"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="+91 98471 23456"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Location / District *</label>
                    <input
                      type="text"
                      placeholder="e.g. Wayanad, Kerala"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    placeholder="ramesh@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Password *</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Confirm Password *</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="flex items-center pt-1">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    required
                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <label htmlFor="terms" className="ml-2 text-gray-600 select-none">
                    I agree to the AgriShield Terms of Service &amp; Community Privacy Code
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full bg-[#10B981] hover:bg-[#0ea371] text-white rounded-full font-bold shadow-glow-emerald py-3 text-sm mt-2"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Create {role} Account
                </Button>
              </form>

              <div className="pt-3 border-t border-gray-100 text-center text-xs text-gray-600">
                Already registered with AgriShield?{' '}
                <Link to="/login" className="text-emerald-700 font-bold hover:underline">
                  Login Here
                </Link>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Register;


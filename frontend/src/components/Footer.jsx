import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Leaf, Phone, Mail, MapPin, Heart, ShieldCheck, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#071A14] text-gray-300 border-t border-emerald-950 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-[#063B2A] p-0.5 shadow-md">
                <div className="w-full h-full bg-[#071A14] rounded-[10px] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white">
                  Agri<span className="text-emerald-400">Shield</span>
                </span>
                <span className="text-[10px] tracking-wider text-emerald-400/80 uppercase">
                  Farmers • Forests • Future
                </span>
              </div>
            </Link>
            
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Protecting Farmers, Wildlife & Nature. A next-generation unified technology bridge connecting agrarian communities, conscious consumers, and forest rangers.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Kerala Forest & Agriculture Technology Initiative</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>24/7 Wildlife Helpline: 1800-425-4733 (Toll Free)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>support@agrishield.kerala.gov.in</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-emerald-400">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-emerald-300 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-emerald-300 transition-colors">Marketplace</Link>
              </li>
              <li>
                <Link to="/wildlife-alerts" className="hover:text-emerald-300 transition-colors">Wildlife Alerts</Link>
              </li>
              <li>
                <Link to="/wildlife-camera" className="hover:text-emerald-300 transition-colors">AI Wildlife Camera</Link>
              </li>
              <li>
                <Link to="/complaints" className="hover:text-emerald-300 transition-colors">Complaints</Link>
              </li>
            </ul>
          </div>

          {/* For Farmers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-emerald-400">
              For Farmers
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/register?role=farmer" className="hover:text-emerald-300 transition-colors">Sell Products</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-emerald-300 transition-colors">My Products</Link>
              </li>
              <li>
                <Link to="/complaints" className="hover:text-emerald-300 transition-colors">Report Crop Damage</Link>
              </li>
              <li>
                <Link to="/wildlife-alerts" className="hover:text-emerald-300 transition-colors">Boundary Alert Map</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-emerald-300 transition-colors">Farmer Subsidies & Aid</Link>
              </li>
            </ul>
          </div>

          {/* Officer & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider text-emerald-400">
              Forest Protection
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/officer/login" className="text-emerald-300 hover:text-white flex items-center gap-1 font-medium">
                  <span>Officer Portal Login</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link to="/officer/register" className="hover:text-emerald-300 transition-colors">Officer Enlistment</Link>
              </li>
              <li>
                <Link to="/officer/dashboard" className="hover:text-emerald-300 transition-colors">Command Dashboard</Link>
              </li>
              <li>
                <a href="#support" className="hover:text-emerald-300 transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-emerald-300 transition-colors">Emergency Protocol</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-emerald-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 AgriShield. All rights reserved. BCA College Final Year Project.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Wildlife Safety System</span>
            </span>
            <Link to="/officer/login" className="hover:text-gray-300">Forest Dept Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


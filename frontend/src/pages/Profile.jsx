import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Package, 
  ShoppingBag, 
  AlertTriangle, 
  Radio, 
  Settings, 
  LogOut, 
  Edit3, 
  Plus, 
  Clock, 
  CheckCircle2, 
  Bell, 
  Camera, 
  Save,
  Check
} from 'lucide-react';
import Button from '../components/Button';
import { sampleProducts, sampleComplaints, sampleWildlifeAlerts } from '../data/mockData';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [isEditing, setIsEditing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: 'Ramesh Kumar',
    email: 'ramesh.kumar@agrishield.org',
    phone: '+91 98471 23456',
    location: 'Kozhikode, Kerala',
    accountType: 'Verified Organic Farmer',
    memberSince: 'March 2024',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F5F8F6] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* User Profile Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-950/10 shadow-soft mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            
            <div className="flex items-center gap-5">
              <div className="relative">
                <img
                  src={userInfo.avatar}
                  alt={userInfo.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-emerald-500 shadow-md"
                />
                <button className="absolute -bottom-1 -right-1 p-1.5 bg-[#063B2A] text-white rounded-lg shadow-sm hover:bg-emerald-600 transition-colors">
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-gray-900">
                    {userInfo.name}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    {userInfo.accountType}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-emerald-600" />
                    {userInfo.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    {userInfo.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    {userInfo.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant={isEditing ? "primary" : "outlineDark"}
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="rounded-full text-xs"
                icon={isEditing ? Save : Edit3}
              >
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-rose-600 hover:bg-rose-50 rounded-full text-xs"
                icon={LogOut}
              >
                Logout
              </Button>
            </div>

          </div>

          {savedSuccess && (
            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs flex items-center gap-2 animate-fadeIn">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Profile updated successfully!</span>
            </div>
          )}

          {/* Edit Form Drawer */}
          {isEditing && (
            <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs animate-fadeIn">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Display Name</label>
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Contact Phone</label>
                <input
                  type="tel"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">District / Town</label>
                <input
                  type="text"
                  value={userInfo.location}
                  onChange={(e) => setUserInfo({ ...userInfo, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white"
                />
              </div>
            </form>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 text-xs sm:text-sm font-bold border-b border-gray-200">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-[#063B2A] text-white shadow-sm'
                : 'text-gray-600 hover:bg-emerald-50'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>My Products (3)</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-[#063B2A] text-white shadow-sm'
                : 'text-gray-600 hover:bg-emerald-50'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders (2)</span>
          </button>

          <button
            onClick={() => setActiveTab('complaints')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'complaints'
                ? 'bg-[#063B2A] text-white shadow-sm'
                : 'text-gray-600 hover:bg-emerald-50'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>My Complaints (2)</span>
          </button>

          <button
            onClick={() => setActiveTab('wildlife')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'wildlife'
                ? 'bg-[#063B2A] text-white shadow-sm'
                : 'text-gray-600 hover:bg-emerald-50'
            }`}
          >
            <Radio className="w-4 h-4" />
            <span>Wildlife Reports (1)</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-[#063B2A] text-white shadow-sm'
                : 'text-gray-600 hover:bg-emerald-50'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>

        {/* Tab 1: My Products */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-[#063B2A]">
                  Listed Farm Harvests
                </h3>
                <p className="text-xs text-gray-500">Manage stock and price per unit</p>
              </div>

              <Link
                to="/marketplace"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#10B981] hover:bg-[#0ea371] text-white text-xs font-bold rounded-full transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>List New Harvest</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleProducts.slice(0, 3).map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-4 border border-emerald-950/10 shadow-soft flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm truncate">{item.name}</h4>
                    <p className="text-xs text-emerald-800 font-extrabold mt-0.5">₹{item.price} / {item.unit}</p>
                    <p className="text-[11px] text-gray-500 mt-1">Available: {item.quantityAvailable} {item.unit}</p>
                    <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Live on Marketplace
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: My Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-emerald-950/10 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Order #ORD-2026-1049</h4>
                  <p className="text-xs text-gray-500">Pure Wild Forest Honey (500g x 2) • ₹500</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Placed on 04 Oct 2026</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 self-start sm:self-center">
                Dispatched by Farmer
              </span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-emerald-950/10 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Order #ORD-2026-0988</h4>
                  <p className="text-xs text-gray-500">Wayanad Black Pepper (1kg) • ₹400</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Placed on 28 Sep 2026</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 self-start sm:self-center">
                Delivered
              </span>
            </div>
          </div>
        )}

        {/* Tab 3: My Complaints */}
        {activeTab === 'complaints' && (
          <div className="space-y-4">
            {sampleComplaints.slice(0, 2).map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-5 border border-emerald-950/10 shadow-soft space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-800">{item.id}</span>
                  <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                    {item.status}
                  </span>
                </div>
                <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.description}</p>
                <div className="pt-2 flex items-center justify-between text-[11px] text-gray-400">
                  <span>Reported on: {item.date}</span>
                  <span className="text-emerald-700 font-semibold">{item.officerNotes}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Wildlife Reports */}
        {activeTab === 'wildlife' && (
          <div className="bg-white rounded-2xl p-5 border border-emerald-950/10 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-gray-900 text-sm">Elephant Sighting near Wayanad East Fence</h4>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                Verified by Ranger
              </span>
            </div>
            <p className="text-xs text-gray-600">
              Submitted at 10:24 PM on 07 Oct 2026. Ranger squad dispatched acoustic deterrent.
            </p>
          </div>
        )}

        {/* Tab 5: Settings */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl p-6 border border-emerald-950/10 shadow-soft space-y-5 max-w-xl text-xs">
            <h3 className="font-extrabold text-[#063B2A] text-sm">Emergency Alert Preferences</h3>
            
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer">
                <div>
                  <p className="font-bold text-gray-900">SMS Flash Alerts for Elephant Incursions</p>
                  <p className="text-gray-500 text-[11px]">Receive immediate text when camera within 3km detects elephants</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded" />
              </label>

              <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer">
                <div>
                  <p className="font-bold text-gray-900">Crop Inquiry WhatsApp Notifications</p>
                  <p className="text-gray-500 text-[11px]">When a buyer contacts you for agricultural products</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded" />
              </label>

              <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer">
                <div>
                  <p className="font-bold text-gray-900">Complaint Status Realtime Updates</p>
                  <p className="text-gray-500 text-[11px]">Notifies you as forest officer reviews and processes compensation</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded" />
              </label>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;


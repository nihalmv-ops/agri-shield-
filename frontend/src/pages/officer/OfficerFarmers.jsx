import React, { useState, useMemo } from 'react';
import { 
  Trees, 
  Search, 
  MapPin, 
  Calendar, 
  Eye, 
  X, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Radio, 
  AlertTriangle, 
  Send 
} from 'lucide-react';
import StatusBadge from '../../components/officer/StatusBadge';
import Button from '../../components/Button';
import { registeredFarmers } from '../../data/farmers';

const OfficerFarmers = () => {
  const [farmers, setFarmers] = useState(registeredFarmers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFarmerProfile, setSelectedFarmerProfile] = useState(null);
  const [selectedFarmerAlert, setSelectedFarmerAlert] = useState(null);
  const [alertSuccess, setAlertSuccess] = useState(false);

  const filteredFarmers = useMemo(() => {
    return farmers.filter((f) => {
      return !searchQuery ||
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.farmName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.mainCrops.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [farmers, searchQuery]);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 mb-1">
            <Trees className="w-3.5 h-3.5 text-emerald-600" />
            <span>Agricultural Collective</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#063B2A]">
            Registered Farmers
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Verified agricultural cultivators cultivating border lands adjacent to wildlife reserves.
          </p>
        </div>

        <div className="text-xs text-gray-500 bg-white px-4 py-2 rounded-2xl border border-gray-200 self-start sm:self-auto font-medium">
          Total Farmers: <strong className="text-gray-900">{farmers.length} Growers</strong>
        </div>
      </div>

      {/* Search Input (Prompt Section 15 Requirement) */}
      <div className="bg-white rounded-3xl p-5 border border-emerald-950/10 shadow-soft">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search farmers by name, farm, or crop..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Farmers Table / Responsive Cards (Prompt Section 15 Requirement) */}
      <div className="bg-white rounded-3xl border border-emerald-950/10 shadow-soft overflow-hidden">
        
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/80 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-extrabold text-[11px]">
              <tr>
                <th className="py-4 px-6">Farmer Name</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Land Acreage</th>
                <th className="py-4 px-6">Joined Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filteredFarmers.map((farmer) => (
                <tr key={farmer.id} className="hover:bg-emerald-50/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={farmer.avatar}
                        alt={farmer.name}
                        className="w-9 h-9 rounded-full object-cover border border-emerald-500"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-extrabold text-gray-900">{farmer.name}</p>
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        <p className="text-[11px] text-gray-400">{farmer.farmName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      {farmer.location}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <Trees className="w-3 h-3" />
                      {farmer.acres}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{farmer.joinedDate}</td>
                  <td className="py-4 px-6">
                    <StatusBadge status={farmer.status} size="xs" />
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedFarmerProfile(farmer)}
                        className="px-3 py-1.5 rounded-full text-xs font-bold bg-gray-100 hover:bg-emerald-100 text-gray-800 hover:text-emerald-900 transition-colors"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => { setSelectedFarmerAlert(farmer); setAlertSuccess(false); }}
                        className="px-3 py-1.5 rounded-full text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors flex items-center gap-1"
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Send Alert</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden divide-y divide-gray-100">
          {filteredFarmers.map((farmer) => (
            <div key={farmer.id} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={farmer.avatar}
                    alt={farmer.name}
                    className="w-10 h-10 rounded-full object-cover border border-emerald-500"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{farmer.name}</h4>
                    <p className="text-[11px] text-gray-500">{farmer.farmName}</p>
                  </div>
                </div>
                <StatusBadge status={farmer.status} size="xs" />
              </div>

              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>{farmer.location}</span>
                <strong className="text-emerald-800">{farmer.acres} Monitored</strong>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => setSelectedFarmerProfile(farmer)}
                  className="py-2 bg-gray-100 text-gray-800 font-bold text-xs rounded-xl"
                >
                  View Profile
                </button>
                <button
                  onClick={() => { setSelectedFarmerAlert(farmer); setAlertSuccess(false); }}
                  className="py-2 bg-rose-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Send Alert</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* View Profile Modal */}
      {selectedFarmerProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-emerald-900/10 space-y-5">
            <div className="flex items-start justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <img
                  src={selectedFarmerProfile.avatar}
                  alt={selectedFarmerProfile.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
                />
                <div>
                  <h3 className="text-base font-black text-gray-900">{selectedFarmerProfile.name}</h3>
                  <p className="text-xs text-emerald-700 font-semibold">{selectedFarmerProfile.farmName}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFarmerProfile(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Cultivation Area:</span>
                <strong className="text-gray-900">{selectedFarmerProfile.acres}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Contact Phone:</span>
                <strong className="text-gray-900 font-mono">{selectedFarmerProfile.phone}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Official Email:</span>
                <strong className="text-gray-900">{selectedFarmerProfile.email}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Location District:</span>
                <strong className="text-gray-900">{selectedFarmerProfile.location}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Primary Harvest Crops:</span>
                <strong className="text-emerald-800">{selectedFarmerProfile.mainCrops}</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Enrolled Since:</span>
                <strong className="text-gray-900">{selectedFarmerProfile.joinedDate}</strong>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setSelectedFarmerProfile(null)}
                className="bg-[#063B2A] text-white"
              >
                Close Profile
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Siren SMS Dispatch Modal */}
      {selectedFarmerAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-rose-200 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-rose-950">
                    Emergency Threat Warning
                  </h3>
                  <p className="text-xs text-gray-500">Target: {selectedFarmerAlert.name}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFarmerAlert(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {alertSuccess ? (
              <div className="py-6 text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-black text-emerald-950 text-sm">
                  Priority Siren SMS Dispatched!
                </h4>
                <p className="text-xs text-gray-500">
                  Alert sent to {selectedFarmerAlert.phone} ({selectedFarmerAlert.location}).
                </p>
                <button
                  onClick={() => setSelectedFarmerAlert(null)}
                  className="mt-3 px-4 py-2 bg-[#063B2A] text-white text-xs font-bold rounded-xl"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 space-y-1">
                  <p className="font-bold">Boundary Perimeter Alert Directive:</p>
                  <p>
                    Transmits instant loud siren audio notification and SMS advisory to {selectedFarmerAlert.name}'s verified mobile number.
                  </p>
                </div>

                <div className="space-y-2 bg-[#F5F8F6] p-3 rounded-2xl">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Target Mobile:</span>
                    <strong className="font-mono text-gray-900">{selectedFarmerAlert.phone}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Monitored Holding:</span>
                    <strong className="text-gray-900">{selectedFarmerAlert.acres} ({selectedFarmerAlert.location})</strong>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setSelectedFarmerAlert(null)}
                    className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setAlertSuccess(true)}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black rounded-xl shadow-md flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Authorize Warning</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default OfficerFarmers;

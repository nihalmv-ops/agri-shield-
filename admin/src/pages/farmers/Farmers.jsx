import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trees, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Eye, 
  Phone, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  X, 
  ArrowUpRight,
  ShieldCheck,
  Send,
  Zap,
  Download
} from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import { initialFarmers } from '../../data/farmers';

const Farmers = () => {
  const [farmers, setFarmers] = useState(initialFarmers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [viewMode, setViewMode] = useState('table');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleToggleStatus = (id) => {
    setFarmers(prev => prev.map(f => {
      if (f.id === id) {
        const nextStatus = f.status === 'Active' ? 'Suspended' : 'Active';
        showToast(`Farmer ${f.name} marked as ${nextStatus}`);
        return { ...f, status: nextStatus };
      }
      return f;
    }));
  };

  const handleSendDirectSMS = (farmer) => {
    showToast(`Perimeter proximity SMS siren dispatched to ${farmer.name} (${farmer.phone})`);
  };

  const filteredFarmers = useMemo(() => {
    return farmers.filter((farmer) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        farmer.name.toLowerCase().includes(query) ||
        farmer.email.toLowerCase().includes(query) ||
        farmer.phone.includes(query) ||
        farmer.farmName.toLowerCase().includes(query) ||
        farmer.location.toLowerCase().includes(query);

      const matchesStatus = selectedStatus === 'All' || farmer.status === selectedStatus;
      const matchesLocation = selectedLocation === 'All' || farmer.location.includes(selectedLocation);

      return matchesSearch && matchesStatus && matchesLocation;
    });
  }, [farmers, searchQuery, selectedStatus, selectedLocation]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('All');
    setSelectedLocation('All');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#071A14] text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              <Trees className="w-3.5 h-3.5 text-emerald-600" />
              <span>Boundary Settlement Registry</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#063B2A] mt-1">
            Enrolled Farmers Directory
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            248 registered agricultural producers with connected solar electric fencing and automated SMS siren reach.
          </p>
        </div>

        {/* View Toggle */}
        <div className="bg-white p-1 rounded-2xl border border-gray-200 flex items-center shadow-xs self-start md:self-auto text-xs font-bold">
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              viewMode === 'table' ? 'bg-[#063B2A] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>Table View</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              viewMode === 'grid' ? 'bg-[#063B2A] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Card Grid</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-white p-4 rounded-2xl border border-emerald-950/10 shadow-soft">
          <span className="text-gray-400 block text-[10px] font-bold uppercase">Total Protected</span>
          <strong className="text-xl font-black text-[#063B2A]">{farmers.length} Cultivators</strong>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-emerald-950/10 shadow-soft">
          <span className="text-gray-400 block text-[10px] font-bold uppercase">Solar Energized Fences</span>
          <strong className="text-xl font-black text-emerald-700">96% Active</strong>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-emerald-950/10 shadow-soft">
          <span className="text-gray-400 block text-[10px] font-bold uppercase">High-Risk Buffer Farms</span>
          <strong className="text-xl font-black text-amber-600">62 Properties</strong>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-emerald-950/10 shadow-soft">
          <span className="text-gray-400 block text-[10px] font-bold uppercase">Emergency SMS Reach</span>
          <strong className="text-xl font-black text-blue-700">1,420 Numbers</strong>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-3xl p-5 border border-emerald-950/10 shadow-soft space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search farmer name, farm title, phone number, or region..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F5F8F6] text-xs font-semibold text-[#071A14] pl-10 pr-10 py-2.5 rounded-2xl border border-transparent focus:border-emerald-300 focus:bg-white focus:outline-none transition-all placeholder:text-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-[#F5F8F6] py-2.5 px-3 rounded-2xl border border-transparent text-gray-800 text-xs font-bold focus:outline-none focus:border-emerald-300 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>

          <div>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-[#F5F8F6] py-2.5 px-3 rounded-2xl border border-transparent text-gray-800 text-xs font-bold focus:outline-none focus:border-emerald-300 cursor-pointer"
            >
              <option value="All">All Locations</option>
              <option value="Wayanad">Wayanad</option>
              <option value="Idukki">Idukki</option>
              <option value="Ernakulam">Ernakulam</option>
              <option value="Palakkad">Palakkad</option>
              <option value="Thrissur">Thrissur</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-100 text-gray-500">
          <span>
            Displaying <strong className="text-[#063B2A]">{filteredFarmers.length}</strong> of {farmers.length} farmers
          </span>
          {(searchQuery || selectedStatus !== 'All' || selectedLocation !== 'All') && (
            <button onClick={resetFilters} className="text-[#10B981] font-bold hover:underline">
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Grid or Table of Farmers */}
      {filteredFarmers.length === 0 ? (
        <EmptyState
          title="No Farmers Found"
          message="No agricultural records matched your search query."
          actionText="Clear Filters"
          onAction={resetFilters}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFarmers.map((farmer) => (
            <div
              key={farmer.id}
              className="bg-white rounded-3xl p-6 border border-emerald-950/10 shadow-soft hover:shadow-soft-lg transition-all duration-300 space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={farmer.avatar}
                      alt={farmer.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-emerald-900/10"
                    />
                    <div>
                      <h3 className="font-extrabold text-[#071A14] text-base group-hover:text-[#063B2A] transition-colors">
                        {farmer.name}
                      </h3>
                      <p className="text-[11px] text-gray-500 font-medium">
                        {farmer.farmName}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={farmer.status} size="xs" />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-[#F5F8F6] p-3 rounded-2xl">
                  <div>
                    <span className="text-[10px] text-gray-400 block font-bold">Landholding</span>
                    <span className="font-bold text-gray-900">{farmer.acres}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block font-bold">Complaints</span>
                    <span className="font-bold text-[#063B2A]">{farmer.complaintsCount} Grievances</span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-gray-200/60 flex items-center justify-between text-[11px]">
                    <span className="text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-600" /> {farmer.location}
                    </span>
                    <span className="font-mono text-gray-500">{farmer.phone}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center gap-2 border-t border-gray-100">
                <button
                  onClick={() => handleSendDirectSMS(farmer)}
                  className="p-2 text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors border border-emerald-200"
                  title="Send emergency SMS"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
                <Link
                  to={`/admin/farmers/${farmer.id}`}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#063B2A] hover:bg-emerald-950 text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Dossier</span>
                </Link>

                <button
                  onClick={() => handleToggleStatus(farmer.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-colors ${
                    farmer.status === 'Active'
                      ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                      : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                  }`}
                >
                  {farmer.status === 'Active' ? 'Suspend' : 'Activate'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Standard Table View */
        <div className="bg-white rounded-3xl border border-emerald-950/10 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#F5F8F6] text-gray-500 uppercase tracking-wider font-extrabold text-[10px] border-b border-gray-100">
                  <th className="py-3.5 px-4">Farmer</th>
                  <th className="py-3.5 px-4">Farm Holding</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Phone</th>
                  <th className="py-3.5 px-4">Acreage</th>
                  <th className="py-3.5 px-4">Perimeter Sector</th>
                  <th className="py-3.5 px-4">Fence Status</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredFarmers.map((f) => (
                  <tr key={f.id} className="hover:bg-emerald-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-gray-900">
                      <div className="flex items-center gap-3">
                        <img
                          src={f.avatar}
                          alt={f.name}
                          className="w-9 h-9 rounded-xl object-cover border border-emerald-950/10"
                        />
                        <div>
                          <span>{f.name}</span>
                          <span className="text-[10px] text-gray-400 block font-normal">{f.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-gray-800">
                      {f.farmName}
                    </td>

                    <td className="py-3.5 px-4 text-gray-600">
                      {f.location}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-gray-600">
                      {f.phone}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-emerald-800">
                      {f.acres}
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-gray-800">
                      {f.sectorZone || f.location}
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-emerald-800 text-[11px]">
                      {f.fenceStatus || 'Solar Energized'}
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusBadge status={f.status} size="xs" />
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleSendDirectSMS(f)}
                          className="px-2.5 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-xl text-xs font-bold"
                          title="Direct SMS siren"
                        >
                          Alert SMS
                        </button>
                        <Link
                          to={`/admin/farmers/${f.id}`}
                          className="px-3 py-1.5 bg-[#063B2A] text-white hover:bg-emerald-950 rounded-xl text-xs font-bold"
                        >
                          Dossier
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default Farmers;

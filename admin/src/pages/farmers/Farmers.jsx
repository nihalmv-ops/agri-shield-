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
  ArrowUpRight 
} from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import { initialFarmers } from '../../data/farmers';

const Farmers = () => {
  const [farmers, setFarmers] = useState(initialFarmers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [toastMessage, setToastMessage] = useState('');

  const handleToggleStatus = (id) => {
    setFarmers(prev => prev.map(f => {
      if (f.id === id) {
        const nextStatus = f.status === 'Active' ? 'Suspended' : 'Active';
        setToastMessage(`Farmer ${f.name} marked as ${nextStatus}`);
        return { ...f, status: nextStatus };
      }
      return f;
    }));
    setTimeout(() => setToastMessage(''), 3000);
  };

  const filteredFarmers = useMemo(() => {
    return farmers.filter((farmer) => {
      const matchesSearch = 
        farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        farmer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        farmer.phone.includes(searchQuery) ||
        farmer.farmName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        farmer.location.toLowerCase().includes(searchQuery.toLowerCase());

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
    <div className="space-y-6 animate-fadeIn">
      
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#071A14] text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-emerald-100 flex items-center justify-center text-[#10B981]">
              <Trees className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-[#063B2A] tracking-tight">
              Enrolled Farmers Directory
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            248 registered agricultural producers protected by AgriShield Early Warning Network
          </p>
        </div>

        {/* View Toggle */}
        <div className="bg-white p-1 rounded-2xl border border-gray-200 flex items-center shadow-xs self-start sm:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-xl transition-colors ${
              viewMode === 'grid' ? 'bg-[#063B2A] text-white' : 'text-gray-500 hover:text-gray-800'
            }`}
            title="Grid View"
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-xl transition-colors ${
              viewMode === 'table' ? 'bg-[#063B2A] text-white' : 'text-gray-500 hover:text-gray-800'
            }`}
            title="Table View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-emerald-950/10 shadow-soft space-y-4">
        
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search farmer name, farm title, phone number, or region..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F5F8F6] text-xs text-[#071A14] pl-10 pr-10 py-3 rounded-2xl border border-transparent focus:border-emerald-300 focus:bg-white focus:outline-none transition-all"
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

        <div className="grid grid-cols-2 gap-3 text-xs sm:w-80">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              Account Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-[#F5F8F6] py-2 px-3 rounded-xl border border-gray-200 text-gray-800 font-semibold focus:outline-none focus:border-emerald-300"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              Forest Division
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-[#F5F8F6] py-2 px-3 rounded-xl border border-gray-200 text-gray-800 font-semibold focus:outline-none focus:border-emerald-300"
            >
              <option value="All">All Locations</option>
              <option value="Wayanad">Wayanad</option>
              <option value="Idukki">Idukki</option>
              <option value="Ernakulam">Ernakulam</option>
              <option value="Palakkad">Palakkad</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100 text-gray-500">
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
                <Link
                  to={`/admin/farmers/${farmer.id}`}
                  className="flex-1 py-2 px-3 rounded-xl bg-gray-100 hover:bg-emerald-50 text-gray-800 hover:text-emerald-800 text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
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
        /* Table View */
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

                    <td className="py-3.5 px-4">
                      <StatusBadge status={f.status} size="xs" />
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/admin/farmers/${f.id}`}
                          className="p-1.5 text-gray-400 hover:text-[#063B2A] rounded-xl hover:bg-gray-100"
                        >
                          <Eye className="w-4 h-4" />
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


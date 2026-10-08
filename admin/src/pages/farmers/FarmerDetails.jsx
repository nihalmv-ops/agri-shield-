import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar, 
  Trees, 
  ShoppingBag, 
  MessageSquareWarning, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Send 
} from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import { initialFarmers } from '../../data/farmers';

const FarmerDetails = () => {
  const { id } = useParams();
  const farmer = initialFarmers.find(f => f.id === id) || initialFarmers[0];

  const [status, setStatus] = useState(farmer.status);
  const [toastMessage, setToastMessage] = useState('');

  const handleToggleStatus = () => {
    const nextStatus = status === 'Active' ? 'Suspended' : 'Active';
    setStatus(nextStatus);
    setToastMessage(`Account status changed to ${nextStatus}`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSendDirectAlert = () => {
    setToastMessage(`Urgent elephant perimeter warning SMS transmitted to ${farmer.phone}`);
    setTimeout(() => setToastMessage(''), 3500);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#071A14] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/farmers"
            className="p-2.5 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:text-[#063B2A] hover:bg-emerald-50 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-extrabold text-gray-500 uppercase">
                {farmer.id}
              </span>
              <StatusBadge status={status} />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#063B2A] tracking-tight">
              {farmer.name} • Agricultural Dossier
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSendDirectAlert}
            className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl text-xs font-bold shadow-md transition-all active:scale-95 flex items-center gap-2"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Send Direct Wildlife SMS</span>
          </button>

          <button
            onClick={handleToggleStatus}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black shadow-md transition-all active:scale-95 ${
              status === 'Active'
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {status === 'Active' ? 'Suspend Producer Account' : 'Activate Account'}
          </button>
        </div>
      </div>

      {/* Profile Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-950/10 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <img
              src={farmer.avatar}
              alt={farmer.name}
              className="w-20 h-20 rounded-3xl object-cover border-2 border-emerald-500 shadow-md"
            />
            <div>
              <h2 className="text-xl font-black text-[#071A14]">
                {farmer.name}
              </h2>
              <p className="text-xs font-bold text-emerald-800">
                {farmer.farmName}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {farmer.location}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" /> {farmer.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Joined {farmer.joinedDate}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-emerald-50 border border-emerald-200/80 p-3.5 rounded-2xl text-center min-w-[100px]">
              <span className="text-[10px] text-emerald-800 font-extrabold uppercase block">Protected Land</span>
              <span className="text-xl font-black text-[#063B2A]">{farmer.acres}</span>
            </div>
            <div className="bg-emerald-50 border border-emerald-200/80 p-3.5 rounded-2xl text-center min-w-[100px]">
              <span className="text-[10px] text-emerald-800 font-extrabold uppercase block">Market Listings</span>
              <span className="text-xl font-black text-[#063B2A]">{farmer.productsCount}</span>
            </div>
          </div>
        </div>

        {/* 4 Quick KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-xs">
          <div className="bg-[#F5F8F6] p-4 rounded-2xl">
            <span className="text-gray-400 block text-[10px] font-bold uppercase">Landholding Title</span>
            <span className="font-extrabold text-[#063B2A] text-sm mt-0.5 block">{farmer.acres} Cultivated</span>
          </div>
          <div className="bg-[#F5F8F6] p-4 rounded-2xl">
            <span className="text-gray-400 block text-[10px] font-bold uppercase">Incident Reports</span>
            <span className="font-extrabold text-[#063B2A] text-sm mt-0.5 block">{farmer.complaintsCount} Filed</span>
          </div>
          <div className="bg-[#F5F8F6] p-4 rounded-2xl">
            <span className="text-gray-400 block text-[10px] font-bold uppercase">Relief Disbursed</span>
            <span className="font-extrabold text-emerald-700 text-sm mt-0.5 block">{farmer.resolvedComplaints} Claims Settled</span>
          </div>
          <div className="bg-[#F5F8F6] p-4 rounded-2xl">
            <span className="text-gray-400 block text-[10px] font-bold uppercase">Perimeter Sensor</span>
            <span className="font-extrabold text-emerald-700 text-sm mt-0.5 block">CAM-023 Monitored</span>
          </div>
        </div>
      </div>

      {/* Catalog & Crops Listed */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-950/10 shadow-soft space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#10B981]" />
            <h3 className="font-extrabold text-[#063B2A] text-base">
              Producer Marketplace Inventory
            </h3>
          </div>
          <span className="text-xs text-gray-500 font-bold">
            {farmer.products ? farmer.products.length : 0} items active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#F5F8F6] text-gray-500 uppercase tracking-wider font-extrabold text-[10px] border-b border-gray-100">
                <th className="py-3 px-4">Product ID</th>
                <th className="py-3 px-4">Item Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price / Unit</th>
                <th className="py-3 px-4">Available Stock</th>
                <th className="py-3 px-4 text-right">Market Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {farmer.products?.map((p) => (
                <tr key={p.id} className="hover:bg-emerald-50/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-600">
                    {p.id}
                  </td>
                  <td className="py-3.5 px-4 font-black text-gray-900">
                    {p.name}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-gray-700">
                    {p.category}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-800">
                    {p.price}
                  </td>
                  <td className="py-3.5 px-4 text-gray-600">
                    {p.stock}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Approved
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default FarmerDetails;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity as ActivityIcon, 
  Radio, 
  MessageSquareWarning, 
  CheckCircle2, 
  Trees, 
  ShieldAlert, 
  Send, 
  Clock, 
  Filter, 
  ChevronRight,
  Download,
  Printer,
  Search,
  Check
} from 'lucide-react';
import { initialActivity } from '../data/activity';

const Activity = () => {
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Radio': return <Radio className="w-4 h-4 text-emerald-600" />;
      case 'MessageSquareWarning': return <MessageSquareWarning className="w-4 h-4 text-amber-600" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-4 h-4 text-teal-600" />;
      case 'Trees': return <Trees className="w-4 h-4 text-emerald-700" />;
      case 'Send': return <Send className="w-4 h-4 text-rose-600" />;
      default: return <ShieldAlert className="w-4 h-4 text-emerald-600" />;
    }
  };

  const filtered = initialActivity.filter(item => {
    const matchesQuery = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesQuery) return false;
    if (filterType === 'All') return true;
    if (filterType === 'alert') return item.type === 'alert' || item.type === 'verified';
    if (filterType === 'complaint') return item.type === 'complaint';
    if (filterType === 'patrol') return item.type === 'patrol';
    return item.type === filterType;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#071A14] text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              <ActivityIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span>Operational SitRep Log</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#063B2A] mt-1">
            Tactical Activity Audit Log
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Chronological audit trail of edge camera detections, officer directives, farmer filings, and field squad dispatches.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-gray-700 text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print SitRep</span>
          </button>
          <button
            onClick={() => showToast('Exported Situation Report to PDF file.')}
            className="px-4 py-2 bg-[#063B2A] hover:bg-emerald-950 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-emerald-300" />
            <span>Export SitRep</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-emerald-950/10 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search operational logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#F5F8F6] text-xs font-semibold rounded-xl border border-transparent focus:border-emerald-300 focus:bg-white focus:outline-none"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#F5F8F6] p-1 rounded-2xl text-xs font-bold w-full md:w-auto">
          {[
            { id: 'All', label: 'All Events' },
            { id: 'alert', label: 'AI Alerts' },
            { id: 'complaint', label: 'Complaints' },
            { id: 'patrol', label: 'Field Squads' },
            { id: 'farmer', label: 'Farmers' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filterType === tab.id
                  ? 'bg-[#063B2A] text-white shadow-xs'
                  : 'text-gray-600 hover:text-[#063B2A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-950/10 shadow-soft">
        <div className="relative pl-6 sm:pl-8 border-l-2 border-emerald-100 space-y-6">
          {filtered.map((item) => (
            <div key={item.id} className="relative group">
              
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-8 h-8 rounded-xl bg-white border-2 border-emerald-500 flex items-center justify-center text-[#063B2A] shadow-xs group-hover:scale-110 transition-transform">
                {getIcon(item.icon)}
              </div>

              {/* Event Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F5F8F6] hover:bg-emerald-50/50 border border-gray-100 hover:border-emerald-200 transition-all space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-extrabold bg-white px-2 py-0.5 rounded border border-gray-200 text-gray-500">
                      {item.id}
                    </span>
                    <h3 className="text-sm font-black text-[#071A14]">
                      {item.title}
                    </h3>
                  </div>

                  <span className="text-[11px] font-bold text-gray-500 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-[#10B981]" />
                    {item.time}
                  </span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Activity;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity as ActivityIcon, 
  Radio, 
  MessageSquareWarning, 
  CheckCircle2, 
  Trees, 
  ShoppingBag, 
  ShieldAlert, 
  Send, 
  Clock, 
  Filter, 
  ChevronRight 
} from 'lucide-react';
import { initialActivity } from '../data/activity';

const Activity = () => {
  const [filterType, setFilterType] = useState('All');

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Radio': return <Radio className="w-4 h-4" />;
      case 'MessageSquareWarning': return <MessageSquareWarning className="w-4 h-4" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-4 h-4" />;
      case 'Trees': return <Trees className="w-4 h-4" />;
      case 'ShoppingBag': return <ShoppingBag className="w-4 h-4" />;
      case 'Send': return <Send className="w-4 h-4" />;
      default: return <ShieldAlert className="w-4 h-4" />;
    }
  };

  const filtered = initialActivity.filter(item => {
    if (filterType === 'All') return true;
    if (filterType === 'alert') return item.type === 'alert' || item.type === 'verified';
    if (filterType === 'complaint') return item.type === 'complaint';
    if (filterType === 'patrol') return item.type === 'patrol';
    return item.type === filterType;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-emerald-100 flex items-center justify-center text-[#10B981]">
              <ActivityIcon className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-[#063B2A] tracking-tight">
              Operational Activity Audit Log
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Real-time event stream of camera detections, officer directives, farmer filings, and field squad patrols
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-2xl border border-gray-200 text-xs font-bold shadow-xs">
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
        <div className="relative pl-6 sm:pl-8 border-l-2 border-emerald-100 space-y-8">
          {filtered.map((item) => (
            <div key={item.id} className="relative group">
              
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1 w-9 h-9 rounded-2xl bg-[#F5F8F6] border-2 border-emerald-500 flex items-center justify-center text-[#063B2A] shadow-xs group-hover:scale-110 transition-transform">
                {getIcon(item.icon)}
              </div>

              {/* Event Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F5F8F6] hover:bg-emerald-50/70 border border-gray-100 hover:border-emerald-200 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-extrabold bg-white px-2 py-0.5 rounded border border-gray-200 text-gray-500">
                      {item.id}
                    </span>
                    <h3 className="text-sm font-black text-[#071A14]">
                      {item.title}
                    </h3>
                  </div>

                  <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1">
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

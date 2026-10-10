import React, { useState } from 'react';
import { 
  Activity, 
  MessageSquareWarning, 
  Radio, 
  CheckCircle2, 
  Trees, 
  ShieldAlert, 
  Send, 
  Clock, 
  MapPin, 
  Filter 
} from 'lucide-react';
import { activityFeed } from '../../data/activity';

const OfficerActivity = () => {
  const [filterType, setFilterType] = useState('All');

  const categories = ['All', 'alert', 'complaint', 'verification', 'farmer', 'patrol', 'broadcast'];

  const filteredFeed = activityFeed.filter((item) => {
    if (filterType === 'All') return true;
    return item.type.toLowerCase() === filterType.toLowerCase();
  });

  const getIcon = (type) => {
    switch (type) {
      case 'complaint':
        return <MessageSquareWarning className="w-5 h-5 text-amber-600" />;
      case 'alert':
        return <Radio className="w-5 h-5 text-rose-600 animate-pulse" />;
      case 'verification':
        return <CheckCircle2 className="w-5 h-5 text-blue-600" />;
      case 'farmer':
        return <Trees className="w-5 h-5 text-emerald-700" />;
      case 'patrol':
        return <ShieldAlert className="w-5 h-5 text-teal-600" />;
      case 'broadcast':
        return <Send className="w-5 h-5 text-purple-600" />;
      default:
        return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  const getBadgeStyle = (color) => {
    switch (color) {
      case 'emerald':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'amber':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'rose':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'blue':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'teal':
        return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'purple':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 mb-1">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span>Incident Stream</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#063B2A]">
            Sensor Alerts &amp; Field Incident Activity
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Real-time chronological timeline of AI camera trap catches, wild animal alerts, and citizen complaints.
          </p>
        </div>

        <span className="text-xs text-gray-500 bg-white px-3.5 py-1.5 rounded-full border border-gray-200 font-medium self-start sm:self-auto">
          Live Sync Active
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-emerald-950/10 shadow-soft">
        <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1 sm:pb-0">
          <span className="font-bold text-gray-500 shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter by:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterType(cat)}
              className={`px-3 py-1.5 rounded-full font-bold transition-all whitespace-nowrap capitalize ${
                filterType === cat
                  ? 'bg-[#063B2A] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-emerald-50'
              }`}
            >
              {cat === 'All' ? 'All Events' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Timeline Cards (Prompt Section 16 Requirement) */}
      <div className="space-y-3">
        {filteredFeed.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-3xl p-5 border border-emerald-950/10 shadow-soft hover:shadow-soft-lg transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:-translate-y-0.5"
          >
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 shadow-xs">
                {getIcon(item.type)}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h4 className="font-black text-gray-900 text-sm sm:text-base">
                    {item.title}
                  </h4>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getBadgeStyle(item.color)}`}
                  >
                    {item.badge}
                  </span>
                </div>

                <p className="text-xs text-gray-700 font-semibold">
                  {item.subject}
                </p>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-500 mt-1">
                  <span>{item.actor}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    {item.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium shrink-0 self-start sm:self-center bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              <span>{item.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default OfficerActivity;

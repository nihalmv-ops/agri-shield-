import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Radio, 
  MessageSquareWarning, 
  CheckCircle2, 
  Trees, 
  ShoppingBag, 
  Cpu, 
  AlertTriangle, 
  Download, 
  ExternalLink, 
  Calendar, 
  Eye, 
  ArrowUpRight, 
  Activity, 
  Clock, 
  ShieldAlert, 
  MapPin, 
  Check, 
  Filter 
} from 'lucide-react';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { initialWildlifeAlerts } from '../data/wildlifeAlerts';
import { initialComplaints } from '../data/complaints';
import { initialActivity } from '../data/activity';

const Dashboard = () => {
  const [alerts, setAlerts] = useState(initialWildlifeAlerts);
  const [selectedAnimalFilter, setSelectedAnimalFilter] = useState('All');
  const [exportNotice, setExportNotice] = useState(false);

  // Quick verify handler for alerts in dashboard
  const handleQuickVerify = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'Verified' } : a));
  };

  const handleExport = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 2500);
  };

  // Monthly Detection Data for SVG/CSS Chart
  const monthlyData = [
    { month: 'Jan', elephant: 14, leopard: 6, boar: 22, total: 42 },
    { month: 'Feb', elephant: 18, leopard: 8, boar: 26, total: 52 },
    { month: 'Mar', elephant: 22, leopard: 9, boar: 31, total: 62 },
    { month: 'Apr', elephant: 29, leopard: 11, boar: 38, total: 78 },
    { month: 'May', elephant: 35, leopard: 14, boar: 44, total: 93 },
    { month: 'Jun', elephant: 42, leopard: 18, boar: 48, total: 108 },
    { month: 'Jul', elephant: 38, leopard: 16, boar: 41, total: 95 },
    { month: 'Aug', elephant: 45, leopard: 19, boar: 52, total: 116 },
    { month: 'Sep', elephant: 51, leopard: 22, boar: 58, total: 131 },
    { month: 'Oct', elephant: 63, leopard: 27, boar: 64, total: 154 }
  ];

  const maxTotal = Math.max(...monthlyData.map(d => d.total));

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#063B2A] via-[#0B2E21] to-[#071A14] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-900/60">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-emerald-500/10 to-transparent pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-[11px] font-bold text-emerald-300 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Central Tactical Command Center • Sector 4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Good Morning, Officer Arjun Nair
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl leading-relaxed">
              Monitoring 45 camera traps, 1,420 registered farm perimeters, and 24 active animal presence alerts across the Wayanad North Division.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-2xl text-xs font-bold border border-white/15 backdrop-blur-xs transition-all active:scale-95"
            >
              <Download className="w-4 h-4 text-emerald-300" />
              <span>{exportNotice ? 'SitRep Generated!' : 'Export SitRep (PDF)'}</span>
            </button>

            <Link
              to="/admin/alerts"
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#10B981] to-emerald-600 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-2xl text-xs font-extrabold shadow-lg shadow-emerald-900/40 transition-all active:scale-95"
            >
              <Eye className="w-4 h-4" />
              <span>Live AI Sensors</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 6 Statistics Cards (Section 10) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
        <StatCard
          title="Wildlife Alerts"
          value="24"
          subtext="+8 today"
          icon="Radio"
          color="emerald"
        />
        <StatCard
          title="Pending Complaints"
          value="12"
          subtext="4 high priority"
          icon="MessageSquareWarning"
          color="amber"
        />
        <StatCard
          title="Verified Encounters"
          value="18"
          subtext="75% verified"
          icon="CheckCircle2"
          color="teal"
        />
        <StatCard
          title="Enrolled Farmers"
          value="248"
          subtext="+14 this month"
          icon="Trees"
          color="emerald"
        />
        <StatCard
          title="Market Products"
          value="486"
          subtext="8 under review"
          icon="ShoppingBag"
          color="blue"
        />
        <StatCard
          title="AI Edge Cameras"
          value="42/45"
          subtext="3 battery service"
          icon="Cpu"
          color="purple"
        />
      </div>

      {/* Analytics Section: Wildlife Detection Trends & Grievance Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Wildlife Detection Trend (Monthly Detections) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-emerald-950/10 shadow-soft space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#10B981]" />
                <h3 className="font-extrabold text-[#063B2A] text-base">
                  Wildlife Detection Overview (2026)
                </h3>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Monthly AI-triggered optical sensors across Kerala border zones
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 bg-[#F5F8F6] p-1 rounded-2xl text-xs font-bold">
              {['All', 'Elephant', 'Leopard', 'Boar'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedAnimalFilter(filter)}
                  className={`px-3 py-1 rounded-xl transition-all ${
                    selectedAnimalFilter === filter
                      ? 'bg-[#063B2A] text-white shadow-xs'
                      : 'text-gray-600 hover:text-[#063B2A]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* SVG / CSS High-Fidelity Chart */}
          <div className="pt-2">
            <div className="h-60 sm:h-64 flex items-end justify-between gap-2 sm:gap-3 px-2">
              {monthlyData.map((d) => {
                const heightPercent = Math.round((d.total / maxTotal) * 100);
                const elephantH = Math.round((d.elephant / d.total) * 100);
                const leopardH = Math.round((d.leopard / d.total) * 100);
                const boarH = 100 - elephantH - leopardH;

                return (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#071A14] text-white text-[10px] px-2 py-1 rounded-lg absolute -translate-y-24 pointer-events-none shadow-xl z-20 whitespace-nowrap">
                      <p className="font-bold">{d.month} 2026: {d.total} total</p>
                      <p className="text-emerald-300">🐘 {d.elephant} • 🐆 {d.leopard} • 🐗 {d.boar}</p>
                    </div>

                    {/* Stacked Bar Container */}
                    <div 
                      className="w-full max-w-[34px] rounded-t-xl overflow-hidden flex flex-col justify-end bg-emerald-50 transition-all duration-300 group-hover:opacity-90 shadow-xs"
                      style={{ height: `${heightPercent}%` }}
                    >
                      {selectedAnimalFilter === 'All' ? (
                        <>
                          <div 
                            style={{ height: `${boarH}%` }} 
                            className="bg-amber-500 w-full transition-all" 
                            title={`Wild Boar: ${d.boar}`}
                          />
                          <div 
                            style={{ height: `${leopardH}%` }} 
                            className="bg-rose-500 w-full transition-all" 
                            title={`Leopard: ${d.leopard}`}
                          />
                          <div 
                            style={{ height: `${elephantH}%` }} 
                            className="bg-[#10B981] w-full transition-all" 
                            title={`Elephant: ${d.elephant}`}
                          />
                        </>
                      ) : selectedAnimalFilter === 'Elephant' ? (
                        <div className="bg-[#10B981] w-full h-full" />
                      ) : selectedAnimalFilter === 'Leopard' ? (
                        <div className="bg-rose-500 w-full h-full" />
                      ) : (
                        <div className="bg-amber-500 w-full h-full" />
                      )}
                    </div>

                    {/* Month Label */}
                    <span className="text-[11px] font-bold text-gray-500 group-hover:text-[#063B2A]">
                      {d.month}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-5 border-t border-gray-100 text-xs font-semibold text-gray-600">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#10B981]"></span>
                <span>Asian Elephant (41%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                <span>Indian Leopard (18%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span>Wild Boar (41%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Complaints Classification Radar */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-950/10 shadow-soft space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h3 className="font-extrabold text-[#063B2A] text-base">
                  Incident Breakdown
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  12 Active grievances categorized
                </p>
              </div>
              <span className="text-[11px] font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
                Oct 2026
              </span>
            </div>

            <div className="space-y-4 pt-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-gray-700">Crop Destruction</span>
                  <span className="text-[#063B2A]">6 cases (50%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-gray-700">Animal Attack / Human Hazard</span>
                  <span className="text-rose-700">3 cases (25%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-gray-700">Solar Fence Breach</span>
                  <span className="text-amber-700">2 cases (17%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '17%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-gray-700">Direct Wildlife Sighting</span>
                  <span className="text-blue-700">1 case (8%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '8%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Squad Readiness */}
          <div className="bg-[#F5F8F6] p-4 rounded-2xl border border-emerald-950/10 space-y-2 mt-4">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-[#063B2A] flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-emerald-600" />
                Rapid Response Squads
              </span>
              <span className="text-emerald-700">3 Units Live</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[10px] font-bold text-center pt-1">
              <div className="bg-white p-1.5 rounded-xl border border-gray-200">
                <span className="text-gray-700 block">RRT-01</span>
                <span className="text-emerald-600">On Patrol</span>
              </div>
              <div className="bg-white p-1.5 rounded-xl border border-gray-200">
                <span className="text-gray-700 block">RRT-02</span>
                <span className="text-amber-600">Standby</span>
              </div>
              <div className="bg-white p-1.5 rounded-xl border border-gray-200">
                <span className="text-gray-700 block">RRT-04</span>
                <span className="text-rose-600">Dispatched</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Real-Time Sensor Alert Stream Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-950/10 shadow-soft space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-rose-500 animate-pulse" />
              <h3 className="font-extrabold text-[#063B2A] text-base">
                Real-Time AI Sensor Alerts (Recent Detections)
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Live camera-trap optical verification stream across designated buffer zones
            </p>
          </div>

          <Link
            to="/admin/alerts"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#10B981] hover:underline"
          >
            <span>View All 24 Wildlife Alerts</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Alerts Table */}
        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#F5F8F6] text-gray-500 uppercase tracking-wider font-extrabold text-[10px] border-y border-gray-100">
                <th className="py-3 px-4">Alert ID & Animal</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4">Location / Zone</th>
                <th className="py-3 px-4">Camera ID</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Officer Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {alerts.slice(0, 5).map((item) => (
                <tr key={item.id} className="hover:bg-emerald-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-gray-900">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.animal}
                        className="w-10 h-10 rounded-xl object-cover border border-emerald-900/10"
                      />
                      <div>
                        <span className="font-black text-[#063B2A] block">{item.animal}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{item.id}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-[#063B2A]">{item.confidence}%</span>
                      <div className="w-14 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            item.confidence >= 90 ? 'bg-[#10B981]' : 'bg-amber-500'
                          }`}
                          style={{ width: `${item.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-gray-800 block">{item.location}</span>
                    <span className="text-[10px] text-gray-400 block">{item.zone}</span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[11px] font-bold text-gray-600">
                    {item.camera}
                  </td>

                  <td className="py-3.5 px-4 text-gray-500">
                    <span className="block font-medium">{item.time}</span>
                    <span className="text-[10px] text-gray-400">{item.date}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <StatusBadge status={item.status} />
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {item.status !== 'Verified' && (
                        <button
                          onClick={() => handleQuickVerify(item.id)}
                          className="px-2.5 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-extrabold text-[11px] rounded-xl transition-colors"
                        >
                          Verify
                        </button>
                      )}
                      <Link
                        to={`/admin/alerts/${item.id}`}
                        className="p-1.5 text-gray-400 hover:text-[#063B2A] rounded-xl hover:bg-gray-100"
                        title="View Details"
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

      {/* Dual Section: Recent Grievances & Live Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Pending Grievances */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-950/10 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <MessageSquareWarning className="w-5 h-5 text-amber-500" />
              <h4 className="font-extrabold text-[#063B2A] text-sm">
                Urgent Farmer Grievances
              </h4>
            </div>
            <Link to="/admin/complaints" className="text-xs font-bold text-[#10B981] hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {initialComplaints.slice(0, 3).map((cmp) => (
              <Link
                key={cmp.id}
                to={`/admin/complaints/${cmp.id}`}
                className="block p-4 rounded-2xl bg-[#F5F8F6] hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200 transition-all group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-xs text-[#071A14] group-hover:text-[#063B2A]">
                        {cmp.title}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400">
                        {cmp.id}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1 line-clamp-1">
                      {cmp.farmerName} • {cmp.location}
                    </p>
                  </div>
                  <StatusBadge status={cmp.status} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Live System Activity Log */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-950/10 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#10B981]" />
              <h4 className="font-extrabold text-[#063B2A] text-sm">
                Real-Time Activity Stream
              </h4>
            </div>
            <Link to="/admin/activity" className="text-xs font-bold text-[#10B981] hover:underline">
              Activity Hub
            </Link>
          </div>

          <div className="space-y-3">
            {initialActivity.slice(0, 4).map((act) => (
              <div key={act.id} className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-[#10B981] mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900 leading-snug">
                    {act.title}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-0.5 truncate">
                    {act.description}
                  </p>
                </div>
                <span className="text-[10px] text-gray-400 whitespace-nowrap">
                  {act.time}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;

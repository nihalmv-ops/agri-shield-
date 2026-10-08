import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Radio, 
  Clock, 
  CheckCircle2, 
  CheckCheck, 
  ChevronRight, 
  Camera, 
  Send, 
  AlertTriangle,
  ShieldAlert,
  BellRing
} from 'lucide-react';
import StatCard from '../../components/officer/StatCard';
import AlertCard from '../../components/officer/AlertCard';
import ComplaintCard from '../../components/officer/ComplaintCard';
import Button from '../../components/Button';
import { officerAlerts } from '../../data/officerAlerts';
import { complaints } from '../../data/complaints';

const OfficerDashboard = () => {
  const [alertsList, setAlertsList] = useState(officerAlerts);
  const [complaintsList, setComplaintsList] = useState(complaints);
  const [toastMessage, setToastMessage] = useState('');

  const handleVerifyAlert = (id) => {
    setAlertsList(prev => prev.map(a => a.id === id ? { ...a, status: 'Verified' } : a));
    setToastMessage(`Wildlife Alert #${id} marked as Verified by Range Officer!`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleVerifyComplaint = (id) => {
    setComplaintsList(prev => prev.map(c => c.id === id ? { ...c, status: 'Verified' } : c));
    setToastMessage(`Complaint #${id} ground verification confirmed.`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleBroadcastSMS = () => {
    setToastMessage('🚨 Emergency Flash SMS broadcasted to 412 registered farmers in Wayanad buffer zone.');
    setTimeout(() => setToastMessage(''), 3500);
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner (Prompt Section 7 Requirement) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>Range Station Operational • Sector Wayanad</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#063B2A] tracking-tight">
            Good Morning, Forest Officer
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Monitor wildlife activity, complaints and community reports.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            to="/wildlife-camera"
            variant="outlineDark"
            size="sm"
            className="rounded-full text-xs"
            icon={Camera}
          >
            Camera Traps HUD
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleBroadcastSMS}
            className="bg-[#10B981] hover:bg-[#0ea371] text-white rounded-full font-bold text-xs shadow-glow-emerald"
            icon={Send}
          >
            Broadcast Alert SMS
          </Button>
        </div>
      </div>

      {/* Floating Status Toast */}
      {toastMessage && (
        <div className="p-3.5 bg-[#063B2A] text-white text-xs font-bold rounded-2xl flex items-center gap-2 shadow-lg animate-fadeIn border border-emerald-500/40">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          FOUR PRIMARY STATISTIC CARDS (Prompt Section 8 Requirement)
          - Wildlife Alerts: 24, +8 today
          - Pending Complaints: 12, Requires attention
          - Verified Alerts: 18, This month
          - Resolved Reports: 35, Completed
          ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Wildlife Alerts"
          value="24"
          subtext="+8 today"
          icon="Radio"
          color="rose"
        />

        <StatCard
          title="Pending Complaints"
          value="12"
          subtext="Requires attention"
          icon="Clock"
          color="amber"
        />

        <StatCard
          title="Verified Alerts"
          value="18"
          subtext="This month"
          icon="CheckCircle2"
          color="blue"
        />

        <StatCard
          title="Resolved Reports"
          value="35"
          subtext="Completed"
          icon="CheckCheck"
          color="teal"
        />
      </div>

      {/* =========================================================================
          EMERGENCY WILDLIFE ALERT (Prompt Section 9 Requirement)
          Recent Wildlife Alerts:
          - Alert 1: Elephant Detected (96%, Wayanad, 07 Oct 2026, 10:24 PM, Pending Verification)
          - Alert 2: Leopard Detected (91%, Idukki, 07 Oct 2026, 08:15 PM, Verified)
          - Alert 3: Wild Boar Detected (88%, Ernakulam, 07 Oct 2026, 06:45 PM, Under Review)
          ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-[#063B2A] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
              Recent Wildlife Alerts
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Live automated neural-edge triggers from forest perimeter trail cameras
            </p>
          </div>

          <Link
            to="/officer/alerts"
            className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 hover:underline"
          >
            <span>View All 24 Alerts</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {alertsList.slice(0, 3).map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onVerify={handleVerifyAlert}
            />
          ))}
        </div>
      </div>

      {/* =========================================================================
          RECENT COMMUNITY COMPLAINTS & ACTION DISPATCH
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Community Complaints (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-[#063B2A]">
                Pending &amp; Active Complaints
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Crop damages and forest incursions filed by local farmers
              </p>
            </div>

            <Link
              to="/officer/complaints"
              className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 hover:underline"
            >
              <span>Manage Complaints</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {complaintsList.slice(0, 3).map((item) => (
              <ComplaintCard
                key={item.id}
                complaint={item}
                onVerify={handleVerifyComplaint}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Quick Ranger Control Desk (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Patrol Dispatch Box */}
          <div className="bg-[#063B2A] rounded-3xl p-6 text-white space-y-4 border border-emerald-800/60 shadow-soft">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-white text-sm">Rapid Response Team</h4>
                <p className="text-[11px] text-emerald-300">Station RRT-04 On Standby</p>
              </div>
            </div>

            <p className="text-xs text-emerald-100/80 leading-relaxed">
              Equipped with searchlights, acoustic deterrent sounders, and veterinary tranquilizer kits for elephant perimeter driving.
            </p>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setToastMessage('Patrol RRT-04 dispatched to Sultan Bathery East Boundary!');
                  setTimeout(() => setToastMessage(''), 3000);
                }}
                className="w-full py-2.5 px-4 bg-[#10B981] hover:bg-[#0ea371] text-black font-extrabold text-xs rounded-full transition-colors shadow-sm"
              >
                Dispatch Patrol RRT-04
              </button>

              <Link
                to="/officer/activity"
                className="block text-center text-xs text-emerald-300 hover:underline py-1"
              >
                View Live Activity Log →
              </Link>
            </div>
          </div>

          {/* Connected Sensor Nodes */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-950/10 shadow-soft space-y-3">
            <h4 className="text-sm font-extrabold text-[#063B2A]">
              Perimeter Telemetry
            </h4>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Active Solar Traps</span>
                <strong className="text-emerald-700">56 Nodes Online</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Fence Voltage</span>
                <strong className="text-emerald-700">9.4 kV (Normal)</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Average AI Latency</span>
                <strong className="text-gray-800">1.2 Seconds</strong>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default OfficerDashboard;

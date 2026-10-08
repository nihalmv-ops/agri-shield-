import React, { useState } from 'react';
import { 
  Camera, 
  Radio, 
  Battery, 
  Sun, 
  Wifi, 
  ShieldAlert, 
  Send, 
  Upload, 
  Scan, 
  CheckCircle2, 
  RefreshCw, 
  Compass, 
  Layers,
  MapPin,
  Calendar,
  Clock,
  Sparkles
} from 'lucide-react';
import Button from '../components/Button';

const WildlifeCamera = () => {
  const cameraFeeds = [
    {
      id: "CAM-023",
      location: "Wayanad, Kerala (Perimeter Zone 4)",
      animal: "Elephant",
      confidence: 96,
      date: "07 Oct 2026",
      time: "10:24 PM",
      status: "Threat Detected",
      image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80",
      solarCharging: "94%",
      batteryLevel: "98%",
      signal: "Strong 5G"
    },
    {
      id: "CAM-014",
      location: "Idukki, Kerala (Tea Estate Border)",
      animal: "Leopard",
      confidence: 91,
      date: "07 Oct 2026",
      time: "08:15 PM",
      status: "Threat Detected",
      image: "https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=1200&q=80",
      solarCharging: "88%",
      batteryLevel: "92%",
      signal: "Moderate 4G"
    },
    {
      id: "CAM-042",
      location: "Ernakulam, Kerala (Foothills Range)",
      animal: "Wild Boar",
      confidence: 88,
      date: "07 Oct 2026",
      time: "06:40 PM",
      status: "Warning",
      image: "https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=1200&q=80",
      solarCharging: "99%",
      batteryLevel: "100%",
      signal: "Strong 5G"
    }
  ];

  const [activeCamIndex, setActiveCamIndex] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const [reportedState, setReportedState] = useState(false);
  const [capturedFlash, setCapturedFlash] = useState(false);

  const activeCam = cameraFeeds[activeCamIndex];

  const handleCapture = () => {
    setCapturedFlash(true);
    setTimeout(() => setCapturedFlash(false), 200);
    setIsCapturing(true);
    setTimeout(() => setIsCapturing(false), 2000);
  };

  const handleReportOfficer = () => {
    setReportedState(true);
    setTimeout(() => setReportedState(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#071A14] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-emerald-900/40">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                Kerala Forest Dept Autonomous Monitoring Grid
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              AI Wildlife Camera Preview &amp; Vision UI
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Live edge-AI animal detection prototyping interface for solar trail traps.
            </p>
          </div>

          {/* Camera Selector Pills */}
          <div className="flex items-center gap-2 bg-[#063B2A] p-1.5 rounded-2xl border border-emerald-800/60 text-xs">
            {cameraFeeds.map((cam, idx) => (
              <button
                key={cam.id}
                onClick={() => setActiveCamIndex(idx)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  activeCamIndex === idx
                    ? 'bg-emerald-500 text-black shadow-md'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {cam.id}
              </button>
            ))}
          </div>
        </div>

        {/* Viewfinder Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Camera Viewfinder (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/60 shadow-2xl bg-black aspect-16/10">
              {/* Flash animation on capture */}
              {capturedFlash && (
                <div className="absolute inset-0 bg-white z-50 animate-fadeOut pointer-events-none"></div>
              )}

              {/* Viewfinder Video/Feed Image */}
              <img
                src={activeCam.image}
                alt={activeCam.animal}
                className="w-full h-full object-cover opacity-90"
              />

              {/* Grid overlay lines */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-20">
                <div className="border-r border-b border-emerald-400"></div>
                <div className="border-r border-b border-emerald-400"></div>
                <div className="border-b border-emerald-400"></div>
                <div className="border-r border-b border-emerald-400"></div>
                <div className="border-r border-b border-emerald-400"></div>
                <div className="border-b border-emerald-400"></div>
                <div className="border-r border-emerald-400"></div>
                <div className="border-r border-emerald-400"></div>
                <div></div>
              </div>

              {/* AI Scan line animation */}
              <div className="ai-scan-line"></div>

              {/* Top Viewfinder HUD */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between text-xs z-20">
                {/* Status Indicator */}
                <div className="flex items-center gap-2 px-3 py-1 bg-black/75 backdrop-blur-md rounded-full border border-emerald-500/40">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                  <span className="font-mono text-emerald-400 font-bold uppercase">REC • LIVE 30FPS</span>
                </div>

                {/* Telemetry */}
                <div className="flex items-center gap-3 px-3 py-1 bg-black/75 backdrop-blur-md rounded-full border border-emerald-500/40 text-gray-300 font-mono text-[11px]">
                  <span className="flex items-center gap-1">
                    <Sun className="w-3.5 h-3.5 text-amber-400" /> {activeCam.solarCharging}
                  </span>
                  <span className="flex items-center gap-1">
                    <Battery className="w-3.5 h-3.5 text-emerald-400" /> {activeCam.batteryLevel}
                  </span>
                  <span className="flex items-center gap-1">
                    <Wifi className="w-3.5 h-3.5 text-emerald-400" /> {activeCam.signal}
                  </span>
                </div>
              </div>

              {/* Center Target Box around Subject */}
              <div className="absolute inset-x-1/6 inset-y-1/6 border-2 border-dashed border-emerald-400 rounded-3xl pointer-events-none flex items-start justify-between p-3">
                {/* Crosshairs */}
                <div className="w-5 h-5 border-t-4 border-l-4 border-emerald-400 -mt-2 -ml-2"></div>
                <div className="w-5 h-5 border-t-4 border-r-4 border-emerald-400 -mt-2 -mr-2"></div>
                
                {/* Floating AI Detection Tag */}
                <div className="absolute -top-3.5 left-6 bg-emerald-500 text-black px-3 py-0.5 rounded-full text-xs font-black shadow-lg flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI DETECTED</span>
                </div>

                {/* Species badge inside target box */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3 rounded-2xl border border-emerald-500/40 flex items-center justify-between text-white">
                  <div>
                    <h3 className="text-xl font-black text-white">{activeCam.animal}</h3>
                    <p className="text-xs text-emerald-400 font-mono font-bold">Confidence: {activeCam.confidence}%</p>
                  </div>
                  <span className="px-3 py-1 bg-rose-500/30 text-rose-300 font-bold text-xs rounded-lg border border-rose-500/40">
                    High Alert
                  </span>
                </div>
              </div>

              {/* Bottom HUD */}
              <div className="absolute bottom-4 inset-x-4 flex items-center justify-between text-[11px] font-mono text-gray-400 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-emerald-950">
                <span>SENSOR: {activeCam.id}</span>
                <span>LAT: 11.6854° N, 76.1320° E</span>
                <span>MODEL: YOLOv10-WILDLIFE-AGRISHIELD</span>
              </div>

            </div>

            {/* Notification Bar */}
            {isCapturing && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-500 rounded-2xl text-xs text-emerald-300 flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>High-resolution RAW snapshot saved to local encrypted cache.</span>
              </div>
            )}

            {reportedState && (
              <div className="p-3 bg-rose-950/80 border border-rose-500 rounded-2xl text-xs text-rose-300 flex items-center gap-2 animate-fadeIn">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>Emergency Sighting Packet dispatched to Forest Range Officer &amp; WhatsApp Alert Broadcaster!</span>
              </div>
            )}

          </div>

          {/* Details & Controls Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Subject Data Card */}
            <div className="bg-[#063B2A] rounded-3xl p-6 border border-emerald-800/60 space-y-4">
              <h3 className="text-base font-extrabold text-white pb-3 border-b border-emerald-800/60 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                Classification Telemetry
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-emerald-900/40">
                  <span className="text-gray-400">Animal Classified:</span>
                  <strong className="text-emerald-300 text-sm">{activeCam.animal}</strong>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-emerald-900/40">
                  <span className="text-gray-400">Neural Confidence:</span>
                  <strong className="font-mono text-emerald-400 text-sm">{activeCam.confidence}%</strong>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-emerald-900/40">
                  <span className="text-gray-400">Camera Node:</span>
                  <span className="font-mono text-gray-200">{activeCam.id}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-emerald-900/40">
                  <span className="text-gray-400">Location:</span>
                  <span className="text-right text-gray-200">{activeCam.location}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-emerald-900/40">
                  <span className="text-gray-400">Date:</span>
                  <span className="text-gray-200">{activeCam.date}</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-400">Time:</span>
                  <span className="text-gray-200">{activeCam.time}</span>
                </div>
              </div>

              {/* Prototype Disclaimer */}
              <div className="p-3 bg-black/40 rounded-2xl border border-emerald-500/20 text-[11px] text-emerald-200/80 leading-relaxed">
                ℹ️ <strong>Day 1 Frontend Mockup:</strong> Simulated AI classification model feed. Backend neural inferencing pipeline connects in upcoming versions.
              </div>
            </div>

            {/* Action Buttons (Prompt Section 19) */}
            <div className="space-y-3">
              <Button
                variant="primary"
                size="md"
                onClick={handleCapture}
                className="w-full bg-[#10B981] hover:bg-[#0ea371] text-black font-extrabold rounded-full py-3"
                icon={Camera}
              >
                Capture Image
              </Button>

              <Button
                variant="glass"
                size="md"
                onClick={handleCapture}
                className="w-full rounded-full py-3"
                icon={Upload}
              >
                Upload Image Test
              </Button>

              <Button
                variant="danger"
                size="md"
                onClick={handleReportOfficer}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white rounded-full py-3 font-bold"
                icon={ShieldAlert}
              >
                Report to Forest Officer
              </Button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default WildlifeCamera;

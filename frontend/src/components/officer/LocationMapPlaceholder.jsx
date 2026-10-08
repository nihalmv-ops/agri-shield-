import React, { useState } from 'react';
import { 
  MapPin, 
  Layers, 
  Compass, 
  ZoomIn, 
  ZoomOut, 
  Radio, 
  Maximize2,
  Navigation
} from 'lucide-react';

const LocationMapPlaceholder = ({
  location = "Wayanad, Kerala",
  coordinates = "11.6854° N, 76.1320° E",
  zone = "Muthanga Wildlife Sanctuary Border (Range 4)",
  camera = "CAM-023",
  animal = "Elephant",
  className = ""
}) => {
  const [mapMode, setMapMode] = useState('terrain'); // 'terrain' | 'satellite'

  return (
    <div className={`bg-white rounded-3xl p-6 border border-emerald-950/10 shadow-soft space-y-4 ${className}`}>
      
      {/* Title & Metadata */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
        <div>
          <h3 className="text-base font-extrabold text-[#063B2A] flex items-center gap-2">
            <span className="text-rose-500">📍</span>
            <span>Detection Location</span>
          </h3>
          <p className="text-xs text-gray-500 mt-0.5 font-medium">
            {location} • <span className="font-mono text-emerald-800 font-bold">{coordinates}</span>
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-xl text-xs font-bold self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setMapMode('terrain')}
            className={`px-3 py-1 rounded-lg transition-all ${
              mapMode === 'terrain'
                ? 'bg-white text-[#063B2A] shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Topographic
          </button>
          <button
            type="button"
            onClick={() => setMapMode('satellite')}
            className={`px-3 py-1 rounded-lg transition-all ${
              mapMode === 'satellite'
                ? 'bg-white text-[#063B2A] shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Forest Canopy
          </button>
        </div>
      </div>

      {/* Map Graphic Canvas */}
      <div className="relative rounded-2xl overflow-hidden border border-emerald-800/20 bg-[#071A14] h-72 w-full select-none shadow-inner">
        {/* Map Background Pattern / Imagery */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: mapMode === 'satellite'
              ? `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80')`
              : `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80')`,
            opacity: mapMode === 'satellite' ? 0.75 : 0.45
          }}
        />

        {/* Topographic Contour & Grid Lines Overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#063B2A]/40 to-[#071A14]/90 pointer-events-none" />
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-15 pointer-events-none">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border border-emerald-400" />
          ))}
        </div>

        {/* Range Detection Perimeter Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-emerald-400/50 bg-emerald-500/10 pointer-events-none animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-dashed border-rose-400/60 pointer-events-none" />

        {/* Central Detection Pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="relative">
            <span className="w-4 h-4 rounded-full bg-rose-500 absolute -top-1 -left-1 animate-ping"></span>
            <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
          
          <div className="mt-2 px-3 py-1 rounded-xl bg-black/85 backdrop-blur-md text-white text-[11px] font-bold border border-emerald-500/40 shadow-xl whitespace-nowrap text-center">
            <span className="text-rose-400">⚠️ {animal}</span> Spotted
            <span className="block text-[9px] font-mono text-gray-300 font-normal">{camera}</span>
          </div>
        </div>

        {/* North Compass Indicator */}
        <div className="absolute top-3 right-3 p-2 bg-black/75 backdrop-blur-md rounded-xl border border-white/20 text-white text-[10px] font-bold flex items-center gap-1">
          <Compass className="w-4 h-4 text-emerald-400 animate-spin-slow" />
          <span>N 340°</span>
        </div>

        {/* GPS Coordinates & Sensor Banner at Bottom */}
        <div className="absolute bottom-3 inset-x-3 bg-black/85 backdrop-blur-md rounded-xl p-2.5 border border-emerald-500/30 flex items-center justify-between text-[11px] text-gray-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-white truncate">{zone}</span>
          </div>
          <span className="font-mono text-emerald-400 hidden sm:inline">{coordinates}</span>
        </div>

        {/* Zoom Controls Mockup */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <button className="w-7 h-7 bg-black/75 hover:bg-black rounded-lg text-white flex items-center justify-center border border-white/20 shadow-md">
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button className="w-7 h-7 bg-black/75 hover:bg-black rounded-lg text-white flex items-center justify-center border border-white/20 shadow-md">
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <p className="text-[11px] text-gray-500 italic">
        * Visual GIS placeholder calibrated for Kerala Forest Range grids. (Can be connected to Leaflet/Google Maps API in later releases).
      </p>
    </div>
  );
};

export default LocationMapPlaceholder;

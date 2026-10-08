import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  Sparkles, 
  Eye, 
  CheckCircle2, 
  Camera 
} from 'lucide-react';
import StatusBadge from './StatusBadge';

const WildlifeAlertCard = ({ alert, onVerify, className = '' }) => {
  const {
    id,
    animal,
    confidence,
    location,
    date,
    time,
    source,
    camera,
    status,
    image
  } = alert;

  const isVerified = (status || '').toLowerCase() === 'verified';

  return (
    <div
      className={`group bg-white rounded-3xl border border-emerald-950/10 shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-0.5 ${className}`}
    >
      <div>
        {/* Wildlife Image Banner with AI Overlays */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-900">
          <img
            src={image}
            alt={animal}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#071A14]/85 backdrop-blur-md text-[#34D399] text-[11px] font-black border border-emerald-500/40">
            <Sparkles className="w-3 h-3 text-[#34D399]" />
            <span>AI CAMERA</span>
          </div>

          <div className="absolute top-3 right-3 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full text-white text-xs font-mono font-bold border border-emerald-400/30">
            <span className="text-[#34D399] font-extrabold">{confidence}%</span>
            <span className="text-[10px] text-gray-300 ml-1">Conf.</span>
          </div>

          <div className="absolute bottom-3 left-3">
            <StatusBadge status={status} size="xs" />
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-[#071A14] group-hover:text-emerald-800 transition-colors">
              {animal}
            </h3>
            {camera && (
              <span className="font-mono text-[11px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                {camera}
              </span>
            )}
          </div>

          <div className="space-y-1.5 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
              <span className="truncate font-semibold">{location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
              <span>{date} • {time}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-5 pt-0 flex items-center gap-2">
        <Link
          to={`/admin/alerts/${id}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs font-bold bg-gray-100 hover:bg-emerald-50 text-gray-800 hover:text-emerald-800 transition-colors border border-gray-200"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View</span>
        </Link>

        {!isVerified && onVerify && (
          <button
            onClick={() => onVerify(id)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs font-bold bg-[#10B981] hover:bg-[#0ea371] text-white shadow-xs transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verify</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default WildlifeAlertCard;

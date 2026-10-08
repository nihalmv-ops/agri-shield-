import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  Camera, 
  CheckCircle2, 
  Eye, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import StatusBadge from './StatusBadge';
import Button from '../Button';

const AlertCard = ({ alert, onVerify, className = '' }) => {
  const {
    id,
    animal,
    confidence,
    location,
    date,
    time,
    status,
    camera,
    image,
    severity
  } = alert;

  const isVerified = (status || '').toLowerCase() === 'verified';

  return (
    <div
      className={`group bg-white rounded-3xl border border-emerald-950/10 shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-0.5 ${className}`}
    >
      <div>
        {/* Wildlife Photo Banner */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-900">
          <img
            src={image}
            alt={animal}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Top Left AI Chip */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#071A14]/85 backdrop-blur-md text-emerald-400 text-[11px] font-black border border-emerald-500/40">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI DETECTED</span>
          </div>

          {/* Top Right Confidence Gauge */}
          <div className="absolute top-3 right-3 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full text-white text-xs font-mono font-bold border border-emerald-400/30 flex items-center gap-1">
            <span className="text-emerald-400 font-extrabold">{confidence}%</span>
            <span className="text-[10px] text-gray-300">Conf.</span>
          </div>

          {/* Bottom Status Badge on Image */}
          <div className="absolute bottom-3 left-3">
            <StatusBadge status={status} size="xs" />
          </div>
        </div>

        {/* Content Details */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-gray-900 group-hover:text-emerald-800 transition-colors">
              {animal} Detected
            </h3>
            {camera && (
              <span className="font-mono text-[11px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                {camera}
              </span>
            )}
          </div>

          <div className="space-y-1.5 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate font-medium">{location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{date} • {time}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-5 pt-0 flex items-center gap-2">
        <Link
          to={`/officer/alerts/${id}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs font-bold bg-gray-100 hover:bg-emerald-50 text-gray-800 hover:text-emerald-800 transition-colors border border-gray-200"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Details</span>
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

export default AlertCard;

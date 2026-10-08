import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  User, 
  Eye, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import StatusBadge from './StatusBadge';

const ComplaintCard = ({ complaint, onUpdateStatus, onVerify, className = '' }) => {
  const {
    id,
    type,
    reporter,
    location,
    date,
    priority,
    status,
    description,
    compensationClaimed
  } = complaint;

  return (
    <div
      className={`bg-white rounded-3xl p-5 sm:p-6 border border-emerald-950/10 shadow-soft hover:shadow-soft-lg transition-all duration-300 space-y-4 ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs font-black text-[#063B2A] bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            #{id}
          </span>
          <h4 className="font-extrabold text-gray-900 text-base">
            {type}
          </h4>
        </div>
        <div className="flex items-center gap-2">
          {priority && <StatusBadge priority={priority} size="xs" />}
          <StatusBadge status={status} size="xs" />
        </div>
      </div>

      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
        {description}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-gray-600 bg-gray-50/80 p-3 rounded-2xl border border-gray-100">
        <div className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
          <span className="truncate font-semibold">{reporter}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
          <span className="truncate">{location}</span>
        </div>
        <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
          <Calendar className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
          <span>{date}</span>
        </div>
      </div>

      {compensationClaimed && compensationClaimed !== 'N/A' && (
        <div className="flex items-center justify-between text-xs px-1">
          <span className="text-gray-500">Loss Claim:</span>
          <strong className="text-[#063B2A] font-extrabold">{compensationClaimed}</strong>
        </div>
      )}

      {/* Buttons */}
      <div className="pt-2 flex items-center gap-2">
        <Link
          to={`/admin/complaints/${id}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-bold bg-gray-100 hover:bg-emerald-50 text-gray-800 hover:text-emerald-800 transition-colors border border-gray-200"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View</span>
        </Link>

        {status !== 'Verified' && status !== 'Resolved' && onVerify && (
          <button
            onClick={() => onVerify(id)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-bold bg-[#10B981] hover:bg-[#0ea371] text-white shadow-xs transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verify</span>
          </button>
        )}

        {onUpdateStatus && (
          <button
            onClick={() => onUpdateStatus(complaint)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-bold bg-[#063B2A] hover:bg-[#084a35] text-white shadow-xs transition-colors"
          >
            <span>Update</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ComplaintCard;

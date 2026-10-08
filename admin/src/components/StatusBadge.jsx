import React from 'react';
import { 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  CheckCheck, 
  XCircle, 
  AlertTriangle,
  MinusCircle,
  EyeOff
} from 'lucide-react';

const StatusBadge = ({ status, priority, size = 'sm', className = '' }) => {
  const norm = (status || priority || '').toLowerCase().trim();

  let config = {
    bg: 'bg-amber-100 text-amber-900 border-amber-300',
    icon: Clock,
    label: status || priority || 'Pending'
  };

  if (norm === 'pending' || norm === 'pending verification') {
    config = {
      bg: 'bg-amber-100 text-amber-900 border-amber-300',
      icon: Clock,
      label: status || 'Pending'
    };
  } else if (norm === 'under review') {
    config = {
      bg: 'bg-blue-100 text-blue-900 border-blue-300',
      icon: AlertCircle,
      label: 'Under Review'
    };
  } else if (norm === 'verified') {
    config = {
      bg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      icon: CheckCircle2,
      label: 'Verified'
    };
  } else if (norm === 'resolved') {
    config = {
      bg: 'bg-teal-100 text-teal-900 border-teal-300',
      icon: CheckCheck,
      label: 'Resolved'
    };
  } else if (norm === 'rejected') {
    config = {
      bg: 'bg-rose-100 text-rose-900 border-rose-300',
      icon: XCircle,
      label: 'Rejected'
    };
  } else if (norm === 'hidden') {
    config = {
      bg: 'bg-gray-100 text-gray-800 border-gray-300',
      icon: EyeOff,
      label: 'Hidden'
    };
  } else if (norm === 'active') {
    config = {
      bg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      icon: CheckCircle2,
      label: 'Active'
    };
  } else if (norm === 'inactive') {
    config = {
      bg: 'bg-gray-100 text-gray-700 border-gray-300',
      icon: MinusCircle,
      label: 'Inactive'
    };
  } else if (norm === 'critical') {
    config = {
      bg: 'bg-rose-100 text-rose-900 border-rose-300 font-extrabold',
      icon: AlertTriangle,
      label: 'Critical'
    };
  } else if (norm === 'high') {
    config = {
      bg: 'bg-amber-100 text-amber-900 border-amber-300',
      icon: AlertCircle,
      label: 'High'
    };
  } else if (norm === 'medium') {
    config = {
      bg: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: Clock,
      label: 'Medium'
    };
  } else if (norm === 'low') {
    config = {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      icon: CheckCircle2,
      label: 'Low'
    };
  }

  const IconComponent = config.icon;
  const sizeClasses = size === 'xs' 
    ? 'text-[10px] px-2 py-0.5 gap-1' 
    : 'text-xs px-2.5 py-1 gap-1.5';

  return (
    <span
      className={`inline-flex items-center font-bold rounded-full border shadow-xs select-none ${sizeClasses} ${config.bg} ${className}`}
    >
      <IconComponent className={size === 'xs' ? 'w-3 h-3 shrink-0' : 'w-3.5 h-3.5 shrink-0'} />
      <span>{config.label}</span>
    </span>
  );
};

export default StatusBadge;

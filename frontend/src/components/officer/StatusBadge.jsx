import React from 'react';
import { 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  CheckCheck, 
  XCircle, 
  AlertCircle 
} from 'lucide-react';

const StatusBadge = ({ status, size = 'sm', className = '' }) => {
  const normStatus = (status || '').toLowerCase().trim();

  let config = {
    bg: 'bg-amber-100 text-amber-800 border-amber-200',
    icon: Clock,
    label: status || 'Pending'
  };

  if (normStatus === 'pending' || normStatus === 'pending verification') {
    config = {
      bg: 'bg-amber-100 text-amber-900 border-amber-300',
      icon: Clock,
      label: status || 'Pending'
    };
  } else if (normStatus === 'under review') {
    config = {
      bg: 'bg-blue-100 text-blue-900 border-blue-300',
      icon: AlertCircle,
      label: 'Under Review'
    };
  } else if (normStatus === 'verified' || normStatus === 'verified threat') {
    config = {
      bg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      icon: CheckCircle2,
      label: status || 'Verified'
    };
  } else if (normStatus === 'resolved') {
    config = {
      bg: 'bg-teal-100 text-teal-900 border-teal-300',
      icon: CheckCheck,
      label: 'Resolved'
    };
  } else if (normStatus === 'rejected') {
    config = {
      bg: 'bg-rose-100 text-rose-900 border-rose-300',
      icon: XCircle,
      label: 'Rejected'
    };
  } else if (normStatus === 'active') {
    config = {
      bg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      icon: CheckCircle2,
      label: 'Active'
    };
  } else if (normStatus === 'inactive') {
    config = {
      bg: 'bg-gray-100 text-gray-700 border-gray-300',
      icon: XCircle,
      label: 'Inactive'
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
      <IconComponent className={size === 'xs' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span>{config.label}</span>
    </span>
  );
};

export default StatusBadge;

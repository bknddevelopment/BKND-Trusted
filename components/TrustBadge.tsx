'use client';

import { CheckBadgeIcon, ShieldCheckIcon, StarIcon, ClockIcon } from '@heroicons/react/24/solid';

interface TrustBadgeProps {
  type: 'verified' | 'insured' | 'licensed' | 'rated' | 'fast';
  label: string;
  value?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function TrustBadge({ type, label, value, size = 'md' }: TrustBadgeProps) {
  const getIcon = () => {
    switch (type) {
      case 'verified':
        return <CheckBadgeIcon className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6'} text-trust-verified`} />;
      case 'insured':
      case 'licensed':
        return <ShieldCheckIcon className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6'} text-trust-action`} />;
      case 'rated':
        return <StarIcon className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6'} text-trust-gold`} />;
      case 'fast':
        return <ClockIcon className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6'} text-trust-action`} />;
      default:
        return null;
    }
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <div className={`inline-flex items-center gap-2 bg-white rounded-full shadow-md ${sizeClasses[size]} animate-fade-in`}>
      {getIcon()}
      <div className="flex flex-col">
        <span className="font-semibold text-trust-deep">{label}</span>
        {value && <span className="text-gray-600">{value}</span>}
      </div>
    </div>
  );
}
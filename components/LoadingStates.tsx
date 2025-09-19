'use client';

interface LoadingProps {
  type?: 'pulse' | 'spinner' | 'dots' | 'progress' | 'skeleton';
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning';
  className?: string;
}

export function LoadingPulse({ size = 'md', color = 'primary', className = '' }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const colorClasses = {
    primary: 'bg-trust-action',
    success: 'bg-trust-verified',
    warning: 'bg-trust-gold',
  };

  return (
    <div className={`loading-pulse ${sizeClasses[size]} ${colorClasses[color]} ${className}`} />
  );
}

export function LoadingSpinner({ size = 'md', color = 'primary', className = '' }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-4',
    lg: 'w-16 h-16 border-4',
  };

  const colorClasses = {
    primary: 'border-t-trust-action',
    success: 'border-t-trust-verified',
    warning: 'border-t-trust-gold',
  };

  return (
    <div className={`loading-spinner ${sizeClasses[size]} ${colorClasses[color]} ${className}`} />
  );
}

export function LoadingDots({ size = 'md', color = 'primary', className = '' }: LoadingProps) {
  const sizeClasses = {
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3',
  };

  const dotSizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  const colorClasses = {
    primary: 'bg-trust-action',
    success: 'bg-trust-verified',
    warning: 'bg-trust-gold',
  };

  return (
    <div className={`loading-dots ${sizeClasses[size]} ${className}`}>
      <div className={`loading-dot ${dotSizeClasses[size]} ${colorClasses[color]}`} />
      <div className={`loading-dot ${dotSizeClasses[size]} ${colorClasses[color]}`} />
      <div className={`loading-dot ${dotSizeClasses[size]} ${colorClasses[color]}`} />
    </div>
  );
}

export function LoadingProgress({ className = '' }: LoadingProps) {
  return (
    <div className={`loading-progress ${className}`}>
      <div className="loading-progress-bar" />
    </div>
  );
}

export function LoadingSkeleton({
  className = '',
  width = '100%',
  height = '20px',
  rounded = 'rounded-lg'
}: LoadingProps & { width?: string; height?: string; rounded?: string }) {
  return (
    <div
      className={`skeleton ${rounded} ${className}`}
      style={{ width, height }}
    />
  );
}

// Composite loading component
export default function Loading({ type = 'spinner', ...props }: LoadingProps) {
  switch (type) {
    case 'pulse':
      return <LoadingPulse {...props} />;
    case 'dots':
      return <LoadingDots {...props} />;
    case 'progress':
      return <LoadingProgress {...props} />;
    case 'skeleton':
      return <LoadingSkeleton {...props} />;
    case 'spinner':
    default:
      return <LoadingSpinner {...props} />;
  }
}
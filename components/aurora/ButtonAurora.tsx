'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonAuroraProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'aurora' | 'metal' | 'jade' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  loading?: boolean;
  glowEffect?: boolean;
  children: ReactNode;
}

export default function ButtonAurora({
  variant = 'aurora',
  size = 'md',
  icon,
  iconPosition = 'right',
  fullWidth = false,
  loading = false,
  glowEffect = true,
  children,
  className = '',
  disabled,
  onClick,
  type,
  ...rest
}: ButtonAuroraProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    aurora: 'btn-aurora',
    metal: 'btn-metal',
    jade: 'btn-jade',
    glass: 'btn-glass'
  };

  const baseClasses = `
    relative inline-flex items-center justify-center
    font-semibold rounded-xl
    transition-all duration-300
    transform-gpu
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;

  const variantStyles = {
    aurora: {
      background: 'linear-gradient(135deg, #6366F1, #818CF8)',
      color: 'white',
      boxShadow: glowEffect ? '0 4px 15px rgba(99, 102, 241, 0.3)' : undefined
    },
    metal: {
      background: 'linear-gradient(90deg, #FFB340 0%, #FFD4A3 20%, #FFB340 40%, #E85D04 60%, #FFB340 80%, #FFD4A3 100%)',
      backgroundSize: '200% 100%',
      color: 'white',
      boxShadow: glowEffect ? '0 4px 15px rgba(255, 179, 64, 0.3)' : undefined
    },
    jade: {
      background: 'linear-gradient(135deg, #10B981, #34D399)',
      color: 'white',
      boxShadow: glowEffect ? '0 4px 15px rgba(16, 185, 129, 0.3)' : undefined
    },
    glass: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      color: 'white',
      boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)'
    }
  };

  const hoverAnimation = {
    scale: disabled || loading ? 1 : 1.05,
    y: disabled || loading ? 0 : -2,
    boxShadow: glowEffect && !disabled && !loading
      ? variant === 'aurora' ? '0 8px 25px rgba(99, 102, 241, 0.4)'
      : variant === 'metal' ? '0 8px 25px rgba(255, 179, 64, 0.5)'
      : variant === 'jade' ? '0 8px 25px rgba(16, 185, 129, 0.4)'
      : '0 12px 40px rgba(31, 38, 135, 0.15)'
      : undefined
  };

  const tapAnimation = {
    scale: disabled || loading ? 1 : 0.98
  };

  return (
    <motion.button
      className={baseClasses}
      style={variantStyles[variant]}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25
      }}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
    >
      {/* Shimmer overlay for metal variant */}
      {variant === 'metal' && (
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-metal-shine" />
        </div>
      )}

      {/* Aurora glow pulse */}
      {variant === 'aurora' && glowEffect && (
        <div className="absolute -inset-1 bg-gradient-to-r from-aurora-purple to-aurora-glow rounded-xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500 pointer-events-none" />
      )}

      {/* Content container */}
      <span className="relative z-10 flex items-center gap-2">
        {loading ? (
          <div className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </div>
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span className="w-5 h-5">{icon}</span>
            )}
            {children}
            {icon && iconPosition === 'right' && (
              <span className="w-5 h-5">{icon}</span>
            )}
          </>
        )}
      </span>

      {/* Focus ring */}
      <span
        className={`absolute inset-0 rounded-xl ring-2 ring-offset-2 ring-offset-midnight-deep opacity-0 focus-visible:opacity-100 transition-opacity
          ${variant === 'aurora' ? 'ring-indigo-500'
            : variant === 'metal' ? 'ring-amber-400'
            : variant === 'jade' ? 'ring-emerald-500'
            : 'ring-white/50'}
        `}
        aria-hidden="true"
      />
    </motion.button>
  );
}
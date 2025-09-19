'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  variant?: 'default' | 'gold' | 'jade' | 'aurora';
  hoverable?: boolean;
  className?: string;
  delay?: number;
}

export default function GlassCard({
  children,
  variant = 'default',
  hoverable = true,
  className = '',
  delay = 0
}: GlassCardProps) {
  const variantClasses = {
    default: 'glass-card',
    gold: 'glass-card-gold',
    jade: 'glass-card-jade',
    aurora: 'glass-card-aurora'
  };

  const baseClasses = `
    relative overflow-hidden rounded-2xl p-6
    backdrop-filter backdrop-blur-md
    border transition-all duration-400
    ${variantClasses[variant]}
    ${hoverable ? 'card-aurora-hover cursor-pointer' : ''}
    ${className}
  `;

  const glassStyles = {
    default: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      borderColor: 'rgba(255, 255, 255, 0.18)',
      boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1)'
    },
    gold: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 179, 64, 0.05) 100%)',
      borderColor: 'rgba(255, 179, 64, 0.2)',
      boxShadow: '0 8px 32px rgba(31, 38, 135, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.1)'
    },
    jade: {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(16, 185, 129, 0.03) 100%)',
      borderColor: 'rgba(16, 185, 129, 0.2)',
      boxShadow: '0 8px 32px rgba(16, 185, 129, 0.1)'
    },
    aurora: {
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(129, 140, 248, 0.05) 100%)',
      borderColor: 'rgba(99, 102, 241, 0.2)',
      boxShadow: '0 8px 32px rgba(99, 102, 241, 0.15)'
    }
  };

  const hoverStyles = hoverable ? {
    whileHover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    whileTap: {
      scale: 0.98
    }
  } : {};

  return (
    <motion.div
      className={baseClasses}
      style={glassStyles[variant]}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      {...hoverStyles}
    >
      {/* Shimmer effect for gold variant */}
      {variant === 'gold' && (
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-600">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-metal-gold/20 to-transparent animate-metal-shine" />
        </div>
      )}

      {/* Aurora glow effect */}
      {variant === 'aurora' && (
        <div className="absolute -inset-1 bg-gradient-to-r from-aurora-purple to-aurora-glow opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
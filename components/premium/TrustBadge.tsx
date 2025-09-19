'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckBadgeIcon,
  ShieldCheckIcon,
  StarIcon,
  BoltIcon,
  LockClosedIcon,
  TrophyIcon,
  ClockIcon,
  SparklesIcon
} from '@heroicons/react/24/solid';

interface TrustBadgeProps {
  type: 'verified' | 'licensed' | 'insured' | 'bonded' | 'top-rated' | 'fast-response' | 'premium' | 'secure';
  label: string;
  size?: 'sm' | 'md' | 'lg';
  showAnimation?: boolean;
  glowEffect?: boolean;
  floatingParticles?: boolean;
}

export default function TrustBadge({
  type,
  label,
  size = 'md',
  showAnimation = true,
  glowEffect = true,
  floatingParticles = false
}: TrustBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [particleCount] = useState(5);

  const getIcon = () => {
    switch (type) {
      case 'verified':
        return CheckBadgeIcon;
      case 'licensed':
      case 'insured':
      case 'bonded':
        return ShieldCheckIcon;
      case 'top-rated':
        return TrophyIcon;
      case 'fast-response':
        return BoltIcon;
      case 'premium':
        return SparklesIcon;
      case 'secure':
        return LockClosedIcon;
      default:
        return StarIcon;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'verified':
      case 'licensed':
      case 'insured':
      case 'bonded':
      case 'secure':
        return {
          bg: 'from-emerald-500/20 to-green-500/20',
          border: 'border-trust-verified/30',
          text: 'text-trust-verified',
          glow: 'shadow-[0_0_20px_rgba(16,185,129,0.4)]',
          particle: 'bg-trust-verified'
        };
      case 'top-rated':
      case 'premium':
        return {
          bg: 'from-amber-500/20 to-yellow-500/20',
          border: 'border-trust-gold/30',
          text: 'text-trust-gold',
          glow: 'shadow-[0_0_20px_rgba(245,158,11,0.4)]',
          particle: 'bg-trust-gold'
        };
      case 'fast-response':
        return {
          bg: 'from-blue-500/20 to-cyan-500/20',
          border: 'border-trust-action/30',
          text: 'text-trust-action',
          glow: 'shadow-[0_0_20px_rgba(30,64,175,0.4)]',
          particle: 'bg-trust-action'
        };
      default:
        return {
          bg: 'from-gray-500/20 to-slate-500/20',
          border: 'border-gray-300/30',
          text: 'text-gray-700',
          glow: 'shadow-[0_0_20px_rgba(100,116,139,0.3)]',
          particle: 'bg-gray-500'
        };
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'lg':
        return 'px-5 py-2.5 text-base';
      default:
        return 'px-3 py-1.5 text-sm';
    }
  };

  const Icon = getIcon();
  const colors = getColors();
  const sizeClasses = getSizeClasses();
  const iconSize = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

  // Floating animation variants
  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [-2, 2, -2],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Pulse animation for the icon
  const pulseVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Particle animation
  const particleVariants = {
    initial: {
      opacity: 0,
      scale: 0,
      x: 0,
      y: 0
    },
    animate: (i: number) => ({
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: [0, (Math.random() - 0.5) * 50],
      y: [0, -20 - Math.random() * 30],
      transition: {
        duration: 1.5,
        delay: i * 0.1,
        repeat: Infinity,
        repeatDelay: 1
      }
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      variants={showAnimation ? floatVariants : undefined}
      whileHover={{ scale: 1.05, rotate: [-1, 1, -1, 0] }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative inline-block"
    >
      {/* Main badge container */}
      <div className={`
        relative inline-flex items-center gap-1.5 font-semibold rounded-full
        backdrop-blur-sm border transition-all duration-300 cursor-pointer
        ${sizeClasses}
        ${colors.border}
        ${colors.text}
        ${glowEffect && isHovered ? colors.glow : ''}
        overflow-hidden
      `}>
        {/* Animated gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${colors.bg} opacity-60`}
          animate={isHovered ? { opacity: [0.6, 0.8, 0.6] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/0 to-white/10 rounded-full" />

        {/* Shimmer effect on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              exit={{ x: '200%' }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
            />
          )}
        </AnimatePresence>

        {/* Icon with animation */}
        <motion.div
          variants={showAnimation ? pulseVariants : undefined}
          animate={isHovered ? "pulse" : "initial"}
          className="relative z-10"
        >
          <Icon className={`${iconSize} drop-shadow-sm`} />
        </motion.div>

        {/* Label */}
        <span className="relative z-10 font-semibold">{label}</span>

        {/* Floating particles on hover */}
        {floatingParticles && isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(particleCount)].map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="initial"
                animate="animate"
                variants={particleVariants}
                className={`absolute left-1/2 top-1/2 w-1 h-1 rounded-full ${colors.particle}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Outer glow ring on hover */}
      <AnimatePresence>
        {glowEffect && isHovered && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 rounded-full border-2 ${colors.border} pointer-events-none`}
          />
        )}
      </AnimatePresence>

      {/* Premium sparkle effect for certain types */}
      {(type === 'premium' || type === 'top-rated') && showAnimation && (
        <div className="absolute -top-1 -right-1">
          <motion.div
            animate={{
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <SparklesIcon className="w-3 h-3 text-trust-gold drop-shadow-[0_0_4px_rgba(245,158,11,0.6)]" />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
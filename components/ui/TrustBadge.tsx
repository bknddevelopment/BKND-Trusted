'use client'

import React, { useEffect, useState } from 'react'

interface TrustBadgeProps {
  variant?: 'verified' | 'premium' | 'live' | 'secure'
  children: React.ReactNode
  animate?: boolean
  count?: number
  showPulse?: boolean
}

export function TrustBadge({
  variant = 'verified',
  children,
  animate = true,
  count,
  showPulse = false
}: TrustBadgeProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const getVariantStyles = () => {
    switch (variant) {
      case 'verified':
        return 'bg-trust-verified/10 text-trust-verified border-trust-verified/20'
      case 'premium':
        return 'bg-trust-gold/10 text-trust-gold border-trust-gold/20 shadow-gold-glow'
      case 'live':
        return 'bg-status-error/10 text-status-error border-status-error/20'
      case 'secure':
        return 'bg-trust-action/10 text-trust-action border-trust-action/20'
      default:
        return ''
    }
  }

  const getIcon = () => {
    switch (variant) {
      case 'verified':
        return (
          <svg
            className={`w-4 h-4 ${animate && isVisible ? 'animate-check-bounce' : ''}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )
      case 'premium':
        return (
          <svg
            className={`w-4 h-4 ${animate ? 'animate-badge-float' : ''}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )
      case 'live':
        return (
          <span className={`w-2 h-2 rounded-full bg-current ${showPulse ? 'animate-trust-pulse' : ''}`} />
        )
      case 'secure':
        return (
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )
    }
  }

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold
        border transition-all duration-300
        ${getVariantStyles()}
        ${animate && isVisible ? 'animate-slide-in-right' : ''}
        ${animate ? 'hover:scale-105' : ''}
      `}
      role="status"
      aria-live="polite"
    >
      {getIcon()}
      <span>{children}</span>
      {count !== undefined && (
        <span className="ml-1 px-1.5 py-0.5 bg-current/10 rounded-full text-xs font-bold">
          {count}
        </span>
      )}
    </span>
  )
}
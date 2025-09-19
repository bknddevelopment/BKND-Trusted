'use client'

import React, { useEffect, useState } from 'react'

interface LiveStatusProps {
  initialViewers?: number
  location?: string
  responseTime?: number
}

export function LiveStatus({
  initialViewers = 3,
  location = 'San Francisco',
  responseTime = 42
}: LiveStatusProps) {
  const [viewers, setViewers] = useState(initialViewers)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Simulate real-time viewer count changes
    const interval = setInterval(() => {
      const change = Math.random() > 0.5 ? 1 : -1
      setViewers(prev => Math.max(1, Math.min(10, prev + change)))
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 500)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center text-sm">
      {/* Live viewers */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-status-error/10 rounded-full border border-status-error/20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-error opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-status-error"></span>
        </span>
        <span className="font-medium text-text-secondary">
          <span className={`${isAnimating ? 'animate-number-roll' : ''}`}>
            {viewers}
          </span> people viewing now
        </span>
      </div>

      {/* Response time */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-trust-verified/10 rounded-full border border-trust-verified/20">
        <svg className="w-4 h-4 text-trust-verified" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
        <span className="font-medium text-text-secondary">
          {responseTime}ms response time
        </span>
      </div>

      {/* Location indicator */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-trust-action/10 rounded-full border border-trust-action/20">
        <svg className="w-4 h-4 text-trust-action" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        <span className="font-medium text-text-secondary">
          Serving from {location}
        </span>
      </div>
    </div>
  )
}
'use client';

import { memo, useState, useCallback } from 'react';
import Image from 'next/image';
import { StarIcon, ClockIcon, MapPinIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
import { Business } from '@/lib/types';

// Simple requestIdleCallback polyfill
const requestIdleCallback = typeof window !== 'undefined' && window.requestIdleCallback
  ? window.requestIdleCallback
  : (cb: IdleRequestCallback) => setTimeout(cb, 1);

interface OptimizedBusinessCardProps {
  business: Business;
  priority?: boolean; // Load images with priority for above-fold cards
  lazy?: boolean; // Enable lazy loading
}

// Memoized badge component to prevent re-renders
const Badge = memo(({ badge }: { badge: { type: string; label: string } }) => {
  const getStyles = () => {
    switch (badge.type) {
      case 'verified':
        return 'bg-trust-verified/10 text-trust-verified';
      case 'top-rated':
        return 'bg-trust-gold/10 text-trust-gold';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${getStyles()}`}
      style={{ contain: 'layout style paint' }}
    >
      {badge.label}
    </span>
  );
});

Badge.displayName = 'Badge';

// Memoized stat component
const Stat = memo(({ value, label }: { value: string | number; label: string }) => (
  <div className="text-center" style={{ contain: 'layout style paint' }}>
    <p className="text-lg font-bold text-trust-deep">
      {typeof value === 'number' ? value.toLocaleString() : value}
    </p>
    <p className="text-xs text-gray-600">{label}</p>
  </div>
));

Stat.displayName = 'Stat';

// Main optimized business card with performance enhancements
const OptimizedBusinessCard = memo(({
  business,
  priority = false,
  lazy = true
}: OptimizedBusinessCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Debounced hover handlers to reduce state updates
  const handleMouseEnter = useCallback(() => {
    requestIdleCallback(() => {
      setIsHovered(true);
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    requestIdleCallback(() => {
      setIsHovered(false);
    });
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <article
      className="bg-white rounded-xl shadow-lg overflow-hidden group gpu-accelerated card-hover-optimized"
      style={{
        contain: 'layout style paint',
        willChange: isHovered ? 'transform, box-shadow' : 'auto',
        transform: isHovered ? 'translateY(-2px) translateZ(0)' : 'translateZ(0)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isHovered
          ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={`Business card for ${business.name}`}
    >
      {/* Optimized Image Section */}
      <div
        className="relative h-48 overflow-hidden bg-gray-100"
        style={{ aspectRatio: '16/9' }}
      >
        {/* Skeleton loader while image loads */}
        {!imageLoaded && (
          <div className="absolute inset-0 skeleton-optimized" />
        )}

        <Image
          src={business.image}
          alt={business.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-all duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ transform: 'translateZ(0)' }}
          priority={priority}
          loading={lazy ? 'lazy' : 'eager'}
          onLoad={handleImageLoad}
        />

        {/* Badges overlay */}
        {business.featured && (
          <div
            className="absolute top-3 left-3 px-3 py-1 bg-trust-gold text-white text-sm font-semibold rounded-full shadow-lg"
            style={{ contain: 'layout style paint' }}
          >
            Featured
          </div>
        )}

        {business.availability === 'available' && (
          <div
            className="absolute top-3 right-3 px-3 py-1 bg-trust-verified text-white text-sm font-semibold rounded-full shadow-lg animate-trust-pulse-optimized"
            style={{ contain: 'layout style paint' }}
          >
            Available Now
          </div>
        )}
      </div>

      {/* Optimized Content Section */}
      <div className="p-5" style={{ contain: 'layout style' }}>
        {/* Header */}
        <header className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-trust-deep flex items-center gap-2">
              {business.name}
              {business.verified && (
                <CheckBadgeIcon
                  className="w-5 h-5 text-trust-verified flex-shrink-0"
                  aria-label="Verified business"
                />
              )}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{business.category}</p>
          </div>
        </header>

        {/* Rating - Optimized with reduced layout calculations */}
        <div className="flex items-center gap-3 mb-3" style={{ contain: 'layout' }}>
          <div className="flex items-center gap-1">
            <StarIcon className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <span className="font-bold text-trust-deep">{business.rating}</span>
          </div>
          <span className="text-sm text-gray-600">({business.reviewCount} reviews)</span>
        </div>

        {/* Badges - Limited to 3 for performance */}
        <div className="flex flex-wrap gap-2 mb-3" style={{ contain: 'layout' }}>
          {business.badges.slice(0, 3).map((badge) => (
            <Badge key={badge.type} badge={badge} />
          ))}
        </div>

        {/* Info - Using CSS Grid for better performance */}
        <div className="grid gap-2 mb-4" style={{ contain: 'layout' }}>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPinIcon className="w-4 h-4 flex-shrink-0" />
            <span>{business.location.city}, {business.location.state}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ClockIcon className="w-4 h-4 flex-shrink-0" />
            <span>Response time: {business.responseTime}</span>
          </div>
        </div>

        {/* Description with line clamping for performance */}
        <p
          className="text-sm text-gray-600 mb-4 line-clamp-2"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {business.description}
        </p>

        {/* Stats - Memoized components */}
        <div
          className="flex items-center justify-between pt-3 border-t"
          style={{ contain: 'layout' }}
        >
          <Stat value={business.completedJobs} label="Jobs Done" />
          <Stat value={business.yearsInBusiness} label="Years Exp." />
          <Stat value={business.priceRange} label="Price Range" />
        </div>

        {/* CTA Button - Optimized interactions */}
        <button
          className="w-full mt-4 py-3 bg-trust-action text-white font-semibold rounded-lg btn-optimized"
          style={{
            contain: 'layout style paint',
            willChange: isHovered ? 'transform' : 'auto'
          }}
          aria-label={`Get free quote from ${business.name}`}
        >
          Get Free Quote
        </button>
      </div>
    </article>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for memo
  return (
    prevProps.business.id === nextProps.business.id &&
    prevProps.priority === nextProps.priority &&
    prevProps.lazy === nextProps.lazy
  );
});

OptimizedBusinessCard.displayName = 'OptimizedBusinessCard';

export default OptimizedBusinessCard;
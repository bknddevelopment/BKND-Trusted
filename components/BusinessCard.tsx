'use client';

import Image from 'next/image';
import { StarIcon, ClockIcon, MapPinIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
import { Business } from '@/lib/types';

interface BusinessCardProps {
  business: Business;
}

export default function BusinessCard({ business }: BusinessCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={business.image}
          alt={business.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {business.featured && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-trust-gold text-trust-deep text-sm font-semibold rounded-full shadow-lg" aria-label="Featured business">
            Featured
          </div>
        )}
        {business.availability === 'available' && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-trust-verified text-white text-sm font-semibold rounded-full shadow-lg animate-trust-pulse" aria-label="Business is available now">
            Available Now
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-trust-deep flex items-center gap-2">
              {business.name}
              {business.verified && (
                <CheckBadgeIcon className="w-5 h-5 text-trust-verified-dark" aria-label="Verified business" />
              )}
            </h3>
            <p className="text-sm text-text-secondary mt-1">{business.category}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1">
            <StarIcon className="w-5 h-5 text-trust-gold" aria-hidden="true" />
            <span className="font-bold text-trust-deep">{business.rating}</span>
          </div>
          <span className="text-sm text-text-secondary">({business.reviewCount} reviews)</span>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          {business.badges.slice(0, 3).map((badge) => (
            <span
              key={badge.type}
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                badge.type === 'verified'
                  ? 'bg-trust-verified/10 text-trust-verified-dark'
                  : badge.type === 'top-rated'
                  ? 'bg-trust-gold/10 text-trust-gold-text'
                  : 'bg-surface-subtle text-text-secondary'
              }`}
            >
              {badge.label}
            </span>
          ))}
        </div>

        {/* Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <MapPinIcon className="w-4 h-4" aria-hidden="true" />
            <span>{business.location.city}, {business.location.state}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <ClockIcon className="w-4 h-4" aria-hidden="true" />
            <span>Response time: {business.responseTime}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {business.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="text-center">
            <p className="text-lg font-bold text-trust-deep">{business.completedJobs.toLocaleString()}</p>
            <p className="text-xs text-text-muted">Jobs Done</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-trust-deep">{business.yearsInBusiness}</p>
            <p className="text-xs text-text-muted">Years Exp.</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-trust-deep">{business.priceRange}</p>
            <p className="text-xs text-text-muted">Price Range</p>
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full mt-4 py-3 bg-trust-action hover:bg-trust-action-hover text-white font-semibold rounded-lg transition-all transform hover:scale-105" aria-label={`Get free quote from ${business.name}`}>
          Get Free Quote
        </button>
      </div>
    </div>
  );
}
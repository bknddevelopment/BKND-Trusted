import React from 'react';
import { Star, MapPin, Clock, Shield, ChevronRight, TrendingUp } from 'lucide-react';
import { Business } from '../types';
import { motion } from 'framer-motion';

interface BusinessCardProps {
  business: Business;
  onClick?: () => void;
  variant?: 'default' | 'compact' | 'featured';
}

export const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  onClick,
  variant = 'default'
}) => {
  const getTrustThermometerColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    if (score >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const formatPrice = (range: { min: number; max: number; unit: string }) => {
    const unitLabel = range.unit === 'hour' ? '/hr' : `/${range.unit}`;
    return `$${range.min}-${range.max}${unitLabel}`;
  };

  if (variant === 'compact') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="card p-4 cursor-pointer border border-gray-100"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg text-gray-900">{business.name}</h3>
              {business.verified && (
                <Shield className="w-4 h-4 text-blue-600" />
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                {business.rating.toFixed(1)}
              </span>
              <span>({business.reviews} reviews)</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {business.location.city}
              </span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`card overflow-hidden cursor-pointer transition-all duration-300 ${
        variant === 'featured' ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      }`}
    >
      {/* Image Section */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {business.images[0] ? (
          <img
            src={business.images[0]}
            alt={business.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <span className="text-4xl font-bold text-gray-400">
              {business.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {/* Featured Badge */}
        {variant === 'featured' && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}

        {/* Trust Thermometer Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <div className="text-white text-xs mb-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Trust Score
              </div>
              <div className="bg-white/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${business.trustScore}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className={`h-full ${getTrustThermometerColor(business.trustScore)} transition-all duration-500`}
                />
              </div>
            </div>
            <div className="text-white font-bold text-lg">
              {business.trustScore}%
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                {business.name}
              </h3>
              {business.verified && (
                <div className="group relative">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    Verified Business
                  </div>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">
              {business.description}
            </p>
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(business.rating)
                    ? 'text-yellow-500 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-1 text-sm font-medium text-gray-700">
              {business.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-sm text-gray-600">
            ({business.reviews} reviews)
          </span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{business.location.city}, {business.location.state}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{business.responseTime}</span>
          </div>
        </div>

        {/* Price Range */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-600">Price Range:</span>
          <span className="font-semibold text-green-600">
            {formatPrice(business.priceRange)}
          </span>
        </div>

        {/* Badges */}
        {business.badges.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {business.badges.slice(0, 3).map((badge, index) => (
              <span
                key={index}
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  badge.type === 'verified' ? 'bg-blue-100 text-blue-700' :
                  badge.type === 'top-rated' ? 'bg-yellow-100 text-yellow-700' :
                  badge.type === 'quick-responder' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-700'
                }`}
              >
                {badge.label}
              </span>
            ))}
            {business.badges.length > 3 && (
              <span className="text-xs px-2 py-1 text-gray-500">
                +{business.badges.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* CTA Button */}
        <button className="w-full btn-primary text-sm">
          Get Quote
        </button>
      </div>
    </motion.div>
  );
};
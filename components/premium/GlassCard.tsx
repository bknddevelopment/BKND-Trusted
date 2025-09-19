'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { StarIcon, ClockIcon, MapPinIcon, CheckBadgeIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { Business } from '@/lib/types';

interface GlassCardProps {
  business: Business;
  variant?: 'default' | 'featured' | 'premium';
}

export default function GlassCard({ business, variant = 'default' }: GlassCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'featured':
        return 'ring-2 ring-trust-gold/30 before:opacity-100';
      case 'premium':
        return 'ring-2 ring-trust-verified/30 before:opacity-100';
      default:
        return '';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative overflow-hidden rounded-2xl transition-all duration-500
        backdrop-blur-xl bg-white/70 dark:bg-gray-900/70
        border border-white/20 dark:border-gray-700/30
        hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]
        hover:translate-y-[-4px]
        before:absolute before:inset-0 before:bg-gradient-to-br
        before:from-white/10 before:via-transparent before:to-transparent
        before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500
        after:absolute after:inset-0 after:rounded-2xl
        after:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]
        group
        ${getVariantClasses()}
      `}
      style={{
        background: isHovered
          ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(30, 64, 175, 0.05), transparent 50%), rgba(255, 255, 255, 0.7)`
          : 'rgba(255, 255, 255, 0.7)',
      }}
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-trust-action via-trust-verified to-trust-gold opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10" />

      {/* Glass reflection effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.2), transparent 40%)`
        }}
      />

      {/* Image Section with Parallax */}
      <div className="relative h-52 overflow-hidden rounded-t-xl">
        <div
          className="absolute inset-0 transition-transform duration-700 will-change-transform"
          style={{
            transform: isHovered
              ? `scale(1.1) translateX(${(mousePosition.x - 50) * 0.1}px) translateY(${(mousePosition.y - 50) * 0.1}px)`
              : 'scale(1)'
          }}
        >
          <Image
            src={business.image}
            alt={business.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

        {/* Floating badges with glass effect */}
        {business.featured && (
          <div className="absolute top-4 left-4 px-4 py-2 backdrop-blur-md bg-trust-gold/80 text-white text-sm font-bold rounded-full shadow-lg animate-badge-float flex items-center gap-1">
            <SparklesIcon className="w-4 h-4" />
            Featured
          </div>
        )}

        {business.availability === 'available' && (
          <div className="absolute top-4 right-4 px-4 py-2 backdrop-blur-md bg-trust-verified/80 text-white text-sm font-bold rounded-full shadow-lg animate-pulse flex items-center gap-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            Available Now
          </div>
        )}
      </div>

      {/* Content Section with Glass Effect */}
      <div className="relative p-6 z-10">
        {/* Header with magnetic hover */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-trust-deep to-trust-action bg-clip-text text-transparent flex items-center gap-2 group-hover:from-trust-action group-hover:to-trust-verified transition-all duration-500">
              {business.name}
              {business.verified && (
                <CheckBadgeIcon className="w-6 h-6 text-trust-verified animate-check-bounce" />
              )}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 font-medium">{business.category}</p>
          </div>
        </div>

        {/* Animated Rating with glow */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-sm bg-yellow-50/50 dark:bg-yellow-900/20 border border-yellow-200/30">
            <StarIcon className="w-5 h-5 text-yellow-500 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
            <span className="font-bold text-trust-deep dark:text-white">{business.rating}</span>
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            ({business.reviewCount.toLocaleString()} reviews)
          </span>
        </div>

        {/* Glass badges with hover effects */}
        <div className="flex flex-wrap gap-2 mb-4">
          {business.badges.slice(0, 3).map((badge, index) => (
            <span
              key={badge.type}
              className={`
                px-3 py-1.5 text-xs font-semibold rounded-full
                backdrop-blur-sm border transition-all duration-300
                hover:scale-105 hover:shadow-lg cursor-pointer
                ${badge.type === 'verified'
                  ? 'bg-trust-verified/10 text-trust-verified border-trust-verified/20 hover:bg-trust-verified/20'
                  : badge.type === 'top-rated'
                  ? 'bg-trust-gold/10 text-trust-gold border-trust-gold/20 hover:bg-trust-gold/20'
                  : 'bg-gray-100/50 text-gray-700 border-gray-200/30 hover:bg-gray-100/80'
                }
              `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {badge.label}
            </span>
          ))}
        </div>

        {/* Info with glass cards */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 px-3 py-2 rounded-lg backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 border border-white/10">
            <MapPinIcon className="w-4 h-4 text-trust-action" />
            <span className="font-medium">{business.location.city}, {business.location.state}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 px-3 py-2 rounded-lg backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 border border-white/10">
            <ClockIcon className="w-4 h-4 text-trust-verified" />
            <span className="font-medium">Response time: {business.responseTime}</span>
          </div>
        </div>

        {/* Description with fade effect */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 line-clamp-2 leading-relaxed">
          {business.description}
        </p>

        {/* Stats with 3D flip effect on hover */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { value: business.completedJobs.toLocaleString(), label: 'Jobs Done', color: 'from-blue-500 to-cyan-500' },
            { value: business.yearsInBusiness, label: 'Years Exp.', color: 'from-purple-500 to-pink-500' },
            { value: business.priceRange, label: 'Price Range', color: 'from-green-500 to-emerald-500' }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="group/stat relative rounded-xl backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 border border-white/10 p-3 hover:scale-105 transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative z-10">
                <p className={`text-lg font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
              </div>
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover/stat:opacity-10 rounded-xl transition-opacity duration-300`} />
            </div>
          ))}
        </div>

        {/* Premium CTA Button with ripple effect */}
        <button className="
          relative w-full py-3.5
          bg-gradient-to-r from-trust-action to-trust-action-hover
          text-white font-bold rounded-xl
          transition-all duration-300 transform
          hover:scale-[1.02] hover:shadow-xl
          active:scale-[0.98]
          overflow-hidden group/btn
        ">
          <span className="relative z-10 flex items-center justify-center gap-2">
            Get Free Quote
            <svg className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>

          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-trust-verified to-trust-action opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />

          {/* Ripple effect on hover */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-0 h-0 bg-white/20 rounded-full group-hover/btn:w-full group-hover/btn:h-full transition-all duration-700 ease-out" />
          </div>
        </button>
      </div>
    </div>
  );
}
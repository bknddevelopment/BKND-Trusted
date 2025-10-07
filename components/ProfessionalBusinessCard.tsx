'use client';

import Link from 'next/link';
import Image from 'next/image';
import { StarIcon, CheckBadgeIcon, ShieldCheckIcon, MapPinIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { getBusinessImage, getBlurDataURL } from '@/lib/images';

interface ProfessionalBusinessCardProps {
  business: {
    id: string;
    name: string;
    slug: string;
    category: string;
    rating: number;
    reviewCount: number;
    description: string;
    image?: string;
    distance: number;
    verified: boolean;
    licensed: boolean;
    featured?: boolean;
  };
}

export default function ProfessionalBusinessCard({ business }: ProfessionalBusinessCardProps) {
  return (
    <Link href={`/business/${business.slug}`}>
      <div className="bg-white rounded-xl border border-neutral-200 hover:shadow-xl transition-shadow overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 bg-neutral-100">
          <Image
            src={getBusinessImage(business)}
            alt={business.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={getBlurDataURL(business.category.toLowerCase())}
          />

          {business.featured && (
            <div className="absolute top-3 right-3 bg-featured-400 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
              <SparklesIcon className="w-3 h-3" />
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-h4 text-neutral-900 mb-1 truncate">
                {business.name}
              </h3>
              <p className="text-body-sm text-neutral-500">{business.category}</p>
            </div>
            <div className="flex flex-col items-end ml-3">
              <div className="flex items-center gap-1 mb-1">
                <StarIcon className="w-5 h-5 text-featured-400" />
                <span className="text-lg font-bold text-neutral-900">
                  {business.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-xs text-neutral-500">
                ({business.reviewCount.toLocaleString()})
              </span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {business.verified && (
              <div className="flex items-center gap-1 bg-success-50 text-success-700 px-2 py-1 rounded text-xs font-medium">
                <CheckBadgeIcon className="w-3 h-3" />
                Verified
              </div>
            )}
            {business.licensed && (
              <div className="flex items-center gap-1 bg-brand-50 text-brand-700 px-2 py-1 rounded text-xs font-medium">
                <ShieldCheckIcon className="w-3 h-3" />
                Licensed
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-body-sm text-neutral-600 mb-4 line-clamp-2 flex-1">
            {business.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-100 mt-auto">
            <span className="text-sm text-neutral-500 flex items-center gap-1">
              <MapPinIcon className="w-4 h-4" />
              {business.distance.toFixed(1)} mi away
            </span>
            <span className="text-brand-600 hover:text-brand-700 font-medium text-sm">
              View Profile →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

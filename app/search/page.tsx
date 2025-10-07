'use client';

import type { Metadata } from 'next';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircleIcon, StarIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn, formatNumber } from '@/lib/utils';
import { getBusinessImage, getBlurDataURL } from '@/lib/images';

interface Business {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  licensed: boolean;
  featured?: boolean;
  image?: string;
  description: string;
  distance: number;
  location: {
    city: string;
    state: string;
  };
  responseTime: string;
  projectsCompleted: number;
}

// Mock data - replace with actual API call
const MOCK_BUSINESSES: Business[] = [
  {
    id: '1',
    name: 'Austin Premier Plumbing',
    category: 'Plumbing',
    rating: 4.9,
    reviewCount: 342,
    verified: true,
    licensed: true,
    featured: true,
    description: 'Licensed plumbers serving Austin for over 20 years. Emergency services available 24/7.',
    distance: 2.3,
    location: { city: 'Austin', state: 'TX' },
    responseTime: 'Within 2 hours',
    projectsCompleted: 1250,
  },
  {
    id: '2',
    name: 'Reliable HVAC Solutions',
    category: 'HVAC',
    rating: 4.8,
    reviewCount: 289,
    verified: true,
    licensed: true,
    description: 'Expert HVAC installation, repair, and maintenance. Family-owned business since 1995.',
    distance: 3.7,
    location: { city: 'Austin', state: 'TX' },
    responseTime: 'Same day',
    projectsCompleted: 980,
  },
  {
    id: '3',
    name: 'Elite Electrical Services',
    category: 'Electrical',
    rating: 4.9,
    reviewCount: 412,
    verified: true,
    licensed: true,
    featured: true,
    description: 'Certified electricians for residential and commercial projects. Licensed, bonded, and insured.',
    distance: 4.1,
    location: { city: 'Austin', state: 'TX' },
    responseTime: 'Within 4 hours',
    projectsCompleted: 1567,
  },
  {
    id: '4',
    name: 'Pro Landscaping & Design',
    category: 'Landscaping',
    rating: 4.7,
    reviewCount: 198,
    verified: true,
    licensed: true,
    description: 'Professional landscaping services including design, installation, and maintenance.',
    distance: 5.2,
    location: { city: 'Round Rock', state: 'TX' },
    responseTime: 'Within 1 day',
    projectsCompleted: 645,
  },
  {
    id: '5',
    name: 'Master Painters LLC',
    category: 'Painting',
    rating: 4.8,
    reviewCount: 267,
    verified: true,
    licensed: true,
    description: 'Interior and exterior painting experts. Free estimates and color consultations.',
    distance: 6.8,
    location: { city: 'Cedar Park', state: 'TX' },
    responseTime: 'Within 2 days',
    projectsCompleted: 823,
  },
];

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const service = searchParams.get('service') || '';
  const zipCode = searchParams.get('zip') || '';

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'distance'>('relevance');
  const [filterRating, setFilterRating] = useState<number>(0);

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      let filtered = [...MOCK_BUSINESSES];

      // Filter by service if specified
      if (service) {
        filtered = filtered.filter(b =>
          b.category.toLowerCase().includes(service.toLowerCase()) ||
          b.name.toLowerCase().includes(service.toLowerCase())
        );
      }

      // Filter by rating
      if (filterRating > 0) {
        filtered = filtered.filter(b => b.rating >= filterRating);
      }

      // Sort
      filtered.sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'distance') return a.distance - b.distance;
        // Relevance: featured first, then rating
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
      });

      setBusinesses(filtered);
      setIsLoading(false);
    }, 500);
  }, [service, zipCode, sortBy, filterRating]);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-brand-600">
              BKND Trusted
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">← Back to Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Filters Sidebar */}
          <aside className="col-span-12 lg:col-span-3">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Filters</h3>

                {/* Search Summary */}
                <div className="mb-6 pb-6 border-b border-neutral-200">
                  <div className="text-sm text-neutral-600 mb-2">Searching for:</div>
                  {service && (
                    <div className="text-base font-semibold text-neutral-900 mb-1">
                      {service}
                    </div>
                  )}
                  {zipCode && (
                    <div className="text-sm text-neutral-600">
                      Near {zipCode}
                    </div>
                  )}
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-3">Minimum Rating</label>
                  <div className="space-y-2">
                    {[0, 3, 4, 4.5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setFilterRating(rating)}
                        className={cn(
                          'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                          filterRating === rating
                            ? 'bg-brand-50 text-brand-700 font-semibold'
                            : 'text-neutral-700 hover:bg-neutral-50'
                        )}
                      >
                        {rating === 0 ? (
                          'Any Rating'
                        ) : (
                          <div className="flex items-center gap-2">
                            <StarIcon className="w-4 h-4 text-featured-400" />
                            {rating}+ Stars
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Verification Badges */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-3">Verification</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                      <span className="text-sm">Verified Only</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                      <span className="text-sm">Licensed Only</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Results */}
          <main className="col-span-12 lg:col-span-9">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-h1 text-neutral-900 mb-2">
                  {service ? `${service} Services` : 'Search Results'}
                </h1>
                <p className="text-body text-neutral-600">
                  {isLoading ? (
                    'Searching...'
                  ) : (
                    <>
                      {formatNumber(businesses.length)} verified professionals found
                      {zipCode && ` near ${zipCode}`}
                    </>
                  )}
                </p>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-neutral-600">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="relevance">Relevance</option>
                  <option value="rating">Highest Rated</option>
                  <option value="distance">Closest</option>
                </select>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-6 bg-neutral-200 rounded w-1/3 mb-4"></div>
                      <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Results List */}
            {!isLoading && businesses.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-lg text-neutral-600 mb-4">
                    No results found for &quot;{service}&quot;
                  </p>
                  <Link href="/">
                    <Button variant="primary">Try Another Search</Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {!isLoading && businesses.length > 0 && (
              <div className="space-y-4">
                {businesses.map((business) => (
                  <Card
                    key={business.id}
                    variant="interactive"
                    className="hover:shadow-xl transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        {/* Business Image */}
                        <div className="flex-shrink-0 relative w-32 h-32 rounded-lg overflow-hidden bg-neutral-100">
                          <Image
                            src={getBusinessImage(business)}
                            alt={business.name}
                            fill
                            className="object-cover"
                            sizes="128px"
                            placeholder="blur"
                            blurDataURL={getBlurDataURL(business.category.toLowerCase())}
                          />
                        </div>

                        {/* Business Info */}
                        <div className="flex-1">
                          {/* Top Row */}
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-h3 text-neutral-900">{business.name}</h3>
                                {business.featured && (
                                  <Badge variant="featured" icon={<StarIcon className="w-3 h-3" />}>
                                    Featured
                                  </Badge>
                                )}
                              </div>

                              {/* Rating */}
                              <div className="flex items-center gap-4 mb-2">
                                <div className="flex items-center gap-1">
                                  <StarIcon className="w-5 h-5 text-featured-400" />
                                  <span className="font-bold text-neutral-900">{business.rating}</span>
                                  <span className="text-neutral-600 text-sm">
                                    ({formatNumber(business.reviewCount)} reviews)
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 text-neutral-600 text-sm">
                                  <MapPinIcon className="w-4 h-4" />
                                  {business.distance} mi away
                                </div>
                              </div>

                              {/* Badges */}
                              <div className="flex items-center gap-2 mb-3">
                                {business.verified && (
                                  <Badge variant="verified" icon={<CheckCircleIcon className="w-3 h-3" />}>
                                    Verified
                                  </Badge>
                                )}
                                {business.licensed && (
                                  <Badge variant="licensed">Licensed</Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-body text-neutral-600 mb-4">
                            {business.description}
                          </p>

                          {/* Stats */}
                          <div className="flex items-center gap-6 mb-4 text-sm text-neutral-600">
                            <div>
                              <span className="font-semibold text-neutral-900">
                                {formatNumber(business.projectsCompleted)}
                              </span>{' '}
                              projects completed
                            </div>
                            <div>
                              Response time: <span className="font-semibold text-neutral-900">
                                {business.responseTime}
                              </span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-3">
                            <Button variant="primary" size="md">
                              Get Free Quote
                            </Button>
                            <Button variant="secondary" size="md">
                              View Profile
                            </Button>
                            <Button variant="ghost" size="md">
                              Contact
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Load More */}
            {!isLoading && businesses.length > 0 && (
              <div className="mt-8 text-center">
                <Button variant="secondary" size="lg">
                  Load More Results
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-h2 text-neutral-900 mb-2">Loading...</div>
          <div className="text-body text-neutral-600">Finding verified professionals</div>
        </div>
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}

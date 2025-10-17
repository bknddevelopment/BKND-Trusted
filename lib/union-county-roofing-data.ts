/**
 * Union County Roofing Contractors Data
 * Manually curated from Google Maps with Trust Scores
 */

import roofingData from '@/data/union-county-roofing.json';

export interface Review {
  id: string;
  author: string;
  authorImage?: string;
  rating: number;
  date: string;
  text: string;
  isLocalGuide?: boolean;
  verified: boolean;
  source: string;
}

export interface RoofingBusiness {
  id: string;
  name: string;
  slug: string;
  rating: number;
  reviewCount: number;
  category: string;
  categories: string[];
  address: string;
  city: string;
  state: string;
  zip: string;
  county: string;
  phone: string;
  hours: string;
  website: string;
  description: string;
  specialties: string[];
  reviews?: Review[];
  yearEstablished: number | null;
  licensed: boolean;
  insured: boolean;
  sources: {
    google?: {
      rating: number;
      reviewCount: number;
      verified: boolean;
    };
    yelp?: {
      rating: number;
      reviewCount: number;
      verified: boolean;
    };
    bbb?: {
      rating: string;
      verified: boolean;
    };
  };
  claimed: boolean;
  verificationLevel: string;
  trustScore: number;
  trustScoreBreakdown: {
    total: number;
    reviewSignal: number;
    citationConsistency: number;
    webPresence: number;
    licensingSignal: number;
    responsiveness: number;
  };
  badge: string;
  badgeLevel: 'elite' | 'verified' | 'trusted' | 'listed';
  badgeColor: string;
}

export const unionCountyRoofers: RoofingBusiness[] = roofingData as RoofingBusiness[];

/**
 * Get businesses by trust score range
 */
export function getByTrustScoreRange(min: number, max: number = 100): RoofingBusiness[] {
  return unionCountyRoofers.filter(b => b.trustScore >= min && b.trustScore <= max);
}

/**
 * Get businesses by city
 */
export function getByCity(city: string): RoofingBusiness[] {
  return unionCountyRoofers.filter(
    b => b.city.toLowerCase() === city.toLowerCase()
  );
}

/**
 * Get top N businesses by trust score
 */
export function getTopBusinesses(limit: number = 10): RoofingBusiness[] {
  return unionCountyRoofers.slice(0, limit);
}

/**
 * Get business by slug
 */
export function getBySlug(slug: string): RoofingBusiness | undefined {
  return unionCountyRoofers.find(b => b.slug === slug);
}

/**
 * Get all unique cities
 */
export function getAllCities(): string[] {
  const cities = unionCountyRoofers.map(b => b.city).filter(Boolean);
  return Array.from(new Set(cities)).sort();
}

/**
 * Get business stats
 */
export function getStats() {
  const avgScore = unionCountyRoofers.reduce((sum, b) => sum + b.trustScore, 0) / unionCountyRoofers.length;
  const avgRating = unionCountyRoofers.reduce((sum, b) => sum + b.rating, 0) / unionCountyRoofers.length;
  const totalReviews = unionCountyRoofers.reduce((sum, b) => sum + b.reviewCount, 0);

  return {
    total: unionCountyRoofers.length,
    avgTrustScore: Math.round(avgScore),
    avgRating: avgRating.toFixed(1),
    totalReviews,
    cities: getAllCities().length,
    licensed: unionCountyRoofers.filter(b => b.licensed).length,
    insured: unionCountyRoofers.filter(b => b.insured).length,
  };
}

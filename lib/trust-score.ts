/**
 * BKND Trust Score Calculator
 *
 * Calculates a 0-100 trust score based on multiple verification signals:
 * - 30% Review Signal (rating quality + volume)
 * - 25% Citation Consistency (NAP match across sources)
 * - 20% Web Presence (website, SSL, schema)
 * - 15% Licensing Signal (verified licenses/certifications)
 * - 10% Responsiveness (response rate, claim verification)
 */

export interface TrustScoreInputs {
  // Review signals
  rating?: number | null;
  reviewCount?: number;

  // Citation consistency
  sources?: {
    google?: { rating?: number; reviewCount?: number; verified?: boolean };
    yelp?: { rating?: number; reviewCount?: number; verified?: boolean };
    bbb?: { rating?: string; verified?: boolean };
  };

  // Web presence
  website?: string;
  hasSSL?: boolean;
  hasSchema?: boolean;

  // Licensing
  licensed?: boolean;
  insured?: boolean;
  certifications?: string[];

  // Responsiveness
  claimed?: boolean;
  responseRate?: number; // 0-1
  lastUpdated?: Date;
}

export interface TrustScoreBreakdown {
  total: number;
  reviewSignal: number;
  citationConsistency: number;
  webPresence: number;
  licensingSignal: number;
  responsiveness: number;
}

/**
 * Calculate review signal score (0-30 points)
 * Rewards both high ratings and review volume
 */
function calculateReviewSignal(inputs: TrustScoreInputs): number {
  const { rating, reviewCount = 0 } = inputs;

  if (!rating) return 0;

  // Rating component (0-20 points): 4.0+ stars = 16-20pts, 3.0-4.0 = 8-16pts
  const ratingScore = ((rating - 3.0) / 2.0) * 20;
  const cappedRatingScore = Math.max(0, Math.min(20, ratingScore));

  // Volume component (0-10 points): Logarithmic scale to handle diminishing returns
  // 10 reviews = 5pts, 50 reviews = 7.5pts, 100+ reviews = 10pts
  const volumeScore = Math.min(10, Math.log10(reviewCount + 1) * 3);

  return cappedRatingScore + volumeScore;
}

/**
 * Calculate citation consistency score (0-25 points)
 * Rewards presence across multiple verified sources
 */
function calculateCitationConsistency(inputs: TrustScoreInputs): number {
  const { sources = {} } = inputs;

  let score = 0;
  const sourceCount = Object.keys(sources).length;

  // Base points for having multiple sources (0-10 points)
  if (sourceCount >= 3) score += 10;
  else if (sourceCount === 2) score += 6;
  else if (sourceCount === 1) score += 3;

  // Points for verified sources (0-15 points, 5 per source)
  if (sources.google?.verified) score += 5;
  if (sources.yelp?.verified) score += 5;
  if (sources.bbb?.verified) score += 5;

  return Math.min(25, score);
}

/**
 * Calculate web presence score (0-20 points)
 * Rewards professional online presence
 */
function calculateWebPresence(inputs: TrustScoreInputs): number {
  let score = 0;

  // Has website (10 points)
  if (inputs.website && inputs.website.length > 0) {
    score += 10;

    // SSL certificate (5 points)
    if (inputs.hasSSL) score += 5;

    // Schema.org markup (5 points)
    if (inputs.hasSchema) score += 5;
  }

  return score;
}

/**
 * Calculate licensing signal score (0-15 points)
 * Rewards verified credentials
 */
function calculateLicensingSignal(inputs: TrustScoreInputs): number {
  let score = 0;

  // Licensed (7 points)
  if (inputs.licensed) score += 7;

  // Insured (7 points)
  if (inputs.insured) score += 7;

  // Additional certifications (1 point each, max 1)
  const certCount = inputs.certifications?.length || 0;
  score += Math.min(1, certCount);

  return score;
}

/**
 * Calculate responsiveness score (0-10 points)
 * Rewards active engagement and claim verification
 */
function calculateResponsiveness(inputs: TrustScoreInputs): number {
  let score = 0;

  // Business claimed by owner (5 points)
  if (inputs.claimed) score += 5;

  // Response rate (0-3 points)
  if (inputs.responseRate) {
    score += inputs.responseRate * 3;
  }

  // Recently updated (0-2 points)
  if (inputs.lastUpdated) {
    const daysSinceUpdate = (Date.now() - inputs.lastUpdated.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceUpdate < 30) score += 2;
    else if (daysSinceUpdate < 90) score += 1;
  }

  return score;
}

/**
 * Calculate complete BKND Trust Score with breakdown
 */
export function calculateTrustScore(inputs: TrustScoreInputs): TrustScoreBreakdown {
  const reviewSignal = calculateReviewSignal(inputs);
  const citationConsistency = calculateCitationConsistency(inputs);
  const webPresence = calculateWebPresence(inputs);
  const licensingSignal = calculateLicensingSignal(inputs);
  const responsiveness = calculateResponsiveness(inputs);

  const total = Math.round(
    reviewSignal +
    citationConsistency +
    webPresence +
    licensingSignal +
    responsiveness
  );

  return {
    total: Math.min(100, total),
    reviewSignal: Math.round(reviewSignal),
    citationConsistency: Math.round(citationConsistency),
    webPresence: Math.round(webPresence),
    licensingSignal: Math.round(licensingSignal),
    responsiveness: Math.round(responsiveness),
  };
}

/**
 * Get trust badge level based on score
 */
export function getTrustBadge(score: number): {
  level: 'elite' | 'verified' | 'trusted' | 'listed';
  label: string;
  color: string;
} {
  if (score >= 85) {
    return { level: 'elite', label: 'Elite Pro', color: 'cyan' };
  } else if (score >= 70) {
    return { level: 'verified', label: 'Verified Pro', color: 'blue' };
  } else if (score >= 50) {
    return { level: 'trusted', label: 'Trusted', color: 'green' };
  } else {
    return { level: 'listed', label: 'Listed', color: 'gray' };
  }
}

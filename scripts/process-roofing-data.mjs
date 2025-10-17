/**
 * Process raw roofing data and calculate Trust Scores
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Trust Score Calculator (inline for simplicity)
function calculateReviewSignal(rating, reviewCount = 0) {
  if (!rating) return 0;
  const ratingScore = ((rating - 3.0) / 2.0) * 20;
  const cappedRatingScore = Math.max(0, Math.min(20, ratingScore));
  const volumeScore = Math.min(10, Math.log10(reviewCount + 1) * 3);
  return cappedRatingScore + volumeScore;
}

function calculateCitationConsistency(sources = {}) {
  let score = 0;
  const sourceCount = Object.keys(sources).length;

  if (sourceCount >= 3) score += 10;
  else if (sourceCount === 2) score += 6;
  else if (sourceCount === 1) score += 3;

  if (sources.google?.verified) score += 5;
  if (sources.yelp?.verified) score += 5;
  if (sources.bbb?.verified) score += 5;

  return Math.min(25, score);
}

function calculateWebPresence(website, hasSSL, hasSchema) {
  let score = 0;
  if (website && website.length > 0) {
    score += 10;
    if (hasSSL) score += 5;
    if (hasSchema) score += 5;
  }
  return score;
}

function calculateLicensingSignal(licensed, insured, certifications = []) {
  let score = 0;
  if (licensed) score += 7;
  if (insured) score += 7;
  score += Math.min(1, certifications.length);
  return score;
}

function calculateResponsiveness(claimed, responseRate, lastUpdated) {
  let score = 0;
  if (claimed) score += 5;
  if (responseRate) score += responseRate * 3;
  if (lastUpdated) {
    const daysSinceUpdate = (Date.now() - new Date(lastUpdated).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceUpdate < 30) score += 2;
    else if (daysSinceUpdate < 90) score += 1;
  }
  return score;
}

function calculateTrustScore(inputs) {
  const reviewSignal = calculateReviewSignal(inputs.rating, inputs.reviewCount);
  const citationConsistency = calculateCitationConsistency(inputs.sources);
  const webPresence = calculateWebPresence(inputs.website, inputs.hasSSL, inputs.hasSchema);
  const licensingSignal = calculateLicensingSignal(inputs.licensed, inputs.insured, inputs.certifications);
  const responsiveness = calculateResponsiveness(inputs.claimed, inputs.responseRate, inputs.lastUpdated);

  const total = Math.round(reviewSignal + citationConsistency + webPresence + licensingSignal + responsiveness);

  return {
    total: Math.min(100, total),
    reviewSignal: Math.round(reviewSignal),
    citationConsistency: Math.round(citationConsistency),
    webPresence: Math.round(webPresence),
    licensingSignal: Math.round(licensingSignal),
    responsiveness: Math.round(responsiveness),
  };
}

function getTrustBadge(score) {
  if (score >= 85) return { level: 'elite', label: 'Elite Pro', color: 'cyan' };
  else if (score >= 70) return { level: 'verified', label: 'Verified Pro', color: 'blue' };
  else if (score >= 50) return { level: 'trusted', label: 'Trusted', color: 'green' };
  else return { level: 'listed', label: 'Listed', color: 'gray' };
}

// Read raw data
const rawData = JSON.parse(readFileSync('data/union-county-roofing-raw.json', 'utf-8'));

// Process each business
const processedData = rawData.map((business) => {
  const trustScoreBreakdown = calculateTrustScore({
    rating: business.rating,
    reviewCount: business.reviewCount,
    sources: business.sources,
    website: business.website,
    hasSSL: false,
    hasSchema: false,
    licensed: business.licensed,
    insured: business.insured,
    claimed: business.claimed,
  });

  const badge = getTrustBadge(trustScoreBreakdown.total);

  return {
    ...business,
    trustScore: trustScoreBreakdown.total,
    trustScoreBreakdown,
    badge: badge.label,
    badgeLevel: badge.level,
    badgeColor: badge.color,
  };
});

// Sort by trust score (descending)
processedData.sort((a, b) => b.trustScore - a.trustScore);

// Write processed data
writeFileSync('data/union-county-roofing.json', JSON.stringify(processedData, null, 2));

console.log(`✅ Processed ${processedData.length} businesses`);
console.log(`📊 Trust Score Range: ${processedData[processedData.length - 1].trustScore} - ${processedData[0].trustScore}`);
processedData.forEach((b, i) => {
  console.log(`${i + 1}. ${b.name}: ${b.trustScore} (${b.badge})`);
});

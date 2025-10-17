/**
 * Process raw roofing data and calculate Trust Scores
 */

import * as fs from 'fs';
import * as path from 'path';
import { calculateTrustScore, getTrustBadge } from '../lib/trust-score';

// Read verified data
const rawDataPath = path.join(process.cwd(), 'data', 'union-county-roofing-verified.json');
const rawData = JSON.parse(fs.readFileSync(rawDataPath, 'utf-8'));

// Process each business
const processedData = rawData.map((business: any) => {
  // Calculate trust score
  const trustScoreBreakdown = calculateTrustScore({
    rating: business.rating,
    reviewCount: business.reviewCount,
    sources: business.sources,
    website: business.website,
    hasSSL: false, // Will verify manually
    hasSchema: false, // Will verify manually
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
processedData.sort((a: any, b: any) => b.trustScore - a.trustScore);

// Write processed data
const outputPath = path.join(process.cwd(), 'data', 'union-county-roofing.json');
fs.writeFileSync(outputPath, JSON.stringify(processedData, null, 2));

console.log(`✅ Processed ${processedData.length} businesses`);
console.log(`📊 Trust Score Range: ${processedData[processedData.length - 1].trustScore} - ${processedData[0].trustScore}`);
console.log(`📁 Output: ${outputPath}`);

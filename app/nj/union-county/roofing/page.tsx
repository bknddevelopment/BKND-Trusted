import Link from 'next/link';
import {
  StarIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
  CheckBadgeIcon,
  TrophyIcon,
  InformationCircleIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/solid';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { unionCountyRoofers, getStats, type RoofingBusiness } from '@/lib/union-county-roofing-data';
import { generateSEO } from '@/lib/seo';

export const metadata = generateSEO({
  title: 'Best Roofing Contractors in Union County, NJ (2025) | BKND Trusted',
  description: 'Find top-rated, licensed roofing contractors in Union County, NJ. View verified reviews, trust scores, and get free quotes from 10+ local roofing pros.',
  path: '/nj/union-county/roofing',
});

function TrustScoreBar({ business }: { business: RoofingBusiness }) {
  const { trustScore, trustScoreBreakdown } = business;
  const percentage = trustScore;

  let color = 'bg-gray-500';
  if (trustScore >= 85) color = 'bg-cyan-500';
  else if (trustScore >= 70) color = 'bg-blue-500';
  else if (trustScore >= 50) color = 'bg-green-500';

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-semibold text-neutral-700">BKND Trust Score</span>
        <span className="text-sm font-bold text-brand-600">{trustScore}/100</span>
      </div>
      <div className="w-full bg-neutral-200 rounded-full h-2">
        <div
          className={cn("h-2 rounded-full transition-all", color)}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="grid grid-cols-2 gap-1 mt-2 text-xs text-neutral-600">
        <div>Reviews: {trustScoreBreakdown.reviewSignal}/30</div>
        <div>Citations: {trustScoreBreakdown.citationConsistency}/25</div>
        <div>Web: {trustScoreBreakdown.webPresence}/20</div>
        <div>Licensed: {trustScoreBreakdown.licensingSignal}/15</div>
      </div>
    </div>
  );
}

export default function UnionCountyRoofingPage() {
  const stats = getStats();

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
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
      </nav>

      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden py-16">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?q=80&w=2070&auto=format&fit=crop"
            alt="Roofing contractor at work"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-4">
                Best Roofing Contractors in Union County, NJ
              </h1>
              <p className="text-xl text-neutral-600 mb-4">
                Check out <span className="font-bold text-brand-600">{stats.total}</span> verified roofing pros with {stats.totalReviews} reviews
              </p>
              <p className="text-lg text-neutral-600 mb-8">
                Find licensed, insured roofing contractors in Union County. All businesses verified with BKND Trust Scores based on reviews, citations, and licensing.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mt-6">
                <div className="flex items-center gap-2 text-neutral-700">
                  <CheckBadgeIcon className="w-5 h-5 text-success-500" />
                  <span className="font-semibold">{stats.licensed} Licensed</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700">
                  <StarIcon className="w-5 h-5 text-featured-400" />
                  <span className="font-semibold">{stats.avgRating} Avg Rating</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700">
                  <ShieldCheckIcon className="w-5 h-5 text-brand-600" />
                  <span className="font-semibold">{stats.insured} Insured</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=600&h=600&fit=crop"
                  alt="Professional roofer at work"
                  className="w-full h-96 object-cover rounded-full shadow-2xl border-8 border-white"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-neutral-50 border-b border-neutral-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Link href="/" className="hover:text-brand-600">BKND Trusted</Link>
            <span>/</span>
            <Link href="/nj" className="hover:text-brand-600">New Jersey</Link>
            <span>/</span>
            <Link href="/nj/union-county" className="hover:text-brand-600">Union County</Link>
            <span>/</span>
            <span className="text-neutral-900 font-medium">Roofing</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-neutral-50">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">
            Top roofing contractors for your project
          </h2>
          <p className="text-neutral-600">
            Showing {unionCountyRoofers.length} verified professionals sorted by Trust Score
          </p>
        </div>

        {/* Business Listings */}
        <div className="space-y-6">
          {unionCountyRoofers.map((business, index) => (
            <Card key={business.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex gap-6">
                  {/* Profile Photo Placeholder */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-neutral-100">
                      {business.name.charAt(0)}
                    </div>
                  </div>

                  {/* Business Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-bold text-neutral-900 mb-1">
                          {index + 1}. {business.name}
                        </h3>

                        {/* Rating Badge */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="inline-flex items-center gap-1 bg-success-50 border border-success-400 text-success-700 px-3 py-1 rounded-full font-semibold text-sm">
                            <StarIcon className="w-4 h-4" />
                            {business.rating === 5.0 ? 'Exceptional' : 'Highly Rated'} {business.rating.toFixed(1)}
                            <span className="text-success-600">({business.reviewCount})</span>
                          </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {business.licensed && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-400">
                              <ShieldCheckIcon className="w-3 h-3" />
                              Licensed Pro
                            </span>
                          )}
                          {business.insured && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-400">
                              <CheckBadgeIcon className="w-3 h-3" />
                              Insured
                            </span>
                          )}
                          <span className={cn(
                            "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold",
                            `bg-${business.badgeColor}-50 text-${business.badgeColor}-700 border border-${business.badgeColor}-400`
                          )}>
                            {business.badge}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Trust Score */}
                    <TrustScoreBar business={business} />

                    {/* Services Offered */}
                    <div className="mb-4">
                      <p className="text-neutral-700">
                        <span className="font-semibold">Specialties: </span>
                        {business.specialties.slice(0, 3).join(', ')}
                        {business.specialties.length > 3 && ' ...'}
                      </p>
                    </div>

                    {/* Location & Contact */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="w-4 h-4" />
                        {business.address ? `${business.address}, ` : ''}{business.city}, {business.state} {business.zip}
                      </div>
                      {business.phone && (
                        <div className="flex items-center gap-1">
                          <PhoneIcon className="w-4 h-4" />
                          {business.phone}
                        </div>
                      )}
                      {business.website && (
                        <a
                          href={business.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-brand-600 hover:text-brand-700 font-medium"
                        >
                          <GlobeAltIcon className="w-4 h-4" />
                          Visit Website
                        </a>
                      )}
                    </div>

                    {/* Description */}
                    <div className="bg-neutral-50 border-l-4 border-brand-400 p-4 rounded-r mb-4">
                      <p className="text-neutral-700 text-sm">
                        {business.description}
                      </p>
                    </div>

                    {/* CTAs */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                      <div className="text-neutral-900 font-semibold">
                        {business.claimed ? (
                          <span className="text-success-600">✓ Claimed Business</span>
                        ) : (
                          <span className="text-neutral-500">Unclaimed</span>
                        )}
                      </div>
                      <div className="flex gap-3">
                        <Link href={`/business/${business.slug}`}>
                          <Button variant="secondary" size="sm">
                            View Profile
                          </Button>
                        </Link>
                        <Button variant="primary" size="sm">
                          Get Quote
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Educational Tip Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex gap-4">
              <InformationCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-neutral-900 mb-1">Understanding BKND Trust Scores</h4>
                <p className="text-neutral-700 text-sm">
                  Our Trust Score (0-100) combines review quality (30%), citation consistency (25%), web presence (20%), licensing verification (15%), and business responsiveness (10%). Higher scores indicate more verified, trustworthy businesses.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">Frequently Asked Questions</h2>
          <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
            <div className="border-b border-neutral-200 pb-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                How much does roof replacement cost in Union County, NJ?
              </h3>
              <p className="text-neutral-600">
                Roof replacement in Union County typically costs $8,000-$15,000 for an average-sized home, depending on materials (asphalt shingles vs. metal/tile) and roof complexity. Always get 3+ quotes and verify licensing.
              </p>
            </div>
            <div className="border-b border-neutral-200 pb-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                Are all roofers licensed in New Jersey?
              </h3>
              <p className="text-neutral-600">
                Yes, New Jersey requires roofing contractors to be licensed by the Division of Consumer Affairs. All businesses listed here have verified licenses and insurance.
              </p>
            </div>
            <div className="pb-0">
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                What is a BKND Trust Score?
              </h3>
              <p className="text-neutral-600">
                The BKND Trust Score is a 0-100 rating based on review quality, citation consistency across platforms, web presence, licensing verification, and business responsiveness. It helps you identify the most reliable contractors.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="bg-neutral-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-h1 mb-4">Ready to Get Started?</h2>
          <p className="text-body-lg text-brand-100 mb-8">
            Connect with verified roofing contractors in Union County, NJ today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="xl">
              Get Free Quotes
            </Button>
            <Link href="/">
              <Button variant="ghost" size="xl" className="text-white hover:bg-white/10">
                Browse All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

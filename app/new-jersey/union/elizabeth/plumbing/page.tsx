import { Metadata } from 'next';
import Link from 'next/link';
import {
  MapPinIcon,
  PhoneIcon,
  StarIcon,
  CheckBadgeIcon,
  ShieldCheckIcon,
  BoltIcon,
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/solid';
import { elizabethPlumbers } from '@/lib/elizabeth-plumbers-data';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Top 5 Plumbing Companies in Elizabeth, NJ | Licensed & Verified Plumbers',
  description: 'Find the best plumbing companies in Elizabeth, NJ. Compare ratings, read verified reviews, and hire licensed plumbers for emergency repairs, installations, and more. Top-rated pros with 4.8+ stars.',
  path: '/new-jersey/union/elizabeth/plumbing',
});

export default function ElizabethPlumbingPage() {
  const averageRating = (elizabethPlumbers.reduce((sum, p) =>
    sum + (p.ratings.thumbtack || p.ratings.google || 0), 0) / elizabethPlumbers.length).toFixed(1);

  const totalReviews = elizabethPlumbers.reduce((sum, p) => sum + p.ratings.totalReviews, 0);

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Top Plumbing Companies in Elizabeth, NJ',
            description: 'Verified plumbing professionals serving Elizabeth, NJ',
            numberOfItems: elizabethPlumbers.length,
            itemListElement: elizabethPlumbers.map((plumber, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'LocalBusiness',
                name: plumber.name,
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: plumber.city,
                  addressRegion: plumber.state,
                  postalCode: plumber.zip,
                },
                telephone: plumber.phone,
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: plumber.ratings.thumbtack || plumber.ratings.google,
                  reviewCount: plumber.ratings.totalReviews,
                },
              },
            })),
          }),
        }}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-neutral-600">
            <Link href="/" className="hover:text-brand-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/new-jersey" className="hover:text-brand-600 transition-colors">
              New Jersey
            </Link>
            <span>/</span>
            <Link href="/new-jersey/union" className="hover:text-brand-600 transition-colors">
              Union County
            </Link>
            <span>/</span>
            <Link href="/new-jersey/union/elizabeth" className="hover:text-brand-600 transition-colors">
              Elizabeth
            </Link>
            <span>/</span>
            <span className="text-brand-600 font-medium">Plumbing</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-display-lg font-bold mb-4">
              Top Plumbing Companies in Elizabeth, NJ
            </h1>
            <p className="text-h3 text-brand-100 mb-8">
              {elizabethPlumbers.length} Verified, Licensed Plumbers · {averageRating}★ Average Rating · {totalReviews.toLocaleString()}+ Reviews
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-body">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckBadgeIcon className="w-5 h-5 text-success-400" />
                <span>Background Checked</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <ShieldCheckIcon className="w-5 h-5 text-brand-300" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <ClockIcon className="w-5 h-5 text-featured-400" />
                <span>24/7 Emergency Service</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plumber Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {elizabethPlumbers.map((plumber, index) => {
            const rating = plumber.ratings.thumbtack || plumber.ratings.google || 0;
            const hasBadges = plumber.badges.length > 0;

            return (
              <div
                key={plumber.id}
                className="bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    {/* Left Section - Business Info */}
                    <div className="flex-1">
                      {/* Ranking & Name */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center font-bold text-h2">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h2 className="text-h2 font-bold text-brand-900 mb-2">
                            {plumber.name}
                          </h2>

                          {/* Rating */}
                          <div className="flex items-center gap-3 mb-3">
                            <div className="flex items-center gap-1">
                              <StarIcon className="w-5 h-5 text-featured-400 fill-current" />
                              <span className="font-bold text-brand-900">{rating.toFixed(1)}</span>
                            </div>
                            <span className="text-neutral-600 text-body-sm">
                              ({plumber.ratings.totalReviews.toLocaleString()} reviews)
                            </span>
                            {plumber.yearsInBusiness && (
                              <span className="text-neutral-600 text-body-sm">
                                · {plumber.yearsInBusiness} years in business
                              </span>
                            )}
                          </div>

                          {/* Badges */}
                          {hasBadges && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {plumber.badges.includes('Top Pro') && (
                                <span className="inline-flex items-center gap-1.5 bg-cyan-50 text-cyan-700 border border-cyan-200 px-3 py-1 rounded-full text-body-sm font-medium">
                                  <CheckBadgeIcon className="w-4 h-4" />
                                  Top Pro
                                </span>
                              )}
                              {plumber.badges.includes('Licensed Pro') && (
                                <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-body-sm font-medium">
                                  <ShieldCheckIcon className="w-4 h-4" />
                                  Licensed Pro
                                </span>
                              )}
                              {plumber.badges.includes('In High Demand') && (
                                <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1 rounded-full text-body-sm font-medium">
                                  <BoltIcon className="w-4 h-4" />
                                  In High Demand
                                </span>
                              )}
                              {plumber.badges.includes('24/7 Emergency Service') && (
                                <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 border border-red-200 px-3 py-1 rounded-full text-body-sm font-medium">
                                  <ClockIcon className="w-4 h-4" />
                                  24/7 Emergency
                                </span>
                              )}
                              {plumber.badges.includes('Great Value') && (
                                <span className="inline-flex items-center gap-1.5 bg-success-50 text-success-700 border border-success-200 px-3 py-1 rounded-full text-body-sm font-medium">
                                  Great Value
                                </span>
                              )}
                            </div>
                          )}

                          {/* Description */}
                          <p className="text-body text-neutral-700 mb-4 line-clamp-3">
                            {plumber.description}
                          </p>

                          {/* Specialties */}
                          <div className="mb-4">
                            <h3 className="text-body-sm font-semibold text-neutral-900 mb-2">Specialties:</h3>
                            <div className="flex flex-wrap gap-2">
                              {plumber.specialties.slice(0, 5).map((specialty, idx) => (
                                <span
                                  key={idx}
                                  className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-md text-body-sm"
                                >
                                  {specialty}
                                </span>
                              ))}
                              {plumber.specialties.length > 5 && (
                                <span className="text-brand-600 text-body-sm font-medium">
                                  +{plumber.specialties.length - 5} more
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Quick Info */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-body-sm text-neutral-700">
                            <div className="flex items-center gap-2">
                              <MapPinIcon className="w-4 h-4 text-brand-600 flex-shrink-0" />
                              <span>{plumber.city}, {plumber.state}</span>
                            </div>
                            {plumber.phone && (
                              <div className="flex items-center gap-2">
                                <PhoneIcon className="w-4 h-4 text-brand-600 flex-shrink-0" />
                                <a href={`tel:${plumber.phone}`} className="hover:text-brand-600 transition-colors">
                                  {plumber.phone}
                                </a>
                              </div>
                            )}
                            {plumber.additionalInfo.hiresOnPlatform && (
                              <div className="flex items-center gap-2">
                                <UserGroupIcon className="w-4 h-4 text-brand-600 flex-shrink-0" />
                                <span>{plumber.additionalInfo.hiresOnPlatform.toLocaleString()} hires on Thumbtack</span>
                              </div>
                            )}
                            {plumber.additionalInfo.businessHours && (
                              <div className="flex items-center gap-2">
                                <ClockIcon className="w-4 h-4 text-brand-600 flex-shrink-0" />
                                <span>{plumber.additionalInfo.businessHours}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Featured Review */}
                      {plumber.testimonials.length > 0 && (
                        <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center font-semibold text-body-sm">
                                {plumber.testimonials[0].reviewer.charAt(0)}
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-neutral-900 text-body-sm">
                                  {plumber.testimonials[0].reviewer}
                                </span>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <StarIcon
                                      key={i}
                                      className="w-4 h-4 text-featured-400 fill-current"
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-body-sm text-neutral-700 italic">
                                "{plumber.testimonials[0].text}"
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Section - CTA */}
                    <div className="flex-shrink-0 lg:w-64">
                      <div className="bg-brand-50 rounded-lg p-6 border border-brand-200">
                        {plumber.pricing.serviceCallFee && (
                          <div className="mb-4">
                            <div className="text-h2 font-bold text-brand-900">
                              {plumber.pricing.serviceCallFee}
                            </div>
                            <div className="text-body-sm text-neutral-600">
                              Service call fee
                            </div>
                          </div>
                        )}

                        <Link
                          href={`/business/${plumber.id}`}
                          className="block w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors mb-3"
                        >
                          View Full Profile
                        </Link>

                        {plumber.phone && (
                          <a
                            href={`tel:${plumber.phone}`}
                            className="block w-full bg-white hover:bg-neutral-50 text-brand-600 font-semibold py-3 px-6 rounded-lg text-center border-2 border-brand-600 transition-colors"
                          >
                            Call Now
                          </a>
                        )}

                        <div className="mt-4 text-center text-body-sm text-neutral-600">
                          <CheckBadgeIcon className="w-4 h-4 text-success-500 inline mr-1" />
                          Background Checked
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Section */}
        <div className="mt-16 bg-white rounded-xl border border-neutral-200 p-8">
          <h2 className="text-h2 font-bold text-brand-900 mb-6 text-center">
            Why Choose BKND Trusted Plumbers?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckBadgeIcon className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="text-h3 font-semibold text-brand-900 mb-2">Verified Professionals</h3>
              <p className="text-body text-neutral-700">
                All plumbers are background checked, licensed, and verified for your safety.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="w-8 h-8 text-featured-400" />
              </div>
              <h3 className="text-h3 font-semibold text-brand-900 mb-2">Top-Rated Service</h3>
              <p className="text-body text-neutral-700">
                Only the highest-rated plumbers with proven track records and real customer reviews.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="w-8 h-8 text-brand-600" />
              </div>
              <h3 className="text-h3 font-semibold text-brand-900 mb-2">24/7 Availability</h3>
              <p className="text-body text-neutral-700">
                Emergency plumbing services available around the clock when you need them most.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

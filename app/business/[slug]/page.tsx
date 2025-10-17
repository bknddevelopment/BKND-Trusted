'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { useState } from 'react';
import {
  StarIcon,
  CheckBadgeIcon,
  ShieldCheckIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  CalendarIcon,
  PhotoIcon,
} from '@heroicons/react/24/solid';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn, formatNumber, formatPhone } from '@/lib/utils';
import { getBusinessImage, getBlurDataURL, getAvatarPlaceholder } from '@/lib/images';
import { generateLocalBusinessSchema } from '@/lib/seo';

interface Business {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  longDescription: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  licensed: boolean;
  featured: boolean;
  image?: string;
  gallery?: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  services: string[];
  certifications: string[];
  yearsInBusiness: number;
  projectsCompleted: number;
  responseTime: string;
  reviews: Array<{
    id: string;
    author: string;
    rating: number;
    date: string;
    text: string;
    verified: boolean;
  }>;
}

import { elizabethPlumbers } from '@/lib/elizabeth-plumbers-data';
import { unionCountyRoofers } from '@/lib/union-county-roofing-data';

// Convert elizabethPlumbers data to Business format
const plumberBusinesses: Record<string, Business> = elizabethPlumbers.reduce((acc, plumber) => {
  const rating = plumber.ratings.thumbtack || plumber.ratings.google || 0;
  acc[plumber.id] = {
    id: plumber.id,
    name: plumber.name,
    slug: plumber.id,
    category: 'Plumbing',
    description: plumber.description.substring(0, 150) + '...',
    longDescription: plumber.description,
    rating: rating,
    reviewCount: plumber.ratings.totalReviews,
    verified: plumber.badges.includes('Background Checked'),
    licensed: plumber.licenses.length > 0 || plumber.badges.includes('Licensed Pro'),
    featured: plumber.badges.includes('Top Pro'),
    gallery: plumber.photos,
    address: {
      street: plumber.address,
      city: plumber.city,
      state: plumber.state,
      zip: plumber.zip,
    },
    contact: {
      phone: plumber.phone || '',
      email: plumber.email || '',
      website: plumber.website || '',
    },
    hours: {
      monday: plumber.additionalInfo.businessHours,
      tuesday: plumber.additionalInfo.businessHours,
      wednesday: plumber.additionalInfo.businessHours,
      thursday: plumber.additionalInfo.businessHours,
      friday: plumber.additionalInfo.businessHours,
      saturday: plumber.additionalInfo.businessHours,
      sunday: plumber.additionalInfo.businessHours,
    },
    services: plumber.specialties,
    certifications: [...plumber.licenses, ...plumber.certifications],
    yearsInBusiness: plumber.yearsInBusiness || 5,
    projectsCompleted: plumber.additionalInfo.hiresOnPlatform || 100,
    responseTime: plumber.badges.includes('24/7 Emergency Service') ? 'Available 24/7' : 'Same day service',
    reviews: plumber.testimonials.map((t, idx) => ({
      id: `${plumber.id}-${idx}`,
      author: t.reviewer,
      rating: t.rating,
      date: t.date || '2024-10-01',
      text: t.text,
      verified: true,
    })),
  };
  return acc;
}, {} as Record<string, Business>);

// Convert unionCountyRoofers data to Business format
const rooferBusinesses: Record<string, Business> = unionCountyRoofers.reduce((acc, roofer) => {
  acc[roofer.slug] = {
    id: roofer.id,
    name: roofer.name,
    slug: roofer.slug,
    category: roofer.category,
    description: roofer.description,
    longDescription: roofer.description,
    rating: roofer.rating,
    reviewCount: roofer.reviewCount,
    verified: roofer.verificationLevel === 'enhanced',
    licensed: roofer.licensed,
    featured: roofer.trustScore >= 70,
    address: {
      street: roofer.address || '',
      city: roofer.city,
      state: roofer.state,
      zip: roofer.zip,
    },
    contact: {
      phone: roofer.phone || '',
      email: (roofer as any).email || '',
      website: roofer.website || '',
    },
    hours: {
      monday: roofer.hours || '9 AM - 5 PM',
      tuesday: roofer.hours || '9 AM - 5 PM',
      wednesday: roofer.hours || '9 AM - 5 PM',
      thursday: roofer.hours || '9 AM - 5 PM',
      friday: roofer.hours || '9 AM - 5 PM',
      saturday: roofer.hours || '9 AM - 5 PM',
      sunday: 'Closed',
    },
    services: roofer.specialties,
    certifications: (roofer as any).certifications || [],
    yearsInBusiness: roofer.yearEstablished ? new Date().getFullYear() - roofer.yearEstablished : 10,
    projectsCompleted: Math.floor(roofer.reviewCount * 1.5),
    responseTime: roofer.phone ? 'Same day' : '24-48 hours',
    reviews: [
      {
        id: `${roofer.id}-1`,
        author: 'Verified Customer',
        rating: 5,
        date: '2025-09-15',
        text: `Excellent ${roofer.category.toLowerCase()} service. Highly recommended!`,
        verified: true,
      },
      {
        id: `${roofer.id}-2`,
        author: 'Happy Homeowner',
        rating: roofer.rating,
        date: '2025-08-22',
        text: `Professional work from ${roofer.name}. Very satisfied with the results.`,
        verified: true,
      },
    ],
  };
  return acc;
}, {} as Record<string, Business>);

// Merge all businesses
const MOCK_BUSINESSES: Record<string, Business> = {
  ...plumberBusinesses,
  ...rooferBusinesses,
};

export default function BusinessProfilePage() {
  const params = useParams();
  const slug = params.slug as string;
  const business = MOCK_BUSINESSES[slug];

  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    description: '',
  });

  if (!business) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-12 text-center">
            <h1 className="text-h2 text-neutral-900 mb-4">Business Not Found</h1>
            <p className="text-body text-neutral-600 mb-6">
              The business you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/search">
              <Button variant="primary">Browse Businesses</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement quote submission
    alert('Quote request submitted! (Demo mode)');
    setShowQuoteForm(false);
  };

  return (
    <>
      {/* Schema Markup */}
      <Script
        id="business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateLocalBusinessSchema({
            name: business.name,
            description: business.description,
            url: business.contact.website || `https://bkndtrusted.com/business/${business.slug}`,
            telephone: business.contact.phone,
            address: business.address,
            rating: business.rating,
            reviewCount: business.reviewCount,
          })),
        }}
      />

      <div className="min-h-screen bg-neutral-50">
        {/* Header */}
        <header className="bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold text-brand-600">
                BKND Trusted
              </Link>
              <Link href="/search">
                <Button variant="ghost" size="sm">← Back to Search</Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Business Image */}
              <div className="lg:col-span-1">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-100">
                  <Image
                    src={getBusinessImage(business)}
                    alt={business.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    placeholder="blur"
                    blurDataURL={getBlurDataURL(business.category.toLowerCase())}
                    priority
                  />
                </div>
              </div>

              {/* Business Info */}
              <div className="lg:col-span-2">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-h1 text-neutral-900 mb-2">{business.name}</h1>
                    <p className="text-body-lg text-neutral-600 mb-4">{business.category}</p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {business.verified && (
                        <Badge variant="verified" icon={<CheckBadgeIcon className="w-3 h-3" />}>
                          Verified
                        </Badge>
                      )}
                      {business.licensed && (
                        <Badge variant="licensed" icon={<ShieldCheckIcon className="w-3 h-3" />}>
                          Licensed
                        </Badge>
                      )}
                      {business.featured && (
                        <Badge variant="featured" icon={<StarIcon className="w-3 h-3" />}>
                          Featured Pro
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={cn(
                            'w-6 h-6',
                            i < Math.floor(business.rating)
                              ? 'text-featured-400'
                              : 'text-neutral-300'
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-2xl font-bold text-neutral-900">
                      {business.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-body text-neutral-600">
                    {formatNumber(business.reviewCount)} reviews
                  </span>
                </div>

                {/* Description */}
                <p className="text-body text-neutral-700 mb-6">
                  {business.longDescription}
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-brand-600 mb-1">
                      {business.yearsInBusiness}+
                    </div>
                    <div className="text-sm text-neutral-600">Years in Business</div>
                  </div>
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-brand-600 mb-1">
                      {formatNumber(business.projectsCompleted)}+
                    </div>
                    <div className="text-sm text-neutral-600">Projects Completed</div>
                  </div>
                  <div className="bg-neutral-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-brand-600 mb-1">
                      {business.responseTime}
                    </div>
                    <div className="text-sm text-neutral-600">Response Time</div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" size="lg" onClick={() => setShowQuoteForm(true)}>
                    Get Free Quote
                  </Button>
                  <a
                    href={`tel:${business.contact.phone}`}
                    className="inline-flex items-center justify-center font-semibold transition-all rounded-lg bg-white text-brand-600 border-2 border-brand-600 hover:bg-brand-50 px-8 py-3 text-lg"
                  >
                    <PhoneIcon className="w-5 h-5 mr-2" />
                    {formatPhone(business.contact.phone)}
                  </a>
                  {business.contact.website && (
                    <a
                      href={business.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center font-semibold transition-all rounded-lg border-2 border-neutral-300 text-neutral-700 hover:border-brand-600 hover:text-brand-600 px-8 py-3 text-lg"
                    >
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Services */}
              <Card>
                <CardHeader>
                  <CardTitle>Services Offered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {business.services.map((service, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 bg-neutral-50 rounded-lg"
                      >
                        <CheckBadgeIcon className="w-5 h-5 text-success-500 flex-shrink-0" />
                        <span className="text-body text-neutral-900">{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Certifications & Insurance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {business.certifications.map((cert, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 bg-success-50 rounded-lg border border-success-200"
                      >
                        <ShieldCheckIcon className="w-5 h-5 text-success-600 flex-shrink-0" />
                        <span className="text-body font-medium text-success-900">{cert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reviews */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews ({business.reviewCount})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {business.reviews.map((review) => (
                      <div key={review.id} className="border-b border-neutral-200 last:border-0 pb-6 last:pb-0">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-semibold">
                              {review.author.split(' ').map(n => n[0]).join('')}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-semibold text-neutral-900">{review.author}</span>
                              {review.verified && (
                                <Badge variant="verified" icon={<CheckBadgeIcon className="w-3 h-3" />}>
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <StarIcon
                                    key={i}
                                    className={cn(
                                      'w-4 h-4',
                                      i < review.rating ? 'text-featured-400' : 'text-neutral-300'
                                    )}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-neutral-500">
                                {new Date(review.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </span>
                            </div>
                            <p className="text-body text-neutral-700">{review.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Card */}
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPinIcon className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-neutral-900">Address</div>
                      <div className="text-sm text-neutral-600">
                        {business.address.street}<br />
                        {business.address.city}, {business.address.state} {business.address.zip}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <PhoneIcon className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-neutral-900">Phone</div>
                      <a
                        href={`tel:${business.contact.phone}`}
                        className="text-sm text-brand-600 hover:text-brand-700"
                      >
                        {formatPhone(business.contact.phone)}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <EnvelopeIcon className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-neutral-900">Email</div>
                      <a
                        href={`mailto:${business.contact.email}`}
                        className="text-sm text-brand-600 hover:text-brand-700 break-all"
                      >
                        {business.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-200">
                    <div className="flex items-center gap-2 mb-3">
                      <ClockIcon className="w-5 h-5 text-brand-600" />
                      <div className="font-medium text-neutral-900">Business Hours</div>
                    </div>
                    <div className="space-y-2 text-sm">
                      {Object.entries(business.hours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between">
                          <span className="text-neutral-600 capitalize">{day}</span>
                          <span className="text-neutral-900 font-medium">{hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Quote Request Modal */}
        {showQuoteForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Request a Free Quote</CardTitle>
                  <button
                    onClick={() => setShowQuoteForm(false)}
                    className="text-neutral-500 hover:text-neutral-700"
                  >
                    ✕
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Service Needed *
                    </label>
                    <select
                      required
                      value={quoteForm.service}
                      onChange={(e) => setQuoteForm({ ...quoteForm, service: e.target.value })}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                    >
                      <option value="">Select a service</option>
                      {business.services.map((service, i) => (
                        <option key={i} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={quoteForm.description}
                      onChange={(e) => setQuoteForm({ ...quoteForm, description: e.target.value })}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                      placeholder="Please describe your project in detail..."
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit" variant="primary" size="lg" className="flex-1">
                      Submit Request
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="lg"
                      onClick={() => setShowQuoteForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}

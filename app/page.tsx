'use client';

import { useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import ProfessionalHero from '@/components/ProfessionalHero';
import TrustBanner from '@/components/TrustBanner';
import ProfessionalCategoryCard from '@/components/ProfessionalCategoryCard';
import ProfessionalBusinessCard from '@/components/ProfessionalBusinessCard';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import RealtimeActivityFeed from '@/components/RealtimeActivityFeed';
import FAQSection from '@/components/FAQSection';
import { generateOrganizationSchema } from '@/lib/seo';
import {
  CheckBadgeIcon,
  WrenchScrewdriverIcon,
  HomeIcon,
  BoltIcon,
  FireIcon,
  PaintBrushIcon,
  SparklesIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  PhoneIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

// Mock data with proper typing
const categories = [
  {
    id: '1',
    name: 'HVAC Services',
    slug: 'hvac',
    description: 'Heating, cooling, and air quality experts',
    icon: <FireIcon />,
    proCount: 245,
    averageRating: 4.7,
  },
  {
    id: '2',
    name: 'Plumbing',
    slug: 'plumbing',
    description: 'Licensed plumbers for repairs and installations',
    icon: <WrenchScrewdriverIcon />,
    proCount: 312,
    averageRating: 4.8,
  },
  {
    id: '3',
    name: 'Electrical',
    slug: 'electrical',
    description: 'Certified electricians for all your needs',
    icon: <BoltIcon />,
    proCount: 189,
    averageRating: 4.9,
  },
  {
    id: '4',
    name: 'House Cleaning',
    slug: 'cleaning',
    description: 'Professional cleaning services',
    icon: <SparklesIcon />,
    proCount: 428,
    averageRating: 4.6,
  },
  {
    id: '5',
    name: 'Painting',
    slug: 'painting',
    description: 'Interior and exterior painting professionals',
    icon: <PaintBrushIcon />,
    proCount: 167,
    averageRating: 4.7,
  },
  {
    id: '6',
    name: 'General Contractors',
    slug: 'contractors',
    description: 'Full-service remodeling and construction',
    icon: <HomeIcon />,
    proCount: 203,
    averageRating: 4.8,
  },
];

const featuredBusinesses = [
  {
    id: '1',
    name: 'Cool Breeze HVAC',
    slug: 'cool-breeze-hvac',
    category: 'HVAC Services',
    rating: 4.9,
    reviewCount: 2453,
    description: 'Family-owned HVAC company serving Texas for over 20 years. Specializing in installation, repair, and maintenance.',
    distance: 2.3,
    verified: true,
    licensed: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Pro Plumbing Solutions',
    slug: 'pro-plumbing-solutions',
    category: 'Plumbing',
    rating: 4.8,
    reviewCount: 1876,
    description: 'Emergency plumbing services available 24/7. Licensed, bonded, and insured professionals.',
    distance: 1.8,
    verified: true,
    licensed: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Bright Spark Electrical',
    slug: 'bright-spark-electrical',
    category: 'Electrical',
    rating: 5.0,
    reviewCount: 987,
    description: 'Master electricians specializing in residential and commercial electrical work.',
    distance: 3.1,
    verified: true,
    licensed: true,
    featured: true,
  },
];

const topLocations = [
  { city: 'Houston', businessCount: 2453 },
  { city: 'Austin', businessCount: 1876 },
  { city: 'Dallas', businessCount: 3201 },
  { city: 'San Antonio', businessCount: 1654 },
  { city: 'Fort Worth', businessCount: 1432 },
  { city: 'El Paso', businessCount: 892 },
  { city: 'Arlington', businessCount: 765 },
  { city: 'Plano', businessCount: 643 },
];

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  return (
    <>
      {/* Schema.org JSON-LD for SEO */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateOrganizationSchema()),
        }}
      />

      <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all ${scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <img
                  src="/images/logo.png"
                  alt="BKND Trusted - Verified Local Service Professionals"
                  className="h-12 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/services" className="text-neutral-700 hover:text-brand-600 font-medium transition-colors">
                Services
              </Link>
              <Link href="/how-it-works" className="text-neutral-700 hover:text-brand-600 font-medium transition-colors">
                How It Works
              </Link>
              <Link href="/for-business" className="text-neutral-700 hover:text-brand-600 font-medium transition-colors">
                For Businesses
              </Link>
              <Link href="/trust" className="text-neutral-700 hover:text-brand-600 font-medium transition-colors">
                Trust & Safety
              </Link>
              <button className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors">
                Get Quotes
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6 text-neutral-700" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-neutral-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-neutral-200">
              <div className="flex flex-col gap-4">
                <Link href="/services" className="text-neutral-700 hover:text-brand-600 font-medium transition-colors">
                  Services
                </Link>
                <Link href="/how-it-works" className="text-neutral-700 hover:text-brand-600 font-medium transition-colors">
                  How It Works
                </Link>
                <Link href="/for-business" className="text-neutral-700 hover:text-brand-600 font-medium transition-colors">
                  For Businesses
                </Link>
                <Link href="/trust" className="text-neutral-700 hover:text-brand-600 font-medium transition-colors">
                  Trust & Safety
                </Link>
                <button className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg transition-colors">
                  Get Quotes
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-20">
        <ProfessionalHero />
      </div>

      {/* Trust Banner */}
      <TrustBanner />

      {/* Real-time Activity Feed */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RealtimeActivityFeed />
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-h1 text-neutral-900 mb-4">
              Popular Services
            </h2>
            <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
              Browse our most requested services. All providers are verified and ready to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <ProfessionalCategoryCard key={category.id} category={category} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/services" className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-semibold text-body-lg transition-colors group">
              View All Services
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-section bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-featured-50 border border-featured-400 rounded-full text-featured-600 mb-4">
              <SparklesIcon className="w-5 h-5" />
              <span className="font-semibold text-sm">Featured This Week</span>
            </div>
            <h2 className="text-h1 text-neutral-900 mb-4">
              Top-Rated Local Professionals
            </h2>
            <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
              These businesses consistently deliver exceptional service and have earned our highest ratings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBusinesses.map((business) => (
              <ProfessionalBusinessCard key={business.id} business={business} />
            ))}
          </div>
        </div>
      </section>

      {/* Location Directory */}
      <section className="py-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-h1 text-neutral-900 mb-4">
              Available In Your City
            </h2>
            <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
              BKND Trusted operates in major cities across Texas
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topLocations.map((location) => (
              <Link
                key={location.city}
                href={`/city/${location.city.toLowerCase()}`}
                className="bg-white border-2 border-neutral-200 hover:border-brand-500 p-6 rounded-xl hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-neutral-900 group-hover:text-brand-600 transition-colors mb-1">
                      {location.city}
                    </h3>
                    <p className="text-sm text-neutral-500">{location.businessCount.toLocaleString()} businesses</p>
                  </div>
                  <ChevronRightIcon className="w-5 h-5 text-neutral-400 group-hover:text-brand-600 transition-colors" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/locations" className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-semibold text-body-lg transition-colors group">
              Browse All Locations
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* How It Works */}
      <section className="py-section bg-gradient-to-br from-brand-900 to-brand-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-h1 mb-4">
              How BKND Trusted Works
            </h2>
            <p className="text-body-lg text-brand-100 max-w-2xl mx-auto">
              Finding trusted professionals is easy with our 3-step process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl font-bold text-white">1</span>
              </div>
              <h3 className="text-h3 mb-3">Tell Us What You Need</h3>
              <p className="text-brand-100">
                Search for the service you need and provide details about your project
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-success-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl font-bold text-white">2</span>
              </div>
              <h3 className="text-h3 mb-3">Get Matched With Pros</h3>
              <p className="text-brand-100">
                We'll connect you with verified, licensed professionals in your area
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-featured-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl font-bold text-white">3</span>
              </div>
              <h3 className="text-h3 mb-3">Compare & Choose</h3>
              <p className="text-brand-100">
                Review quotes, ratings, and reviews to select the best pro for your needs
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="bg-white hover:bg-neutral-100 text-brand-600 font-semibold px-8 py-4 text-lg rounded-xl transition-all shadow-lg hover:shadow-xl">
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Final CTA */}
      <section className="py-section bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-h1 text-neutral-900 mb-4">
            Ready to Find Your Perfect Pro?
          </h2>
          <p className="text-body-lg text-neutral-600 mb-10">
            Join thousands of homeowners who trust BKND for their service needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-4 rounded-xl transition-all text-lg shadow-lg hover:shadow-xl">
              Get Free Quotes
            </button>
            <button className="bg-white border-2 border-brand-600 text-brand-600 hover:bg-brand-50 font-semibold px-8 py-4 rounded-xl transition-all text-lg">
              Join as a Pro
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo & About */}
            <div>
              <div className="mb-4">
                <img
                  src="/images/logo.png"
                  alt="BKND Trusted"
                  className="h-12 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-body-sm text-neutral-400">
                Your trusted source for verified local service professionals.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Popular Services</h4>
              <ul className="space-y-3 text-body-sm text-neutral-400">
                <li><Link href="/services/hvac" className="hover:text-white transition-colors">HVAC Services</Link></li>
                <li><Link href="/services/plumbing" className="hover:text-white transition-colors">Plumbing</Link></li>
                <li><Link href="/services/electrical" className="hover:text-white transition-colors">Electrical</Link></li>
                <li><Link href="/search?service=House Cleaning" className="hover:text-white transition-colors">House Cleaning</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-3 text-body-sm text-neutral-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/trust" className="hover:text-white transition-colors">Trust & Safety</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Get in Touch</h4>
              <ul className="space-y-3 text-body-sm text-neutral-400">
                <li className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4" />
                  <span>1-800-TRUSTED</span>
                </li>
                <li className="flex items-center gap-2">
                  <EnvelopeIcon className="w-4 h-4" />
                  <span>support@bkndtrusted.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-body-sm text-neutral-500">
            <p>&copy; 2025 BKND Trusted. All rights reserved. | <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link> | <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}

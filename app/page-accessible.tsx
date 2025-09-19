'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';
import BusinessCard from '@/components/BusinessCard';
import CategoryCard from '@/components/CategoryCard';
import TrustBadge from '@/components/TrustBadge';
import { mockBusinesses, mockCategories, topLocations } from '@/lib/mock-data';
import {
  ShieldCheckIcon,
  CheckBadgeIcon,
  UserGroupIcon,
  MapPinIcon,
  SparklesIcon,
  ChevronRightIcon,
  StarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  PhoneIcon,
  EnvelopeIcon,
  ArrowRightIcon
} from '@heroicons/react/24/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredBusinesses = mockBusinesses.filter(b => b.featured);

  return (
    <div className="min-h-screen">
      {/* Skip to content link for keyboard navigation */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all ${scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur'}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-trust-action rounded-lg flex items-center justify-center">
                  <CheckBadgeIcon className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-trust-deep">BKND Trusted</h1>
                  <p className="text-xs text-text-secondary">Verified Pros Only</p>
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/how-it-works" className="text-text-secondary hover:text-trust-action transition-colors font-medium">
                How It Works
              </Link>
              <Link href="/categories" className="text-text-secondary hover:text-trust-action transition-colors font-medium">
                Services
              </Link>
              <Link href="/for-business" className="text-text-secondary hover:text-trust-action transition-colors font-medium">
                For Business
              </Link>
              <Link href="/trust" className="text-text-secondary hover:text-trust-action transition-colors font-medium">
                Trust & Safety
              </Link>
              <button className="px-4 py-2 bg-trust-action hover:bg-trust-action-hover text-white rounded-lg transition-all font-semibold">
                Get Quotes
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6 text-text-secondary" aria-hidden="true" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-text-secondary" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t" role="menu">
              <div className="flex flex-col gap-4">
                <Link href="/how-it-works" className="text-text-secondary hover:text-trust-action transition-colors font-medium" role="menuitem">
                  How It Works
                </Link>
                <Link href="/categories" className="text-text-secondary hover:text-trust-action transition-colors font-medium" role="menuitem">
                  Services
                </Link>
                <Link href="/for-business" className="text-text-secondary hover:text-trust-action transition-colors font-medium" role="menuitem">
                  For Business
                </Link>
                <Link href="/trust" className="text-text-secondary hover:text-trust-action transition-colors font-medium" role="menuitem">
                  Trust & Safety
                </Link>
                <button className="w-full py-2 bg-trust-action hover:bg-trust-action-hover text-white rounded-lg transition-all font-semibold">
                  Get Quotes
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main id="main-content">
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 bg-gradient-to-br from-trust-deep via-trust-deep/95 to-trust-action overflow-hidden" aria-label="Hero">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10" aria-hidden="true">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-trust-action rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-trust-verified/20 rounded-full text-white mb-6 animate-fade-in">
              <ShieldCheckIcon className="w-5 h-5" aria-hidden="true" />
              <span className="font-medium">All Professionals Background Checked</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-up">
              Find Trusted Local Pros
              <span className="block text-trust-verified mt-2">You Can Count On</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto animate-fade-up">
              Every business is verified, licensed, and insured. Get quotes from top-rated professionals in your area.
            </p>

            {/* Search Bar */}
            <div className="animate-fade-up">
              <SearchBar />
            </div>

            {/* Popular Searches */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
              <span className="text-white/70">Popular:</span>
              {['HVAC Repair', 'Plumbing', 'House Cleaning', 'Electrical'].map((term) => (
                <button
                  key={term}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all"
                  aria-label={`Search for ${term}`}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Indicators Bar */}
        <section className="py-8 bg-white border-b" aria-label="Trust indicators">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center justify-center gap-3">
                <CheckBadgeIcon className="w-8 h-8 text-trust-verified-dark" aria-hidden="true" />
                <div>
                  <p className="text-2xl font-bold text-trust-deep">10,000+</p>
                  <p className="text-sm text-text-secondary">Verified Pros</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <StarIcon className="w-8 h-8 text-trust-gold-text" aria-hidden="true" />
                <div>
                  <p className="text-2xl font-bold text-trust-deep">4.8/5</p>
                  <p className="text-sm text-text-secondary">Avg Rating</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <UserGroupIcon className="w-8 h-8 text-trust-action" aria-hidden="true" />
                <div>
                  <p className="text-2xl font-bold text-trust-deep">500K+</p>
                  <p className="text-sm text-text-secondary">Happy Customers</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <ShieldCheckIcon className="w-8 h-8 text-trust-verified-dark" aria-hidden="true" />
                <div>
                  <p className="text-2xl font-bold text-trust-deep">100%</p>
                  <p className="text-sm text-text-secondary">Insured</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Categories */}
        <section className="py-16 bg-gray-50" aria-label="Popular services">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-trust-deep mb-4">
                Popular Services
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Browse our most requested services. All providers are verified and ready to help.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 text-trust-action hover:text-trust-action-hover font-medium transition-colors"
              >
                View All Services
                <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Businesses */}
        <section className="py-16 bg-white" aria-label="Featured businesses">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-trust-gold/10 rounded-full text-trust-gold-text mb-4 trust-badge-gold">
                <SparklesIcon className="w-5 h-5" aria-hidden="true" />
                <span className="font-medium">Featured This Week</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-trust-deep mb-4">
                Top-Rated Local Professionals
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                These businesses consistently deliver exceptional service and have earned our highest ratings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          </div>
        </section>

        {/* Location Directory */}
        <section className="py-16 bg-gray-50" aria-label="Service locations">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-trust-deep mb-4">
                Available In Your City
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                BKND Trusted operates in major cities across Texas
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {topLocations.map((location) => (
                <Link
                  key={location.city}
                  href={`/city/${location.city.toLowerCase()}`}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-trust-deep group-hover:text-trust-action transition-colors">
                        {location.city}
                      </h3>
                      <p className="text-sm text-text-secondary">{location.businessCount} businesses</p>
                    </div>
                    <ChevronRightIcon className="w-5 h-5 text-text-muted group-hover:text-trust-action transition-colors" aria-hidden="true" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 text-trust-action hover:text-trust-action-hover font-medium transition-colors"
              >
                Browse All Locations
                <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white" aria-label="How it works">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-trust-deep mb-4">
                How BKND Trusted Works
              </h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Finding trusted professionals is easy with our 3-step process
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-trust-action/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-trust-action" aria-label="Step 1">1</span>
                </div>
                <h3 className="text-xl font-bold text-trust-deep mb-2">Tell Us What You Need</h3>
                <p className="text-text-secondary">
                  Search for the service you need and provide details about your project
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-trust-verified/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-trust-verified-dark" aria-label="Step 2">2</span>
                </div>
                <h3 className="text-xl font-bold text-trust-deep mb-2">Get Matched With Pros</h3>
                <p className="text-text-secondary">
                  We'll connect you with verified, licensed professionals in your area
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-trust-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-trust-gold-text" aria-label="Step 3">3</span>
                </div>
                <h3 className="text-xl font-bold text-trust-deep mb-2">Compare & Choose</h3>
                <p className="text-text-secondary">
                  Review quotes, ratings, and reviews to select the best pro for your needs
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <button
                className="px-8 py-4 bg-trust-action hover:bg-trust-action-hover text-white font-semibold text-lg rounded-xl transition-all transform hover:scale-105 hover:shadow-lg"
                aria-label="Get started with finding a professional"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 bg-gradient-to-r from-trust-deep to-trust-action text-white" aria-label="Trust and quality guarantees">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why Choose BKND Trusted?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckBadgeIcon className="w-6 h-6 text-trust-verified flex-shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <h3 className="font-semibold mb-1">Background Checked</h3>
                      <p className="text-white/90">Every professional undergoes thorough background verification</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheckIcon className="w-6 h-6 text-trust-verified flex-shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <h3 className="font-semibold mb-1">Licensed & Insured</h3>
                      <p className="text-white/90">All businesses carry proper licensing and insurance</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <StarIcon className="w-6 h-6 text-trust-gold flex-shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <h3 className="font-semibold mb-1">Quality Guaranteed</h3>
                      <p className="text-white/90">Satisfaction guarantee on all services booked through us</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CurrencyDollarIcon className="w-6 h-6 text-trust-verified flex-shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <h3 className="font-semibold mb-1">Fair Pricing</h3>
                      <p className="text-white/90">Transparent pricing with no hidden fees</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Our Trust Promise</h3>
                <p className="text-white/90 mb-6">
                  We stand behind every professional on our platform. If you're not satisfied with the service,
                  we'll work with you to make it right or provide a full refund.
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold">$1M</p>
                    <p className="text-sm text-white/90">Insurance Coverage</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold">24/7</p>
                    <p className="text-sm text-white/90">Customer Support</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold">100%</p>
                    <p className="text-sm text-white/90">Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50" aria-label="Call to action">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-trust-deep mb-4">
              Ready to Find Your Perfect Pro?
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Join thousands of homeowners who trust BKND for their service needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-8 py-4 bg-trust-action hover:bg-trust-action-hover text-white font-semibold rounded-xl transition-all transform hover:scale-105"
                aria-label="Get free quotes from professionals"
              >
                Get Free Quotes
              </button>
              <button
                className="px-8 py-4 bg-white border-2 border-trust-action text-trust-action hover:bg-trust-action hover:text-white font-semibold rounded-xl transition-all"
                aria-label="Join as a service professional"
              >
                Join as a Pro
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-trust-deep text-white py-12" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo & About */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <CheckBadgeIcon className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">BKND Trusted</h1>
                  <p className="text-xs text-white/70">Verified Pros Only</p>
                </div>
              </div>
              <p className="text-sm text-white/70">
                Your trusted source for verified local service professionals.
              </p>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold mb-4">Popular Services</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/hvac" className="hover:text-white transition-colors">HVAC Services</Link></li>
                <li><Link href="/plumbing" className="hover:text-white transition-colors">Plumbing</Link></li>
                <li><Link href="/electrical" className="hover:text-white transition-colors">Electrical</Link></li>
                <li><Link href="/cleaning" className="hover:text-white transition-colors">House Cleaning</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/trust" className="hover:text-white transition-colors">Trust & Safety</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Get in Touch</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4" aria-hidden="true" />
                  <span>1-800-TRUSTED</span>
                </li>
                <li className="flex items-center gap-2">
                  <EnvelopeIcon className="w-4 h-4" aria-hidden="true" />
                  <span>support@bkndtrusted.com</span>
                </li>
              </ul>
              <div className="flex gap-4 mt-4">
                <div className="w-20 h-12 bg-white/20 rounded flex items-center justify-center" aria-label="Security certified">
                  <ShieldCheckIcon className="w-6 h-6" aria-hidden="true" />
                </div>
                <div className="w-20 h-12 bg-white/20 rounded flex items-center justify-center" aria-label="Verified business">
                  <CheckBadgeIcon className="w-6 h-6" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/70">
            <p>&copy; 2024 BKND Trusted. All rights reserved. |
              <Link href="/privacy" className="hover:text-white/80 transition-colors"> Privacy Policy</Link> |
              <Link href="/terms" className="hover:text-white/80 transition-colors"> Terms of Service</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
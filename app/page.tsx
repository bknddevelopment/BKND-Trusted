'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';
import BusinessCard from '@/components/BusinessCard';
import CategoryCard from '@/components/CategoryCard';
import TrustBadge from '@/components/TrustBadge';
import AnimatedHero from '@/components/AnimatedHero';
import AnimatedSection from '@/components/AnimatedSection';
import AnimatedCounter from '@/components/AnimatedCounter';
import Carousel from '@/components/Carousel';
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
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all ${scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-trust-action rounded-lg flex items-center justify-center">
                  <CheckBadgeIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-trust-deep">BKND Trusted</h1>
                  <p className="text-xs text-gray-600">Verified Pros Only</p>
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/how-it-works" className="text-gray-700 hover:text-trust-action transition-colors">
                How It Works
              </Link>
              <Link href="/categories" className="text-gray-700 hover:text-trust-action transition-colors">
                Services
              </Link>
              <Link href="/for-business" className="text-gray-700 hover:text-trust-action transition-colors">
                For Business
              </Link>
              <Link href="/trust" className="text-gray-700 hover:text-trust-action transition-colors">
                Trust & Safety
              </Link>
              <button className="px-4 py-2 bg-trust-action hover:bg-trust-action-hover text-white rounded-lg transition-all">
                Get Quotes
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6 text-gray-700" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col gap-4">
                <Link href="/how-it-works" className="text-gray-700 hover:text-trust-action transition-colors">
                  How It Works
                </Link>
                <Link href="/categories" className="text-gray-700 hover:text-trust-action transition-colors">
                  Services
                </Link>
                <Link href="/for-business" className="text-gray-700 hover:text-trust-action transition-colors">
                  For Business
                </Link>
                <Link href="/trust" className="text-gray-700 hover:text-trust-action transition-colors">
                  Trust & Safety
                </Link>
                <button className="w-full py-2 bg-trust-action hover:bg-trust-action-hover text-white rounded-lg transition-all">
                  Get Quotes
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Advanced Animated Hero Section */}
      <AnimatedHero />

      {/* Animated Trust Indicators Bar */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <AnimatedSection animation="scale" delay={100}>
              <div className="flex items-center justify-center gap-3 hover-lift transition-all">
                <CheckBadgeIcon className="w-8 h-8 text-trust-verified animate-trust-pulse" />
                <div>
                  <p className="text-2xl font-bold text-trust-deep">
                    <AnimatedCounter endValue={10000} suffix="+" />
                  </p>
                  <p className="text-sm text-gray-600">Verified Pros</p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={200}>
              <div className="flex items-center justify-center gap-3 hover-lift transition-all">
                <StarIcon className="w-8 h-8 text-trust-gold animate-badge-float" />
                <div>
                  <p className="text-2xl font-bold text-trust-deep">
                    <AnimatedCounter endValue={4.8} decimals={1} suffix="/5" />
                  </p>
                  <p className="text-sm text-gray-600">Avg Rating</p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={300}>
              <div className="flex items-center justify-center gap-3 hover-lift transition-all">
                <UserGroupIcon className="w-8 h-8 text-trust-action animate-trust-pulse" />
                <div>
                  <p className="text-2xl font-bold text-trust-deep">
                    <AnimatedCounter endValue={500} suffix="K+" />
                  </p>
                  <p className="text-sm text-gray-600">Happy Customers</p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="scale" delay={400}>
              <div className="flex items-center justify-center gap-3 hover-lift transition-all">
                <ShieldCheckIcon className="w-8 h-8 text-trust-verified animate-badge-float" />
                <div>
                  <p className="text-2xl font-bold text-trust-deep">
                    <AnimatedCounter endValue={100} suffix="%" />
                  </p>
                  <p className="text-sm text-gray-600">Insured</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Popular Categories with Animation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-trust-deep mb-4">
                Popular Services
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Browse our most requested services. All providers are verified and ready to help.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCategories.map((category, index) => (
              <AnimatedSection key={category.id} animation="slide-up" delay={index * 100}>
                <CategoryCard category={category} />
              </AnimatedSection>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/categories" className="inline-flex items-center gap-2 text-trust-action hover:text-trust-action-hover font-medium transition-colors">
              View All Services
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Businesses Carousel */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-trust-gold/10 rounded-full text-trust-gold mb-4 glow">
                <SparklesIcon className="w-5 h-5 animate-badge-float" />
                <span className="font-medium">Featured This Week</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-trust-deep mb-4">
                Top-Rated Local Professionals
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These businesses consistently deliver exceptional service and have earned our highest ratings.
              </p>
            </div>
          </AnimatedSection>

          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-3 gap-6">
            {featuredBusinesses.map((business, index) => (
              <AnimatedSection key={business.id} animation="slide-up" delay={index * 100}>
                <BusinessCard business={business} />
              </AnimatedSection>
            ))}
          </div>

          {/* Mobile/Tablet Carousel */}
          <div className="lg:hidden">
            <Carousel
              items={featuredBusinesses.map((business) => (
                <div key={business.id} className="px-4">
                  <BusinessCard business={business} />
                </div>
              ))}
              autoPlay
              autoPlayInterval={5000}
              showIndicators
              showControls
            />
          </div>
        </div>
      </section>

      {/* Location Directory */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-trust-deep mb-4">
              Available In Your City
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
                    <p className="text-sm text-gray-600">{location.businessCount} businesses</p>
                  </div>
                  <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-trust-action transition-colors" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/locations" className="inline-flex items-center gap-2 text-trust-action hover:text-trust-action-hover font-medium transition-colors">
              Browse All Locations
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works with 3D Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="fade">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-trust-deep mb-4">
                How BKND Trusted Works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Finding trusted professionals is easy with our 3-step process
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <AnimatedSection animation="slide-left" delay={100}>
              <div className="text-center card-3d">
                <div className="card-3d-inner">
                  <div className="card-3d-front p-6">
                    <div className="w-20 h-20 bg-trust-action/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-trust-pulse">
                      <span className="text-3xl font-bold text-trust-action">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-trust-deep mb-2">Tell Us What You Need</h3>
                    <p className="text-gray-600">
                      Search for the service you need and provide details about your project
                    </p>
                  </div>
                  <div className="card-3d-back bg-trust-action text-white p-6 flex items-center justify-center">
                    <p className="text-lg font-medium">It takes less than 60 seconds to describe your project!</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Step 2 */}
            <AnimatedSection animation="slide-up" delay={200}>
              <div className="text-center card-3d">
                <div className="card-3d-inner">
                  <div className="card-3d-front p-6">
                    <div className="w-20 h-20 bg-trust-verified/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-badge-float">
                      <span className="text-3xl font-bold text-trust-verified">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-trust-deep mb-2">Get Matched With Pros</h3>
                    <p className="text-gray-600">
                      We'll connect you with verified, licensed professionals in your area
                    </p>
                  </div>
                  <div className="card-3d-back bg-trust-verified text-white p-6 flex items-center justify-center">
                    <p className="text-lg font-medium">Our AI matches you with the top 3 best-fit professionals!</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Step 3 */}
            <AnimatedSection animation="slide-right" delay={300}>
              <div className="text-center card-3d">
                <div className="card-3d-inner">
                  <div className="card-3d-front p-6">
                    <div className="w-20 h-20 bg-trust-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-trust-pulse">
                      <span className="text-3xl font-bold text-trust-gold">3</span>
                    </div>
                    <h3 className="text-xl font-bold text-trust-deep mb-2">Compare & Choose</h3>
                    <p className="text-gray-600">
                      Review quotes, ratings, and reviews to select the best pro for your needs
                    </p>
                  </div>
                  <div className="card-3d-back bg-trust-gold text-white p-6 flex items-center justify-center">
                    <p className="text-lg font-medium">Average savings of 30% compared to traditional quotes!</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-trust-action hover:bg-trust-action-hover text-white font-semibold text-lg rounded-xl transition-all transform hover:scale-105 hover:shadow-lg">
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gradient-to-r from-trust-deep to-trust-action text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose BKND Trusted?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckBadgeIcon className="w-6 h-6 text-trust-verified flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Background Checked</h3>
                    <p className="text-white/90">Every professional undergoes thorough background verification</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheckIcon className="w-6 h-6 text-trust-verified flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Licensed & Insured</h3>
                    <p className="text-white/90">All businesses carry proper licensing and insurance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <StarIcon className="w-6 h-6 text-trust-gold flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Quality Guaranteed</h3>
                    <p className="text-white/90">Satisfaction guarantee on all services booked through us</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CurrencyDollarIcon className="w-6 h-6 text-trust-verified flex-shrink-0 mt-1" />
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-trust-deep mb-4">
            Ready to Find Your Perfect Pro?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of homeowners who trust BKND for their service needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-trust-action hover:bg-trust-action-hover text-white font-semibold rounded-xl transition-all transform hover:scale-105">
              Get Free Quotes
            </button>
            <button className="px-8 py-4 bg-white border-2 border-trust-action text-trust-action hover:bg-trust-action hover:text-white font-semibold rounded-xl transition-all">
              Join as a Pro
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-trust-deep text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo & About */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <CheckBadgeIcon className="w-6 h-6 text-white" />
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
                  <PhoneIcon className="w-4 h-4" />
                  <span>1-800-TRUSTED</span>
                </li>
                <li className="flex items-center gap-2">
                  <EnvelopeIcon className="w-4 h-4" />
                  <span>support@bkndtrusted.com</span>
                </li>
              </ul>
              <div className="flex gap-4 mt-4">
                <div className="w-20 h-12 bg-white/20 rounded flex items-center justify-center">
                  <ShieldCheckIcon className="w-6 h-6" />
                </div>
                <div className="w-20 h-12 bg-white/20 rounded flex items-center justify-center">
                  <CheckBadgeIcon className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/70">
            <p>&copy; 2024 BKND Trusted. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
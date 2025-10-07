'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  MagnifyingGlassIcon,
  FireIcon,
  WrenchScrewdriverIcon,
  BoltIcon,
  SparklesIcon,
  PaintBrushIcon,
  HomeIcon,
  TruckIcon,
  BeakerIcon,
  WrenchIcon,
  ShieldCheckIcon,
  StarIcon,
  CheckBadgeIcon,
  ArrowRightIcon,
  MapPinIcon,
} from '@heroicons/react/24/solid';

interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: React.ReactNode;
  proCount: number;
  averageRating: number;
  averagePrice: string;
  popularJobs: string[];
  image: string;
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: '1',
    name: 'HVAC Services',
    slug: 'hvac',
    description: 'Heating, cooling, air quality experts for residential and commercial properties',
    icon: <FireIcon className="w-8 h-8" />,
    proCount: 245,
    averageRating: 4.7,
    averagePrice: '$200 - $800',
    popularJobs: ['AC Repair', 'Furnace Installation', 'HVAC Maintenance', 'Duct Cleaning'],
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&h=600&fit=crop',
  },
  {
    id: '2',
    name: 'Plumbing',
    slug: 'plumbing',
    description: 'Licensed plumbers for repairs, installations, and emergency services',
    icon: <WrenchScrewdriverIcon className="w-8 h-8" />,
    proCount: 312,
    averageRating: 4.8,
    averagePrice: '$150 - $500',
    popularJobs: ['Leak Repairs', 'Drain Cleaning', 'Water Heater Installation', 'Emergency Plumbing'],
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop',
  },
  {
    id: '3',
    name: 'Electrical',
    slug: 'electrical',
    description: 'Certified electricians for all your residential and commercial needs',
    icon: <BoltIcon className="w-8 h-8" />,
    proCount: 189,
    averageRating: 4.9,
    averagePrice: '$100 - $600',
    popularJobs: ['Panel Upgrades', 'Outlet Installation', 'Lighting Installation', 'Electrical Repairs'],
    image: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=800&h=600&fit=crop',
  },
  {
    id: '4',
    name: 'House Cleaning',
    slug: 'cleaning',
    description: 'Professional cleaning services for homes and offices',
    icon: <SparklesIcon className="w-8 h-8" />,
    proCount: 428,
    averageRating: 4.6,
    averagePrice: '$100 - $300',
    popularJobs: ['Deep Cleaning', 'Move-Out Cleaning', 'Regular Maintenance', 'Office Cleaning'],
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop',
  },
  {
    id: '5',
    name: 'Painting',
    slug: 'painting',
    description: 'Interior and exterior painting professionals',
    icon: <PaintBrushIcon className="w-8 h-8" />,
    proCount: 167,
    averageRating: 4.7,
    averagePrice: '$300 - $2,000',
    popularJobs: ['Interior Painting', 'Exterior Painting', 'Cabinet Painting', 'Wallpaper Removal'],
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&h=600&fit=crop',
  },
  {
    id: '6',
    name: 'General Contractors',
    slug: 'contractors',
    description: 'Full-service remodeling and construction experts',
    icon: <HomeIcon className="w-8 h-8" />,
    proCount: 203,
    averageRating: 4.8,
    averagePrice: '$1,000 - $10,000+',
    popularJobs: ['Kitchen Remodeling', 'Bathroom Renovation', 'Room Additions', 'General Repairs'],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
  },
  {
    id: '7',
    name: 'Landscaping',
    slug: 'landscaping',
    description: 'Lawn care, landscaping design, and outdoor maintenance',
    icon: <WrenchIcon className="w-8 h-8" />,
    proCount: 276,
    averageRating: 4.6,
    averagePrice: '$150 - $800',
    popularJobs: ['Lawn Mowing', 'Landscape Design', 'Tree Trimming', 'Irrigation Systems'],
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&h=600&fit=crop',
  },
  {
    id: '8',
    name: 'Roofing',
    slug: 'roofing',
    description: 'Expert roofing installation, repair, and maintenance',
    icon: <HomeIcon className="w-8 h-8" />,
    proCount: 134,
    averageRating: 4.8,
    averagePrice: '$500 - $15,000',
    popularJobs: ['Roof Repair', 'Roof Replacement', 'Gutter Installation', 'Leak Repair'],
    image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=800&h=600&fit=crop',
  },
  {
    id: '9',
    name: 'Moving Services',
    slug: 'moving',
    description: 'Professional movers for local and long-distance moves',
    icon: <TruckIcon className="w-8 h-8" />,
    proCount: 198,
    averageRating: 4.7,
    averagePrice: '$300 - $2,000',
    popularJobs: ['Local Moving', 'Long Distance Moving', 'Packing Services', 'Storage Solutions'],
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop',
  },
  {
    id: '10',
    name: 'Pest Control',
    slug: 'pest-control',
    description: 'Safe and effective pest removal and prevention',
    icon: <BeakerIcon className="w-8 h-8" />,
    proCount: 156,
    averageRating: 4.7,
    averagePrice: '$100 - $400',
    popularJobs: ['Termite Treatment', 'Rodent Control', 'Bed Bug Treatment', 'General Pest Control'],
    image: 'https://images.unsplash.com/photo-1567428485548-95ec30329c8e?w=800&h=600&fit=crop',
  },
  {
    id: '11',
    name: 'Handyman',
    slug: 'handyman',
    description: 'General repairs and home maintenance services',
    icon: <WrenchIcon className="w-8 h-8" />,
    proCount: 389,
    averageRating: 4.6,
    averagePrice: '$75 - $300',
    popularJobs: ['General Repairs', 'Furniture Assembly', 'Drywall Repair', 'Door Installation'],
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop',
  },
  {
    id: '12',
    name: 'Appliance Repair',
    slug: 'appliance-repair',
    description: 'Expert repair for all major home appliances',
    icon: <WrenchScrewdriverIcon className="w-8 h-8" />,
    proCount: 142,
    averageRating: 4.8,
    averagePrice: '$150 - $500',
    popularJobs: ['Refrigerator Repair', 'Washer/Dryer Repair', 'Dishwasher Repair', 'Oven Repair'],
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=600&fit=crop',
  },
];

export default function ServicesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('service', searchQuery);
    if (zipCode) params.set('zip', zipCode);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center">
              <img
                src="/images/logo.png"
                alt="BKND Trusted - Verified Local Service Professionals"
                className="h-12 w-auto"
              />
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/">
                <button className="text-neutral-700 hover:text-brand-600 font-medium">
                  ← Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Browse All Services
            </h1>
            <p className="text-xl text-brand-100 mb-10">
              Find verified, licensed professionals for every home service need. Over 2,500+ background-checked pros ready to help.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-6">
                  <label htmlFor="service-search" className="block text-sm font-medium text-neutral-700 mb-2 text-left">
                    What service do you need?
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="service-search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="e.g., Plumbing, HVAC, Electrical..."
                      className="w-full px-4 py-3 pr-10 border-2 border-neutral-200 rounded-lg focus:border-brand-600 focus:ring-2 focus:ring-brand-100 focus:outline-none text-base text-neutral-900"
                    />
                    <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  </div>
                </div>

                <div className="md:col-span-4">
                  <label htmlFor="zip-search" className="block text-sm font-medium text-neutral-700 mb-2 text-left">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zip-search"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Enter ZIP"
                    maxLength={5}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-brand-600 focus:ring-2 focus:ring-brand-100 focus:outline-none text-base text-neutral-900"
                  />
                </div>

                <div className="md:col-span-2 flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-lg"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>

            {/* Trust Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-10 text-white">
              <div className="flex items-center gap-2">
                <CheckBadgeIcon className="w-6 h-6 text-success-400" />
                <span className="font-semibold">2,500+ Verified Pros</span>
              </div>
              <div className="flex items-center gap-2">
                <StarIcon className="w-6 h-6 text-featured-400" />
                <span className="font-semibold">4.7 Average Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="w-6 h-6 text-brand-300" />
                <span className="font-semibold">100% Background Checked</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              All Service Categories
            </h2>
            <p className="text-xl text-neutral-600">
              Browse by category to find the perfect professional for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICE_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/services/${category.slug}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border-2 border-transparent hover:border-brand-500"
              >
                {/* Image Header */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="w-14 h-14 bg-brand-600 rounded-xl flex items-center justify-center mb-2">
                      {category.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2 group-hover:text-brand-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-neutral-600 mb-4">
                    {category.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1 text-neutral-700">
                      <CheckBadgeIcon className="w-4 h-4 text-success-500" />
                      <span className="font-semibold">{category.proCount} Pros</span>
                    </div>
                    <div className="flex items-center gap-1 text-neutral-700">
                      <StarIcon className="w-4 h-4 text-featured-400" />
                      <span className="font-semibold">{category.averageRating} Rating</span>
                    </div>
                  </div>

                  {/* Average Price */}
                  <div className="text-sm text-neutral-600 mb-4">
                    <span className="font-semibold">Average Cost: </span>
                    {category.averagePrice}
                  </div>

                  {/* Popular Jobs */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-neutral-500 uppercase mb-2">Popular Services:</div>
                    <div className="flex flex-wrap gap-2">
                      {category.popularJobs.slice(0, 3).map((job, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-brand-50 text-brand-700 rounded-full"
                        >
                          {job}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                    <span className="text-brand-600 font-semibold group-hover:text-brand-700">
                      View Professionals
                    </span>
                    <ArrowRightIcon className="w-5 h-5 text-brand-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-brand-600 to-brand-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl text-brand-100 mb-8">
            We're here to help. Tell us what you need and we'll connect you with the right professional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search">
              <button className="bg-white text-brand-600 hover:bg-brand-50 font-semibold px-8 py-4 rounded-xl transition-all text-lg shadow-lg">
                Search All Services
              </button>
            </Link>
            <a href="tel:8008787833">
              <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-all text-lg">
                Call (800) TRUSTED
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

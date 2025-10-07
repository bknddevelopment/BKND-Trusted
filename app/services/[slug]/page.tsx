'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircleIcon,
  StarIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  TrophyIcon,
  BoltIcon,
  InformationCircleIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/solid';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn, formatNumber, formatPhone } from '@/lib/utils';

interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  averagePrice: string;
  popularServices: string[];
  faqs: { question: string; answer: string }[];
  proCount: number;
}

interface Business {
  id: string;
  name: string;
  slug: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  services: string[];
  hireCount: number;
  badges: string[];
  isOnline: boolean;
  reviewSnippet: {
    author: string;
    text: string;
    highlight: string[];
  };
  pricing: {
    type: 'starting' | 'service-call' | 'free-estimate' | 'contact';
    amount?: number;
    waived?: boolean;
  };
  location: string;
}

// Mock data - replace with actual API call
const SERVICE_CATEGORIES: Record<string, ServiceCategory> = {
  'plumbing': {
    id: '1',
    name: 'Plumbing Services',
    slug: 'plumbing',
    description: 'Expert plumbing services for residential and commercial properties',
    longDescription: 'Find licensed and insured plumbers for all your plumbing needs. From emergency repairs to new installations, our verified professionals provide fast, reliable service with upfront pricing.',
    averagePrice: '$150 - $500',
    proCount: 312,
    popularServices: [
      'Leak Repairs',
      'Drain Cleaning',
      'Water Heater Installation',
      'Pipe Replacement',
      'Emergency Plumbing',
      'Fixture Installation',
    ],
    faqs: [
      {
        question: 'How much does a plumber cost?',
        answer: 'The average cost for a plumber is $150-$500 depending on the complexity of the job. Emergency services may have additional fees.',
      },
      {
        question: 'Are plumbers licensed and insured?',
        answer: 'Yes, all plumbers on BKND Trusted are fully licensed, bonded, and insured for your protection.',
      },
      {
        question: 'Do you offer emergency plumbing services?',
        answer: 'Many of our plumbers offer 24/7 emergency services for urgent issues like burst pipes or major leaks.',
      },
    ],
  },
  'hvac': {
    id: '2',
    name: 'HVAC Services',
    slug: 'hvac',
    description: 'Professional HVAC installation, repair, and maintenance services',
    longDescription: 'Connect with certified HVAC technicians for air conditioning, heating, and ventilation services. Our professionals provide energy-efficient solutions and emergency repairs.',
    averagePrice: '$200 - $800',
    proCount: 245,
    popularServices: [
      'AC Repair',
      'Furnace Installation',
      'HVAC Maintenance',
      'Duct Cleaning',
      'Thermostat Installation',
      'Heat Pump Services',
    ],
    faqs: [
      {
        question: 'How often should I service my HVAC system?',
        answer: 'We recommend servicing your HVAC system at least twice a year - once before summer and once before winter.',
      },
      {
        question: 'What is the average cost of HVAC repair?',
        answer: 'HVAC repairs typically range from $200 to $800 depending on the issue. Emergency services may cost more.',
      },
      {
        question: 'How long does HVAC installation take?',
        answer: 'A full HVAC system installation usually takes 1-2 days depending on the complexity of the job.',
      },
    ],
  },
  'electrical': {
    id: '3',
    name: 'Electrical Services',
    slug: 'electrical',
    description: 'Licensed electricians for all residential and commercial electrical needs',
    longDescription: 'Get fast, safe electrical services from certified electricians. We handle everything from simple repairs to complete rewiring, panel upgrades, and smart home installations.',
    averagePrice: '$100 - $600',
    proCount: 189,
    popularServices: [
      'Panel Upgrades',
      'Outlet Installation',
      'Lighting Installation',
      'Electrical Repairs',
      'Circuit Breaker Replacement',
      'Generator Installation',
    ],
    faqs: [
      {
        question: 'How do I know if I need an electrical panel upgrade?',
        answer: 'Signs include frequent breaker trips, flickering lights, burning smells, or if your panel is over 25 years old.',
      },
      {
        question: 'Are electrical services expensive?',
        answer: 'Electrical services range from $100-$600 depending on the job. We provide upfront quotes before starting work.',
      },
      {
        question: 'Do electricians offer emergency services?',
        answer: 'Yes, many of our electricians offer 24/7 emergency services for urgent electrical issues.',
      },
    ],
  },
};

// Mock business listings - replace with actual API call
const MOCK_BUSINESSES: Record<string, Business[]> = {
  plumbing: [
    {
      id: '1',
      name: 'Pro Plumbing Solutions',
      slug: 'pro-plumbing-solutions',
      rating: 4.9,
      reviewCount: 147,
      imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=400&fit=crop',
      services: ['Plumbing Drain Repair', 'Plumbing Pipe Repair', 'Water Heater Repair', 'Emergency Plumbing'],
      hireCount: 234,
      badges: ['Top Pro', 'Licensed Pro', 'In High Demand'],
      isOnline: true,
      reviewSnippet: {
        author: 'Michael T.',
        text: 'Absolutely professional and thorough work. Arrived on time and fixed my drain issue quickly.',
        highlight: ['professional', 'on time'],
      },
      pricing: {
        type: 'service-call',
        amount: 85,
        waived: true,
      },
      location: 'Newark, NJ',
    },
    {
      id: '2',
      name: 'Rapid Response Plumbing',
      slug: 'rapid-response-plumbing',
      rating: 4.8,
      reviewCount: 93,
      imageUrl: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=400&fit=crop',
      services: ['Emergency Plumbing', 'Leak Repairs', 'Pipe Installation', 'Drain Cleaning'],
      hireCount: 156,
      badges: ['Licensed Pro', 'Great Value'],
      isOnline: false,
      reviewSnippet: {
        author: 'Sarah M.',
        text: 'Quick response time and very affordable pricing. Highly recommend for emergency repairs.',
        highlight: ['Quick response', 'affordable'],
      },
      pricing: {
        type: 'starting',
        amount: 95,
      },
      location: 'Jersey City, NJ',
    },
    {
      id: '3',
      name: 'Elite Plumbing Services',
      slug: 'elite-plumbing',
      rating: 5.0,
      reviewCount: 67,
      imageUrl: 'https://images.unsplash.com/photo-1560185127-6d5f7aa24625?w=400&h=400&fit=crop',
      services: ['Water Heater Installation', 'Plumbing Inspection', 'Fixture Installation', 'Pipe Repair'],
      hireCount: 89,
      badges: ['Top Pro', 'Licensed Pro'],
      isOnline: true,
      reviewSnippet: {
        author: 'David L.',
        text: 'Excellent service from start to finish. Very knowledgeable and explained everything clearly.',
        highlight: ['Excellent service', 'knowledgeable'],
      },
      pricing: {
        type: 'free-estimate',
      },
      location: 'Newark, NJ',
    },
  ],
  hvac: [
    {
      id: '4',
      name: 'Cool Breeze HVAC',
      slug: 'cool-breeze-hvac',
      rating: 4.9,
      reviewCount: 203,
      imageUrl: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=400&h=400&fit=crop',
      services: ['AC Repair', 'Furnace Installation', 'HVAC Maintenance', 'Duct Cleaning'],
      hireCount: 312,
      badges: ['Top Pro', 'Licensed Pro', 'In High Demand'],
      isOnline: true,
      reviewSnippet: {
        author: 'Jennifer P.',
        text: 'Outstanding service! Fixed my AC in under an hour and the price was very reasonable.',
        highlight: ['Outstanding service', 'reasonable'],
      },
      pricing: {
        type: 'service-call',
        amount: 75,
        waived: false,
      },
      location: 'Jersey City, NJ',
    },
  ],
  electrical: [
    {
      id: '5',
      name: 'Bright Spark Electrical',
      slug: 'bright-spark-electrical',
      rating: 5.0,
      reviewCount: 134,
      imageUrl: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=400&h=400&fit=crop',
      services: ['Panel Upgrades', 'Outlet Installation', 'Lighting Installation', 'Electrical Repairs'],
      hireCount: 198,
      badges: ['Top Pro', 'Licensed Pro', 'In High Demand'],
      isOnline: true,
      reviewSnippet: {
        author: 'Robert K.',
        text: 'Master electrician who really knows his stuff. Safe, clean work and great communication.',
        highlight: ['Master electrician', 'great communication'],
      },
      pricing: {
        type: 'starting',
        amount: 120,
      },
      location: 'Newark, NJ',
    },
  ],
};

export default function ServiceDetailPage() {
  const router = useRouter();
  const [zipCode, setZipCode] = useState('');
  const params = useParams();
  const slug = params.slug as string;
  const service = SERVICE_CATEGORIES[slug];
  const businesses = MOCK_BUSINESSES[slug] || [];

  const handleZipSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode) {
      router.push(`/search?service=${encodeURIComponent(service.name)}&zip=${zipCode}`);
    }
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-12 text-center">
            <h1 className="text-h2 text-neutral-900 mb-4">Service Not Found</h1>
            <p className="text-body text-neutral-600 mb-6">
              The service you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Link href="/">
              <Button variant="primary">Back to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

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

      {/* Hero Section - Thumbtack Style */}
      <section className="relative bg-white overflow-hidden py-16">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=2070&auto=format&fit=crop"
            alt="Professional service"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-4">
                {service.name}
              </h1>
              <p className="text-xl text-neutral-600 mb-4">
                Check out <span className="font-bold text-brand-600">{service.proCount}</span> {service.name.toLowerCase()} pros in your area
              </p>
              <p className="text-lg text-neutral-600 mb-8">
                {service.longDescription}
              </p>

              {/* Location Input - Primary CTA */}
              <form onSubmit={handleZipSearch} className="bg-white rounded-xl shadow-lg p-6 border-2 border-neutral-200">
                <label htmlFor="zip" className="block text-sm font-semibold text-neutral-900 mb-2">
                  <MapPinIcon className="w-4 h-4 inline mr-1" />
                  Confirm your location to see highly-rated pros near you
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    id="zip"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Enter ZIP code"
                    maxLength={5}
                    className="flex-1 px-4 py-3 border-2 border-neutral-300 rounded-lg focus:border-brand-600 focus:ring-2 focus:ring-brand-100 focus:outline-none text-lg"
                  />
                  <Button type="submit" variant="primary" size="lg" className="px-8">
                    Find a Pro
                  </Button>
                </div>
              </form>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mt-6">
                <div className="flex items-center gap-2 text-neutral-700">
                  <CheckBadgeIcon className="w-5 h-5 text-success-500" />
                  <span className="font-semibold">{service.proCount}+ Verified Pros</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700">
                  <StarIcon className="w-5 h-5 text-featured-400" />
                  <span className="font-semibold">4.8 Average Rating</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-700">
                  <ShieldCheckIcon className="w-5 h-5 text-brand-600" />
                  <span className="font-semibold">100% Insured</span>
                </div>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="hidden lg:block">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=600&fit=crop"
                  alt="Professional at work"
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
            <Link href="/services" className="hover:text-brand-600">Services</Link>
            <span>/</span>
            <span className="text-neutral-900 font-medium">{service.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content - Thumbtack Style Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-neutral-50">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-2">
            Top pros for your project
          </h2>
          <p className="text-neutral-600">
            Showing {businesses.length} highly-rated professionals
          </p>
        </div>

        {/* Professional Listings */}
        <div className="space-y-6">
          {businesses.map((business, index) => (
            <Card key={business.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex gap-6">
                  {/* Circular Profile Photo */}
                  <div className="flex-shrink-0">
                    <img
                      src={business.imageUrl}
                      alt={business.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-neutral-100"
                    />
                  </div>

                  {/* Business Info */}
                  <div className="flex-1">
                    {/* Ranking & Name */}
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
                          {business.badges.map((badge) => (
                            <span
                              key={badge}
                              className={cn(
                                "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold",
                                badge === 'Top Pro' && "bg-cyan-50 text-cyan-700 border border-cyan-400",
                                badge === 'Licensed Pro' && "bg-blue-50 text-blue-700 border border-blue-400",
                                badge === 'In High Demand' && "bg-orange-50 text-orange-700 border border-orange-400",
                                badge === 'Great Value' && "bg-green-50 text-green-700 border border-green-400"
                              )}
                            >
                              {badge === 'Top Pro' && <CheckBadgeIcon className="w-3 h-3" />}
                              {badge === 'Licensed Pro' && <ShieldCheckIcon className="w-3 h-3" />}
                              {badge === 'In High Demand' && <BoltIcon className="w-3 h-3" />}
                              {badge}
                            </span>
                          ))}
                          {business.isOnline && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 border border-green-400 rounded-full text-xs font-semibold">
                              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                              Online now
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Services Offered */}
                    <div className="mb-4">
                      <p className="text-neutral-700">
                        <span className="font-semibold">Services: </span>
                        {business.services.slice(0, 3).join(', ')}
                        {business.services.length > 3 && (
                          <button className="text-brand-600 hover:text-brand-700 ml-1">
                            ...See all
                          </button>
                        )}
                      </p>
                    </div>

                    {/* Platform Stats & Location */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="w-4 h-4" />
                        Serves {business.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <TrophyIcon className="w-4 h-4" />
                        {business.hireCount} jobs on BKND Trusted
                      </div>
                    </div>

                    {/* Customer Review Snippet */}
                    <div className="bg-neutral-50 border-l-4 border-brand-400 p-4 rounded-r mb-4">
                      <p className="text-neutral-700 text-sm">
                        <span className="font-semibold text-neutral-900">{business.reviewSnippet.author} says: </span>
                        {business.reviewSnippet.highlight.reduce((text, word) => {
                          return text.replace(
                            word,
                            `<strong class="font-semibold text-neutral-900">${word}</strong>`
                          );
                        }, business.reviewSnippet.text).split(/<\/?strong[^>]*>/).map((part, i) => {
                          if (business.reviewSnippet.text.includes(part) && business.reviewSnippet.highlight.some(h => part.includes(h))) {
                            return <strong key={i} className="font-semibold text-neutral-900">{part}</strong>;
                          }
                          return part;
                        })}
                        <button className="text-brand-600 hover:text-brand-700 ml-2 text-xs font-semibold">
                          See more
                        </button>
                      </p>
                    </div>

                    {/* Pricing & CTAs */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                      <div className="text-neutral-900 font-semibold">
                        {business.pricing.type === 'starting' && `Starting at $${business.pricing.amount}`}
                        {business.pricing.type === 'service-call' && (
                          <span>
                            ${business.pricing.amount} service call
                            {business.pricing.waived && <span className="text-success-600 text-sm ml-1">(waived if hired)</span>}
                          </span>
                        )}
                        {business.pricing.type === 'free-estimate' && 'Free estimate'}
                        {business.pricing.type === 'contact' && 'Contact for pricing'}
                      </div>
                      <div className="flex gap-3">
                        <Button variant="secondary" size="sm">
                          View Profile
                        </Button>
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
                <h4 className="font-semibold text-neutral-900 mb-1">Did you know?</h4>
                <p className="text-neutral-700 text-sm">
                  A licensed {service.name.toLowerCase()} professional has the tools and expertise to protect your property and ensure a job well done. Always ask about licensing and insurance before hiring.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">Frequently Asked Questions</h2>
          <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
            {service.faqs.map((faq, index) => (
              <div key={index} className="border-b border-neutral-200 last:border-0 pb-6 last:pb-0">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-neutral-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="bg-neutral-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-h1 mb-4">Ready to Get Started?</h2>
          <p className="text-body-lg text-brand-100 mb-8">
            Connect with verified {service.name.toLowerCase()} professionals in your area today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/search?service=${encodeURIComponent(service.name)}`}>
              <Button variant="secondary" size="xl">
                Get Free Quotes
              </Button>
            </Link>
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

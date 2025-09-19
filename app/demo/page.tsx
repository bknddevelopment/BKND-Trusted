'use client';

import { GlassCard, AnimatedHero, TrustBadge, ServiceCard, TestimonialSlider } from '@/components/premium';
import { Business } from '@/lib/types';

// Mock data for demo
const mockBusiness: Business = {
  id: '1',
  name: 'Premium Plumbing Pro',
  category: 'Plumbing',
  rating: 4.9,
  reviewCount: 1247,
  description: 'Expert plumbing services with 24/7 emergency response. Licensed, insured, and backed by our satisfaction guarantee.',
  image: '/api/placeholder/600/400',
  location: {
    city: 'San Francisco',
    state: 'CA',
    address: '123 Market St'
  },
  verified: true,
  featured: true,
  yearsInBusiness: 15,
  license: 'CA-PLB-12345',
  insurance: true,
  bond: true,
  services: ['Emergency Repairs', 'Water Heater Installation', 'Drain Cleaning', 'Pipe Replacement'],
  priceRange: '$$$',
  availability: 'available',
  responseTime: '< 30 min',
  completedJobs: 5432,
  badges: [
    { type: 'verified', label: 'Verified Pro' },
    { type: 'top-rated', label: 'Top Rated' },
    { type: 'fast-response', label: 'Fast Response' }
  ]
};

const mockTestimonials = [
  {
    id: '1',
    author: {
      name: 'Sarah Johnson',
      avatar: '/api/placeholder/100/100',
      location: 'San Francisco, CA',
      verified: true
    },
    rating: 5,
    date: '2 days ago',
    content: 'Absolutely fantastic service! They arrived within 20 minutes of my call and fixed the emergency leak quickly and professionally. The technician was knowledgeable, courteous, and transparent about pricing. Highly recommend!',
    businessName: 'Premium Plumbing Pro',
    service: 'Emergency Repair'
  },
  {
    id: '2',
    author: {
      name: 'Michael Chen',
      avatar: '/api/placeholder/100/100',
      location: 'Oakland, CA',
      verified: true
    },
    rating: 5,
    date: '1 week ago',
    content: 'Best plumbing experience I\'ve had. They replaced my water heater efficiently and cleaned up perfectly afterward. Fair pricing and excellent communication throughout the process.',
    businessName: 'Premium Plumbing Pro',
    service: 'Water Heater Installation'
  },
  {
    id: '3',
    author: {
      name: 'Emily Rodriguez',
      avatar: '/api/placeholder/100/100',
      location: 'Berkeley, CA',
      verified: false
    },
    rating: 4,
    date: '2 weeks ago',
    content: 'Very professional team. They diagnosed and fixed a complex drain issue that other plumbers couldn\'t solve. The only reason for 4 stars instead of 5 is they were a bit late, but they called ahead to let me know.',
    businessName: 'Premium Plumbing Pro',
    service: 'Drain Cleaning'
  }
];

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
      {/* Animated Hero Section */}
      <AnimatedHero
        title="Find Trusted Local Services"
        subtitle="50,000+ Verified Professionals"
        description="Connect with top-rated, licensed professionals in your area. Every business is verified, insured, and backed by real reviews."
        showStats={true}
        ctaText="Get Started Free"
        onCtaClick={() => console.log('CTA clicked')}
      />

      {/* Premium Components Showcase */}
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-24">

        {/* Glass Card Demo */}
        <section>
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-trust-deep to-trust-action bg-clip-text text-transparent">
            Premium Glass Cards
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Sophisticated business cards with glass morphism effects, parallax images, and magnetic hover interactions
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GlassCard business={mockBusiness} variant="default" />
            <GlassCard business={{ ...mockBusiness, featured: true }} variant="featured" />
            <GlassCard business={{ ...mockBusiness, availability: 'busy' }} variant="premium" />
          </div>
        </section>

        {/* Trust Badges Demo */}
        <section>
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-trust-verified to-emerald-400 bg-clip-text text-transparent">
            Animated Trust Badges
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Micro-animated badges with particle effects, shimmer overlays, and dynamic glow rings
          </p>

          <div className="space-y-8">
            {/* Small badges */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <TrustBadge type="verified" label="Verified Pro" size="sm" />
              <TrustBadge type="licensed" label="Licensed" size="sm" />
              <TrustBadge type="insured" label="Insured" size="sm" />
              <TrustBadge type="bonded" label="Bonded" size="sm" />
              <TrustBadge type="top-rated" label="Top Rated" size="sm" />
              <TrustBadge type="fast-response" label="Fast Response" size="sm" />
            </div>

            {/* Medium badges with particles */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <TrustBadge type="premium" label="Premium Service" size="md" floatingParticles />
              <TrustBadge type="secure" label="Secure Booking" size="md" floatingParticles />
              <TrustBadge type="verified" label="Background Checked" size="md" floatingParticles />
            </div>

            {/* Large badges */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <TrustBadge type="top-rated" label="5-Star Service" size="lg" showAnimation glowEffect floatingParticles />
              <TrustBadge type="verified" label="100% Guaranteed" size="lg" showAnimation glowEffect floatingParticles />
            </div>
          </div>
        </section>

        {/* Service Cards Demo */}
        <section>
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            3D Service Cards
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Interactive cards with 3D tilt effects, dynamic shadows, and depth illusion
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              title="Emergency Repair"
              description="24/7 emergency plumbing services with rapid response times"
              price="$149"
              features={[
                'Available 24/7',
                '30-minute response',
                'Licensed technicians',
                'Free estimates'
              ]}
              rating={4.9}
            />
            <ServiceCard
              title="Water Heater Pro"
              description="Expert installation and repair of all water heater types"
              price="$599"
              features={[
                'Same-day service',
                'All brands covered',
                '10-year warranty',
                'Energy-efficient options'
              ]}
              rating={5.0}
              popular={true}
            />
            <ServiceCard
              title="Drain Cleaning"
              description="Professional drain cleaning and clog removal services"
              price="$199"
              features={[
                'Video inspection',
                'Hydro jetting',
                'Safe for pipes',
                'Preventive maintenance'
              ]}
              rating={4.8}
            />
          </div>
        </section>

        {/* Testimonial Slider Demo */}
        <section>
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-trust-gold to-yellow-400 bg-clip-text text-transparent">
            Customer Testimonials
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Smooth testimonial slider with spring physics, drag support, and 3D transitions
          </p>

          <TestimonialSlider
            testimonials={mockTestimonials}
            autoPlay={true}
            autoPlayInterval={5000}
            showIndicators={true}
          />
        </section>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, StarIcon, CheckBadgeIcon, UserGroupIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';

export default function ProfessionalHero() {
  const router = useRouter();
  const [service, setService] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Build search URL with query parameters
    const params = new URLSearchParams();
    if (service) params.set('service', service);
    if (zipCode) params.set('zip', zipCode);

    // Navigate to search results page
    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Professional Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop"
          alt="Professional handshake"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/85 via-neutral-900/80 to-brand-900/75" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-display-lg md:text-display-xl text-white mb-6">
            Find Verified Local Pros.
            <br />
            <span className="text-brand-300">100% Background Checked.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-body-lg md:text-xl text-brand-100 mb-10 max-w-2xl mx-auto">
            Connect with licensed, insured professionals in your area. Get instant quotes from verified service providers.
          </p>

          {/* Trust Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12 text-white">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <CheckBadgeIcon className="w-6 h-6 text-success-500" />
                <div className="text-3xl md:text-4xl font-bold">10,000+</div>
              </div>
              <div className="text-sm md:text-base text-brand-200">Verified Pros</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <StarIcon className="w-6 h-6 text-featured-400" />
                <div className="text-3xl md:text-4xl font-bold">4.8</div>
              </div>
              <div className="text-sm md:text-base text-brand-200">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <UserGroupIcon className="w-6 h-6 text-brand-400" />
                <div className="text-3xl md:text-4xl font-bold">500K+</div>
              </div>
              <div className="text-sm md:text-base text-brand-200">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <ShieldCheckIcon className="w-6 h-6 text-success-500" />
                <div className="text-3xl md:text-4xl font-bold">100%</div>
              </div>
              <div className="text-sm md:text-base text-brand-200">Insured</div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Service Input */}
                <div className="md:col-span-6">
                  <label htmlFor="service" className="block text-sm font-medium text-neutral-700 mb-2 text-left">
                    What service do you need?
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      placeholder="e.g., Plumbing, HVAC, Electrical..."
                      className="w-full px-4 py-3 pr-10 border-2 border-neutral-200 rounded-lg focus:border-brand-600 focus:ring-2 focus:ring-brand-100 focus:outline-none text-base text-neutral-900 placeholder:text-neutral-400 transition-colors"
                    />
                    <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  </div>
                </div>

                {/* ZIP Code Input */}
                <div className="md:col-span-4">
                  <label htmlFor="zipCode" className="block text-sm font-medium text-neutral-700 mb-2 text-left">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Enter ZIP"
                    maxLength={5}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-brand-600 focus:ring-2 focus:ring-brand-100 focus:outline-none text-base text-neutral-900 placeholder:text-neutral-400 transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-6 rounded-lg text-base transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>

            {/* Popular Searches */}
            <div className="mt-6 text-left">
              <p className="text-xs text-neutral-500 mb-2">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                {['HVAC Repair', 'Plumbing', 'Electrical', 'House Cleaning', 'Landscaping'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setService(term)}
                    className="text-xs px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-full transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

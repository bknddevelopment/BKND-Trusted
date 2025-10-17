'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, StarIcon, CheckBadgeIcon, UserGroupIcon, ShieldCheckIcon, SparklesIcon } from '@heroicons/react/24/solid';

export default function ProfessionalHero() {
  const router = useRouter();
  const [service, setService] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <section className="relative overflow-hidden min-h-[85vh] flex items-center">
      {/* Professional Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
          alt="Professional team collaboration"
          className="w-full h-full object-cover scale-105 animate-subtle-zoom"
        />
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/90 via-brand-900/85 to-brand-800/80" />
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDE5YzAtOS45NC04LjA2LTE4LTE4LTE4IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full">
        {/* Hero Content */}
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-success-500/10 border border-success-500/30 rounded-full text-success-400 mb-6 backdrop-blur-sm animate-fade-in">
            <SparklesIcon className="w-4 h-4" />
            <span className="text-sm font-semibold">Trusted by 500,000+ Homeowners</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-display-lg md:text-display-xl text-white mb-6 leading-tight">
            Find Verified Local Pros.
            <br />
            <span className="bg-gradient-to-r from-brand-300 via-brand-200 to-cyan-300 bg-clip-text text-transparent animate-gradient">
              100% Background Checked.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-body-lg md:text-xl text-brand-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Connect with licensed, insured professionals in your area. Get instant quotes from verified service providers — completely free.
          </p>

          {/* Animated Trust Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-14 text-white">
            <div className="text-center group cursor-default">
              <div className="flex items-center justify-center gap-2 mb-1 transform group-hover:scale-110 transition-transform">
                <CheckBadgeIcon className="w-7 h-7 text-success-500 animate-pulse-slow" />
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-white to-brand-100 bg-clip-text text-transparent">10,000+</div>
              </div>
              <div className="text-sm md:text-base text-brand-200 font-medium">Verified Pros</div>
            </div>
            <div className="text-center group cursor-default">
              <div className="flex items-center justify-center gap-2 mb-1 transform group-hover:scale-110 transition-transform">
                <StarIcon className="w-7 h-7 text-featured-400 animate-pulse-slow" style={{ animationDelay: '0.2s' }} />
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-white to-brand-100 bg-clip-text text-transparent">4.8</div>
              </div>
              <div className="text-sm md:text-base text-brand-200 font-medium">Average Rating</div>
            </div>
            <div className="text-center group cursor-default">
              <div className="flex items-center justify-center gap-2 mb-1 transform group-hover:scale-110 transition-transform">
                <UserGroupIcon className="w-7 h-7 text-brand-400 animate-pulse-slow" style={{ animationDelay: '0.4s' }} />
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-white to-brand-100 bg-clip-text text-transparent">500K+</div>
              </div>
              <div className="text-sm md:text-base text-brand-200 font-medium">Happy Customers</div>
            </div>
            <div className="text-center group cursor-default">
              <div className="flex items-center justify-center gap-2 mb-1 transform group-hover:scale-110 transition-transform">
                <ShieldCheckIcon className="w-7 h-7 text-success-500 animate-pulse-slow" style={{ animationDelay: '0.6s' }} />
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-white to-brand-100 bg-clip-text text-transparent">100%</div>
              </div>
              <div className="text-sm md:text-base text-brand-200 font-medium">Insured</div>
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 transform hover:shadow-3xl transition-shadow duration-300 border border-neutral-100">
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Service Input */}
                <div className="md:col-span-6">
                  <label htmlFor="service" className="block text-sm font-semibold text-neutral-700 mb-2 text-left">
                    What service do you need?
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      placeholder="e.g., Plumbing, HVAC, Electrical..."
                      className="w-full px-4 py-4 pr-11 border-2 border-neutral-200 rounded-xl focus:border-brand-600 focus:ring-4 focus:ring-brand-100 focus:outline-none text-base text-neutral-900 placeholder:text-neutral-400 transition-all font-medium hover:border-neutral-300"
                    />
                    <MagnifyingGlassIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  </div>
                </div>

                {/* ZIP Code Input */}
                <div className="md:col-span-4">
                  <label htmlFor="zipCode" className="block text-sm font-semibold text-neutral-700 mb-2 text-left">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Enter ZIP"
                    maxLength={5}
                    className="w-full px-4 py-4 border-2 border-neutral-200 rounded-xl focus:border-brand-600 focus:ring-4 focus:ring-brand-100 focus:outline-none text-base text-neutral-900 placeholder:text-neutral-400 transition-all font-medium hover:border-neutral-300"
                  />
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-bold py-4 px-6 rounded-xl text-base transition-all focus:outline-none focus:ring-4 focus:ring-brand-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>

            {/* Popular Searches */}
            <div className="mt-6 text-left">
              <p className="text-xs font-semibold text-neutral-600 mb-3">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                {['HVAC Repair', 'Plumbing', 'Electrical', 'House Cleaning', 'Landscaping'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setService(term)}
                    className="text-xs px-4 py-2 bg-neutral-50 hover:bg-brand-50 border border-neutral-200 hover:border-brand-300 text-neutral-700 hover:text-brand-700 rounded-full transition-all font-medium transform hover:scale-105"
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

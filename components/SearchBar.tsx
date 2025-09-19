'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function SearchBar() {
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', { service, location });
  };

  const detectLocation = async () => {
    setIsLocating(true);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // In a real app, you'd reverse geocode this to get city name
          setLocation('Current Location');
          setIsLocating(false);
        },
        () => {
          setIsLocating(false);
          setLocation('');
        }
      );
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-3 bg-white p-3 rounded-2xl shadow-xl shadow-primary/10">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="What service do you need?"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:border-trust-action focus:ring-2 focus:ring-trust-action/20 transition-all"
          />
        </div>

        <div className="flex-1 relative">
          <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="City or ZIP code"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-12 pr-32 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:border-trust-action focus:ring-2 focus:ring-trust-action/20 transition-all"
          />
          <button
            type="button"
            onClick={detectLocation}
            disabled={isLocating}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 text-sm text-trust-action hover:text-trust-action-hover font-medium transition-colors"
          >
            {isLocating ? 'Locating...' : 'Use my location'}
          </button>
        </div>

        <button
          type="submit"
          className="px-8 py-4 bg-trust-action hover:bg-trust-action-hover text-white font-semibold text-lg rounded-xl transition-all transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-trust-action/20"
        >
          Find Pros
        </button>
      </div>
    </form>
  );
}
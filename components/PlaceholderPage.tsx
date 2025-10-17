'use client';

import Link from 'next/link';
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

interface PlaceholderPageProps {
  title: string;
  description: string;
  comingSoon?: boolean;
}

export default function PlaceholderPage({ title, description, comingSoon = true }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-100 rounded-full mb-6">
            <svg className="w-10 h-10 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {title}
          </h1>
          <p className="text-xl text-neutral-600 mb-8 max-w-lg mx-auto">
            {description}
          </p>
          {comingSoon && (
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-brand-50 border border-brand-200 rounded-full text-brand-700 font-semibold mb-8">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Coming Soon</span>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
          >
            <HomeIcon className="w-5 h-5" />
            <span>Go to Homepage</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 bg-white border-2 border-neutral-300 hover:border-brand-400 text-neutral-700 hover:text-brand-700 font-semibold px-8 py-4 rounded-xl transition-all"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200">
          <p className="text-neutral-500 text-sm">
            Need immediate assistance?{' '}
            <Link href="/" className="text-brand-600 hover:text-brand-700 font-semibold underline">
              Search for services
            </Link>
            {' '}or{' '}
            <a href="mailto:support@bkndtrusted.com" className="text-brand-600 hover:text-brand-700 font-semibold underline">
              contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

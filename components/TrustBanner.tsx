'use client';

import { ShieldCheckIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';

export default function TrustBanner() {
  return (
    <section className="bg-neutral-50 py-6 border-y border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Side - Text */}
          <div className="text-center md:text-left">
            <p className="text-body text-neutral-600">
              Trusted by homeowners across <span className="font-semibold text-neutral-900">Texas</span>
            </p>
          </div>

          {/* Right Side - Trust Badges */}
          <div className="flex items-center gap-6 md:gap-8">
            {/* BBB Badge */}
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-white border-2 border-neutral-200 rounded-lg flex items-center justify-center">
                <ShieldCheckIcon className="w-7 h-7 text-brand-600" />
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-neutral-900">BBB</div>
                <div className="text-xs text-neutral-600">Accredited</div>
              </div>
            </div>

            {/* Verification Badge */}
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-success-50 border-2 border-success-500 rounded-lg flex items-center justify-center">
                <CheckBadgeIcon className="w-7 h-7 text-success-600" />
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-neutral-900">100%</div>
                <div className="text-xs text-neutral-600">Verified</div>
              </div>
            </div>

            {/* Insurance Badge */}
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-brand-50 border-2 border-brand-600 rounded-lg flex items-center justify-center">
                <ShieldCheckIcon className="w-7 h-7 text-brand-600" />
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-neutral-900">$1M</div>
                <div className="text-xs text-neutral-600">Insurance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

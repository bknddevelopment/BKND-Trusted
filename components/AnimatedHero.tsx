'use client';

import { useEffect, useRef, useState } from 'react';
import SearchBar from './SearchBar';
import { ShieldCheckIcon } from '@heroicons/react/24/solid';
import { useParallax } from '@/hooks/useIntersectionObserver';

export default function AnimatedHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const parallaxOffset = useParallax(0.5);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative pt-24 pb-20 overflow-hidden morphing-gradient"
    >
      {/* Particle System */}
      <div className="particle-container">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="particle" />
        ))}
      </div>

      {/* Animated Blobs */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="blob absolute top-0 left-0"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        />
        <div
          className="blob absolute bottom-0 right-0"
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
          }}
        />
      </div>

      {/* Parallax Layers */}
      <div className="parallax-container">
        <div
          className="parallax-layer parallax-layer-slow"
          style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
        >
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-trust-verified/10 rounded-full blur-2xl" />
        </div>
        <div
          className="parallax-layer parallax-layer-medium"
          style={{ transform: `translateY(${parallaxOffset * 0.3}px)` }}
        >
          <div className="absolute top-40 right-10 w-24 h-24 bg-trust-gold/10 rounded-full blur-xl" />
        </div>
        <div
          className="parallax-layer parallax-layer-fast"
          style={{ transform: `translateY(${parallaxOffset * 0.1}px)` }}
        >
          <div className="absolute bottom-10 left-20 w-40 h-40 bg-trust-action/10 rounded-full blur-2xl" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Trust Badge with Glow */}
        <div className="inline-block glow mb-6">
          <div className="trust-badge trust-badge-verified animate-badge-float">
            <ShieldCheckIcon className="w-5 h-5" />
            <span className="font-medium">All Professionals Background Checked</span>
          </div>
        </div>

        {/* Animated Headline with Enhanced Visual Impact */}
        <div className="text-reveal mb-6">
          <h1 className="text-reveal-content">
            {/* Main Title with 3D Effect, Gradient and Glow */}
            <span className="relative inline-block transform hover:scale-105 transition-transform duration-300">
              <span
                className="text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-white via-trust-gold to-white bg-clip-text text-transparent animate-gradient-shift"
                style={{
                  textShadow: '0 4px 20px rgba(255, 179, 64, 0.5), 0 8px 40px rgba(255, 179, 64, 0.3)',
                  filter: 'drop-shadow(0 4px 20px rgba(255, 179, 64, 0.4))',
                  letterSpacing: '0.02em',
                  WebkitTextStroke: '1px transparent'
                }}
              >
                BKND TRUSTED
              </span>
              {/* Multiple Glow Layers for Depth */}
              <span className="absolute inset-0 blur-xl bg-gradient-to-r from-trust-gold/40 to-trust-verified/40 -z-10 animate-pulse" />
              <span className="absolute inset-0 blur-3xl bg-gradient-to-r from-trust-gold/20 to-trust-verified/20 -z-20 scale-110" />
              {/* Spotlight Effect */}
              <span className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-white/10 blur-3xl rounded-full -z-30" />
            </span>

            {/* Subtitle with Enhanced Styling */}
            <span className="block text-3xl md:text-5xl font-bold text-white mt-6 tracking-tight">
              <span className="inline-block hover:scale-105 transition-transform duration-300">
                Find Local Pros
              </span>
              <span className="text-trust-gold inline-block hover:scale-105 transition-transform duration-300" style={{
                textShadow: '0 2px 10px rgba(255, 179, 64, 0.6)'
              }}> You Can Trust</span>
            </span>

            {/* Animated Underline with Glow */}
            <span className="relative block mt-4 mx-auto w-48 h-1.5">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-trust-gold to-transparent animate-gradient-shift rounded-full" />
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-trust-gold/50 to-transparent animate-gradient-shift rounded-full blur-sm" />
            </span>
          </h1>
        </div>

        {/* Subheadline with Fade */}
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          Every business is verified, licensed, and insured. Get quotes from top-rated professionals in your area.
        </p>

        {/* Search Bar with Scale Animation */}
        <div>
          <SearchBar />
        </div>

        {/* Popular Searches with Stagger */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
          <span className="text-white/70">Popular:</span>
          {['HVAC Repair', 'Plumbing', 'House Cleaning', 'Electrical'].map((term, index) => (
            <button
              key={term}
              className={`px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all hover-grow`}
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Wave Animation at Bottom */}
      <div className="wave-container">
        <div className="wave" />
        <div className="wave" />
        <div className="wave" />
      </div>
    </section>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheckIcon,
  CheckBadgeIcon,
  SparklesIcon,
  StarIcon
} from '@heroicons/react/24/solid';
import SearchBar from '../SearchBar';

export default function HeroAurora() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="aurora-hero relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Aurora Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.3) 0%, transparent 40%),
            radial-gradient(circle at 80% 20%, rgba(255, 179, 64, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)
          `,
        }}
      />

      {/* Floating Trust Badges */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="floating-badge absolute top-20 left-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="glass-card p-3 rounded-full">
            <ShieldCheckIcon className="w-8 h-8 text-jade-primary" />
          </div>
        </motion.div>

        <motion.div
          className="floating-badge absolute top-40 right-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="glass-card-gold p-3 rounded-full">
            <StarIcon className="w-8 h-8 text-metal-gold" />
          </div>
        </motion.div>

        <motion.div
          className="floating-badge absolute bottom-40 left-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="glass-card p-3 rounded-full">
            <CheckBadgeIcon className="w-8 h-8 text-aurora-purple" />
          </div>
        </motion.div>

        <motion.div
          className="floating-badge absolute bottom-20 right-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="glass-card p-3 rounded-full">
            <SparklesIcon className="w-8 h-8 text-metal-copper" />
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-6"
        >
          <div className="jade-badge">
            <ShieldCheckIcon className="w-5 h-5" />
            <span>All Professionals Background Checked</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-display-hero font-display text-warm-pearl mb-4"
        >
          Find Trusted Local
          <span className="block gradient-aurora">Professionals</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-warm-sand max-w-2xl mx-auto mb-10"
        >
          Every business is verified, licensed, and insured. Experience the gold standard
          in local service with our hand-picked professionals.
        </motion.p>

        {/* Search Bar Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card p-2 rounded-2xl">
            <SearchBar />
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8"
        >
          <div className="flex items-center gap-2">
            <div className="trust-ring-container">
              <div className="trust-ring"></div>
              <div className="trust-ring"></div>
              <div className="trust-ring"></div>
              <CheckBadgeIcon className="w-6 h-6 text-jade-primary relative z-10" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-warm-pearl">10,000+</p>
              <p className="text-sm text-warm-sand">Verified Pros</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="quality-seal">
              <div className="quality-seal-content">4.9</div>
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-warm-pearl">4.9/5</p>
              <p className="text-sm text-warm-sand">Average Rating</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-aurora-purple to-aurora-glow flex items-center justify-center">
              <ShieldCheckIcon className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-warm-pearl">100%</p>
              <p className="text-sm text-warm-sand">Insured & Licensed</p>
            </div>
          </div>
        </motion.div>

        {/* Popular Services Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <span className="text-warm-sand text-sm">Popular:</span>
          {['HVAC Repair', 'Plumbing', 'House Cleaning', 'Electrical', 'Landscaping'].map((service, index) => (
            <motion.button
              key={service}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-card px-4 py-2 text-warm-pearl font-medium text-sm hover:border-aurora-purple transition-all"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + (index * 0.1) }}
            >
              {service}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-midnight-deep to-transparent pointer-events-none" />
    </section>
  );
}
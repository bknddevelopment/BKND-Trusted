'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheckIcon,
  CheckBadgeIcon,
  StarIcon,
  SparklesIcon,
  ArrowRightIcon,
  BoltIcon,
  FireIcon,
  BeakerIcon
} from '@heroicons/react/24/solid';
import ButtonAurora from '@/components/aurora/ButtonAurora';
import GlassCard from '@/components/aurora/GlassCard';

export default function AuroraShowcase() {
  const [selectedVariant, setSelectedVariant] = useState<'default' | 'gold' | 'jade' | 'aurora'>('default');

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight-deep via-midnight-rich to-midnight-mid">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-midnight-deep/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-aurora-purple to-aurora-glow flex items-center justify-center">
              <CheckBadgeIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Aurora Design System</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-white/70 hover:text-white transition-colors">
              Back to Main
            </Link>
            <ButtonAurora size="sm" variant="glass">
              View Code
            </ButtonAurora>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-aurora-purple via-aurora-glow to-metal-gold bg-clip-text text-transparent">
            Aurora Design System
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-12">
            A distinctive visual identity that transforms BKND Trusted from generic to memorable with midnight gradients, metallic accents, and glass morphism effects.
          </p>
        </div>
      </section>

      {/* Color Palette Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Color Palette</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Midnight Colors */}
            <GlassCard variant="default">
              <h3 className="text-xl font-bold text-white mb-4">Midnight</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-midnight-deep border border-white/20" />
                  <div>
                    <p className="text-white font-medium">Deep</p>
                    <p className="text-white/60 text-sm">#0A0E27</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-midnight-rich border border-white/20" />
                  <div>
                    <p className="text-white font-medium">Rich</p>
                    <p className="text-white/60 text-sm">#1A1F4E</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-midnight-mid border border-white/20" />
                  <div>
                    <p className="text-white font-medium">Mid</p>
                    <p className="text-white/60 text-sm">#2E3478</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Aurora Colors */}
            <GlassCard variant="aurora">
              <h3 className="text-xl font-bold text-white mb-4">Aurora</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-aurora-purple" />
                  <div>
                    <p className="text-white font-medium">Purple</p>
                    <p className="text-white/60 text-sm">#6366F1</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-aurora-glow" />
                  <div>
                    <p className="text-white font-medium">Glow</p>
                    <p className="text-white/60 text-sm">#818CF8</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-aurora-soft" />
                  <div>
                    <p className="text-white font-medium">Soft</p>
                    <p className="text-white/60 text-sm">#A5B4FC</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Metal Colors */}
            <GlassCard variant="gold">
              <h3 className="text-xl font-bold text-white mb-4">Metallics</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-metal-gold" />
                  <div>
                    <p className="text-white font-medium">Gold</p>
                    <p className="text-white/60 text-sm">#FFB340</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-metal-copper" />
                  <div>
                    <p className="text-white font-medium">Copper</p>
                    <p className="text-white/60 text-sm">#E85D04</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-metal-bronze" />
                  <div>
                    <p className="text-white font-medium">Bronze</p>
                    <p className="text-white/60 text-sm">#D97706</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Button Showcase */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Button Components</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GlassCard>
              <h3 className="text-xl font-bold text-white mb-6">Button Variants</h3>
              <div className="space-y-4">
                <ButtonAurora variant="aurora" icon={<BoltIcon />}>
                  Aurora Button
                </ButtonAurora>
                <ButtonAurora variant="metal" icon={<StarIcon />}>
                  Metallic Button
                </ButtonAurora>
                <ButtonAurora variant="jade" icon={<CheckBadgeIcon />}>
                  Jade Button
                </ButtonAurora>
                <ButtonAurora variant="glass" icon={<SparklesIcon />}>
                  Glass Button
                </ButtonAurora>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-xl font-bold text-white mb-6">Button Sizes</h3>
              <div className="space-y-4">
                <ButtonAurora size="sm" variant="aurora">
                  Small Button
                </ButtonAurora>
                <ButtonAurora size="md" variant="aurora">
                  Medium Button
                </ButtonAurora>
                <ButtonAurora size="lg" variant="aurora">
                  Large Button
                </ButtonAurora>
                <ButtonAurora variant="aurora" fullWidth>
                  Full Width Button
                </ButtonAurora>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Glass Card Showcase */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Glass Morphism Cards</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassCard variant="default" delay={0}>
              <div className="text-center py-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                  <ShieldCheckIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Default Glass</h3>
                <p className="text-white/60 text-sm">Standard glass morphism with subtle blur effect</p>
              </div>
            </GlassCard>

            <GlassCard variant="gold" delay={0.1}>
              <div className="text-center py-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-metal-gold/20 flex items-center justify-center">
                  <StarIcon className="w-8 h-8 text-metal-gold" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Gold Glass</h3>
                <p className="text-white/60 text-sm">Premium variant with golden shimmer</p>
              </div>
            </GlassCard>

            <GlassCard variant="jade" delay={0.2}>
              <div className="text-center py-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-jade-primary/20 flex items-center justify-center">
                  <CheckBadgeIcon className="w-8 h-8 text-jade-light" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Jade Glass</h3>
                <p className="text-white/60 text-sm">Trust-focused with jade accents</p>
              </div>
            </GlassCard>

            <GlassCard variant="aurora" delay={0.3}>
              <div className="text-center py-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-aurora-purple/20 flex items-center justify-center">
                  <SparklesIcon className="w-8 h-8 text-aurora-glow" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Aurora Glass</h3>
                <p className="text-white/60 text-sm">Electric purple with aurora glow</p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Trust Visual System</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Trust Rings */}
            <GlassCard>
              <h3 className="text-lg font-bold text-white mb-4">Trust Rings</h3>
              <div className="flex items-center justify-center py-8">
                <div className="trust-ring-container">
                  <div className="trust-ring"></div>
                  <div className="trust-ring"></div>
                  <div className="trust-ring"></div>
                  <CheckBadgeIcon className="w-6 h-6 text-jade-primary relative z-10" />
                </div>
              </div>
              <p className="text-white/60 text-sm text-center">Animated concentric rings for verification levels</p>
            </GlassCard>

            {/* Quality Seal */}
            <GlassCard>
              <h3 className="text-lg font-bold text-white mb-4">Quality Seal</h3>
              <div className="flex items-center justify-center py-8">
                <div className="quality-seal">
                  <div className="quality-seal-content">TOP</div>
                </div>
              </div>
              <p className="text-white/60 text-sm text-center">Star-shaped premium badge with rotation</p>
            </GlassCard>

            {/* Jade Badge */}
            <GlassCard>
              <h3 className="text-lg font-bold text-white mb-4">Jade Badge</h3>
              <div className="flex items-center justify-center py-8">
                <div className="jade-badge">
                  <ShieldCheckIcon className="w-5 h-5" />
                  <span>Verified Pro</span>
                </div>
              </div>
              <p className="text-white/60 text-sm text-center">Pulsing verification badge with glow</p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Animation Showcase */}
      <section className="py-16 px-4 mb-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Animation Patterns</h2>

          <GlassCard variant="aurora">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-xl bg-gradient-to-r from-aurora-purple to-aurora-glow animate-pulse flex items-center justify-center">
                  <FireIcon className="w-10 h-10 text-white" />
                </div>
                <p className="text-white text-sm">Pulse</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-xl bg-gradient-to-r from-metal-gold to-metal-copper animate-bounce flex items-center justify-center">
                  <StarIcon className="w-10 h-10 text-white" />
                </div>
                <p className="text-white text-sm">Bounce</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-xl bg-gradient-to-r from-jade-primary to-jade-glow animate-spin-slow flex items-center justify-center">
                  <BeakerIcon className="w-10 h-10 text-white" />
                </div>
                <p className="text-white text-sm">Spin</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-xl bg-gradient-to-r from-aurora-purple to-metal-gold animate-gradient-shift flex items-center justify-center floating-badge">
                  <SparklesIcon className="w-10 h-10 text-white" />
                </div>
                <p className="text-white text-sm">Float</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
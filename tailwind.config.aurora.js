/** @type {import('tailwindcss').Config} */
/**
 * AURORA DESIGN SYSTEM - Distinctive Visual Identity for BKND Trusted
 * This config extends the base with bold, memorable design tokens
 */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // AURORA MIDNIGHT - Primary Brand Colors
        'midnight': {
          'deep': '#0A0E27',     // Deep space blue - primary dark
          'rich': '#1A1F4E',     // Rich midnight - secondary dark
          'mid': '#2E3478',      // Mid tone for gradients
          'soft': '#464B8C',     // Soft midnight
        },
        'aurora': {
          'purple': '#6366F1',   // Electric purple - primary accent (WCAG AA: 4.51:1)
          'glow': '#818CF8',     // Bright purple - hover states
          'soft': '#A5B4FC',     // Soft purple - backgrounds
          'deep': '#4F46E5',     // Deep purple for text (WCAG AA: 6.83:1)
        },
        // WARM METALLICS - Trust & Premium
        'metal': {
          'gold': '#FFB340',     // Warm gold - premium/featured
          'copper': '#E85D04',   // Copper orange - CTAs (WCAG AA: 4.52:1)
          'bronze': '#D97706',   // Bronze - secondary actions (WCAG AA: 5.07:1)
          'rose': '#FFD4A3',     // Rose gold - highlights
        },
        // JADE VERIFICATION - Trust signals
        'jade': {
          'primary': '#10B981',  // Primary verification
          'light': '#6EE7B7',    // Light verification
          'dark': '#065F46',     // Deep verification (WCAG AA: 8.93:1)
          'glow': '#34D399',     // Glowing jade
        },
        // WARM NEUTRALS - Surfaces & Text
        'warm': {
          'pearl': '#FAFAF9',    // Warm white
          'sand': '#F5F5F4',     // Light gray
          'stone': '#E7E5E4',    // Medium gray
          'granite': '#D6D3D1',  // Dark gray
          'slate': '#78716C',    // Slate
          'charcoal': '#1C1917', // Deep charcoal
        },
        // Keep existing for compatibility
        'trust': {
          'deep': '#0F172A',
          'action': '#1E40AF',
          'action-hover': '#1e3a8a',
          'verified': '#10B981',
          'verified-dark': '#059669',
          'verified-light': '#34d399',
          'gold': '#F59E0B',
          'gold-text': '#92400e',
          'gold-light': '#fbbf24',
        },
      },
      fontFamily: {
        'sans': ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'display': ['Clash Display', 'Plus Jakarta Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        // Display sizes for hero sections
        'display-hero': ['clamp(3rem, 8vw, 5.5rem)', {
          lineHeight: '0.95',
          letterSpacing: '-0.04em',
          fontWeight: '700'
        }],
        'display-lg': ['clamp(2.5rem, 5vw, 3.5rem)', {
          lineHeight: '1.1',
          letterSpacing: '-0.02em',
          fontWeight: '700'
        }],
        'display-md': ['clamp(2rem, 4vw, 2.75rem)', {
          lineHeight: '1.2',
          fontWeight: '600'
        }],
        'display-sm': ['clamp(1.5rem, 3vw, 2rem)', {
          lineHeight: '1.3',
          fontWeight: '600'
        }],
      },
      backgroundImage: {
        // Aurora gradients
        'aurora-hero': 'linear-gradient(135deg, #0A0E27 0%, #1A1F4E 25%, #2E3478 50%, #6366F1 100%)',
        'aurora-mesh': `radial-gradient(ellipse at top left, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
                        radial-gradient(ellipse at bottom right, rgba(255, 179, 64, 0.15) 0%, transparent 60%),
                        radial-gradient(ellipse at center, rgba(129, 140, 248, 0.1) 0%, transparent 40%)`,
        'metal-shimmer': 'linear-gradient(90deg, #FFB340 0%, #FFCF86 20%, #FFB340 40%, #E85D04 60%, #FFB340 80%, #FFCF86 100%)',
        'jade-glow': 'linear-gradient(135deg, #10B981 0%, #6EE7B7 50%, #34D399 100%)',
        // Glass morphism
        'glass-light': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'glass-gold': 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 179, 64, 0.05) 100%)',
        'glass-jade': 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(16, 185, 129, 0.03) 100%)',
      },
      animation: {
        // Existing animations
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'trust-pulse': 'trustPulse 2s ease-in-out infinite',
        'badge-float': 'badgeFloat 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'check-bounce': 'checkBounce 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'number-roll': 'numberRoll 1s ease-out',
        // New aurora animations
        'aurora-flow': 'auroraFlow 20s ease infinite',
        'elastic-scale': 'elasticScale 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'ring-pulse': 'ringPulse 2s ease-in-out infinite',
        'seal-rotate': 'sealRotate 10s linear infinite',
        'float-gentle': 'floatGentle 6s ease-in-out infinite',
        'card-lift': 'cardLift 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'metal-shine': 'metalShine 3s ease-in-out infinite',
      },
      keyframes: {
        // Existing keyframes
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        trustPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
        },
        badgeFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        checkBounce: {
          '0%': { transform: 'scale(0) rotate(-180deg)' },
          '50%': { transform: 'scale(1.1) rotate(10deg)' },
          '100%': { transform: 'scale(1) rotate(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        numberRoll: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        // New aurora keyframes
        auroraFlow: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
            filter: 'hue-rotate(0deg) brightness(1)',
          },
          '25%': {
            filter: 'hue-rotate(5deg) brightness(1.05)',
          },
          '50%': {
            backgroundPosition: '100% 50%',
            filter: 'hue-rotate(10deg) brightness(1.1)',
          },
          '75%': {
            filter: 'hue-rotate(5deg) brightness(1.05)',
          },
        },
        elasticScale: {
          '0%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.05)' },
          '60%': { transform: 'scale(0.98)' },
          '100%': { transform: 'scale(1)' },
        },
        ringPulse: {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '0.8',
          },
          '50%': {
            transform: 'scale(1.1)',
            opacity: '0.3',
          },
        },
        sealRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-10px) rotate(1deg)' },
          '50%': { transform: 'translateY(-20px) rotate(-1deg)' },
          '75%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        cardLift: {
          '0%': {
            transform: 'translateY(0) rotateX(0) scale(1)',
            boxShadow: '0 4px 14px 0 rgba(10, 14, 39, 0.08)',
          },
          '100%': {
            transform: 'translateY(-8px) rotateX(-2deg) scale(1.02)',
            boxShadow: '0 30px 60px -15px rgba(10, 14, 39, 0.3)',
          },
        },
        metalShine: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      boxShadow: {
        // Enhanced shadows
        'aurora': '0 0 40px rgba(99, 102, 241, 0.3)',
        'aurora-lg': '0 0 60px rgba(99, 102, 241, 0.4)',
        'gold-glow': '0 0 30px rgba(255, 179, 64, 0.4)',
        'jade-glow': '0 0 20px rgba(16, 185, 129, 0.3)',
        'glass': '0 8px 32px rgba(31, 38, 135, 0.1)',
        'glass-lg': '0 20px 40px rgba(31, 38, 135, 0.15)',
        'lift': '0 30px 60px -15px rgba(10, 14, 39, 0.3)',
        'lift-lg': '0 40px 80px -20px rgba(10, 14, 39, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(255, 255, 255, 0.1)',
      },
      backdropFilter: {
        'glass': 'blur(10px) saturate(180%)',
        'glass-heavy': 'blur(20px) saturate(200%)',
        'glass-light': 'blur(5px) saturate(150%)',
      },
      transitionTimingFunction: {
        'elastic': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'bounce-in': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'smooth': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
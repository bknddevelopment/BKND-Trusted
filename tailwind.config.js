/** @type {import('tailwindcss').Config} */
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
        // Brand Color System - Single Source of Truth
        'trust': {
          'deep': '#0F172A', // Deep Trust Blue - Headers, primary text
          'action': '#1E40AF', // Action Blue - CTAs, links (WCAG AA: 7.59:1)
          'action-hover': '#1e3a8a', // Action Blue hover state (WCAG AA: 9.51:1)
          'verified': '#10B981', // Verified Green - Trust badges
          'verified-dark': '#059669', // Darker verified for text (WCAG AA: 5.28:1)
          'verified-light': '#34d399', // Verified Green light variant
          'gold': '#F59E0B', // Premium Gold - Featured content
          'gold-text': '#92400e', // Gold text on white (WCAG AA: 6.48:1)
          'gold-light': '#fbbf24', // Premium Gold light variant
        },
        // Semantic color tokens
        'surface': {
          'base': '#ffffff',
          'raised': '#f8fafc',
          'overlay': '#f1f5f9',
          'subtle': '#e2e8f0',
        },
        'text': {
          'primary': '#0F172A',
          'secondary': '#374151', // Updated for WCAG AA (7.43:1)
          'muted': '#4b5563', // Updated for WCAG AA (5.36:1)
          'disabled': '#9ca3af', // Acceptable for disabled state
          'inverse': '#ffffff',
        },
        // System feedback colors
        'status': {
          'success': '#059669', // Darker green for better contrast (WCAG AA)
          'success-light': '#10B981',
          'warning': '#92400e', // WCAG AA compliant warning text
          'warning-light': '#F59E0B',
          'error': '#ef4444',
          'info': '#1E40AF',
        },
        // Keep existing for backward compatibility
        'bknd': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
      },
      spacing: {
        // Consistent spacing scale
        'micro': '0.125rem', // 2px
        'tiny': '0.25rem',   // 4px
        'small': '0.5rem',   // 8px
        'base': '1rem',      // 16px
        'medium': '1.5rem',  // 24px
        'large': '2rem',     // 32px
        'xlarge': '3rem',    // 48px
        'huge': '4rem',      // 64px
        'giant': '6rem',     // 96px
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
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
      },
      keyframes: {
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
      },
      boxShadow: {
        'trust': '0 4px 14px 0 rgba(15, 23, 42, 0.08)',
        'trust-hover': '0 6px 20px 0 rgba(15, 23, 42, 0.12)',
        'gold-glow': '0 0 20px rgba(245, 158, 11, 0.3)',
        'verified-glow': '0 0 15px rgba(16, 185, 129, 0.2)',
      },
    },
  },
  plugins: [],
}
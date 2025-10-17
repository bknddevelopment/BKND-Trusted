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
        // Professional Brand Color System - Metallic Blue
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#1E40AF',  // Solid metallic blue
          600: '#1E3A8A',  // Primary CTA & hover - Deep metallic blue
          700: '#1E3A8A',
          800: '#1E293B',
          900: '#0F172A',  // Dark metallic blue headers
        },
        // Success/Verification (Green)
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          500: '#10B981',  // Verification badges
          600: '#059669',
          700: '#047857',
        },
        // Featured/Premium (Amber)
        featured: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          400: '#FBBF24',  // Gold stars, featured badges
          500: '#F59E0B',
          600: '#D97706',
        },
        // Neutral Grays (Professional)
        neutral: {
          50: '#F9FAFB',   // Section backgrounds
          100: '#F3F4F6',  // Card backgrounds
          200: '#E5E7EB',  // Borders
          300: '#D1D5DB',
          400: '#9CA3AF',  // Secondary text
          500: '#6B7280',
          600: '#4B5563',  // Body text
          700: '#374151',
          800: '#1F2937',  // Headings
          900: '#111827',  // Primary text
        },
        // Legacy support (keep for gradual migration)
        'trust': {
          'deep': '#1F2937',
          'action': '#2563EB',
          'action-hover': '#1D4ED8',
          'verified': '#10B981',
          'verified-dark': '#059669',
          'verified-light': '#34d399',
          'gold': '#F59E0B',
          'gold-text': '#D97706',
          'gold-light': '#FBBF24',
        },
      },
      fontSize: {
        // Display (Hero Headlines)
        'display-xl': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }], // 60px
        'display-lg': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],     // 48px
        'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],  // 36px

        // Headings
        'h1': ['2.25rem', { lineHeight: '1.3', fontWeight: '700' }], // 36px
        'h2': ['1.875rem', { lineHeight: '1.3', fontWeight: '700' }], // 30px
        'h3': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],   // 24px
        'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],  // 20px

        // Body
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }], // 18px
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],        // 16px
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }], // 14px
        'body-xs': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],  // 12px
      },
      spacing: {
        // Professional spacing scale
        'section-sm': '3rem',    // 48px
        'section': '4rem',       // 64px
        'section-lg': '6rem',    // 96px
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'container': '1280px',   // 7xl
        'content': '896px',      // 4xl
        'narrow': '672px',       // 2xl
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        // Minimal, professional animations only
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
        'subtle-zoom': 'subtleZoom 20s ease-in-out infinite alternate',
        'gradient': 'gradient 3s ease infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        subtleZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'trust': '0 4px 14px 0 rgba(15, 23, 42, 0.08)',
        'trust-hover': '0 6px 20px 0 rgba(15, 23, 42, 0.12)',
        'gold-glow': '0 0 20px rgba(245, 158, 11, 0.3)',
        'verified-glow': '0 0 15px rgba(16, 185, 129, 0.2)',
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
/**
 * BKND Trusted Premium Color System
 * Revolutionary color palette for exceptional design
 */

export const colors = {
  // Primary Brand Colors - Sophisticated and Ownable
  ink: {
    50: '#E8E9F3',
    100: '#C5C7E0',
    200: '#9FA2CA',
    300: '#797DB4',
    400: '#5D62A3',
    500: '#414792',
    600: '#3A4089',
    700: '#30367E',
    800: '#272D73',
    900: '#0A0E27', // Primary Deep Ink
    950: '#05071A',
  },

  // Accent - Electric Violet for CTAs and highlights
  violet: {
    50: '#F5F3FF',
    100: '#EDE9FE',
    200: '#DDD6FE',
    300: '#C4B5FD',
    400: '#A78BFA',
    500: '#8B5CF6',
    600: '#7C3AED', // Primary Electric Violet
    700: '#6D28D9',
    800: '#5B21B6',
    900: '#4C1D95',
    glow: 'rgba(124, 58, 237, 0.4)', // For glowing effects
  },

  // Trust - Emerald Glow for verification and success
  emerald: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10F4B1', // Primary Emerald Glow
    600: '#0D9488',
    700: '#0F766E',
    800: '#115E59',
    900: '#064E3B',
    glow: 'rgba(16, 244, 177, 0.5)', // For glowing effects
  },

  // Premium - Rose Gold for luxury and featured items
  rose: {
    50: '#FFF1F2',
    100: '#FFE4E6',
    200: '#FECDD3',
    300: '#FDA4AF',
    400: '#FB7185',
    500: '#E8B4B8', // Primary Rose Gold
    600: '#E11D48',
    700: '#BE123C',
    800: '#9F1239',
    900: '#881337',
    shimmer: 'linear-gradient(135deg, #E8B4B8 0%, #FFD700 50%, #E8B4B8 100%)',
  },

  // Glass morphism colors
  glass: {
    white: 'rgba(255, 255, 255, 0.1)',
    whiteLight: 'rgba(255, 255, 255, 0.05)',
    whiteMedium: 'rgba(255, 255, 255, 0.2)',
    dark: 'rgba(10, 14, 39, 0.1)',
    darkMedium: 'rgba(10, 14, 39, 0.3)',
    blur: '20px',
    border: 'rgba(255, 255, 255, 0.18)',
  },

  // Gradient presets
  gradients: {
    // Premium mesh gradients
    mesh: {
      aurora: `
        radial-gradient(at 40% 20%, rgba(124, 58, 237, 0.3) 0px, transparent 50%),
        radial-gradient(at 80% 0%, rgba(16, 244, 177, 0.2) 0px, transparent 50%),
        radial-gradient(at 10% 50%, rgba(232, 180, 184, 0.25) 0px, transparent 50%),
        radial-gradient(at 80% 80%, rgba(124, 58, 237, 0.15) 0px, transparent 50%),
        radial-gradient(at 0% 100%, rgba(16, 244, 177, 0.3) 0px, transparent 50%)
      `,
      cosmic: `
        radial-gradient(ellipse at top left, rgba(124, 58, 237, 0.4) 0%, transparent 50%),
        radial-gradient(ellipse at bottom right, rgba(16, 244, 177, 0.3) 0%, transparent 50%),
        radial-gradient(ellipse at center, rgba(232, 180, 184, 0.2) 0%, transparent 70%)
      `,
      nebula: `
        conic-gradient(from 180deg at 50% 50%, rgba(124, 58, 237, 0.1) 0deg, rgba(16, 244, 177, 0.1) 90deg, rgba(232, 180, 184, 0.1) 180deg, rgba(124, 58, 237, 0.1) 270deg, transparent 360deg)
      `,
    },

    // Linear gradients
    linear: {
      violetEmerald: 'linear-gradient(135deg, #7C3AED 0%, #10F4B1 100%)',
      inkViolet: 'linear-gradient(135deg, #0A0E27 0%, #7C3AED 100%)',
      roseViolet: 'linear-gradient(135deg, #E8B4B8 0%, #7C3AED 100%)',
      emeraldInk: 'linear-gradient(135deg, #10F4B1 0%, #0A0E27 100%)',
      premium: 'linear-gradient(135deg, #E8B4B8 0%, #FFD700 50%, #E8B4B8 100%)',
    },

    // Animated gradients
    animated: {
      shimmer: `
        linear-gradient(
          105deg,
          transparent 40%,
          rgba(255, 255, 255, 0.7) 50%,
          transparent 60%
        )
      `,
      holographic: `
        linear-gradient(
          135deg,
          #7C3AED 0%,
          #10F4B1 25%,
          #E8B4B8 50%,
          #7C3AED 75%,
          #10F4B1 100%
        )
      `,
    },
  },

  // Semantic colors
  semantic: {
    error: '#EF4444',
    warning: '#F59E0B',
    success: '#10F4B1',
    info: '#7C3AED',
  },

  // Neutral colors with cool undertones
  neutral: {
    0: '#FFFFFF',
    50: '#F8F9FB',
    100: '#F1F3F7',
    200: '#E5E8EF',
    300: '#D1D6E2',
    400: '#9CA3B8',
    500: '#6B7394',
    600: '#4A5270',
    700: '#353C56',
    800: '#232940',
    900: '#0A0E27',
    950: '#05071A',
  },
};

// Dark mode color mappings
export const darkColors = {
  background: colors.ink[950],
  surface: colors.ink[900],
  surfaceRaised: colors.ink[800],
  text: {
    primary: colors.neutral[0],
    secondary: colors.neutral[200],
    muted: colors.neutral[400],
    disabled: colors.neutral[600],
  },
  border: colors.glass.border,
};

// Light mode color mappings
export const lightColors = {
  background: colors.neutral[0],
  surface: colors.neutral[50],
  surfaceRaised: colors.neutral[0],
  text: {
    primary: colors.ink[900],
    secondary: colors.neutral[600],
    muted: colors.neutral[500],
    disabled: colors.neutral[400],
  },
  border: colors.neutral[200],
};

// Export special effects
export const effects = {
  // Noise texture overlay for gradients
  noise: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,

  // Glow effects
  glow: {
    violet: `0 0 40px ${colors.violet.glow}`,
    emerald: `0 0 40px ${colors.emerald.glow}`,
    soft: '0 0 20px rgba(255, 255, 255, 0.1)',
    intense: '0 0 60px rgba(124, 58, 237, 0.6)',
  },

  // Shadow effects
  shadow: {
    glass: '0 8px 32px 0 rgba(10, 14, 39, 0.37)',
    glassLight: '0 8px 32px 0 rgba(10, 14, 39, 0.1)',
    premium: '0 20px 40px -10px rgba(124, 58, 237, 0.3)',
    floating: '0 10px 40px -10px rgba(10, 14, 39, 0.4)',
    glow: '0 0 40px rgba(124, 58, 237, 0.3), 0 0 80px rgba(16, 244, 177, 0.2)',
  },
};

// Tailwind CSS config export
export const tailwindColors = {
  ink: colors.ink,
  violet: colors.violet,
  emerald: colors.emerald,
  rose: colors.rose,
  neutral: colors.neutral,
};
/**
 * BKND Trusted Premium Typography System
 * Distinctive font system for exceptional design
 */

export const typography = {
  // Font families
  fonts: {
    display: '"Clash Display", "Cabinet Grotesk", system-ui, sans-serif',
    heading: '"Cabinet Grotesk", "Satoshi", system-ui, sans-serif',
    body: '"Satoshi", "General Sans", system-ui, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", monospace',
    accent: '"Bebas Neue", "Antonio", system-ui, sans-serif', // For numbers/stats
  },

  // Fluid type scale using clamp()
  // Scales from mobile to desktop seamlessly
  scale: {
    // Display sizes - for hero headings
    display: {
      xl: 'clamp(3.5rem, 10vw, 7rem)',
      lg: 'clamp(3rem, 8vw, 6rem)',
      md: 'clamp(2.5rem, 6vw, 5rem)',
      sm: 'clamp(2rem, 5vw, 4rem)',
    },

    // Heading sizes - for section titles
    heading: {
      h1: 'clamp(2.5rem, 5vw, 4rem)',
      h2: 'clamp(2rem, 4vw, 3rem)',
      h3: 'clamp(1.75rem, 3vw, 2.5rem)',
      h4: 'clamp(1.5rem, 2.5vw, 2rem)',
      h5: 'clamp(1.25rem, 2vw, 1.75rem)',
      h6: 'clamp(1.125rem, 1.5vw, 1.5rem)',
    },

    // Body text sizes
    body: {
      xl: 'clamp(1.25rem, 2vw, 1.5rem)',
      lg: 'clamp(1.125rem, 1.5vw, 1.25rem)',
      md: '1rem',
      sm: '0.875rem',
      xs: '0.75rem',
    },
  },

  // Font weights
  weight: {
    thin: 100,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  // Line heights
  lineHeight: {
    none: 1,
    tight: 1.1,
    snug: 1.2,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
    display: '-0.02em', // For large headings
  },

  // Text styles presets
  styles: {
    // Display styles
    displayHero: {
      fontFamily: '"Clash Display", sans-serif',
      fontSize: 'clamp(3.5rem, 10vw, 7rem)',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },

    displayTitle: {
      fontFamily: '"Clash Display", sans-serif',
      fontSize: 'clamp(2.5rem, 6vw, 5rem)',
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },

    // Heading styles
    h1: {
      fontFamily: '"Cabinet Grotesk", sans-serif',
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },

    h2: {
      fontFamily: '"Cabinet Grotesk", sans-serif',
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },

    h3: {
      fontFamily: '"Cabinet Grotesk", sans-serif',
      fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '0',
    },

    // Body styles
    bodyLarge: {
      fontFamily: '"Satoshi", sans-serif',
      fontSize: 'clamp(1.125rem, 1.5vw, 1.25rem)',
      fontWeight: 400,
      lineHeight: 1.625,
      letterSpacing: '0',
    },

    body: {
      fontFamily: '"Satoshi", sans-serif',
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.625,
      letterSpacing: '0',
    },

    bodySmall: {
      fontFamily: '"Satoshi", sans-serif',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0',
    },

    // Special styles
    statNumber: {
      fontFamily: '"Bebas Neue", sans-serif',
      fontSize: 'clamp(3rem, 8vw, 6rem)',
      fontWeight: 700,
      lineHeight: 1,
      letterSpacing: '0.02em',
    },

    statLabel: {
      fontFamily: '"Satoshi", sans-serif',
      fontSize: '0.75rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },

    button: {
      fontFamily: '"Satoshi", sans-serif',
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1,
      letterSpacing: '0.025em',
    },

    badge: {
      fontFamily: '"Satoshi", sans-serif',
      fontSize: '0.75rem',
      fontWeight: 600,
      lineHeight: 1,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },

    caption: {
      fontFamily: '"Satoshi", sans-serif',
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.025em',
    },

    overline: {
      fontFamily: '"Satoshi", sans-serif',
      fontSize: '0.75rem',
      fontWeight: 600,
      lineHeight: 1,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },

    code: {
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0',
    },
  },

  // Text effects
  effects: {
    // Gradient text
    gradient: {
      violet: {
        background: 'linear-gradient(135deg, #7C3AED 0%, #10F4B1 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      },

      gold: {
        background: 'linear-gradient(135deg, #E8B4B8 0%, #FFD700 50%, #E8B4B8 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      },

      animated: {
        background: 'linear-gradient(270deg, #7C3AED, #10F4B1, #E8B4B8, #7C3AED)',
        backgroundSize: '300% 300%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'gradientShift 8s ease infinite',
      },
    },

    // Text shadows
    shadow: {
      soft: '0 2px 8px rgba(10, 14, 39, 0.1)',
      medium: '0 4px 16px rgba(10, 14, 39, 0.2)',
      strong: '0 8px 24px rgba(10, 14, 39, 0.3)',
      glow: '0 0 20px rgba(124, 58, 237, 0.5)',
      neon: '0 0 40px rgba(16, 244, 177, 0.8)',
    },

    // Stroke text
    stroke: {
      thin: {
        WebkitTextStroke: '1px currentColor',
        WebkitTextFillColor: 'transparent',
      },
      medium: {
        WebkitTextStroke: '2px currentColor',
        WebkitTextFillColor: 'transparent',
      },
      thick: {
        WebkitTextStroke: '3px currentColor',
        WebkitTextFillColor: 'transparent',
      },
    },

    // Glitch effect
    glitch: {
      textShadow: `
        2px 2px 0 #7C3AED,
        -2px -2px 0 #10F4B1,
        -2px 2px 0 #E8B4B8,
        2px -2px 0 #FFD700
      `,
      animation: 'glitch 1s infinite',
    },
  },

  // Responsive typography utilities
  responsive: {
    // Fluid font size formula: clamp(min, preferred, max)
    fluid: (min: number, max: number, minVw = 320, maxVw = 1920) => {
      const slope = (max - min) / (maxVw - minVw);
      const yAxis = min - slope * minVw;
      return `clamp(${min}px, ${yAxis}px + ${slope * 100}vw, ${max}px)`;
    },
  },
};

// Font face declarations for custom fonts
export const fontFaces = `
  @font-face {
    font-family: 'Clash Display';
    src: url('/fonts/ClashDisplay-Variable.woff2') format('woff2-variations');
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Cabinet Grotesk';
    src: url('/fonts/CabinetGrotesk-Variable.woff2') format('woff2-variations');
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Satoshi';
    src: url('/fonts/Satoshi-Variable.woff2') format('woff2-variations');
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Bebas Neue';
    src: url('/fonts/BebasNeue-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
`;

// Keyframes for text animations
export const textAnimations = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes glitch {
    0%, 100% { transform: translate(0); }
    20% { transform: translate(-1px, 1px); }
    40% { transform: translate(1px, -1px); }
    60% { transform: translate(-1px, -1px); }
    80% { transform: translate(1px, 1px); }
  }

  @keyframes typewriter {
    from { width: 0; }
    to { width: 100%; }
  }

  @keyframes blink {
    50% { opacity: 0; }
  }
`;
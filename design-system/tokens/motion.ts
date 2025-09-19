/**
 * BKND Trusted Premium Motion System
 * Sophisticated animation tokens for exceptional interactions
 */

export const motion = {
  // Duration tokens
  duration: {
    instant: '50ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
    slowest: '1000ms',

    // Specific use cases
    microInteraction: '200ms',
    transition: '350ms',
    complexAnimation: '600ms',
    pageTransition: '800ms',
    heroAnimation: '1200ms',
  },

  // Easing functions
  easing: {
    // Standard easings
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',

    // Custom cubic beziers
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    smoothIn: 'cubic-bezier(0.4, 0, 1, 1)',
    smoothOut: 'cubic-bezier(0, 0, 0.2, 1)',

    // Spring animations
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    springSmooth: 'cubic-bezier(0.87, 0, 0.13, 1)',
    springBouncy: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',

    // Elastic animations
    elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elasticOut: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    elasticIn: 'cubic-bezier(0.36, 0, 0.66, -0.56)',

    // Premium easings
    premium: 'cubic-bezier(0.77, 0, 0.175, 1)',
    dramatic: 'cubic-bezier(0.86, 0, 0.07, 1)',
    swift: 'cubic-bezier(0.55, 0, 0.1, 1)',
  },

  // Framer Motion variants
  variants: {
    // Fade animations
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
      }
    },

    fadeInUp: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
      }
    },

    fadeInDown: {
      hidden: { opacity: 0, y: -20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
      }
    },

    // Scale animations
    scaleIn: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
      }
    },

    scaleSpring: {
      hidden: { opacity: 0, scale: 0 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          type: 'spring',
          stiffness: 260,
          damping: 20
        }
      }
    },

    // Slide animations
    slideInLeft: {
      hidden: { opacity: 0, x: -100 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
      }
    },

    slideInRight: {
      hidden: { opacity: 0, x: 100 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
      }
    },

    // Stagger container
    staggerContainer: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.3,
        }
      }
    },

    // Stagger item
    staggerItem: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
      }
    },

    // Hero text animation
    heroText: {
      hidden: {
        opacity: 0,
        y: 30,
        rotateX: -90
      },
      visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
          duration: 0.8,
          ease: [0.6, 0.01, -0.05, 0.95],
        }
      }
    },

    // Floating animation
    float: {
      initial: { y: 0 },
      animate: {
        y: [-10, 10, -10],
        transition: {
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut'
        }
      }
    },

    // Pulse animation
    pulse: {
      initial: { scale: 1 },
      animate: {
        scale: [1, 1.05, 1],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }
      }
    },
  },

  // GSAP ScrollTrigger configurations
  scrollTrigger: {
    // Parallax speed factors
    parallax: {
      slow: 0.5,
      medium: 0.75,
      fast: 1.25,
      superFast: 1.5,
    },

    // Reveal animations
    reveal: {
      fadeUp: {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
      },

      scaleIn: {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      },

      slideIn: {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      },

      rotateIn: {
        rotation: 15,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)',
      },
    },
  },

  // Hover effects
  hover: {
    // Scale effects
    scale: {
      subtle: { scale: 1.02 },
      normal: { scale: 1.05 },
      dramatic: { scale: 1.1 },
      shrink: { scale: 0.98 },
    },

    // Lift effects
    lift: {
      subtle: { y: -2 },
      normal: { y: -5 },
      high: { y: -10 },
    },

    // Glow effects
    glow: {
      subtle: { boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)' },
      medium: { boxShadow: '0 0 40px rgba(124, 58, 237, 0.5)' },
      intense: { boxShadow: '0 0 60px rgba(124, 58, 237, 0.7)' },
    },

    // Magnetic effect configuration
    magnetic: {
      strength: 0.3,
      duration: 0.4,
      ease: 'power2.out',
    },
  },

  // Page transition presets
  pageTransitions: {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.4 }
    },

    slideUp: {
      initial: { y: '100vh', opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: '-100vh', opacity: 0 },
      transition: { duration: 0.6, ease: [0.77, 0, 0.175, 1] }
    },

    scale: {
      initial: { scale: 0.9, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 1.1, opacity: 0 },
      transition: { duration: 0.5, ease: [0.77, 0, 0.175, 1] }
    },

    morph: {
      initial: {
        clipPath: 'circle(0% at 50% 50%)',
        opacity: 0
      },
      animate: {
        clipPath: 'circle(100% at 50% 50%)',
        opacity: 1
      },
      exit: {
        clipPath: 'circle(0% at 50% 50%)',
        opacity: 0
      },
      transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] }
    },
  },

  // Keyframe animations
  keyframes: {
    // Shimmer effect
    shimmer: `
      @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
      }
    `,

    // Gradient animation
    gradientShift: `
      @keyframes gradientShift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
    `,

    // Float animation
    float: `
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
    `,

    // Spin animation
    spin: `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `,

    // Pulse animation
    pulse: `
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.05); opacity: 0.8; }
      }
    `,

    // Bounce animation
    bounce: `
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-25%); }
      }
    `,

    // Wiggle animation
    wiggle: `
      @keyframes wiggle {
        0%, 100% { transform: rotate(-3deg); }
        50% { transform: rotate(3deg); }
      }
    `,

    // Glow pulse
    glowPulse: `
      @keyframes glowPulse {
        0%, 100% { box-shadow: 0 0 20px rgba(124, 58, 237, 0.5); }
        50% { box-shadow: 0 0 40px rgba(124, 58, 237, 0.8), 0 0 60px rgba(16, 244, 177, 0.4); }
      }
    `,

    // Morph shape
    morph: `
      @keyframes morph {
        0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
      }
    `,
  },

  // Spring physics configurations
  spring: {
    wobbly: { stiffness: 180, damping: 12 },
    stiff: { stiffness: 400, damping: 30 },
    slow: { stiffness: 100, damping: 20 },
    molasses: { stiffness: 280, damping: 120 },
    default: { stiffness: 260, damping: 20 },
  },

  // Transition configurations
  transition: {
    // Default transitions
    default: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },

    // Spring transitions
    spring: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },

    // Smooth transitions
    smooth: {
      duration: 0.5,
      ease: [0.77, 0, 0.175, 1],
    },

    // Dramatic transitions
    dramatic: {
      duration: 0.8,
      ease: [0.86, 0, 0.07, 1],
    },
  },
};

// CSS custom properties export
export const motionCSSVariables = `
  :root {
    /* Durations */
    --duration-instant: ${motion.duration.instant};
    --duration-fast: ${motion.duration.fast};
    --duration-normal: ${motion.duration.normal};
    --duration-slow: ${motion.duration.slow};
    --duration-slower: ${motion.duration.slower};

    /* Easings */
    --ease-smooth: ${motion.easing.smooth};
    --ease-spring: ${motion.easing.spring};
    --ease-elastic: ${motion.easing.elastic};
    --ease-premium: ${motion.easing.premium};
  }
`;
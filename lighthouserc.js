module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/features',
        'http://localhost:3000/pricing',
        'http://localhost:3000/about',
      ],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
        },
        screenEmulation: {
          mobile: false,
          width: 1920,
          height: 1080,
          deviceScaleFactor: 1,
          disabled: false,
        },
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // Core Web Vitals targets
        'first-contentful-paint': ['error', { maxNumericValue: 1500 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'first-meaningful-paint': ['error', { maxNumericValue: 2000 }],
        'speed-index': ['error', { maxNumericValue: 3000 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'interactive': ['error', { maxNumericValue: 3500 }],

        // Performance score
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 1 }],

        // Additional performance metrics
        'server-response-time': ['error', { maxNumericValue: 600 }],
        'uses-webp-images': 'error',
        'uses-optimized-images': 'error',
        'uses-text-compression': 'error',
        'uses-rel-preconnect': 'warn',
        'font-display': 'error',
        'unused-javascript': ['error', { maxLength: 2 }],
        'unused-css-rules': ['error', { maxLength: 2 }],
        'modern-image-formats': 'error',
        'efficient-animated-content': 'error',
        'offscreen-images': 'error',
        'render-blocking-resources': ['error', { maxLength: 1 }],
        'unminified-css': 'error',
        'unminified-javascript': 'error',
        'no-document-write': 'error',
        'uses-http2': 'error',
        'uses-passive-event-listeners': 'error',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
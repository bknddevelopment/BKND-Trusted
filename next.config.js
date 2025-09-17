/** @type {import('next').NextConfig} */

// Performance monitoring imports
const withBundleAnalyzer = process.env.ANALYZE === 'true'
  ? require('@next/bundle-analyzer')({ enabled: true })
  : (config) => config;

const withPWA = process.env.NODE_ENV === 'production'
  ? require('next-pwa')({
      dest: 'public',
      register: true,
      skipWaiting: true,
      disable: false,
      runtimeCaching: [
        {
          urlPattern: /^https:.*\/api\/.*$/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            networkTimeoutSeconds: 3,
            expiration: {
              maxEntries: 64,
              maxAgeSeconds: 24 * 60 * 60 // 24 hours
            }
          }
        },
        {
          urlPattern: /^https:.*\.(png|jpg|jpeg|svg|gif|webp|avif)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'image-cache',
            expiration: {
              maxEntries: 256,
              maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
            }
          }
        },
        {
          urlPattern: /^https:.*\.(woff|woff2|ttf|eot)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'font-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 365 * 24 * 60 * 60 // 1 year
            }
          }
        }
      ]
    })
  : (config) => config;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: process.env.STATIC_EXPORT === 'true' ? 'export' : 'standalone',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' && process.env.STATIC_EXPORT === 'true' ? '/BKND-Trusted' : '',
  assetPrefix: process.env.NODE_ENV === 'production' && process.env.STATIC_EXPORT === 'true' ? '/BKND-Trusted' : '',
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  productionBrowserSourceMaps: false,

  // Performance optimizations for Core Web Vitals
  images: {
    unoptimized: process.env.STATIC_EXPORT === 'true', // Only unoptimize for static export
    domains: ['bkndtrusted.com', 'cdn.bkndtrusted.com', 'res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Experimental performance features
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    legacyBrowsers: false,
    browsersListForSwc: true,
    optimizePackageImports: [
      'lodash',
      'date-fns',
      '@prisma/client',
      'react-icons',
      'framer-motion',
      '@headlessui/react',
      '@heroicons/react'
    ],
    webVitalsAttribution: ['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB'],
    turbo: {
      loaders: {
        '.svg': ['@svgr/webpack'],
      },
    },
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel-insights.com *.vercel.app; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: *.cloudinary.com; font-src 'self' data:; connect-src 'self' *.vercel-insights.com vitals.vercel-insights.com"
          }
        ]
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/(.*).webp',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/(.*).avif',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      }
    ]
  },

  // Rewrites for clean URLs
  async rewrites() {
    return {
      beforeFiles: [
        // Dynamic city pages
        {
          source: '/database-solutions/:city',
          destination: '/dynamic/city/:city',
        },
        // Service pages
        {
          source: '/services/:service',
          destination: '/dynamic/service/:service',
        },
        // Comparison pages
        {
          source: '/vs/:competitor',
          destination: '/dynamic/comparison/:competitor',
        },
        // Industry pages
        {
          source: '/industries/:industry',
          destination: '/dynamic/industry/:industry',
        }
      ]
    }
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize for production
    if (!dev && !isServer) {
      // Advanced chunk splitting
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            name: 'framework',
            chunks: 'all',
            test: /(?<!node_modules.*)[\/]node_modules[\/](react|react-dom|scheduler|prop-types|use-subscription)[\/]/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test(module) {
              return module.size() > 160000 &&
                /node_modules[/\\]/.test(module.identifier());
            },
            name(module) {
              const hash = require('crypto').createHash('sha1');
              hash.update(module.identifier());
              return 'lib-' + hash.digest('hex').substring(0, 8);
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
          },
          shared: {
            name(module, chunks) {
              return 'shared-' +
                require('crypto')
                  .createHash('sha1')
                  .update(chunks.reduce((acc, chunk) => acc + chunk.name, ''))
                  .digest('hex')
                  .substring(0, 8);
            },
            priority: 10,
            minChunks: 2,
            reuseExistingChunk: true,
          },
        },
      };

      // Add compression plugin for Brotli
      const CompressionPlugin = require('compression-webpack-plugin');
      config.plugins.push(
        new CompressionPlugin({
          filename: '[path][base].br',
          algorithm: 'brotliCompress',
          test: /\.(js|css|html|svg)$/,
          threshold: 8192,
          minRatio: 0.8,
          compressionOptions: {
            level: 11,
          },
        }),
        new CompressionPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 8192,
          minRatio: 0.8,
        })
      );

      // Advanced minification
      const TerserPlugin = require('terser-webpack-plugin');
      config.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log', 'console.info', 'console.debug'],
            },
            mangle: {
              safari10: true,
            },
            format: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
          extractComments: false,
          parallel: true,
        }),
      ];
    }

    // Add module aliases for cleaner imports
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': '/components',
      '@lib': '/lib',
      '@utils': '/lib/utils',
      '@hooks': '/lib/hooks',
      '@types': '/types',
    };

    return config;
  },
}

// TypeScript and ESLint settings
const finalConfig = {
  ...nextConfig,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = withBundleAnalyzer(withPWA(finalConfig))
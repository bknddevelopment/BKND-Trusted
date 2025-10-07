import { MetadataRoute } from 'next';

/**
 * Dynamic robots.txt generation
 * Controls search engine crawler access
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bkndtrusted.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',          // API routes
          '/admin/',        // Admin dashboard
          '/_next/',        // Next.js internals
          '/dashboard/',    // User dashboards
          '/account/',      // Account pages
        ],
      },
      {
        userAgent: 'GPTBot',  // OpenAI crawler
        disallow: ['/'],      // Block AI training data collection
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: ['/'],
      },
      {
        userAgent: 'CCBot',   // Common Crawl
        disallow: ['/'],
      },
      {
        userAgent: 'anthropic-ai',
        disallow: ['/'],
      },
      {
        userAgent: 'Claude-Web',
        disallow: ['/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

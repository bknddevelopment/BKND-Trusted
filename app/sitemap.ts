import { MetadataRoute } from 'next';

/**
 * Dynamic sitemap generation for BKND Trusted
 * Automatically updates with new services, locations, and pages
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bkndtrusted.com';

// Service categories (match with actual service pages)
const SERVICE_CATEGORIES = [
  'plumbing',
  'hvac',
  'electrical',
  'cleaning',
  'landscaping',
  'painting',
  'roofing',
  'carpentry',
];

// Major Texas cities (match with actual location pages)
const TEXAS_CITIES = [
  { state: 'texas', city: 'houston' },
  { state: 'texas', city: 'austin' },
  { state: 'texas', city: 'dallas' },
  { state: 'texas', city: 'san-antonio' },
  { state: 'texas', city: 'fort-worth' },
  { state: 'texas', city: 'el-paso' },
  { state: 'texas', city: 'arlington' },
  { state: 'texas', city: 'plano' },
];

// US States with service coverage
const STATES = [
  'texas',
  'california',
  'florida',
  'new-york',
  'pennsylvania',
  'illinois',
  'ohio',
  'georgia',
  'north-carolina',
  'michigan',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  // Core pages (highest priority)
  const corePages = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/search`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  // Service detail pages
  const servicePages = SERVICE_CATEGORIES.map((service) => ({
    url: `${BASE_URL}/services/${service}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // State pages
  const statePages = STATES.map((state) => ({
    url: `${BASE_URL}/${state}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // City pages (service directories by city)
  const cityPages = TEXAS_CITIES.flatMap((location) =>
    SERVICE_CATEGORIES.map((service) => ({
      url: `${BASE_URL}/${location.state}/travis-county/${location.city}/${service}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  );

  // Static pages
  const staticPages = [
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/for-professionals`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Combine all pages
  return [
    ...corePages,
    ...servicePages,
    ...statePages,
    ...cityPages,
    ...staticPages,
  ];
}

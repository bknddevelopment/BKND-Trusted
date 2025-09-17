/** @type {import('next-sitemap').IConfig} */

const SITE_URL = process.env.SITE_URL || 'https://bkndtrusted.com'

// List of major cities for location-based pages
const MAJOR_CITIES = [
  { city: 'New York', state: 'NY' },
  { city: 'Los Angeles', state: 'CA' },
  { city: 'Chicago', state: 'IL' },
  { city: 'Houston', state: 'TX' },
  { city: 'Phoenix', state: 'AZ' },
  { city: 'Philadelphia', state: 'PA' },
  { city: 'San Antonio', state: 'TX' },
  { city: 'San Diego', state: 'CA' },
  { city: 'Dallas', state: 'TX' },
  { city: 'San Jose', state: 'CA' },
  { city: 'Austin', state: 'TX' },
  { city: 'Jacksonville', state: 'FL' },
  { city: 'Fort Worth', state: 'TX' },
  { city: 'Columbus', state: 'OH' },
  { city: 'San Francisco', state: 'CA' },
  { city: 'Charlotte', state: 'NC' },
  { city: 'Indianapolis', state: 'IN' },
  { city: 'Seattle', state: 'WA' },
  { city: 'Denver', state: 'CO' },
  { city: 'Washington', state: 'DC' },
  { city: 'Boston', state: 'MA' },
  { city: 'El Paso', state: 'TX' },
  { city: 'Detroit', state: 'MI' },
  { city: 'Nashville', state: 'TN' },
  { city: 'Portland', state: 'OR' },
  { city: 'Memphis', state: 'TN' },
  { city: 'Oklahoma City', state: 'OK' },
  { city: 'Las Vegas', state: 'NV' },
  { city: 'Louisville', state: 'KY' },
  { city: 'Baltimore', state: 'MD' },
  { city: 'Milwaukee', state: 'WI' },
  { city: 'Albuquerque', state: 'NM' },
  { city: 'Tucson', state: 'AZ' },
  { city: 'Fresno', state: 'CA' },
  { city: 'Mesa', state: 'AZ' },
  { city: 'Sacramento', state: 'CA' },
  { city: 'Atlanta', state: 'GA' },
  { city: 'Kansas City', state: 'MO' },
  { city: 'Colorado Springs', state: 'CO' },
  { city: 'Miami', state: 'FL' },
  { city: 'Raleigh', state: 'NC' },
  { city: 'Omaha', state: 'NE' },
  { city: 'Long Beach', state: 'CA' },
  { city: 'Virginia Beach', state: 'VA' },
  { city: 'Oakland', state: 'CA' },
  { city: 'Minneapolis', state: 'MN' },
  { city: 'Tulsa', state: 'OK' },
  { city: 'Arlington', state: 'TX' },
  { city: 'Tampa', state: 'FL' },
  { city: 'New Orleans', state: 'LA' }
]

// Services to generate pages for
const SERVICES = [
  'postgresql',
  'mysql',
  'mongodb',
  'redis',
  'elasticsearch',
  'cassandra',
  'dynamodb',
  'mariadb',
  'oracle',
  'sqlserver',
  'neo4j',
  'influxdb',
  'couchdb',
  'firestore',
  'cockroachdb'
]

// Competitors for comparison pages
const COMPETITORS = [
  'aws-rds',
  'google-cloud-sql',
  'azure-database',
  'heroku-postgres',
  'digitalocean-managed-databases',
  'mongodb-atlas',
  'redis-labs',
  'planetscale',
  'neon',
  'supabase',
  'firebase',
  'fauna',
  'cockroach-labs',
  'yugabyte',
  'timescale'
]

// Industries for vertical pages
const INDUSTRIES = [
  'healthcare',
  'fintech',
  'ecommerce',
  'saas',
  'education',
  'gaming',
  'media-entertainment',
  'real-estate',
  'logistics',
  'automotive',
  'retail',
  'manufacturing',
  'telecommunications',
  'energy',
  'government'
]

// Use cases for solution pages
const USE_CASES = [
  'real-time-analytics',
  'data-warehousing',
  'microservices',
  'mobile-backend',
  'iot-data',
  'machine-learning',
  'content-management',
  'session-storage',
  'caching',
  'queuing',
  'time-series-data',
  'graph-databases',
  'document-storage',
  'key-value-store',
  'full-text-search'
]

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  sitemapSize: 7000, // Split into multiple sitemaps for performance
  generateIndexSitemap: true,
  changefreq: 'daily',
  priority: 0.7,

  exclude: [
    '/admin',
    '/admin/*',
    '/api/*',
    '/404',
    '/500',
    '/_app',
    '/_document',
    '/_error'
  ],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api']
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0
      }
    ],
    additionalSitemaps: [
      `${SITE_URL}/server-sitemap-index.xml`
    ]
  },

  transform: async (config, path) => {
    // Set different priorities for different page types
    let priority = 0.7
    let changefreq = 'weekly'

    if (path === '/') {
      priority = 1.0
      changefreq = 'daily'
    } else if (path.includes('/services/')) {
      priority = 0.9
      changefreq = 'weekly'
    } else if (path.includes('/pricing')) {
      priority = 0.9
      changefreq = 'daily'
    } else if (path.includes('/blog/')) {
      priority = 0.6
      changefreq = 'monthly'
    } else if (path.includes('/locations/')) {
      priority = 0.8
      changefreq = 'monthly'
    } else if (path.includes('/vs/')) {
      priority = 0.8
      changefreq = 'weekly'
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? []
    }
  },

  additionalPaths: async (config) => {
    const paths = []

    // Generate location-based service pages (50 cities × 15 services = 750 pages)
    for (const location of MAJOR_CITIES) {
      for (const service of SERVICES) {
        paths.push({
          loc: `/services/${service}/${location.city.toLowerCase().replace(' ', '-')}-${location.state.toLowerCase()}`,
          priority: 0.8,
          changefreq: 'monthly',
          lastmod: new Date().toISOString()
        })
      }

      // Generate general location pages
      paths.push({
        loc: `/locations/${location.city.toLowerCase().replace(' ', '-')}-${location.state.toLowerCase()}`,
        priority: 0.7,
        changefreq: 'monthly',
        lastmod: new Date().toISOString()
      })
    }

    // Generate service pages
    for (const service of SERVICES) {
      paths.push({
        loc: `/services/${service}`,
        priority: 0.9,
        changefreq: 'weekly',
        lastmod: new Date().toISOString()
      })

      // Service comparison pages
      for (const competitor of COMPETITORS) {
        paths.push({
          loc: `/compare/${service}-vs-${competitor}`,
          priority: 0.8,
          changefreq: 'monthly',
          lastmod: new Date().toISOString()
        })
      }
    }

    // Generate competitor comparison pages
    for (const competitor of COMPETITORS) {
      paths.push({
        loc: `/vs/${competitor}`,
        priority: 0.8,
        changefreq: 'weekly',
        lastmod: new Date().toISOString()
      })
    }

    // Generate industry pages
    for (const industry of INDUSTRIES) {
      paths.push({
        loc: `/industries/${industry}`,
        priority: 0.7,
        changefreq: 'monthly',
        lastmod: new Date().toISOString()
      })

      // Industry + service combination pages
      for (const service of SERVICES.slice(0, 5)) { // Top 5 services per industry
        paths.push({
          loc: `/solutions/${industry}/${service}`,
          priority: 0.6,
          changefreq: 'monthly',
          lastmod: new Date().toISOString()
        })
      }
    }

    // Generate use case pages
    for (const useCase of USE_CASES) {
      paths.push({
        loc: `/use-cases/${useCase}`,
        priority: 0.7,
        changefreq: 'monthly',
        lastmod: new Date().toISOString()
      })
    }

    // Generate resource pages
    const resources = ['guides', 'tutorials', 'documentation', 'case-studies', 'whitepapers']
    for (const resource of resources) {
      paths.push({
        loc: `/${resource}`,
        priority: 0.6,
        changefreq: 'weekly',
        lastmod: new Date().toISOString()
      })
    }

    return paths
  }
}
// Internal Linking Mesh Network System
// Creates intelligent internal links for maximum SEO juice distribution

import { CITIES, SERVICES, INDUSTRIES, COMPETITORS, USE_CASES } from '@/data/seo-data'

interface Link {
  href: string
  text: string
  title: string
  priority: number
}

interface LinkCluster {
  primary: Link[]
  secondary: Link[]
  related: Link[]
}

/**
 * Generate contextual internal links for any page
 */
export function generateInternalLinks(
  pageType: string,
  pageParams: any,
  maxLinks: number = 10
): LinkCluster {
  switch (pageType) {
    case 'city-service':
      return generateCityServiceLinks(pageParams.city, pageParams.state, pageParams.service, maxLinks)
    case 'service':
      return generateServiceLinks(pageParams.service, maxLinks)
    case 'comparison':
      return generateComparisonLinks(pageParams.competitor, maxLinks)
    case 'industry':
      return generateIndustryLinks(pageParams.industry, maxLinks)
    case 'location':
      return generateLocationLinks(pageParams.city, pageParams.state, maxLinks)
    default:
      return generateGenericLinks(maxLinks)
  }
}

/**
 * Generate links for city-service pages
 */
function generateCityServiceLinks(
  city: string,
  state: string,
  service: string,
  maxLinks: number
): LinkCluster {
  const citySlug = city.toLowerCase().replace(' ', '-')
  const stateSlug = state.toLowerCase()
  const serviceData = SERVICES.find(s => s.slug === service)

  const primary: Link[] = [
    {
      href: `/services/${service}`,
      text: `${serviceData?.name || service} Services`,
      title: `Learn more about our ${serviceData?.name} solutions`,
      priority: 1
    },
    {
      href: `/locations/${citySlug}-${stateSlug}`,
      text: `All Services in ${city}`,
      title: `View all database and backend services available in ${city}, ${state}`,
      priority: 1
    }
  ]

  // Add other services in the same city
  const secondary: Link[] = SERVICES
    .filter(s => s.slug !== service)
    .slice(0, 5)
    .map(s => ({
      href: `/services/${s.slug}/${citySlug}-${stateSlug}`,
      text: `${s.name} in ${city}`,
      title: `${s.name} hosting services in ${city}, ${state}`,
      priority: 0.8
    }))

  // Add nearby cities with same service
  const nearbyCities = CITIES
    .filter(c => c.state === state && c.city !== city)
    .slice(0, 3)
    .map(c => ({
      href: `/services/${service}/${c.city.toLowerCase().replace(' ', '-')}-${c.state.toLowerCase()}`,
      text: `${serviceData?.name} in ${c.city}`,
      title: `${serviceData?.name} services in ${c.city}, ${c.state}`,
      priority: 0.7
    }))

  // Add related use cases
  const relatedUseCases = USE_CASES
    .filter(uc => serviceData?.useCases?.some(u => u.toLowerCase().includes(uc.slug.replace('-', ' '))))
    .slice(0, 3)
    .map(uc => ({
      href: `/use-cases/${uc.slug}`,
      text: uc.name,
      title: `${uc.description} with ${serviceData?.name}`,
      priority: 0.6
    }))

  const related: Link[] = [
    ...nearbyCities,
    ...relatedUseCases,
    {
      href: `/pricing/${service}`,
      text: `${serviceData?.name} Pricing`,
      title: `View pricing for ${serviceData?.name} services`,
      priority: 0.9
    }
  ]

  return { primary, secondary, related }
}

/**
 * Generate links for service pages
 */
function generateServiceLinks(service: string, maxLinks: number): LinkCluster {
  const serviceData = SERVICES.find(s => s.slug === service)

  // Primary links to major city implementations
  const primary: Link[] = CITIES
    .slice(0, 5)
    .map(city => ({
      href: `/services/${service}/${city.city.toLowerCase().replace(' ', '-')}-${city.state.toLowerCase()}`,
      text: `${serviceData?.name} in ${city.city}`,
      title: `Deploy ${serviceData?.name} in ${city.city}, ${city.state}`,
      priority: 1
    }))

  // Secondary links to comparisons
  const secondary: Link[] = COMPETITORS
    .filter(c => c.slug.includes(service) || service.includes(c.slug.split('-')[0]))
    .slice(0, 4)
    .map(c => ({
      href: `/vs/${c.slug}`,
      text: `vs ${c.name}`,
      title: `Compare ${serviceData?.name} with ${c.name}`,
      priority: 0.8
    }))

  // Related links to industries and use cases
  const relatedIndustries = INDUSTRIES
    .slice(0, 3)
    .map(ind => ({
      href: `/solutions/${ind.slug}/${service}`,
      text: `${serviceData?.name} for ${ind.name}`,
      title: `${serviceData?.name} solutions for ${ind.name} industry`,
      priority: 0.7
    }))

  const relatedUseCases = USE_CASES
    .filter(uc => serviceData?.useCases?.some(u => u.toLowerCase().includes(uc.slug.replace('-', ' '))))
    .slice(0, 3)
    .map(uc => ({
      href: `/use-cases/${uc.slug}`,
      text: uc.name,
      title: uc.description,
      priority: 0.6
    }))

  const related: Link[] = [
    ...relatedIndustries,
    ...relatedUseCases,
    {
      href: `/docs/${service}`,
      text: `${serviceData?.name} Documentation`,
      title: `Technical documentation for ${serviceData?.name}`,
      priority: 0.9
    }
  ]

  return { primary, secondary, related }
}

/**
 * Generate links for comparison pages
 */
function generateComparisonLinks(competitor: string, maxLinks: number): LinkCluster {
  const competitorData = COMPETITORS.find(c => c.slug === competitor)

  // Primary links to our equivalent services
  const primary: Link[] = SERVICES
    .slice(0, 5)
    .map(service => ({
      href: `/services/${service.slug}`,
      text: `Our ${service.name} Solution`,
      title: `${service.name} - Better alternative to ${competitorData?.name}`,
      priority: 1
    }))

  // Secondary links to other comparisons
  const secondary: Link[] = COMPETITORS
    .filter(c => c.slug !== competitor)
    .slice(0, 4)
    .map(c => ({
      href: `/vs/${c.slug}`,
      text: `vs ${c.name}`,
      title: `Compare with ${c.name}`,
      priority: 0.8
    }))

  // Related links to migration guides and case studies
  const related: Link[] = [
    {
      href: `/migrate-from/${competitor}`,
      text: `Migrate from ${competitorData?.name}`,
      title: `Step-by-step migration guide from ${competitorData?.name}`,
      priority: 1
    },
    {
      href: `/case-studies/${competitor}-migration`,
      text: `Success Stories`,
      title: `Companies that switched from ${competitorData?.name}`,
      priority: 0.9
    },
    {
      href: `/calculator/${competitor}`,
      text: `Cost Calculator`,
      title: `Calculate savings vs ${competitorData?.name}`,
      priority: 0.8
    },
    ...INDUSTRIES.slice(0, 2).map(ind => ({
      href: `/industries/${ind.slug}`,
      text: `Solutions for ${ind.name}`,
      title: `${ind.name} solutions better than ${competitorData?.name}`,
      priority: 0.7
    }))
  ]

  return { primary, secondary, related }
}

/**
 * Generate links for industry pages
 */
function generateIndustryLinks(industry: string, maxLinks: number): LinkCluster {
  const industryData = INDUSTRIES.find(i => i.slug === industry)

  // Primary links to relevant services
  const primary: Link[] = SERVICES
    .slice(0, 5)
    .map(service => ({
      href: `/solutions/${industry}/${service.slug}`,
      text: `${service.name} for ${industryData?.name}`,
      title: `${service.name} solutions tailored for ${industryData?.name}`,
      priority: 1
    }))

  // Secondary links to compliance and features
  const secondary: Link[] = [
    {
      href: `/compliance/${industry}`,
      text: `${industryData?.name} Compliance`,
      title: `How we meet ${industryData?.compliance?.join(', ')} requirements`,
      priority: 0.9
    },
    {
      href: `/case-studies/${industry}`,
      text: `${industryData?.name} Case Studies`,
      title: `Success stories from ${industryData?.name} companies`,
      priority: 0.8
    },
    ...USE_CASES
      .filter(uc => industryData?.challenges?.some(c => uc.description.toLowerCase().includes(c.toLowerCase())))
      .slice(0, 3)
      .map(uc => ({
        href: `/use-cases/${uc.slug}`,
        text: uc.name,
        title: `${uc.description} for ${industryData?.name}`,
        priority: 0.7
      }))
  ]

  // Related links to other industries and locations
  const related: Link[] = [
    ...INDUSTRIES
      .filter(i => i.slug !== industry)
      .slice(0, 3)
      .map(i => ({
        href: `/industries/${i.slug}`,
        text: `${i.name} Solutions`,
        title: `Database solutions for ${i.name}`,
        priority: 0.6
      })),
    ...CITIES
      .slice(0, 2)
      .map(city => ({
        href: `/locations/${city.city.toLowerCase().replace(' ', '-')}-${city.state.toLowerCase()}`,
        text: `Services in ${city.city}`,
        title: `${industryData?.name} infrastructure in ${city.city}, ${city.state}`,
        priority: 0.5
      }))
  ]

  return { primary, secondary, related }
}

/**
 * Generate links for location pages
 */
function generateLocationLinks(city: string, state: string, maxLinks: number): LinkCluster {
  const citySlug = city.toLowerCase().replace(' ', '-')
  const stateSlug = state.toLowerCase()

  // Primary links to services in this location
  const primary: Link[] = SERVICES
    .slice(0, 6)
    .map(service => ({
      href: `/services/${service.slug}/${citySlug}-${stateSlug}`,
      text: `${service.name} in ${city}`,
      title: `${service.name} hosting services in ${city}, ${state}`,
      priority: 1
    }))

  // Secondary links to nearby cities
  const secondary: Link[] = CITIES
    .filter(c => c.state === state && c.city !== city)
    .slice(0, 4)
    .map(c => ({
      href: `/locations/${c.city.toLowerCase().replace(' ', '-')}-${c.state.toLowerCase()}`,
      text: `Services in ${c.city}`,
      title: `Database and backend services in ${c.city}, ${c.state}`,
      priority: 0.8
    }))

  // Related links to industries and use cases
  const related: Link[] = [
    ...INDUSTRIES
      .slice(0, 3)
      .map(ind => ({
        href: `/industries/${ind.slug}`,
        text: `${ind.name} Solutions`,
        title: `${ind.name} infrastructure in ${city}`,
        priority: 0.7
      })),
    {
      href: `/data-centers/${stateSlug}`,
      text: `${state} Data Centers`,
      title: `All data center locations in ${state}`,
      priority: 0.9
    },
    {
      href: `/support/${citySlug}`,
      text: `Local Support`,
      title: `24/7 support for ${city} businesses`,
      priority: 0.8
    }
  ]

  return { primary, secondary, related }
}

/**
 * Generate generic links for homepage and other pages
 */
function generateGenericLinks(maxLinks: number): LinkCluster {
  const primary: Link[] = [
    {
      href: '/services',
      text: 'All Services',
      title: 'Explore our database and backend services',
      priority: 1
    },
    {
      href: '/pricing',
      text: 'Pricing',
      title: 'Simple, transparent pricing',
      priority: 1
    },
    {
      href: '/enterprise',
      text: 'Enterprise',
      title: 'Enterprise solutions and support',
      priority: 0.9
    }
  ]

  const secondary: Link[] = SERVICES
    .slice(0, 5)
    .map(service => ({
      href: `/services/${service.slug}`,
      text: service.name,
      title: service.description,
      priority: 0.8
    }))

  const related: Link[] = [
    ...INDUSTRIES
      .slice(0, 3)
      .map(ind => ({
        href: `/industries/${ind.slug}`,
        text: `${ind.name} Solutions`,
        title: `Solutions for ${ind.name} industry`,
        priority: 0.7
      })),
    ...USE_CASES
      .slice(0, 2)
      .map(uc => ({
        href: `/use-cases/${uc.slug}`,
        text: uc.name,
        title: uc.description,
        priority: 0.6
      }))
  ]

  return { primary, secondary, related }
}

/**
 * Generate breadcrumb links for SEO
 */
export function generateBreadcrumbs(pathname: string): Array<{ name: string; href: string }> {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: Array<{ name: string; href: string }> = [
    { name: 'Home', href: '/' }
  ]

  let currentPath = ''
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`

    // Format segment name
    let name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    // Handle special cases
    if (segment === 'vs') name = 'Compare'
    if (segment === 'use-cases') name = 'Use Cases'

    // Find actual names from data
    const service = SERVICES.find(s => s.slug === segment)
    const industry = INDUSTRIES.find(i => i.slug === segment)
    const competitor = COMPETITORS.find(c => c.slug === segment)

    if (service) name = service.name
    if (industry) name = industry.name
    if (competitor) name = `vs ${competitor.name}`

    breadcrumbs.push({
      name,
      href: currentPath
    })
  })

  return breadcrumbs
}

/**
 * Generate footer links for SEO
 */
export function generateFooterLinks(): {
  services: Link[]
  solutions: Link[]
  resources: Link[]
  company: Link[]
  legal: Link[]
} {
  return {
    services: SERVICES.slice(0, 8).map(s => ({
      href: `/services/${s.slug}`,
      text: s.name,
      title: s.description,
      priority: 0.8
    })),

    solutions: [
      ...INDUSTRIES.slice(0, 5).map(i => ({
        href: `/industries/${i.slug}`,
        text: i.name,
        title: `Solutions for ${i.name}`,
        priority: 0.7
      })),
      ...USE_CASES.slice(0, 3).map(uc => ({
        href: `/use-cases/${uc.slug}`,
        text: uc.name,
        title: uc.description,
        priority: 0.6
      }))
    ],

    resources: [
      { href: '/docs', text: 'Documentation', title: 'Technical documentation', priority: 0.9 },
      { href: '/blog', text: 'Blog', title: 'Latest news and tutorials', priority: 0.7 },
      { href: '/guides', text: 'Guides', title: 'How-to guides and tutorials', priority: 0.7 },
      { href: '/case-studies', text: 'Case Studies', title: 'Customer success stories', priority: 0.8 },
      { href: '/api', text: 'API Reference', title: 'API documentation', priority: 0.8 },
      { href: '/status', text: 'System Status', title: 'Service status and uptime', priority: 0.6 }
    ],

    company: [
      { href: '/about', text: 'About Us', title: 'Learn about BKND Trusted', priority: 0.7 },
      { href: '/careers', text: 'Careers', title: 'Join our team', priority: 0.6 },
      { href: '/partners', text: 'Partners', title: 'Partner program', priority: 0.6 },
      { href: '/contact', text: 'Contact', title: 'Get in touch', priority: 0.8 },
      { href: '/support', text: 'Support', title: '24/7 customer support', priority: 0.9 }
    ],

    legal: [
      { href: '/privacy', text: 'Privacy Policy', title: 'Privacy and data protection', priority: 0.5 },
      { href: '/terms', text: 'Terms of Service', title: 'Terms and conditions', priority: 0.5 },
      { href: '/sla', text: 'SLA', title: 'Service level agreement', priority: 0.6 },
      { href: '/security', text: 'Security', title: 'Security measures and compliance', priority: 0.7 },
      { href: '/compliance', text: 'Compliance', title: 'Compliance certifications', priority: 0.6 }
    ]
  }
}
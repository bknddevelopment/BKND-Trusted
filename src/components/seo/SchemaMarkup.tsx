'use client'

import { useEffect } from 'react'

interface SchemaMarkupProps {
  data: Record<string, any>
}

export function SchemaMarkup({ data }: SchemaMarkupProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.innerHTML = JSON.stringify(data)
    document.head.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [data])

  return null
}

// Organization Schema
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BKND Trusted',
    url: 'https://bkndtrusted.com',
    logo: 'https://bkndtrusted.com/logo.png',
    description: 'Enterprise database and backend infrastructure solutions provider',
    foundingDate: '2020',
    founders: [
      {
        '@type': 'Person',
        name: 'BKND Team'
      }
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '100 Market Street',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94105',
      addressCountry: 'US'
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+1-888-BKND-NOW',
        contactType: 'sales',
        areaServed: 'Worldwide',
        availableLanguage: ['English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese']
      },
      {
        '@type': 'ContactPoint',
        telephone: '+1-888-BKND-SUP',
        contactType: 'customer support',
        areaServed: 'Worldwide',
        availableLanguage: 'English'
      }
    ],
    sameAs: [
      'https://twitter.com/bkndtrusted',
      'https://linkedin.com/company/bkndtrusted',
      'https://github.com/bkndtrusted',
      'https://www.facebook.com/bkndtrusted'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1247',
      bestRating: '5',
      worstRating: '1'
    }
  }

  return <SchemaMarkup data={schema} />
}

// LocalBusiness Schema
export function LocalBusinessSchema({
  city,
  state,
  zipCode
}: {
  city: string
  state: string
  zipCode: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://bkndtrusted.com/locations/${city.toLowerCase()}`,
    name: `BKND Trusted ${city}`,
    image: 'https://bkndtrusted.com/locations/office.jpg',
    url: `https://bkndtrusted.com/locations/${city.toLowerCase()}`,
    telephone: '+1-888-BKND-NOW',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressRegion: state,
      postalCode: zipCode,
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '37.7749',
      longitude: '-122.4194'
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
      ],
      opens: '09:00',
      closes: '18:00'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '234'
    }
  }

  return <SchemaMarkup data={schema} />
}

// Service Schema
export function ServiceSchema({
  serviceName,
  description,
  price
}: {
  serviceName: string
  description: string
  price?: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: description,
    provider: {
      '@type': 'Organization',
      name: 'BKND Trusted',
      url: 'https://bkndtrusted.com'
    },
    areaServed: {
      '@type': 'Country',
      name: 'Worldwide'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: serviceName,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: `${serviceName} Starter`,
            description: `Entry-level ${serviceName} service`
          },
          price: price || '9.99',
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: price || '9.99',
            priceCurrency: 'USD',
            unitText: 'MONTH'
          }
        }
      ]
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '523'
    }
  }

  return <SchemaMarkup data={schema} />
}

// FAQ Schema
export function FAQSchema({
  questions
}: {
  questions: Array<{ question: string; answer: string }>
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer
      }
    }))
  }

  return <SchemaMarkup data={schema} />
}

// BreadcrumbList Schema
export function BreadcrumbSchema({
  items
}: {
  items: Array<{ name: string; url: string }>
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }

  return <SchemaMarkup data={schema} />
}

// Product Schema
export function ProductSchema({
  name,
  description,
  price,
  image
}: {
  name: string
  description: string
  price: string
  image?: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: name,
    description: description,
    image: image || 'https://bkndtrusted.com/product-default.jpg',
    brand: {
      '@type': 'Brand',
      name: 'BKND Trusted'
    },
    offers: {
      '@type': 'Offer',
      url: 'https://bkndtrusted.com/pricing',
      priceCurrency: 'USD',
      price: price,
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'BKND Trusted'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '873'
    }
  }

  return <SchemaMarkup data={schema} />
}

// SoftwareApplication Schema
export function SoftwareApplicationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'BKND Trusted Platform',
    operatingSystem: 'Any',
    applicationCategory: 'DeveloperApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '2341'
    },
    screenshot: 'https://bkndtrusted.com/screenshots/dashboard.png',
    featureList: [
      'PostgreSQL Hosting',
      'MongoDB Hosting',
      'Redis Hosting',
      'Automatic Backups',
      '99.99% Uptime SLA',
      'Auto-scaling',
      'SSL Certificates',
      '24/7 Support',
      'One-click Deploy',
      'Global CDN'
    ]
  }

  return <SchemaMarkup data={schema} />
}

// WebSite Schema with SearchAction
export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BKND Trusted',
    url: 'https://bkndtrusted.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://bkndtrusted.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  }

  return <SchemaMarkup data={schema} />
}
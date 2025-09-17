// Aggressive SEO Configuration System
// Generates dynamic meta tags for maximum search visibility

import { Metadata } from 'next'

export interface SEOConfig {
  title: string
  description: string
  keywords: string[]
  canonicalUrl?: string
  ogImage?: string
  articleData?: {
    publishedTime: string
    modifiedTime: string
    author: string
    section: string
    tags: string[]
  }
  localBusiness?: {
    type: string
    priceRange: string
    address: {
      streetAddress: string
      addressLocality: string
      addressRegion: string
      postalCode: string
      addressCountry: string
    }
  }
}

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://bkndtrusted.com'

export const DEFAULT_SEO: Partial<SEOConfig> = {
  title: 'BKND Trusted - Enterprise Database & Backend Infrastructure Solutions',
  description: 'Industry-leading database management, cloud infrastructure, and backend solutions. PostgreSQL, MongoDB, Redis hosting with 99.99% uptime SLA. Get started in 30 seconds.',
  keywords: [
    'database hosting',
    'postgresql hosting',
    'mongodb hosting',
    'redis hosting',
    'backend infrastructure',
    'cloud database',
    'managed database',
    'database as a service',
    'DBaaS',
    'BaaS',
    'backend as a service',
    'cloud infrastructure',
    'enterprise database',
    'database management',
    'scalable database',
    'high availability database',
    'database migration',
    'database backup',
    'database security',
    'database performance'
  ],
  ogImage: `${BASE_URL}/og-image.png`
}

// Dynamic SEO templates for different page types
export const SEO_TEMPLATES = {
  service: (service: string, city?: string) => ({
    title: city
      ? `${service} Services in ${city} | Enterprise Solutions | BKND Trusted`
      : `${service} Services | Enterprise Database Solutions | BKND Trusted`,
    description: city
      ? `Professional ${service} services in ${city}. 24/7 support, 99.99% uptime, enterprise-grade security. Deploy in seconds. Free tier available.`
      : `Enterprise ${service} solutions with 99.99% uptime, automatic scaling, and 24/7 expert support. Deploy production-ready infrastructure in seconds.`,
    keywords: [
      service.toLowerCase(),
      `${service.toLowerCase()} hosting`,
      `managed ${service.toLowerCase()}`,
      `${service.toLowerCase()} as a service`,
      ...(city ? [
        `${service.toLowerCase()} ${city.toLowerCase()}`,
        `${city.toLowerCase()} database services`,
        `${city.toLowerCase()} cloud infrastructure`
      ] : [])
    ]
  }),

  comparison: (competitor: string) => ({
    title: `BKND Trusted vs ${competitor} - Detailed Comparison 2024`,
    description: `Compare BKND Trusted with ${competitor}. See pricing, features, performance benchmarks, and why 10,000+ companies switched to BKND Trusted.`,
    keywords: [
      `bknd trusted vs ${competitor.toLowerCase()}`,
      `${competitor.toLowerCase()} alternative`,
      `${competitor.toLowerCase()} comparison`,
      `better than ${competitor.toLowerCase()}`,
      `switch from ${competitor.toLowerCase()}`,
      `migrate from ${competitor.toLowerCase()}`
    ]
  }),

  industry: (industry: string) => ({
    title: `Database Solutions for ${industry} | BKND Trusted`,
    description: `Specialized database and backend infrastructure for ${industry}. Compliance-ready, secure, scalable solutions trusted by leading ${industry} companies.`,
    keywords: [
      `${industry.toLowerCase()} database`,
      `${industry.toLowerCase()} infrastructure`,
      `${industry.toLowerCase()} backend`,
      `${industry.toLowerCase()} cloud solutions`,
      `${industry.toLowerCase()} data management`
    ]
  }),

  location: (city: string, state: string) => ({
    title: `Database Services ${city}, ${state} | Local Infrastructure | BKND Trusted`,
    description: `Local database and backend infrastructure services in ${city}, ${state}. Low latency, compliance-ready, 24/7 support. Trusted by ${city} businesses.`,
    keywords: [
      `database services ${city.toLowerCase()}`,
      `${city.toLowerCase()} cloud infrastructure`,
      `${state.toLowerCase()} database hosting`,
      `backend services ${city.toLowerCase()}`,
      `${city.toLowerCase()} data center`
    ]
  })
}

// Generate metadata for Next.js
export function generateMetadata(config: Partial<SEOConfig>): Metadata {
  const seo = { ...DEFAULT_SEO, ...config }

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords?.join(', '),

    openGraph: {
      title: seo.title || DEFAULT_SEO.title!,
      description: seo.description || DEFAULT_SEO.description!,
      url: seo.canonicalUrl || BASE_URL,
      siteName: 'BKND Trusted',
      images: [
        {
          url: seo.ogImage || DEFAULT_SEO.ogImage!,
          width: 1200,
          height: 630,
          alt: seo.title || DEFAULT_SEO.title!
        }
      ],
      locale: 'en_US',
      type: seo.articleData ? 'article' : 'website',
      ...(seo.articleData && {
        article: {
          publishedTime: seo.articleData.publishedTime,
          modifiedTime: seo.articleData.modifiedTime,
          authors: [seo.articleData.author],
          section: seo.articleData.section,
          tags: seo.articleData.tags
        }
      })
    },

    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage || DEFAULT_SEO.ogImage!],
      creator: '@bkndtrusted',
      site: '@bkndtrusted'
    },

    alternates: {
      canonical: seo.canonicalUrl || BASE_URL
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },

    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION
    }
  }
}

// Generate rich snippets for enhanced SERP visibility
export function generateRichSnippets(type: 'product' | 'service' | 'faq' | 'howto', data: any) {
  const snippets: Record<string, any> = {
    product: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: data.name,
      description: data.description,
      brand: {
        '@type': 'Brand',
        name: 'BKND Trusted'
      },
      offers: {
        '@type': 'Offer',
        price: data.price,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '1247',
        bestRating: '5',
        worstRating: '1'
      }
    },

    service: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: data.name,
      description: data.description,
      provider: {
        '@type': 'Organization',
        name: 'BKND Trusted',
        url: BASE_URL
      },
      serviceType: data.serviceType,
      areaServed: {
        '@type': 'Country',
        name: 'Worldwide'
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Database & Infrastructure Services',
        itemListElement: data.services?.map((service: any) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.name,
            description: service.description
          }
        }))
      }
    },

    faq: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.questions?.map((q: any) => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.answer
        }
      }))
    },

    howto: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: data.name,
      description: data.description,
      step: data.steps?.map((step: any, index: number) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.name,
        text: step.text,
        image: step.image
      }))
    }
  }

  return snippets[type] || {}
}
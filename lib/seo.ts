import { Metadata } from 'next';

const siteConfig = {
  name: 'BKND Trusted',
  description: 'Find verified, licensed, and insured local service professionals. Get instant quotes from background-checked pros in your area.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://bkndtrusted.com',
  ogImage: '/og-image.jpg',
  twitterHandle: '@bkndtrusted',
};

/**
 * Generates SEO-optimized metadata for pages
 */
export function generateSEO({
  title,
  description,
  path = '',
  ogImage,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const image = ogImage || siteConfig.ogImage;

  return {
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: siteConfig.twitterHandle,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generates JSON-LD schema markup for Organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-800-TRUSTED',
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: 'English',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '10453',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      'https://www.facebook.com/bkndtrusted',
      'https://twitter.com/bkndtrusted',
      'https://www.instagram.com/bkndtrusted',
    ],
  };
}

/**
 * Generates JSON-LD schema for Service pages
 */
export function generateServiceSchema({
  name,
  description,
  url,
  provider,
  areaServed,
  offers,
}: {
  name: string;
  description: string;
  url: string;
  provider: string;
  areaServed: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: provider,
    },
    areaServed: {
      '@type': 'Place',
      name: areaServed,
    },
    ...(offers && {
      offers: {
        '@type': 'Offer',
        price: offers.price,
        priceCurrency: offers.priceCurrency,
      },
    }),
  };
}

/**
 * Generates JSON-LD schema for LocalBusiness
 */
export function generateLocalBusinessSchema({
  name,
  description,
  url,
  telephone,
  address,
  rating,
  reviewCount,
  priceRange,
}: {
  name: string;
  description: string;
  url: string;
  telephone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  rating?: number;
  reviewCount?: number;
  priceRange?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    description,
    url,
    ...(telephone && { telephone }),
    ...(address && {
      address: {
        '@type': 'PostalAddress',
        streetAddress: address.street,
        addressLocality: address.city,
        addressRegion: address.state,
        postalCode: address.zip,
        addressCountry: 'US',
      },
    }),
    ...(rating &&
      reviewCount && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: rating.toString(),
          reviewCount: reviewCount.toString(),
          bestRating: '5',
          worstRating: '1',
        },
      }),
    ...(priceRange && { priceRange }),
  };
}

/**
 * Generates JSON-LD schema for BreadcrumbList
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export default siteConfig;

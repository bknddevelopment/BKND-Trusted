/**
 * Professional Image Management System
 * Provides placeholder images and utilities for the BKND Trusted platform
 */

export interface ImageConfig {
  width: number;
  height: number;
  category?: string;
  text?: string;
  seed?: string;
}

/**
 * Service category to color mapping for branded placeholders
 */
const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  plumbing: { bg: '#2563EB', text: '#FFFFFF' },
  hvac: { bg: '#DC2626', text: '#FFFFFF' },
  electrical: { bg: '#F59E0B', text: '#FFFFFF' },
  cleaning: { bg: '#10B981', text: '#FFFFFF' },
  landscaping: { bg: '#059669', text: '#FFFFFF' },
  painting: { bg: '#8B5CF6', text: '#FFFFFF' },
  roofing: { bg: '#64748B', text: '#FFFFFF' },
  default: { bg: '#2563EB', text: '#FFFFFF' },
};

/**
 * Generate a professional placeholder image URL using Unsplash
 * @param config Image configuration
 * @returns Unsplash image URL
 */
export function getUnsplashImage(config: ImageConfig): string {
  const { width, height, category = 'professional', seed = 'bknd' } = config;

  // Map service categories to Unsplash search terms
  const categoryTerms: Record<string, string> = {
    plumbing: 'plumber,tools,professional',
    hvac: 'technician,tools,professional',
    electrical: 'electrician,tools,professional',
    cleaning: 'cleaning,professional,service',
    landscaping: 'garden,landscaping,professional',
    painting: 'painter,professional,service',
    roofing: 'construction,professional,worker',
    carpentry: 'carpenter,woodwork,professional',
    default: 'professional,service,business',
  };

  const searchTerm = categoryTerms[category] || categoryTerms.default;

  return `https://source.unsplash.com/${width}x${height}/?${searchTerm}&sig=${seed}`;
}

/**
 * Generate a professional gradient placeholder
 * @param config Image configuration
 * @returns Data URI with gradient
 */
export function getGradientPlaceholder(config: ImageConfig): string {
  const { width = 800, height = 400, category = 'default', text = '' } = config;
  const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS.default;

  // Create SVG with gradient and text
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors.bg};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors.bg};stop-opacity:0.7" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad)" />
      ${text ? `<text x="50%" y="50%" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="${Math.max(width / 10, 40)}" font-weight="700" fill="${colors.text}" opacity="0.3">${text}</text>` : ''}
    </svg>
  `.trim();

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/**
 * Get a professional business image
 * Priority: 1) Custom image, 2) Unsplash, 3) Gradient placeholder
 */
export function getBusinessImage(business: {
  image?: string;
  category: string;
  name: string;
  id: string;
}): string {
  if (business.image) {
    return business.image;
  }

  // Use Unsplash for realistic professional images
  return getUnsplashImage({
    width: 800,
    height: 600,
    category: business.category.toLowerCase(),
    seed: business.id,
  });
}

/**
 * Get a professional service hero image
 */
export function getServiceHeroImage(category: string): string {
  return getUnsplashImage({
    width: 1920,
    height: 600,
    category: category.toLowerCase(),
    seed: `hero-${category}`,
  });
}

/**
 * Get avatar placeholder with initials
 */
export function getAvatarPlaceholder(name: string, size: number = 100): string {
  const initials = name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');

  const bgColor = '#2563EB';
  const textColor = '#FFFFFF';

  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${bgColor}" rx="${size / 2}" />
      <text
        x="50%"
        y="50%"
        text-anchor="middle"
        dy="0.35em"
        font-family="system-ui, -apple-system, sans-serif"
        font-size="${size / 2.5}"
        font-weight="600"
        fill="${textColor}"
      >
        ${initials}
      </text>
    </svg>
  `.trim();

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/**
 * Generate blur placeholder for Next.js Image component
 * Creates a tiny base64 image for blur-up effect
 */
export function getBlurDataURL(category: string = 'default'): string {
  const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS.default;

  const svg = `
    <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
      <rect width="10" height="10" fill="${colors.bg}" />
    </svg>
  `.trim();

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/**
 * Professional stock photos from Unsplash (free to use)
 */
export const STOCK_IMAGES = {
  hero: {
    services: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80',
    professionals: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&q=80',
    trust: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80',
  },
  categories: {
    plumbing: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
    hvac: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
    electrical: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80',
    cleaning: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
    landscaping: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80',
    painting: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80',
  },
  testimonials: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  ],
};

/**
 * Get optimized image props for Next.js Image component
 */
export function getImageProps(src: string, alt: string) {
  return {
    src,
    alt,
    quality: 85,
    placeholder: 'blur' as const,
    blurDataURL: getBlurDataURL(),
  };
}

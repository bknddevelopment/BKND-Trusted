// Canonical URL Management System
// Ensures proper URL canonicalization for SEO

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://bkndtrusted.com'

interface CanonicalOptions {
  removeQueryParams?: boolean
  forceTrailingSlash?: boolean
  forceLowerCase?: boolean
}

/**
 * Generate canonical URL for a given path
 */
export function getCanonicalUrl(
  path: string,
  options: CanonicalOptions = {}
): string {
  const {
    removeQueryParams = false,
    forceTrailingSlash = true,
    forceLowerCase = true
  } = options

  // Remove leading slash if present
  let cleanPath = path.startsWith('/') ? path.slice(1) : path

  // Force lowercase for consistency
  if (forceLowerCase) {
    cleanPath = cleanPath.toLowerCase()
  }

  // Remove query parameters if specified
  if (removeQueryParams) {
    cleanPath = cleanPath.split('?')[0]
  }

  // Handle trailing slash
  if (forceTrailingSlash && !cleanPath.endsWith('/') && cleanPath !== '') {
    cleanPath += '/'
  } else if (!forceTrailingSlash && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1)
  }

  return `${BASE_URL}/${cleanPath}`
}

/**
 * Generate alternate language URLs for international SEO
 */
export function getAlternateUrls(path: string): Array<{ lang: string; url: string }> {
  const languages = [
    { code: 'en', subdomain: 'www' },
    { code: 'es', subdomain: 'es' },
    { code: 'fr', subdomain: 'fr' },
    { code: 'de', subdomain: 'de' },
    { code: 'ja', subdomain: 'ja' },
    { code: 'zh', subdomain: 'zh' }
  ]

  return languages.map(lang => ({
    lang: lang.code,
    url: `https://${lang.subdomain}.bkndtrusted.com${path}`
  }))
}

/**
 * Handle duplicate content issues with URL variations
 */
export function normalizeUrl(url: string): string {
  try {
    const urlObj = new URL(url)

    // Remove common tracking parameters
    const trackingParams = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
      'gclid',
      'fbclid',
      'ref',
      'source'
    ]

    trackingParams.forEach(param => {
      urlObj.searchParams.delete(param)
    })

    // Sort query parameters for consistency
    const sortedParams = Array.from(urlObj.searchParams.entries())
      .sort(([a], [b]) => a.localeCompare(b))

    urlObj.search = ''
    sortedParams.forEach(([key, value]) => {
      urlObj.searchParams.append(key, value)
    })

    // Force HTTPS
    urlObj.protocol = 'https:'

    // Remove default ports
    if (urlObj.port === '80' || urlObj.port === '443') {
      urlObj.port = ''
    }

    // Remove www subdomain for consistency
    urlObj.hostname = urlObj.hostname.replace(/^www\./, '')

    return urlObj.toString()
  } catch {
    return url
  }
}

/**
 * Generate pagination canonical URLs
 */
export function getPaginationCanonical(
  basePath: string,
  currentPage: number,
  totalPages: number
): {
  canonical: string
  prev?: string
  next?: string
} {
  const canonical = currentPage === 1
    ? getCanonicalUrl(basePath)
    : getCanonicalUrl(`${basePath}/page/${currentPage}`)

  const result: { canonical: string; prev?: string; next?: string } = { canonical }

  if (currentPage > 1) {
    result.prev = currentPage === 2
      ? getCanonicalUrl(basePath)
      : getCanonicalUrl(`${basePath}/page/${currentPage - 1}`)
  }

  if (currentPage < totalPages) {
    result.next = getCanonicalUrl(`${basePath}/page/${currentPage + 1}`)
  }

  return result
}

/**
 * Handle mobile/desktop URL variations
 */
export function getMobileCanonical(desktopUrl: string): string {
  // Always point to desktop version as canonical
  return desktopUrl.replace(/^https?:\/\/m\./, 'https://')
}

/**
 * Generate self-referencing canonical for current page
 */
export function getSelfCanonical(pathname: string, searchParams?: URLSearchParams): string {
  // Remove certain parameters but keep important ones
  const importantParams = ['category', 'filter', 'sort', 'page']
  const cleanParams = new URLSearchParams()

  if (searchParams) {
    importantParams.forEach(param => {
      const value = searchParams.get(param)
      if (value) {
        cleanParams.append(param, value)
      }
    })
  }

  const queryString = cleanParams.toString()
  const fullPath = queryString ? `${pathname}?${queryString}` : pathname

  return getCanonicalUrl(fullPath)
}
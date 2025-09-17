// Rate limiting using Upstash Redis

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import NodeCache from 'node-cache'
import { RateLimitInfo } from '@/types/api'

// Initialize Redis client
const redis = process.env.UPSTASH_REDIS_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_URL,
      token: process.env.UPSTASH_REDIS_TOKEN || '',
    })
  : null

// In-memory cache for development
const memoryCache = new NodeCache({ stdTTL: 60 })

// Rate limit configurations
export const rateLimiters = {
  // Public API rate limiting
  public: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(100, '1 m'), // 100 requests per minute
        analytics: true,
        prefix: 'ratelimit:public',
      })
    : null,

  // Authenticated API rate limiting
  authenticated: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(300, '1 m'), // 300 requests per minute
        analytics: true,
        prefix: 'ratelimit:auth',
      })
    : null,

  // GraphQL rate limiting
  graphql: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(50, '1 m'), // 50 queries per minute
        analytics: true,
        prefix: 'ratelimit:graphql',
      })
    : null,

  // Webhook rate limiting
  webhook: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 webhooks per minute
        analytics: true,
        prefix: 'ratelimit:webhook',
      })
    : null,

  // Search rate limiting
  search: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(30, '1 m'), // 30 searches per minute
        analytics: true,
        prefix: 'ratelimit:search',
      })
    : null,
}

// Fallback in-memory rate limiting for development
class InMemoryRateLimiter {
  private requests: Map<string, number[]> = new Map()
  private limit: number
  private window: number

  constructor(limit: number, windowInMs: number) {
    this.limit = limit
    this.window = windowInMs
  }

  async limit(identifier: string): Promise<{
    success: boolean
    limit: number
    remaining: number
    reset: Date
  }> {
    const now = Date.now()
    const windowStart = now - this.window

    // Get existing requests for this identifier
    let requests = this.requests.get(identifier) || []

    // Filter out requests outside the current window
    requests = requests.filter(timestamp => timestamp > windowStart)

    // Check if limit exceeded
    const success = requests.length < this.limit

    if (success) {
      // Add current request
      requests.push(now)
    }

    // Update the requests map
    this.requests.set(identifier, requests)

    // Clean up old entries periodically
    if (Math.random() < 0.01) {
      this.cleanup()
    }

    return {
      success,
      limit: this.limit,
      remaining: Math.max(0, this.limit - requests.length),
      reset: new Date(now + this.window),
    }
  }

  private cleanup() {
    const now = Date.now()
    for (const [key, requests] of this.requests.entries()) {
      const validRequests = requests.filter(
        timestamp => timestamp > now - this.window
      )
      if (validRequests.length === 0) {
        this.requests.delete(key)
      } else {
        this.requests.set(key, validRequests)
      }
    }
  }
}

// Development rate limiters
const devRateLimiters = {
  public: new InMemoryRateLimiter(100, 60000), // 100 per minute
  authenticated: new InMemoryRateLimiter(300, 60000), // 300 per minute
  graphql: new InMemoryRateLimiter(50, 60000), // 50 per minute
  webhook: new InMemoryRateLimiter(10, 60000), // 10 per minute
  search: new InMemoryRateLimiter(30, 60000), // 30 per minute
}

// Check rate limit
export async function checkRateLimit(
  identifier: string,
  type: keyof typeof rateLimiters = 'public'
): Promise<{ success: boolean; info: RateLimitInfo }> {
  const limiter = rateLimiters[type] || devRateLimiters[type]

  if (!limiter) {
    // If no rate limiter is available, allow all requests
    return {
      success: true,
      info: {
        limit: 1000,
        remaining: 1000,
        reset: new Date(Date.now() + 60000),
      },
    }
  }

  const result = await limiter.limit(identifier)

  return {
    success: result.success,
    info: {
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
    },
  }
}

// Get rate limit headers
export function getRateLimitHeaders(info: RateLimitInfo): Record<string, string> {
  return {
    'X-RateLimit-Limit': info.limit.toString(),
    'X-RateLimit-Remaining': info.remaining.toString(),
    'X-RateLimit-Reset': info.reset.toISOString(),
    'Retry-After': Math.max(0, Math.ceil((info.reset.getTime() - Date.now()) / 1000)).toString(),
  }
}
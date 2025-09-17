// Caching utilities for API responses

import { Redis } from '@upstash/redis'
import NodeCache from 'node-cache'

// Initialize Redis client for caching
const redis = process.env.UPSTASH_REDIS_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_URL,
      token: process.env.UPSTASH_REDIS_TOKEN || '',
    })
  : null

// In-memory cache for development
const memoryCache = new NodeCache({ stdTTL: 300 }) // 5 minutes default TTL

// Cache key prefixes
const CACHE_PREFIXES = {
  BUSINESS: 'business:',
  REVIEW: 'review:',
  USER: 'user:',
  SEARCH: 'search:',
  GEO: 'geo:',
  PRICING: 'pricing:',
  AVAILABILITY: 'availability:',
} as const

// Cache TTL configurations (in seconds)
const CACHE_TTL = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  DAY: 86400, // 24 hours
} as const

export class CacheManager {
  // Get from cache
  async get<T = any>(key: string): Promise<T | null> {
    try {
      if (redis) {
        const cached = await redis.get(key)
        return cached as T
      } else {
        return memoryCache.get<T>(key) || null
      }
    } catch (error) {
      console.error(`Cache get error for key ${key}:`, error)
      return null
    }
  }

  // Set in cache
  async set(
    key: string,
    value: any,
    ttl: number = CACHE_TTL.MEDIUM
  ): Promise<void> {
    try {
      if (redis) {
        await redis.set(key, JSON.stringify(value), { ex: ttl })
      } else {
        memoryCache.set(key, value, ttl)
      }
    } catch (error) {
      console.error(`Cache set error for key ${key}:`, error)
    }
  }

  // Delete from cache
  async delete(key: string): Promise<void> {
    try {
      if (redis) {
        await redis.del(key)
      } else {
        memoryCache.del(key)
      }
    } catch (error) {
      console.error(`Cache delete error for key ${key}:`, error)
    }
  }

  // Delete multiple keys by pattern
  async deletePattern(pattern: string): Promise<void> {
    try {
      if (redis) {
        // For Upstash Redis, we need to scan and delete
        // Note: This is expensive for large datasets
        const keys = await this.scanKeys(pattern)
        if (keys.length > 0) {
          await redis.del(...keys)
        }
      } else {
        // For memory cache, iterate and delete matching keys
        const keys = memoryCache.keys()
        for (const key of keys) {
          if (key.includes(pattern)) {
            memoryCache.del(key)
          }
        }
      }
    } catch (error) {
      console.error(`Cache delete pattern error for ${pattern}:`, error)
    }
  }

  // Scan keys (for Redis)
  private async scanKeys(pattern: string): Promise<string[]> {
    if (!redis) return []

    const keys: string[] = []
    let cursor = 0

    // Note: Upstash Redis has limitations on SCAN
    // This is a simplified implementation
    try {
      // For Upstash, we might need to use a different approach
      // or maintain a separate index of keys
      return keys
    } catch (error) {
      console.error('Scan keys error:', error)
      return []
    }
  }

  // Cache with automatic key generation
  async remember<T>(
    key: string,
    ttl: number,
    callback: () => Promise<T>
  ): Promise<T> {
    const cached = await this.get<T>(key)
    if (cached !== null) {
      return cached
    }

    const fresh = await callback()
    await this.set(key, fresh, ttl)
    return fresh
  }

  // Invalidate related caches
  async invalidateRelated(entity: string, id?: string): Promise<void> {
    const patterns = []

    switch (entity) {
      case 'business':
        if (id) {
          patterns.push(
            `${CACHE_PREFIXES.BUSINESS}${id}`,
            `${CACHE_PREFIXES.REVIEW}:business:${id}`,
            `${CACHE_PREFIXES.PRICING}${id}`,
            `${CACHE_PREFIXES.AVAILABILITY}${id}`
          )
        }
        patterns.push(`${CACHE_PREFIXES.SEARCH}`)
        break

      case 'review':
        if (id) {
          patterns.push(`${CACHE_PREFIXES.REVIEW}${id}`)
        }
        patterns.push(`${CACHE_PREFIXES.SEARCH}`)
        break

      case 'user':
        if (id) {
          patterns.push(`${CACHE_PREFIXES.USER}${id}`)
        }
        break

      default:
        break
    }

    await Promise.all(patterns.map(pattern => this.deletePattern(pattern)))
  }
}

// Export singleton instance
export const cache = new CacheManager()

// Cache key generators
export const cacheKeys = {
  business: (id: string) => `${CACHE_PREFIXES.BUSINESS}${id}`,
  businessList: (filters: any) =>
    `${CACHE_PREFIXES.BUSINESS}list:${JSON.stringify(filters)}`,
  review: (id: string) => `${CACHE_PREFIXES.REVIEW}${id}`,
  reviewList: (businessId: string, page: number) =>
    `${CACHE_PREFIXES.REVIEW}business:${businessId}:page:${page}`,
  user: (id: string) => `${CACHE_PREFIXES.USER}${id}`,
  search: (query: string, filters: any) =>
    `${CACHE_PREFIXES.SEARCH}${query}:${JSON.stringify(filters)}`,
  geo: (lat: number, lng: number, radius: number) =>
    `${CACHE_PREFIXES.GEO}${lat}:${lng}:${radius}`,
  pricing: (businessId: string, date: string) =>
    `${CACHE_PREFIXES.PRICING}${businessId}:${date}`,
  availability: (businessId: string, date: string) =>
    `${CACHE_PREFIXES.AVAILABILITY}${businessId}:${date}`,
}

// Export TTL configurations
export { CACHE_TTL }
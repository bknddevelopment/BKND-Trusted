import Redis from 'ioredis';
import { LRUCache } from 'lru-cache';
import crypto from 'crypto';

/**
 * Multi-layer caching system with Redis and in-memory LRU cache
 * Implements cache-aside pattern with automatic invalidation
 */

// Redis configuration
const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB || '0'),
  retryStrategy: (times: number) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  enableReadyCheck: true,
  maxRetriesPerRequest: 3,
  lazyConnect: true,
};

// Create Redis clients
const redis = process.env.REDIS_URL
  ? new Redis(process.env.REDIS_URL)
  : new Redis(redisConfig);

const redisSubscriber = process.env.REDIS_URL
  ? new Redis(process.env.REDIS_URL)
  : new Redis(redisConfig);

// In-memory LRU cache configuration
const memoryCache = new LRUCache<string, any>({
  max: 500, // Maximum number of items
  ttl: 1000 * 60 * 5, // 5 minutes default TTL
  updateAgeOnGet: true,
  updateAgeOnHas: false,
  fetchMethod: async (key: string) => {
    // Fallback to Redis if not in memory
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
  },
});

// Cache key prefixes for different data types
export const CachePrefix = {
  USER: 'user:',
  SESSION: 'session:',
  API: 'api:',
  PAGE: 'page:',
  QUERY: 'query:',
  TEMP: 'temp:',
} as const;

// Cache TTL configurations (in seconds)
export const CacheTTL = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  DAY: 86400, // 24 hours
  WEEK: 604800, // 7 days
} as const;

interface CacheOptions {
  ttl?: number;
  prefix?: string;
  compress?: boolean;
  fallback?: () => Promise<any>;
}

class CacheManager {
  private connected = false;

  async connect() {
    if (this.connected) return;

    try {
      await redis.connect();
      await redisSubscriber.connect();
      this.connected = true;

      // Set up pub/sub for cache invalidation
      redisSubscriber.on('message', (channel, message) => {
        if (channel === 'cache:invalidate') {
          const keys = JSON.parse(message);
          keys.forEach((key: string) => memoryCache.delete(key));
        }
      });

      await redisSubscriber.subscribe('cache:invalidate');
      console.log('✅ Cache system connected');
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
      // Fallback to memory-only cache
      this.connected = false;
    }
  }

  /**
   * Generate cache key with optional prefix and hash
   */
  generateKey(identifier: string, prefix?: string): string {
    const baseKey = prefix ? `${prefix}${identifier}` : identifier;

    // Hash long keys to avoid Redis key length limits
    if (baseKey.length > 200) {
      const hash = crypto.createHash('sha256').update(baseKey).digest('hex');
      return prefix ? `${prefix}${hash}` : hash;
    }

    return baseKey;
  }

  /**
   * Get value from cache (checks memory first, then Redis)
   */
  async get<T>(key: string, options?: CacheOptions): Promise<T | null> {
    try {
      // Check memory cache first
      const memoryValue = memoryCache.get(key);
      if (memoryValue !== undefined) {
        return memoryValue;
      }

      // Check Redis if connected
      if (this.connected) {
        const redisValue = await redis.get(key);
        if (redisValue) {
          const parsed = JSON.parse(redisValue);
          // Store in memory cache for faster subsequent access
          memoryCache.set(key, parsed);
          return parsed;
        }
      }

      // Use fallback if provided
      if (options?.fallback) {
        const value = await options.fallback();
        if (value !== null && value !== undefined) {
          await this.set(key, value, options);
        }
        return value;
      }

      return null;
    } catch (error) {
      console.error(`Cache get error for key ${key}:`, error);
      return null;
    }
  }

  /**
   * Set value in cache (both memory and Redis)
   */
  async set<T>(key: string, value: T, options?: CacheOptions): Promise<boolean> {
    try {
      const ttl = options?.ttl || CacheTTL.MEDIUM;
      const serialized = JSON.stringify(value);

      // Store in memory cache
      memoryCache.set(key, value, { ttl: ttl * 1000 });

      // Store in Redis if connected
      if (this.connected) {
        await redis.setex(key, ttl, serialized);
      }

      return true;
    } catch (error) {
      console.error(`Cache set error for key ${key}:`, error);
      return false;
    }
  }

  /**
   * Delete value from cache
   */
  async delete(key: string | string[]): Promise<boolean> {
    try {
      const keys = Array.isArray(key) ? key : [key];

      // Delete from memory cache
      keys.forEach(k => memoryCache.delete(k));

      // Delete from Redis if connected
      if (this.connected && keys.length > 0) {
        await redis.del(...keys);

        // Publish invalidation event for other instances
        await redis.publish('cache:invalidate', JSON.stringify(keys));
      }

      return true;
    } catch (error) {
      console.error(`Cache delete error:`, error);
      return false;
    }
  }

  /**
   * Clear all cache entries with a specific prefix
   */
  async clearPrefix(prefix: string): Promise<boolean> {
    try {
      // Clear from memory cache
      const memoryKeys = [...memoryCache.keys()].filter(k => k.startsWith(prefix));
      memoryKeys.forEach(k => memoryCache.delete(k));

      // Clear from Redis if connected
      if (this.connected) {
        const stream = redis.scanStream({
          match: `${prefix}*`,
          count: 100,
        });

        const pipeline = redis.pipeline();

        stream.on('data', (keys) => {
          if (keys.length) {
            keys.forEach((key: string) => pipeline.del(key));
          }
        });

        await new Promise((resolve, reject) => {
          stream.on('end', resolve);
          stream.on('error', reject);
        });

        await pipeline.exec();
      }

      return true;
    } catch (error) {
      console.error(`Cache clear prefix error:`, error);
      return false;
    }
  }

  /**
   * Cache wrapper for async functions with automatic caching
   */
  async wrap<T>(
    key: string,
    fn: () => Promise<T>,
    options?: CacheOptions
  ): Promise<T> {
    // Try to get from cache first
    const cached = await this.get<T>(key, options);
    if (cached !== null) {
      return cached;
    }

    // Execute function and cache result
    const result = await fn();
    if (result !== null && result !== undefined) {
      await this.set(key, result, options);
    }

    return result;
  }

  /**
   * Batch get multiple keys
   */
  async mget<T>(keys: string[]): Promise<(T | null)[]> {
    try {
      const results: (T | null)[] = [];

      // Get from memory cache first
      const memoryResults = keys.map(key => memoryCache.get(key));

      // Get missing keys from Redis
      if (this.connected) {
        const missingKeys = keys.filter((_, i) => memoryResults[i] === undefined);

        if (missingKeys.length > 0) {
          const redisValues = await redis.mget(...missingKeys);

          let redisIndex = 0;
          for (let i = 0; i < keys.length; i++) {
            if (memoryResults[i] !== undefined) {
              results.push(memoryResults[i]);
            } else {
              const value = redisValues[redisIndex++];
              const parsed = value ? JSON.parse(value) : null;
              results.push(parsed);

              // Cache in memory for next time
              if (parsed !== null) {
                memoryCache.set(keys[i], parsed);
              }
            }
          }
        } else {
          return memoryResults;
        }
      } else {
        return memoryResults;
      }

      return results;
    } catch (error) {
      console.error('Cache mget error:', error);
      return keys.map(() => null);
    }
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      memory: {
        size: memoryCache.size,
        calculatedSize: memoryCache.calculatedSize,
      },
      redis: {
        connected: this.connected,
      },
    };
  }

  /**
   * Disconnect from Redis
   */
  async disconnect() {
    if (this.connected) {
      await redis.quit();
      await redisSubscriber.quit();
      this.connected = false;
    }
  }
}

// Export singleton instance
export const cache = new CacheManager();

// Initialize cache connection
if (typeof window === 'undefined') {
  cache.connect().catch(console.error);
}

// Export cache decorators for class methods
export function Cacheable(options?: CacheOptions) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const key = cache.generateKey(
        `${target.constructor.name}:${propertyKey}:${JSON.stringify(args)}`,
        options?.prefix
      );

      return cache.wrap(
        key,
        () => originalMethod.apply(this, args),
        options
      );
    };

    return descriptor;
  };
}

// Export cache invalidation decorator
export function InvalidateCache(prefix: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const result = await originalMethod.apply(this, args);
      await cache.clearPrefix(prefix);
      return result;
    };

    return descriptor;
  };
}
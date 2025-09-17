import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { cache, CachePrefix, CacheTTL } from './cache';

/**
 * Database Query Optimizer
 * Implements connection pooling, query caching, and performance monitoring
 */

// Singleton Prisma instance with query optimization
class OptimizedPrismaClient extends PrismaClient {
  private static instance: OptimizedPrismaClient;

  private constructor() {
    super({
      log: process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
      errorFormat: 'minimal',
    });

    // Add query event listeners for monitoring
    this.$use(async (params, next) => {
      const startTime = Date.now();

      try {
        const result = await next(params);
        const duration = Date.now() - startTime;

        // Log slow queries
        if (duration > 100) {
          console.warn(`Slow query detected: ${params.model}.${params.action} took ${duration}ms`);
        }

        return result;
      } catch (error) {
        const duration = Date.now() - startTime;
        console.error(`Query failed: ${params.model}.${params.action} after ${duration}ms`, error);
        throw error;
      }
    });
  }

  static getInstance(): OptimizedPrismaClient {
    if (!OptimizedPrismaClient.instance) {
      OptimizedPrismaClient.instance = new OptimizedPrismaClient();
    }
    return OptimizedPrismaClient.instance;
  }
}

// PostgreSQL connection pool for raw queries
const pgPool = new Pool({
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  max: parseInt(process.env.DATABASE_POOL_SIZE || '20'),
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  statement_timeout: 10000,
  query_timeout: 10000,
});

// Export optimized Prisma client
export const prisma = OptimizedPrismaClient.getInstance();

/**
 * Query optimization utilities
 */
export class QueryOptimizer {
  /**
   * Execute query with caching
   */
  static async cachedQuery<T>(
    queryKey: string,
    queryFn: () => Promise<T>,
    ttl: number = CacheTTL.MEDIUM
  ): Promise<T> {
    const cacheKey = cache.generateKey(queryKey, CachePrefix.QUERY);

    return cache.wrap(cacheKey, queryFn, { ttl });
  }

  /**
   * Batch database operations for efficiency
   */
  static async batchOperation<T>(
    operations: Array<() => Promise<T>>
  ): Promise<T[]> {
    // Use transaction for consistency
    return prisma.$transaction(operations.map(op => op()));
  }

  /**
   * Paginated query with cursor-based pagination
   */
  static async paginatedQuery<T>(
    model: any,
    {
      where = {},
      orderBy = { id: 'asc' },
      take = 20,
      cursor,
      include,
      select,
    }: {
      where?: any;
      orderBy?: any;
      take?: number;
      cursor?: any;
      include?: any;
      select?: any;
    }
  ): Promise<{
    data: T[];
    nextCursor: any;
    hasMore: boolean;
  }> {
    const queryOptions: any = {
      where,
      orderBy,
      take: take + 1, // Fetch one extra to determine if there's more
      ...(cursor && { cursor, skip: 1 }),
      ...(include && { include }),
      ...(select && { select }),
    };

    const results = await model.findMany(queryOptions);

    const hasMore = results.length > take;
    const data = hasMore ? results.slice(0, -1) : results;
    const nextCursor = hasMore ? data[data.length - 1].id : null;

    return {
      data,
      nextCursor,
      hasMore,
    };
  }

  /**
   * Execute raw SQL with connection pooling
   */
  static async rawQuery<T>(
    query: string,
    values?: any[]
  ): Promise<T[]> {
    const client = await pgPool.connect();

    try {
      const result = await client.query(query, values);
      return result.rows;
    } finally {
      client.release();
    }
  }

  /**
   * Bulk insert with optimal batch size
   */
  static async bulkInsert<T>(
    model: any,
    data: T[],
    batchSize: number = 1000
  ): Promise<number> {
    let inserted = 0;

    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      await model.createMany({
        data: batch,
        skipDuplicates: true,
      });
      inserted += batch.length;
    }

    return inserted;
  }

  /**
   * Optimized count query with caching
   */
  static async count(
    model: any,
    where: any = {},
    cacheTTL: number = CacheTTL.SHORT
  ): Promise<number> {
    const queryKey = `count:${model.name}:${JSON.stringify(where)}`;

    return this.cachedQuery(
      queryKey,
      () => model.count({ where }),
      cacheTTL
    );
  }

  /**
   * Find with includes optimization
   */
  static async findWithIncludes<T>(
    model: any,
    {
      where,
      include,
      cache: useCache = true,
      ttl = CacheTTL.MEDIUM,
    }: {
      where: any;
      include: any;
      cache?: boolean;
      ttl?: number;
    }
  ): Promise<T | null> {
    const queryFn = () => model.findFirst({ where, include });

    if (!useCache) {
      return queryFn();
    }

    const queryKey = `find:${model.name}:${JSON.stringify({ where, include })}`;
    return this.cachedQuery(queryKey, queryFn, ttl);
  }

  /**
   * Aggregate query with caching
   */
  static async aggregate<T>(
    model: any,
    {
      where = {},
      _sum,
      _avg,
      _min,
      _max,
      _count,
      cache: useCache = true,
      ttl = CacheTTL.LONG,
    }: {
      where?: any;
      _sum?: any;
      _avg?: any;
      _min?: any;
      _max?: any;
      _count?: any;
      cache?: boolean;
      ttl?: number;
    }
  ): Promise<T> {
    const queryFn = () => model.aggregate({
      where,
      ...(_sum && { _sum }),
      ...(_avg && { _avg }),
      ...(_min && { _min }),
      ...(_max && { _max }),
      ...(_count && { _count }),
    });

    if (!useCache) {
      return queryFn();
    }

    const queryKey = `aggregate:${model.name}:${JSON.stringify(arguments[1])}`;
    return this.cachedQuery(queryKey, queryFn, ttl);
  }

  /**
   * Upsert with cache invalidation
   */
  static async upsert<T>(
    model: any,
    {
      where,
      create,
      update,
    }: {
      where: any;
      create: any;
      update: any;
    }
  ): Promise<T> {
    const result = await model.upsert({
      where,
      create,
      update,
    });

    // Invalidate related caches
    await cache.clearPrefix(`${CachePrefix.QUERY}${model.name}`);

    return result;
  }

  /**
   * Delete with cache invalidation
   */
  static async delete(
    model: any,
    where: any
  ): Promise<any> {
    const result = await model.delete({ where });

    // Invalidate related caches
    await cache.clearPrefix(`${CachePrefix.QUERY}${model.name}`);

    return result;
  }

  /**
   * Update with cache invalidation
   */
  static async update<T>(
    model: any,
    {
      where,
      data,
    }: {
      where: any;
      data: any;
    }
  ): Promise<T> {
    const result = await model.update({
      where,
      data,
    });

    // Invalidate related caches
    await cache.clearPrefix(`${CachePrefix.QUERY}${model.name}`);

    return result;
  }
}

/**
 * Database connection health check
 */
export async function checkDatabaseHealth(): Promise<{
  postgres: boolean;
  prisma: boolean;
  poolStats: any;
}> {
  const results = {
    postgres: false,
    prisma: false,
    poolStats: {},
  };

  // Check PostgreSQL connection
  try {
    const client = await pgPool.connect();
    await client.query('SELECT 1');
    client.release();
    results.postgres = true;
    results.poolStats = {
      totalCount: pgPool.totalCount,
      idleCount: pgPool.idleCount,
      waitingCount: pgPool.waitingCount,
    };
  } catch (error) {
    console.error('PostgreSQL health check failed:', error);
  }

  // Check Prisma connection
  try {
    await prisma.$queryRaw`SELECT 1`;
    results.prisma = true;
  } catch (error) {
    console.error('Prisma health check failed:', error);
  }

  return results;
}

/**
 * Cleanup function for graceful shutdown
 */
export async function cleanupDatabase(): Promise<void> {
  await prisma.$disconnect();
  await pgPool.end();
  await cache.disconnect();
}
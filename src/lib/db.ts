/**
 * Database Connection Manager with Connection Pooling
 * Optimized for high-traffic, production workloads
 */

import { PrismaClient } from '@prisma/client'
import { Pool, PoolConfig } from 'pg'

// Singleton PrismaClient with connection pool configuration
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Prisma connection configuration
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development'
    ? ['query', 'error', 'warn']
    : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Native PostgreSQL connection pool for raw queries
const poolConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  max: parseInt(process.env.DB_POOL_MAX || '20'),
  min: parseInt(process.env.DB_POOL_MIN || '2'),
  idleTimeoutMillis: parseInt(process.env.DB_POOL_IDLE_TIMEOUT || '10000'),
  connectionTimeoutMillis: parseInt(process.env.DB_POOL_ACQUIRE_TIMEOUT || '60000'),
  allowExitOnIdle: process.env.NODE_ENV === 'production',
}

export const pgPool = new Pool(poolConfig)

// Health check function
export async function checkDatabaseHealth(): Promise<{
  isHealthy: boolean
  latency: number
  error?: string
}> {
  const startTime = Date.now()
  try {
    // Test Prisma connection
    await prisma.$queryRaw`SELECT 1`

    // Test raw pool connection
    const client = await pgPool.connect()
    await client.query('SELECT 1')
    client.release()

    return {
      isHealthy: true,
      latency: Date.now() - startTime,
    }
  } catch (error) {
    return {
      isHealthy: false,
      latency: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Connection statistics
export async function getConnectionStats() {
  const poolStats = {
    total: pgPool.totalCount,
    idle: pgPool.idleCount,
    waiting: pgPool.waitingCount,
  }

  const prismaMetrics = await prisma.$metrics.json()

  return {
    pool: poolStats,
    prisma: prismaMetrics,
  }
}

// Graceful shutdown
export async function disconnectDatabase() {
  await prisma.$disconnect()
  await pgPool.end()
}

// PostGIS-specific queries
export const geoQueries = {
  /**
   * Find businesses within radius using PostGIS
   */
  async findBusinessesNearby(
    lat: number,
    lng: number,
    radiusMiles: number,
    limit = 20
  ) {
    const result = await prisma.$queryRaw`
      SELECT
        b.*,
        ST_Distance(
          ST_MakePoint(${lng}::float, ${lat}::float)::geography,
          ST_MakePoint(b.longitude::float, b.latitude::float)::geography
        ) * 0.000621371 as distance_miles
      FROM businesses b
      WHERE ST_DWithin(
        ST_MakePoint(b.longitude::float, b.latitude::float)::geography,
        ST_MakePoint(${lng}::float, ${lat}::float)::geography,
        ${radiusMiles * 1609.34}
      )
      AND b.status = 'VERIFIED'
      ORDER BY distance_miles
      LIMIT ${limit}
    `
    return result
  },

  /**
   * Find businesses within a polygon boundary
   */
  async findBusinessesInBoundary(boundary: any) {
    const result = await prisma.$queryRaw`
      SELECT b.*
      FROM businesses b
      WHERE ST_Within(
        ST_MakePoint(b.longitude::float, b.latitude::float),
        ST_GeomFromGeoJSON(${JSON.stringify(boundary)})
      )
      AND b.status = 'VERIFIED'
    `
    return result
  },

  /**
   * Calculate distance between two points
   */
  async calculateDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): Promise<number> {
    const result = await prisma.$queryRaw<[{ distance: number }]>`
      SELECT ST_Distance(
        ST_MakePoint(${lng1}::float, ${lat1}::float)::geography,
        ST_MakePoint(${lng2}::float, ${lat2}::float)::geography
      ) * 0.000621371 as distance
    `
    return result[0].distance
  },
}

// Transaction helper with retry logic
export async function withTransaction<T>(
  fn: (tx: any) => Promise<T>,
  maxRetries = 3
): Promise<T> {
  let lastError: Error | undefined

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await prisma.$transaction(fn, {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: 'ReadCommitted',
      })
    } catch (error) {
      lastError = error as Error

      // Don't retry on certain errors
      if (
        lastError.message.includes('unique constraint') ||
        lastError.message.includes('foreign key constraint')
      ) {
        throw lastError
      }

      // Wait before retry with exponential backoff
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000))
      }
    }
  }

  throw lastError
}

// Export types
export type { Business, User, Review, ServiceCategory } from '@prisma/client'
# BKND Trusted - PostgreSQL + PostGIS Database

A production-ready PostgreSQL database with PostGIS extensions for BKND Trusted, designed to handle 50,000+ pages and millions of location-based queries.

## Features

- **PostgreSQL 16** with **PostGIS 3.4** for geographic queries
- **Prisma ORM** for type-safe database access
- **Connection pooling** optimized for high traffic
- **Geographic indexes** for fast location-based searches
- **Full-text search** with trigram matching
- **Materialized views** for performance
- **Docker Compose** setup for local development
- **Comprehensive seed data** generator

## Database Schema

### Core Tables
- **Businesses** - Service providers with geo-location data
- **Service Categories** - HVAC, plumbing, electrical, etc.
- **Locations** - States, counties, cities with boundaries
- **Reviews & Ratings** - Customer feedback system
- **Pricing Data** - Service pricing information
- **Users** - Account management
- **Business Verification** - Trust and verification status

### Geographic Features
- Radius-based business search
- Service area coverage calculation
- Competitor analysis by location
- City/county/state boundary queries

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
```bash
cd "/Users/charwinvanryckdegroot/Github/BKND Trusted"
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the database**
```bash
npm run docker:up
```

4. **Setup environment**
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. **Run migrations**
```bash
npm run db:generate
npm run db:migrate
```

6. **Seed the database**
```bash
npm run db:seed
```

## Available Commands

```bash
# Docker
npm run docker:up        # Start PostgreSQL + Redis
npm run docker:down      # Stop containers
npm run docker:reset     # Reset and restart containers

# Database
npm run db:migrate       # Run migrations
npm run db:seed          # Seed test data
npm run db:studio        # Open Prisma Studio GUI
npm run db:reset         # Reset database
npm run db:generate      # Generate Prisma Client

# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run typecheck        # Type checking
npm run lint             # Run linter
```

## Database Performance

### Optimizations Implemented

1. **Spatial Indexes**
   - GIST indexes for geographic queries
   - Optimized for radius searches

2. **Composite Indexes**
   - Multi-column indexes for common queries
   - Covering indexes to avoid table lookups

3. **Full-Text Search**
   - Trigram indexes for fuzzy matching
   - Weighted search vectors

4. **Partial Indexes**
   - Filtered indexes for specific conditions
   - Reduced index size and improved performance

5. **Materialized Views**
   - Pre-computed city statistics
   - Refreshed periodically for performance

### Query Examples

```typescript
// Find businesses within radius
const nearbyBusinesses = await geoQueries.findBusinessesNearby(
  40.7128,  // latitude
  -74.0060, // longitude
  25,       // radius in miles
  20        // limit
)

// Search businesses by service area
const businesses = await prisma.business.findMany({
  where: {
    status: 'VERIFIED',
    city: {
      slug: 'new-york'
    },
    services: {
      some: {
        category: {
          slug: 'plumbing'
        }
      }
    }
  },
  orderBy: {
    average_rating: 'desc'
  }
})
```

## Database Architecture

### Connection Pooling
- Min connections: 2
- Max connections: 10 (configurable via `DB_POOL_MAX`)
- Idle timeout: 10 seconds
- Acquire timeout: 60 seconds

### Geographic Functions
- `find_businesses_within_radius()` - Radius search
- `find_businesses_by_service_area()` - Service area lookup
- `calculate_business_coverage()` - Coverage statistics
- `find_competitor_businesses()` - Competitor analysis

### Scaling Considerations
- Designed for 50,000+ pages
- Optimized for millions of queries
- Horizontal scaling ready
- Read replica support via Prisma

## Monitoring

### Performance Views
```sql
-- Check index usage
SELECT * FROM index_usage_stats;

-- Monitor table bloat
SELECT * FROM table_bloat_estimate;

-- View slow queries
SELECT * FROM query_performance_log
ORDER BY duration_ms DESC;
```

### Health Checks
```typescript
// Check database health
const health = await checkDatabaseHealth()
console.log(`Database healthy: ${health.isHealthy}`)
console.log(`Latency: ${health.latency}ms`)

// Get connection stats
const stats = await getConnectionStats()
console.log(`Active connections: ${stats.pool.total}`)
```

## Production Deployment

### Recommended Settings

```sql
-- Memory (for 16GB RAM server)
shared_buffers = '4GB'
effective_cache_size = '12GB'
work_mem = '16MB'

-- Connection pooling
max_connections = 200

-- SSD optimizations
random_page_cost = 1.1
effective_io_concurrency = 200
```

### Backup Strategy
1. Daily automated backups via pg_dump
2. Point-in-time recovery with WAL archiving
3. Geo-redundant storage recommended

### Security
- Use environment variables for credentials
- Enable SSL for connections
- Regular security updates
- Implement row-level security if needed

## Testing

The seed data generator creates:
- 10 major US cities
- 5 service categories with 35 service types
- 200-500 businesses across cities
- 150 users (50 business owners, 100 customers)
- 1000+ reviews
- Realistic pricing data

## Troubleshooting

### Common Issues

1. **PostGIS extension not found**
   - Ensure you're using the `postgis/postgis` Docker image
   - Run `CREATE EXTENSION postgis;` manually if needed

2. **Connection pool exhausted**
   - Increase `DB_POOL_MAX` in .env
   - Check for connection leaks in application

3. **Slow geographic queries**
   - Ensure spatial indexes are created
   - Use `EXPLAIN ANALYZE` to check query plans
   - Consider increasing `work_mem` for complex queries

## Support

For issues or questions, please refer to the documentation or create an issue in the repository.

## License

MIT
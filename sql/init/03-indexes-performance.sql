-- High-Performance Indexes for BKND Trusted Database
-- Optimized for 50,000+ pages and millions of queries

-- ==================== SPATIAL INDEXES ====================
-- Critical for geographic queries

-- Business location indexes (using GIST for spatial data)
CREATE INDEX idx_businesses_location_gist ON businesses USING GIST (
    ST_MakePoint(longitude, latitude)
);

-- Index for radius queries
CREATE INDEX idx_businesses_location_geography ON businesses USING GIST (
    (ST_MakePoint(longitude, latitude)::geography)
);

-- City/County/State boundary indexes
CREATE INDEX idx_states_boundary ON states USING GIN (boundary);
CREATE INDEX idx_counties_boundary ON counties USING GIN (boundary);
CREATE INDEX idx_cities_boundary ON cities USING GIN (boundary);
CREATE INDEX idx_zip_codes_boundary ON zip_codes USING GIN (boundary);

-- ==================== COMPOSITE INDEXES ====================
-- For common query patterns

-- Business search by location and category
CREATE INDEX idx_businesses_state_status_rating ON businesses(state_id, status, average_rating DESC)
    WHERE status = 'VERIFIED';

CREATE INDEX idx_businesses_city_status_rating ON businesses(city_id, status, average_rating DESC)
    WHERE status = 'VERIFIED';

-- Business services lookup
CREATE INDEX idx_business_services_category_business ON business_services(category_id, business_id)
    WHERE is_primary = true;

-- Reviews by business and rating
CREATE INDEX idx_reviews_business_rating_created ON reviews(business_id, rating DESC, created_at DESC)
    WHERE status = 'APPROVED';

-- User reviews
CREATE INDEX idx_reviews_user_created ON reviews(user_id, created_at DESC)
    WHERE status = 'APPROVED';

-- ==================== TEXT SEARCH INDEXES ====================
-- For full-text search capabilities

-- Business name and description search
CREATE INDEX idx_businesses_name_trgm ON businesses USING GIN (name gin_trgm_ops);
CREATE INDEX idx_businesses_description_trgm ON businesses USING GIN (description gin_trgm_ops);

-- Add text search vector columns
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS search_vector tsvector;

UPDATE businesses SET search_vector =
    setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(short_description, '')), 'C');

CREATE INDEX idx_businesses_search_vector ON businesses USING GIN (search_vector);

-- Trigger to maintain search vector
CREATE OR REPLACE FUNCTION update_business_search_vector() RETURNS trigger AS $$
BEGIN
    NEW.search_vector :=
        setweight(to_tsvector('english', coalesce(NEW.name, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(NEW.description, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(NEW.short_description, '')), 'C');
    RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_business_search_vector_trigger
    BEFORE INSERT OR UPDATE ON businesses
    FOR EACH ROW
    EXECUTE FUNCTION update_business_search_vector();

-- ==================== PARTIAL INDEXES ====================
-- For specific query patterns

-- Featured businesses
CREATE INDEX idx_businesses_featured ON businesses(featured_until DESC, display_priority DESC)
    WHERE featured_until > NOW();

-- Emergency services
CREATE INDEX idx_businesses_emergency ON businesses(state_id, city_id, average_rating DESC)
    WHERE offers_emergency = true AND status = 'VERIFIED';

-- Verified businesses only
CREATE INDEX idx_businesses_verified_priority ON businesses(display_priority DESC, average_rating DESC)
    WHERE status = 'VERIFIED';

-- High-rated businesses
CREATE INDEX idx_businesses_high_rated ON businesses(state_id, average_rating DESC)
    WHERE average_rating >= 4.5 AND total_reviews >= 10;

-- ==================== COVERING INDEXES ====================
-- Include all columns needed for common queries

-- Business listing page (no table lookup needed)
CREATE INDEX idx_businesses_listing_cover ON businesses(
    state_id,
    city_id,
    status,
    average_rating DESC
) INCLUDE (
    name,
    slug,
    short_description,
    total_reviews,
    price_range,
    latitude,
    longitude
) WHERE status = 'VERIFIED';

-- ==================== UNIQUE CONSTRAINTS WITH PERFORMANCE ====================

-- Ensure slug uniqueness with fast lookups
CREATE UNIQUE INDEX idx_businesses_slug_unique ON businesses(slug);
CREATE UNIQUE INDEX idx_service_categories_slug_unique ON service_categories(slug);
CREATE UNIQUE INDEX idx_cities_state_slug_unique ON cities(state_id, slug);

-- ==================== STATISTICS AND MONITORING ====================

-- Table for tracking slow queries
CREATE TABLE IF NOT EXISTS query_performance_log (
    id SERIAL PRIMARY KEY,
    query_fingerprint TEXT,
    query_text TEXT,
    duration_ms FLOAT,
    rows_returned INT,
    timestamp TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_query_performance_log_duration ON query_performance_log(duration_ms DESC);
CREATE INDEX idx_query_performance_log_timestamp ON query_performance_log(timestamp DESC);

-- Function to log slow queries
CREATE OR REPLACE FUNCTION log_slow_query(
    p_query TEXT,
    p_duration_ms FLOAT,
    p_rows INT
) RETURNS void AS $$
BEGIN
    IF p_duration_ms > 100 THEN  -- Log queries slower than 100ms
        INSERT INTO query_performance_log (query_fingerprint, query_text, duration_ms, rows_returned)
        VALUES (md5(p_query), p_query, p_duration_ms, p_rows);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- ==================== MAINTENANCE FUNCTIONS ====================

-- Function to update all statistics
CREATE OR REPLACE FUNCTION update_table_statistics() RETURNS void AS $$
BEGIN
    ANALYZE businesses;
    ANALYZE business_services;
    ANALYZE reviews;
    ANALYZE service_categories;
    ANALYZE cities;
    ANALYZE states;
END;
$$ LANGUAGE plpgsql;

-- Function to rebuild indexes concurrently (for zero-downtime maintenance)
CREATE OR REPLACE FUNCTION rebuild_indexes_concurrently() RETURNS void AS $$
DECLARE
    idx RECORD;
BEGIN
    FOR idx IN
        SELECT schemaname, indexname
        FROM pg_indexes
        WHERE schemaname = 'public'
        AND indexname LIKE 'idx_%'
    LOOP
        EXECUTE format('REINDEX INDEX CONCURRENTLY %I.%I', idx.schemaname, idx.indexname);
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- ==================== PARTITIONING SETUP ====================
-- For tables that will grow very large

-- Partition reviews by year for better performance
-- (Note: This would require recreating the reviews table)
-- Example for future implementation:
/*
CREATE TABLE reviews_partitioned (
    LIKE reviews INCLUDING ALL
) PARTITION BY RANGE (created_at);

CREATE TABLE reviews_y2024 PARTITION OF reviews_partitioned
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

CREATE TABLE reviews_y2025 PARTITION OF reviews_partitioned
    FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');
*/

-- ==================== QUERY OPTIMIZATION SETTINGS ====================

-- Set optimal configuration for production workloads
-- These should be set in postgresql.conf or via ALTER SYSTEM

/*
-- Memory settings
ALTER SYSTEM SET shared_buffers = '4GB';
ALTER SYSTEM SET effective_cache_size = '12GB';
ALTER SYSTEM SET work_mem = '16MB';
ALTER SYSTEM SET maintenance_work_mem = '512MB';

-- Connection pooling
ALTER SYSTEM SET max_connections = 200;

-- Query planner
ALTER SYSTEM SET random_page_cost = 1.1;  -- For SSD storage
ALTER SYSTEM SET effective_io_concurrency = 200;  -- For SSD storage

-- Parallel queries
ALTER SYSTEM SET max_parallel_workers_per_gather = 4;
ALTER SYSTEM SET max_parallel_workers = 8;

-- Write performance
ALTER SYSTEM SET checkpoint_completion_target = 0.9;
ALTER SYSTEM SET wal_buffers = '16MB';
ALTER SYSTEM SET min_wal_size = '1GB';
ALTER SYSTEM SET max_wal_size = '4GB';

-- Apply settings
SELECT pg_reload_conf();
*/

-- ==================== MONITORING VIEWS ====================

-- View for index usage statistics
CREATE OR REPLACE VIEW index_usage_stats AS
SELECT
    schemaname,
    tablename,
    indexname,
    idx_scan as index_scans,
    idx_tup_read as tuples_read,
    idx_tup_fetch as tuples_fetched,
    pg_size_pretty(pg_relation_size(indexrelid)) as index_size,
    CASE
        WHEN idx_scan = 0 THEN 'UNUSED'
        WHEN idx_scan < 100 THEN 'RARELY USED'
        WHEN idx_scan < 1000 THEN 'OCCASIONALLY USED'
        ELSE 'FREQUENTLY USED'
    END as usage_category
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

-- View for table bloat estimation
CREATE OR REPLACE VIEW table_bloat_estimate AS
SELECT
    schemaname,
    tablename,
    pg_size_pretty(pg_relation_size(schemaname||'.'||tablename)) AS table_size,
    n_live_tup AS live_tuples,
    n_dead_tup AS dead_tuples,
    CASE
        WHEN n_live_tup > 0
        THEN round(100.0 * n_dead_tup / n_live_tup, 2)
        ELSE 0
    END AS bloat_percentage
FROM pg_stat_user_tables
WHERE n_live_tup > 0
ORDER BY n_dead_tup DESC;

-- Grant necessary permissions for application user
-- (Replace 'app_user' with your actual application database user)
/*
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO app_user;
*/
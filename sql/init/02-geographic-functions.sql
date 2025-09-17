-- Geographic helper functions and indexes for PostGIS

-- Function to find businesses within a radius
CREATE OR REPLACE FUNCTION find_businesses_within_radius(
    center_lat FLOAT,
    center_lng FLOAT,
    radius_miles FLOAT
)
RETURNS TABLE (
    business_id UUID,
    distance_miles FLOAT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        b.id as business_id,
        ST_Distance(
            ST_MakePoint(center_lng, center_lat)::geography,
            ST_MakePoint(b.longitude, b.latitude)::geography
        ) * 0.000621371 as distance_miles  -- Convert meters to miles
    FROM businesses b
    WHERE ST_DWithin(
        ST_MakePoint(b.longitude, b.latitude)::geography,
        ST_MakePoint(center_lng, center_lat)::geography,
        radius_miles * 1609.34  -- Convert miles to meters
    )
    ORDER BY distance_miles;
END;
$$ LANGUAGE plpgsql;

-- Function to find businesses serving a specific zip code
CREATE OR REPLACE FUNCTION find_businesses_by_service_area(
    target_zip_code VARCHAR(10)
)
RETURNS TABLE (
    business_id UUID,
    business_name VARCHAR(200),
    is_primary_area BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        b.id as business_id,
        b.name as business_name,
        sa.is_primary as is_primary_area
    FROM businesses b
    INNER JOIN service_areas sa ON b.id = sa.business_id
    WHERE sa.zip_code = target_zip_code
    ORDER BY sa.is_primary DESC, b.average_rating DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate service area coverage
CREATE OR REPLACE FUNCTION calculate_business_coverage(
    business_uuid UUID
)
RETURNS TABLE (
    total_zip_codes INT,
    total_cities INT,
    total_population BIGINT,
    coverage_area_sq_miles FLOAT
) AS $$
DECLARE
    biz_lat FLOAT;
    biz_lng FLOAT;
    biz_radius FLOAT;
BEGIN
    -- Get business location and service radius
    SELECT latitude, longitude, service_radius_miles
    INTO biz_lat, biz_lng, biz_radius
    FROM businesses
    WHERE id = business_uuid;

    RETURN QUERY
    SELECT
        COUNT(DISTINCT z.code)::INT as total_zip_codes,
        COUNT(DISTINCT c.id)::INT as total_cities,
        COALESCE(SUM(DISTINCT c.population), 0)::BIGINT as total_population,
        (PI() * POWER(biz_radius, 2))::FLOAT as coverage_area_sq_miles  -- Circle area
    FROM zip_codes z
    LEFT JOIN cities c ON z.city_id = c.id
    WHERE ST_DWithin(
        ST_MakePoint(z.center_lng, z.center_lat)::geography,
        ST_MakePoint(biz_lng, biz_lat)::geography,
        biz_radius * 1609.34  -- Convert miles to meters
    );
END;
$$ LANGUAGE plpgsql;

-- Function to find nearby competitors
CREATE OR REPLACE FUNCTION find_competitor_businesses(
    business_uuid UUID,
    search_radius_miles FLOAT DEFAULT 10
)
RETURNS TABLE (
    competitor_id UUID,
    competitor_name VARCHAR(200),
    distance_miles FLOAT,
    average_rating FLOAT,
    total_reviews INT,
    shared_services BIGINT
) AS $$
DECLARE
    biz_lat FLOAT;
    biz_lng FLOAT;
BEGIN
    -- Get business location
    SELECT latitude, longitude
    INTO biz_lat, biz_lng
    FROM businesses
    WHERE id = business_uuid;

    RETURN QUERY
    WITH business_services AS (
        SELECT category_id
        FROM business_services
        WHERE business_id = business_uuid
    )
    SELECT
        b.id as competitor_id,
        b.name as competitor_name,
        ST_Distance(
            ST_MakePoint(biz_lng, biz_lat)::geography,
            ST_MakePoint(b.longitude, b.latitude)::geography
        ) * 0.000621371 as distance_miles,
        b.average_rating,
        b.total_reviews,
        COUNT(bs.category_id) as shared_services
    FROM businesses b
    INNER JOIN business_services bs ON b.id = bs.business_id
    WHERE b.id != business_uuid
    AND bs.category_id IN (SELECT category_id FROM business_services)
    AND ST_DWithin(
        ST_MakePoint(b.longitude, b.latitude)::geography,
        ST_MakePoint(biz_lng, biz_lat)::geography,
        search_radius_miles * 1609.34
    )
    GROUP BY b.id, b.name, b.longitude, b.latitude, b.average_rating, b.total_reviews
    ORDER BY distance_miles, b.average_rating DESC;
END;
$$ LANGUAGE plpgsql;

-- Materialized view for city statistics (for fast queries)
CREATE MATERIALIZED VIEW city_business_stats AS
SELECT
    c.id as city_id,
    c.name as city_name,
    c.slug as city_slug,
    s.code as state_code,
    COUNT(DISTINCT b.id) as total_businesses,
    COUNT(DISTINCT bs.category_id) as service_categories,
    AVG(b.average_rating) as avg_city_rating,
    SUM(b.total_reviews) as total_city_reviews,
    COUNT(DISTINCT CASE WHEN b.verification_level = 'CERTIFIED' THEN b.id END) as certified_businesses,
    COUNT(DISTINCT CASE WHEN b.offers_emergency THEN b.id END) as emergency_services
FROM cities c
JOIN states s ON c.state_id = s.id
LEFT JOIN businesses b ON c.id = b.city_id AND b.status = 'VERIFIED'
LEFT JOIN business_services bs ON b.id = bs.business_id
GROUP BY c.id, c.name, c.slug, s.code;

-- Create index on materialized view
CREATE INDEX idx_city_business_stats_slug ON city_business_stats(city_slug);
CREATE INDEX idx_city_business_stats_state ON city_business_stats(state_code);

-- Function to refresh materialized views (call periodically)
CREATE OR REPLACE FUNCTION refresh_all_materialized_views()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY city_business_stats;
    -- Add more materialized views here as needed
END;
$$ LANGUAGE plpgsql;
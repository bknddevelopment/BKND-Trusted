-- Enable required PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";      -- For UUID generation
CREATE EXTENSION IF NOT EXISTS "postgis";        -- For geographic data
CREATE EXTENSION IF NOT EXISTS "pg_trgm";        -- For text similarity searches
CREATE EXTENSION IF NOT EXISTS "btree_gist";     -- For exclusion constraints
CREATE EXTENSION IF NOT EXISTS "btree_gin";      -- For composite indexes

-- Create custom types
CREATE TYPE business_status AS ENUM (
    'pending',
    'verified',
    'suspended',
    'archived'
);

CREATE TYPE verification_level AS ENUM (
    'basic',
    'standard',
    'premium',
    'certified'
);

CREATE TYPE price_range AS ENUM (
    'budget',      -- $
    'moderate',    -- $$
    'premium',     -- $$$
    'luxury'       -- $$$$
);

CREATE TYPE day_of_week AS ENUM (
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
);
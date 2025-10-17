# BKND Trusted - Master Information Architecture Blueprint

**Version:** 2.0
**Created:** October 7, 2025
**Purpose:** Complete system architecture showing EXACTLY where every piece of information lives and how it flows through the platform

---

## 🎯 Core Principle: Single Source of Truth

**Every piece of business data exists in ONE place and ONE place only.**
All pages, cards, and views query this single source.

---

## 📦 Data Model: The Single Source of Truth

### **Database Schema (Future - PostgreSQL + PostGIS)**

```sql
-- ============================================
-- CORE TABLE: businesses
-- This is THE single source of truth
-- ============================================
CREATE TABLE businesses (
  -- Identity
  id                    UUID PRIMARY KEY,
  slug                  VARCHAR(255) UNIQUE NOT NULL,
  name                  VARCHAR(255) NOT NULL,
  owner                 VARCHAR(255),

  -- Classification
  primary_city_id       UUID REFERENCES cities(id) NOT NULL,
  business_type         VARCHAR(100), -- LLC, Sole Proprietor, etc.

  -- Contact Information (Single Source)
  phone                 VARCHAR(20),
  email                 VARCHAR(255),
  website               TEXT,

  -- Physical Location (Primary Address)
  address_street        VARCHAR(255) NOT NULL,
  address_unit          VARCHAR(50),
  address_city          VARCHAR(100) NOT NULL,
  address_state         VARCHAR(2) NOT NULL,
  address_zip           VARCHAR(10) NOT NULL,
  location_point        GEOGRAPHY(POINT, 4326), -- PostGIS: exact coordinates

  -- Service Area (Geographic Coverage)
  service_area_polygon  GEOGRAPHY(POLYGON, 4326), -- PostGIS: area they serve
  service_area_radius   INTEGER, -- miles from primary location

  -- Aggregated Ratings (Calculated/Cached)
  rating_average        DECIMAL(3,2), -- 0.00 to 5.00
  rating_google         DECIMAL(3,2),
  rating_yelp           DECIMAL(3,2),
  rating_thumbtack      DECIMAL(3,2),
  rating_facebook       DECIMAL(3,2),
  review_count_total    INTEGER DEFAULT 0,
  review_count_google   INTEGER DEFAULT 0,
  review_count_yelp     INTEGER DEFAULT 0,

  -- Business Details
  description           TEXT,
  years_in_business     INTEGER,
  employee_count        VARCHAR(50), -- "1-5", "10-20", "50+", etc.
  business_hours        JSONB, -- { "monday": "8:00 AM - 8:00 PM", ... }

  -- Credentials
  licenses              JSONB, -- ["License #12345", "State Certified"]
  certifications        JSONB, -- ["EPA Certified", "BBB Accredited"]

  -- Social Media (Single Source)
  social_facebook       TEXT,
  social_instagram      TEXT,
  social_twitter        TEXT,
  social_linkedin       TEXT,

  -- External Links
  google_business_url   TEXT,
  bbb_rating            VARCHAR(5), -- "A+", "A", "B", etc.
  bbb_accredited        BOOLEAN DEFAULT FALSE,
  bbb_url               TEXT,

  -- Payment & Operations
  payment_methods       JSONB, -- ["Cash", "Credit Card", "Check"]

  -- Media
  logo_url              TEXT,
  cover_photo_url       TEXT,

  -- Status
  verified              BOOLEAN DEFAULT FALSE,
  background_checked    BOOLEAN DEFAULT FALSE,
  featured              BOOLEAN DEFAULT FALSE,
  active                BOOLEAN DEFAULT TRUE,

  -- Metadata
  created_at            TIMESTAMP DEFAULT NOW(),
  updated_at            TIMESTAMP DEFAULT NOW(),
  last_verified_at      TIMESTAMP
);

-- ============================================
-- JUNCTION TABLE: business_services
-- Links businesses to multiple services
-- ============================================
CREATE TABLE business_services (
  id                    UUID PRIMARY KEY,
  business_id           UUID REFERENCES businesses(id) ON DELETE CASCADE,
  service_category_id   UUID REFERENCES service_categories(id),

  -- Service-Specific Info
  starting_price        DECIMAL(10,2),
  service_call_fee      DECIMAL(10,2),
  average_job_cost      VARCHAR(100), -- "$200-$500"
  pricing_notes         TEXT,
  specialties           JSONB, -- ["Emergency 24/7", "Hydro Jetting"]

  -- Meta
  created_at            TIMESTAMP DEFAULT NOW(),

  UNIQUE(business_id, service_category_id)
);

-- ============================================
-- TABLE: service_categories
-- Master list of all service types
-- ============================================
CREATE TABLE service_categories (
  id                    UUID PRIMARY KEY,
  slug                  VARCHAR(255) UNIQUE NOT NULL,
  name                  VARCHAR(255) NOT NULL,
  description           TEXT,
  icon_name             VARCHAR(100),
  parent_category_id    UUID REFERENCES service_categories(id),
  popular               BOOLEAN DEFAULT FALSE,
  created_at            TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- TABLE: reviews
-- Customer reviews (another single source)
-- ============================================
CREATE TABLE reviews (
  id                    UUID PRIMARY KEY,
  business_id           UUID REFERENCES businesses(id) ON DELETE CASCADE,

  -- Review Content
  reviewer_name         VARCHAR(255) NOT NULL,
  reviewer_avatar       TEXT,
  rating                INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text           TEXT NOT NULL,
  review_date           DATE NOT NULL,

  -- Source
  platform              VARCHAR(50), -- "Google", "Yelp", "Thumbtack", "BKND"
  platform_url          TEXT,

  -- Verification
  verified              BOOLEAN DEFAULT FALSE,
  helpful_count         INTEGER DEFAULT 0,

  -- Meta
  created_at            TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- GEOGRAPHIC HIERARCHY TABLES
-- State → County → City
-- ============================================
CREATE TABLE states (
  id                    UUID PRIMARY KEY,
  slug                  VARCHAR(255) UNIQUE NOT NULL,
  name                  VARCHAR(255) NOT NULL,
  code                  VARCHAR(2) UNIQUE NOT NULL, -- "NJ", "TX"
  boundary              GEOGRAPHY(MULTIPOLYGON, 4326) -- PostGIS
);

CREATE TABLE counties (
  id                    UUID PRIMARY KEY,
  slug                  VARCHAR(255) NOT NULL,
  name                  VARCHAR(255) NOT NULL,
  state_id              UUID REFERENCES states(id),
  boundary              GEOGRAPHY(MULTIPOLYGON, 4326),
  UNIQUE(slug, state_id)
);

CREATE TABLE cities (
  id                    UUID PRIMARY KEY,
  slug                  VARCHAR(255) NOT NULL,
  name                  VARCHAR(255) NOT NULL,
  county_id             UUID REFERENCES counties(id),
  state_id              UUID REFERENCES states(id),
  zip_codes             VARCHAR(10)[], -- ["07201", "07202"]
  boundary              GEOGRAPHY(MULTIPOLYGON, 4326),
  population            INTEGER,
  UNIQUE(slug, county_id)
);

-- ============================================
-- TABLE: business_photos
-- Photos for businesses
-- ============================================
CREATE TABLE business_photos (
  id                    UUID PRIMARY KEY,
  business_id           UUID REFERENCES businesses(id) ON DELETE CASCADE,
  url                   TEXT NOT NULL,
  caption               TEXT,
  display_order         INTEGER DEFAULT 0,
  created_at            TIMESTAMP DEFAULT NOW()
);
```

---

## 🔄 Data Flow Architecture

### **How Information Flows From Database → User**

```
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE (Single Source of Truth)            │
│  ┌──────────────┐  ┌─────────────────┐  ┌──────────────┐      │
│  │  businesses  │  │ business_services│  │   reviews    │      │
│  │  (CORE DATA) │  │  (JUNCTION)     │  │  (FEEDBACK)  │      │
│  └──────┬───────┘  └────────┬────────┘  └──────┬───────┘      │
│         │                   │                   │               │
└─────────┼───────────────────┼───────────────────┼───────────────┘
          │                   │                   │
          ▼                   ▼                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                         DATA ACCESS LAYER                        │
│                   (Prisma ORM - lib/db.ts)                      │
│                                                                  │
│  Functions that query the single source:                        │
│  • getBusinessById(id)                                          │
│  • getBusinessesByService(serviceId, cityId)                    │
│  • getBusinessesInServiceArea(lat, lng, serviceId)              │
│  • getBusinessReviews(businessId)                               │
└─────────────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────────┐
│                        PAGE COMPONENTS                           │
│                   (Next.js 14 App Router)                       │
│                                                                  │
│  ┌─────────────────┐  ┌──────────────────┐  ┌───────────────┐ │
│  │ City+Service    │  │ Business Profile │  │ Search Results│ │
│  │ Page            │  │ Page             │  │ Page          │ │
│  │ (list view)     │  │ (detail view)    │  │ (dynamic)     │ │
│  └────────┬────────┘  └────────┬─────────┘  └───────┬───────┘ │
│           │                    │                     │          │
└───────────┼────────────────────┼─────────────────────┼──────────┘
            │                    │                     │
            ▼                    ▼                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    REUSABLE COMPONENTS                           │
│                                                                  │
│  BusinessCard.tsx  (used everywhere)                            │
│  • Receives: Business object from database                      │
│  • Displays: name, rating, address, badges, CTA                 │
│  • SAME data regardless of which page it appears on             │
│                                                                  │
│  ReviewCard.tsx  (used on profile pages)                        │
│  • Receives: Review object from database                        │
│  • Displays: reviewer, rating, text, platform                   │
│                                                                  │
│  TrustBadge.tsx  (used everywhere)                              │
│  • Receives: business.verified, business.background_checked     │
│  • Displays: verification badges                                │
└─────────────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────┐
│                         USER'S BROWSER                           │
│  Sees consistent information no matter which path they took     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛣️ URL Routing Architecture: Multiple Paths, Same Data

### **Problem Statement**
A user can reach the same business through 4 different navigation paths:

1. **Search → Business**
   `/search?service=plumbing&zip=07201` → `/business/get-snaked`

2. **Location → Service → Business**
   `/new-jersey/union/elizabeth/` → `/new-jersey/union/elizabeth/plumbing` → `/business/get-snaked`

3. **Service → Location → Business**
   `/services/plumbing` → (enter Elizabeth) → `/new-jersey/union/elizabeth/plumbing` → `/business/get-snaked`

4. **Direct SEO Entry**
   Google → `/new-jersey/union/elizabeth/plumbing` → `/business/get-snaked`

### **Solution: All Paths Query the Same Database Record**

```typescript
// ============================================
// FILE: app/business/[slug]/page.tsx
// BUSINESS PROFILE PAGE (Canonical URL)
// ============================================

export default async function BusinessProfilePage({
  params
}: {
  params: { slug: string }
}) {
  // ✅ Query THE single source of truth
  const business = await prisma.business.findUnique({
    where: { slug: params.slug },
    include: {
      services: {
        include: { category: true }
      },
      reviews: {
        orderBy: { review_date: 'desc' },
        take: 10
      },
      photos: {
        orderBy: { display_order: 'asc' }
      },
      primaryCity: {
        include: {
          county: true,
          state: true
        }
      }
    }
  });

  if (!business) return notFound();

  // ✅ This is THE authoritative data for this business
  // ALL other pages that show this business will query the same record

  return (
    <main>
      <BusinessHeader business={business} />
      <BusinessContact business={business} />
      <BusinessAbout business={business} />
      <BusinessServices business={business.services} />
      <BusinessReviews reviews={business.reviews} />
      <BusinessCredentials business={business} />
    </main>
  );
}
```

```typescript
// ============================================
// FILE: app/[state]/[county]/[city]/[service]/page.tsx
// CITY + SERVICE PAGE (List of Businesses)
// ============================================

export default async function CityServicePage({
  params
}: {
  params: { state: string; county: string; city: string; service: string }
}) {
  // ✅ Query THE SAME businesses table, filtered by location + service
  const businesses = await prisma.business.findMany({
    where: {
      // Geographic filter
      primaryCity: {
        slug: params.city,
        county: { slug: params.county },
        state: { slug: params.state }
      },
      // Service filter
      services: {
        some: {
          category: { slug: params.service }
        }
      },
      active: true
    },
    include: {
      services: {
        where: { category: { slug: params.service } },
        include: { category: true }
      },
      reviews: {
        orderBy: { review_date: 'desc' },
        take: 1 // Featured review
      }
    },
    orderBy: {
      rating_average: 'desc' // Top rated first
    },
    take: 5 // Top 5 businesses
  });

  // ✅ SAME data as business profile pages
  // If user clicks "View Profile", they see identical information

  return (
    <main>
      <CityServiceHero city={city} service={service} />
      <div className="business-list">
        {businesses.map((business, index) => (
          <BusinessCard
            key={business.id}
            business={business} // ✅ SAME data object
            ranking={index + 1}
            viewType="list"
          />
        ))}
      </div>
    </main>
  );
}
```

```typescript
// ============================================
// FILE: app/search/page.tsx
// SEARCH RESULTS PAGE (Dynamic Query)
// ============================================

export default async function SearchPage({
  searchParams
}: {
  searchParams: { service?: string; location?: string; zip?: string }
}) {
  // ✅ Query THE SAME businesses table with dynamic filters
  const businesses = await prisma.business.findMany({
    where: {
      // Service filter (if provided)
      ...(searchParams.service && {
        services: {
          some: {
            category: { slug: searchParams.service }
          }
        }
      }),

      // Location filter (PostGIS query)
      ...(searchParams.zip && {
        OR: [
          // Business is IN the searched city
          { primaryCity: { zip_codes: { has: searchParams.zip } } },
          // OR business SERVES the searched area (PostGIS radius)
          {
            service_area_polygon: {
              ST_Intersects: await getPointFromZip(searchParams.zip)
            }
          }
        ]
      }),

      active: true
    },
    include: {
      services: { include: { category: true } },
      reviews: { orderBy: { review_date: 'desc' }, take: 1 }
    },
    orderBy: { rating_average: 'desc' }
  });

  // ✅ SAME data as other pages

  return (
    <main>
      <SearchFilters />
      <div className="search-results">
        {businesses.map(business => (
          <BusinessCard
            key={business.id}
            business={business} // ✅ SAME data object
            viewType="search"
          />
        ))}
      </div>
    </main>
  );
}
```

---

## 🧩 Component Reusability Matrix

### **Which Components Are Used Where**

| Component | Homepage | Services Page | City+Service Page | Business Profile | Search Results |
|-----------|----------|---------------|-------------------|------------------|----------------|
| **Header** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Footer** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **SearchBar** | ✅ | ✅ | ❌ | ❌ | ✅ |
| **BusinessCard** | ✅ (featured) | ❌ | ✅ (list) | ❌ | ✅ (results) |
| **BusinessHeader** | ❌ | ❌ | ❌ | ✅ | ❌ |
| **BusinessContact** | ❌ | ❌ | ❌ | ✅ | ❌ |
| **ReviewCard** | ❌ | ❌ | ✅ (1 featured) | ✅ (all) | ❌ |
| **TrustBadge** | ✅ | ❌ | ✅ | ✅ | ✅ |
| **Breadcrumb** | ❌ | ✅ | ✅ | ✅ | ❌ |
| **ServiceGrid** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **LocationGrid** | ✅ | ❌ | ❌ | ❌ | ❌ |

### **BusinessCard Component: The Universal Display**

```typescript
// ============================================
// FILE: components/BusinessCard.tsx
// Used EVERYWHERE to display business info
// ============================================

interface BusinessCardProps {
  business: Business; // ✅ ALWAYS the same type from database
  ranking?: number;   // Optional: show "#1", "#2", etc.
  viewType: 'list' | 'search' | 'featured' | 'grid';
  showFullAddress?: boolean;
  showReview?: boolean;
}

export function BusinessCard({
  business,
  ranking,
  viewType,
  showFullAddress = true,
  showReview = false
}: BusinessCardProps) {
  // ✅ ALL data comes from the SAME business object
  // No matter which page this card appears on

  return (
    <Card>
      {ranking && <RankingBadge number={ranking} />}

      <div className="business-header">
        <h3>{business.name}</h3>
        <div className="rating">
          <StarRating value={business.rating_average} />
          <span>{business.review_count_total} reviews</span>
        </div>
      </div>

      <div className="badges">
        {business.verified && <TrustBadge type="verified" />}
        {business.background_checked && <TrustBadge type="background-checked" />}
        {business.featured && <TrustBadge type="top-pro" />}
      </div>

      {showFullAddress && (
        <address>
          {business.address_street}, {business.address_city}, {business.address_state} {business.address_zip}
        </address>
      )}

      <div className="services">
        {business.services.map(service => (
          <Badge key={service.id}>{service.category.name}</Badge>
        ))}
      </div>

      {showReview && business.reviews[0] && (
        <ReviewCard review={business.reviews[0]} compact />
      )}

      <div className="actions">
        <Button href={`/business/${business.slug}`}>View Full Profile</Button>
        <Button href={`tel:${business.phone}`} variant="secondary">
          Call Now: {business.phone}
        </Button>
      </div>
    </Card>
  );
}
```

---

## 🗺️ Navigation Consistency: How Users Never Get Lost

### **Breadcrumb Navigation (Every Page)**

```typescript
// ============================================
// BREADCRUMB LOGIC
// Shows user's path through the site
// ============================================

// EXAMPLE 1: Business Profile Page
// URL: /business/get-snaked
// Breadcrumb: Home > New Jersey > Union County > Elizabeth > Plumbing > Get Snaked

const businessBreadcrumb = [
  { label: 'Home', href: '/' },
  { label: business.primaryCity.state.name, href: `/${business.primaryCity.state.slug}` },
  { label: business.primaryCity.county.name, href: `/${business.primaryCity.state.slug}/${business.primaryCity.county.slug}` },
  { label: business.primaryCity.name, href: `/${business.primaryCity.state.slug}/${business.primaryCity.county.slug}/${business.primaryCity.slug}` },
  { label: business.services[0].category.name, href: `/${business.primaryCity.state.slug}/${business.primaryCity.county.slug}/${business.primaryCity.slug}/${business.services[0].category.slug}` },
  { label: business.name, href: `/business/${business.slug}`, current: true }
];

// EXAMPLE 2: City+Service Page
// URL: /new-jersey/union/elizabeth/plumbing
// Breadcrumb: Home > New Jersey > Union County > Elizabeth > Plumbing

const cityServiceBreadcrumb = [
  { label: 'Home', href: '/' },
  { label: state.name, href: `/${state.slug}` },
  { label: county.name, href: `/${state.slug}/${county.slug}` },
  { label: city.name, href: `/${state.slug}/${county.slug}/${city.slug}` },
  { label: service.name, href: `/${state.slug}/${county.slug}/${city.slug}/${service.slug}`, current: true }
];
```

### **Back Navigation Links**

```typescript
// ============================================
// CONTEXTUAL BACK LINKS
// Help users navigate back to previous context
// ============================================

// On Business Profile Page:
<BackLink href={`/${state.slug}/${county.slug}/${city.slug}/${service.slug}`}>
  ← Back to {service.name} in {city.name}
</BackLink>

// On City+Service Page:
<BackLink href={`/${state.slug}/${county.slug}/${city.slug}`}>
  ← Back to All Services in {city.name}
</BackLink>
```

---

## 🔍 Search Logic: How Multi-Location Businesses Work

### **Scenario: Business Serves Multiple Cities**

**Example Business:**
- **Name:** Get Snaked
- **Primary Location:** 162 Elmora Ave, Elizabeth, NJ 07202
- **Service Area:** 25-mile radius (covers Elizabeth, Linden, Rahway, Union, Newark)

**Question:** Where does this business appear?

**Answer:**

```typescript
// ============================================
// SEARCH QUERY LOGIC
// Finds businesses in OR serving a location
// ============================================

async function findBusinessesForCity(cityId: string, serviceSlug: string) {
  const city = await prisma.city.findUnique({
    where: { id: cityId },
    include: { boundary: true }
  });

  return await prisma.business.findMany({
    where: {
      // Option 1: Business is BASED in this city
      OR: [
        { primary_city_id: cityId },

        // Option 2: Business SERVES this city (PostGIS query)
        {
          service_area_polygon: {
            ST_Intersects: city.boundary // PostGIS: does service area overlap city?
          }
        }
      ],

      // Service filter
      services: {
        some: {
          category: { slug: serviceSlug }
        }
      },

      active: true
    }
  });
}
```

**Result:**

| City Page | Does "Get Snaked" Appear? | Badge Shown |
|-----------|---------------------------|-------------|
| `/new-jersey/union/elizabeth/plumbing` | ✅ YES | Top Pro (primary location) |
| `/new-jersey/union/linden/plumbing` | ✅ YES | Serves Linden |
| `/new-jersey/union/rahway/plumbing` | ✅ YES | Serves Rahway |
| `/new-jersey/essex/newark/plumbing` | ✅ YES | Serves Newark |
| `/new-jersey/bergen/hackensack/plumbing` | ❌ NO | Outside service area |

**Business Profile URL Never Changes:**
- Always: `/business/get-snaked`
- Never: `/business/get-snaked-linden` (no duplicate profiles)

---

## 📍 Where Information Lives: Complete Reference

### **Business Name**
- **Source:** `businesses.name` (database)
- **Appears on:**
  - Business profile page (H1)
  - City+service pages (business cards)
  - Search results (business cards)
  - Homepage (featured businesses)
  - Breadcrumbs
- **Component:** `<BusinessCard>`, `<BusinessHeader>`

### **Business Rating**
- **Source:** `businesses.rating_average` (calculated from all reviews)
- **Calculation:** Average of all reviews in `reviews` table
- **Updated:** When new review is added (trigger function)
- **Appears on:**
  - Business profile page
  - Business cards (all pages)
  - Search results sorting
- **Component:** `<StarRating>`, `<BusinessCard>`

### **Business Address**
- **Source:** `businesses.address_*` fields (single record)
- **Appears on:**
  - Business profile page (full address)
  - City+service pages (full address on cards)
  - Search results (city, state only)
  - Google Maps integration
- **Component:** `<BusinessCard>`, `<BusinessContact>`

### **Business Phone Number**
- **Source:** `businesses.phone` (database)
- **Appears on:**
  - Business profile page (CTA button)
  - Business cards ("Call Now" button)
  - Contact sidebar
- **Component:** `<BusinessContact>`, `<BusinessCard>`

### **Business Services**
- **Source:** `business_services` junction table → `service_categories`
- **Appears on:**
  - Business profile page (services grid)
  - Business cards (badge list)
  - City+service pages (displayed when matching service)
- **Component:** `<ServiceBadge>`, `<BusinessCard>`

### **Customer Reviews**
- **Source:** `reviews` table (foreign key to `businesses.id`)
- **Appears on:**
  - Business profile page (all reviews, paginated)
  - City+service pages (1 featured review per card)
  - Rating aggregation (calculates `rating_average`)
- **Component:** `<ReviewCard>`, `<ReviewList>`

### **Trust Badges**
- **Source:** Calculated from multiple fields:
  - `businesses.verified` → "Verified Pro" badge
  - `businesses.background_checked` → "Background Checked" badge
  - `businesses.featured` → "Top Pro" badge
  - `businesses.years_in_business >= 10` → "10+ Years Experience"
  - `business_services.specialties` contains "24/7" → "24/7 Emergency"
- **Appears on:**
  - Business profile page (header)
  - Business cards (all pages)
  - Search results
- **Component:** `<TrustBadge>`

### **Pricing Information**
- **Source:** `business_services.starting_price`, `business_services.service_call_fee`
- **Appears on:**
  - Business profile page (service-specific pricing)
  - City+service pages (starting price on cards)
  - Search results (price comparison)
- **Component:** `<PricingCard>`, `<BusinessCard>`

### **Photos**
- **Source:** `business_photos` table (foreign key to `businesses.id`)
- **Appears on:**
  - Business profile page (photo gallery)
  - Business cards (primary photo)
  - Search results (thumbnail)
- **Component:** `<PhotoGallery>`, `<BusinessCard>`

### **Social Media Links**
- **Source:** `businesses.social_*` fields
- **Appears on:**
  - Business profile page (footer section)
  - Contact sidebar
- **Component:** `<SocialLinks>`

---

## 🚀 Implementation Checklist: Adding a New Business

### **Step 1: Add Business to Database**
```typescript
const newBusiness = await prisma.business.create({
  data: {
    slug: 'pro-plumbing-newark',
    name: 'Pro Plumbing Solutions',
    phone: '(973) 555-1234',
    email: 'contact@proplumbing.com',
    website: 'https://proplumbing.com',
    address_street: '123 Main Street',
    address_city: 'Newark',
    address_state: 'NJ',
    address_zip: '07102',
    primaryCity: { connect: { slug: 'newark' } },
    verified: true,
    background_checked: true,
    // ... other fields
  }
});
```

### **Step 2: Assign Services**
```typescript
await prisma.businessService.create({
  data: {
    business_id: newBusiness.id,
    service_category_id: plumbingCategory.id,
    starting_price: 150.00,
    service_call_fee: 95.00,
    specialties: ['Emergency 24/7', 'Drain Cleaning', 'Water Heaters']
  }
});
```

### **Step 3: That's It! Business Now Appears Automatically On:**
✅ Business profile page: `/business/pro-plumbing-newark`
✅ City page: `/new-jersey/essex/newark/plumbing`
✅ County page (if we build it): `/new-jersey/essex/plumbing`
✅ State page (featured businesses): `/new-jersey`
✅ Search results: `/search?service=plumbing&location=newark`
✅ Service page (nearby businesses): `/services/plumbing` (with location filter)

**No duplicate data. No manual page creation. Just works.**

---

## 🔐 Data Integrity Rules

### **Rule 1: Never Duplicate Business Data**
❌ **WRONG:**
```typescript
// BAD: Creating separate records for each city
await prisma.business.create({ name: 'Get Snaked - Elizabeth' });
await prisma.business.create({ name: 'Get Snaked - Linden' });
```

✅ **CORRECT:**
```typescript
// GOOD: One record with service area
await prisma.business.create({
  name: 'Get Snaked',
  primary_city: 'elizabeth',
  service_area_radius: 25 // covers multiple cities
});
```

### **Rule 2: Rating is Always Calculated**
❌ **WRONG:**
```typescript
// BAD: Manually updating rating
await prisma.business.update({
  where: { id: businessId },
  data: { rating_average: 4.9 }
});
```

✅ **CORRECT:**
```typescript
// GOOD: Rating auto-calculated from reviews table
// Use database trigger or application logic
const reviews = await prisma.review.findMany({
  where: { business_id: businessId }
});
const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
await prisma.business.update({
  where: { id: businessId },
  data: { rating_average: avgRating }
});
```

### **Rule 3: Business Profile URL is Canonical**
✅ **CORRECT:**
```typescript
// Business profile is the canonical URL for all business data
// All links point here
<a href={`/business/${business.slug}`}>View Full Profile</a>

// NOT:
// /new-jersey/union/elizabeth/plumbing/get-snaked ❌
// /business/get-snaked/elizabeth ❌
// /get-snaked ❌
```

### **Rule 4: Service Area Determines Visibility**
```typescript
// Business appears in search/listings for ANY city within service area
// But profile URL never changes
const businessUrl = `/business/${business.slug}`; // ✅ Always the same

// Appears on multiple city pages via query:
// /new-jersey/union/elizabeth/plumbing (primary city)
// /new-jersey/union/linden/plumbing (within service area)
// /new-jersey/union/rahway/plumbing (within service area)
```

---

## 📊 Performance Optimization Strategy

### **Caching Strategy**

```typescript
// ============================================
// CACHE LAYERS FOR 50,000+ PAGES
// ============================================

// Layer 1: Database Query Caching (Redis)
async function getBusinessById(id: string) {
  const cacheKey = `business:${id}`;

  // Check Redis cache first
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  // Query database if not cached
  const business = await prisma.business.findUnique({ where: { id } });

  // Cache for 1 hour
  await redis.set(cacheKey, JSON.stringify(business), 'EX', 3600);

  return business;
}

// Layer 2: Next.js Static Generation
// Pre-render top 1000 pages at build time
export async function generateStaticParams() {
  const topCities = await prisma.city.findMany({
    where: { population: { gte: 50000 } },
    take: 100
  });

  const topServices = await prisma.serviceCategory.findMany({
    where: { popular: true },
    take: 10
  });

  // Generate 1000 static pages (100 cities × 10 services)
  return topCities.flatMap(city =>
    topServices.map(service => ({
      state: city.state.slug,
      county: city.county.slug,
      city: city.slug,
      service: service.slug
    }))
  );
}

// Layer 3: ISR (Incremental Static Regeneration)
// Revalidate pages every 24 hours
export const revalidate = 86400; // 24 hours in seconds
```

---

## ✅ Summary: The Golden Rules

1. **One Business Record = One Source of Truth**
   - All data lives in `businesses` table
   - All pages query this single source
   - No duplicates, ever

2. **URL Structure is Consistent**
   - Business profile: `/business/{slug}` (canonical)
   - City+Service: `/{state}/{county}/{city}/{service}` (listings)
   - Search: `/search?service={}&location={}` (dynamic)

3. **Components Receive Same Data Everywhere**
   - `<BusinessCard>` always gets same `Business` object
   - No matter which page it appears on
   - Data comes from database query

4. **Service Area = Visibility**
   - Businesses appear in multiple cities based on service area
   - But profile URL never changes
   - PostGIS handles geographic queries

5. **Breadcrumbs Reflect User's Path**
   - Always show: Home > State > County > City > Service > Business
   - Helps users navigate back to any level

6. **Reviews Calculate Ratings**
   - `rating_average` is computed from `reviews` table
   - Updated automatically when reviews change
   - Never manually set

7. **Add Business Once, Appears Everywhere**
   - Database insert → automatic visibility
   - No need to update multiple pages
   - Scaling to 50,000+ pages is just more database rows

---

**This blueprint eliminates ALL ambiguity about where information lives and how it flows through the system.**

---

*Master Blueprint Version: 2.0 | October 7, 2025*

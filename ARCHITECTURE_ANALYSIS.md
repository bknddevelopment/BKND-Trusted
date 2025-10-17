# Information Architecture Analysis: Thumbtack, Angi, and Yelp

**Analysis Date:** January 2025
**Purpose:** Understand URL structure, navigation patterns, and data architecture for BKND Trusted

---

## Executive Summary

This analysis examines how three major service directory platforms (Thumbtack, Angi, Yelp) structure their information architecture, particularly focusing on:
- URL patterns for services, locations, and businesses
- Navigation paths from search to business profile
- Data consistency across multiple page types
- Page template hierarchy

---

## 1. THUMBTACK URL STRUCTURE

### A. Business Profile Pages
**Pattern:** `/{state}/{city}/{service}/{business-name}/service/{service_id}`

**Example:**
```
/nj/jersey-city/house-cleaning/maid-2-service-cleaning-done-right/service/111259078496625825
```

**URL Breakdown:**
- State abbreviation: `nj`
- City (slug): `jersey-city`
- Service category (slug): `house-cleaning`
- Business name (slug): `maid-2-service-cleaning-done-right`
- Service ID: `111259078496625825` (unique identifier)

**Key Insight:** Business profiles are **location + service scoped**. The same business offering multiple services would have separate URLs for each service.

### B. Location Pages
**Pattern:** `/{state}/{city}/`

**Examples:**
- State: `/tx/` (Texas)
- City: `/tx/houston/` (Houston, Texas)

**Content:** Lists all popular services available in that location

### C. Service Category Pages
**Pattern:** `/k/{service-slug}/near-me`

**Examples:**
- `/k/house-cleaning/near-me`
- `/k/plumbing/near-me`

**Content:** Generic service information with location-based search

### D. Location + Service Pages
**Pattern:** `/{state}/{city}/{service-slug}`

**Examples:**
- `/tx/houston/house-cleaning` (Houston house cleaning)
- `/nj/jersey-city/house-cleaning` (Jersey City house cleaning)

**Content:** The "money pages" - SEO-optimized listings for a specific service in a specific city

### E. Search Results Pages
**Pattern:** `/instant-results/?keyword_pk={keyword_id}&project_pk={project_id}&zip_code={zip}`

**Example:**
```
/instant-results/?keyword_pk=102906936611670860&project_pk=560741538243584005&zip_code=07202
```

**Key Features:**
- Uses keyword IDs and project IDs (not human-readable)
- Includes zip code for geographic filtering
- Can include category_pk for filtering

### F. Cost Guide Pages
**Pattern:** `/p/{service}-prices` or `/p/{specific-cost-guide}`

**Examples:**
- `/p/house-cleaning-prices`
- `/p/plumbing-cost`

---

## 2. ANGI (FORMERLY ANGIE'S LIST) URL STRUCTURE

### A. Location Directory Pages
**Pattern:** `/companylist/us/{state}/{city}/`

**Examples:**
- `/companylist/us/tx/houston/` (Houston directory)
- `/companylist/us/ca/los-angeles/` (LA directory)

**Content:** Hub page listing all service categories available in that location

### B. Service Category Pages (Location-Specific)
**Pattern:** `/companylist/us/{state}/{city}/{service-slug}.htm`

**Examples:**
- `/companylist/us/tx/houston/house-cleaning.htm`
- `/companylist/us/tx/houston/plumbing.htm`

**Key Insight:** Service pages are ALWAYS location-scoped. You cannot view a service category without a location context.

### C. Service Request Flow
**Pattern:** `https://request.angi.com/service-request/category/{category_id}` or `/task/{task_id}`

**Examples:**
- `https://request.angi.com/service-request/category/12046` (Landscaping category)
- `https://request.angi.com/service-request/task/39794` (Handyperson task)

**Key Insight:** Service requests go to a separate subdomain, using numeric IDs instead of slugs

### D. Articles & Cost Guides
**Pattern:** `/articles/{article-slug}.htm`

**Examples:**
- `/articles/how-much-does-it-cost-repair-solar-panels.htm`
- `/articles/solar-panel-inspection-cost.htm`

---

## 3. PAGE TYPE HIERARCHY

### Thumbtack Page Types (Identified)

1. **Homepage** (`/`)
   - Search functionality
   - Popular services by location
   - Trending projects

2. **State Page** (`/tx/`)
   - Links to all cities in state
   - Popular services statewide

3. **City Page** (`/{state}/{city}/`)
   - Popular services in city
   - Link to service categories
   - SEO content about city

4. **Service Category Page** (`/k/{service}/near-me`)
   - Generic service info
   - Location-based search
   - Related services

5. **City + Service Page** (`/{state}/{city}/{service}`)
   - **THE MONEY PAGE**
   - List of businesses offering service in city
   - Filtering options
   - SEO content combining location + service

6. **Business Profile Page** (`/{state}/{city}/{service}/{business}/service/{id}`)
   - Single source of truth for business data
   - Reviews, photos, pricing, credentials
   - Contact forms

7. **Search Results Page** (`/instant-results/?...`)
   - Dynamic filtering
   - Real-time results based on search criteria

8. **Cost Guide Pages** (`/p/{service}-prices`)
   - Educational content
   - Average pricing data
   - SEO value

### Angi Page Types (Identified)

1. **Homepage** (`/`)
   - Search by service + zip
   - Popular services
   - Cost guide signup

2. **City Directory Page** (`/companylist/us/{state}/{city}/`)
   - Hub page for all services in city
   - Alphabetical service category list

3. **City + Service Page** (`/companylist/us/{state}/{city}/{service}.htm`)
   - **THE MONEY PAGE**
   - List of providers
   - SEO content

4. **Service Request Pages** (`https://request.angi.com/...`)
   - Lead generation flow
   - Quote request forms

5. **Articles/Cost Guides** (`/articles/...`)
   - Educational content
   - Cost estimation guides

---

## 4. NAVIGATION PATTERNS: MULTIPLE PATHS TO BUSINESS PROFILES

### Path 1: Search → Results → Business
**User Journey:**
1. Homepage search box
2. Search results page with filters
3. Click business card
4. Business profile page

**Thumbtack Example:**
- Search "house cleaning" + "07202" on homepage
- Land on `/instant-results/?keyword_pk=...&zip_code=07202`
- Click "Maid 2 Service"
- View `/nj/jersey-city/house-cleaning/maid-2-service-cleaning-done-right/service/111259078496625825`

### Path 2: Location → Service → Business
**User Journey:**
1. Browse to city page
2. Click service category
3. View list of businesses
4. Click business profile

**Thumbtack Example:**
- Browse to `/tx/houston/`
- Click "House Cleaning"
- View `/tx/houston/house-cleaning`
- Click business profile

### Path 3: Service → Location → Business
**User Journey:**
1. Browse service category
2. Enter location
3. View results
4. Click business

**Thumbtack Example:**
- Browse to `/k/house-cleaning/near-me`
- Enter zip code
- View results for that location
- Click business profile

### Path 4: Direct from Google (SEO)
**User Journey:**
1. Google search "house cleaning houston"
2. Click Thumbtack result
3. Land directly on `/tx/houston/house-cleaning`
4. Browse businesses

---

## 5. DATA CONSISTENCY ARCHITECTURE

### The Single Source of Truth Problem

**Question:** How do these platforms maintain consistent business data when the same business appears on:
- Multiple service category pages
- Multiple location pages
- Search results
- Featured/trending sections

**Answer: Database-Driven with Service IDs**

### Thumbtack's Approach

**Business Data Model:**
```
Business Profile (Single Record)
├── business_id: unique identifier
├── business_name
├── location: {city, state, coordinates}
├── services: [service_id_1, service_id_2, ...]
├── reviews: aggregated rating + count
├── photos: array of images
├── credentials: background check, licenses
└── pricing: starting prices by service
```

**Service Assignment Model:**
```
Business-Service Junction Table
├── business_id
├── service_id (e.g., 111259078496625825)
├── service_category_id (e.g., house-cleaning)
├── pricing_for_this_service
└── specialty_tags
```

**How It Works:**
1. **Single business record** in database
2. **Multiple service records** link to that business
3. **URL structure** includes service_id to identify which service offering
4. **Reviews/ratings** are aggregated at business level (not per-service)
5. **Photos** can be tagged to specific services or general

**Example:**
"Maid 2 Service" offers:
- House Cleaning (service_id: 111259078496625825)
- Commercial Cleaning (service_id: different_id)
- Pressure Washing (service_id: another_id)

Each service gets its own URL:
- `/nj/jersey-city/house-cleaning/maid-2-service/.../111259078496625825`
- `/nj/jersey-city/commercial-cleaning/maid-2-service/.../different_id`
- `/nj/jersey-city/pressure-washing/maid-2-service/.../another_id`

But reviews, business info, and core data are shared.

### How Multi-Location Businesses Work

**Scenario:** A business serves multiple cities

**Thumbtack Approach:**
- Business profile lists "Service Area" (e.g., "Serves Elizabeth, NJ" or "Serves 25-mile radius")
- Business appears in search results for ALL cities within service area
- URL remains tied to business's PRIMARY location
- Search results show "Serves your area" badge

**Example:**
Business based in Jersey City serving:
- Jersey City, NJ
- Hoboken, NJ
- Newark, NJ

**URL:** Always `/nj/jersey-city/house-cleaning/business-name/service/id`

**Appears on:**
- `/nj/jersey-city/house-cleaning` (primary)
- `/nj/hoboken/house-cleaning` (search results, marked "Serves Hoboken")
- `/nj/newark/house-cleaning` (search results, marked "Serves Newark")

---

## 6. SEO STRATEGY COMPARISON

### Thumbtack's SEO Strategy

**Core SEO Pages:**
1. **Location pages** (`/{state}/{city}/`)
   - Target: "[city] service professionals"
   - Content: Popular services, city info

2. **Service + Location pages** (`/{state}/{city}/{service}`)
   - Target: "[service] in [city]" (e.g., "plumbers in Houston")
   - **HIGHEST VALUE** - these are the "money pages"

3. **Cost guides** (`/p/{service}-prices`)
   - Target: "how much does [service] cost"
   - Informational intent, leads to transactional pages

**URL Philosophy:**
- Human-readable slugs for SEO
- State/city in URL path (not query params)
- Service category in URL path
- Business name in URL for brand SEO

### Angi's SEO Strategy

**Core SEO Pages:**
1. **City directory** (`/companylist/us/{state}/{city}/`)
   - Hub page with internal links

2. **Service + Location** (`/companylist/us/{state}/{city}/{service}.htm`)
   - **MONEY PAGES**
   - Targets same keywords as Thumbtack

**URL Philosophy:**
- Uses `.htm` extension (legacy from Angie's List days)
- Full path structure: `/companylist/us/{state}/{city}/`
- More verbose than Thumbtack

---

## 7. KEY ARCHITECTURAL DECISIONS FOR BKND TRUSTED

### Recommendation 1: URL Structure

**Adopt Thumbtack's Pattern (Clean and Modern):**

```
Business Profiles:
/{state}/{county}/{city}/{service}/{business-slug}

Location Pages:
/{state}/{county}/{city}/

Service Category Pages:
/services/{service-slug}

Location + Service Pages (MONEY PAGES):
/{state}/{county}/{city}/{service}
```

**Why Add County?**
Your project includes county-level pages, which neither Thumbtack nor Angi prioritize. This gives you a competitive SEO advantage for "county-level" searches.

### Recommendation 2: Database Architecture

**Business as Single Source of Truth:**

```sql
businesses (
  id
  name
  slug
  primary_city_id
  service_area_geometry -- PostGIS polygon
  rating_average
  review_count
  photo_urls
  credentials
)

business_services (
  id
  business_id
  service_category_id
  starting_price
  description
)

business_locations (
  id
  business_id
  city_id
  is_primary (boolean)
)
```

**Key Principle:** Business data lives in ONE place. All pages query this single source.

### Recommendation 3: Multiple Paths to Business Profiles

**Support All 4 Navigation Patterns:**
1. Search → Results → Business
2. Location → Service → Business
3. Service → Location → Business
4. Direct from Google → Business

**Implementation:**
- Search results page: `/search?service={slug}&location={zip}`
- All links point to same business URL
- Business URL is canonical (no duplicates)

### Recommendation 4: Service Area Logic

**Handle Multi-City Businesses:**
1. Business sets service area (PostGIS polygon or radius)
2. Business appears in search results for ANY city within area
3. Business URL stays tied to primary location
4. Display "Serves [searched city]" badge when appropriate

**Example:**
- Primary location: Houston
- Service area: 25-mile radius
- Appears in results for: Houston, Katy, Sugar Land, Pearland
- URL always: `/texas/harris/houston/plumbing/acme-plumbing`

### Recommendation 5: County-Level Advantage

**Your Unique Value:**
Add county-level pages that competitors don't have:

```
/texas/harris/ (Harris County directory)
/texas/harris/plumbing (Plumbing in Harris County)
```

**SEO Value:**
- Target searches like "plumbers in Harris County"
- Aggregate businesses from ALL cities in county
- Provide county-level statistics

---

## 8. PAGE TEMPLATE INVENTORY

### Required Page Templates

**1. Homepage**
- Search box (service + location)
- Popular services
- Featured businesses
- Trust signals

**2. State Page** (`/{state}/`)
- List of counties
- List of major cities
- Popular services statewide

**3. County Page** (`/{state}/{county}/`) ⭐ YOUR DIFFERENTIATOR
- List of cities in county
- Popular services in county
- County-level statistics

**4. City Page** (`/{state}/{county}/{city}/`)
- Popular services in city
- Featured businesses
- City information

**5. Service Category Page** (`/services/{service}/`)
- Service description
- Average pricing
- How to choose a pro
- Link to location-specific pages

**6. Location + Service Page** (`/{state}/{county}/{city}/{service}`) ⭐ MONEY PAGE
- List of businesses
- Filtering (rating, price, availability)
- SEO content (unique per page)
- Related services

**7. County + Service Page** (`/{state}/{county}/{service}`) ⭐ YOUR DIFFERENTIATOR
- Aggregate of all businesses in county offering service
- County-level statistics

**8. Business Profile Page** (`/{state}/{county}/{city}/{service}/{business-slug}`)
- Business info (single source of truth)
- Reviews
- Photos
- Pricing
- Contact form
- Credentials

**9. Search Results Page** (`/search?service=...&location=...`)
- Dynamic filtering
- Real-time results
- Map view

---

## 9. CRITICAL IMPLEMENTATION NOTES

### Data Consistency Rules

**Rule 1: One Business Record**
- Never duplicate business data
- All pages query the same record
- Reviews/ratings calculated in real-time or cached

**Rule 2: Service Assignments**
- Businesses can offer multiple services
- Each service gets its own "offering" record
- Business profile URL includes service context

**Rule 3: Location Flexibility**
- Businesses have ONE primary location (for URL)
- But can SERVE multiple locations (service area)
- Display location relevance in search results

### SEO Requirements

**Every Location + Service Page Must Have:**
1. Unique H1 heading
2. Unique meta description (150-160 chars)
3. Unique opening paragraph
4. Schema.org LocalBusiness markup
5. Breadcrumb navigation
6. Link to parent pages (city, county, state)

**Dynamic Content Generation:**
```
Template: "Find {service} in {city}, {state}"
Generated: "Find Plumbing in Houston, Texas"

Template: "Top-rated {service} professionals in {city}"
Generated: "Top-rated plumbing professionals in Houston"
```

### Performance Considerations

**50,000+ Pages Means:**
- Static generation for most pages (Next.js `generateStaticParams`)
- ISR (Incremental Static Regeneration) for business listings
- Cache business data aggressively
- Use CDN for static assets

---

## 10. COMPETITIVE ADVANTAGES FOR BKND TRUSTED

**What You Can Do Better:**

1. **County-Level Pages**
   - Neither Thumbtack nor Angi prioritizes counties
   - Own the "Harris County plumber" search results

2. **Background Verification Transparency**
   - Make background check status MORE prominent
   - Show verification badges consistently
   - Build trust through transparency

3. **Cleaner URLs**
   - Simpler than Angi's `/companylist/us/...`
   - Add county for geographic clarity

4. **Better Location Hierarchy**
   - State → County → City (logical)
   - vs Thumbtack's State → City (skips county)

---

## 11. EXAMPLE URL STRUCTURE FOR BKND TRUSTED

```
Homepage:
https://bkndtrusted.com/

State:
https://bkndtrusted.com/texas/

County:
https://bkndtrusted.com/texas/harris/

City:
https://bkndtrusted.com/texas/harris/houston/

Service Category:
https://bkndtrusted.com/services/plumbing/

County + Service (Your Advantage):
https://bkndtrusted.com/texas/harris/plumbing/

City + Service (Money Page):
https://bkndtrusted.com/texas/harris/houston/plumbing/

Business Profile:
https://bkndtrusted.com/texas/harris/houston/plumbing/acme-plumbing-and-repair/

Search:
https://bkndtrusted.com/search?service=plumbing&zip=77001
```

---

## 12. NEXT STEPS FOR IMPLEMENTATION

### Phase 1: Core Architecture
1. Define database schema (PostgreSQL + PostGIS)
2. Create business service model
3. Implement service area logic
4. Build location hierarchy (state → county → city)

### Phase 2: Page Templates
1. Build all 9 page templates
2. Implement SEO utilities
3. Create dynamic content generation
4. Add JSON-LD schema to all pages

### Phase 3: Data Integration
1. Seed database with test data
2. Replace mock data with real database queries
3. Implement caching strategy
4. Test performance with 50K+ pages

### Phase 4: SEO Optimization
1. Generate sitemap
2. Submit to Google Search Console
3. Implement structured data
4. Optimize meta tags
5. Build internal linking strategy

---

## CONCLUSION

**Key Takeaway:** Thumbtack and Angi solve the "multiple paths to same business" problem by:
1. **Single source of truth:** One business record in database
2. **Service context:** URLs include service category for clarity
3. **Location scoping:** Business URLs tied to primary location
4. **Service area:** Businesses appear in multiple locations via search
5. **Consistent data:** All pages query the same underlying records

**Your Advantage:** Add county-level pages to capture searches competitors miss while maintaining the same clean, database-driven architecture.

---

**Analysis Complete: January 2025**

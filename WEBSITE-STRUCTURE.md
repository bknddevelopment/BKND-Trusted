# BKND Trusted - Website Structure Blueprint

**Last Updated:** October 7, 2025
**Platform:** Next.js 14 App Router
**Total Pages:** 50,000+ (Dynamic SEO Pages)

---

## 🏗️ Site Architecture Overview

```
BKND Trusted
│
├── 🏠 Public Pages (User-Facing)
├── 🔍 Search & Discovery
├── 📍 Geographic Pages (SEO)
├── 🏢 Business Profiles
└── 🛠️ Service Category Pages
```

---

## 📊 Complete Page Hierarchy

### **Level 1: Homepage**
```
/ (Homepage)
├── Hero Section
├── Search Bar (Service + Location)
├── Popular Services Grid
├── How It Works
├── Trust Signals
└── Call-to-Action
```

**URL:** `https://bkndtrusted.com/`
**File:** `app/page.tsx`
**Purpose:** Main landing page, primary entry point

---

### **Level 2: Service Discovery**

#### **2A. All Services Page**
```
/services
├── Service Categories Grid
│   ├── Plumbing
│   ├── Electrical
│   ├── HVAC
│   ├── Roofing
│   ├── Landscaping
│   └── [20+ more categories]
└── Search/Filter Tools
```

**URL:** `https://bkndtrusted.com/services`
**File:** `app/services/page.tsx`
**Purpose:** Browse all service categories

#### **2B. Individual Service Pages**
```
/services/[slug]
├── Service Description
├── Average Costs
├── Common Jobs
├── FAQ
├── Featured Providers
└── CTA: "Find Pros Near You"
```

**URL Pattern:** `https://bkndtrusted.com/services/{service-slug}`
**Examples:**
- `/services/plumbing`
- `/services/electrical`
- `/services/hvac-repair`

**File:** `app/services/[slug]/page.tsx`
**Dynamic:** Yes (generates pages for all service types)

---

### **Level 3: Geographic Pages (SEO Engine)**

#### **3A. State Pages**
```
/[state]
├── State Overview
├── Top Cities
├── Popular Services in State
└── County Directory
```

**URL Pattern:** `https://bkndtrusted.com/{state-slug}`
**Examples:**
- `/new-jersey`
- `/texas`
- `/california`

**File:** `app/[state]/page.tsx`
**SEO Target:** 50 state pages

---

#### **3B. Location + Service Pages (Main SEO Pages)**
```
/[state]/[county]/[city]/[service]
├── Hero: "{Service} in {City}, {State}"
├── Top 5 Local Businesses
│   ├── Business Card #1
│   │   ├── Name, Rating, Reviews
│   │   ├── Address (verified IN city)
│   │   ├── Phone, Email, Website
│   │   ├── Specialties
│   │   ├── Trust Badges
│   │   ├── Featured Review
│   │   └── CTA Buttons (View Profile, Call Now)
│   ├── Business Card #2
│   ├── Business Card #3
│   ├── Business Card #4
│   └── Business Card #5
├── Why Choose BKND Trusted
├── Trust Section
└── Breadcrumb Navigation
```

**URL Pattern:** `https://bkndtrusted.com/{state}/{county}/{city}/{service}`
**Current Example:** `/new-jersey/union/elizabeth/plumbing`
**File:** `app/[state]/[county]/[city]/[service]/page.tsx`

**SEO Strategy:**
- 50 states × 100 counties avg × 10 cities avg × 10 services = **500,000 potential pages**
- Currently built: Elizabeth, NJ Plumbing (1 page as template)
- Next to build: More NJ cities, more services

---

### **Level 4: Business Profile Pages**

```
/business/[slug]
├── Business Header
│   ├── Business Name
│   ├── Star Rating (Google/Yelp/Thumbtack)
│   ├── Review Count
│   └── Trust Badges (Top Pro, Licensed, 24/7, etc.)
├── Contact Card (Sticky Sidebar)
│   ├── Service Call Fee
│   ├── Call Now Button
│   ├── Business Hours
│   └── Background Check Badge
├── About Section
├── Services Offered Grid
├── Customer Reviews
│   ├── Review #1 (with avatar, rating, text)
│   ├── Review #2
│   └── Review #3+
├── Service Area Map
├── Contact Information Sidebar
│   ├── Phone
│   ├── Email
│   ├── Website
│   ├── Address
├── Credentials
│   ├── Licenses
│   └── Certifications
├── Payment Methods
└── Social Media Links
```

**URL Pattern:** `https://bkndtrusted.com/business/{business-slug}`
**Current Examples:**
- `/business/get-snaked`
- `/business/grand-plumber-elizabeth`
- `/business/help-plumbing-heating`
- `/business/elizabeth-plumbers`
- `/business/regal-plumbers`

**File:** `app/business/[slug]/page.tsx`
**Dynamic:** Yes (generates pages for all verified businesses)

---

### **Level 5: Search & Discovery**

```
/search
├── Search Bar
│   ├── Service Type Input
│   ├── Location Input (ZIP/City)
│   └── Search Button
├── Filters
│   ├── Service Category
│   ├── Rating (4+, 4.5+, 5 stars)
│   ├── Price Range
│   ├── Availability (24/7, Same Day)
│   └── Badges (Licensed, Top Pro, etc.)
├── Results Grid
│   └── Business Cards (similar to city pages)
└── Map View (optional)
```

**URL:** `https://bkndtrusted.com/search?service={service}&location={zip}`
**Examples:**
- `/search?service=plumbing&location=07201`
- `/search?service=electrical&location=elizabeth-nj`

**File:** `app/search/page.tsx`

---

## 🔀 Navigation Flow & User Journeys

### **Journey 1: Location-First Search**
```
Homepage → Select Service → Enter ZIP → City Service Page → Business Profile → Contact/Hire
```

**Example:**
1. User visits `/` (homepage)
2. Selects "Plumbing" from service grid
3. Enters ZIP "07201"
4. Lands on `/new-jersey/union/elizabeth/plumbing`
5. Clicks "View Full Profile" on "Get Snaked"
6. Lands on `/business/get-snaked`
7. Clicks "Call Now" → Calls (908) 867-8200

---

### **Journey 2: Service Category Browse**
```
Homepage → All Services → Service Detail → Search by Location → City Page → Business
```

**Example:**
1. User visits `/`
2. Clicks "Browse All Services"
3. Lands on `/services`
4. Clicks "Plumbing"
5. Lands on `/services/plumbing`
6. Enters "Elizabeth, NJ" in location search
7. Lands on `/new-jersey/union/elizabeth/plumbing`
8. Selects business

---

### **Journey 3: Direct SEO Entry (Google Search)**
```
Google → City Service Page → Business Profile → Contact
```

**Example:**
1. User Googles "plumber Elizabeth NJ"
2. Clicks BKND Trusted result
3. Lands directly on `/new-jersey/union/elizabeth/plumbing`
4. Sees top 5 verified plumbers
5. Clicks business profile
6. Contacts business

---

## 🗺️ Complete URL Structure Map

```
bkndtrusted.com/
│
├── / (Homepage)
│
├── /services (All Services)
│   └── /services/{slug} (Individual Service Pages)
│       ├── /services/plumbing
│       ├── /services/electrical
│       ├── /services/hvac-repair
│       └── ... (20+ more)
│
├── /{state} (State Pages)
│   ├── /new-jersey
│   ├── /texas
│   ├── /california
│   └── ... (50 states)
│       │
│       └── /{state}/{county}/{city}/{service} (City + Service Pages)
│           ├── /new-jersey/union/elizabeth/plumbing ✅ BUILT
│           ├── /new-jersey/union/elizabeth/electrical (planned)
│           ├── /new-jersey/union/elizabeth/hvac (planned)
│           ├── /new-jersey/essex/newark/plumbing (planned)
│           └── ... (50,000+ potential combinations)
│
├── /business/{slug} (Business Profiles)
│   ├── /business/get-snaked ✅ BUILT
│   ├── /business/grand-plumber-elizabeth ✅ BUILT
│   ├── /business/help-plumbing-heating ✅ BUILT
│   ├── /business/elizabeth-plumbers ✅ BUILT
│   ├── /business/regal-plumbers ✅ BUILT
│   └── ... (thousands more as businesses are added)
│
└── /search (Search Results)
    └── /search?service=plumbing&location=07201
```

---

## 📄 Page Components Architecture

### **Shared Components (Used Across Pages)**

```
components/
├── ui/ (Primitives)
│   ├── Button.tsx
│   ├── Badge.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   └── Skeleton.tsx (loading states)
│
├── Professional*.tsx (Current Design System)
│   ├── ProfessionalHero.tsx
│   ├── ProfessionalCard.tsx
│   ├── ProfessionalBadge.tsx
│   └── ProfessionalFooter.tsx
│
├── SearchBar.tsx (Homepage + Service pages)
├── TrustBanner.tsx (Trust signals section)
├── Breadcrumb.tsx (Navigation breadcrumbs)
├── BusinessCard.tsx (Business listings)
├── ReviewCard.tsx (Customer reviews)
├── ServiceGrid.tsx (Service category grid)
└── Header.tsx (Site navigation)
```

---

## 🎨 Design System Hierarchy

```
Design Tokens (tailwind.config.ts)
│
├── Colors
│   ├── brand-* (Metallic Blue: #1E3A8A)
│   ├── success-* (Green: #10B981)
│   ├── featured-* (Gold: #FBBF24)
│   └── neutral-* (Grays)
│
├── Typography
│   ├── text-display-* (Hero headlines, 48-60px)
│   ├── text-h1, h2, h3 (Headings, 24-36px)
│   └── text-body-* (Content, 14-18px)
│
└── Components
    ├── Professional*.tsx (Active components)
    ├── ui/* (Reusable primitives)
    ├── premium/* (Legacy - NOT USED)
    └── aurora/* (Legacy - NOT USED)
```

---

## 🔍 SEO Structure & Metadata

### **Page-Level SEO (All Pages)**
```typescript
export const metadata = generateSEO({
  title: "Page Title (50-60 chars)",
  description: "Meta description (150-160 chars)",
  path: "/page-path"
});
```

### **JSON-LD Schema Markup**

**City Service Pages:**
```json
{
  "@type": "ItemList",
  "name": "Top Plumbing Companies in Elizabeth, NJ",
  "itemListElement": [
    {
      "@type": "LocalBusiness",
      "name": "Get Snaked",
      "address": "162 Elmora Ave Unit 101, Elizabeth, NJ 07202",
      "telephone": "(908) 867-8200",
      "aggregateRating": {
        "ratingValue": 4.9,
        "reviewCount": 97
      }
    }
  ]
}
```

**Business Profile Pages:**
```json
{
  "@type": "LocalBusiness",
  "name": "Get Snaked",
  "description": "Professional drain cleaning...",
  "address": {...},
  "aggregateRating": {...},
  "review": [...]
}
```

---

## 📊 Data Flow Architecture

```
User Request
    ↓
Next.js App Router
    ↓
Page Component (SSR)
    ↓
Data Layer
    ├── lib/elizabeth-plumbers-data.ts (Current: Static JSON)
    ├── lib/mock-data.ts (Development data)
    └── [Future] Prisma → PostgreSQL + PostGIS
    ↓
Component Rendering
    ├── Server Components (Default)
    └── Client Components ('use client')
    ↓
HTML + Metadata + JSON-LD
    ↓
User Browser
```

---

## 🚀 Scalability Plan

### **Phase 1: Foundation (Current - Week 4)** ✅
- ✅ Homepage
- ✅ Services directory
- ✅ 1 City + Service page (Elizabeth, NJ Plumbing)
- ✅ 5 Business profiles (Elizabeth plumbers)
- ✅ Design system
- ✅ SEO infrastructure

### **Phase 2: Geographic Expansion (Weeks 5-8)**
- [ ] Add 10 more NJ cities (Newark, Jersey City, Paterson, etc.)
- [ ] Add 5 more service types per city (Electrical, HVAC, Roofing, Landscaping, Painting)
- [ ] Target: 50 city + service pages (10 cities × 5 services)
- [ ] Add 5 businesses per page = 250 business profiles

### **Phase 3: State Expansion (Weeks 9-16)**
- [ ] Expand to neighboring states (NY, PA, CT)
- [ ] Add major metros: NYC, Philadelphia, Boston
- [ ] Target: 500 city + service pages
- [ ] 2,500 business profiles

### **Phase 4: National Scale (Month 4+)**
- [ ] All 50 states
- [ ] Top 100 cities per state
- [ ] 20 service categories per city
- [ ] Target: 50,000+ SEO pages
- [ ] Database migration (PostgreSQL + PostGIS)

---

## 🔗 Internal Linking Strategy

### **Homepage → Service Pages**
- Service grid with 20+ categories
- Each links to `/services/{slug}`

### **Service Pages → City Pages**
- Location search input
- Links to `/[state]/[county]/[city]/[service]`

### **City Pages → Business Profiles**
- "View Full Profile" buttons
- Links to `/business/{slug}`

### **Business Profiles → Back to City**
- Breadcrumb navigation
- "Back to Elizabeth Plumbers" link

### **Cross-Linking**
- Related services sidebar
- "Nearby cities" section
- "Other services in {city}" grid

---

## 📱 Responsive Breakpoints

```
Mobile:  < 640px   (1 column, stacked)
Tablet:  640-1024px (2 columns)
Desktop: 1024px+    (3 columns, sidebar)
```

All pages are fully responsive with mobile-first design.

---

## 🛠️ Technical Stack Summary

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14.1.0 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 3.3.0 |
| **Database** | PostgreSQL 16 + PostGIS 3.4 (future) |
| **ORM** | Prisma (future) |
| **Hosting** | TBD (Vercel recommended) |
| **CDN** | TBD |
| **Analytics** | TBD |

---

## 📈 Current Stats

- **Total Routes:** 10 unique page types
- **Built Pages:** 11 (1 homepage + 1 services + 1 service detail + 1 city page + 5 business profiles + 2 demo/showcase)
- **Dynamic Routes:** 4 (`[state]`, `[service]`, `[slug]`, city pages)
- **Potential Scale:** 50,000+ pages when fully populated
- **Components:** 25+ reusable components
- **Design Tokens:** Custom Tailwind theme with 5 color systems

---

**Next Steps:**
1. Add more cities (Newark, Jersey City, Paterson)
2. Add more services (Electrical, HVAC, Roofing)
3. Populate database with real business data
4. Implement search functionality
5. Add user accounts and reviews system

---

*Blueprint Version: 1.0 | Last Updated: October 7, 2025*

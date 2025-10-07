# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

BKND Trusted is a **local service directory platform** (similar to Thumbtack/Angi) connecting homeowners with verified, background-checked service professionals. The platform is designed to scale to **50,000+ SEO-optimized pages** with geographic targeting across states, counties, cities, and service types.

**Tech Stack:**
- Next.js 14.1.0 (App Router)
- TypeScript 5
- Tailwind CSS 3.3.0 (custom design system)
- PostgreSQL 16 + PostGIS 3.4
- Prisma ORM

---

## Essential Commands

```bash
# Development
npm run dev              # Start Next.js dev server (default: http://localhost:3000)
npm run build            # Production build
npm run typecheck        # TypeScript type checking (run before commits)
npm run lint             # ESLint

# Database (PostgreSQL + PostGIS)
npm run docker:up        # Start PostgreSQL + Redis containers
npm run docker:down      # Stop containers
npm run docker:reset     # Reset and restart containers
npm run db:migrate       # Run Prisma migrations
npm run db:seed          # Seed database with test data
npm run db:studio        # Open Prisma Studio GUI
npm run db:generate      # Generate Prisma Client (after schema changes)
npm run db:reset         # Full database reset
```

---

## Architecture & Page Structure

### Dynamic Route Hierarchy (SEO-Optimized)

The app generates thousands of SEO pages using Next.js App Router dynamic segments:

```
app/
├── page.tsx                                    # Homepage
├── services/
│   ├── page.tsx                                # /services - All service categories
│   └── [slug]/page.tsx                         # /services/plumbing - Service detail pages
├── business/[slug]/page.tsx                    # /business/pro-plumbing - Business profile pages
├── search/page.tsx                             # /search?service=...&zip=... - Search results
└── [state]/                                    # Geographic pages (50,000+ generated)
    ├── page.tsx                                # /texas - State page
    └── [county]/
        └── [city]/
            └── [service]/page.tsx              # /texas/harris/houston/plumbing - City+Service pages
```

**Key Pattern:** Multi-level dynamic routes generate SEO-optimized pages for every state → county → city → service combination. Each page has unique metadata, structured data (JSON-LD), and optimized content.

### Component Organization

```
components/
├── ui/                      # Reusable UI primitives (Button, Badge, Card, Skeleton)
├── premium/                 # Premium design components (currently unused, kept for reference)
├── aurora/                  # Aurora design system (currently unused)
├── Professional*.tsx        # Active design system components (ProfessionalHero, etc.)
└── [Feature]*.tsx           # Feature-specific components (SearchBar, TrustBanner, etc.)
```

**Design Evolution:** The codebase evolved from `aurora/` → `premium/` → `Professional*` components. **Always use `Professional*` components and `ui/` primitives** for new features. Legacy `aurora/` and `premium/` folders exist for reference but should not be used.

### Design System (Tailwind Config)

**Brand Colors (Metallic Blue System):**
- Primary: `brand-600` (#1E3A8A) - CTAs, buttons, links
- Headers: `brand-900` (#0F172A) - Dark metallic blue
- Success/Verification: `success-500` (#10B981) - Green badges
- Featured/Premium: `featured-400` (#FBBF24) - Gold stars

**Typography Scale:**
- Display: `text-display-xl`, `text-display-lg` (Hero headlines, 48-60px)
- Headings: `text-h1`, `text-h2`, `text-h3` (Page headings, 24-36px)
- Body: `text-body-lg`, `text-body`, `text-body-sm` (Content, 14-18px)

**Usage:** Always use semantic classes (`text-h1`, `bg-brand-600`) instead of raw Tailwind utilities. This ensures consistency with the design system.

---

## SEO & Metadata Strategy

### SEO Utilities (`lib/seo.ts`)

```typescript
import { generateSEO, generateOrganizationSchema, generateLocalBusinessSchema } from '@/lib/seo';

// Page metadata
export const metadata = generateSEO({
  title: 'Plumbing Services in Houston, TX',
  description: 'Find verified plumbers...',
  path: '/texas/harris/houston/plumbing',
});

// JSON-LD structured data
const schema = generateLocalBusinessSchema({
  name: 'Pro Plumbing Solutions',
  rating: 4.9,
  reviewCount: 147,
  // ...
});
```

**Critical SEO Files:**
- `public/robots.txt` - Search engine crawling rules
- `public/sitemap-index.xml` - Master sitemap index
- Page-level `metadata` exports - Next.js 14 metadata system

**SEO Checklist (Every New Page):**
1. Add `generateSEO()` metadata export
2. Include JSON-LD schema via `<Script>` tag
3. Add breadcrumb navigation
4. Update sitemap (if adding new route patterns)
5. Verify `robots.txt` allows crawling

---

## Database Architecture (PostgreSQL + PostGIS)

### Schema Overview

```prisma
// Core tables (prisma/schema.prisma)
model Business {
  id              String   @id
  name            String
  location        Geometry @db.Geography  // PostGIS point (lat/long)
  service_area    Geometry @db.Geography  // PostGIS polygon
  city_id         String
  city            City     @relation(...)
  reviews         Review[]
  services        Service[]
}

model City {
  id          String   @id
  name        String
  slug        String   @unique
  state_id    String
  state       State    @relation(...)
  boundary    Geometry @db.Geography  // PostGIS polygon
  businesses  Business[]
}
```

**Geographic Queries:** PostGIS enables radius searches, service area lookups, and boundary queries:

```typescript
// Example: Find businesses within 25 miles
const nearbyBusinesses = await geoQueries.findBusinessesNearby(
  40.7128,   // latitude
  -74.0060,  // longitude
  25,        // radius (miles)
  20         // limit
);
```

### Connection Pooling

- **Min connections:** 2
- **Max connections:** 10 (set via `DB_POOL_MAX` in `.env`)
- **Idle timeout:** 10s
- **Acquire timeout:** 60s

**Important:** Always use Prisma Client for queries. Never use raw SQL unless absolutely necessary (PostGIS functions are the exception).

---

## Mock Data vs. Real Data

**Current State:** The app uses **mock data** (`lib/mock-data.ts`) for development. Database integration is in progress.

**When to Use Mock Data:**
- Component development
- UI/UX iteration
- SEO metadata testing

**When to Switch to Database:**
- Production deployment
- Performance testing
- Real user testing

**Migration Path:** Replace imports from `lib/mock-data.ts` with Prisma queries. Example:

```typescript
// BEFORE (Mock Data)
import { mockBusinesses } from '@/lib/mock-data';

// AFTER (Database)
import { prisma } from '@/lib/db';
const businesses = await prisma.business.findMany({ where: { ... } });
```

---

## Performance Optimization

### Critical Performance Features

1. **Route-level code splitting** - Next.js automatically splits pages
2. **Image optimization** - Use `next/image` for all images (not `<img>`)
3. **Tailwind CSS purging** - PurgeCSS removes unused styles in production
4. **Lighthouse CI** - Performance monitoring (see `.lhcirc.json`)
5. **Skeleton loading states** - Use `components/ui/Skeleton.tsx` for all async content

### Performance Monitoring

```typescript
// PerformanceProvider tracks Core Web Vitals in development
import PerformanceProvider from '@/components/PerformanceProvider';

// Usage (already in app/layout.tsx)
<PerformanceProvider
  enableMonitoring={process.env.NODE_ENV === 'development'}
  showMetricsOverlay={true}
>
  {children}
</PerformanceProvider>
```

**Before Production Deploy:**
```bash
npm run build            # Must succeed with 0 errors
npm run typecheck        # Must show 0 type errors
npm run lint             # Must pass (warnings OK)
```

---

## Design Patterns & Best Practices

### Component Patterns

**1. Server Components (Default):**
```typescript
// app/services/[slug]/page.tsx
export default function ServicePage({ params }: { params: { slug: string } }) {
  // Server-side data fetching, SEO metadata
  return <div>...</div>;
}
```

**2. Client Components (Interactive):**
```typescript
'use client';  // Required for useState, useEffect, event handlers

export default function SearchBar() {
  const [query, setQuery] = useState('');
  // ...
}
```

**Rule:** Use Server Components by default. Only add `'use client'` when you need:
- `useState`, `useEffect`, `useRouter`
- Event handlers (`onClick`, `onChange`)
- Browser APIs (`window`, `localStorage`)

### Trust Signals & Badge System

**Trust Badge Hierarchy (Thumbtack-Inspired):**
1. **Top Pro** - Cyan badge with checkmark (`CheckBadgeIcon`)
2. **Licensed Pro** - Blue badge with shield (`ShieldCheckIcon`)
3. **In High Demand** - Orange badge with bolt (`BoltIcon`)
4. **Great Value** - Green badge
5. **Online Now** - Green pulsing dot

**Implementation Example:**
```typescript
// See app/services/[slug]/page.tsx for reference
<span className="bg-cyan-50 text-cyan-700 border border-cyan-400 px-3 py-1 rounded-full">
  <CheckBadgeIcon className="w-3 h-3" />
  Top Pro
</span>
```

### Pricing Transparency

Always display pricing where available:
- `Starting at $X` - For standardized services
- `$X service call (waived if hired)` - For diagnostic fees
- `Free estimate` - For custom work
- `Contact for pricing` - When pricing varies significantly

---

## Common Pitfalls

### 1. Image Optimization
❌ **Wrong:** `<img src="/image.jpg" />`
✅ **Correct:** `<Image src="/image.jpg" width={800} height={600} alt="..." />`

### 2. Tailwind Class Conflicts
❌ **Wrong:** Mixing raw Tailwind with design system
✅ **Correct:** Use `cn()` utility from `lib/utils.ts`:
```typescript
import { cn } from '@/lib/utils';
<div className={cn("base-classes", conditional && "conditional-classes")} />
```

### 3. TypeScript Errors
❌ **Wrong:** Using `any` types
✅ **Correct:** Define proper interfaces in `lib/types.ts`

### 4. SEO Metadata
❌ **Wrong:** Missing metadata export
✅ **Correct:** Every page needs:
```typescript
export const metadata = generateSEO({ title: '...', description: '...' });
```

### 5. Loading States
❌ **Wrong:** No loading UI (flashes of empty content)
✅ **Correct:** Create `loading.tsx` for every route:
```typescript
// app/services/[slug]/loading.tsx
export default function Loading() {
  return <Skeleton />;
}
```

---

## File Naming Conventions

- **Pages:** `page.tsx` (Next.js convention)
- **Layouts:** `layout.tsx` (Next.js convention)
- **Loading States:** `loading.tsx` (Next.js convention)
- **Components:** `PascalCase.tsx` (e.g., `ProfessionalHero.tsx`)
- **Utilities:** `camelCase.ts` (e.g., `utils.ts`, `seo.ts`)
- **Types:** `types.ts` (centralized in `lib/types.ts`)

---

## Environment Variables

**Required Variables (.env):**
```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/bknd_trusted"
DB_POOL_MAX=10

# Site Configuration
NEXT_PUBLIC_SITE_URL="https://bkndtrusted.com"

# Optional (Development)
NODE_ENV=development
```

**Never commit `.env` to Git.** Use `.env.example` for documentation.

---

## Testing & Quality Assurance

### Pre-Commit Checklist

1. ✅ `npm run typecheck` - 0 errors
2. ✅ `npm run lint` - Passes (warnings OK)
3. ✅ `npm run build` - Succeeds with 0 errors
4. ✅ Check all new pages in browser
5. ✅ Verify mobile responsiveness
6. ✅ Test loading states
7. ✅ Validate SEO metadata (view page source, check JSON-LD)

### Lighthouse Performance Targets

- **Performance:** 90+ (desktop), 70+ (mobile)
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 100

Run: `npm run build && npm run start` then test with Chrome DevTools Lighthouse.

---

## Logo & Branding

**Logo Location:** `public/images/logo.png`

**Usage in Code:**
```tsx
<img
  src="/images/logo.png"
  alt="BKND Trusted - Verified Local Service Professionals"
  className="h-12 w-auto"
/>
```

**Brand Voice:** Professional, trustworthy, straightforward. Avoid overly casual language or excessive emojis.

---

## When to Ask for Help

- Database schema changes (Prisma migrations are complex)
- PostGIS geographic queries (specialized SQL)
- Performance regressions (unexpected slowdowns)
- SEO strategy changes (affects 50,000+ pages)

---

**Last Updated:** October 7, 2025 (Week 4 of development)

# BKND Trusted - Visual Site Flowchart

## 🗺️ Interactive Site Map (Mermaid Diagram)

```mermaid
graph TD
    %% Homepage
    HOME[🏠 Homepage<br/>bkndtrusted.com]

    %% Main Navigation
    HOME --> SERVICES[📋 All Services<br/>/services]
    HOME --> SEARCH[🔍 Search<br/>/search]
    HOME --> STATES[📍 Browse by State]

    %% Services Flow
    SERVICES --> SERVICE_DETAIL[🔧 Service Detail<br/>/services/plumbing]
    SERVICE_DETAIL --> CITY_SERVICE[📍 City + Service Page<br/>/new-jersey/union/elizabeth/plumbing]

    %% State Flow
    STATES --> STATE_PAGE[🗺️ State Page<br/>/new-jersey]
    STATE_PAGE --> CITY_SERVICE

    %% Search Flow
    SEARCH --> CITY_SERVICE

    %% City Service Page Details
    CITY_SERVICE --> BIZ1[🏢 Business #1<br/>/business/get-snaked]
    CITY_SERVICE --> BIZ2[🏢 Business #2<br/>/business/grand-plumber-elizabeth]
    CITY_SERVICE --> BIZ3[🏢 Business #3<br/>/business/help-plumbing-heating]
    CITY_SERVICE --> BIZ4[🏢 Business #4<br/>/business/elizabeth-plumbers]
    CITY_SERVICE --> BIZ5[🏢 Business #5<br/>/business/regal-plumbers]

    %% Conversion Actions
    BIZ1 --> CALL1[📞 Call Now<br/>908-867-8200]
    BIZ1 --> EMAIL1[✉️ Email<br/>getsnakednj@gmail.com]
    BIZ1 --> WEB1[🌐 Visit Website<br/>getsnaked.com]

    BIZ2 --> CALL2[📞 Call Now]
    BIZ3 --> CALL3[📞 Call Now]
    BIZ4 --> CALL4[📞 Call Now]
    BIZ5 --> CALL5[📞 Call Now]

    %% Styling
    classDef homePage fill:#1E3A8A,stroke:#1E40AF,color:#fff,stroke-width:3px
    classDef servicePage fill:#3B82F6,stroke:#2563EB,color:#fff
    classDef cityPage fill:#10B981,stroke:#059669,color:#fff,stroke-width:2px
    classDef bizPage fill:#F59E0B,stroke:#D97706,color:#000
    classDef action fill:#EF4444,stroke:#DC2626,color:#fff

    class HOME homePage
    class SERVICES,SERVICE_DETAIL,STATES,STATE_PAGE,SEARCH servicePage
    class CITY_SERVICE cityPage
    class BIZ1,BIZ2,BIZ3,BIZ4,BIZ5 bizPage
    class CALL1,CALL2,CALL3,CALL4,CALL5,EMAIL1,WEB1 action
```

---

## 📊 User Journey Flowchart

```mermaid
flowchart LR
    %% Entry Points
    GOOGLE[🔍 Google Search<br/>plumber elizabeth nj]
    DIRECT[🌐 Direct Visit<br/>bkndtrusted.com]
    SOCIAL[📱 Social Media<br/>Link/Ad]

    %% Landing Pages
    GOOGLE --> CITY[City Service Page<br/>elizabeth/plumbing]
    DIRECT --> HOME[Homepage]
    SOCIAL --> HOME

    %% Homepage Paths
    HOME --> SEARCH_BAR[Search Bar<br/>Enter Service + ZIP]
    HOME --> SERVICE_GRID[Service Grid<br/>Click Category]
    HOME --> BROWSE[Browse All Services]

    %% Converge to City Page
    SEARCH_BAR --> CITY
    SERVICE_GRID --> SERVICE[Service Detail Page]
    BROWSE --> SERVICES[All Services]
    SERVICES --> SERVICE
    SERVICE --> LOCATION[Enter Location]
    LOCATION --> CITY

    %% City Page to Business
    CITY --> COMPARE[Compare Top 5<br/>Plumbers]
    COMPARE --> SELECT[Select Business]
    SELECT --> PROFILE[Business Profile<br/>Full Details]

    %% Conversion
    PROFILE --> CALL[📞 Call Now]
    PROFILE --> EMAIL[✉️ Send Email]
    PROFILE --> WEBSITE[🌐 Visit Website]
    PROFILE --> QUOTE[💬 Request Quote]

    %% Style
    classDef entry fill:#8B5CF6,stroke:#7C3AED,color:#fff
    classDef landing fill:#3B82F6,stroke:#2563EB,color:#fff
    classDef decision fill:#10B981,stroke:#059669,color:#fff
    classDef conversion fill:#EF4444,stroke:#DC2626,color:#fff

    class GOOGLE,DIRECT,SOCIAL entry
    class HOME,CITY,SERVICES,SERVICE landing
    class COMPARE,SELECT,PROFILE decision
    class CALL,EMAIL,WEBSITE,QUOTE conversion
```

---

## 🏗️ Page Hierarchy Structure

```mermaid
graph TD
    ROOT[Root<br/>bkndtrusted.com]

    %% Level 1
    ROOT --> L1_HOME[Level 1: Homepage<br/>/]
    ROOT --> L1_SERVICES[Level 1: Services<br/>/services]
    ROOT --> L1_SEARCH[Level 1: Search<br/>/search]
    ROOT --> L1_STATE[Level 1: States<br/>/:state]
    ROOT --> L1_BIZ[Level 1: Business<br/>/business]

    %% Level 2 - Services
    L1_SERVICES --> L2_SERVICE[Level 2: Service Detail<br/>/services/:slug<br/><br/>Examples:<br/>• /services/plumbing<br/>• /services/electrical<br/>• /services/hvac]

    %% Level 2 - States
    L1_STATE --> L2_COUNTY[Level 2: County<br/>/:state/:county]

    %% Level 3 - City
    L2_COUNTY --> L3_CITY[Level 3: City<br/>/:state/:county/:city]

    %% Level 4 - City + Service
    L3_CITY --> L4_CITY_SERVICE[Level 4: City + Service<br/>/:state/:county/:city/:service<br/><br/>✅ BUILT:<br/>/new-jersey/union/elizabeth/plumbing<br/><br/>📋 PLANNED:<br/>• /new-jersey/union/elizabeth/electrical<br/>• /new-jersey/essex/newark/plumbing<br/>• ... 50,000+ more]

    %% Level 2 - Business
    L1_BIZ --> L2_BIZ_PROFILE[Level 2: Business Profile<br/>/business/:slug<br/><br/>✅ BUILT 5:<br/>• /business/get-snaked<br/>• /business/grand-plumber-elizabeth<br/>• /business/help-plumbing-heating<br/>• /business/elizabeth-plumbers<br/>• /business/regal-plumbers]

    %% Connections
    L4_CITY_SERVICE -.Links to 5 Businesses.-> L2_BIZ_PROFILE
    L2_SERVICE -.Location Search.-> L4_CITY_SERVICE
    L1_SEARCH -.Results.-> L4_CITY_SERVICE

    %% Styling
    classDef level1 fill:#1E3A8A,stroke:#1E40AF,color:#fff,stroke-width:3px
    classDef level2 fill:#3B82F6,stroke:#2563EB,color:#fff,stroke-width:2px
    classDef level3 fill:#10B981,stroke:#059669,color:#fff
    classDef level4 fill:#F59E0B,stroke:#D97706,color:#000,stroke-width:2px

    class L1_HOME,L1_SERVICES,L1_SEARCH,L1_STATE,L1_BIZ level1
    class L2_SERVICE,L2_COUNTY,L2_BIZ_PROFILE level2
    class L3_CITY level3
    class L4_CITY_SERVICE level4
```

---

## 🎯 Business Profile Page Structure

```mermaid
graph TD
    PROFILE[Business Profile Page<br/>/business/get-snaked]

    %% Header Section
    PROFILE --> HEADER[📌 Header Section]
    HEADER --> H1[Business Name]
    HEADER --> H2[⭐ Rating: 4.9 97 reviews]
    HEADER --> H3[🏆 Badges: Top Rated, 24/7, Licensed]

    %% Main Content
    PROFILE --> MAIN[📄 Main Content Area]
    MAIN --> M1[About Section<br/>Business description]
    MAIN --> M2[Services Offered<br/>6 specialties grid]
    MAIN --> M3[Customer Reviews<br/>3 testimonials with avatars]
    MAIN --> M4[Service Area<br/>Elizabeth, NJ + surrounding]

    %% Sidebar
    PROFILE --> SIDEBAR[📋 Sticky Sidebar]
    SIDEBAR --> S1[💰 Pricing<br/>$145 service call]
    SIDEBAR --> S2[📞 Call Now Button<br/>908-867-8200]
    SIDEBAR --> S3[🕐 Business Hours<br/>Open 24 hours]
    SIDEBAR --> S4[✅ Background Check Badge]

    %% Footer Section
    PROFILE --> FOOTER[📝 Contact Info Section]
    FOOTER --> F1[📞 Phone: 908-867-8200]
    FOOTER --> F2[✉️ Email: getsnakednj@gmail.com]
    FOOTER --> F3[🌐 Website: getsnaked.com]
    FOOTER --> F4[📍 Address: 162 Elmora Ave]

    %% Additional Info
    PROFILE --> EXTRA[🎓 Credentials & Info]
    EXTRA --> E1[📜 Licenses<br/>Licensed drain specialist]
    EXTRA --> E2[🏆 Certifications<br/>Video inspection certified]
    EXTRA --> E3[💳 Payment Methods<br/>Cash, Credit, Debit]
    EXTRA --> E4[📱 Social Media<br/>Facebook, Instagram]

    %% Styling
    classDef main fill:#3B82F6,stroke:#2563EB,color:#fff
    classDef sidebar fill:#10B981,stroke:#059669,color:#fff
    classDef footer fill:#F59E0B,stroke:#D97706,color:#000

    class HEADER,MAIN main
    class SIDEBAR sidebar
    class FOOTER,EXTRA footer
```

---

## 📍 City Service Page Structure (Elizabeth Plumbing Example)

```mermaid
graph TD
    CITY[City Service Page<br/>/new-jersey/union/elizabeth/plumbing]

    %% Header
    CITY --> BREAD[🍞 Breadcrumb Navigation<br/>Home > NJ > Union > Elizabeth > Plumbing]
    CITY --> HERO[🎨 Hero Section]
    HERO --> H1[Top Plumbing Companies<br/>in Elizabeth, NJ]
    HERO --> H2[5 Verified Businesses<br/>4.8★ Average, 121+ Reviews]
    HERO --> H3[Trust Badges<br/>Background Checked, Licensed, 24/7]

    %% Business Listings
    CITY --> LIST[📋 Business Listings 5 Cards]
    LIST --> B1[#1 Get Snaked<br/>⭐ 4.9 97 reviews<br/>📍 162 Elmora Ave<br/>💰 $145 service call<br/>📞 908-867-8200<br/>🏆 Top Rated, 24/7, Specialists]
    LIST --> B2[#2 Grand Plumber<br/>⭐ 4.7 15 reviews<br/>📍 1157 Elizabeth Ave<br/>💰 Call for quote<br/>🏆 Licensed Pro]
    LIST --> B3[#3 HELP Plumbing<br/>⭐ 5.0 8 reviews<br/>📍 1135 Anna St<br/>💰 Fair rates<br/>🏆 Exceptional, 25 Years]
    LIST --> B4[#4 Elizabeth Plumbers<br/>⭐ 5.0 1 review<br/>📍 56 Broad St<br/>🏆 24/7 Emergency]
    LIST --> B5[#5 Regal Plumbers<br/>📍 27-33 Jefferson Ave<br/>🏆 20 Years Experience]

    %% Each Business Card Components
    B1 --> CARD[Business Card Template]
    CARD --> C1[Left: Info<br/>• Name, Rating, Reviews<br/>• Address in Elizabeth<br/>• Specialties grid<br/>• Featured review]
    CARD --> C2[Right: CTA<br/>• View Full Profile button<br/>• Call Now button<br/>• Background check badge]

    %% Trust Section
    CITY --> TRUST[✅ Why Choose BKND Trusted]
    TRUST --> T1[Verified Professionals<br/>Background checked]
    TRUST --> T2[Top-Rated Service<br/>Real customer reviews]
    TRUST --> T3[24/7 Availability<br/>Emergency services]

    %% Styling
    classDef hero fill:#1E3A8A,stroke:#1E40AF,color:#fff,stroke-width:2px
    classDef business fill:#F59E0B,stroke:#D97706,color:#000
    classDef trust fill:#10B981,stroke:#059669,color:#fff

    class HERO,H1,H2,H3 hero
    class B1,B2,B3,B4,B5 business
    class TRUST,T1,T2,T3 trust
```

---

## 🔄 Data Flow Architecture

```mermaid
flowchart TB
    %% User Request
    USER[👤 User Browser Request]

    %% Next.js Routing
    USER --> NEXTJS[⚡ Next.js App Router<br/>Route Matching]

    %% Server-Side Rendering
    NEXTJS --> SSR[🖥️ Server Component<br/>SSR/SSG]

    %% Data Sources
    SSR --> DATA{📊 Data Layer}
    DATA --> STATIC[📄 Static Data<br/>elizabeth-plumbers-data.ts<br/>✅ Currently Used]
    DATA --> MOCK[🎭 Mock Data<br/>mock-data.ts<br/>For development]
    DATA --> DB[(🗄️ PostgreSQL + PostGIS<br/>Future: Real Database)]

    %% Component Rendering
    STATIC --> RENDER[🎨 Component Tree]
    RENDER --> SERVER[Server Components<br/>• Layout<br/>• Page content<br/>• SEO metadata]
    RENDER --> CLIENT[Client Components<br/>'use client'<br/>• Search bar<br/>• Interactive filters<br/>• Maps]

    %% Final Output
    SERVER --> HTML[📝 HTML + Metadata]
    CLIENT --> HYDRATE[💧 Client Hydration]
    HTML --> OUTPUT
    HYDRATE --> OUTPUT

    OUTPUT[🌐 Final Page Output]
    OUTPUT --> SEO[🔍 SEO Elements<br/>• Meta tags<br/>• JSON-LD schema<br/>• Sitemap entry]
    OUTPUT --> CONTENT[📄 Page Content<br/>• Business cards<br/>• Reviews<br/>• Contact info]

    %% User Interaction
    CONTENT --> INTERACT[👆 User Interaction]
    INTERACT --> CLICK1[Click View Profile]
    INTERACT --> CLICK2[Click Call Now]
    INTERACT --> CLICK3[Search/Filter]

    CLICK1 --> NEXTJS
    CLICK2 --> PHONE[📞 Phone Call]
    CLICK3 --> NEXTJS

    %% Styling
    classDef userFlow fill:#8B5CF6,stroke:#7C3AED,color:#fff
    classDef processing fill:#3B82F6,stroke:#2563EB,color:#fff
    classDef data fill:#10B981,stroke:#059669,color:#fff
    classDef output fill:#F59E0B,stroke:#D97706,color:#000

    class USER,INTERACT userFlow
    class NEXTJS,SSR,RENDER,SERVER,CLIENT processing
    class DATA,STATIC,MOCK,DB data
    class OUTPUT,SEO,CONTENT output
```

---

## 🎨 Component Hierarchy (Design System)

```mermaid
graph TD
    ROOT[🎨 Design System]

    %% Tailwind Config
    ROOT --> TAILWIND[⚙️ tailwind.config.ts<br/>Design Tokens]
    TAILWIND --> COLORS[🎨 Color Palette<br/>• brand-* Metallic Blue<br/>• success-* Green<br/>• featured-* Gold<br/>• neutral-* Grays]
    TAILWIND --> TYPO[📝 Typography Scale<br/>• display-* 48-60px<br/>• h1-h3 24-36px<br/>• body-* 14-18px]

    %% Component Libraries
    ROOT --> ACTIVE[✅ Active Components]
    ROOT --> LEGACY[❌ Legacy Do Not Use]

    %% Active Components
    ACTIVE --> UI[components/ui/<br/>Primitives]
    UI --> UI1[Button.tsx]
    UI --> UI2[Badge.tsx]
    UI --> UI3[Card.tsx]
    UI --> UI4[Input.tsx]
    UI --> UI5[Skeleton.tsx]

    ACTIVE --> PROF[components/Professional*<br/>Current Design System]
    PROF --> P1[ProfessionalHero.tsx]
    PROF --> P2[ProfessionalCard.tsx]
    PROF --> P3[ProfessionalBadge.tsx]

    ACTIVE --> FEATURE[components/ Features]
    FEATURE --> F1[SearchBar.tsx]
    FEATURE --> F2[TrustBanner.tsx]
    FEATURE --> F3[BusinessCard.tsx]
    FEATURE --> F4[ReviewCard.tsx]

    %% Legacy (Don't Use)
    LEGACY --> OLD1[components/aurora/<br/>❌ Old Design]
    LEGACY --> OLD2[components/premium/<br/>❌ Old Design]

    %% Page Usage
    UI1 --> PAGES[Used in All Pages]
    P1 --> PAGES
    F3 --> PAGES

    %% Styling
    classDef active fill:#10B981,stroke:#059669,color:#fff,stroke-width:2px
    classDef legacy fill:#EF4444,stroke:#DC2626,color:#fff
    classDef config fill:#3B82F6,stroke:#2563EB,color:#fff

    class ACTIVE,UI,PROF,FEATURE,UI1,UI2,UI3,P1,P2,F1,F2,F3 active
    class LEGACY,OLD1,OLD2 legacy
    class TAILWIND,COLORS,TYPO config
```

---

## 🚀 Scalability Roadmap

```mermaid
gantt
    title BKND Trusted - Growth Roadmap
    dateFormat YYYY-MM-DD

    section Phase 1: Foundation
    Homepage & Design System        :done, p1a, 2025-09-15, 2025-10-01
    Elizabeth NJ Plumbing Page      :done, p1b, 2025-10-01, 2025-10-07
    5 Business Profiles             :done, p1c, 2025-10-07, 2025-10-07

    section Phase 2: NJ Expansion
    Add 10 NJ Cities                :active, p2a, 2025-10-08, 2025-10-22
    Add 5 Services per City         :p2b, 2025-10-15, 2025-10-29
    50 Pages Total                  :milestone, m1, 2025-10-29, 0d

    section Phase 3: Regional Expansion
    NY, PA, CT States               :p3a, 2025-11-01, 2025-11-30
    Major Metros NYC, PHL, BOS      :p3b, 2025-11-15, 2025-12-15
    500 Pages Total                 :milestone, m2, 2025-12-15, 0d

    section Phase 4: National Scale
    All 50 States                   :p4a, 2026-01-01, 2026-03-31
    Top 100 Cities per State        :p4b, 2026-02-01, 2026-04-30
    Database Migration PostgreSQL   :p4c, 2026-01-15, 2026-02-15
    50,000+ Pages                   :milestone, m3, 2026-04-30, 0d
```

---

**Color Legend:**
- 🔵 **Blue** = Main pages / Core features
- 🟢 **Green** = City service pages / Active content
- 🟡 **Orange** = Business profiles / Conversion points
- 🔴 **Red** = Call-to-action / Conversion events
- 🟣 **Purple** = Entry points / Traffic sources

---

*Flowchart Version: 1.0 | Generated: October 7, 2025*

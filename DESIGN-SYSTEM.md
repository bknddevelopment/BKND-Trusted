# BKND Trusted Design System v2.0
## Comprehensive Design Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Design Principles](#design-principles)
3. [Visual Identity](#visual-identity)
4. [Design Tokens](#design-tokens)
5. [Typography](#typography)
6. [Components](#components)
7. [Animation Patterns](#animation-patterns)
8. [Accessibility Guidelines](#accessibility-guidelines)
9. [Performance Best Practices](#performance-best-practices)
10. [Testing Guidelines](#testing-guidelines)

---

## Introduction

The BKND Trusted Design System is a comprehensive set of design tokens, components, and patterns that ensure consistency, accessibility, and performance across the entire platform. Built with React, TypeScript, and Tailwind CSS, it provides a foundation for building trust through design.

### Core Technologies
- **React 18+** - Component library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Heroicons** - Icon system
- **Next.js 13+** - Framework

### Design Philosophy
Our design system embodies trust, professionalism, and accessibility. Every component is built with:
- **Clarity First** - Clear visual hierarchy and intuitive interactions
- **Trust Signals** - Visual elements that build confidence
- **Performance** - Optimized for Core Web Vitals
- **Accessibility** - WCAG 2.1 AA compliant

---

## Design Principles

### 1. Trust Through Design
Every element should reinforce trust and credibility:
- Consistent use of verification badges
- Clear status indicators
- Professional color palette
- Reliable interaction patterns

### 2. Progressive Enhancement
Start with a solid foundation and enhance:
- Mobile-first responsive design
- Reduced motion support
- Fallback states for all components
- Graceful degradation

### 3. Accessibility by Default
Every component is accessible:
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance (WCAG AA)

---

## Visual Identity

## 🎨 COLOR PALETTE - "Midnight Trust"

### Primary Colors - Deep & Sophisticated
```css
/* HERO GRADIENT BASE - Layered depth with rich purple undertones */
--midnight-deep: #0A0E27;      /* Deep space blue - primary dark */
--midnight-rich: #1A1F4E;      /* Rich midnight - secondary dark */
--aurora-purple: #6366F1;      /* Electric purple - accent */
--aurora-glow: #818CF8;        /* Bright purple - hover states */

/* TRUST SIGNALS - Warm metallics */
--trust-gold: #FFB340;         /* Warm gold - premium/featured */
--trust-copper: #E85D04;       /* Copper orange - CTAs */
--trust-bronze: #D97706;       /* Bronze - secondary actions */

/* VERIFICATION - Jade system */
--verify-jade: #10B981;        /* Primary verification */
--verify-mint: #6EE7B7;        /* Light verification */
--verify-forest: #065F46;      /* Deep verification */

/* NEUTRALS - Warm grays */
--surface-pearl: #FAFAF9;      /* Warm white */
--surface-sand: #F5F5F4;       /* Light gray */
--surface-stone: #E7E5E4;      /* Medium gray */
--text-charcoal: #1C1917;      /* Primary text */
--text-smoke: #57534E;         /* Secondary text */
```

### Gradient Systems
```css
/* HERO GRADIENT - Multi-layered aurora effect */
.hero-aurora {
  background:
    linear-gradient(135deg, #0A0E27 0%, #1A1F4E 25%, #2E3478 50%, #6366F1 100%),
    radial-gradient(ellipse at top left, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at bottom right, rgba(255, 179, 64, 0.15) 0%, transparent 60%);
}

/* TRUST GRADIENT - Warm metallic shimmer */
.trust-shimmer {
  background: linear-gradient(
    90deg,
    #FFB340 0%,
    #FFCF86 20%,
    #FFB340 40%,
    #E85D04 60%,
    #FFB340 80%,
    #FFCF86 100%
  );
  background-size: 200% 100%;
  animation: shimmer-flow 3s ease-in-out infinite;
}

/* GLASS CARDS - Frosted glass with aurora hints */
.glass-card {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
  backdrop-filter: blur(10px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.18);
}
```

---

## 🔤 TYPOGRAPHY HIERARCHY

### Font Stack
```css
/* PRIMARY - Modern & Clean */
font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;

/* DISPLAY - Bold & Distinctive */
font-family: 'Clash Display', 'Plus Jakarta Sans', sans-serif;

/* MONO - Technical details */
font-family: 'JetBrains Mono', 'Courier New', monospace;
```

### Type Scale
```css
/* DISPLAY - Hero headlines */
.display-hero {
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.04em;
  font-family: 'Clash Display';
}

/* HEADINGS */
.h1 {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}
.h2 {
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 600;
  line-height: 1.2;
}
.h3 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 600;
  line-height: 1.3;
}

/* BODY */
.body-large { font-size: 1.125rem; line-height: 1.75; }
.body-base { font-size: 1rem; line-height: 1.6; }
.body-small { font-size: 0.875rem; line-height: 1.5; }

/* SPECIAL */
.trust-badge-text {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
```

---

## 🎭 ANIMATION PRINCIPLES

### Micro-interactions
```css
/* SMOOTH ELASTIC - Buttons & Cards */
@keyframes elastic-scale {
  0% { transform: scale(1); }
  30% { transform: scale(1.05); }
  60% { transform: scale(0.98); }
  100% { transform: scale(1); }
}

/* AURORA FLOW - Background gradients */
@keyframes aurora-flow {
  0% {
    background-position: 0% 50%;
    filter: hue-rotate(0deg);
  }
  50% {
    background-position: 100% 50%;
    filter: hue-rotate(10deg);
  }
  100% {
    background-position: 0% 50%;
    filter: hue-rotate(0deg);
  }
}

/* TRUST PULSE - Verification badges */
@keyframes trust-pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 0 20px rgba(16, 185, 129, 0);
    transform: scale(1.05);
  }
}

/* CARD HOVER - 3D lift effect */
.card-hover-lift {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
}
.card-hover-lift:hover {
  transform: translateY(-8px) rotateX(-2deg) scale(1.02);
  box-shadow:
    0 30px 60px -15px rgba(10, 14, 39, 0.3),
    0 0 40px -10px rgba(99, 102, 241, 0.2);
}
```

### Timing Functions
```css
--ease-smooth: cubic-bezier(0.4, 0.0, 0.2, 1);
--ease-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-bounce: cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

---

## 🎯 COMPONENT PATTERNS

### Hero Section - "Aurora Cascade"
```css
.hero-aurora-cascade {
  position: relative;
  min-height: 100vh;
  background:
    linear-gradient(175deg, #0A0E27 0%, #1A1F4E 40%, #2E3478 70%, #6366F1 100%);
  overflow: hidden;
}

.hero-aurora-cascade::before {
  content: '';
  position: absolute;
  width: 200%;
  height: 200%;
  top: -100%;
  left: -50%;
  background:
    radial-gradient(circle at 20% 80%, rgba(255, 179, 64, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(129, 140, 248, 0.1) 0%, transparent 50%);
  animation: aurora-flow 20s ease infinite;
}

.hero-floating-badges {
  position: absolute;
  animation: float-gentle 6s ease-in-out infinite;
}
```

### Glass Card System
```css
.glass-card-premium {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 179, 64, 0.05) 100%
  );
  backdrop-filter: blur(12px) saturate(200%);
  border: 1px solid rgba(255, 179, 64, 0.2);
  box-shadow:
    0 8px 32px rgba(31, 38, 135, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.glass-card-premium::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 179, 64, 0.3),
    transparent
  );
  transition: left 0.6s ease;
}

.glass-card-premium:hover::before {
  left: 100%;
}
```

### Trust Indicator Visual System
```css
.trust-indicator {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  background: linear-gradient(135deg, #10B981, #6EE7B7);
  border-radius: 100px;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
  animation: trust-pulse 3s ease-in-out infinite;
}

.trust-indicator::after {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(135deg, #10B981, #065F46);
  border-radius: 100px;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.trust-indicator:hover::after {
  opacity: 1;
}

.verified-checkmark {
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: check-rotate 8s linear infinite;
}
```

---

## 📱 RESPONSIVE BREAKPOINTS

```css
/* Mobile First Strategy */
--breakpoint-xs: 320px;   /* Small phones */
--breakpoint-sm: 640px;   /* Large phones */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Small laptops */
--breakpoint-xl: 1280px;  /* Desktop */
--breakpoint-2xl: 1536px; /* Large desktop */

/* Container Widths */
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .container { max-width: 640px; }
}
@media (min-width: 768px) {
  .container { max-width: 768px; padding: 0 1.5rem; }
}
@media (min-width: 1024px) {
  .container { max-width: 1024px; padding: 0 2rem; }
}
@media (min-width: 1280px) {
  .container { max-width: 1280px; }
}
```

---

## 🎪 UNIQUE VISUAL MOTIFS

### 1. "Trust Rings" - Concentric circles indicating verification levels
```css
.trust-rings {
  position: relative;
  width: 60px;
  height: 60px;
}

.trust-ring {
  position: absolute;
  border: 2px solid;
  border-radius: 50%;
  animation: ring-pulse 2s ease-in-out infinite;
}

.trust-ring:nth-child(1) {
  inset: 0;
  border-color: rgba(16, 185, 129, 0.8);
  animation-delay: 0s;
}
.trust-ring:nth-child(2) {
  inset: 8px;
  border-color: rgba(16, 185, 129, 0.6);
  animation-delay: 0.2s;
}
.trust-ring:nth-child(3) {
  inset: 16px;
  border-color: rgba(16, 185, 129, 0.4);
  animation-delay: 0.4s;
}
```

### 2. "Community Mesh" - Network visualization
```css
.community-mesh {
  background-image:
    radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 40%),
    radial-gradient(circle at 80% 80%, rgba(255, 179, 64, 0.1) 0%, transparent 40%),
    radial-gradient(circle at 15% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 40%),
    url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l30 30m0-30L0 30m30 0l30 30m0-30L30 30' stroke='%23e7e5e4' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E");
}
```

### 3. "Quality Seal" - Premium badge system
```css
.quality-seal {
  position: relative;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #FFB340, #E85D04);
  clip-path: polygon(
    50% 0%, 61% 35%, 98% 35%, 68% 57%,
    79% 91%, 50% 70%, 21% 91%, 32% 57%,
    2% 35%, 39% 35%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 4px 20px rgba(255, 179, 64, 0.4));
  animation: seal-rotate 10s linear infinite;
}
```

---

## 🎬 IMPLEMENTATION PRIORITY

### Week 1 - Foundation
1. **Color Token Migration**
   - Replace all #1E40AF with aurora-purple (#6366F1)
   - Implement midnight gradient system
   - Add warm metallics for trust signals

2. **Typography Update**
   - Install Plus Jakarta Sans & Clash Display
   - Implement new type scale
   - Update all heading components

3. **Glass Card System**
   - Create glass-card components
   - Add backdrop-filter effects
   - Implement hover animations

4. **Hero Transformation**
   - Build aurora cascade background
   - Add floating badge animations
   - Implement parallax scrolling

5. **Trust Visual System**
   - Design trust rings component
   - Create quality seal badges
   - Build verification indicators

---

## 🚀 DISTINCTIVE FEATURES

1. **Aurora Gradient System** - Dynamic, shifting gradients that create depth
2. **Glass Morphism Cards** - Premium feel with blur and transparency
3. **Trust Rings** - Unique verification visualization
4. **Warm Metallic Accents** - Gold/copper instead of generic green
5. **Elastic Micro-interactions** - Playful, responsive animations
6. **Community Mesh Pattern** - Subtle network visualization
7. **Quality Seals** - Star-shaped premium badges
8. **Floating Elements** - Gentle parallax and float animations

This design system transforms BKND Trusted from a generic marketplace to a premium, trustworthy platform with a distinctive midnight/aurora aesthetic that stands out in the market.

---

## Design Tokens

### Accessible Color System (WCAG AA Compliant)

In addition to the aesthetic "Midnight Trust" palette, we maintain accessible color tokens for production use:

#### Brand Colors (WCAG AA Compliant)
```css
/* Primary Brand Palette - Accessible variants */
--trust-deep: #0F172A;          /* Deep Trust Blue (15.4:1 on white) */
--trust-action: #1E40AF;        /* Action Blue (7.59:1 on white) */
--trust-action-hover: #1e3a8a;  /* Hover state (9.51:1 on white) */
--trust-verified: #10B981;      /* Verified Green */
--trust-verified-dark: #059669;  /* Text variant (5.28:1 on white) */
--trust-gold: #F59E0B;          /* Premium Gold */
--trust-gold-text: #92400e;     /* Gold text (6.48:1 on white) */
```

#### Text Colors (WCAG AA Compliant)
```css
/* Typography color tokens - All meet WCAG AA standards */
--text-primary: #0F172A;        /* Primary text (15.4:1 on white) */
--text-secondary: #374151;      /* Secondary text (7.43:1 on white) */
--text-muted: #4b5563;          /* Muted text (5.36:1 on white) */
--text-disabled: #9ca3af;       /* Disabled state */
--text-inverse: #ffffff;        /* Text on dark backgrounds */
```

#### Focus Tokens
```css
/* Enhanced focus indicators for accessibility */
--focus-ring-color: #1E40AF;
--focus-ring-offset: 2px;
--focus-ring-width: 3px;

/* High contrast mode */
@media (prefers-contrast: high) {
  --focus-ring-width: 4px;
  --focus-ring-color: #000000;
}
```

---

## Components

### Component Library Overview

Our component library follows atomic design principles, building from simple atoms to complex organisms.

### Button Component

#### Props Interface
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
}
```

#### Usage Examples
```jsx
// Primary CTA
<Button variant="primary" size="lg" icon={<ArrowRightIcon />}>
  Get Free Quote
</Button>

// Loading State
<Button variant="secondary" loading>
  Processing...
</Button>

// Accessible Implementation
<Button
  variant="primary"
  ariaLabel="Get free quote for plumbing service"
  onClick={handleQuoteRequest}
>
  Get Free Quote
</Button>
```

#### Style Implementation
```css
.btn {
  @apply inline-flex items-center justify-center font-semibold;
  @apply transition-all duration-200 ease-out;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
  @apply relative overflow-hidden rounded-lg;
  min-height: 44px; /* WCAG touch target */
  min-width: 44px;
}

/* Focus state for accessibility */
.btn:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
  box-shadow: 0 0 0 4px rgba(30, 64, 175, 0.1);
}
```

### Trust Badge Component

#### Props Interface
```typescript
interface TrustBadgeProps {
  type: 'verified' | 'insured' | 'licensed' | 'rated' | 'fast';
  label: string;
  value?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  glowEffect?: boolean;
}
```

#### Component Implementation
```jsx
const TrustBadge: React.FC<TrustBadgeProps> = ({
  type,
  label,
  value,
  size = 'md',
  animated = true,
  glowEffect = false
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <div
      className={`
        trust-badge
        ${sizeClasses[size]}
        ${animated ? 'animate-fade-in' : ''}
        ${glowEffect ? 'trust-badge-glow' : ''}
      `}
      role="status"
      aria-label={`${label} ${value || ''}`}
    >
      <Icon type={type} />
      <div>
        <span className="font-semibold">{label}</span>
        {value && <span className="text-muted">{value}</span>}
      </div>
    </div>
  );
};
```

### Business Card Component

#### Props Interface
```typescript
interface BusinessCardProps {
  business: Business;
  variant?: 'default' | 'featured' | 'compact';
  onQuoteRequest?: () => void;
  onViewDetails?: () => void;
  interactive?: boolean;
}
```

#### Accessible Implementation
```jsx
<article
  className="business-card"
  aria-label={`${business.name} - ${business.category}`}
>
  <div className="business-card-image">
    <img
      src={business.image}
      alt={`${business.name} storefront`}
      loading="lazy"
    />
  </div>

  <div className="business-card-content">
    <header>
      <h3>{business.name}</h3>
      {business.verified && (
        <span role="img" aria-label="Verified business">✓</span>
      )}
    </header>

    <div aria-label={`Rating: ${business.rating} out of 5`}>
      <StarRating value={business.rating} />
      <span>({business.reviewCount} reviews)</span>
    </div>

    <button
      onClick={onQuoteRequest}
      aria-label={`Get free quote from ${business.name}`}
      className="btn-primary"
    >
      Get Free Quote
    </button>
  </div>
</article>
```

---

## Animation Patterns

### Animation Cookbook

#### Staggered List Animation
```jsx
const StaggeredList = ({ items }) => (
  <ul>
    {items.map((item, index) => (
      <li
        key={item.id}
        className="animate-slide-up"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {item.content}
      </li>
    ))}
  </ul>
);
```

#### Skeleton Loading
```jsx
const SkeletonCard = () => (
  <div className="card skeleton">
    <div className="h-48 bg-surface-subtle rounded-t-xl animate-shimmer" />
    <div className="p-6 space-y-3">
      <div className="h-4 w-3/4 bg-surface-subtle rounded animate-shimmer" />
      <div className="h-4 w-1/2 bg-surface-subtle rounded animate-shimmer" />
      <div className="h-8 w-full bg-surface-subtle rounded animate-shimmer" />
    </div>
  </div>
);
```

#### Page Transitions
```jsx
const PageTransition = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`
      transition-all duration-500
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
    `}>
      {children}
    </div>
  );
};
```

#### Number Counter Animation
```jsx
const AnimatedCounter = ({ value, duration = 1000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start > end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count.toLocaleString()}</span>;
};
```

---

## Accessibility Guidelines

### WCAG 2.1 AA Compliance

#### Color Contrast Requirements
| Element Type | Minimum Ratio | Example |
|--------------|---------------|---------|
| Normal text (< 18pt) | 4.5:1 | Body text |
| Large text (≥ 18pt) | 3:1 | Headings |
| Interactive elements | 3:1 | Buttons, links |
| Disabled elements | No minimum | Disabled buttons |
| Decorative elements | No requirement | Background patterns |

#### Focus Management
```css
/* Never remove focus indicators */
*:focus {
  outline: none; /* Only if providing alternative */
}

*:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
  transition: outline-offset 0.2s ease;
}

/* Skip to content link */
.skip-to-content {
  @apply absolute left-0 top-0 -translate-y-full;
  @apply focus:translate-y-0;
  @apply bg-trust-action text-white px-4 py-2;
  @apply z-[100] transition-transform duration-200;
}
```

#### ARIA Implementation Patterns

##### Navigation
```jsx
<nav aria-label="Main navigation">
  <ul role="list">
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/services">Services</a></li>
  </ul>
</nav>
```

##### Forms
```jsx
<form aria-labelledby="contact-form-title">
  <h2 id="contact-form-title">Contact Us</h2>

  <label htmlFor="email">
    Email Address
    <span aria-label="required">*</span>
  </label>
  <input
    id="email"
    type="email"
    aria-required="true"
    aria-invalid={hasError}
    aria-describedby={hasError ? "email-error" : undefined}
  />
  {hasError && (
    <span id="email-error" role="alert" className="error-message">
      Please enter a valid email address
    </span>
  )}
</form>
```

##### Live Regions
```jsx
// Status updates
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

// Error messages
<div aria-live="assertive" role="alert">
  {errorMessage}
</div>

// Loading states
<div aria-busy={isLoading} aria-label="Loading results">
  {isLoading && <Spinner />}
  {content}
</div>
```

#### Keyboard Navigation Requirements

| Component | Key | Action |
|-----------|-----|--------|
| Button | Enter/Space | Activate |
| Link | Enter | Navigate |
| Modal | Escape | Close |
| Dropdown | Arrow keys | Navigate options |
| Tabs | Arrow keys | Switch tabs |
| Carousel | Arrow keys | Navigate slides |

#### Screen Reader Best Practices
```jsx
// Visually hidden but readable
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

// Icon buttons
<button aria-label="Close dialog">
  <XIcon aria-hidden="true" />
</button>

// Decorative images
<img src="decoration.jpg" alt="" role="presentation" />

// Informative images
<img src="chart.jpg" alt="Sales increased 25% in Q4 2024" />
```

---

## Performance Best Practices

### Component Optimization

#### Code Splitting
```jsx
// Route-based splitting
const AdminPanel = lazy(() => import('./AdminPanel'));

// Component-based splitting
const HeavyChart = lazy(() =>
  import(/* webpackChunkName: "charts" */ './HeavyChart')
);

// With loading boundary
<Suspense fallback={<Skeleton />}>
  <HeavyChart data={data} />
</Suspense>
```

#### Memoization
```jsx
// Memoize expensive components
const ExpensiveList = memo(({ items }) => {
  return items.map(item => <Item key={item.id} {...item} />);
});

// Memoize expensive calculations
const processedData = useMemo(
  () => expensiveProcessing(rawData),
  [rawData]
);

// Memoize callbacks
const handleClick = useCallback(
  (id) => {
    doSomething(id);
  },
  [dependency]
);
```

#### Virtualization
```jsx
import { FixedSizeList } from 'react-window';

const VirtualList = ({ items }) => (
  <FixedSizeList
    height={600}
    itemCount={items.length}
    itemSize={80}
    width="100%"
    overscanCount={5}
  >
    {({ index, style }) => (
      <div style={style}>
        {items[index].name}
      </div>
    )}
  </FixedSizeList>
);
```

### Image Optimization

```jsx
// Next.js Image with all optimizations
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1920}
  height={1080}
  priority // For above-fold images
  placeholder="blur"
  blurDataURL={dataUrl}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  quality={85}
/>

// Lazy loading for below-fold images
<Image
  src="/feature.jpg"
  alt="Feature"
  loading="lazy"
  decoding="async"
/>
```

### CSS Performance

```css
/* Use CSS containment */
.card {
  contain: layout style paint;
}

/* Hardware acceleration for animations */
.animated {
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Avoid expensive selectors */
/* Bad */
.header > nav > ul > li > a:hover { }

/* Good */
.nav-link:hover { }
```

---

## Testing Guidelines

### Accessibility Testing Checklist

#### Automated Testing
```javascript
// Jest + Testing Library
describe('Button', () => {
  it('should be keyboard accessible', () => {
    const { getByRole } = render(<Button>Click me</Button>);
    const button = getByRole('button');

    button.focus();
    expect(button).toHaveFocus();

    fireEvent.keyDown(button, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalled();
  });

  it('should have proper ARIA attributes', () => {
    const { getByRole } = render(
      <Button disabled aria-label="Submit form">
        Submit
      </Button>
    );

    const button = getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Submit form');
    expect(button).toBeDisabled();
  });
});
```

#### Manual Testing Protocol
1. **Keyboard Navigation**
   - Tab through all interactive elements
   - Verify focus indicators are visible
   - Test Enter/Space activation
   - Verify Escape closes modals

2. **Screen Reader Testing**
   - Test with NVDA (Windows) or VoiceOver (Mac)
   - Verify all content is announced
   - Check form labels and errors
   - Test dynamic content updates

3. **Color Contrast**
   - Use browser DevTools or WAVE
   - Verify 4.5:1 for normal text
   - Verify 3:1 for large text
   - Test in high contrast mode

### Performance Testing

```javascript
// Lighthouse CI configuration
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        throttling: {
          cpuSlowdownMultiplier: 1,
        },
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
      },
    },
  },
};
```

---

## Component Status Matrix

| Component | Design | Development | Testing | Documentation | Accessibility |
|-----------|--------|-------------|---------|---------------|---------------|
| Button | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ✅ WCAG AA |
| Card | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ✅ WCAG AA |
| TrustBadge | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ✅ WCAG AA |
| BusinessCard | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ✅ WCAG AA |
| SearchBar | ✅ Complete | 🚧 In Progress | ⏳ Pending | 🚧 In Progress | 🚧 In Progress |
| CategoryCard | ✅ Complete | ✅ Complete | ✅ Complete | ✅ Complete | ✅ WCAG AA |
| Modal | 📋 Planned | ⏳ Pending | ⏳ Pending | ⏳ Pending | ⏳ Pending |
| Dropdown | 📋 Planned | ⏳ Pending | ⏳ Pending | ⏳ Pending | ⏳ Pending |

---

## Resources

### Design Tools
- [Figma Component Library](https://figma.com/@bknd-trusted)
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)
- [Stark (Figma Plugin)](https://www.getstark.co/)

### Development Resources
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Heroicons](https://heroicons.com)
- [Next.js Documentation](https://nextjs.org/docs)

### Accessibility Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [A11y Project](https://www.a11yproject.com/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Inclusive Components](https://inclusive-components.design/)
- [WebAIM](https://webaim.org/)

### Testing Tools
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Pa11y](https://pa11y.org/)
- [NVDA Screen Reader](https://www.nvaccess.org/)

### Performance Tools
- [Web.dev Measure](https://web.dev/measure/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)

---

*Last Updated: January 2025*
*Version: 2.0.0*
*Maintained by: BKND Trusted Design Team*
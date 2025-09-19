# BKND Trusted Design Token System Guide

## Overview

The BKND Trusted design token system provides a comprehensive set of CSS custom properties that ensure consistent design implementation across the entire platform. All styling should reference these tokens rather than using hardcoded values.

## Token Structure

### Color Tokens

#### Brand Colors
```css
/* Core brand palette */
--color-trust-deep: #0F172A;        /* Primary brand color */
--color-trust-action: #1E40AF;      /* CTAs, links, interactive elements */
--color-trust-verified: #10B981;    /* Success states, verification badges */
--color-trust-gold: #F59E0B;        /* Premium features, highlights */

/* Semantic colors - USE THESE for consistency */
--color-primary: var(--color-trust-action);
--color-secondary: var(--color-trust-verified);
--color-accent: var(--color-trust-gold);
```

#### Text Colors
```css
--color-text-primary: #0F172A;      /* Main body text */
--color-text-secondary: #475569;    /* Secondary information */
--color-text-muted: #64748b;        /* Disabled or less important text */
--color-text-inverse: #ffffff;      /* Text on dark backgrounds */
```

### Typography Tokens

```css
/* Font sizes - Use fluid typography for responsive design */
--font-size-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
--font-size-lg: clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem);
--font-size-xl: clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem);
--font-size-2xl: clamp(1.5rem, 1.35rem + 0.75vw, 1.875rem);
--font-size-3xl: clamp(1.875rem, 1.65rem + 1.125vw, 2.25rem);
--font-size-4xl: clamp(2.25rem, 1.95rem + 1.5vw, 3rem);

/* Font weights */
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Spacing Tokens

```css
/* Use consistent spacing scale */
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
```

### Effect Tokens

#### Shadows
```css
--shadow-sm: 0 1px 3px 0 rgba(15, 23, 42, 0.1);
--shadow-base: 0 4px 6px -1px rgba(15, 23, 42, 0.1);
--shadow-lg: 0 20px 25px -5px rgba(15, 23, 42, 0.1);
--shadow-xl: 0 25px 50px -12px rgba(15, 23, 42, 0.25);

/* Colored shadows */
--shadow-gold-glow: 0 0 20px rgba(245, 158, 11, 0.3);
--shadow-verified-glow: 0 0 15px rgba(16, 185, 129, 0.2);
```

#### Border Radius
```css
--radius-sm: 0.125rem;   /* 2px - Subtle rounding */
--radius-base: 0.25rem;  /* 4px - Default */
--radius-md: 0.375rem;   /* 6px - Cards */
--radius-lg: 0.5rem;     /* 8px - Buttons */
--radius-xl: 0.75rem;    /* 12px - Modals */
--radius-2xl: 1rem;      /* 16px - Large cards */
--radius-full: 9999px;   /* Pills, circles */
```

### Animation Tokens

```css
/* Durations */
--duration-fast: 150ms;
--duration-base: 250ms;
--duration-slow: 500ms;

/* Easings */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

## Implementation Examples

### ❌ WRONG - Hardcoded Values
```css
/* Don't do this */
.button {
  background-color: #1E40AF;
  padding: 16px 24px;
  border-radius: 8px;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

### ✅ CORRECT - Using Tokens
```css
/* Do this instead */
.button {
  background-color: var(--color-primary);
  padding: var(--space-4) var(--space-6);
  border-radius: var(--radius-lg);
  color: var(--color-text-inverse);
  box-shadow: var(--shadow-base);
}
```

### In React/JSX
```tsx
// ❌ WRONG
<div style={{ padding: '16px', backgroundColor: '#f8fafc' }}>

// ✅ CORRECT
<div style={{
  padding: 'var(--space-4)',
  backgroundColor: 'var(--color-surface-raised)'
}}>
```

### With Tailwind CSS
```jsx
// ❌ WRONG - Using arbitrary values
<div className="p-[16px] bg-[#1E40AF] rounded-[8px]">

// ✅ CORRECT - Using token-based classes
<div className="p-4 bg-trust-action rounded-lg">
```

## Theme Support

### Light/Dark Mode
The token system automatically adjusts for dark mode:

```css
/* Light mode (default) */
--color-surface-base: #ffffff;
--color-text-primary: #0F172A;

/* Dark mode (automatic) */
@media (prefers-color-scheme: dark) {
  --color-surface-base: #0f172a;
  --color-text-primary: #f1f5f9;
}
```

### Using the Theme Provider
```tsx
import { ThemeProvider, useTheme } from '@/components/ThemeProvider';

// Wrap your app
<ThemeProvider defaultTheme="system">
  <App />
</ThemeProvider>

// Use in components
const { theme, setTheme, toggleTheme } = useTheme();
```

## Token Categories

### 1. Core Tokens
Foundation tokens that define the base values:
- Colors (brand, neutral, semantic)
- Typography (fonts, sizes, weights)
- Spacing (consistent scale)
- Effects (shadows, borders, animations)

### 2. Semantic Tokens
Purpose-based tokens that reference core tokens:
- `--color-primary` → Interactive elements
- `--color-text-primary` → Main content
- `--color-surface-base` → Page background
- `--color-status-success` → Success states

### 3. Component Tokens
Specific tokens for components (defined in component files):
- Button variants
- Card styles
- Form inputs
- Navigation

## Migration Guide

### Step 1: Identify Violations
Search for hardcoded values:
```bash
# Find hex colors
grep -r "#[0-9A-Fa-f]{3,6}" --include="*.tsx" --include="*.css"

# Find pixel values
grep -r "[0-9]+px" --include="*.tsx" --include="*.css"

# Find rgb/rgba colors
grep -r "rgb\|rgba" --include="*.tsx" --include="*.css"
```

### Step 2: Map to Tokens
```css
/* Color mapping */
#1E40AF → var(--color-trust-action)
#10B981 → var(--color-trust-verified)
#F59E0B → var(--color-trust-gold)
#ffffff → var(--color-surface-base)

/* Spacing mapping */
4px → var(--space-1)
8px → var(--space-2)
16px → var(--space-4)
24px → var(--space-6)
32px → var(--space-8)

/* Shadow mapping */
box-shadow: 0 4px 6px rgba(0,0,0,0.1) → var(--shadow-base)
```

### Step 3: Update Components
Replace hardcoded values with tokens systematically.

## Best Practices

### 1. Always Use Semantic Tokens
Prefer semantic tokens over direct color values:
```css
/* Prefer semantic */
color: var(--color-text-primary);

/* Over direct */
color: var(--color-trust-deep);
```

### 2. Maintain Token Hierarchy
Don't skip the token system:
```css
/* ❌ WRONG - Modifying token values */
--color-primary: #custom-color;

/* ✅ CORRECT - Use existing tokens or request new ones */
--color-primary: var(--color-trust-action);
```

### 3. Responsive Design
Use fluid typography tokens:
```css
font-size: var(--font-size-lg); /* Automatically responsive */
```

### 4. Dark Mode Support
Ensure all colors have dark mode variants:
```css
/* Component automatically adapts */
background: var(--color-surface-base);
color: var(--color-text-primary);
```

## Validation Checklist

Before committing code, ensure:
- [ ] No hardcoded color values (#hex, rgb, hsl)
- [ ] No hardcoded spacing (px, rem, em)
- [ ] All shadows use token values
- [ ] Border radius uses tokens
- [ ] Typography uses size tokens
- [ ] Animations use duration/easing tokens
- [ ] Dark mode is properly supported
- [ ] Semantic tokens are used appropriately

## Tools & Enforcement

### ESLint Rules
```javascript
// .eslintrc.js
{
  rules: {
    'no-restricted-syntax': [
      'error',
      {
        selector: 'Literal[value=/^#[0-9A-Fa-f]{3,6}$/]',
        message: 'Use design tokens instead of hardcoded colors'
      }
    ]
  }
}
```

### Stylelint Rules
```javascript
// .stylelintrc.js
{
  rules: {
    'declaration-property-value-disallowed-list': {
      '/^(color|background)$/': [/^#/, /^rgb/, /^hsl/],
      '/^(padding|margin)$/': [/^\d+px$/]
    }
  }
}
```

## Questions & Support

For questions about the design token system:
1. Check this guide first
2. Review `/styles/tokens.css` for all available tokens
3. Consult with the design team before adding new tokens
4. Never modify core tokens without approval

Remember: **Consistency is key!** Always use tokens, never hardcode values.
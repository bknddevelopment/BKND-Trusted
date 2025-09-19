'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// Theme types
export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  enableSystem?: boolean;
  disableTransition?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'bknd-theme',
  enableSystem = true,
  disableTransition = false
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');
  const [mounted, setMounted] = useState(false);

  // Get system theme preference
  const getSystemTheme = useCallback((): ResolvedTheme => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  // Apply theme to DOM
  const applyTheme = useCallback((theme: ResolvedTheme) => {
    const root = window.document.documentElement;

    // Remove existing theme classes
    root.classList.remove('light', 'dark');

    // Add new theme class
    root.classList.add(theme);

    // Update CSS variables dynamically
    if (theme === 'dark') {
      // Apply dark mode token overrides
      root.style.setProperty('--color-surface-base', '#0f172a');
      root.style.setProperty('--color-surface-raised', '#1e293b');
      root.style.setProperty('--color-surface-overlay', '#334155');
      root.style.setProperty('--color-surface-subtle', '#475569');
      root.style.setProperty('--color-text-primary', '#f1f5f9');
      root.style.setProperty('--color-text-secondary', '#cbd5e1');
      root.style.setProperty('--color-text-muted', '#94a3b8');
      root.style.setProperty('--color-text-disabled', '#64748b');
      root.style.setProperty('--color-text-inverse', '#0f172a');

      // Update brand colors for dark mode
      root.style.setProperty('--color-trust-action', '#60a5fa');
      root.style.setProperty('--color-trust-action-hover', '#3b82f6');
      root.style.setProperty('--color-trust-verified', '#34d399');
      root.style.setProperty('--color-trust-gold', '#fbbf24');
    } else {
      // Reset to light mode defaults
      root.style.setProperty('--color-surface-base', '#ffffff');
      root.style.setProperty('--color-surface-raised', '#f8fafc');
      root.style.setProperty('--color-surface-overlay', '#f1f5f9');
      root.style.setProperty('--color-surface-subtle', '#e2e8f0');
      root.style.setProperty('--color-text-primary', '#0F172A');
      root.style.setProperty('--color-text-secondary', '#475569');
      root.style.setProperty('--color-text-muted', '#64748b');
      root.style.setProperty('--color-text-disabled', '#94a3b8');
      root.style.setProperty('--color-text-inverse', '#ffffff');

      // Reset brand colors
      root.style.setProperty('--color-trust-action', '#1E40AF');
      root.style.setProperty('--color-trust-action-hover', '#1e3a8a');
      root.style.setProperty('--color-trust-verified', '#10B981');
      root.style.setProperty('--color-trust-gold', '#F59E0B');
    }

    // Set meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f172a' : '#ffffff');
    }
  }, []);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey) as Theme | null;
    const initialTheme = savedTheme || defaultTheme;

    setThemeState(initialTheme);

    const resolved = initialTheme === 'system' ? getSystemTheme() : initialTheme as ResolvedTheme;
    setResolvedTheme(resolved);
    applyTheme(resolved);

    setMounted(true);
  }, [storageKey, defaultTheme, getSystemTheme, applyTheme]);

  // Handle system theme changes
  useEffect(() => {
    if (!enableSystem || theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setResolvedTheme(newTheme);
      applyTheme(newTheme);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    // Legacy browsers
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [theme, enableSystem, applyTheme]);

  // Set theme function
  const setTheme = useCallback((newTheme: Theme) => {
    // Add transition disable class if needed
    if (!disableTransition) {
      const root = window.document.documentElement;
      root.classList.add('theme-transition');

      setTimeout(() => {
        root.classList.remove('theme-transition');
      }, 300);
    }

    // Save to localStorage
    localStorage.setItem(storageKey, newTheme);

    // Update state
    setThemeState(newTheme);

    // Resolve and apply theme
    const resolved = newTheme === 'system' ? getSystemTheme() : newTheme as ResolvedTheme;
    setResolvedTheme(resolved);
    applyTheme(resolved);
  }, [storageKey, getSystemTheme, applyTheme, disableTransition]);

  // Toggle theme function
  const toggleTheme = useCallback(() => {
    if (theme === 'system') {
      setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
    } else {
      setTheme(theme === 'light' ? 'dark' : 'light');
    }
  }, [theme, resolvedTheme, setTheme]);

  // Prevent flash of incorrect theme
  useEffect(() => {
    const root = window.document.documentElement;
    root.style.colorScheme = resolvedTheme;
  }, [resolvedTheme]);

  // Add global styles for theme transitions
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const style = document.createElement('style');
    style.innerHTML = `
      .theme-transition,
      .theme-transition *,
      .theme-transition *::before,
      .theme-transition *::after {
        transition: background-color 300ms ease, border-color 300ms ease, color 300ms ease !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Theme Toggle Button Component
export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className={`p-2 rounded-lg bg-surface-raised ${className}`}
        aria-label="Toggle theme"
      >
        <div className="w-5 h-5 bg-surface-subtle rounded animate-pulse" />
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        // Cycle through themes: light -> dark -> system -> light
        if (theme === 'light') setTheme('dark');
        else if (theme === 'dark') setTheme('system');
        else setTheme('light');
      }}
      className={`p-2 rounded-lg bg-surface-raised hover:bg-surface-overlay transition-colors ${className}`}
      aria-label={`Current theme: ${theme}. Click to change theme`}
    >
      {theme === 'system' ? (
        // System icon
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5 10a5 5 0 015-5v10a5 5 0 01-5-5z" clipRule="evenodd" />
        </svg>
      ) : resolvedTheme === 'dark' ? (
        // Moon icon
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      ) : (
        // Sun icon
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  );
}
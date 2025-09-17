'use client';

import { useEffect } from 'react';
import { onCLS, onFCP, onFID, onINP, onLCP, onTTFB, Metric } from 'web-vitals';

type MetricName = 'CLS' | 'FCP' | 'FID' | 'INP' | 'LCP' | 'TTFB';

interface WebVitalsMetric extends Metric {
  name: MetricName;
}

interface AnalyticsEvent {
  metric: MetricName;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  navigationType: string;
  url: string;
  timestamp: number;
}

// Thresholds based on Google's Web Vitals recommendations
const thresholds = {
  CLS: { good: 0.1, needsImprovement: 0.25 },
  FCP: { good: 1800, needsImprovement: 3000 },
  FID: { good: 100, needsImprovement: 300 },
  INP: { good: 200, needsImprovement: 500 },
  LCP: { good: 2500, needsImprovement: 4000 },
  TTFB: { good: 800, needsImprovement: 1800 },
};

function getRating(metric: MetricName, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = thresholds[metric];
  if (value <= threshold.good) return 'good';
  if (value <= threshold.needsImprovement) return 'needs-improvement';
  return 'poor';
}

function sendToAnalytics(metric: WebVitalsMetric) {
  const event: AnalyticsEvent = {
    metric: metric.name,
    value: metric.value,
    rating: getRating(metric.name, metric.value),
    delta: metric.delta,
    navigationType: metric.navigationType || 'unknown',
    url: window.location.href,
    timestamp: Date.now(),
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    const emoji = event.rating === 'good' ? '✅' : event.rating === 'needs-improvement' ? '⚠️' : '❌';
    console.log(`${emoji} ${metric.name}: ${metric.value.toFixed(2)} [${event.rating}]`);
  }

  // Send to Vercel Analytics
  if (window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      metric_rating: event.rating,
      metric_delta: Math.round(metric.delta),
      non_interaction: true,
    });
  }

  // Send to custom analytics endpoint
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    }).catch(() => {
      // Silently fail analytics
    });
  }

  // Store in session storage for debugging
  if (typeof window !== 'undefined' && window.sessionStorage) {
    const storedMetrics = JSON.parse(sessionStorage.getItem('webVitals') || '[]');
    storedMetrics.push(event);
    // Keep only last 50 metrics
    if (storedMetrics.length > 50) {
      storedMetrics.shift();
    }
    sessionStorage.setItem('webVitals', JSON.stringify(storedMetrics));
  }
}

// Performance observer for custom metrics
function observeCustomMetrics() {
  if (!('PerformanceObserver' in window)) return;

  // Observe long tasks (blocking main thread)
  try {
    const longTaskObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          console.warn(`Long task detected: ${entry.duration.toFixed(0)}ms`, entry);
        }
      }
    });
    longTaskObserver.observe({ entryTypes: ['longtask'] });
  } catch (e) {
    // Long task observer not supported
  }

  // Observe resource timing
  try {
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name && entry.entryType === 'resource') {
          const resourceEntry = entry as PerformanceResourceTiming;
          if (resourceEntry.duration > 1000) {
            console.warn(`Slow resource: ${entry.name} took ${resourceEntry.duration.toFixed(0)}ms`);
          }
        }
      }
    });
    resourceObserver.observe({ entryTypes: ['resource'] });
  } catch (e) {
    // Resource timing observer not supported
  }

  // Memory monitoring (Chrome only)
  if ('memory' in performance) {
    setInterval(() => {
      const memory = (performance as any).memory;
      if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
        console.warn('High memory usage detected', {
          used: `${(memory.usedJSHeapSize / 1048576).toFixed(2)}MB`,
          total: `${(memory.totalJSHeapSize / 1048576).toFixed(2)}MB`,
          limit: `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)}MB`,
        });
      }
    }, 30000); // Check every 30 seconds
  }
}

export function WebVitalsReporter() {
  useEffect(() => {
    // Core Web Vitals
    onCLS(sendToAnalytics);
    onFCP(sendToAnalytics);
    onFID(sendToAnalytics);
    onINP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);

    // Custom metrics
    observeCustomMetrics();

    // Report page load metrics
    if ('performance' in window && performance.timing) {
      window.addEventListener('load', () => {
        const timing = performance.timing;
        const navigationStart = timing.navigationStart;

        const metrics = {
          dns: timing.domainLookupEnd - timing.domainLookupStart,
          tcp: timing.connectEnd - timing.connectStart,
          request: timing.responseStart - timing.requestStart,
          response: timing.responseEnd - timing.responseStart,
          domProcessing: timing.domComplete - timing.domLoading,
          domContentLoaded: timing.domContentLoadedEventEnd - navigationStart,
          loadComplete: timing.loadEventEnd - navigationStart,
        };

        if (process.env.NODE_ENV === 'development') {
          console.log('Page Load Metrics:', metrics);
        }
      });
    }

    // Report if page is being throttled (background tab)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        console.log('Page moved to background - metrics may be throttled');
      }
    });
  }, []);

  return null;
}

// Export utility to get current metrics
export function getCurrentWebVitals(): AnalyticsEvent[] {
  if (typeof window !== 'undefined' && window.sessionStorage) {
    return JSON.parse(sessionStorage.getItem('webVitals') || '[]');
  }
  return [];
}

// Utility to clear stored metrics
export function clearWebVitals(): void {
  if (typeof window !== 'undefined' && window.sessionStorage) {
    sessionStorage.removeItem('webVitals');
  }
}

// Add TypeScript declarations for window
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
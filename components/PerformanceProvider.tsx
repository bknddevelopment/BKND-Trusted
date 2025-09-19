'use client';

import { useEffect, useState } from 'react';

interface PerformanceProviderProps {
  children: React.ReactNode;
  enableMonitoring?: boolean;
  enableAnimationMonitoring?: boolean;
  showMetricsOverlay?: boolean;
}

export default function PerformanceProvider({
  children,
  enableMonitoring = true,
  enableAnimationMonitoring = false,
  showMetricsOverlay = false
}: PerformanceProviderProps) {
  const [metrics, setMetrics] = useState<any>(null);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    if (!enableMonitoring) return;

    // Simple performance monitoring
    const logMetrics = () => {
      if (typeof window !== 'undefined' && window.performance) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const paint = performance.getEntriesByType('paint');

        const currentMetrics = {
          LCP: navigation?.loadEventEnd - navigation?.fetchStart || 0,
          FID: 0, // Would need real user interaction
          CLS: 0, // Would need layout shift observer
          TTFB: navigation?.responseStart - navigation?.fetchStart || 0,
        };

        setMetrics(currentMetrics);

        if (process.env.NODE_ENV === 'development') {
          console.log('Performance Metrics:', currentMetrics);
        }
      }
    };

    // Wait for page to fully load
    if (document.readyState === 'complete') {
      setTimeout(logMetrics, 1000);
    } else {
      window.addEventListener('load', () => {
        setTimeout(logMetrics, 1000);
      });
    }

    // Simple FPS monitoring
    if (enableAnimationMonitoring) {
      let frameCount = 0;
      let lastTime = performance.now();
      let rafId: number;

      const measureFPS = (currentTime: number) => {
        frameCount++;

        if (currentTime >= lastTime + 1000) {
          setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
          frameCount = 0;
          lastTime = currentTime;
        }

        rafId = requestAnimationFrame(measureFPS);
      };

      rafId = requestAnimationFrame(measureFPS);

      return () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
      };
    }
  }, [enableMonitoring, enableAnimationMonitoring]);

  // Font optimization - disabled to prevent blank page issues
  // useEffect(() => {
  //   // Add font-loading class
  //   document.documentElement.classList.add('font-loading');

  //   // Check if fonts are loaded
  //   if ('fonts' in document) {
  //     document.fonts.ready.then(() => {
  //       document.documentElement.classList.remove('font-loading');
  //       document.documentElement.classList.add('font-loaded');
  //     });
  //   } else {
  //     // Fallback for older browsers
  //     setTimeout(() => {
  //       document.documentElement.classList.remove('font-loading');
  //       document.documentElement.classList.add('font-loaded');
  //     }, 1000);
  //   }
  // }, []);

  return (
    <>
      {children}

      {/* Performance Metrics Overlay (Development Only) */}
      {showMetricsOverlay && process.env.NODE_ENV === 'development' && metrics && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono z-50 max-w-xs">
          <h3 className="font-bold mb-2">Performance Metrics</h3>
          <div className="space-y-1">
            {metrics.LCP && (
              <div className={`${metrics.LCP <= 2500 ? 'text-green-400' : 'text-red-400'}`}>
                LCP: {metrics.LCP.toFixed(0)}ms
              </div>
            )}
            {metrics.FID && (
              <div className={`${metrics.FID <= 100 ? 'text-green-400' : 'text-red-400'}`}>
                FID: {metrics.FID.toFixed(0)}ms
              </div>
            )}
            {metrics.CLS !== null && (
              <div className={`${metrics.CLS <= 0.1 ? 'text-green-400' : 'text-red-400'}`}>
                CLS: {metrics.CLS.toFixed(3)}
              </div>
            )}
            {metrics.TTFB && (
              <div className={`${metrics.TTFB <= 800 ? 'text-green-400' : 'text-red-400'}`}>
                TTFB: {metrics.TTFB.toFixed(0)}ms
              </div>
            )}
            {enableAnimationMonitoring && (
              <div className={`${fps >= 55 ? 'text-green-400' : 'text-red-400'}`}>
                FPS: {fps}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
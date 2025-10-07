import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import PerformanceProvider from '@/components/PerformanceProvider';
import './globals.css';
import './animations.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  adjustFontFallback: true
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bkndtrusted.com'),
  title: {
    default: 'BKND Trusted | Find Verified Local Service Professionals',
    template: '%s | BKND Trusted',
  },
  description: 'Find verified, licensed, and insured local service professionals. Get instant quotes from background-checked pros in your area. 100% satisfaction guaranteed.',
  keywords: 'local services, trusted contractors, verified businesses, home services, professional services, HVAC, plumbing, electrical, licensed contractors',
  authors: [{ name: 'BKND Trusted' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'BKND Trusted - Verified Local Service Professionals',
    description: 'Find verified, licensed, and insured local service professionals. Get instant quotes from background-checked pros.',
    siteName: 'BKND Trusted',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BKND Trusted - Verified Service Professionals',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BKND Trusted - Find Verified Local Pros',
    description: 'Licensed, insured, background-checked professionals. Get instant quotes.',
    images: ['/twitter-card.jpg'],
    creator: '@bkndtrusted',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '9de1b0284bbffacf',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1E40AF',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />

        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Inline critical CSS for faster first paint */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Critical CSS for above-fold content */
              *,*::before,*::after{box-sizing:border-box}*{margin:0}html,body{height:100%}body{line-height:1.5;-webkit-font-smoothing:antialiased}img,picture,video,canvas,svg{display:block;max-width:100%}input,button,textarea,select{font:inherit}p,h1,h2,h3,h4,h5,h6{overflow-wrap:break-word}:root{--trust-deep:#0F172A;--trust-action:#1E40AF;--trust-verified:#10B981;--trust-gold:#F59E0B;--surface-base:#ffffff;--text-primary:#0F172A;--text-secondary:#374151}body{font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:var(--text-primary)}.container{width:100%;margin:0 auto;padding:0 1rem}@media(min-width:640px){.container{max-width:640px}}@media(min-width:768px){.container{max-width:768px}}@media(min-width:1024px){.container{max-width:1024px}}@media(min-width:1280px){.container{max-width:1280px}}.skeleton{background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);background-size:200% 100%;animation:skeleton-loading 1.5s infinite}@keyframes skeleton-loading{0%{background-position:200% 0}100%{background-position:-200% 0}}
            `,
          }}
        />

        {/* Inline font loading script for immediate execution - removed to prevent blank page */}
      </head>
      <body className={`${inter.className} bg-gray-50 antialiased`}>
        <PerformanceProvider
          enableMonitoring={process.env.NODE_ENV === 'development'}
          enableAnimationMonitoring={false}
          showMetricsOverlay={process.env.NODE_ENV === 'development'}
        >
          {/* Skip to content link for accessibility */}
          <a href="#main-content" className="skip-to-content">
            Skip to main content
          </a>

          <main id="main-content">
            {children}
          </main>
        </PerformanceProvider>

        {/* Load performance monitoring in development */}
        {process.env.NODE_ENV === 'development' && (
          <Script
            id="performance-monitoring"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                console.log('Performance monitoring enabled');
                // Log Core Web Vitals
                if ('web-vital' in window) {
                  window.addEventListener('load', () => {
                    setTimeout(() => {
                      const vitals = ['LCP', 'FID', 'CLS', 'FCP', 'TTFB'];
                      vitals.forEach(vital => {
                        console.log(vital + ':', performance.getEntriesByName(vital));
                      });
                    }, 1000);
                  });
                }
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}
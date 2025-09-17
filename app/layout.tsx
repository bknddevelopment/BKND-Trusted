import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0ea5e9'
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bkndtrusted.com'),
  title: {
    default: 'BKND Trusted - Enterprise Database & Backend Infrastructure Solutions',
    template: '%s | BKND Trusted'
  },
  description: 'Enterprise-grade database and backend infrastructure solutions. PostgreSQL, MongoDB, Redis hosting with 99.99% uptime SLA, automated backups, and 24/7 expert support.',
  keywords: [
    'database hosting',
    'backend infrastructure',
    'PostgreSQL hosting',
    'MongoDB hosting',
    'Redis hosting',
    'managed database',
    'DBaaS',
    'BaaS',
    'cloud database',
    'database management'
  ],
  authors: [{ name: 'BKND Trusted' }],
  creator: 'BKND Trusted',
  publisher: 'BKND Trusted',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bkndtrusted.com',
    siteName: 'BKND Trusted',
    title: 'BKND Trusted - Enterprise Database & Backend Infrastructure',
    description: 'Enterprise-grade database and backend infrastructure solutions with 99.99% uptime SLA',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BKND Trusted - Database & Backend Infrastructure',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BKND Trusted - Enterprise Database & Backend Infrastructure',
    description: 'Enterprise-grade database and backend infrastructure solutions with 99.99% uptime SLA',
    images: ['/twitter-image.png'],
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
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: 'https://bkndtrusted.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans antialiased min-h-screen bg-white text-gray-900">
        {children}
      </body>
    </html>
  )
}
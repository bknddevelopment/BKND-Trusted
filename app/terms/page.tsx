import { Metadata } from 'next';
import PlaceholderPage from '@/components/PlaceholderPage';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Terms of Service - BKND Trusted',
  description: 'Read our terms of service to understand the rules and guidelines for using BKND Trusted.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <PlaceholderPage
      title="Terms of Service"
      description="Please review our terms and conditions for using BKND Trusted. Detailed terms coming soon."
    />
  );
}

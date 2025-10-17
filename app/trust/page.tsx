import { Metadata } from 'next';
import PlaceholderPage from '@/components/PlaceholderPage';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Trust & Safety - BKND Trusted',
  description: 'Learn about our comprehensive background check process, insurance verification, and safety measures that protect homeowners.',
  path: '/trust',
});

export default function TrustPage() {
  return (
    <PlaceholderPage
      title="Trust & Safety"
      description="Your safety is our top priority. Every professional undergoes comprehensive background checks and verification. Detailed information coming soon."
    />
  );
}

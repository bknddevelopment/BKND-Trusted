import { Metadata } from 'next';
import PlaceholderPage from '@/components/PlaceholderPage';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Locations - BKND Trusted',
  description: 'Find verified service professionals in cities across Texas. Browse our complete directory of locations.',
  path: '/locations',
});

export default function LocationsPage() {
  return (
    <PlaceholderPage
      title="All Locations"
      description="Browse professionals by city and county across Texas. Interactive location directory coming soon."
    />
  );
}

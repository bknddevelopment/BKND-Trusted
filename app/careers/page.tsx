import { Metadata } from 'next';
import PlaceholderPage from '@/components/PlaceholderPage';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Careers - Join BKND Trusted',
  description: 'Join the BKND Trusted team. Explore career opportunities and help us transform the home services industry.',
  path: '/careers',
});

export default function CareersPage() {
  return (
    <PlaceholderPage
      title="Careers at BKND Trusted"
      description="Join our growing team and help homeowners find trusted professionals. Career opportunities coming soon."
    />
  );
}

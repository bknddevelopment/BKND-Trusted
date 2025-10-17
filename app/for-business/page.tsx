import { Metadata } from 'next';
import PlaceholderPage from '@/components/PlaceholderPage';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'For Businesses - Join BKND Trusted',
  description: 'Grow your business by connecting with thousands of homeowners looking for trusted professionals. Join BKND Trusted today.',
  path: '/for-business',
});

export default function ForBusinessPage() {
  return (
    <PlaceholderPage
      title="For Businesses"
      description="Join our network of verified professionals and grow your business. Pro onboarding portal coming soon."
    />
  );
}

import { Metadata } from 'next';
import PlaceholderPage from '@/components/PlaceholderPage';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'About Us - BKND Trusted',
  description: 'Learn about BKND Trusted\'s mission to connect homeowners with verified, trustworthy service professionals.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <PlaceholderPage
      title="About BKND Trusted"
      description="Our mission is to make finding trusted home service professionals simple and secure. Learn more about our story coming soon."
    />
  );
}

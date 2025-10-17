import { Metadata } from 'next';
import PlaceholderPage from '@/components/PlaceholderPage';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'How It Works - BKND Trusted',
  description: 'Learn how BKND Trusted connects homeowners with verified, background-checked service professionals in 3 simple steps.',
  path: '/how-it-works',
});

export default function HowItWorksPage() {
  return (
    <PlaceholderPage
      title="How It Works"
      description="Discover how easy it is to find verified professionals for your home service needs. This detailed guide is coming soon."
    />
  );
}

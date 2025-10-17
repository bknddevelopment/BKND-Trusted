import { Metadata } from 'next';
import PlaceholderPage from '@/components/PlaceholderPage';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Privacy Policy - BKND Trusted',
  description: 'Read our privacy policy to understand how BKND Trusted collects, uses, and protects your personal information.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <PlaceholderPage
      title="Privacy Policy"
      description="Your privacy is important to us. Detailed privacy policy coming soon."
    />
  );
}

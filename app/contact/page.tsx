import { Metadata } from 'next';
import PlaceholderPage from '@/components/PlaceholderPage';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Contact Us - BKND Trusted Support',
  description: 'Get in touch with BKND Trusted support. We\'re here to help you find the perfect professional for your needs.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <PlaceholderPage
      title="Contact Support"
      description="Need help? Our support team is ready to assist. Contact form and live chat coming soon."
      comingSoon={false}
    />
  );
}

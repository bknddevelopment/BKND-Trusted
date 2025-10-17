'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: 'How does BKND Trusted verify professionals?',
    answer: 'Every professional on our platform undergoes a comprehensive background check including criminal history, license verification, insurance validation, and identity confirmation. We also continuously monitor customer reviews and ratings to ensure quality.',
  },
  {
    question: 'Is it free to use BKND Trusted?',
    answer: 'Yes! Homeowners can search, compare, and connect with professionals completely free. There are no hidden fees or subscription charges. Professionals pay a small fee only when they successfully connect with customers.',
  },
  {
    question: 'How quickly can I get quotes?',
    answer: 'Most homeowners receive their first quote within 10 minutes. On average, you\'ll get 3-5 competitive quotes within 2 hours of submitting your request. For emergency services, responses can be even faster.',
  },
  {
    question: 'What if I\'m not satisfied with the service?',
    answer: 'We stand behind every professional on our platform. If you\'re not satisfied, contact our support team within 30 days. We\'ll work with you and the professional to resolve the issue. In rare cases, we may offer a refund or compensation.',
  },
  {
    question: 'Are the professionals licensed and insured?',
    answer: 'Yes. All professionals are required to maintain valid licenses (where applicable) and carry general liability insurance. We verify this information during onboarding and conduct regular audits to ensure compliance.',
  },
  {
    question: 'Can I see reviews before hiring?',
    answer: 'Absolutely! Every professional has a detailed profile showing verified customer reviews, ratings, photos of completed work, response time, and hire rate. All reviews are from real customers and cannot be edited or deleted by pros.',
  },
  {
    question: 'What services are available in my area?',
    answer: 'We offer services across Texas including HVAC, plumbing, electrical, house cleaning, landscaping, painting, roofing, and general contracting. Enter your ZIP code on our search page to see available professionals in your specific area.',
  },
  {
    question: 'How do I pay for services?',
    answer: 'Payment is arranged directly with the professional you hire. BKND Trusted does not process payments. Most pros accept cash, check, credit cards, and digital payment methods. Payment terms are discussed during the quoting process.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-section bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-h1 text-neutral-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-body-lg text-neutral-600 max-w-2xl mx-auto">
            Got questions? We've got answers. Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-neutral-50 border-2 border-neutral-200 rounded-xl overflow-hidden transition-all hover:border-brand-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-neutral-100"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-neutral-900 text-lg pr-8">
                  {faq.question}
                </span>
                <ChevronDownIcon
                  className={`w-6 h-6 text-brand-600 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 text-neutral-700 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support CTA */}
        <div className="mt-12 text-center">
          <p className="text-neutral-600 mb-4">Still have questions?</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}

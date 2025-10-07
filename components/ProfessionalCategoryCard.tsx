'use client';

import Link from 'next/link';
import { StarIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface ProfessionalCategoryCardProps {
  category: {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: React.ReactNode;
    proCount: number;
    averageRating: number;
  };
}

export default function ProfessionalCategoryCard({ category }: ProfessionalCategoryCardProps) {
  return (
    <Link href={`/services/${category.slug}`}>
      <div className="group bg-white rounded-xl border-2 border-neutral-200 hover:border-brand-500 transition-all hover:shadow-lg p-6 h-full">
        {/* Icon */}
        <div className="w-14 h-14 bg-brand-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors">
          <div className="w-7 h-7 text-brand-600">
            {category.icon}
          </div>
        </div>

        {/* Content */}
        <h3 className="text-h4 text-neutral-900 mb-2 group-hover:text-brand-600 transition-colors">
          {category.name}
        </h3>
        <p className="text-body-sm text-neutral-600 mb-4 line-clamp-2">
          {category.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
          <span className="text-body-sm text-neutral-500">
            {category.proCount.toLocaleString()} pros nearby
          </span>
          <div className="flex items-center gap-1">
            <StarIcon className="w-4 h-4 text-featured-400" />
            <span className="text-body-sm font-medium text-neutral-900">
              {category.averageRating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Hover Arrow */}
        <div className="flex items-center justify-end mt-3">
          <ChevronRightIcon className="w-5 h-5 text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </Link>
  );
}

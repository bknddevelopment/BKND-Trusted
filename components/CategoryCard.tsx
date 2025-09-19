'use client';

import Link from 'next/link';
import { Category } from '@/lib/types';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/category/${category.id}`}>
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-1">
        {/* Icon */}
        <div className="w-16 h-16 bg-trust-action/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-trust-action/20 transition-colors">
          <span className="text-3xl">{category.icon}</span>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-trust-deep mb-2 group-hover:text-trust-action transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {category.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">
            {category.count} providers
          </span>
          <ArrowRightIcon className="w-5 h-5 text-trust-action opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
}
import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Width of the skeleton
   * @default 'w-full'
   */
  width?: string;
  /**
   * Height of the skeleton
   * @default 'h-4'
   */
  height?: string;
  /**
   * Rounded corners
   * @default 'rounded'
   */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /**
   * Animation variant
   * @default 'pulse'
   */
  variant?: 'pulse' | 'shimmer';
}

export function Skeleton({
  width = 'w-full',
  height = 'h-4',
  rounded = 'md',
  variant = 'pulse',
  className,
  ...props
}: SkeletonProps) {
  const roundedClass = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  }[rounded];

  const variantClass = {
    pulse: 'animate-pulse bg-neutral-200',
    shimmer: 'bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 bg-[length:200%_100%] animate-shimmer',
  }[variant];

  return (
    <div
      className={cn(width, height, roundedClass, variantClass, className)}
      {...props}
    />
  );
}

/**
 * Skeleton for a card layout
 */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('p-6 bg-white border border-neutral-200 rounded-xl', className)}>
      <div className="space-y-4">
        <Skeleton height="h-6" width="w-1/3" />
        <Skeleton height="h-4" width="w-full" />
        <Skeleton height="h-4" width="w-2/3" />
        <div className="flex gap-2 pt-2">
          <Skeleton height="h-8" width="w-20" rounded="full" />
          <Skeleton height="h-8" width="w-24" rounded="full" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for a business card
 */
export function SkeletonBusinessCard({ className }: { className?: string }) {
  return (
    <div className={cn('p-6 bg-white border border-neutral-200 rounded-xl', className)}>
      <div className="flex gap-6">
        {/* Image skeleton */}
        <Skeleton width="w-32 flex-shrink-0" height="h-32" rounded="lg" />

        {/* Content skeleton */}
        <div className="flex-1 space-y-3">
          <Skeleton height="h-6" width="w-1/2" />
          <Skeleton height="h-4" width="w-1/3" />
          <div className="flex gap-2">
            <Skeleton height="h-6" width="w-20" rounded="full" />
            <Skeleton height="h-6" width="w-24" rounded="full" />
          </div>
          <Skeleton height="h-4" width="w-full" />
          <Skeleton height="h-4" width="w-3/4" />
          <div className="flex gap-3 pt-2">
            <Skeleton height="h-10" width="w-32" rounded="lg" />
            <Skeleton height="h-10" width="w-32" rounded="lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for category card
 */
export function SkeletonCategoryCard({ className }: { className?: string }) {
  return (
    <div className={cn('p-6 bg-white border border-neutral-200 rounded-xl', className)}>
      <div className="space-y-4">
        <Skeleton width="w-12" height="h-12" rounded="full" />
        <Skeleton height="h-5" width="w-2/3" />
        <Skeleton height="h-4" width="w-full" />
        <div className="pt-2 border-t border-neutral-100">
          <Skeleton height="h-3" width="w-1/2" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for text content
 */
export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height="h-4"
          width={i === lines - 1 ? 'w-2/3' : 'w-full'}
        />
      ))}
    </div>
  );
}

/**
 * Skeleton for avatar
 */
export function SkeletonAvatar({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeClass = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }[size];

  return <Skeleton width={sizeClass} height={sizeClass} rounded="full" className={className} />;
}

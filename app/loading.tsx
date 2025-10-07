import {
  SkeletonCard,
  SkeletonCategoryCard,
  SkeletonBusinessCard,
} from '@/components/ui/Skeleton';

export default function HomeLoading() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation Skeleton */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="h-8 w-32 bg-neutral-200 rounded animate-pulse" />
            <div className="flex items-center gap-4">
              <div className="h-10 w-24 bg-neutral-200 rounded-lg animate-pulse" />
              <div className="h-10 w-28 bg-neutral-200 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Skeleton */}
      <section className="bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            {/* Headline skeleton */}
            <div className="mb-6 flex flex-col items-center gap-3">
              <div className="h-14 w-3/4 bg-neutral-700/50 rounded animate-pulse" />
              <div className="h-14 w-2/3 bg-neutral-700/50 rounded animate-pulse" />
            </div>

            {/* Subheadline skeleton */}
            <div className="mb-10 flex flex-col items-center gap-2">
              <div className="h-6 w-2/3 bg-neutral-700/50 rounded animate-pulse" />
              <div className="h-6 w-1/2 bg-neutral-700/50 rounded animate-pulse" />
            </div>

            {/* Trust stats skeleton */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center">
                  <div className="h-10 w-24 bg-neutral-700/50 rounded animate-pulse mb-1" />
                  <div className="h-4 w-28 bg-neutral-700/50 rounded animate-pulse" />
                </div>
              ))}
            </div>

            {/* Search bar skeleton */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-6">
                  <div className="h-4 w-40 bg-neutral-200 rounded animate-pulse mb-2" />
                  <div className="h-12 bg-neutral-100 rounded-lg animate-pulse" />
                </div>
                <div className="md:col-span-4">
                  <div className="h-4 w-20 bg-neutral-200 rounded animate-pulse mb-2" />
                  <div className="h-12 bg-neutral-100 rounded-lg animate-pulse" />
                </div>
                <div className="md:col-span-2 flex items-end">
                  <div className="h-12 w-full bg-brand-200 rounded-lg animate-pulse" />
                </div>
              </div>
              <div className="mt-6">
                <div className="h-3 w-32 bg-neutral-200 rounded animate-pulse mb-2" />
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-7 w-24 bg-neutral-100 rounded-full animate-pulse" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner Skeleton */}
      <section className="bg-neutral-50 py-6 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-12 w-12 bg-neutral-200 rounded-full animate-pulse" />
                <div className="h-5 w-32 bg-neutral-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services Skeleton */}
      <section className="py-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-10 w-64 bg-neutral-200 rounded animate-pulse mx-auto mb-4" />
            <div className="h-6 w-96 bg-neutral-200 rounded animate-pulse mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCategoryCard key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Businesses Skeleton */}
      <section className="py-section bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-10 w-80 bg-neutral-200 rounded animate-pulse mx-auto mb-4" />
            <div className="h-6 w-96 bg-neutral-200 rounded animate-pulse mx-auto" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <SkeletonBusinessCard key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Location Directory Skeleton */}
      <section className="py-section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-10 w-72 bg-neutral-200 rounded animate-pulse mx-auto mb-4" />
            <div className="h-6 w-96 bg-neutral-200 rounded animate-pulse mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <SkeletonCard key={i} className="h-32" />
            ))}
          </div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <footer className="bg-neutral-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="h-5 w-24 bg-neutral-700 rounded animate-pulse mb-4" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-4 w-full bg-neutral-700 rounded animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-neutral-800 pt-8">
            <div className="h-4 w-64 bg-neutral-700 rounded animate-pulse mx-auto" />
          </div>
        </div>
      </footer>
    </div>
  );
}

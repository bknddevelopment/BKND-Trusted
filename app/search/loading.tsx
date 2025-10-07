import { SkeletonBusinessCard } from '@/components/ui/Skeleton';
import { Card, CardContent } from '@/components/ui/Card';

export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header Skeleton */}
      <header className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="h-8 w-32 bg-neutral-200 rounded animate-pulse" />
            <div className="h-9 w-28 bg-neutral-200 rounded-lg animate-pulse" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Filters Sidebar Skeleton */}
          <aside className="col-span-12 lg:col-span-3">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="h-6 w-20 bg-neutral-200 rounded animate-pulse mb-4" />

                {/* Search summary skeleton */}
                <div className="mb-6 pb-6 border-b border-neutral-200">
                  <div className="h-4 w-24 bg-neutral-200 rounded animate-pulse mb-2" />
                  <div className="h-5 w-32 bg-neutral-200 rounded animate-pulse mb-1" />
                  <div className="h-4 w-20 bg-neutral-200 rounded animate-pulse" />
                </div>

                {/* Filter options skeleton */}
                <div className="mb-6">
                  <div className="h-4 w-28 bg-neutral-200 rounded animate-pulse mb-3" />
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-10 bg-neutral-100 rounded-lg animate-pulse" />
                    ))}
                  </div>
                </div>

                {/* Verification checkboxes skeleton */}
                <div className="mb-6">
                  <div className="h-4 w-24 bg-neutral-200 rounded animate-pulse mb-3" />
                  <div className="space-y-2">
                    <div className="h-6 bg-neutral-100 rounded animate-pulse" />
                    <div className="h-6 bg-neutral-100 rounded animate-pulse" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Results Skeleton */}
          <main className="col-span-12 lg:col-span-9">
            {/* Results header skeleton */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="h-10 w-64 bg-neutral-200 rounded animate-pulse mb-2" />
                <div className="h-5 w-48 bg-neutral-200 rounded animate-pulse" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-16 bg-neutral-200 rounded animate-pulse" />
                <div className="h-10 w-32 bg-neutral-200 rounded-lg animate-pulse" />
              </div>
            </div>

            {/* Business cards skeleton */}
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <SkeletonBusinessCard key={i} />
              ))}
            </div>

            {/* Load more button skeleton */}
            <div className="mt-8 text-center">
              <div className="h-12 w-40 bg-neutral-200 rounded-lg animate-pulse inline-block" />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Skeleton, SkeletonText } from '@/components/ui/Skeleton';

export default function BusinessProfileLoading() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header Skeleton */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Skeleton width="w-32" height="h-8" />
            <Skeleton width="w-28" height="h-9" rounded="lg" />
          </div>
        </div>
      </header>

      {/* Hero Skeleton */}
      <section className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Image Skeleton */}
            <div className="lg:col-span-1">
              <Skeleton width="w-full" height="h-96" rounded="xl" />
            </div>

            {/* Info Skeleton */}
            <div className="lg:col-span-2">
              <Skeleton width="w-3/4" height="h-10" className="mb-2" />
              <Skeleton width="w-32" height="h-6" className="mb-4" />

              {/* Badges */}
              <div className="flex gap-2 mb-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} width="w-24" height="h-7" rounded="full" />
                ))}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-6 mb-6">
                <Skeleton width="w-40" height="h-8" />
                <Skeleton width="w-32" height="h-5" />
              </div>

              {/* Description */}
              <SkeletonText lines={3} className="mb-6" />

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} height="h-20" rounded="lg" />
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} width="w-36" height="h-12" rounded="lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Services Card */}
            <Card>
              <CardHeader>
                <Skeleton width="w-40" height="h-6" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} height="h-12" rounded="lg" />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews Card */}
            <Card>
              <CardHeader>
                <Skeleton width="w-48" height="h-6" />
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4">
                      <Skeleton width="w-12" height="h-12" rounded="full" />
                      <div className="flex-1">
                        <Skeleton width="w-32" height="h-5" className="mb-2" />
                        <Skeleton width="w-40" height="h-4" className="mb-2" />
                        <SkeletonText lines={2} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <Skeleton width="w-48" height="h-6" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton width="w-5" height="h-5" rounded="full" />
                    <div className="flex-1">
                      <Skeleton width="w-20" height="h-4" className="mb-1" />
                      <Skeleton width="w-full" height="h-4" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

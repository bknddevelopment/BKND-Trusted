import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Skeleton, SkeletonText } from '@/components/ui/Skeleton';

export default function ServiceDetailLoading() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation Skeleton */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Skeleton width="w-32" height="h-8" />
            <Skeleton width="w-28" height="h-9" rounded="lg" />
          </div>
        </div>
      </nav>

      {/* Hero Skeleton */}
      <section className="bg-neutral-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Skeleton width="w-96" height="h-12" className="mb-4 bg-neutral-700/50" />
            <div className="mb-6 space-y-2">
              <Skeleton width="w-full" height="h-6" className="bg-neutral-700/50" />
              <Skeleton width="w-3/4" height="h-6" className="bg-neutral-700/50" />
            </div>
            <div className="flex flex-wrap gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
                  <Skeleton width="w-24" height="h-4" className="mb-2 bg-neutral-700/50" />
                  <Skeleton width="w-20" height="h-6" className="bg-neutral-600/50" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-8">
            {/* Popular Services Skeleton */}
            <Card className="mb-8">
              <CardHeader>
                <Skeleton width="w-48" height="h-6" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} height="h-16" rounded="lg" />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* FAQs Skeleton */}
            <Card>
              <CardHeader>
                <Skeleton width="w-64" height="h-6" />
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border-b border-neutral-200 last:border-0 pb-6 last:pb-0">
                      <Skeleton width="w-3/4" height="h-6" className="mb-2" />
                      <SkeletonText lines={2} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - CTA Skeleton */}
          <div className="col-span-12 lg:col-span-4">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <Skeleton width="w-40" height="h-8" className="mb-4" />
                <SkeletonText lines={2} className="mb-6" />

                <div className="space-y-4 mb-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Skeleton width="w-5" height="h-5" rounded="full" className="flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <Skeleton width="w-32" height="h-5" className="mb-1" />
                        <Skeleton width="w-full" height="h-4" />
                      </div>
                    </div>
                  ))}
                </div>

                <Skeleton height="h-12" rounded="lg" className="w-full mb-3" />
                <Skeleton height="h-12" rounded="lg" className="w-full" />

                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <Skeleton width="w-24" height="h-4" className="mx-auto mb-2" />
                  <div className="flex justify-center gap-4">
                    <Skeleton width="w-12" height="h-4" />
                    <Skeleton width="w-16" height="h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom CTA Skeleton */}
      <section className="bg-neutral-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Skeleton width="w-96" height="h-10" className="mx-auto mb-4 bg-neutral-700/50" />
          <div className="mb-8 flex flex-col items-center gap-2">
            <Skeleton width="w-full max-w-2xl" height="h-6" className="bg-neutral-700/50" />
            <Skeleton width="w-96" height="h-6" className="bg-neutral-700/50" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Skeleton width="w-40" height="h-14" rounded="lg" className="bg-neutral-700/50" />
            <Skeleton width="w-48" height="h-14" rounded="lg" className="bg-neutral-700/50" />
          </div>
        </div>
      </section>
    </div>
  );
}

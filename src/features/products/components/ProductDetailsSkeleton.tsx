import { Skeleton } from '@/shared/components/ui/Skeleton';

export default function ProductDetailsSkeleton() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product Image */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
             <Skeleton className="h-[400px] w-full" />
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center space-y-4">
          <Skeleton className="h-4 w-32" />
          
          <Skeleton className="h-10 w-3/4" />

          <section aria-labelledby="information-heading" className="mt-4">
            <div className="flex items-center">
              <Skeleton className="h-8 w-24" />
              <div className="ml-4 pl-4 border-l border-gray-300">
                <Skeleton className="h-5 w-32" />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            
            <div className="mt-6">
                <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </section>

          <div className="mt-10">
             <Skeleton className="h-12 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

import { Skeleton } from '@/shared/components/ui/Skeleton';

export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden">
      <div className="h-64 p-4 bg-white">
        <Skeleton className="h-full w-full" />
      </div>
      
      <div className="p-4 flex flex-col flex-grow space-y-3">
        {/* Category Badge */}
        <Skeleton className="h-5 w-20 rounded-full" />
        
        {/* Title */}
        <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
        </div>
        
        {/* Rating */}
        <Skeleton className="h-4 w-32" />
        
        {/* Price & Button */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-9 w-28 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

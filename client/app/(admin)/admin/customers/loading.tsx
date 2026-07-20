import { Skeleton, SkeletonText } from "@/components/skeletons/SkeletonBase";

function CustomerCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
      <div className="h-1 w-full bg-stone-100" />
      <div className="p-5 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Skeleton className="w-11 h-11 rounded-2xl shrink-0" />
            <div className="flex flex-col gap-1.5">
              <SkeletonText width="w-28" height="h-4" />
              <SkeletonText width="w-16" height="h-3" />
            </div>
          </div>
          <Skeleton className="w-14 h-5 rounded-full" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1.5 p-2.5 bg-stone-50 rounded-xl border border-stone-100"
            >
              <Skeleton className="w-3.5 h-3.5 rounded" />
              <SkeletonText width="w-12" height="h-3.5" />
              <SkeletonText width="w-10" height="h-2.5" />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="flex-1 h-1.5 rounded-full" />
          <SkeletonText width="w-10" height="h-3" />
        </div>
      </div>
    </div>
  );
}

export default function CustomersSkeleton() {
  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-5">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <SkeletonText width="w-28" height="h-6" />
          <SkeletonText width="w-64" height="h-3" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-stone-100 shadow-sm px-4 py-4 flex items-center gap-3"
            >
              <Skeleton className="w-9 h-9 rounded-xl shrink-0" />
              <div className="flex flex-col gap-1.5 flex-1">
                <SkeletonText width="w-20" height="h-5" />
                <SkeletonText width="w-24" height="h-2.5" />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4">
          <div className="flex gap-3">
            <Skeleton className="flex-1 h-9 rounded-xl" />
            <Skeleton className="w-44 h-9 rounded-xl" />
            <SkeletonText width="w-20" height="h-3" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <CustomerCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

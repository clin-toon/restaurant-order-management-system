import { Skeleton, SkeletonText } from "@/components/skeletons/SkeletonBase";

function MenuAdminCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
      <Skeleton className="w-full h-44 rounded-none" />
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <SkeletonText width="w-32" height="h-4" />
          <SkeletonText width="w-12" height="h-4" />
        </div>
        <SkeletonText width="w-full" height="h-3" />
        <SkeletonText width="w-4/5" height="h-3" />
        <div className="flex items-center gap-1.5 mt-1">
          <Skeleton className="w-16 h-5 rounded-full" />
          <Skeleton className="w-14 h-5 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function AdminMenuSkeleton() {
  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <Skeleton className="w-5 h-5 rounded" />
              <SkeletonText width="w-28" height="h-6" />
            </div>
            <SkeletonText width="w-56" height="h-3" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="w-24 h-7 rounded-full" />
            <Skeleton className="w-16 h-7 rounded-full" />
            <Skeleton className="w-16 h-7 rounded-full" />
            <Skeleton className="w-24 h-9 rounded-xl" />
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4">
          <div className="flex flex-wrap items-center gap-3">
            <Skeleton className="flex-1 min-w-48 h-9 rounded-xl" />
            <Skeleton className="w-36 h-9 rounded-xl" />
            <Skeleton className="w-40 h-9 rounded-xl" />
            <SkeletonText width="w-16" height="h-3" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <MenuAdminCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

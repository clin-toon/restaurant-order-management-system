import { Skeleton, SkeletonText } from "@/components/skeletons/SkeletonBase";

function MenuCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
      {/* Image */}
      <Skeleton className="w-full h-44 rounded-none" />
      {/* Content */}
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <SkeletonText width="w-32" height="h-4" />
          <SkeletonText width="w-12" height="h-4" />
        </div>
        <SkeletonText width="w-full" height="h-3" />
        <SkeletonText width="w-4/5" height="h-3" />
        <div className="flex items-center justify-between mt-1 pt-3 border-t border-stone-50">
          <Skeleton className="w-16 h-5 rounded-full" />
          <Skeleton className="w-16 h-7 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function SidebarSkeleton() {
  return (
    <aside className="w-64 h-screen sticky top-0 bg-white border-r border-stone-200 p-5 hidden md:block">
      {/* Search */}
      <Skeleton className="w-full h-9 rounded-xl mb-5" />
      <SkeletonText width="w-16" height="h-4" />

      <div className="mt-4 flex flex-col gap-5">
        {/* Category group */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2.5">
            <Skeleton className="w-full h-9 rounded-xl" />
          </div>
        ))}
      </div>

      <div className="mt-6">
        <SkeletonText width="w-24" height="h-3" />
        <div className="mt-3">
          <Skeleton className="w-full h-1.5 rounded-full" />
          <div className="flex justify-between mt-2">
            <SkeletonText width="w-10" height="h-2.5" />
            <SkeletonText width="w-10" height="h-2.5" />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default function MenuPageSkeleton() {
  return (
    <div className="flex flex-1 h-screen">
      <SidebarSkeleton />
      <div className="flex-1 bg-stone-50 p-6 flex flex-col gap-5">
        {/* Search + sort bar */}
        <div className="flex justify-around items-center gap-4">
          <Skeleton className="flex-1 h-10 rounded-xl max-w-sm" />
          <div className="flex items-center gap-2">
            <SkeletonText width="w-14" height="h-4" />
            <Skeleton className="w-36 h-9 rounded-xl" />
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <MenuCardSkeleton key={i} />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="pt-4 border-t border-stone-200 w-full flex justify-center">
          <div className="flex items-center gap-3">
            <Skeleton className="w-9 h-9 rounded-lg" />
            <SkeletonText width="w-20" height="h-4" />
            <Skeleton className="w-9 h-9 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

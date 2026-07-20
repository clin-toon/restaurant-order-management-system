import { Skeleton, SkeletonText } from "@/components/skeletons/SkeletonBase";

function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
      <div className="flex items-start justify-between mb-4">
        <SkeletonText width="w-24" height="h-3" />
        <Skeleton className="w-2 h-2 rounded-full" />
      </div>
      <SkeletonText width="w-32" height="h-7" />
      <div className="flex items-center gap-2 mt-2">
        <Skeleton className="w-16 h-5 rounded-full" />
        <SkeletonText width="w-20" height="h-3" />
      </div>
    </div>
  );
}

function RevenueChartSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
      <div className="flex items-start justify-between mb-5">
        <div className="flex flex-col gap-2">
          <SkeletonText width="w-36" height="h-4" />
          <SkeletonText width="w-24" height="h-3" />
        </div>
        <Skeleton className="w-32 h-8 rounded-xl" />
      </div>

      <div className="flex items-end justify-between gap-2 h-48 px-2">
        {[65, 80, 55, 90, 75, 100, 70].map((h, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end gap-1">
            <Skeleton
              className="w-full rounded-t-lg animate-pulse"
              style={{ height: `${h}%` } as React.CSSProperties}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-2 px-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <SkeletonText key={d} width="w-6" height="h-2.5" />
        ))}
      </div>
    </div>
  );
}

function DonutChartSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
      <div className="flex flex-col gap-2 mb-4">
        <SkeletonText width="w-28" height="h-4" />
        <SkeletonText width="w-20" height="h-3" />
      </div>

      <div className="flex justify-center my-4">
        <Skeleton
          className="w-36 h-36 rounded-full"
          style={{ borderRadius: "50%" } as React.CSSProperties}
        />
      </div>

      <div className="flex flex-col gap-2.5 mt-4">
        {[60, 45, 70, 50, 40].map((w, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="w-2.5 h-2.5 rounded-full" />
              <SkeletonText
                width={`w-${w === 60 ? 24 : w === 45 ? 20 : w === 70 ? 28 : w === 50 ? 20 : 16}`}
                height="h-3"
              />
            </div>
            <SkeletonText width="w-8" height="h-3" />
          </div>
        ))}
      </div>
    </div>
  );
}

function TopItemsSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
      <div className="flex flex-col gap-2 mb-5">
        <SkeletonText width="w-28" height="h-4" />
        <SkeletonText width="w-36" height="h-3" />
      </div>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <SkeletonText width="w-4" height="h-3" />
            <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <SkeletonText width="w-32" height="h-3" />
                <SkeletonText width="w-8" height="h-3" />
              </div>
              <Skeleton className="w-full h-1.5 rounded-full" />
              <SkeletonText width="w-24" height="h-2.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentOrdersSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex flex-col gap-2">
          <SkeletonText width="w-28" height="h-4" />
          <SkeletonText width="w-20" height="h-3" />
        </div>
        <SkeletonText width="w-14" height="h-3" />
      </div>
      <div className="flex flex-col divide-y divide-stone-50">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
          >
            <Skeleton className="w-8 h-8 rounded-full shrink-0" />
            <div className="flex-1 flex flex-col gap-1.5">
              <SkeletonText width="w-28" height="h-3" />
              <SkeletonText width="w-36" height="h-2.5" />
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <SkeletonText width="w-14" height="h-3" />
              <Skeleton className="w-16 h-4 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <SkeletonText width="w-48" height="h-3" />
          <SkeletonText width="w-64" height="h-8" />
          <SkeletonText width="w-80" height="h-3" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <RevenueChartSkeleton />
          </div>
          <div className="lg:col-span-1">
            <DonutChartSkeleton />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TopItemsSkeleton />
          <RecentOrdersSkeleton />
        </div>
      </div>
    </div>
  );
}

import { Skeleton, SkeletonText } from "@/components/skeletons/SkeletonBase";

function TableRowSkeleton() {
  return (
    <tr className="border-b border-stone-50">
      <td className="px-5 py-4">
        <Skeleton className="w-24 h-7 rounded-lg" />
      </td>
      <td className="px-5 py-4">
        <div className="flex items-center gap-2.5">
          <Skeleton className="w-8 h-8 rounded-full shrink-0" />
          <SkeletonText width="w-28" height="h-3.5" />
        </div>
      </td>
      <td className="px-5 py-4">
        <SkeletonText width="w-24" height="h-3.5" />
        <SkeletonText width="w-16" height="h-3" />
      </td>
      <td className="px-5 py-4">
        <Skeleton className="w-14 h-5 rounded-full" />
      </td>
      <td className="px-5 py-4">
        <Skeleton className="w-20 h-5 rounded-full" />
      </td>
      <td className="px-5 py-4">
        <Skeleton className="w-36 h-8 rounded-lg" />
      </td>
    </tr>
  );
}

function MobileCardSkeleton() {
  return (
    <div className="p-4 border-b border-stone-100 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Skeleton className="w-9 h-9 rounded-full shrink-0" />
          <div className="flex flex-col gap-1.5">
            <SkeletonText width="w-28" height="h-3.5" />
            <SkeletonText width="w-20" height="h-2.5" />
          </div>
        </div>
        <Skeleton className="w-14 h-5 rounded-full" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="w-20 h-5 rounded-full" />
        <SkeletonText width="w-28" height="h-3" />
      </div>
      <Skeleton className="w-full h-8 rounded-lg" />
    </div>
  );
}

export default function OrdersListSkeleton() {
  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div className="flex flex-col gap-2">
            <SkeletonText width="w-28" height="h-6" />
            <SkeletonText width="w-48" height="h-3" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="w-24 h-7 rounded-full" />
            <Skeleton className="w-20 h-7 rounded-full" />
            <Skeleton className="w-16 h-7 rounded-full" />
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4">
          <div className="flex flex-wrap items-center gap-3">
            <Skeleton className="flex-1 min-w-48 h-9 rounded-xl" />
            <Skeleton className="w-36 h-9 rounded-xl" />
            <Skeleton className="w-40 h-9 rounded-xl" />
            <Skeleton className="w-36 h-9 rounded-xl" />
            <SkeletonText width="w-20" height="h-3" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
          {/* Desktop */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50/60">
                  {[
                    "Order ID",
                    "Customer",
                    "Date & Time",
                    "Payment",
                    "Status",
                    "Update Status",
                  ].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left">
                      <SkeletonText width="w-20" height="h-2.5" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 7 }).map((_, i) => (
                  <TableRowSkeleton key={i} />
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile */}
          <div className="md:hidden divide-y divide-stone-100">
            {Array.from({ length: 5 }).map((_, i) => (
              <MobileCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

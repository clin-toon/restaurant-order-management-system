"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { RECENT_ORDERS } from "@/data/admin-data";

const STATUS_STYLE: Record<
  string,
  { label: string; bg: string; text: string; dot: string }
> = {
  pending: {
    label: "Pending",
    bg: "bg-violet-50",
    text: "text-violet-700",
    dot: "bg-violet-400",
  },
  confirmed: {
    label: "Confirmed",
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-400",
  },
  preparing: {
    label: "Preparing",
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-400",
  },
  out_for_delivery: {
    label: "On the way",
    bg: "bg-orange-50",
    text: "text-orange-700",
    dot: "bg-orange-400",
  },
  delivered: {
    label: "Delivered",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-400",
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-red-50",
    text: "text-red-700",
    dot: "bg-red-400",
  },
};

export function RecentOrders() {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-stone-900">Recent Orders</h3>
          <p className="text-xs text-stone-400 mt-0.5">Last 5 orders</p>
        </div>
        <Link
          href="/orders"
          className="text-xs font-semibold text-stone-500 hover:text-stone-900 flex items-center gap-0.5 transition-colors"
        >
          View all <ChevronRight size={12} />
        </Link>
      </div>

      <div className="flex flex-col divide-y divide-stone-50">
        {RECENT_ORDERS.map((order) => {
          const s = STATUS_STYLE[order.status] ?? STATUS_STYLE.pending;
          return (
            <div
              key={order.id}
              className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-xs font-black text-stone-600 shrink-0">
                {order.customer.charAt(0)}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-stone-900 truncate">
                  {order.customer}
                </p>
                <p className="text-[10px] text-stone-400 truncate">
                  {order.item}
                </p>
              </div>

              {/* Right */}
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-xs font-bold text-stone-900">
                  Rs {order.total}
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}
                >
                  <span className={`w-1 h-1 rounded-full ${s.dot}`} />
                  {s.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

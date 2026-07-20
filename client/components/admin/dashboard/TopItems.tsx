"use client";

import Image from "next/image";
import { TOP_ITEMS } from "@/data/admin-data";

export function TopItems() {
  const max = Math.max(...TOP_ITEMS.map((i) => i.orders));

  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
      <div className="mb-5">
        <h3 className="text-sm font-bold text-stone-900">Top Menu Items</h3>
        <p className="text-xs text-stone-400 mt-0.5">By orders this month</p>
      </div>

      <div className="flex flex-col gap-4">
        {TOP_ITEMS.map((item, i) => (
          <div key={item.name} className="flex items-center gap-3">
            {/* Rank */}
            <span className="text-xs font-black text-stone-300 w-4 shrink-0 text-right">
              {i + 1}
            </span>

            {/* Image */}
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-stone-100 shrink-0">
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>

            {/* Info + bar */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-semibold text-stone-900 truncate">
                  {item.name}
                </p>
                <span className="text-xs font-bold text-stone-700 shrink-0 ml-2">
                  {item.orders}
                </span>
              </div>
              {/* Progress bar */}
              <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-stone-900 rounded-full transition-all duration-700"
                  style={{ width: `${(item.orders / max) * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-stone-400 mt-0.5">
                {item.category} · Rs {item.revenue.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

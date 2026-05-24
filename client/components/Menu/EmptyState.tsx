// components/Menu/EmptyState.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function EmptyState() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeFilters = Array.from(searchParams.entries());

  const removeFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.push(`/menu?${params.toString()}`);
  };

  const clearAll = () => router.push("/menu");

  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4 text-center py-20 px-6">
      <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center">
        <span className="text-3xl">🍽️</span>
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-base font-medium text-stone-800">
          No dishes found
        </h2>
        <p className="text-sm text-stone-500 max-w-xs leading-relaxed">
          No dishes match your current filters. Try adjusting your category,
          price range, or dietary preference.
        </p>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2">
          {activeFilters.map(([key, value]) => (
            <span
              key={key}
              className="inline-flex items-center gap-1.5 text-xs bg-orange-500 text-white rounded-full px-3 py-1"
            >
              {key === "category" ? value : `${key}: ${value}`}
              <button
                onClick={() => removeFilter(key)}
                className="hover:text-violet-900"
                aria-label={`Remove ${key} filter`}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-3 mt-1">
        <button
          onClick={clearAll}
          className="text-sm px-4 py-2 rounded-full border border-stone-300 hover:bg-stone-50 transition"
        >
          Clear all filters
        </button>
        <button
          onClick={() => router.push("/menu")}
          className="text-sm px-4 py-2 rounded-full bg-orange-600 text-white hover:bg-orange-700 transition"
        >
          Browse all dishes
        </button>
      </div>
    </div>
  );
}

"use client";

import { Search, ChevronDown } from "lucide-react";
import { SortOptionForCustomer } from "@/types/admin.types";

type Props = {
  search: string;
  sort: SortOptionForCustomer;
  total: number;
  onSearch: (v: string) => void;
  onSort: (v: SortOptionForCustomer) => void;
};

const SORT_OPTIONS: { value: SortOptionForCustomer; label: string }[] = [
  { value: "spent-desc", label: "Highest Spender" },
  { value: "spent-asc", label: "Lowest Spender" },
  { value: "freq-desc", label: "Most Orders" },
  { value: "freq-asc", label: "Fewest Orders" },
  { value: "avg-desc", label: "Highest Avg. Order" },
  { value: "avg-asc", label: "Lowest Avg. Order" },
  { value: "name-asc", label: "Name: A → Z" },
  { value: "name-desc", label: "Name: Z → A" },
];

export function CustomersFilterBar({
  search,
  sort,
  total,
  onSearch,
  onSort,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            placeholder="Search by name or ID…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-900 placeholder:text-stone-300 outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 transition"
          />
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => onSort(e.target.value as SortOptionForCustomer)}
            className="h-9 pl-3.5 pr-9 rounded-xl border border-stone-200 bg-white text-xs font-medium text-stone-700 outline-none focus:border-stone-300 appearance-none cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={12}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
          />
        </div>

        <p className="text-xs text-stone-400 ml-auto shrink-0">
          <span className="font-bold text-stone-700">{total}</span> customers
        </p>
      </div>
    </div>
  );
}

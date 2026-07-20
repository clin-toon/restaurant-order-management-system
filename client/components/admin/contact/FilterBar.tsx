import React from "react";
import { SortOptionA, StatusFilter } from "@/types/admin.types";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

const FilterBar = ({
  search,
  sort,
  total,
  onSearch,
  onSort,
}: {
  search: string;
  sort: SortOptionA;

  total: number;
  onSearch: (v: string) => void;
  onSort: (v: SortOptionA) => void;
}) => {
  return (
    <div>
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-48">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
            />
            <input
              placeholder="Search by name or message…"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-4 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-900 placeholder:text-stone-300 outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 transition"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => onSort(e.target.value as SortOptionA)}
              className="h-9 pl-3 pr-8 rounded-xl border border-stone-200 bg-white text-xs font-medium text-stone-700 outline-none focus:border-stone-300 appearance-none cursor-pointer"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <ChevronDown
              size={12}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
            />
          </div>

          {/* Status filter */}
          <div className="relative">
            <select className="h-9 pl-3 pr-8 rounded-xl border border-stone-200 bg-white text-xs font-medium text-stone-700 outline-none focus:border-stone-300 appearance-none cursor-pointer">
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="replied">Replied</option>
            </select>
            <ChevronDown
              size={12}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
            />
          </div>

          <p className="text-xs text-stone-400 ml-auto shrink-0">
            <span className="font-bold text-stone-700">{total}</span> queries
          </p>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOption, CategoryFilter, CATEGORIES } from "@/types/admin.types";

type Props = {
  search: string;
  sort: SortOption;
  category: CategoryFilter;
  total: number;
  onSearch: (v: string) => void;
  onSort: (v: SortOption) => void;
  onCategory: (v: CategoryFilter) => void;
};

export function MenuFilterBar({
  search,
  sort,
  category,
  total,
  onSearch,
  onSort,
  onCategory,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <Input
            placeholder="Search by name or description…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-9 h-9 text-sm rounded-xl border-stone-200 focus-visible:ring-stone-300 bg-stone-50"
          />
        </div>

        {/* Category */}
        <Select
          value={category}
          onValueChange={(v) => onCategory(v as CategoryFilter)}
        >
          <SelectTrigger className="h-9 w-36 text-xs rounded-xl border-stone-200 bg-white">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c} className="text-xs capitalize">
                {c === "all" ? "All Categories" : c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select value={sort} onValueChange={(v) => onSort(v as SortOption)}>
          <SelectTrigger className="h-9 w-40 text-xs rounded-xl border-stone-200 bg-white">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest" className="text-xs">
              Latest First
            </SelectItem>
            <SelectItem value="asc" className="text-xs">
              Name: A → Z
            </SelectItem>
            <SelectItem value="dsc" className="text-xs">
              Name: Z → A
            </SelectItem>
            <SelectItem value="low" className="text-xs">
              Price: Low → High
            </SelectItem>
            <SelectItem value="high" className="text-xs">
              Price: High → Low
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Count */}
        <p className="text-xs text-stone-400 ml-auto shrink-0">
          <span className="font-semibold text-stone-700">{total}</span> items
        </p>
      </div>
    </div>
  );
}

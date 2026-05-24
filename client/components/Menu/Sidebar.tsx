"use client";

import PriceRange from "./PriceRange";
import SearchBar from "./SearchBar";
import { useRouter, useSearchParams } from "next/navigation";
import { updateUrl } from "@/utils/menuPage";

export default function Sidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categories = ["breakfast", "lunch", "snacks", "drinks"];

  return (
    <aside className="w-64 h-screen sticky top-0 bg-white border-r border-stone-200 p-5 hidden md:block">
      <SearchBar />
      <h2 className="font-semibold text-lg mb-4">Filters</h2>

      {/* Categories */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-3">Categories</p>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => updateUrl({ category: cat }, router, searchParams)}
              className="text-sm bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full cursor-pointer transition"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <PriceRange />

      {/* Veg */}
      <div className="mb-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" />
          Veg Only
        </label>
      </div>

      {/* Sort */}
      <div>
        <p className="text-sm font-medium mb-2">Sort By</p>
        <select className="w-full border p-2 rounded">
          <option>Name</option>
          <option>Price: Low → High</option>
          <option>Price: High → Low</option>
        </select>
      </div>
    </aside>
  );
}

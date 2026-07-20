"use client";

import { useState } from "react";
import { SlidersHorizontal, Leaf, X } from "lucide-react";

const CATEGORIES = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snacks",
  "Drinks",
  "Desserts",
];

export default function FilterBar() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [vegOnly, setVegOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);

  const toggleCategory = (cat: string) =>
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );

  const activeCount =
    categories.length +
    (vegOnly ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 2000 ? 1 : 0);

  const pct = (v: number) => (v / 2000) * 100;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Toggle button */}
      <div className="relative">
        <button
          onClick={() => setOpen((p) => !p)}
          className={`flex items-center gap-2 h-9 px-3.5 rounded-xl border text-sm font-medium transition-all
            ${
              open || activeCount > 0
                ? "bg-stone-900 text-white border-stone-900"
                : "bg-white text-stone-700 border-stone-200 hover:border-stone-300"
            }`}
        >
          <SlidersHorizontal size={14} />
          Filters
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-white text-stone-900 text-[11px] font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>

        {/* Panel */}
        {open && (
          <div className="absolute left-0 top-full mt-2 w-72 bg-white border border-stone-200 rounded-2xl shadow-xl z-50 p-4 flex flex-col gap-4">
            {/* Categories */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-2">
                Category
              </p>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all
                      ${
                        categories.includes(cat)
                          ? "bg-stone-900 text-white border-stone-900"
                          : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-stone-100" />

            {/* Price range */}
            <div>
              <div className="flex justify-between mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-stone-400">
                  Price range
                </p>
                <span className="text-xs font-semibold text-stone-700">
                  Rs {priceRange[0]} – Rs{" "}
                  {priceRange[1] === 2000 ? "2000+" : priceRange[1]}
                </span>
              </div>
              <div className="relative h-1.5 bg-stone-100 rounded-full mx-1">
                <div
                  className="absolute h-full bg-stone-900 rounded-full"
                  style={{
                    left: `${pct(priceRange[0])}%`,
                    right: `${100 - pct(priceRange[1])}%`,
                  }}
                />
                <input
                  type="range"
                  min={0}
                  max={2000}
                  step={50}
                  value={priceRange[0]}
                  onChange={(e) => {
                    const v = +e.target.value;
                    if (v < priceRange[1]) setPriceRange([v, priceRange[1]]);
                  }}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                  style={{ zIndex: priceRange[0] > 1900 ? 5 : 3 }}
                />
                <input
                  type="range"
                  min={0}
                  max={2000}
                  step={50}
                  value={priceRange[1]}
                  onChange={(e) => {
                    const v = +e.target.value;
                    if (v > priceRange[0]) setPriceRange([priceRange[0], v]);
                  }}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                  style={{ zIndex: 4 }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-stone-900 rounded-full pointer-events-none shadow-sm"
                  style={{ left: `calc(${pct(priceRange[0])}% - 8px)` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-stone-900 rounded-full pointer-events-none shadow-sm"
                  style={{ left: `calc(${pct(priceRange[1])}% - 8px)` }}
                />
              </div>
            </div>

            <div className="h-px bg-stone-100" />

            {/* Veg only */}
            <button
              onClick={() => setVegOnly((p) => !p)}
              className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl border transition-all
                ${
                  vegOnly
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                    : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                }`}
            >
              <div className="flex items-center gap-2 text-sm font-medium">
                <Leaf
                  size={14}
                  className={vegOnly ? "text-emerald-600" : "text-stone-400"}
                />
                Veg only
              </div>
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center transition-colors
                ${vegOnly ? "bg-emerald-600 border-emerald-600" : "border-stone-300"}`}
              >
                {vegOnly && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M2 5l2.5 2.5L8 3"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </button>

            {/* Clear */}
            {activeCount > 0 && (
              <button
                onClick={() => {
                  setCategories([]);
                  setVegOnly(false);
                  setPriceRange([0, 2000]);
                }}
                className="text-xs text-stone-400 hover:text-stone-700 text-center transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Active chips */}
      {categories.map((cat) => (
        <span
          key={cat}
          className="inline-flex items-center gap-1.5 h-9 pl-3 pr-2 bg-stone-100 text-stone-700 text-xs font-medium rounded-xl border border-stone-200"
        >
          {cat}
          <button
            onClick={() => toggleCategory(cat)}
            className="w-4 h-4 rounded hover:bg-stone-200 flex items-center justify-center"
          >
            <X size={10} />
          </button>
        </span>
      ))}

      {vegOnly && (
        <span className="inline-flex items-center gap-1.5 h-9 pl-3 pr-2 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-xl border border-emerald-200">
          <Leaf size={11} /> Veg only
          <button
            onClick={() => setVegOnly(false)}
            className="w-4 h-4 rounded hover:bg-emerald-100 flex items-center justify-center"
          >
            <X size={10} />
          </button>
        </span>
      )}

      {(priceRange[0] > 0 || priceRange[1] < 2000) && (
        <span className="inline-flex items-center gap-1.5 h-9 pl-3 pr-2 bg-stone-100 text-stone-700 text-xs font-medium rounded-xl border border-stone-200">
          Rs {priceRange[0]}–{priceRange[1]}
          <button
            onClick={() => setPriceRange([0, 2000])}
            className="w-4 h-4 rounded hover:bg-stone-200 flex items-center justify-center"
          >
            <X size={10} />
          </button>
        </span>
      )}
    </div>
  );
}

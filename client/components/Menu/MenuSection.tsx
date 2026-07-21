"use client";

import { SubCategory } from "@/data/menu-data";
import { MenuCard } from "./MenuCard";

type Props = {
  subcategory: SubCategory;
  categoryLabel: string;
};

export function MenuSection({ subcategory, categoryLabel }: Props) {
  return (
    <section id={subcategory.id} className="scroll-mt-6">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-5">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 leading-none mb-1">
            {categoryLabel}
          </p>
          <h2 className="text-xl font-bold text-stone-900 leading-tight">
            {subcategory.label}
          </h2>
        </div>
        <div className="flex-1 h-px bg-stone-100 ml-2" />
        <span className="text-xs text-stone-400 shrink-0">
          {subcategory.items.length} items
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {subcategory.items.map((item: any) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

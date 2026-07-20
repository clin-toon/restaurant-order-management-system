"use client";

import Image from "next/image";
import { ShoppingCart, Plus } from "lucide-react";
import { MenuItem } from "@/data/menu-data";

const tagStyles: Record<string, string> = {
  Popular: "bg-amber-100 text-amber-700 border-amber-200",
  New: "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Chef's Pick": "bg-rose-100 text-rose-700 border-rose-200",
};

export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-stone-100">
        <Image
          src={item.image_url}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Tag */}
        {item.tag && (
          <span
            className={`absolute top-3 left-3 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${tagStyles[item.tag]} backdrop-blur-sm`}
          >
            {item.tag}
          </span>
        )}

        {/* Quick add button */}
        <button className="absolute bottom-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 hover:bg-stone-900 hover:text-white">
          <Plus size={14} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h4 className="font-semibold text-stone-900 text-sm leading-tight">
          {item.name}
        </h4>
        <p className="text-xs text-stone-400 mt-1 leading-relaxed line-clamp-2 flex-1">
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-stone-50">
          <span className="text-base font-bold text-stone-900">
            Rs {item.price}
          </span>
          <button className="flex items-center gap-1.5 bg-stone-900 hover:bg-stone-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors">
            <ShoppingCart size={11} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { Pencil, Trash2, Leaf } from "lucide-react";
import { MenuItem } from "@/types/admin.types";

const CATEGORY_STYLES: Record<string, string> = {
  snacks: "bg-amber-50 text-amber-700 border-amber-200",
  breakfast: "bg-rose-50 text-rose-700 border-rose-200",
  lunch: "bg-violet-50 text-violet-700 border-violet-200",
  dinner: "bg-blue-50 text-blue-700 border-blue-200",
  drinks: "bg-sky-50 text-sky-700 border-sky-200",
};

type Props = {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
};

export function MenuItemCard({ item, onEdit, onDelete }: Props) {
  const catStyle =
    CATEGORY_STYLES[item.category] ??
    "bg-stone-100 text-stone-600 border-stone-200";

  return (
    <div className="group bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-stone-100">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl">
            🍽️
          </div>
        )}

        {/* Availability badge */}
        <div
          className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${
            item.is_available
              ? "bg-emerald-500 text-white"
              : "bg-stone-500 text-white"
          }`}
        >
          {item.is_available ? "Available" : "Unavailable"}
        </div>

        {/* Veg badge */}
        {item.is_vegetarian && (
          <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
            <Leaf size={12} className="text-emerald-600" />
          </div>
        )}

        {/* Action buttons — appear on hover */}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200">
          <button
            onClick={() => onEdit(item)}
            className="w-8 h-8 bg-white rounded-xl shadow-md flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors"
            aria-label="Edit item"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => onDelete(item)}
            className="w-8 h-8 bg-white rounded-xl shadow-md flex items-center justify-center text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            aria-label="Delete item"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold text-stone-900 leading-tight line-clamp-1 flex-1">
            {item.name}
          </h3>
          <span className="text-sm font-black text-stone-900 shrink-0">
            Rs {parseFloat(item.price).toFixed(0)}
          </span>
        </div>

        <p className="text-xs text-stone-400 leading-relaxed line-clamp-2 flex-1">
          {item.description}
        </p>

        <div className="flex items-center gap-1.5 mt-auto pt-1 flex-wrap">
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border capitalize ${catStyle}`}
          >
            {item.category}
          </span>
          <span className="text-[10px] font-medium text-stone-400 bg-stone-50 border border-stone-100 px-2 py-0.5 rounded-full capitalize">
            {item.sub_category}
          </span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { ChevronRight } from "lucide-react";
import { Category } from "@/data/menu-data";
import { updateUrl } from "@/utils/menuPage";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  closeModal: () => void;
  category: Category;
  isOpen: boolean;
  activeId: string | null;
  onToggle: () => void;
};

export function CategoryAccordion({
  closeModal,
  category,
  isOpen,
  activeId,
  onToggle,
}: Props) {
  const router = useRouter();
  const search = useSearchParams();

  const handleFilterChangeForMainHead = () => {
    updateUrl({ category: "snacks" }, router, search);
    closeModal();
  };

  const handleFilterChangeForLabel = (label: any) => {
    updateUrl({ sub_category: label }, router, search);
    closeModal();
  };
  return (
    <div className="overflow-hidden">
      {/* Category header — toggle button */}
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group
          ${isOpen ? "bg-orange-600 text-white" : "hover:bg-stone-100 text-stone-700"}`}
      >
        <span className="text-base leading-none">{category.emoji}</span>
        <span
          className="flex-1 text-sm font-semibold tracking-tight"
          onClick={handleFilterChangeForMainHead}
        >
          {category.label}
        </span>
        <ChevronRight
          size={14}
          className={`shrink-0 transition-transform duration-300
            ${isOpen ? "rotate-90 text-white" : "text-stone-400 group-hover:text-stone-600"}`}
        />
      </button>

      {/* Subcategories — animated expand */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="ml-4 mt-1 mb-1 border-l-2 border-stone-100 pl-3 flex flex-col gap-0.5">
          {category.subcategories.map((sub) => {
            const isActive = activeId === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => handleFilterChangeForLabel(sub.label)}
                className={`w-full cursor-pointer text-left text-sm px-3 py-2 rounded-lg transition-all duration-150 flex items-center gap-2
                  ${
                    isActive
                      ? "bg-stone-100 text-stone-900 font-semibold"
                      : "text-stone-500 hover:text-stone-800 hover:bg-stone-50 font-medium"
                  }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-900 shrink-0" />
                )}
                {sub.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

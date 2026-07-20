"use client";

import { useState } from "react";
import { menuData } from "@/data/menu-data";
import { CategoryAccordion } from "./Categoryaccordion";
import { X } from "lucide-react";

type Props = {
  activeId: string | null;
  mobileOpen: boolean;
  onMobileClose: () => void;
};

export function MenuSidebar({ activeId, mobileOpen, onMobileClose }: Props) {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    { [menuData[0].id]: true },
  );

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 px-3 mb-2">
          Categories
        </p>
        {menuData.map((category) => (
          <CategoryAccordion
            closeModal={onMobileClose}
            key={category.id}
            category={category}
            isOpen={!!openCategories[category.id]}
            activeId={activeId}
            onToggle={() => toggleCategory(category.id)}
          />
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 lg:w-64 shrink-0 h-screen sticky top-0 bg-white border-r border-stone-100">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          {/* Drawer */}
          <aside className="absolute left-0 top-0 h-full w-72 bg-white shadow-2xl flex flex-col">
            <button
              onClick={onMobileClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center hover:bg-stone-200 transition-colors"
            >
              <X size={14} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}

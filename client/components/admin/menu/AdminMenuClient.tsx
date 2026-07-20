"use client";

import { useEffect, useState } from "react";
import { Plus, UtensilsCrossed } from "lucide-react";
import { MenuItem } from "@/types/admin.types";
import { MenuFilterBar } from "./MenuFilterBar";
import { MenuItemCard } from "./MenuItemCard";

import { Button } from "@/components/ui/button";
import { useMenu } from "@/hooks/admin/useMenu";
import { updateUrlForAdminMenu } from "@/utils/menuPage";
import { useRouter, useSearchParams } from "next/navigation";
import MenuModal from "./MenuModal";
import MenuItemModal from "./MeniItemModal";
import { useMenuItemModal } from "@/hooks/admin/useMenuModal";

type Props = { initialItems: MenuItem[] };

export default function AdminMenuClient({ initialItems }: Props) {
  const [items, setItems] = useState<MenuItem[]>(initialItems);
  const router = useRouter();
  const searchp = useSearchParams();
  const {
    search,
    setSearch,
    setCategory,
    sort,
    setSort,
    category,
    selectedItem,
    openCreate,
    openEdit,
    openDelete,
    closeModal,
    handleDelete,
    handleSave,
    modalMode,
  } = useMenu();

  const handleFilter = () => {
    updateUrlForAdminMenu(
      {
        query: search,
        category: category,
        sort: sort,
      },
      router,
      searchp,
    );
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleFilter();
    }, 700);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search, category, sort]);

  const available = items.filter((i) => i.is_available).length;
  const vegetarian = items.filter((i) => i.is_vegetarian).length;

  return (
    <>
      <div className="min-h-screen bg-stone-50 p-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2.5 mb-0.5">
                <UtensilsCrossed size={18} className="text-stone-700" />
                <h1 className="text-xl font-black text-stone-900 tracking-tight">
                  Menu Items
                </h1>
              </div>
              <p className="text-sm text-stone-400">
                Manage all dishes and drinks on your menu
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {available} Available
              </span>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                {vegetarian} Veg
              </span>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                {items.length} Total
              </span>
              <Button
                onClick={openCreate}
                className="h-9 rounded-xl bg-stone-900 hover:bg-stone-700 text-xs font-semibold"
              >
                <Plus size={13} /> Add Item
              </Button>
            </div>
          </div>

          {/* Filters */}
          <MenuFilterBar
            search={search}
            sort={sort}
            category={category}
            onSearch={setSearch}
            total={items.length}
            onSort={setSort}
            onCategory={setCategory}
          />

          {/* Grid */}
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center">
                <UtensilsCrossed size={28} className="text-stone-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-700">
                  No items found
                </p>
                <p className="text-xs text-stone-400 mt-1">
                  Try adjusting your filters or add a new item
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {initialItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onEdit={openEdit}
                  onDelete={openDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <MenuItemModal
        open={modalMode}
        mode={modalMode}
        item={selectedItem}
        onClose={closeModal}
        onDelete={handleDelete}
        onSave={handleSave}
      />
    </>
  );
}

import { useState } from "react";
import { ModalMode } from "@/components/admin/menu/MenuItemModal";
import { MenuItem, SortOption, CategoryFilter } from "@/types/admin.types";

export const useMenu = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("");
  const [category, setCategory] = useState<CategoryFilter>("");
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const openCreate = () => {
    setSelectedItem(null);
    setModalMode("create");
  };
  const openEdit = (i: MenuItem) => {
    setSelectedItem(i);
    setModalMode("edit");
  };
  const openDelete = (i: MenuItem) => {
    setSelectedItem(i);
    setModalMode("delete");
  };
  const closeModal = () => {
    setModalMode(null);
    setSelectedItem(null);
  };

  // Wire to your real API
  const handleSave = async (data: Partial<MenuItem>) => {
    if (modalMode === "create") {
      console.log("POST /admin/menu-items", data);
      // const res = await createMenuItem(data);
      // setItems((prev) => [res.data, ...prev]);
    } else {
      console.log("PATCH /admin/menu-items/:id", data);
      // const res = await updateMenuItem(selectedItem!.id, data);
      // setItems((prev) => prev.map((i) => i.id === selectedItem!.id ? res.data : i));
    }
  };

  const handleDelete = async (id: string) => {
    console.log("DELETE /admin/menu-items/:id", id);
    // await deleteMenuItem(id);
    // setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return {
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
    modalMode,
    setModalMode,
    handleSave,
    handleDelete,
  };
};

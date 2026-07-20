"use client";

import { useState, useEffect, useRef } from "react";
import { MenuItem } from "@/types/admin.types";
import { addNewMenuItem } from "@/services/menu-admin.services";

export type ModalMode = "create" | "edit" | "delete" | null;

export type FormState = {
  name: string;
  description: string;
  price: string;
  category: string;
  sub_category: string;
  is_available: boolean;
  is_vegetarian: boolean;
  image_url: string;
  imageFile?: File | null;
};

export type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = {
  name: "",
  description: "",
  price: "",
  category: "",
  sub_category: "",
  is_available: true,
  is_vegetarian: false,
  image_url: "",
  imageFile: null,
};

export const CATEGORIES = ["snacks", "breakfast", "lunch", "dinner", "drinks"];

export const SUB_CATEGORIES: Record<string, string[]> = {
  snacks: ["momo", "chowmein", "fries", "samosa", "other"],
  breakfast: ["nepali_breakfast", "eggs", "toast", "other"],
  lunch: ["burger", "bowl", "wrap", "other"],
  dinner: ["pizza", "pasta", "dal_bhat", "other"],
  drinks: ["coffee", "tea", "juice", "beer", "other"],
};

export function useMenuItemModal(
  mode: ModalMode,
  item: MenuItem | null,
  open: boolean,
  onSave: (data: Partial<MenuItem>) => Promise<void>,
  onDelete: (id: string) => Promise<void>,
  onClose: () => void,
) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pre-fill or reset when modal opens
  useEffect(() => {
    if (!open) return;
    if (mode === "edit" && item) {
      setForm({
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        sub_category: item.sub_category,
        is_available: item.is_available,
        is_vegetarian: item.is_vegetarian,
        image_url: item.image_url,
      });
      setImagePreview(item.image_url ?? "");
    } else {
      setForm({ ...EMPTY });
      setImagePreview("");
    }
    setErrors({});
    setLoading(false);
  }, [open, mode, item]);

  // Update a single field
  const setField = (key: keyof FormState, value: any) => {
    setForm((prev) => {
      if (key === "category") {
        return { ...prev, category: value, sub_category: "" };
      }
      return { ...prev, [key]: value };
    });
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  // Handle image file upload from device
  const handleImageFile = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        image_url: "Please upload a valid image file",
      }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, image_url: "Image must be under 5MB" }));
      return;
    }
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setField("image_url", url);
    setField("image", file);
    if (errors.image_url)
      setErrors((prev) => ({ ...prev, image_url: undefined }));
  };

  const handleFilePick = () => fileInputRef.current?.click();

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageFile(file);
  };

  // Validation
  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (
      !form.price.trim() ||
      isNaN(parseFloat(form.price)) ||
      parseFloat(form.price) <= 0
    )
      e.price = "Enter a valid price";
    if (!form.category) e.category = "Select a category";
    if (!form.sub_category) e.sub_category = "Select a sub-category";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      console.log(form);
      await addNewMenuItem(form);
      await onSave({ ...form });
      onClose();
    } catch {
      /* handle API error here */
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!item) return;
    setLoading(true);
    try {
      await onDelete(item.id);
      onClose();
    } catch {
      /* handle API error here */
    } finally {
      setLoading(false);
    }
  };

  const subOptions = SUB_CATEGORIES[form.category] ?? [];

  return {
    form,
    errors,
    loading,
    imagePreview,
    fileInputRef,
    subOptions,
    setField,
    handleImageFile,
    handleFilePick,
    handleFileDrop,
    handleSave,
    handleDelete,
  };
}

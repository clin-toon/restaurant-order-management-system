"use client";

import { useEffect } from "react";
import Image from "next/image";
import {
  X,
  Plus,
  Pencil,
  Loader2,
  Upload,
  Trash2,
  AlertTriangle,
  ImagePlus,
  Check,
} from "lucide-react";
import { MenuItem } from "@/types/admin.types";
import { CATEGORIES, SUB_CATEGORIES } from "@/data/admin-data";
import { useMenuItemModal } from "@/hooks/admin/useMenuModal";
import { ModalMode } from "@/hooks/admin/useMenuModal";
import DeleteMenuItem from "./DeleteMenuItem";

type Props = {
  open: boolean;
  mode: ModalMode;
  item: MenuItem | null;
  onClose: () => void;
  onSave: (data: Partial<MenuItem>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export default function MenuItemModal({
  open,
  mode,
  item,
  onClose,
  onSave,
  onDelete,
}: Props) {
  const {
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
  } = useMenuItemModal(mode, item, open, onSave, onDelete, onClose);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open || !mode) return null;

  if (mode === "delete") {
    return (
      <DeleteMenuItem
        onClose={onClose}
        handleDelete={handleDelete}
        loading={loading}
        item={item}
      />
    );
  }
  const isEdit = mode === "edit";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal card */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden z-10">
        {/* Accent top bar */}
        <div
          className={`h-1.5 w-full ${isEdit ? "bg-gradient-to-r from-stone-700 to-stone-900" : "bg-gradient-to-r from-emerald-500 to-teal-600"}`}
        />

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-stone-100 shrink-0">
          <div className="flex items-center gap-4">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm ${isEdit ? "bg-stone-900" : "bg-gradient-to-br from-emerald-500 to-teal-600"}`}
            >
              {isEdit ? (
                <Pencil size={16} className="text-white" />
              ) : (
                <Plus size={16} className="text-white" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900 tracking-tight">
                {isEdit ? `Editing — ${item?.name}` : "Add New Menu Item"}
              </h2>
              <p className="text-xs text-stone-400 mt-0.5">
                {isEdit
                  ? "Update the fields and save your changes"
                  : "Fill in the details to add a dish to your menu"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-400 hover:text-stone-800 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-stone-100">
            {/* ── LEFT: Details ── */}
            <div className="p-8 flex flex-col gap-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-stone-400">
                Item Details
              </p>

              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-stone-600">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Buff Momo"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  className={`w-full h-11 px-4 rounded-xl border text-sm text-stone-900 placeholder:text-stone-300 outline-none transition-all
                    ${
                      errors.name
                        ? "border-red-400 bg-red-50/60 focus:ring-2 focus:ring-red-100"
                        : "border-stone-200 bg-stone-50 focus:border-stone-400 focus:bg-white focus:ring-2 focus:ring-stone-100"
                    }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <span>⚠</span>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-stone-600">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="A short, appetising description of this dish…"
                  value={form.description}
                  onChange={(e) => setField("description", e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-stone-900 placeholder:text-stone-300 outline-none transition-all resize-none
                    ${
                      errors.description
                        ? "border-red-400 bg-red-50/60 focus:ring-2 focus:ring-red-100"
                        : "border-stone-200 bg-stone-50 focus:border-stone-400 focus:bg-white focus:ring-2 focus:ring-stone-100"
                    }`}
                />
                {errors.description && (
                  <p className="text-xs text-red-500">⚠ {errors.description}</p>
                )}
              </div>

              {/* Price */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-stone-600">
                  Price <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-stone-400">
                    Rs
                  </span>
                  <input
                    type="number"
                    placeholder="0"
                    value={form.price}
                    onChange={(e) => setField("price", e.target.value)}
                    className={`w-full h-11 pl-11 pr-4 rounded-xl border text-sm text-stone-900 outline-none transition-all
                      ${
                        errors.price
                          ? "border-red-400 bg-red-50/60 focus:ring-2 focus:ring-red-100"
                          : "border-stone-200 bg-stone-50 focus:border-stone-400 focus:bg-white focus:ring-2 focus:ring-stone-100"
                      }`}
                  />
                </div>
                {errors.price && (
                  <p className="text-xs text-red-500">⚠ {errors.price}</p>
                )}
              </div>

              {/* Category + Sub-category */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-stone-600">
                    Category <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setField("category", e.target.value)}
                    className={`h-11 px-3 rounded-xl border text-sm text-stone-900 outline-none transition-all appearance-none cursor-pointer
                      ${
                        errors.category
                          ? "border-red-400 bg-red-50/60"
                          : "border-stone-200 bg-stone-50 focus:border-stone-400 focus:ring-2 focus:ring-stone-100"
                      }`}
                  >
                    <option value="" disabled>
                      Select…
                    </option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c} className="capitalize">
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-xs text-red-500">⚠ {errors.category}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-stone-600">
                    Sub-category <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={form.sub_category}
                    onChange={(e) => setField("sub_category", e.target.value)}
                    disabled={!form.category}
                    className={`h-11 px-3 rounded-xl border text-sm text-stone-900 outline-none transition-all appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed
                      ${
                        errors.sub_category
                          ? "border-red-400 bg-red-50/60"
                          : "border-stone-200 bg-stone-50 focus:border-stone-400 focus:ring-2 focus:ring-stone-100"
                      }`}
                  >
                    <option value="" disabled>
                      {form.category ? "Select…" : "Pick category first"}
                    </option>
                    {subOptions.map((s) => (
                      <option key={s} value={s} className="capitalize">
                        {s.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                  {errors.sub_category && (
                    <p className="text-xs text-red-500">
                      ⚠ {errors.sub_category}
                    </p>
                  )}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-col gap-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-stone-400">
                  Options
                </p>
                <div className="flex flex-col gap-2.5">
                  {[
                    {
                      key: "is_available" as const,
                      label: "Available on menu",
                      desc: "Customers can see and order this item",
                    },
                    {
                      key: "is_vegetarian" as const,
                      label: "Vegetarian dish",
                      desc: "Mark as veg for dietary filtering",
                    },
                  ].map(({ key, label, desc }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setField(key, !form[key])}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all text-left
                        ${
                          form[key]
                            ? "bg-stone-900 border-stone-900 text-white"
                            : "bg-stone-50 border-stone-200 hover:border-stone-300 text-stone-700"
                        }`}
                    >
                      <div>
                        <p
                          className={`text-sm font-semibold ${form[key] ? "text-white" : "text-stone-800"}`}
                        >
                          {label}
                        </p>
                        <p
                          className={`text-xs mt-0.5 ${form[key] ? "text-white/55" : "text-stone-400"}`}
                        >
                          {desc}
                        </p>
                      </div>
                      <div
                        className={`w-9 h-5 rounded-full relative transition-all shrink-0 ${form[key] ? "bg-white/25" : "bg-stone-200"}`}
                      >
                        <div
                          className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-200 shadow-sm ${form[key] ? "left-4 bg-white" : "left-0.5 bg-stone-400"}`}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Image ── */}
            <div className="p-8 flex flex-col gap-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-stone-400">
                Food Image
              </p>

              {/* Upload zone */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                onClick={handleFilePick}
                className="relative cursor-pointer rounded-2xl border-2 border-dashed border-stone-200 hover:border-stone-400 transition-colors group overflow-hidden"
                style={{ minHeight: 280 }}
              >
                {imagePreview ? (
                  <>
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                      sizes="500px"
                      unoptimized={imagePreview.startsWith("blob:")}
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg">
                          <Upload size={16} className="text-stone-700" />
                        </div>
                        <span className="text-xs text-white font-semibold bg-black/50 px-3 py-1 rounded-full">
                          Change image
                        </span>
                      </div>
                    </div>
                    {/* Check badge */}
                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center shadow-md">
                      <Check
                        size={13}
                        className="text-white"
                        strokeWidth={2.5}
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-stone-100 group-hover:bg-stone-200 transition-colors flex items-center justify-center">
                      <ImagePlus
                        size={22}
                        className="text-stone-400 group-hover:text-stone-600 transition-colors"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-600 group-hover:text-stone-800 transition-colors">
                        Click or drag & drop
                      </p>
                      <p className="text-xs text-stone-400 mt-1">
                        PNG, JPG, WEBP up to 5MB
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-stone-300">
                      <div className="h-px w-12 bg-stone-200" />
                      <span>or</span>
                      <div className="h-px w-12 bg-stone-200" />
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg group-hover:bg-stone-700 transition-colors">
                      <Upload size={12} />
                      Browse files
                    </div>
                  </div>
                )}
              </div>

              {errors.image_url && (
                <p className="text-xs text-red-500">⚠ {errors.image_url}</p>
              )}

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageFile(e.target.files?.[0] ?? null)}
              />

              {/* Image info */}
              {imagePreview && (
                <div className="flex items-center justify-between text-xs text-stone-400 px-1">
                  <span>Image uploaded ✓</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setField("image_url", "");
                      // Reset preview via parent field call works since imagePreview = form.image_url
                    }}
                    className="text-red-400 hover:text-red-600 font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Summary card (edit mode) */}
              {isEdit && item && (
                <div className="mt-auto p-4 bg-stone-50 rounded-2xl border border-stone-100 flex flex-col gap-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                    Editing
                  </p>
                  <p className="text-sm font-bold text-stone-900">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-200 text-stone-600 capitalize">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 capitalize">
                      {item.sub_category?.replace(/_/g, " ")}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-900 text-white">
                      Rs {parseFloat(item.price).toFixed(0)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-8 py-5 border-t border-stone-100 bg-stone-50/60 shrink-0">
          <p className="text-xs text-stone-400">
            <span className="text-red-400">*</span> Required fields
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="h-11 px-6 rounded-xl border border-stone-200 bg-white text-stone-600 text-sm font-semibold hover:bg-stone-100 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className={`h-11 px-8 rounded-xl text-white text-sm font-bold transition-all disabled:opacity-60 flex items-center gap-2 shadow-sm
                ${
                  isEdit
                    ? "bg-stone-900 hover:bg-stone-700"
                    : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                }`}
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Saving…
                </>
              ) : isEdit ? (
                "Save Changes"
              ) : (
                "Create Item"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

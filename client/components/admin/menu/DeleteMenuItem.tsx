import { Trash2, AlertTriangle, Loader2, X } from "lucide-react";
import Image from "next/image";

const DeleteMenuItem = ({ onClose, item, loading, handleDelete }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      {/* Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden z-10">
        {/* Red top bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-red-500 to-rose-600" />

        <div className="p-7 flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-red-100 flex items-center justify-center shrink-0">
                <Trash2 size={18} className="text-red-600" />
              </div>
              <div>
                <h2 className="text-base font-bold text-stone-900 tracking-tight">
                  Delete Item
                </h2>
                <p className="text-xs text-stone-400 mt-0.5">
                  This cannot be undone
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-400 hover:text-stone-700 transition-colors"
            >
              <X size={14} />
            </button>
          </div>

          {/* Item preview card */}
          <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-2xl border border-stone-100">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-200 shrink-0">
              {item?.image_url ? (
                <Image
                  src={item.image_url}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl">
                  🍽️
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-stone-900 truncate">
                {item?.name}
              </p>
              <p className="text-xs text-stone-400 capitalize mt-0.5">
                {item?.category} · {item?.sub_category?.replace(/_/g, " ")}
              </p>
              <p className="text-sm font-black text-stone-800 mt-1">
                Rs {item?.price ? parseFloat(item.price).toFixed(0) : "—"}
              </p>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl">
            <AlertTriangle size={15} className="text-red-500 shrink-0 mt-0.5" />
            <p className="text-xs text-red-600 leading-relaxed">
              Permanently removing{" "}
              <span className="font-bold">{item?.name}</span> will take it off
              the menu immediately and cannot be recovered.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 h-11 rounded-xl border border-stone-200 text-stone-600 text-sm font-semibold hover:bg-stone-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 h-11 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Deleting…
                </>
              ) : (
                <>
                  <Trash2 size={14} /> Delete Item
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteMenuItem;

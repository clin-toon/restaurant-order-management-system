"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/ModalContextHook";

type ConfirmModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  actionWord?: string;
};

export default function ConfirmModal({
  open,
  onOpenChange,
  title,
  description,

  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  actionWord,
}: ConfirmModalProps) {
  const { state } = useModal();
  const { onConfirm } = state;
  console.log(onConfirm);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div
        className="fixed inset-0 z-50 pointer-events-none"
        aria-hidden="true"
      />

      <DialogContent className="sm:max-w-sm rounded-2xl border border-stone-200 shadow-xl p-6 bg-white overflow-hidden">
        <DialogHeader className="space-y-1 mb-6">
          <DialogTitle className="text-base font-semibold text-stone-900 tracking-tight">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-stone-400 leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2">
          <button
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="cursor-pointer flex-1 py-2.5 rounded-xl text-sm font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={() => onConfirm()}
            disabled={loading}
            className="cursor-pointer flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Processing…
              </>
            ) : (
              actionWord
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

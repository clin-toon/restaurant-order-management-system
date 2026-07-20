"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { updateUrl } from "@/utils/menuPage";
import { useRouter, useSearchParams } from "next/navigation";

const OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "asc", label: "A → Z" },
  { value: "dsc", label: "Z → A" },
];

export default function SortDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("latest");
  const router = useRouter();
  const search = useSearchParams();

  const current = OPTIONS.find((o) => o.value === selected)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className={`flex items-center gap-2 h-9 px-3.5 rounded-xl border text-sm font-medium transition-all
          ${
            open
              ? "bg-stone-900 text-white border-stone-900"
              : "bg-white text-stone-700 border-stone-200 hover:border-stone-300 hover:bg-stone-50"
          }`}
      >
        {current.label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-36 bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden z-50">
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setSelected(opt.value);
                setOpen(false);
                updateUrl({ sort: opt.value }, router, search);
              }}
              className={`cursor-pointer w-full flex items-center justify-between px-3.5 py-2.5 text-sm transition-colors
                ${
                  opt.value === selected
                    ? "bg-stone-50 text-stone-900 font-medium"
                    : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                }`}
            >
              {opt.label}
              {opt.value === selected && <Check size={13} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

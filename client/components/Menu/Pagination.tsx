"use client";

import { updateUrl } from "@/utils/menuPage";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Pagination({ lastPage }: any) {
  const router = useRouter();
  const search = useSearchParams();

  const startPage = search.get("page") || 1;

  const handlePagination = (page: any) => {
    if (page < 1 || page > lastPage) {
      return;
    }

    updateUrl({ page: page }, router, search);
  };

  return (
    <div className="flex items-center gap-3 ">
      {/* Prev */}
      <button
        onClick={() => {
          handlePagination(Number(startPage) - 1);
        }}
        className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-400 hover:border-stone-300 hover:text-stone-700 transition-colors"
      >
        <ChevronLeft size={15} />
      </button>

      {/* Page info */}
      <p className="text-sm text-stone-500">
        Page{" "}
        <span className="font-semibold text-stone-900">{startPage || 1}</span>{" "}
        of <span className="font-semibold text-stone-900">{lastPage}</span>
      </p>

      {/* Next */}
      <button
        onClick={() => {
          handlePagination(Number(startPage) + 1);
        }}
        className="cursor-pointer w-9 h-9 flex items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-400 hover:border-stone-300 hover:text-stone-700 transition-colors"
      >
        <ChevronRight size={15} />
      </button>
    </div>
  );
}

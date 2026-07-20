"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { updateUrl } from "@/utils/menuPage";
import { X, Search } from "lucide-react";

export default function SearchBar() {
  const [searchVal, setSearchVal] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateUrl({ query: searchVal }, router, searchParams);
    }
  };

  return (
    <div className="relative w-full max-w-[600px] mb-3">
      <div className="flex items-center bg-white border border-stone-200 rounded-full hover:border-stone-300 transition-all duration-150">
        <input
          type="text"
          value={searchVal}
          placeholder="Search for your favourite food or drinks..."
          autoComplete="off"
          onKeyUp={handleSearch}
          onChange={(e) => setSearchVal(e.target.value)}
          className="flex-1 bg-transparent outline-none text-[15px] text-stone-900 placeholder:text-stone-400 px-4 py-2.5 h-[42px]"
        />

        {searchVal && (
          <button
            onClick={() => setSearchVal("")}
            className="text-stone-400 hover:text-stone-600 px-2 h-[42px] flex items-center justify-center transition-colors"
            aria-label="Clear"
          >
            <X size={16} />
          </button>
        )}

        <div className="w-px h-6 bg-stone-200" />

        <button
          onClick={() => updateUrl({ query: searchVal }, router, searchParams)}
          aria-label="Search"
          className="bg-orange-400 cursor-pointer text-white hover:bg-orange-600   px-4 h-[42px] rounded-r-full flex items-center justify-center border-l  transition-colors"
        >
          <Search size={17} />
        </button>
      </div>
    </div>
  );
}

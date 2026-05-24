"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { updateUrl } from "@/utils/menuPage";

export default function SearchBar() {
  const [searchVal, setSearchVal] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateUrl({ query: searchVal }, router, searchParams);
    }
  };

  return (
    <div className="w-full mb-3 bg-white sticky top-0 z-10">
      <input
        type="text"
        placeholder="Search food..."
        value={searchVal}
        onChange={handleChange}
        onKeyDown={handleSearch}
        className="w-full max-w-lg border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-orange-400"
      />
    </div>
  );
}

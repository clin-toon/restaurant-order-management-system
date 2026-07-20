"use client";

import { updateUrl } from "@/utils/menuPage";
import { Button } from "../ui/button";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

const category = [
  "All",
  "drinks",
  "snacks",
  "breakfast",
  "starters",
  "desserts",
];

const Categorybar = () => {
  const router = useRouter();
  const search = useSearchParams();
  const [isActive, setIsActive] = useState<string>("All");

  const handleClick = (item: any) => {
    updateUrl({ category: item.toLowerCase() }, router, search);

    setIsActive(item);
  };
  return (
    <div className="flex items-center justify-evenly">
      {category.map((item) => {
        return (
          <Button
            key={item}
            className={`bg-orange-500 cursor-pointer hover:bg-slate-900 ${isActive === item && "bg-slate-900"}`}
            onClick={() => {
              handleClick(item);
            }}
          >
            {item}{" "}
          </Button>
        );
      })}
    </div>
  );
};

export default Categorybar;

"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";

const PriceRange = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([100, 500]);

  return (
    <div className="mb-6">
      <p className="text-sm font-medium mb-4">Price Range</p>

      <Slider
        value={priceRange}
        onValueChange={(value) => setPriceRange(value as [number, number])}
        min={0}
        max={1000}
        step={10}
        className="w-full"
      />

      <div className="flex justify-between text-sm mt-2">
        <span>${priceRange[0]}</span>
        <span>${priceRange[1]}</span>
      </div>
    </div>
  );
};

export default PriceRange;

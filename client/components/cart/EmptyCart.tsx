import React from "react";
import { PackageOpen, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-28 gap-5 text-center">
      <div className="w-20 h-20 rounded-2xl bg-stone-100 flex items-center justify-center">
        <PackageOpen size={36} className="text-stone-400" />
      </div>
      <div>
        <p className="text-lg font-semibold text-stone-800">
          Your cart is empty
        </p>
        <p className="text-sm text-stone-400 mt-1 max-w-xs">
          Looks like you haven't added anything yet. Head to the menu and treat
          yourself.
        </p>
      </div>
      <Link
        href="/menu"
        className="mt-2 inline-flex items-center gap-2 bg-orange-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-stone-700 transition-colors"
      >
        Browse Menu <ChevronRight size={15} />
      </Link>
    </div>
  );
};

export default EmptyCart;

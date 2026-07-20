"use client";

import { useState } from "react";

import { MenuSidebar } from "./Menusidebar";
import { Button } from "../ui/button";
import { SlidersHorizontal } from "lucide-react";

export function MenuPageClient() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const showFiltersBar = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="flex h-screen bg-stone-50 overflow-hidden">
      <div className="fixed bottom-4 right-4 z-50 sm:hidden">
        <Button className="bg-orange-500" onClick={showFiltersBar}>
          <SlidersHorizontal /> Filters{" "}
        </Button>
      </div>
      <MenuSidebar
        activeId={activeId}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
    </div>
  );
}

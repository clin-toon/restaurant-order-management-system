"use client";

import { ADMIN_NAV } from "@/data/admin-data";
import { SidebarFlatItem } from "./Sidebarflatitem";
import { SidebarAccordionItem } from "./Sidebaraccordionitem";

type Props = { collapsed: boolean };

export function SidebarNav({ collapsed }: Props) {
  return (
    <nav className="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {ADMIN_NAV.map(({ group, items }) => (
        <div key={group}>
          {!collapsed && (
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/20 px-3 mb-1.5">
              {group}
            </p>
          )}
          {collapsed && <div className="h-px bg-white/6 mx-1 mb-2" />}

          <div className="flex flex-col gap-0.5">
            {items.map((item) => (
              <SidebarFlatItem
                key={item.label}
                item={item}
                collapsed={collapsed}
              />
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}

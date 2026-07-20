"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavItem } from "@/data/admin-data";
import { SidebarBadge } from "./Sidebarbadge";

type Props = {
  item: NavItem;
  collapsed: boolean;
};

export function SidebarAccordionItem({ item, collapsed }: Props) {
  const pathname = usePathname();
  const anyActive = item.children?.some(
    (c) => pathname === c.href || pathname.startsWith(c.href),
  );
  const [open, setOpen] = useState(!!anyActive);

  const trigger = (
    <button
      onClick={() => !collapsed && setOpen((p) => !p)}
      className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group w-full
        ${
          anyActive
            ? "text-white"
            : "text-white/50 hover:text-white/85 hover:bg-white/5"
        }`}
    >
      {anyActive && (
        <span
          className="absolute inset-0 rounded-xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(34,197,94,0.12), rgba(34,197,94,0.04))",
            border: "1px solid rgba(34,197,94,0.15)",
          }}
        />
      )}

      <item.icon
        size={16}
        className={`relative shrink-0 transition-colors
          ${anyActive ? "text-green-400" : "text-white/35 group-hover:text-white/60"}`}
      />

      {!collapsed && (
        <>
          <span className="relative flex-1 text-left truncate">
            {item.label}
          </span>
          {(item.badge ?? 0) > 0 && <SidebarBadge count={item.badge!} />}
          <ChevronDown
            size={13}
            className={`relative text-white/25 transition-transform duration-200 shrink-0
              ${open ? "rotate-180" : ""}`}
          />
        </>
      )}
    </button>
  );

  return (
    <div>
      {collapsed ? (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>{trigger}</TooltipTrigger>
            <TooltipContent side="right" className="text-xs font-medium">
              {item.label}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        trigger
      )}

      {/* Children */}
      {!collapsed && (
        <div
          className={`overflow-hidden transition-all duration-250 ease-in-out
            ${open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="ml-4 mt-0.5 mb-1 border-l border-white/8 pl-3 flex flex-col gap-0.5 py-0.5">
            {item.children?.map((child) => {
              const childActive =
                pathname === child.href || pathname.startsWith(child.href);
              return (
                <Link
                  key={child.href}
                  href={child.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors
                    ${
                      childActive
                        ? "text-green-400 bg-green-500/10 font-semibold"
                        : "text-white/40 hover:text-white/70 hover:bg-white/5 font-medium"
                    }`}
                >
                  {childActive && (
                    <span className="w-1 h-1 rounded-full bg-green-400 shrink-0" />
                  )}
                  {child.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

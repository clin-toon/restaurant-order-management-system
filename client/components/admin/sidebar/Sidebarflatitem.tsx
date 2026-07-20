"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
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

export function SidebarFlatItem({ item, collapsed }: Props) {
  const pathname = usePathname();
  const active = item.href
    ? pathname === item.href || pathname.startsWith(item.href + "/")
    : false;

  const content = (
    <Link
      href={item.href!}
      className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group w-full
        ${
          active
            ? "text-white"
            : "text-white/50 hover:text-white/85 hover:bg-white/5"
        }`}
    >
      {/* Active bg glow */}
      {active && (
        <span
          className="absolute inset-0 rounded-xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.06))",
            border: "1px solid rgba(34,197,94,0.2)",
          }}
        />
      )}

      {/* Active left bar */}
      {active && (
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full"
          style={{ background: "#22c55e" }}
        />
      )}

      <item.icon
        size={16}
        className={`relative shrink-0 transition-colors
          ${
            active
              ? "text-green-400"
              : "text-white/35 group-hover:text-white/60"
          }`}
      />

      {!collapsed && (
        <>
          <span className="relative flex-1 truncate">{item.label}</span>
          {(item.badge ?? 0) > 0 ? (
            <SidebarBadge count={item.badge!} />
          ) : (
            active && (
              <ChevronRight
                size={11}
                className="relative text-green-400/50 shrink-0"
              />
            )
          )}
        </>
      )}
    </Link>
  );

  if (collapsed) {
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent side="right" className="text-xs font-medium">
            {item.label}
            {(item.badge ?? 0) > 0 && (
              <span className="ml-1 text-green-400">({item.badge})</span>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
}

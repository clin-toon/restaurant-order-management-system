"use client";

import { LogOut } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/context/AuthContext/AuthContext";
import { handleLogout } from "@/services/auth.services";
type Props = { collapsed: boolean };

export function SidebarFooter({ collapsed }: Props) {
  const { user } = useAuth();

  return (
    <div className="border-t border-white/6 px-2 py-3 flex flex-col gap-1.5 shrink-0">
      {/* User card */}
      <div
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5
          ${collapsed ? "justify-center" : ""}`}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white shrink-0"
          style={{
            background: "linear-gradient(135deg, #1e3a5f 0%, #14532d 100%)",
          }}
        >
          {user?.name?.charAt(0).toUpperCase() ?? "A"}
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate leading-none">
              {user?.name ?? "Admin"}
            </p>
            <p className="text-[10px] text-white/35 mt-0.5 truncate">
              {user?.email ?? "admin@eatly.com"}
            </p>
          </div>
        )}
      </div>

      {/* Logout */}
      {collapsed ? (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleLogout}
                className="flex items-center cursor-pointer justify-center px-3 py-2.5 rounded-xl text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all w-full"
              >
                <LogOut size={15} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">
              Sign out
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <button
          onClick={handleLogout}
          className="cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/35 hover:text-red-400 hover:bg-red-500/8 transition-all w-full"
        >
          <LogOut size={15} className="shrink-0" />
          Sign out
        </button>
      )}
    </div>
  );
}

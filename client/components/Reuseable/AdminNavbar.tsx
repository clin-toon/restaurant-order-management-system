"use client";

import { useState } from "react";
import { Menu, X, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { UtensilsCrossed } from "lucide-react";
import { SidebarLogo } from "@/components/admin/sidebar/Sidebarlogo";
import { SidebarNav } from "@/components/admin/sidebar/Sidebarnav";
import { SidebarFooter } from "@/components/admin/sidebar/SidebarFooter";

const SIDEBAR_BG =
  "linear-gradient(160deg, #0b1629 0%, #0e2040 55%, #0a2818 100%)";

function SidebarShell({
  collapsed,
  onClose,
}: {
  collapsed: boolean;
  onClose?: () => void;
}) {
  return (
    <div
      className="flex flex-col h-full relative overflow-hidden"
      style={{ background: SIDEBAR_BG }}
    >
      {/* Subtle dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <SidebarLogo collapsed={collapsed} />
      <SidebarNav collapsed={collapsed} />
      <SidebarFooter collapsed={collapsed} />
    </div>
  );
}

export default function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside
        className="hidden md:flex flex-col h-screen sticky top-0 shrink-0 transition-all duration-300 relative"
        style={{ width: collapsed ? 64 : 232 }}
      >
        {/* Collapse toggle button */}
        <button
          onClick={() => setCollapsed((p) => !p)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="absolute -right-3 top-6 z-10 w-6 h-6 rounded-full flex items-center justify-center shadow-lg border hover:scale-110 transition-transform"
          style={{
            background: "#0e2040",
            borderColor: "rgba(34,197,94,0.3)",
            color: "#22c55e",
          }}
        >
          {collapsed ? (
            <PanelLeftOpen size={12} />
          ) : (
            <PanelLeftClose size={12} />
          )}
        </button>

        <SidebarShell collapsed={collapsed} />
      </aside>

      {/* ── Mobile top bar ── */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14 border-b border-white/8"
        style={{ background: "#0b1629" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #22c55e, #15803d)" }}
          >
            <UtensilsCrossed size={13} className="text-white" />
          </div>
          <span className="text-white font-black text-sm tracking-tight">
            Eatly Admin
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center text-white"
          aria-label="Open menu"
        >
          <Menu size={16} />
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <aside className="absolute left-0 top-0 h-full w-64 shadow-2xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 z-10 w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X size={13} />
            </button>
            <SidebarShell
              collapsed={false}
              onClose={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      )}
    </>
  );
}

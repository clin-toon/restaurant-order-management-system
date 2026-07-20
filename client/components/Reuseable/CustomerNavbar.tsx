"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ShoppingCart,
  Menu,
  X,
  LogOut,
  Home,
  UtensilsCrossed,
  ClipboardList,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext/AuthContext";
import { handleLogout } from "@/services/auth.services";
import { useCart } from "@/hooks/useCart";
import { useModal } from "@/hooks/ModalContextHook";

const navLinks = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Menu", href: "/menu", icon: UtensilsCrossed },
  { label: "Orders", href: "/orders", icon: ClipboardList },
];

export default function CustomerNavbar() {
  const { user } = useAuth();
  const { openModal, changeOnConfirm } = useModal();
  const pathname = usePathname();
  const { state } = useCart();
  let cartCount = state.cartCount;

  const [mobileOpen, setMobileOpen] = useState(false);

  const openModalComp = () => {
    openModal({
      title: "Log out",
      des: "Are your sure you want to log out?",
      act: "Yes",
    });

    changeOnConfirm(handleLogout);
  };
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/80 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* ── Logo ── */}
          <Link
            href="/home"
            className="flex items-center gap-2 font-bold text-stone-900 text-lg tracking-tight shrink-0"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-white text-sm">
              <UtensilsCrossed
                className="w-4 h-4 text-orange-500"
                strokeWidth={1.75}
              />
            </span>
            <span className="hidden sm:block">
              {process.env.NEXT_PUBLIC_COMPANY}
            </span>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href, icon: Icon }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                      ${active}`}
                  >
                    <Icon size={15} />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Right Side ── */}
          <div className="flex items-center gap-2">
            {/* Greeting — hidden on very small screens */}
            <span className="hidden sm:block text-sm text-stone-500 mr-1">
              Hi,{" "}
              <span className="font-semibold text-stone-800">
                {user?.first_name}
              </span>{" "}
            </span>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex h-9 w-9 items-center justify-center rounded-lg text-stone-500 hover:bg-stone-100 hover:text-stone-900 transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-stone-900 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Logout — desktop */}
            <button
              onClick={openModalComp}
              className="hidden bg-orange-500 md:flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <LogOut size={15} />
              Logout
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="flex md:hidden h-9 w-9 items-center justify-center rounded-lg text-stone-500 hover:bg-stone-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* ── Mobile Drawer ── */}
        {mobileOpen && (
          <div className="md:hidden border-t border-stone-100 bg-white px-4 pb-4 pt-2">
            {/* Mobile greeting */}
            <p className="mb-3 text-sm text-stone-500 pt-2">
              Hi,{" "}
              <span className="font-semibold text-stone-800">
                {user?.name?.split(" ")[0] ?? "there"}
              </span>{" "}
              👋
            </p>

            <ul className="flex flex-col gap-1">
              {navLinks.map(({ label, href, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                        ${
                          active
                            ? "bg-orange-500 text-white"
                            : "text-stone-600 hover:bg-stone-100"
                        }`}
                    >
                      <Icon size={16} />
                      {label}
                    </Link>
                  </li>
                );
              })}

              {/* Logout row */}
              <li>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    openModalComp();
                  }}
                  className="bg-orange-500 text-white flex cursor-pointer w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium s hover:bg-red-50 transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}

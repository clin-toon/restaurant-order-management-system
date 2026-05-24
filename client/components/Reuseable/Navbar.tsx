"use client";

import { useState } from "react";
import Link from "next/link";
import { UtensilsCrossed, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 group-hover:bg-orange-100 transition-colors">
            <UtensilsCrossed
              className="w-4 h-4 text-orange-500"
              strokeWidth={1.75}
            />
          </div>
          <span className="text-sm font-semibold text-stone-900 tracking-tight">
            {process.env.NEXT_PUBLIC_COMPANY}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-xl text-sm font-medium text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors"
          >
            Log in
          </Link>
          <Button
            asChild
            className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 h-9 shadow-none"
          >
            <Link href="/register">Sign up</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="flex items-center justify-center w-9 h-9 rounded-xl text-stone-500 hover:bg-stone-100 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-72 p-0 border-l border-stone-200"
            >
              {/* Sheet Header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-orange-50">
                    <UtensilsCrossed
                      className="w-3.5 h-3.5 text-orange-500"
                      strokeWidth={1.75}
                    />
                  </div>
                  <span className="text-sm font-semibold text-stone-900 tracking-tight">
                    {process.env.NEXT_PUBLIC_COMPANY}
                  </span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center w-8 h-8 rounded-xl text-stone-400 hover:bg-stone-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Sheet Links */}
              <nav className="flex flex-col px-3 pt-3 gap-0.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Sheet Footer */}
              <div className="absolute bottom-0 left-0 right-0 px-5 py-5 border-t border-stone-100 flex flex-col gap-2">
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-xl border-stone-200 text-stone-700 text-sm font-medium h-10 shadow-none"
                >
                  <Link href="/login" onClick={() => setOpen(false)}>
                    Sign in
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium h-10 shadow-none"
                >
                  <Link href="/signup" onClick={() => setOpen(false)}>
                    Sign up
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

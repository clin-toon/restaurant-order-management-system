"use client";

import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

const footerLinks = {
  Explore: [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <Link href="/" className="flex items-center gap-2 group w-fit">
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
            <p className="text-sm text-stone-400 leading-relaxed">
              Fresh ingredients, honest flavors. Made with care for every table.
            </p>

            {/* Socials */}
          </div>

          {/* Links */}
          <div className="flex gap-12 sm:gap-16">
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group} className="flex flex-col gap-3">
                <span className="text-xs font-semibold text-stone-900 tracking-widest uppercase">
                  {group}
                </span>
                <ul className="flex flex-col gap-2">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-stone-400 hover:text-stone-700 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-stone-100 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-400">
            © {` ${new Date().getFullYear()} `}
            {process.env.NEXT_PUBLIC_COMPANY} All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span className="text-xs text-stone-300">Made with</span>
            <span className="text-orange-400 text-xs">♥</span>
            <span className="text-xs text-stone-300">for food lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

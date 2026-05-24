import React from "react";
import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

const LeftPanel = () => {
  return (
    <div className="hidden lg:flex relative w-1/2 bg-stone-900 overflow-hidden flex-col ">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80"
        alt="Food"
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />

      {/* Warm overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-stone-950/90 via-stone-900/40 to-transparent" />

      {/* Decorative circle top-right */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full border border-orange-500/20" />
      <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full border border-orange-500/10" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full p-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group w-fit">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-50/10 border border-orange-500/30 group-hover:bg-orange-500/20 transition-colors">
            <UtensilsCrossed
              className="w-4 h-4 text-orange-400"
              strokeWidth={1.75}
            />
          </div>
          <span className="text-sm font-semibold text-white/90 tracking-tight">
            {process.env.NEXT_PUBLIC_COMPANY}
          </span>
        </Link>

        {/* Headline */}
        <div className="flex flex-col gap-3">
          {/* Decorative tag */}
          <div className="flex items-center gap-2 w-fit">
            <div className="w-6 h-px bg-orange-400" />
            <span className="text-xs font-medium text-orange-400 tracking-widest uppercase">
              Fresh & Honest
            </span>
          </div>

          <h2 className="text-4xl font-bold text-white leading-tight tracking-tight">
            Every meal tells
            <br />
            <span className="text-orange-400">a story.</span>
          </h2>

          <p className="text-sm text-white/50 leading-relaxed max-w-xs">
            Join thousands of food lovers who trust Tastique for honest flavors
            and fresh ingredients, delivered with care.
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-6 mt-2">
            {[
              { value: "12K+", label: "Happy guests" },
              { value: "4.9★", label: "Avg rating" },
              { value: "50+", label: "Menu items" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-0.5">
                <span className="text-base font-bold text-white">
                  {s.value}
                </span>
                <span className="text-xs text-white/40">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;

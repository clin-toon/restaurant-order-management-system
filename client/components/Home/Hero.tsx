"use client";

import Link from "next/link";
import { UtensilsCrossed, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext/AuthContext";

export default function HeroSection() {
  const { user } = useAuth();

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-stone-950">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=1600"
        alt="Delicious food"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-900/70 to-transparent" />

      {/* Decorative blur */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl px-6 w-full flex flex-col items-center text-center">
        {/* Navbar Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-orange-500/20 border border-orange-500/40">
            <UtensilsCrossed className="w-5 h-5 text-orange-400" />
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">
            {process.env.NEXT_PUBLIC_COMPANY}
          </span>
        </div>

        {/* Tagline */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-px bg-orange-400" />
          <span className="text-xs text-orange-400 uppercase tracking-widest">
            Fresh • Fast • Honest
          </span>
          <div className="w-8 h-px bg-orange-400" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight max-w-3xl">
          Discover food that
          <span className="text-orange-400"> feels like home</span>
        </h1>

        {/* Subtext */}
        <p className="text-stone-300 mt-5 max-w-xl text-sm md:text-base leading-relaxed">
          Crafted with passion, delivered with care. Explore a menu designed for
          comfort, taste, and unforgettable experiences.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
          <Link href={"/menu"}>
            <Button className="h-11 px-6 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium flex items-center gap-2">
              Explore Menu
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          {!user && (
            <Link
              href="/register"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Create an account →
            </Link>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-8 mt-12 text-center">
          {[
            { value: "12K+", label: "Happy Customers" },
            { value: "4.9★", label: "Average Rating" },
            { value: "50+", label: "Dishes Available" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col">
              <span className="text-white font-bold text-lg">{item.value}</span>
              <span className="text-xs text-stone-400">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

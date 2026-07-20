"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  ArrowRight,
} from "lucide-react";

type HeroSlide = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  prepTime: string;
  image: string;
  badge?: string;
  accent: string; // tailwind bg class for accent color
  accentText: string; // tailwind text class
};

const SLIDES: HeroSlide[] = [
  {
    id: "1",
    name: "Buff Momo",
    tagline: "Nepal's soul food",
    description:
      "Steamed buffalo dumplings with house tomato achar and a rich jhol broth — Kathmandu's most beloved street classic.",
    price: 180,
    category: "Snacks",
    rating: 4.9,
    prepTime: "15 min",
    image:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=900&q=90",
    badge: "Most Ordered",
    accent: "bg-orange-500",
    accentText: "text-orange-500",
  },
  {
    id: "2",
    name: "Truffle Mushroom Pizza",
    tagline: "Crafted with obsession",
    description:
      "Hand-tossed sourdough base with wild mushroom blend, truffle oil and fresh mozzarella — a dish that transcends borders.",
    price: 780,
    category: "Dinner",
    rating: 4.8,
    prepTime: "25 min",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&q=90",
    badge: "Chef's Pick",
    accent: "bg-amber-500",
    accentText: "text-amber-500",
  },
  {
    id: "3",
    name: "Wagyu Smash Burger",
    tagline: "Stacked to perfection",
    description:
      "Double smashed Wagyu patty, aged cheddar, caramelised onions and our signature sauce on a toasted brioche bun.",
    price: 680,
    category: "Lunch",
    rating: 4.7,
    prepTime: "20 min",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&q=90",
    badge: "Fan Favourite",
    accent: "bg-red-500",
    accentText: "text-red-500",
  },
  {
    id: "4",
    name: "Dal Bhat Tarkari",
    tagline: "Taste of home",
    description:
      "The national dish of Nepal — steamed rice, lentil soup, seasonal tarkari, crispy papad and a tangy house achar.",
    price: 280,
    category: "Dinner",
    rating: 4.9,
    prepTime: "10 min",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=900&q=90",
    badge: "Heritage Dish",
    accent: "bg-emerald-500",
    accentText: "text-emerald-500",
  },
  {
    id: "5",
    name: "Eggs Benedict",
    tagline: "Rise and dine",
    description:
      "Toasted brioche, Canadian bacon, velvety poached eggs draped in classic hollandaise — a morning worth waking up for.",
    price: 520,
    category: "Breakfast",
    rating: 4.6,
    prepTime: "18 min",
    image:
      "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=900&q=90",
    badge: "New",
    accent: "bg-yellow-500",
    accentText: "text-yellow-500",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const [paused, setPaused] = useState(false);
  const total = SLIDES.length;

  const goTo = useCallback(
    (idx: number, direction: "next" | "prev") => {
      setDir(direction);
      setPrev(current);
      setCurrent((idx + total) % total);
    },
    [current, total],
  );

  const next = useCallback(() => goTo(current + 1, "next"), [current, goTo]);
  const back = useCallback(() => goTo(current - 1, "prev"), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, paused]);

  // Clear prev after animation
  useEffect(() => {
    if (prev === null) return;
    const t = setTimeout(() => setPrev(null), 600);
    return () => clearTimeout(t);
  }, [prev]);

  const slide = SLIDES[current];

  return (
    <section
      className="relative w-full overflow-hidden bg-stone-950"
      style={{ minHeight: "min(90vh, 680px)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Background images (current + prev) ── */}
      {SLIDES.map((s, i) => {
        const isCurrent = i === current;
        const isPrev = i === prev;
        if (!isCurrent && !isPrev) return null;

        return (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out
              ${isCurrent ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          >
            <Image
              src={s.image}
              alt={s.name}
              fill
              priority={i === 0}
              className="object-cover scale-105"
              sizes="100vw"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />
          </div>
        );
      })}

      {/* ── Content ── */}
      <div
        className="relative z-20 h-full flex flex-col justify-end pb-12 px-6 sm:px-12 lg:px-20"
        style={{ minHeight: "min(90vh, 680px)" }}
      >
        <div className="max-w-2xl">
          {/* Badge */}
          {slide.badge && (
            <div
              key={`badge-${current}`}
              className="inline-flex items-center gap-2 mb-5 animate-fade-up"
              style={{ animationDelay: "0ms" }}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${slide.accent} animate-pulse`}
              />
              <span className="text-xs font-semibold uppercase tracking-widest text-white/70">
                {slide.badge}
              </span>
            </div>
          )}

          {/* Tagline */}
          <p
            key={`tag-${current}`}
            className={`text-sm font-medium mb-2 uppercase tracking-widest ${slide.accentText} animate-fade-up`}
            style={{ animationDelay: "60ms" }}
          >
            {slide.tagline}
          </p>

          {/* Name */}
          <h1
            key={`name-${current}`}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight mb-4 animate-fade-up"
            style={{
              animationDelay: "120ms",
              fontFamily: "'Georgia', 'Times New Roman', serif",
              textShadow: "0 2px 40px rgba(0,0,0,0.4)",
            }}
          >
            {slide.name}
          </h1>

          {/* Description */}
          <p
            key={`desc-${current}`}
            className="text-sm sm:text-base text-white/60 leading-relaxed mb-6 max-w-md animate-fade-up"
            style={{ animationDelay: "180ms" }}
          >
            {slide.description}
          </p>

          {/* Meta row */}
          <div
            key={`meta-${current}`}
            className="flex items-center gap-4 mb-8 animate-fade-up"
            style={{ animationDelay: "240ms" }}
          >
            <div className="flex items-center gap-1.5 text-white/80">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold">{slide.rating}</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-1.5 text-white/60">
              <Clock size={13} />
              <span className="text-sm">{slide.prepTime}</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <span className="text-sm text-white/60">{slide.category}</span>
            <div className="w-px h-4 bg-white/20" />
            <span className="text-sm font-bold text-white">
              Rs {slide.price}
            </span>
          </div>

          {/* CTA buttons */}
          <div
            key={`cta-${current}`}
            className="flex items-center gap-3 animate-fade-up"
            style={{ animationDelay: "300ms" }}
          >
            <Link
              href="/menu"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 ${slide.accent}`}
            >
              Order Now
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-white/80 border border-white/20 hover:border-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              View Menu
            </Link>
          </div>
        </div>

        {/* ── Bottom row: dots + arrows ── */}
        <div className="flex items-center justify-between mt-10">
          {/* Dots / progress */}
          <div className="flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? "next" : "prev")}
                aria-label={`Go to slide ${i + 1}`}
                className="relative h-0.5 rounded-full overflow-hidden transition-all duration-300"
                style={{ width: i === current ? 32 : 16 }}
              >
                <span className="absolute inset-0 bg-white/25 rounded-full" />
                {i === current && !paused && (
                  <span
                    className={`absolute inset-y-0 left-0 rounded-full ${slide.accent}`}
                    style={{ animation: "progress 5s linear forwards" }}
                  />
                )}
                {i === current && (
                  <span
                    className={`absolute inset-0 rounded-full ${slide.accent} opacity-80`}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Slide counter + arrows */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/40 tabular-nums">
              {String(current + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
            <button
              onClick={back}
              aria-label="Previous slide"
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Side thumbnail strip (desktop) ── */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col gap-3">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i, i > current ? "next" : "prev")}
            aria-label={`View ${s.name}`}
            className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300
              ${
                i === current
                  ? "border-white scale-110 shadow-lg"
                  : "border-white/20 opacity-50 hover:opacity-80 hover:border-white/50"
              }`}
          >
            <Image
              src={s.image}
              alt={s.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </button>
        ))}
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes progress {
          from { width: 0% }
          to   { width: 100% }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fade-up 0.5s ease forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}

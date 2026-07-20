"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { images } from "./stockdata";
export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen bg-white text-black flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-6">
          <span className="text-orange-500 text-xs tracking-[0.3em] uppercase">
            Premium Food Delivery
          </span>

          <h1 className="text-5xl md:text-6xl font-semibold leading-tight">
            Crave the Taste.
            <br />
            <span className="text-black/70">We Deliver It.</span>
          </h1>

          <p className="text-gray-500 text-lg max-w-md">
            From street food to gourmet meals. Order anything you love,
            delivered fresh and fast.
          </p>

          {/* CTA */}
          <Link href="/menu" className="inline-block">
            <button className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-medium px-7 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/20">
              Order Now →
            </button>
          </Link>

          <div className="text-sm text-gray-400 pt-2">
            🔥 30 min delivery • 20+ dishes
          </div>
        </div>

        {/* RIGHT CAROUSEL */}
        <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-2xl shadow-xl">
          {images.map((img, i) => (
            <img
              key={i}
              src={`${img}?auto=format&fit=crop&w=900&q=80`}
              alt="food"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                i === index ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
            />
          ))}

          {/* soft white gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />

          {/* indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <div
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition ${
                  i === index ? "bg-orange-500 scale-125" : "bg-black/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

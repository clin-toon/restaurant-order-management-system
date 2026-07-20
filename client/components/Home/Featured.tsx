"use client";

import DishCard, { Dish } from "@/components/Home/DishCard";

import { useAuth } from "@/context/AuthContext/AuthContext";

export default function FeaturedItems({ item }: Dish) {
  const { user } = useAuth();
  return (
    <section className="py-16 bg-stone-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-stone-900 mb-10">
          {user ? "Recommend for you" : "Featured Dishes"}
        </h2>

        {item.length === 0 ? (
          <p>Please start ordering for getting recommendation.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {item.map((item) => (
              <DishCard
                key={item.id}
                id={item.id}
                name={item.name}
                image_url={item.image_url}
                price={item.price}
                category={item.category}
                times={item.orders}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

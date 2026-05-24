"use client";

import DishCard, { Dish } from "@/components/Home/DishCard";

const ITEMS: Dish[] = [
  {
    id: 1,
    name: "Truffle Mushroom Pizza",
    description: "Creamy truffle sauce with wild mushrooms",
    price: 18.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800",
  },
  {
    id: 2,
    name: "Grilled Chicken Burger",
    description: "Juicy chicken with fresh lettuce & sauce",
    price: 12.5,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
  },
];

export default function FeaturedItems() {
  const handleAdd = (dish: Dish) => {
    console.log("Added:", dish);
  };

  return (
    <section className="py-16 bg-stone-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-stone-900 mb-10">
          Featured Dishes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ITEMS.map((item) => (
            <DishCard key={item.id} dish={item} onAdd={handleAdd} />
          ))}
        </div>
      </div>
    </section>
  );
}

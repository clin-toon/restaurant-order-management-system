"use client";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/ModalContextHook";
import { Dish } from "@/types/MenuPageTypes";
import { useAuth } from "@/context/AuthContext/AuthContext";
import { toast } from "sonner";
import {
  addItemToTheCart,
  fetchDetailsOfTheItemsPresentInCartWithInclude,
} from "@/services/cart.services";
import { useCart } from "@/hooks/useCart";

import CartCounter from "../Reuseable/CartCounter";

export default function DishCard({
  id,
  name,
  description,
  price,
  image_url,
  category,
}: Dish) {
  const { openModal, changeOnConfirm, closeModal } = useModal();
  const { user } = useAuth();
  const {
    checkFoodIdExistsOrNot,
    updateCartCount,
    getTotalCartItem,
    addToDetailsCart,
  } = useCart();

  const handleCartItem = async () => {
    if (user) {
      updateCartCount(getTotalCartItem() + 1);
      const cart = await addItemToTheCart(id);
      const cartDetails =
        await fetchDetailsOfTheItemsPresentInCartWithInclude();
      addToDetailsCart(cartDetails.cart);
      if (!cart.status) {
        updateCartCount(getTotalCartItem() - 1);
        return toast.error(cart.message);
      }
      return toast.success(cart.message);
    }

    openModal({
      title: "Log in",
      des: "Please log in to add item to the cart.",
      act: "OK",
    });

    changeOnConfirm(closeModal);
  };

  return (
    <div
      className={cn(
        "group bg-white rounded-2xl overflow-hidden border border-stone-100 hover:shadow-lg transition-all flex flex-col",
      )}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={image_url}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Name */}
        <h3 className="font-semibold text-stone-900 text-base">{name}</h3>

        {/* Description */}
        <p className="text-xs text-stone-500 mt-1 line-clamp-2">
          {description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-3 text-sm text-stone-600">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
          {category}
        </div>

        {/* Spacer pushes bottom content down */}
        <div className="flex-1" />

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-base font-bold text-stone-900">${price}</span>

          {checkFoodIdExistsOrNot(id) ? (
            <CartCounter id={id} />
          ) : (
            <Button
              onClick={handleCartItem}
              className={` h-9 cursor-pointer px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs flex items-center gap-1`}
            >
              Add
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

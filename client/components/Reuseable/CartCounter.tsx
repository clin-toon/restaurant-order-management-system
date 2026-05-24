"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Plus, Minus } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import {
  updateTheCartItemQuantity,
  removeItemFromTheCart,
  fetchDetailsOfTheItemsPresentInCartWithInclude,
} from "@/services/cart.services";

type CartCounterProps = {
  id: string;
};

const CartCounter = ({ id }: any) => {
  const {
    findTheQuantityOfTheFoodItem,
    updateCartCount,
    getTotalCartItem,
    addToDetailsCart,
  } = useCart();
  const [currentQuantity, setCurrentQuantity] = useState<number>(
    findTheQuantityOfTheFoodItem(id),
  );

  useEffect(() => {
    const update = async () => {
      if (currentQuantity < 1) {
        try {
          const item = await removeItemFromTheCart(id);
          if (item.status === "success") {
          }
          const cartDetails =
            await fetchDetailsOfTheItemsPresentInCartWithInclude();
          addToDetailsCart(cartDetails.cart);
          toast.success(item.message);
        } catch (error) {
          toast.error("Failed to remove item from the cart");
          updateCartCount(getTotalCartItem());
        }
      } else {
        const updateQuery = await updateTheCartItemQuantity(
          currentQuantity,
          id,
        );
        if (updateQuery.success) {
          const cartDetails =
            await fetchDetailsOfTheItemsPresentInCartWithInclude();
          addToDetailsCart(cartDetails.cart);
        }
      }
    };

    const timer = setTimeout(() => {
      update();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [currentQuantity]);

  const handleIncreaseQuantity = () => {
    setCurrentQuantity(currentQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setCurrentQuantity(currentQuantity - 1);
  };

  return (
    <div className="flex items-center justify-center gap-x-1">
      <Button
        className=" bg-orange-500 text-white p-2 hover:bg-slate-900 cursor-pointer "
        onClick={handleIncreaseQuantity}
      >
        <Plus className="w-4 h-4" />{" "}
      </Button>

      <span>{currentQuantity}</span>
      <Button
        className=" bg-orange-500 text-white p-2 hover:bg-slate-900 cursor-pointer"
        onClick={handleDecreaseQuantity}
      >
        <Minus className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default CartCounter;

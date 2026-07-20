"use client";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import {
  removeItemFromTheCart,
  getCartDetailsOfTheUser,
} from "@/services/cart.services";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

const RemoveCartItem = ({ id }: any) => {
  const { updateCartCount, getTotalCartItem, removeItemFromCart } = useCart();

  const handleRemoveItem = async () => {
    removeItemFromCart(id);

    try {
      const res = await removeItemFromTheCart(id);
      if (res.status !== "success") throw new Error(res.message);
      toast.success(res.message);
    } catch (err) {
      updateCartCount(getTotalCartItem() + 1);
      toast.error("Failed to remove item. Please try again.");
    }
  };

  return (
    <Button
      className="cursor-pointer bg-red-500 shrink-0 w-8 h-8 rounded-lg flex items-center justify-center  text-red-900 bg-red-500 transition-colors  "
      aria-label="Remove item"
      onClick={handleRemoveItem}
      title="Remove item from cart "
    >
      <Trash2 size={14} className="text-white" />
    </Button>
  );
};

export default RemoveCartItem;

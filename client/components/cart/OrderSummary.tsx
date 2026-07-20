"use client";
import { useCart } from "@/hooks/useCart";
import { CartCardItem } from "@/types/CartType";
import { ChevronRight, ShoppingBag } from "lucide-react";
import CreateOrderButton from "../order/CreateOrderButton";

const OrderSummary = ({
  cart,
  total,
}: {
  cart: CartCardItem[];
  total: string;
}) => {
  const { state } = useCart();
  const subtotal = state.cartDetailsItem.reduce(
    (sum, item) => sum + parseFloat(item.total_price),
    0,
  );
  const deliveryFee = 50;
  const grandTotal = subtotal + deliveryFee;
  const totalItems = state.cartDetailsItem.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 sticky top-24">
      <h2 className="font-bold text-stone-900 text-base mb-5 flex items-center gap-2">
        <ShoppingBag size={16} />
        Order Summary
      </h2>

      {/* Item breakdown */}
      <div className="flex flex-col gap-2 mb-5">
        {state.cartDetailsItem.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-stone-500 truncate mr-2">
              {item.title}
              <span className="text-stone-400 ml-1">×{item.quantity}</span>
            </span>
            <span className="text-stone-700 font-medium shrink-0">
              Rs {parseFloat(item.total_price).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-stone-100 pt-4 flex flex-col gap-2.5">
        <div className="flex justify-between text-sm text-stone-500">
          <span>Subtotal ({totalItems} items)</span>
          <span className="text-stone-800 font-medium">
            Rs {subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm text-stone-500">
          <span>Delivery fee</span>
          <span className="text-stone-800 font-medium">
            Rs {deliveryFee.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="border-t border-stone-200 mt-4 pt-4 flex justify-between items-center">
        <span className="font-bold text-stone-900">Total</span>
        <span className="text-xl font-black text-stone-900">
          Rs {grandTotal.toFixed(2)}
        </span>
      </div>

      <a
        href="/menu"
        className="w-full mt-3 text-center text-sm text-stone-400 hover:text-stone-600 transition-colors block"
      >
        + Add more items
      </a>

      <CreateOrderButton />
    </div>
  );
};

export default OrderSummary;

"use client";
import { useCart } from "@/hooks/useCart";
import { ShoppingBag } from "lucide-react";
import CartItemCard from "@/components/cart/CartItemCard";
import EmptyCart from "@/components/cart/EmptyCart";
import OrderSummary from "@/components/cart/OrderSummary";

const Wrapper = ({ totalAmount }: any) => {
  const { state } = useCart();
  const cart = state.cartDetailsItem;
  const isEmpty = cart.length === 0;
  return (
    <div>
      <div className="min-h-screen bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-stone-900 flex items-center gap-2.5">
              <ShoppingBag size={22} />
              Your Cart
            </h1>
            {!isEmpty && (
              <p className="text-sm text-stone-400 mt-1">
                {cart.length} {cart.length === 1 ? "item" : "items"} ·{" "}
                {cart.reduce((s: any, i: any) => s + i.quantity, 0)} total qty
              </p>
            )}
          </div>

          {isEmpty ? (
            <EmptyCart />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cart items — takes 2/3 */}
              <div className="lg:col-span-2 flex flex-col gap-3">
                {cart.map((item, index) => (
                  <CartItemCard key={item.id} item={item} index={index} />
                ))}
              </div>

              {/* Order summary — takes 1/3, sticky */}
              <div className="lg:col-span-1">
                <OrderSummary cart={cart} total={totalAmount} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wrapper;

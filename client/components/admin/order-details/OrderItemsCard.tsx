import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { OrderDetailItem } from "@/types/order-detail-types";

type Props = {
  items: OrderDetailItem[];
  totalAmount: number;
};

const DELIVERY_FEE = 50;

export function OrderItemsCard({ items, totalAmount }: Props) {
  const subtotal = items.reduce((s, i) => s + i.sub_total, 0);

  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-6 py-4 border-b border-stone-50">
        <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center">
          <ShoppingBag size={14} className="text-stone-600" />
        </div>
        <h2 className="text-sm font-bold text-stone-900">Order Items</h2>
        <span className="ml-auto text-xs text-stone-400">
          {items.length} item{items.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* Items list */}
      <div className="divide-y divide-stone-50">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-6 py-4 hover:bg-stone-50/50 transition-colors"
          >
            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-stone-100 shrink-0">
              <Image
                src={item.food_image_url}
                alt={item.food_item}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-stone-900 truncate">
                {item.food_item}
              </p>
              <p className="text-xs text-stone-400 mt-0.5">
                Qty: {item.quantity}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-stone-900">
                Rs {item.sub_total}
              </p>
              {item.quantity > 1 && (
                <p className="text-xs text-stone-400">
                  Rs {(item.sub_total / item.quantity).toFixed(0)} each
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bill summary */}
      <div className="px-6 py-4 bg-stone-50/60 border-t border-stone-100">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm text-stone-500">
            <span>Subtotal</span>
            <span className="font-medium text-stone-700">Rs {subtotal}</span>
          </div>
          <div className="flex justify-between text-sm text-stone-500">
            <span>Delivery fee</span>
            <span className="font-medium text-stone-700">
              Rs {DELIVERY_FEE}
            </span>
          </div>
          <div className="h-px bg-stone-200 my-1" />
          <div className="flex justify-between">
            <span className="text-sm font-bold text-stone-900">Total</span>
            <span className="text-base font-black text-stone-900">
              Rs {totalAmount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

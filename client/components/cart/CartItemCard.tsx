import { CartCardItem } from "@/types/CartType";
import { Tag } from "lucide-react";
import { getCategoryStyle } from "@/utils/menuPage";
import Image from "next/image";
import RemoveCartItem from "./RemoveCartItem";

const CartItemCard = ({ item }: { item: CartCardItem; index: number }) => {
  const unitPrice = parseFloat(item.price);
  const totalPrice = parseFloat(item.total_price);

  return (
    <div className="group flex gap-4 p-4 bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md hover:border-stone-200 transition-all duration-200">
      {/* ── Image ── */}
      <div className="relative shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-stone-100">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="96px"
          />
        ) : (
          // fallback if image_url is empty
          <div className="w-full h-full flex items-center justify-center text-2xl">
            🍽️
          </div>
        )}

        {/* Quantity badge over image */}
        <span className="absolute top-1.5 left-1.5 bg-stone-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md leading-none">
          ×{item.quantity}
        </span>
      </div>

      {/* ── Details ── */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-stone-900 text-[15px] leading-tight truncate">
              {item.title}
            </h3>
            <p className="text-xs text-stone-400 mt-1 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Remove button — appears on hover */}
          <RemoveCartItem id={item.id} />
        </div>

        <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
          {/* Category pill */}
          <span
            className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${getCategoryStyle(item.category)}`}
          >
            <Tag size={9} className="inline mr-1" />
            {item.category}
          </span>

          {/* Prices */}
          <div className="flex items-baseline gap-2">
            {item.quantity > 1 && (
              <span className="text-xs text-stone-400">
                Rs {unitPrice.toFixed(2)} each
              </span>
            )}
            <span className="text-base font-bold text-stone-900">
              Rs {totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;

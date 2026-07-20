"use client";

import Image from "next/image";
import { MapPin, ChevronRight, Clock, CreditCard } from "lucide-react";
import { OrderRecord } from "@/types/order.types";
import { STATUS_CONFIG, PAYMENT_CONFIG } from "@/data/order-data";

type Props = {
  record: OrderRecord;
  onViewDetails: () => void;
};

export default function OrderCard({ record, onViewDetails }: Props) {
  const order = record.order;
  const address = record.delivery_address[0];
  const items = record.order_details;

  if (!order) return null;

  const status = STATUS_CONFIG[order?.order_status] ?? STATUS_CONFIG.pending;
  const payment =
    PAYMENT_CONFIG[order?.Payment_status] ?? PAYMENT_CONFIG.unpaid;

  // show up to 3 food images as stack
  const previewImages = items.slice(0, 3);
  const extraCount = items.length - 3;

  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
      {/* Top row */}
      <div className="flex items-start justify-between gap-4 p-5 pb-4">
        {/* Image stack + item names */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {previewImages.map((item, i) => (
              <div
                key={i}
                className="relative w-11 h-11 rounded-xl overflow-hidden border-2 border-white"
                style={{ zIndex: previewImages.length - i }}
              >
                <Image
                  src={item.food_image_url}
                  alt={item.food_item}
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </div>
            ))}
            {extraCount > 0 && (
              <div
                className="w-11 h-11 rounded-xl bg-stone-100 border-2 border-white flex items-center justify-center text-xs font-bold text-stone-500"
                style={{ zIndex: 0 }}
              >
                +{extraCount}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-stone-900 truncate max-w-[180px]">
              {items.map((i) => i.food_item).join(", ")}
            </p>
            <p className="text-xs text-stone-400 mt-0.5">
              {items.length} item{items.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Status badge */}
        <span
          className={`shrink-0 inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${status.bg} ${status.text}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-stone-50 mx-5" />

      {/* Meta row */}
      <div className="flex items-center gap-4 px-5 py-3 flex-wrap">
        {/* Order ID */}
        <div className="flex items-center gap-1.5">
          <Clock size={12} className="text-stone-400" />
          <span className="text-xs text-stone-400 font-mono">
            #{order.order_id.slice(0, 8).toUpperCase()}
          </span>
        </div>

        <div className="w-px h-3 bg-stone-200" />

        {/* Payment status */}
        <span
          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${payment.bg} ${payment.text}`}
        >
          <CreditCard size={9} className="inline mr-1" />
          {payment.label}
        </span>

        <div className="w-px h-3 bg-stone-200" />

        {/* Total */}
        <span className="text-sm font-bold text-stone-900">
          Rs {order.total_amount.toFixed(2)}
        </span>

        {/* Delivery address */}
        {address?.landmark && (
          <>
            <div className="w-px h-3 bg-stone-200" />
            <div className="flex items-center gap-1 text-stone-400 min-w-0">
              <MapPin size={11} className="shrink-0" />
              <span className="text-xs truncate max-w-[140px]">
                {address.landmark}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 pb-4">
        <button
          onClick={onViewDetails}
          className="w-full cursor-pointer flex items-center justify-center gap-1.5 text-sm font-semibold text-white bg-orange-600 hover:bg-slate-900 border border-stone-200 rounded-xl py-2.5 transition-colors"
        >
          View Details
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

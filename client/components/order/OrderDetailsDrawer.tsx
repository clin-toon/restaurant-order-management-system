"use client";

import Image from "next/image";
import { X, MapPin, CreditCard, ExternalLink } from "lucide-react";
import { OrderRecord } from "@/types/order.types";
import { STATUS_STEPS, STATUS_LABELS } from "@/data/order-data";

type Props = {
  record: OrderRecord | null;
  onClose: () => void;
};

export default function OrderDetailDrawer({ record, onClose }: Props) {
  if (!record) return null;

  const order = record.order;
  const address = record.delivery_address;
  const items = record.order_details;

  if (!order) return null;

  const currentStep = STATUS_STEPS.indexOf(order.order_status);
  const isCancelled = order.order_status === "cancelled";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100 shrink-0">
          <div>
            <h2 className="text-base font-bold text-stone-900">
              Order Details
            </h2>
            <p className="text-xs text-stone-400 font-mono mt-0.5">
              #{order.order_id.slice(0, 8).toUpperCase()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-6">
          {/* ── Status tracker ── */}
          {!isCancelled ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-4">
                Order Status
              </p>
              <div className="relative">
                {/* Track line */}
                <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-stone-100" />
                <div
                  className="absolute left-[15px] top-4 w-0.5 bg-stone-900 transition-all duration-500"
                  style={{
                    height:
                      currentStep <= 0
                        ? 0
                        : `calc(${(currentStep / (STATUS_STEPS.length - 1)) * 100}% - 16px)`,
                  }}
                />

                <div className="flex flex-col gap-4 relative">
                  {STATUS_STEPS.map((step, i) => {
                    const done = i < currentStep;
                    const active = i === currentStep;
                    return (
                      <div key={step} className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
                          ${
                            done
                              ? "bg-stone-900 border-stone-900"
                              : active
                                ? "bg-white border-stone-900 shadow-md"
                                : "bg-white border-stone-200"
                          }`}
                        >
                          {done ? (
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                            >
                              <path
                                d="M2 6l3 3 5-5"
                                stroke="white"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ) : active ? (
                            <div className="w-2.5 h-2.5 rounded-full bg-stone-900 animate-pulse" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-stone-200" />
                          )}
                        </div>
                        <span
                          className={`text-sm ${active ? "font-semibold text-stone-900" : done ? "text-stone-500" : "text-stone-300"}`}
                        >
                          {STATUS_LABELS[step]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <X size={14} className="text-red-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-red-700">
                  Order Cancelled
                </p>
                <p className="text-xs text-red-500 mt-0.5">
                  This order has been cancelled
                </p>
              </div>
            </div>
          )}

          <div className="h-px bg-stone-100" />

          {/* ── Order items ── */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">
              Items Ordered
            </p>
            <div className="flex flex-col gap-3">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                    <Image
                      src={item.food_image_url}
                      alt={item.food_item}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-900 truncate">
                      {item.food_item}
                    </p>
                    <p className="text-xs text-stone-400">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-stone-900 shrink-0">
                    Rs {item.sub_total.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-stone-100" />

          {/* ── Bill summary ── */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">
              Bill Summary
            </p>
            <div className="flex flex-col gap-2">
              {items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-stone-500">
                    {item.food_item} × {item.quantity}
                  </span>
                  <span className="text-stone-700">
                    Rs {item.sub_total.toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between text-sm">
                <span className="text-stone-500"> Delivery Charge</span>
                <span className="text-stone-700"> Rs 50</span>
              </div>

              <div className="h-px bg-stone-100 my-1" />
              <div className="flex justify-between">
                <span className="text-sm font-bold text-stone-900">Total</span>
                <span className="text-base font-black text-stone-900">
                  Rs {order.total_amount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="h-px bg-stone-100" />

          {/* ── Payment status ── */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard size={15} className="text-stone-400" />
              <span className="text-sm text-stone-600">Payment</span>
            </div>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full
              ${
                order.Payment_status === "paid"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {order.Payment_status === "paid" ? "Paid" : "Unpaid"}
            </span>
          </div>

          <div className="h-px bg-stone-100" />

          {/* ── Delivery address ── */}
          {address && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">
                Delivery Address
              </p>
              <div className="flex items-start gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-100">
                <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={13} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-stone-900">
                    {address.landmark}
                  </p>
                  <p className="text-xs text-stone-400 font-mono mt-0.5">
                    {address.latitude.toFixed(5)},{" "}
                    {address.longitude.toFixed(5)}
                  </p>
                  <a
                    href={address.location_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 mt-1.5 transition-colors"
                  >
                    <ExternalLink size={10} />
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-100 shrink-0">
          <button
            onClick={onClose}
            className="w-full h-11  rounded-xl bg-orange-600 hover:bg-stone-700 text-white text-sm font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}

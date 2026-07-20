"use client";

import { AdminOrder, OrderStatus } from "@/types/order.types";
import { OrderStatusBadge, PaymentStatusBadge } from "./OrderStatusBadge";
import { OrderStatusSelect } from "./OrderStatusSelect";
import { PackageOpen } from "lucide-react";
import { formatTime, formatDate } from "@/lib/utils";
import Link from "next/link";
import { ViewDetailsLink } from "./ViewDetailsLink";

type Props = {
  orders: AdminOrder[];
  onUpdated: (id: string, status: OrderStatus) => void;
};

export function OrdersTable({ orders, onUpdated }: Props) {
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm flex flex-col items-center justify-center gap-4 py-20">
        <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center">
          <PackageOpen size={28} className="text-stone-400" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-stone-700">
            No orders found
          </p>
          <p className="text-xs text-stone-400 mt-1">
            Try adjusting your filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
      {/* ── Desktop table ── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-100 bg-stone-50/60">
              <th className="text-left text-[11px] font-semibold uppercase tracking-widest text-stone-400 px-5 py-3.5">
                Order ID
              </th>
              <th className="text-left text-[11px] font-semibold uppercase tracking-widest text-stone-400 px-5 py-3.5">
                Customer
              </th>
              <th className="text-left text-[11px] font-semibold uppercase tracking-widest text-stone-400 px-5 py-3.5">
                Date & Time
              </th>
              <th className="text-left text-[11px] font-semibold uppercase tracking-widest text-stone-400 px-5 py-3.5">
                Payment
              </th>
              <th className="text-left text-[11px] font-semibold uppercase tracking-widest text-stone-400 px-5 py-3.5">
                Status
              </th>
              <th className="text-left text-[11px] font-semibold uppercase tracking-widest text-stone-400 px-5 py-3.5">
                Update Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-stone-50/50 transition-colors"
              >
                {/* Order ID */}
                <td className="px-5 py-4">
                  <span className="text-xs font-mono font-semibold text-stone-500 bg-stone-100 px-2 py-1 rounded-lg">
                    #{order.id.slice(0, 8).toUpperCase()}
                  </span>
                </td>

                {/* Customer */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {order.full_name.charAt(0)}
                    </div>
                    <span className="text-sm font-semibold text-stone-900">
                      {order.full_name}
                    </span>
                  </div>
                </td>

                {/* Date */}
                <td className="px-5 py-4">
                  <p className="text-sm text-stone-700 font-medium">
                    {formatDate(order.created_at)}
                  </p>
                  <p className="text-xs text-stone-400">
                    {formatTime(order.created_at)}
                  </p>
                </td>

                {/* Payment */}
                <td className="px-5 py-4">
                  <PaymentStatusBadge status={order.payment_status} />
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <OrderStatusBadge status={order.order_status} />
                </td>

                {/* Update */}
                <td className="px-5 py-4">
                  <OrderStatusSelect
                    orderId={order.id}
                    currentStatus={order.order_status}
                    onUpdated={onUpdated}
                  />
                </td>

                <td className="pr-8">
                  <ViewDetailsLink orderId={order.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile cards ── */}
      <div className="md:hidden divide-y divide-stone-100">
        {orders.map((order) => (
          <div key={order.id} className="p-4 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {order.full_name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">
                    {order.full_name}
                  </p>
                  <p className="text-[10px] font-mono text-stone-400">
                    #{order.id.slice(0, 8).toUpperCase()}
                  </p>
                </div>
              </div>
              <PaymentStatusBadge status={order.payment_status} />
            </div>

            <div className="flex items-center justify-between">
              <OrderStatusBadge status={order.order_status} />
              <p className="text-xs text-stone-400">
                {formatDate(order.created_at)} · {formatTime(order.created_at)}
              </p>
            </div>

            <OrderStatusSelect
              orderId={order.id}
              currentStatus={order.order_status}
              onUpdated={onUpdated}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

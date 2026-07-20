"use client";

import { useState } from "react";
import { OrderRecord } from "@/types/order.types";
import OrderCard from "./OrderCard";
import OrderDetailDrawer from "./OrderDetailsDrawer";
import { ShoppingBag, PackageOpen } from "lucide-react";
import Link from "next/link";

type Props = { orders: OrderRecord[] };

export default function OrdersClient({ orders }: Props) {
  const [selected, setSelected] = useState<OrderRecord | null>(null);

  return (
    <div className="min-h-screen bg-stone-50 py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2.5 mb-1">
            <ShoppingBag size={20} className="text-stone-700" />
            <h1 className="text-2xl font-bold text-stone-900">My Orders</h1>
          </div>
          <p className="text-sm text-stone-400">
            {orders.length > 0
              ? `${orders.length} order${orders.length > 1 ? "s" : ""} placed`
              : "You haven't placed any orders yet"}
          </p>
        </div>

        {/* Empty state */}
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-5 py-24 text-center">
            <div className="w-20 h-20 rounded-2xl bg-stone-100 flex items-center justify-center">
              <PackageOpen size={36} className="text-stone-400" />
            </div>
            <div>
              <p className="text-base font-semibold text-stone-800">
                No orders yet
              </p>
              <p className="text-sm text-stone-400 mt-1 max-w-xs">
                Looks like you haven't ordered anything. Head to the menu and
                treat yourself!
              </p>
            </div>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-stone-700 transition-colors"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((record, i) => (
              <OrderCard
                key={record.order[0]?.order_id ?? i}
                record={record}
                onViewDetails={() => setSelected(record)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail drawer */}
      <OrderDetailDrawer record={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

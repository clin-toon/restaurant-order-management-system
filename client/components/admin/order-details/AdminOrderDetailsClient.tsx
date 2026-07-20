"use client";

import { useState } from "react";
import { OrderDetailRecord } from "@/types/order-detail-types";
import { OrderStatus } from "@/types/order.types";
import { OrderDetailHeader } from "./OrderDetailsHeader";
import { OrderItemsCard } from "./OrderItemsCard";
import { OrderDeliveryCard } from "./OrderDeliveryCart";
import { OrderStatusTimeline } from "./OrderStatusTimeline";
import { PackageOpen } from "lucide-react";
import Link from "next/link";

type Props = { record: OrderDetailRecord | null };

export default function AdminOrderDetailClient({ record }: Props) {
  if (!record) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center gap-5 p-6 text-center">
        <div className="w-20 h-20 rounded-2xl bg-stone-100 flex items-center justify-center">
          <PackageOpen size={36} className="text-stone-400" />
        </div>
        <div>
          <p className="text-lg font-bold text-stone-800">Order not found</p>
          <p className="text-sm text-stone-400 mt-1">
            This order may have been deleted or doesn't exist.
          </p>
        </div>
        <Link
          href="/admin/order"
          className="inline-flex items-center gap-2 bg-stone-900 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-stone-700 transition-colors"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  const { order, order_details, delivery_address } = record;

  // Optimistic status update
  const [currentStatus, setCurrentStatus] = useState(order.order_status);

  const handleStatusUpdated = (_id: string, status: OrderStatus) => {
    setCurrentStatus(status);
  };

  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <OrderDetailHeader
          orderId={order.order_id}
          orderStatus={currentStatus as OrderStatus}
          paymentStatus={order.payment_status}
          onUpdated={handleStatusUpdated}
        />

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left — items + delivery */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <OrderItemsCard
              items={order_details}
              totalAmount={order.total_amount}
            />
            <OrderDeliveryCard
              landmark={delivery_address.landmark}
              latitude={delivery_address.latitude}
              longitude={delivery_address.longitude}
              locationUrl={delivery_address.location_url}
            />
          </div>

          {/* Right — timeline */}
          <div className="lg:col-span-1">
            <OrderStatusTimeline currentStatus={currentStatus} />
          </div>
        </div>
      </div>
    </div>
  );
}

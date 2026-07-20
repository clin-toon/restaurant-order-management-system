"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import {
  OrderStatusBadge,
  PaymentStatusBadge,
} from "@/components/admin/orders/OrderStatusBadge";
import { OrderStatusSelect } from "@/components/admin/orders/OrderStatusSelect";
import { OrderStatus } from "@/types/order.types";

type Props = {
  orderId: string;
  orderStatus: OrderStatus;
  paymentStatus: string;
  createdAt?: string;
  onUpdated: (id: string, status: OrderStatus) => void;
};

function formatDateTime(iso?: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function OrderDetailHeader({
  orderId,
  orderStatus,
  paymentStatus,
  createdAt,
  onUpdated,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      {/* Back link */}
      <Link
        href="/admin/order"
        className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors w-fit group"
      >
        <ArrowLeft
          size={15}
          className="group-hover:-translate-x-0.5 transition-transform"
        />
        Back to Orders
      </Link>

      {/* Title row */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-black text-stone-900 tracking-tight">
              Order Details
            </h1>
            <span className="font-mono text-sm text-stone-400 bg-stone-100 px-2.5 py-1 rounded-lg">
              #{orderId.slice(0, 8).toUpperCase()}
            </span>
          </div>
          {createdAt && (
            <p className="text-sm text-stone-400 mt-1">
              {formatDateTime(createdAt)}
            </p>
          )}
        </div>

        {/* Status + update */}
        <div className="flex items-center gap-3 flex-wrap">
          <OrderStatusBadge status={orderStatus as OrderStatus} />
          <PaymentStatusBadge status={paymentStatus as any} />
          <OrderStatusSelect
            orderId={orderId}
            currentStatus={orderStatus as OrderStatus}
            onUpdated={onUpdated}
          />
        </div>
      </div>
    </div>
  );
}

import { OrderStatus, PaymentStatus } from "@/types/order.types";

const ORDER_STATUS_MAP: Record<
  OrderStatus,
  { label: string; dot: string; bg: string; text: string }
> = {
  pending: {
    label: "Pending",
    dot: "bg-amber-400",
    bg: "bg-amber-50",
    text: "text-amber-700",
  },
  confirmed: {
    label: "Confirmed",
    dot: "bg-blue-400",
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
  preparing: {
    label: "Preparing",
    dot: "bg-violet-400",
    bg: "bg-violet-50",
    text: "text-violet-700",
  },
  out_for_delivery: {
    label: "Out for Delivery",
    dot: "bg-orange-400",
    bg: "bg-orange-50",
    text: "text-orange-700",
  },
  delivered: {
    label: "Delivered",
    dot: "bg-emerald-400",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
  },
  cancelled: {
    label: "Cancelled",
    dot: "bg-red-400",
    bg: "bg-red-50",
    text: "text-red-700",
  },
};

const PAYMENT_MAP: Record<
  PaymentStatus,
  { label: string; bg: string; text: string }
> = {
  paid: { label: "Paid", bg: "bg-emerald-50", text: "text-emerald-700" },
  unpaid: { label: "Unpaid", bg: "bg-red-50", text: "text-red-600" },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const s = ORDER_STATUS_MAP[status] ?? ORDER_STATUS_MAP.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${s.bg} ${s.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
      {s.label}
    </span>
  );
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const s = PAYMENT_MAP[status] ?? PAYMENT_MAP.unpaid;
  return (
    <span
      className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full ${s.bg} ${s.text}`}
    >
      {s.label}
    </span>
  );
}

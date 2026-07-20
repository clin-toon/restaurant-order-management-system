export const STATUS_CONFIG: Record<string, { label: string; dot: string; bg: string; text: string }> = {
  pending:          { label: "Pending",          dot: "bg-amber-400",  bg: "bg-amber-50",   text: "text-amber-700"  },
  confirmed:        { label: "Confirmed",         dot: "bg-blue-400",   bg: "bg-blue-50",    text: "text-blue-700"   },
  preparing:        { label: "Preparing",         dot: "bg-violet-400", bg: "bg-violet-50",  text: "text-violet-700" },
  out_for_delivery: { label: "Out for Delivery",  dot: "bg-orange-400", bg: "bg-orange-50",  text: "text-orange-700" },
  delivered:        { label: "Delivered",         dot: "bg-emerald-400",bg: "bg-emerald-50", text: "text-emerald-700"},
  cancelled:        { label: "Cancelled",         dot: "bg-red-400",    bg: "bg-red-50",     text: "text-red-700"    },
};

export const PAYMENT_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
  paid:   { label: "Paid",   bg: "bg-emerald-50", text: "text-emerald-700" },
  unpaid: { label: "Unpaid", bg: "bg-red-50",     text: "text-red-600"     },
};


export const STATUS_STEPS = ["pending", "confirmed", "preparing", "out_for_delivery", "delivered"];

export const STATUS_LABELS: Record<string, string> = {
  pending:          "Pending",
  confirmed:        "Confirmed",
  preparing:        "Preparing",
  out_for_delivery: "Out for Delivery",
  delivered:        "Delivered",
};
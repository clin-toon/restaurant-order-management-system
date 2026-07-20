"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderStatus } from "@/types/order.types";
import { updateTheStatusOfTheOrder } from "@/services/admin.order.services";
import { toast } from "sonner";

const STATUSES: { value: OrderStatus; label: string }[] = [
  { value: "pending", label: "Pending" },

  { value: "preparing", label: "Preparing" },

  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

type Props = {
  orderId: string;
  currentStatus: OrderStatus;
  onUpdated: (id: string, status: OrderStatus) => void;
};

export function OrderStatusSelect({
  orderId,
  currentStatus,
  onUpdated,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleChange = async (value: string) => {
    setLoading(true);
    try {
      await updateTheStatusOfTheOrder(orderId, value);
      onUpdated(orderId, value as OrderStatus);
      toast.success("Order status updated");
    } catch {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      {loading && (
        <Loader2 size={13} className="animate-spin text-stone-400 shrink-0" />
      )}
      <Select
        value={currentStatus}
        onValueChange={handleChange}
        disabled={loading}
      >
        <SelectTrigger className="h-8 w-40 text-xs rounded-lg border-stone-200 bg-white focus:ring-stone-300">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STATUSES.map((s) => (
            <SelectItem key={s.value} value={s.value} className="text-xs">
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

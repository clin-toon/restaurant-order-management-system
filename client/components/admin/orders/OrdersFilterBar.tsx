"use client";

import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { StatusFilter, PaymentFilter, SortOption } from "@/types/order.types";

type Props = {
  search: string;
  sort: SortOption;
  statusFilter: StatusFilter;
  paymentFilter: PaymentFilter;
  totalResults: number;
  onSearch: (v: string) => void;
  onSort: (v: SortOption) => void;
  onStatus: (v: StatusFilter) => void;
  onPayment: (v: PaymentFilter) => void;
};

export function OrdersFilterBar({
  search,
  sort,
  statusFilter,
  paymentFilter,
  totalResults,
  onSearch,
  onSort,
  onStatus,
  onPayment,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <Input
            placeholder="Search by name or order ID…"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-9 h-9 text-sm rounded-xl border-stone-200 focus-visible:ring-stone-300 bg-stone-50"
          />
        </div>

        {/* Sort */}
        <Select value={sort} onValueChange={(v) => onSort(v as SortOption)}>
          <SelectTrigger className="h-9 w-36 text-xs rounded-xl border-stone-200 bg-white">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest" className="text-xs">
              Latest First
            </SelectItem>
            <SelectItem value="oldest" className="text-xs">
              Oldest First
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Status filter */}
        <Select
          value={statusFilter}
          onValueChange={(v) => onStatus(v as StatusFilter)}
        >
          <SelectTrigger className="h-9 w-40 text-xs rounded-xl border-stone-200 bg-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">
              All Statuses
            </SelectItem>
            <SelectItem value="pending" className="text-xs">
              Pending
            </SelectItem>
            <SelectItem value="confirmed" className="text-xs">
              Confirmed
            </SelectItem>
            <SelectItem value="preparing" className="text-xs">
              Preparing
            </SelectItem>
            <SelectItem value="out_for_delivery" className="text-xs">
              Out for Delivery
            </SelectItem>
            <SelectItem value="delivered" className="text-xs">
              Delivered
            </SelectItem>
            <SelectItem value="cancelled" className="text-xs">
              Cancelled
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Payment filter */}
        <Select
          value={paymentFilter}
          onValueChange={(v) => onPayment(v as PaymentFilter)}
        >
          <SelectTrigger className="h-9 w-36 text-xs rounded-xl border-stone-200 bg-white">
            <SelectValue placeholder="Payment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">
              All Payments
            </SelectItem>
            <SelectItem value="paid" className="text-xs">
              Paid
            </SelectItem>
            <SelectItem value="unpaid" className="text-xs">
              Unpaid
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Results count */}
        <p className="text-xs text-stone-400 ml-auto shrink-0">
          <span className="font-semibold text-stone-700">{totalResults}</span>{" "}
          orders
        </p>
      </div>
    </div>
  );
}

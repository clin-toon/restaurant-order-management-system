"use client";

import { useState, useMemo, ChangeEventHandler, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import {
  AdminOrder,
  OrderStatus,
  StatusFilter,
  PaymentFilter,
  SortOption,
} from "@/types/order.types";
import { OrdersFilterBar } from "./OrdersFilterBar";
import { OrdersTable } from "./OrdersTable";
import Pagination from "@/components/Menu/Pagination";
import { updateAdminOrderPageURL } from "@/utils/menuPage";
import { useRouter, useSearchParams } from "next/navigation";

type Props = { initialOrders: AdminOrder[] };

export default function AdminOrdersClient({ initialOrders }: Props) {
  const [orders, setOrders] = useState<AdminOrder[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("latest");
  const [statusFilter, setStatus] = useState<StatusFilter>("all");
  const [paymentFilter, setPayment] = useState<PaymentFilter>("all");
  const router = useRouter();
  const searchp = useSearchParams();

  // Optimistic update after status change
  const handleStatusUpdated = async (id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, order_status: status } : o)),
    );
  };

  const handleSearch = () => {
    updateAdminOrderPageURL(
      {
        query: search,
        payment_status: paymentFilter,
        order_status: statusFilter,
        sortby: sort,
      },
      router,
      searchp,
    );
  };

  useEffect(() => {
    const timeout = setTimeout(handleSearch, 700);
    return () => {
      clearTimeout(timeout);
    };
  }, [search, paymentFilter, statusFilter, sort]);

  // Summary counts
  const pending = orders.filter((o) => o.order_status === "pending").length;
  const unpaid = orders.filter((o) => o.payment_status === "unpaid").length;

  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-5">
        {/* ── Header ── */}
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2.5 mb-0.5">
              <ShoppingBag size={18} className="text-stone-700" />
              <h1 className="text-xl font-black text-stone-900 tracking-tight">
                Orders
              </h1>
            </div>
            <p className="text-sm text-stone-400">
              Manage and update all customer orders
            </p>
          </div>

          {/* Quick stat pills */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              {pending} Pending
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-red-50 text-red-600 border border-red-200">
              {unpaid} Unpaid
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
              {orders.length} Total
            </span>
          </div>
        </div>

        {/* ── Filter bar ── */}
        <OrdersFilterBar
          search={search}
          sort={sort}
          statusFilter={statusFilter}
          paymentFilter={paymentFilter}
          totalResults={orders.length}
          onSearch={setSearch}
          onSort={setSort}
          onStatus={setStatus}
          onPayment={setPayment}
        />

        {/* ── Table ── */}
        <OrdersTable orders={initialOrders} onUpdated={handleStatusUpdated} />

        <Pagination />
      </div>
    </div>
  );
}

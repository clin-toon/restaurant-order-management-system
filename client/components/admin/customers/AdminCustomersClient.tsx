"use client";

import { useState, useMemo } from "react";
import {
  Users,
  UserX,
  ChevronUp,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Customer, SortOptionForCustomer } from "@/types/admin.types";
import { CustomerRow } from "./CustomerCard";
import { CustomersFilterBar } from "./CustomersFilterBar";
import { CustomersSummaryBar } from "./CustomersSummaryBar";
import Link from "next/link";

type Props = { initialCustomers: Customer[] };

type ColSort = {
  col: "spent" | "avg" | "freq" | "name";
  dir: "asc" | "desc";
};

// Column header with sort toggle
function SortHeader({ label }: { label: string }) {
  return (
    <th className="px-5 py-3.5 text-left cursor-pointer select-none group">
      <div className="flex items-center gap-1.5">
        <span
          className={`text-[11px] font-bold uppercase tracking-widest transition-colors
          `}
        >
          {label}
        </span>
        <span className="flex flex-col">
          <ChevronUp
            size={9}
            className={`-mb-0.5 transition-colors "text-stone-900"  "text-stone-300"}`}
          />
          <ChevronDown
            size={9}
            className={`transition-colors : "text-stone-300"}`}
          />
        </span>
      </div>
    </th>
  );
}

export default function AdminCustomersClient({ initialCustomers }: Props) {
  const [search, setSearch] = useState("");
  const [colSort, setColSort] = useState<ColSort>({
    col: "spent",
    dir: "desc",
  });

  // Map ColSort → SortOption for FilterBar
  const sortOption: SortOptionForCustomer =
    `${colSort.col}-${colSort.dir}` as SortOptionForCustomer;

  const handleDropdownSort = (v: SortOptionForCustomer) => {
    const [col, dir] = v.split("-") as [ColSort["col"], ColSort["dir"]];
    setColSort({ col, dir });
  };

  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-5">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2.5 mb-0.5">
            <Users size={18} className="text-stone-700" />
            <h1 className="text-xl font-black text-stone-900 tracking-tight">
              Customers
            </h1>
          </div>
          <p className="text-sm text-stone-400">
            All registered customers and their spending behaviour
          </p>
        </div>

        {/* Summary */}
        <CustomersSummaryBar customers={initialCustomers} />

        {/* Filter bar */}
        <CustomersFilterBar
          search={search}
          sort={sortOption}
          total={initialCustomers.length}
          onSearch={setSearch}
          onSort={handleDropdownSort}
        />

        {/* Table */}
        {initialCustomers.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm flex flex-col items-center justify-center gap-4 py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center">
              <UserX size={28} className="text-stone-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-700">
                No customers found
              </p>
              <p className="text-xs text-stone-400 mt-1">
                Try adjusting your search
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-stone-100 bg-stone-50/70">
                    {/* Non-sortable */}
                    <th className="px-5 py-3.5 text-left">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-stone-400">
                        Customer
                      </span>
                    </th>
                    <th className="px-5 py-3.5 text-left">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-stone-400">
                        Tier
                      </span>
                    </th>
                    {/* Sortable */}
                    <SortHeader label="Total Spent" />
                    <SortHeader label="Avg. Order" />
                    <SortHeader label="Orders" />
                    <th className="px-5 py-3.5" />
                  </tr>
                </thead>
                <tbody>
                  {initialCustomers.map((customer, i) => (
                    <CustomerRow
                      key={customer.id}
                      customer={customer}
                      index={i}
                    />
                  ))}
                </tbody>
              </table>

              {/* Row count footer */}
              <div className="px-5 py-3 border-t border-stone-50 bg-stone-50/40">
                <p className="text-xs text-stone-400">
                  Showing{" "}
                  <span className="font-semibold text-stone-700">
                    {initialCustomers.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-stone-700">
                    {initialCustomers.length}
                  </span>{" "}
                  customers
                </p>
              </div>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-stone-100">
              {initialCustomers.map((customer, i) => {
                const spent = parseFloat(customer.total_money_spent);
                const avg = parseFloat(customer.average_order_value);
                const freq = parseInt(customer.order_frequency);
                const colors = [
                  "bg-violet-100 text-violet-700",
                  "bg-blue-100 text-blue-700",
                  "bg-emerald-100 text-emerald-700",
                  "bg-amber-100 text-amber-700",
                  "bg-rose-100 text-rose-700",
                ][i % 5];
                const initials = customer.full_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2);
                return (
                  <div
                    key={customer.id}
                    className="p-4 flex items-center gap-3 hover:bg-stone-50 transition-colors"
                  >
                    <div
                      className={`w-9 h-9 rounded-xl ${colors} flex items-center justify-center text-xs font-black shrink-0`}
                    >
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-stone-900 truncate">
                        {customer.full_name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="text-xs text-stone-400">
                          Rs {spent.toLocaleString()}
                        </span>
                        <span className="text-stone-200">·</span>
                        <span className="text-xs text-stone-400">
                          {freq} orders
                        </span>
                        <span className="text-stone-200">·</span>
                        <span className="text-xs text-stone-400">
                          avg Rs {avg.toFixed(0)}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/customers/${customer.id}`}
                      className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-stone-200 hover:text-stone-900 transition-colors shrink-0"
                    >
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

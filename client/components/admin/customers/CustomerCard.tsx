"use client";

import Link from "next/link";
import { ChevronRight, TrendingUp } from "lucide-react";
import { Customer } from "@/types/admin.types";
import { getInitials, getTier } from "@/utils/admin.customer";
import { AVATAR_COLORS } from "@/data/admin.customer.data";

const MAX_FREQ = 20;

type Props = { customer: Customer; index: number };

export function CustomerRow({ customer, index }: Props) {
  const spent = parseFloat(customer.total_money_spent);
  const avg = parseFloat(customer.average_order_value);
  const freq = parseInt(customer.order_frequency);
  const avatar = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const tier = getTier(spent);

  return (
    <tr className="group border-b border-stone-50 hover:bg-stone-50/60 transition-colors">
      {/* Customer */}
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-xl ${avatar.bg} ${avatar.text} flex items-center justify-center text-xs font-black shrink-0`}
          >
            {getInitials(customer.full_name)}
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-900 leading-tight">
              {customer.full_name}
            </p>
            <p className="text-xs text-stone-400">ID #{customer.id}</p>
          </div>
        </div>
      </td>

      {/* Tier */}
      <td className="px-5 py-3.5">
        <span
          className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${tier.bg} ${tier.text}`}
        >
          {tier.label}
        </span>
      </td>

      {/* Total spent */}
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-1.5">
          <TrendingUp size={12} className="text-emerald-500 shrink-0" />
          <span className="text-sm font-bold text-stone-900">
            Rs {spent.toLocaleString()}
          </span>
        </div>
      </td>

      {/* Avg order */}
      <td className="px-5 py-3.5">
        <span className="text-sm font-medium text-stone-700">
          Rs {avg.toFixed(0)}
        </span>
      </td>

      {/* Order frequency + spark bar */}
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-bold text-stone-900 w-4 text-right shrink-0">
            {freq}
          </span>
          <div className="w-20 h-1.5 bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-stone-900 rounded-full"
              style={{ width: `${Math.min((freq / MAX_FREQ) * 100, 100)}%` }}
            />
          </div>
        </div>
      </td>

      {/* View link */}
      <td className="px-5 py-3.5 text-right">
        <Link
          href={`/customers/${customer.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-stone-400 hover:text-stone-900 transition-colors group-hover:text-stone-700"
        >
          View
          <ChevronRight
            size={13}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </Link>
      </td>
    </tr>
  );
}

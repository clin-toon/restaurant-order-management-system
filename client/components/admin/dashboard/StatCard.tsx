"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

type Props = {
  label: string;
  value: string;
  change: string;
  up: boolean;
  sub: string;
  color: string;
  light: string;
  text: string;
  index: number;
};

export function StatCard({
  label,
  value,
  change,
  up,
  sub,
  color,
  light,
  text,
  index,
}: Props) {
  return (
    <div
      className="bg-white rounded-2xl border border-stone-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
          {label}
        </p>
        <span className={`w-2 h-2 rounded-full ${color}`} />
      </div>

      <p className="text-2xl font-black text-stone-900 tracking-tight">
        {value}
      </p>

      <div className="flex items-center gap-1.5 mt-2">
        <span
          className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${light} ${text}`}
        >
          {up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {change}
        </span>
        <span className="text-xs text-stone-400">{sub}</span>
      </div>
    </div>
  );
}

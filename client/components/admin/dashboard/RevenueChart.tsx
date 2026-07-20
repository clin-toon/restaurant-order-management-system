"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { WEEKLY_REVENUE, MONTHLY_REVENUE } from "@/data/admin-data";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-stone-900 text-white text-xs rounded-xl px-3 py-2.5 shadow-xl">
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="text-stone-300">
          {p.dataKey === "revenue"
            ? `Rs ${p.value.toLocaleString()}`
            : `${p.value} orders`}
        </p>
      ))}
    </div>
  );
};

type Tab = "weekly" | "monthly";

export function RevenueChart() {
  const [tab, setTab] = useState<Tab>("weekly");
  const data = tab === "weekly" ? WEEKLY_REVENUE : MONTHLY_REVENUE;
  const xKey = tab === "weekly" ? "day" : "month";

  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-stone-900">Revenue Overview</h3>
          <p className="text-xs text-stone-400 mt-0.5">
            Rs {tab === "weekly" ? "1,00,600" : "6,29,580"} this{" "}
            {tab === "weekly" ? "week" : "period"}
          </p>
        </div>
        <div className="flex items-center bg-stone-100 rounded-xl p-0.5">
          {(["weekly", "monthly"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${tab === t ? "bg-white text-stone-900 shadow-sm" : "text-stone-500 hover:text-stone-700"}`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        {tab === "weekly" ? (
          <BarChart
            data={data}
            barSize={28}
            margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f1f5f9"
              vertical={false}
            />
            <XAxis
              dataKey={xKey}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "#f8fafc", radius: 8 }}
            />
            <Bar dataKey="revenue" fill="#0f172a" radius={[6, 6, 0, 0]} />
          </BarChart>
        ) : (
          <AreaChart
            data={data}
            margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0f172a" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#0f172a" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f1f5f9"
              vertical={false}
            />
            <XAxis
              dataKey={xKey}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              dataKey="revenue"
              stroke="#0f172a"
              strokeWidth={2}
              fill="url(#revenueGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#0f172a" }}
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

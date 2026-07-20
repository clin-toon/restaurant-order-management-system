"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { ORDER_STATUS } from "@/data/admin-data";

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-stone-900 text-white text-xs rounded-xl px-3 py-2 shadow-xl">
      <p className="font-semibold">{payload[0].name}</p>
      <p className="text-stone-300 mt-0.5">{payload[0].value} orders</p>
    </div>
  );
};

export function OrderStatusChart() {
  const total = ORDER_STATUS.reduce((s, o) => s + o.count, 0);

  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
      <div className="mb-4">
        <h3 className="text-sm font-bold text-stone-900">Order Status</h3>
        <p className="text-xs text-stone-400 mt-0.5">{total} total orders</p>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={ORDER_STATUS}
            cx="50%"
            cy="50%"
            innerRadius={52}
            outerRadius={80}
            dataKey="count"
            nameKey="status"
            paddingAngle={3}
            strokeWidth={0}
          >
            {ORDER_STATUS.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="flex flex-col gap-2 mt-2">
        {ORDER_STATUS.map((o) => (
          <div key={o.status} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: o.color }}
              />
              <span className="text-xs text-stone-600 font-medium">
                {o.status}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-900 font-bold">
                {o.count}
              </span>
              <span className="text-[10px] text-stone-400">
                {((o.count / total) * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

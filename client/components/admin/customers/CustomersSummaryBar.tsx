import { TrendingUp, Users, ShoppingBag, BarChart2 } from "lucide-react";
import { Customer } from "@/types/admin.types";

type Props = { customers: Customer[] };

export function CustomersSummaryBar({ customers }: Props) {
  const total = customers.length;
  const totalSpent = customers.reduce(
    (s, c) => s + parseFloat(c.total_money_spent),
    0,
  );
  const totalOrders = customers.reduce(
    (s, c) => s + parseInt(c.order_frequency),
    0,
  );
  const avgOrder = customers.length
    ? customers.reduce((s, c) => s + parseFloat(c.average_order_value), 0) /
      customers.length
    : 0;

  const stats = [
    {
      icon: Users,
      label: "Total Customers",
      value: total.toString(),
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: TrendingUp,
      label: "Total Revenue",
      value: `Rs ${totalSpent.toLocaleString()}`,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: ShoppingBag,
      label: "Total Orders",
      value: totalOrders.toString(),
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      icon: BarChart2,
      label: "Avg. Order Value",
      value: `Rs ${avgOrder.toFixed(0)}`,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map(({ icon: Icon, label, value, color, bg }) => (
        <div
          key={label}
          className="bg-white rounded-2xl border border-stone-100 shadow-sm px-4 py-4 flex items-center gap-3"
        >
          <div
            className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center shrink-0`}
          >
            <Icon size={16} className={color} />
          </div>
          <div className="min-w-0">
            <p className="text-base font-black text-stone-900 leading-none truncate">
              {value}
            </p>
            <p className="text-[10px] text-stone-400 mt-0.5 font-medium">
              {label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

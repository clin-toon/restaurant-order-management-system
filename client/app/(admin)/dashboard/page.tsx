"use client";

import { STAT_CARDS } from "@/data/admin-data";
import { StatCard } from "@/components/admin/dashboard/StatCard";
import { RevenueChart } from "@/components/admin/dashboard/RevenueChart";
import { OrderStatusChart } from "@/components/admin/dashboard/OrderStatusChart";
import { TopItems } from "@/components/admin/dashboard/TopItems";
import { RecentOrders } from "@/components/admin/dashboard/RecentOrders";
import { useAuth } from "@/context/AuthContext/AuthContext";

const page = () => {
  const { user } = useAuth();
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h1 className="text-2xl font-black text-stone-900 mt-0.5 tracking-tight">
              {greeting}, {user?.name?.split(" ")[0] ?? "Admin"} 👋
            </h1>
            <p className="text-sm text-stone-400 mt-0.5">
              Here's what's happening with your restaurant today.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STAT_CARDS.map((card, i) => (
            <StatCard key={card.id} {...card} index={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div className="lg:col-span-1">
            <OrderStatusChart />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TopItems />
          <RecentOrders />
        </div>
      </div>
    </div>
  );
};

export default page;

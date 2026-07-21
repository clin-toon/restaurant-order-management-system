import { cookies } from "next/headers";
import { fetchOrderDetails } from "@/services/admin.order.services";
import AdminOrdersClient from "@/components/admin/orders/AdminOrdersClient";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const resolvedParams = await searchParams;

  let orders = [];
  try {
    const data = await fetchOrderDetails(cookieHeader, resolvedParams);

    orders = data.orders ?? [];
  } catch {
    orders = [];
  }

  return <AdminOrdersClient initialOrders={orders} />;
}

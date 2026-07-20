import { cookies } from "next/headers";
import { getOrderDetail } from "@/services/admin.order.services";
import AdminOrderDetailClient from "@/components/admin/order-details/AdminOrderDetailsClient";

type Props = { params: Promise<{ id: string }> };

export default async function AdminOrderDetailPage({ params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  let record = null;
  try {
    const data = await getOrderDetail(id, cookieHeader);
    record = data.data?.[0] ?? null;
  } catch {
    record = null;
  }

  return <AdminOrderDetailClient record={record} />;
}

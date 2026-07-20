import { cookies } from "next/headers";
import { fetchOrders } from "@/services/order.services";
import OrdersClient from "@/components/order/Ordersclient";

const page = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  let data = null;
  try {
    data = await fetchOrders(cookieHeader);
  } catch {
    data = null;
  }

  return <OrdersClient orders={data?.data ?? []} />;
};

export default page;

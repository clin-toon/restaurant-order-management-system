import { OrderDetailResponse } from "@/types/order-detail-types";
import { toast } from "sonner";

const url = process.env.NEXT_PUBLIC_API;

export const fetchOrderDetails = async (
  cookieHeader: string,
  params: string,
) => {
  const query = new URLSearchParams(params as any).toString();
  let apiEndPoint = `${url}admin/order?${query}`;

  try {
    const res = await fetch(apiEndPoint, {
      method: "GET",
      headers: { cookie: cookieHeader },
    });

    if (!res.ok) {
      console.log(res);
    }

    const orderItems = await res.json();
    console.log(orderItems);
    return orderItems;
  } catch (error) {
    console.log(error);
  }
};

export const updateTheStatusOfTheOrder = async (
  order_id: string,
  status: string,
) => {
  try {
    const res = await fetch(`${url}admin/order/${order_id}/${status}`, {
      method: "PUT",
      credentials: "include",
    });
    if (!res.ok) {
      console.log(await res.json());
      throw new Error();
    }
    const data = await res.json();
    return data?.success;
  } catch (error) {
    toast.error("Failed to update status ");
    throw new Error();
  }
};

export const getOrderDetail = async (
  orderId: string,
  cookieHeader: string,
): Promise<OrderDetailResponse> => {
  const res = await fetch(`${url}admin/order/details/${orderId}`, {
    method: "GET",
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch order details");
  return res.json();
};

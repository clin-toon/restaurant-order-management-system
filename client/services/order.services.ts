import { createOrderPropsType } from "@/types/order.types";
const url = process.env.NEXT_PUBLIC_API;

export const placeOrder = async (orderPayload: createOrderPropsType) => {
  try {
    const res = await fetch(`${url}order/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderPayload),
      credentials: "include",
    });
    console.log(res);

    if (!res.ok) {
      throw new Error("Logout failed");
    }
    const data = await res.json();
    return data.success;
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error("Logout failed");
  }
};

export const fetchOrders = async (cookieHeader: string) => {
  try {
    const res = await fetch(`${url}order/customer-orders`, {
      method: "GET",
      headers: {
        cookie: cookieHeader, // forward just the auth cookie
      },
    });
    if (!res.ok) {
      throw new Error("Faile to fetch posts");
    }
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts");
  }
};

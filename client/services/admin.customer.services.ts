import { CustomersResponse } from "@/types/admin.types";
const url = process.env.NEXT_PUBLIC_API;

export const getCustomers = async (
  cookieHeader: string,
): Promise<CustomersResponse> => {
  const res = await fetch(`/api/customer-insights`, {
    method: "GET",
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch customers");
  return res.json();
};

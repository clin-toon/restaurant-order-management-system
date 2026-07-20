import { cookies } from "next/headers";
import { getCustomers } from "@/services/admin.customer.services";
import AdminCustomersClient from "@/components/admin/customers/AdminCustomersClient";

export default async function AdminCustomersPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  let customers = [];
  try {
    const data = await getCustomers(cookieHeader);
    customers = data.data ?? [];
  } catch {
    customers = [];
  }

  return <AdminCustomersClient initialCustomers={customers} />;
}

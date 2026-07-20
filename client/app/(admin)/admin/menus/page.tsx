import { cookies } from "next/headers";
import { getAdminMenuItems } from "@/services/menu-admin.services";
import AdminMenuClient from "@/components/admin/menu/AdminMenuClient";

export default async function AdminMenuPage({ searchParams }) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const resolvedParams = await searchParams;

  let items = [];
  try {
    const data = await getAdminMenuItems(cookieHeader, resolvedParams);
    items = data.data ?? [];
  } catch {
    items = [];
  }

  return <AdminMenuClient initialItems={items} />;
}

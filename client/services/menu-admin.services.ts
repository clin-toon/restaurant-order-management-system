import { MenuItemsResponse } from "@/types/admin.types";
const url = process.env.NEXT_PUBLIC_API;

export const getAdminMenuItems = async (
  cookieHeader: string,
  params: string,
): Promise<MenuItemsResponse> => {
  const query = new URLSearchParams(params as any).toString();
  const res = await fetch(`${url}search?${query}`, {
    method: "GET",
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch menu items");
  return res.json();
};

export const addNewMenuItem = async (menuItem: any) => {
  console.log(menuItem);
  const formData = new FormData();

  Object.entries(menuItem).forEach(([key, value]) => {
    formData.append(key, value);
  });

  try {
    const res = await fetch(`${url}admin/menu/food-items`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    if (!res.ok) {
      console.log(await res.json());
    }
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

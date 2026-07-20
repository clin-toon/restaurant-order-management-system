export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  sub_category: string;
  is_available: boolean;
  is_vegetarian: boolean;
  image_url: string;
};

export type MenuItemsResponse = {
  success: boolean;
  data: MenuItem[];
};

export type SortOption = "latest" | "a-z" | "z-a" | "price-asc" | "price-desc";

export const CATEGORIES = [
  "all",
  "snacks",
  "breakfast",
  "lunch",
  "dinner",
  "drinks",
] as const;
export type CategoryFilter = (typeof CATEGORIES)[number];

export type ContactStatus = "pending" | "replied";
export type SortOptionA = "latest" | "oldest";
export type StatusFilter = "all" | ContactStatus;

export type ContactQuery = {
  c_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  message: string;
  created_at: string;
  status: ContactStatus;
  message_type: string;
};

export const TYPE_COLORS: Record<string, string> = {
  "General Inquiry": "bg-blue-50 text-blue-700 border-blue-200",
  "Order Issue": "bg-rose-50 text-rose-700 border-rose-200",
  Feedback: "bg-violet-50 text-violet-700 border-violet-200",
  Reservation: "bg-amber-50 text-amber-700 border-amber-200",
  Partnership: "bg-teal-50 text-teal-700 border-teal-200",
};

export const AVATAR_GRADIENTS = [
  "from-stone-700 to-stone-900",
  "from-emerald-600 to-teal-700",
  "from-blue-600 to-indigo-700",
  "from-rose-500 to-pink-700",
  "from-amber-500 to-orange-600",
];

// admin page customer page
export type Customer = {
  id: number;
  full_name: string;
  total_money_spent: string;
  average_order_value: string;
  order_frequency: string;
};

export type CustomersResponse = {
  success: boolean;
  message: string;
  data: Customer[];
};

export type SortOptionForCustomer =
  | "name-asc"
  | "name-desc"
  | "spent-desc"
  | "spent-asc"
  | "avg-desc"
  | "avg-asc"
  | "freq-desc"
  | "freq-asc";

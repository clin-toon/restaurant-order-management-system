import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  Tag,
  Users,
  Star,
  BarChart2,
  Settings,
  Mail,
  User,
  Store,
  Bell,
  Shield,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import { MenuItem } from "@/types/admin.types";

export type NavChild = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href?: string;
  icon: LucideIcon;
  badge?: number;
  children?: NavChild[];
};

export type NavGroup = {
  group: string;
  items: NavItem[];
};

// settings navigation page
export const NAV_TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "restaurant", label: "Restaurant", icon: Store },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

export const ADMIN_NAV: NavGroup[] = [
  {
    group: "Overview",
    items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    group: "Operations",
    items: [{ label: "Orders", href: "/admin/order", icon: ShoppingBag }],
  },
  {
    group: "Catalog",
    items: [
      { label: "Menu Items", href: "/admin/menus", icon: UtensilsCrossed },
    ],
  },
  {
    group: "People",
    items: [
      { label: "Customers", href: "/admin/customers", icon: Users },
      { label: "Reviews", href: "/admin/reviews", icon: Star },
      { label: "Contact Requests", href: "/admin/contact", icon: Mail },
    ],
  },
  {
    group: "Business",
    items: [
      { label: "Analytics", href: "/analytics", icon: BarChart2 },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export const STEPS = [
  { key: "pending", label: "Order Placed", desc: "Customer placed the order" },
  {
    key: "confirmed",
    label: "Confirmed",
    desc: "Order confirmed by restaurant",
  },
  {
    key: "preparing",
    label: "Preparing",
    desc: "Kitchen is preparing the order",
  },
  {
    key: "out_for_delivery",
    label: "Out for Delivery",
    desc: "Rider is on the way",
  },
  {
    key: "delivered",
    label: "Delivered",
    desc: "Order delivered successfully",
  },
];

export const STAT_CARDS = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: "Rs 1,24,580",
    change: "+18.4%",
    up: true,
    sub: "vs last month",
    color: "bg-emerald-500",
    light: "bg-emerald-50",
    text: "text-emerald-600",
  },
  {
    id: "orders",
    label: "Total Orders",
    value: "1,284",
    change: "+12.1%",
    up: true,
    sub: "vs last month",
    color: "bg-blue-500",
    light: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    id: "customers",
    label: "New Customers",
    value: "348",
    change: "+8.7%",
    up: true,
    sub: "vs last month",
    color: "bg-violet-500",
    light: "bg-violet-50",
    text: "text-violet-600",
  },
  {
    id: "avg",
    label: "Avg. Order Value",
    value: "Rs 497",
    change: "-2.3%",
    up: false,
    sub: "vs last month",
    color: "bg-amber-500",
    light: "bg-amber-50",
    text: "text-amber-600",
  },
];

export const WEEKLY_REVENUE = [
  { day: "Mon", revenue: 8400, orders: 42 },
  { day: "Tue", revenue: 11200, orders: 58 },
  { day: "Wed", revenue: 9800, orders: 51 },
  { day: "Thu", revenue: 14500, orders: 73 },
  { day: "Fri", revenue: 18200, orders: 94 },
  { day: "Sat", revenue: 22100, orders: 112 },
  { day: "Sun", revenue: 16400, orders: 84 },
];

export const MONTHLY_REVENUE = [
  { month: "Jan", revenue: 68000 },
  { month: "Feb", revenue: 74000 },
  { month: "Mar", revenue: 81000 },
  { month: "Apr", revenue: 79000 },
  { month: "May", revenue: 95000 },
  { month: "Jun", revenue: 108000 },
  { month: "Jul", revenue: 124580 },
];

export const ORDER_STATUS = [
  { status: "Delivered", count: 842, color: "#22c55e" },
  { status: "Preparing", count: 124, color: "#f59e0b" },
  { status: "Out for Delivery", count: 87, color: "#3b82f6" },
  { status: "Pending", count: 63, color: "#8b5cf6" },
  { status: "Cancelled", count: 42, color: "#ef4444" },
];

export const TOP_ITEMS = [
  {
    name: "Buff Momo",
    category: "Snacks",
    orders: 312,
    revenue: 56160,
    img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=80&q=80",
  },
  {
    name: "Masala Coffee",
    category: "Drinks",
    orders: 248,
    revenue: 29760,
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=80&q=80",
  },
  {
    name: "Truffle Mushroom Pizza",
    category: "Dinner",
    orders: 184,
    revenue: 143520,
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=80&q=80",
  },
  {
    name: "Wagyu Smash Burger",
    category: "Lunch",
    orders: 156,
    revenue: 106080,
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=80&q=80",
  },
  {
    name: "Dal Bhat Tarkari",
    category: "Dinner",
    orders: 142,
    revenue: 39760,
    img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=80&q=80",
  },
];

export const RECENT_ORDERS = [
  {
    id: "ORD-0091",
    customer: "Aarav Sharma",
    item: "Buff Momo × 2",
    total: 360,
    status: "delivered",
    time: "2 min ago",
  },
  {
    id: "ORD-0090",
    customer: "Priya Thapa",
    item: "Wagyu Burger + Cold Brew",
    total: 700,
    status: "preparing",
    time: "8 min ago",
  },
  {
    id: "ORD-0089",
    customer: "Rohan Gurung",
    item: "Dal Bhat × 1",
    total: 280,
    status: "out_for_delivery",
    time: "14 min ago",
  },
  {
    id: "ORD-0088",
    customer: "Sita Rai",
    item: "Truffle Pizza × 1",
    total: 780,
    status: "confirmed",
    time: "21 min ago",
  },
  {
    id: "ORD-0087",
    customer: "Bikash Magar",
    item: "Flat White × 3",
    total: 840,
    status: "pending",
    time: "35 min ago",
  },
];

export const CATEGORIES = ["snacks", "breakfast", "lunch", "dinner", "drinks"];
export const SUB_CATEGORIES: Record<string, string[]> = {
  snacks: ["momo", "chowmein", "fries", "samosa", "other"],
  breakfast: ["nepali_breakfast", "eggs", "toast", "other"],
  lunch: ["burger", "bowl", "wrap", "other"],
  dinner: ["pizza", "pasta", "dal_bhat", "other"],
  drinks: ["coffee", "tea", "juice", "beer", "other"],
};

export const EMPTY: Partial<MenuItem> = {
  name: "",
  description: "",
  price: "",
  category: "",
  sub_category: "",
  image_url: "",
  is_available: true,
  is_vegetarian: false,
};

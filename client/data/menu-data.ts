import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  tag?: "Popular" | "New" | "Chef's Pick";
};

export type SubCategory = {
  id: string;
  label: string;
  items?: any;
};

export type Category = {
  id: string;
  label: string;
  emoji: string;
  subcategories: SubCategory[];
};

export const menuData: Category[] = [
  {
    id: "drinks",
    label: "Drinks",
    emoji: "🥤",
    subcategories: [
      {
        id: "coffee",
        label: "Coffee",
      },
      {
        id: "tea",
        label: "Tea",
      },
      {
        id: "juice",
        label: "Juice",
      },
      {
        id: "beer",
        label: "Beer",
      },
    ],
  },
  {
    id: "snacks",
    label: "Snacks",
    emoji: "🍟",
    subcategories: [
      {
        id: "momo",
        label: "Momo",
      },
      {
        id: "chowemin",
        label: "Chowmein",
      },
      {
        id: "Pizza",
        label: "Pizza",
      },
    ],
  },
  {
    id: "breakfast",
    label: "Breakfast",
    emoji: "🍳",
    subcategories: [
      {
        id: "nepali_breakfast",
        label: "Nepali_Breakfast",
      },
      {
        id: "eggs",
        label: "Eggs",
      },
      {
        id: "toast",
        label: "Toasts",
      },
    ],
  },
];

export const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Find Us",
    lines: ["Thamel Marg, Kathmandu", "Bagmati Province, Nepal"],
  },
  {
    icon: Phone,
    label: "Call Us",
    lines: ["+977 01-XXXXXX", "+977 98-XXXXXXXX"],
  },
  {
    icon: Mail,
    label: "Email Us",
    lines: ["hello@foodie.com.np", "support@foodie.com.np"],
  },
  {
    icon: Clock,
    label: "Opening Hours",
    lines: ["Sun – Fri: 7:00 AM – 10:00 PM", "Saturday: 8:00 AM – 11:00 PM"],
  },
];

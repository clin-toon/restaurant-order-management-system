import CartItemCard from "@/components/cart/CartItemCard";

export interface CartItem {
  cart_id?: string;
  food_item_id?: string;
  quantity?: number;
  user_id?: string;
}


export interface CartState {
  cartCount: number;
  cartDetailsItem:CartDetailsItem[]
}

export type CartAction =
  {type:"UPDATE_COUNT" ; payload:number} |
  {type:"ADD_DETAILS_TO_CART" ; payload:CartCardItem} | 
  {type:"REMOVE_ITEM" ; payload:CartDetailsItem[]}


export type CartCardItem = {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  quantity: number;
  total_price: string;
  image_url?:string
};
 
export type CartResponse = {
  status: string;
  message: string;
  cart: CartItem[];
  total: string;
};

export const categoryColor: Record<string, string> = {
  snacks: "bg-amber-50 text-amber-700 border border-amber-200",
  "main course": "bg-emerald-50 text-emerald-700 border border-emerald-200",
  drinks: "bg-sky-50 text-sky-700 border border-sky-200",
  breakfast: "bg-rose-50 text-rose-700 border border-rose-200",
  lunch: "bg-violet-50 text-violet-700 border border-violet-200",
};

export type CartDetailsItem =  {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  quantity: number;
  total_price: string;
  image_url: string;
}

export interface CartContextType  {
  state:CartState
  getTotalCartItem: () => number;
  checkFoodIdExistsOrNot: (food_item_id: string ) => boolean;
  updateCartCount: (currCount: number ) => void;
  addToDetailsCart:(arr:any)=>void;
  removeItemFromCart :(food_id:string) => void;
  findTheQuantityOfTheFoodItem:(food_id:string)=>number
}
export interface DeliveryAddress {
  landmark: string;
  latitude: number;
  longitude: number;
  location_url: string;
}

export type OrderDetail = {
  food_item: string;
  food_image_url: string;
  quantity: number;
  sub_total: number;
};

export type Order = {
  order_id: string;
  total_amount: number;
  order_status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "out_for_delivery"
    | "delivered"
    | "cancelled";
  Payment_status: "unpaid" | "paid";
};

export type OrderRecord = {
  delivery_address: DeliveryAddress[];
  order: Order[];
  order_details: OrderDetail[];
};

export interface createOrderPropsType extends DeliveryAddress {
  receiver_name: string;
  receiver_phone: string;
}

// admin order types

// types/order-admin.types.ts

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "paid" | "unpaid";

export type AdminOrder = {
  id: string;
  full_name: string;
  created_at: string;
  order_status: OrderStatus;
  payment_status: PaymentStatus;
};

export type AdminOrdersResponse = {
  success: boolean;
  orders: AdminOrder[];
};

export type SortOption = "latest" | "oldest";
export type StatusFilter = "all" | OrderStatus;
export type PaymentFilter = "all" | PaymentStatus;

export type OrderDetailItem = {
  food_item: string;
  food_image_url: string;
  quantity: number;
  sub_total: number;
};

export type OrderDetailRecord = {
  order_id: string;
  delivery_address: {
    landmark: string;
    latitude: number;
    longitude: number;
    location_url: string;
  };
  order: {
    order_id: string;
    total_amount: number;
    order_status: string;
    payment_status: string;
  };
  order_details: OrderDetailItem[];
};

export type OrderDetailResponse = {
  success: boolean;
  message: string;
  data: OrderDetailRecord[];
};

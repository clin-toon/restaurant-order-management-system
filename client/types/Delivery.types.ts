export type DeliveryPayload = {
  latitude: number;
  longitude: number;
  location_url: string;
  landmark: string;
};

export type CreateOrderPayload = {
  order_id: string;
  phone: string;
  delivery_address: DeliveryPayload;
};

export type DeliveryMapModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: DeliveryPayload) => void;
};

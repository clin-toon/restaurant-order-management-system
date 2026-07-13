import {z} from "zod"

export const OrderStatusSchema = z.object({
    status:z.enum(["pending", "cancelled", "preparing", "delivered"]),
    id:z.string().length(36, "36 characters required for id")
})

// Extract the TypeScript type from the schema
type OrderStatusSchema = z.infer<typeof OrderStatusSchema>;




export const deliveryAddressSchema = z.object({
  receiver_name: z
    .string()
    .min(2, "Receiver name is too short")
    .max(100, "Receiver name too long"),

  receiver_phone: z
    .string()
    .regex(/^\d{10}$/, "Phone must be exactly 10 digits"),

  latitude: z
    .coerce.number()
    .min(-90, "Latitude must be >= -90")
    .max(90, "Latitude must be <= 90"),

  longitude: z
    .coerce.number()
    .min(-180, "Longitude must be >= -180")
    .max(180, "Longitude must be <= 180"),

  location_url: z
    .string()
    .url("Invalid location URL")
    .optional(),

  landmark: z
    .string()
    .max(255, "Landmark too long")
    .optional(),
});

export type DeliveryAddressSchema = z.infer<typeof deliveryAddressSchema>;
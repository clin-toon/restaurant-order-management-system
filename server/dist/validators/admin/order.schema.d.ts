import { z } from "zod";
export declare const OrderStatusSchema: z.ZodObject<{
    status: z.ZodEnum<{
        pending: "pending";
        cancelled: "cancelled";
        preparing: "preparing";
        delivered: "delivered";
    }>;
    id: z.ZodString;
}, z.core.$strip>;
export declare const deliveryAddressSchema: z.ZodObject<{
    receiver_name: z.ZodString;
    receiver_phone: z.ZodString;
    latitude: z.ZodCoercedNumber<unknown>;
    longitude: z.ZodCoercedNumber<unknown>;
    location_url: z.ZodOptional<z.ZodString>;
    landmark: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type DeliveryAddressSchema = z.infer<typeof deliveryAddressSchema>;
//# sourceMappingURL=order.schema.d.ts.map
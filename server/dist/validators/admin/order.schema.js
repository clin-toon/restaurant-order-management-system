"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deliveryAddressSchema = exports.OrderStatusSchema = void 0;
const zod_1 = require("zod");
exports.OrderStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(["pending", "cancelled", "preparing", "delivered"]),
    id: zod_1.z.string().length(36, "36 characters required for id")
});
exports.deliveryAddressSchema = zod_1.z.object({
    receiver_name: zod_1.z
        .string()
        .min(2, "Receiver name is too short")
        .max(100, "Receiver name too long"),
    receiver_phone: zod_1.z
        .string()
        .regex(/^\d{10}$/, "Phone must be exactly 10 digits"),
    latitude: zod_1.z
        .coerce.number()
        .min(-90, "Latitude must be >= -90")
        .max(90, "Latitude must be <= 90"),
    longitude: zod_1.z
        .coerce.number()
        .min(-180, "Longitude must be >= -180")
        .max(180, "Longitude must be <= 180"),
    location_url: zod_1.z
        .string()
        .url("Invalid location URL")
        .optional(),
    landmark: zod_1.z
        .string()
        .max(255, "Landmark too long")
        .optional(),
});
//# sourceMappingURL=order.schema.js.map
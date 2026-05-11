import {z} from "zod"

export const OrderStatusSchema = z.object({
    status:z.enum(["pending", "cancelled", "preparing", "delivered"]),
    id:z.string().length(36, "36 characters required for id")
})

// Extract the TypeScript type from the schema
type OrderStatus = z.infer<typeof OrderStatusSchema>;
import { z } from "zod";
export declare const foodItemSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    price: z.ZodCoercedNumber<unknown>;
    category: z.ZodString;
    sub_category: z.ZodOptional<z.ZodString>;
    is_available: z.ZodDefault<z.ZodCoercedBoolean<unknown>>;
    is_vegetarian: z.ZodDefault<z.ZodCoercedBoolean<unknown>>;
}, z.core.$strip>;
export type FoodItemInput = z.infer<typeof foodItemSchema>;
//# sourceMappingURL=menu.schema.d.ts.map
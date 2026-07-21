import { z } from 'zod';
export declare const registerSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    phone: z.ZodString;
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const foodFilterSchema: z.ZodObject<{
    cat: z.ZodOptional<z.ZodString>;
    is_vegetarian: z.ZodOptional<z.ZodPipe<z.ZodTransform<boolean, unknown>, z.ZodBoolean>>;
    min_price: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    max_price: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    search: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type RegisterInput = z.infer<typeof registerSchema>;
//# sourceMappingURL=validationSchema.d.ts.map
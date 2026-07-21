"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodFilterSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
// register schema 
exports.registerSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, "First name is required"),
    lastName: zod_1.z.string().min(1, "Last name is required"),
    phone: zod_1.z.string()
        .min(10, "Phone number must be 10 digits")
        .max(10, "Phone number must be 10 digits"),
    username: zod_1.z.string()
        .min(3, "Username must be 3+ chars")
        .max(10, "Username must be less than 10 characters"),
    // Fix: changed z.email() to z.string().email()
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string()
        .min(8, "Password must be greater than 8 chars")
        .max(15, "Password must be less than 15 chars"),
});
// login schema
exports.loginSchema = exports.registerSchema.pick({
    email: true,
    password: true
});
exports.foodFilterSchema = zod_1.z.object({
    cat: zod_1.z.string().optional(),
    is_vegetarian: zod_1.z.preprocess((val) => val === 'true', zod_1.z.boolean()).optional(),
    min_price: zod_1.z.coerce.number().min(0).optional(),
    max_price: zod_1.z.coerce.number().min(0).optional(),
    search: zod_1.z.string().optional(),
});
//# sourceMappingURL=validationSchema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactSchema = void 0;
const zod_1 = require("zod");
exports.contactSchema = zod_1.z.object({
    c_id: zod_1.z.string().uuid().optional(),
    first_name: zod_1.z.string().min(1, "First name is required").max(100),
    email: zod_1.z.email(),
    last_name: zod_1.z.string().min(1, "Last name is required").max(100),
    phone: zod_1.z.string().regex(/^[0-9]{10}$/, "Phone must be exactly 10 digits"),
    message: zod_1.z
        .string()
        .min(1, "Message is required")
        .max(500, "Message must be less than 500 characters"),
    message_type: zod_1.z.enum(["Feedback", "Order Issue", "General Inquiry"]),
});
//# sourceMappingURL=contactValidation.js.map
import { z } from "zod";
export declare const contactSchema: z.ZodObject<{
    c_id: z.ZodOptional<z.ZodString>;
    first_name: z.ZodString;
    email: z.ZodEmail;
    last_name: z.ZodString;
    phone: z.ZodString;
    message: z.ZodString;
    message_type: z.ZodEnum<{
        Feedback: "Feedback";
        "Order Issue": "Order Issue";
        "General Inquiry": "General Inquiry";
    }>;
}, z.core.$strip>;
export type ContactInput = z.infer<typeof contactSchema>;
//# sourceMappingURL=contactValidation.d.ts.map
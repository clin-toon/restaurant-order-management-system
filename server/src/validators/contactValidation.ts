import { z } from "zod";

export const contactSchema = z.object({
  c_id: z.string().uuid().optional(),

  first_name: z.string().min(1, "First name is required").max(100),

  last_name: z.string().min(1, "Last name is required").max(100),

  phone: z.string().regex(/^[0-9]{10}$/, "Phone must be exactly 10 digits"),

  message: z
    .string()
    .min(1, "Message is required")
    .max(500, "Message must be less than 500 characters"),

  message_type: z.enum(["Feedback", "Order Issue", "General Inquiry"]),
});

export type ContactInput = z.infer<typeof contactSchema>;

import { z } from "zod";

export const foodItemSchema = z.object({
  // Name: Required, trimmed, and length-constrained
  name: z
    .string({
      message: "Name is required",
    })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),

  // Description: Optional but useful for the UI
  description: z
    .string({
      message: "The description field is required",
    })
    .trim()
    .max(500, "Description is too long")
    .min(1, "Description is required "),
  // Price: Must be a positive number (Postgres DECIMAL/NUMERIC)
  price: z.coerce
    .number({
      message: "Price is required",
    })
    .positive("Price must be greater than zero")
    .refine((val) => !isNaN(val), "Invalid price format"),

  // Category: Usually references an ID or a specific set of strings
  category: z
    .string({
      message: "Category is required",
    })
    .min(1, "Category is required"),
  sub_category: z
    .string({
      message: "Category is required",
    })
    .optional(),

  // Status flags with defaults
  is_available: z.coerce.boolean().default(true),

  is_vegetarian: z.coerce.boolean().default(false),
});

// Type inference for use in your controllers/services
export type FoodItemInput = z.infer<typeof foodItemSchema>;

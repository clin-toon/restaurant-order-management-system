import { z } from 'zod';

// register schema 
export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),

  lastName: z.string().min(1, "Last name is required"), 
  
  phone: z.number()
    .int() 
    .gte(1000000000, "Phone number must be 10 digits") 
    .lte(9999999999, "Phone number must be 10 digits"), 

  username: z.string()
    .min(3, "Username must be 3+ chars")
    .max(10, "Username must be less than 10 characters"),

  // Fix: changed z.email() to z.string().email()
  email: z.string().email("Invalid email format"), 

  password: z.string()
    .min(8, "Password must be greater than 8 chars")
    .max(15, "Password must be less than 15 chars"),
});


// login schema
export const loginSchema = registerSchema.pick({
  email: true,
  password: true
});


export const foodFilterSchema = z.object({
  cat: z.string().optional(),
  
  is_vegetarian: z.preprocess((val) => val === 'true', z.boolean()).optional(),

  min_price: z.coerce.number().min(0).optional(),
  max_price: z.coerce.number().min(0).optional(),
  search: z.string().optional(),
}); 



export type RegisterInput = z.infer<typeof registerSchema>;
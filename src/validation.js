import { z } from "zod";


export const loginSchema = z.object({
  email: z.string().email("Invalid email address.Please Proivide a valid email.").optional(),
  password: z.string().min(8, "Password must be at least 8 characters long").optional(),
});

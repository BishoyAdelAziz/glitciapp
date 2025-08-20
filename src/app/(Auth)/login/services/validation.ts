import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("this Email is not valid"),
  password: z
    .string()
    .min(8, "must be at least 8 Chracters")
    .regex(/[a-z]/, "must contain at least one lowercase")
    .regex(/[A-Z]/, "must contain at least one UPPERCASE")
    .regex(/[0-9]/, "must contain at lease one number")
    .regex(/[@$!%*?&]/, "must Contain one of those Special Chracters"),
});

export type FormFields = z.infer<typeof LoginSchema>;

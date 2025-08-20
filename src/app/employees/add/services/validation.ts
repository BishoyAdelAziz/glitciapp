import { z } from "zod";

export const AddEmployeeValidation = z.object({
  name: z.string().min(3).max(50).trim(),
  email: z.string().email(),
  phones: z
    .array(
      z.string().regex(/^\+?\d{11,15}$/, {
        message:
          "Phone number must be 11-15 digits (international format allowed)",
      })
    )
    .min(1, "At least one phone number is required"),
  departments: z
    .array(z.string().min(1))
    .min(1, "Select at least one department"),
  positions: z.array(z.string().min(1)).min(1, "Select at least one position"),
  skills: z.array(z.string().min(1)).min(1, "Select at least one skill"),
});

export type FormFields = z.infer<typeof AddEmployeeValidation>;
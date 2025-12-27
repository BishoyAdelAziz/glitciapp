import z from "zod";

export const ProjectSchema = z.object({
  name: z.string().nonempty("Project name is required"),
  description: z.string(),
  budget: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Budget must be a number",
  }),
  startDate: z
    .date()
    .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
      message: "Invalid start date",
    }),
  endDate: z
    .date()
    .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
      message: "Invalid start date",
    }),
  department: z.string().nonempty("Department is required"),
  employees: z
    .array(z.string())
    .min(1, "At least one employee must be assigned to the project"),
});
export type ProjectFieldValues = z.infer<typeof ProjectSchema>;

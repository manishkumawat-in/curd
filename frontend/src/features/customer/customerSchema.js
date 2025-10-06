import z from "zod";

export const customerSchema = z.object({
  name: z.string().min(1, "Name is required..."),
  contact: z
    .string()
    .min(10, "minimum length should be 10...")
    .max(10, "Maximum length should be 10..."),
});

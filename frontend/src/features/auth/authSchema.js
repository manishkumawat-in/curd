import z from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  mobile: z
    .string()
    .min(10, "Min length should be 10...")
    .max(10, "Max length should be 10..."),
  password: z.string().min(6, "password length should be atleast 6..."),
});

export const loginSchema = z.object({
  mobile: z
    .string()
    .min(10, "Min length should be 10...")
    .max(10, "Max length should be 10..."),
  password: z.string().min(6, "password length should be atleast 6..."),
});
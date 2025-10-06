import z from "zod";

export const signUpSchema = z.object({
    name: z.string().min(1, "name is required!"),
    mobile: z.string().min(10, "Mobile number Length should be 10...").max(10, "Mobile number length should be 10..."),
    password: z.string().min(6, "Password length should be atleast 6..."),
});

export const loginSchema = z.object({
    mobile: z.string().min(10, "Mobile number Length should be 10...").max(10, "Mobile number length should be 10..."),
    password: z.string().min(6, "Password length should be atleast 6..."),
});
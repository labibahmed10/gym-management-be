import { z } from "zod";
import { Role, UserStatus } from "./user.constant";

export const registerValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required" }).email("Invalid email format"),
    password: z.string({ required_error: "Password is required" }).min(6, "Password must be at least 6 characters long"),
    role: z.enum([...Role] as [string, ...string[]]).optional(),
    status: z.enum([...UserStatus] as [string, ...string[]]).default("active"),
  }),
});

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string(),
  }),
});

export const UserValidation = {
  registerValidationSchema,
  loginValidationSchema,
};

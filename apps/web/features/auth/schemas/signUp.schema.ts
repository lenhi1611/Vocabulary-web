import { z } from "zod";

import { passwordSchema } from "@/shared/validators/password.validator";

export const signUpSchema = z
  .object({
    fullName: z.string().trim().min(1, "Full name is required"),
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .pipe(z.email({ error: "Enter a valid email address" })),
    password: passwordSchema(8),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    role: z.string().min(1, "Please choose a goal"),
    agreeToTerms: z.boolean().refine((value) => value, "You must accept the terms to continue"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpValues = z.infer<typeof signUpSchema>;

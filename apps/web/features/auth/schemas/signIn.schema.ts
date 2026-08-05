import { z } from "zod";

import { passwordSchema } from "@/shared/validators/password.validator";

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .pipe(z.email({ error: "Enter a valid email address" })),
  password: passwordSchema(6),
});

export type SignInValues = z.infer<typeof signInSchema>;

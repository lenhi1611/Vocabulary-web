import { z } from "zod";

export const passwordSchema = (minLength = 8) =>
  z.string().min(minLength, `Password must be at least ${minLength} characters`);

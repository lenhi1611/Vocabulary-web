import { z } from "zod"

export const createCardSchema = z.object({
  word: z.string().min(1, "Word is required").max(100, "Word is too long"),
  phonetic: z.string().max(100).optional(),
  meaningVi: z.string().min(1, "Meaning is required").max(500, "Meaning is too long"),
  meaningEn: z.string().max(500, "Meaning is too long").optional(),
  example: z.string().max(500).optional(),
})

export type CreateCardFormData = z.infer<typeof createCardSchema>
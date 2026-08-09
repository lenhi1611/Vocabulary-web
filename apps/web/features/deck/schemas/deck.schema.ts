import z from "zod";
import { DECK_LEVEL } from "../constant";


export const createDeckSchema = z.object({
    name: z.string().min(1, "Name is required").max(1000, "Name is too long"),
    description: z.string().max(500, "Description is too long").optional(),
    level: z.enum(DECK_LEVEL).default("BEGINNER").optional(),
    topic: z.string().max(50, "Topic is too long").optional()
})

export type CreateDeckFormData = z.infer<typeof createDeckSchema>
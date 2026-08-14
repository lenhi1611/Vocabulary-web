import { Router } from "express";
import { dictionaryController } from "./dictionary.controller";
import { authMiddleware } from "@/middleware/auth.middleware";

export const dictionaryRouter = Router();

dictionaryRouter.use(authMiddleware);

dictionaryRouter.get("/:word", dictionaryController.lookup);

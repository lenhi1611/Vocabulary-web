import { authMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";
import { studyController } from "./study.controller";

export const studyRouter = Router();

studyRouter.use(authMiddleware);

studyRouter.get("/decks/:deckId/study", studyController.getStudyCards);
studyRouter.post("/cards/:cardId/review", studyController.submitReview);
studyRouter.get("/decks/:deckId/study/stats", studyController.getSessionStats);

studyRouter.post("/decks/:deckId/study/reset", studyController.resetDeck);

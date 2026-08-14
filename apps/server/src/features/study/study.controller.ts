import { NextFunction, Request, Response } from "express";
import { studyService } from "./study.service";
import { handleSuccessResponse } from "@/lib/response";

export const studyController = {
  async getStudyCards(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await studyService.getStudyCards(
        req.params.deckId as string,
        req.user!.userId,
      );

      handleSuccessResponse(res, result);
    } catch (error) {
      next(error);
    }
  },

  async submitReview(req: Request, res: Response, next: NextFunction) {
    try {
      const card = await studyService.submitReview({
        cardId: req.params.cardId as string,
        rating: req.body.rating,
        userId: req.user!.userId,
      });

      handleSuccessResponse(res, card);
    } catch (error) {
      next(error);
    }
  },

  async getSessionStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await studyService.getSessionStats(
        req.params.deckId as string,
        req.user!.userId,
      );
      handleSuccessResponse(res, stats);
    } catch (error) {
      next(error);
    }
  },

  async resetDeck(req: Request, res: Response, next: NextFunction) {
    try {
      await studyService.resetDeck(
        req.params.deckId as string,
        req.user!.userId,
      );
      handleSuccessResponse(res, null, { message: "Reset successfully" });
    } catch (error) {
      next(error);
    }
  },
};

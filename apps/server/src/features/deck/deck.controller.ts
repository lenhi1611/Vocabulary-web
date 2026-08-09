import { NextFunction, Request, Response } from "express";
import { deckService } from "./deck.service";
import { handleSuccessResponse } from "@/lib/response";

export const deckController = {
  async getDecks(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const page = Math.max(1, Number(req.query.page ?? 1));
      const limit = Math.max(10, Number(req.query.limit ?? 10));
      const result = await deckService.getDecksByUserId(userId, page, limit);
      handleSuccessResponse(res, result);
    } catch (error) {
      next(error);
    }
  },

  async getDeckById(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.user!.userId;
      const deck = await deckService.getDeckById(req.params.id, userId);

      handleSuccessResponse(res, deck);
    } catch (error) {
      next(error);
    }
  },

  async createDeck(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const deck = await deckService.createDeck({ ...req.body, userId });
      handleSuccessResponse(res, deck);
    } catch (error) {
      next(error);
    }
  },

  async updateDeck(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.user!.userId;
      const deck = await deckService.updateDeck(
        { ...req.body },
        userId,
        req.params.id,
      );
      handleSuccessResponse(res, deck);
    } catch (error) {
      next(error);
    }
  },

  async deleteDeck(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.user!.userId;
      await deckService.deleteDeck(req.params.id, userId);
      handleSuccessResponse(res, null, { message: "Delete deck successfully" });
    } catch (error) {
      next(error);
    }
  },
};

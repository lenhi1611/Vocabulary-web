import { Response, Request, NextFunction } from "express";
import { cardService } from "./card.service";
import { handleSuccessResponse } from "@/lib/response";
import { prisma } from "@/lib/prisma";

export const cardController = {
  async getCards(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const deckId = req.params.deckId as string;
      const cursor = req.query.cursor as string | undefined;
      const limit = Number(req.query.limit ?? 20);

      const result = await cardService.getCards(deckId, userId, limit, cursor);

      handleSuccessResponse(res, result);
    } catch (error) {
      next(error);
    }
  },

  async createCard(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const deckId = req.params.deckId as string;
      const data = req.body;
      const card = await cardService.createCard({ ...data, userId, deckId });

      handleSuccessResponse(res, card, {
        statusCode: 201,
        message: "Created card successfully!",
      });
    } catch (error) {
      next(error);
    }
  },

  async updateCard(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const cardId = req.params.id as string;

      const card = await cardService.updateCard(req.body, cardId, userId);

      handleSuccessResponse(res, card);
    } catch (error) {
      next(error);
    }
  },

  async deleteCard(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const cardId = req.params.id as string;
      await cardService.deleteCard(cardId, userId);

      handleSuccessResponse(res, null, { message: "Deleted card" });
    } catch (error) {
      next(error);
    }
  },
};

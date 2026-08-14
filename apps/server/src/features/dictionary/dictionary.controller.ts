import { NextFunction, Request, Response } from "express";
import { dictionaryService } from "./dictionary.service";
import { handleSuccessResponse } from "@/lib/response";

export const dictionaryController = {
  async lookup(req: Request, res: Response, next: NextFunction) {
    try {
      const entries = await dictionaryService.lookup(req.params.word as string);
      handleSuccessResponse(res, entries);
    } catch (error) {
      next(error);
    }
  },
};

import { NextFunction, Request, Response } from "express";
import { translateService } from "./translate.service";
import { handleSuccessResponse } from "@/lib/response";

export const translateController = {
  async translate(req: Request, res: Response, next: NextFunction) {
    try {
      const { text } = req.body;
      const translated = await translateService.translate(text);
      handleSuccessResponse(res, { translated });
    } catch (error) {
      next(error);
    }
  },
};

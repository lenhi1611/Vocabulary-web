import { Router } from "express";
import { translateController } from "./translate.controller";

export const translateRouter = Router();

translateRouter.post("/", translateController.translate);

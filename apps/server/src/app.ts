import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter } from "@/features/auth/auth.router";
import { deckRouter } from "@/features/deck/deck.router";
import { cardRouter } from "@/features/card/card.router";
import { errorMiddleware } from "@/middleware/error.middleware";
import { studyRouter } from "./features/study/study.router";
import { translateRouter } from "./features/translate/translate.router";
import { dictionaryRouter } from "./features/dictionary/dictionary.router";

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.WEB_URL ?? "http://localhost:3000",
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/decks", deckRouter);
app.use("/api", cardRouter);
app.use("/api", studyRouter);
app.use("/api/translate", translateRouter)
app.use("/api/dictionary", dictionaryRouter)

app.use(errorMiddleware);

import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { authRouter } from "@/features/auth/auth.router"
import { deckRouter } from "@/features/deck/deck.router"
import { cardRouter } from "@/features/card/card.router"
import { errorMiddleware } from "@/middleware/error.middleware"

export const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.WEB_URL ?? "http://localhost:3000",
  credentials: true,
}))

app.use("/api/auth", authRouter)

app.use(errorMiddleware)
app.use("/api/decks", deckRouter)
app.use("/api/cards", cardRouter)

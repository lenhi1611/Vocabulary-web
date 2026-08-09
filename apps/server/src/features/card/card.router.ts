import { Router } from "express"
import { cardController } from "./card.controller"
import { authMiddleware } from "@/middleware/auth.middleware"

export const cardRouter = Router()

cardRouter.use(authMiddleware)

cardRouter.get("/decks/:deckId/cards", cardController.getCards)
cardRouter.post("/decks/:deckId/cards", cardController.createCard)

cardRouter.patch("/cards/:id", cardController.updateCard)
cardRouter.delete("/cards/:id", cardController.deleteCard)
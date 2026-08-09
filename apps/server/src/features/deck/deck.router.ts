import { Router } from "express"
import { deckController } from "./deck.controller"
import { authMiddleware } from "@/middleware/auth.middleware"

export const deckRouter = Router()

deckRouter.use(authMiddleware)

deckRouter.get("/", deckController.getDecks)
deckRouter.get("/:id", deckController.getDeckById)
deckRouter.post("/", deckController.createDeck)
deckRouter.patch("/:id", deckController.updateDeck)
deckRouter.delete("/:id", deckController.deleteDeck)
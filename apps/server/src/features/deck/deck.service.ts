import { BadRequestError, ForbiddenError, NotFoundError } from "@/lib/error";
import { prisma } from "@/lib/prisma";
import { createDeckInput, updateDeckInput } from "./deck.types";

export const deckService = {
  getDecksByUserId: async (userId: string, page: number, limit: number) => {
    const skip = (page - 1) * limit;
    const [decks, total] = await prisma.$transaction([
      prisma.deck.findMany({
        where: { userId },
        skip,
        take: limit,
        include: {
          _count: { select: { cards: true } },
        },
      }),
      prisma.deck.count({ where: { userId } }),
    ]);
    const totalPages = Math.ceil(total / limit);

    return {
      decks,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  },

  getDeckById: async (deckId: string, userId: string) => {
    const deck = await prisma.deck.findUnique({
      where: { id: deckId },
      include: {
        _count: { select: { cards: true } },
      },
    });

    if (!deck) throw new NotFoundError("Deck not found", "DECK_NOT_FOUND");
    if (deck.userId !== userId)
      throw new NotFoundError("Deck not found", "DECK_NOT_FOUND");

    return deck;
  },

  createDeck: async (deckData: createDeckInput) => {
    if (!deckData.name?.trim()) {
      throw new BadRequestError("Deck name is required");
    }
    const deck = await prisma.deck.create({
      data: deckData,
    });

    return deck;
  },

  updateDeck: async (
    deckData: updateDeckInput,
    userId?: string,
    deckId?: string,
  ) => {
    const deck = await prisma.deck.findUnique({ where: { id: deckId } });
    if (!deck) {
      throw new NotFoundError("Deck not found");
    }

    if (deck.userId !== userId) {
      throw new ForbiddenError();
    }

    return prisma.deck.update({
      where: { id: deckId },
      data: {
        ...(deckData.name && { name: deckData.name.trim() }),
        ...(deckData.description && { description: deckData.description }),
        ...(deckData.level && { level: deckData.level }),
        ...(deckData.topic && { topic: deckData.topic }),
      },
    });
  },

  deleteDeck: async (deckId: string, userId: string) => {
    const deck = await prisma.deck.findUnique({
      where: { id: deckId },
    });
    if (!deck) {
      throw new NotFoundError("Deck not found");
    }
    if (deck.userId !== userId) {
      throw new ForbiddenError();
    }
    await prisma.deck.delete({
      where: { id: deckId },
    });
  },
};

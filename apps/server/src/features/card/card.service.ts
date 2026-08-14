import { BadRequestError, ForbiddenError, NotFoundError } from "@/lib/error";
import { prisma } from "@/lib/prisma";
import { CreateCardInput, UpdateCardInput } from "./card.types";

export const cardService = {
  async getCards(
    deckId: string,
    userId: string,
    limit: number,
    cursor?: string,
  ) {
    const deck = await prisma.deck.findUnique({
      where: {
        id: deckId,
      },
    });

    if (!deck) {
      throw new NotFoundError("Deck not found");
    }
    if (deck.userId !== userId) {
      throw new ForbiddenError();
    }
    const cards = await prisma.card.findMany({
      where: {
        deckId,
      },
      orderBy: { createdAt: "desc" },
      take: limit + 1,
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1,
      }),
    });
    const hasNext = cards.length > limit;
    const data = hasNext ? cards.slice(0, limit) : cards;
    const nextCursor = hasNext ? data[data.length - 1].id : null;
    return {
      cards: data,
      pagination: { nextCursor, hasNext, limit },
    };
  },
  async createCard(input: CreateCardInput) {
    const { word, meaningVi, userId, deckId, ...rest } = input;
    if (!word.trim() || !meaningVi.trim()) {
      throw new BadRequestError("Word and meaning are required");
    }
    const deck = await prisma.deck.findUnique({
      where: { id: deckId },
    });
    if (!deck) {
      throw new NotFoundError("Deck not found");
    }
    if (deck.userId !== userId) {
      throw new ForbiddenError();
    }
    return prisma.card.create({
      data: {
        word: word.trim(),
        meaningVi: meaningVi.trim(),
        deckId,
        ...rest,
      },
    });
  },

  async updateCard(input: UpdateCardInput, cardId: string, userId: string) {
    const card = await prisma.card.findUnique({
      where: { id: cardId },
      include: { deck: true },
    });
    if (!card) {
      throw new NotFoundError("Card not found");
    }
    if (card.deck.userId !== userId) {
      throw new ForbiddenError();
    }
    return prisma.card.update({
      where: { id: cardId },
      data: {
        ...(input.word && { word: input.word.trim() }),
        ...(input.phonetic !== undefined && {
          phonetic: input.phonetic?.trim(),
        }),
        ...(input.meaningVi && { meaningVi: input.meaningVi.trim() }),
        ...(input.meaningEn !== undefined && {
          meaningEn: input.meaningEn?.trim(),
        }),
        ...(input.example !== undefined && { example: input.example?.trim() }),
      },
    });
  },
  async deleteCard(cardId: string, userId: string) {
    const card = await prisma.card.findUnique({
      where: { id: cardId },
      include: { deck: true },
    });
    if (!card) {
      throw new NotFoundError("Card not found");
    }
    if (card.deck.userId !== userId) {
      throw new ForbiddenError();
    }
    await prisma.card.delete({
      where: { id: cardId },
    });
  },
};

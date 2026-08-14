import { BadRequestError, ForbiddenError, NotFoundError } from "@/lib/error";
import { prisma } from "@/lib/prisma";
import { StudySessionResult, SubmitReviewInput } from "./study.types";
import { calculateSM2, Rating } from "@/lib/sm2";

export const studyService = {
  async getStudyCards(deckId: string, userId: string) {
    const deck = await prisma.deck.findUnique({
      where: {
        id: deckId,
      },
    });
    if (!deck) throw new NotFoundError("Deck not found");
    if (deck.userId !== userId) throw new ForbiddenError();
    const cards = await prisma.card.findMany({
      where: {
        deckId,
        nextReview: { lte: new Date() },
      },
      orderBy: { nextReview: "asc" },
    });

    return { cards, total: cards.length };
  },

  async submitReview(input: SubmitReviewInput) {
    const { cardId, rating, userId } = input;

    if (![0, 1, 2, 3].includes(rating)) {
      throw new BadRequestError("Rating invalid");
    }
    const card = await prisma.card.findUnique({
      where: { id: cardId },
      include: { deck: true },
    });
    if (!card) throw new NotFoundError("Card not found");
    if (card.deck.userId !== userId) throw new ForbiddenError();

    const result = calculateSM2(
      rating as Rating,
      card.ease,
      card.interval,
      card.repetitions,
    );

    const [updatedCard] = await prisma.$transaction([
      prisma.card.update({
        where: { id: cardId },
        data: {
          ease: result.ease,
          interval: result.interval,
          repetitions: result.repetitions,
          nextReview: result.nextReview,
        },
      }),
      prisma.cardReview.create({
        data: { cardId, rating },
      }),
    ]);
    return updatedCard;
  },
  async getSessionStats(
    deckId: string,
    userId: string,
  ): Promise<StudySessionResult> {
    const deck = await prisma.deck.findUnique({ where: { id: deckId } });
    if (!deck) throw new NotFoundError("Deck not found");
    if (deck.userId !== userId) throw new ForbiddenError();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const reviews = await prisma.cardReview.findMany({
      where: {
        card: { deckId },
        createdAt: { gte: today },
      },
    });

    const reviewed = reviews.length;
    const remembered = reviews.filter((r) => r.rating >= 2).length;
    const needsWork = reviews.filter((r) => r.rating < 2).length;
    const accuracy =
      reviewed > 0 ? Math.round((remembered / reviewed) * 100) : 0;

    return { reviewed, remembered, needsWork, accuracy };
  },
  async resetDeck(deckId: string, userId: string) {
    const deck = await prisma.deck.findUnique({
      where: { id: deckId },
    });
    if (!deck) throw new NotFoundError("Deck not found");
    if (deck.userId !== userId) throw new ForbiddenError();

    await prisma.$transaction([
      prisma.cardReview.deleteMany({
        where: { card: { deckId } },
      }),
      prisma.card.updateMany({
        where: { deckId },
        data: {
          ease: 2.5,
          interval: 1,
          repetitions: 0,
          nextReview: new Date(),
        },
      }),
    ]);
  },
};

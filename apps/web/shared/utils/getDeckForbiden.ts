import { prisma } from "@/lib/prisma";

export async function getDeckOrForbidden(deckId: string, userId: string) {
  const deck = await prisma.deck.findUnique({
    where: { id: deckId },
  });

  if (!deck) {
    return { error: "Deck not found" }; // Deck not found
  }

  if (deck.userId !== userId) {
    return { error: "Unauthorized" }; // User is not the owner of the deck
  }

  return { deck };
}

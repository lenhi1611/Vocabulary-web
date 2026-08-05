import { prisma } from "@/lib/prisma";

export async function getCardOrForbidden(cardId: string, userId: string) {
    const card = await prisma.card.findUnique({
        where: { id: cardId },
        include: {
            deck: true,
        },
    });

    if (!card) {
        return { error: "Card not found" };
    }

    if (card.deck.userId !== userId) {
        return { error: "Forbidden" };
    }

    return { card };
}
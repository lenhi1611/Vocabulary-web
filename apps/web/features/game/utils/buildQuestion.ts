import { Card } from "@/shared/types";

type Direction = "en-vi" | "vi-en";

export interface Question {
  card: Card;
  options: string[];
  correctAnswer: string;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function buildQuestion(
  cards: Card[],
  count: number,
  direction: Direction,
): Question[] {
    const picked = shuffle(cards).slice(0, count);
    return picked.map((card) => {
        const correct = direction === "en-vi" ? card.meaningVi : card.word;
        const destructors = shuffle(cards.filter(c => c.id !== card.id)).slice(0,3).map(c => direction === "en-vi"? c.meaningVi : c.word)

        return{
            card,
            correctAnswer: correct,
            options: shuffle([...destructors, correct])
        }
    })
}

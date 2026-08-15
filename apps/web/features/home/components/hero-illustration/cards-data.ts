export type CardColor = "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5";

export interface WordCardData {
  id: string;
  text: string;
  finalX: number;
  finalY: number;
  rotation: number;
  delay: number;
  color: CardColor;
  // Relative "closeness to viewer" (0.5-1). Drives parallax intensity and
  // gives each card a slightly different floating rhythm.
  depth: number;
}

// A hand-placed ring around the boy (container is treated as a 420x420
// stage, positions are px offsets from its center).
export const HERO_WORD_CARDS: WordCardData[] = [
  { id: "cat", text: "CAT", finalX: -150, finalY: -130, rotation: -8, delay: 0, color: "chart-1", depth: 1 },
  { id: "friend", text: "FRIEND", finalX: -8, finalY: -178, rotation: 4, delay: 0.11, color: "chart-2", depth: 0.6 },
  { id: "sun", text: "SUN", finalX: 145, finalY: -140, rotation: 10, delay: 0.22, color: "chart-2", depth: 0.9 },
  { id: "dog", text: "DOG", finalX: 168, finalY: -30, rotation: -6, delay: 0.33, color: "chart-1", depth: 0.7 },
  { id: "apple", text: "APPLE", finalX: 162, finalY: 92, rotation: 8, delay: 0.44, color: "chart-2", depth: 1 },
  { id: "learn", text: "LEARN", finalX: 130, finalY: 188, rotation: -5, delay: 0.55, color: "chart-5", depth: 0.6 },
  { id: "home", text: "HOME", finalX: -8, finalY: 218, rotation: 6, delay: 0.66, color: "chart-1", depth: 0.8 },
  { id: "play", text: "PLAY", finalX: -170, finalY: 105, rotation: -9, delay: 0.77, color: "chart-1", depth: 0.9 },
  { id: "book", text: "BOOK", finalX: -158, finalY: -18, rotation: 7, delay: 0.88, color: "chart-2", depth: 0.7 },
];

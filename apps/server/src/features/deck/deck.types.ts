import { DeckLevel } from "@prisma/client";


export type createDeckInput = {
    name: string;
    description: string;
    topics: string[];
    level: DeckLevel;
    userId: string;
}

export type updateDeckInput = {
    name?: string;
    description?: string;
    topic?: string;
    level?: DeckLevel;
}
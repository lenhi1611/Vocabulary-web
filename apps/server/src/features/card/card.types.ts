export type CreateCardInput = {
    word: string;
    meaning: string;
    phonetic: string;
    example?: string;
    userId: string;
    deckId: string;
}

export type UpdateCardInput = {
    word?: string;
    meaning?: string;
    phonetic?: string;
    example?: string;
}


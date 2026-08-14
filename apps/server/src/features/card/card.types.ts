export type CreateCardInput = {
    word: string;
    meaningVi: string;
    meaningEn?: string;
    phonetic: string;
    example?: string;
    userId: string;
    deckId: string;
}

export type UpdateCardInput = {
    word?: string;
    meaningVi?: string;
    meaningEn?: string;
    phonetic?: string;
    example?: string;
}


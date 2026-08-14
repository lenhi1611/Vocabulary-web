import { AppError } from "@/lib/error";

export type DictionaryEntry = {
  word: string;
  phonetic?: string;
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      example?: string;
    }[];
  }[];
};

export const dictionaryService = {
  async lookup(word: string): Promise<DictionaryEntry[] | null> {
    const trimmed = word.trim();
    if (!trimmed) throw new AppError("Word is required", 400, "WORD_REQUIRED");

    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(trimmed.toLocaleUpperCase())}`,
    );

    if (!res.ok) return null;
    return (await res.json()) as DictionaryEntry[];
  },
};

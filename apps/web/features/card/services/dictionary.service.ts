import { api } from "@/lib/axios";
import { ApiSuccess } from "@/shared/types";

type DictionaryEntry = {
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

export type WordSuggestion = {
  phonetic: string;
  meaningEn: string;
  meaningVi: string;
};

export const dictionaryService = {
  async lookup(word: string): Promise<WordSuggestion | null> {
    try {
      const trimmed = word.trim();
      const [dictRes, translateRes] = await Promise.all([
        api.get<ApiSuccess<DictionaryEntry[] | null>>(
          `/dictionary/${encodeURIComponent(trimmed)}`,
        ),
        api.post("/translate", { text: trimmed }),
      ]);
      // parse dictionary
      let phonetic = "";
      let meaningEn = "";
      const entry = dictRes.data.data?.[0];
      if (entry) {
        phonetic = entry.phonetic ?? "";
        const definition = entry.meanings
          .map((m) => `(${m.partOfSpeech}) ${m.definitions[0].definition}`)
          .join("\n");
        meaningEn = definition ?? "";
      }
      const meaningVi = translateRes.data?.data.translated ?? "";
      if (!phonetic && !meaningEn && !meaningVi) return null;

      return { phonetic, meaningEn, meaningVi };
    } catch (error) {
      console.error("lookup failed", error);
      return null;
    }
  },
};

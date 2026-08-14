import { api } from "@/lib/axios";
import { ApiSuccess, Card } from "@/shared/types";

export type StudySession = {
  cards: Card[];
  total: number;
};

export type SessionStats = {
  reviewed: number;
  remembered: number;
  needsWork: number;
  accuracy: number;
};

export type SubmitReviewInput = {
  cardId: string;
  rating: Rating;
};

type Rating = 0 | 1 | 2 | 3;

export const studyService = {
  async getStudyCards(deckId: string) {
    const { data } = await api.get<ApiSuccess<StudySession>>(
      `/decks/${deckId}/study`,
    );
    console.log("get study", data);
    return data.data;
  },

  async submitReview(cardId: string, rating: Rating) {
    const { data } = await api.post<ApiSuccess<Card>>(
      `/cards/${cardId}/review`,
      { rating },
    );
    console.log("submit review", data);

    return data.data;
  },

  async getSessionStats(deckId: string) {
    const { data } = await api.get<ApiSuccess<SessionStats>>(
      `/decks/${deckId}/study/stats`,
    );
    console.log("get stats", data);
    return data.data;
  },

  async resetDeck(deckId: string): Promise<void> {
    return await api.post(`/decks/${deckId}/study/reset`);
  },
};

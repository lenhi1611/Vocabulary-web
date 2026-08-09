import { api } from "@/lib/axios";
import {
  ApiSuccess,
  CreateDeckInput,
  Deck,
  OffsetPagination,
  UpdateDeckInput,
} from "@/shared/types";

type DeckListResponse = ApiSuccess<{
  decks: Deck[];
  pagination: OffsetPagination;
}>;

export const deckService = {
  async getDecks(page = 1, limit = 10) {
    const { data } = await api.get<DeckListResponse>("/decks", {
      params: { page, limit },
    });
    return data.data;
  },
  async getDeckById(id: string) {
    const { data } = await api.get<ApiSuccess<Deck>>(`/decks/${id}`);
    return data.data;
  },

  async createDeck(input: CreateDeckInput) {
    const { data } = await api.post<ApiSuccess<Deck>>(`/decks`, input);
    return data.data;
  },

  async updateDeck(id: string, input: UpdateDeckInput) {
    const { data } = await api.patch<ApiSuccess<Deck>>(`/decks/${id}`, input);
    return data.data;
  },
  async deleteDeck(id: string) {
    await api.delete(`/decks/${id}`);
  },
};

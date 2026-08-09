import { api } from "@/lib/axios";
import {
  ApiSuccess,
  Card,
  CreateCardInput,
  CursorPagination,
  UpdateCardInput,
} from "@/shared/types";

type CardListResponse = ApiSuccess<{
  cards: Card[];
  pagination: CursorPagination;
}>;

export const cardService = {
  async getCards(deckId: string, cursor?: string, limit = 20) {
    const { data } = await api.get<CardListResponse>(`/decks/${deckId}/cards`, {
      params: { cursor, limit },
    });
    return data.data;
  },
  async createCard(deckId: string, input: CreateCardInput) {
    const { data } = await api.post<ApiSuccess<Card>>(
      `/decks/${deckId}/cards`,
      input,
    );
    return data.data;
  },
  async updateCard(id: string, input: UpdateCardInput) {
    const { data } = await api.patch<ApiSuccess<Card>>(`/cards/${id}`, input);
    return data.data;
  },

  async deleteCard(id: string) {
    await api.delete(`/cards/${id}`);
  },
};

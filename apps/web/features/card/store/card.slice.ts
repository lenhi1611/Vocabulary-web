import { Card, CreateCardInput, CursorPagination, UpdateCardInput } from "@/shared/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cardService } from "../services/card.service";
import { extractErrorMessage } from "@/shared/utils";
import type { RootState } from "@/shared/store/store";
// `RootState` is a type-only import: it is erased at compile time, so this
// does not introduce a runtime circular dependency with the store module.

type CardsState = {
  cards: Card[];
  nextCursor: string | null;
  hasMore: boolean;

  fetchCardsLoading: boolean;
  fetchCardsError: string | null;

  fetchMoreCardsLoading: boolean;
  fetchMoreCardsError: string | null;

  createCardLoading: boolean;
  createCardError: string | null;

  updateCardLoading: boolean;
  updateCardError: string | null;

  deleteCardLoading: boolean;
  deleteCardError: string | null;
};

const initialState: CardsState = {
  cards: [],
  nextCursor: null,
  hasMore: false,

  fetchCardsLoading: false,
  fetchCardsError: null,

  fetchMoreCardsLoading: false,
  fetchMoreCardsError: null,

  createCardLoading: false,
  createCardError: null,

  updateCardLoading: false,
  updateCardError: null,

  deleteCardLoading: false,
  deleteCardError: null,
};

type CardsPage = {
  cards: Card[];
  pagination: CursorPagination;
};

export const fetchCards = createAsyncThunk<
  CardsPage,
  string,
  { rejectValue: string }
>("card/fetchCards", async (deckId, { rejectWithValue }) => {
  try {
    return await cardService.getCards(deckId);
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error, "Unable to load words"));
  }
});

export const fetchMoreCards = createAsyncThunk<
  CardsPage,
  string,
  { state: RootState; rejectValue: string }
>("card/fetchMoreCards", async (deckId, { getState, rejectWithValue }) => {
  try {
    const { nextCursor } = getState().card;
    return await cardService.getCards(deckId, nextCursor ?? undefined);
  } catch (error) {
    return rejectWithValue(
      extractErrorMessage(error, "Unable to load more words"),
    );
  }
});

type CreateCardArgs = {
  deckId: string;
  data: CreateCardInput;
};

export const createCard = createAsyncThunk<
  Card,
  CreateCardArgs,
  { rejectValue: string }
>("card/createCard", async ({ deckId, data }, { rejectWithValue }) => {
  try {
    return await cardService.createCard(deckId, data);
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error, "Unable to add word"));
  }
});

type UpdateCardArgs = {
  id: string;
  data: UpdateCardInput;
};

export const updateCard = createAsyncThunk<
  Card,
  UpdateCardArgs,
  { rejectValue: string }
>("card/updateCard", async ({ id, data }, { rejectWithValue }) => {
  try {
    return await cardService.updateCard(id, data);
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error, "Unable to update word"));
  }
});

export const deleteCard = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("card/deleteCard", async (id, { rejectWithValue }) => {
  try {
    await cardService.deleteCard(id);
    return id;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error, "Unable to delete word"));
  }
});

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    clearCards(state) {
      state.cards = [];
      state.nextCursor = null;
      state.hasMore = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.fetchCardsLoading = true;
        state.fetchCardsError = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.fetchCardsLoading = false;
        state.cards = action.payload.cards;
        state.nextCursor = action.payload.pagination.nextCursor;
        state.hasMore = action.payload.pagination.hasNext;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.fetchCardsLoading = false;
        state.fetchCardsError = action.payload ?? "Unable to load words";
      })
      .addCase(fetchMoreCards.pending, (state) => {
        state.fetchMoreCardsLoading = true;
        state.fetchMoreCardsError = null;
      })
      .addCase(fetchMoreCards.fulfilled, (state, action) => {
        state.fetchMoreCardsLoading = false;
        state.cards.push(...action.payload.cards);
        state.nextCursor = action.payload.pagination.nextCursor;
        state.hasMore = action.payload.pagination.hasNext;
      })
      .addCase(fetchMoreCards.rejected, (state, action) => {
        state.fetchMoreCardsLoading = false;
        state.fetchMoreCardsError =
          action.payload ?? "Unable to load more words";
      })
      .addCase(createCard.pending, (state) => {
        state.createCardLoading = true;
        state.createCardError = null;
      })
      .addCase(createCard.fulfilled, (state, action) => {
        state.createCardLoading = false;
        state.cards.unshift(action.payload);
      })
      .addCase(createCard.rejected, (state, action) => {
        state.createCardLoading = false;
        state.createCardError = action.payload ?? "Unable to add word";
      })
      .addCase(updateCard.pending, (state) => {
        state.updateCardLoading = true;
        state.updateCardError = null;
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        state.updateCardLoading = false;
        const index = state.cards.findIndex(
          (card) => card.id === action.payload.id,
        );
        if (index !== -1) {
          state.cards[index] = action.payload;
        }
      })
      .addCase(updateCard.rejected, (state, action) => {
        state.updateCardLoading = false;
        state.updateCardError = action.payload ?? "Unable to update word";
      })
      .addCase(deleteCard.pending, (state) => {
        state.deleteCardLoading = true;
        state.deleteCardError = null;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.deleteCardLoading = false;
        state.cards = state.cards.filter((card) => card.id !== action.payload);
      })
      .addCase(deleteCard.rejected, (state, action) => {
        state.deleteCardLoading = false;
        state.deleteCardError = action.payload ?? "Unable to delete word";
      });
  },
});

export const { clearCards } = cardSlice.actions;
export const cardReducer = cardSlice.reducer;

export const selectCards = (state: { card: CardsState }) => state.card.cards;
export const selectHasMoreCards = (state: { card: CardsState }) =>
  state.card.hasMore;
export const selectFetchCardsLoading = (state: { card: CardsState }) =>
  state.card.fetchCardsLoading;
export const selectFetchCardsError = (state: { card: CardsState }) =>
  state.card.fetchCardsError;
export const selectFetchMoreCardsLoading = (state: { card: CardsState }) =>
  state.card.fetchMoreCardsLoading;
export const selectFetchMoreCardsError = (state: { card: CardsState }) =>
  state.card.fetchMoreCardsError;
export const selectCreateCardLoading = (state: { card: CardsState }) =>
  state.card.createCardLoading;
export const selectCreateCardError = (state: { card: CardsState }) =>
  state.card.createCardError;
export const selectUpdateCardLoading = (state: { card: CardsState }) =>
  state.card.updateCardLoading;
export const selectUpdateCardError = (state: { card: CardsState }) =>
  state.card.updateCardError;
export const selectDeleteCardLoading = (state: { card: CardsState }) =>
  state.card.deleteCardLoading;
export const selectDeleteCardError = (state: { card: CardsState }) =>
  state.card.deleteCardError;

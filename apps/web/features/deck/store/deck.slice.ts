import { CreateDeckInput, Deck, UpdateDeckInput } from "@/shared/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deckService } from "../services/deck.service";
import { extractErrorMessage } from "@/shared/utils";

type DecksState = {
  decks: Deck[];
  fetchDecksLoading: boolean;
  fetchDecksError: string | null;

  currentDeck: Deck | null;
  fetchDeckLoading: boolean;
  fetchDeckError: string | null;

  createDeckLoading: boolean;
  createDeckError: string | null;

  updateDeckLoading: boolean;
  updateDeckError: string | null;

  deleteDeckLoading: boolean;
  deleteDeckError: string | null;
};

const initialState: DecksState = {
  decks: [],
  fetchDecksLoading: false,
  fetchDecksError: null,

  currentDeck: null,
  fetchDeckLoading: false,
  fetchDeckError: null,

  createDeckLoading: false,
  createDeckError: null,

  updateDeckLoading: false,
  updateDeckError: null,

  deleteDeckLoading: false,
  deleteDeckError: null,
};

export const fetchDecks = createAsyncThunk<
  Deck[],
  void,
  { rejectValue: string }
>("deck/fetchDecks", async (_, { rejectWithValue }) => {
  try {
    const { decks } = await deckService.getDecks(1, 100);
    return decks;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error, "Unable to load decks"));
  }
});

export const fetchDeckById = createAsyncThunk<
  Deck,
  string,
  { rejectValue: string }
>("deck/fetchDeckById", async (deckId, { rejectWithValue }) => {
  try {
    return await deckService.getDeckById(deckId);
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error, "Unable to load deck"));
  }
});

export const createDeck = createAsyncThunk<
  Deck,
  CreateDeckInput,
  { rejectValue: string }
>("deck/createDeck", async (input, { rejectWithValue }) => {
  try {
    return await deckService.createDeck(input);
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error, "Unable to create deck"));
  }
});

type UpdateDeckArgs = {
  deckId: string;
  data: UpdateDeckInput;
};

export const updateDeck = createAsyncThunk<
  Deck,
  UpdateDeckArgs,
  { rejectValue: string }
>("deck/update", async ({ deckId, data }, { rejectWithValue }) => {
  try {
    return await deckService.updateDeck(deckId, data);
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error, "Unable to update deck"));
  }
});

export const deleteDeck = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("deck/deleteDeck", async (deckId, { rejectWithValue }) => {
  try {
    await deckService.deleteDeck(deckId);
    return deckId;
  } catch (error) {
    return rejectWithValue(extractErrorMessage(error, "Unable to delete deck"));
  }
});

const deckSlice = createSlice({
  name: "deck",
  initialState,
  reducers: {
    adjustDeckCardCount(
      state,
      action: { payload: { deckId: string; delta: number } },
    ) {
      const { deckId, delta } = action.payload;
      const deck = state.decks.find((deck) => deck.id === deckId);
      if (deck?._count) {
        deck._count.cards = Math.max(0, deck._count.cards + delta);
      }
      if (state.currentDeck?.id === deckId && state.currentDeck._count) {
        state.currentDeck._count.cards = Math.max(
          0,
          state.currentDeck._count.cards + delta,
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDecks.pending, (state) => {
        state.fetchDecksLoading = true;
        state.fetchDecksError = null;
      })
      .addCase(fetchDecks.fulfilled, (state, action) => {
        state.fetchDecksLoading = false;
        state.decks = action.payload;
      })
      .addCase(fetchDecks.rejected, (state, action) => {
        state.fetchDecksLoading = false;
        state.fetchDecksError = action.payload ?? "Unable to load decks";
      })
      .addCase(fetchDeckById.pending, (state) => {
        state.fetchDeckLoading = true;
        state.fetchDeckError = null;
      })
      .addCase(fetchDeckById.fulfilled, (state, action) => {
        state.fetchDeckLoading = false;
        state.currentDeck = action.payload;
      })
      .addCase(fetchDeckById.rejected, (state, action) => {
        state.fetchDeckLoading = false;
        state.fetchDeckError = action.payload ?? "Unable to load deck";
      })
      .addCase(createDeck.pending, (state) => {
        state.createDeckLoading = true;
        state.createDeckError = null;
      })
      .addCase(createDeck.fulfilled, (state, action) => {
        state.createDeckLoading = false;
        state.decks.unshift(action.payload);
      })
      .addCase(createDeck.rejected, (state, action) => {
        state.createDeckLoading = false;
        state.createDeckError = action.payload ?? "Unable to create deck";
      })
      .addCase(updateDeck.pending, (state) => {
        state.updateDeckLoading = true;
        state.updateDeckError = null;
      })
      .addCase(updateDeck.fulfilled, (state, action) => {
        state.updateDeckLoading = false;
        const index = state.decks.findIndex(
          (deck) => deck.id === action.payload.id,
        );
        if (index !== -1) {
          state.decks[index] = action.payload;
        }
        if (state.currentDeck?.id === action.payload.id) {
          state.currentDeck = action.payload;
        }
      })
      .addCase(updateDeck.rejected, (state, action) => {
        state.updateDeckLoading = false;
        state.updateDeckError = action.payload ?? "Unable to update deck";
      })
      .addCase(deleteDeck.pending, (state) => {
        state.deleteDeckLoading = true;
        state.deleteDeckError = null;
      })
      .addCase(deleteDeck.fulfilled, (state, action) => {
        state.deleteDeckLoading = false;
        state.decks = state.decks.filter((deck) => deck.id !== action.payload);
      })
      .addCase(deleteDeck.rejected, (state, action) => {
        state.deleteDeckLoading = false;
        state.deleteDeckError = action.payload ?? "Unable to delete deck";
      });
  },
});

export const { adjustDeckCardCount } = deckSlice.actions;
export const deckReducer = deckSlice.reducer;

export const selectDecks = (state: { deck: DecksState }) => state.deck.decks;
export const selectFetchDecksLoading = (state: { deck: DecksState }) =>
  state.deck.fetchDecksLoading;
export const selectFetchDecksError = (state: { deck: DecksState }) =>
  state.deck.fetchDecksError;
export const selectCurrentDeck = (state: { deck: DecksState }) =>
  state.deck.currentDeck;
export const selectFetchDeckLoading = (state: { deck: DecksState }) =>
  state.deck.fetchDeckLoading;
export const selectFetchDeckError = (state: { deck: DecksState }) =>
  state.deck.fetchDeckError;
export const selectCreateDeckLoading = (state: { deck: DecksState }) =>
  state.deck.createDeckLoading;
export const selectCreateDeckError = (state: { deck: DecksState }) =>
  state.deck.createDeckError;
export const selectUpdateDeckLoading = (state: { deck: DecksState }) =>
  state.deck.updateDeckLoading;
export const selectUpdateDeckError = (state: { deck: DecksState }) =>
  state.deck.updateDeckError;
export const selectDeleteDeckLoading = (state: { deck: DecksState }) =>
  state.deck.deleteDeckLoading;
export const selectDeleteDeckError = (state: { deck: DecksState }) =>
  state.deck.deleteDeckError;

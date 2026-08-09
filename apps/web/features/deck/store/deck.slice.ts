import { CreateDeckInput, Deck, UpdateDeckInput } from "@/shared/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deckService } from "../services/deck.service";
import { extractErrorMessage } from "@/shared/utils";

type DecksState = {
  decks: Deck[];
  fetchDecksLoading: boolean;
  fetchDecksError: string | null;

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

  createDeckLoading: false,
  createDeckError: null,

  updateDeckLoading: false,
  updateDeckError: null,

  deleteDeckLoading: false,
  deleteDeckError: null,
};

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
  reducers: {},
  extraReducers: (builder) => {
    builder
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

export const deckReducer = deckSlice.reducer;

export const selectDecks = (state: { deck: DecksState }) => state.deck.decks;
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

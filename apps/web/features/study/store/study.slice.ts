import { Card } from "@/shared/types";
import {
  SessionStats,
  studyService,
  SubmitReviewInput,
} from "../services/study.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { extractErrorMessage } from "@/shared/utils";
import { RootState } from "@/shared/store/store";

type StudyState = {
  cards: Card[];
  fetchCardsLoading: boolean;
  fetchCardsError: string | null;

  reviewStatus: Record<string, "idle" | "loading" | "error">;
  reviewError: string | null;

  stats: SessionStats | null;
  fetchStatsLoading: boolean;
  fetchStatsError: string | null;

  resetLoading: boolean;
  resetError: string | null;
};

const initialState: StudyState = {
  cards: [],
  fetchCardsLoading: false,
  fetchCardsError: null,

  reviewStatus: {},
  reviewError: null,

  stats: null,
  fetchStatsLoading: false,
  fetchStatsError: null,

  resetLoading: false,
  resetError: null,
};

export const fetchStudyCards = createAsyncThunk(
  "study/fetchStudyCards",
  async (deckId: string, { rejectWithValue }) => {
    try {
      return await studyService.getStudyCards(deckId);
    } catch (error) {
      return rejectWithValue(
        extractErrorMessage(error, "Failed to fetch study cards"),
      );
    }
  },
);

export const submitReview = createAsyncThunk(
  "study/submitReview",
  async (input: SubmitReviewInput, { rejectWithValue }) => {
    try {
      return await studyService.submitReview(input.cardId, input.rating);
    } catch (error) {
      return rejectWithValue(
        extractErrorMessage(error, "Failed to submit review"),
      );
    }
  },
);

export const fetchSessionStats = createAsyncThunk(
  "study/fetchSessionStats",
  async (deckId: string, { rejectWithValue }) => {
    try {
      return await studyService.getSessionStats(deckId);
    } catch (error) {
      return rejectWithValue(
        extractErrorMessage(error, "Failed to fetch session stats"),
      );
    }
  },
);

export const resetDeck = createAsyncThunk(
  "study/resetDeck",
  async (deckId: string, { dispatch, rejectWithValue }) => {
    try {
      await studyService.resetDeck(deckId);
      dispatch(fetchStudyCards(deckId));
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error, "failed to resetDeck"));
    }
  },
);

const studySlice = createSlice({
  name: "study",
  initialState,
  reducers: {
    resetStudySession(state) {
      state.cards = [];
      state.fetchCardsError = null;
      state.reviewError = null;
      state.reviewStatus = {};
      state.stats = null;
      state.fetchStatsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudyCards.pending, (state) => {
        state.fetchCardsLoading = true;
        state.fetchCardsError = null;
      })
      .addCase(fetchStudyCards.fulfilled, (state, action) => {
        state.fetchCardsLoading = false;
        state.cards = action.payload.cards;
      })
      .addCase(fetchStudyCards.rejected, (state, action) => {
        state.fetchCardsError = action.payload as string;
        state.fetchCardsLoading = false;
      });

    //  Submit review
    builder
      .addCase(submitReview.pending, (state, action) => {
        const { cardId } = action.meta.arg;
        state.reviewStatus[cardId] = "loading";
        state.reviewError = null;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        const { cardId } = action.meta.arg;

        state.reviewStatus[cardId] = "idle";
        const index = state.cards.findIndex((c) => c.id === cardId);
        if (index !== -1) state.cards[index] = action.payload as Card;
      })
      .addCase(submitReview.rejected, (state, action) => {
        const { cardId } = action.meta.arg;
        state.reviewStatus[cardId] = "error";
        state.reviewError = action.payload as string;
      });

    // fetchSessionStats
    builder
      .addCase(fetchSessionStats.pending, (state) => {
        state.fetchStatsLoading = true;
        state.fetchStatsError = null;
      })
      .addCase(fetchSessionStats.fulfilled, (state, action) => {
        state.fetchStatsLoading = false;
        state.stats = action.payload as SessionStats;
      })
      .addCase(fetchSessionStats.rejected, (state, action) => {
        state.fetchStatsLoading = false;
        state.fetchStatsError = action.payload as string;
      });

    //   reset deck
    builder
      .addCase(resetDeck.pending, (state) => {
        state.resetLoading = true;
        state.resetError = null;
      })
      .addCase(resetDeck.fulfilled, (state) => {
        state.resetLoading = false;
        state.reviewStatus = {};
        state.reviewError = null;
        state.stats = null;
      })
      .addCase(resetDeck.rejected, (state, action) => {
        state.resetLoading = false;
        state.resetError = action.payload as string;
      });
  },
});

// Actions

export const { resetStudySession } = studySlice.actions;

// Selectors
export const selectStudyCards = (state: RootState) => state.study.cards;
export const selectFetchStudyCardsLoading = (state: RootState) =>
  state.study.fetchCardsLoading;
export const selectFetchStudyCardsError = (state: RootState) =>
  state.study.fetchCardsError;

export const selectReviewStatus = (cardId: string) => (state: RootState) =>
  state.study.reviewStatus[cardId] ?? "idle";
export const selectReviewError = (state: RootState) => state.study.reviewError;

export const selectSessionStats = (state: RootState) => state.study.stats;
export const selectFetchStatsLoading = (state: RootState) =>
  state.study.fetchStatsLoading;
export const selectResetLoading = (state: RootState) =>
  state.study.resetLoading;
export const selectResetError = (state: RootState) => state.study.resetError;

export const studyReducer = studySlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { SignInValues } from "../schemas/signIn.schema";
import { SignUpValues } from "../schemas/signUp.schema";
import { authService } from "../services/auth.service";
import { AuthResult, AuthUser } from "../types/auth";
import { initialRequestState, RequestState, RequestStatus } from "@/shared/store/requestStatus";

type AuthState = {
  user: AuthUser | null;
  signIn: RequestState;
  signUp: RequestState;
};

const initialState: AuthState = {
  user: null,
  signIn: { ...initialRequestState },
  signUp: { ...initialRequestState },
};

function extractErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? fallback;
  }
  return fallback;
}

export const signIn = createAsyncThunk<AuthResult, SignInValues, { rejectValue: string }>(
  "auth/signIn",
  async (values, { rejectWithValue }) => {
    try {
      return await authService.signIn(values);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error, "Unable to sign in"));
    }
  }
);

export const signUp = createAsyncThunk<AuthResult, SignUpValues, { rejectValue: string }>(
  "auth/signUp",
  async (values, { rejectWithValue }) => {
    try {
      return await authService.signUp(values);
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error, "Unable to create account"));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: AuthUser }>) {
      state.user = action.payload.user;
    },
    clearCredentials(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.signIn.status = RequestStatus.Loading;
        state.signIn.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.signIn.status = RequestStatus.Succeeded;
        // The login endpoint only confirms the session (cookie); it doesn't
        // return a user DTO yet, so we know the submitted email was valid.
        state.user = { email: action.meta.arg.email };
      })
      .addCase(signIn.rejected, (state, action) => {
        state.signIn.status = RequestStatus.Failed;
        state.signIn.error = action.payload ?? "Unable to sign in";
      })
      .addCase(signUp.pending, (state) => {
        state.signUp.status = RequestStatus.Loading;
        state.signUp.error = null;
      })
      .addCase(signUp.fulfilled, (state) => {
        // Registration only creates the account; no session cookie is set,
        // so this intentionally does not touch `state.user`.
        state.signUp.status = RequestStatus.Succeeded;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.signUp.status = RequestStatus.Failed;
        state.signUp.error = action.payload ?? "Unable to create account";
      });
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectSignIn = (state: { auth: AuthState }) => state.auth.signIn;
export const selectSignUp = (state: { auth: AuthState }) => state.auth.signUp;

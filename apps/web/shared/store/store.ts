import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import { authReducer } from "@/features/auth/store/auth.slice";
import { deckReducer } from "@/features/deck/store/deck.slice";
import { cardReducer } from "@/features/card/store/card.slice";
import { studyReducer } from "@/features/study/store/study.slice";
import storage from "./storage";

const authPersistConfig = {
  key: "auth",
  storage,
  // Only persist the logged-in user; signIn/signUp are transient request
  // states and shouldn't survive a reload.
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  deck: deckReducer,
  card: cardReducer,
  study: studyReducer,
});

export function makeStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

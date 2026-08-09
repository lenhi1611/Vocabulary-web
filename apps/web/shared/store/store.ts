import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "@/features/auth/store/auth.slice";
import { deckReducer } from "@/features/deck/store/deck.slice";
import { cardReducer } from "@/features/card/store/card.slice";

export function makeStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      deck: deckReducer,
      card: cardReducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

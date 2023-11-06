import { combineReducers, configureStore } from "@reduxjs/toolkit";

import theme from "./slices/themeSlice";
import session from "./slices/sessionSlice";

const reducers = {
  theme,
  session,
};

const combinedReducer = combineReducers(reducers);

export const rootReducer = (state, action) => {
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

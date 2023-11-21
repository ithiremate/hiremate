import { combineReducers, configureStore } from "@reduxjs/toolkit";

import theme from "./slices/themeSlice";
import session from "./slices/sessionSlice";
import toast from "./slices/toastSlice";
import user from "./slices/userSlice";
import jobs from "./slices/jobsSlice";

const reducers = {
  theme,
  session,
  toast,
  user,
  jobs,
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

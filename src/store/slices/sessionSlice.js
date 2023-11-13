import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessionUser: null,
  isInitialized: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSessionUser: (state, action) => {
      state.sessionUser = action.payload;
      state.isInitialized = true;
    },
  },
});

export const { setSessionUser } = sessionSlice.actions;

export default sessionSlice.reducer;

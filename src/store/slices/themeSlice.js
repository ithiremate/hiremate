import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTheme: null,
  isInitialized: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateTheme(state, action) {
      state.currentTheme = action.payload;
      state.isInitialized = true;
    },
  },
});

export const { updateTheme } = themeSlice.actions;

export default themeSlice.reducer;

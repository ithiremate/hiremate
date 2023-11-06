import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isInitialized: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
      state.isInitialized = true;
    },
  },
});

export const { updateUser } = sessionSlice.actions;

export default sessionSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { initEmsiSession } from "../actions/emsiSessionActions";

const initialState = {
  accessToken: null,
  isInitialized: false,
};

const emsiSession = createSlice({
  name: "emsiSession",
  initialState,
  reducers: {
    setEmsiToken: (state, action) => {
      state.accessToken = action.payload;
      state.isInitialized = true;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(initEmsiSession.pending, (state) => {
        state.isInitialized = false;
      })
      .addCase(initEmsiSession.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
      })
      .addCase(initEmsiSession.rejected, (state) => {
        state.accessToken = null;
        state.isInitialized = true;
      }),
});

export const { setEmsiToken } = emsiSession.actions;

export default emsiSession.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dbUser: null,
  isInitialized: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDbUser: (state, action) => {
      state.dbUser = action.payload;
      state.isInitialized = true;
    },
    initEmptyDbUser: (state) => {
      state.isInitialized = true;
    },
  },
});

export const { setDbUser, initEmptyDbUser } = userSlice.actions;

export default userSlice.reducer;

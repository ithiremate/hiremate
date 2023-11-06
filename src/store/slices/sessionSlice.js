import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isInitialized: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {},
});

export default sessionSlice.reducer;

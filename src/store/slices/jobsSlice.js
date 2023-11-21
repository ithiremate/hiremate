import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  isInitialized: false,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.list = action.payload || [];
      state.isInitialized = true;
    },
  },
});

export const { setJobs } = jobsSlice.actions;

export default jobsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "",
  duration: 0,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast(state, action) {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.duration = action.payload.duration;
    },
    hideToast(state) {
      state.message = "";
      state.type = "";
      state.duration = 0;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast(state, action) {
      state.toasts = [...state.toasts, action.payload];
    },
    hideToasts(state) {
      state.toasts = [];
    },
  },
});

export const { addToast, hideToasts } = toastSlice.actions;

export default toastSlice.reducer;

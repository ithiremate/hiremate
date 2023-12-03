import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  data: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.type = action.payload.type;
      state.data = action.payload.data;
    },
    hideModal: (state) => {
      state.type = "";
      state.data = null;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;

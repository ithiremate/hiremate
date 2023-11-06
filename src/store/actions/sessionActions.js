/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../singletons/api";
import { updateUser } from "../slices/sessionSlice";

export const subscribeOnSessionChanges = createAsyncThunk(
  "session/subscribeOnSessionChanges",
  (_, { dispatch }) => {
    api.session.subscribe((user) => {
      dispatch(updateUser(user));
    });
  },
);

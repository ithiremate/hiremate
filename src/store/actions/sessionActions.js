/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../singletons/api";
import TOAST from "../../utils/constants/toast";
import { updateUser } from "../slices/sessionSlice";
import { showToast } from "../slices/toastSlice";

const ERRORS = {
  "auth/invalid-login-credentials": "Invalid credentials",
  "auth/too-many-requests": "Too many requests",
  default: "Something went wrong",
};

export const subscribeOnSessionChanges = createAsyncThunk(
  "session/subscribeOnSessionChanges",
  (_, { dispatch }) => {
    api.session.subscribe((user) => {
      dispatch(updateUser(user));
    });
  },
);

export const signInWithEmailAndPassword = createAsyncThunk(
  "session/signInWithEmailAndPassword",
  async ({ email, password }, { dispatch }) => {
    try {
      await api.session.signInWithEmailAndPassword(email, password);
    } catch (error) {
      dispatch(
        showToast({
          type: TOAST.ERROR_TYPE,
          message: ERRORS[error.code] ?? ERRORS.default,
          duration: TOAST.DEFAULT_DURATION,
        }),
      );

      console.error("signInWithEmailAndPassword error: ", error);

      throw error;
    }
  },
);

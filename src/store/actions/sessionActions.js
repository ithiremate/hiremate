/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../singletons/api";
import TOAST from "../../utils/constants/toast";
import { updateUser } from "../slices/sessionSlice";
import { addToast } from "../slices/toastSlice";

const ERRORS = {
  "auth/invalid-login-credentials": "Invalid credentials",
  "auth/too-many-requests": "Too many requests",
  "auth/email-already-in-use": "Email already in use",
  "auth/user-disabled": "User disabled",
  default: "Something went wrong",
};

export const subscribeOnSessionChanges = createAsyncThunk(
  "session/subscribeOnSessionChanges",
  (_, { dispatch }) => {
    api.session.subscribeOnSessionChanges((user) => {
      dispatch(updateUser(user));
    });
  },
);

export const sendEmailVerification = createAsyncThunk(
  "session/sendEmailVerification",
  async (user, { dispatch }) => {
    try {
      await api.session.sendEmailVerification(user);

      await dispatch(
        addToast({
          type: TOAST.SUCCESS_TYPE,
          duration: TOAST.DEFAULT_DURATION,
          message: "Verification link sent",
        }),
      );
    } catch (error) {
      await dispatch(
        addToast({
          type: TOAST.ERROR_TYPE,
          duration: TOAST.DEFAULT_DURATION,
          message: ERRORS[error.code] ?? ERRORS.default,
        }),
      );

      console.error("signInWithEmailAndPassword error: ", error);

      throw error;
    }
  },
);

export const signInWithEmailAndPassword = createAsyncThunk(
  "session/signInWithEmailAndPassword",
  async ({ email, password }, { dispatch }) => {
    try {
      await api.session.signInWithEmailAndPassword(email, password);

      await dispatch(
        addToast({
          type: TOAST.SUCCESS_TYPE,
          duration: TOAST.DEFAULT_DURATION,
          message: "Successfully signed in",
        }),
      );
    } catch (error) {
      await dispatch(
        addToast({
          type: TOAST.ERROR_TYPE,
          duration: TOAST.DEFAULT_DURATION,
          message: ERRORS[error.code] ?? ERRORS.default,
        }),
      );

      console.error("signInWithEmailAndPassword error: ", error);

      throw error;
    }
  },
);

export const createUserWithEmailAndPassword = createAsyncThunk(
  "session/createUserWithEmailAndPassword",
  async ({ email, password }, { dispatch }) => {
    try {
      const userCredential = await api.session.createUserWithEmailAndPassword(
        email,
        password,
      );

      await dispatch(
        addToast({
          type: TOAST.SUCCESS_TYPE,
          duration: TOAST.DEFAULT_DURATION,
          message: "Account successfully created",
        }),
      );

      await dispatch(sendEmailVerification(userCredential.user));
      await dispatch(signInWithEmailAndPassword({ email, password }));
    } catch (error) {
      await dispatch(
        addToast({
          type: TOAST.ERROR_TYPE,
          duration: TOAST.DEFAULT_DURATION,
          message: ERRORS[error.code] ?? ERRORS.default,
        }),
      );

      console.error("createUserWithEmailAndPassword error: ", error);

      throw error;
    }
  },
);

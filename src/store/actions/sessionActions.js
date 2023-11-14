/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../singletons/api";
import TOAST from "../../utils/constants/toast";
import FB from "../../utils/constants/fb";
import { setSessionUser } from "../slices/sessionSlice";
import { addToast } from "../slices/toastSlice";
import { createUserInDb } from "./userActions";
import { setDbUser } from "../slices/userSlice";

export const subscribeOnSessionChanges = createAsyncThunk(
  "session/subscribeOnSessionChanges",
  (_, { dispatch }) => {
    api.session.subscribeOnSessionChanges((user) => {
      dispatch(setSessionUser(user));

      if (!user) {
        dispatch(setDbUser(user));
      }
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
          message: FB.ERRORS[error.code] ?? FB.ERRORS.default,
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
          message: FB.ERRORS[error.code] ?? FB.ERRORS.default,
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

      await dispatch(createUserInDb(userCredential.user));

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
          message: FB.ERRORS[error.code] ?? FB.ERRORS.default,
        }),
      );

      console.error("createUserWithEmailAndPassword error: ", error);

      throw error;
    }
  },
);

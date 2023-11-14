/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */

import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../singletons/api";
import { setDbUser, initEmptyDbUser } from "../slices/userSlice";
import { addToast } from "../slices/toastSlice";
import TOAST from "../../utils/constants/toast";
import FB from "../../utils/constants/fb";

export const subscribeOnUserChanges = createAsyncThunk(
  "session/subscribeOnSessionChanges",
  async (_, { dispatch, getState }) => {
    let unsubscribe = () => {};
    const { sessionUser } = getState().session;

    if (sessionUser) {
      unsubscribe = await api.user.subscribeOnUserChanges((doc) => {
        const user = doc.data();

        dispatch(setDbUser(user));
      });
    } else {
      dispatch(initEmptyDbUser());
    }

    return unsubscribe;
  },
);

export const createUserInDb = createAsyncThunk(
  "user/createUserInDb",
  async (currentUser, { dispatch }) => {
    try {
      const {
        displayName,
        email,
        emailVerified,
        phoneNumber,
        photoURL,
        profileCompleted = false,
        uid,
        userType = null,
      } = currentUser;

      await api.user.createUserInDb({
        displayName,
        email,
        emailVerified,
        phoneNumber,
        photoURL,
        profileCompleted,
        userType,
        uid,
      });
    } catch (error) {
      await dispatch(
        addToast({
          type: TOAST.ERROR_TYPE,
          duration: TOAST.DEFAULT_DURATION,
          message: FB.ERRORS[error.code] ?? FB.ERRORS.default,
        }),
      );

      console.error("createUserInDb error: ", error);

      throw error;
    }
  },
);

export const updateUserFieldInDb = createAsyncThunk(
  "user/updateUserInDb",
  async ({ valueKey, value }, { dispatch, getState }) => {
    try {
      const { uid } = getState().user.dbUser;

      await api.user.updateUserFieldInDb(valueKey, value, uid);
    } catch (error) {
      await dispatch(
        addToast({
          type: TOAST.ERROR_TYPE,
          duration: TOAST.DEFAULT_DURATION,
          message: FB.ERRORS[error.code] ?? FB.ERRORS.default,
        }),
      );

      console.error("updateUserFieldInDb error: ", error);

      throw error;
    }
  },
);

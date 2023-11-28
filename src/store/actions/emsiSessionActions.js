/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */

import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../singletons/api";

export const initEmsiSession = createAsyncThunk(
  "emsiSession/initEmsiSession",
  async () => {
    try {
      const headers = { "Content-Type": "application/x-www-form-urlencoded" };

      const form = new URLSearchParams();

      form.append("client_id", process.env.REACT_APP_EMSI_CLIENT_ID);
      form.append("client_secret", process.env.REACT_APP_EMSI_SECRET);
      form.append("grant_type", process.env.REACT_APP_EMSI_GRANT_TYPE);
      form.append("scope", process.env.REACT_APP_EMSI_SCOPE);

      const response = await api.emsiSession.initEmsiSession(form, headers);

      return response;
    } catch (error) {
      console.error("initEmsiSession error: ", error);

      throw error;
    }
  },
);

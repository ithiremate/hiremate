/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */

import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../singletons/api";
import { setJobs } from "../slices/jobsSlice";

export const subscribeOnJobsChanges = createAsyncThunk(
  "jobs/subscribeOnSesJobsChanges",
  async (_, { dispatch }) => {
    let unsubscribe = () => {};

    unsubscribe = await api.jobs.subscribeOnJobsChanges((doc) => {
      const jobs = doc.data();

      dispatch(setJobs(jobs));
    });

    return unsubscribe;
  },
);

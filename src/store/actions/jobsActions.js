/* eslint-disable no-console */

import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import dayjs from "dayjs";

import api from "../../singletons/api";
import { setJobs } from "../slices/jobsSlice";
import { addToast } from "../slices/toastSlice";
import TOAST from "../../utils/constants/toast";
import FB from "../../utils/constants/fb";

export const subscribeOnJobsChanges = createAsyncThunk(
  "jobs/subscribeOnSesJobsChanges",
  async (_, { dispatch }) => {
    let unsubscribe = () => {};

    unsubscribe = await api.jobs.subscribeOnJobsChanges((doc) => {
      const jobs = [];

      doc.forEach((job) => jobs.push(job.data()));

      dispatch(setJobs(jobs));
    });

    return unsubscribe;
  },
);

export const postNewJob = createAsyncThunk(
  "jobs/postNewJob",
  async (newJob, { dispatch }) => {
    try {
      const id = nanoid();
      const now = dayjs().toISOString();

      await api.jobs.postNewJob({
        ...newJob,
        id,
        createdAt: now,
        updatedAt: now,
      });

      await dispatch(
        addToast({
          type: TOAST.SUCCESS_TYPE,
          duration: TOAST.DEFAULT_DURATION,
          message: "Job successfully created",
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

      console.error("postNewJob error: ", error);

      throw error;
    }
  },
);

export const editExistedJob = createAsyncThunk(
  "jobs/editExistedJob",
  async (job, { dispatch }) => {
    try {
      const now = dayjs().toISOString();

      await api.jobs.editJob({
        ...job,
        updatedAt: now,
      });

      await dispatch(
        addToast({
          type: TOAST.SUCCESS_TYPE,
          duration: TOAST.DEFAULT_DURATION,
          message: "Job successfully edited",
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

      console.error("editExistedJob error: ", error);

      throw error;
    }
  },
);

export const deleteExistedJob = createAsyncThunk(
  "jobs/deleteExistedJob",
  async (id, { dispatch }) => {
    try {
      await api.jobs.deleteJob(id);

      await dispatch(
        addToast({
          type: TOAST.SUCCESS_TYPE,
          duration: TOAST.DEFAULT_DURATION,
          message: "Job successfully deleted",
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

      console.error("deleteExistedJob error: ", error);

      throw error;
    }
  },
);

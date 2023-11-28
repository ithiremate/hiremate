/* eslint-disable no-console */
import apiFactory from "../store/services";

const api = apiFactory({
  locationApiUrl: process.env.REACT_APP_LOCATION_API_URL,
  emsiAuthUrl: process.env.REACT_APP_EMSI_AUTH_URL,
  emsiApiUrl: process.env.REACT_APP_EMSI_API_URL,
  onError: (error) => console.error("Request error: ", error),
});

export default api;

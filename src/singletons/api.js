/* eslint-disable no-console */
import apiFactory from "../store/services";

const api = apiFactory({
  locationApiUrl: process.env.REACT_APP_LOCATION_API_URL,
  onError: (error) => console.error("Request error: ", error),
});

export default api;
